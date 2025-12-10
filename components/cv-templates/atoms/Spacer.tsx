/**
 * SPACER ATOMIC COMPONENT
 * Consistent spacing utility for layout control
 *
 * @example
 * ```tsx
 * <Spacer size="md" />
 * <Spacer size={24} />
 * <Spacer orientation="horizontal" size="lg" />
 * ```
 */

import React from 'react'

export interface SpacerProps {
  /** Spacing size (preset or pixels) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  /** Spacing orientation */
  orientation?: 'vertical' | 'horizontal'
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Spacing scale constants
 * Aligned with common design system scales
 */
const SPACING_SCALE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

/**
 * Spacer Component - Consistent spacing utility
 *
 * Provides predictable spacing between elements:
 * - Predefined spacing scale (xs, sm, md, lg, xl)
 * - Custom pixel values
 * - Vertical and horizontal orientations
 *
 * Use this component instead of manual margins/padding for:
 * - Section spacing
 * - Element gaps
 * - Layout breathing room
 *
 * Benefits:
 * - Consistent spacing across templates
 * - Easy to adjust globally
 * - Self-documenting spacing intent
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  orientation = 'vertical',
  className,
  style,
}) => {
  // Resolve size to pixels
  const pixels = typeof size === 'number' ? size : SPACING_SCALE[size]

  const spacerStyles: React.CSSProperties = {
    display: 'block',
    flexShrink: 0,
    ...(orientation === 'vertical'
      ? {
          height: `${pixels}px`,
          width: '100%',
        }
      : {
          width: `${pixels}px`,
          height: '100%',
        }),
    ...style,
  }

  return <div className={className} style={spacerStyles} aria-hidden="true" />
}
