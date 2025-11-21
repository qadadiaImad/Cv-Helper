/**
 * ATS Test Runner
 * Tests the ATS module with sample CVs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { analyzeCV } from '../index'
import type { ATSInput } from '../lib/types'

const SAMPLE_CVS_DIR = join(__dirname, 'sample-cvs')
const OUTPUT_DIR = join(__dirname, 'output')

async function runTests() {
  console.log('🚀 ATS Playground Test Runner\n')
  console.log('=' .repeat(60))
  
  // Test files
  const testFiles = [
    'sample-cv-good.json',
    'sample-cv-poor.json'
  ]
  
  for (const testFile of testFiles) {
    console.log(`\n📄 Testing: ${testFile}`)
    console.log('-'.repeat(60))
    
    try {
      // Read input
      const inputPath = join(SAMPLE_CVS_DIR, testFile)
      const inputData = readFileSync(inputPath, 'utf-8')
      const input: ATSInput = JSON.parse(inputData)
      
      console.log(`   Candidate: ${input.candidate_name || 'Unknown'}`)
      console.log(`   File type: ${input.file_type}`)
      console.log(`   Word count: ${input.extra_metadata?.word_count || 'N/A'}`)
      
      // Run analysis
      console.log('\n   ⏳ Running ATS analysis...')
      const startTime = Date.now()
      const report = await analyzeCV(input)
      const duration = Date.now() - startTime
      
      // Display results
      console.log(`   ✅ Analysis complete in ${duration}ms\n`)
      console.log(`   📊 RESULTS:`)
      console.log(`   Global Score: ${report.global_score}/100`)
      console.log(`   Status: ${getScoreEmoji(report.global_score)} ${getScoreLabel(report.global_score)}`)
      console.log(`   Issues Count: ${report.issues_count}`)
      console.log(`   Language Used: ${report.language_used}`)
      
      // Show section breakdown
      console.log(`\n   📋 Section Scores:`)
      const sections = report.sections
      console.log(`   - ATS Parse Rate: ${sections.ats_parse_rate.score}/100 (${sections.ats_parse_rate.status})`)
      console.log(`   - Design & Layout: ${sections.design_layout.score}/100 (${sections.design_layout.status})`)
      console.log(`   - Keywords Relevance: ${sections.keywords_relevance.score}/100 (${sections.keywords_relevance.status})`)
      console.log(`   - Quantify Impact: ${sections.quantify_impact.score}/100 (${sections.quantify_impact.status})`)
      console.log(`   - Repetition: ${sections.repetition.score}/100 (${sections.repetition.status})`)
      console.log(`   - Grammar & Spelling: ${sections.grammar_spelling.score}/100 (${sections.grammar_spelling.status})`)
      console.log(`   - Essential Sections: ${sections.essential_sections.score}/100 (${sections.essential_sections.status})`)
      console.log(`   - Contact Info: ${sections.contact_info.score}/100 (${sections.contact_info.status})`)
      console.log(`   - File Format: ${sections.file_format_size.score}/100 (${sections.file_format_size.status})`)
      console.log(`   - Length & Bullets: ${sections.length_and_bullets.score}/100 (${sections.length_and_bullets.status})`)
      console.log(`   - Style & Voice: ${sections.style_active_voice.score}/100 (${sections.style_active_voice.status})`)
      
      // Save output
      const outputFileName = testFile.replace('.json', '-report.json')
      const outputPath = join(OUTPUT_DIR, outputFileName)
      
      // Create output directory if it doesn't exist
      try {
        writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8')
        console.log(`\n   💾 Report saved to: ${outputPath}`)
      } catch (err) {
        // Try to create directory first
        const fs = require('fs')
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true })
          writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8')
          console.log(`\n   💾 Report saved to: ${outputPath}`)
        } else {
          throw err
        }
      }
      
      // Show top recommendations
      console.log(`\n   💡 Top Recommendations:`)
      const allSuggestions: string[] = []
      
      if (sections.ats_parse_rate.suggestions.length > 0) {
        allSuggestions.push(...sections.ats_parse_rate.suggestions.slice(0, 1))
      }
      if (sections.quantify_impact.examples.length > 0) {
        allSuggestions.push('Improve bullet points with XYZ method (see report)')
      }
      if (sections.keywords_relevance.missing_keywords.length > 0) {
        allSuggestions.push(`Add missing keywords: ${sections.keywords_relevance.missing_keywords.slice(0, 3).map(k => k.keyword).join(', ')}`)
      }
      
      allSuggestions.slice(0, 3).forEach((suggestion, i) => {
        console.log(`   ${i + 1}. ${suggestion}`)
      })
      
    } catch (error) {
      console.error(`   ❌ Error: ${error instanceof Error ? error.message : String(error)}`)
      if (error instanceof Error && error.stack) {
        console.error(`   Stack: ${error.stack}`)
      }
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('✨ All tests complete!\n')
}

function getScoreEmoji(score: number): string {
  if (score >= 90) return '🟢'
  if (score >= 80) return '🔵'
  if (score >= 60) return '🟡'
  if (score >= 40) return '🟠'
  return '🔴'
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 60) return 'Fair'
  if (score >= 40) return 'Weak'
  return 'Poor'
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
