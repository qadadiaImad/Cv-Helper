"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Eye, Check } from "lucide-react"
import Image from "next/image"

export interface Template {
  id: string
  name: string
  description: string
  category: "modern" | "classic" | "creative" | "minimal"
  preview: string
  features: string[]
  isNew?: boolean
  isPro?: boolean
}

export const templates: Template[] = [
  {
    id: "classic-minimal",
    name: "Classic Minimal",
    description: "Clean, professional layout perfect for traditional industries",
    category: "minimal",
    preview: "/previews/classic-minimal.png",
    features: ["ATS-friendly", "Single column", "Traditional layout"],
  },
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Contemporary design with blue accent colors",
    category: "modern",
    preview: "/previews/modern-blue.png",
    features: ["Color accents", "Two-column", "Modern typography"],
    isNew: true,
  },
  {
    id: "compact-cards",
    name: "Compact Cards",
    description: "Card-based layout for organized information display",
    category: "modern",
    preview: "/previews/compact-cards.png",
    features: ["Card layout", "Compact design", "Visual hierarchy"],
  },
  {
    id: "timeline-modern",
    name: "Timeline Modern",
    description: "Timeline-based experience display with modern aesthetics",
    category: "creative",
    preview: "/previews/timeline-modern.png",
    features: ["Timeline design", "Visual flow", "Creative layout"],
    isNew: true,
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Premium template for senior positions and executives",
    category: "classic",
    preview: "/previews/executive-pro.png",
    features: ["Executive style", "Premium design", "Leadership focus"],
    isPro: true,
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Showcase your creative work with visual elements",
    category: "creative",
    preview: "/previews/creative-portfolio.png",
    features: ["Portfolio sections", "Visual elements", "Creative industry"],
  },
]

const categories = [
  { id: "all", name: "All Templates", count: templates.length },
  { id: "modern", name: "Modern", count: templates.filter(t => t.category === "modern").length },
  { id: "classic", name: "Classic", count: templates.filter(t => t.category === "classic").length },
  { id: "creative", name: "Creative", count: templates.filter(t => t.category === "creative").length },
  { id: "minimal", name: "Minimal", count: templates.filter(t => t.category === "minimal").length },
]

interface TemplateGalleryModalProps {
  selectedTemplate?: string
  onTemplateSelect: (templateId: string) => void
  children: React.ReactNode
}

export function TemplateGalleryModal({ selectedTemplate, onTemplateSelect, children }: TemplateGalleryModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-background">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Choose Your Template
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select a professional template that matches your industry and style preferences
          </p>
        </DialogHeader>

        <div className="flex gap-6 h-[calc(90vh-120px)]">
          {/* Category Sidebar */}
          <div className="w-48 flex-shrink-0">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Categories
            </h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`group cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-primary shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-0">
                    {/* Template Preview */}
                    <div className="aspect-[3/4] relative bg-secondary/20 rounded-t-lg overflow-hidden">
                      {/* Placeholder for template preview */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <div className="text-center">
                          <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Preview</p>
                        </div>
                      </div>
                      
                      {/* Overlay with actions */}
                      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                        hoveredTemplate === template.id ? "opacity-100" : "opacity-0"
                      }`}>
                        <Button size="sm" variant="secondary" className="bg-white text-black hover:bg-white/90">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>

                      {/* Selected indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {template.isNew && (
                          <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
                            New
                          </Badge>
                        )}
                        {template.isPro && (
                          <Badge variant="default" className="text-xs bg-orange-500 hover:bg-orange-600">
                            Pro
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {selectedTemplate && (
              <Button onClick={() => handleTemplateSelect(selectedTemplate)}>
                Use Selected Template
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
