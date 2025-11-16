'use client'

import { useEffect, useState, useMemo } from 'react'
import { useDevTools } from '@/lib/dev-context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import type { AIModel } from '@/lib/ai-dev-tools'

export function ModelSelector() {
  const { selectedModel, setSelectedModel, models, setModels } = useDevTools()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch models on mount
    fetch('/api/ai/models')
      .then(res => res.json())
      .then((data: AIModel[]) => setModels(data))
      .catch(err => console.error('Failed to fetch models:', err))
  }, [setModels])

  // Filter models based on search query
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return models
    
    const query = searchQuery.toLowerCase()
    return models.filter(model => 
      model.name.toLowerCase().includes(query) ||
      model.id.toLowerCase().includes(query)
    )
  }, [models, searchQuery])

  return (
    <div className="space-y-1">
      <label className="text-xs text-slate-400">AI Model</label>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="h-8 text-xs bg-slate-800 border-slate-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700 text-white max-h-96">
          {/* Search Bar */}
          <div className="sticky top-0 bg-slate-800 p-2 border-b border-slate-700 z-10">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
              <Input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 pl-7 text-xs bg-slate-900 border-slate-600 text-white placeholder:text-slate-500"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Models List */}
          <div className="overflow-y-auto max-h-72">
            {filteredModels.length === 0 ? (
              <div className="text-xs text-slate-400 p-3 text-center">
                {searchQuery ? 'No models found' : 'Loading models...'}
              </div>
            ) : (
              filteredModels.map((model) => {
                const totalCost = model.pricing.prompt + model.pricing.completion
                const isFree = totalCost === 0
                
                return (
                  <SelectItem 
                    key={model.id} 
                    value={model.id}
                    className="text-xs hover:bg-slate-700"
                  >
                    <div className="flex justify-between items-center w-full gap-2">
                      <span className="truncate flex-1">{model.name}</span>
                      {isFree ? (
                        <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded font-semibold">
                          FREE
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          ${(totalCost / 2).toFixed(3)}/1M
                        </span>
                      )}
                    </div>
                  </SelectItem>
                )
              })
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}
