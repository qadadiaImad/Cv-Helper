/**
 * SECTIONHEADER MOLECULAR COMPONENT
 * Title + optional divider for CV sections
 *
 * @example
 * ```tsx
 * <SectionHeader title="Experience" variant="main" />
 * <SectionHeader title="Skills" variant="sidebar" />
 * <SectionHeader title="Education" dividerColor="#1a3a52" thickness={3} />
 * ```
 */

import React from 'react'
import { Text } from '../atoms/Text'
import { Divider } from '../atoms/Divider'

export interface SectionHeaderProps {
  /** Section title */
  title: string
  /** Visual variant */
  variant?: 'main' | 'sidebar' | 'minimal' | 'custom'
  /** Title color */
  color?: string
  /** Font size */
  fontSize?: string
  /** Font weight */
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold'
  /** Transform to uppercase */
  uppercase?: boolean
  /** Letter spacing */
  letterSpacing?: string
  /** Show divider */
  showDivider?: boolean
  /** Divider variant */
  dividerVariant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  /** Divider color */
  dividerColor?: string
  /** Divider thickness */
  dividerThickness?: number
  /** Spacing below title before divider */
  titleMarginBottom?: string | number
  /** Spacing below header */
  marginBottom?: string | number
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Variant presets for different section contexts
 */
const VARIANT_PRESETS = {
  main: {
    fontSize: '18px',
    fontWeight: 'bold' as const,
    uppercase: true,
    letterSpacing: '0.5px',
    color: '#1a3a52',
    showDivider: true,
    dividerColor: '#1a3a52',
    dividerThickness: 3,
    titleMarginBottom: '8px',
    marginBottom: '15px',
  },
  sidebar: {
    fontSize: '14px',
    fontWeight: 'bold' as const,
    uppercase: true,
    letterSpacing: '0.5px',
    color: '#ffffff',
    showDivider: true,
    dividerColor: 'rgba(255,255,255,0.3)',
    dividerThickness: 2,
    titleMarginBottom: '8px',
    marginBottom: '12px',
  },
  minimal: {
    fontSize: '16px',
    fontWeight: 'semibold' as const,
    uppercase: false,
    letterSpacing: 'normal',
    color: '#333',
    showDivider: false,
    titleMarginBottom: '0px',
    marginBottom: '12px',
  },
  custom: {},
} as const

/**
 * SectionHeader Component - Section title with divider
 *
 * Combines Text and Divider atoms for consistent section headers:
 * - Experience, Education, Skills sections
 * - Sidebar section headers
 * - Custom section titles
 *
 * Features:
 * - Predefined variants for common contexts (main, sidebar)
 * - Customizable typography and divider
 * - Optional divider
 * - Flexible styling
 *
 * Variants:
 * - **main**: Bold, uppercase, thick underline (for main content sections)
 * - **sidebar**: Smaller, uppercase, thin underline (for sidebar sections)
 * - **minimal**: No divider, simpler styling
 * - **custom**: Full control via props
 *
 * Use this component for ALL section headers in templates.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  variant = 'main',
  color,
  fontSize,
  fontWeight,
  uppercase,
  letterSpacing,
  showDivider,
  dividerVariant = 'solid',
  dividerColor,
  dividerThickness,
  titleMarginBottom,
  marginBottom,
  className,
  style,
}) => {
  // Get preset values for variant
  const preset = VARIANT_PRESETS[variant]

  // Resolve final values (props override presets)
  const resolvedColor = color || preset.color
  const resolvedFontSize = fontSize || preset.fontSize
  const resolvedFontWeight = fontWeight || preset.fontWeight
  const resolvedUppercase = uppercase !== undefined ? uppercase : preset.uppercase
  const resolvedLetterSpacing = letterSpacing || preset.letterSpacing
  const resolvedShowDivider = showDivider !== undefined ? showDivider : preset.showDivider
  const resolvedDividerColor = dividerColor || preset.dividerColor
  const resolvedDividerThickness = dividerThickness || preset.dividerThickness
  const resolvedTitleMarginBottom = titleMarginBottom || preset.titleMarginBottom
  const resolvedMarginBottom = marginBottom || preset.marginBottom

  const containerStyles: React.CSSProperties = {
    marginBottom: typeof resolvedMarginBottom === 'number' ? `${resolvedMarginBottom}px` : resolvedMarginBottom,
    ...style,
  }

  const titleStyles: React.CSSProperties = {
    marginBottom: typeof resolvedTitleMarginBottom === 'number' ? `${resolvedTitleMarginBottom}px` : resolvedTitleMarginBottom,
  }

  return (
    <div className={className} style={containerStyles}>
      <Text
        variant="heading"
        color={resolvedColor}
        size={resolvedFontSize}
        weight={resolvedFontWeight}
        uppercase={resolvedUppercase}
        letterSpacing={resolvedLetterSpacing}
        style={titleStyles}
      >
        {title}
      </Text>
      {resolvedShowDivider && (
        <Divider
          variant={dividerVariant}
          color={resolvedDividerColor}
          thickness={resolvedDividerThickness}
        />
      )}
    </div>
  )
}

/**
 * Specialized SectionHeader variants
 */

export const MainSectionHeader: React.FC<Omit<SectionHeaderProps, 'variant'>> = (props) => (
  <SectionHeader variant="main" {...props} />
)

export const SidebarSectionHeader: React.FC<Omit<SectionHeaderProps, 'variant'>> = (props) => (
  <SectionHeader variant="sidebar" {...props} />
)

export const MinimalSectionHeader: React.FC<Omit<SectionHeaderProps, 'variant'>> = (props) => (
  <SectionHeader variant="minimal" {...props} />
)
