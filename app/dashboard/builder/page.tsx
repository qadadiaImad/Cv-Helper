"use client"

import { useState, useCallback } from "react"
import { CVPreview } from "@/components/cv-preview"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, ArrowLeft, Plus, Trash2, Sparkles, Workflow } from "lucide-react"
import type { ResumeData, TemplateId } from "@/lib/react-templates"
import Link from "next/link"

export default function ReactBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic_minimal')

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    links: [
      { label: "GitHub", url: "https://github.com/johndoe" },
      { label: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Tech Corp",
        period: "2023 - Present",
        details: [
          "Developed web applications using React and Node.js",
          "Led team of 5 developers on major projects",
          "Improved system performance by 40%"
        ]
      }
    ],
    projects: [
      {
        title: "CV Helper App",
        description: "Application React pour créer des CV professionnels",
        link: "https://github.com/johndoe/cv-helper"
      }
    ],
    education: [
      {
        degree: "Master's in Computer Science",
        school: "University of Tech",
        year: "2021"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Docker"]
  })

  const updateResumeData = useCallback((updates: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...updates }))
  }, [])

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        role: "",
        company: "",
        period: "",
        details: [""]
      }]
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        title: "",
        description: "",
        link: ""
      }]
    }))
  }

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="container-modern py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="btn-secondary">
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 border border-primary/20">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Studio</p>
                  <h1 className="text-xl font-semibold">React Resume Builder</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedTemplate && (
                <Badge variant="outline" className="hidden rounded-full border-primary/30 text-primary sm:inline-flex">
                  {selectedTemplate.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              )}
              <button className="btn-primary hidden lg:inline-flex">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                Live preview enabled
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-modern section-padding">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="card-modern">
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Step 1: Choose template
                </CardTitle>
                <p className="text-sm text-muted-foreground">Switch layouts with one click. Each template inherits your brand colors.</p>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onTemplateChange={setSelectedTemplate}
                />
              </CardContent>
            </Card>

            {/* Form */}
            <Card className="card-modern">
              <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Workflow className="h-5 w-5 text-accent" />
                  Step 2: Add content
                </CardTitle>
                <p className="text-sm text-muted-foreground">Craft your story with structured sections. Autosaves keep your edits safe.</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Personal information</h3>
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

                {/* Experience */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Experience</h3>
                    <button onClick={addExperience} className="btn-secondary">
                      <Plus className="h-4 w-4" />
                      Add role
                    </button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <Card key={index} className="card-feature">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">Experience {index + 1}</h4>
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">Describe measurable impact</p>
                        </div>
                        <button
                          onClick={() => removeExperience(index)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Role</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, role: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                            className="input-modern"
                          />
                        </div>
                        <div>
                          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, company: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                            className="input-modern"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Period</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, period: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                            className="input-modern"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Details (one per line)</Label>
                          <Textarea
                            value={exp.details.join("\n")}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, details: e.target.value.split("\n").filter((d) => d.trim()) }
                              updateResumeData({ experience: newExp })
                            }}
                            rows={3}
                            className="input-modern"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">Skills</h3>
                  <Textarea
                    value={resumeData.skills.join(", ")}
                    onChange={(e) =>
                      updateResumeData({
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter((s) => s),
                      })
                    }
                    placeholder="JavaScript, React, Node.js, TypeScript..."
                    rows={3}
                    className="input-modern"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="card-modern">
              <CardHeader className="flex flex-col gap-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="h-5 w-5 text-primary" />
                  Step 3: Preview & export
                </CardTitle>
                <p className="text-sm text-muted-foreground">Inspect typography, spacing, and color accents before exporting a crisp PDF.</p>
              </CardHeader>
              <CardContent className="p-4">
                <CVPreview data={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
