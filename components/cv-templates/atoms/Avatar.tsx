/**
 * AVATAR ATOMIC COMPONENT
 * Photo display with configurable styling and effects
 *
 * @example
 * ```tsx
 * <Avatar src="/photo.jpg" size={120} variant="circle" />
 * <Avatar src="/photo.jpg" size={160} variant="rounded" grayscale />
 * <Avatar src="/photo.jpg" size={100} border borderColor="white" />
 * ```
 */

import React from 'react'
import type { PhotoConfig } from '../../../lib/schemas'

export interface AvatarProps {
  /** Image source URL */
  src: string
  /** Alt text for accessibility */
  alt?: string
  /** Avatar size in pixels (width and height) */
  size?: number
  /** Width in pixels (overrides size for rectangular avatars) */
  width?: number
  /** Height in pixels (overrides size for rectangular avatars) */
  height?: number
  /** Visual variant */
  variant?: 'circle' | 'rounded' | 'square' | 'rectangular'
  /** Border radius percentage (0-50, overrides variant) */
  borderRadius?: number
  /** Apply grayscale filter */
  grayscale?: boolean
  /** Show border */
  border?: boolean
  /** Border color (CSS color value) */
  borderColor?: string
  /** Border width in pixels */
  borderWidth?: number
  /** Background color (visible when image loads) */
  background?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

/**
 * Border radius presets for variants
 */
const VARIANT_RADIUS = {
  circle: 50,
  rounded: 12,
  square: 0,
  rectangular: 8,
} as const

/**
 * Avatar Component - Profile photo display
 *
 * Provides consistent photo rendering across templates:
 * - Multiple shape variants (circle, rounded, square)
 * - Customizable size and border radius
 * - Visual effects (grayscale, border)
 * - Proper image aspect ratio handling
 *
 * Features:
 * - Supports PhotoConfig schema from UniversalResumeData
 * - Accessible with alt text
 * - Loading state background
 * - Object-fit control
 *
 * Use this component for ALL profile photos in templates.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Profile photo',
  size = 120,
  width,
  height,
  variant = 'circle',
  borderRadius,
  grayscale = false,
  border = false,
  borderColor = '#ffffff',
  borderWidth = 4,
  background = '#f0f0f0',
  className,
  style,
  objectFit = 'cover',
}) => {
  // Determine dimensions (width/height override size)
  const finalWidth = width || size
  const finalHeight = height || size

  // Determine border radius (custom or variant preset)
  const radius = borderRadius !== undefined ? borderRadius : VARIANT_RADIUS[variant]

  const containerStyles: React.CSSProperties = {
    width: `${finalWidth}px`,
    height: `${finalHeight}px`,
    borderRadius: `${radius}%`,
    backgroundColor: background,
    overflow: 'hidden',
    flexShrink: 0,
    ...(border && {
      border: `${borderWidth}px solid ${borderColor}`,
    }),
    ...style,
  }

  const imgStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit,
    display: 'block',
    ...(grayscale && {
      filter: 'grayscale(100%)',
    }),
  }

  return (
    <div className={className} style={containerStyles}>
      <img src={src} alt={alt} style={imgStyles} loading="lazy" />
    </div>
  )
}

/**
 * Helper to create Avatar from PhotoConfig schema
 */
export const AvatarFromConfig: React.FC<{
  config: PhotoConfig
  alt?: string
  className?: string
  style?: React.CSSProperties
}> = ({ config, alt, className, style }) => {
  if (!config.url) return null

  return (
    <Avatar
      src={config.url}
      alt={alt}
      size={config.size}
      borderRadius={config.borderRadius}
      grayscale={config.effects?.grayscale}
      border={config.effects?.border}
      className={className}
      style={style}
    />
  )
}

/**
 * Specialized Avatar variants
 */

export const CircleAvatar: React.FC<Omit<AvatarProps, 'variant'>> = (props) => (
  <Avatar variant="circle" {...props} />
)

export const RoundedAvatar: React.FC<Omit<AvatarProps, 'variant'>> = (props) => (
  <Avatar variant="rounded" {...props} />
)

export const SquareAvatar: React.FC<Omit<AvatarProps, 'variant'>> = (props) => (
  <Avatar variant="square" {...props} />
)

export const RectangularAvatar: React.FC<Omit<AvatarProps, 'variant'>> = (props) => (
  <Avatar variant="rectangular" {...props} />
)
