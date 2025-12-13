import type { ComponentMetadata } from '@/lib/component-metadata'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CodeViewerProps {
  component: ComponentMetadata | undefined
  props: Record<string, any>
}

export function CodeViewer({ component, props }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  if (!component) return null

  // Generate code snippet
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`
      }
      if (typeof value === 'boolean') {
        return value ? key : ''
      }
      if (typeof value === 'number') {
        return `${key}={${value}}`
      }
      if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`
      }
      return ''
    })
    .filter(Boolean)
    .join(' ')

  const code = `<${component.name}${propsString ? ' ' + propsString : ''} />`

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-semibold text-gray-300">Usage Code</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="flex-1 overflow-auto p-4">
        <Highlight theme={themes.vsDark} code={code} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
