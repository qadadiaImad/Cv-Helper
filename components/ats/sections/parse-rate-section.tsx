'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ATSParseRateSection } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FAQAccordion } from '../faq-accordion'
import { CVPreviewToggle } from '../cv-preview-toggle'

interface ParseRateSectionProps {
  section: ATSParseRateSection
  uiTexts: { [key: string]: string }
  pdfFile?: File
  parsedData?: any
}

export function ParseRateSection({ section, uiTexts, pdfFile, parsedData }: ParseRateSectionProps) {
  const [selectedOption, setSelectedOption] = useState<'original' | 'optimized'>('original')

  return (
    <Card id="parse-rate">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">{section.headline}</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Parse Rate Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">ATS Parse Rate</span>
            <span className="font-bold text-primary">{section.parse_rate}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
              style={{ width: `${section.parse_rate}%` }}
            />
          </div>
        </div>

        {/* CV Preview with Toggle */}
        {pdfFile && parsedData ? (
          <CVPreviewToggle pdfFile={pdfFile} parsedData={parsedData} />
        ) : (
          /* Fallback: Original Preview Cards */
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Original Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-xs text-muted-foreground">
                  {section.original_preview}
                </pre>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Parsed Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{section.parsed_preview}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Build Resume Button */}
        {section.can_build_ats_resume && (
          <Button size="lg" className="w-full">
            {uiTexts.cta_build_ats_resume || 'Build ATS-friendly resume'}
          </Button>
        )}

        {/* Suggestions */}
        {section.suggestions.length > 0 && (
          <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950/20">
            <p className="mb-2 text-sm font-semibold text-orange-900 dark:text-orange-100">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-orange-800 dark:text-orange-200">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQs */}
        {section.faqs && section.faqs.length > 0 && <FAQAccordion faqs={section.faqs} />}
      </CardContent>
    </Card>
  )
}
