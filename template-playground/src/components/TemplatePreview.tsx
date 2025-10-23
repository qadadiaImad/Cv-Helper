import * as UniversalTemplates from '../templates/universal-templates'
import { getUniversalTemplateById } from '../templates/universal-registry'
import type { UniversalResumeData } from '../templates/universal-schema'
import { AlertCircle, Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

interface TemplatePreviewProps {
  templateId: string
  data: UniversalResumeData
}

// Map template IDs to component names
const TEMPLATE_COMPONENT_MAP: Record<string, keyof typeof UniversalTemplates> = {
  'atlantic_blue': 'AtlanticBlue',
  'executive': 'Executive',
  'mercury': 'Mercury',
  'classic': 'ClassicTemplate',
  'harvard': 'Harvard',
  'evergreen': 'Evergreen',
}

export function TemplatePreview({ templateId, data }: TemplatePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const template = getUniversalTemplateById(templateId)
  const componentName = TEMPLATE_COMPONENT_MAP[templateId]
  const TemplateComponent = componentName ? UniversalTemplates[componentName] : null

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Template Not Found</h3>
          <p className="text-gray-600">Template ID "{templateId}" not found in registry</p>
        </div>
      </div>
    )
  }

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Component Not Found</h3>
          <p className="text-gray-600">React component for "{template.name}" is missing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <p className="text-xs text-gray-600">{template.description}</p>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-gray-600" />
          ) : (
            <Maximize2 className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <div 
          className={`bg-white shadow-lg mx-auto transition-all ${
            isFullscreen ? 'max-w-full' : 'max-w-4xl'
          }`}
          style={{
            minHeight: isFullscreen ? 'auto' : '1000px',
          }}
        >
          <TemplateComponent data={data} />
        </div>
      </div>

      {/* Template Info Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>Category: <span className="font-medium">{template.category}</span></span>
            <span>Author: <span className="font-medium">{template.author}</span></span>
            {template.popularity && (
              <span>Popularity: <span className="font-medium">{template.popularity}/100</span></span>
            )}
          </div>
          <div className="flex gap-2">
            {template.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
