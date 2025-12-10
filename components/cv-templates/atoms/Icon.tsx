/**
 * ICON ATOMIC COMPONENT
 * Consistent icon wrapper for emojis and SVGs
 *
 * @example
 * ```tsx
 * <Icon icon="📧" size={16} />
 * <Icon icon="💼" size={20} color="#4a90e2" />
 * <Icon>
 *   <svg>...</svg>
 * </Icon>
 * ```
 */

import React from 'react'

export interface IconProps {
  /** Icon content (emoji string or custom element) */
  icon?: string
  /** Custom icon element (alternative to icon prop) */
  children?: React.ReactNode
  /** Icon size in pixels */
  size?: number
  /** Icon color (CSS color value) */
  color?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Wrapper variant */
  variant?: 'default' | 'circled' | 'squared'
  /** Background color for circled/squared variants */
  background?: string
}

/**
 * Icon Component - Consistent icon rendering
 *
 * Provides a standardized way to render icons across templates:
 * - Emoji icons (simple string)
 * - SVG icons (custom React elements)
 * - Consistent sizing and coloring
 * - Optional backgrounds (circle, square)
 *
 * Use this component for ALL icons in templates to ensure:
 * - Consistent sizing across different icon types
 * - Easy theme integration
 * - Simplified icon replacement
 */
export const Icon: React.FC<IconProps> = ({
  icon,
  children,
  size = 16,
  color,
  className,
  style,
  variant = 'default',
  background,
}) => {
  // Wrapper styles for circled/squared variants
  const wrapperStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(variant === 'circled' && {
      borderRadius: '50%',
      width: size * 1.8,
      height: size * 1.8,
    }),
    ...(variant === 'squared' && {
      borderRadius: '4px',
      width: size * 1.8,
      height: size * 1.8,
    }),
    ...(background && { backgroundColor: background }),
  }

  // Icon content styles
  const iconStyles: React.CSSProperties = {
    fontSize: `${size}px`,
    lineHeight: 1,
    ...(color && { color }),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  }

  // If variant requires wrapper
  if (variant !== 'default' && background) {
    return (
      <span className={className} style={wrapperStyles}>
        <span style={iconStyles}>
          {icon || children}
        </span>
      </span>
    )
  }

  // Default rendering
  return (
    <span className={className} style={iconStyles}>
      {icon || children}
    </span>
  )
}

/**
 * Specialized Icon variants for common use cases
 */

export const CircledIcon: React.FC<Omit<IconProps, 'variant'>> = (props) => (
  <Icon variant="circled" {...props} />
)

export const SquaredIcon: React.FC<Omit<IconProps, 'variant'>> = (props) => (
  <Icon variant="squared" {...props} />
)
