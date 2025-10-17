"use client"

import * as React from "react"
import Link from "next/link"
import { useResumeStore } from "@/hooks/use-resume-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trash2, Link2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function PersonalInfoPage() {
  const { resumeData, updateResumeData } = useResumeStore()

  const addLink = () => {
    updateResumeData({ links: [...resumeData.links, { label: "", url: "" }] })
  }

  const removeLink = (index: number) => {
    updateResumeData({ links: resumeData.links.filter((_, i) => i !== index) })
  }

  const addExperience = () => {
    updateResumeData({
      experience: [
        ...resumeData.experience,
        { role: "", company: "", period: "", details: [""] },
      ],
    })
  }

  const removeExperience = (index: number) => {
    updateResumeData({ experience: resumeData.experience.filter((_, i) => i !== index) })
  }

  const addProject = () => {
    updateResumeData({ projects: [...resumeData.projects, { title: "", description: "", link: "" }] })
  }

  const removeProject = (index: number) => {
    updateResumeData({ projects: resumeData.projects.filter((_, i) => i !== index) })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
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
                  <Input id="name" className="input-modern" value={resumeData.name} onChange={(e) => updateResumeData({ name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="input-modern" value={resumeData.email} onChange={(e) => updateResumeData({ email: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" className="input-modern" value={resumeData.phone} onChange={(e) => updateResumeData({ phone: e.target.value })} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Autosaves as you type.</p>
            </CardContent>
          </Card>

          {/* Links */}
          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="h-4 w-4" /> Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resumeData.links.map((l, i) => (
                <div key={i} className="grid gap-3 md:grid-cols-[1fr_2fr_min-content] items-end">
                  <div className="space-y-1">
                    <Label>Label</Label>
                    <Input
                      className="input-modern"
                      placeholder="GitHub"
                      value={l.label}
                      onChange={(e) => {
                        const links = [...resumeData.links]
                        links[i] = { ...l, label: e.target.value }
                        updateResumeData({ links })
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>URL</Label>
                    <Input
                      className="input-modern"
                      placeholder="https://github.com/username"
                      value={l.url}
                      onChange={(e) => {
                        const links = [...resumeData.links]
                        links[i] = { ...l, url: e.target.value }
                        updateResumeData({ links })
                      }}
                    />
                  </div>
                  <Button variant="ghost" onClick={() => removeLink(i)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div>
                <Button variant="outline" onClick={addLink} className="btn-secondary"><Plus className="h-4 w-4" /> Add link</Button>
              </div>
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
                      <Label>Role</Label>
                      <Input
                        className="input-modern"
                        value={exp.role}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, role: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        className="input-modern"
                        value={exp.company}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, company: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Period</Label>
                      <Input
                        className="input-modern"
                        value={exp.period}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, period: e.target.value }
                          updateResumeData({ experience })
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Details (one per line)</Label>
                      <Textarea
                        className="input-modern"
                        rows={3}
                        value={exp.details.join("\n")}
                        onChange={(e) => {
                          const experience = [...resumeData.experience]
                          experience[index] = { ...exp, details: e.target.value.split("\n").filter(Boolean) }
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
              {resumeData.projects.map((p, index) => (
                <Card key={index} className="card-feature">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Title</Label>
                      <Input
                        className="input-modern"
                        value={p.title}
                        onChange={(e) => {
                          const projects = [...resumeData.projects]
                          projects[index] = { ...p, title: e.target.value }
                          updateResumeData({ projects })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        className="input-modern"
                        value={p.link || ""}
                        onChange={(e) => {
                          const projects = [...resumeData.projects]
                          projects[index] = { ...p, link: e.target.value }
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
                          const projects = [...resumeData.projects]
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
                value={resumeData.skills.join(", ")}
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
