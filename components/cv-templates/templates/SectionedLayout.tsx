/**
 * SECTIONEDLAYOUT TEMPLATE COMPONENT
 * Layout with alternating background sections (like Mercury template)
 *
 * @example
 * ```tsx
 * <SectionedLayout
 *   header={<PersonalInfoSection />}
 *   sections={[
 *     { content: <SummarySection />, background: '#fff' },
 *     { content: <ExperienceSection />, background: '#f5f5f5' }
 *   ]}
 * />
 * ```
 */

import React from 'react'

export interface LayoutSection {
  /** Section content */
  content: React.ReactNode
  /** Section background color */
  background?: string
  /** Section padding */
  padding?: string
  /** Section title (optional centered title bar) */
  title?: string
  /** Title background color */
  titleBackground?: string
  /** Title color */
  titleColor?: string
}

export interface SectionedLayoutProps {
  /** Header content */
  header?: React.ReactNode
  /** Array of sections with different backgrounds */
  sections: LayoutSection[]
  /** Header background color */
  headerBackground?: string
  /** Header padding */
  headerPadding?: string
  /** Container background color */
  containerBackground?: string
  /** Maximum width */
  maxWidth?: string
  /** Font family */
  fontFamily?: string
  /** Text color */
  textColor?: string
  /** Minimum height */
  minHeight?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * SectionedLayout Component - Layout with distinct background sections
 *
 * Creates a professional layout where each section can have:
 * - Different background colors
 * - Centered title bars
 * - Independent padding
 * - Full-width backgrounds
 *
 * Features:
 * - Flexible section arrangement
 * - Individual section styling
 * - Title bar support for sections
 * - Alternating backgrounds for visual hierarchy
 *
 * Common use cases:
 * - Mercury-style layouts with gray sections
 * - Modern layouts with colored section backgrounds
 * - Professional resumes with visual separation
 */
export const SectionedLayout: React.FC<SectionedLayoutProps> = ({
  header,
  sections,
  headerBackground = '#e8e8e8',
  headerPadding = '50px 60px 40px',
  containerBackground = '#e8e8e8',
  maxWidth = '850px',
  fontFamily = 'Georgia, serif',
  textColor = '#5a5a5a',
  minHeight = '1200px',
  className,
  style,
}) => {
  const containerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0',
    fontFamily,
    backgroundColor: containerBackground,
    color: textColor,
    minHeight,
    ...style,
  }

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      {header && (
        <header
          style={{
            padding: headerPadding,
            backgroundColor: headerBackground,
            maxWidth,
            margin: '0 auto',
          }}
        >
          {header}
        </header>
      )}

      {/* Sections */}
      {sections.map((section, index) => (
        <section key={index} style={{ marginBottom: index < sections.length - 1 ? '30px' : '0' }}>
          {section.title && (
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '12px',
                backgroundColor: section.titleBackground || '#d9d9d9',
                marginBottom: '0',
                color: section.titleColor || '#4a4a4a',
              }}
            >
              {section.title}
            </h2>
          )}
          <div
            style={{
              padding: section.padding || '30px 60px',
              backgroundColor: section.background || '#fff',
              maxWidth,
              margin: '0 auto',
            }}
          >
            {section.content}
          </div>
        </section>
      ))}
    </div>
  )
}
