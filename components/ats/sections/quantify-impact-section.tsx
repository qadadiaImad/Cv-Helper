'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Crown } from 'lucide-react'
import type { QuantifyImpactSection as Section } from '@/lib/ats-types'
import { getStatusBadge, getSectionIcon } from '../utils'

interface QuantifyImpactSectionProps {
  section: Section
  uiTexts: { [key: string]: string }
}

export function QuantifyImpactSection({ section, uiTexts }: QuantifyImpactSectionProps) {
  const hasIssues = section.examples.length > 0

  return (
    <Card id="quantify-impact">
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
        {/* Problem Section - Only show if there are issues */}
        {hasIssues && (
          <div className="rounded-lg bg-red-50 p-6 dark:bg-red-950/20">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/30">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-semibold text-red-900 dark:text-red-100">
              Oh, no!
            </h3>
            <p className="mb-4 text-center text-sm text-red-800 dark:text-red-200">
              Your experience section lacks quantifiable achievements from previous positions you've held.
            </p>
            
            {/* Show only the 2 worst bullets */}
            <div className="space-y-3">
              {section.examples.map((example, idx) => (
                <div key={idx} className="rounded-lg bg-red-100/50 p-3 dark:bg-red-900/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-900 dark:text-red-100">{example.original_bullet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Section with Blurred Bullets */}
        {hasIssues && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Here are some suggestions for rewriting your bullets:
            </h3>
            
            {/* Blurred bullets in background with CTA overlay */}
            <div className="relative min-h-[300px]">
              {/* Blurred bullets background */}
              <div className="space-y-3 blur-sm">
                {section.examples.map((example, idx) => (
                  <div key={idx} className="rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <p className="text-sm text-green-900 dark:text-green-100">
                        {example.original_bullet}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card Overlay - Positioned lower to avoid hiding title */}
              <div className="absolute inset-x-0 top-12 flex items-center justify-center px-4">
                <Card className="w-full max-w-md border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-purple-100/90 shadow-2xl backdrop-blur-sm dark:from-primary/20 dark:to-purple-950/90">
                  <CardContent className="py-8 text-center">
                    <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Automatically rewrite my bullets
                    </h4>
                    <p className="mb-4 text-lg font-medium text-primary">
                      with Infinite CV PRO
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Fix Bullets Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Promotional Section */}
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-800 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardContent className="py-6">
            <div className="mb-4 flex items-center gap-2">
              <Crown className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                With <span className="text-primary">Infinite CV</span> PRO report, you get:
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 text-amber-600 dark:text-amber-400">•</span>
                <span>A complete professional-grade resume checker</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 text-amber-600 dark:text-amber-400">•</span>
                <span>Ready to use suggestions for improving resume</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 text-amber-600 dark:text-amber-400">•</span>
                <span>Over 30 industry-leading resume templates (we chose only the best)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 text-amber-600 dark:text-amber-400">•</span>
                <span>Enhancy's resume and full control over the layout</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="mt-0.5 text-amber-600 dark:text-amber-400">•</span>
                <span>Resume tailoring based on a job description ready for specific job applications</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
