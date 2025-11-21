'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { KeywordsRelevanceSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { CheckCircle, XCircle } from 'lucide-react'

export function KeywordsSection({ section }: { section: Section }) {
  return (
    <Card id="keywords">
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
        <div className="grid gap-6 md:grid-cols-2">
          {section.present_keywords.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">✓ Present Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {section.present_keywords.map((kw, idx) => (
                  <Badge key={idx} variant="success">
                    <CheckCircle className="mr-1 size-3" />
                    {kw.keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {section.missing_keywords.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">✗ Missing Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {section.missing_keywords.map((kw, idx) => (
                  <Badge key={idx} variant="destructive">
                    <XCircle className="mr-1 size-3" />
                    {kw.keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

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
