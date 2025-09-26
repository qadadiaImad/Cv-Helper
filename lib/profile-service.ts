import type { CVData } from "@/lib/latex/schema"

export interface UserProfile {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  data: CVData
  isDefault?: boolean
}

export interface JobDescription {
  id: string
  title: string
  company: string
  createdAt: string
  updatedAt: string
  content: string
  metadata?: {
    location?: string
    type?: string // full-time, part-time, contract, etc.
    remote?: boolean
    salary?: string
  }
}

export interface ProfileManager {
  profiles: UserProfile[]
  jobDescriptions: JobDescription[]
}

// Local storage keys
export const STORAGE_KEYS = {
  USER_PROFILES: 'flowcv_user_profiles',
  JOB_DESCRIPTIONS: 'flowcv_job_descriptions',
} as const

// Profile management functions
export class ProfileService {
  // User Profiles
  static getUserProfiles(): UserProfile[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILES)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static saveUserProfile(profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): UserProfile {
    const profiles = this.getUserProfiles()
    const now = new Date().toISOString()
    
    const newProfile: UserProfile = {
      ...profile,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }

    // If this is marked as default, remove default from others
    if (newProfile.isDefault) {
      profiles.forEach(p => p.isDefault = false)
    }

    profiles.push(newProfile)
    localStorage.setItem(STORAGE_KEYS.USER_PROFILES, JSON.stringify(profiles))
    return newProfile
  }

  static updateUserProfile(id: string, updates: Partial<Omit<UserProfile, 'id' | 'createdAt'>>): UserProfile | null {
    const profiles = this.getUserProfiles()
    const index = profiles.findIndex(p => p.id === id)
    
    if (index === -1) return null

    // If setting as default, remove default from others
    if (updates.isDefault) {
      profiles.forEach(p => p.isDefault = false)
    }

    profiles[index] = {
      ...profiles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEYS.USER_PROFILES, JSON.stringify(profiles))
    return profiles[index]
  }

  static deleteUserProfile(id: string): boolean {
    const profiles = this.getUserProfiles()
    const filtered = profiles.filter(p => p.id !== id)
    
    if (filtered.length === profiles.length) return false
    
    localStorage.setItem(STORAGE_KEYS.USER_PROFILES, JSON.stringify(filtered))
    return true
  }

  static getDefaultProfile(): UserProfile | null {
    const profiles = this.getUserProfiles()
    return profiles.find(p => p.isDefault) || profiles[0] || null
  }

  // Job Descriptions
  static getJobDescriptions(): JobDescription[] {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOB_DESCRIPTIONS)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static saveJobDescription(jd: Omit<JobDescription, 'id' | 'createdAt' | 'updatedAt'>): JobDescription {
    const jobDescriptions = this.getJobDescriptions()
    const now = new Date().toISOString()
    
    const newJD: JobDescription = {
      ...jd,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }

    jobDescriptions.push(newJD)
    localStorage.setItem(STORAGE_KEYS.JOB_DESCRIPTIONS, JSON.stringify(jobDescriptions))
    return newJD
  }

  static updateJobDescription(id: string, updates: Partial<Omit<JobDescription, 'id' | 'createdAt'>>): JobDescription | null {
    const jobDescriptions = this.getJobDescriptions()
    const index = jobDescriptions.findIndex(jd => jd.id === id)
    
    if (index === -1) return null

    jobDescriptions[index] = {
      ...jobDescriptions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEYS.JOB_DESCRIPTIONS, JSON.stringify(jobDescriptions))
    return jobDescriptions[index]
  }

  static deleteJobDescription(id: string): boolean {
    const jobDescriptions = this.getJobDescriptions()
    const filtered = jobDescriptions.filter(jd => jd.id !== id)
    
    if (filtered.length === jobDescriptions.length) return false
    
    localStorage.setItem(STORAGE_KEYS.JOB_DESCRIPTIONS, JSON.stringify(filtered))
    return true
  }
}
