"use client"

import { useState, useCallback } from "react"
import { TemplatePicker } from "@/components/template-picker"
import { CVForm } from "@/components/cv-form"
import { PDFPreview } from "@/components/pdf-preview"
import { LaTeXEditor } from "@/components/latex-editor"
import { CVUploadPanel } from "@/components/cv-upload-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Code, Upload, ArrowLeft } from "lucide-react"
import { useResumeGenerator } from "@/hooks/use-resume-generator"
import type { CVData } from "@/lib/latex/schema"
import Link from "next/link"

export default function BuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("jake_gutierrez")
  const [currentData, setCurrentData] = useState<Partial<CVData>>({})
  const [generatedTeX, setGeneratedTeX] = useState<string>("")
  const [activeTab, setActiveTab] = useState<"form" | "latex" | "upload">("form")

  const { isGenerating, pdfUrl, error, generateResume, downloadResume, exportLaTeX, exportJSON } = useResumeGenerator({
    templateId: selectedTemplate,
    onSuccess: (url) => {
      console.log("[v0] Resume generated successfully:", url)
    },
    onError: (err) => {
      console.error("[v0] Resume generation failed:", err)
    },
  })

  const handleFormSubmit = useCallback(
    (data: CVData) => {
      generateResume(data)
    },
    [generateResume],
  )

  const handleDataChange = useCallback((data: Partial<CVData>) => {
    setCurrentData(data)
  }, [])

  const handleDownload = useCallback(() => {
    if (currentData.fullName && Object.keys(currentData).length > 2) {
      const filename = `${currentData.fullName?.replace(/\s+/g, "_")}_resume.pdf`
      downloadResume(currentData as CVData, filename)
    }
  }, [currentData, downloadResume])

  const handleExportLaTeX = useCallback(() => {
    if (currentData.fullName && Object.keys(currentData).length > 2) {
      const filename = `${currentData.fullName?.replace(/\s+/g, "_")}_resume.tex`
      exportLaTeX(currentData as CVData, filename)
    }
  }, [currentData, exportLaTeX])

  const handleExportJSON = useCallback(() => {
    if (currentData.fullName && Object.keys(currentData).length > 2) {
      const filename = `${currentData.fullName?.replace(/\s+/g, "_")}_resume.json`
      exportJSON(currentData as CVData, filename)
    }
  }, [currentData, exportJSON])

  const handleAdaptationComplete = useCallback((tex: string) => {
    setGeneratedTeX(tex)
    setActiveTab("latex")
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Resume Builder</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedTemplate && (
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {selectedTemplate.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!pdfUrl || isGenerating}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportLaTeX} disabled={isGenerating}>
                  <Code className="h-4 w-4 mr-2" />
                  LaTeX
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Form/Editor */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 1: Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <TemplatePicker selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 2: Add Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="form">Form Builder</TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="h-4 w-4 mr-2" />
                      AI Adapt
                    </TabsTrigger>
                    <TabsTrigger value="latex">LaTeX Editor</TabsTrigger>
                  </TabsList>

                  <TabsContent value="form" className="p-6">
                    <CVForm
                      initialData={currentData}
                      onSubmit={handleFormSubmit}
                      onDataChange={handleDataChange}
                      isLoading={isGenerating}
                    />
                  </TabsContent>

                  <TabsContent value="upload" className="p-6">
                    <CVUploadPanel templateId={selectedTemplate} onAdaptationComplete={handleAdaptationComplete} />
                  </TabsContent>

                  <TabsContent value="latex" className="p-6">
                    <LaTeXEditor
                      initialCode={generatedTeX}
                      onCodeChange={setGeneratedTeX}
                      onCompile={(code) => {
                        // Handle LaTeX compilation
                        console.log("[v0] Compiling LaTeX:", code.length, "characters")
                      }}
                      isCompiling={isGenerating}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Step 3: Preview & Export</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleExportJSON} disabled={isGenerating}>
                      JSON
                    </Button>
                  </div>
                </div>
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

            {/* Status/Error Display */}
            {error && (
              <Card className="border-destructive">
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
