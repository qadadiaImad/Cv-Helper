import type { ComponentMetadata, PropDefinition } from '@/lib/component-metadata'

interface PropsPanelProps {
  component: ComponentMetadata | undefined
  currentProps: Record<string, any>
  onChange: (props: Record<string, any>) => void
}

export function PropsPanel({ component, currentProps, onChange }: PropsPanelProps) {
  if (!component) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Select a component to view props
      </div>
    )
  }

  const handlePropChange = (propName: string, value: any) => {
    onChange({ ...currentProps, [propName]: value })
  }

  const renderControl = (prop: PropDefinition) => {
    const value = currentProps[prop.name] ?? prop.defaultValue

    switch (prop.control) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handlePropChange(prop.name, e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={prop.description}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handlePropChange(prop.name, e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder={prop.description}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handlePropChange(prop.name, Number(e.target.value))}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropChange(prop.name, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        )

      case 'color':
        return (
          <div className="flex gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              className="w-16 h-10 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={value || '#000000'}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              className="flex-1 px-3 py-2 border rounded font-mono text-sm"
              placeholder="#000000"
            />
          </div>
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handlePropChange(prop.name, e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Select --</option>
            {prop.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )

      case 'json':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value)
                handlePropChange(prop.name, parsed)
              } catch {
                // Invalid JSON, don't update
              }
            }}
            className="w-full px-3 py-2 border rounded font-mono text-xs"
            rows={6}
            placeholder={JSON.stringify(prop.defaultValue, null, 2)}
          />
        )

      default:
        return <span className="text-sm text-gray-500">No control available</span>
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{component.name} Props</h3>

      <div className="space-y-4">
        {component.props.map(prop => (
          <div key={prop.name} className="border-b pb-4 last:border-b-0">
            <div className="flex items-baseline justify-between mb-2">
              <label className="font-medium text-sm text-gray-700 flex items-center gap-1">
                {prop.name}
                {prop.required && <span className="text-red-500 text-xs">*</span>}
              </label>
              <span className="text-xs text-gray-500 font-mono">{prop.type}</span>
            </div>

            {prop.description && (
              <p className="text-xs text-gray-600 mb-2">{prop.description}</p>
            )}

            {renderControl(prop)}

            {prop.defaultValue !== undefined && (
              <p className="text-xs text-gray-500 mt-1">
                Default: <code className="bg-gray-100 px-1 rounded">{JSON.stringify(prop.defaultValue)}</code>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Variant presets */}
      {component.variants && component.variants.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold text-sm mb-3 text-gray-700">Presets</h4>
          <div className="space-y-2">
            {component.variants.map(variant => (
              <button
                key={variant.name}
                onClick={() => onChange({ ...currentProps, ...variant.props })}
                className="w-full px-3 py-2 text-left border rounded hover:bg-gray-50 text-sm transition-colors"
              >
                <div className="font-medium">{variant.name}</div>
                {variant.description && (
                  <div className="text-xs text-gray-500 mt-1">{variant.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
