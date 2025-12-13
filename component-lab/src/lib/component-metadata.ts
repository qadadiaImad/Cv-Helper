/**
 * COMPONENT METADATA REGISTRY
 *
 * This is the heart of the Component Lab system.
 * Defines all CV components with their props, variants, and metadata.
 *
 * This registry drives:
 * - Component Explorer props controls
 * - Drag-and-drop palette
 * - Documentation generation
 * - Code generation
 */

import type { ComponentType } from 'react'

// Import all CV components via Vite aliases
import { Text, Badge, Avatar, Icon, Divider, ProgressBar, Spacer } from '@cv-components/atoms'
import { ContactItem, IconTimeline, SectionHeader, SkillTag } from '@cv-components/molecules'
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  LanguagesSection,
  InterestsSection,
  ProjectsSection,
  CertificationsSection,
  SummarySection
} from '@cv-components/organisms'
import { TwoColumnLayout, SingleColumnLayout, SectionedLayout, DarkProfessionalLayout } from '@cv-components/templates'
import { SAMPLE_CV_DATA, COMPONENT_SAMPLES } from './sample-data'

export interface PropDefinition {
  name: string
  type: 'string' | 'number' | 'boolean' | 'enum' | 'color' | 'object' | 'array' | 'node'
  required: boolean
  defaultValue?: any
  description?: string
  options?: string[]  // For enum types
  control?: 'text' | 'number' | 'select' | 'color' | 'checkbox' | 'textarea' | 'json'
}

export interface VariantDefinition {
  name: string
  props: Record<string, any>
  description?: string
}

export interface ComponentMetadata {
  id: string
  name: string
  category: 'atoms' | 'molecules' | 'organisms' | 'layouts'
  component: ComponentType<any>
  description: string
  props: PropDefinition[]
  variants?: VariantDefinition[]
  examples?: {
    title: string
    code: string
    props: Record<string, any>
  }[]
  tags?: string[]
  bestPractices?: string[]
  canContain?: string[]  // Which component categories it can contain
  canBeContainedBy?: string[]  // Which categories can contain this
}

export const COMPONENT_REGISTRY: ComponentMetadata[] = [
  // =====================
  // ATOMS (7 components)
  // =====================

  {
    id: 'text',
    name: 'Text',
    category: 'atoms',
    component: Text,
    description: 'Generic text primitive with consistent typography variants',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Text content',
        control: 'textarea',
        defaultValue: 'Sample Text'
      },
      {
        name: 'variant',
        type: 'enum',
        required: false,
        defaultValue: 'body',
        options: ['heading', 'subheading', 'body', 'caption', 'name', 'custom'],
        control: 'select',
        description: 'Typography variant'
      },
      {
        name: 'color',
        type: 'color',
        required: false,
        control: 'color',
        description: 'Text color (CSS color value)',
        defaultValue: '#000000'
      },
      {
        name: 'weight',
        type: 'enum',
        required: false,
        options: ['normal', 'medium', 'semibold', 'bold'],
        control: 'select',
        description: 'Font weight'
      },
      {
        name: 'uppercase',
        type: 'boolean',
        required: false,
        defaultValue: false,
        control: 'checkbox',
        description: 'Transform to uppercase'
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        control: 'text',
        description: 'Font size (overrides variant default)'
      },
    ],
    variants: [
      { name: 'Heading', props: { variant: 'heading', children: 'Section Title' }, description: 'Large bold heading for sections' },
      { name: 'Subheading', props: { variant: 'subheading', children: 'Subsection Title' }, description: 'Medium heading for subsections' },
      { name: 'Body', props: { variant: 'body', children: 'Body text example' }, description: 'Standard body text' },
      { name: 'Caption', props: { variant: 'caption', children: '2020 - 2023' }, description: 'Small caption text for dates/metadata' },
      { name: 'Name', props: { variant: 'name', children: 'John Doe' }, description: 'Extra large for person name' },
    ],
    examples: [
      {
        title: 'Basic heading',
        code: '<Text variant="heading">Experience</Text>',
        props: { variant: 'heading', children: 'Experience' }
      },
      {
        title: 'Colored text',
        code: '<Text variant="body" color="#2563eb">Highlighted text</Text>',
        props: { variant: 'body', children: 'Highlighted text', color: '#2563eb' }
      }
    ],
    tags: ['typography', 'text', 'basic', 'foundational'],
    bestPractices: [
      'Use semantic variants instead of custom sizes',
      'Always specify color for proper theming',
      'Prefer heading variant over manual size/weight overrides'
    ],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'badge',
    name: 'Badge',
    category: 'atoms',
    component: Badge,
    description: 'Pill-shaped label for skills, tags, and categories',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Badge content',
        control: 'text',
        defaultValue: 'React'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['default', 'accent', 'outline', 'solid'],
        control: 'select',
        required: false,
        defaultValue: 'default',
        description: 'Visual style variant'
      },
      {
        name: 'size',
        type: 'enum',
        options: ['xs', 'sm', 'md', 'lg'],
        control: 'select',
        required: false,
        defaultValue: 'md',
        description: 'Badge size'
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false,
        description: 'Custom color'
      },
    ],
    variants: [
      { name: 'Default', props: { children: 'React', variant: 'default' } },
      { name: 'Accent', props: { children: 'TypeScript', variant: 'accent' } },
      { name: 'Outline', props: { children: 'Next.js', variant: 'outline' } },
      { name: 'Solid', props: { children: 'Node.js', variant: 'solid' } },
    ],
    examples: [
      {
        title: 'Skill badge',
        code: '<Badge variant="accent">React</Badge>',
        props: { children: 'React', variant: 'accent' }
      }
    ],
    tags: ['badge', 'tag', 'label', 'skill'],
    bestPractices: [
      'Use for skills, technologies, or categories',
      'Keep text short (1-3 words)',
      'Use accent variant for primary skills'
    ],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'avatar',
    name: 'Avatar',
    category: 'atoms',
    component: Avatar,
    description: 'Profile photo display with flexible styling options',
    props: [
      {
        name: 'src',
        type: 'string',
        required: true,
        description: 'Image URL',
        control: 'text',
        defaultValue: 'https://via.placeholder.com/150'
      },
      {
        name: 'alt',
        type: 'string',
        required: false,
        description: 'Alt text for accessibility',
        control: 'text',
        defaultValue: 'Profile photo'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['circle', 'rounded', 'square'],
        control: 'select',
        required: false,
        defaultValue: 'circle',
        description: 'Shape variant'
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: 'Size in pixels',
        control: 'number',
        defaultValue: 100
      },
      {
        name: 'grayscale',
        type: 'boolean',
        required: false,
        description: 'Apply grayscale filter',
        control: 'checkbox',
        defaultValue: false
      },
    ],
    variants: [
      { name: 'Circle', props: { variant: 'circle', size: 100 } },
      { name: 'Rounded', props: { variant: 'rounded', size: 100 } },
      { name: 'Square', props: { variant: 'square', size: 100 } },
    ],
    tags: ['avatar', 'photo', 'profile', 'image'],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'icon',
    name: 'Icon',
    category: 'atoms',
    component: Icon,
    description: 'Icon wrapper for emojis and SVGs',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Icon content (emoji or SVG)',
        control: 'text',
        defaultValue: '📧'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['default', 'circled', 'squared'],
        control: 'select',
        required: false,
        defaultValue: 'default'
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: 'Icon size',
        control: 'number',
        defaultValue: 20
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false
      },
    ],
    variants: [
      { name: 'Default', props: { children: '📧', variant: 'default' } },
      { name: 'Circled', props: { children: '📧', variant: 'circled' } },
      { name: 'Squared', props: { children: '📧', variant: 'squared' } },
    ],
    tags: ['icon', 'emoji', 'symbol'],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'divider',
    name: 'Divider',
    category: 'atoms',
    component: Divider,
    description: 'Visual separator for content sections',
    props: [
      {
        name: 'variant',
        type: 'enum',
        options: ['solid', 'dashed', 'dotted', 'gradient'],
        control: 'select',
        required: false,
        defaultValue: 'solid'
      },
      {
        name: 'orientation',
        type: 'enum',
        options: ['horizontal', 'vertical'],
        control: 'select',
        required: false,
        defaultValue: 'horizontal'
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false,
        defaultValue: '#e5e7eb'
      },
      {
        name: 'thickness',
        type: 'number',
        required: false,
        description: 'Line thickness in pixels',
        control: 'number',
        defaultValue: 1
      },
    ],
    variants: [
      { name: 'Solid', props: { variant: 'solid' } },
      { name: 'Dashed', props: { variant: 'dashed' } },
      { name: 'Dotted', props: { variant: 'dotted' } },
    ],
    tags: ['divider', 'separator', 'line'],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'progress-bar',
    name: 'ProgressBar',
    category: 'atoms',
    component: ProgressBar,
    description: 'Visual indicator for skill proficiency or ratings',
    props: [
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'Current value',
        control: 'number',
        defaultValue: 75
      },
      {
        name: 'max',
        type: 'number',
        required: false,
        description: 'Maximum value',
        control: 'number',
        defaultValue: 100
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['bar', 'dots', 'segments'],
        control: 'select',
        required: false,
        defaultValue: 'bar'
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false
      },
    ],
    variants: [
      { name: 'Bar', props: { value: 75, variant: 'bar' } },
      { name: 'Dots', props: { value: 4, max: 5, variant: 'dots' } },
      { name: 'Segments', props: { value: 3, max: 5, variant: 'segments' } },
    ],
    tags: ['progress', 'rating', 'skill-level'],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  {
    id: 'spacer',
    name: 'Spacer',
    category: 'atoms',
    component: Spacer,
    description: 'Flexible whitespace management component',
    props: [
      {
        name: 'size',
        type: 'number',
        required: false,
        description: 'Space size in pixels',
        control: 'number',
        defaultValue: 16
      },
      {
        name: 'orientation',
        type: 'enum',
        options: ['horizontal', 'vertical'],
        control: 'select',
        required: false,
        defaultValue: 'vertical'
      },
    ],
    tags: ['spacer', 'spacing', 'layout'],
    canBeContainedBy: ['atoms', 'molecules', 'organisms', 'layouts']
  },

  // ==========================
  // MOLECULES (3 components)
  // ==========================

  {
    id: 'contact-item',
    name: 'ContactItem',
    category: 'molecules',
    component: ContactItem,
    description: 'Icon + text combination for contact information',
    props: [
      {
        name: 'icon',
        type: 'node',
        required: true,
        description: 'Icon (emoji or SVG)',
        control: 'text',
        defaultValue: '📧'
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: 'Contact value (email, phone, etc.)',
        control: 'text',
        defaultValue: 'john@example.com'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['horizontal', 'vertical', 'inline'],
        control: 'select',
        required: false,
        defaultValue: 'horizontal'
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false
      },
    ],
    variants: [
      { name: 'Email', props: { icon: '📧', value: 'john@example.com' } },
      { name: 'Phone', props: { icon: '📱', value: '+1 (555) 123-4567' } },
      { name: 'Location', props: { icon: '📍', value: 'New York, NY' } },
      { name: 'LinkedIn', props: { icon: '💼', value: 'linkedin.com/in/johndoe' } },
    ],
    tags: ['contact', 'info', 'communication'],
    canContain: ['atoms'],
    canBeContainedBy: ['molecules', 'organisms', 'layouts']
  },

  {
    id: 'section-header',
    name: 'SectionHeader',
    category: 'molecules',
    component: SectionHeader,
    description: 'Section title with optional divider',
    props: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: 'Section title',
        control: 'text',
        defaultValue: 'Experience'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['main', 'sidebar', 'minimal', 'custom'],
        control: 'select',
        required: false,
        defaultValue: 'main'
      },
      {
        name: 'color',
        type: 'color',
        control: 'color',
        required: false
      },
    ],
    variants: [
      { name: 'Main', props: { title: 'Experience', variant: 'main' } },
      { name: 'Sidebar', props: { title: 'Skills', variant: 'sidebar' } },
      { name: 'Minimal', props: { title: 'Education', variant: 'minimal' } },
    ],
    tags: ['header', 'title', 'section'],
    canContain: ['atoms'],
    canBeContainedBy: ['molecules', 'organisms', 'layouts']
  },

  {
    id: 'skill-tag',
    name: 'SkillTag',
    category: 'molecules',
    component: SkillTag,
    description: 'Skill badge with optional proficiency indicator',
    props: [
      {
        name: 'skill',
        type: 'string',
        required: true,
        description: 'Skill name',
        control: 'text',
        defaultValue: 'React'
      },
      {
        name: 'level',
        type: 'number',
        required: false,
        description: 'Proficiency level (0-5)',
        control: 'number',
        defaultValue: 4
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['simple', 'rated', 'bordered', 'accent', 'solid'],
        control: 'select',
        required: false,
        defaultValue: 'simple'
      },
    ],
    variants: [
      { name: 'Simple', props: { skill: 'React', variant: 'simple' } },
      { name: 'Rated', props: { skill: 'TypeScript', level: 4, variant: 'rated' } },
      { name: 'Accent', props: { skill: 'Node.js', variant: 'accent' } },
    ],
    tags: ['skill', 'proficiency', 'rating'],
    canContain: ['atoms'],
    canBeContainedBy: ['molecules', 'organisms', 'layouts']
  },

  {
    id: 'icon-timeline',
    name: 'IconTimeline',
    category: 'molecules',
    component: IconTimeline,
    description: 'Timeline layout with icon circles and connecting lines',
    props: [
      {
        name: 'icon',
        type: 'node',
        required: true,
        description: 'Icon (emoji or SVG)',
        control: 'text',
        defaultValue: '💼'
      },
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Content displayed to the right of icon',
        control: 'textarea',
        defaultValue: '<div>Timeline item content</div>'
      },
      {
        name: 'showConnector',
        type: 'boolean',
        required: false,
        description: 'Show connecting line to next item',
        control: 'checkbox',
        defaultValue: false
      },
      {
        name: 'iconContainerSize',
        type: 'number',
        required: false,
        description: 'Icon container size in pixels',
        control: 'number',
        defaultValue: 50
      },
      {
        name: 'iconBackground',
        type: 'color',
        required: false,
        description: 'Icon background color',
        control: 'color',
        defaultValue: 'rgba(255, 255, 255, 0.1)'
      },
    ],
    variants: [
      { name: 'Experience Item', props: { icon: '💼', showConnector: true } },
      { name: 'Milestone', props: { icon: '🎯', showConnector: false } },
      { name: 'Project', props: { icon: '🔧', showConnector: true } },
    ],
    tags: ['timeline', 'icon', 'experience', 'history'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['organisms', 'layouts']
  },

  // ===========================
  // ORGANISMS (9 components)
  // ===========================

  {
    id: 'personal-info-section',
    name: 'PersonalInfoSection',
    category: 'organisms',
    component: PersonalInfoSection,
    description: 'Complete personal information section with photo, name, title, and contact details',
    props: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: 'PersonalInfo data from UniversalResumeData',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.personal
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['sidebar', 'header', 'inline', 'custom'],
        control: 'select',
        required: false,
        defaultValue: 'sidebar'
      },
      {
        name: 'textColor',
        type: 'color',
        required: false,
        description: 'Text color',
        control: 'color',
        defaultValue: '#ffffff'
      },
      {
        name: 'showPhoto',
        type: 'boolean',
        required: false,
        description: 'Show profile photo',
        control: 'checkbox',
        defaultValue: true
      },
      {
        name: 'showContact',
        type: 'boolean',
        required: false,
        description: 'Show contact information',
        control: 'checkbox',
        defaultValue: true
      },
      {
        name: 'showSummary',
        type: 'boolean',
        required: false,
        description: 'Show professional summary',
        control: 'checkbox',
        defaultValue: false
      },
      {
        name: 'nameSize',
        type: 'string',
        required: false,
        description: 'Name font size',
        control: 'text',
        defaultValue: '32px'
      },
      {
        name: 'nameWeight',
        type: 'number',
        required: false,
        description: 'Name font weight',
        control: 'number',
        defaultValue: 700
      },
      {
        name: 'nameLetterSpacing',
        type: 'string',
        required: false,
        description: 'Name letter spacing',
        control: 'text',
        defaultValue: 'normal'
      },
      {
        name: 'titleSize',
        type: 'string',
        required: false,
        description: 'Title font size',
        control: 'text',
        defaultValue: '18px'
      },
      {
        name: 'titleWeight',
        type: 'number',
        required: false,
        description: 'Title font weight',
        control: 'number',
        defaultValue: 400
      },
      {
        name: 'titleLetterSpacing',
        type: 'string',
        required: false,
        description: 'Title letter spacing',
        control: 'text',
        defaultValue: 'normal'
      },
      {
        name: 'titleTransform',
        type: 'enum',
        options: ['none', 'uppercase', 'lowercase', 'capitalize'],
        control: 'select',
        required: false,
        defaultValue: 'none'
      },
      {
        name: 'titleColor',
        type: 'color',
        required: false,
        description: 'Title color (overrides textColor)',
        control: 'color',
        defaultValue: '#ffffff'
      },
      {
        name: 'summaryColor',
        type: 'color',
        required: false,
        description: 'Summary text color',
        control: 'color',
        defaultValue: '#ffffff'
      },
      {
        name: 'summarySize',
        type: 'string',
        required: false,
        description: 'Summary font size',
        control: 'text',
        defaultValue: '13px'
      },
      {
        name: 'summaryLineHeight',
        type: 'string',
        required: false,
        description: 'Summary line height',
        control: 'text',
        defaultValue: '1.8'
      },
    ],
    variants: [
      { 
        name: 'Sidebar (Atlantic Blue)', 
        props: { 
          variant: 'sidebar',
          textColor: '#ffffff',
          showPhoto: true,
          showContact: true
        } 
      },
      { name: 'Header', props: { variant: 'header' } },
      { name: 'Inline', props: { variant: 'inline' } },
    ],
    tags: ['personal', 'contact', 'header', 'profile'],
    bestPractices: [
      'Place at the top of the resume',
      'Include at least name, email, and phone',
      'Use sidebar variant for two-column layouts'
    ],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'experience-section',
    name: 'ExperienceSection',
    category: 'organisms',
    component: ExperienceSection,
    description: 'Work experience section with company, position, dates, and achievements',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Experience items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.experience
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['detailed', 'compact', 'timeline', 'minimal'],
        control: 'select',
        required: false,
        defaultValue: 'detailed'
      },
    ],
    variants: [
      { name: 'Detailed', props: { variant: 'detailed' } },
      { name: 'Compact', props: { variant: 'compact' } },
      { name: 'Timeline', props: { variant: 'timeline' } },
    ],
    tags: ['experience', 'work', 'employment', 'history'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'education-section',
    name: 'EducationSection',
    category: 'organisms',
    component: EducationSection,
    description: 'Education section with institution, degree, and dates',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Education items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.education
      },
    ],
    tags: ['education', 'academic', 'degree', 'university'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'skills-section',
    name: 'SkillsSection',
    category: 'organisms',
    component: SkillsSection,
    description: 'Skills section with flexible layout options',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Skills data (array of strings or categorized)',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.skills || ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python']
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['list', 'grid', 'sidebar-bordered', 'categorized'],
        control: 'select',
        required: false,
        defaultValue: 'sidebar-bordered'
      },
      {
        name: 'textColor',
        type: 'color',
        required: false,
        description: 'Text color',
        control: 'color',
        defaultValue: '#ffffff'
      },
      {
        name: 'accentColor',
        type: 'color',
        required: false,
        description: 'Accent color for borders',
        control: 'color',
        defaultValue: '#4a90e2'
      },
      {
        name: 'headerVariant',
        type: 'enum',
        options: ['main', 'sidebar', 'minimal'],
        control: 'select',
        required: false,
        defaultValue: 'sidebar'
      },
    ],
    variants: [
      { 
        name: 'Sidebar Bordered (Atlantic Blue)', 
        props: { 
          variant: 'sidebar-bordered',
          textColor: '#ffffff',
          accentColor: '#4a90e2',
          headerVariant: 'sidebar'
        } 
      },
      { name: 'List', props: { variant: 'list' } },
      { name: 'Grid', props: { variant: 'grid' } },
      { name: 'Categorized', props: { variant: 'categorized' } },
    ],
    tags: ['skills', 'technologies', 'expertise'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'languages-section',
    name: 'LanguagesSection',
    category: 'organisms',
    component: LanguagesSection,
    description: 'Languages section with proficiency levels',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Language items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.languages
      },
    ],
    tags: ['languages', 'proficiency', 'multilingual'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'interests-section',
    name: 'InterestsSection',
    category: 'organisms',
    component: InterestsSection,
    description: 'Interests and hobbies section',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Interest items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.interests || []
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['sidebar', 'detailed', 'compact', 'list', 'custom'],
        control: 'select',
        required: false,
        defaultValue: 'sidebar'
      },
      {
        name: 'layout',
        type: 'enum',
        options: ['list', 'inline', 'grid'],
        control: 'select',
        required: false,
        defaultValue: 'list'
      },
    ],
    variants: [
      { name: 'List', props: { variant: 'list', layout: 'list' } },
      { name: 'Inline', props: { variant: 'compact', layout: 'inline' } },
      { name: 'Grid', props: { variant: 'detailed', layout: 'grid' } },
    ],
    tags: ['interests', 'hobbies', 'personal'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'projects-section',
    name: 'ProjectsSection',
    category: 'organisms',
    component: ProjectsSection,
    description: 'Projects section showcasing portfolio work',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Project items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.projects
      },
    ],
    tags: ['projects', 'portfolio', 'work'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'certifications-section',
    name: 'CertificationsSection',
    category: 'organisms',
    component: CertificationsSection,
    description: 'Professional certifications and credentials',
    props: [
      {
        name: 'data',
        type: 'array',
        required: true,
        description: 'Array of Certification items',
        control: 'json',
        defaultValue: SAMPLE_CV_DATA.certifications
      },
    ],
    tags: ['certifications', 'credentials', 'qualifications'],
    canContain: ['atoms', 'molecules'],
    canBeContainedBy: ['layouts']
  },

  {
    id: 'summary-section',
    name: 'SummarySection',
    category: 'organisms',
    component: SummarySection,
    description: 'Professional summary or objective statement',
    props: [
      {
        name: 'data',
        type: 'string',
        required: true,
        description: 'Summary text',
        control: 'textarea',
        defaultValue: SAMPLE_CV_DATA.summary
      },
    ],
    tags: ['summary', 'objective', 'about'],
    canContain: ['atoms'],
    canBeContainedBy: ['layouts']
  },

  // =========================
  // LAYOUTS (3 components)
  // =========================

  {
    id: 'two-column-layout',
    name: 'TwoColumnLayout',
    category: 'layouts',
    component: TwoColumnLayout,
    description: 'Two-column layout with sidebar and main content area',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Layout content',
        control: 'json'
      },
      {
        name: 'sidebarPosition',
        type: 'enum',
        options: ['left', 'right'],
        control: 'select',
        required: false,
        defaultValue: 'left'
      },
      {
        name: 'sidebarWidth',
        type: 'string',
        required: false,
        description: 'Sidebar width (e.g., "30%", "250px")',
        control: 'text',
        defaultValue: '280px'
      },
      {
        name: 'sidebarBackground',
        type: 'color',
        required: false,
        description: 'Sidebar background color',
        control: 'color',
        defaultValue: '#1a3a52'
      },
      {
        name: 'sidebarColor',
        type: 'color',
        required: false,
        description: 'Sidebar text color',
        control: 'color',
        defaultValue: '#ffffff'
      },
      {
        name: 'mainBackground',
        type: 'color',
        required: false,
        description: 'Main content background color',
        control: 'color',
        defaultValue: '#ffffff'
      },
    ],
    variants: [
      { 
        name: 'Atlantic Blue', 
        props: { 
          sidebarPosition: 'left',
          sidebarWidth: '280px',
          sidebarBackground: '#1a3a52',
          sidebarColor: '#ffffff',
          mainBackground: '#ffffff'
        } 
      },
      { name: 'Left Sidebar', props: { sidebarPosition: 'left' } },
      { name: 'Right Sidebar', props: { sidebarPosition: 'right' } },
    ],
    tags: ['layout', 'two-column', 'sidebar'],
    bestPractices: [
      'Use for traditional resume layouts',
      'Place personal info and skills in sidebar',
      'Main content for experience and education'
    ],
    canContain: ['organisms', 'atoms', 'molecules'],
  },

  {
    id: 'single-column-layout',
    name: 'SingleColumnLayout',
    category: 'layouts',
    component: SingleColumnLayout,
    description: 'Simple single-column layout',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Layout content',
        control: 'json'
      },
      {
        name: 'maxWidth',
        type: 'string',
        required: false,
        description: 'Maximum width',
        control: 'text',
        defaultValue: '800px'
      },
    ],
    tags: ['layout', 'single-column', 'simple'],
    canContain: ['organisms', 'atoms', 'molecules'],
  },

  {
    id: 'sectioned-layout',
    name: 'SectionedLayout',
    category: 'layouts',
    component: SectionedLayout,
    description: 'Layout with multiple horizontal sections',
    props: [
      {
        name: 'children',
        type: 'node',
        required: true,
        description: 'Layout content',
        control: 'json'
      },
    ],
    tags: ['layout', 'sectioned', 'flexible'],
    canContain: ['organisms', 'atoms', 'molecules'],
  },

  {
    id: 'dark-professional-layout',
    name: 'DarkProfessionalLayout',
    category: 'layouts',
    component: DarkProfessionalLayout,
    description: 'Dark professional layout with geometric pattern background and 55/45 split',
    props: [
      {
        name: 'left',
        type: 'node',
        required: false,
        description: 'Left content area (55% width)',
        control: 'json'
      },
      {
        name: 'right',
        type: 'node',
        required: false,
        description: 'Right sidebar area (45% width)',
        control: 'json'
      },
      {
        name: 'gradientStart',
        type: 'color',
        required: false,
        description: 'Background gradient start color',
        control: 'color',
        defaultValue: '#0a2e2e'
      },
      {
        name: 'gradientMiddle',
        type: 'color',
        required: false,
        description: 'Background gradient middle color',
        control: 'color',
        defaultValue: '#1a3a3a'
      },
      {
        name: 'gradientEnd',
        type: 'color',
        required: false,
        description: 'Background gradient end color',
        control: 'color',
        defaultValue: '#0f2626'
      },
    ],
    variants: [
      { name: 'Dark Professional', props: { gradientStart: '#0a2e2e', gradientMiddle: '#1a3a3a', gradientEnd: '#0f2626' } },
    ],
    tags: ['layout', 'dark', 'professional', 'gradient'],
    canContain: ['organisms', 'atoms', 'molecules'],
  },
]
