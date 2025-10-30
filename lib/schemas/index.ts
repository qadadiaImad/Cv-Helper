/**
 * SCHEMA LIBRARY INDEX
 * Modular schema architecture inspired by Reactive-Resume
 * 
 * Structure:
 * - basics/      Personal information
 * - sections/    Resume sections (experience, education, etc.)
 * - shared/      Shared types and utilities
 */

import type { PersonalInfo } from './basics'
import type {
  Experience,
  Education,
  Project,
  Skill,
  SkillCategory,
  Certification,
  Language,
  Award,
  Volunteer,
  Publication,
  Interest,
  Reference,
} from './sections'

// Export all schemas
export * from './basics'
export * from './sections'
export * from './shared'

/**
 * COMPLETE UNIVERSAL RESUME DATA MODEL
 * Main data structure that combines all sections
 */
export interface UniversalResumeData {
  // Core sections (used by 100% of templates)
  personal: PersonalInfo
  
  // Professional sections
  experience: Experience[]
  education: Education[]
  
  // Skills (can be flat or categorized)
  skills?: string[] // Simple list
  skillCategories?: SkillCategory[] // Categorized
  
  // Optional sections
  projects?: Project[]
  certifications?: Certification[]
  languages?: Language[]
  publications?: Publication[]
  awards?: Award[]
  volunteer?: Volunteer[]
  interests?: Interest[]
  references?: Reference[]
  
  // Summary/objective
  summary?: string
  
  // Custom sections for flexibility
  customSections?: {
    title: string
    content: string | string[]
  }[]
}

/**
 * Template Component Props
 * All templates must use this interface
 */
export interface UniversalTemplateProps {
  data: UniversalResumeData
}
