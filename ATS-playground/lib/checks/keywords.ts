/**
 * Keywords & Relevance Check
 * Matches resume against job description keywords
 */

import type { ATSInput, KeywordsRelevanceSection, KeywordItem } from '../types'
import { extractJobKeywords, resumeContainsKeyword } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'

export function checkKeywords(input: ATSInput): KeywordsRelevanceSection {
  const strings = getStrings()
  const hasJobInfo = !!(input.job_description || input.job_title_target)
  
  // If no job description provided, give baseline score
  if (!hasJobInfo) {
    return {
      score: 75,
      status: 'good',
      headline: strings.keywords_relevance_headline,
      explanation: "No job description provided. For accurate keyword analysis, add the target job description.",
      present_keywords: [],
      missing_keywords: [],
      suggestions: [
        "Identify important technical skills and keywords in your field.",
        "Integrate these keywords naturally in your summary and experience."
      ]
    }
  }
  
  // Extract keywords from job description
  const jobText = input.job_description || input.job_title_target || ''
  const jobKeywords = extractJobKeywords(jobText)
  
  // Check which keywords are present in resume
  const presentKeywords: KeywordItem[] = []
  const missingKeywords: KeywordItem[] = []
  
  for (const keyword of jobKeywords) {
    const present = resumeContainsKeyword(input.resume_text, keyword)
    
    if (present) {
      presentKeywords.push({ keyword, present: true })
    } else {
      missingKeywords.push({ keyword, present: false })
    }
  }
  
  // Calculate score based on match rate
  const matchRate = jobKeywords.length > 0 
    ? presentKeywords.length / jobKeywords.length 
    : 0.75
  
  let score = Math.round(matchRate * 100)
  
  // Generate suggestions
  const suggestions: string[] = []
  
  if (missingKeywords.length > 0) {
    const topMissing = missingKeywords.slice(0, 5).map(k => k.keyword)
    
    suggestions.push(`Important missing keywords: ${topMissing.join(', ')}. Add them if you have these skills.`)
    
    suggestions.push(
      "Integrate keywords in your 'Summary' or 'Profile' section at the top of your resume."
    )
    
    suggestions.push(
      "Mention specific tools and technologies in your recent experiences."
    )
    
    suggestions.push(
      "⚠️ ONLY add skills that you actually possess."
    )
  }
  
  if (score >= 80) {
    suggestions.push(
      "Excellent alignment with the job posting! Keep using these terms."
    )
  } else if (score >= 60) {
    suggestions.push(
      "Good alignment but there are important keywords to add."
    )
  } else {
    suggestions.push(
      "Your resume doesn't match the job enough. Adapt your content to the position requirements."
    )
  }
  
  const explanation = `ATS systems look for specific keywords from the job posting. Your resume contains ${presentKeywords.length} out of ${jobKeywords.length} important keywords (${Math.round(matchRate * 100)}% match). Integrate missing keywords if you have those skills.`
  
  return {
    score: Math.max(0, Math.min(100, score)),
    status: scoreToStatus(score),
    headline: strings.keywords_relevance_headline,
    explanation,
    present_keywords: presentKeywords,
    missing_keywords: missingKeywords,
    suggestions
  }
}
