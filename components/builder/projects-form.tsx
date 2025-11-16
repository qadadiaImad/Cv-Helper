"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import type { Project, UniversalResumeData } from "@/lib/schemas"

interface ProjectsFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {

  const addProject = () => {
    const newProj: Project = {
      name: "",
      description: "",
      url: "",
      technologies: [],
      highlights: [],
    }
    onChange({
      ...data,
      projects: [...(data.projects || []), newProj]
    })
  }

  const removeProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects?.filter((_, i) => i !== index) || []
    })
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...(data.projects || [])]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ ...data, projects: updated })
  }

  return (
    <div className="space-y-6">
      {data.projects?.map((proj, index) => (
        <Card key={index} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Project {index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projectName-${index}`}>Project Name *</Label>
            <Input
              id={`projectName-${index}`}
              placeholder="My Awesome Project"
              value={proj.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projectUrl-${index}`}>URL</Label>
            <Input
              id={`projectUrl-${index}`}
              placeholder="https://github.com/username/project"
              value={proj.url || ""}
              onChange={(e) => updateProject(index, 'url', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projectDesc-${index}`}>Description</Label>
            <RichTextEditor
              content={proj.description || ""}
              onChange={(html) => updateProject(index, 'description', html)}
              placeholder="Describe your project, its goals, and key features..."
              minHeight="120px"
              enableAI={true}
              resumeContext={data}
              section="projects.description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`projectTech-${index}`}>Technologies</Label>
            <Input
              id={`projectTech-${index}`}
              placeholder="React, Node.js, MongoDB (comma-separated)"
              value={proj.technologies?.join(", ") || ""}
              onChange={(e) => updateProject(index, 'technologies', e.target.value.split(",").map(t => t.trim()))}
            />
          </div>
        </Card>
      ))}

      <Button onClick={addProject} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>

      {(!data.projects || data.projects.length === 0) && (
        <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          <p>No projects added yet.</p>
          <p className="text-sm mt-1">Projects are optional but recommended!</p>
        </div>
      )}
    </div>
  )
}
