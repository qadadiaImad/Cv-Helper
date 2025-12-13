/**
 * BASICS SCHEMA
 * Personal information and contact details
 */

export interface PhotoConfig {
  url: string
  size?: number // Width/height in pixels (default: 120)
  aspectRatio?: number // Width/height ratio (default: 1 for square)
  borderRadius?: number // Percentage (0-50, default: 50 for circle)
  effects?: {
    hidden?: boolean // Hide photo
    grayscale?: boolean // Apply grayscale filter
    border?: boolean // Add border
  }
}

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
  photo?: PhotoConfig
  summary?: string
}

// Default values
export const defaultPhoto: PhotoConfig = {
  url: '',
  size: 120,
  aspectRatio: 1,
  borderRadius: 50,
  effects: {
    hidden: false,
    grayscale: false,
    border: false,
  },
}

export const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
}
