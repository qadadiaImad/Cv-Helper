/**
 * EXECUTIVE TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Single-column professional layout matching classic resume format
 * Built using reusable organism components with custom header
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { SingleColumnLayout } from '@/components/cv-templates/templates'
import {
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  LanguagesSection,
} from '@/components/cv-templates/organisms'
import { SectionHeader } from '@/components/cv-templates/molecules/SectionHeader'
import { Text } from '@/components/cv-templates/atoms/Text'
import { ContactItem } from '@/components/cv-templates/molecules/ContactItem'

/**
 * Executive Theme Configuration
 */
const executiveTheme = {
  colors: {
    primary: '#000',
    text: '#000',
    secondaryText: '#333',
    tertiaryText: '#666',
  },
  fonts: {
    family: 'serif',
  },
}

/**
 * Custom Executive Header Component
 * Name/title on same line with two-column contact grid
 */
const ExecutiveHeader: React.FC<{ data: any }> = ({ data }) => (
  <header style={{ marginBottom: '15px' }}>
    {/* Name and Title on same line */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
      <Text
        variant="name"
        size="36px"
        weight="bold"
        color={executiveTheme.colors.primary}
        style={{ margin: 0 }}
      >
        {data.fullName}
      </Text>
      {data.title && (
        <Text
          variant="body"
          size="20px"
          color={executiveTheme.colors.secondaryText}
          style={{ fontStyle: 'italic' }}
        >
          {data.title}
        </Text>
      )}
    </div>

    {/* Contact Info - Two columns */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', marginTop: '8px' }}>
      <div>
        {data.location && (
          <ContactItem
            icon="📍"
            value={data.location}
            color={executiveTheme.colors.text}
            style={{ margin: '4px 0' }}
          />
        )}
        {data.phone && (
          <ContactItem
            icon="📱"
            value={data.phone}
            color={executiveTheme.colors.text}
            style={{ margin: '4px 0' }}
          />
        )}
      </div>
      <div>
        {data.email && (
          <ContactItem
            icon="✉️"
            value={data.email}
            color={executiveTheme.colors.text}
            style={{ margin: '4px 0' }}
          />
        )}
        {data.linkedIn && (
          <ContactItem
            icon="in"
            value={data.linkedIn}
            color={executiveTheme.colors.text}
            style={{ margin: '4px 0' }}
          />
        )}
      </div>
    </div>
  </header>
)

/**
 * Custom Executive Experience Section
 * Two-column grid with dates on left
 */
const ExecutiveExperienceSection: React.FC<{ data: any[] }> = ({ data }) => (
  <section style={{ marginBottom: '20px' }}>
    <SectionHeader
      title="Professional Experience"
      variant="minimal"
      color={executiveTheme.colors.primary}
      style={{
        fontSize: '14px',
        marginBottom: '12px',
        borderBottom: '2px solid #000',
        paddingBottom: '4px',
      }}
    />
    {data.map((exp, i) => (
      <div key={i} style={{ marginBottom: '18px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px' }}>
        <div style={{ fontSize: '10px' }}>
          <p style={{ marginBottom: '2px' }}>{exp.startDate} – {exp.endDate}</p>
          {exp.location && <p style={{ color: '#666' }}>{exp.location}</p>}
        </div>
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>{exp.position}</h3>
          <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px', color: '#333' }}>{exp.company}</p>
          {exp.achievements && exp.achievements.length > 0 && (
            <ul style={{ fontSize: '10px', lineHeight: '1.5', paddingLeft: '15px', color: '#333', margin: 0 }}>
              {exp.achievements.map((ach: string, j: number) => (
                <li key={j} style={{ marginBottom: '3px' }}>
                  {ach}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </section>
)

/**
 * Custom Executive Education Section
 * Two-column grid with dates on left
 */
const ExecutiveEducationSection: React.FC<{ data: any[] }> = ({ data }) => (
  <section style={{ marginBottom: '20px' }}>
    <SectionHeader
      title="Education"
      variant="minimal"
      color={executiveTheme.colors.primary}
      style={{
        fontSize: '14px',
        marginBottom: '12px',
        borderBottom: '2px solid #000',
        paddingBottom: '4px',
      }}
    />
    {data.map((edu, i) => (
      <div key={i} style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px' }}>
        <div style={{ fontSize: '10px' }}>
          <p style={{ marginBottom: '2px' }}>{edu.startDate} – {edu.endDate}</p>
          {edu.location && <p style={{ color: '#666' }}>{edu.location}</p>}
        </div>
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
            {edu.degree}{edu.field && ` in ${edu.field}`}
          </h3>
          <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#333' }}>{edu.institution}</p>
        </div>
      </div>
    ))}
  </section>
)

/**
 * Custom Executive Skills Section with dot indicators
 */
const ExecutiveSkillsSection: React.FC<{ data: any }> = ({ data }) => {
  const skills = data.skillCategories
    ? data.skillCategories.flatMap((cat: any) => cat.skills)
    : data.skills?.map((skill: string) => ({ name: skill, level: 'Advanced' })) || []

  if (skills.length === 0) return null

  const getLevelValue = (level: string) => {
    switch (level) {
      case 'Expert': return 5
      case 'Advanced': return 4
      case 'Intermediate': return 3
      case 'Beginner': return 2
      default: return 4
    }
  }

  return (
    <section style={{ marginBottom: '20px' }}>
      <SectionHeader
        title="Skills"
        variant="minimal"
        color={executiveTheme.colors.primary}
        style={{
          fontSize: '14px',
          marginBottom: '12px',
          borderBottom: '2px solid #000',
          paddingBottom: '4px',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px' }}>
        {skills.map((skill: any, i: number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
            <span>{typeof skill === 'string' ? skill : skill.name}</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1, 2, 3, 4, 5].map(dot => (
                <span
                  key={dot}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: dot <= (typeof skill === 'string' ? 4 : getLevelValue(skill.level)) ? '#000' : '#fff',
                    border: '1px solid #000',
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const ExecutiveRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 Executive (Refactored) template rendering with:', data.personal?.fullName)

  const content = (
    <>
      {/* Custom Header */}
      <ExecutiveHeader data={data.personal} />

      {/* Summary Section */}
      {data.summary && (
        <SummarySection
          data={data.summary}
          title="Profile"
          showHeader
          headerVariant="minimal"
          primaryColor={executiveTheme.colors.primary}
          textColor={executiveTheme.colors.text}
          textAlign="justify"
          style={{
            marginBottom: '20px',
            '& h2': {
              fontSize: '14px',
              borderBottom: '2px solid #000',
              paddingBottom: '4px',
              marginBottom: '8px',
            },
            '& div': {
              fontSize: '11px',
              lineHeight: '1.6',
            },
          }}
        />
      )}

      {/* Experience - Custom Grid Layout */}
      <ExecutiveExperienceSection data={data.experience} />

      {/* Education - Custom Grid Layout */}
      <ExecutiveEducationSection data={data.education} />

      {/* Skills - Custom Dot Indicators */}
      <ExecutiveSkillsSection data={data} />

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <SectionHeader
            title="Languages"
            variant="minimal"
            color={executiveTheme.colors.primary}
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              borderBottom: '2px solid #000',
              paddingBottom: '4px',
            }}
          />
          <div style={{ fontSize: '10px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {data.languages.map((lang, i) => (
              <span key={i}>• {lang.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <SectionHeader
            title="Awards"
            variant="minimal"
            color={executiveTheme.colors.primary}
            style={{
              fontSize: '14px',
              marginBottom: '12px',
              borderBottom: '2px solid #000',
              paddingBottom: '4px',
            }}
          />
          {data.awards.map((award, i) => (
            <div key={i} style={{ fontSize: '11px', marginBottom: '8px' }}>
              <p style={{ fontWeight: 'bold' }}>{award.title}</p>
              <p style={{ fontStyle: 'italic', color: '#666' }}>{award.issuer}</p>
            </div>
          ))}
        </section>
      )}

      {/* Custom Sections */}
      {data.customSections && data.customSections.length > 0 && (
        data.customSections.map((section, i) => (
          <section key={i}>
            <SectionHeader
              title={section.title}
              variant="minimal"
              color={executiveTheme.colors.primary}
              style={{
                fontSize: '14px',
                marginBottom: '12px',
                borderBottom: '2px solid #000',
                paddingBottom: '4px',
              }}
            />
            <div style={{ fontSize: '11px' }}>
              {typeof section.content === 'string' ? (
                <p style={{ fontStyle: 'italic' }}>{section.content}</p>
              ) : (
                section.content.map((line: string, j: number) => (
                  <p key={j} style={{ marginBottom: '4px', fontStyle: 'italic' }}>
                    {line}
                  </p>
                ))
              )}
            </div>
          </section>
        ))
      )}
    </>
  )

  return (
    <SingleColumnLayout
      content={content}
      maxWidth="850px"
      padding="50px 60px"
      backgroundColor="#ffffff"
      textColor={executiveTheme.colors.text}
      fontFamily={executiveTheme.fonts.family}
      minHeight="1200px"
    />
  )
}
