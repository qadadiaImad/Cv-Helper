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
import type { PersonalInfo } from '../../../lib/schemas'

export interface PersonalInfoSectionProps {
  /** Personal information data */
  data: PersonalInfo
  /** Visual variant */
  variant?: 'sidebar' | 'header' | 'inline' | 'custom'
  /** Show profile photo */
  showPhoto?: boolean
  /** Show contact information */
  showContact?: boolean
  /** Show summary/bio */
  showSummary?: boolean
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right'
  /** Background color */
  backgroundColor?: string
  /** Text color */
  textColor?: string
  /** Accent color for contact icons */
  accentColor?: string
  /** Name font size */
  nameSize?: string
  /** Name font weight */
  nameWeight?: number
  /** Name letter spacing */
  nameLetterSpacing?: string
  /** Title font size */
  titleSize?: string
  /** Title font weight */
  titleWeight?: number
  /** Title letter spacing */
  titleLetterSpacing?: string
  /** Title text transform */
  titleTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  /** Title color (overrides textColor) */
  titleColor?: string
  /** Summary color */
  summaryColor?: string
  /** Summary font size */
  summarySize?: string
  /** Summary line height */
  summaryLineHeight?: string
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
  showSummary = false,
  textAlign,
  backgroundColor,
  textColor = '#ffffff',
  accentColor = '#4a90e2',
  nameSize,
  nameWeight,
  nameLetterSpacing,
  titleSize,
  titleWeight,
  titleLetterSpacing,
  titleTransform = 'none',
  titleColor,
  summaryColor,
  summarySize,
  summaryLineHeight,
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
        <h1 style={{
          fontSize: nameSize || preset.nameSize || '32px',
          fontWeight: nameWeight || 'bold',
          letterSpacing: nameLetterSpacing || 'normal',
          color: textColor,
          margin: '0 0 10px 0',
          lineHeight: '1.2',
        }}>
          {data.fullName}
        </h1>
        {data.title && (
          <h2 style={{
            fontSize: titleSize || preset.titleSize || '18px',
            fontWeight: titleWeight || 400,
            letterSpacing: titleLetterSpacing || 'normal',
            textTransform: titleTransform,
            color: titleColor || textColor,
            margin: '0 0 25px 0',
          }}>
            {data.title}
          </h2>
        )}
      </div>

      {/* Summary */}
      {showSummary && data.summary && (
        <div style={{
          fontSize: summarySize || '13px',
          lineHeight: summaryLineHeight || '1.8',
          color: summaryColor || textColor,
          margin: 0,
          maxWidth: '90%',
          textAlign: resolvedTextAlign,
        }}>
          {data.summary}
        </div>
      )}

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
