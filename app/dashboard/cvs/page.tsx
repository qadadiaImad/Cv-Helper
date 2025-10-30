"use client"

import { useState } from "react"
import { useCVStore } from "@/hooks/use-cv-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, FileText, Trash2, Edit2, Copy } from "lucide-react"
import Link from "next/link"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"

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
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Resumes</h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your professional resumes
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create New Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Create Dialog */}
        {showCreateDialog && (
          <Card className="p-6 mb-8 border-2 border-blue-500">
            <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cvName">Resume Name</Label>
                <Input
                  id="cvName"
                  placeholder="e.g., Software Engineer Resume"
                  value={newCVName}
                  onChange={(e) => setNewCVName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCV()}
                />
              </div>
              
              <div>
                <Label>Choose Template</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {Object.keys(REACT_TEMPLATES).map((templateId) => (
                    <button
                      key={templateId}
                      onClick={() => setSelectedTemplate(templateId as TemplateId)}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTemplate === templateId
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {templateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateCV} disabled={!newCVName.trim()}>
                  Create Resume
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* CV List */}
        {cvs.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-16 w-16 mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first resume to get started
            </p>
            <Button onClick={() => setShowCreateDialog(true)} size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <Card key={cv.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{cv.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cv.templateId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>

                <div className="text-xs text-muted-foreground mb-4">
                  <p>Created: {new Date(cv.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleEditCV(cv.id)}
                    className="flex-1"
                    size="sm"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicateCV(cv.id)}
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
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
