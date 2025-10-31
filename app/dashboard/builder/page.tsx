"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { CVPreview } from "@/components/cv-preview"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Check, ChevronRight, Eye, EyeOff, Save, Download, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useCVStore } from "@/hooks/use-cv-store"
import { cn } from "@/lib/utils"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { PersonalForm } from "@/components/builder/personal-form"
import { ExperienceForm } from "@/components/builder/experience-form"
import { EducationForm } from "@/components/builder/education-form"
import { SkillsForm } from "@/components/builder/skills-form"
import { ProjectsForm } from "@/components/builder/projects-form"

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
                            <SelectItem key={id} value={id}>
                              {id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </SelectItem>
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

    </div>
  )
}