import { useComponentMetadata } from '@/hooks/useComponentMetadata'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface ComponentTreeProps {
  selectedId: string
  onSelect: (id: string) => void
}

export function ComponentTree({ selectedId, onSelect }: ComponentTreeProps) {
  const { byCategory } = useComponentMetadata()
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['atoms', 'molecules', 'organisms', 'layouts'])
  )

  const toggle = (category: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  const categoryColors = {
    atoms: 'text-green-600',
    molecules: 'text-blue-600',
    organisms: 'text-purple-600',
    layouts: 'text-orange-600',
  }

  return (
    <div className="p-4">
      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4 px-3">
        Components
      </h3>

      {(['atoms', 'molecules', 'organisms', 'layouts'] as const).map(category => (
        <div key={category} className="mb-4">
          <button
            onClick={() => toggle(category)}
            className={`flex items-center gap-2 font-semibold text-sm uppercase ${categoryColors[category]} mb-2 px-3 py-1 rounded hover:bg-gray-100 w-full`}
          >
            {expanded.has(category) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            {category}
            <span className="text-xs text-gray-500 ml-auto">({byCategory[category].length})</span>
          </button>

          {expanded.has(category) && (
            <div className="ml-2 space-y-1">
              {byCategory[category].map(comp => (
                <button
                  key={comp.id}
                  onClick={() => onSelect(comp.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedId === comp.id
                      ? 'bg-blue-100 text-blue-900 font-medium shadow-sm'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
