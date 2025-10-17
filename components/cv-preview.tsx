"use client"

import React, { useState, useMemo } from "react"
import { REACT_TEMPLATES, type TemplateId, type ResumeData } from "@/lib/react-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CVPreviewProps {
  data: ResumeData
  selectedTemplate: TemplateId
  onExportPDF?: () => void
  showToolbar?: boolean
}

export function CVPreview({ data, selectedTemplate, onExportPDF, showToolbar = true }: CVPreviewProps) {
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
      {/* Toolbar */}
      {showToolbar && (
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Using template: <span className="font-medium text-foreground">{selectedTemplate.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
            </div>
            <Button onClick={handleExportPDF} disabled={isExporting}>
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </Card>
      )}

      {/* Preview */}
      <Card className="p-4">
        <div className="border rounded-lg overflow-hidden">
          <TemplateComponent data={data} />
        </div>
      </Card>
    </div>
  )
}
