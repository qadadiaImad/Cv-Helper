import { escapeLatex as E } from "./escape"
import type { CVData } from "./schema"

export interface ExperienceItem {
  company: string
  title: string
  city: string
  dates: string
  bullets: string[]
}

export function buildHeader(data: CVData): string {
  const { fullName, email, phone, links } = data

  let headerContent = `\\begin{center}
    \\textbf{\\Huge \\scshape ${E(fullName)}} \\\\ \\vspace{1pt}
    \\small ${E(email)}`

  if (phone) {
    headerContent += ` $|$ ${E(phone)}`
  }

  if (links?.linkedin) {
    headerContent += ` $|$ \\href{${E(links.linkedin)}}{\\underline{LinkedIn}}`
  }

  if (links?.github) {
    headerContent += ` $|$ \\href{${E(links.github)}}{\\underline{GitHub}}`
  }

  if (links?.portfolio) {
    headerContent += ` $|$ \\href{${E(links.portfolio)}}{\\underline{Portfolio}}`
  }

  headerContent += `
\\end{center}`

  return headerContent
}

export function buildExperience(items: ExperienceItem[]): string {
  return items
    .map((exp) => {
      const bullets = exp.bullets
        .slice(0, 5)
        .map((bullet) => `      \\resumeItem{${E(bullet)}}`)
        .join("\n")

      return `    \\resumeSubheading
      {${E(exp.company)}}{${E(exp.dates)}}
      {${E(exp.title)}}{${E(exp.city)}}
      \\resumeItemListStart
${bullets}
      \\resumeItemListEnd`
    })
    .join("\n")
}

export function buildProjects(items: CVData["projects"]): string {
  return items
    .map((project) => {
      const bullets = project.bullets
        .slice(0, 3)
        .map((bullet) => `      \\resumeItem{${E(bullet)}}`)
        .join("\n")

      return `    \\resumeProjectHeading
          {\\textbf{${E(project.name)}} $|$ \\emph{${E(project.stack)}}}{${E(project.dates)}}
          \\resumeItemListStart
${bullets}
          \\resumeItemListEnd`
    })
    .join("\n")
}

export function buildEducation(items: CVData["education"]): string {
  return items
    .map(
      (edu) =>
        `    \\resumeSubheading
      {${E(edu.school)}}{${E(edu.dates)}}
      {${E(edu.degree)}}{${E(edu.city)}}`,
    )
    .join("\n")
}

export function buildSkills(skills: CVData["skills"]): string {
  const sections = []

  if (skills.languages.length > 0) {
    sections.push(`\\textbf{Languages}{: ${skills.languages.map(E).join(", ")}}`)
  }

  if (skills.frameworks.length > 0) {
    sections.push(`\\textbf{Frameworks}{: ${skills.frameworks.map(E).join(", ")}}`)
  }

  if (skills.tools.length > 0) {
    sections.push(`\\textbf{Developer Tools}{: ${skills.tools.map(E).join(", ")}}`)
  }

  return sections.map((section) => `    \\small{\\item{${section}}}`).join("\n")
}
