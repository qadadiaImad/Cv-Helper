/**
 * PROJECT SECTION SCHEMA
 * Personal and professional projects
 */

export interface Project {
  name: string
  description: string
  role?: string
  startDate?: string
  endDate?: string
  technologies: string[]
  url?: string
  github?: string
  highlights: string[]
}

// Default values
export const defaultProject: Project = {
  name: '',
  description: '',
  technologies: [],
  highlights: [],
}
