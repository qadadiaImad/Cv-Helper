'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { GrammarSpellingSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { FAQAccordion } from '../faq-accordion'

export function GrammarSection({ section }: { section: Section }) {
  return (
    <Card id="grammar">
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
        {section.issues.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Issues Found ({section.issues.length}):</h3>
            <div className="space-y-3">
              {section.issues.map((issue, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3">
                  <div className="shrink-0 rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900/30">
                    {issue.error_type}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm">
                      <span className="text-red-600 line-through dark:text-red-400">{issue.original_text}</span>
                      <span className="mx-2">→</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{issue.corrected_text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-950/20">
            <p className="text-lg font-semibold text-green-900 dark:text-green-100">
              ✓ No grammar or spelling issues detected!
            </p>
            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              Your resume appears to be well-written and error-free.
            </p>
          </div>
        )}

        {section.general_tips.length > 0 && (
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
            <p className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">Tips:</p>
            <ul className="space-y-1">
              {section.general_tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-blue-800 dark:text-blue-200">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {section.faqs && section.faqs.length > 0 && <FAQAccordion faqs={section.faqs} />}
      </CardContent>
    </Card>
  )
}
