/**
 * ATS Scorer
 * Calculates global ATS score from 4 pillars (25% each)
 */

import type { ATSReport, ScorePillars, SectionStatus } from './types'

/**
 * Calculate global ATS score from all sections
 * 
 * 4 Pillars (25% each):
 * 1. Technical ATS Compatibility (25%)
 * 2. Content Quality & Clarity (25%)
 * 3. Impact & Specificity (25%)
 * 4. Relevance & Keywords (25%)
 */
export function calculateGlobalScore(report: ATSReport): number {
  const pillars = calculatePillars(report)
  
  const globalScore = 
    pillars.technical_ats * 0.25 +
    pillars.content_quality * 0.25 +
    pillars.impact_specificity * 0.25 +
    pillars.relevance_keywords * 0.25
  
  return Math.round(globalScore)
}

/**
 * Calculate the 4 scoring pillars
 */
export function calculatePillars(report: ATSReport): ScorePillars {
  return {
    technical_ats: calculateTechnicalATS(report),
    content_quality: calculateContentQuality(report),
    impact_specificity: calculateImpactSpecificity(report),
    relevance_keywords: calculateRelevanceKeywords(report)
  }
}

/**
 * Pillar 1: Technical ATS Compatibility (25%)
 * - Parse rate & structure
 * - Design & layout
 * - File format & size
 * - Essential sections presence
 */
function calculateTechnicalATS(report: ATSReport): number {
  const weights = {
    ats_parse_rate: 0.35,      // 35% - Most critical
    design_layout: 0.25,       // 25%
    file_format_size: 0.20,    // 20%
    essential_sections: 0.20   // 20%
  }
  
  return (
    report.sections.ats_parse_rate.score * weights.ats_parse_rate +
    report.sections.design_layout.score * weights.design_layout +
    report.sections.file_format_size.score * weights.file_format_size +
    report.sections.essential_sections.score * weights.essential_sections
  )
}

/**
 * Pillar 2: Content Quality & Clarity (25%)
 * - Grammar & spelling
 * - Style & active voice
 * - Length & bullets
 * - Repetition & buzzwords
 */
function calculateContentQuality(report: ATSReport): number {
  const weights = {
    grammar_spelling: 0.30,     // 30%
    style_active_voice: 0.25,   // 25%
    length_and_bullets: 0.25,   // 25%
    repetition: 0.20            // 20%
  }
  
  return (
    report.sections.grammar_spelling.score * weights.grammar_spelling +
    report.sections.style_active_voice.score * weights.style_active_voice +
    report.sections.length_and_bullets.score * weights.length_and_bullets +
    report.sections.repetition.score * weights.repetition
  )
}

/**
 * Pillar 3: Impact & Specificity (25%)
 * - Quantify impact (XYZ method)
 * - Contact info completeness
 */
function calculateImpactSpecificity(report: ATSReport): number {
  const weights = {
    quantify_impact: 0.75,  // 75% - Main component
    contact_info: 0.25      // 25% - Supporting (professional presentation)
  }
  
  return (
    report.sections.quantify_impact.score * weights.quantify_impact +
    report.sections.contact_info.score * weights.contact_info
  )
}

/**
 * Pillar 4: Relevance & Keywords (25%)
 * - Keywords match (if job description provided)
 */
function calculateRelevanceKeywords(report: ATSReport): number {
  // This is primarily based on keywords_relevance score
  // If no job description was provided, this might default to a baseline
  return report.sections.keywords_relevance.score
}

/**
 * Count total issues across all sections
 */
export function countIssues(report: ATSReport): number {
  let count = 0
  
  // Count based on status and specific indicators
  const sections = report.sections
  
  // ATS Parse Rate
  if (sections.ats_parse_rate.status === 'poor' || sections.ats_parse_rate.score < 70) {
    count += sections.ats_parse_rate.suggestions.length
  } else if (sections.ats_parse_rate.status === 'needs_improvement') {
    count += Math.ceil(sections.ats_parse_rate.suggestions.length / 2)
  }
  
  // Design & Layout
  if (sections.design_layout.status !== 'excellent') {
    count += sections.design_layout.suggestions.length
  }
  
  // Keywords
  if (sections.keywords_relevance.missing_keywords.length > 0) {
    count += Math.min(sections.keywords_relevance.missing_keywords.length, 5)
  }
  
  // Impact
  if (sections.quantify_impact.examples.length > 0) {
    count += sections.quantify_impact.examples.length
  }
  
  // Repetition
  const problematicWords = sections.repetition.top_repeated_words.filter(w => w.is_problematic)
  count += problematicWords.length
  count += sections.repetition.buzzwords_to_avoid.length
  
  // Grammar
  count += sections.grammar_spelling.issues.length
  
  // Essential Sections
  if (!sections.essential_sections.has_experience) count += 1
  if (!sections.essential_sections.has_education) count += 1
  if (!sections.essential_sections.has_skills) count += 1
  
  // Contact Info
  if (!sections.contact_info.has_email) count += 1
  if (!sections.contact_info.email_professional) count += 1
  if (!sections.contact_info.has_linkedin_or_website) count += 1
  
  // File Format
  if (!sections.file_format_size.file_type_ok) count += 1
  if (!sections.file_format_size.file_size_ok) count += 1
  
  // Long bullets
  count += sections.length_and_bullets.long_bullets_examples.length
  
  // Style issues
  count += sections.style_active_voice.examples.length
  
  return count
}

/**
 * Determine section status from score
 */
export function scoreToStatus(score: number): SectionStatus {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 50) return 'needs_improvement'
  return 'poor'
}

/**
 * Normalize a score to 0-100 range
 */
export function normalizeScore(value: number, min: number, max: number): number {
  if (max === min) return 100
  const normalized = ((value - min) / (max - min)) * 100
  return Math.max(0, Math.min(100, normalized))
}
