/**
 * SKILL SECTION SCHEMA
 * Technical and soft skills
 */

export interface Skill {
  name: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years?: number
}

export interface SkillCategory {
  id?: string
  category: string
  skills: Skill[]
}

// Default values
export const defaultSkill: Skill = {
  name: '',
}

export const defaultSkillCategory: SkillCategory = {
  category: '',
  skills: [],
}
