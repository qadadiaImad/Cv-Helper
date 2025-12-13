/**
 * TEMPLATE PRESETS COMPONENT
 * 
 * UI for loading pre-built template compositions
 */

import React, { useState } from 'react'
import { useComposition } from '@/lib/composition-engine'
import { TEMPLATE_PRESETS, cloneComposition } from '@/lib/template-presets'
import { FileText, X } from 'lucide-react'

export function TemplatePresets() {
  const { loadTemplatePreset, tree } = useComposition()
  const [showModal, setShowModal] = useState(false)

  const handleLoadTemplate = (templateId: string) => {
    const preset = TEMPLATE_PRESETS.find(p => p.id === templateId)
    if (preset) {
      // Clone the composition to ensure unique IDs
      const clonedTree = cloneComposition(preset.composition)
      loadTemplatePreset(clonedTree)
      setShowModal(false)
    }
  }

  const hasContent = tree !== null

  return (
    <>
      {/* Template Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        title="Load template preset"
      >
        <FileText size={18} />
        <span className="font-semibold">Templates</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Template Presets</h2>
                <p className="text-sm text-gray-600 mt-1">Choose a template to start with, then customize it</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Warning if content exists */}
            {hasContent && (
              <div className="mx-6 mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <p className="font-semibold text-yellow-900">Warning: Current work will be replaced</p>
                  <p className="text-sm text-yellow-800 mt-1">
                    Loading a template will replace your current composition. Make sure to save your work first if needed.
                  </p>
                </div>
              </div>
            )}

            {/* Template Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TEMPLATE_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => handleLoadTemplate(preset.id)}
                  >
                    {/* Thumbnail */}
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                      {preset.thumbnail ? (
                        <img src={preset.thumbnail} alt={preset.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-6">
                          <FileText size={48} className="mx-auto text-gray-400 mb-3" />
                          <div className="text-sm text-gray-500 font-mono">
                            {preset.composition.componentId}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-4 py-2 rounded-lg shadow-lg">
                          <span className="font-semibold text-purple-600">Load Template</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{preset.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {preset.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {TEMPLATE_PRESETS.length === 0 && (
                <div className="text-center py-12">
                  <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No templates available yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                💡 After loading, you can drag-drop components, add/delete sections, and customize everything
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
