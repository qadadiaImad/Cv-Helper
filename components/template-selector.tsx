"use client"

import React from "react"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PenTool,
  Briefcase,
  Sparkles,
  Layers,
  Palette,
  Globe2,
  Cpu,
  MonitorSmartphone,
  Presentation,
  Rocket,
} from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: TemplateId
  onTemplateChange: (template: TemplateId) => void
}

const templateDescriptions = {
  classic_minimal: "Noir & blanc, police serif, lignes fines",
  modern_blue: "Palette bleu/gris clair, police sans-serif",
  creative_gradient: "Dégradés violets/roses, icônes Material UI",
  elegant_black: "Background sombre (#1C1C1C), typo blanche",
  compact_cards: "Sections encadrées (cards blanches avec shadow)",
  timeline_modern: "Couleurs pastel, icônes pour repères",
  corporate_clean: "Palette bleu marine + gris, typo sobre",
  lofi_minimal: "Palette noir/blanc avec touches cyan",
  color_blocks: "Sections colorées (header rouge, skills vert, projets bleu)",
  european_standard: "Inspiré Europass (bleu clair, structure rigide)",
}

const templateCategories = {
  classic_minimal: "Académique",
  modern_blue: "Corporate",
  creative_gradient: "Startup/Tech",
  elegant_black: "Premium",
  compact_cards: "Data/IT",
  timeline_modern: "Design",
  corporate_clean: "Finance/Banking",
  lofi_minimal: "Developer",
  color_blocks: "Creative",
  european_standard: "International",
}

const categoryIcons = {
  Académique: <PenTool className="h-5 w-5" />,
  Corporate: <Briefcase className="h-5 w-5" />,
  "Startup/Tech": <Rocket className="h-5 w-5" />,
  Premium: <Layers className="h-5 w-5" />,
  "Data/IT": <Cpu className="h-5 w-5" />,
  Design: <Palette className="h-5 w-5" />,
  Finance: <Presentation className="h-5 w-5" />,
  Developer: <MonitorSmartphone className="h-5 w-5" />,
  Creative: <Sparkles className="h-5 w-5" />,
  International: <Globe2 className="h-5 w-5" />,
} as const

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(REACT_TEMPLATES).map((templateId) => {
        const TemplateComponent = REACT_TEMPLATES[templateId as TemplateId]
        const isSelected = selectedTemplate === templateId
        const category = templateCategories[templateId as keyof typeof templateCategories]
        const icon = categoryIcons[category as keyof typeof categoryIcons]

        return (
          <Card 
            key={templateId}
            className={`glass-panel card-glow cursor-pointer border border-border/40 p-4 transition-all duration-300 hover:-translate-y-1 ${
              isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/30' : 'ring-0'
            }`}
            onClick={() => onTemplateChange(templateId as TemplateId)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isSelected ? 'bg-primary/25 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold capitalize text-foreground">
                      {templateId.replace('_', ' ')}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{category}</p>
                  </div>
                </div>
                <Badge variant={isSelected ? 'outline' : 'secondary'} className="rounded-full">
                  {isSelected ? 'Selected' : 'Preview'}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {templateDescriptions[templateId as keyof typeof templateDescriptions]}
              </p>

              {/* Mini preview */}
              <div className="bg-grid relative overflow-hidden rounded-2xl border border-border/40 p-3">
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-background/80 to-transparent" />
                <div className="relative text-xs text-left text-foreground">
                  <div className="text-sm font-semibold">John Doe</div>
                  <div className="text-xs text-muted-foreground">john@example.com • 123-456-7890</div>
                  <div className="mt-2 flex gap-3 text-xs">
                    <span className="pill bg-primary/10 text-primary">Experience</span>
                    <span className="pill bg-accent/10 text-accent">Skills</span>
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <p className="font-medium text-foreground">Software Engineer — Tech Corp</p>
                    <p>Led a cross-functional team to ship features faster.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
