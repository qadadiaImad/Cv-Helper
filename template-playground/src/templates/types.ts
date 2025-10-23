/**
 * Type definitions for templates
 * This file provides fallback types when templates aren't synced yet
 */

export type ResumeData = {
  name: string
  email: string
  phone: string
  links: { label: string; url: string }[]
  education: { school: string; degree: string; year: string }[]
  experience: { company: string; role: string; period: string; details: string[] }[]
  projects: { title: string; description: string; link?: string }[]
  skills: string[]
}

export type TemplateCategory = 'minimal' | 'modern' | 'creative' | 'classic' | 'executive'

export interface TemplateMetadata {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tags: string[]
  author: string
  license: string
  type: 'react' | 'html' | 'latex'
  hidden: boolean
  thumbnailPath: string
  requiredFields: string[]
  features: string[]
  isNew?: boolean
  popularity?: number
}
