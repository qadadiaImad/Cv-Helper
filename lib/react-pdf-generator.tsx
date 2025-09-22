import type { ResumeData, TemplateId } from "@/lib/react-templates"

export async function generateReactPDF(data: ResumeData, templateId: TemplateId = "classic_minimal"): Promise<Blob> {
  try {
    console.log("[v0] Starting PDF generation with browser print API")

    // Create a temporary div with the resume content
    const tempDiv = document.createElement("div")
    tempDiv.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #333;
    `

    // Generate HTML content for the resume
    const htmlContent = generateResumeHTML(data)
    tempDiv.innerHTML = htmlContent
    document.body.appendChild(tempDiv)

    // Use the browser's print functionality to generate PDF
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      throw new Error("Could not open print window")
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.name} - Resume</title>
          <style>
            @page { 
              size: A4; 
              margin: 20mm; 
            }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 14px;
              line-height: 1.5;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .header { margin-bottom: 20px; }
            .name { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
            .contact { color: #666; margin-bottom: 12px; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 12px; color: #333; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
            .item { margin-bottom: 12px; }
            .item-title { font-weight: bold; margin-bottom: 2px; }
            .item-subtitle { color: #555; margin-bottom: 2px; }
            .item-date { color: #888; font-size: 12px; margin-bottom: 4px; }
            .skills { display: flex; flex-wrap: wrap; gap: 8px; }
            .skill { background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `)
    printWindow.document.close()

    // Clean up
    document.body.removeChild(tempDiv)

    // Return a simple blob (the actual PDF generation will be handled by the browser)
    const blob = new Blob([htmlContent], { type: "text/html" })

    // Trigger print dialog
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)

    console.log("[v0] PDF generation completed")
    return blob
  } catch (error) {
    console.error("[v0] PDF generation failed:", error)
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

function generateResumeHTML(data: ResumeData): string {
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
