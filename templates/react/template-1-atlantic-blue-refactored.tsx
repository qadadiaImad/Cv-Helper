/**
 * ATLANTIC BLUE TEMPLATE - REFACTORED WITH COMPONENT SYSTEM
 * Dark left sidebar with photo, white content area
 * Built using reusable organism components
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { TwoColumnLayout } from '@/components/cv-templates/templates/TwoColumnLayout'
import {
  PersonalInfoSection,
  SkillsSection,
  LanguagesSection,
  CertificationsSection,
  SummarySection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
} from '@/components/cv-templates/organisms'

/**
 * Atlantic Blue Theme Configuration
 */
const atlanticBlueTheme = {
  colors: {
    primary: '#1a3a52',
    accent: '#4a90e2',
    sidebarBg: '#1a3a52',
    sidebarText: '#ffffff',
    mainBg: '#ffffff',
    mainText: '#333',
    containerBg: '#f5f5f5',
  },
}

export const AtlanticBlueRefactored: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 AtlanticBlue (Refactored) template rendering with:', data.personal?.fullName)

  // Sidebar content
  const sidebar = (
    <>
      <PersonalInfoSection
        data={data.personal}
        variant="sidebar"
        showPhoto
        showContact
        textColor={atlanticBlueTheme.colors.sidebarText}
        accentColor={atlanticBlueTheme.colors.accent}
      />

      <SkillsSection
        data={data.skills}
        variant="sidebar-bordered"
        showHeader
        headerVariant="sidebar"
        textColor={atlanticBlueTheme.colors.sidebarText}
        accentColor={atlanticBlueTheme.colors.accent}
      />

      <LanguagesSection
        data={data.languages}
        variant="sidebar"
        showHeader
        headerVariant="sidebar"
        showProficiency
        indicatorType="segments"
        textColor={atlanticBlueTheme.colors.sidebarText}
        accentColor={atlanticBlueTheme.colors.accent}
      />

      <CertificationsSection
        data={data.certifications}
        variant="sidebar"
        showHeader
        headerVariant="sidebar"
        showCredentialId
        showExpiry
        textColor={atlanticBlueTheme.colors.sidebarText}
        accentColor={atlanticBlueTheme.colors.accent}
      />
    </>
  )

  // Main content
  const main = (
    <>
      <SummarySection
        data={data.summary}
        title="PROFESSIONAL SUMMARY"
        showHeader
        headerVariant="main"
        primaryColor={atlanticBlueTheme.colors.primary}
        textColor={atlanticBlueTheme.colors.mainText}
        textAlign="justify"
      />

      <ExperienceSection
        data={data.experience}
        variant="detailed"
        title="EXPERIENCE"
        showHeader
        headerVariant="main"
        showTechnologies
        showDescription
        showAchievements
        primaryColor={atlanticBlueTheme.colors.primary}
        accentColor={atlanticBlueTheme.colors.accent}
        textColor={atlanticBlueTheme.colors.mainText}
      />

      <ProjectsSection
        data={data.projects}
        variant="detailed"
        title="PROJECTS"
        showHeader
        headerVariant="main"
        showTechnologies
        showLinks
        primaryColor={atlanticBlueTheme.colors.primary}
        accentColor={atlanticBlueTheme.colors.accent}
        textColor={atlanticBlueTheme.colors.mainText}
      />

      <EducationSection
        data={data.education}
        variant="detailed"
        title="EDUCATION"
        showHeader
        headerVariant="main"
        showGPA
        showHonors
        showCoursework
        primaryColor={atlanticBlueTheme.colors.primary}
        accentColor={atlanticBlueTheme.colors.accent}
        textColor={atlanticBlueTheme.colors.mainText}
      />
    </>
  )

  return (
    <TwoColumnLayout
      sidebar={sidebar}
      main={main}
      sidebarWidth="280px"
      sidebarPosition="left"
      sidebarBackground={atlanticBlueTheme.colors.sidebarBg}
      sidebarColor={atlanticBlueTheme.colors.sidebarText}
      sidebarPadding="40px 30px"
      mainBackground={atlanticBlueTheme.colors.mainBg}
      mainPadding="40px 50px"
      containerBackground={atlanticBlueTheme.colors.containerBg}
      minHeight="1200px"
    />
  )
}
