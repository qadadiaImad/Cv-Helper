"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
        <Textarea
          id="summary"
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          value={data.summary || ""}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          rows={6}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          A compelling summary helps recruiters quickly understand your value proposition.
        </p>
      </div>
    </div>
  )
}
