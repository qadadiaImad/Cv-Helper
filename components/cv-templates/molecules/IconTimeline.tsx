/**
 * ICONTIMELINE MOLECULAR COMPONENT
 * Timeline layout with icon circles and connecting lines
 *
 * @example
 * ```tsx
 * <IconTimeline
 *   icon="💼"
 *   showConnector={true}
 * >
 *   <h4>Senior Developer</h4>
 *   <p>Company Name</p>
 * </IconTimeline>
 * ```
 */

import React from 'react'

export interface IconTimelineProps {
  /** Icon to display (emoji or custom element) */
  icon: string | React.ReactNode
  /** Child content displayed to the right of icon */
  children: React.ReactNode
  /** Show connecting line to next item */
  showConnector?: boolean
  /** Icon size in pixels */
  iconSize?: number
  /** Icon container size in pixels */
  iconContainerSize?: number
  /** Icon font size (for emoji/text icons) */
  iconFontSize?: string
  /** Icon background color */
  iconBackground?: string
  /** Icon border color */
  iconBorderColor?: string
  /** Icon border width */
  iconBorderWidth?: number
  /** Connector line color */
  connectorColor?: string
  /** Connector line width */
  connectorWidth?: number
  /** Connector line height (auto-calculated if not provided) */
  connectorHeight?: string
  /** Left padding for content area */
  contentPaddingLeft?: string | number
  /** Margin bottom for the timeline item */
  marginBottom?: string | number
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * IconTimeline Component - Timeline with icon circles
 *
 * Creates a vertical timeline layout with icon circles connected by lines:
 * - Experience timelines with job icons
 * - Education progression
 * - Project milestones
 * - Skill development paths
 *
 * Features:
 * - Customizable icon circles with borders
 * - Connecting lines between items
 * - Flexible content area
 * - Support for emojis or custom icons
 * - Fully themable colors and sizes
 *
 * Layout:
 * - Icon positioned absolutely on the left
 * - Content flows to the right with proper padding
 * - Connector line extends down from icon center
 *
 * Use this component for timeline-based layouts in templates.
 */
export const IconTimeline: React.FC<IconTimelineProps> = ({
  icon,
  children,
  showConnector = false,
  iconSize,
  iconContainerSize = 50,
  iconFontSize = '24px',
  iconBackground = 'rgba(255, 255, 255, 0.1)',
  iconBorderColor = 'rgba(255, 255, 255, 0.2)',
  iconBorderWidth = 2,
  connectorColor = 'rgba(255, 255, 255, 0.1)',
  connectorWidth = 2,
  connectorHeight,
  contentPaddingLeft = 70,
  marginBottom = 35,
  className,
  style,
}) => {
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    paddingLeft: typeof contentPaddingLeft === 'number' ? `${contentPaddingLeft}px` : contentPaddingLeft,
    marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
    ...style,
  }

  const iconCircleStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: `${iconContainerSize}px`,
    height: `${iconContainerSize}px`,
    borderRadius: '50%',
    background: iconBackground,
    border: `${iconBorderWidth}px solid ${iconBorderColor}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: iconFontSize,
    flexShrink: 0,
  }

  const connectorStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${iconContainerSize / 2 - connectorWidth / 2}px`,
    top: `${iconContainerSize}px`,
    width: `${connectorWidth}px`,
    height: connectorHeight || 'calc(100% + 10px)',
    background: connectorColor,
  }

  return (
    <div className={className} style={containerStyles}>
      {/* Icon Circle */}
      <div style={iconCircleStyles}>
        {typeof icon === 'string' ? icon : icon}
      </div>

      {/* Connecting Line */}
      {showConnector && <div style={connectorStyles} />}

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}

/**
 * Specialized IconTimeline variants
 */

export const ExperienceTimelineItem: React.FC<
  Omit<IconTimelineProps, 'iconBackground' | 'iconBorderColor'>
> = (props) => (
  <IconTimeline
    iconBackground="rgba(255, 255, 255, 0.1)"
    iconBorderColor="rgba(255, 255, 255, 0.2)"
    {...props}
  />
)

export const LightTimelineItem: React.FC<
  Omit<IconTimelineProps, 'iconBackground' | 'iconBorderColor' | 'connectorColor'>
> = (props) => (
  <IconTimeline
    iconBackground="#f0f0f0"
    iconBorderColor="#d0d0d0"
    connectorColor="#e0e0e0"
    {...props}
  />
)
