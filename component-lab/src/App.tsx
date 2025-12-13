import { useState } from 'react'
import { ComponentExplorer } from './pages/ComponentExplorer'
import { VisualBuilder } from './pages/VisualBuilder'
import { Documentation } from './pages/Documentation'
import TemplateComparison from './pages/TemplateComparison'
import { Box, Hammer, BookOpen, GitCompare } from 'lucide-react'

type Tab = 'explorer' | 'builder' | 'docs' | 'comparison'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explorer')

  const tabs = [
    { id: 'explorer' as const, label: 'Component Explorer', icon: Box, description: 'Browse and preview components' },
    { id: 'builder' as const, label: 'Visual Builder', icon: Hammer, description: 'Build templates with drag-and-drop' },
    { id: 'comparison' as const, label: 'Template Comparison', icon: GitCompare, description: 'Compare original vs refactored templates' },
    { id: 'docs' as const, label: 'Documentation', icon: BookOpen, description: 'Component API documentation' },
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top navigation */}
      <nav className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg flex items-center px-6">
        <div className="flex items-center gap-3 mr-8">
          <Box className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">CV Component Lab</h1>
            <p className="text-xs text-blue-100">Interactive Development Environment</p>
          </div>
        </div>

        <div className="flex gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={tab.description}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-medium ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-700 shadow-md'
                    : 'bg-blue-500 hover:bg-blue-400 text-white'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'explorer' && <ComponentExplorer />}
        {activeTab === 'builder' && <VisualBuilder />}
        {activeTab === 'comparison' && <TemplateComparison />}
        {activeTab === 'docs' && <Documentation />}
      </main>
    </div>
  )
}
