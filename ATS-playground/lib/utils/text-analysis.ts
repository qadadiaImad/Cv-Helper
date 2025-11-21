/**
 * Text Analysis Utilities
 * Helper functions for analyzing resume text
 */

// Common stopwords (multi-language)
const STOPWORDS = new Set([
  // English stopwords
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
  'was', 'were', 'been', 'has', 'had', 'are', 'is', 'am', 'me', 'him',
  'can', 'could', 'should', 'would', 'may', 'might', 'must', 'shall',
  'who', 'what', 'when', 'where', 'why', 'how', 'which', 'whom',
  'into', 'onto', 'upon', 'over', 'under', 'about', 'after', 'before',
  
  // French stopwords
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd', 'au', 'aux',
  'à', 'et', 'ou', 'mais', 'donc', 'car', 'ni', 'or',
  'pour', 'dans', 'sur', 'avec', 'sans', 'par', 'en', 'vers', 'chez',
  "d'", "l'", "n'", "m'", "t'", "s'", "c'", "j'", "qu'", // Contractions françaises
  'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles',
  'ce', 'cet', 'cette', 'ces', 'mon', 'ton', 'son', 'ma', 'ta', 'sa',
  'mes', 'tes', 'ses', 'notre', 'votre', 'leur', 'nos', 'vos', 'leurs',
  'qui', 'que', 'quoi', 'dont', 'où', 'quand', 'comment', 'pourquoi',
  'est', 'sont', 'était', 'étaient', 'été', 'être', 'avoir', 'avait', 'avaient',
  'ai', 'as', 'a', 'avons', 'avez', 'ont', 'suis', 'es', 'sommes', 'êtes',
  'se', 'si', 'ne', 'pas', 'plus', 'moins', 'très', 'trop', 'aussi', 'bien',
  'tout', 'toute', 'tous', 'toutes', 'autre', 'autres', 'même', 'mêmes',
  'tel', 'telle', 'tels', 'telles', 'quel', 'quelle', 'quels', 'quelles',
  
  // Spanish stopwords
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'o', 'pero', 'porque', 'como', 'si', 'no',
  'del', 'al', 'con', 'sin', 'sobre', 'entre', 'hasta', 'desde',
  'yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ellos', 'ellas',
  'mi', 'tu', 'su', 'nuestro', 'vuestro', 'mis', 'tus', 'sus',
  'que', 'quien', 'cual', 'donde', 'cuando', 'cuanto',
  'es', 'son', 'era', 'eran', 'ser', 'estar', 'hay', 'había',
  'he', 'has', 'ha', 'hemos', 'habéis', 'han', 'haber',
  'muy', 'más', 'menos', 'también', 'tampoco', 'todo', 'toda', 'todos', 'todas',
  
  // German stopwords
  'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'eines',
  'und', 'oder', 'aber', 'denn', 'weil', 'wenn', 'als', 'wie',
  'in', 'an', 'auf', 'mit', 'von', 'zu', 'bei', 'nach', 'für', 'über', 'unter',
  'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'mein', 'dein', 'sein', 'unser', 'euer',
  'ist', 'sind', 'war', 'waren', 'sein', 'haben', 'hat', 'hatte', 'hatten',
  'nicht', 'kein', 'keine', 'keinen', 'keinem', 'keines',
  'auch', 'nur', 'noch', 'schon', 'mehr', 'sehr', 'viel', 'alle', 'alles'
])

// Problematic buzzwords
export const BUZZWORDS = [
  'team player', 'hard-working', 'hardworking', 'dynamic', 'innovative',
  'results-driven', 'results driven', 'passionate', 'detail-oriented',
  'detail oriented', 'synergy', 'leverage', 'paradigm', 'holistic',
  'strategic thinker', 'go-getter', 'self-starter', 'out of the box',
  'think outside the box', 'hit the ground running', 'low-hanging fruit',
  'best of breed', 'world-class', 'best in class', 'motivated', 'dedicated'
]

// Strong action verbs
export const STRONG_ACTION_VERBS = [
  'led', 'built', 'designed', 'implemented', 'optimized', 'launched',
  'created', 'developed', 'engineered', 'architected', 'established',
  'spearheaded', 'drove', 'accelerated', 'delivered', 'achieved',
  'reduced', 'increased', 'improved', 'transformed', 'streamlined',
  'automated', 'scaled', 'migrated', 'deployed', 'integrated'
]

// ATS-friendly fonts
export const ATS_SAFE_FONTS = [
  'calibri', 'arial', 'helvetica', 'georgia', 'times new roman',
  'verdana', 'cambria', 'garamond', 'tahoma', 'lato', 'montserrat',
  'open sans', 'roboto', 'source sans pro'
]

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length
}

/**
 * Extract bullets from text (lines starting with -, •, *, or similar)
 */
export function extractBullets(text: string): string[] {
  const lines = text.split('\n')
  const bullets: string[] = []
  
  for (const line of lines) {
    const trimmed = line.trim()
    // Match common bullet patterns
    if (/^[-•*→▪▸◦⦿⦾]\s+/.test(trimmed) || /^\d+[\.)]\s+/.test(trimmed)) {
      bullets.push(trimmed.replace(/^[-•*→▪▸◦⦿⦾]\s+/, '').replace(/^\d+[\.)]\s+/, ''))
    }
  }
  
  return bullets
}

/**
 * Count top repeated words (excluding stopwords)
 */
export function getTopRepeatedWords(
  text: string,
  topN: number = 15
): Array<{ word: string; count: number }> {
  // Normalize apostrophes and special characters first
  const normalized = text
    // Replace all Unicode apostrophe variants with standard apostrophe
    .replace(/[\u2018\u2019\u02BC\u02BB\u0027\u0060\u00B4]/g, "'")
    // Remove spaces around apostrophes (d ʼ expérience → d'expérience)
    .replace(/\s*'\s*/g, "'")
  
  // Normalize and tokenize (Unicode-aware to preserve accented characters)
  const words = normalized
    .toLowerCase()
    // Keep letters (including accented), numbers, spaces, hyphens, and apostrophes
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w))
  
  // Count frequencies
  const freq = new Map<string, number>()
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1)
  }
  
  // Sort by frequency
  return Array.from(freq.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)
}

/**
 * Detect buzzwords in text
 */
export function detectBuzzwords(text: string): string[] {
  const lowerText = text.toLowerCase()
  const found: string[] = []
  
  for (const buzzword of BUZZWORDS) {
    if (lowerText.includes(buzzword)) {
      found.push(buzzword)
    }
  }
  
  return [...new Set(found)]
}

/**
 * Check if a word is a strong action verb
 */
export function isStrongActionVerb(word: string): boolean {
  return STRONG_ACTION_VERBS.includes(word.toLowerCase())
}

/**
 * Estimate pages from word count
 */
export function estimatePages(wordCount: number): "1" | "2" | "3+" {
  if (wordCount < 550) return "1"
  if (wordCount < 1100) return "2"
  return "3+"
}

/**
 * Check if font is ATS-safe
 */
export function isATSSafeFont(fontName: string): boolean {
  return ATS_SAFE_FONTS.includes(fontName.toLowerCase())
}

/**
 * Detect sections in resume text
 */
export interface DetectedSections {
  has_experience: boolean
  has_education: boolean
  has_skills: boolean
  has_summary: boolean
  has_projects: boolean
  has_certifications: boolean
  has_languages: boolean
}

export function detectSections(text: string): DetectedSections {
  const lowerText = text.toLowerCase()
  
  return {
    has_experience: /\b(experience|work history|employment|professional experience)\b/i.test(lowerText),
    has_education: /\b(education|academic|degree|university|college)\b/i.test(lowerText),
    has_skills: /\b(skills|competencies|technical skills|core competencies)\b/i.test(lowerText),
    has_summary: /\b(summary|profile|objective|about|professional summary)\b/i.test(lowerText),
    has_projects: /\b(projects|portfolio|work samples)\b/i.test(lowerText),
    has_certifications: /\b(certifications|certificates|licenses)\b/i.test(lowerText),
    has_languages: /\b(languages|linguistic)\b/i.test(lowerText)
  }
}

/**
 * Detect contact information
 */
export interface DetectedContact {
  has_email: boolean
  has_phone: boolean
  has_location: boolean
  has_linkedin: boolean
  has_website: boolean
  email_professional: boolean
}

export function detectContactInfo(text: string): DetectedContact {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
  const phoneRegex = /\b(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/
  const linkedinRegex = /linkedin\.com\/in\//i
  const websiteRegex = /\b(https?:\/\/|www\.)[^\s]+\b/i
  
  const emailMatch = text.match(emailRegex)
  const hasEmail = !!emailMatch
  
  // Check email professionalism (avoid names like "cooldude123", "partyanimal", etc.)
  let emailProfessional = false
  if (emailMatch) {
    const email = emailMatch[0].toLowerCase()
    const localPart = email.split('@')[0]
    // Professional if it contains name-like patterns, not too many numbers, no slang
    const unprofessionalPatterns = /\b(cool|party|sexy|fun|crazy|dude|bro|chick|baby)\b/i
    emailProfessional = !unprofessionalPatterns.test(localPart) && 
                       (localPart.match(/\d/g) || []).length <= 3
  }
  
  return {
    has_email: hasEmail,
    has_phone: phoneRegex.test(text),
    has_location: /\b(city|state|country|location)\b/i.test(text) || /,\s*[A-Z]{2}\b/.test(text),
    has_linkedin: linkedinRegex.test(text),
    has_website: websiteRegex.test(text),
    email_professional: emailProfessional
  }
}

/**
 * Extract keywords from job description
 */
export function extractJobKeywords(jobDescription: string, topN: number = 25): string[] {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return []
  }
  
  // Extract meaningful multi-word phrases and single words
  const keywords: string[] = []
  
  // Technical skills patterns (common tech keywords)
  const techPatterns = [
    /\b(react|angular|vue|node\.?js|python|java|javascript|typescript|c\+\+|c#|ruby|go|rust|swift|kotlin)\b/gi,
    /\b(aws|azure|gcp|docker|kubernetes|k8s|terraform|jenkins|git|github|gitlab)\b/gi,
    /\b(sql|nosql|mongodb|postgresql|mysql|redis|elasticsearch)\b/gi,
    /\b(machine learning|ml|deep learning|ai|artificial intelligence|nlp|computer vision)\b/gi,
    /\b(agile|scrum|kanban|devops|ci\/cd|tdd|bdd)\b/gi,
    /\b(rest|api|graphql|microservices|serverless)\b/gi
  ]
  
  for (const pattern of techPatterns) {
    const matches = jobDescription.match(pattern)
    if (matches) {
      keywords.push(...matches.map(m => m.toLowerCase()))
    }
  }
  
  // Get frequent non-stopword terms
  const frequentWords = getTopRepeatedWords(jobDescription, 30)
  keywords.push(...frequentWords.slice(0, 10).map(w => w.word))
  
  // Deduplicate and return top N
  return [...new Set(keywords)].slice(0, topN)
}

/**
 * Check if resume contains keyword (with fuzzy matching)
 */
export function resumeContainsKeyword(resumeText: string, keyword: string): boolean {
  const lowerResume = resumeText.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  
  // Direct match
  if (lowerResume.includes(lowerKeyword)) return true
  
  // Common synonyms/variations
  const synonyms: Record<string, string[]> = {
    'javascript': ['js', 'ecmascript'],
    'typescript': ['ts'],
    'machine learning': ['ml', 'machine-learning'],
    'artificial intelligence': ['ai', 'a.i.'],
    'node.js': ['nodejs', 'node'],
    'react.js': ['react', 'reactjs'],
    'kubernetes': ['k8s'],
    'python': ['py']
  }
  
  if (synonyms[lowerKeyword]) {
    for (const syn of synonyms[lowerKeyword]) {
      if (lowerResume.includes(syn)) return true
    }
  }
  
  return false
}
