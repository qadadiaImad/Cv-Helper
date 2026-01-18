/**
 * EDUCATION SECTION SCHEMA
 * Academic background and qualifications
 */

export interface Education {
  id?: string
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

// Default values
export const defaultEducation: Education = {
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
}
