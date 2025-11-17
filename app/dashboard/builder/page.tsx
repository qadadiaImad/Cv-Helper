"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { getFieldEditableTemplate } from "@/lib/field-editable-templates"
import { updateNestedField } from "@/lib/field-updater"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check, ChevronRight, Save, Download, AlertCircle, X, Sparkles, Upload, Minimize2, Maximize2, Type, Bold, Italic, Underline, List, ListOrdered } from "lucide-react"
import Link from "next/link"
import { useCVStore } from "@/hooks/use-cv-store"
import { cn } from "@/lib/utils"
import { type TemplateId } from "@/lib/react-templates"
import { PersonalForm } from '@/components/builder/personal-form'
import { SummaryForm } from '@/components/builder/summary-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'
import { ProjectsForm } from '@/components/builder/projects-form'
import { AnimatedBackground } from "@/components/animated-background"
import { useTheme } from "@/lib/theme-context"
import { TemplateGallery } from "@/components/template-gallery"
import { ContextToolbar } from "@/components/builder/context-toolbar"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { UpgradeModal } from "@/components/upgrade-modal"
import { useSubscription } from "@/hooks/use-subscription"
import { getTemplateTheme } from "@/lib/template-themes"
import type { UniversalResumeData } from "@/lib/schemas"

const SAMPLE_CV_DATA: UniversalResumeData = {
  personal: {
    fullName: "Sarah Mitchell",
    title: "Senior Full-Stack Developer",
    email: "sarah@email.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA"
  },
  summary: "Innovative Full-Stack Developer with 10+ years of experience.",
  experience: [{
    company: "TechCorp",
    position: "Senior Developer",
    startDate: "Jan 2021",
    endDate: "Present",
    location: "SF, CA",
    achievements: ["Led development of microservices architecture"]
  }],
  education: [{
    institution: "Stanford University",
    degree: "Master of Science",
    field: "Computer Science",
    startDate: "2011",
    endDate: "2013"
  }],
  skills: ["JavaScript", "TypeScript", "React", "Node.js"],
  projects: [],
  certifications: [],
  languages: []
}

type SectionId = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects'

interface Section {
  id: SectionId
  title: string
  description: string
  requiredFields: string[]
}

const SECTIONS: Section[] = [
  { id: 'personal', title: 'Personal Information', description: 'Your basic contact details', requiredFields: ['personal.fullName'] },
  { id: 'summary', title: 'Professional Summary', description: 'Brief overview', requiredFields: [] },
  { id: 'experience', title: 'Work Experience', description: 'Professional background', requiredFields: ['experience'] },
  { id: 'education', title: 'Education', description: 'Academic qualifications', requiredFields: ['education'] },
  { id: 'skills', title: 'Skills', description: 'Technical skills', requiredFields: ['skills'] },
  { id: 'projects', title: 'Projects', description: 'Portfolio projects', requiredFields: [] },
]

export default function ReactBuilderPage() {
  const { ready, activeCV, activeCVId, updateCVData, changeTemplate } = useCVStore()
  const { theme } = useTheme()
  const { limits, canUseAI } = useSubscription()
  const { isOpen, feature, showUpgradeModal, closeUpgradeModal } = useUpgradeModal()

  const [localCVData, setLocalCVData] = useState<UniversalResumeData | null>(null)
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set())
  const [showTemplateGallery, setShowTemplateGallery] = useState(false)
  const [useFieldEditable, setUseFieldEditable] = useState(true)
  const [activeEditField, setActiveEditField] = useState<{ path: string; type: 'text' | 'richtext' | 'list' | 'skills' | null; position?: { top: number; left: number } }>({ path: '', type: null })
  const [importing, setImporting] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [formatStates, setFormatStates] = useState({ bold: false, italic: false, underline: false })
  const [editingAchievement, setEditingAchievement] = useState<{ expIndex: number; achIndex: number } | null>(null)
  const blurTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (activeCV) {
      const hasMinimalData = !activeCV.data.personal?.fullName
      setLocalCVData(hasMinimalData ? SAMPLE_CV_DATA : activeCV.data)
    }
  }, [activeCV])

  const handleDataChange = (data: any) => {
    setLocalCVData(data)
    if (activeCVId) updateCVData(activeCVId, data)
  }

  useEffect(() => {
    if (ready && !activeCV) window.location.href = '/dashboard/cvs'
  }, [ready, activeCV])

  const isSectionComplete = useCallback((sectionId: SectionId): boolean => {
    if (!localCVData) return false
    switch (sectionId) {
      case 'personal': return !!(localCVData.personal?.fullName)
      case 'summary': return !!(localCVData.summary && localCVData.summary.length > 20)
      case 'experience': return localCVData.experience.length > 0
      case 'education': return localCVData.education.length > 0
      case 'skills': return !!(localCVData.skills && localCVData.skills.length > 0)
      default: return true
    }
  }, [localCVData])

  useEffect(() => {
    const completed = new Set<SectionId>()
    SECTIONS.forEach(section => {
      if (isSectionComplete(section.id)) completed.add(section.id)
    })
    setCompletedSections(completed)
  }, [localCVData, isSectionComplete])

  // Check current formatting state
  const updateFormatStates = useCallback(() => {
    setFormatStates({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline')
    })
  }, [])

  // Update format states when selection changes
  useEffect(() => {
    if (activeEditField.type !== null) {
      const handleSelectionChange = () => {
        updateFormatStates()
      }
      document.addEventListener('selectionchange', handleSelectionChange)
      return () => document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [activeEditField.type, updateFormatStates])

  const progress = Math.round((completedSections.size / SECTIONS.length) * 100)

  // Memoize template rendering to prevent re-renders when activeEditField changes
  const templateElement = useMemo(() => {
    if (!ready || !activeCV || !localCVData) return null
    
    const TemplateComponent = getFieldEditableTemplate(activeCV.templateId)
    
    const handleFieldChange = (path: string, value: any) => {
      const updatedData = updateNestedField(localCVData, path, value)
      handleDataChange(updatedData)
    }
    
    const handleFieldEditStart = (path: string, type: 'text' | 'richtext' | 'list' | 'skills', position?: { top: number; left: number }) => {
      console.log('[Builder] Field edit started:', path, type, position)
      setActiveEditField({ path, type, position })
    }
    
    const handleFieldEditEnd = () => {
      console.log('[Builder] Field edit ended')
      setActiveEditField({ path: '', type: null })
    }
    
    return (
      <TemplateComponent
        data={localCVData}
        editMode={true}
        onFieldChange={handleFieldChange}
        onFieldEditStart={handleFieldEditStart}
        onFieldEditEnd={handleFieldEditEnd}
      />
    )
  }, [ready, activeCV, localCVData])

  const handleImportCV = async (file: File) => {
    try {
      setImporting(true)
      let text: string
      if (file.type === 'application/pdf') {
        const { extractTextFromPDF } = await import('@/lib/utils/pdf-extractor')
        text = await extractTextFromPDF(file)
      } else {
        text = await file.text()
      }
      if (!text || text.length < 50) throw new Error('Could not extract text')
      const response = await fetch('/api/ai/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_text: text }),
      })
      if (!response.ok) throw new Error('Failed to parse CV')
      const data = await response.json()
      if (data.clean_cv && activeCVId) {
        const { mapParsedCVToSchema } = await import('@/lib/utils/cv-data-mapper')
        const mappedData = mapParsedCVToSchema(data.clean_cv)
        handleDataChange(mappedData)
        setShowImportDialog(false)
        setSelectedFile(null)
        alert('CV imported successfully!')
      }
    } catch (error: any) {
      alert(error.message || 'Failed to import CV')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${theme.bg}, ${theme.bgSecondary})` }} suppressHydrationWarning>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl" style={{ background: `linear-gradient(to bottom right, ${theme.accent}40, ${theme.accent}20)` }} />
      </div>
      <AnimatedBackground />

      {/* Context Toolbar for Forms Mode */}
      {!useFieldEditable && (
        <ContextToolbar 
          isActive={activeEditField.type !== null}
          editingFieldType={activeEditField.type}
        />
      )}

      {/* Right Panel - Unified Toolbar */}
      <div className="fixed right-0 top-20 bottom-0 w-80 backdrop-blur-xl border-l-4 z-40 overflow-y-auto" style={{ backgroundColor: `${theme.bg}f5`, borderColor: `${theme.accent}60`, boxShadow: `-8px 0 40px ${theme.accent}25` }} suppressHydrationWarning>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `linear-gradient(135deg, ${theme.accent}20 0%, transparent 50%, ${theme.accent}10 100%)` }} suppressHydrationWarning />
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)] pointer-events-none" />
        
        <div className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔨</span>
              <h2 className="text-xl font-bold">Builder</h2>
            </div>
            <Link href="/dashboard/cvs"><Button variant="ghost" size="sm"><X className="h-4 w-4" /></Button></Link>
          </div>

          {/* Template Selection */}
          {activeCV && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Template</Label>
              <Button variant="outline" className="w-full justify-between" onClick={() => setShowTemplateGallery(true)}>
                <span className="truncate">{activeCV.templateId.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
              </Button>
            </div>
          )}

          {/* Edit Mode Toggle */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <Label className="text-sm font-semibold">Edit Mode</Label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{useFieldEditable ? 'Visual Editing' : 'Forms Mode'}</span>
              <button onClick={() => setUseFieldEditable(!useFieldEditable)} className={cn("relative inline-flex h-7 w-12 items-center rounded-full transition-colors", useFieldEditable ? "bg-blue-600" : "bg-slate-300")}>
                <span className={cn("inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md", useFieldEditable ? "translate-x-6" : "translate-x-1")} />
              </button>
            </div>
            <p className="text-xs text-slate-500">{useFieldEditable ? 'Click fields to edit inline with AI tools' : 'Use forms for structured data entry'}</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start border-2 border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_import'); return; } setShowImportDialog(true); }} disabled={importing}>
              <Upload className="h-4 w-4 mr-2" />Import CV
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => alert('Saved!')}>
              <Save className="h-4 w-4 mr-2" />Save Draft
            </Button>
            <Button variant="default" className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('AI Polish coming soon!'); }}>
              <Sparkles className="h-4 w-4 mr-2" />AI Polish (Pro)
            </Button>
            <Button className="w-full justify-start" disabled={completedSections.size < 3}>
              <Download className="h-4 w-4 mr-2" />Export PDF
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-2 p-3 rounded-lg border" style={{ backgroundColor: `${theme.accent}10`, borderColor: `${theme.accent}30` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-bold" style={{ color: theme.accent }}>{progress}%</span>
              <span className="text-xs font-medium" style={{ color: theme.accent }}>{completedSections.size}/{SECTIONS.length} sections</span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ backgroundColor: `${theme.accent}30` }}>
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: `linear-gradient(to right, ${theme.accent}, ${theme.accent}dd)` }} />
            </div>
          </div>

          {/* Editing Status Indicator */}
          {activeEditField.type !== null && (
            <div className="space-y-2 p-3 rounded-lg border-2 animate-in fade-in duration-200" style={{ backgroundColor: `${theme.accent}10`, borderColor: `${theme.accent}50` }}>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                <span className="text-xs font-medium" style={{ color: theme.accent }}>
                  Editing {activeEditField.type === 'richtext' ? 'Rich Text' : activeEditField.type === 'list' ? 'List' : activeEditField.type === 'skills' ? 'Skills' : 'Text'}
                </span>
              </div>
              <p className="text-xs text-slate-500">AI tools available in floating toolbar</p>
            </div>
          )}

          {/* Back Button */}
          <Link href="/dashboard/cvs"><Button variant="ghost" className="w-full justify-start"><ArrowLeft className="h-4 w-4 mr-2" />Back to Dashboard</Button></Link>
        </div>
      </div>

      {/* Floating Contextual Toolbar - Compact version */}
      {activeEditField.type !== null && activeEditField.position && (
        <div 
          className="fixed z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          style={{
            top: `${activeEditField.position.top - 70}px`,
            left: `${Math.max(activeEditField.position.left, 200)}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border p-2 max-w-[500px]" style={{ borderColor: `${theme.accent}60` }}>
            {/* Compact Single Row Layout */}
            <div className="flex items-center gap-1 flex-wrap">
              {/* Text Formatting */}
              <Button 
                size="sm" 
                variant={formatStates.bold ? "default" : "ghost"} 
                className={cn("h-7 w-7 p-0", formatStates.bold && "bg-blue-600 text-white hover:bg-blue-700")} 
                title="Bold" 
                onClick={() => { document.execCommand('bold'); updateFormatStates(); }}
              >
                <Bold className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="sm" 
                variant={formatStates.italic ? "default" : "ghost"} 
                className={cn("h-7 w-7 p-0", formatStates.italic && "bg-blue-600 text-white hover:bg-blue-700")} 
                title="Italic" 
                onClick={() => { document.execCommand('italic'); updateFormatStates(); }}
              >
                <Italic className="h-3.5 w-3.5" />
              </Button>
              <Button 
                size="sm" 
                variant={formatStates.underline ? "default" : "ghost"} 
                className={cn("h-7 w-7 p-0", formatStates.underline && "bg-blue-600 text-white hover:bg-blue-700")} 
                title="Underline" 
                onClick={() => { document.execCommand('underline'); updateFormatStates(); }}
              >
                <Underline className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Bullet List" onClick={() => document.execCommand('insertUnorderedList')}>
                <List className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Numbered List" onClick={() => document.execCommand('insertOrderedList')}>
                <ListOrdered className="h-3.5 w-3.5" />
              </Button>
              
              <div className="w-px h-5 bg-slate-300 mx-0.5" />
              
              {/* AI Tools - Compact */}
              {(activeEditField.type === 'text' || activeEditField.type === 'richtext') && (
                <>
                  <Button size="sm" variant="outline" className="gap-0.5 text-xs h-7 px-2" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('AI Continue!'); }}>
                    <Sparkles className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="gap-0.5 text-xs h-7 px-2" title="Improve" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('AI Improve!'); }}>
                    <Sparkles className="h-3 w-3" />+
                  </Button>
                  <Button size="sm" variant="outline" className="gap-0.5 text-xs h-7 px-2" title="Grammar" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('Fix Grammar!'); }}>
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 px-2" title="Shorter"><Minimize2 className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 px-2" title="Longer"><Maximize2 className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 px-2" title="Simplify"><Type className="h-3 w-3" /></Button>
                </>
              )}

              {activeEditField.type === 'list' && (
                <>
                  <Button size="sm" variant="outline" className="gap-1 text-xs h-7 px-2" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('Improve!'); }}>
                    <Sparkles className="h-3 w-3" />Improve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-xs h-7 px-2" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('Add More!'); }}>
                    <Sparkles className="h-3 w-3" />Add
                  </Button>
                </>
              )}

              {activeEditField.type === 'skills' && (
                <Button size="sm" variant="outline" className="gap-1 text-xs h-7 px-2" onClick={() => { if (!canUseAI()) { showUpgradeModal('ai_polish'); return; } alert('Suggest!'); }}>
                  <Sparkles className="h-3 w-3" />Suggest
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pr-84">
        {useFieldEditable ? (
          // Visual Editing Mode
          <div className="max-w-4xl mx-auto">
            {templateElement && (
              <Card className="p-0 shadow-2xl bg-white overflow-hidden">
                {templateElement}
              </Card>
            )}
          </div>
        ) : (
          // Forms Mode - Full width, no preview
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 border-2" style={{ background: getTemplateTheme(activeCV?.templateId).background, borderColor: getTemplateTheme(activeCV?.templateId).border }}>
              <h2 className="text-xl font-semibold mb-6">Build Your Resume</h2>
              <div className="space-y-3">
                {SECTIONS.map((section, index) => {
                  const isComplete = completedSections.has(section.id)
                  const isOpen = activeSection === section.id
                  const shouldShow = activeSection === null || isOpen
                  
                  if (!shouldShow) return null
                  
                  return (
                    <div key={section.id} className={cn("rounded-lg border-2 transition-all duration-300 shadow-sm hover:shadow-md", isComplete && "border-green-500 bg-green-50/50", !isComplete && "border-slate-200 bg-white", isOpen && "ring-2 ring-blue-500 ring-offset-2")}>
                      <button onClick={() => setActiveSection(isOpen ? null : section.id)} className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50/80 transition-all duration-200 rounded-lg group">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200", isComplete ? "bg-green-500 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200")}>
                            {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{section.title}</h3>
                            <p className="text-xs text-slate-500">{section.description}</p>
                          </div>
                        </div>
                        <ChevronRight className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "rotate-90")} />
                      </button>

                      {isOpen && localCVData && (
                        <div className="px-4 pb-4 border-t animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="pt-4">
                            {section.id === 'personal' && <PersonalForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'summary' && <SummaryForm data={localCVData} onChange={handleDataChange} />}
                            {section.id === 'experience' && (
                              <ExperienceForm 
                                data={localCVData} 
                                onChange={handleDataChange}
                                onAchievementFocus={(expIndex, achIndex) => {
                                  console.log('[Builder] Achievement focused:', expIndex, achIndex)
                                  // Clear any pending blur timeout
                                  if (blurTimeoutRef.current) {
                                    clearTimeout(blurTimeoutRef.current)
                                  }
                                  setEditingAchievement({ expIndex, achIndex })
                                  setActiveEditField({ path: `experience.${expIndex}.achievements.${achIndex}`, type: 'richtext' })
                                  console.log('[Builder] activeEditField set to richtext')
                                }}
                                onAchievementBlur={() => {
                                  console.log('[Builder] Achievement blur')
                                  // Delay the blur to prevent toolbar from disappearing when clicking toolbar buttons
                                  blurTimeoutRef.current = setTimeout(() => {
                                    setEditingAchievement(null)
                                    setActiveEditField({ path: '', type: null })
                                    console.log('[Builder] activeEditField cleared')
                                  }, 200)
                                }}
                              />
                            )}
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

            {!activeSection && (
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm mt-4">
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
        )}
      </main>

      {/* Template Gallery Modal */}
      {showTemplateGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: theme.bg }}>
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)` }}>
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: theme.text }}>Choose Template</h2>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>Select a professional template</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowTemplateGallery(false)} style={{ color: theme.text }}><X className="h-5 w-5" /></Button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
              <TemplateGallery selectedTemplateId={activeCV?.templateId} onTemplateSelect={(templateId) => { if (activeCVId) { changeTemplate(activeCVId, templateId as TemplateId); setShowTemplateGallery(false); } }} />
            </div>
          </div>
        </div>
      )}

      {/* Import CV Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <Upload className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold">Import CV</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setShowImportDialog(false); setSelectedFile(null); }}><X className="h-4 w-4" /></Button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">Upload your CV and let AI extract the information.</p>
              <div className={cn("border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer", selectedFile ? "border-green-500 bg-green-50" : "border-slate-300 hover:border-blue-500 hover:bg-blue-50")} onClick={() => { const input = document.createElement('input'); input.type = 'file'; input.accept = '.pdf,.doc,.docx,.txt'; input.onchange = (e: any) => { const file = e.target?.files?.[0]; if (file) setSelectedFile(file); }; input.click(); }}>
                {selectedFile ? <div className="space-y-2"><Check className="h-12 w-12 text-green-600 mx-auto" /><p className="font-semibold text-green-900">{selectedFile.name}</p><p className="text-xs text-green-700">{(selectedFile.size / 1024).toFixed(1)} KB</p></div> : <div className="space-y-2"><Upload className="h-12 w-12 text-slate-400 mx-auto" /><p className="font-semibold text-slate-700">Click to upload</p><p className="text-xs text-slate-500">PDF, DOC, DOCX, TXT</p></div>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { setShowImportDialog(false); setSelectedFile(null); }}>Cancel</Button>
                <Button className="flex-1" disabled={!selectedFile || importing} onClick={() => { if (selectedFile) { handleImportCV(selectedFile); } }}>{importing ? 'Importing...' : 'Import'}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UpgradeModal isOpen={isOpen} onClose={closeUpgradeModal} feature={feature} currentPlan={limits?.planType as any} />
    </div>
  )
}
