"use client"

import React, { useState, useMemo } from "react"
import { REACT_TEMPLATES, type TemplateId, type ResumeData } from "@/lib/react-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CVPreviewProps {
  data: ResumeData
  onExportPDF?: () => void
}

export function CVPreview({ data, onExportPDF }: CVPreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic_minimal')
  const [isExporting, setIsExporting] = useState(false)

  const TemplateComponent = useMemo(() => {
    return REACT_TEMPLATES[selectedTemplate]
  }, [selectedTemplate])

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const { generateReactPDF } = await import('@/lib/react-pdf-generator')
      
      const pdfBlob = await generateReactPDF(data, selectedTemplate)
      
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${data.name.replace(/\s+/g, '_')}_resume.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Template Selector */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as TemplateId)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(REACT_TEMPLATES).map((templateId) => (
                  <SelectItem key={templateId} value={templateId}>
                    {templateId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-4">
        <div className="border rounded-lg overflow-hidden">
          <TemplateComponent data={data} />
        </div>
      </Card>
    </div>
  )
}
