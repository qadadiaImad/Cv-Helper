/**
 * ATS Analyzer - Main Orchestrator
 * Coordinates all checks and produces the final ATS report
 */

import type { ATSInput, ATSReport } from './types'
import { calculateGlobalScore, countIssues } from './ats-scorer'
import { determineLanguage, getOverallComment, getStrings } from './utils/language'
import { getUITexts } from './utils/ui-texts'

// Import all check modules
import { checkParseRate } from './checks/parse-rate'
import { checkDesignLayout } from './checks/design-layout'
import { checkKeywords } from './checks/keywords'
import { checkQuantifyImpact } from './checks/impact'
import { checkRepetition } from './checks/repetition'
import { checkGrammar } from './checks/grammar'
import { checkEssentialSections } from './checks/sections'
import { checkContactInfo } from './checks/contact'
import { checkFileFormat } from './checks/file-format'
import { checkLength } from './checks/length'
import { checkStyle } from './checks/style'
import { suggestTemplates } from './checks/templates'

/**
 * Main ATS Analysis Function
 * Takes resume input and returns comprehensive ATS report
 */
export async function analyzeResume(input: ATSInput): Promise<ATSReport> {
  // Validate input
  validateInput(input)
  
  // Calculate global metadata
  const wordCount = input.extra_metadata?.word_count || countWords(input.resume_text)
  const bulletCount = input.extra_metadata?.bullet_count || countBullets(input.resume_text)
  const parseCoverageRatio = input.parse_coverage_ratio || estimateParseCoverage(input)
  
  // Run all checks in parallel for performance
  const [
    atsParseRate,
    designLayout,
    keywordsRelevance,
    quantifyImpact,
    repetition,
    grammarSpelling,
    essentialSections,
    contactInfo,
    fileFormatSize,
    lengthBullets,
    styleActiveVoice,
    templateSuggestions
  ] = await Promise.all([
    Promise.resolve(checkParseRate(input)),
    Promise.resolve(checkDesignLayout(input)),
    Promise.resolve(checkKeywords(input)),
    Promise.resolve(checkQuantifyImpact(input)),
    Promise.resolve(checkRepetition(input)),
    Promise.resolve(checkGrammar(input)),
    Promise.resolve(checkEssentialSections(input)),
    Promise.resolve(checkContactInfo(input)),
    Promise.resolve(checkFileFormat(input)),
    Promise.resolve(checkLength(input)),
    Promise.resolve(checkStyle(input)),
    Promise.resolve(suggestTemplates(input))
  ])
  
  // Build report
  const report: ATSReport = {
    language_used: 'en',
    global_score: 0, // Will be calculated
    issues_count: 0, // Will be calculated
    overall_comment: '', // Will be calculated
    // Global metadata for UI
    parse_coverage_ratio: parseCoverageRatio,
    word_count: wordCount,
    bullet_count: bulletCount,
    ui_texts: getUITexts('en'),
    sections: {
      ats_parse_rate: atsParseRate,
      design_layout: designLayout,
      keywords_relevance: keywordsRelevance,
      quantify_impact: quantifyImpact,
      repetition: repetition,
      grammar_spelling: grammarSpelling,
      essential_sections: essentialSections,
      contact_info: contactInfo,
      file_format_size: fileFormatSize,
      length_and_bullets: lengthBullets,
      style_active_voice: styleActiveVoice,
      template_suggestions: templateSuggestions
    }
  }
  
  // Calculate global score and issues
  report.global_score = calculateGlobalScore(report)
  report.issues_count = countIssues(report)
  report.overall_comment = getOverallComment(report.global_score)
  
  return report
}

/**
 * Validate input to ensure required fields are present
 */
function validateInput(input: ATSInput): void {
  if (!input.resume_text || input.resume_text.trim().length === 0) {
    throw new Error('resume_text is required and cannot be empty')
  }
  
  if (!input.file_type) {
    throw new Error('file_type is required')
  }
  
  if (typeof input.file_size_kb !== 'number') {
    throw new Error('file_size_kb must be a number')
  }
}

/**
 * Helper: Count words in text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Helper: Count bullet points in text
 */
function countBullets(text: string): number {
  const bulletPatterns = /^[\s]*[-•*◦▪▫]|^[\s]*\d+\./gm
  return (text.match(bulletPatterns) || []).length
}

/**
 * Helper: Estimate parse coverage ratio
 */
function estimateParseCoverage(input: ATSInput): number {
  // If we have parsed CV data, use the provided ratio
  if (input.parse_coverage_ratio) {
    return input.parse_coverage_ratio
  }
  
  // Otherwise estimate based on available structured data
  if (input.parsed_cv) {
    // Check how much data was successfully extracted
    let coverage = 60 // Base coverage
    
    if (input.parsed_cv.header) coverage += 10
    if (input.parsed_cv.experience?.length > 0) coverage += 10
    if (input.parsed_cv.education?.length > 0) coverage += 10
    if (input.parsed_cv.skills) coverage += 5
    if (input.parsed_cv.summary) coverage += 5
    
    return Math.min(100, coverage)
  }
  
  // Default: assume moderate parsing success
  return 75
}

/**
 * Export main analysis function as default
 */
export default analyzeResume
