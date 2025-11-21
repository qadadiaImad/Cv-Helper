/**
 * Quantify Impact Check (XYZ Method)
 * Evaluates if resume bullets follow XYZ pattern:
 * Accomplished X as measured by Y, by doing Z
 */

import type { ATSInput, QuantifyImpactSection, BulletExample } from '../types'
import { extractBullets, isStrongActionVerb, STRONG_ACTION_VERBS } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'
import { getEducationalExamples } from '../utils/ui-texts'
import { getVerbsForLanguage, replaceEnglishVerbs, normalizeLanguageCode } from '../../../AIservice-infcv/src/hr'

export function checkQuantifyImpact(input: ATSInput): QuantifyImpactSection {
  const strings = getStrings()
  
  // Detect CV language from parsed data or default to 'en'
  const cvLanguage = input.parsed_cv?.metadata?.language || 'en'
  const normalizedLang = normalizeLanguageCode(cvLanguage)
  console.log(`[ATS Impact] 🌍 Detected CV language: "${cvLanguage}" → normalized: "${normalizedLang}"`)
  
  // Get action verbs in the CV's language
  const actionVerbs = getVerbsForLanguage(['leadership', 'workedOn', 'improved', 'achievement'], cvLanguage)
  console.log(`[ATS Impact] 📝 Sample verbs in ${normalizedLang}:`, actionVerbs.slice(0, 5))
  
  // Extract bullets from resume
  const bullets = extractBullets(input.resume_text)
  
  // If no bullets found, check for experience section in text
  let allBullets = bullets
  if (bullets.length === 0) {
    // Try to extract from experience section if provided
    const expSection = input.extra_metadata?.sections?.experience
    if (expSection) {
      allBullets = extractBullets(expSection)
    }
  }
  
  // Fallback: split by newlines and filter for lines that look like bullets
  if (allBullets.length === 0) {
    allBullets = input.resume_text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 20 && line.length < 200)
      .filter(line => /^[A-Z]/.test(line))
      .slice(0, 15) // Take first 15 lines
  }
  
  let score = 100
  const examples: BulletExample[] = []
  const generalTips: string[] = []
  
  // Analyze bullets with scoring system
  let strongVerbCount = 0
  let hasMetricsCount = 0
  let vagueCount = 0
  
  // Technical keywords patterns (tools, regulations, software, frameworks, etc.)
  const technicalKeywords = /\b(SQL|Python|Java|React|AWS|Azure|Docker|Kubernetes|API|REST|GraphQL|MongoDB|PostgreSQL|Git|CI\/CD|Agile|Scrum|GDPR|ISO|SOX|HIPAA|PCI|DSS|SAP|Salesforce|Tableau|Power BI|Excel|VBA|TensorFlow|PyTorch|Spark|Hadoop|Kafka|Redis|Elasticsearch|Jenkins|Terraform|Ansible|Linux|Windows|macOS|Node\.js|TypeScript|C\+\+|C#|Ruby|PHP|Swift|Kotlin|Go|Rust|Scala|R|MATLAB|SAS|SPSS|Figma|Sketch|Adobe|Photoshop|Illustrator|InDesign|Premiere|After Effects|Blender|Unity|Unreal|AutoCAD|SolidWorks|CATIA|Revit|SketchUp|3ds Max|Maya|ZBrush|Substance|Houdini|Nuke|DaVinci Resolve)\b/gi
  
  // Select all bullets for analysis
  const sampleBullets = allBullets.slice(0, 15)
  
  // Score each bullet (lower score = worse bullet)
  interface ScoredBullet {
    bullet: string
    score: number
    issues: string[]
    hasStrongVerb: boolean
    hasMetrics: boolean
    isVague: boolean
    hasTechnicalKeywords: boolean
    improved: string
  }
  
  const scoredBullets: ScoredBullet[] = []
  
  for (const bullet of sampleBullets) {
    const firstWord = bullet.split(/\s+/)[0].toLowerCase().replace(/[^a-zà-ÿ]/gi, '')
    const firstWordOriginal = bullet.split(/\s+/)[0]
    
    // Check if first word is already a good action verb in the CV's language
    const isGoodVerbInTargetLang = actionVerbs.some(verb => 
      verb.toLowerCase() === firstWord || 
      verb.toLowerCase() === firstWordOriginal.toLowerCase()
    )
    
    const hasStrongVerb = isStrongActionVerb(firstWord) || isGoodVerbInTargetLang
    const hasMetrics = /\d+%|\d+\+|\$\d+|\d+x|increased|reduced|improved|grew|saved/i.test(bullet)
    const isVague = /responsible for|worked on|helped|assisted|participated|involved in/i.test(bullet.toLowerCase())
    const hasTechnicalKeywords = technicalKeywords.test(bullet)
    
    // Calculate score (lower = worse)
    let bulletScore = 100
    const issues: string[] = []
    
    if (!hasStrongVerb) {
      bulletScore -= 30
      issues.push('lacks strong action verb')
    }
    if (!hasMetrics) {
      bulletScore -= 10
      issues.push('no quantifiable metric')
    }
    if (isVague) {
      bulletScore -= 20
      issues.push('vague phrasing')
    }
    if (!hasTechnicalKeywords) {
      bulletScore -= 20
      issues.push('no technical keywords')
    }
    if (bullet.split(/\s+/).length > 22) {
      bulletScore -= 10
      issues.push('too long')
    }
    
    // No need to generate improved version (will be blurred in UI)
    const improved = ''
    
    // Update counts for overall stats
    if (hasStrongVerb) strongVerbCount++
    if (hasMetrics) hasMetricsCount++
    if (isVague) vagueCount++
    
    scoredBullets.push({
      bullet,
      score: bulletScore,
      issues,
      hasStrongVerb,
      hasMetrics,
      isVague,
      hasTechnicalKeywords,
      improved
    })
  }
  
  // Sort by score (worst first) and select ONLY top 2 worst bullets
  scoredBullets.sort((a, b) => a.score - b.score)
  const worstBullets = scoredBullets.slice(0, 2) // Limit to exactly 2 bullets
  
  // Create examples only for the 2 worst bullets
  for (const scored of worstBullets) {
    examples.push({
      original_bullet: scored.bullet,
      analysis: scored.issues.join(', '),
      improved_bullet: scored.improved
    })
  }
  
  // Calculate score
  if (sampleBullets.length > 0) {
    const strongVerbRate = strongVerbCount / sampleBullets.length
    const metricsRate = hasMetricsCount / sampleBullets.length
    const vagueRate = vagueCount / sampleBullets.length
    
    score = Math.round(
      (strongVerbRate * 40) +  // 40 points for strong verbs
      (metricsRate * 40) +      // 40 points for metrics
      ((1 - vagueRate) * 20)    // 20 points for non-vague language
    )
  } else {
    score = 50 // No bullets found, default to fair
  }
  
  // Generate general tips
  if (false) {
    generalTips.push(
      "Utilisez la méthode XYZ : Accompli X mesuré par Y en faisant Z."
    )
    generalTips.push(
      `Commencez chaque puce par un verbe d'action fort : ${STRONG_ACTION_VERBS.slice(0, 6).join(', ')}, etc.`
    )
    generalTips.push(
      "Ajoutez des métriques spécifiques : pourcentages, montants, nombres d'utilisateurs, délais."
    )
    generalTips.push(
      "Évitez les phrases vagues comme 'responsable de', 'travaillé sur', 'aidé à'."
    )
    generalTips.push(
      "Concentrez les détails sur vos 2-3 expériences les plus récentes/pertinentes."
    )
  } else {
    generalTips.push(
      "Use the XYZ method: Accomplished X as measured by Y, by doing Z."
    )
    generalTips.push(
      `Start each bullet with a strong action verb: ${STRONG_ACTION_VERBS.slice(0, 6).join(', ')}, etc.`
    )
    generalTips.push(
      "Add specific metrics: percentages, amounts, number of users, timeframes."
    )
    generalTips.push(
      "Avoid vague phrases like 'responsible for', 'worked on', 'helped with'."
    )
    generalTips.push(
      "Focus details on your 2-3 most recent/relevant experiences."
    )
  }
  
  const explanation = false
    ? `Les recruteurs cherchent des résultats concrets, pas des responsabilités génériques. Sur ${sampleBullets.length} puces analysées : ${strongVerbCount} utilisent des verbes forts, ${hasMetricsCount} contiennent des métriques, ${vagueCount} sont trop vagues. Quantifiez vos accomplissements avec des chiffres réels.`
    : `Recruiters look for concrete results, not generic responsibilities. Out of ${sampleBullets.length} bullets analyzed: ${strongVerbCount} use strong verbs, ${hasMetricsCount} contain metrics, ${vagueCount} are too vague. Quantify your accomplishments with real numbers.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    headline: strings.quantify_impact_headline,
    explanation,
    examples,  // From user's resume
    general_tips: generalTips,
    educational_examples: getEducationalExamples('en')  // Generic teaching examples
  }
}
