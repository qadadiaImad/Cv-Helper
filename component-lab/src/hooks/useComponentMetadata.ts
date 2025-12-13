/**
 * USE COMPONENT METADATA HOOK
 *
 * React hook providing access to component registry with:
 * - Components grouped by category
 * - Component lookup by ID
 * - Search functionality
 */

import { useMemo } from 'react'
import { COMPONENT_REGISTRY, type ComponentMetadata } from '@/lib/component-metadata'

export function useComponentMetadata() {
  const byCategory = useMemo(() => ({
    atoms: COMPONENT_REGISTRY.filter(c => c.category === 'atoms'),
    molecules: COMPONENT_REGISTRY.filter(c => c.category === 'molecules'),
    organisms: COMPONENT_REGISTRY.filter(c => c.category === 'organisms'),
    layouts: COMPONENT_REGISTRY.filter(c => c.category === 'layouts'),
  }), [])

  const byId = useMemo(() =>
    Object.fromEntries(COMPONENT_REGISTRY.map(c => [c.id, c]))
  , [])

  const search = useMemo(() => (query: string): ComponentMetadata[] => {
    const lower = query.toLowerCase()
    return COMPONENT_REGISTRY.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.tags?.some(t => t.toLowerCase().includes(lower))
    )
  }, [])

  return {
    byCategory,
    byId,
    search,
    all: COMPONENT_REGISTRY
  }
}
