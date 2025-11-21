'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { RepetitionSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { FAQAccordion } from '../faq-accordion'

interface RepetitionSectionProps {
  section: Section
}

export function RepetitionSection({ section }: RepetitionSectionProps) {
  return (
    <Card id="repetition">
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
        {/* Top Repeated Words */}
        {section.top_repeated_words.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Top Repeated Words:</h3>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="border-b-2 bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Word</th>
                    <th className="px-4 py-3 text-right font-semibold">Count</th>
                    <th className="px-4 py-3 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {section.top_repeated_words.map((word, idx) => (
                    <tr key={idx} className={word.is_problematic ? 'bg-orange-50 dark:bg-orange-950/20' : ''}>
                      <td className="px-4 py-3 font-medium">{word.word}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{word.count}</td>
                      <td className="px-4 py-3 text-right">
                        {word.is_problematic ? (
                          <Badge variant="destructive" className="w-[100px] justify-center text-sm font-semibold shrink-0">Overused</Badge>
                        ) : (
                          <Badge variant="default" className="w-[100px] justify-center text-sm font-semibold shrink-0">OK</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Buzzwords */}
        {section.buzzwords_to_avoid.length > 0 && (
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
            <p className="mb-2 text-sm font-semibold text-red-900 dark:text-red-100">Buzzwords to Avoid:</p>
            <div className="flex flex-wrap gap-2">
              {section.buzzwords_to_avoid.map((word, idx) => (
                <Badge key={idx} variant="destructive">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {section.suggestions.length > 0 && (
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
            <p className="mb-2 text-sm font-semibold text-blue-900 dark:text-blue-100">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-blue-800 dark:text-blue-200">
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
