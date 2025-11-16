"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/rich-text-editor"
import type { Experience, UniversalResumeData } from "@/lib/schemas"

interface ExperienceFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {

  const addExperience = () => {
    const newExp: Experience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      achievements: [],
    }
    onChange({
      ...data,
      experience: [...data.experience, newExp]
    })
  }

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index)
    })
  }

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = [...data.experience]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ ...data, experience: updated })
  }

  const addAchievement = (expIndex: number) => {
    const updated = [...data.experience]
    updated[expIndex].achievements = [...(updated[expIndex].achievements || []), ""]
    onChange({ ...data, experience: updated })
  }

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...data.experience]
    updated[expIndex].achievements[achIndex] = value
    onChange({ ...data, experience: updated })
  }

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...data.experience]
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex)
    onChange({ ...data, experience: updated })
  }

  return (
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <Card key={index} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Experience {index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position *</Label>
              <Input
                id={`position-${index}`}
                placeholder="Software Engineer"
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company *</Label>
              <Input
                id={`company-${index}`}
                placeholder="Google"
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                placeholder="Present"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
              />
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <Label>Key Achievements</Label>
            {exp.achievements?.map((achievement, achIndex) => (
              <div key={achIndex} className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <RichTextEditor
                      content={achievement}
                      onChange={(html) => updateAchievement(index, achIndex, html)}
                      placeholder="Describe your achievement..."
                      minHeight="100px"
                      enableAI={true}
                      resumeContext={data}
                      section="experience.achievements"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(index, achIndex)}
                    className="text-red-600 mt-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addAchievement(index)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </div>
        </Card>
      ))}

      <Button onClick={addExperience} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>

      {data.experience.length === 0 && (
        <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          <p>No work experience added yet.</p>
          <p className="text-sm mt-1">Click "Add Experience" to get started!</p>
        </div>
      )}
    </div>
  )
}
