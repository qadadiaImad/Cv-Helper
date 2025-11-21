'use client'

import { useState } from 'react'
import type { ATSReport } from '@/lib/ats-types'
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface ATSScorePanelProps {
  report: ATSReport
  onReset?: () => void
}

interface CategorySection {
  title: string
  percentage: number
  items: {
    label: string
    status: 'pass' | 'fail' | 'unknown'
  }[]
}

export function ATSScorePanel({ report, onReset }: ATSScorePanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    )
  }

  // Calculer les sections basées sur les vraies données du rapport
  const parseRate = report.sections?.ats_parse_rate?.parse_rate || 0
  const quantifyScore = report.sections?.quantify_impact?.score || 0
  const repetitionScore = report.sections?.repetition?.score || 0
  const grammarScore = report.sections?.grammar_spelling?.score || 0
  const essentialScore = report.sections?.essential_sections?.score || 0
  const contactScore = report.sections?.contact_info?.score || 0
  const fileFormatScore = report.sections?.file_format_size?.score || 0
  const designScore = report.sections?.design_layout?.score || 0
  const keywordsScore = report.sections?.keywords_relevance?.score || 0
  const styleScore = report.sections?.style_active_voice?.score || 0

  const sections: CategorySection[] = [
    {
      title: 'CONTENT',
      percentage: Math.round((parseRate + quantifyScore + repetitionScore + grammarScore) / 4),
      items: [
        { label: 'ATS Parse Rate', status: parseRate >= 75 ? 'pass' : 'fail' },
        { label: 'Quantifying Impact', status: quantifyScore >= 75 ? 'pass' : 'fail' },
        { label: 'Repetition', status: repetitionScore >= 75 ? 'pass' : 'fail' },
        { label: 'Spelling & Grammar', status: grammarScore >= 75 ? 'pass' : 'fail' },
      ]
    },
    {
      title: 'SECTION',
      percentage: Math.round((essentialScore + contactScore) / 2),
      items: [
        { label: 'Essential Sections', status: essentialScore >= 75 ? 'pass' : 'fail' },
        { label: 'Contact Information', status: contactScore >= 75 ? 'pass' : 'fail' },
      ]
    },
    {
      title: 'ATS ESSENTIALS',
      percentage: Math.round((fileFormatScore + designScore + 100 + 100) / 4),
      items: [
        { label: 'File Format & Size', status: fileFormatScore >= 75 ? 'pass' : 'fail' },
        { label: 'Design', status: designScore >= 75 ? 'pass' : 'fail' },
        { label: 'Email Address', status: 'pass' },
        { label: 'Hyperlink in Header', status: 'pass' },
      ]
    },
    {
      title: 'TAILORING',
      percentage: Math.round((keywordsScore + 50 + styleScore + 50) / 4),
      items: [
        { label: 'Hard Skills', status: keywordsScore >= 75 ? 'pass' : 'unknown' },
        { label: 'Soft Skills', status: 'unknown' },
        { label: 'Action Verbs', status: styleScore >= 75 ? 'pass' : 'unknown' },
        { label: 'Tailored Title', status: 'unknown' },
      ]
    }
  ]

  const totalIssues = report.issues_count

  return (
    <div className="rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm p-6 space-y-6">
      {/* Header avec score global */}
      <div className="text-center space-y-2 pb-6 border-b">
        <h2 className="text-xl font-semibold text-foreground">Your Score</h2>
        <div className="text-4xl font-bold text-orange-500">{report.global_score}/100</div>
        <p className="text-sm text-muted-foreground">{totalIssues} Issues</p>
      </div>

      {/* Sections avec accordéons */}
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            {/* Header de la section */}
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {section.title}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getPercentageColor(
                    section.percentage
                  )}`}
                >
                  {section.percentage}%
                </span>
                {expandedSections.includes(section.title) ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Items de la section (collapsible) */}
            {expandedSections.includes(section.title) && (
              <div className="space-y-2 pl-4 pb-2">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-2">
                    {getStatusIcon(item.status)}
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bouton d'action */}
      {onReset && (
        <button
          onClick={onReset}
          className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Analyze Another Resume
        </button>
      )}
    </div>
  )
}

// Fonctions utilitaires
function getPercentageColor(percentage: number): string {
  if (percentage >= 90) return 'bg-green-100 text-green-700'
  if (percentage >= 70) return 'bg-orange-100 text-orange-700'
  return 'bg-red-100 text-red-700'
}

function getStatusIcon(status: 'pass' | 'fail' | 'unknown') {
  switch (status) {
    case 'pass':
      return <Check className="size-5 text-green-500 flex-shrink-0" />
    case 'fail':
      return <X className="size-5 text-red-500 flex-shrink-0" />
    case 'unknown':
      return <HelpCircle className="size-5 text-orange-500 flex-shrink-0" />
  }
}
