import { useState } from 'react'
import { TemplateSelector } from './components/TemplateSelector'
import { TemplatePreview } from './components/TemplatePreview'
import { DataEditor } from './components/DataEditor'
import { COMPLETE_SAMPLE_DATA } from './templates/sample-data-universal'
import type { UniversalResumeData } from './templates/universal-schema'
import { PlayCircle, Code2, Eye } from 'lucide-react'

export default function App() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('atlantic_blue')
  const [resumeData, setResumeData] = useState<UniversalResumeData>(COMPLETE_SAMPLE_DATA)
  const [viewMode, setViewMode] = useState<'preview' | 'split'>('split')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Template Playground</h1>
                <p className="text-sm text-gray-600">Test & preview CV templates</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('split')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  viewMode === 'split'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Split View
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview Only
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-89px)]">
        {/* Left Sidebar - Template Selector */}
        <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <TemplateSelector
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={setSelectedTemplateId}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {viewMode === 'split' && (
            <div className="w-1/2 border-r border-gray-200 overflow-y-auto bg-gray-50">
              <DataEditor data={resumeData} onChange={setResumeData} />
            </div>
          )}
          
          <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
            <TemplatePreview templateId={selectedTemplateId} data={resumeData} />
          </div>
        </main>
      </div>
    </div>
  )
}
