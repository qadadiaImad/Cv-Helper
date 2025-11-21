/**
 * Repetition & Buzzwords Check
 * Detects overused words and cliché buzzwords
 */

import type { ATSInput, RepetitionSection, RepeatedWord } from '../types'
import { getTopRepeatedWords, detectBuzzwords } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getFAQs } from '../utils/ui-texts'

export function checkRepetition(input: ATSInput): RepetitionSection {
  const strings = getStrings()
  
  // Get top repeated words
  const repeated = getTopRepeatedWords(input.resume_text, 15)
  
  // Identify problematic words (generic, overused)
  const problematicTerms = [
    'managed', 'responsible', 'worked', 'helped', 'assisted', 
    'participated', 'involved', 'various', 'multiple', 'several',
    'géré', 'responsable', 'travaillé', 'aidé', 'participé', 'impliqué'
  ]
  
  const topRepeatedWords: RepeatedWord[] = repeated.map(item => ({
    word: item.word,
    count: item.count,
    is_problematic: item.count > 5 || problematicTerms.includes(item.word.toLowerCase())
  }))
  
  // Detect buzzwords
  const buzzwords = detectBuzzwords(input.resume_text)
  
  // Calculate score
  let score = 100
  const problematicCount = topRepeatedWords.filter(w => w.is_problematic).length
  const buzzwordCount = buzzwords.length
  
  score -= problematicCount * 3  // -3 per problematic repetition
  score -= buzzwordCount * 5     // -5 per buzzword
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (problematicCount > 0) {
    suggestions.push(
      false
        ? `${problematicCount} mots sont répétés trop souvent. Variez votre vocabulaire et utilisez des synonymes spécifiques.`
        : `${problematicCount} words are repeated too often. Vary your vocabulary and use specific synonyms.`
    )
  }
  
  if (buzzwordCount > 0) {
    suggestions.push(
      false
        ? `Évitez les clichés (${buzzwords.slice(0, 3).join(', ')}, etc.). Remplacez-les par des faits concrets.`
        : `Avoid clichés (${buzzwords.slice(0, 3).join(', ')}, etc.). Replace them with concrete facts.`
    )
  }
  
  if (score >= 80) {
    suggestions.push(
      "Good vocabulary usage. Continue using varied and precise terms."
    )
  } else {
    suggestions.push(
      "Replace generic verbs ('managed', 'responsible for') with specific actions ('optimized', 'developed', 'led')."
    )
  }
  
  const explanation = false
    ? `Les CV trop répétitifs ou remplis de clichés donnent une impression d'artificialité. Vous avez ${problematicCount} mots surut ilisés et ${buzzwordCount} expressions clichés. Privilégiez un langage varié et authentique.`
    : `Overly repetitive resumes filled with clichés appear artificial. You have ${problematicCount} overused words and ${buzzwordCount} cliché expressions. Favor varied and authentic language.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    headline: strings.repetition_headline,
    explanation,
    top_repeated_words: topRepeatedWords.slice(0, 10),
    buzzwords_to_avoid: buzzwords,
    suggestions,
    faqs: getFAQs('repetition', 'en')
  }
}
