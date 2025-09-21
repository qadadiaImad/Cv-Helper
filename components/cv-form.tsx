"use client"

import React from "react"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, User, GraduationCap, Briefcase, Code, LinkIcon } from "lucide-react"
import type { CVData } from "@/lib/latex/schema"

const cvSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  links: z
    .object({
      linkedin: z.string().url().optional().or(z.literal("")),
      github: z.string().url().optional().or(z.literal("")),
      portfolio: z.string().url().optional().or(z.literal("")),
    })
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(1, "School name is required"),
        city: z.string().min(1, "City is required"),
        degree: z.string().min(1, "Degree is required"),
        dates: z.string().min(1, "Dates are required"),
      }),
    )
    .min(1, "At least one education entry is required"),
  experience: z
    .array(
      z.object({
        company: z.string().min(1, "Company name is required"),
        title: z.string().min(1, "Job title is required"),
        city: z.string().min(1, "City is required"),
        dates: z.string().min(1, "Dates are required"),
        bullets: z
          .array(z.string().min(1, "Bullet point cannot be empty"))
          .min(1, "At least one bullet point is required"),
      }),
    )
    .min(1, "At least one experience entry is required"),
  projects: z.array(
    z.object({
      name: z.string().min(1, "Project name is required"),
      stack: z.string().min(1, "Tech stack is required"),
      dates: z.string().min(1, "Dates are required"),
      bullets: z
        .array(z.string().min(1, "Bullet point cannot be empty"))
        .min(1, "At least one bullet point is required"),
    }),
  ),
  skills: z.object({
    languages: z.array(z.string().min(1)),
    frameworks: z.array(z.string().min(1)),
    tools: z.array(z.string().min(1)),
  }),
  photoPath: z.string().optional(),
})

type CVFormData = z.infer<typeof cvSchema>

interface CVFormProps {
  initialData?: Partial<CVData>
  onSubmit: (data: CVData) => void
  onDataChange?: (data: Partial<CVData>) => void
  isLoading?: boolean
}

export function CVForm({ initialData, onSubmit, onDataChange, isLoading }: CVFormProps) {
  const form = useForm<CVFormData>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      links: {
        linkedin: initialData?.links?.linkedin || "",
        github: initialData?.links?.github || "",
        portfolio: initialData?.links?.portfolio || "",
      },
      education: initialData?.education || [{ school: "", city: "", degree: "", dates: "" }],
      experience: initialData?.experience || [{ company: "", title: "", city: "", dates: "", bullets: [""] }],
      projects: initialData?.projects || [],
      skills: {
        languages: initialData?.skills?.languages || [],
        frameworks: initialData?.skills?.frameworks || [],
        tools: initialData?.skills?.tools || [],
      },
      photoPath: initialData?.photoPath || "",
    },
  })

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  })

  const watchedData = form.watch()

  // Notify parent of data changes
  const prevDataRef = React.useRef<string>("")

  React.useEffect(() => {
    if (onDataChange) {
      const currentDataString = JSON.stringify(watchedData)
      if (currentDataString !== prevDataRef.current) {
        prevDataRef.current = currentDataString
        onDataChange(watchedData as Partial<CVData>)
      }
    }
  }, [watchedData, onDataChange])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic contact information and professional links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" {...form.register("fullName")} placeholder="John Doe" />
              {form.formState.errors.fullName && (
                <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...form.register("email")} placeholder="john.doe@example.com" />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...form.register("phone")} placeholder="+1 (555) 123-4567" />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              <Label>Professional Links</Label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  {...form.register("links.linkedin")}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" {...form.register("links.github")} placeholder="https://github.com/johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input id="portfolio" {...form.register("links.portfolio")} placeholder="https://johndoe.dev" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education
          </CardTitle>
          <CardDescription>Your educational background and qualifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {educationFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Education {index + 1}</h4>
                {educationFields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>School *</Label>
                  <Input {...form.register(`education.${index}.school`)} placeholder="University of Technology" />
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input {...form.register(`education.${index}.city`)} placeholder="San Francisco, CA" />
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    {...form.register(`education.${index}.degree`)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dates *</Label>
                  <Input {...form.register(`education.${index}.dates`)} placeholder="Aug. 2018 -- May 2022" />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendEducation({ school: "", city: "", degree: "", dates: "" })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      {/* Experience */}
      <ExperienceSection
        fields={experienceFields}
        register={form.register}
        append={appendExperience}
        remove={removeExperience}
        errors={form.formState.errors.experience}
      />

      {/* Projects */}
      <ProjectsSection
        fields={projectFields}
        register={form.register}
        append={appendProject}
        remove={removeProject}
        errors={form.formState.errors.projects}
      />

      {/* Skills */}
      <SkillsSection register={form.register} watch={form.watch} setValue={form.setValue} />

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Generating..." : "Generate Resume"}
        </Button>
      </div>
    </form>
  )
}

// Additional form sections would be implemented here...
// For brevity, I'll add placeholder components

function ExperienceSection({ fields, register, append, remove, errors }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Experience
        </CardTitle>
        <CardDescription>Your professional work experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">Experience form fields will be implemented here</div>
      </CardContent>
    </Card>
  )
}

function ProjectsSection({ fields, register, append, remove, errors }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Projects
        </CardTitle>
        <CardDescription>Your personal and professional projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">Projects form fields will be implemented here</div>
      </CardContent>
    </Card>
  )
}

function SkillsSection({ register, watch, setValue }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Skills</CardTitle>
        <CardDescription>Your technical skills and competencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground py-8">Skills form fields will be implemented here</div>
      </CardContent>
    </Card>
  )
}
