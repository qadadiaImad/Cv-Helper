"use client"

import * as React from "react"
import { AlertCircle, Check, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTemplateById, getFieldLabel, type TemplateMetadata } from "@/lib/template-registry"

interface MissingFieldsPromptProps {
  templateId: string
  missingFields: string[]
  onDismiss?: () => void
  onFieldClick?: (field: string) => void
}

export function MissingFieldsPrompt({
  templateId,
  missingFields,
  onDismiss,
  onFieldClick,
}: MissingFieldsPromptProps) {
  const template = getTemplateById(templateId)

  if (!template || missingFields.length === 0) {
    return null
  }

  return (
    <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-900 dark:text-orange-100">
        Complete Your Resume
      </AlertTitle>
      <AlertDescription className="space-y-3">
        <p className="text-sm text-orange-800 dark:text-orange-200">
          The <strong>{template.name}</strong> template requires the following fields to be completed:
        </p>
        
        <div className="flex flex-wrap gap-2">
          {missingFields.map(field => (
            <Badge
              key={field}
              variant="outline"
              className="border-orange-300 bg-white dark:bg-orange-950 text-orange-900 dark:text-orange-100 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
              onClick={() => onFieldClick?.(field)}
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              {getFieldLabel(field)}
            </Badge>
          ))}
        </div>

        {onDismiss && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="text-orange-800 hover:text-orange-900 hover:bg-orange-100"
            >
              Dismiss
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}

interface FieldChecklistProps {
  templateId: string
  completedFields: string[]
  missingFields: string[]
}

export function FieldChecklist({ templateId, completedFields, missingFields }: FieldChecklistProps) {
  const template = getTemplateById(templateId)

  if (!template) {
    return null
  }

  const allFields = [...completedFields, ...missingFields]

  if (allFields.length === 0) {
    return null
  }

  const progress = (completedFields.length / allFields.length) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Template Requirements</h4>
        <span className="text-xs text-muted-foreground">
          {completedFields.length} / {allFields.length} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Field List */}
      <div className="space-y-1.5">
        {allFields.map(field => {
          const isCompleted = completedFields.includes(field)
          return (
            <div
              key={field}
              className={`flex items-center gap-2 text-sm py-1 px-2 rounded ${
                isCompleted
                  ? 'text-muted-foreground'
                  : 'text-foreground bg-muted/50'
              }`}
            >
              {isCompleted ? (
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-orange-600 flex-shrink-0" />
              )}
              <span className={isCompleted ? 'line-through' : ''}>
                {getFieldLabel(field)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Compact badge showing completion status
 */
interface CompletionBadgeProps {
  completedCount: number
  totalCount: number
}

export function CompletionBadge({ completedCount, totalCount }: CompletionBadgeProps) {
  const isComplete = completedCount === totalCount
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100

  return (
    <Badge
      variant={isComplete ? "default" : "secondary"}
      className={isComplete ? "bg-green-600" : ""}
    >
      {isComplete ? (
        <>
          <Check className="h-3 w-3 mr-1" />
          Complete
        </>
      ) : (
        <>
          <AlertCircle className="h-3 w-3 mr-1" />
          {percentage}% Complete
        </>
      )}
    </Badge>
  )
}
