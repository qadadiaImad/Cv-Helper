/**
 * SINGLECOLUMNLAYOUT TEMPLATE COMPONENT
 * Reusable single-column layout for CV templates
 *
 * @example
 * ```tsx
 * <SingleColumnLayout
 *   header={<PersonalInfoSection />}
 *   content={<>...</>}
 *   maxWidth="850px"
 *   padding="50px 60px"
 * />
 * ```
 */

import React from 'react'

export interface SingleColumnLayoutProps {
  /** Header content (name, title, contact) */
  header?: React.ReactNode
  /** Main content sections */
  content: React.ReactNode
  /** Footer content (optional) */
  footer?: React.ReactNode
  /** Maximum width */
  maxWidth?: string
  /** Container padding */
  padding?: string
  /** Background color */
  backgroundColor?: string
  /** Text color */
  textColor?: string
  /** Font family */
  fontFamily?: string
  /** Minimum height */
  minHeight?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * SingleColumnLayout Component - Simple single-column CV layout
 *
 * Provides a centered, single-column structure for CV templates:
 * - Optional header section
 * - Main content area
 * - Optional footer section
 * - Configurable width and styling
 *
 * Features:
 * - Centered layout with max-width
 * - Flexible content arrangement
 * - Print-friendly design
 * - Customizable typography and colors
 *
 * Common use cases:
 * - Traditional resume layouts
 * - Professional CV formats
 * - Academic CV layouts
 * - Executive resume styles
 */
export const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  header,
  content,
  footer,
  maxWidth = '850px',
  padding = '50px 60px',
  backgroundColor = '#ffffff',
  textColor = '#000',
  fontFamily = 'Arial, sans-serif',
  minHeight = '1200px',
  className,
  style,
}) => {
  const containerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth,
    margin: '0 auto',
    padding,
    fontFamily,
    backgroundColor,
    color: textColor,
    minHeight,
    ...style,
  }

  return (
    <div className={className} style={containerStyles}>
      {header && <header>{header}</header>}
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  )
}
