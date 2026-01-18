import type { TemplateId } from "@/lib/react-templates"
import type { UniversalResumeData } from "@/lib/schemas"
import { createElement } from "react"
import { createRoot } from "react-dom/client"

/**
 * Generate a PDF by rendering the clean base template with data,
 * capturing it with html2canvas, then converting to PDF.
 */
export async function generateReactPDF(
  data: UniversalResumeData,
  templateId: TemplateId
): Promise<Blob> {
  console.log('=== PDF EXPORT STARTED ===')
  console.log('Template ID:', templateId)
  console.log('CV Data:', {
    name: data.personal?.fullName,
    experienceCount: data.experience?.length || 0,
    educationCount: data.education?.length || 0,
    hasSkills: !!data.skillCategories,
    summary: data.summary?.substring(0, 50) + '...'
  })
  
  if (typeof window === "undefined") {
    throw new Error("generateReactPDF must be called in the browser")
  }

  const { default: jsPDF } = await import("jspdf")
  const { default: html2canvas } = await import("html2canvas")
  const { getFieldEditableTemplate } = await import("@/lib/field-editable-templates")

  console.log('Creating temporary container for field-editable template...')
  
  // Create a temporary container VISIBLE on screen (html2canvas needs visible elements)
  const tempContainer = document.createElement('div')
  tempContainer.style.position = 'fixed'
  tempContainer.style.top = '0'
  tempContainer.style.left = '0'
  tempContainer.style.width = '896px' // A4-ish width
  tempContainer.style.zIndex = '99999' // Above everything
  tempContainer.style.backgroundColor = 'white'
  tempContainer.style.overflow = 'auto'
  tempContainer.setAttribute('data-pdf-render', 'true')
  document.body.appendChild(tempContainer)
  
  console.log('Rendering field-editable template with editMode=false...')
  console.log('Template ID:', templateId)
  
  // Get the FIELD-EDITABLE template component (not base template)
  const TemplateComponent = getFieldEditableTemplate(templateId)
  
  console.log('✓ Field-editable template component loaded')
  
  // Render the field-editable template with editMode=false (no edit UI, but TipTap HTML rendering works)
  const root = createRoot(tempContainer)
  
  // Render with editMode=false to disable editing UI
  await new Promise<void>((resolve) => {
    root.render(createElement(TemplateComponent, { 
      data,
      editMode: false, // This is the key - renders TipTap content without edit UI
      onFieldChange: () => {},
      onFieldEditStart: () => {},
      onFieldEditEnd: () => {},
      onAddArrayItem: () => {},
      onRemoveArrayItem: () => {}
    }))
    // Wait for React render + browser paint
    setTimeout(resolve, 1000)
  })
  
  console.log('✓ Field-editable template rendered')
  
  // Get the rendered template element
  const templateContent = tempContainer.firstElementChild as HTMLElement
  if (!templateContent) {
    root.unmount()
    document.body.removeChild(tempContainer)
    throw new Error("Template failed to render")
  }
  
  console.log('Template dimensions:', templateContent.offsetWidth, 'x', templateContent.offsetHeight)
  console.log('Template text (first 200 chars):', templateContent.textContent?.substring(0, 200))

  // Inject CSS for proper list rendering (bullets, spacing, etc.)
  console.log('Injecting list styles for PDF...')
  const styleTag = document.createElement('style')
  styleTag.textContent = `
    [data-pdf-render] ul {
      list-style-type: disc !important;
      margin: 0.5em 0 !important;
      padding-left: 1.5em !important;
    }
    [data-pdf-render] ol {
      list-style-type: decimal !important;
      margin: 0.5em 0 !important;
      padding-left: 1.5em !important;
    }
    [data-pdf-render] li {
      margin: 0.25em 0 !important;
      padding-left: 0.25em !important;
      display: list-item !important;
    }
    [data-pdf-render] p {
      margin: 0.25em 0 !important;
    }
  `
  tempContainer.appendChild(styleTag)
  console.log('✓ List styles injected')

  try {
    // Wait a bit more for styles and images to load
    console.log('Waiting 500ms for assets to load...')
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('✓ Wait complete')

    // Capture the clean template
    console.log('Starting html2canvas capture (clean template)...')
    console.log('Canvas options:', {
      scale: 2,
      width: templateContent.scrollWidth,
      height: templateContent.scrollHeight
    })
    
    const canvas = await html2canvas(templateContent, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: templateContent.scrollWidth,
      windowHeight: templateContent.scrollHeight,
    })

    console.log('✓ Canvas created successfully')
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height, 'pixels')
    
    // Check if canvas has content
    const ctx = canvas.getContext('2d')
    const imageData = ctx?.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100))
    const hasContent = imageData?.data.some((pixel, i) => i % 4 === 3 && pixel > 0) // Check alpha channel
    console.log('Canvas has content:', hasContent)

    // Create PDF with A4 dimensions
    console.log('Creating PDF document...')
    const pdf = new jsPDF({ 
      unit: "mm", 
      format: "a4", 
      orientation: "portrait", 
      compress: true 
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    console.log('PDF page size (mm):', pdfWidth, 'x', pdfHeight)
    
    // Calculate scaling to fit A4
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583))
    
    const scaledWidth = (imgWidth * 0.264583) * ratio
    const scaledHeight = (imgHeight * 0.264583) * ratio
    
    console.log('Image scaling:', {
      originalPx: `${imgWidth}x${imgHeight}`,
      scaledMm: `${scaledWidth.toFixed(2)}x${scaledHeight.toFixed(2)}`,
      ratio: ratio.toFixed(3)
    })
    
    console.log('Converting canvas to JPEG...')
    const imgData = canvas.toDataURL("image/jpeg", 0.95)
    console.log('JPEG data length:', imgData.length, 'bytes')
    console.log('Adding image to PDF...')
    pdf.addImage(imgData, "JPEG", 0, 0, scaledWidth, scaledHeight, undefined, "FAST")
    console.log('✓ Image added to PDF')

    console.log('Generating PDF blob...')
    const blob = pdf.output("blob")
    console.log('✓ PDF blob created, size:', blob.size, 'bytes')
    console.log('=== PDF EXPORT COMPLETE ===')
    
    return blob
  } catch (error) {
    console.error('PDF generation error:', error)
    throw error
  } finally {
    // Cleanup: unmount React and remove temp container
    console.log('Cleaning up temporary render...')
    try {
      root.unmount()
    } catch (e) {
      console.warn('Failed to unmount React root:', e)
    }
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer)
    }
    console.log('✓ Cleanup complete')
  }
}
