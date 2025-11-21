/**
 * Style & Active Voice Check
 * Evaluates use of active voice and clear, professional style
 */

import type { ATSInput, StyleActiveVoiceSection, StyleExample } from '../types'
import { extractBullets } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'

export function checkStyle(input: ATSInput): StyleActiveVoiceSection {
  const strings = getStrings()
  
  const text = input.resume_text
  const bullets = extractBullets(text)
  const examples: StyleExample[] = []
  
  let score = 100
  let passiveCount = 0
  let firstPersonCount = 0
  let jargonCount = 0
  
  // Passive voice patterns
  const passivePatterns = /\b(was|were|been|is|are) (responsible|assigned|used|managed|led)/gi
  
  // First person patterns
  const firstPersonPatterns = /\b(I|my|me|we|our|us)\b/gi
  
  // Corporate jargon
  const jargonPatterns = /\b(leverage|synergy|holistic|paradigm|transformation|drive growth|thought leader|best of breed)\b/gi
  
  // Check text for patterns
  const passiveMatches = text.match(passivePatterns)
  const firstPersonMatches = text.match(firstPersonPatterns)
  const jargonMatches = text.match(jargonPatterns)
  
  passiveCount = passiveMatches?.length || 0
  firstPersonCount = firstPersonMatches?.length || 0
  jargonCount = jargonMatches?.length || 0
  
  // Generate examples from bullets
  for (const bullet of bullets.slice(0, 10)) {
    const lowerBullet = bullet.toLowerCase()
    let hasIssue = false
    let improved = bullet
    let comment = ''
    
    // Check for passive voice
    if (passivePatterns.test(bullet)) {
      hasIssue = true
      improved = bullet.replace(/was responsible for/gi, 'managed').replace(/were used to/gi, 'used')
      comment = 'Passive → active voice'
    }
    
    // Check for first person
    if (firstPersonPatterns.test(bullet) && !hasIssue) {
      hasIssue = true
      improved = bullet.replace(/\b(I|my|me)\b/gi, '').replace(/\s+/g, ' ').trim()
      comment = 'Avoid first person'
    }
    
    // Check for jargon
    if (jargonPatterns.test(bullet) && !hasIssue) {
      hasIssue = true
      improved = bullet
        .replace(/leverage/gi, 'use')
        .replace(/synergy/gi, 'collaboration')
        .replace(/paradigm/gi, 'model')
      comment = 'Jargon → clear language'
    }
    
    if (hasIssue && examples.length < 5) {
      examples.push({
        original_text: bullet,
        improved_text: improved,
        comment
      })
    }
  }
  
  // Calculate score
  score -= passiveCount * 3
  score -= firstPersonCount * 2
  score -= jargonCount * 5
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (passiveCount > 0) {
    suggestions.push(`${passiveCount} passive voice phrases detected. Use active voice: "Developed" instead of "Was developed".`)
  }
  
  if (firstPersonCount > 0) {
    suggestions.push(`Avoid first person (I, my, we). Start directly with the action verb.`)
  }
  
  if (jargonCount > 0) {
    suggestions.push(`${jargonCount} jargon expressions detected. Prefer clear and direct language.`)
  }
  
  if (score >= 85) {
    suggestions.push(
      "Excellent style! Active voice and clear, professional language."
    )
  }
  
  const explanation = `A professional resume uses active voice, avoids first person and empty jargon. Detected: ${passiveCount} passive phrases, ${firstPersonCount} first person uses, ${jargonCount} jargon expressions. Be direct, active, and authentic.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    examples,
    explanation,
    suggestions
  }
}
