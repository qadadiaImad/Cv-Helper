/**
 * EVERGREEN TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Two-column layout with dark header, photo on left, and skill progress bars
 * Built using custom layout and reusable organism components
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import {
  SummarySection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  SkillsSection,
} from '@/components/cv-templates/organisms'
import { Avatar } from '@/components/cv-templates/atoms/Avatar'
import { Text } from '@/components/cv-templates/atoms/Text'
import { ContactItem } from '@/components/cv-templates/molecules/ContactItem'

/**
 * Evergreen Theme Configuration
 */
const evergreenTheme = {
  colors: {
    header: '#546975',
    headerText: '#ffffff',
    sidebar: '#f5f3f0',
    sidebarText: '#333',
    mainBg: '#ffffff',
    mainText: '#333',
    accent: '#546975',
  },
  fonts: {
    family: 'Arial, sans-serif',
  },
}

/**
 * Custom Evergreen Header Component
 * Dark header with photo and contact grid
 */
const EvergreenHeader: React.FC<{ data: any }> = ({ data }) => (
  <header style={{
    backgroundColor: evergreenTheme.colors.header,
    color: evergreenTheme.colors.headerText,
    padding: '40px 50px',
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  }}>
    {/* Photo */}
    {data.photo?.url && !data.photo?.effects?.hidden && (
      <Avatar
        src={data.photo.url}
        alt={data.fullName}
        size={130}
        borderRadius={50}
        grayscale={data.photo.effects?.grayscale}
        style={{
          flexShrink: 0,
          backgroundColor: '#fff',
          border: '5px solid rgba(255,255,255,0.2)',
        }}
      />
    )}

    {/* Name and Contact */}
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: '15px' }}>
        <Text
          variant="name"
          size="36px"
          weight="bold"
          color={evergreenTheme.colors.headerText}
          style={{ margin: '0 0 5px 0', display: 'inline' }}
        >
          {data.fullName}
        </Text>
        {data.title && (
          <Text
            variant="body"
            size="20px"
            weight={300}
            color={evergreenTheme.colors.headerText}
            style={{ marginLeft: '15px', display: 'inline' }}
          >
            {data.title}
          </Text>
        )}
      </div>

      {/* Contact Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
        {data.email && (
          <ContactItem
            icon="✉"
            value={data.email}
            color={evergreenTheme.colors.headerText}
          />
        )}
        {data.phone && (
          <ContactItem
            icon="📞"
            value={data.phone}
            color={evergreenTheme.colors.headerText}
          />
        )}
        {data.linkedIn && (
          <ContactItem
            icon="in"
            value={data.linkedIn}
            color={evergreenTheme.colors.headerText}
          />
        )}
        {data.location && (
          <div style={{ gridColumn: '1 / -1' }}>
            <ContactItem
              icon="📍"
              value={data.location}
              color={evergreenTheme.colors.headerText}
            />
          </div>
        )}
      </div>
    </div>
  </header>
)

export const EvergreenRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 Evergreen (Refactored) template rendering with:', data.personal?.fullName)

  return (
    <div style={{
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      fontFamily: evergreenTheme.fonts.family,
      backgroundColor: '#fff',
      color: evergreenTheme.colors.mainText,
      minHeight: '1200px',
    }}>
      {/* Header */}
      <EvergreenHeader data={data.personal} />

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr' }}>
        {/* Left Sidebar - Beige */}
        <aside style={{
          backgroundColor: evergreenTheme.colors.sidebar,
          padding: '40px 35px',
        }}>
          {/* Profile/Summary */}
          {data.summary && (
            <SummarySection
              data={data.summary}
              title="Profile"
              showHeader
              headerVariant="minimal"
              primaryColor={evergreenTheme.colors.sidebarText}
              textColor={evergreenTheme.colors.sidebarText}
              textAlign="justify"
              style={{
                marginBottom: '35px',
                '& h2': {
                  fontSize: '16px',
                  marginBottom: '15px',
                },
                '& div': {
                  fontSize: '11px',
                  lineHeight: '1.6',
                },
              }}
            />
          )}

          {/* Skills */}
          {(data.skillCategories || data.skills) && (
            <SkillsSection
              data={data.skillCategories || data.skills}
              variant={data.skillCategories ? 'categorized' : 'list'}
              title="Skills"
              showHeader
              headerVariant="minimal"
              textColor={evergreenTheme.colors.sidebarText}
              accentColor={evergreenTheme.colors.accent}
              style={{
                '& h2': {
                  fontSize: '16px',
                  marginBottom: '20px',
                },
              }}
            />
          )}
        </aside>

        {/* Right Main Content - White */}
        <main style={{ padding: '40px 50px' }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <ExperienceSection
              data={data.experience}
              variant="detailed"
              title="Work Experience"
              showHeader
              headerVariant="minimal"
              showTechnologies
              showDescription
              showAchievements
              primaryColor={evergreenTheme.colors.accent}
              accentColor={evergreenTheme.colors.accent}
              textColor={evergreenTheme.colors.mainText}
              style={{
                marginBottom: '35px',
                '& h2': {
                  fontSize: '18px',
                  marginBottom: '20px',
                },
              }}
            />
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <ProjectsSection
              data={data.projects}
              variant="detailed"
              title="Projects"
              showHeader
              headerVariant="minimal"
              showTechnologies
              showLinks
              primaryColor={evergreenTheme.colors.accent}
              accentColor={evergreenTheme.colors.accent}
              textColor={evergreenTheme.colors.mainText}
              style={{
                marginBottom: '35px',
                '& h2': {
                  fontSize: '18px',
                  marginBottom: '20px',
                },
              }}
            />
          )}

          {/* Education */}
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
              primaryColor={evergreenTheme.colors.accent}
              accentColor={evergreenTheme.colors.accent}
              textColor={evergreenTheme.colors.mainText}
              style={{
                marginBottom: '35px',
                '& h2': {
                  fontSize: '18px',
                  marginBottom: '20px',
                },
              }}
            />
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '20px',
                color: evergreenTheme.colors.accent,
              }}>
                Certifications
              </h2>
              {data.certifications.map((cert: any, i: number) => (
                <div key={i} style={{ marginBottom: '15px', fontSize: '12px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    {cert.name}
                  </p>
                  <p style={{ color: '#666' }}>
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
