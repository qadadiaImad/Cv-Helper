import type { ResumeData, TemplateId } from "@/lib/react-templates"
import { REACT_TEMPLATES } from "@/lib/react-templates"
import React from 'react'

// Generate PDF using html2pdf.js (client-side only)
export async function generateReactPDF(data: ResumeData, templateId: TemplateId = 'classic_minimal'): Promise<Blob> {
  // This function should only be called on the client side
  if (typeof window === 'undefined') {
    throw new Error('generateReactPDF can only be called on the client side')
  }

  const html2pdf = (await import('html2pdf.js')).default
  
  // Get the template component
  const TemplateComponent = REACT_TEMPLATES[templateId]
  
  // Create a temporary div and render React component directly
  const tempDiv = document.createElement('div')
  tempDiv.style.position = 'absolute'
  tempDiv.style.left = '-9999px'
  tempDiv.style.width = '210mm'
  tempDiv.style.padding = '20mm'
  tempDiv.style.boxSizing = 'border-box'
  tempDiv.style.fontFamily = 'Arial, sans-serif'
  tempDiv.style.fontSize = '12px'
  tempDiv.style.lineHeight = '1.4'
  tempDiv.style.color = '#000'
  tempDiv.style.backgroundColor = '#fff'
  
  // Add to DOM temporarily
  document.body.appendChild(tempDiv)
  
  // Render React component using client-side rendering
  const { createRoot } = await import('react-dom/client')
  const root = createRoot(tempDiv)
  
  // Render the component
  root.render(React.createElement(TemplateComponent, { data }))
  
  // Wait for rendering to complete
  await new Promise(resolve => setTimeout(resolve, 200))
  
  // Configure html2pdf options with better compatibility
  const options = {
    margin: 0,
    filename: `${data.name.replace(/\s+/g, '_')}_resume.pdf`,
    image: { type: 'jpeg', quality: 0.95 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  }
  
  // Generate PDF blob
  const pdfBlob = await html2pdf().set(options).from(tempDiv).outputPdf('blob')
  
  // Cleanup
  root.unmount()
  document.body.removeChild(tempDiv)
  
  return pdfBlob
}