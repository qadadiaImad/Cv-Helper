"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { CVPreview } from "@/components/cv-preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff, Save, Download, AlertCircle, X } from "lucide-react"
import Link from "next/link"
import { useCVStore } from "@/hooks/use-cv-store"
import { cn } from "@/lib/utils"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { PersonalForm } from "@/components/builder/personal-form"
import { ExperienceForm } from "@/components/builder/experience-form"
import { EducationForm } from "@/components/builder/education-form"
import { SkillsForm } from "@/components/builder/skills-form"
import { ProjectsForm } from "@/components/builder/projects-form"
import type { UniversalResumeData } from "@/lib/schemas"

// Sample data for template preview
const SAMPLE_CV_DATA: UniversalResumeData = {
  personal: {
    fullName: "John Anderson",
    title: "Senior Software Engineer",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/johnanderson",
    github: "github.com/johnanderson",
    website: "johnanderson.dev",
  },
  summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers. Passionate about clean code, best practices, and continuous learning.",
  experience: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      achievements: [
        "Led development of microservices architecture serving 2M+ daily users",
        "Reduced system latency by 40% through optimization and caching strategies",
        "Mentored team of 5 junior developers and conducted code reviews",
        "Implemented CI/CD pipeline reducing deployment time by 60%"
      ]
    },
    {
      company: "Digital Solutions Corp",
      position: "Software Engineer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      location: "Seattle, WA",
      achievements: [
        "Developed RESTful APIs handling 100K+ requests per day",
        "Built responsive web applications using React and TypeScript",
        "Collaborated with cross-functional teams in Agile environment",
        "Improved test coverage from 45% to 85%"
      ]
    },
    {
      company: "StartupXYZ",
      position: "Junior Developer",
      startDate: "Aug 2015",
      endDate: "May 2017",
      location: "Austin, TX",
      achievements: [
        "Contributed to full-stack development of SaaS platform",
        "Implemented user authentication and authorization features",
        "Participated in daily standups and sprint planning"
      ]
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2011",
      endDate: "2015",
      gpa: "3.8/4.0",
      honors: ["Dean's List", "Cum Laude"]
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Python",
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    "Git", "CI/CD", "Agile/Scrum", "REST APIs", "GraphQL"
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
      url: "github.com/johnanderson/ecommerce",
      highlights: [
        "Processed $500K+ in transactions",
        "Implemented secure payment gateway",
        "Built admin dashboard for inventory management"
      ]
    },
    {
      name: "Real-Time Chat Application",
      description: "WebSocket-based chat app with end-to-end encryption",
      technologies: ["React", "Socket.io", "Express", "Redis"],
      url: "github.com/johnanderson/chat-app",
      highlights: [
        "Supports 10K+ concurrent users",
        "End-to-end encryption for privacy",
        "Real-time message delivery"
      ]
    }
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Professional" }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-SA-12345"
    }
  ]
}

type SectionId = 'personal' | 'experience' | 'education' | 'skills' | 'projects'

interface Section {
  id: SectionId
  title: string
  description: string
  requiredFields: string[]
}

const SECTIONS: Section[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Your basic contact details',
    requiredFields: ['personal.fullName', 'personal.email', 'personal.phone'],
  },
  {
    id: 'experience',
    title: 'Work Experience',
    description: 'Your professional background',
    requiredFields: ['experience'],
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Your academic qualifications',
    requiredFields: ['education'],
  },
  {
    id: 'skills',
    title: 'Skills',
    description: 'Your technical and soft skills',
    requiredFields: ['skills'],
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Your notable projects (optional)',
    requiredFields: [],
  },
]

export default function ReactBuilderPage() {
  const searchParams = useSearchParams()
  const { ready, activeCV, activeCVId, updateCVData, changeTemplate } = useCVStore()
  
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [previewVisible, setPreviewVisible] = useState(true)
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null)
  
  // Local state (like playground's resumeData)
  const [localCVData, setLocalCVData] = useState<any>(null)

  // Sync local state when activeCV changes
  useEffect(() => {
    if (activeCV) {
      setLocalCVData(activeCV.data)
    }
  }, [activeCV])
  
  // Auto-save wrapper - updates local state AND store immediately
  const handleDataChange = (data: any) => {
    setLocalCVData(data)
    if (activeCVId) {
      updateCVData(activeCVId, data)
    }
  }
  
  // Redirect if no active CV
  useEffect(() => {
    if (ready && !activeCV) {
      window.location.href = '/dashboard/cvs'
    }
  }, [ready, activeCV])

  // Check if section is complete
  const isSectionComplete = useCallback((sectionId: SectionId): boolean => {
    if (!activeCV) return false
    
    switch (sectionId) {
      case 'personal':
        return !!(activeCV.data.personal.fullName && activeCV.data.personal.email && activeCV.data.personal.phone)
      case 'experience':
        return activeCV.data.experience.length > 0
      case 'education':
        return activeCV.data.education.length > 0
      case 'skills':
        return !!(activeCV.data.skills && activeCV.data.skills.length > 0)
      case 'projects':
        return true // Optional
      default:
        return false
    }
  }, [activeCV])

  // Update completed sections
  useEffect(() => {
    const completed = new Set<SectionId>()
    SECTIONS.forEach(section => {
      if (isSectionComplete(section.id)) {
        completed.add(section.id)
      }
    })
    setCompletedSections(completed)
  }, [activeCV, isSectionComplete])

  // Calculate progress
  const progress = Math.round((completedSections.size / SECTIONS.length) * 100)

  // Save draft
  const handleSaveDraft = () => {
    alert('Draft saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/templates">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Resume Builder</h1>
                <p className="text-sm text-muted-foreground">
                  {progress}% complete • {completedSections.size}/{SECTIONS.length} sections
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setPreviewVisible(!previewVisible)}>
                {previewVisible ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {previewVisible ? 'Hide' : 'Show'} Preview
              </Button>
              <Button size="sm" disabled={completedSections.size < 3}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Collapsible Sections */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Build Your Resume</h2>
              <div className="space-y-3">
                {SECTIONS.map((section, index) => {
                  const isComplete = completedSections.has(section.id)
                  const isOpen = activeSection === section.id
                  const shouldShow = activeSection === null || isOpen
                  
                  if (!shouldShow) return null
                  
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "rounded-lg border-2 transition-all duration-300 shadow-sm hover:shadow-md",
                        isComplete && "border-green-500 bg-green-50/50",
                        !isComplete && "border-slate-200 bg-white",
                        isOpen && "ring-2 ring-blue-500 ring-offset-2"
                      )}
                    >
                      {/* Section Header */}
                      <button
                        onClick={() => setActiveSection(isOpen ? null : section.id)}
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50/80 transition-all duration-200 rounded-lg group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
                            isComplete ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          )}>
                            {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{section.title}</h3>
                            <p className="text-xs text-slate-500">
                              {section.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight 
                            className={cn(
                              "h-5 w-5 text-slate-400 transition-transform duration-200",
                              isOpen && "rotate-90"
                            )} 
                          />
                        </div>
                      </button>

                      {/* Collapsible Form Content */}
                      {isOpen && localCVData && (
                        <div className="px-4 pb-4 border-t animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="pt-4">
                            {section.id === 'personal' && <PersonalForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'experience' && <ExperienceForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'education' && <EducationForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'skills' && <SkillsForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'projects' && <ProjectsForm data={localCVData} onChange={handleDataChange} />}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Tips Card - Only show when no section is open */}
            {!activeSection && (
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Quick Tips</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Fill required sections to unlock PDF export</li>
                      <li>• Your progress is saved automatically</li>
                      <li>• Click any section to edit anytime</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right - Preview */}
          {previewVisible && (
            <div className="lg:col-span-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Live Preview</h2>
                  {activeCV && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">Template:</label>
                      <Select
                        value={activeCV.templateId}
                        onValueChange={(templateId: TemplateId) => {
                          if (activeCVId) {
                            changeTemplate(activeCVId, templateId)
                          }
                        }}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(REACT_TEMPLATES).map((id) => (
                            <div key={id} className="flex items-center justify-between px-2 py-1 hover:bg-slate-100 rounded group">
                              <SelectItem value={id} className="flex-1 border-0">
                                {id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </SelectItem>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setPreviewTemplateId(id as TemplateId)
                                  setShowTemplatePreview(true)
                                }}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                {ready && activeCV && localCVData && (
                  <>
                    <CVPreview 
                      data={localCVData} 
                      selectedTemplate={activeCV.templateId} 
                      showToolbar={false} 
                    />
                  </>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Template Preview Modal */}
      {showTemplatePreview && previewTemplateId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h3 className="text-xl font-bold">Template Preview</h3>
                <p className="text-sm text-slate-600">
                  {previewTemplateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Sample Data
                </p>
              </div>
              <div className="flex items-center gap-2">
                {previewTemplateId !== activeCV?.templateId && (
                  <Button
                    onClick={() => {
                      if (activeCVId) {
                        changeTemplate(activeCVId, previewTemplateId)
                        setShowTemplatePreview(false)
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Use This Template
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTemplatePreview(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <CVPreview 
                  data={SAMPLE_CV_DATA} 
                  selectedTemplate={previewTemplateId} 
                  showToolbar={false} 
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Preview with sample data - Your content will replace this when you use the template
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowTemplatePreview(false)}
                >
                  Close
                </Button>
                {previewTemplateId !== activeCV?.templateId && (
                  <Button
                    onClick={() => {
                      if (activeCVId) {
                        changeTemplate(activeCVId, previewTemplateId)
                        setShowTemplatePreview(false)
                      }
                    }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Use This Template
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}