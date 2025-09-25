import type { ResumeData, TemplateId } from "@/lib/react-templates"

/**
 * Generate a PDF on the client by rendering a sanitized HTML template
 * into an isolated iframe, rasterizing it with html2canvas, then
 * embedding the bitmap inside a jsPDF document.
 */
export async function generateReactPDF(
  data: ResumeData,
  templateId: TemplateId = "classic_minimal"
): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("generateReactPDF must be called in the browser")
  }

  const { default: jsPDF } = await import("jspdf")
  const { default: html2canvas } = await import("html2canvas")

  const iframe = document.createElement("iframe")
  iframe.style.position = "fixed"
  iframe.style.top = "-10000px"
  iframe.style.left = "-10000px"
  iframe.style.width = "210mm"
  iframe.style.height = "297mm"
  iframe.style.visibility = "hidden"
  document.body.appendChild(iframe)

  try {
    await new Promise<void>((resolve) => {
      iframe.onload = () => resolve()
      iframe.src = "about:blank"
    })

    const iframeDoc = iframe.contentDocument
    if (!iframeDoc) {
      throw new Error("Unable to access iframe document")
    }

    const htmlBody = buildTemplateHtml(data, templateId)

    iframeDoc.open()
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            *, *::before, *::after { box-sizing: border-box; }
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              font-size: 12px;
              line-height: 1.45;
              color: #1f2937;
              background: #ffffff;
            }
            h1, h2, h3, h4 { margin: 0; }
            .page {
              width: 210mm;
              min-height: 297mm;
              padding: 22mm 24mm;
              display: flex;
              flex-direction: column;
              gap: 18px;
            }
            .section-title {
              font-size: 16px;
              font-weight: 700;
              margin-bottom: 8px;
              color: #111827;
            }
            .muted { color: #6b7280; }
            .pill {
              display: inline-block;
              padding: 4px 8px;
              margin: 0 6px 6px 0;
              border-radius: 9999px;
              background: #f3f4f6;
              font-size: 11px;
            }
            .timeline {
              border-left: 2px solid #e5e7eb;
              padding-left: 14px;
            }
            .timeline-item {
              position: relative;
              margin-bottom: 16px;
            }
            .timeline-item::before {
              content: "";
              position: absolute;
              left: -15px;
              top: 4px;
              width: 8px;
              height: 8px;
              border-radius: 999px;
              background: #1d4ed8;
            }
          </style>
        </head>
        <body>
          ${htmlBody}
        </body>
      </html>
    `)
    iframeDoc.close()

    const pageElement = iframeDoc.querySelector(".page") as HTMLElement | null
    if (!pageElement) {
      throw new Error("PDF template failed to render")
    }

    await new Promise((resolve) => requestAnimationFrame(resolve))

    const canvas = await html2canvas(pageElement, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      windowWidth: pageElement.scrollWidth,
      windowHeight: pageElement.scrollHeight,
    })

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true })
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgData = canvas.toDataURL("image/jpeg", 0.98)

    const imgHeight = (canvas.height * pdfWidth) / canvas.width
    const yOffset = imgHeight > pdfHeight ? 0 : (pdfHeight - imgHeight) / 2

    pdf.addImage(imgData, "JPEG", 0, yOffset, pdfWidth, imgHeight, undefined, "FAST")

    return pdf.output("blob")
  } finally {
    document.body.removeChild(iframe)
  }
}

type NormalisedResumeData = ReturnType<typeof normaliseResumeData>

function buildTemplateHtml(data: ResumeData, templateId: TemplateId): string {
  const safe = normaliseResumeData(data)

  const templates: Record<TemplateId, (d: NormalisedResumeData) => string> = {
    classic_minimal: renderClassicMinimal,
    modern_blue: renderModernBlue,
    creative_gradient: renderCreativeGradient,
    elegant_black: renderElegantBlack,
    compact_cards: renderClassicMinimal,
    timeline_modern: renderModernBlue,
    corporate_clean: renderClassicMinimal,
    lofi_minimal: renderClassicMinimal,
    color_blocks: renderModernBlue,
    european_standard: renderClassicMinimal,
  }

  const renderer = templates[templateId] ?? renderClassicMinimal
  return renderer(safe)
}

function normaliseResumeData(data: ResumeData) {
  return {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    location: escapeHtml((data as any).location ?? ""),
    summary: escapeHtml((data as any).summary ?? ""),
    links: (data.links ?? []).map((link) => ({
      label: escapeHtml(link.label),
      url: escapeHtml(link.url),
    })),
    experience: (data.experience ?? []).map((exp) => ({
      company: escapeHtml((exp as any).company ?? ""),
      role: escapeHtml((exp as any).role ?? (exp as any).position ?? ""),
      period: escapeHtml((exp as any).period ?? formatDateRange((exp as any).startDate, (exp as any).endDate)),
      details: Array.isArray((exp as any).details)
        ? (exp as any).details.map((detail: string) => escapeHtml(detail))
        : escapeHtml((exp as any).description ?? "").split("\n").filter(Boolean),
    })),
    education: (data.education ?? []).map((edu) => ({
      school: escapeHtml((edu as any).school ?? (edu as any).institution ?? ""),
      degree: escapeHtml((edu as any).degree ?? ""),
      year: escapeHtml((edu as any).year ?? formatDateRange((edu as any).startDate, (edu as any).endDate)),
      details: escapeHtml((edu as any).description ?? ""),
    })),
    projects: (data.projects ?? []).map((proj) => ({
      title: escapeHtml((proj as any).title ?? ""),
      description: escapeHtml((proj as any).description ?? ""),
      link: escapeHtml((proj as any).link ?? ""),
    })),
    skills: (data.skills ?? []).map((skill) => escapeHtml(skill)),
  }
}

function renderClassicMinimal(data: NormalisedResumeData): string {
  return `
    <div class="page">
      <header>
        <h1 style="font-size:26px;font-weight:700;margin-bottom:4px;">${data.name}</h1>
        <div class="muted" style="margin-bottom:6px;">${joinNonEmpty([data.email, data.phone, data.location], " | ")}</div>
        ${data.summary ? `<p style="margin:0 0 10px 0;">${data.summary}</p>` : ""}
        ${data.links.length ? `
          <div style="display:flex;gap:12px;font-size:12px;">
            ${data.links.map((link) => `<span>${link.label}${link.url ? `: ${link.url}` : ""}</span>`).join("")}
          </div>
        ` : ""}
      </header>
      ${renderExperienceSection(data)}
      ${renderEducationSection(data)}
      ${renderProjectsSection(data)}
      ${renderSkillsSection(data)}
    </div>
  `
}

function renderModernBlue(data: NormalisedResumeData): string {
  return `
    <div class="page" style="padding:0;">
      <div style="background:#1d4ed8;color:#ffffff;padding:24px 28px;">
        <h1 style="font-size:26px;font-weight:700;margin-bottom:6px;">${data.name}</h1>
        <div style="opacity:0.85;">${joinNonEmpty([data.email, data.phone, data.location], " | ")}</div>
      </div>
      <div style="padding:24px 28px;display:flex;flex-direction:column;gap:18px;">
        ${renderExperienceSection(data)}
        ${renderProjectsSection(data)}
        ${renderEducationSection(data)}
        ${renderSkillsSection(data)}
      </div>
    </div>
  `
}

function renderCreativeGradient(data: NormalisedResumeData): string {
  return `
    <div class="page" style="padding:30px;background:linear-gradient(135deg,#8b5cf6 0%,#ec4899 100%);color:#ffffff;">
      <header>
        <h1 style="font-size:30px;font-weight:700;margin-bottom:6px;">${data.name}</h1>
        <div style="opacity:0.9;margin-bottom:12px;">${joinNonEmpty([data.email, data.phone, data.location], " | ")}</div>
        ${data.summary ? `<p style="margin:0 0 16px 0;">${data.summary}</p>` : ""}
      </header>
      <div class="timeline">
        ${data.experience
          .map(
            (exp) => `
              <div class="timeline-item">
                <div style="font-size:16px;font-weight:600;">${exp.role}</div>
                <div style="opacity:0.9;">${exp.company}</div>
                <div style="opacity:0.75;font-size:11px;margin-bottom:6px;">${exp.period}</div>
                ${exp.details.length ? `<div style="opacity:0.85;font-size:12px;">${exp.details.join("<br/>")}</div>` : ""}
              </div>
            `
          )
          .join("")}
      </div>
      ${renderSkillsSection(data)}
    </div>
  `
}

function renderElegantBlack(data: NormalisedResumeData): string {
  return `
    <div class="page" style="background:#171717;color:#f9fafb;">
      <header>
        <h1 style="font-size:26px;font-weight:700;margin-bottom:4px;">${data.name}</h1>
        <div class="muted" style="color:#d1d5db;">${joinNonEmpty([data.email, data.phone, data.location], " | ")}</div>
      </header>
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:18px;">
        <aside>
          ${renderSkillsSection(data)}
          ${data.links.length ? `
            <section>
              <div class="section-title" style="color:#f3f4f6;">Links</div>
              <div style="display:flex;flex-direction:column;gap:6px;font-size:12px;">
                ${data.links.map((link) => `<span>${link.label}${link.url ? `: ${link.url}` : ""}</span>`).join("")}
              </div>
            </section>
          ` : ""}
        </aside>
        <main style="display:flex;flex-direction:column;gap:18px;">
          ${renderExperienceSection(data)}
          ${renderProjectsSection(data)}
          ${renderEducationSection(data)}
        </main>
      </div>
    </div>
  `
}

function renderExperienceSection(data: NormalisedResumeData): string {
  if (!data.experience.length) return ""
  return `
    <section>
      <div class="section-title">Experience</div>
      ${data.experience
        .map(
          (exp) => `
            <div style="margin-bottom:12px;">
              <div style="font-weight:600;">${exp.role}${exp.company ? ` · ${exp.company}` : ""}</div>
              ${exp.period ? `<div class="muted" style="font-size:11px;">${exp.period}</div>` : ""}
              ${exp.details.length ? `<div style="margin-top:4px;font-size:12px;">${exp.details.join("<br/>")}</div>` : ""}
            </div>
          `
        )
        .join("")}
    </section>
  `
}

function renderEducationSection(data: NormalisedResumeData): string {
  if (!data.education.length) return ""
  return `
    <section>
      <div class="section-title">Education</div>
      ${data.education
        .map(
          (edu) => `
            <div style="margin-bottom:10px;">
              <div style="font-weight:600;">${edu.degree}</div>
              <div class="muted" style="font-size:12px;">${joinNonEmpty([edu.school, edu.year], " · ")}</div>
              ${edu.details ? `<div style="margin-top:4px;font-size:12px;">${edu.details}</div>` : ""}
            </div>
          `
        )
        .join("")}
    </section>
  `
}

function renderProjectsSection(data: NormalisedResumeData): string {
  if (!data.projects.length) return ""
  return `
    <section>
      <div class="section-title">Projects</div>
      ${data.projects
        .map(
          (proj) => `
            <div style="margin-bottom:10px;">
              <div style="font-weight:600;">${proj.title}</div>
              ${proj.description ? `<div style="font-size:12px;">${proj.description}</div>` : ""}
              ${proj.link ? `<div class="muted" style="font-size:11px;">${proj.link}</div>` : ""}
            </div>
          `
        )
        .join("")}
    </section>
  `
}

function renderSkillsSection(data: NormalisedResumeData): string {
  if (!data.skills.length) return ""
  return `
    <section>
      <div class="section-title">Skills</div>
      <div>
        ${data.skills.map((skill) => `<span class="pill">${skill}</span>`).join("")}
      </div>
    </section>
  `
}

function escapeHtml(value?: string | null): string {
  if (!value) return ""
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function joinNonEmpty(parts: string[], separator: string): string {
  return parts.filter((part) => part && part.trim().length > 0).join(separator)
}

function formatDateRange(start?: string, end?: string): string {
  const trimmedStart = start ? start.toString().trim() : ""
  const trimmedEnd = end ? end.toString().trim() : ""
  if (!trimmedStart && !trimmedEnd) return ""
  if (trimmedStart && trimmedEnd) return `${trimmedStart} - ${trimmedEnd}`
  return trimmedStart || trimmedEnd
}
