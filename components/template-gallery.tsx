"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles, Check, Eye, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getVisibleTemplates,
  searchTemplates,
  getSortedTemplates,
  getTemplatesByCategory,
  type TemplateMetadata,
  type TemplateCategory,
} from "@/lib/template-registry"

const CATEGORIES: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Templates' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'modern', label: 'Modern' },
  { value: 'creative', label: 'Creative' },
  { value: 'classic', label: 'Classic' },
  { value: 'executive', label: 'Executive' },
]

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'name', label: 'Alphabetical' },
  { value: 'new', label: 'Newest First' },
]

interface TemplateGalleryProps {
  selectedTemplateId?: string
  onTemplateSelect?: (templateId: string) => void
}

export function TemplateGallery({ selectedTemplateId, onTemplateSelect }: TemplateGalleryProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'new'>('popularity')

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let templates = getVisibleTemplates()

    // Apply search
    if (searchQuery.trim()) {
      templates = searchTemplates(searchQuery)
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      templates = templates.filter(t => t.category === selectedCategory)
    }

    // Apply sorting
    const sortedTemplates = [...templates].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'new':
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return (b.popularity || 0) - (a.popularity || 0)
        default:
          return 0
      }
    })

    return sortedTemplates
  }, [searchQuery, selectedCategory, sortBy])

  const handleTemplateClick = (template: TemplateMetadata) => {
    if (onTemplateSelect) {
      onTemplateSelect(template.id)
    } else {
      // Navigate to builder with template ID
      router.push(`/dashboard/builder?templateId=${template.id}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, template: TemplateMetadata) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleTemplateClick(template)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            aria-label="Search templates"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-[160px]" aria-label="Sort templates">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {filteredTemplates.length} {filteredTemplates.length === 1 ? 'template' : 'templates'} found
      </p>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={template.id === selectedTemplateId}
              onClick={() => handleTemplateClick(template)}
              onKeyDown={(e) => handleKeyDown(e, template)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface TemplateCardProps {
  template: TemplateMetadata
  isSelected: boolean
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

function TemplateCard({ template, isSelected, onClick, onKeyDown }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card selection
    setShowPreview(true)
  }

  const handleClosePreview = () => {
    setShowPreview(false)
  }

  // Close modal on ESC key
  React.useEffect(() => {
    if (!showPreview) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePreview()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showPreview])

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={`
          group relative overflow-hidden rounded-lg border bg-card transition-all
          hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer
          ${isSelected ? 'ring-2 ring-primary shadow-md' : ''}
        `}
        aria-label={`Select ${template.name} template`}
      >
      {/* Dynamic iFrame Preview */}
      <div className="relative aspect-[8.5/11] bg-white overflow-hidden">
        <iframe
          src={`/preview/${template.id}`}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          style={{
            transform: 'scale(0.25)',
            transformOrigin: 'top left',
            width: '400%',
            height: '400%',
          }}
          title={`${template.name} preview`}
          loading="lazy"
        />

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5">
            <Check className="h-4 w-4" />
          </div>
        )}

        {/* New Badge */}
        {template.isNew && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          </div>
        )}

        {/* Hover Overlay with Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={handlePreviewClick}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" variant="default">
            Use this template
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-base line-clamp-1">{template.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="secondary" className="text-xs capitalize">
            {template.category}
          </Badge>
          {template.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>

    {/* Preview Modal */}
    {showPreview && (
      <div 
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in"
        onClick={handleClosePreview}
      >
        <div 
          className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div>
              <h2 className="text-xl font-semibold">{template.name}</h2>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={onClick} className="gap-2">
                <Check className="h-4 w-4" />
                Use Template
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleClosePreview}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Modal Content - Full Template Preview */}
          <div className="bg-gray-100 overflow-auto" style={{ height: 'calc(90vh - 80px)' }}>
            <div className="flex items-center justify-center min-h-full p-8">
              <div className="bg-white shadow-2xl" style={{ width: '620px', height: '877px' }}>
                <iframe
                  src={`/preview/${template.id}`}
                  className="w-full h-full border-0 pointer-events-none"
                  style={{
                    transform: 'scale(0.5)',
                    transformOrigin: 'top left',
                    width: '200%',
                    height: '200%',
                  }}
                  title={`${template.name} full preview`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
