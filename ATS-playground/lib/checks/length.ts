/**
 * Length & Bullet Density Check
 * Evaluates resume length and identifies overly long bullets
 */

import type { ATSInput, LengthBulletsSection, LongBulletExample } from '../types'
import { countWords, extractBullets, estimatePages } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'

export function checkLength(input: ATSInput): LengthBulletsSection {
  const strings = getStrings()
  
  // Count words
  const wordCount = input.extra_metadata?.word_count ?? countWords(input.resume_text)
  const estimatedPages = estimatePages(wordCount)
  
  // Extract bullets and find long ones
  const bullets = extractBullets(input.resume_text)
  const longBullets: LongBulletExample[] = []
  
  for (const bullet of bullets) {
    const bulletWordCount = countWords(bullet)
    if (bulletWordCount > 35) {
      // Shorten the bullet
      const words = bullet.split(/\s+/)
      const shortened = words.slice(0, 25).join(' ') + '...'
      
      longBullets.push({
        original_bullet: bullet,
        shorter_version: shortened
      })
      
      if (longBullets.length >= 5) break // Limit to 5 examples
    }
  }
  
  // Calculate score
  let score = 100
  
  // Penalize based on length
  if (wordCount < 250) {
    score -= 20 // Too short
  } else if (wordCount > 1200) {
    score -= 20 // Too long
  } else if (wordCount > 800 && estimatedPages === "1") {
    score -= 5 // Dense single page
  }
  
  // Penalize long bullets
  score -= longBullets.length * 5
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (wordCount < 250) {
    suggestions.push(
      false
        ? `CV trop court (${wordCount} mots, ~${estimatedPages} page). Ajoutez plus de détails sur vos expériences et compétences.`
        : `Resume too short (${wordCount} words, ~${estimatedPages} page). Add more details about your experiences and skills.`
    )
  } else if (wordCount > 1200) {
    suggestions.push(
      false
        ? `CV trop long (${wordCount} mots, ~${estimatedPages} pages). Concentrez-vous sur les 10 dernières années et les expériences les plus pertinentes.`
        : `Resume too long (${wordCount} words, ~${estimatedPages} pages). Focus on the last 10 years and most relevant experiences.`
    )
  }
  
  if (longBullets.length > 0) {
    suggestions.push(
      false
        ? `${longBullets.length} puces sont trop longues (> 35 mots). Divisez-les ou raccourcissez-les à 20-30 mots maximum.`
        : `${longBullets.length} bullets are too long (> 35 words). Split them or shorten them to 20-30 words maximum.`
    )
  }
  
  if (estimatedPages === "1") {
    suggestions.push(
      "Ideal for junior/intermediate profiles. One page is perfect!"
    )
  } else if (estimatedPages === "2") {
    suggestions.push(
      "Appropriate length for experienced profile. Two pages is good."
    )
  } else {
    suggestions.push(
      "3+ pages: reserved for very senior or academic profiles. Otherwise, reduce."
    )
  }
  
  const explanation = false
    ? `Votre CV fait environ ${wordCount} mots, soit ~${estimatedPages} page(s). Règle générale : 1 page pour juniors, 1-2 pages pour profils intermédiaires/seniors. ${longBullets.length} puces dépassent 35 mots et devraient être raccourcies.`
    : `Your resume is approximately ${wordCount} words, or ~${estimatedPages} page(s). General rule: 1 page for juniors, 1-2 pages for intermediate/senior profiles. ${longBullets.length} bullets exceed 35 words and should be shortened.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    estimated_pages: estimatedPages,
    long_bullets_examples: longBullets,
    explanation,
    suggestions
  }
}
