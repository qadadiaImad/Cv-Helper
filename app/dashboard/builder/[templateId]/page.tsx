"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CVForm } from "@/components/cv-form"
import { PDFPreview } from "@/components/pdf-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Code } from "lucide-react"
import { useResumeGenerator } from "@/hooks/use-resume-generator"
import { getTemplate } from "@/lib/templates"
import type { CVData } from "@/lib/latex/schema"
import Link from "next/link"

export default function TemplateBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const templateId = params.templateId as string

  const [template, setTemplate] = useState(getTemplate(templateId))
  const [currentData, setCurrentData] = useState<Partial<CVData>>({})

  const { isGenerating, pdfUrl, error, generateResume, downloadResume, exportLaTeX } = useResumeGenerator({
    templateId,
    onSuccess: (url) => {
      console.log("[v0] Resume generated for template:", templateId)
    },
  })

  const handleDataChange = (data: Partial<CVData>) => {
    setCurrentData(data)
  }

  useEffect(() => {
    const foundTemplate = getTemplate(templateId)
    if (!foundTemplate) {
      router.push("/dashboard/builder")
      return
    }
    setTemplate(foundTemplate)
  }, [templateId, router])

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested template could not be found.</p>
          <Link href="/dashboard/builder">
            <Button>Back to Builder</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleFormSubmit = (data: CVData) => {
    generateResume(data)
  }

  const handleDownload = () => {
    if (currentData.fullName && Object.keys(currentData).length > 2) {
      const filename = `${currentData.fullName?.replace(/\s+/g, "_")}_${templateId}_resume.pdf`
      downloadResume(currentData as CVData, filename)
    }
  }

  const handleExportLaTeX = () => {
    if (currentData.fullName && Object.keys(currentData).length > 2) {
      const filename = `${currentData.fullName?.replace(/\s+/g, "_")}_${templateId}_resume.tex`
      exportLaTeX(currentData as CVData, filename)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/builder">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Builder
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">{template.name} Template</h1>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleDownload} disabled={!pdfUrl || isGenerating}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportLaTeX} disabled={isGenerating}>
                <Code className="h-4 w-4 mr-2" />
                Export LaTeX
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Information</CardTitle>
              </CardHeader>
              <CardContent>
                <CVForm
                  initialData={currentData}
                  onSubmit={handleFormSubmit}
                  onDataChange={handleDataChange}
                  isLoading={isGenerating}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <PDFPreview
                  pdfUrl={pdfUrl || undefined}
                  isLoading={isGenerating}
                  onRefresh={() => {
                    if (Object.keys(currentData).length > 2) {
                      generateResume(currentData as CVData)
                    }
                  }}
                  onDownload={handleDownload}
                />
              </CardContent>
            </Card>

            {error && (
              <Card className="mt-4 border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive text-sm">Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
