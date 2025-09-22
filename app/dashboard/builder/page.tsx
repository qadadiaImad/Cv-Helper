"use client"

import { useState, useCallback } from "react"
import { CVPreview } from "@/components/cv-preview"
import { TemplateSelector } from "@/components/template-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Upload, ArrowLeft, Plus, Trash2 } from "lucide-react"
import type { ResumeData, TemplateId } from "@/lib/react-templates"
import Link from "next/link"

export default function ReactBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic_minimal')
  const [activeTab, setActiveTab] = useState<"form" | "upload">("form")
  
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
                <h1 className="text-xl font-semibold">React Resume Builder</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedTemplate && (
                <Badge variant="outline" className="hidden sm:inline-flex">
                  {selectedTemplate.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 1: Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <TemplateSelector 
                  selectedTemplate={selectedTemplate} 
                  onTemplateChange={setSelectedTemplate} 
                />
              </CardContent>
            </Card>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 2: Add Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.name}
                        onChange={(e) => updateResumeData({ name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => updateResumeData({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.phone}
                        onChange={(e) => updateResumeData({ phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Experience</h3>
                    <Button onClick={addExperience} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  {resumeData.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button 
                          onClick={() => removeExperience(index)} 
                          size="sm" 
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Role</Label>
                          <Input
                            value={exp.role}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, role: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                          />
                        </div>
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, company: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Period</Label>
                          <Input
                            value={exp.period}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, period: e.target.value }
                              updateResumeData({ experience: newExp })
                            }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Details (one per line)</Label>
                          <Textarea
                            value={exp.details.join('\n')}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience]
                              newExp[index] = { ...exp, details: e.target.value.split('\n').filter(d => d.trim()) }
                              updateResumeData({ experience: newExp })
                            }}
                            rows={3}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Skills</h3>
                  <Textarea
                    value={resumeData.skills.join(', ')}
                    onChange={(e) => updateResumeData({ 
                      skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                    })}
                    placeholder="JavaScript, React, Node.js, TypeScript..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Step 3: Preview & Export</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CVPreview data={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
