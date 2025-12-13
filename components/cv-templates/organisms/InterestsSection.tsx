/**
 * INTERESTSSECTION ORGANISM COMPONENT
 * Interests/hobbies display section
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import type { Interest } from '../../../lib/schemas'

export interface InterestsSectionProps {
  data?: Interest[]
  variant?: 'sidebar' | 'detailed' | 'compact' | 'list' | 'custom'
  title?: string
  showHeader?: boolean
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  showDescription?: boolean
  textColor?: string
  layout?: 'list' | 'inline' | 'grid'
  separator?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * InterestsSection Component - Hobbies and interests display
 *
 * Displays personal interests and hobbies:
 * - Simple list format
 * - Inline comma-separated format
 * - Grid layout for many interests
 * - Optional descriptions
 *
 * Features:
 * - Multiple layout variants
 * - Customizable styling
 * - Optional descriptions for detailed view
 * - Supports both simple strings and Interest objects
 *
 * Use this component for interests/hobbies sections in templates.
 */
export const InterestsSection: React.FC<InterestsSectionProps> = ({
  data,
  variant = 'sidebar',
  title = 'INTERESTS',
  showHeader = true,
  headerVariant = 'sidebar',
  showDescription = false,
  textColor = '#ffffff',
  layout = 'list',
  separator = ', ',
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  // Inline layout - comma-separated
  if (layout === 'inline') {
    return (
      <div className={className} style={{ fontSize: '12px', ...style }}>
        {showHeader && (
          <SectionHeader
            title={title}
            variant={headerVariant}
            color={textColor}
          />
        )}
        <Text variant="body" color={textColor}>
          {data.map((interest) =>
            typeof interest === 'string' ? interest : interest.name
          ).join(separator)}
        </Text>
      </div>
    )
  }

  // Grid layout
  if (layout === 'grid') {
    return (
      <div className={className} style={{ fontSize: '12px', ...style }}>
        {showHeader && (
          <SectionHeader
            title={title}
            variant={headerVariant}
            color={textColor}
          />
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '10px',
        }}>
          {data.map((interest, i) => (
            <div key={i}>
              <Text variant="body" color={textColor}>
                {typeof interest === 'string' ? interest : interest.name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // List layout (default)
  return (
    <div className={className} style={{ fontSize: '12px', ...style }}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={textColor}
        />
      )}
      <ul style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
      }}>
        {data.map((interest, i) => {
          const name = typeof interest === 'string' ? interest : interest.name
          const description = typeof interest === 'object' ? interest.description : undefined

          return (
            <li key={i} style={{ marginBottom: showDescription && description ? '12px' : '8px' }}>
              <Text variant="body" color={textColor}>
                {name}
              </Text>
              {showDescription && description && (
                <Text variant="body" color={textColor} style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
                  {description}
                </Text>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
