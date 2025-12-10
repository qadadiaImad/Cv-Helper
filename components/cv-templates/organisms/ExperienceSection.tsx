/**
 * EXPERIENCESECTION ORGANISM COMPONENT
 * Professional experience display with company, position, dates, and achievements
 *
 * @example
 * ```tsx
 * <ExperienceSection
 *   data={data.experience}
 *   variant="detailed"
 *   theme={atlanticBlueTheme}
 * />
 * ```
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { Experience } from '@/lib/schemas'

export interface ExperienceSectionProps {
  /** Experience data array */
  data: Experience[]
  /** Visual variant */
  variant?: 'detailed' | 'compact' | 'timeline' | 'minimal' | 'custom'
  /** Section title */
  title?: string
  /** Show section header */
  showHeader?: boolean
  /** Header variant */
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  /** Show technologies */
  showTechnologies?: boolean
  /** Show description */
  showDescription?: boolean
  /** Show achievements */
  showAchievements?: boolean
  /** Primary color */
  primaryColor?: string
  /** Accent color */
  accentColor?: string
  /** Text color */
  textColor?: string
  /** Border color */
  borderColor?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * ExperienceSection Component - Professional experience display
 *
 * Displays work experience with:
 * - Company and position information
 * - Date ranges
 * - Location
 * - Job descriptions
 * - Key achievements
 * - Technologies used
 *
 * Features:
 * - Multiple layout variants
 * - Configurable content visibility
 * - Rich text support for descriptions
 * - Technology tags
 * - Timeline-style layouts
 *
 * Variants:
 * - **detailed**: Full information with all fields
 * - **compact**: Minimal spacing, essential info only
 * - **timeline**: Visual timeline with dates
 * - **minimal**: Bare minimum information
 * - **custom**: Full control via props
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  data,
  variant = 'detailed',
  title = 'EXPERIENCE',
  showHeader = true,
  headerVariant = 'main',
  showTechnologies = true,
  showDescription = true,
  showAchievements = true,
  primaryColor = '#1a3a52',
  accentColor = '#4a90e2',
  textColor = '#333',
  borderColor = '#e0e0e0',
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  const containerStyles: React.CSSProperties = {
    marginBottom: '35px',
    ...style,
  }

  const getItemMarginBottom = () => {
    switch (variant) {
      case 'compact':
        return '15px'
      case 'minimal':
        return '12px'
      default:
        return '25px'
    }
  }

  return (
    <section className={className} style={containerStyles}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={primaryColor}
        />
      )}
      
      {data.map((exp, i) => (
        <div
          key={i}
          style={{
            marginBottom: getItemMarginBottom(),
            paddingBottom: i < data.length - 1 ? getItemMarginBottom() : '0',
            borderBottom: i < data.length - 1 ? `1px solid ${borderColor}` : 'none',
          }}
        >
          {/* Header: Position and Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <Text
              variant="subheading"
              size="16px"
              weight="bold"
              color={primaryColor}
            >
              {exp.position}
            </Text>
            {(exp.startDate || exp.endDate) && (
              <Text
                variant="caption"
                size="11px"
                color="#666"
                style={{ whiteSpace: 'nowrap', marginLeft: '15px' }}
              >
                {exp.startDate} - {exp.endDate}
              </Text>
            )}
          </div>

          {/* Company and Location */}
          <Text
            variant="body"
            size="13px"
            weight={600}
            color={accentColor}
            style={{ marginBottom: '10px' }}
          >
            {exp.company}
            {exp.location && ` • ${exp.location}`}
          </Text>

          {/* Description */}
          {showDescription && exp.description && (
            <HtmlRenderer
              html={exp.description}
              as="div"
              style={{
                fontSize: '12px',
                color: '#555',
                marginBottom: '8px',
                fontStyle: 'italic',
              }}
            />
          )}

          {/* Achievements */}
          {showAchievements && exp.achievements && exp.achievements.length > 0 && (
            <ul style={{ fontSize: '12px', lineHeight: '1.7', paddingLeft: '20px', color: '#444' }}>
              {exp.achievements.map((achievement, j) => (
                <li key={j} style={{ marginBottom: '4px' }}>
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          {showTechnologies && exp.technologies && exp.technologies.length > 0 && (
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {exp.technologies.map((tech, k) => (
                <Badge
                  key={k}
                  variant="default"
                  size="xs"
                  background="#e8f4ff"
                  color={primaryColor}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
