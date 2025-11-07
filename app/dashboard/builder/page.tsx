"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { CVPreview } from "@/components/cv-preview"
import { InlineCVPreview } from "@/components/inline-cv-preview"
import { AtlanticBlueEditable } from "@/templates/react/template-1-atlantic-blue-editable"
import { AtlanticBlueFieldEditable } from "@/templates/react/template-1-atlantic-blue-field-editable"
import { getFieldEditableTemplate } from "@/lib/field-editable-templates"
import { updateNestedField } from "@/lib/field-updater"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff, Save, Download, AlertCircle, X } from "lucide-react"
import Link from "next/link"
import { useCVStore } from "@/hooks/use-cv-store"
import { cn } from "@/lib/utils"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { PersonalForm } from '@/components/builder/personal-form'
import { SummaryForm } from '@/components/builder/summary-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'
import { ProjectsForm } from '@/components/builder/projects-form'
import { AnimatedBackground } from "@/components/animated-background"
import { WritingAnimationIcon } from "@/components/writing-animation-icon"
import { getTemplateTheme } from "@/lib/template-themes"
import type { UniversalResumeData } from "@/lib/schemas"

// Enhanced sample data to showcase template potential
const SAMPLE_CV_DATA: UniversalResumeData = {
  personal: {
    fullName: "Sarah Mitchell",
    title: "Senior Full-Stack Developer & Cloud Architect",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/sarahmitchell",
    github: "github.com/sarahmitchell",
    website: "sarahmitchell.dev",
    portfolio: "portfolio.sarahmitchell.dev",
    photo: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      size: 120,
      borderRadius: 50,
      effects: {
        grayscale: false,
        border: true,
        hidden: false
      }
    }
  },
  summary: "Innovative Full-Stack Developer with 10+ years of experience architecting and delivering enterprise-scale applications. Expert in modern JavaScript frameworks, cloud infrastructure, and DevOps practices. Proven track record of leading cross-functional teams, optimizing system performance by 60%+, and mentoring 20+ junior developers. Passionate about clean code, scalable architecture, and creating exceptional user experiences.",
  experience: [
    {
      company: "TechCorp Global",
      position: "Senior Full-Stack Developer & Tech Lead",
      startDate: "Jan 2021",
      endDate: "Present",
      location: "San Francisco, CA",
      achievements: [
        "Led development of microservices architecture serving 5M+ daily active users with 99.99% uptime",
        "Reduced API response time by 65% through Redis caching and database query optimization",
        "Architected and deployed Kubernetes-based infrastructure reducing cloud costs by $200K annually",
        "Mentored team of 8 developers and established code review best practices",
        "Implemented comprehensive CI/CD pipeline reducing deployment time from 2 hours to 15 minutes",
        "Spearheaded migration from monolith to microservices, improving system scalability by 300%"
      ]
    },
    {
      company: "Digital Innovations Inc.",
      position: "Full-Stack Software Engineer",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      location: "Seattle, WA",
      achievements: [
        "Developed and maintained RESTful APIs handling 500K+ requests per day",
        "Built responsive React applications with TypeScript, improving code quality by 40%",
        "Collaborated with UX team to redesign platform, increasing user engagement by 85%",
        "Implemented automated testing suite, improving test coverage from 35% to 92%",
        "Led Agile ceremonies and mentored 3 junior developers"
      ]
    },
    {
      company: "StartupHub Technologies",
      position: "Software Developer",
      startDate: "Jun 2015",
      endDate: "Feb 2018",
      location: "Austin, TX",
      achievements: [
        "Contributed to full-stack development of SaaS platform used by 10K+ businesses",
        "Implemented OAuth 2.0 authentication and role-based access control",
        "Optimized database queries reducing page load time by 50%",
        "Participated in daily standups, sprint planning, and retrospectives"
      ]
    },
    {
      company: "WebDev Solutions",
      position: "Junior Web Developer",
      startDate: "Aug 2013",
      endDate: "May 2015",
      location: "Austin, TX",
      achievements: [
        "Developed responsive websites for 20+ clients using HTML, CSS, and JavaScript",
        "Collaborated with designers to implement pixel-perfect UI components",
        "Maintained and updated legacy codebases"
      ]
    }
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2011",
      endDate: "2013",
      gpa: "3.9/4.0",
      honors: ["Summa Cum Laude", "Graduate Research Fellowship", "Outstanding Thesis Award"]
    },
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science & Mathematics",
      startDate: "2007",
      endDate: "2011",
      gpa: "3.85/4.0",
      honors: ["Dean's List (All Semesters)", "Magna Cum Laude", "Phi Beta Kappa"]
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
    "Node.js", "Express", "Python", "Django", "FastAPI",
    "AWS", "Azure", "Docker", "Kubernetes", "Terraform",
    "PostgreSQL", "MongoDB", "Redis", "Elasticsearch",
    "Git", "CI/CD", "Jenkins", "GitHub Actions",
    "REST APIs", "GraphQL", "WebSockets", "Microservices",
    "Agile/Scrum", "TDD", "System Design", "Cloud Architecture"
  ],
  projects: [
    {
      name: "CloudScale - Enterprise SaaS Platform",
      description: "Scalable multi-tenant SaaS platform with real-time analytics and AI-powered insights",
      technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Kubernetes"],
      url: "github.com/sarahmitchell/cloudscale",
      highlights: [
        "Serves 50K+ businesses with 99.99% uptime",
        "Processes 10M+ events daily with real-time analytics",
        "Reduced infrastructure costs by 40% through optimization"
      ]
    },
    {
      name: "DevTools Pro - Developer Productivity Suite",
      description: "Open-source toolkit for developers with code analysis, debugging, and performance monitoring",
      technologies: ["TypeScript", "Electron", "React", "WebAssembly"],
      url: "github.com/sarahmitchell/devtools-pro",
      highlights: [
        "10K+ GitHub stars and 500+ contributors",
        "Featured in TechCrunch and Hacker News",
        "Used by developers at Google, Microsoft, and Amazon"
      ]
    },
    {
      name: "AI Code Assistant",
      description: "Machine learning-powered code completion and refactoring tool",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      url: "github.com/sarahmitchell/ai-code-assistant",
      highlights: [
        "Trained on 100M+ lines of code",
        "Improves developer productivity by 35%",
        "Supports 15+ programming languages"
      ]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      date: "2022",
      expiryDate: "2025",
      credentialId: "AWS-PSA-12345",
      url: "aws.amazon.com/verification"
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2021",
      expiryDate: "2024",
      credentialId: "CKA-67890"
    }
  ],
  languages: [
    {
      name: "English",
      proficiency: "Native"
    },
    {
      name: "Spanish",
      proficiency: "Professional"
    },
    {
      name: "French",
      proficiency: "Intermediate"
    }
  ]
}

type SectionId = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects'

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
    id: 'summary',
    title: 'Professional Summary',
    description: 'Brief overview of your profile',
    requiredFields: [],
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
  
  const [localCVData, setLocalCVData] = useState<UniversalResumeData | null>(null)
  const [previewVisible, setPreviewVisible] = useState(true)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  const [previewTemplateId, setPreviewTemplateId] = useState<TemplateId | null>(null)
  
  // Inline editing state
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [tempData, setTempData] = useState<UniversalResumeData | null>(null)
  
  // Edit mode toggle: true = field-editable, false = normal template with forms
  const [useFieldEditable, setUseFieldEditable] = useState(true)
  
  // Sync local state when activeCV changes
  useEffect(() => {
    if (activeCV) {
      // Use sample data if CV is empty to showcase template potential
      const hasMinimalData = !activeCV.data.personal?.fullName || 
                            (!activeCV.data.experience || activeCV.data.experience.length === 0)
      
      setLocalCVData(hasMinimalData ? SAMPLE_CV_DATA : activeCV.data)
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
    if (!localCVData) return false
    
    switch (sectionId) {
      case 'personal':
        return !!(localCVData.personal && localCVData.personal.fullName && localCVData.personal.email && localCVData.personal.phone)
      case 'summary':
        return !!(localCVData.summary && localCVData.summary.length > 20) // At least 20 chars
      case 'experience':
        return localCVData.experience.length > 0
      case 'education':
        return localCVData.education.length > 0
      case 'skills':
        return !!(localCVData.skills && localCVData.skills.length > 0)
      case 'projects':
        return true // Optional
      default:
        return false
    }
  }, [localCVData])

  // Update completed sections
  useEffect(() => {
    const completed = new Set<SectionId>()
    SECTIONS.forEach(section => {
      if (isSectionComplete(section.id)) {
        completed.add(section.id)
      }
    })
    setCompletedSections(completed)
  }, [localCVData, isSectionComplete])

  // Calculate progress
  const progress = Math.round((completedSections.size / SECTIONS.length) * 100)

  // Save draft
  const handleSaveDraft = () => {
    alert('Draft saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Animated Background */}
      <AnimatedBackground />
      
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
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-bounce">🔨</span>
                <h1 className="text-xl font-bold">Builder</h1>
                {activeCV && (
                  <>
                    <span className="text-slate-300">•</span>
                    <Select
                      value={activeCV.templateId}
                      onValueChange={(templateId: TemplateId) => {
                        if (activeCVId) {
                          changeTemplate(activeCVId, templateId)
                        }
                      }}
                    >
                      <SelectTrigger className="w-[180px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(REACT_TEMPLATES).map((id) => (
                          <SelectItem key={id} value={id}>
                            {id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Edit Mode Toggle */}
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
                <span className="text-xs font-medium text-slate-600">Edit Mode:</span>
                <button
                  onClick={() => setUseFieldEditable(!useFieldEditable)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    useFieldEditable ? "bg-blue-600" : "bg-slate-300"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      useFieldEditable ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
                <span className="text-xs font-medium text-slate-700">
                  {useFieldEditable ? 'In Template' : 'With Forms'}
                </span>
              </div>
              
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {useFieldEditable ? (
          // Field-Editable Mode: Full-width template with inline editing
          <div className="max-w-5xl mx-auto">
            {ready && activeCV && localCVData && (
              <div className="relative">
                {/* Writing Animation Icon */}
                <div className="fixed bottom-8 right-8 z-40">
                  <WritingAnimationIcon 
                    progress={progress} 
                    isEditing={false}
                  />
                </div>
                
                <Card className="p-0 shadow-2xl bg-white overflow-hidden">
                  {(() => {
                    const TemplateComponent = getFieldEditableTemplate(activeCV.templateId)
                    return (
                      <TemplateComponent
                        data={localCVData}
                        editMode={true}
                        onFieldChange={(path, value) => {
                          const updatedData = updateNestedField(localCVData, path, value)
                          handleDataChange(updatedData)
                        }}
                      />
                    )
                  })()}
                </Card>
              </div>
            )}
          </div>
        ) : (
          // Normal Mode: Sidebar with forms + read-only template preview
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Collapsible Sections */}
          <div className="lg:col-span-4 space-y-4">
            <Card 
              className="p-6 border-2" 
              style={{
                background: getTemplateTheme(activeCV?.templateId).background,
                borderColor: getTemplateTheme(activeCV?.templateId).border
              }}
            >
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
                            {section.id === 'summary' && <SummaryForm data={localCVData} onChange={handleDataChange} />}
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
              <>
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
                
                {/* Writing Animation */}
                <WritingAnimationIcon 
                  progress={progress} 
                  isEditing={!!activeSection}
                />
              </>
            )}
          </div>

          {/* Right - Preview */}
          {previewVisible && ready && activeCV && localCVData && (
            <div className="lg:col-span-8">
              <Card className="p-0 shadow-2xl bg-white overflow-hidden sticky top-24">
                {(() => {
                  const TemplateComponent = getFieldEditableTemplate(activeCV.templateId)
                  return <TemplateComponent data={localCVData} editMode={false} onFieldChange={() => {}} />
                })()}
              </Card>
            </div>
          )}
        </div>
        )}
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