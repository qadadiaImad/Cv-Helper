"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Building, 
  MapPin,
  Save,
  X,
  FileText
} from "lucide-react"
import { ProfileService, type JobDescription } from "@/lib/profile-service"

// Inline dialog components to avoid import issues
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

interface JobDescriptionSelectorProps {
  selectedJD?: JobDescription | null
  onJDSelect: (jd: JobDescription | null) => void
  onJDSave?: (jd: JobDescription) => void
  className?: string
}

export function JobDescriptionSelector({ selectedJD, onJDSelect, onJDSave, className }: JobDescriptionSelectorProps) {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingJD, setEditingJD] = useState<JobDescription | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    content: "",
    location: "",
    type: "",
    remote: false,
    salary: "",
  })

  useEffect(() => {
    loadJobDescriptions()
  }, [])

  const loadJobDescriptions = () => {
    const loadedJDs = ProfileService.getJobDescriptions()
    setJobDescriptions(loadedJDs)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      content: "",
      location: "",
      type: "",
      remote: false,
      salary: "",
    })
  }

  const handleSaveJD = () => {
    if (!formData.title.trim() || !formData.company.trim() || !formData.content.trim()) return

    if (editingJD) {
      // Update existing
      const updated = ProfileService.updateJobDescription(editingJD.id, {
        title: formData.title.trim(),
        company: formData.company.trim(),
        content: formData.content.trim(),
        metadata: {
          location: formData.location.trim() || undefined,
          type: formData.type.trim() || undefined,
          remote: formData.remote,
          salary: formData.salary.trim() || undefined,
        }
      })
      if (updated) {
        setJobDescriptions(prev => prev.map(jd => jd.id === updated.id ? updated : jd))
        onJDSave?.(updated)
      }
    } else {
      // Create new
      const newJD = ProfileService.saveJobDescription({
        title: formData.title.trim(),
        company: formData.company.trim(),
        content: formData.content.trim(),
        metadata: {
          location: formData.location.trim() || undefined,
          type: formData.type.trim() || undefined,
          remote: formData.remote,
          salary: formData.salary.trim() || undefined,
        }
      })
      setJobDescriptions(prev => [...prev, newJD])
      onJDSave?.(newJD)
    }

    setIsCreateDialogOpen(false)
    setEditingJD(null)
    resetForm()
  }

  const handleEditJD = (jd: JobDescription) => {
    setEditingJD(jd)
    setFormData({
      title: jd.title,
      company: jd.company,
      content: jd.content,
      location: jd.metadata?.location || "",
      type: jd.metadata?.type || "",
      remote: jd.metadata?.remote || false,
      salary: jd.metadata?.salary || "",
    })
    setIsCreateDialogOpen(true)
  }

  const handleDeleteJD = (jdId: string) => {
    if (ProfileService.deleteJobDescription(jdId)) {
      setJobDescriptions(prev => prev.filter(jd => jd.id !== jdId))
      if (selectedJD?.id === jdId) {
        onJDSelect(null)
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <Label className="text-sm font-medium">Saved Job Descriptions</Label>
          </div>
          
          <Dialog 
            open={isCreateDialogOpen} 
            onOpenChange={(open: boolean) => {
              setIsCreateDialogOpen(open)
              if (!open) {
                setEditingJD(null)
                resetForm()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingJD ? "Edit Job Description" : "Add Job Description"}
                </DialogTitle>
                <DialogDescription>
                  Save job descriptions for easy reuse in AI adaptation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="jdTitle">Job Title *</Label>
                    <Input
                      id="jdTitle"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jdCompany">Company *</Label>
                    <Input
                      id="jdCompany"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g., Tech Corp"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="jdLocation">Location</Label>
                    <Input
                      id="jdLocation"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jdType">Job Type</Label>
                    <Input
                      id="jdType"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      placeholder="e.g., Full-time"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jdSalary">Salary</Label>
                    <Input
                      id="jdSalary"
                      value={formData.salary}
                      onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                      placeholder="e.g., $120k - $150k"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jdContent">Job Description *</Label>
                  <Textarea
                    id="jdContent"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveJD} 
                    disabled={!formData.title.trim() || !formData.company.trim() || !formData.content.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingJD ? "Update" : "Save"} Job Description
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {jobDescriptions.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Briefcase className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No saved job descriptions yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add job descriptions to quickly adapt your resume for different positions
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {jobDescriptions.map((jd) => (
              <Card 
                key={jd.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedJD?.id === jd.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onJDSelect(jd)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium truncate">{jd.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          <Building className="h-3 w-3 mr-1" />
                          {jd.company}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-2">
                        {jd.metadata?.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            <span>{jd.metadata.location}</span>
                            {jd.metadata.type && (
                              <Badge variant="secondary" className="text-xs">
                                {jd.metadata.type}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Saved {formatDate(jd.createdAt)}</span>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {truncateContent(jd.content)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditJD(jd)
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteJD(jd.id)
                        }}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedJD && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="font-medium">Selected:</span>
              <span>{selectedJD.title} at {selectedJD.company}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
