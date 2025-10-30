import type { TemplateId } from "@/lib/react-templates"
import type { UniversalResumeData } from "./index"

export interface CVDocument {
  id: string
  name: string
  templateId: TemplateId
  data: UniversalResumeData
  createdAt: string
  updatedAt: string
}

export interface CVStore {
  cvs: CVDocument[]
  activeCVId: string | null
}

// Generate unique ID
export function generateCVId(): string {
  return `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get default empty CV data
export function getDefaultCVData(): UniversalResumeData {
  return {
    personal: {
      fullName: "",
      email: "",
      phone: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  }
}

// Create new CV document
export function createCVDocument(name: string, templateId: TemplateId): CVDocument {
  const now = new Date().toISOString()
  return {
    id: generateCVId(),
    name,
    templateId,
    data: getDefaultCVData(),
    createdAt: now,
    updatedAt: now,
  }
}
