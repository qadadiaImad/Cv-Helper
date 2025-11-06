"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useCVStore } from "@/hooks/use-cv-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Trash2, Edit2, Copy, Sparkles, Clock, CheckCircle2, X } from "lucide-react"
import Link from "next/link"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { TemplateGallery } from "@/components/template-gallery"
import { getTemplateTheme } from "@/lib/template-themes"
import { useTheme } from "@/lib/theme-context"

export default function CVsPage() {
  const { ready, cvs, createCV, deleteCV, duplicateCV, setActiveCV } = useCVStore()
  const { theme } = useTheme()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCVName, setNewCVName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("atlantic_blue")
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCreateCV = () => {
    if (newCVName.trim()) {
      const cvId = createCV(newCVName.trim(), selectedTemplate)
      setNewCVName("")
      setShowCreateDialog(false)
      // Navigate to builder
      window.location.href = `/dashboard/builder`
    }
  }

  const handleEditCV = (cvId: string) => {
    setActiveCV(cvId)
    window.location.href = `/dashboard/builder`
  }

  const handleDuplicateCV = (cvId: string) => {
    const newId = duplicateCV(cvId)
    if (newId) {
      window.location.href = `/dashboard/builder`
    }
  }

  // Check if CV is completed (has all required sections filled)
  const isCVCompleted = (cv: any) => {
    const hasPersonal = cv.data?.personal?.fullName && cv.data?.personal?.email
    const hasExperience = cv.data?.experience && cv.data.experience.length > 0
    const hasEducation = cv.data?.education && cv.data.education.length > 0
    const hasSkills = cv.data?.skills && cv.data.skills.length > 0
    
    return hasPersonal && hasExperience && hasEducation && hasSkills
  }

  // Use default colors during SSR to prevent hydration mismatch
  const displayTheme = mounted ? theme : {
    bg: '#FAF5FF',
    accent: '#A855F7',
    text: '#581C87',
    textSecondary: '#7E22CE'
  }

  if (!ready) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: displayTheme.bg }}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${displayTheme.accent}30 0%, transparent 70%)`
          }}
        />
        
        <div className="text-center relative z-10">
          {/* Stylish animated loader */}
          <div className="relative inline-block mb-6">
            {/* Outer rotating ring */}
            <div 
              className="h-20 w-20 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: `${displayTheme.accent} transparent transparent transparent` }}
            />
            {/* Inner pulsing circle */}
            <div 
              className="absolute inset-0 m-auto h-12 w-12 rounded-full animate-pulse"
              style={{ background: `${displayTheme.accent}40` }}
            />
            {/* Center icon */}
            <div 
              className="absolute inset-0 m-auto h-8 w-8 rounded-full flex items-center justify-center"
              style={{ background: displayTheme.accent }}
            >
              <FileText className="h-4 w-4 text-white animate-bounce" />
            </div>
          </div>
          
          <h2 
            className="text-2xl font-bold mb-2 animate-pulse"
            style={{ color: displayTheme.text }}
          >
            Loading your resumes...
          </h2>
          <p 
            className="text-sm font-medium"
            style={{ color: displayTheme.textSecondary }}
          >
            Preparing your workspace
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: displayTheme.bg }}>
      {/* Enhanced Header with Theme-Aware Gradient */}
      <header 
        className="border-b backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${theme.bg} 0%, ${theme.bgSecondary} 50%, ${theme.bg} 100%)`,
          borderColor: theme.border
        }}
      >
        {/* Subtle animated overlay */}
        <div 
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${theme.accent}15 0%, transparent 50%)`
          }}
        />
        
        <div className="container mx-auto px-4 py-10 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Icon with Glow Effect */}
              <div className="relative group cursor-pointer">
                <div 
                  className="absolute inset-0 rounded-2xl opacity-50 blur-xl transition-all duration-300 group-hover:opacity-75 group-hover:blur-2xl"
                  style={{ background: theme.accent }}
                />
                <div 
                  className="relative h-14 w-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: theme.accent }}
                >
                  <FileText className="h-7 w-7 text-white" />
                </div>
              </div>
              
              {/* Title and Stats */}
              <div>
                <h1 
                  className="text-5xl font-extrabold mb-1 transition-all duration-300 hover:scale-105 inline-block"
                  style={{ color: theme.text }}
                >
                  My Resumes
                </h1>
                <div className="flex items-center gap-3">
                  <div 
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105"
                    style={{ 
                      background: `${theme.accent}20`,
                      border: `1px solid ${theme.accent}40`
                    }}
                  >
                    <Sparkles className="h-4 w-4" style={{ color: theme.accent }} />
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: theme.textSecondary }}
                    >
                      {cvs.length} {cvs.length === 1 ? 'resume' : 'resumes'} ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Button */}
            <Button 
              onClick={() => setShowCreateDialog(true)} 
              size="lg"
              className="shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 font-semibold text-base px-8 py-6 relative group overflow-hidden"
              style={{ 
                background: theme.accent,
                color: 'white',
                border: 'none'
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <Plus className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10">Create New Resume</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Create Dialog - Full Screen Modal */}
        {showCreateDialog && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl my-8 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 rounded-t-2xl px-8 py-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Create New Resume</h2>
                    <p className="text-sm text-slate-600">Choose a template and give your resume a name</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCreateDialog(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Resume Name Input */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <Label htmlFor="cvName" className="text-base font-semibold mb-2 block">Resume Name</Label>
                  <Input
                    id="cvName"
                    placeholder="e.g., Software Engineer Resume, Marketing Manager CV"
                    value={newCVName}
                    onChange={(e) => setNewCVName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateCV()}
                    className="h-12 text-lg bg-white"
                    autoFocus
                  />
                </div>
                
                {/* Template Gallery */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Choose Template</Label>
                  <TemplateGallery
                    selectedTemplateId={selectedTemplate}
                    onTemplateSelect={(templateId) => setSelectedTemplate(templateId as TemplateId)}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 rounded-b-2xl px-8 py-6 flex gap-3">
                <Button 
                  onClick={handleCreateCV} 
                  disabled={!newCVName.trim()}
                  className="flex-1 h-12 text-lg"
                  style={{ background: theme.accent, color: 'white' }}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Create Resume
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateDialog(false)}
                  className="h-12 px-8"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* CV List */}
        {cvs.length === 0 ? (
          <Card 
            className="p-20 text-center backdrop-blur-sm border-2 border-dashed transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group"
            style={{
              background: `${theme.card}95`,
              borderColor: theme.border
            }}
          >
            {/* Animated background effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${theme.accent} 0%, transparent 70%)`
              }}
            />
            
            {/* Animated Icon Container */}
            <div className="relative inline-block mb-8">
              {/* Outer glow ring */}
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse"
                style={{ background: theme.accent }}
              />
              {/* Rotating ring */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow"
                style={{ borderColor: `${theme.accent}40` }}
              />
              {/* Icon container */}
              <div 
                className="relative p-8 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.accent}20 0%, ${theme.accent}40 100%)`
                }}
              >
                <FileText 
                  className="h-20 w-20 animate-bounce"
                  style={{ color: theme.accent }}
                />
              </div>
            </div>
            
            <h2 
              className="text-4xl font-extrabold mb-4 animate-fade-in"
              style={{ color: theme.text }}
            >
              No resumes yet
            </h2>
            <p 
              className="text-lg mb-10 max-w-md mx-auto"
              style={{ color: theme.textSecondary }}
            >
              Create your first resume to get started on your career journey ✨
            </p>
            
            <Button 
              onClick={() => setShowCreateDialog(true)} 
              size="lg"
              className="shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 font-semibold text-base px-10 py-6 relative group/btn overflow-hidden"
              style={{ 
                background: theme.accent,
                color: 'white',
                border: 'none'
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              <Plus className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10">Create Your First Resume</span>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv, index) => {
              const isCompleted = isCVCompleted(cv)
              const templateTheme = getTemplateTheme(cv.templateId)
              
              return (
                <Card 
                  key={cv.id} 
                  className="group p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border-2 animate-in fade-in-from-bottom-4"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    background: templateTheme.background,
                    borderColor: templateTheme.border
                  }}
                >
                  {/* Status Image Preview */}
                  <div className="h-48 w-full rounded-xl mb-4 relative overflow-hidden bg-white/50 flex items-center justify-center">
                    <Image
                      src={isCompleted ? '/images/Resumer_compeleted.png' : '/images/not_yet_completed.png'}
                      alt={isCompleted ? 'Resume completed' : 'Resume in progress'}
                      width={200}
                      height={200}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                      {cv.templateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">{cv.name}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(cv.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {isCompleted ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-green-600 font-medium">Complete</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-amber-600" />
                        <span className="text-amber-600 font-medium">In Progress</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleEditCV(cv.id)}
                      className="flex-1"
                      size="sm"
                      style={{ background: theme.accent, color: 'white' }}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateCV(cv.id)}
                      className="hover:bg-blue-50 hover:border-blue-300 transition-all"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this resume?')) {
                          deleteCV(cv.id)
                        }
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
