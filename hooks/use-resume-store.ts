"use client"

import * as React from "react"
import type { ResumeData, TemplateId } from "@/lib/react-templates"

const STORAGE_KEYS = {
  template: "cvhelper.selectedTemplate",
  resume: "cvhelper.resumeData",
} as const

const DEFAULT_TEMPLATE: TemplateId = "classic_minimal"

const DEFAULT_RESUME: ResumeData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  links: [
    { label: "GitHub", url: "https://github.com/johndoe" },
    { label: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Tech Corp",
      period: "2023 - Present",
      details: [
        "Developed web applications using React and Node.js",
        "Led team of 5 developers on major projects",
        "Improved system performance by 40%",
      ],
    },
  ],
  projects: [
    {
      title: "CV Helper App",
      description: "Application React pour créer des CV professionnels",
      link: "https://github.com/johndoe/cv-helper",
    },
  ],
  education: [
    {
      degree: "Master's in Computer Science",
      school: "University of Tech",
      year: "2021",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Docker"],
}

function normalizeTemplateId(id: string | TemplateId): TemplateId {
  const norm = String(id).replace(/-/g, "_") as TemplateId
  return norm
}

export function useResumeStore() {
  const [selectedTemplate, setSelectedTemplateState] = React.useState<TemplateId>(DEFAULT_TEMPLATE)
  const [resumeData, setResumeDataState] = React.useState<ResumeData>(DEFAULT_RESUME)
  const [ready, setReady] = React.useState(false)

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEYS.template)
      if (t) setSelectedTemplateState(normalizeTemplateId(t as TemplateId))
      const r = localStorage.getItem(STORAGE_KEYS.resume)
      if (r) setResumeDataState(JSON.parse(r) as ResumeData)
    } catch {}
    setReady(true)

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.template && e.newValue) {
        setSelectedTemplateState(normalizeTemplateId(e.newValue as TemplateId))
      }
      if (e.key === STORAGE_KEYS.resume && e.newValue) {
        try { setResumeDataState(JSON.parse(e.newValue) as ResumeData) } catch {}
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const setSelectedTemplate = React.useCallback((id: string | TemplateId) => {
    const normalized = normalizeTemplateId(id)
    setSelectedTemplateState(normalized)
    try { localStorage.setItem(STORAGE_KEYS.template, normalized) } catch {}
  }, [])

  const updateResumeData = React.useCallback((updates: Partial<ResumeData>) => {
    setResumeDataState(prev => {
      const next = { ...prev, ...updates }
      try { localStorage.setItem(STORAGE_KEYS.resume, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const setResumeData = React.useCallback((data: ResumeData) => {
    setResumeDataState(data)
    try { localStorage.setItem(STORAGE_KEYS.resume, JSON.stringify(data)) } catch {}
  }, [])

  return {
    ready,
    selectedTemplate,
    setSelectedTemplate,
    resumeData,
    updateResumeData,
    setResumeData,
  }
}
