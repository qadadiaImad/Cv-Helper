import { useState } from 'react'
import type { UniversalResumeData } from '../templates/universal-schema'
import { Code2, RotateCcw, Save } from 'lucide-react'
import { COMPLETE_SAMPLE_DATA } from '../templates/sample-data-universal'

interface DataEditorProps {
  data: UniversalResumeData
  onChange: (data: UniversalResumeData) => void
}

export function DataEditor({ data, onChange }: DataEditorProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2))
  const [error, setError] = useState<string | null>(null)

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText)
      onChange(parsed)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
    }
  }

  const handleReset = () => {
    const formatted = JSON.stringify(COMPLETE_SAMPLE_DATA, null, 2)
    setJsonText(formatted)
    onChange(COMPLETE_SAMPLE_DATA)
    setError(null)
  }

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const formatted = JSON.stringify(parsed, null, 2)
      setJsonText(formatted)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON')
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Resume Data (JSON)</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
              title="Reset to sample data"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleFormat}
              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              title="Format JSON"
            >
              Format
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              Apply Changes
            </button>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* JSON Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value)
            setError(null)
          }}
          className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-gray-50"
          spellCheck={false}
          placeholder="Enter resume data in JSON format..."
        />
      </div>

      {/* Helper Info */}
      <div className="bg-blue-50 border-t border-blue-100 px-6 py-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Tip:</strong> Edit the JSON and click "Apply Changes" to see updates in real-time. 
          Changes are not saved automatically.
        </p>
      </div>
    </div>
  )
}
