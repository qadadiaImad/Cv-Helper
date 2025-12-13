/**
 * SUMMARYSECTION ORGANISM COMPONENT
 * Professional summary or objective statement
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { HtmlRenderer } from '../../builder/html-renderer'

export interface SummarySectionProps {
  data?: string
  title?: string
  showHeader?: boolean
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  primaryColor?: string
  textColor?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  className?: string
  style?: React.CSSProperties
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  data,
  title = 'PROFESSIONAL SUMMARY',
  showHeader = true,
  headerVariant = 'main',
  primaryColor = '#1a3a52',
  textColor = '#333',
  textAlign = 'justify',
  className,
  style,
}) => {
  if (!data) return null

  return (
    <section className={className} style={{ marginBottom: '35px', ...style }}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={primaryColor}
        />
      )}
      <HtmlRenderer
        html={data}
        as="div"
        style={{
          fontSize: '13px',
          lineHeight: '1.7',
          color: textColor,
          textAlign,
        }}
      />
    </section>
  )
}
