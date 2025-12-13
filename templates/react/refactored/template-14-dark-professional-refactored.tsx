/**
 * TEMPLATE 14: DARK PROFESSIONAL (REFACTORED)
 * Modern dark CV with geometric patterns and green accents
 * Features icon-based experience timeline and skill progress bars
 *
 * Refactored to use component-based architecture
 */

import React from 'react'
import type { UniversalTemplateProps } from '../universal-schema'
import { SectionHeader } from '@/components/cv-templates/molecules/SectionHeader'
import { ContactItem } from '@/components/cv-templates/molecules/ContactItem'
import { IconTimeline } from '@/components/cv-templates/molecules/IconTimeline'
import { Text } from '@/components/cv-templates/atoms/Text'
import { Avatar } from '@/components/cv-templates/atoms/Avatar'
import { EducationSection } from '@/components/cv-templates/organisms/EducationSection'
import { SkillsSection } from '@/components/cv-templates/organisms/SkillsSection'
import { HtmlRenderer } from '@/components/builder/html-renderer'

// Theme configuration
const darkProfessionalTheme = {
  colors: {
    primary: '#0a2e2e',
    secondary: '#1a3a3a',
    tertiary: '#0f2626',
    accent: '#4ade80',
    accentSecondary: '#22c55e',
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a0',
    textTertiary: '#c0c0c0',
  },
  fonts: {
    main: "'Segoe UI', 'Arial', sans-serif",
  },
  spacing: {
    section: '50px',
    item: '35px',
  },
}

export const DarkProfessionalTemplateRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  const icons = ['💼', '⚙️', '🎯', '🔧', '📊', '🎨']

  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: `linear-gradient(135deg, ${darkProfessionalTheme.colors.primary} 0%, ${darkProfessionalTheme.colors.secondary} 50%, ${darkProfessionalTheme.colors.tertiary} 100%)`,
      fontFamily: darkProfessionalTheme.fonts.main,
      position: 'relative',
    }}>
      {/* Geometric Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 35px,
          rgba(255,255,255,0.03) 35px,
          rgba(255,255,255,0.03) 70px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Main Layout Container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        minHeight: '1200px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

        {/* Left Content Area (55%) */}
        <div style={{
          width: '55%',
          padding: '60px 50px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Name, Title, and Summary */}
          <div style={{ marginBottom: '40px' }}>
            <Text
              variant="heading"
              size="48px"
              weight="light"
              color={darkProfessionalTheme.colors.textPrimary}
              letterSpacing="1px"
              style={{ margin: '0 0 10px 0' }}
            >
              {data.personal.fullName}
            </Text>
            <Text
              variant="heading"
              size="16px"
              weight="normal"
              color={darkProfessionalTheme.colors.textSecondary}
              uppercase
              letterSpacing="2px"
              style={{ margin: '0 0 25px 0' }}
            >
              {data.personal.title || 'Software Engineer'}
            </Text>
            <HtmlRenderer
              html={data.summary || '<p>Professional summary goes here...</p>'}
              as="div"
              style={{
                fontSize: '13px',
                lineHeight: '1.8',
                color: darkProfessionalTheme.colors.textTertiary,
                margin: 0,
                maxWidth: '90%',
              }}
            />
          </div>

          {/* Work Experience Section with Icon Timeline */}
          <div style={{ marginBottom: darkProfessionalTheme.spacing.section }}>
            <Text
              variant="custom"
              size="18px"
              color={darkProfessionalTheme.colors.textPrimary}
              uppercase
              letterSpacing="1px"
              style={{ 
                fontWeight: 600,
                marginBottom: '30px',
                display: 'block'
              }}
            >
              Work Experience
            </Text>

            {data.experience && data.experience.map((exp, i) => (
              <IconTimeline
                key={i}
                icon={icons[i % icons.length]}
                showConnector={i < (data.experience?.length || 0) - 1}
                iconContainerSize={50}
                iconFontSize="24px"
                iconBackground="rgba(255, 255, 255, 0.1)"
                iconBorderColor="rgba(255, 255, 255, 0.2)"
                iconBorderWidth={2}
                connectorColor="rgba(255, 255, 255, 0.1)"
                connectorWidth={2}
                contentPaddingLeft={70}
                marginBottom={35}
              >
                <Text
                  variant="heading"
                  size="16px"
                  weight="semibold"
                  color={darkProfessionalTheme.colors.textPrimary}
                  style={{ margin: '0 0 5px 0' }}
                >
                  {exp.position}
                </Text>
                <Text
                  variant="body"
                  size="12px"
                  color={darkProfessionalTheme.colors.textSecondary}
                  style={{ margin: '0 0 12px 0' }}
                >
                  {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                </Text>
                {exp.description && (
                  <HtmlRenderer
                    html={exp.description}
                    as="div"
                    style={{
                      fontSize: '11px',
                      lineHeight: '1.6',
                      color: darkProfessionalTheme.colors.textTertiary,
                      margin: 0,
                    }}
                  />
                )}
              </IconTimeline>
            ))}
          </div>
        </div>

        {/* Right Sidebar (45%) */}
        <div style={{
          width: '45%',
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '60px 50px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Profile Photo */}
          {data.photo?.url && (
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
              <Avatar
                src={data.photo.url}
                alt={data.personal.fullName}
                size={140}
                variant="rounded"
                borderRadius={12}
                border
                borderColor={darkProfessionalTheme.colors.accent}
                borderWidth={4}
              />
            </div>
          )}

          {/* Education Section */}
          <EducationSection
            data={data.education}
            variant="sidebar"
            title="Education"
            showHeader={true}
            headerVariant="custom"
            showDegreeOnly={false}
            textColor={darkProfessionalTheme.colors.textPrimary}
            secondaryTextColor={darkProfessionalTheme.colors.textSecondary}
            tertiaryTextColor="#808080"
            style={{ marginBottom: '40px' }}
          />

          {/* Skills Section with Progress Bars */}
          <SkillsSection
            data={data.skills}
            variant="progress-bars"
            title="Skills"
            showHeader={true}
            headerVariant="custom"
            textColor={darkProfessionalTheme.colors.textPrimary}
            accentColor={darkProfessionalTheme.colors.accent}
            style={{ marginBottom: '40px' }}
          />

          {/* Contact Info Section */}
          <div>
            <SectionHeader
              title="Contact"
              variant="custom"
              fontSize="18px"
              fontWeight="semibold"
              color={darkProfessionalTheme.colors.textPrimary}
              uppercase
              letterSpacing="1px"
              showDivider={false}
              marginBottom="25px"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.personal.email && (
                <ContactItem
                  icon="✉️"
                  value={data.personal.email}
                  href={`mailto:${data.personal.email}`}
                  iconSize={14}
                  iconColor={darkProfessionalTheme.colors.accent}
                  textColor={darkProfessionalTheme.colors.textTertiary}
                  fontSize="11px"
                />
              )}
              {data.personal.phone && (
                <ContactItem
                  icon="📱"
                  value={data.personal.phone}
                  href={`tel:${data.personal.phone}`}
                  iconSize={14}
                  iconColor={darkProfessionalTheme.colors.accent}
                  textColor={darkProfessionalTheme.colors.textTertiary}
                  fontSize="11px"
                />
              )}
              {data.personal.location && (
                <ContactItem
                  icon="📍"
                  value={data.personal.location}
                  iconSize={14}
                  iconColor={darkProfessionalTheme.colors.accent}
                  textColor={darkProfessionalTheme.colors.textTertiary}
                  fontSize="11px"
                />
              )}
              {data.personal.linkedin && (
                <ContactItem
                  icon="💼"
                  value={data.personal.linkedin}
                  href={data.personal.linkedin}
                  iconSize={14}
                  iconColor={darkProfessionalTheme.colors.accent}
                  textColor={darkProfessionalTheme.colors.textTertiary}
                  fontSize="11px"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
