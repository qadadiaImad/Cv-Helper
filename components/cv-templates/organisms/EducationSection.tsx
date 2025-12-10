/**
 * EDUCATIONSECTION ORGANISM COMPONENT
 * Education history display with institution, degree, and achievements
 *
 * @example
 * ```tsx
 * <EducationSection
 *   data={data.education}
 *   variant="detailed"
 *   theme={atlanticBlueTheme}
 * />
 * ```
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import type { Education } from '@/lib/schemas'

export interface EducationSectionProps {
  /** Education data array */
  data: Education[]
  /** Visual variant */
  variant?: 'detailed' | 'compact' | 'timeline' | 'minimal' | 'custom'
  /** Section title */
  title?: string
  /** Show section header */
  showHeader?: boolean
  /** Header variant */
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  /** Show GPA */
  showGPA?: boolean
  /** Show honors */
  showHonors?: boolean
  /** Show coursework */
  showCoursework?: boolean
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
 * EducationSection Component - Education history display
 *
 * Displays educational background with:
 * - Institution and degree information
 * - Field of study
 * - Date ranges
 * - Location
 * - GPA (optional)
 * - Honors and awards (optional)
 * - Relevant coursework (optional)
 *
 * Features:
 * - Multiple layout variants
 * - Configurable content visibility
 * - Clean, professional formatting
 *
 * Variants:
 * - **detailed**: Full information with all fields
 * - **compact**: Minimal spacing, essential info only
 * - **timeline**: Visual timeline with dates
 * - **minimal**: Bare minimum information
 * - **custom**: Full control via props
 */
export const EducationSection: React.FC<EducationSectionProps> = ({
  data,
  variant = 'detailed',
  title = 'EDUCATION',
  showHeader = true,
  headerVariant = 'main',
  showGPA = true,
  showHonors = true,
  showCoursework = true,
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
        return '12px'
      case 'minimal':
        return '10px'
      default:
        return '18px'
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
      
      {data.map((edu, i) => (
        <div key={i} style={{ marginBottom: getItemMarginBottom() }}>
          {/* Header: Degree and Date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text
              variant="subheading"
              size="15px"
              weight="bold"
              color={primaryColor}
            >
              {edu.degree}
              {edu.field && ` in ${edu.field}`}
            </Text>
            {(edu.startDate || edu.endDate) && (
              <Text
                variant="caption"
                size="11px"
                color="#666"
                style={{ whiteSpace: 'nowrap', marginLeft: '15px' }}
              >
                {edu.startDate} - {edu.endDate}
              </Text>
            )}
          </div>

          {/* Institution and Location */}
          <Text
            variant="body"
            size="13px"
            color={accentColor}
            style={{ marginBottom: '4px' }}
          >
            {edu.institution}
            {edu.location && ` • ${edu.location}`}
          </Text>

          {/* GPA */}
          {showGPA && edu.gpa && (
            <Text
              variant="caption"
              size="11px"
              color="#666"
            >
              GPA: {edu.gpa}
            </Text>
          )}

          {/* Honors */}
          {showHonors && edu.honors && edu.honors.length > 0 && (
            <Text
              variant="caption"
              size="11px"
              color="#555"
              style={{ marginTop: '4px' }}
            >
              Honors: {edu.honors.join(', ')}
            </Text>
          )}

          {/* Coursework */}
          {showCoursework && edu.coursework && edu.coursework.length > 0 && (
            <Text
              variant="caption"
              size="11px"
              color="#555"
              style={{ marginTop: '4px' }}
            >
              Relevant Coursework: {edu.coursework.join(', ')}
            </Text>
          )}
        </div>
      ))}
    </section>
  )
}
