/**
 * UNIVERSAL RESUME DATA SCHEMA
 * This schema can represent 100% of any resume template
 * Templates are pure visual shells that consume this data
 */

export interface PersonalInfo {
  fullName: string
  title?: string
  email: string
  phone: string
  location?: string
  website?: string
  linkedIn?: string
  github?: string
  portfolio?: string
  photo?: string // URL or base64
}

export interface SocialLink {
  platform: string
  url: string
  username?: string
}

export interface Summary {
  text: string
}

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

/**
 * COMPLETE UNIVERSAL RESUME DATA MODEL
 * Every template can use any subset of this data
 */
export interface UniversalResumeData {
  // Core sections (used by 100% of templates)
  personal: PersonalInfo
  summary?: Summary
  
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
  
  // Social links (alternative to embedding in personal)
  socialLinks?: SocialLink[]
  
  // Custom sections for flexibility
  customSections?: {
    title: string
    content: string | string[]
  }[]
}

/**
 * Template Component Props
 * All new templates must use this interface
 */
export interface UniversalTemplateProps {
  data: UniversalResumeData
}
