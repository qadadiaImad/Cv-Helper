/**
 * UNIVERSAL RESUME DATA SCHEMA
 * Re-export from main schema library
 * 
 * This playground uses the same schemas as the main app
 */

// Re-export all types from the main schema library
export * from '../../../lib/schemas'

// Kept for reference - these are now defined in lib/schemas
/*
export interface Experience {
  company: string
  position: string
  location?: string
  startDate: string
  endDate: string // or "Present"
  description?: string
  achievements: string[]
  technologies?: string[]
}

export interface Education {
  institution: string
  degree: string
  field?: string
  location?: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
  coursework?: string[]
}

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

export interface Skill {
  name: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years?: number
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export interface Language {
  name: string
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic'
}

export interface Publication {
  title: string
  publisher: string
  date: string
  url?: string
  description?: string
}

export interface Award {
  title: string
  issuer: string
  date: string
  description?: string
}

export interface Volunteer {
  organization: string
  role: string
  startDate: string
  endDate: string
  description?: string
  achievements: string[]
}

export interface Interest {
  name: string
  description?: string
}

export interface Reference {
  name: string
  title: string
  company: string
  email: string
  phone: string
  relationship: string
}

// UniversalResumeData and UniversalTemplateProps are now exported from lib/schemas
*/
