"use client"

import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"
import type { UniversalResumeData } from "@/lib/schemas"

interface SummaryFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function SummaryForm({ data, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium">
          Professional Summary / Profile
        </Label>
        <RichTextEditor
          content={data.summary || ""}
          onChange={(html) => onChange({ ...data, summary: html })}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          minHeight="200px"
          enableAI={true}
          resumeContext={data}
          section="summary"
        />
        <p className="text-xs text-muted-foreground">
          A compelling summary helps recruiters quickly understand your value proposition.
        </p>
      </div>
    </div>
  )
}
