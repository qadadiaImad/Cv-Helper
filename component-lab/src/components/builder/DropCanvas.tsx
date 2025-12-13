import { useDrop } from 'react-dnd'
import { useComposition } from '@/lib/composition-engine'
import { useComponentMetadata } from '@/hooks/useComponentMetadata'
import { DND_TYPES } from '@/lib/dnd-types'
import type { CompositionNode } from '@/lib/composition-engine'
import { X, GripVertical, Eye, EyeOff, Copy, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

// Layout Drop Zone Component for all layout areas
function LayoutDropZone({ 
  parentId, 
  area, 
  children 
}: { 
  parentId: string; 
  area: 'sidebar' | 'main' | 'left' | 'right'; 
  children: CompositionNode[] 
}) {
  const { addNode } = useComposition()
  const { byId } = useComponentMetadata()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DND_TYPES.COMPONENT,
    drop: (item: { componentId: string }, monitor) => {
      // Only handle if not already handled by a child
      if (monitor.didDrop()) {
        return
      }

      // Get component metadata to populate default props
      const componentMetadata = byId[item.componentId]
      const defaultProps: Record<string, any> = {}
      
      // Build default props from metadata
      componentMetadata?.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue
        }
      })
      
      // Add node with area specified
      addNode(parentId, item.componentId, defaultProps, area)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  // Area-specific styling
  const areaConfig = {
    sidebar: { bg: 'bg-black/10', text: 'text-white/70', emptyText: 'text-white/50', label: '📍 Sidebar' },
    main: { bg: 'bg-black/5', text: 'text-gray-500', emptyText: 'text-gray-400', label: '📄 Main Content' },
    left: { bg: 'bg-black/5', text: 'text-gray-500', emptyText: 'text-gray-400', label: '⬅️ Left (55%)' },
    right: { bg: 'bg-black/10', text: 'text-white/70', emptyText: 'text-white/50', label: '➡️ Right (45%)' },
  }

  const config = areaConfig[area]
  const hoverBg = 'bg-white/20'
  const borderColor = isOver && canDrop ? 'border-blue-400 border-solid' : 'border-gray-300 border-dashed'

  return (
    <div
      ref={drop}
      className={`min-h-[200px] p-4 rounded transition-all ${config.bg} ${borderColor} border-2 ${
        isOver && canDrop ? `${hoverBg} ring-2 ring-blue-300` : ''
      }`}
    >
      {/* Label */}
      <div className={`text-xs font-semibold mb-2 ${config.text}`}>
        {config.label}
      </div>

      {/* Render children */}
      <div className="space-y-3">
        {children.length > 0 ? (
          children.map(child => (
            <DroppableNode key={child.id} node={child} depth={1} />
          ))
        ) : (
          <div className={`text-center py-8 text-sm ${config.emptyText}`}>
            Drop components here
          </div>
        )}
      </div>
    </div>
  )
}

function DroppableNode({ node, depth = 0 }: { node: CompositionNode; depth?: number }) {
  const { addNode, selectNode, selectedNodeId, removeNode } = useComposition()
  const { byId } = useComponentMetadata()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DND_TYPES.COMPONENT,
    drop: (item: { componentId: string }) => {
      // Get component metadata to populate default props
      const componentMetadata = byId[item.componentId]
      const defaultProps: Record<string, any> = {}
      
      // Build default props from metadata
      componentMetadata?.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue
        }
      })
      
      addNode(node.id, item.componentId, defaultProps)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  // Handle fragment container - render children directly without wrapper
  if (node.componentId === '__fragment__') {
    return (
      <div className="space-y-3">
        {node.children?.map(child => (
          <DroppableNode key={child.id} node={child} depth={depth} />
        ))}
      </div>
    )
  }

  const metadata = byId[node.componentId]
  const Component = metadata?.component
  const isSelected = selectedNodeId === node.id
  const hasChildren = node.children && node.children.length > 0

  // Handle layout components with separate drop zones (UPDATED)
  const isLayout = metadata?.category === 'layouts'
  if (isLayout) {
    // Support both sidebar/main (TwoColumnLayout) and left/right (DarkProfessionalLayout)
    const sidebarChildren = node.children?.filter(c => c.area === 'sidebar') || []
    const mainChildren = node.children?.filter(c => c.area === 'main') || []
    const leftChildren = node.children?.filter(c => c.area === 'left') || []
    const rightChildren = node.children?.filter(c => c.area === 'right') || []

    // Determine which layout type based on component ID
    const isDarkProfessional = node.componentId === 'dark-professional-layout'

    return (
      <div
        className={`relative group transition-all duration-200 ${
          isHidden ? 'opacity-40' : ''
        } ${depth > 0 ? 'ml-4' : ''}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation()
            selectNode(node.id)
          }}
          className={`relative border-2 rounded-lg overflow-hidden transition-all duration-200 ${
            isSelected
              ? 'border-blue-500 shadow-lg shadow-blue-200'
              : 'border-orange-400 bg-orange-50'
          }`}
          style={node.styles}
        >
          {/* Layout header */}
          <div className="flex items-center justify-between px-3 py-2 bg-orange-100 border-b border-orange-300">
            <div className="flex items-center gap-2">
              <GripVertical size={14} className="opacity-50" />
              <span className="font-bold text-sm">{metadata?.name}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-200">layout</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeNode(node.id)
              }}
              className="hover:bg-red-500 hover:text-white rounded p-1 transition-colors"
              title="Remove"
            >
              <X size={12} />
            </button>
          </div>

          {/* Actual layout preview with embedded drop zones */}
          {!isHidden && Component && (
            <div className="bg-white">
              {isDarkProfessional ? (
                <Component
                  {...node.props}
                  left={
                    <LayoutDropZone
                      parentId={node.id}
                      area="left"
                      children={leftChildren}
                    />
                  }
                  right={
                    <LayoutDropZone
                      parentId={node.id}
                      area="right"
                      children={rightChildren}
                    />
                  }
                />
              ) : (
                <Component
                  {...node.props}
                  sidebar={
                    <LayoutDropZone
                      parentId={node.id}
                      area="sidebar"
                      children={sidebarChildren}
                    />
                  }
                  main={
                    <LayoutDropZone
                      parentId={node.id}
                      area="main"
                      children={mainChildren}
                    />
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Category colors
  const categoryColors = {
    atoms: 'border-green-400 bg-green-50',
    molecules: 'border-blue-400 bg-blue-50',
    organisms: 'border-purple-400 bg-purple-50',
    layouts: 'border-orange-400 bg-orange-50',
  }

  const categoryColor = metadata ? categoryColors[metadata.category] : 'border-gray-400 bg-gray-50'

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isHidden ? 'opacity-40' : ''
      } ${depth > 0 ? 'ml-4' : ''}`}
    >
      <div
        ref={drop}
        onClick={(e) => {
          e.stopPropagation()
          selectNode(node.id)
        }}
        className={`relative border-2 rounded-lg overflow-hidden transition-all duration-200 ${
          isSelected
            ? 'border-blue-500 shadow-lg shadow-blue-200'
            : `${categoryColor} border-dashed hover:border-solid hover:shadow-md`
        } ${isOver && canDrop ? 'ring-4 ring-blue-300 scale-[1.02]' : ''}`}
        style={node.styles}
      >
        {/* Component header bar */}
        <div
          className={`flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
            isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-gray-200 hover:to-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <GripVertical size={14} className="opacity-50 cursor-move" />
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCollapsed(!isCollapsed)
                }}
                className="hover:bg-white/20 rounded p-0.5"
              >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
            <span className="font-bold">{metadata?.name}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/30">
              {metadata?.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsHidden(!isHidden)
              }}
              className="hover:bg-white/20 rounded p-1"
              title={isHidden ? 'Show' : 'Hide'}
            >
              {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: Implement duplicate
              }}
              className="hover:bg-white/20 rounded p-1"
              title="Duplicate"
            >
              <Copy size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeNode(node.id)
              }}
              className="hover:bg-red-500 hover:text-white rounded p-1 transition-colors"
              title="Remove"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Component content */}
        {!isCollapsed && !isHidden && (
          <>
            {/* Render actual component */}
            {Component && (
              <div className="p-4 bg-white">
                <Component {...node.props} />
              </div>
            )}

            {/* Drop zone indicator for children */}
            {isOver && canDrop && (
              <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 border-dashed rounded-lg flex items-center justify-center pointer-events-none">
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold">
                  Drop here
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Render children */}
      {!isCollapsed && hasChildren && (
        <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-200">
          {node.children!.map(child => (
            <DroppableNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function DropCanvas() {
  const { tree, addNode } = useComposition()
  const { byId } = useComponentMetadata()
  const [showGrid, setShowGrid] = useState(true)
  const [zoom, setZoom] = useState(100)

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DND_TYPES.COMPONENT,
    drop: (item: { componentId: string }, monitor) => {
      // Only handle drop if it wasn't handled by a child (layout component)
      if (monitor.didDrop()) {
        return
      }
      
      // Get component metadata to populate default props
      const componentMetadata = byId[item.componentId]
      const defaultProps: Record<string, any> = {}
      
      // Build default props from metadata
      componentMetadata?.props.forEach(prop => {
        if (prop.defaultValue !== undefined) {
          defaultProps[prop.name] = prop.defaultValue
        }
      })
      
      addNode(null, item.componentId, defaultProps)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Canvas toolbar */}
      <div className="h-12 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-700">Canvas</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-3 py-1 text-xs border rounded transition-colors ${
                showGrid ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-600'
              }`}
            >
              {showGrid ? 'Grid On' : 'Grid Off'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Zoom:</span>
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            -
          </button>
          <span className="text-xs font-mono w-12 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            +
          </button>
          <button
            onClick={() => setZoom(100)}
            className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto p-8">
        <div
          ref={drop}
          className={`min-h-[calc(100vh-200px)] bg-white rounded-xl shadow-xl transition-all duration-200 ${
            isOver && canDrop ? 'ring-4 ring-blue-400 shadow-2xl' : ''
          } ${showGrid ? 'bg-grid-pattern' : ''}`}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          <div className="p-8">
            {tree ? (
              <div className="space-y-4">
                <DroppableNode node={tree} depth={0} />
              </div>
            ) : (
              <div className="min-h-[600px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                      <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Building Your CV</h3>
                  <p className="text-gray-600 mb-6">
                    Drag components from the library on the left to start composing your resume template.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <div className="font-semibold text-blue-900 mb-2">Quick Start:</div>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Choose a <strong>Layout</strong> (Two-Column, Single-Column, or Sectioned)</li>
                      <li>2. Add <strong>Organisms</strong> (Personal Info, Experience, Skills, etc.)</li>
                      <li>3. Customize with <strong>Molecules</strong> and <strong>Atoms</strong></li>
                      <li>4. Export your code when ready!</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
