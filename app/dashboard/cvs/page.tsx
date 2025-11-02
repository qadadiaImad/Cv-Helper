"use client"

import { useState } from "react"
import { useCVStore } from "@/hooks/use-cv-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Trash2, Edit2, Copy, Sparkles, Clock, CheckCircle2, X } from "lucide-react"
import Link from "next/link"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { TemplateGallery } from "@/components/template-gallery"

export default function CVsPage() {
  const { ready, cvs, createCV, deleteCV, duplicateCV, setActiveCV } = useCVStore()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCVName, setNewCVName] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("atlantic_blue")

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

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with Glassmorphism */}
      <header className="border-b border-white/20 bg-white/60 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">My Resumes</h1>
                  <p className="text-slate-600 text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    {cvs.length} {cvs.length === 1 ? 'resume' : 'resumes'} ready
                  </p>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateDialog(true)} 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Resume
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
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-lg"
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
          <Card className="p-16 text-center bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-300 hover:border-blue-400 transition-all duration-300">
            <div className="inline-block p-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">No resumes yet</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Create your first resume to get started on your career journey
            </p>
            <Button 
              onClick={() => setShowCreateDialog(true)} 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv, index) => {
              const colors = {
                atlantic_blue: 'from-blue-500 to-cyan-500',
                modern_minimal: 'from-slate-700 to-slate-900',
                creative_purple: 'from-purple-500 to-pink-500',
                professional_green: 'from-green-500 to-emerald-500'
              }
              const gradient = colors[cv.templateId as keyof typeof colors] || 'from-blue-500 to-indigo-500'
              
              return (
                <Card 
                  key={cv.id} 
                  className="group p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-2 hover:border-blue-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Template Preview */}
                  <div className={`h-32 w-full rounded-xl bg-gradient-to-br ${gradient} mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
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
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 font-medium">Ready</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleEditCV(cv.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      size="sm"
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
