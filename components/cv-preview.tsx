"use client"

import React, { useState, useMemo } from "react"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { UniversalResumeData } from "@/lib/schemas"

interface CVPreviewProps {
  data: UniversalResumeData
  selectedTemplate: TemplateId
  onExportPDF?: () => void
  showToolbar?: boolean
}

export function CVPreview({ data, selectedTemplate, onExportPDF, showToolbar = true }: CVPreviewProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  // Force re-render when data changes
  React.useEffect(() => {
    console.log('👁️ CVPreview received data:', data.personal?.fullName)
    console.log('📊 Full data object:', data)
    setRenderKey(prev => prev + 1)
  }, [data])

  // Get template component directly without memoization
  const TemplateComponent = REACT_TEMPLATES[selectedTemplate]
  
  console.log('🔄 CVPreview rendering, renderKey:', renderKey)

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      const { generateReactPDF } = await import('@/lib/react-pdf-generator')
      
      const pdfBlob = await generateReactPDF(data, selectedTemplate)
      
      const url = window.URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${data.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`
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
          {console.log('🎨 Rendering template with data:', data.personal?.fullName, 'key:', renderKey)}
          <TemplateComponent key={renderKey} data={data} />
        </div>
      </Card>
    </div>
  )
}
