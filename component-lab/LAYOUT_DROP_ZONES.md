# Layout Drop Zones Implementation

## Current Status
✅ Added `area` property to `CompositionNode` interface
✅ Updated `addNode` function signature to accept `area` parameter
✅ Modified `addNode` implementation to store area in nodes

## What You Want
The layout (TwoColumnLayout) should act as a **2D workspace** with separate drop zones:
- **Sidebar drop zone** - Components dropped here go to the left/dark area
- **Main content drop zone** - Components dropped here go to the right/white area

Instead of components stacking vertically in a list, they should be positioned in their designated areas.

## What Needs to Be Done Next

### 1. Update DropCanvas DroppableNode for Layouts
The `DroppableNode` component needs special handling for layout components to:
- Detect when the node is a layout (TwoColumnLayout, etc.)
- Render two separate droppable zones (sidebar and main)
- Each zone should accept drops and call `addNode` with the appropriate area

### 2. Render Components in Their Areas
When rendering a layout's children, group them by area:
- Sidebar children → render in the sidebar zone
- Main children → render in the main content zone

### 3. Visual Feedback
Add visual indicators showing which drop zone is active when dragging.

## Implementation Approach

```tsx
// In DroppableNode, detect layout components
if (node.componentId.includes('Layout')) {
  return (
    <div>
      {/* Sidebar drop zone */}
      <DropZone 
        parentId={node.id} 
        area="sidebar"
        children={node.children?.filter(c => c.area === 'sidebar')}
      />
      
      {/* Main content drop zone */}
      <DropZone 
        parentId={node.id} 
        area="main"
        children={node.children?.filter(c => c.area === 'main')}
      />
    </div>
  )
}
```

## Current Issue
Components are being added to layouts but rendered in a vertical stack because:
1. The layout's `useDrop` handler doesn't specify which area
2. The rendering doesn't separate children by area
3. There's no visual distinction between sidebar and main zones

## Next Steps
1. Create a `LayoutDropZone` component for sidebar/main areas
2. Update `DroppableNode` to use `LayoutDropZone` for layout components
3. Test dragging components to different zones
