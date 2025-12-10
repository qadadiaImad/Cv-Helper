/**
 * HARVARD TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Minimal clean academic design - Education first
 * Built using SingleColumnLayout and reusable organism components
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { SingleColumnLayout } from '@/components/cv-templates/templates'
import {
  SummarySection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/cv-templates/organisms'
import { Text } from '@/components/cv-templates/atoms/Text'

/**
 * Harvard Theme Configuration
 */
const harvardTheme = {
  colors: {
    primary: '#000',
    text: '#000',
    secondaryText: '#333',
    tertiaryText: '#666',
  },
  fonts: {
    family: 'Helvetica, Arial, sans-serif',
  },
}

/**
 * Custom Harvard Header Component
 * Simple centered header with pipe-separated contact info
 */
const HarvardHeader: React.FC<{ data: any }> = ({ data }) => (
  <header style={{
    marginBottom: '35px',
    textAlign: 'center',
    borderBottom: '1px solid #000',
    paddingBottom: '15px',
  }}>
    <Text
      variant="name"
      size="28px"
      weight="normal"
      color={harvardTheme.colors.primary}
      style={{ marginBottom: '10px', letterSpacing: '0.5px' }}
    >
      {data.fullName}
    </Text>
    <div style={{
      fontSize: '11px',
      color: harvardTheme.colors.tertiaryText,
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      flexWrap: 'wrap',
    }}>
      <span>{data.email}</span>
      <span>|</span>
      <span>{data.phone}</span>
      {data.location && (
        <>
          <span>|</span>
          <span>{data.location}</span>
        </>
      )}
      {data.linkedIn && (
        <>
          <span>|</span>
          <span>{data.linkedIn}</span>
        </>
      )}
    </div>
  </header>
)

export const HarvardRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 Harvard (Refactored) template rendering with:', data.personal?.fullName)

  const content = (
    <>
      {/* Custom Header */}
      <HarvardHeader data={data.personal} />

      {/* Education First (Academic style) */}
      {data.education && data.education.length > 0 && (
        <EducationSection
          data={data.education}
          variant="detailed"
          title="Education"
          showHeader
          headerVariant="minimal"
          showGPA
          showHonors
          showCoursework
          primaryColor={harvardTheme.colors.primary}
          accentColor={harvardTheme.colors.primary}
          textColor={harvardTheme.colors.text}
          style={{
            marginBottom: '30px',
            '& h2': {
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            },
          }}
        />
      )}

      {/* Skills Section */}
      {(data.skillCategories || data.skills) && (
        <SkillsSection
          data={data.skillCategories || data.skills}
          variant={data.skillCategories ? 'categorized' : 'list'}
          title={data.skillCategories ? 'Technical Skills' : 'Skills'}
          showHeader
          headerVariant="minimal"
          textColor={harvardTheme.colors.secondaryText}
          accentColor={harvardTheme.colors.primary}
          style={{
            marginBottom: '30px',
            '& h2': {
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            },
          }}
        />
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <ExperienceSection
          data={data.experience}
          variant="detailed"
          title="Professional Experience"
          showHeader
          headerVariant="minimal"
          showTechnologies
          showDescription
          showAchievements
          primaryColor={harvardTheme.colors.primary}
          accentColor={harvardTheme.colors.primary}
          textColor={harvardTheme.colors.text}
          style={{
            marginBottom: '30px',
            '& h2': {
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            },
          }}
        />
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <ProjectsSection
          data={data.projects}
          variant="detailed"
          title="Projects"
          showHeader
          headerVariant="minimal"
          showTechnologies
          showLinks
          primaryColor={harvardTheme.colors.primary}
          accentColor={harvardTheme.colors.primary}
          textColor={harvardTheme.colors.text}
          style={{
            marginBottom: '30px',
            '& h2': {
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            },
          }}
        />
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            LANGUAGES
          </h2>
          <p style={{ fontSize: '11px', lineHeight: '1.6', color: harvardTheme.colors.secondaryText }}>
            {data.languages.map((lang: any, i: number) => (
              <span key={i}>
                {lang.name} ({lang.proficiency})
                {i < data.languages!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </section>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            AWARDS & HONORS
          </h2>
          {data.awards.map((award: any, i: number) => (
            <div key={i} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                {award.title}
              </p>
              <p style={{ color: harvardTheme.colors.tertiaryText }}>
                {award.issuer} • {award.date}
              </p>
            </div>
          ))}
        </section>
      )}
    </>
  )

  return (
    <SingleColumnLayout
      content={content}
      maxWidth="800px"
      padding="50px 40px"
      backgroundColor="#ffffff"
      textColor={harvardTheme.colors.text}
      fontFamily={harvardTheme.fonts.family}
      minHeight="1200px"
    />
  )
}
