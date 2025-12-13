# Layout Drop Zones - Complete Implementation Guide

## The Problem You Identified

When you drag `TwoColumnLayout` to the canvas, it should become a **2D workspace** where you can drop components into specific areas (sidebar vs main content). Currently, components just stack vertically.

## How TwoColumnLayout Works

TwoColumnLayout expects **props**, not children:

```tsx
// CORRECT - What should be generated
<TwoColumnLayout 
  sidebar={<SkillsSection />}
  main={<ExperienceSection />}
  sidebarPosition="left"
  sidebarWidth="30%"
/>

// WRONG - What was happening before
<TwoColumnLayout>
  <SkillsSection />
  <ExperienceSection />
</TwoColumnLayout>
```

## The Solution - 3 Parts

### Part 1: Data Model (✅ DONE)

**File:** `composition-engine.ts`

Added `area` property to track which zone a component belongs to:

```typescript
export interface CompositionNode {
  id: string
  componentId: string
  props: Record<string, any>
  children?: CompositionNode[]
  styles?: React.CSSProperties
  area?: 'sidebar' | 'main'  // NEW: Tracks layout zone
}

// Updated addNode to accept area parameter
addNode: (parentId, componentId, props, area) => {
  const newNode = {
    id: nanoid(),
    componentId,
    props,
    children: [],
    ...(area && { area })  // Store area if provided
  }
  // ... rest of logic
}
```

### Part 2: Visual Builder UI (✅ DONE)

**File:** `DropCanvas.tsx`

Created `LayoutDropZone` component that creates separate droppable areas:

```tsx
function LayoutDropZone({ parentId, area, children }) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DND_TYPES.COMPONENT,
    drop: (item, monitor) => {
      if (monitor.didDrop()) return
      
      const defaultProps = { /* ... */ }
      
      // KEY: Pass area parameter when adding node
      addNode(parentId, item.componentId, defaultProps, area)
    }
  }))

  return (
    <div ref={drop} className="min-h-[200px] p-4 bg-slate-700/bg-white">
      <div>{area === 'sidebar' ? '📍 Sidebar' : '📄 Main Content'}</div>
      <div className="space-y-3">
        {children.map(child => <DroppableNode node={child} />)}
      </div>
    </div>
  )
}
```

Updated `DroppableNode` to detect layouts and render custom drop zones:

```tsx
function DroppableNode({ node, depth }) {
  // ... other code ...

  // Detect layout components
  const isLayout = node.componentId.includes('Layout')
  if (isLayout) {
    // Filter children by area
    const sidebarChildren = node.children?.filter(c => c.area === 'sidebar') || []
    const mainChildren = node.children?.filter(c => c.area === 'main') || []

    return (
      <div>
        {/* Layout header */}
        <div className="bg-orange-100 border-orange-400">
          <span>{metadata?.name}</span>
          <button onClick={() => removeNode(node.id)}>Remove</button>
        </div>

        {/* Two-column drop zones */}
        <div className="grid grid-cols-[280px_1fr]">
          <LayoutDropZone parentId={node.id} area="sidebar" children={sidebarChildren} />
          <LayoutDropZone parentId={node.id} area="main" children={mainChildren} />
        </div>
      </div>
    )
  }

  // ... normal component rendering ...
}
```

### Part 3: Code Generation (✅ DONE)

**File:** `code-generator.ts`

Updated `generateJSX` to render layout children as props:

```typescript
function generateJSX(node, indent) {
  const componentName = metadata?.name || 'Unknown'
  
  // Detect layout components
  const isLayout = componentName.includes('Layout')
  if (isLayout && node.children && node.children.length > 0) {
    // Filter children by area
    const sidebarChildren = node.children.filter(c => c.area === 'sidebar')
    const mainChildren = node.children.filter(c => c.area === 'main')

    // Generate JSX for each area
    const sidebarJSX = sidebarChildren.length > 0
      ? sidebarChildren.length === 1
        ? generateJSX(sidebarChildren[0], 0).trim()
        : `<>\n${sidebarChildren.map(c => generateJSX(c, 1)).join('\n')}\n  </>`
      : 'undefined'

    const mainJSX = mainChildren.length > 0
      ? mainChildren.length === 1
        ? generateJSX(mainChildren[0], 0).trim()
        : `<>\n${mainChildren.map(c => generateJSX(c, 1)).join('\n')}\n  </>`
      : 'undefined'

    // Build layout with sidebar and main props
    const layoutProps = [
      allProps,
      sidebarJSX !== 'undefined' ? `sidebar={${sidebarJSX}}` : '',
      mainJSX !== 'undefined' ? `main={${mainJSX}}` : ''
    ].filter(Boolean).join(' ')

    return `<${componentName}${layoutProps ? ' ' + layoutProps : ''} />`
  }
  
  // ... normal component rendering ...
}
```

## How It Works - Complete Workflow

### 1. Drag TwoColumnLayout to Canvas
- Creates a layout node with no children
- Renders with two empty drop zones: **Sidebar** (dark) and **Main** (white)
- Each zone shows "Drop components here" placeholder

### 2. Drag SkillsSection to Sidebar Zone
- `LayoutDropZone` (sidebar) catches the drop
- Calls: `addNode(layoutId, 'SkillsSection', defaultProps, 'sidebar')`
- Creates node: `{ id: '...', componentId: 'SkillsSection', area: 'sidebar' }`
- Adds to layout's children array
- Renders in the sidebar zone (dark background)

### 3. Drag ExperienceSection to Main Zone
- `LayoutDropZone` (main) catches the drop
- Calls: `addNode(layoutId, 'ExperienceSection', defaultProps, 'main')`
- Creates node: `{ id: '...', componentId: 'ExperienceSection', area: 'main' }`
- Adds to layout's children array
- Renders in the main zone (white background)

### 4. Export Code
Generates:
```tsx
<TwoColumnLayout 
  sidebar={<SkillsSection />}
  main={<ExperienceSection />}
  sidebarPosition="left"
  sidebarWidth="30%"
/>
```

## Testing the Implementation

1. **Start dev server**: `npm run dev` in `component-lab` folder
2. **Navigate to Visual Builder**: http://localhost:3008 (or whatever port Vite assigns)
3. **Drag TwoColumnLayout** to canvas
   - Should see: Orange header + Two drop zones (dark sidebar + white main)
4. **Drag SkillsSection** to the **dark sidebar zone**
   - Should appear in sidebar only (no duplicate)
5. **Drag ExperienceSection** to the **white main zone**
   - Should appear in main content only
6. **Click Export Code**
   - Should generate proper `sidebar={...}` and `main={...}` props

## Current Status

✅ **Data model** - Nodes can store `area` property
✅ **addNode function** - Accepts and stores area parameter
✅ **LayoutDropZone component** - Creates separate droppable zones
✅ **Layout detection** - DroppableNode detects layouts and renders custom UI
✅ **Code generator** - Converts area-based children to sidebar/main props
⚠️ **Testing needed** - Dev server needs to reload to show new UI

## Next Steps

1. Ensure dev server on port 3008 is running
2. Hard refresh browser (Ctrl+Shift+R)
3. Test the complete workflow manually
4. If layout drop zones show correctly, proceed to build atlantic-blue template
