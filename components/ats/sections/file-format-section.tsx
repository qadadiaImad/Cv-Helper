'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { FileFormatSizeSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { FAQAccordion } from '../faq-accordion'

export function FileFormatSection({ section }: { section: Section }) {
  return (
    <Card id="file-format">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">File Format & Size</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">File Type</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={section.file_type_ok ? 'success' : 'destructive'} className="w-[80px] justify-center text-sm font-semibold shrink-0">
                {section.file_type.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {section.file_type_ok ? '✓ Compatible' : '✗ Not optimal'}
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">File Size</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={section.file_size_ok ? 'success' : 'destructive'} className="w-[100px] justify-center text-sm font-semibold shrink-0">
                {Math.round(section.file_size_kb)} KB
              </Badge>
              <span className="text-xs text-muted-foreground">
                {section.file_size_ok ? '✓ Good size' : '✗ Too large'}
              </span>
            </div>
          </div>
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

        {section.faqs && section.faqs.length > 0 && <FAQAccordion faqs={section.faqs} />}
      </CardContent>
    </Card>
  )
}
