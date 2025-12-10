/**
 * LANGUAGESSECTION ORGANISM COMPONENT
 * Languages display with proficiency indicators
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import { ProgressBar, proficiencyToValue } from '../atoms/ProgressBar'
import type { Language } from '@/lib/schemas'

export interface LanguagesSectionProps {
  data?: Language[]
  variant?: 'sidebar' | 'detailed' | 'compact' | 'custom'
  title?: string
  showHeader?: boolean
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  showProficiency?: boolean
  indicatorType?: 'bar' | 'dots' | 'segments'
  textColor?: string
  accentColor?: string
  className?: string
  style?: React.CSSProperties
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  data,
  variant = 'sidebar',
  title = 'LANGUAGES',
  showHeader = true,
  headerVariant = 'sidebar',
  showProficiency = true,
  indicatorType = 'segments',
  textColor = '#ffffff',
  accentColor = '#4a90e2',
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  return (
    <div className={className} style={{ fontSize: '12px', ...style }}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={textColor}
        />
      )}
      {data.map((lang, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <Text variant="body" weight={600} color={textColor} style={{ marginBottom: '2px' }}>
            {lang.name}
          </Text>
          {showProficiency && lang.proficiency && (
            <ProgressBar
              value={proficiencyToValue(lang.proficiency)}
              max={5}
              variant={indicatorType}
              height={4}
              width="150px"
              color={accentColor}
              backgroundColor="rgba(255,255,255,0.2)"
            />
          )}
        </div>
      ))}
    </div>
  )
}
