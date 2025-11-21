'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ATSReport } from '@/lib/ats-types'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

interface ATSScorePanelProps {
  report: ATSReport
  onReset?: () => void
}

export function ATSScorePanel({ report, onReset }: ATSScorePanelProps) {
  const scoreColor = getScoreColor(report.global_score)
  const statusIcon = getStatusIcon(report.global_score)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Overall ATS Score</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Big Score Display */}
        <div className="flex flex-col items-center justify-center py-6">
          <div
            className={`flex size-32 items-center justify-center rounded-full border-8 ${scoreColor.border}`}
            style={{
              background: `conic-gradient(${scoreColor.bg} ${report.global_score}%, transparent ${report.global_score}%)`,
            }}
          >
            <div className="flex size-28 flex-col items-center justify-center rounded-full bg-background">
              <span className="text-4xl font-bold">{report.global_score}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {statusIcon}
            <Badge variant={scoreColor.badgeVariant} className="w-[180px] justify-center text-sm font-semibold shrink-0">
              {getScoreLabel(report.global_score)}
            </Badge>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-3 rounded-lg bg-secondary/50 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Parse Coverage</span>
            <span className="font-semibold">{Math.round(report.parse_coverage_ratio)}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Word Count</span>
            <span className="font-semibold">{report.word_count}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Bullet Points</span>
            <span className="font-semibold">{report.bullet_count}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Issues Found</span>
            <Badge variant={report.issues_count > 10 ? 'destructive' : 'default'} className="w-[60px] justify-center text-sm font-semibold shrink-0">
              {report.issues_count}
            </Badge>
          </div>
        </div>

        {/* Overall Comment */}
        <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
          <p className="text-sm leading-relaxed">{report.overall_comment}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={scrollToTop} className="w-full" size="lg">
            View Full Report
          </Button>
          {onReset && (
            <Button onClick={onReset} variant="outline" className="w-full" size="lg">
              Analyze Another Resume
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function getScoreColor(score: number) {
  if (score >= 85) {
    return {
      bg: '#22c55e',
      border: 'border-green-500',
      badgeVariant: 'success' as const,
    }
  } else if (score >= 70) {
    return {
      bg: '#3b82f6',
      border: 'border-blue-500',
      badgeVariant: 'default' as const,
    }
  } else if (score >= 50) {
    return {
      bg: '#f59e0b',
      border: 'border-orange-500',
      badgeVariant: 'secondary' as const,
    }
  } else {
    return {
      bg: '#ef4444',
      border: 'border-red-500',
      badgeVariant: 'destructive' as const,
    }
  }
}

function getScoreLabel(score: number): string {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Very Good'
  if (score >= 50) return 'Fair'
  return 'Needs Improvement'
}

function getStatusIcon(score: number) {
  if (score >= 85) {
    return <CheckCircle className="size-5 text-green-500" />
  } else if (score >= 50) {
    return <AlertTriangle className="size-5 text-orange-500" />
  } else {
    return <AlertCircle className="size-5 text-red-500" />
  }
}
