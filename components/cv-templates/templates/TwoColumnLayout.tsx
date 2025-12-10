/**
 * TWOCOLUMNLAYOUT TEMPLATE COMPONENT
 * Reusable two-column layout for CV templates
 *
 * @example
 * ```tsx
 * <TwoColumnLayout
 *   sidebar={<PersonalInfoSection />}
 *   main={<ExperienceSection />}
 *   sidebarWidth="280px"
 *   sidebarBackground="#1a3a52"
 * />
 * ```
 */

import React from 'react'

export interface TwoColumnLayoutProps {
  /** Sidebar content (left column) */
  sidebar: React.ReactNode
  /** Main content (right column) */
  main: React.ReactNode
  /** Sidebar width */
  sidebarWidth?: string
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right'
  /** Sidebar background color */
  sidebarBackground?: string
  /** Sidebar text color */
  sidebarColor?: string
  /** Sidebar padding */
  sidebarPadding?: string
  /** Main content background color */
  mainBackground?: string
  /** Main content padding */
  mainPadding?: string
  /** Container background */
  containerBackground?: string
  /** Minimum height */
  minHeight?: string
  /** Column gap */
  columnGap?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * TwoColumnLayout Component - Flexible two-column CV layout
 *
 * Provides a reusable two-column structure for CV templates:
 * - Configurable sidebar (left or right)
 * - Flexible column widths
 * - Independent styling for each column
 * - Responsive design support
 *
 * Features:
 * - Sidebar can be positioned left or right
 * - Customizable widths, colors, and padding
 * - Print-friendly layout
 * - Accepts any React components as children
 *
 * Common use cases:
 * - Sidebar with personal info + main content with experience
 * - Sidebar with skills + main content with projects
 * - Any combination of organism components
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  sidebar,
  main,
  sidebarWidth = '280px',
  sidebarPosition = 'left',
  sidebarBackground = '#1a3a52',
  sidebarColor = '#ffffff',
  sidebarPadding = '40px 30px',
  mainBackground = '#ffffff',
  mainPadding = '40px 50px',
  containerBackground = '#f5f5f5',
  minHeight = '1200px',
  columnGap = '0px',
  className,
  style,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: sidebarPosition === 'right' ? 'row-reverse' : 'row',
    width: '100%',
    minHeight,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: containerBackground,
    gap: columnGap,
    ...style,
  }

  const sidebarStyles: React.CSSProperties = {
    width: sidebarWidth,
    backgroundColor: sidebarBackground,
    color: sidebarColor,
    padding: sidebarPadding,
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  }

  const mainStyles: React.CSSProperties = {
    flex: 1,
    backgroundColor: mainBackground,
    padding: mainPadding,
  }

  return (
    <div className={className} style={containerStyles}>
      <aside style={sidebarStyles}>{sidebar}</aside>
      <main style={mainStyles}>{main}</main>
    </div>
  )
}
