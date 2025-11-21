'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { StyleActiveVoiceSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'

export function StyleSection({ section }: { section: Section }) {
  return (
    <Card id="style">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">Style & Active Voice</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {section.examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Style Improvements:</h3>
            <div className="space-y-3">
              {section.examples.map((example, idx) => (
                <Card key={idx} className="bg-secondary/30">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div>
                        <p className="mb-1 text-xs font-semibold text-red-600 dark:text-red-400">Original:</p>
                        <p className="text-sm">{example.original_text}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold text-green-600 dark:text-green-400">Improved:</p>
                        <p className="text-sm font-medium">{example.improved_text}</p>
                      </div>
                      <div className="rounded bg-blue-50 p-2 text-xs text-blue-700 dark:bg-blue-950/30">
                        {example.comment}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
      </CardContent>
    </Card>
  )
}
