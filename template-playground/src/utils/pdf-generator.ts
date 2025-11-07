import type { UniversalResumeData } from '../templates/universal-schema'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Generate a PDF on the client by rendering a React component
 * into an isolated iframe, rasterizing it with html2canvas, then
 * embedding the bitmap inside a jsPDF document.
 * 
 * This is the EXACT same mechanism used in CV-Helper main project.
 */
export async function generatePDFFromTemplate(
  templateElement: HTMLElement,
  data: UniversalResumeData,
  templateName: string
): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('generatePDFFromTemplate must be called in the browser')
  }

  // Create an isolated iframe for rendering
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.top = '-10000px'
  iframe.style.left = '-10000px'
  iframe.style.width = '210mm' // A4 width
  iframe.style.height = '297mm' // A4 height
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)

  try {
    // Wait for iframe to load
    await new Promise<void>((resolve) => {
      iframe.onload = () => resolve()
      iframe.src = 'about:blank'
    })

    const iframeDoc = iframe.contentDocument
    if (!iframeDoc) {
      throw new Error('Unable to access iframe document')
    }

    // Clone the template element's HTML
    const clonedContent = templateElement.cloneNode(true) as HTMLElement

    // Write to iframe with proper styling
    iframeDoc.open()
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            *, *::before, *::after { 
              box-sizing: border-box; 
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #ffffff;
            }
            /* Copy all styles from parent document */
            ${getComputedStyles()}
          </style>
        </head>
        <body>
          <div id="pdf-content"></div>
        </body>
      </html>
    `)
    iframeDoc.close()

    // Insert the cloned content
    const contentContainer = iframeDoc.getElementById('pdf-content')
    if (contentContainer) {
      contentContainer.appendChild(clonedContent)
    }

    // Wait for rendering
    await new Promise((resolve) => requestAnimationFrame(resolve))

    // Capture the content with html2canvas
    const pageElement = iframeDoc.body
    const canvas = await html2canvas(pageElement, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality
      useCORS: true,
      allowTaint: false,
      logging: false,
      windowWidth: pageElement.scrollWidth,
      windowHeight: pageElement.scrollHeight,
    })

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true,
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgData = canvas.toDataURL('image/jpeg', 0.98)

    const imgHeight = (canvas.height * pdfWidth) / canvas.width
    const yOffset = imgHeight > pdfHeight ? 0 : (pdfHeight - imgHeight) / 2

    pdf.addImage(imgData, 'JPEG', 0, yOffset, pdfWidth, imgHeight, undefined, 'FAST')

    // Generate filename from user's name or template name
    const fileName = data.personal?.fullName
      ? `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : `${templateName.replace(/\s+/g, '_')}_Resume.pdf`

    pdf.save(fileName)
  } finally {
    document.body.removeChild(iframe)
  }
}

/**
 * Get computed styles from the parent document to apply in iframe
 */
function getComputedStyles(): string {
  const styles: string[] = []
  
  // Get all stylesheets from the parent document
  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      if (styleSheet.cssRules) {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          styles.push(rule.cssText)
        })
      }
    } catch (e) {
      // Cross-origin stylesheets may throw errors, skip them
      console.warn('Could not access stylesheet:', e)
    }
  })

  return styles.join('\n')
}
