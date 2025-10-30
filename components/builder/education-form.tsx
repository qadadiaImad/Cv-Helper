"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Education, UniversalResumeData } from "@/lib/schemas"

interface EducationFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {

  const addEducation = () => {
    const newEdu: Education = {
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    }
    onChange({
      ...data,
      education: [...data.education, newEdu]
    })
  }

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index)
    })
  }

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = [...data.education]
    updated[index] = { ...updated[index], [field]: value }
    onChange({ ...data, education: updated })
  }

  return (
    <div className="space-y-6">
      {data.education.map((edu, index) => (
        <Card key={index} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Education {index + 1}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`institution-${index}`}>Institution *</Label>
            <Input
              id={`institution-${index}`}
              placeholder="Harvard University"
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`degree-${index}`}>Degree *</Label>
            <Input
              id={`degree-${index}`}
              placeholder="Bachelor of Science in Computer Science"
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                placeholder="Expected 2024"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
            <Input
              id={`gpa-${index}`}
              placeholder="3.8/4.0"
              value={edu.gpa || ""}
              onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
            />
          </div>
        </Card>
      ))}

      <Button onClick={addEducation} className="w-full" variant="outline">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>

      {data.education.length === 0 && (
        <div className="p-8 border-2 border-dashed rounded-lg text-center text-muted-foreground">
          <p>No education added yet.</p>
          <p className="text-sm mt-1">Click "Add Education" to get started!</p>
        </div>
      )}
    </div>
  )
}
