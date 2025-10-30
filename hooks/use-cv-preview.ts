import { useState, useCallback } from "react"
import type { TemplateId } from "@/lib/react-templates"
import type { UniversalResumeData } from "@/lib/schemas"

export function useCVPreview() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('atlantic_blue')
  const [resumeData, setResumeData] = useState<UniversalResumeData>({
    personal: {
      fullName: "",
      email: "",
      phone: "",
    },
    education: [],
    experience: [],
    skills: [],
  })

  const updateResumeData = useCallback((updates: Partial<UniversalResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }))
  }, [])

  const exportPDF = useCallback(async () => {
    try {
      const response = await fetch('/api/generate-react-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: resumeData,
          templateId: selectedTemplate,
        }),
      })

      if (!response.ok) {
        throw new Error('Export failed')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_resume.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF export failed:', error)
      throw error
    }
  }, [resumeData, selectedTemplate])

  return {
    selectedTemplate,
    setSelectedTemplate,
    resumeData,
    updateResumeData,
    exportPDF,
  }
}
