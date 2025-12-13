import { useState } from 'react'
import { generateFullComponent } from '@/lib/code-generator'
import type { CompositionNode } from '@/lib/composition-engine'
import Editor from '@monaco-editor/react'
import { Code, X, Copy, Check } from 'lucide-react'

interface CodeExporterProps {
  tree: CompositionNode | null
}

export function CodeExporter({ tree }: CodeExporterProps) {
  const [showModal, setShowModal] = useState(false)
  const [componentName, setComponentName] = useState('MyTemplate')
  const [copied, setCopied] = useState(false)

  const code = tree ? generateFullComponent(tree, componentName) : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={!tree}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Code size={18} />
        Export Code
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Export React Component</h2>
                <input
                  type="text"
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="px-3 py-1 border rounded"
                  placeholder="Component name"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2"
                >
                  <X size={16} />
                  Close
                </button>
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="typescript"
                value={code}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
