'use client'

import { useState, useEffect } from 'react'
import { EnhancedAtlanticBlue } from './enhanced-atlantic-blue'
import type { UniversalTemplateProps } from '@/lib/schemas'

interface CVPreviewToggleProps {
  pdfFile: File
  parsedData: any
}

export function CVPreviewToggle({ pdfFile, parsedData }: CVPreviewToggleProps) {
  const [view, setView] = useState<'original' | 'enhanced'>('original')
  const [pdfUrl, setPdfUrl] = useState<string>('')

  // Create object URL for PDF
  useEffect(() => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile)
      setPdfUrl(url)
      
      // Cleanup
      return () => URL.revokeObjectURL(url)
    }
  }, [pdfFile])

  // Debug: Log parsed data structure
  useEffect(() => {
    if (parsedData) {
      console.log('[CVPreview] 📋 Full Parsed Data:', parsedData)
      console.log('[CVPreview] 📋 JSON:', JSON.stringify(parsedData, null, 2))
    }
  }, [parsedData])

  // Smart mapping function - handles all possible field variations
  const mapParsedDataToTemplate = (data: any): UniversalTemplateProps['data'] => {
    if (!data) {
      return {
        personal: { fullName: 'No data', email: '', phone: '' },
        experience: [],
        education: [],
      }
    }

    // Language detection is now handled by the API
    console.log('[CVPreview] 🌍 CV language:', data.metadata?.language)

    // Extract personal info from header or personal or metadata
    const personalInfo = data.header || data.personal || {}
    const links = personalInfo.links || {}

    return {
      personal: {
        fullName: personalInfo.fullName || personalInfo.name || 'Unknown',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        location: personalInfo.location || '',
        links: {
          linkedin: links.linkedin || '',
          github: links.github || '',
          portfolio: links.portfolio || links.website || '',
        },
      },
      summary: data.summary || data.objective || '',
      
      // Experience with comprehensive field mapping
      experience: (data.experience || []).map((exp: any) => {
        const bullets = Array.isArray(exp.bullets) ? exp.bullets : 
                       exp.description ? (Array.isArray(exp.description) ? exp.description : [exp.description]) :
                       exp.responsibilities ? (Array.isArray(exp.responsibilities) ? exp.responsibilities : [exp.responsibilities]) : []
        
        // Action verbs are already translated by the API
        return {
          company: exp.company || exp.organization || '',
          position: exp.title || exp.position || exp.role || '', // Template uses 'position' not 'title'
          location: exp.location || '',
          startDate: exp.startDateRaw || exp.startDate || exp.start || '',
          endDate: exp.endDateRaw || exp.endDate || exp.end || (exp.current ? 'Present' : ''),
          achievements: bullets, // Template uses 'achievements' not 'bullets'
        }
      }),
      
      // Education
      education: (data.education || []).map((edu: any) => {
        // Parse dates if in "YYYY - YYYY" format
        let startDate = edu.startDate || ''
        let endDate = edu.endDate || ''
        
        if (!startDate && !endDate && edu.dates) {
          const dateParts = edu.dates.split(/\s*[-–]\s*/)
          if (dateParts.length === 2) {
            startDate = dateParts[0].trim()
            endDate = dateParts[1].trim()
          }
        }
        
        return {
          institution: edu.school || edu.institution || edu.university || '', // Template uses 'institution'
          degree: edu.degree || edu.diploma || '',
          location: edu.location || '',
          startDate: startDate,
          endDate: endDate,
        }
      }),
      
      // Skills - handle both flat and categorized formats
      skillCategories: (() => {
        const skills = data.skills || {}
        const categories = []
        
        if (skills.languages?.length) {
          categories.push({
            category: 'Programming Languages',
            skills: skills.languages.map((s: string) => ({ name: s, level: 'Advanced' as const }))
          })
        }
        if (skills.frameworks?.length) {
          categories.push({
            category: 'Frameworks & Libraries',
            skills: skills.frameworks.map((s: string) => ({ name: s, level: 'Advanced' as const }))
          })
        }
        if (skills.tools?.length) {
          categories.push({
            category: 'Tools & Technologies',
            skills: skills.tools.map((s: string) => ({ name: s, level: 'Advanced' as const }))
          })
        }
        // Group "other" skills into domain-specific categories if they're numerous
        if (skills.other?.length) {
          // If there are many "other" skills, try to group them intelligently
          if (skills.other.length > 10) {
            // For now, just split into chunks or keep as one category
            categories.push({
              category: 'Professional Skills',
              skills: skills.other.map((s: string) => ({ name: s, level: 'Advanced' as const }))
            })
          } else {
            categories.push({
              category: 'Other Skills',
              skills: skills.other.map((s: string) => ({ name: s, level: 'Advanced' as const }))
            })
          }
        }
        
        return categories
      })(),
      
      // Projects
      projects: (data.projects || []).map((proj: any) => {
        const highlights = proj.bullets || proj.highlights || []
        // Action verbs are already translated by the API
        return {
          name: proj.name || proj.title || '',
          description: proj.description || '',
          highlights: Array.isArray(highlights) ? highlights : [], // Template uses 'highlights'
        }
      }),
      
      // Certifications
      certifications: (data.certifications || []).map((cert: any) => {
        if (typeof cert === 'string') {
          return { name: cert, date: '', issuer: '' }
        }
        return {
          name: cert.name || cert.title || '',
          date: cert.date || cert.year || '',
          issuer: cert.issuer || cert.organization || '',
        }
      }),
      
      // Languages (human languages, not programming)
      languages: (data.languages || []).map((lang: any) => {
        if (typeof lang === 'string') {
          // Handle format like "Arabe Langue maternelle" or "Français Bilingue"
          const parts = lang.split(/\s+/)
          if (parts.length >= 2) {
            const name = parts[0]
            const proficiency = parts.slice(1).join(' ') // Template uses 'proficiency'
            return { name, proficiency }
          }
          return { name: lang, proficiency: 'Fluent' }
        }
        return {
          name: lang.name || lang.language || '',
          proficiency: lang.level || lang.proficiency || 'Fluent', // Template uses 'proficiency'
        }
      }),
      
      // Awards
      awards: (data.awards || []).map((award: any) => {
        if (typeof award === 'string') {
          return { title: award, date: '', issuer: '' }
        }
        return {
          title: award.title || award.name || '',
          date: award.date || award.year || '',
          issuer: award.issuer || award.organization || '',
        }
      }),
      
      // Volunteer
      volunteer: (data.volunteer || []).map((vol: any) => ({
        organization: vol.organization || vol.company || '',
        role: vol.position || vol.role || '', // Template uses 'role'
        startDate: vol.startDate || '',
        endDate: vol.endDate || '',
        description: vol.description || '',
      })),
    }
  }

  const templateData = mapParsedDataToTemplate(parsedData)

  return (
    <div className="space-y-4">
      {/* Toggle Switch (Segmented Control) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="size-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-medium">Your Resume</span>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex rounded-lg bg-secondary p-1">
          <button
            onClick={() => setView('original')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              view === 'original'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setView('enhanced')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
              view === 'enhanced'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Enhanced
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="rounded-lg border-2 border-border bg-background overflow-auto">
        {view === 'original' ? (
          pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-[1100px] border-0"
              title="PDF Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-[600px] text-muted-foreground">
              Loading PDF...
            </div>
          )
        ) : (
          <div className="cv-preview-container">
            {/* A4 format with proper scaling */}
            <style jsx>{`
              .cv-preview-container {
                background: #525659;
                padding: 20px;
                min-height: 100vh;
              }
              .cv-page {
                width: 210mm;
                min-height: 297mm;
                margin: 0 auto 20px;
                background: white;
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                page-break-after: always;
              }
              @media print {
                .cv-preview-container {
                  background: white;
                  padding: 0;
                }
                .cv-page {
                  margin: 0;
                  box-shadow: none;
                  page-break-after: always;
                }
              }
            `}</style>
            <div className="cv-page">
              <EnhancedAtlanticBlue data={templateData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
