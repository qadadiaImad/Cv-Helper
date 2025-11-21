'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { ContactInfoSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'
import { CheckCircle, XCircle } from 'lucide-react'

export function ContactInfoSection({ section }: { section: Section }) {
  const items = [
    { label: 'Email', present: section.has_email, value: section.email_value, quality: section.email_professional },
    { label: 'Phone', present: section.has_phone, value: section.phone_value },
    { label: 'Location', present: section.has_location, value: section.location_value },
    { label: 'LinkedIn/Website', present: section.has_linkedin_or_website, value: section.linkedin_or_website_value },
  ]

  return (
    <Card id="contact-info">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSectionIcon(section.status)}
            <div>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription className="mt-1">{section.explanation}</CardDescription>
            </div>
          </div>
          {getStatusBadge(section.status, section.score)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
              {item.present ? (
                <CheckCircle className="size-5 shrink-0 text-green-500" />
              ) : (
                <XCircle className="size-5 shrink-0 text-red-500" />
              )}
              <div className="flex-1">
                <span className="text-sm font-medium">{item.label}</span>
                {item.value && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.value}</p>
                )}
                {item.label === 'Email' && !item.quality && item.present && (
                  <p className="mt-0.5 text-xs text-orange-600">Consider using a more professional email</p>
                )}
              </div>
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
