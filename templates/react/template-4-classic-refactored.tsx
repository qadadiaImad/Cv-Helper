/**
 * CLASSIC TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Traditional right-aligned header with clean layout
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
 * Classic Theme Configuration
 */
const classicTheme = {
  colors: {
    primary: '#000',
    text: '#000',
    secondaryText: '#333',
    tertiaryText: '#555',
    quaternaryText: '#666',
  },
  fonts: {
    family: 'Times New Roman, serif',
  },
}

/**
 * Custom Classic Header Component
 * Name/title on left, contact info right-aligned
 */
const ClassicHeader: React.FC<{ data: any }> = ({ data }) => (
  <header style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #000' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
      {/* Name and Title */}
      <div style={{ flex: 1 }}>
        <Text
          variant="name"
          size="32px"
          weight="bold"
          color={classicTheme.colors.primary}
          style={{ marginBottom: '6px', lineHeight: '1.2' }}
        >
          {data.fullName}
        </Text>
        {data.title && (
          <Text
            variant="body"
            size="16px"
            color={classicTheme.colors.tertiaryText}
            style={{ fontStyle: 'italic' }}
          >
            {data.title}
          </Text>
        )}
      </div>

      {/* Contact Info - Right aligned */}
      <div style={{ textAlign: 'right', fontSize: '11px', lineHeight: '1.6', minWidth: '200px' }}>
        {data.email && <p style={{ margin: '2px 0' }}>{data.email}</p>}
        {data.phone && <p style={{ margin: '2px 0' }}>{data.phone}</p>}
        {data.location && <p style={{ margin: '2px 0' }}>{data.location}</p>}
        {data.linkedIn && <p style={{ margin: '2px 0' }}>{data.linkedIn}</p>}
        {data.website && <p style={{ margin: '2px 0' }}>{data.website}</p>}
      </div>
    </div>
  </header>
)

export const ClassicRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 Classic (Refactored) template rendering with:', data.personal?.fullName)

  const content = (
    <>
      {/* Custom Header */}
      <ClassicHeader data={data.personal} />

      {/* Summary Section */}
      {data.summary && (
        <SummarySection
          data={data.summary}
          title="PROFESSIONAL SUMMARY"
          showHeader
          headerVariant="minimal"
          primaryColor={classicTheme.colors.primary}
          textColor={classicTheme.colors.secondaryText}
          textAlign="justify"
          style={{
            marginBottom: '25px',
          }}
        />
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <ExperienceSection
          data={data.experience}
          variant="detailed"
          title="EXPERIENCE"
          showHeader
          headerVariant="minimal"
          showTechnologies
          showDescription
          showAchievements
          primaryColor={classicTheme.colors.primary}
          accentColor={classicTheme.colors.primary}
          textColor={classicTheme.colors.secondaryText}
          style={{
            marginBottom: '25px',
            '& h2': {
              textTransform: 'uppercase',
              letterSpacing: '1px',
            },
          }}
        />
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <EducationSection
          data={data.education}
          variant="detailed"
          title="EDUCATION"
          showHeader
          headerVariant="minimal"
          showGPA
          showHonors
          showCoursework={false}
          primaryColor={classicTheme.colors.primary}
          accentColor={classicTheme.colors.primary}
          textColor={classicTheme.colors.secondaryText}
          style={{
            marginBottom: '25px',
          }}
        />
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <ProjectsSection
          data={data.projects}
          variant="detailed"
          title="PROJECTS"
          showHeader
          headerVariant="minimal"
          showTechnologies
          showLinks
          primaryColor={classicTheme.colors.primary}
          accentColor={classicTheme.colors.primary}
          textColor={classicTheme.colors.secondaryText}
          style={{
            marginBottom: '25px',
          }}
        />
      )}

      {/* Skills Section */}
      {(data.skills || data.skillCategories) && (
        <SkillsSection
          data={data.skills || data.skillCategories}
          variant={data.skillCategories ? 'categorized' : 'list'}
          title="SKILLS"
          showHeader
          headerVariant="minimal"
          textColor={classicTheme.colors.secondaryText}
          accentColor={classicTheme.colors.primary}
          style={{
            marginBottom: '25px',
          }}
        />
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            LANGUAGES
          </h2>
          <div style={{ fontSize: '11px', color: classicTheme.colors.secondaryText }}>
            {data.languages.map((lang: any, i: number) => (
              <span key={i}>
                {lang.name} ({lang.proficiency})
                {i < data.languages!.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            CERTIFICATIONS
          </h2>
          {data.certifications.map((cert: any, i: number) => (
            <div key={i} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <p style={{ fontWeight: 'bold', color: classicTheme.colors.primary }}>
                {cert.name}
              </p>
              <p style={{ color: classicTheme.colors.secondaryText }}>
                {cert.issuer} • {cert.date}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            AWARDS & HONORS
          </h2>
          {data.awards.map((award: any, i: number) => (
            <div key={i} style={{ marginBottom: '10px', fontSize: '11px' }}>
              <p style={{ fontWeight: 'bold', color: classicTheme.colors.primary }}>
                {award.title}
              </p>
              <p style={{ color: classicTheme.colors.secondaryText }}>
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
      maxWidth="850px"
      padding="40px 50px"
      backgroundColor="#ffffff"
      textColor={classicTheme.colors.text}
      fontFamily={classicTheme.fonts.family}
      minHeight="1200px"
    />
  )
}
