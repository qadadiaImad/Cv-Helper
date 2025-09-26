import type { CVData } from "./schema"
import { buildHeader, buildExperience, buildProjects, buildEducation, buildSkills } from "./fill"
import { getTemplateBase } from "../templates"

export function fillTemplate(templateId: string, data: CVData): string {
  let template = getTemplateBase(templateId)

  // Replace anchors with actual content
  template = template.replace("%HEADER", buildHeader(data))
  template = template.replace("%EDUCATION", buildEducation(data.education))
  template = template.replace("%EXPERIENCE", buildExperience(data.experience))
  template = template.replace("%PROJECTS", buildProjects(data.projects))
  template = template.replace("%SKILLS", buildSkills(data.skills))

  // Handle photo if supported and provided
  if (data.photoPath && template.includes("%PHOTO")) {
    template = template.replace("%PHOTO", `\\includegraphics[width=2.2cm]{${data.photoPath}}`)
  } else {
    template = template.replace("%PHOTO", "% Photo not provided")
  }

  return template
}

export function validateRequiredFields(templateId: string, data: Partial<CVData>): string[] {
  const template = getTemplateBase(templateId)
  const errors: string[] = []

  if (!data.fullName) errors.push("Full name is required")
  if (!data.email) errors.push("Email is required")
  if (!data.education || data.education.length === 0) {
    errors.push("At least one education entry is required")
  }
  if (!data.experience || data.experience.length === 0) {
    errors.push("At least one experience entry is required")
  }

  return errors
}
