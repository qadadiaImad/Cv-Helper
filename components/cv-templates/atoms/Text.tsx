/**
 * TEXT ATOMIC COMPONENT
 * Generic text primitive with consistent typography variants
 *
 * @example
 * ```tsx
 * <Text variant="heading" color="#1a3a52" uppercase>Experience</Text>
 * <Text variant="body" style={{ lineHeight: 1.6 }}>Description text</Text>
 * <Text variant="caption" color="#666">2020 - 2023</Text>
 * ```
 */

import React from 'react'

export interface TextProps {
  /** Text content */
  children: React.ReactNode
  /** Visual variant */
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'name' | 'custom'
  /** Text color (CSS color value) */
  color?: string
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | number
  /** Font size (overrides variant default) */
  size?: string | number
  /** Transform to uppercase */
  uppercase?: boolean
  /** Letter spacing */
  letterSpacing?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** HTML element to render as */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

/**
 * Typography scale constants
 * Can be customized via theme in future iterations
 */
const TYPOGRAPHY_SCALE = {
  heading: { fontSize: '18px', fontWeight: 'bold' },
  subheading: { fontSize: '15px', fontWeight: '600' },
  body: { fontSize: '13px', fontWeight: 'normal' },
  caption: { fontSize: '11px', fontWeight: 'normal' },
  name: { fontSize: '24px', fontWeight: 'bold' },
  custom: {},
} as const

const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

/**
 * Text Component - Foundational typography primitive
 *
 * Provides consistent text rendering across all CV templates with:
 * - Predefined typography variants (heading, body, caption, etc.)
 * - Color and weight customization
 * - Uppercase transformation
 * - Letter spacing control
 * - Flexible styling via props and className
 *
 * This component should be used for ALL text rendering in templates
 * to ensure consistency and enable global typography changes.
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  weight,
  size,
  uppercase = false,
  letterSpacing,
  className,
  style,
  as,
}) => {
  // Determine the HTML element to render
  const Component = as || (variant === 'heading' ? 'h2' : variant === 'name' ? 'h1' : 'span')

  // Get base styles from variant
  const baseStyles = TYPOGRAPHY_SCALE[variant]

  // Resolve font weight
  const resolvedWeight = weight
    ? (typeof weight === 'number' ? weight : FONT_WEIGHTS[weight])
    : baseStyles.fontWeight

  // Compose final styles
  const finalStyles: React.CSSProperties = {
    ...baseStyles,
    ...(color && { color }),
    ...(resolvedWeight && { fontWeight: resolvedWeight }),
    ...(size && { fontSize: typeof size === 'number' ? `${size}px` : size }),
    ...(uppercase && { textTransform: 'uppercase' }),
    ...(letterSpacing && { letterSpacing }),
    margin: 0,
    padding: 0,
    ...style,
  }

  return (
    <Component className={className} style={finalStyles}>
      {children}
    </Component>
  )
}

/**
 * Specialized Text variants for common use cases
 * These are convenience wrappers around the base Text component
 */

export const Heading: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="heading" {...props} />
)

export const Subheading: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="subheading" {...props} />
)

export const Body: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="body" {...props} />
)

export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" {...props} />
)

export const Name: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="name" {...props} />
)
