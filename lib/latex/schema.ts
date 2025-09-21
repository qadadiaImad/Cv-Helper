export interface CVData {
  fullName: string
  email: string
  phone?: string
  links?: {
    linkedin?: string
    github?: string
    portfolio?: string
  }
  education: Array<{
    school: string
    city: string
    degree: string
    dates: string
  }>
  experience: Array<{
    company: string
    title: string
    city: string
    dates: string
    bullets: string[]
  }>
  projects: Array<{
    name: string
    stack: string
    dates: string
    bullets: string[]
  }>
  skills: {
    languages: string[]
    frameworks: string[]
    tools: string[]
  }
  photoPath?: string
}

export interface TemplateConfig {
  id: string
  name: string
  description: string
  previewPath: string
  basePath: string
  supportsPhoto: boolean
  requiredFields: string[]
}

export interface CompileRequest {
  tex: string
  filename?: string
}

export interface AdaptRequest {
  cv_text: string
  jd_text: string
  template_id: string
  language?: "fr" | "en"
}

export interface AdaptResponse {
  tex: string
  warnings: string[]
}
