/**
 * ATS Parse Rate Check
 * Evaluates how well the resume can be parsed by ATS systems
 */

import type { ATSInput, ATSParseRateSection } from '../types'
import { detectSections } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getFAQs } from '../utils/ui-texts'

export function checkParseRate(input: ATSInput): ATSParseRateSection {
  const strings = getStrings()
  let score = 100
  const suggestions: string[] = []
  
  // Check parse coverage ratio if provided
  const parseCoverage = input.parse_coverage_ratio ?? 1.0
  if (parseCoverage < 0.8) {
    score -= 20
    suggestions.push("Your resume appears to contain unparsable elements (tables, images). Simplify the layout.")
  }
  
  // Check for standard sections
  const sections = input.extra_metadata?.sections || {}
  const detected = detectSections(input.resume_text)
  
  if (!detected.has_experience && !sections.experience) {
    score -= 15
    suggestions.push("Missing or poorly formatted 'Work Experience' section. Use a standard heading.")
  }
  
  if (!detected.has_education && !sections.education) {
    score -= 10
    suggestions.push("Missing 'Education' section. Add your degrees with dates and institutions.")
  }
  
  if (!detected.has_skills && !sections.skills) {
    score -= 10
    suggestions.push("Missing 'Skills' section. List your technical skills and tools.")
  }
  
  // Check for problematic formatting patterns
  const text = input.resume_text
  
  // Multiple columns indicator (lots of short lines)
  const lines = text.split('\n')
  const shortLines = lines.filter(l => l.trim().length > 0 && l.trim().length < 30).length
  if (shortLines > lines.length * 0.4) {
    score -= 10
    suggestions.push("Avoid multi-column layouts. Stick to a single column for ATS compatibility.")
  }
  
  // Check for consistent date formats
  const datePatterns = [
    /\b\d{1,2}\/\d{4}\b/g,           // 01/2020
    /\b[A-Z][a-z]{2,8}\s+\d{4}\b/g,  // January 2020
    /\b\d{4}\s*[-–]\s*\d{4}\b/g      // 2020 - 2023
  ]
  
  let foundPatterns = 0
  for (const pattern of datePatterns) {
    if (pattern.test(text)) foundPatterns++
  }
  
  if (foundPatterns > 1) {
    score -= 5
    suggestions.push("Use a consistent date format (e.g., MM/YYYY - MM/YYYY).")
  }
  
  // Add positive note if score is good
  if (score >= 85 && suggestions.length === 0) {
    suggestions.push("Excellent structure! Your resume should parse well through ATS systems.")
  }
  
  const explanation = `ATS (Applicant Tracking Systems) automatically analyze your resume. A clear structure with standard sections and simple formatting increases your chances of being noticed. Your estimated parsing rate is ${Math.round(parseCoverage * 100)}%.`
  
  // Generate previews
  const originalPreview = getOriginalPreview(input.resume_text)
  const parsedPreview = getParsedPreview(input.parsed_cv)
  const canBuild = canBuildATSResume(input.parsed_cv)
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    headline: strings.ats_parse_headline,
    explanation,
    suggestions,
    parse_rate: Math.round(parseCoverage * 100),
    // Extended UI fields
    original_preview: originalPreview,
    parsed_preview: parsedPreview,
    can_build_ats_resume: canBuild,
    faqs: getFAQs('ats_parse_rate', 'en')
  }
}

/**
 * Generate preview of original resume text (first ~200 chars)
 */
function getOriginalPreview(text: string): string {
  const preview = text.trim().substring(0, 200)
  return preview + (text.length > 200 ? '...' : '')
}

/**
 * Generate preview of parsed resume (structured data summary)
 */
function getParsedPreview(parsedCV: any): string {
  if (!parsedCV) {
    return 'No structured data available'
  }
  
  const parts: string[] = []
  
  if (parsedCV.header?.fullName) {
    parts.push(`Name: ${parsedCV.header.fullName}`)
  }
  
  if (parsedCV.experience?.length) {
    parts.push(`Experience: ${parsedCV.experience.length} positions`)
  }
  
  if (parsedCV.education?.length) {
    parts.push(`Education: ${parsedCV.education.length} entries`)
  }
  
  if (parsedCV.skills) {
    const skillCount = Object.values(parsedCV.skills).flat().length
    parts.push(`Skills: ${skillCount} listed`)
  }
  
  return parts.length > 0 ? parts.join(' | ') : 'Minimal structured data extracted'
}

/**
 * Check if we have enough data to build an ATS-friendly resume
 */
function canBuildATSResume(parsedCV: any): boolean {
  if (!parsedCV) return false
  
  // Need at least name and one major section
  const hasName = parsedCV.header?.fullName
  const hasExperience = parsedCV.experience?.length > 0
  const hasEducation = parsedCV.education?.length > 0
  
  return Boolean(hasName && (hasExperience || hasEducation))
}
