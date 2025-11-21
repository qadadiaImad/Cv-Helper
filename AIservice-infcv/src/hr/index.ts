/**
 * ACTION VERBS - MULTI-LANGUAGE SUPPORT
 * Automatically selects the correct action verbs based on CV language
 */

import * as en from './actionVerbs'
import * as fr from './actionVerbs.fr'
import * as es from './actionVerbs.es'
import * as de from './actionVerbs.de'
import * as it from './actionVerbs.it'
import * as pt from './actionVerbs.pt'
import * as nl from './actionVerbs.nl'

export type SupportedLanguage = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'nl'

/**
 * Normalizes language code to supported format
 * @param lang - Language code (e.g., "fr", "FR", "fra", "french")
 * @returns Normalized language code or 'en' as default
 */
export function normalizeLanguageCode(lang: string | undefined): SupportedLanguage {
  if (!lang) return 'en'
  
  const normalized = lang.toLowerCase().substring(0, 2)
  const supported: SupportedLanguage[] = ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl']
  
  return supported.includes(normalized as SupportedLanguage) 
    ? (normalized as SupportedLanguage) 
    : 'en'
}

/**
 * Gets action verbs module for the specified language
 * @param lang - Language code
 * @returns Action verbs module for that language
 */
export function getActionVerbsForLanguage(lang: string | undefined) {
  const normalized = normalizeLanguageCode(lang)
  
  switch (normalized) {
    case 'fr':
      return fr
    case 'es':
      return es
    case 'de':
      return de
    case 'it':
      return it
    case 'pt':
      return pt
    case 'nl':
      return nl
    case 'en':
    default:
      return en
  }
}

/**
 * Gets verbs for specific categories in the target language
 * @param categories - Array of verb categories
 * @param lang - Target language code
 * @returns Array of verbs in the target language
 */
export function getVerbsForLanguage(
  categories: en.ActionVerbCategory[],
  lang: string | undefined
): string[] {
  const module = getActionVerbsForLanguage(lang)
  return module.getVerbs(categories)
}

/**
 * Filters verbs for ATS compatibility in the target language
 * @param verbs - Array of verbs to filter
 * @param lang - Target language code
 * @returns Filtered array of verbs
 */
export function filterForATSInLanguage(
  verbs: string[],
  lang: string | undefined
): string[] {
  const module = getActionVerbsForLanguage(lang)
  return module.filterForATS(verbs)
}

/**
 * Creates a mapping from English verbs to target language verbs
 * @param targetLang - Target language code
 * @returns Map of English verb → Target language verb
 */
export function createVerbMapping(targetLang: string | undefined): Map<string, string> {
  const normalized = normalizeLanguageCode(targetLang)
  
  if (normalized === 'en') {
    return new Map() // No mapping needed for English
  }
  
  const enModule = en
  const targetModule = getActionVerbsForLanguage(normalized)
  
  const mapping = new Map<string, string>()
  
  // For each category, map English verbs to target language verbs
  for (const category of en.ACTION_VERB_CATEGORIES) {
    const enVerbs = (enModule.VERB_BANK as any)[category] || []
    const targetVerbs = (targetModule.VERB_BANK as any)[category] || []
    
    // Map by position (same order in all files)
    const maxLen = Math.min(enVerbs.length, targetVerbs.length)
    for (let i = 0; i < maxLen; i++) {
      mapping.set(enVerbs[i], targetVerbs[i])
      // Also map lowercase versions
      mapping.set(enVerbs[i].toLowerCase(), targetVerbs[i])
    }
  }
  
  return mapping
}

/**
 * Replaces English action verbs with target language verbs in text
 * @param text - Text containing potential English verbs
 * @param targetLang - Target language code
 * @returns Text with English verbs replaced
 */
export function replaceEnglishVerbs(text: string, targetLang: string | undefined): string {
  const normalized = normalizeLanguageCode(targetLang)
  
  if (normalized === 'en' || !text) {
    return text
  }
  
  const mapping = createVerbMapping(normalized)
  let result = text
  
  // Sort by length (longest first) to avoid partial replacements
  const sortedEntries = Array.from(mapping.entries()).sort((a, b) => b[0].length - a[0].length)
  
  for (const [enVerb, targetVerb] of sortedEntries) {
    // Match whole word only (case-insensitive)
    const regex = new RegExp(`\\b${enVerb}\\b`, 'gi')
    result = result.replace(regex, targetVerb)
  }
  
  return result
}

// Re-export types and constants from English (base)
export type { ActionVerbCategory } from './actionVerbs'
export { ACTION_VERB_CATEGORIES } from './actionVerbs'
