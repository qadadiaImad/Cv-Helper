"use client"

import * as React from "react"
import type { TemplateId } from "@/lib/react-templates"
import type { UniversalResumeData } from "@/lib/schemas"
import type { CVDocument, CVStore } from "@/lib/schemas/cv-document"
import { createCVDocument } from "@/lib/schemas/cv-document"

const STORAGE_KEY = "cvhelper.cvStore"

// Get initial store from localStorage
function getInitialStore(): CVStore {
  if (typeof window === "undefined") {
    return { cvs: [], activeCVId: null }
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Failed to load CV store:", error)
  }
  
  return { cvs: [], activeCVId: null }
}

// Save store to localStorage
function saveStore(store: CVStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch (error) {
    console.error("Failed to save CV store:", error)
  }
}

export function useCVStore() {
  const [store, setStore] = React.useState<CVStore>({ cvs: [], activeCVId: null })
  const [ready, setReady] = React.useState(false)
  const [version, setVersion] = React.useState(0)
  // Load from localStorage on mount
  React.useEffect(() => {
    const initialStore = getInitialStore()
    setStore(initialStore)
    setReady(true)
  }, [])

  // Save to localStorage whenever store changes
  React.useEffect(() => {
    if (ready) {
      saveStore(store)
      setVersion(v => v + 1)
    }
  }, [store, ready])

  // Get active CV with NEW reference (like playground's setResumeData creates new object)
  // Memoized to prevent infinite re-renders - only updates when CV actually changes
  const activeCV = React.useMemo(() => {
    const activeCVRaw = store.cvs.find(cv => cv.id === store.activeCVId)
    return activeCVRaw ? { ...activeCVRaw } : null
  }, [version, store.activeCVId])
  
  // Create new CV
  const createCV = (name: string, templateId: TemplateId) => {
    const newCV = createCVDocument(name, templateId)
    setStore(prev => ({
      cvs: [...prev.cvs, newCV],
      activeCVId: newCV.id
    }))
    return newCV.id
  }

  // Update CV data
  const updateCVData = (cvId: string, updates: Partial<UniversalResumeData>) => {
    setStore(prev => {
      const newCvs = prev.cvs.map(cv => {
        if (cv.id !== cvId) return cv
        
        // Deep merge for nested objects
        const updatedData: UniversalResumeData = {
          ...cv.data,
          personal: updates.personal ? { ...cv.data.personal, ...updates.personal } : cv.data.personal,
          experience: updates.experience !== undefined ? updates.experience : cv.data.experience,
          education: updates.education !== undefined ? updates.education : cv.data.education,
          skills: updates.skills !== undefined ? updates.skills : cv.data.skills,
          projects: updates.projects !== undefined ? updates.projects : cv.data.projects,
        }
        
        return {
          ...cv,
          data: updatedData,
          updatedAt: new Date().toISOString()
        }
      })
      
      const newStore = {
        ...prev,
        cvs: newCvs
      }
      
      return newStore
    })
  }

  // Set active CV
  const setActiveCV = (cvId: string | null) => {
    setStore(prev => ({ ...prev, activeCVId: cvId }))
  }

  // Rename CV
  const renameCV = (cvId: string, newName: string) => {
    setStore(prev => ({
      ...prev,
      cvs: prev.cvs.map(cv =>
        cv.id === cvId
          ? { ...cv, name: newName, updatedAt: new Date().toISOString() }
          : cv
      )
    }))
  }

  // Change template
  const changeTemplate = (cvId: string, templateId: TemplateId) => {
    setStore(prev => ({
      ...prev,
      cvs: prev.cvs.map(cv =>
        cv.id === cvId
          ? { ...cv, templateId, updatedAt: new Date().toISOString() }
          : cv
      )
    }))
  }

  // Delete CV
  const deleteCV = (cvId: string) => {
    setStore(prev => {
      const newCVs = prev.cvs.filter(cv => cv.id !== cvId)
      const newActiveCVId = prev.activeCVId === cvId 
        ? (newCVs.length > 0 ? newCVs[0].id : null)
        : prev.activeCVId
      
      return {
        cvs: newCVs,
        activeCVId: newActiveCVId
      }
    })
  }

  // Duplicate CV
  const duplicateCV = (cvId: string) => {
    const cvToDuplicate = store.cvs.find(cv => cv.id === cvId)
    if (!cvToDuplicate) return null
    
    const newCV: CVDocument = {
      ...cvToDuplicate,
      id: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${cvToDuplicate.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setStore(prev => ({
      cvs: [...prev.cvs, newCV],
      activeCVId: newCV.id
    }))
    
    return newCV.id
  }

  return {
    ready,
    cvs: store.cvs,
    activeCV,
    activeCVId: store.activeCVId,
    version,
    createCV,
    updateCVData,
    setActiveCV,
    renameCV,
    changeTemplate,
    deleteCV,
    duplicateCV,
  }
}
