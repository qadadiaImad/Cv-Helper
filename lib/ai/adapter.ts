/**
 * AI Service Adapter
 * Maps between AIservice ResumeJSON schema and main app UniversalResumeData
 */

import type { UniversalResumeData } from '@/lib/schemas'
import type { Experience, Education, Project, Language, Interest } from '@/lib/schemas/sections'

/**
 * AIservice ResumeJSON schema (from AIservice/lib/schema.ts)
 */
export interface AIResumeJSON {
  metadata?: {
    language?: string
    sourceOrderPreserved?: boolean
    warnings?: string[]
  }
  header: {
    fullName: string
    email?: string
    phone?: string
    links?: {
      linkedin?: string
      github?: string
      portfolio?: string
    }
  }
  summary?: string
  experience: Array<{
    company: string
    title: string
    location?: string
    startDate?: string // YYYY-MM
    endDate?: string | 'Present' // YYYY-MM or "Present"
    bullets?: string[]
  }>
  projects?: Array<{
    name: string
    dates?: string
    bullets?: string[]
  }>
  education?: Array<{
    school: string
    degree?: string
    location?: string
    dates?: string
  }>
  skills?: {
    languages?: string[]
    frameworks?: string[]
    tools?: string[]
    other?: string[]
  }
  languages?: string[]
  interests?: string[]
  otherSections?: Array<{
    title: string
    items: string[]
  }>
}

/**
 * Convert AIservice ResumeJSON to UniversalResumeData
 */
export function resumeJsonToUniversal(aiData: AIResumeJSON): UniversalResumeData {
  // Map experience
  const experience: Experience[] = aiData.experience.map(exp => ({
    company: exp.company,
    position: exp.title,
    location: exp.location || '',
    startDate: exp.startDate || '',
    endDate: exp.endDate === 'Present' ? 'Present' : (exp.endDate || ''),
    description: exp.bullets?.join('\n') || '',
    achievements: exp.bullets || [],
    technologies: [], // AIservice doesn't separate technologies
  }))

  // Map education
  const education: Education[] = (aiData.education || []).map(edu => ({
    institution: edu.school,
    degree: edu.degree || '',
    field: '',
    location: edu.location || '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: edu.dates ? [edu.dates] : [], // Store dates in honors as workaround
    coursework: [],
  }))

  // Map projects
  const projects: Project[] = (aiData.projects || []).map(proj => ({
    name: proj.name,
    description: proj.bullets?.[0] || '', // Use first bullet as description
    role: '',
    startDate: '',
    endDate: '',
    technologies: [],
    url: '',
    github: '',
    highlights: proj.bullets || [],
  }))

  // Flatten skills from categorized to simple array
  const skills: string[] = [
    ...(aiData.skills?.languages || []),
    ...(aiData.skills?.frameworks || []),
    ...(aiData.skills?.tools || []),
    ...(aiData.skills?.other || []),
  ]

  // Map languages (programming languages in skills, human languages separate)
  const languages: Language[] = (aiData.languages || []).map(lang => ({
    name: lang,
    proficiency: 'Intermediate' as const, // AIservice doesn't provide proficiency level
  }))

  // Map interests
  const interests: Interest[] = (aiData.interests || []).map(interest => ({
    name: interest,
  }))

  // Build custom sections from metadata warnings and other sections
  const customSections: Array<{ title: string; content: string | string[] }> = []
  
  if (aiData.metadata?.warnings && aiData.metadata.warnings.length > 0) {
    customSections.push({
      title: 'AI Processing Notes',
      content: aiData.metadata.warnings,
    })
  }

  if (aiData.otherSections) {
    aiData.otherSections.forEach(section => {
      customSections.push({
        title: section.title,
        content: section.items,
      })
    })
  }

  return {
    personal: {
      fullName: aiData.header.fullName,
      email: aiData.header.email || '',
      phone: aiData.header.phone || '',
      location: '',
      title: '', // Can be inferred from latest experience if needed
      website: aiData.header.links?.portfolio || '',
      linkedIn: aiData.header.links?.linkedin || '',
      github: aiData.header.links?.github || '',
      portfolio: aiData.header.links?.portfolio || '',
    },
    experience,
    education,
    skills,
    projects,
    languages,
    interests,
    summary: aiData.summary || '',
    customSections: customSections.length > 0 ? customSections : undefined,
  }
}

/**
 * Convert UniversalResumeData to plain text CV for AI processing
 */
export function universalToPlainTextCV(data: UniversalResumeData): string {
  const sections: string[] = []

  // Personal info
  sections.push('=== PERSONAL INFORMATION ===')
  sections.push(`Name: ${data.personal.fullName}`)
  if (data.personal.email) sections.push(`Email: ${data.personal.email}`)
  if (data.personal.phone) sections.push(`Phone: ${data.personal.phone}`)
  if (data.personal.location) sections.push(`Location: ${data.personal.location}`)
  if (data.personal.linkedIn) sections.push(`LinkedIn: ${data.personal.linkedIn}`)
  if (data.personal.github) sections.push(`GitHub: ${data.personal.github}`)
  if (data.personal.website) sections.push(`Website: ${data.personal.website}`)
  sections.push('')

  // Summary
  if (data.summary) {
    sections.push('=== PROFESSIONAL SUMMARY ===')
    sections.push(data.summary)
    sections.push('')
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    sections.push('=== PROFESSIONAL EXPERIENCE ===')
    data.experience.forEach(exp => {
      sections.push(`${exp.position} at ${exp.company}`)
      if (exp.location) sections.push(`Location: ${exp.location}`)
      const dates = [exp.startDate, exp.endDate].filter(Boolean).join(' - ')
      if (dates) sections.push(`Period: ${dates}`)
      if (exp.achievements && exp.achievements.length > 0) {
        exp.achievements.forEach((h: string) => sections.push(`• ${h}`))
      } else if (exp.description) {
        sections.push(exp.description)
      }
      sections.push('')
    })
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    sections.push('=== PROJECTS ===')
    data.projects.forEach(proj => {
      sections.push(`${proj.name}`)
      if (proj.url) sections.push(`URL: ${proj.url}`)
      if (proj.highlights && proj.highlights.length > 0) {
        proj.highlights.forEach(h => sections.push(`• ${h}`))
      } else if (proj.description) {
        sections.push(proj.description)
      }
      sections.push('')
    })
  }

  // Education
  if (data.education && data.education.length > 0) {
    sections.push('=== EDUCATION ===')
    data.education.forEach(edu => {
      sections.push(`${edu.degree || 'Degree'} - ${edu.institution}`)
      if (edu.location) sections.push(`Location: ${edu.location}`)
      const dates = [edu.startDate, edu.endDate].filter(Boolean).join(' - ')
      if (dates) sections.push(`Period: ${dates}`)
      if (edu.gpa) sections.push(`GPA: ${edu.gpa}`)
      if (edu.honors && edu.honors.length > 0) {
        sections.push(`Honors: ${edu.honors.join(', ')}`)
      }
      sections.push('')
    })
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    sections.push('=== SKILLS ===')
    sections.push(data.skills.join(', '))
    sections.push('')
  }

  // Languages
  if (data.languages && data.languages.length > 0) {
    sections.push('=== LANGUAGES ===')
    data.languages.forEach(lang => {
      sections.push(`${lang.name}${lang.proficiency ? ` (${lang.proficiency})` : ''}`)
    })
    sections.push('')
  }

  // Interests
  if (data.interests && data.interests.length > 0) {
    sections.push('=== INTERESTS ===')
    sections.push(data.interests.map(i => i.name).join(', '))
    sections.push('')
  }

  return sections.join('\n')
}
