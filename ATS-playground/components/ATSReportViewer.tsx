'use client'

import { useState } from 'react'
import type { ATSReport } from '../lib/types'

interface ATSReportViewerProps {
  report: ATSReport
  onReset: () => void
}

export function ATSReportViewer({ report, onReset }: ATSReportViewerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['ats_parse_rate', 'quantify_impact'])
  )
  
  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedSections(newExpanded)
  }
  
  return (
    <div className="relative">
      {/* Fixed Left Panel */}
      <div className="fixed left-0 top-20 w-80 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 p-6 overflow-y-auto shadow-lg">
        <div className="space-y-6">
          {/* Global Score */}
          <div className="text-center">
            <div className={`text-7xl font-bold ${getScoreColor(report.global_score)}`}>
              {report.global_score}
            </div>
            <div className="text-gray-500 text-sm mt-1">/ 100</div>
            <div className={`mt-3 text-lg font-semibold ${getScoreColor(report.global_score)}`}>
              {getScoreLabel(report.global_score)}
            </div>
          </div>
          
          {/* Issues Count */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Issues Found</span>
              <span className={`text-2xl font-bold ${report.issues_count > 15 ? 'text-red-600' : report.issues_count > 8 ? 'text-yellow-600' : 'text-green-600'}`}>
                {report.issues_count}
              </span>
            </div>
          </div>
          
          {/* Overall Comment */}
          <div className="text-sm text-gray-600 leading-relaxed">
            {report.overall_comment}
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Report
            </button>
            
            <button
              onClick={onReset}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Analyze Another Resume
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="border-t pt-4 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Language:</span>
              <span className="font-medium">{report.language_used.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="ml-80 p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              ATS Analysis Report
            </h1>
            <p className="text-gray-600">
              Detailed breakdown of your resume's ATS compatibility and content quality
            </p>
          </div>
          
          {/* Section: ATS Parse Rate */}
          <Section
            title={report.sections.ats_parse_rate.headline}
            score={report.sections.ats_parse_rate.score}
            status={report.sections.ats_parse_rate.status}
            explanation={report.sections.ats_parse_rate.explanation}
            suggestions={report.sections.ats_parse_rate.suggestions}
            expanded={expandedSections.has('ats_parse_rate')}
            onToggle={() => toggleSection('ats_parse_rate')}
          >
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Parse Rate:</span>
                <span className="text-2xl font-bold text-blue-700">
                  {report.sections.ats_parse_rate.parse_rate}%
                </span>
              </div>
              <p className="text-xs text-blue-700">
                This indicates how much of your resume an ATS system can successfully parse and extract.
              </p>
            </div>
          </Section>
          
          {/* Section: Design & Layout */}
          <Section
            title={report.sections.design_layout.headline}
            score={report.sections.design_layout.score}
            status={report.sections.design_layout.status}
            explanation={report.sections.design_layout.explanation}
            suggestions={report.sections.design_layout.suggestions}
            expanded={expandedSections.has('design_layout')}
            onToggle={() => toggleSection('design_layout')}
          />
          
          {/* Section: Keywords & Relevance */}
          <Section
            title={report.sections.keywords_relevance.headline}
            score={report.sections.keywords_relevance.score}
            status={report.sections.keywords_relevance.status}
            explanation={report.sections.keywords_relevance.explanation}
            suggestions={report.sections.keywords_relevance.suggestions}
            expanded={expandedSections.has('keywords')}
            onToggle={() => toggleSection('keywords')}
          >
            {report.sections.keywords_relevance.missing_keywords.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Missing Keywords:</h4>
                <div className="flex flex-wrap gap-2">
                  {report.sections.keywords_relevance.missing_keywords.slice(0, 10).map((kw, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full border border-red-200"
                    >
                      {kw.keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>
          
          {/* Section: Quantify Impact (XYZ Method) */}
          <Section
            title={report.sections.quantify_impact.headline}
            score={report.sections.quantify_impact.score}
            status={report.sections.quantify_impact.status}
            explanation={report.sections.quantify_impact.explanation}
            suggestions={report.sections.quantify_impact.general_tips}
            expanded={expandedSections.has('quantify_impact')}
            onToggle={() => toggleSection('quantify_impact')}
          >
            {report.sections.quantify_impact.examples.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-lg">Bullet Point Improvements:</h4>
                {report.sections.quantify_impact.examples.map((ex, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Original:</div>
                      <div className="text-sm text-red-700 bg-red-50 p-3 rounded border-l-4 border-red-400">
                        ❌ {ex.original_bullet}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Analysis:</div>
                      <div className="text-sm text-gray-600 italic">
                        {ex.analysis}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-medium text-gray-500 mb-1">Improved:</div>
                      <div className="text-sm text-green-700 bg-green-50 p-3 rounded border-l-4 border-green-400">
                        ✅ {ex.improved_bullet}
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  🔄 Rewrite All My Bullet Points with AI
                </button>
              </div>
            )}
          </Section>
          
          {/* Section: Repetition & Buzzwords */}
          <Section
            title={report.sections.repetition.headline}
            score={report.sections.repetition.score}
            status={report.sections.repetition.status}
            explanation={report.sections.repetition.explanation}
            suggestions={report.sections.repetition.suggestions}
            expanded={expandedSections.has('repetition')}
            onToggle={() => toggleSection('repetition')}
          >
            {report.sections.repetition.top_repeated_words.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Most Repeated Words:</h4>
                  <div className="space-y-1">
                    {report.sections.repetition.top_repeated_words.slice(0, 8).map((w, i) => (
                      <div
                        key={i}
                        className={`flex justify-between text-sm p-2 rounded ${w.is_problematic ? 'bg-yellow-50' : 'bg-gray-50'}`}
                      >
                        <span>{w.word}</span>
                        <span className="font-medium">{w.count}×</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {report.sections.repetition.buzzwords_to_avoid.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Buzzwords to Avoid:</h4>
                    <div className="space-y-1">
                      {report.sections.repetition.buzzwords_to_avoid.map((bw, i) => (
                        <div key={i} className="text-sm p-2 bg-red-50 text-red-700 rounded">
                          {bw}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Section>
          
          {/* Section: Grammar & Spelling */}
          <Section
            title={report.sections.grammar_spelling.headline}
            score={report.sections.grammar_spelling.score}
            status={report.sections.grammar_spelling.status}
            explanation={report.sections.grammar_spelling.explanation}
            suggestions={report.sections.grammar_spelling.general_tips}
            expanded={expandedSections.has('grammar')}
            onToggle={() => toggleSection('grammar')}
          >
            {report.sections.grammar_spelling.issues.length > 0 && (
              <div className="mt-4 space-y-2">
                {report.sections.grammar_spelling.issues.map((issue, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm p-3 bg-yellow-50 rounded">
                    <span className="text-yellow-600 font-medium">{issue.error_type}:</span>
                    <div className="flex-1">
                      <div className="line-through text-gray-600">{issue.original_text}</div>
                      <div className="text-green-700 font-medium">{issue.corrected_text}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
          
          {/* Section: Essential Sections */}
          <Section
            title={report.sections.essential_sections.headline}
            score={report.sections.essential_sections.score}
            status={report.sections.essential_sections.status}
            explanation={report.sections.essential_sections.explanation}
            suggestions={report.sections.essential_sections.suggestions}
            expanded={expandedSections.has('sections')}
            onToggle={() => toggleSection('sections')}
          >
            <div className="mt-4 grid grid-cols-3 gap-3">
              <SectionCheck label="Experience" present={report.sections.essential_sections.has_experience} />
              <SectionCheck label="Education" present={report.sections.essential_sections.has_education} />
              <SectionCheck label="Skills" present={report.sections.essential_sections.has_skills} />
            </div>
            
            {report.sections.essential_sections.other_sections.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Additional sections:</strong> {report.sections.essential_sections.other_sections.join(', ')}
                </p>
              </div>
            )}
          </Section>
          
          {/* Section: Contact Info */}
          <Section
            title={report.sections.contact_info.headline}
            score={report.sections.contact_info.score}
            status={report.sections.contact_info.status}
            explanation={report.sections.contact_info.explanation}
            suggestions={report.sections.contact_info.suggestions}
            expanded={expandedSections.has('contact')}
            onToggle={() => toggleSection('contact')}
          >
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ContactCheck label="Email" present={report.sections.contact_info.has_email} />
              <ContactCheck label="Phone" present={report.sections.contact_info.has_phone} />
              <ContactCheck label="Location" present={report.sections.contact_info.has_location} />
              <ContactCheck label="LinkedIn/Website" present={report.sections.contact_info.has_linkedin_or_website} />
            </div>
          </Section>
          
          {/* Section: File Format & Size */}
          <Section
            title={report.sections.file_format_size.headline}
            score={report.sections.file_format_size.score}
            status={report.sections.file_format_size.status}
            explanation={report.sections.file_format_size.explanation}
            suggestions={report.sections.file_format_size.suggestions}
            expanded={expandedSections.has('format')}
            onToggle={() => toggleSection('format')}
          >
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">File Type</div>
                <div className={`text-2xl font-bold ${report.sections.file_format_size.file_type_ok ? 'text-green-600' : 'text-red-600'}`}>
                  {report.sections.file_format_size.file_type.toUpperCase()}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">File Size</div>
                <div className={`text-2xl font-bold ${report.sections.file_format_size.file_size_ok ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.round(report.sections.file_format_size.file_size_kb)} KB
                </div>
              </div>
            </div>
          </Section>
          
          {/* Section: Length & Bullets */}
          <Section
            title={report.sections.length_and_bullets.headline}
            score={report.sections.length_and_bullets.score}
            status={report.sections.length_and_bullets.status}
            explanation={report.sections.length_and_bullets.explanation}
            suggestions={report.sections.length_and_bullets.suggestions}
            expanded={expandedSections.has('length')}
            onToggle={() => toggleSection('length')}
          >
            <div className="mt-4">
              <div className="p-4 bg-blue-50 rounded-lg inline-block">
                <div className="text-sm text-blue-700">Estimated Length</div>
                <div className="text-3xl font-bold text-blue-900">
                  {report.sections.length_and_bullets.estimated_pages} {report.sections.length_and_bullets.estimated_pages === '1' ? 'Page' : 'Pages'}
                </div>
              </div>
            </div>
          </Section>
          
          {/* Section: Style & Active Voice */}
          <Section
            title={report.sections.style_active_voice.headline}
            score={report.sections.style_active_voice.score}
            status={report.sections.style_active_voice.status}
            explanation={report.sections.style_active_voice.explanation}
            suggestions={report.sections.style_active_voice.suggestions}
            expanded={expandedSections.has('style')}
            onToggle={() => toggleSection('style')}
          >
            {report.sections.style_active_voice.examples.length > 0 && (
              <div className="mt-4 space-y-3">
                {report.sections.style_active_voice.examples.map((ex, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="text-sm">
                      <span className="text-gray-500">Before:</span>
                      <div className="text-gray-700 mt-1">{ex.original_text}</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">After:</span>
                      <div className="text-green-700 font-medium mt-1">{ex.improved_text}</div>
                    </div>
                    <div className="text-xs text-gray-500 italic">{ex.comment}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
          
          {/* Section: Template Suggestions */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📄 Recommended Templates
            </h2>
            <p className="text-gray-600 mb-6">
              {report.sections.template_suggestions.generic_call_to_action}
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              {report.sections.template_suggestions.recommended_templates.map((template, i) => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{template.template_name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{template.reason}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                    Choose Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function Section({
  title,
  score,
  status,
  explanation,
  suggestions,
  expanded,
  onToggle,
  children
}: {
  title: string
  score: number
  status: string
  explanation: string
  suggestions: string[]
  expanded: boolean
  onToggle: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="mb-6 border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
            {status.replace('_', ' ').toUpperCase()}
          </span>
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/100</span>
          <span className="text-2xl text-gray-400">{expanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {expanded && (
        <div className="p-6 pt-0 border-t">
          <p className="text-gray-700 mb-4 leading-relaxed">{explanation}</p>
          
          {suggestions.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-sm text-gray-900 mb-2">Recommendations:</h4>
              <ul className="space-y-2">
                {suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {children}
        </div>
      )}
    </div>
  )
}

function SectionCheck({ label, present }: { label: string; present: boolean }) {
  return (
    <div className={`p-3 rounded-lg text-center ${present ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="text-2xl mb-1">{present ? '✅' : '❌'}</div>
      <div className={`text-sm font-medium ${present ? 'text-green-700' : 'text-red-700'}`}>
        {label}
      </div>
    </div>
  )
}

function ContactCheck({ label, present }: { label: string; present: boolean }) {
  return (
    <div className={`p-3 rounded-lg ${present ? 'bg-green-50' : 'bg-yellow-50'}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{present ? '✅' : '⚠️'}</span>
        <span className={`text-sm font-medium ${present ? 'text-green-700' : 'text-yellow-700'}`}>
          {label}
        </span>
      </div>
    </div>
  )
}

// Helper Functions
function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600'
  if (score >= 80) return 'text-blue-600'
  if (score >= 60) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-600'
  return 'text-red-600'
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 60) return 'Fair'
  if (score >= 40) return 'Weak'
  return 'Poor'
}

function getStatusStyle(status: string): string {
  switch (status) {
    case 'excellent':
      return 'bg-green-100 text-green-800'
    case 'good':
      return 'bg-blue-100 text-blue-800'
    case 'needs_improvement':
      return 'bg-yellow-100 text-yellow-800'
    case 'poor':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
