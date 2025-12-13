import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ComponentPalette } from '@/components/builder/ComponentPalette'
import { DropCanvas } from '@/components/builder/DropCanvas'
import { PropertyInspector } from '@/components/builder/PropertyInspector'
import { CodeExporter } from '@/components/builder/CodeExporter'
import { TemplatePresets } from '@/components/builder/TemplatePresets'
import { useComposition } from '@/lib/composition-engine'
import { Undo2, Redo2, Trash2 } from 'lucide-react'
import Split from 'react-split'

export function VisualBuilder() {
  const { tree, undo, redo, canUndo, canRedo, reset } = useComposition()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col bg-white">
        {/* Toolbar */}
        <div className="h-14 border-b bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Visual Builder</h2>
              <p className="text-xs text-gray-500">Compose templates with drag-and-drop</p>
            </div>
            <div className="flex gap-2 ml-6">
              <button
                onClick={undo}
                disabled={!canUndo}
                title="Undo"
                className="px-3 py-1.5 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
              >
                <Undo2 size={16} />
                Undo
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                title="Redo"
                className="px-3 py-1.5 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
              >
                <Redo2 size={16} />
                Redo
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <TemplatePresets />
            <button
              onClick={reset}
              className="px-4 py-2 border rounded hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              <Trash2 size={16} />
              Clear All
            </button>
            <CodeExporter tree={tree} />
          </div>
        </div>

        {/* 3-panel layout */}
        <Split
          className="flex-1 flex overflow-hidden"
          sizes={[15, 50, 35]}
          minSize={150}
          gutterSize={8}
        >
          {/* Component Palette */}
          <ComponentPalette />

          {/* Drop Canvas */}
          <DropCanvas />

          {/* Property Inspector */}
          <PropertyInspector />
        </Split>
      </div>
    </DndProvider>
  )
}
