import { Badge } from '@/components/ui/badge'
import type { SectionStatus } from '@/lib/ats-types'
import { CheckCircle, AlertTriangle, AlertCircle, XCircle } from 'lucide-react'

export function getStatusBadge(status: SectionStatus, score: number) {
  const variants = {
    excellent: 'success',
    good: 'default',
    needs_improvement: 'secondary',
    poor: 'destructive',
  } as const

  const labels = {
    excellent: 'excellent',
    good: 'good',
    needs_improvement: 'needs improvement',
    poor: 'poor',
  } as const

  return (
    <Badge variant={variants[status]} className="w-[180px] justify-center text-sm font-semibold shrink-0">
      {score}/100 • {labels[status]}
    </Badge>
  )
}

export function getSectionIcon(status: SectionStatus) {
  const iconClass = 'size-6'
  
  switch (status) {
    case 'excellent':
      return <CheckCircle className={`${iconClass} text-green-500`} />
    case 'good':
      return <CheckCircle className={`${iconClass} text-blue-500`} />
    case 'needs_improvement':
      return <AlertTriangle className={`${iconClass} text-orange-500`} />
    case 'poor':
      return <XCircle className={`${iconClass} text-red-500`} />
  }
}

export function getStatusColor(status: SectionStatus): string {
  switch (status) {
    case 'excellent':
      return 'text-green-600 dark:text-green-400'
    case 'good':
      return 'text-blue-600 dark:text-blue-400'
    case 'needs_improvement':
      return 'text-orange-600 dark:text-orange-400'
    case 'poor':
      return 'text-red-600 dark:text-red-400'
  }
}
