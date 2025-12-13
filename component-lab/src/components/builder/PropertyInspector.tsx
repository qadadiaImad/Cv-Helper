import { useComposition } from '@/lib/composition-engine'
import { useComponentMetadata } from '@/hooks/useComponentMetadata'
import type { CompositionNode } from '@/lib/composition-engine'
import type { PropDefinition } from '@/lib/component-metadata'
import { Settings, Info, RotateCcw } from 'lucide-react'
import { useState } from 'react'

export function PropertyInspector() {
  const { tree, selectedNodeId, updateNodeProps } = useComposition()
  const { byId } = useComponentMetadata()
  const [activeTab, setActiveTab] = useState<'props' | 'styles'>('props')

  const findNode = (node: CompositionNode | null, id: string): CompositionNode | null => {
    if (!node) return null
    if (node.id === id) return node
    return node.children?.map(c => findNode(c, id)).find(Boolean) ?? null
  }

  const selectedNode = selectedNodeId ? findNode(tree, selectedNodeId) : null

  if (!selectedNode) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="p-4 bg-white border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Settings size={18} />
            Properties
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="mb-4 inline-block p-4 bg-gray-200 rounded-full">
              <Info size={32} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-2 font-medium">No component selected</p>
            <p className="text-xs text-gray-500">
              Click on a component in the canvas to edit its properties and styles
            </p>
          </div>
        </div>
      </div>
    )
  }

  const metadata = byId[selectedNode.componentId]
  if (!metadata) return null

  const handlePropChange = (propName: string, value: any) => {
    updateNodeProps(selectedNode.id, { [propName]: value })
  }

  const handleReset = (prop: PropDefinition) => {
    if (prop.defaultValue !== undefined) {
      handlePropChange(prop.name, prop.defaultValue)
    }
  }

  const renderControl = (prop: PropDefinition) => {
    const value = selectedNode.props[prop.name] ?? prop.defaultValue
    const hasCustomValue = selectedNode.props[prop.name] !== undefined &&
                           selectedNode.props[prop.name] !== prop.defaultValue

    switch (prop.control) {
      case 'text':
        return (
          <div className="relative">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={prop.defaultValue}
            />
            {hasCustomValue && (
              <button
                onClick={() => handleReset(prop)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Reset to default"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        )

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handlePropChange(prop.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder={prop.defaultValue}
          />
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handlePropChange(prop.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Select --</option>
            {prop.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )

      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropChange(prop.name, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        )

      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handlePropChange(prop.name, Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'json':
        return (
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-2">
            <div className="text-xs font-mono text-gray-600 max-h-32 overflow-auto">
              {JSON.stringify(value, null, 2)}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded border border-gray-200">
            No control available for type: {prop.type}
          </div>
        )
    }
  }

  // Category badge colors
  const categoryBadges = {
    atoms: 'bg-green-100 text-green-700 border-green-200',
    molecules: 'bg-blue-100 text-blue-700 border-blue-200',
    organisms: 'bg-purple-100 text-purple-700 border-purple-200',
    layouts: 'bg-orange-100 text-orange-700 border-orange-200',
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900">{metadata.name}</h3>
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{metadata.description}</p>
          </div>
          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${categoryBadges[metadata.category]}`}>
            {metadata.category}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setActiveTab('props')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'props'
                ? 'bg-white text-blue-700 shadow-sm border border-blue-200'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('styles')}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'styles'
                ? 'bg-white text-blue-700 shadow-sm border border-blue-200'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            Styles
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'props' ? (
          <div className="space-y-5">
            {metadata.props.filter(p => p.control !== 'json').length > 0 ? (
              metadata.props.filter(p => p.control !== 'json').map(prop => (
                <div key={prop.name} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-gray-800">
                      {prop.name}
                      {prop.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <span className="text-xs text-gray-500 font-mono">{prop.type}</span>
                  </div>
                  {prop.description && (
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">{prop.description}</p>
                  )}
                  {renderControl(prop)}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                No editable properties available
              </div>
            )}

            {/* Variants quick access */}
            {metadata.variants && metadata.variants.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm font-semibold text-gray-800 mb-3">Quick Presets</div>
                <div className="grid grid-cols-2 gap-2">
                  {metadata.variants.map(variant => (
                    <button
                      key={variant.name}
                      onClick={() => {
                        Object.entries(variant.props).forEach(([key, value]) => {
                          handlePropChange(key, value)
                        })
                      }}
                      className="px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all"
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            Style editor coming soon...
          </div>
        )}
      </div>
    </div>
  )
}
