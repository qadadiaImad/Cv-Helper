/**
 * TEMPLATE 17: NAVY PROFESSIONAL (REFACTORED)
 * Professional CV with navy blue sidebar and white main content
 * Features profile photo, bullet points, and clean sections
 *
 * Refactored to use component-based architecture
 */

import React from 'react'
import type { UniversalTemplateProps } from '../universal-schema'
import { SectionHeader } from '@/components/cv-templates/molecules/SectionHeader'
import { ContactItem } from '@/components/cv-templates/molecules/ContactItem'
import { Text } from '@/components/cv-templates/atoms/Text'
import { Avatar } from '@/components/cv-templates/atoms/Avatar'
import { SkillsSection } from '@/components/cv-templates/organisms/SkillsSection'
import { LanguagesSection } from '@/components/cv-templates/organisms/LanguagesSection'
import { InterestsSection } from '@/components/cv-templates/organisms/InterestsSection'
import { HtmlRenderer } from '@/components/builder/html-renderer'

// Theme configuration
const navyProfessionalTheme = {
  colors: {
    primary: '#1e3a5f',
    textPrimary: '#4a4a4a',
    textSecondary: '#808080',
    sidebar: '#d0d8e0',
    sidebarText: '#ffffff',
  },
  fonts: {
    main: "'Arial', 'Helvetica', sans-serif",
  },
  spacing: {
    section: '35px',
    item: '25px',
  },
}

export const NavyProfessionalTemplateRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: navyProfessionalTheme.fonts.main,
      display: 'flex',
    }}>
      {/* Left Navy Sidebar */}
      <div style={{
        width: '297.5px',
        background: navyProfessionalTheme.colors.primary,
        padding: '40px 30px',
        color: navyProfessionalTheme.colors.sidebarText,
        flexShrink: 0,
      }}>
        {/* Profile Photo */}
        {data.photo?.url ? (
          <div style={{ width: '100%', marginBottom: '35px', display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={data.photo.url}
              alt={data.personal.fullName}
              width={160}
              height={200}
              variant="rectangular"
              borderRadius={0}
            />
          </div>
        ) : (
          <div style={{
            width: '100%',
            marginBottom: '35px',
          }}>
            <div style={{
              width: '160px',
              height: '200px',
              background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="30" r="16" fill="#999999" opacity="0.5" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#999999"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Informations Section */}
        <div style={{ marginBottom: '40px' }}>
          <SectionHeader
            title="INFORMATIONS"
            variant="custom"
            fontSize="16px"
            fontWeight="bold"
            color={navyProfessionalTheme.colors.sidebarText}
            uppercase
            letterSpacing="1px"
            showDivider={false}
            marginBottom="20px"
          />
          <div style={{ fontSize: '11px', lineHeight: '1.8', color: navyProfessionalTheme.colors.sidebar }}>
            {data.personal.phone && (
              <Text variant="body" size="11px" color={navyProfessionalTheme.colors.sidebar} style={{ margin: '0 0 8px 0' }}>
                {data.personal.phone}
              </Text>
            )}
            {data.personal.email && (
              <Text variant="body" size="11px" color={navyProfessionalTheme.colors.sidebar} style={{ margin: '0 0 8px 0', wordBreak: 'break-all' }}>
                {data.personal.email}
              </Text>
            )}
            {data.personal.location && (
              <Text variant="body" size="11px" color={navyProfessionalTheme.colors.sidebar} style={{ margin: 0 }}>
                {data.personal.location}
              </Text>
            )}
          </div>
        </div>

        {/* Compétences Section */}
        <div style={{ marginBottom: '40px' }}>
          <SectionHeader
            title="COMPÉTENCES"
            variant="custom"
            fontSize="16px"
            fontWeight="bold"
            color={navyProfessionalTheme.colors.sidebarText}
            uppercase
            letterSpacing="1px"
            showDivider={false}
            marginBottom="20px"
          />
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.skills && (Array.isArray(data.skills) ? data.skills : []).map((skill, i) => {
              const skillName = typeof skill === 'string' ? skill : skill.name || '';
              return (
                <li key={i} style={{
                  fontSize: '11px',
                  color: navyProfessionalTheme.colors.sidebar,
                  marginBottom: '8px',
                  paddingLeft: '15px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '5px',
                    height: '5px',
                    background: navyProfessionalTheme.colors.sidebarText,
                    borderRadius: '50%',
                  }} />
                  {skillName}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Langues Section */}
        {data.languages && data.languages.length > 0 && (
          <LanguagesSection
            data={data.languages}
            variant="sidebar"
            title="LANGUES"
            showHeader={true}
            headerVariant="custom"
            showProficiency={false}
            textColor={navyProfessionalTheme.colors.sidebar}
            style={{ marginBottom: '40px' }}
          />
        )}

        {/* Intérêts Section */}
        {data.interests && data.interests.length > 0 && (
          <InterestsSection
            data={data.interests}
            variant="sidebar"
            title="INTÉRÊTS"
            showHeader={true}
            headerVariant="custom"
            showDescription={false}
            textColor={navyProfessionalTheme.colors.sidebar}
            layout="list"
          />
        )}
      </div>

      {/* Right Content Area */}
      <div style={{
        flex: 1,
        padding: '40px 45px',
        background: '#ffffff',
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '30px' }}>
          <Text
            variant="heading"
            size="42px"
            weight="bold"
            color={navyProfessionalTheme.colors.primary}
            letterSpacing="1px"
            style={{ margin: '0 0 8px 0' }}
          >
            {data.personal.fullName}
          </Text>
          <Text
            variant="heading"
            size="14px"
            weight="normal"
            color={navyProfessionalTheme.colors.textPrimary}
            uppercase
            letterSpacing="2px"
            style={{ margin: '0 0 20px 0' }}
          >
            {data.personal.title || 'Chargé de Communication'}
          </Text>
          {data.summary && (
            <HtmlRenderer
              html={data.summary}
              as="div"
              style={{
                fontSize: '11px',
                lineHeight: '1.8',
                color: navyProfessionalTheme.colors.textPrimary,
                margin: 0,
              }}
            />
          )}
        </div>

        {/* Expériences Professionnelles Section */}
        <div style={{ marginBottom: navyProfessionalTheme.spacing.section }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: navyProfessionalTheme.colors.sidebarText,
            background: navyProfessionalTheme.colors.primary,
            padding: '12px 20px',
            margin: '0 0 25px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            EXPÉRIENCES PROFESSIONNELLES
          </h3>
          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '25px', paddingLeft: '25px', position: 'relative' }}>
              {/* Bullet Point */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                background: navyProfessionalTheme.colors.primary,
                borderRadius: '50%',
              }} />

              <Text
                variant="heading"
                size="13px"
                weight="bold"
                color={navyProfessionalTheme.colors.primary}
                style={{ margin: '0 0 5px 0' }}
              >
                {exp.position} - {exp.company}
              </Text>
              <Text
                variant="body"
                size="10px"
                color={navyProfessionalTheme.colors.textSecondary}
                uppercase
                style={{ margin: '0 0 10px 0' }}
              >
                {exp.startDate} - {exp.endDate || 'ACTUEL'}
              </Text>
              {exp.description && (
                <HtmlRenderer
                  html={exp.description}
                  as="div"
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: navyProfessionalTheme.colors.textPrimary,
                    margin: '0 0 8px 0',
                  }}
                />
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{
                  margin: 0,
                  paddingLeft: '18px',
                  listStyle: 'disc',
                }}>
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} style={{
                      fontSize: '11px',
                      lineHeight: '1.7',
                      color: navyProfessionalTheme.colors.textPrimary,
                      marginBottom: '5px',
                    }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Formations Section */}
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: navyProfessionalTheme.colors.sidebarText,
            background: navyProfessionalTheme.colors.primary,
            padding: '12px 20px',
            margin: '0 0 25px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            FORMATIONS
          </h3>
          {data.education && data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px', paddingLeft: '25px', position: 'relative' }}>
              {/* Bullet Point */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                background: navyProfessionalTheme.colors.primary,
                borderRadius: '50%',
              }} />

              <Text
                variant="heading"
                size="13px"
                weight="bold"
                color={navyProfessionalTheme.colors.primary}
                style={{ margin: '0 0 5px 0' }}
              >
                {edu.degree}
              </Text>
              <Text
                variant="body"
                size="10px"
                color={navyProfessionalTheme.colors.textSecondary}
                style={{ margin: '0 0 5px 0' }}
              >
                {edu.startDate} - {edu.endDate}
              </Text>
              <Text
                variant="body"
                size="11px"
                color={navyProfessionalTheme.colors.textPrimary}
                style={{ margin: 0 }}
              >
                {edu.institution}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
