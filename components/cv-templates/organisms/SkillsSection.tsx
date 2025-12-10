/**
 * SKILLSSECTION ORGANISM COMPONENT
 * Skills display with multiple layout variants
 *
 * @example
 * ```tsx
 * <SkillsSection
 *   data={data.skills}
 *   variant="sidebar-bordered"
 *   theme={atlanticBlueTheme}
 * />
 * ```
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { SkillTag } from '../molecules/SkillTag'
import type { SkillCategory } from '@/lib/schemas'

export interface SkillsSectionProps {
  /** Skills data (simple array or categorized) */
  data?: string[] | SkillCategory[]
  /** Visual variant */
  variant?: 'list' | 'grid' | 'sidebar-bordered' | 'categorized' | 'custom'
  /** Section title */
  title?: string
  /** Show section header */
  showHeader?: boolean
  /** Header variant */
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  /** Background color */
  backgroundColor?: string
  /** Text color */
  textColor?: string
  /** Accent color */
  accentColor?: string
  /** Border color (for bordered variants) */
  borderColor?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Check if data is categorized skills
 */
function isCategorized(data: string[] | SkillCategory[]): data is SkillCategory[] {
  return data.length > 0 && typeof data[0] === 'object' && 'category' in data[0]
}

/**
 * SkillsSection Component - Skills display
 *
 * Flexible skills section supporting:
 * - Simple skill lists
 * - Categorized skills
 * - Multiple layout variants
 * - Bordered/highlighted styles
 *
 * Features:
 * - Automatic detection of simple vs categorized skills
 * - Multiple visual variants
 * - Customizable colors and styling
 * - Responsive layouts
 *
 * Variants:
 * - **list**: Simple vertical list
 * - **grid**: Multi-column grid layout
 * - **sidebar-bordered**: Bordered items with accent (for sidebars)
 * - **categorized**: Grouped by category
 * - **custom**: Full control via props
 */
export const SkillsSection: React.FC<SkillsSectionProps> = ({
  data,
  variant = 'list',
  title = 'SKILLS',
  showHeader = true,
  headerVariant = 'main',
  backgroundColor,
  textColor = '#333',
  accentColor = '#4a90e2',
  borderColor,
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  const containerStyles: React.CSSProperties = {
    fontSize: '12px',
    backgroundColor,
    ...style,
  }

  // Render simple skills list
  const renderSimpleSkills = (skills: string[]) => {
    if (variant === 'sidebar-bordered') {
      return (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {skills.map((skill, i) => (
            <li
              key={i}
              style={{
                padding: '6px 0 6px 12px',
                borderLeft: `3px solid ${accentColor}`,
                backgroundColor: `${accentColor}1a`, // 10% opacity
                color: textColor,
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      )
    }

    if (variant === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
          {skills.map((skill, i) => (
            <SkillTag key={i} name={skill} color={textColor} />
          ))}
        </div>
      )
    }

    // Default list variant
    return (
      <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {skills.map((skill, i) => (
          <li key={i} style={{ color: textColor }}>
            {skill}
          </li>
        ))}
      </ul>
    )
  }

  // Render categorized skills
  const renderCategorizedSkills = (categories: SkillCategory[]) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categories.map((category, i) => (
          <div key={i}>
            <h4 style={{ fontSize: '13px', fontWeight: '600', color: accentColor, marginBottom: '8px' }}>
              {category.category}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {category.skills.map((skill, j) => (
                <SkillTag
                  key={j}
                  name={skill.name}
                  proficiency={skill.level}
                  color={textColor}
                  showRating={skill.level !== undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className} style={containerStyles}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={textColor}
        />
      )}
      
      {isCategorized(data) ? renderCategorizedSkills(data) : renderSimpleSkills(data)}
    </div>
  )
}
