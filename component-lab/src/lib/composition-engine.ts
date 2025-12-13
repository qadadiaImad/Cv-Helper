/**
 * COMPOSITION ENGINE
 *
 * Zustand store managing the composition tree for the Visual Builder.
 * Handles:
 * - Tree structure with nested components
 * - Node selection
 * - Undo/redo functionality
 * - Persistence to localStorage
 */

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from 'nanoid'
import type React from 'react'

export interface CompositionNode {
  id: string
  componentId: string  // Reference to COMPONENT_REGISTRY
  props: Record<string, any>
  children?: CompositionNode[]
  styles?: React.CSSProperties
  area?: 'sidebar' | 'main' | 'left' | 'right'  // For layout components: which area this component belongs to
}

export interface CompositionState {
  // Tree structure
  tree: CompositionNode | null

  // Selection
  selectedNodeId: string | null

  // History for undo/redo
  history: (CompositionNode | null)[]
  historyIndex: number

  // Actions
  addNode: (parentId: string | null, componentId: string, props?: Record<string, any>, area?: 'sidebar' | 'main' | 'left' | 'right') => void
  removeNode: (nodeId: string) => void
  updateNodeProps: (nodeId: string, props: Record<string, any>) => void
  updateNodeStyles: (nodeId: string, styles: React.CSSProperties) => void
  moveNode: (nodeId: string, newParentId: string | null, index: number) => void
  selectNode: (nodeId: string | null) => void

  // Undo/redo
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean

  // Persistence
  saveComposition: (name: string) => void
  loadComposition: (name: string) => void
  getSavedCompositions: () => string[]
  deleteComposition: (name: string) => void

  // Template presets
  loadTemplatePreset: (tree: CompositionNode) => void

  // Clear
  reset: () => void
}

export const useComposition = create<CompositionState>()(
  immer((set, get) => ({
    tree: null,
    selectedNodeId: null,
    history: [null],
    historyIndex: 0,
    canUndo: false,
    canRedo: false,

    addNode: (parentId, componentId, props = {}, area) => {
      set((state) => {
        const newNode: CompositionNode = {
          id: nanoid(),
          componentId,
          props,
          children: [],
          ...(area && { area }),  // Only add area if provided
        }

        if (!parentId) {
          // Root level - check if we should add to existing layout
          if (!state.tree) {
            // First component - just set it as root
            state.tree = newNode
          } else {
            // Check if root is a layout component (should receive children)
            const rootIsLayout = state.tree.componentId.includes('Layout')
            const rootIsFragment = state.tree.componentId === '__fragment__'
            
            if (rootIsLayout) {
              // Root is a layout - add new component as its child
              if (!state.tree.children) state.tree.children = []
              state.tree.children.push(newNode)
            } else if (rootIsFragment) {
              // Root is already a fragment - add to it
              if (!state.tree.children) state.tree.children = []
              state.tree.children.push(newNode)
            } else {
              // Root is a regular component - wrap both in a fragment
              const existingTree = state.tree
              state.tree = {
                id: nanoid(),
                componentId: '__fragment__',
                props: {},
                children: [existingTree, newNode]
              }
            }
          }
        } else {
          // Find parent and add child
          const findAndAdd = (node: CompositionNode): boolean => {
            if (node.id === parentId) {
              if (!node.children) node.children = []
              node.children.push(newNode)
              return true
            }
            return node.children?.some(findAndAdd) ?? false
          }
          if (state.tree) findAndAdd(state.tree)
        }

        // Save to history
        state.history = state.history.slice(0, state.historyIndex + 1)
        state.history.push(state.tree ? JSON.parse(JSON.stringify(state.tree)) : null)
        state.historyIndex++
        state.canUndo = state.historyIndex > 0
        state.canRedo = state.historyIndex < state.history.length - 1
      })
    },

    removeNode: (nodeId) => {
      set((state) => {
        if (!state.tree) return

        // Remove node from parent's children
        const removeFromParent = (node: CompositionNode): boolean => {
          if (node.children) {
            const index = node.children.findIndex(child => child.id === nodeId)
            if (index !== -1) {
              node.children.splice(index, 1)
              return true
            }
            return node.children.some(removeFromParent)
          }
          return false
        }

        // If removing root node
        if (state.tree.id === nodeId) {
          state.tree = null
        } else {
          removeFromParent(state.tree)
        }

        // Clear selection if deleted node was selected
        if (state.selectedNodeId === nodeId) {
          state.selectedNodeId = null
        }

        // Save to history
        state.history = state.history.slice(0, state.historyIndex + 1)
        state.history.push(state.tree ? JSON.parse(JSON.stringify(state.tree)) : null)
        state.historyIndex++
        state.canUndo = state.historyIndex > 0
        state.canRedo = state.historyIndex < state.history.length - 1
      })
    },

    selectNode: (nodeId) => {
      set({ selectedNodeId: nodeId })
    },

    updateNodeProps: (nodeId, props) => {
      set((state) => {
        const findAndUpdate = (node: CompositionNode): boolean => {
          if (node.id === nodeId) {
            node.props = { ...node.props, ...props }
            return true
          }
          return node.children?.some(findAndUpdate) ?? false
        }
        if (state.tree) findAndUpdate(state.tree)

        // Don't add to history for every prop change (would be too noisy)
        // History is added on drag/drop actions
      })
    },

    updateNodeStyles: (nodeId, styles) => {
      set((state) => {
        const findAndUpdate = (node: CompositionNode): boolean => {
          if (node.id === nodeId) {
            node.styles = { ...node.styles, ...styles }
            return true
          }
          return node.children?.some(findAndUpdate) ?? false
        }
        if (state.tree) findAndUpdate(state.tree)
      })
    },

    moveNode: (nodeId, newParentId, index) => {
      set((state) => {
        if (!state.tree) return

        // Find and remove node from current parent
        let movedNode: CompositionNode | null = null

        const findAndRemove = (node: CompositionNode): boolean => {
          if (node.id === nodeId) {
            movedNode = node
            return true
          }
          if (node.children) {
            const childIndex = node.children.findIndex(child => child.id === nodeId)
            if (childIndex !== -1) {
              movedNode = node.children[childIndex]
              node.children.splice(childIndex, 1)
              return true
            }
            return node.children.some(findAndRemove)
          }
          return false
        }

        findAndRemove(state.tree)

        if (!movedNode) return

        // Add to new parent
        if (!newParentId) {
          // Moving to root
          state.tree = movedNode
        } else {
          const findAndAdd = (node: CompositionNode): boolean => {
            if (node.id === newParentId) {
              if (!node.children) node.children = []
              node.children.splice(index, 0, movedNode!)
              return true
            }
            return node.children?.some(findAndAdd) ?? false
          }
          if (state.tree) findAndAdd(state.tree)
        }

        // Save to history
        state.history = state.history.slice(0, state.historyIndex + 1)
        state.history.push(state.tree ? JSON.parse(JSON.stringify(state.tree)) : null)
        state.historyIndex++
        state.canUndo = state.historyIndex > 0
        state.canRedo = state.historyIndex < state.history.length - 1
      })
    },

    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--
          state.tree = state.history[state.historyIndex]
            ? JSON.parse(JSON.stringify(state.history[state.historyIndex]))
            : null
          state.canUndo = state.historyIndex > 0
          state.canRedo = true
        }
      })
    },

    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++
          state.tree = state.history[state.historyIndex]
            ? JSON.parse(JSON.stringify(state.history[state.historyIndex]))
            : null
          state.canRedo = state.historyIndex < state.history.length - 1
          state.canUndo = true
        }
      })
    },

    saveComposition: (name) => {
      const state = get()
      if (state.tree) {
        localStorage.setItem(`composition-${name}`, JSON.stringify(state.tree))

        // Also update the list of saved compositions
        const saved = get().getSavedCompositions()
        if (!saved.includes(name)) {
          localStorage.setItem('composition-list', JSON.stringify([...saved, name]))
        }
      }
    },

    loadComposition: (name) => {
      const saved = localStorage.getItem(`composition-${name}`)
      if (saved) {
        const tree = JSON.parse(saved)
        set({
          tree,
          history: [tree],
          historyIndex: 0,
          canUndo: false,
          canRedo: false,
          selectedNodeId: null
        })
      }
    },

    getSavedCompositions: () => {
      const list = localStorage.getItem('composition-list')
      return list ? JSON.parse(list) : []
    },

    deleteComposition: (name) => {
      localStorage.removeItem(`composition-${name}`)
      const saved = get().getSavedCompositions()
      const filtered = saved.filter((item: string) => item !== name)
      localStorage.setItem('composition-list', JSON.stringify(filtered))
    },

    loadTemplatePreset: (tree) => {
      set({
        tree: JSON.parse(JSON.stringify(tree)), // Deep clone
        history: [JSON.parse(JSON.stringify(tree))],
        historyIndex: 0,
        canUndo: false,
        canRedo: false,
        selectedNodeId: null,
      })
    },

    reset: () => {
      set({
        tree: null,
        selectedNodeId: null,
        history: [null],
        historyIndex: 0,
        canUndo: false,
        canRedo: false,
      })
    },
  }))
)
