/**
 * BADGE ATOMIC COMPONENT
 * Pill-shaped labels for tags, technologies, and categorization
 *
 * @example
 * ```tsx
 * <Badge>React</Badge>
 * <Badge variant="accent" color="#4a90e2">TypeScript</Badge>
 * <Badge variant="outline" size="sm">Python</Badge>
 * ```
 */

import React from 'react'

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode
  /** Visual variant */
  variant?: 'default' | 'accent' | 'outline' | 'solid'
  /** Badge color (CSS color value) */
  color?: string
  /** Background color (CSS color value) */
  background?: string
  /** Size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Click handler */
  onClick?: () => void
}

/**
 * Size presets for badges
 */
const BADGE_SIZES = {
  xs: { fontSize: '9px', padding: '2px 6px' },
  sm: { fontSize: '10px', padding: '3px 8px' },
  md: { fontSize: '11px', padding: '4px 10px' },
  lg: { fontSize: '12px', padding: '5px 12px' },
} as const

/**
 * Badge Component - Pill-shaped labels and tags
 *
 * Provides consistent badge/tag rendering for:
 * - Technology tags
 * - Skill labels
 * - Category indicators
 * - Status indicators
 *
 * Features:
 * - Multiple visual variants (solid, outline, accent)
 * - Customizable colors
 * - Size presets
 * - Optional click handler
 *
 * Use this component for ALL tags, pills, and labels in templates.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color,
  background,
  size = 'sm',
  className,
  style,
  onClick,
}) => {
  const sizeStyles = BADGE_SIZES[size]

  // Determine colors based on variant
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'accent':
        return {
          backgroundColor: background || '#e8f4ff',
          color: color || '#1a3a52',
          border: 'none',
        }
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: color || '#555',
          border: `1px solid ${color || '#e0e0e0'}`,
        }
      case 'solid':
        return {
          backgroundColor: background || '#4a90e2',
          color: color || '#ffffff',
          border: 'none',
        }
      default:
        return {
          backgroundColor: background || '#f0f0f0',
          color: color || '#555',
          border: 'none',
        }
    }
  }

  const finalStyles: React.CSSProperties = {
    ...sizeStyles,
    ...getVariantStyles(),
    borderRadius: '3px',
    display: 'inline-block',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    ...(onClick && {
      cursor: 'pointer',
      userSelect: 'none',
    }),
    ...style,
  }

  return (
    <span
      className={className}
      style={finalStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </span>
  )
}

/**
 * Specialized Badge variants
 */

export const AccentBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="accent" {...props} />
)

export const OutlineBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="outline" {...props} />
)

export const SolidBadge: React.FC<Omit<BadgeProps, 'variant'>> = (props) => (
  <Badge variant="solid" {...props} />
)
