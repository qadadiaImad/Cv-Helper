/**
 * PERSONALINFOSECTION ORGANISM COMPONENT
 * Complete personal information display with photo, name, title, and contact details
 *
 * @example
 * ```tsx
 * <PersonalInfoSection
 *   data={data.personal}
 *   variant="sidebar"
 *   theme={atlanticBlueTheme}
 *   showPhoto
 *   showContact
 * />
 * ```
 */

import React from 'react'
import { Avatar } from '../atoms/Avatar'
import { Text } from '../atoms/Text'
import { ContactItem } from '../molecules/ContactItem'
import type { PersonalInfo } from '@/lib/schemas'

export interface PersonalInfoSectionProps {
  /** Personal information data */
  data: PersonalInfo
  /** Visual variant */
  variant?: 'sidebar' | 'header' | 'inline' | 'custom'
  /** Show profile photo */
  showPhoto?: boolean
  /** Show contact information */
  showContact?: boolean
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right'
  /** Background color */
  backgroundColor?: string
  /** Text color */
  textColor?: string
  /** Accent color for contact icons */
  accentColor?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * Variant presets for different contexts
 */
const VARIANT_PRESETS = {
  sidebar: {
    textAlign: 'center' as const,
    showPhoto: true,
    showContact: true,
    photoSize: 120,
    nameSize: '24px',
    titleSize: '14px',
    contactSize: '12px',
    gap: '30px',
  },
  header: {
    textAlign: 'center' as const,
    showPhoto: true,
    showContact: true,
    photoSize: 100,
    nameSize: '32px',
    titleSize: '18px',
    contactSize: '13px',
    gap: '20px',
  },
  inline: {
    textAlign: 'left' as const,
    showPhoto: false,
    showContact: false,
    nameSize: '28px',
    titleSize: '16px',
    gap: '10px',
  },
  custom: {},
} as const

/**
 * PersonalInfoSection Component - Personal information display
 *
 * Combines Avatar, Text, and ContactItem molecules for complete personal info:
 * - Profile photo (optional, configurable)
 * - Full name and professional title
 * - Contact details (email, phone, location, social links)
 *
 * Features:
 * - Multiple variants for different template contexts
 * - Flexible photo configuration (size, border, effects)
 * - Customizable layout and styling
 * - Responsive contact information display
 *
 * Variants:
 * - **sidebar**: Centered, compact layout for sidebar placement
 * - **header**: Larger, centered layout for template headers
 * - **inline**: Left-aligned, minimal layout without photo
 * - **custom**: Full control via props
 */
export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  data,
  variant = 'sidebar',
  showPhoto,
  showContact,
  textAlign,
  backgroundColor,
  textColor = '#ffffff',
  accentColor = '#4a90e2',
  className,
  style,
}) => {
  const preset = VARIANT_PRESETS[variant]
  
  const resolvedShowPhoto = showPhoto !== undefined ? showPhoto : preset.showPhoto
  const resolvedShowContact = showContact !== undefined ? showContact : preset.showContact
  const resolvedTextAlign = textAlign || preset.textAlign

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: preset.gap || '20px',
    backgroundColor,
    ...style,
  }

  const nameContainerStyles: React.CSSProperties = {
    textAlign: resolvedTextAlign,
  }

  return (
    <div className={className} style={containerStyles}>
      {/* Profile Photo */}
      {resolvedShowPhoto && data.photo?.url && !data.photo?.effects?.hidden && (
        <Avatar
          src={data.photo.url}
          alt={data.fullName}
          size={data.photo.size || preset.photoSize || 120}
          borderRadius={data.photo.borderRadius ?? 50}
          grayscale={data.photo.effects?.grayscale}
          border={data.photo.effects?.border}
          style={{ margin: resolvedTextAlign === 'center' ? '0 auto' : undefined }}
        />
      )}

      {/* Name & Title */}
      <div style={nameContainerStyles}>
        <Text
          variant="name"
          size={preset.nameSize}
          weight="bold"
          color={textColor}
          style={{ marginBottom: '8px', lineHeight: '1.2' }}
        >
          {data.fullName}
        </Text>
        {data.title && (
          <Text
            variant="body"
            size={preset.titleSize}
            weight={300}
            color={textColor}
            style={{ opacity: 0.9 }}
          >
            {data.title}
          </Text>
        )}
      </div>

      {/* Contact Information */}
      {resolvedShowContact && (
        <div style={{ fontSize: preset.contactSize || '12px', lineHeight: '1.8' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.email && (
              <ContactItem
                icon="✉️"
                value={data.email}
                color={textColor}
                style={{ wordBreak: 'break-word' }}
              />
            )}
            {data.phone && (
              <ContactItem
                icon="📱"
                value={data.phone}
                color={textColor}
              />
            )}
            {data.location && (
              <ContactItem
                icon="📍"
                value={data.location}
                color={textColor}
              />
            )}
            {data.website && (
              <ContactItem
                icon="🌐"
                value={data.website}
                color={textColor}
              />
            )}
            {data.linkedIn && (
              <ContactItem
                icon="💼"
                value={data.linkedIn}
                color={textColor}
              />
            )}
            {data.github && (
              <ContactItem
                icon="💻"
                value={data.github}
                color={textColor}
              />
            )}
            {data.portfolio && (
              <ContactItem
                icon="🎨"
                value={data.portfolio}
                color={textColor}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
