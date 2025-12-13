/**
 * CODE GENERATOR
 *
 * Generates React JSX code from composition tree.
 * Handles:
 * - Recursive JSX generation
 * - Prop serialization (strings, booleans, objects, arrays)
 * - Import statement generation
 * - Full component file generation
 */

import type { CompositionNode } from './composition-engine'
import { COMPONENT_REGISTRY } from './component-metadata'

/**
 * Generates JSX string for a single node and its children
 */
export function generateJSX(node: CompositionNode, indent = 0): string {
  const metadata = COMPONENT_REGISTRY.find(c => c.id === node.componentId)
  if (!metadata) return ''

  const spaces = '  '.repeat(indent)
  const componentName = metadata.name

  // Generate props string
  const propsString = Object.entries(node.props)
    .map(([key, value]) => {
      // Skip children prop (handled separately)
      if (key === 'children' && (node.children && node.children.length > 0)) {
        return ''
      }

      if (typeof value === 'string') {
        return `${key}="${value}"`
      }
      if (typeof value === 'boolean') {
        return value ? key : ''
      }
      if (typeof value === 'number') {
        return `${key}={${value}}`
      }
      if (typeof value === 'object') {
        return `${key}={${JSON.stringify(value)}}`
      }
      return `${key}={${value}}`
    })
    .filter(Boolean)
    .join(' ')

  // Generate styles
  const styleString = node.styles && Object.keys(node.styles).length > 0
    ? `style={${JSON.stringify(node.styles)}}`
    : ''

  const allProps = [propsString, styleString].filter(Boolean).join(' ')

  // Check if component has text children prop
  const hasTextChildren = node.props.children && typeof node.props.children === 'string'

  // Handle layout components with sidebar/main areas
  const isLayout = componentName.includes('Layout')
  if (isLayout && node.children && node.children.length > 0) {
    const sidebarChildren = node.children.filter(c => c.area === 'sidebar')
    const mainChildren = node.children.filter(c => c.area === 'main')

    // Generate JSX for sidebar and main children
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

    // Build layout props
    const layoutProps = [
      allProps,
      sidebarJSX !== 'undefined' ? `sidebar={${sidebarJSX}}` : '',
      mainJSX !== 'undefined' ? `main={${mainJSX}}` : ''
    ].filter(Boolean).join(' ')

    return `${spaces}<${componentName}${layoutProps ? ' ' + layoutProps : ''} />`
  }

  // Self-closing if no children
  if ((!node.children || node.children.length === 0) && !hasTextChildren) {
    return `${spaces}<${componentName}${allProps ? ' ' + allProps : ''} />`
  }

  // With children
  if (hasTextChildren && (!node.children || node.children.length === 0)) {
    // Text content only
    return `${spaces}<${componentName}${allProps ? ' ' + allProps : ''}>${node.props.children}</${componentName}>`
  }

  // Component children
  const childrenJSX = node.children
    ? node.children.map(child => generateJSX(child, indent + 1)).join('\n')
    : ''

  return `${spaces}<${componentName}${allProps ? ' ' + allProps : ''}>
${childrenJSX}
${spaces}</${componentName}>`
}

/**
 * Collects all unique component IDs used in the tree
 */
function collectUsedComponents(node: CompositionNode | null): Set<string> {
  const used = new Set<string>()

  if (!node) return used

  const collect = (n: CompositionNode) => {
    used.add(n.componentId)
    n.children?.forEach(collect)
  }

  collect(node)
  return used
}

/**
 * Groups components by their import path
 */
function groupImportsByPath(componentIds: Set<string>): Record<string, string[]> {
  const groups: Record<string, string[]> = {
    atoms: [],
    molecules: [],
    organisms: [],
    layouts: [],
    templates: []
  }

  componentIds.forEach(id => {
    const metadata = COMPONENT_REGISTRY.find(c => c.id === id)
    if (metadata) {
      // Ensure the category exists in groups before pushing
      if (!groups[metadata.category]) {
        groups[metadata.category] = []
      }
      groups[metadata.category].push(metadata.name)
    }
  })

  return groups
}

/**
 * Generates import statements
 */
function generateImports(componentIds: Set<string>): string {
  const groups = groupImportsByPath(componentIds)
  const imports: string[] = []

  if (groups.atoms.length > 0) {
    imports.push(`import { ${groups.atoms.join(', ')} } from '@/components/cv-templates/atoms'`)
  }
  if (groups.molecules.length > 0) {
    imports.push(`import { ${groups.molecules.join(', ')} } from '@/components/cv-templates/molecules'`)
  }
  if (groups.organisms.length > 0) {
    imports.push(`import { ${groups.organisms.join(', ')} } from '@/components/cv-templates/organisms'`)
  }
  if (groups.layouts && groups.layouts.length > 0) {
    imports.push(`import { ${groups.layouts.join(', ')} } from '@/components/cv-templates/templates'`)
  }
  if (groups.templates.length > 0) {
    imports.push(`import { ${groups.templates.join(', ')} } from '@/components/cv-templates/templates'`)
  }

  return imports.join('\n')
}

/**
 * Generates a complete React component file
 */
export function generateFullComponent(tree: CompositionNode | null, name = 'MyTemplate'): string {
  if (!tree) return ''

  const jsx = generateJSX(tree, 1)

  // Collect unique component imports
  const usedComponentIds = collectUsedComponents(tree)
  const imports = generateImports(usedComponentIds)

  // Check if any organisms are used (they require data prop)
  const usesOrganisms = Array.from(usedComponentIds).some(id => {
    const metadata = COMPONENT_REGISTRY.find(c => c.id === id)
    return metadata?.category === 'organisms'
  })

  const template = usesOrganisms
    ? `import React from 'react'
${imports}
import type { UniversalResumeData } from '@/lib/schemas'

interface ${name}Props {
  data: UniversalResumeData
}

export const ${name}: React.FC<${name}Props> = ({ data }) => {
  return (
${jsx}
  )
}

export default ${name}
`
    : `import React from 'react'
${imports}

export const ${name}: React.FC = () => {
  return (
${jsx}
  )
}

export default ${name}
`

  return template
}

/**
 * Generates a preview-ready code snippet (without imports/wrapper)
 */
export function generateCodeSnippet(node: CompositionNode | null): string {
  if (!node) return ''
  return generateJSX(node, 0)
}
