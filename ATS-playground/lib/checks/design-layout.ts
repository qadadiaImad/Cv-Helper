/**
 * Design & Layout Check
 * Evaluates visual design and formatting from text/metadata
 */

import type { ATSInput, DesignLayoutSection } from '../types'
import { countWords, extractBullets, isATSSafeFont } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getFAQs } from '../utils/ui-texts'

export function checkDesignLayout(input: ATSInput): DesignLayoutSection {
  const strings = getStrings()
  
  let score = 100
  const suggestions: string[] = []
  
  const text = input.resume_text
  const bullets = extractBullets(text)
  const bulletCount = input.extra_metadata?.bullet_count ?? bullets.length
  const wordCount = input.extra_metadata?.word_count ?? countWords(text)
  const fontName = input.extra_metadata?.font_name
  
  // Check font if provided
  if (fontName) {
    if (!isATSSafeFont(fontName)) {
      score -= 15
      suggestions.push(`Font "${fontName}" not standard. Use Calibri, Arial, Helvetica, or Georgia for ATS.`)
    }
  }
  
  // Check bullet usage
  if (bulletCount === 0 && wordCount > 300) {
    score -= 20
    suggestions.push(
      "No bullets detected. Use bullet points (•, -, *) to structure your experiences."
    )
  } else if (bulletCount > 0 && bulletCount < 5 && wordCount > 500) {
    score -= 10
    suggestions.push(
      "Few bullets used. Transform paragraphs into bullets for better clarity."
    )
  }
  
  // Check for very long paragraphs (indicators of poor layout)
  const lines = text.split('\n')
  const longParagraphs = lines.filter(line => {
    const words = countWords(line)
    return words > 100 && !line.includes('•') && !line.includes('-')
  })
  
  if (longParagraphs.length > 2) {
    score -= 15
    suggestions.push(`${longParagraphs.length} very long paragraphs detected. Break them into short, readable bullets.`)
  }
  
  // Check for potential multi-column issues (heuristic)
  const shortLines = lines.filter(l => l.trim().length > 0 && l.trim().length < 25).length
  if (shortLines > lines.length * 0.4) {
    score -= 10
    suggestions.push("Multi-column layout suspected. Use a single column layout for ATS.")
  }
  
  // Check for ASCII art / special characters that might break parsing
  const specialChars = text.match(/[│┤┐└┴┬├─┼╭╮╯╰]/g)
  if (specialChars && specialChars.length > 5) {
    score -= 10
    suggestions.push(
      "Special characters detected (borders, boxes). Use simple formatting."
    )
  }
  
  // Positive feedback
  if (score >= 90) {
    suggestions.push(
      "Excellent design! Simple and clear layout, ATS-compatible."
    )
  } else if (score >= 75) {
    suggestions.push(
      "Good design with some minor improvements possible."
    )
  }
  
  // General best practices
  suggestions.push(
    "Prefer simple layout: one column, clear sections, standard 10-12pt font."
  )
  
  suggestions.push(
    "Avoid tables, text boxes, graphics, or images for critical information."
  )
  
  const explanation = `Visual design impacts ATS parsing. Your resume uses ${bulletCount} bullets, ${fontName ? `"${fontName}" font` : 'font not specified'}. Simple design with one column, clear sections, and standard font maximizes compatibility.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    headline: strings.design_layout_headline,
    explanation,
    suggestions,
    faqs: getFAQs('design_layout', 'en')
  }
}
