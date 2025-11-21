'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { EssentialSectionsSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { CheckCircle, XCircle } from 'lucide-react'

export function EssentialSectionsSection({ section }: { section: Section }) {
  const items = [
    { label: 'Work Experience', present: section.has_experience },
    { label: 'Education', present: section.has_education },
    { label: 'Skills', present: section.has_skills },
    ...section.other_sections.map(s => ({ label: s, present: true }))
  ]

  return (
    <Card id="essential-sections">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">Essential Sections</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              {item.present ? (
                <CheckCircle className="size-5 shrink-0 text-green-500" />
              ) : (
                <XCircle className="size-5 shrink-0 text-red-500" />
              )}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {section.suggestions.length > 0 && (
          <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950/20">
            <p className="mb-2 text-sm font-semibold text-orange-900 dark:text-orange-100">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((s, idx) => (
                <li key={idx} className="text-sm text-orange-800 dark:text-orange-200">• {s}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
