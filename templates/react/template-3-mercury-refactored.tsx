/**
 * MERCURY TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Professional layout with photo on left and gray section backgrounds
 * Built using SectionedLayout and reusable organism components
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { SectionedLayout } from '@/components/cv-templates/templates'
import type { LayoutSection } from '@/components/cv-templates/templates'
import { Avatar } from '@/components/cv-templates/atoms/Avatar'
import { Text } from '@/components/cv-templates/atoms/Text'
import { ContactItem } from '@/components/cv-templates/molecules/ContactItem'
import { SummarySection } from '@/components/cv-templates/organisms'

/**
 * Mercury Theme Configuration
 */
const mercuryTheme = {
  colors: {
    primary: '#2c2c2c',
    text: '#5a5a5a',
    secondaryText: '#6a6a6a',
    titleBar: '#d9d9d9',
    titleText: '#4a4a4a',
    sectionBg: '#fff',
    containerBg: '#e8e8e8',
  },
  fonts: {
    family: 'Georgia, serif',
  },
}

/**
 * Custom Mercury Header Component
 * Photo on left, info on right
 */
const MercuryHeader: React.FC<{ data: any }> = ({ data }) => (
  <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
    {/* Photo */}
    {data.photo?.url && !data.photo?.effects?.hidden && (
      <Avatar
        src={data.photo.url}
        alt={data.fullName}
        size={140}
        borderRadius={50}
        grayscale={data.photo.effects?.grayscale}
        style={{
          flexShrink: 0,
          backgroundColor: '#fff',
        }}
      />
    )}

    {/* Info */}
    <div style={{ flex: 1 }}>
      <Text
        variant="name"
        size="32px"
        weight="bold"
        color={mercuryTheme.colors.primary}
        style={{ marginBottom: '4px' }}
      >
        {data.fullName}
      </Text>
      {data.title && (
        <Text
          variant="body"
          size="16px"
          color={mercuryTheme.colors.secondaryText}
          style={{ marginBottom: '15px' }}
        >
          {data.title}
        </Text>
      )}

      {/* Contact Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
        {data.email && (
          <ContactItem
            icon="✉"
            value={data.email}
            color={mercuryTheme.colors.text}
          />
        )}
        {data.phone && (
          <ContactItem
            icon="📞"
            value={data.phone}
            color={mercuryTheme.colors.text}
          />
        )}
        {data.location && (
          <ContactItem
            icon="📍"
            value={data.location}
            color={mercuryTheme.colors.text}
          />
        )}
        {data.linkedIn && (
          <ContactItem
            icon="in"
            value={data.linkedIn}
            color={mercuryTheme.colors.text}
          />
        )}
        {data.website && (
          <ContactItem
            icon="🔗"
            value={data.website}
            color={mercuryTheme.colors.text}
          />
        )}
      </div>
    </div>
  </div>
)

/**
 * Experience Section with Grid Layout
 */
const MercuryExperienceSection: React.FC<{ data: any[] }> = ({ data }) => (
  <>
    {data.map((exp, i) => (
      <div key={i} style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px' }}>
        <div style={{ fontSize: '10px', color: mercuryTheme.colors.secondaryText }}>
          <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>{exp.startDate} – {exp.endDate}</p>
          {exp.location && <p>{exp.location}</p>}
        </div>
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: mercuryTheme.colors.primary }}>
            {exp.company}
          </h3>
          <p style={{ fontSize: '11px', marginBottom: '8px', color: mercuryTheme.colors.text }}>{exp.position}</p>
          {exp.achievements && exp.achievements.length > 0 && (
            <ul style={{ fontSize: '10px', lineHeight: '1.6', paddingLeft: '15px', color: mercuryTheme.colors.secondaryText, margin: 0 }}>
              {exp.achievements.map((ach: string, j: number) => (
                <li key={j} style={{ marginBottom: '4px' }}>
                  {ach}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    ))}
  </>
)

/**
 * Education Section with Grid Layout
 */
const MercuryEducationSection: React.FC<{ data: any[] }> = ({ data }) => (
  <>
    {data.map((edu, i) => (
      <div key={i} style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px' }}>
        <div style={{ fontSize: '10px', color: mercuryTheme.colors.secondaryText }}>
          <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>{edu.startDate} – {edu.endDate}</p>
          {edu.location && <p>{edu.location}</p>}
        </div>
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: mercuryTheme.colors.primary }}>
            {edu.degree}{edu.field && ` in ${edu.field}`}
          </h3>
          <p style={{ fontSize: '11px', color: mercuryTheme.colors.text }}>{edu.institution}</p>
        </div>
      </div>
    ))}
  </>
)

/**
 * Skills Section with 3-column Grid
 */
const MercurySkillsSection: React.FC<{ data: any }> = ({ data }) => {
  const skills = data.skillCategories
    ? data.skillCategories.flatMap((cat: any) => cat.skills.map((s: any) => s.name))
    : data.skills || []

  if (skills.length === 0) return null

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 30px' }}>
      {skills.map((skill: string, i: number) => (
        <div key={i} style={{ fontSize: '10px', color: mercuryTheme.colors.text }}>
          • {skill}
        </div>
      ))}
    </div>
  )
}

/**
 * Languages Section with Centered Dot Indicators
 */
const MercuryLanguagesSection: React.FC<{ data: any[] }> = ({ data }) => {
  const getProficiencyLevel = (proficiency: string) => {
    if (['Native', 'Fluent'].includes(proficiency)) return 5
    if (['Professional'].includes(proficiency)) return 4
    return 3
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '80px' }}>
      {data.map((lang, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map(dot => (
              <div
                key={dot}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: dot <= getProficiencyLevel(lang.proficiency) ? '#4a4a4a' : '#d9d9d9',
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '11px', color: mercuryTheme.colors.text }}>{lang.name}</p>
        </div>
      ))}
    </div>
  )
}

export const MercuryRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 Mercury (Refactored) template rendering with:', data.personal?.fullName)

  // Build sections array
  const sections: LayoutSection[] = []

  // Profile/Summary section
  if (data.summary) {
    sections.push({
      title: 'Profile',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      content: (
        <SummarySection
          data={data.summary}
          showHeader={false}
          textColor={mercuryTheme.colors.text}
          textAlign="justify"
          style={{
            fontSize: '11px',
            lineHeight: '1.7',
          }}
        />
      ),
    })
  }

  // Work Experience section
  if (data.experience && data.experience.length > 0) {
    sections.push({
      title: 'Work Experience',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      content: <MercuryExperienceSection data={data.experience} />,
    })
  }

  // Education section
  if (data.education && data.education.length > 0) {
    sections.push({
      title: 'Education',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      content: <MercuryEducationSection data={data.education} />,
    })
  }

  // Skills section
  if ((data.skillCategories || data.skills) && (data.skillCategories?.length > 0 || data.skills?.length > 0)) {
    sections.push({
      title: 'Skills',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      content: <MercurySkillsSection data={data} />,
    })
  }

  // Languages section
  if (data.languages && data.languages.length > 0) {
    sections.push({
      title: 'Languages',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      padding: '20px 60px',
      content: <MercuryLanguagesSection data={data.languages} />,
    })
  }

  // Awards section
  if (data.awards && data.awards.length > 0) {
    sections.push({
      title: 'Awards',
      titleBackground: mercuryTheme.colors.titleBar,
      titleColor: mercuryTheme.colors.titleText,
      background: mercuryTheme.colors.sectionBg,
      padding: '20px 60px',
      content: (
        <>
          {data.awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: mercuryTheme.colors.primary, marginBottom: '2px' }}>
                {award.title}
              </p>
              <p style={{ fontSize: '10px', color: mercuryTheme.colors.secondaryText, fontStyle: 'italic' }}>
                {award.issuer}, {award.date}
              </p>
            </div>
          ))}
        </>
      ),
    })
  }

  return (
    <SectionedLayout
      header={<MercuryHeader data={data.personal} />}
      sections={sections}
      headerBackground={mercuryTheme.colors.containerBg}
      headerPadding="50px 60px 40px"
      containerBackground={mercuryTheme.colors.containerBg}
      maxWidth="850px"
      fontFamily={mercuryTheme.fonts.family}
      textColor={mercuryTheme.colors.text}
      minHeight="1200px"
    />
  )
}
