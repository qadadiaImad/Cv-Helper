/**
 * SKILLTAG MOLECULAR COMPONENT
 * Badge + optional rating for skills display
 *
 * @example
 * ```tsx
 * <SkillTag name="React" />
 * <SkillTag name="TypeScript" level={4} maxLevel={5} />
 * <SkillTag name="Python" variant="bordered" showRating />
 * ```
 */

import React from 'react'
import { Badge } from '../atoms/Badge'
import { ProgressBar, proficiencyToValue } from '../atoms/ProgressBar'

export interface SkillTagProps {
  /** Skill name */
  name: string
  /** Skill level (1-5 or custom scale) */
  level?: number
  /** Maximum level for rating */
  maxLevel?: number
  /** Proficiency level (alternative to numeric level) */
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Native' | 'Fluent' | 'Professional'
  /** Visual variant */
  variant?: 'simple' | 'rated' | 'bordered' | 'accent' | 'solid'
  /** Show rating indicator */
  showRating?: boolean
  /** Rating indicator type */
  ratingType?: 'bar' | 'dots' | 'segments'
  /** Badge color */
  color?: string
  /** Badge background */
  background?: string
  /** Badge size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Layout direction */
  layout?: 'horizontal' | 'vertical'
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Click handler */
  onClick?: () => void
}

/**
 * SkillTag Component - Skill display with optional rating
 *
 * Combines Badge and ProgressBar atoms for flexible skill representation:
 * - Simple tags (no rating)
 * - Tags with ratings (numeric or proficiency)
 * - Different visual styles
 *
 * Common use cases:
 * - Skills lists (sidebar, main content)
 * - Technology tags
 * - Language proficiency
 * - Tool competency
 *
 * Features:
 * - Multiple variants (simple, bordered, accent, solid)
 * - Rating indicators (bar, dots, segments)
 * - Horizontal and vertical layouts
 * - Proficiency level support
 *
 * Use this component for ALL skill and technology displays.
 */
export const SkillTag: React.FC<SkillTagProps> = ({
  name,
  level,
  maxLevel = 5,
  proficiency,
  variant = 'simple',
  showRating = false,
  ratingType = 'dots',
  color,
  background,
  size = 'sm',
  layout = 'vertical',
  className,
  style,
  onClick,
}) => {
  // Resolve level from proficiency if provided
  const resolvedLevel = level !== undefined ? level : proficiency ? proficiencyToValue(proficiency) : undefined

  // Determine badge variant based on component variant
  const getBadgeVariant = () => {
    switch (variant) {
      case 'bordered':
        return 'outline'
      case 'accent':
        return 'accent'
      case 'solid':
        return 'solid'
      default:
        return 'default'
    }
  }

  // Container styles based on layout
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: layout === 'vertical' ? 'column' : 'row',
    alignItems: layout === 'vertical' ? 'flex-start' : 'center',
    gap: layout === 'vertical' ? '4px' : '8px',
    ...style,
  }

  return (
    <div className={className} style={containerStyles}>
      <Badge
        variant={getBadgeVariant()}
        color={color}
        background={background}
        size={size}
        onClick={onClick}
      >
        {name}
      </Badge>
      {showRating && resolvedLevel !== undefined && (
        <ProgressBar
          value={resolvedLevel}
          max={maxLevel}
          variant={ratingType}
          height={3}
          width={layout === 'vertical' ? '80px' : '60px'}
          color={color || '#4a90e2'}
        />
      )}
    </div>
  )
}

/**
 * Specialized SkillTag variants
 */

export const SimpleSkillTag: React.FC<Omit<SkillTagProps, 'variant'>> = (props) => (
  <SkillTag variant="simple" {...props} />
)

export const RatedSkillTag: React.FC<Omit<SkillTagProps, 'variant' | 'showRating'>> = (props) => (
  <SkillTag variant="rated" showRating {...props} />
)

export const BorderedSkillTag: React.FC<Omit<SkillTagProps, 'variant'>> = (props) => (
  <SkillTag variant="bordered" {...props} />
)

export const AccentSkillTag: React.FC<Omit<SkillTagProps, 'variant'>> = (props) => (
  <SkillTag variant="accent" {...props} />
)
