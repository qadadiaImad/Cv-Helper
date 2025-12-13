/**
 * PROJECTSSECTION ORGANISM COMPONENT
 * Projects display with description, technologies, and links
 */

import React from 'react'
import { SectionHeader } from '../molecules/SectionHeader'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import type { Project } from '../../../lib/schemas'

export interface ProjectsSectionProps {
  data?: Project[]
  variant?: 'detailed' | 'compact' | 'grid' | 'custom'
  title?: string
  showHeader?: boolean
  headerVariant?: 'main' | 'sidebar' | 'minimal'
  showTechnologies?: boolean
  showLinks?: boolean
  primaryColor?: string
  accentColor?: string
  textColor?: string
  className?: string
  style?: React.CSSProperties
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  variant = 'detailed',
  title = 'PROJECTS',
  showHeader = true,
  headerVariant = 'main',
  showTechnologies = true,
  showLinks = true,
  primaryColor = '#1a3a52',
  accentColor = '#4a90e2',
  textColor = '#333',
  className,
  style,
}) => {
  if (!data || data.length === 0) return null

  return (
    <section className={className} style={{ marginBottom: '35px', ...style }}>
      {showHeader && (
        <SectionHeader
          title={title}
          variant={headerVariant}
          color={primaryColor}
        />
      )}
      {data.map((proj, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <Text variant="subheading" size="14px" weight="bold" color={primaryColor}>
              {proj.name}
            </Text>
            {(proj.startDate || proj.endDate) && (
              <Text variant="caption" size="10px" color="#666" style={{ whiteSpace: 'nowrap' }}>
                {proj.startDate} {proj.endDate && `- ${proj.endDate}`}
              </Text>
            )}
          </div>
          {proj.role && (
            <Text variant="caption" size="11px" color={accentColor} style={{ marginBottom: '4px' }}>
              {proj.role}
            </Text>
          )}
          <Text variant="body" size="12px" color="#555" style={{ marginBottom: '8px' }}>
            {proj.description}
          </Text>
          {proj.highlights && proj.highlights.length > 0 && (
            <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', color: '#444' }}>
              {proj.highlights.map((hl, j) => (
                <li key={j}>{hl}</li>
              ))}
            </ul>
          )}
          <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {showTechnologies && proj.technologies && proj.technologies.map((tech, k) => (
              <Badge key={k} variant="default" size="xs" background="#f0f0f0" color="#555">
                {tech}
              </Badge>
            ))}
            {showLinks && proj.url && (
              <a href={proj.url} style={{ fontSize: '10px', color: accentColor, marginLeft: '8px' }}>
                🔗 Live Demo
              </a>
            )}
            {showLinks && proj.github && (
              <a href={proj.github} style={{ fontSize: '10px', color: accentColor, marginLeft: '8px' }}>
                💻 GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
