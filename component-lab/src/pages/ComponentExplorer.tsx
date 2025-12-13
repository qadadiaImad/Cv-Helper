import { useState } from 'react'
import { ComponentTree } from '@/components/explorer/ComponentTree'
import { ComponentCanvas } from '@/components/explorer/ComponentCanvas'
import { PropsPanel } from '@/components/explorer/PropsPanel'
import { CodeViewer } from '@/components/explorer/CodeViewer'
import { useComponentMetadata } from '@/hooks/useComponentMetadata'
import Split from 'react-split'

export function ComponentExplorer() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('text')
  const [currentProps, setCurrentProps] = useState<Record<string, any>>({
    children: 'Hello World',
    variant: 'body'
  })
  const { byId } = useComponentMetadata()

  const selectedComponent = byId[selectedComponentId]

  // Reset props when component changes
  const handleComponentSelect = (id: string) => {
    setSelectedComponentId(id)
    const component = byId[id]

    // Set default props
    const defaults: Record<string, any> = {}
    component?.props.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        defaults[prop.name] = prop.defaultValue
      }
    })
    setCurrentProps(defaults)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-14 border-b bg-white px-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Component Explorer</h2>
          <p className="text-xs text-gray-500">Browse and preview all components with live prop controls</p>
        </div>
      </div>

      {/* 3-column layout */}
      <Split
        className="flex-1 flex overflow-hidden"
        sizes={[20, 50, 30]}
        minSize={200}
        gutterSize={8}
      >
        {/* Left: Component tree */}
        <div className="overflow-y-auto bg-gray-50 border-r">
          <ComponentTree
            selectedId={selectedComponentId}
            onSelect={handleComponentSelect}
          />
        </div>

        {/* Center: Canvas + Code */}
        <div className="flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-8 bg-white">
            <ComponentCanvas
              component={selectedComponent}
              props={currentProps}
            />
          </div>
          <div className="h-64 border-t overflow-hidden">
            <CodeViewer
              component={selectedComponent}
              props={currentProps}
            />
          </div>
        </div>

        {/* Right: Props panel */}
        <div className="overflow-y-auto bg-gray-50 border-l">
          <PropsPanel
            component={selectedComponent}
            currentProps={currentProps}
            onChange={setCurrentProps}
          />
        </div>
      </Split>
    </div>
  )
}
