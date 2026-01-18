"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getVisibleTemplates,
  type TemplateMetadata,
  type TemplateCategory,
} from "@/lib/template-registry"

const CATEGORY_INFO: Record<TemplateCategory, { title: string; description: string }> = {
  minimal: {
    title: 'Simple Resume Templates',
    description: 'Minimalist, classic designs project a professional, corporate, executive tone. Clean styling keeps attention on your achievements while sailing through ATS checks—ideal for traditional industries or public-sector roles.'
  },
  modern: {
    title: 'Modern Resume Templates',
    description: 'Our modern, clean layouts showcase the best current design practices and the most popular two-column grids recruiters love. Expect bold accents, generous white-space, and instant screen appeal.'
  },
  creative: {
    title: 'Creative Resume Templates',
    description: 'Show your personality with creative, colorful templates that turn your resume into a visual story without sacrificing clarity. Vivid palettes, playful icons, and unique grids help your achievements stand out at first glance.'
  },
  classic: {
    title: 'Classic Resume Templates',
    description: 'Timeless, traditional designs that never go out of style. Perfect for conservative industries and formal applications where professionalism is paramount.'
  },
  executive: {
    title: 'Executive Resume Templates',
    description: 'Sophisticated layouts designed for senior-level professionals and leadership roles. Emphasize your experience and accomplishments with elegant, authoritative designs.'
  }
}

const INITIAL_VISIBLE_COUNT = 12

interface TemplateGalleryProps {
  selectedTemplateId?: string
  onTemplateSelect?: (templateId: string) => void
}

export function TemplateGallery({ selectedTemplateId, onTemplateSelect }: TemplateGalleryProps) {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<Set<TemplateCategory>>(new Set())

  // Group templates by category
  const templatesByCategory = useMemo(() => {
    const allTemplates = getVisibleTemplates()
    const grouped: Partial<Record<TemplateCategory, TemplateMetadata[]>> = {}

    allTemplates.forEach(template => {
      if (!grouped[template.category]) {
        grouped[template.category] = []
      }
      grouped[template.category]!.push(template)
    })

    // Sort templates within each category by popularity
    Object.keys(grouped).forEach(category => {
      grouped[category as TemplateCategory]!.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    })

    return grouped
  }, [])

  // Get popular templates (top 6 from all categories)
  const popularTemplates = useMemo(() => {
    return getVisibleTemplates()
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 6)
  }, [])

  const toggleSection = (category: TemplateCategory) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const handleTemplateClick = (template: TemplateMetadata) => {
    if (onTemplateSelect) {
      onTemplateSelect(template.id)
    } else {
      // Navigate to builder with template ID
      router.push(`/dashboard/builder?templateId=${template.id}`)
    }
  }

  return (
    <div className="space-y-16">
      {/* Popular Templates Section */}
      <section>
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-3">Popular Templates</h2>
          <p className="text-muted-foreground max-w-3xl">
            Choose an ATS-ready resume template in your preferred style and format. Try our free online resume builder and enjoy unlimited PDF downloads.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-6 lg:gap-y-10">
          {popularTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === selectedTemplateId}
              onClick={() => handleTemplateClick(template)}
            />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {(Object.keys(templatesByCategory) as TemplateCategory[]).map(category => {
        const templates = templatesByCategory[category] || []
        const isExpanded = expandedSections.has(category)
        const visibleTemplates = isExpanded ? templates : templates.slice(0, INITIAL_VISIBLE_COUNT)
        const hasMore = templates.length > INITIAL_VISIBLE_COUNT

        if (templates.length === 0) return null

        const categoryInfo = CATEGORY_INFO[category]

        return (
          <section key={category} id={category}>
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-3">{categoryInfo.title}</h2>
              <p className="text-muted-foreground max-w-3xl">
                {categoryInfo.description}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-6 lg:gap-y-10">
              {visibleTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={template.id === selectedTemplateId}
                  onClick={() => handleTemplateClick(template)}
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => toggleSection(category)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-base font-semibold shadow-md hover:bg-gray-50 transition-all"
                >
                  {isExpanded ? 'Show Less' : 'See More'}
                </Button>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

interface TemplateCardProps {
  template: TemplateMetadata
  isSelected: boolean
  onClick: () => void
}

function TemplateCard({ template, isSelected, onClick }: TemplateCardProps) {

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
        className="group relative cursor-pointer transition-all duration-150 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`Select ${template.name} template`}
      >
        {/* Template Image - A4 Aspect Ratio */}
        <div className="relative aspect-[1/1.41] bg-white overflow-hidden">
          <img
            src={`/template-thumbnails/${template.id}-thumb.png`}
            alt={`${template.name} preview`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />

          {/* New Badge */}
          {template.isNew && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </Badge>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
            <Button size="sm" variant="default" className="shadow-lg">
              Use Template
            </Button>
          </div>
        </div>

        {/* Template Name - Shows on hover */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <p className="text-sm font-medium text-center">{template.name}</p>
        </div>
      </div>
    </>
  )
}
