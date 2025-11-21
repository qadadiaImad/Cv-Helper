/**
 * Language Utilities
 * English-only support for ATS reports
 */

export interface LanguageStrings {
  // Global
  overall_excellent: string
  overall_good: string
  overall_fair: string
  overall_weak: string
  overall_poor: string
  
  // Status
  status_excellent: string
  status_good: string
  status_needs_improvement: string
  status_poor: string
  
  // Section headlines
  ats_parse_headline: string
  design_layout_headline: string
  keywords_relevance_headline: string
  quantify_impact_headline: string
  repetition_headline: string
  grammar_spelling_headline: string
  essential_sections_headline: string
  contact_info_headline: string
  file_format_headline: string
  length_bullets_headline: string
  style_voice_headline: string
  template_suggestions_headline: string
}

const STRINGS: LanguageStrings = {
  // Global
  overall_excellent: "Excellent! Your resume is ATS-ready and well-crafted.",
  overall_good: "Very good! Your resume is strong with only minor improvements needed.",
  overall_fair: "Fair. Your resume has several issues that should be addressed.",
  overall_weak: "Weak. Your resume has significant issues that may hurt your chances.",
  overall_poor: "Poor. Your resume needs major improvements to pass ATS systems.",
  
  // Status
  status_excellent: "Excellent",
  status_good: "Good",
  status_needs_improvement: "Needs Improvement",
  status_poor: "Poor",
  
  // Section headlines
  ats_parse_headline: "ATS Parse Rate & Structure",
  design_layout_headline: "Design & Layout",
  keywords_relevance_headline: "Keywords & Job Relevance",
  quantify_impact_headline: "Quantify Your Impact (XYZ Method)",
  repetition_headline: "Repetition & Buzzwords",
  grammar_spelling_headline: "Grammar & Spelling",
  essential_sections_headline: "Essential Sections",
  contact_info_headline: "Contact Information",
  file_format_headline: "File Format & Size",
  length_bullets_headline: "Length & Bullet Density",
  style_voice_headline: "Style & Active Voice",
  template_suggestions_headline: "Template Recommendations"
}

/**
 * Get strings (always returns English)
 */
export function getStrings(): LanguageStrings {
  return STRINGS
}

/**
 * Determine output language (always returns 'en')
 */
export function determineLanguage(): string {
  return 'en'
}

/**
 * Get overall comment based on score
 */
export function getOverallComment(score: number): string {
  const strings = getStrings()
  
  if (score >= 90) return strings.overall_excellent
  if (score >= 80) return strings.overall_good
  if (score >= 60) return strings.overall_fair
  if (score >= 40) return strings.overall_weak
  return strings.overall_poor
}

/**
 * Get status string
 */
export function getStatusString(status: string): string {
  const strings = getStrings()
  
  switch (status) {
    case 'excellent':
      return strings.status_excellent
    case 'good':
      return strings.status_good
    case 'needs_improvement':
      return strings.status_needs_improvement
    case 'poor':
      return strings.status_poor
    default:
      return status
  }
}
