"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CVPreview } from "@/components/cv-preview"
import type { CVData, Experience, Education, Skill } from "@/types/cv"
import { Download, Plus, Trash2, Eye, FileText, User, Briefcase, GraduationCap, Award, Settings } from "lucide-react"

export default function CVBuilderPage() {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    template: "modern",
  })

  const [activeTab, setActiveTab] = useState("personal")

  const updatePersonalInfo = (field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      category: "technical",
    }
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">CV Builder</h1>
                <p className="text-sm text-muted-foreground">Create your professional resume</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={cvData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          placeholder="Frontend Engineer"
                          value={cvData.personalInfo.title}
                          onChange={(e) => updatePersonalInfo("title", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={cvData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={cvData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="San Francisco, CA"
                          value={cvData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo("location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          placeholder="https://johndoe.com"
                          value={cvData.personalInfo.website}
                          onChange={(e) => updatePersonalInfo("website", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="linkedin.com/in/johndoe"
                          value={cvData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          placeholder="github.com/johndoe"
                          value={cvData.personalInfo.github}
                          onChange={(e) => updatePersonalInfo("github", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        placeholder="Brief overview of your professional background and key achievements..."
                        rows={4}
                        value={cvData.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Work Experience
                      </CardTitle>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cvData.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Experience {index + 1}</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                              placeholder="Job Title"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                              placeholder="City, State"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              placeholder="MM/YYYY"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              placeholder="MM/YYYY or Present"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    {cvData.experience.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                      </CardTitle>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cvData.education.map((edu, index) => (
                      <div key={edu.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Education {index + 1}</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Institution</Label>
                            <Input
                              placeholder="University Name"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                              placeholder="Bachelor of Science"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                              placeholder="Computer Science"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                              placeholder="City, State"
                              value={edu.location}
                              onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              placeholder="MM/YYYY"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              placeholder="MM/YYYY"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>GPA (Optional)</Label>
                            <Input
                              placeholder="3.8"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {cvData.education.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <GraduationCap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No education added yet.</p>
                        <p className="text-sm">Click "Add Education" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Skills
                      </CardTitle>
                      <Button onClick={addSkill} size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cvData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center gap-2">
                          <Input
                            placeholder="Skill name"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                            className="flex-1"
                          />
                          <select
                            value={skill.category}
                            onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                          >
                            <option value="technical">Technical</option>
                            <option value="soft">Soft Skills</option>
                            <option value="language">Languages</option>
                            <option value="other">Other</option>
                          </select>
                          <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {cvData.skills.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Award className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No skills added yet.</p>
                        <p className="text-sm">Click "Add Skill" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Template Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Template Style</Label>
                      <select
                        value={cvData.template}
                        onChange={(e) => setCvData((prev) => ({ ...prev, template: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                      >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="minimal">Minimal</option>
                        <option value="creative">Creative</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-muted/30 p-4">
                  <div className="transform scale-50 origin-top-left">
                    <CVPreview data={cvData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
