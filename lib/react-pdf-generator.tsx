import type { ResumeData, TemplateId } from "@/lib/react-templates"

export async function generateReactPDF(data: ResumeData, templateId: TemplateId = "classic_minimal"): Promise<Blob> {
  try {
    console.log("[v0] Starting PDF generation with jsPDF")

    // Dynamically import jsPDF and html2canvas
    const { default: jsPDF } = await import('jspdf')
    const { default: html2canvas } = await import('html2canvas')

    // Create a temporary div with the resume content
    const tempDiv = document.createElement("div")
    tempDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12px;
      line-height: 1.5;
      color: #333;
      z-index: -9999;
      overflow: hidden;
    `

    // Generate HTML content for the resume
    const htmlContent = generateResumeHTML(data, templateId)
    tempDiv.innerHTML = htmlContent
    document.body.appendChild(tempDiv)

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 500))

    // Create PDF with jsPDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      putOnlyUsedFonts: true,
      precision: 16
    })

    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: tempDiv.scrollWidth,
      windowHeight: tempDiv.scrollHeight
    })

    // Add canvas to PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight)
    const imgWidth = canvasWidth * ratio
    const imgHeight = canvasHeight * ratio
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST')

    // Clean up
    document.body.removeChild(tempDiv)

    // Generate PDF blob
    const pdfBlob = pdf.output('blob')
    console.log("[v0] PDF generation completed successfully")
    return pdfBlob
  } catch (error) {
    console.error("[v0] PDF generation failed:", error)
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

function generateResumeHTML(data: ResumeData, templateId: TemplateId = 'classic_minimal'): string {
  return `
    <div class="header">
      <div class="name">${data.name}</div>
      <div class="contact">${data.email} | ${data.phone} | ${data.location || ""}</div>
      ${data.summary ? `<div>${data.summary}</div>` : ""}
    </div>

    ${
      data.experience && data.experience.length > 0
        ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${data.experience
          .map(
            (exp) => `
          <div class="item">
            <div class="item-title">${exp.position}</div>
            <div class="item-subtitle">${exp.company}</div>
            <div class="item-date">${exp.startDate} - ${exp.endDate || "Present"}</div>
            ${exp.description ? `<div>${exp.description}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""
    }

    ${
      data.education && data.education.length > 0
        ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${data.education
          .map(
            (edu) => `
          <div class="item">
            <div class="item-title">${edu.degree}</div>
            <div class="item-subtitle">${edu.institution}</div>
            <div class="item-date">${edu.startDate} - ${edu.endDate || "Present"}</div>
            ${edu.description ? `<div>${edu.description}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    `
        : ""
    }

    ${
      data.skills && data.skills.length > 0
        ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
          ${data.skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
        </div>
      </div>
    `
        : ""
    }
  `
}
