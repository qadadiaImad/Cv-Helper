/**
 * DND TYPES
 *
 * react-dnd type definitions for drag-and-drop
 */

export const DND_TYPES = {
  COMPONENT: 'component',
  NODE: 'node',
} as const

export interface DragItem {
  type: string
  componentId: string
  nodeId?: string
}
