"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UniversalResumeData } from "@/lib/schemas"

interface PersonalFormProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function PersonalForm({ data, onChange }: PersonalFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.personal.fullName}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, fullName: e.target.value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Job Title
          </Label>
          <Input
            id="title"
            placeholder="Software Engineer"
            value={data.personal.title || ""}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, title: e.target.value } })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.personal.email}
              onChange={(e) => onChange({ ...data, personal: { ...data.personal, email: e.target.value } })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={data.personal.phone}
              onChange={(e) => onChange({ ...data, personal: { ...data.personal, phone: e.target.value } })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={data.personal.location || ""}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, location: e.target.value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedIn" className="text-sm font-medium">
            LinkedIn
          </Label>
          <Input
            id="linkedIn"
            placeholder="https://linkedin.com/in/johndoe"
            value={data.personal.linkedIn || ""}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, linkedIn: e.target.value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="text-sm font-medium">
            GitHub
          </Label>
          <Input
            id="github"
            placeholder="https://github.com/johndoe"
            value={data.personal.github || ""}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, github: e.target.value } })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-sm font-medium">
            Website
          </Label>
          <Input
            id="website"
            placeholder="https://johndoe.com"
            value={data.personal.website || ""}
            onChange={(e) => onChange({ ...data, personal: { ...data.personal, website: e.target.value } })}
          />
        </div>
      </div>
    </div>
  )
}
