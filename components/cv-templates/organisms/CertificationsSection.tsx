/**
 * CERTIFICATIONSSECTION ORGANISM COMPONENT
 * Certifications display with issuer, date, and credential information
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import type { Certification } from '@/lib/schemas'

export interface CertificationsSectionProps {
  data?: Certification[]
  variant?: 'sidebar' | 'detailed' | 'compact' | 'custom'
  title?: string
  showHeader?: boolean
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  showCredentialId?: boolean
  showExpiry?: boolean
  textColor?: string
  accentColor?: string
  className?: string
  style?: React.CSSProperties
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  data,
  variant = 'sidebar',
  title = 'CERTIFICATIONS',
  showHeader = true,
  headerVariant = 'sidebar',
  showCredentialId = true,
  showExpiry = true,
  textColor = '#ffffff',
  accentColor = '#4a90e2',
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  return (
    <div className={className} style={{ fontSize: '11px', ...style }}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={textColor}
        />
      )}
      {data.map((cert, i) => (
        <div
          key={i}
          style={{
            marginBottom: '10px',
            paddingBottom: '10px',
            borderBottom: i < data.length - 1 ? `1px solid rgba(255,255,255,0.1)` : 'none',
          }}
        >
          <Text variant="body" weight={600} color={textColor} style={{ marginBottom: '4px' }}>
            {cert.name}
          </Text>
          <Text variant="caption" size="10px" color={textColor} style={{ opacity: 0.8 }}>
            {cert.issuer}
          </Text>
          <Text variant="caption" size="10px" color={textColor} style={{ opacity: 0.7 }}>
            {cert.date}
            {showExpiry && cert.expiryDate && ` - ${cert.expiryDate}`}
          </Text>
          {showCredentialId && cert.credentialId && (
            <Text variant="caption" size="9px" color={textColor} style={{ opacity: 0.6, marginTop: '2px' }}>
              ID: {cert.credentialId}
            </Text>
          )}
          {cert.url && (
            <a href={cert.url} style={{ opacity: 0.9, fontSize: '9px', color: accentColor, display: 'block', marginTop: '2px' }}>
              🔗 Verify
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
