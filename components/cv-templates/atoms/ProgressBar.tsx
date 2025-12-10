/**
 * PROGRESSBAR ATOMIC COMPONENT
 * Visual indicators for ratings, skill levels, and progress
 *
 * @example
 * ```tsx
 * <ProgressBar value={4} max={5} color="#4a90e2" />
 * <ProgressBar value={80} max={100} variant="bar" height={6} />
 * <ProgressBar value={3} max={5} variant="dots" />
 * ```
 */

import React from 'react'

export interface ProgressBarProps {
  /** Current value */
  value: number
  /** Maximum value */
  max?: number
  /** Visual variant */
  variant?: 'bar' | 'dots' | 'segments'
  /** Progress bar color (CSS color value) */
  color?: string
  /** Background color (CSS color value) */
  backgroundColor?: string
  /** Height in pixels (for bar variant) */
  height?: number
  /** Width (CSS width value) */
  width?: string
  /** Gap between dots/segments */
  gap?: number
  /** Border radius */
  borderRadius?: number
  /** Show percentage label */
  showLabel?: boolean
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * ProgressBar Component - Visual progress/rating indicators
 *
 * Provides consistent visual representation of:
 * - Skill levels (1-5 scale)
 * - Language proficiency
 * - Competency ratings
 * - Progress percentages
 *
 * Variants:
 * - **bar**: Traditional horizontal bar (good for percentages)
 * - **dots**: Discrete circular indicators (good for 1-5 scales)
 * - **segments**: Segmented bars (good for levels)
 *
 * Features:
 * - Customizable colors
 * - Flexible sizing
 * - Optional percentage label
 * - Accessible with ARIA attributes
 *
 * Use this component for ALL ratings and progress indicators.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 5,
  variant = 'bar',
  color = '#4a90e2',
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  height = 4,
  width = '100%',
  gap = 3,
  borderRadius = 2,
  showLabel = false,
  className,
  style,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  // Bar variant
  if (variant === 'bar') {
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: showLabel ? '8px' : 0,
      width,
      ...style,
    }

    const barContainerStyles: React.CSSProperties = {
      flex: 1,
      height: `${height}px`,
      backgroundColor,
      borderRadius: `${borderRadius}px`,
      overflow: 'hidden',
      position: 'relative',
    }

    const barFillStyles: React.CSSProperties = {
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: color,
      transition: 'width 0.3s ease',
    }

    return (
      <div
        className={className}
        style={containerStyles}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div style={barContainerStyles}>
          <div style={barFillStyles} />
        </div>
        {showLabel && (
          <span style={{ fontSize: '11px', color: '#666', minWidth: '35px' }}>
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    )
  }

  // Dots variant
  if (variant === 'dots') {
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: `${gap}px`,
      ...style,
    }

    const dotSize = height * 2 // Dots are larger than bar height

    return (
      <div
        className={className}
        style={containerStyles}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {Array.from({ length: max }, (_, i) => {
          const isFilled = i < value
          const dotStyles: React.CSSProperties = {
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: '50%',
            backgroundColor: isFilled ? color : backgroundColor,
            transition: 'background-color 0.3s ease',
            flexShrink: 0,
          }
          return <div key={i} style={dotStyles} />
        })}
      </div>
    )
  }

  // Segments variant
  if (variant === 'segments') {
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: `${gap}px`,
      width,
      ...style,
    }

    const segmentWidth = `calc((100% - ${gap * (max - 1)}px) / ${max})`

    return (
      <div
        className={className}
        style={containerStyles}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {Array.from({ length: max }, (_, i) => {
          const isFilled = i < value
          const segmentStyles: React.CSSProperties = {
            width: segmentWidth,
            height: `${height}px`,
            backgroundColor: isFilled ? color : backgroundColor,
            borderRadius: `${borderRadius}px`,
            transition: 'background-color 0.3s ease',
            flexShrink: 0,
          }
          return <div key={i} style={segmentStyles} />
        })}
      </div>
    )
  }

  return null
}

/**
 * Specialized ProgressBar variants
 */

export const BarProgress: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar variant="bar" {...props} />
)

export const DotProgress: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar variant="dots" {...props} />
)

export const SegmentProgress: React.FC<Omit<ProgressBarProps, 'variant'>> = (props) => (
  <ProgressBar variant="segments" {...props} />
)

/**
 * Helper to convert language proficiency to numeric value
 */
export const proficiencyToValue = (proficiency: string): number => {
  const levels: Record<string, number> = {
    native: 5,
    fluent: 5,
    professional: 4,
    advanced: 4,
    intermediate: 3,
    beginner: 2,
    elementary: 1,
  }
  return levels[proficiency.toLowerCase()] || 3
}
