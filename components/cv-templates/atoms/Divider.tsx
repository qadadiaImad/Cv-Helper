/**
 * DIVIDER ATOMIC COMPONENT
 * Visual separators for sections and content blocks
 *
 * @example
 * ```tsx
 * <Divider color="#1a3a52" thickness={3} />
 * <Divider variant="dashed" />
 * <Divider variant="gradient" colors={['#1a3a52', '#4a90e2']} />
 * ```
 */

import React from 'react'

export interface DividerProps {
  /** Visual variant */
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  /** Divider color (CSS color value) */
  color?: string
  /** Gradient colors (for gradient variant) */
  colors?: [string, string]
  /** Line thickness in pixels */
  thickness?: number
  /** Divider width (CSS width value) */
  width?: string
  /** Spacing above divider */
  marginTop?: string | number
  /** Spacing below divider */
  marginBottom?: string | number
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Divider Component - Section and content separators
 *
 * Provides consistent visual separation between content blocks:
 * - Solid, dashed, dotted line styles
 * - Gradient dividers
 * - Customizable color and thickness
 * - Horizontal and vertical orientations
 *
 * Common use cases:
 * - Section header underlines
 * - Content block separators
 * - Visual hierarchy indicators
 *
 * Use this component for ALL dividers and separators in templates.
 */
export const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  color = '#e0e0e0',
  colors,
  thickness = 1,
  width = '100%',
  marginTop,
  marginBottom,
  className,
  style,
  orientation = 'horizontal',
}) => {
  // Base styles for all dividers
  const baseStyles: React.CSSProperties = {
    border: 'none',
    margin: 0,
    ...(marginTop && { marginTop: typeof marginTop === 'number' ? `${marginTop}px` : marginTop }),
    ...(marginBottom && { marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom }),
  }

  // Orientation-specific styles
  const orientationStyles: React.CSSProperties =
    orientation === 'horizontal'
      ? {
          width,
          height: `${thickness}px`,
        }
      : {
          width: `${thickness}px`,
          height: width,
        }

  // Variant-specific styles
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'gradient':
        const [startColor, endColor] = colors || [color, color]
        return orientation === 'horizontal'
          ? {
              background: `linear-gradient(to right, ${startColor}, ${endColor})`,
            }
          : {
              background: `linear-gradient(to bottom, ${startColor}, ${endColor})`,
            }
      case 'dashed':
        return orientation === 'horizontal'
          ? {
              borderTop: `${thickness}px dashed ${color}`,
            }
          : {
              borderLeft: `${thickness}px dashed ${color}`,
            }
      case 'dotted':
        return orientation === 'horizontal'
          ? {
              borderTop: `${thickness}px dotted ${color}`,
            }
          : {
              borderLeft: `${thickness}px dotted ${color}`,
            }
      default: // solid
        return {
          backgroundColor: color,
        }
    }
  }

  const finalStyles: React.CSSProperties = {
    ...baseStyles,
    ...orientationStyles,
    ...getVariantStyles(),
    ...style,
  }

  return <div className={className} style={finalStyles} role="separator" aria-orientation={orientation} />
}

/**
 * Specialized Divider variants
 */

export const SolidDivider: React.FC<Omit<DividerProps, 'variant'>> = (props) => (
  <Divider variant="solid" {...props} />
)

export const DashedDivider: React.FC<Omit<DividerProps, 'variant'>> = (props) => (
  <Divider variant="dashed" {...props} />
)

export const GradientDivider: React.FC<Omit<DividerProps, 'variant'>> = (props) => (
  <Divider variant="gradient" {...props} />
)
