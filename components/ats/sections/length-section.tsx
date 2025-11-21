'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LengthBulletsSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'

export function LengthSection({ section, wordCount, bulletCount }: { section: Section; wordCount: number; bulletCount: number }) {
  return (
    <Card id="length">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">Length & Bullets</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <p className="text-2xl font-bold">{section.estimated_pages}</p>
            <p className="text-sm text-muted-foreground">Estimated Pages</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <p className="text-2xl font-bold">{wordCount}</p>
            <p className="text-sm text-muted-foreground">Words</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <p className="text-2xl font-bold">{bulletCount}</p>
            <p className="text-sm text-muted-foreground">Bullet Points</p>
          </div>
        </div>

        {section.long_bullets_examples.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Long Bullets - Shorten These:</h3>
            <div className="space-y-3">
              {section.long_bullets_examples.map((example, idx) => (
                <Card key={idx} className="bg-secondary/30">
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground">Original (too long):</p>
                        <p className="text-sm">{example.original_bullet}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold text-green-600 dark:text-green-400">Shorter version:</p>
                        <p className="text-sm font-medium">{example.shorter_version}</p>
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
