"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UniversalResumeData } from "@/lib/schemas"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface SkillsFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    if (skillInput.trim()) {
      const currentSkills = Array.isArray(data.skills) ? data.skills : []
      onChange({
        ...data,
        skills: [...currentSkills, skillInput.trim()]
      })
      setSkillInput("")
    }
  }

  const removeSkill = (index: number) => {
    const currentSkills = Array.isArray(data.skills) ? data.skills : []
    onChange({
      ...data,
      skills: currentSkills.filter((_, i) => i !== index)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skillInput" className="text-sm font-medium">
            Add Skills <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              id="skillInput"
              placeholder="e.g., JavaScript, React, Node.js"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter or click Add to add each skill
          </p>
        </div>

        {/* Skills List */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Skills ({data.skills.length})</Label>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm">
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="ml-2 hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {(!Array.isArray(data.skills) || data.skills.length === 0) && (
          <div className="p-4 border-2 border-dashed rounded-lg text-center text-muted-foreground">
            No skills added yet. Add your first skill above!
          </div>
        )}
      </div>
    </div>
  )
}
