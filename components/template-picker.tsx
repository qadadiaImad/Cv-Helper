"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Eye } from "lucide-react"
import { AVAILABLE_TEMPLATES } from "@/lib/templates"
import type { TemplateConfig } from "@/lib/latex/schema"

interface TemplatePickerProps {
  selectedTemplate?: string
  onTemplateSelect: (templateId: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Choose a Template</h2>
        <p className="text-muted-foreground">Select a professional LaTeX resume template to get started</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {AVAILABLE_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onTemplateSelect(template.id)}
            onPreview={() => setPreviewTemplate(template.id)}
          />
        ))}
      </div>

      {previewTemplate && (
        <TemplatePreviewModal templateId={previewTemplate} onClose={() => setPreviewTemplate(null)} />
      )}
    </div>
  )
}

interface TemplateCardProps {
  template: TemplateConfig
  isSelected: boolean
  onSelect: () => void
  onPreview: () => void
}

function TemplateCard({ template, isSelected, onSelect, onPreview }: TemplateCardProps) {
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription className="text-sm">{template.description}</CardDescription>
          </div>
          {isSelected && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Template preview placeholder */}
        <div className="aspect-[8.5/11] rounded-md bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-sm font-medium">{template.name}</div>
            <div className="text-xs">Preview</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {template.supportsPhoto && (
              <Badge variant="secondary" className="text-xs">
                Photo Support
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              MIT License
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button variant={isSelected ? "default" : "outline"} size="sm" className="flex-1" onClick={onSelect}>
              {isSelected ? "Selected" : "Select"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onPreview}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface TemplatePreviewModalProps {
  templateId: string
  onClose: () => void
}

function TemplatePreviewModal({ templateId, onClose }: TemplatePreviewModalProps) {
  const template = AVAILABLE_TEMPLATES.find((t) => t.id === templateId)

  if (!template) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>

        <div className="p-4">
          <div className="aspect-[8.5/11] bg-muted rounded-md flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-lg font-medium">{template.name}</div>
              <div className="text-sm">Full Preview</div>
              <div className="text-xs mt-2">Preview will show compiled PDF</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
