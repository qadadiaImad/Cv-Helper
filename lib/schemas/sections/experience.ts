/**
 * EXPERIENCE SECTION SCHEMA
 * Work experience and professional history
 */

export interface Experience {
  id?: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate: string // or "Present"
  description?: string
  achievements: string[]
  technologies?: string[]
}

// Default values
export const defaultExperience: Experience = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  achievements: [],
}
