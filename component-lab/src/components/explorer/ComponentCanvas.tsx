import type { ComponentMetadata } from '@/lib/component-metadata'

interface ComponentCanvasProps {
  component: ComponentMetadata | undefined
  props: Record<string, any>
}

export function ComponentCanvas({ component, props }: ComponentCanvasProps) {
  if (!component) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a component to preview
      </div>
    )
  }

  const Component = component.component

  return (
    <div className="space-y-6">
      {/* Component info */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold uppercase text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {component.category}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">{component.name}</h2>
        </div>
        <p className="text-gray-600">{component.description}</p>

        {component.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {component.tags.map(tag => (
              <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Live preview */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Live Preview</h3>
        <div className="border rounded-lg p-8 bg-white shadow-sm">
          <Component {...props} />
        </div>
      </div>
    </div>
  )
}
