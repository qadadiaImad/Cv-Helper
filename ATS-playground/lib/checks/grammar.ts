/**
 * Grammar & Spelling Check
 * Identifies common grammar, spelling, and style issues
 */

import type { ATSInput, GrammarSpellingSection, GrammarIssue } from '../types'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getFAQs } from '../utils/ui-texts'

export function checkGrammar(input: ATSInput): GrammarSpellingSection {
  const strings = getStrings()
  
  const text = input.resume_text
  const issues: GrammarIssue[] = []
  
  // Common grammar patterns to check
  const patterns = [
    // Missing articles
    { regex: /\b(worked on|managed|led)\s+(project|team|initiative)\b/gi, type: 'grammar' as const, fix: 'the' },
    // Inconsistent capitalization
    { regex: /\b(ceo|cto|cfo|hr|it)\b/g, type: 'word_choice' as const, fix: 'uppercase' },
    // Common misspellings
    { regex: /\brecieve\b/gi, type: 'spelling' as const, correction: 'receive' },
    { regex: /\boccured\b/gi, type: 'spelling' as const, correction: 'occurred' },
    { regex: /\bseperate\b/gi, type: 'spelling' as const, correction: 'separate' },
    { regex: /\bdefinately\b/gi, type: 'spelling' as const, correction: 'definitely' },
    // Punctuation
    { regex: /\s+,/g, type: 'punctuation' as const, fix: 'remove space before comma' },
    { regex: /\s+\./g, type: 'punctuation' as const, fix: 'remove space before period' },
  ]
  
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern.regex)
    for (const match of matches) {
      if (issues.length >= 15) break // Limit to 15 issues
      
      const original = match[0]
      let corrected = original
      
      if ('correction' in pattern) {
        corrected = pattern.correction
      } else if (pattern.fix === 'uppercase') {
        corrected = original.toUpperCase()
      } else if (pattern.fix === 'the') {
        corrected = original.replace(/(worked on|managed|led)\s+/, '$1 the ')
      }
      
      if (original !== corrected) {
        issues.push({
          original_text: original,
          corrected_text: corrected,
          error_type: pattern.type
        })
      }
    }
  }
  
  // Check for tense consistency in experience section
  const bullets = text.split('\n').filter(line => /^[-•*]/.test(line.trim()))
  let pastTenseCount = 0
  let presentTenseCount = 0
  
  for (const bullet of bullets) {
    if (/\b(ed|led|built|designed|implemented)\b/i.test(bullet)) pastTenseCount++
    if (/\b(manage|lead|build|design|implement)\b/i.test(bullet)) presentTenseCount++
  }
  
  // Calculate score
  let score = 100
  score -= issues.length * 3  // -3 per issue
  
  if (pastTenseCount > 0 && presentTenseCount > 0 && Math.abs(pastTenseCount - presentTenseCount) > 2) {
    score -= 10
  }
  
  // Generate suggestions
  const generalTips: string[] = []
  
  if (issues.length > 0) {
    generalTips.push(
      false
        ? `${issues.length} problèmes détectés. Relisez attentivement et corrigez les fautes.`
        : `${issues.length} issues detected. Carefully proofread and correct errors.`
    )
  }
  
  if (pastTenseCount > 0 && presentTenseCount > 0) {
    generalTips.push(
      "Use past tense for previous positions, present tense for current position."
    )
  }
  
  generalTips.push(
    "Have someone else proofread your resume or use a spell checker."
  )
  
  generalTips.push(
    "Check consistency: capitalization, punctuation, spacing, date formats."
  )
  
  const explanation = false
    ? `Les fautes d'orthographe et de grammaire nuisent à votre crédibilité. ${issues.length} problèmes ont été identifiés. Un CV professionnel doit être impeccable sur ces aspects.`
    : `Spelling and grammar errors damage your credibility. ${issues.length} issues were identified. A professional resume must be flawless in these areas.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    headline: strings.grammar_spelling_headline,
    explanation,
    issues: issues.slice(0, 15), // Limit to 15
    general_tips: generalTips,
    faqs: getFAQs('grammar_spelling', 'en')
  }
}
