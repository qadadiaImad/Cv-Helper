/**
 * CONTACTITEM MOLECULAR COMPONENT
 * Icon + text combination for contact information
 *
 * @example
 * ```tsx
 * <ContactItem icon="📧" value="john@example.com" />
 * <ContactItem icon="📱" label="Phone" value="+1 234 567 8900" />
 * <ContactItem icon="🌐" value="www.example.com" href="https://example.com" />
 * ```
 */

import React from 'react'
import { Icon } from '../atoms/Icon'
import { Text } from '../atoms/Text'

export interface ContactItemProps {
  /** Icon to display (emoji or custom element) */
  icon: string | React.ReactNode
  /** Contact value (email, phone, etc.) */
  value: string
  /** Optional label (e.g., "Email", "Phone") */
  label?: string
  /** Make value a link */
  href?: string
  /** Layout variant */
  variant?: 'horizontal' | 'vertical' | 'inline'
  /** Icon size in pixels */
  iconSize?: number
  /** Icon color */
  iconColor?: string
  /** Text color */
  textColor?: string
  /** Font size */
  fontSize?: string
  /** Show icon */
  showIcon?: boolean
  /** Gap between icon and text */
  gap?: string | number
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * ContactItem Component - Icon + text for contact info
 *
 * Combines Icon and Text atoms to create consistent contact items:
 * - Email addresses
 * - Phone numbers
 * - Locations
 * - Website URLs
 * - Social media links
 *
 * Features:
 * - Multiple layout variants (horizontal, vertical, inline)
 * - Optional labels
 * - Link support
 * - Customizable styling
 * - Word-break handling for long values
 *
 * Use this component for ALL contact information display.
 */
export const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  value,
  label,
  href,
  variant = 'horizontal',
  iconSize = 14,
  iconColor,
  textColor,
  fontSize = '12px',
  showIcon = true,
  gap = 8,
  className,
  style,
}) => {
  // Container layout styles based on variant
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: variant === 'vertical' ? 'flex-start' : 'center',
    flexDirection: variant === 'vertical' ? 'column' : 'row',
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    ...style,
  }

  // Text wrapper for handling long values
  const textWrapperStyles: React.CSSProperties = {
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    ...(variant === 'inline' && {
      display: 'inline',
    }),
  }

  const textStyles: React.CSSProperties = {
    ...(textColor && { color: textColor }),
  }

  // Render value as link or text
  const renderValue = () => {
    const content = (
      <Text size={fontSize} style={textStyles}>
        {value}
      </Text>
    )

    if (href) {
      return (
        <a
          href={href}
          style={{
            color: textColor || 'inherit',
            textDecoration: 'none',
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      )
    }

    return content
  }

  return (
    <div className={className} style={containerStyles}>
      {showIcon && (
        typeof icon === 'string' ? (
          <Icon icon={icon} size={iconSize} color={iconColor} />
        ) : (
          icon
        )
      )}
      <div style={textWrapperStyles}>
        {label && (
          <>
            <Text size={fontSize} weight="semibold" style={textStyles}>
              {label}:{' '}
            </Text>
          </>
        )}
        {renderValue()}
      </div>
    </div>
  )
}

/**
 * Specialized ContactItem variants for common contact types
 */

export const EmailContact: React.FC<Omit<ContactItemProps, 'icon' | 'href'> & { value: string }> = ({
  value,
  ...props
}) => <ContactItem icon="✉️" value={value} href={`mailto:${value}`} {...props} />

export const PhoneContact: React.FC<Omit<ContactItemProps, 'icon' | 'href'> & { value: string }> = ({
  value,
  ...props
}) => <ContactItem icon="📱" value={value} href={`tel:${value}`} {...props} />

export const LocationContact: React.FC<Omit<ContactItemProps, 'icon'> & { value: string }> = ({
  value,
  ...props
}) => <ContactItem icon="📍" value={value} {...props} />

export const WebsiteContact: React.FC<Omit<ContactItemProps, 'icon'> & { value: string; href: string }> = ({
  value,
  href,
  ...props
}) => <ContactItem icon="🌐" value={value} href={href} {...props} />

export const LinkedInContact: React.FC<Omit<ContactItemProps, 'icon'> & { value: string; href?: string }> = ({
  value,
  href,
  ...props
}) => <ContactItem icon="💼" value={value} href={href || value} {...props} />

export const GitHubContact: React.FC<Omit<ContactItemProps, 'icon'> & { value: string; href?: string }> = ({
  value,
  href,
  ...props
}) => <ContactItem icon="💻" value={value} href={href || value} {...props} />

export const PortfolioContact: React.FC<Omit<ContactItemProps, 'icon'> & { value: string; href: string }> = ({
  value,
  href,
  ...props
}) => <ContactItem icon="🎨" value={value} href={href} {...props} />
