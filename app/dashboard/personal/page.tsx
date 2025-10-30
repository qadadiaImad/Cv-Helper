"use client"

import * as React from "react"
import Link from "next/link"
import { useCVStore } from "@/hooks/use-cv-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import type { Experience, Project, Education } from "@/lib/schemas"

export default function PersonalInfoPage() {
  const { activeCV, activeCVId, updateCVData } = useCVStore()
  
  if (!activeCV || !activeCVId) {
    return (
      <div className="p-8">
        <p>No active CV. Please go to <a href="/dashboard/cvs" className="text-blue-600 underline">CV Management</a> to create or select a CV.</p>
      </div>
    )
  }
  
  const resumeData = activeCV.data
  const updateResumeData = (updates: any) => updateCVData(activeCVId, updates)

  const addExperience = () => {
    updateResumeData({
      experience: [
        ...resumeData.experience,
        { company: "", position: "", startDate: "", endDate: "", achievements: [] },
      ],
    })
  }

  const removeExperience = (index: number) => {
    updateResumeData({ experience: resumeData.experience.filter((_, i) => i !== index) })
  }

  const addProject = () => {
    updateResumeData({ 
      projects: [
        ...(resumeData.projects || []), 
        { name: "", description: "", technologies: [], highlights: [] }
      ] 
    })
  }

  const removeProject = (index: number) => {
    updateResumeData({ projects: resumeData.projects?.filter((_, i) => i !== index) })
  }

  const addEducation = () => {
    updateResumeData({
      education: [
        ...resumeData.education,
        { institution: "", degree: "", startDate: "", endDate: "" },
      ],
    })
  }

  const removeEducation = (index: number) => {
    updateResumeData({ education: resumeData.education.filter((_, i) => i !== index) })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <header className="sticky top-0 z-40 border-b backdrop-blur" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)' }}>
        <div className="container-modern py-4 flex items-center gap-4">
          <Link href="/dashboard/builder">
            <Button variant="outline" className="btn-secondary"><ArrowLeft className="h-4 w-4" /> Back to builder</Button>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Step 2</p>
            <h1 className="text-xl font-semibold">Personal information</h1>
          </div>
        </div>
      </header>

      <main className="container-modern section-padding">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Info */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Basic details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input 
                    id="name" 
                    className="input-modern" 
                    value={resumeData.personal.fullName} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, fullName: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="input-modern" 
                    value={resumeData.personal.email} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, email: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    className="input-modern" 
                    value={resumeData.personal.phone} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, phone: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    className="input-modern" 
                    placeholder="Software Engineer"
                    value={resumeData.personal.title || ""} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, title: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    className="input-modern" 
                    placeholder="New York, NY"
                    value={resumeData.personal.location || ""} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, location: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    className="input-modern" 
                    placeholder="https://linkedin.com/in/username"
                    value={resumeData.personal.linkedIn || ""} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, linkedIn: e.target.value } 
                    })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input 
                    id="github" 
                    className="input-modern" 
                    placeholder="https://github.com/username"
                    value={resumeData.personal.github || ""} 
                    onChange={(e) => updateResumeData({ 
                      personal: { ...resumeData.personal, github: e.target.value } 
                    })} 
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Autosaves as you type.</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label>Skills (comma-separated)</Label>
              <Textarea
                className="input-modern"
                rows={3}
                placeholder="JavaScript, React, Node.js, TypeScript"
                value={resumeData.skills?.join(", ") || ""}
                onChange={(e) =>
                  updateResumeData({
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
              <p className="text-xs text-muted-foreground">Separate skills with commas</p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="card-modern lg:col-span-2">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" className="btn-secondary" onClick={addExperience}><Plus className="h-4 w-4" /> Add experience</Button>
              </div>
              {resumeData.experience.map((exp, index) => (
                <Card key={index} className="card-feature">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Position</Label>
                      <Input
                        className="input-modern"
                        placeholder="Software Engineer"
                        value={exp.position}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, position: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        className="input-modern"
                        placeholder="Tech Corp"
                        value={exp.company}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, company: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        className="input-modern"
                        placeholder="2023-01"
                        value={exp.startDate}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, startDate: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        className="input-modern"
                        placeholder="Present"
                        value={exp.endDate}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, endDate: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Achievements (one per line)</Label>
                      <Textarea
                        className="input-modern"
                        rows={3}
                        placeholder="Led team of 5 developers&#10;Improved performance by 40%"
                        value={exp.achievements.join("\n")}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, achievements: e.target.value.split("\n").filter(Boolean) }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div className="flex justify-end md:col-span-2">
                      <Button variant="ghost" className="text-destructive" onClick={() => removeExperience(index)}>
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="card-modern lg:col-span-2">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" className="btn-secondary" onClick={addProject}><Plus className="h-4 w-4" /> Add project</Button>
              </div>
              {resumeData.projects?.map((p, index) => (
                <Card key={index} className="card-feature">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Title</Label>
                      <Input
                        className="input-modern"
                        value={p.name}
                        onChange={(e) => {
                          const projects = [...(resumeData.projects || [])]
                          projects[index] = { ...p, name: e.target.value }
                          updateResumeData({ projects })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        className="input-modern"
                        value={p.url || ""}
                        onChange={(e) => {
                          const projects = [...(resumeData.projects || [])]
                          projects[index] = { ...p, url: e.target.value }
                          updateResumeData({ projects })
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        className="input-modern"
                        rows={3}
                        value={p.description}
                        onChange={(e) => {
                          const projects = [...(resumeData.projects || [])]
                          projects[index] = { ...p, description: e.target.value }
                          updateResumeData({ projects })
                        }}
                      />
                    </div>
                    <div className="flex justify-end md:col-span-2">
                      <Button variant="ghost" className="text-destructive" onClick={() => removeProject(index)}>
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="card-modern lg:col-span-2">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Comma-separated</Label>
              <Textarea
                className="input-modern"
                rows={3}
                value={resumeData?.skills?.join(", ")}
                onChange={(e) =>
                  updateResumeData({
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
                placeholder="JavaScript, React, Node.js, TypeScript..."
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
