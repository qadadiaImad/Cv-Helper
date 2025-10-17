"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CVPreview } from "@/components/cv-preview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, ArrowLeft, Sparkles, ChevronDown, ChevronRight, LayoutTemplate, UserCircle2 } from "lucide-react"
import Link from "next/link"
import { useResumeStore } from "@/hooks/use-resume-store"
import { validateRequiredFields, getTemplateById } from "@/lib/template-registry"
import { MissingFieldsPrompt, FieldChecklist, CompletionBadge } from "@/components/missing-fields-prompt"

export default function ReactBuilderPage() {
  const searchParams = useSearchParams()
  const { ready, selectedTemplate, resumeData, updateResumeData, setSelectedTemplate } = useResumeStore()
  
  // Handle template selection from query params
  useEffect(() => {
    const templateId = searchParams?.get('templateId')
    if (templateId) {
      setSelectedTemplate(templateId as any)
    }
  }, [searchParams, setSelectedTemplate])

  // Validate required fields for current template
  const validation = validateRequiredFields(selectedTemplate, resumeData)
  const template = getTemplateById(selectedTemplate)

  const [openStep1, setOpenStep1] = useState(false)
  const [openStep2, setOpenStep2] = useState(false)

  const addExperience = () => {
    updateResumeData({
      experience: [
        ...resumeData.experience,
        { role: "", company: "", period: "", details: [""] },
      ],
    })
  }

  const removeExperience = (index: number) => {
    updateResumeData({
      experience: resumeData.experience.filter((_, i) => i !== index),
    })
  }

  const addProject = () => {
    updateResumeData({
      projects: [...resumeData.projects, { title: "", description: "", link: "" }],
    })
  }

  const removeProject = (index: number) => {
    updateResumeData({
      projects: resumeData.projects.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-flowcv-cream flex">
      {/* FlowCV-style Sidebar */}
      <aside className="sidebar-flowcv">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <span className="heading-xl text-flowcv-ink">Builder</span>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-flowcv-gray-600 hover:text-flowcv-ink hover:bg-white/50 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <Link href="/dashboard/templates" className="flex items-center gap-3 px-3 py-2 rounded-lg text-flowcv-gray-600 hover:text-flowcv-ink hover:bg-white/50 transition-colors">
            <LayoutTemplate className="h-4 w-4" />
            <span className="text-sm font-medium">Templates</span>
          </Link>
          <Link href="/dashboard/personal" className="flex items-center gap-3 px-3 py-2 rounded-lg text-flowcv-gray-600 hover:text-flowcv-ink hover:bg-white/50 transition-colors">
            <UserCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Personal Info</span>
          </Link>
        </nav>
        
        {/* Current Template */}
        {selectedTemplate && (
          <div className="mt-8 p-4 bg-white/60 rounded-lg border border-gray-200/50">
            <div className="text-xs uppercase tracking-wide text-flowcv-gray-600 mb-2">Current Template</div>
            <div className="font-semibold text-flowcv-ink text-sm">
              {selectedTemplate.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </div>
          </div>
        )}
        
        {/* Live Preview Status */}
        <div className="mt-auto p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Preview</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Changes update instantly</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-flowcv p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel - Steps 1 & 2 (collapsed by default) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Missing Fields Alert */}
            {!validation.valid && validation.missing.length > 0 && (
              <MissingFieldsPrompt
                templateId={selectedTemplate}
                missingFields={validation.missing}
                onFieldClick={(field) => {
                  // Auto-focus the field (scroll to it)
                  setOpenStep2(true)
                  setTimeout(() => {
                    const element = document.getElementById(field)
                    element?.focus()
                  }, 100)
                }}
              />
            )}

            {/* Step 1 - Choose Template (summary, link to library) */}
            <Card className="card-modern">
              <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <LayoutTemplate className="h-5 w-5 text-primary" />
                    Step 1: Choose template
                  </CardTitle>
                  {template && template.requiredFields && template.requiredFields.length > 0 && (
                    <CompletionBadge
                      completedCount={template.requiredFields.length - validation.missing.length}
                      totalCount={template.requiredFields.length}
                    />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Templates are selected in the library page.</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-secondary/20">
                  <div>
                    <h4 className="font-medium">
                      {template?.name || selectedTemplate.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h4>
                    <p className="text-sm text-muted-foreground">{template?.category || "React Template"}</p>
                  </div>
                  <Link href="/dashboard/templates">
                    <Button variant="outline" className="btn-secondary">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </Link>
                </div>
                
                {/* Field Checklist */}
                {template && template.requiredFields && template.requiredFields.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setOpenStep1((v) => !v)}
                    className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground w-full justify-between p-2 rounded hover:bg-secondary/50"
                  >
                    <span className="flex items-center gap-1">
                      {openStep1 ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                      Required Fields
                    </span>
                    <span className="text-xs">
                      {template.requiredFields.length - validation.missing.length} / {template.requiredFields.length}
                    </span>
                  </button>
                )}
                {openStep1 && template && (
                  <div className="pt-2">
                    <FieldChecklist
                      templateId={selectedTemplate}
                      completedFields={template.requiredFields.filter(f => !validation.missing.includes(f))}
                      missingFields={validation.missing}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Step 2 - Personal Info (collapsible quick edit) */}
            <Card className="card-modern">
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserCircle2 className="h-5 w-5 text-accent" />
                  Step 2: Personal information
                </CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Fill your basic info. Changes autosave.</p>
                  <div className="flex items-center gap-2">
                    <Link href="/dashboard/personal">
                      <Button size="sm" variant="outline">Open full page</Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={() => setOpenStep2((v) => !v)}>
                      {openStep2 ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {openStep2 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">Full name</Label>
                        <Input
                          id="name"
                          value={resumeData.name}
                          onChange={(e) => updateResumeData({ name: e.target.value })}
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => updateResumeData({ email: e.target.value })}
                          className="input-modern"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-wide text-muted-foreground">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.phone}
                          onChange={(e) => updateResumeData({ phone: e.target.value })}
                          className="input-modern"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview (takes more space) */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="card-modern">
              <CardHeader className="flex flex-col gap-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="h-5 w-5 text-primary" />
                  Step 3: Preview & export
                </CardTitle>
                <p className="text-sm text-muted-foreground">Inspect typography, spacing, and color accents before exporting a crisp PDF.</p>
              </CardHeader>
              <CardContent className="p-4">
                {ready && <CVPreview data={resumeData} selectedTemplate={selectedTemplate} />}
              </CardContent>
            </Card>

            {/* HTML Export removed from UI per spec - APIs still functional */}
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}
