import { useDrag } from 'react-dnd'
import { useComponentMetadata } from '@/hooks/useComponentMetadata'
import { DND_TYPES } from '@/lib/dnd-types'
import type { ComponentMetadata } from '@/lib/component-metadata'
import { useState } from 'react'
import { Search, Layers, Box, Component as ComponentIcon, LayoutGrid, ChevronDown, ChevronRight } from 'lucide-react'

function ComponentThumbnail({ component }: { component: ComponentMetadata }) {
  // Skip thumbnail rendering for organisms and layouts (they need complex data)
  if (component.category === 'organisms' || component.category === 'layouts') {
    return (
      <div className="h-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden border border-gray-200">
        <div className="text-xs text-gray-400 text-center px-2">
          {component.category === 'organisms' ? '📋' : '📐'}
        </div>
      </div>
    )
  }

  const Component = component.component
  const firstVariant = component.variants?.[0]
  
  // Build preview props from component metadata
  let previewProps: Record<string, any> = {}
  
  if (firstVariant) {
    previewProps = firstVariant.props
  } else {
    // Use default values from prop definitions
    component.props.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        previewProps[prop.name] = prop.defaultValue
      }
    })
  }

  return (
    <div className="h-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded overflow-hidden border border-gray-200">
      <div className="scale-75 transform">
        <Component {...previewProps} />
      </div>
    </div>
  )
}

function DraggableComponent({ component }: { component: ComponentMetadata }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_TYPES.COMPONENT,
    item: { componentId: component.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const categoryBadges = {
    atoms: { color: 'bg-green-100 text-green-700 border-green-200', icon: Box },
    molecules: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Layers },
    organisms: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: ComponentIcon },
    layouts: { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: LayoutGrid },
  }

  const badge = categoryBadges[component.category]
  const Icon = badge.icon

  return (
    <div
      ref={drag}
      className={`group bg-white border-2 border-gray-200 rounded-lg overflow-hidden cursor-move hover:border-blue-400 hover:shadow-lg transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Thumbnail preview */}
      <ComponentThumbnail component={component} />

      {/* Component info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">{component.name}</div>
            <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">{component.description}</div>
          </div>
          <div className={`px-1.5 py-0.5 rounded text-xs font-medium border flex items-center gap-1 ${badge.color}`}>
            <Icon size={10} />
          </div>
        </div>

        {/* Tags */}
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {component.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Drag indicator */}
      <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

export function ComponentPalette() {
  const { byCategory, search: searchComponents } = useComponentMetadata()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['atoms', 'molecules', 'organisms', 'layouts'])
  )

  const categoryConfig = {
    atoms: {
      color: 'bg-green-50 border-green-200 text-green-800',
      icon: Box,
      description: 'Basic building blocks'
    },
    molecules: {
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Layers,
      description: 'Simple combinations'
    },
    organisms: {
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      icon: ComponentIcon,
      description: 'Complete sections'
    },
    layouts: {
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      icon: LayoutGrid,
      description: 'Page structures'
    },
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const filteredComponents = searchQuery
    ? searchComponents(searchQuery)
    : null

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 space-y-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Component Library</h3>
          <p className="text-xs text-gray-500 mt-0.5">Drag components to canvas</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredComponents ? (
          // Search results
          <div className="space-y-3">
            <div className="text-xs text-gray-500 font-medium">
              {filteredComponents.length} result{filteredComponents.length !== 1 ? 's' : ''}
            </div>
            {filteredComponents.map(comp => (
              <DraggableComponent key={comp.id} component={comp} />
            ))}
          </div>
        ) : (
          // Categorized view
          (['atoms', 'molecules', 'organisms', 'layouts'] as const).map(category => {
            const config = categoryConfig[category]
            const Icon = config.icon
            const isExpanded = expandedCategories.has(category)
            const components = byCategory[category]

            return (
              <div key={category} className="space-y-2">
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${config.color} hover:shadow-md`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={18} />
                    <div className="text-left">
                      <div className="text-sm font-bold uppercase">{category}</div>
                      <div className="text-xs opacity-75">{config.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-white/50 px-2 py-1 rounded">
                      {components.length}
                    </span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>

                {/* Category components */}
                {isExpanded && (
                  <div className="grid grid-cols-1 gap-3 ml-2">
                    {components.map(comp => (
                      <DraggableComponent key={comp.id} component={comp} />
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Footer tip */}
      <div className="p-3 bg-blue-50 border-t border-blue-100">
        <div className="text-xs text-blue-700 flex items-start gap-2">
          <span className="font-bold">💡</span>
          <span>Tip: Start with a Layout, then add Organisms and smaller components inside.</span>
        </div>
      </div>
    </div>
  )
}
