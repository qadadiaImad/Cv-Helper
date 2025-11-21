'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { DesignLayoutSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { FAQAccordion } from '../faq-accordion'

export function DesignSection({ section }: { section: Section }) {
  return (
    <Card id="design">
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
        {section.suggestions.length > 0 && (
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
            <p className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((s, idx) => (
                <li key={idx} className="text-sm text-blue-800 dark:text-blue-200">• {s}</li>
              ))}
            </ul>
          </div>
        )}

        {section.faqs && section.faqs.length > 0 && <FAQAccordion faqs={section.faqs} />}
      </CardContent>
    </Card>
  )
}
