import { useState } from 'react'
import { ComponentTree } from '@/components/explorer/ComponentTree'
import { PropsTable } from '@/components/docs/PropsTable'
import { useComponentMetadata } from '@/hooks/useComponentMetadata'

export function Documentation() {
  const [selectedId, setSelectedId] = useState('text')
  const { byId } = useComponentMetadata()
  const component = byId[selectedId]

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r overflow-y-auto bg-gray-50">
        <ComponentTree selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Documentation content */}
      <div className="flex-1 overflow-y-auto p-8">
        {component ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="text-sm text-gray-500 uppercase mb-2 font-semibold">
                {component.category}
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{component.name}</h1>
              <p className="text-lg text-gray-600">{component.description}</p>

              {component.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {component.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Props table */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Props</h2>
              <PropsTable props={component.props} />
            </section>

            {/* Variants */}
            {component.variants && component.variants.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Variants</h2>
                <div className="space-y-3">
                  {component.variants.map(variant => (
                    <div key={variant.name} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{variant.name}</h3>
                      {variant.description && (
                        <p className="text-gray-600 mb-3">{variant.description}</p>
                      )}
                      <div className="bg-gray-50 p-4 rounded border">
                        <component.component {...variant.props} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Best practices */}
            {component.bestPractices && component.bestPractices.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Best Practices</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {component.bestPractices.map((practice, i) => (
                    <li key={i} className="text-gray-700">{practice}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Examples */}
            {component.examples && component.examples.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Examples</h2>
                <div className="space-y-4">
                  {component.examples.map((example, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{example.title}</h3>
                      <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-gray-500">Select a component to view documentation</div>
        )}
      </div>
    </div>
  )
}
