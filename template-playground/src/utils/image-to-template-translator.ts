/**
 * IMAGE TO TEMPLATE TRANSLATOR
 * 
 * This utility helps translate resume template images into React TSX components.
 * It provides a structured approach to analyze and convert visual designs into code.
 * 
 * Usage:
 * 1. Analyze the image visually
 * 2. Extract layout structure
 * 3. Identify colors and typography
 * 4. Generate React component code
 */

export interface TemplateAnalysis {
  // Layout Structure
  layout: {
    type: 'single-column' | 'two-column' | 'three-column' | 'grid'
    columns?: {
      width: string
      position: 'left' | 'right' | 'center'
      backgroundColor?: string
    }[]
    header?: {
      height: string
      backgroundColor: string
      position: 'top' | 'none'
    }
    footer?: {
      height: string
      backgroundColor: string
    }
  }

  // Color Palette
  colors: {
    primary: string
    secondary?: string
    accent: string
    background: string
    text: {
      dark: string
      light: string
      muted: string
    }
    borders?: string
  }

  // Typography
  typography: {
    fontFamily: string
    sizes: {
      h1: string  // Name
      h2: string  // Section headers
      h3: string  // Subsection headers
      body: string
      small: string
    }
    weights: {
      bold: number
      semibold: number
      normal: number
      light: number
    }
  }

  // Spacing
  spacing: {
    containerPadding: string
    sectionMargin: string
    itemMargin: string
    lineHeight: string
  }

  // Visual Elements
  elements: {
    hasPhoto: boolean
    photoPosition?: 'header' | 'sidebar' | 'top'
    photoShape?: 'circle' | 'square' | 'rounded'
    photoSize?: string
    
    hasBorders: boolean
    borderStyle?: 'solid' | 'dashed' | 'none'
    borderWidth?: string
    
    hasIcons: boolean
    iconStyle?: 'filled' | 'outlined' | 'emoji'
    
    hasProgressBars: boolean
    progressBarStyle?: 'linear' | 'circular' | 'dots'
    
    hasBadges: boolean
    badgeStyle?: 'rounded' | 'square' | 'pill'
  }

  // Sections Present
  sections: {
    header: boolean
    summary: boolean
    experience: boolean
    education: boolean
    skills: boolean
    languages: boolean
    certifications: boolean
    publications: boolean
    projects: boolean
    contact: boolean
    footer: boolean
  }
}

/**
 * Step 1: Analyze Image
 * Manually analyze the template image and fill out this structure
 */
export function analyzeTemplateImage(imagePath: string): TemplateAnalysis {
  // This is a manual analysis helper
  // User should fill this out by looking at the image
  
  return {
    layout: {
      type: 'two-column',
      columns: [
        { width: '30%', position: 'left', backgroundColor: '#f0f0f0' },
        { width: '70%', position: 'right', backgroundColor: '#ffffff' }
      ],
      header: {
        height: '100px',
        backgroundColor: '#4a4a4a',
        position: 'top'
      }
    },
    colors: {
      primary: '#4a4a4a',
      accent: '#00bcd4',
      background: '#ffffff',
      text: {
        dark: '#333333',
        light: '#666666',
        muted: '#999999'
      }
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      sizes: {
        h1: '28px',
        h2: '16px',
        h3: '14px',
        body: '11px',
        small: '9px'
      },
      weights: {
        bold: 700,
        semibold: 600,
        normal: 400,
        light: 300
      }
    },
    spacing: {
      containerPadding: '20px',
      sectionMargin: '15px',
      itemMargin: '10px',
      lineHeight: '1.5'
    },
    elements: {
      hasPhoto: true,
      photoPosition: 'sidebar',
      photoShape: 'circle',
      photoSize: '120px',
      hasBorders: true,
      borderStyle: 'solid',
      borderWidth: '1px',
      hasIcons: true,
      iconStyle: 'emoji',
      hasProgressBars: true,
      progressBarStyle: 'linear',
      hasBadges: true,
      badgeStyle: 'rounded'
    },
    sections: {
      header: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      certifications: true,
      publications: true,
      projects: true,
      contact: true,
      footer: true
    }
  }
}

/**
 * Step 2: Generate Template Code
 * Convert the analysis into React TSX component code
 */
export function generateTemplateCode(analysis: TemplateAnalysis, templateName: string): string {
  const componentName = toPascalCase(templateName)
  
  return `/**
 * ${templateName} Template
 * Auto-generated from image analysis
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ${componentName}: React.FC<UniversalTemplateProps> = ({ data }) => {
  const colors = {
    primary: '${analysis.colors.primary}',
    accent: '${analysis.colors.accent}',
    background: '${analysis.colors.background}',
    textDark: '${analysis.colors.text.dark}',
    textLight: '${analysis.colors.text.light}',
    textMuted: '${analysis.colors.text.muted}',
  }

  return (
    <div style={{
      width: '850px',
      height: '1200px',
      margin: '0 auto',
      fontFamily: '${analysis.typography.fontFamily}',
      backgroundColor: colors.background,
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      ${generateLayoutCode(analysis)}
    </div>
  )
}
`
}

function generateLayoutCode(analysis: TemplateAnalysis): string {
  if (analysis.layout.type === 'two-column') {
    return generateTwoColumnLayout(analysis)
  } else if (analysis.layout.type === 'single-column') {
    return generateSingleColumnLayout(analysis)
  }
  return '/* Layout generation not implemented for this type */'
}

function generateTwoColumnLayout(analysis: TemplateAnalysis): string {
  const hasHeader = analysis.layout.header?.position === 'top'
  
  return `
      ${hasHeader ? `{/* Header */}
      <header style={{
        backgroundColor: '${analysis.layout.header?.backgroundColor}',
        padding: '${analysis.spacing.containerPadding}',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <h1 style={{ fontSize: '${analysis.typography.sizes.h1}', margin: 0 }}>
          {data.personal.fullName}
        </h1>
        {data.personal.title && (
          <h2 style={{ fontSize: '${analysis.typography.sizes.h2}', fontWeight: ${analysis.typography.weights.light}, margin: '5px 0 0 0' }}>
            {data.personal.title}
          </h2>
        )}
      </header>` : ''}

      <div style={{ display: 'flex', height: '${hasHeader ? 'calc(100% - ' + analysis.layout.header?.height + ')' : '100%'}' }}>
        {/* Left Sidebar */}
        <aside style={{
          width: '${analysis.layout.columns?.[0].width}',
          backgroundColor: '${analysis.layout.columns?.[0].backgroundColor}',
          padding: '${analysis.spacing.containerPadding}',
          overflow: 'hidden',
        }}>
          ${generateSidebarContent(analysis)}
        </aside>

        {/* Main Content */}
        <main style={{
          width: '${analysis.layout.columns?.[1].width}',
          padding: '${analysis.spacing.containerPadding}',
          overflow: 'hidden',
        }}>
          ${generateMainContent(analysis)}
        </main>
      </div>`
}

function generateSingleColumnLayout(analysis: TemplateAnalysis): string {
  return `
      <div style={{ padding: '${analysis.spacing.containerPadding}' }}>
        ${generateMainContent(analysis)}
      </div>`
}

function generateSidebarContent(analysis: TemplateAnalysis): string {
  let content = ''
  
  if (analysis.elements.hasPhoto) {
    content += `
          {/* Photo */}
          {data.personal.photo && (
            <div style={{
              width: '${analysis.elements.photoSize}',
              height: '${analysis.elements.photoSize}',
              borderRadius: '${analysis.elements.photoShape === 'circle' ? '50%' : analysis.elements.photoShape === 'rounded' ? '10px' : '0'}',
              overflow: 'hidden',
              margin: '0 auto ${analysis.spacing.sectionMargin}',
              border: '${analysis.elements.borderWidth} ${analysis.elements.borderStyle} ${analysis.colors.accent}',
            }}>
              <img 
                src={data.personal.photo} 
                alt={data.personal.fullName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
`
  }
  
  if (analysis.sections.summary) {
    content += `
          {/* About/Summary */}
          {data.summary && (
            <section style={{ marginBottom: '${analysis.spacing.sectionMargin}' }}>
              <h3 style={{ 
                fontSize: '${analysis.typography.sizes.h2}', 
                fontWeight: ${analysis.typography.weights.bold},
                marginBottom: '${analysis.spacing.itemMargin}',
                color: colors.textDark,
              }}>
                About Me
              </h3>
              <p style={{ 
                fontSize: '${analysis.typography.sizes.body}', 
                lineHeight: '${analysis.spacing.lineHeight}',
                color: colors.textLight,
              }}>
                {data.summary.text}
              </p>
            </section>
          )}
`
  }
  
  if (analysis.sections.skills && analysis.elements.hasProgressBars) {
    content += `
          {/* Skills */}
          {data.skillCategories && data.skillCategories.length > 0 && (
            <section style={{ marginBottom: '${analysis.spacing.sectionMargin}' }}>
              <h3 style={{ 
                fontSize: '${analysis.typography.sizes.h2}', 
                fontWeight: ${analysis.typography.weights.bold},
                marginBottom: '${analysis.spacing.itemMargin}',
                color: colors.textDark,
              }}>
                Skills
              </h3>
              {data.skillCategories.map((category, idx) => (
                <div key={idx} style={{ marginBottom: '${analysis.spacing.itemMargin}' }}>
                  {category.skills.map((skill, i) => (
                    <div key={i} style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '${analysis.typography.sizes.small}', marginBottom: '4px' }}>
                        {skill.name}
                      </div>
                      <div style={{ 
                        width: '100%', 
                        height: '6px', 
                        backgroundColor: '#e0e0e0', 
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{ 
                          width: \`\${skill.level === 'Expert' ? 90 : skill.level === 'Advanced' ? 70 : skill.level === 'Intermediate' ? 50 : 30}%\`, 
                          height: '100%', 
                          backgroundColor: colors.accent,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )}
`
  }
  
  if (analysis.sections.contact) {
    content += `
          {/* Contact */}
          <section style={{ marginBottom: '${analysis.spacing.sectionMargin}' }}>
            <h3 style={{ 
              fontSize: '${analysis.typography.sizes.h2}', 
              fontWeight: ${analysis.typography.weights.bold},
              marginBottom: '${analysis.spacing.itemMargin}',
              color: colors.textDark,
            }}>
              Contact
            </h3>
            <div style={{ fontSize: '${analysis.typography.sizes.small}', color: colors.textLight }}>
              {data.personal.email && <div style={{ marginBottom: '5px' }}>✉ {data.personal.email}</div>}
              {data.personal.phone && <div style={{ marginBottom: '5px' }}>📱 {data.personal.phone}</div>}
              {data.personal.location && <div style={{ marginBottom: '5px' }}>📍 {data.personal.location}</div>}
            </div>
          </section>
`
  }
  
  return content
}

function generateMainContent(analysis: TemplateAnalysis): string {
  let content = ''
  
  if (analysis.sections.experience) {
    content += `
        {/* Experience */}
        {data.experience.length > 0 && (
          <section style={{ marginBottom: '${analysis.spacing.sectionMargin}' }}>
            <h2 style={{ 
              fontSize: '${analysis.typography.sizes.h2}', 
              fontWeight: ${analysis.typography.weights.bold},
              marginBottom: '${analysis.spacing.itemMargin}',
              color: colors.textDark,
              textTransform: 'uppercase',
            }}>
              Experience
            </h2>
            {data.experience.slice(0, 3).map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '${analysis.spacing.itemMargin}' }}>
                <h3 style={{ 
                  fontSize: '${analysis.typography.sizes.h3}', 
                  fontWeight: ${analysis.typography.weights.semibold},
                  margin: '0 0 4px 0',
                  color: colors.textDark,
                }}>
                  {exp.position}
                </h3>
                <div style={{ 
                  fontSize: '${analysis.typography.sizes.body}', 
                  color: colors.accent,
                  marginBottom: '4px',
                }}>
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </div>
                {exp.description && (
                  <p style={{ 
                    fontSize: '${analysis.typography.sizes.body}', 
                    lineHeight: '${analysis.spacing.lineHeight}',
                    color: colors.textLight,
                    margin: '0 0 8px 0',
                  }}>
                    {exp.description}
                  </p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '20px', 
                    fontSize: '${analysis.typography.sizes.body}',
                    color: colors.textLight,
                  }}>
                    {exp.achievements.slice(0, 3).map((achievement, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
`
  }
  
  if (analysis.sections.education) {
    content += `
        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: '${analysis.spacing.sectionMargin}' }}>
            <h2 style={{ 
              fontSize: '${analysis.typography.sizes.h2}', 
              fontWeight: ${analysis.typography.weights.bold},
              marginBottom: '${analysis.spacing.itemMargin}',
              color: colors.textDark,
              textTransform: 'uppercase',
            }}>
              Education
            </h2>
            {data.education.slice(0, 2).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '${analysis.spacing.itemMargin}' }}>
                <h3 style={{ 
                  fontSize: '${analysis.typography.sizes.h3}', 
                  fontWeight: ${analysis.typography.weights.semibold},
                  margin: '0 0 4px 0',
                  color: colors.textDark,
                }}>
                  {edu.degree}
                </h3>
                <div style={{ 
                  fontSize: '${analysis.typography.sizes.body}', 
                  color: colors.accent,
                }}>
                  {edu.institution} | {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </section>
        )}
`
  }
  
  return content
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

/**
 * Step 3: Manual Analysis Guide
 * Print this to help analyze an image
 */
export function printAnalysisGuide(): string {
  return `
📸 IMAGE TO TEMPLATE ANALYSIS GUIDE
====================================

1. LAYOUT STRUCTURE
   - Is it single column, two column, or grid?
   - Where are the columns? (left/right/center)
   - What are the column widths? (estimate %)
   - Is there a header bar at the top?
   - Is there a footer?

2. COLOR PALETTE
   - Primary color (main theme color)
   - Accent color (highlights, links)
   - Background colors (main, sidebar)
   - Text colors (dark, light, muted)
   - Border colors

3. TYPOGRAPHY
   - Font family (Arial, Helvetica, etc.)
   - Name size (h1)
   - Section header size (h2)
   - Subsection size (h3)
   - Body text size
   - Small text size (footer, metadata)

4. SPACING
   - Container padding
   - Section margins
   - Item margins
   - Line height

5. VISUAL ELEMENTS
   - Photo? (yes/no, position, shape, size)
   - Borders? (yes/no, style, width)
   - Icons? (yes/no, style)
   - Progress bars? (yes/no, style)
   - Badges? (yes/no, style)

6. SECTIONS
   - Which sections are present?
   - What order are they in?
   - How are they styled?

7. SPECIAL FEATURES
   - Timeline indicators?
   - Skill ratings?
   - Language proficiency indicators?
   - Social media icons?
   - QR codes?

Use this guide to fill out the TemplateAnalysis object!
`
}

/**
 * Example Usage:
 * 
 * 1. Analyze your image:
 *    const analysis = analyzeTemplateImage('path/to/image.png')
 * 
 * 2. Generate code:
 *    const code = generateTemplateCode(analysis, 'simple-hipster')
 * 
 * 3. Save to file and refine manually
 */
