"use client"

import React from "react"
import { REACT_TEMPLATES, type TemplateId } from "@/lib/react-templates"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.keys(REACT_TEMPLATES).map((templateId) => {
        const TemplateComponent = REACT_TEMPLATES[templateId as TemplateId]
        const isSelected = selectedTemplate === templateId
        
        return (
          <Card 
            key={templateId}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => onTemplateChange(templateId as TemplateId)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold capitalize">
                  {templateId.replace('_', ' ')}
                </h3>
                <Badge variant="secondary">
                  {templateCategories[templateId as keyof typeof templateCategories]}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {templateDescriptions[templateId as keyof typeof templateDescriptions]}
              </p>
              
              {/* Mini preview */}
              <div className="border rounded bg-gray-50 p-2 scale-75 origin-top">
                <div className="text-xs font-bold mb-1">John Doe</div>
                <div className="text-xs text-gray-500 mb-1">john@example.com</div>
                <div className="text-xs">
                  <div className="font-semibold">Software Engineer</div>
                  <div className="text-gray-500">Tech Corp</div>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}