export interface PersonalInfo {
  fullName: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  github: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa: string
}

export interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "language" | "other"
}

export interface CVData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  template: "modern" | "classic" | "minimal" | "creative"
}
