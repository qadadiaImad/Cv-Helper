/**
 * Essential Sections Check
 * Verifies presence of critical resume sections
 */

import type { ATSInput, EssentialSectionsSection } from '../types'
import { detectSections } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'

export function checkEssentialSections(input: ATSInput): EssentialSectionsSection {
  const strings = getStrings()
  
  const detected = detectSections(input.resume_text)
  const providedSections = input.extra_metadata?.sections || {}
  
  // Merge detected and provided
  const hasExperience = detected.has_experience || !!providedSections.experience
  const hasEducation = detected.has_education || !!providedSections.education
  const hasSkills = detected.has_skills || !!providedSections.skills
  
  const otherSections: string[] = []
  if (detected.has_summary || providedSections.summary) otherSections.push('summary')
  if (detected.has_projects || providedSections.projects) otherSections.push('projects')
  if (detected.has_certifications || providedSections.certifications) otherSections.push('certifications')
  if (detected.has_languages || providedSections.languages) otherSections.push('languages')
  
  // Calculate score
  let score = 0
  if (hasExperience) score += 40
  if (hasEducation) score += 30
  if (hasSkills) score += 30
  
  // Generate explanation and suggestions
  const suggestions: string[] = []
  const missing: string[] = []
  
  if (!hasExperience) {
    missing.push('Work Experience')
    suggestions.push(
      "Add a 'Work Experience' section with your positions in reverse chronological order."
    )
  }
  
  if (!hasEducation) {
    missing.push('Education')
    suggestions.push(
      "Add an 'Education' section with your degrees, institutions, and dates."
    )
  }
  
  if (!hasSkills) {
    missing.push('Skills')
    suggestions.push(
      "Add a 'Skills' section listing your technical skills and tools."
    )
  }
  
  if (!detected.has_summary && !providedSections.summary) {
    suggestions.push(
      "Consider adding a 'Professional Summary' at the top to present your profile in 2-3 lines."
    )
  }
  
  if (score === 100) {
    suggestions.push(
      "Excellent structure! All essential sections are present."
    )
  }
  
  const explanation = false
    ? missing.length > 0
      ? `Sections manquantes : ${missing.join(', ')}. Ces sections sont critiques pour un CV complet et structuré.`
      : `Toutes les sections essentielles sont présentes. Votre CV est bien structuré avec ${otherSections.length} sections additionnelles.`
    : missing.length > 0
      ? `Missing sections: ${missing.join(', ')}. These sections are critical for a complete and structured resume.`
      : `All essential sections are present. Your resume is well-structured with ${otherSections.length} additional sections.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    has_experience: hasExperience,
    has_education: hasEducation,
    has_skills: hasSkills,
    other_sections: otherSections,
    explanation,
    suggestions
  }
}
