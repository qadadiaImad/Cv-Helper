"use client"

import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, User, GraduationCap, Briefcase, Code, LinkIcon, Save } from "lucide-react"
import type { CVData } from "@/lib/latex/schema"
import { ProfileSelector } from "@/components/profile-selector"
import { ProfileService, type UserProfile } from "@/lib/profile-service"

const cvSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  links: z
    .object({
      linkedin: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Invalid LinkedIn URL"
      }),
      github: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Invalid GitHub URL"
      }),
      portfolio: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
        message: "Invalid Portfolio URL"
      }),
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
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)
  // Helper function to process form data before submission
  const processFormData = (data: CVFormData): CVData => {
    return {
      ...data,
      links: data.links ? {
        linkedin: data.links.linkedin?.trim() || undefined,
        github: data.links.github?.trim() || undefined,
        portfolio: data.links.portfolio?.trim() || undefined,
      } : undefined,
      experience: data.experience.map(exp => ({
        ...exp,
        bullets: exp.bullets[0] ? exp.bullets[0].split('\n').filter(b => b.trim()).map(b => b.replace(/^[•\-\*]\s*/, '').trim()) : ['No description provided']
      })),
      projects: data.projects.map(proj => ({
        ...proj,
        bullets: proj.bullets[0] ? proj.bullets[0].split('\n').filter(b => b.trim()).map(b => b.replace(/^[•\-\*]\s*/, '').trim()) : ['No description provided']
      })),
      skills: {
        languages: data.skills.languages.filter(l => l && l.trim()),
        frameworks: data.skills.frameworks.filter(f => f && f.trim()),
        tools: data.skills.tools.filter(t => t && t.trim())
      }
    }
  }
  const form = useForm<CVFormData>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      fullName: initialData?.fullName || "John Doe",
      email: initialData?.email || "john.doe@example.com",
      phone: initialData?.phone || "+1 (555) 123-4567",
      links: {
        linkedin: initialData?.links?.linkedin || "",
        github: initialData?.links?.github || "",
        portfolio: initialData?.links?.portfolio || "",
      },
      education: initialData?.education || [{ 
        school: "University of Technology", 
        city: "San Francisco, CA", 
        degree: "Bachelor of Science in Computer Science", 
        dates: "Aug. 2018 -- May 2022" 
      }],
      experience: initialData?.experience || [{ 
        company: "Tech Corp", 
        title: "Software Engineer", 
        city: "San Francisco, CA", 
        dates: "June 2022 -- Present", 
        bullets: ["• Developed and maintained web applications using React and Node.js\n• Collaborated with cross-functional teams to deliver high-quality software\n• Improved application performance by 30% through code optimization"] 
      }],
      projects: initialData?.projects || [],
      skills: {
        languages: initialData?.skills?.languages || ["JavaScript", "Python", "TypeScript"],
        frameworks: initialData?.skills?.frameworks || ["React", "Node.js", "Next.js"],
        tools: initialData?.skills?.tools || ["Git", "Docker", "AWS"],
      },
      photoPath: initialData?.photoPath || "",
    },
  })

  // Handle profile selection
  const handleProfileSelect = (profile: UserProfile | null) => {
    setSelectedProfile(profile)
    if (profile) {
      // Reset form with profile data
      form.reset({
        fullName: profile.data.fullName,
        email: profile.data.email,
        phone: profile.data.phone || "",
        links: {
          linkedin: profile.data.links?.linkedin || "",
          github: profile.data.links?.github || "",
          portfolio: profile.data.links?.portfolio || "",
        },
        education: profile.data.education,
        experience: profile.data.experience,
        projects: profile.data.projects,
        skills: {
          languages: profile.data.skills.languages,
          frameworks: profile.data.skills.frameworks,
          tools: profile.data.skills.tools,
        },
        photoPath: profile.data.photoPath || "",
      })
    }
  }

  // Handle profile save
  const handleProfileSave = (profile: UserProfile) => {
    setSelectedProfile(profile)
  }

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

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: form.control,
    name: "skills.languages" as any,
  })

  const {
    fields: frameworkFields,
    append: appendFramework,
    remove: removeFramework,
  } = useFieldArray({
    control: form.control,
    name: "skills.frameworks" as any,
  })

  const {
    fields: toolFields,
    append: appendTool,
    remove: removeTool,
  } = useFieldArray({
    control: form.control,
    name: "skills.tools" as any,
  })

  const { watch, handleSubmit, control, formState, setValue, register } = form
  const { errors } = formState

  // Watch for changes and notify parent (with debouncing to prevent infinite loops)
  const watchedData = watch()
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  
  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      onDataChange?.(watchedData)
    }, 300) // 300ms debounce
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [watchedData, onDataChange])

  return (
    <div className="space-y-6">
      {/* Profile Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Saved Profiles
          </CardTitle>
          <CardDescription>Load or save your personal information for easy reuse</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSelector
            selectedProfile={selectedProfile ? { ...selectedProfile, data: processFormData(form.getValues()) } : null}
            onProfileSelect={handleProfileSelect}
            onProfileSave={handleProfileSave}
          />
        </CardContent>
      </Card>

      <form onSubmit={form.handleSubmit((data) => onSubmit(processFormData(data)))} className="space-y-8">
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
              <Input id="fullName" {...register("fullName")} placeholder="John Doe" />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="john.doe@example.com" />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} placeholder="+1 (555) 123-4567" />
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
                  {...register("links.linkedin")}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" {...register("links.github")} placeholder="https://github.com/johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input id="portfolio" {...register("links.portfolio")} placeholder="https://johndoe.dev" />
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
                  <Input {...register(`education.${index}.school`)} placeholder="University of Technology" />
                  {errors.education?.[index]?.school && (
                    <p className="text-sm text-destructive">{errors.education[index]?.school?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input {...register(`education.${index}.city`)} placeholder="San Francisco, CA" />
                  {errors.education?.[index]?.city && (
                    <p className="text-sm text-destructive">{errors.education[index]?.city?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    {...register(`education.${index}.degree`)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-sm text-destructive">{errors.education[index]?.degree?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Dates *</Label>
                  <Input {...register(`education.${index}.dates`)} placeholder="Aug. 2018 -- May 2022" />
                  {errors.education?.[index]?.dates && (
                    <p className="text-sm text-destructive">{errors.education[index]?.dates?.message}</p>
                  )}
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Experience
          </CardTitle>
          <CardDescription>Your professional work experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Experience {index + 1}</h4>
                {experienceFields.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input {...register(`experience.${index}.company`)} placeholder="Tech Corp" />
                  {errors.experience?.[index]?.company && (
                    <p className="text-sm text-destructive">{errors.experience[index]?.company?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input {...register(`experience.${index}.title`)} placeholder="Software Engineer" />
                  {errors.experience?.[index]?.title && (
                    <p className="text-sm text-destructive">{errors.experience[index]?.title?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input {...register(`experience.${index}.city`)} placeholder="San Francisco, CA" />
                  {errors.experience?.[index]?.city && (
                    <p className="text-sm text-destructive">{errors.experience[index]?.city?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Dates *</Label>
                  <Input {...register(`experience.${index}.dates`)} placeholder="June 2022 -- Present" />
                  {errors.experience?.[index]?.dates && (
                    <p className="text-sm text-destructive">{errors.experience[index]?.dates?.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Responsibilities & Achievements *</Label>
                <Textarea
                  {...register(`experience.${index}.bullets.0`)}
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 30% through code optimization"
                  className="min-h-[120px]"
                />
                {errors.experience?.[index]?.bullets && (
                  <p className="text-sm text-destructive">Please describe your responsibilities and achievements</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Tip: Use bullet points (•) to separate different responsibilities and achievements
                </p>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendExperience({ company: "", title: "", city: "", dates: "", bullets: [""] })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Projects
          </CardTitle>
          <CardDescription>Your personal and professional projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projectFields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Project {index + 1}</h4>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeProject(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Name *</Label>
                  <Input {...register(`projects.${index}.name`)} placeholder="Awesome Project" />
                  {errors.projects?.[index]?.name && (
                    <p className="text-sm text-destructive">{errors.projects[index]?.name?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tech Stack *</Label>
                  <Input {...register(`projects.${index}.stack`)} placeholder="React, Node.js, MongoDB" />
                  {errors.projects?.[index]?.stack && (
                    <p className="text-sm text-destructive">{errors.projects[index]?.stack?.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Dates *</Label>
                  <Input {...register(`projects.${index}.dates`)} placeholder="Jan 2023 -- Mar 2023" />
                  {errors.projects?.[index]?.dates && (
                    <p className="text-sm text-destructive">{errors.projects[index]?.dates?.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description & Features *</Label>
                <Textarea
                  {...register(`projects.${index}.bullets.0`)}
                  placeholder="• Built a full-stack web application with user authentication&#10;• Implemented real-time features using WebSocket connections&#10;• Deployed to AWS with CI/CD pipeline"
                  className="min-h-[120px]"
                />
                {errors.projects?.[index]?.bullets && (
                  <p className="text-sm text-destructive">Please describe the project features and your contributions</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Tip: Use bullet points (•) to separate different features and contributions
                </p>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendProject({ name: "", stack: "", dates: "", bullets: [""] })}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>Your technical skills and competencies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Programming Languages */}
          <div className="space-y-3">
            <Label>Programming Languages</Label>
            {languageFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`skills.languages.${index}`)}
                  placeholder="e.g., JavaScript, Python, Java"
                />
                {languageFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendLanguage("")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>

          {/* Frameworks */}
          <div className="space-y-3">
            <Label>Frameworks & Libraries</Label>
            {frameworkFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`skills.frameworks.${index}`)}
                  placeholder="e.g., React, Node.js, Django"
                />
                {frameworkFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFramework(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendFramework("")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Framework
            </Button>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <Label>Tools & Technologies</Label>
            {toolFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  {...register(`skills.tools.${index}`)}
                  placeholder="e.g., Git, Docker, AWS"
                />
                {toolFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTool(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => appendTool("")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </div>
        </CardContent>
      </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Generating..." : "Generate Resume"}
          </Button>
        </div>
      </form>
    </div>
  )
}
