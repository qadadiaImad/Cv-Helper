/**
 * TEMPLATE PRESETS
 * 
 * Pre-built composition trees for common CV templates
 * Users can load these as starting points and modify them
 */

import type { CompositionNode } from './composition-engine'
import { nanoid } from 'nanoid'
import { SAMPLE_CV_DATA } from './sample-data'

export interface TemplatePreset {
  id: string
  name: string
  description: string
  thumbnail?: string
  composition: CompositionNode
  tags: string[]
}

/**
 * Atlantic Blue Template
 * Two-column layout with dark blue sidebar and white main content
 */
export const ATLANTIC_BLUE_PRESET: TemplatePreset = {
  id: 'atlantic-blue',
  name: 'Atlantic Blue',
  description: 'Professional two-column CV with dark blue sidebar',
  tags: ['two-column', 'sidebar', 'professional', 'blue'],
  composition: {
    id: nanoid(),
    componentId: 'two-column-layout',
    props: {
      sidebarWidth: '280px',
      sidebarPosition: 'left',
      sidebarBackground: '#1a3a52',
      sidebarColor: '#ffffff',
      mainBackground: '#ffffff',
      sidebarPadding: '40px 30px',
      mainPadding: '40px 50px',
    },
    children: [
      // Sidebar components
      {
        id: nanoid(),
        componentId: 'personal-info-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.personal,
          variant: 'sidebar',
          textColor: '#ffffff',
          showPhoto: true,
          showContact: true,
          textAlign: 'center',
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'skills-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.skills || [
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'Python',
            'SQL',
            'Git',
            'AWS',
          ],
          variant: 'sidebar-bordered',
          title: 'SKILLS',
          textColor: '#ffffff',
          accentColor: '#4a90e2',
          headerVariant: 'sidebar',
          showHeader: true,
        },
        children: [],
      },
      // Main content components
      {
        id: nanoid(),
        componentId: 'experience-section',
        area: 'main',
        props: {
          data: SAMPLE_CV_DATA.experience,
          variant: 'detailed',
          title: 'EXPERIENCE',
          textColor: '#333333',
          accentColor: '#1a3a52',
          showHeader: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'education-section',
        area: 'main',
        props: {
          data: SAMPLE_CV_DATA.education,
          title: 'EDUCATION',
          textColor: '#333333',
          accentColor: '#1a3a52',
          showHeader: true,
        },
        children: [],
      },
    ],
  },
}

/**
 * Dark Professional Template
 * Modern dark CV with geometric patterns and green accents
 */
export const DARK_PROFESSIONAL_PRESET: TemplatePreset = {
  id: 'dark-professional',
  name: 'Dark Professional',
  description: 'Modern dark CV with icon-based timeline and skill progress bars',
  tags: ['dark', 'modern', 'timeline', 'progress-bars', 'gradient'],
  composition: {
    id: nanoid(),
    componentId: 'dark-professional-layout',
    props: {
      gradientStart: '#0a2e2e',
      gradientMiddle: '#1a3a3a',
      gradientEnd: '#0f2626',
      leftPadding: '60px 50px',
      rightPadding: '60px 50px',
    },
    children: [
      // Left content (55%)
      {
        id: nanoid(),
        componentId: 'personal-info-section',
        area: 'left',
        props: {
          data: SAMPLE_CV_DATA.personal,
          variant: 'header',
          textColor: '#ffffff',
          showPhoto: false,
          showContact: false,
          showSummary: true,
          nameSize: '48px',
          nameWeight: 300,
          nameLetterSpacing: '1px',
          titleSize: '16px',
          titleWeight: 400,
          titleLetterSpacing: '2px',
          titleTransform: 'uppercase',
          titleColor: '#a0a0a0',
          summaryColor: '#c0c0c0',
          summarySize: '13px',
          summaryLineHeight: '1.8',
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'experience-section',
        area: 'left',
        props: {
          data: SAMPLE_CV_DATA.experience,
          variant: 'detailed',
          title: 'WORK EXPERIENCE',
          textColor: '#ffffff',
          accentColor: '#4ade80',
          showHeader: true,
        },
        children: [],
      },
      // Right sidebar (45%)
      {
        id: nanoid(),
        componentId: 'education-section',
        area: 'right',
        props: {
          data: SAMPLE_CV_DATA.education,
          variant: 'compact',
          title: 'EDUCATION',
          textColor: '#ffffff',
          accentColor: '#4ade80',
          showHeader: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'skills-section',
        area: 'right',
        props: {
          data: SAMPLE_CV_DATA.skills || ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
          variant: 'progress-bars',
          title: 'SKILLS',
          textColor: '#ffffff',
          accentColor: '#4ade80',
          headerVariant: 'sidebar',
          showHeader: true,
        },
        children: [],
      },
    ],
  },
}

/**
 * Navy Professional Template
 * Professional CV with navy blue sidebar and white main content
 */
export const NAVY_PROFESSIONAL_PRESET: TemplatePreset = {
  id: 'navy-professional',
  name: 'Navy Professional',
  description: 'Professional CV with navy blue sidebar and clean bullet points',
  tags: ['two-column', 'sidebar', 'professional', 'navy', 'french'],
  composition: {
    id: nanoid(),
    componentId: 'two-column-layout',
    props: {
      sidebarWidth: '297.5px',
      sidebarPosition: 'left',
      sidebarBackground: '#1e3a5f',
      sidebarColor: '#ffffff',
      mainBackground: '#ffffff',
      sidebarPadding: '40px 30px',
      mainPadding: '40px 45px',
    },
    children: [
      // Sidebar components
      {
        id: nanoid(),
        componentId: 'personal-info-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.personal,
          variant: 'sidebar',
          textColor: '#ffffff',
          showPhoto: true,
          showContact: true,
          textAlign: 'center',
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'skills-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.skills || ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
          variant: 'list',
          title: 'COMPÉTENCES',
          textColor: '#d0d8e0',
          headerVariant: 'sidebar',
          showHeader: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'languages-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.languages,
          variant: 'sidebar',
          title: 'LANGUES',
          textColor: '#d0d8e0',
          showProficiency: true,
          showHeader: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'interests-section',
        area: 'sidebar',
        props: {
          data: SAMPLE_CV_DATA.interests || [],
          variant: 'sidebar',
          title: 'INTÉRÊTS',
          textColor: '#d0d8e0',
          layout: 'list',
          showHeader: true,
        },
        children: [],
      },
      // Main content components
      {
        id: nanoid(),
        componentId: 'personal-info-section',
        area: 'main',
        props: {
          data: SAMPLE_CV_DATA.personal,
          variant: 'inline',
          textColor: '#1e3a5f',
          showPhoto: false,
          showContact: false,
          showSummary: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'experience-section',
        area: 'main',
        props: {
          data: SAMPLE_CV_DATA.experience,
          variant: 'detailed',
          title: 'EXPÉRIENCES PROFESSIONNELLES',
          textColor: '#1e3a5f',
          accentColor: '#1e3a5f',
          showHeader: true,
        },
        children: [],
      },
      {
        id: nanoid(),
        componentId: 'education-section',
        area: 'main',
        props: {
          data: SAMPLE_CV_DATA.education,
          variant: 'compact',
          title: 'FORMATIONS',
          textColor: '#1e3a5f',
          accentColor: '#1e3a5f',
          showHeader: true,
        },
        children: [],
      },
    ],
  },
}

/**
 * All available template presets
 */
export const TEMPLATE_PRESETS: TemplatePreset[] = [
  ATLANTIC_BLUE_PRESET,
  DARK_PROFESSIONAL_PRESET,
  NAVY_PROFESSIONAL_PRESET,
  // Add more presets here as they're created
]

/**
 * Get a template preset by ID
 */
export function getTemplatePreset(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find(preset => preset.id === id)
}

/**
 * Clone a composition tree with new IDs
 * This ensures each loaded template has unique node IDs
 */
export function cloneComposition(node: CompositionNode): CompositionNode {
  return {
    ...node,
    id: nanoid(),
    children: node.children?.map(child => cloneComposition(child)),
  }
}
