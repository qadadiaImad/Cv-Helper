import { useState } from 'react'
import { UNIVERSAL_TEMPLATE_REGISTRY, searchUniversalTemplates } from '../templates/universal-registry'
import { CheckCircle2, Search } from 'lucide-react'

type TemplateCategory = 'minimal' | 'modern' | 'creative' | 'classic' | 'executive' | 'academic'

interface TemplateSelectorProps {
  selectedTemplateId: string
  onSelectTemplate: (id: string) => void
}

export function TemplateSelector({ selectedTemplateId, onSelectTemplate }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | TemplateCategory>('all')

  const allTemplates = UNIVERSAL_TEMPLATE_REGISTRY
  const searchedTemplates = searchQuery ? searchUniversalTemplates(searchQuery) : allTemplates
  const filteredTemplates = selectedCategory === 'all'
    ? searchedTemplates
    : searchedTemplates.filter(t => t.category === selectedCategory)

  const categories: Array<'all' | TemplateCategory> = ['all', 'minimal', 'modern', 'creative', 'classic', 'executive', 'academic']

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Templates</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Template List */}
      <div className="space-y-2">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No templates found</p>
          </div>
        ) : (
          filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                selectedTemplateId === template.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">{template.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{template.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                      {template.category}
                    </span>
                    {template.popularity && template.popularity >= 90 && (
                      <span className="text-xs text-yellow-600">⭐</span>
                    )}
                  </div>
                </div>
                {selectedTemplateId === template.id && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </div>
            </button>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Showing {filteredTemplates.length} of {allTemplates.length} templates
        </p>
      </div>
    </div>
  )
}
