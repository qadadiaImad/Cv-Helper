/**
 * Simple Hipster CV Template (Proper Version)
 * Accurately recreated from LaTeX Overleaf template
 * Source: https://fr.overleaf.com/latex/templates/simple-hipster-cv/cnpkkjdkyhhw
 * 
 * Design Features:
 * - Dark gray header bar with name and title
 * - Light gray left sidebar (27% width)
 * - White main content area (73% width)
 * - Cyan accent color for highlights and badges
 * - Circular photo in sidebar
 * - Cyan badges for section headers in sidebar
 * - Orange/red gradient progress bars for skills
 * - Timeline-style experience section
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const SimpleHipsterProper: React.FC<UniversalTemplateProps> = ({ data }) => {
  const colors = {
    headerBg: '#4a4a4a',       // Dark gray header
    sidebarBg: '#ececec',      // Light gray sidebar
    cyan: '#00bcd4',           // Accent color (badges, highlights)
    orange: '#ff6b35',         // Skill bar color
    textDark: '#333333',
    textMuted: '#666666',
    background: '#ffffff',
    border: '#e0e0e0',
  }

  // Skill bar component with orange gradient
  const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ 
        fontSize: '10px', 
        marginBottom: '4px', 
        color: colors.textDark,
        fontWeight: 500,
      }}>
        {skill}
      </div>
      <div style={{ 
        width: '100%', 
        height: '6px', 
        backgroundColor: '#ddd', 
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${level * 100}%`, 
          height: '100%', 
          background: `linear-gradient(90deg, ${colors.orange} 0%, #ff8c5a 100%)`,
          borderRadius: '3px',
        }} />
      </div>
    </div>
  )

  // Cyan badge for sidebar section headers
  const SidebarSectionHeader = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      backgroundColor: colors.cyan,
      color: '#ffffff',
      padding: '8px 12px',
      fontSize: '11px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '12px',
      borderRadius: '3px',
      letterSpacing: '0.5px',
    }}>
      {children}
    </div>
  )

  // Language proficiency dots
  const LanguageDots = ({ level }: { level: string }) => {
    const dots = level === 'Native' ? 5 : level === 'Fluent' ? 4 : level === 'Professional' ? 3 : level === 'Intermediate' ? 2 : 1
    return (
      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: i < dots ? colors.cyan : '#ddd',
          }} />
        ))}
      </div>
    )
  }

  return (
    <div style={{
      width: '850px',
      height: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, Helvetica, sans-serif',
      backgroundColor: colors.background,
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* Dark Gray Header */}
      <header style={{
        backgroundColor: colors.headerBg,
        padding: '25px 30px',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          letterSpacing: '1px',
        }}>
          {data.personal.fullName}
        </h1>
        {data.personal.title && (
          <h2 style={{
            fontSize: '16px',
            fontWeight: '300',
            margin: 0,
            letterSpacing: '0.5px',
          }}>
            {data.personal.title}
          </h2>
        )}
      </header>

      <div style={{ display: 'flex', height: 'calc(100% - 90px)' }}>
        {/* Left Sidebar - Light Gray */}
        <aside style={{
          width: '27%',
          backgroundColor: colors.sidebarBg,
          padding: '20px 15px',
          overflow: 'auto',
        }}>
          {/* Circular Photo */}
          {data.personal.photo && (
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 20px auto',
              border: `3px solid ${colors.cyan}`,
              backgroundColor: '#fff',
            }}>
              <img 
                src={data.personal.photo} 
                alt={data.personal.fullName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* About Me */}
          {data.summary && (
            <section style={{ marginBottom: '20px' }}>
              <SidebarSectionHeader>About Me</SidebarSectionHeader>
              <p style={{
                fontSize: '10px',
                lineHeight: '1.6',
                color: colors.textDark,
                margin: 0,
                textAlign: 'justify',
              }}>
                {data.summary.text}
              </p>
            </section>
          )}

          {/* Personal Info */}
          <section style={{ marginBottom: '20px' }}>
            <SidebarSectionHeader>Personal</SidebarSectionHeader>
            <div style={{ fontSize: '10px', color: colors.textDark, lineHeight: '1.8' }}>
              <div><strong>{data.personal.fullName}</strong></div>
              {data.personal.location && <div>{data.personal.location}</div>}
            </div>
          </section>

          {/* Skills with Progress Bars */}
          {data.skillCategories && data.skillCategories.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <SidebarSectionHeader>Skills</SidebarSectionHeader>
              {data.skillCategories.map((category, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: 'bold', 
                    marginBottom: '10px',
                    color: colors.textDark,
                  }}>
                    {category.category}
                  </div>
                  {category.skills.map((skill, i) => (
                    <SkillBar 
                      key={i} 
                      skill={skill.name} 
                      level={
                        skill.level === 'Expert' ? 0.95 : 
                        skill.level === 'Advanced' ? 0.75 : 
                        skill.level === 'Intermediate' ? 0.55 : 0.35
                      }
                    />
                  ))}
                </div>
              ))}
            </section>
          )}

          {/* Languages with Dots */}
          {data.languages && data.languages.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <SidebarSectionHeader>Languages</SidebarSectionHeader>
              {data.languages.map((lang, idx) => (
                <div key={idx} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: colors.textDark }}>
                    {lang.name}
                  </div>
                  <div style={{ fontSize: '9px', color: colors.textMuted, marginTop: '2px' }}>
                    {lang.proficiency}
                  </div>
                  <LanguageDots level={lang.proficiency} />
                </div>
              ))}
            </section>
          )}

          {/* Contact with Cyan Badges */}
          <section style={{ marginBottom: '20px' }}>
            <SidebarSectionHeader>Contact</SidebarSectionHeader>
            <div style={{ fontSize: '9px' }}>
              {data.personal.email && (
                <div style={{
                  backgroundColor: colors.cyan,
                  color: '#ffffff',
                  padding: '6px 10px',
                  marginBottom: '8px',
                  borderRadius: '3px',
                  wordBreak: 'break-all',
                }}>
                  ✉ {data.personal.email}
                </div>
              )}
              {data.personal.phone && (
                <div style={{
                  backgroundColor: colors.cyan,
                  color: '#ffffff',
                  padding: '6px 10px',
                  marginBottom: '8px',
                  borderRadius: '3px',
                }}>
                  📱 {data.personal.phone}
                </div>
              )}
              {data.personal.linkedIn && (
                <div style={{
                  backgroundColor: colors.cyan,
                  color: '#ffffff',
                  padding: '6px 10px',
                  marginBottom: '8px',
                  borderRadius: '3px',
                  wordBreak: 'break-all',
                }}>
                  💼 {data.personal.linkedIn}
                </div>
              )}
              {data.personal.website && (
                <div style={{
                  backgroundColor: colors.cyan,
                  color: '#ffffff',
                  padding: '6px 10px',
                  marginBottom: '8px',
                  borderRadius: '3px',
                  wordBreak: 'break-all',
                }}>
                  🌐 {data.personal.website}
                </div>
              )}
            </div>
          </section>
        </aside>

        {/* Main Content Area - White */}
        <main style={{
          width: '73%',
          padding: '20px 30px',
          overflow: 'auto',
        }}>
          {/* Experience Section */}
          {data.experience.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: colors.textDark,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `2px solid ${colors.cyan}`,
                paddingBottom: '8px',
              }}>
                Experience
              </h2>
              {data.experience.slice(0, 3).map((exp, idx) => (
                <div key={idx} style={{ 
                  marginBottom: '20px',
                  paddingLeft: '20px',
                  borderLeft: `3px solid ${colors.cyan}`,
                  position: 'relative',
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-7px',
                    top: '5px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: colors.cyan,
                    border: '2px solid #fff',
                  }} />
                  
                  <div style={{
                    fontSize: '10px',
                    color: colors.textMuted,
                    marginBottom: '4px',
                    fontWeight: 'bold',
                  }}>
                    {exp.startDate} — {exp.endDate}
                  </div>
                  
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: colors.textDark,
                    margin: '0 0 4px 0',
                  }}>
                    {exp.position}
                  </h3>
                  
                  <div style={{
                    fontSize: '12px',
                    color: colors.cyan,
                    marginBottom: '8px',
                    fontWeight: 'bold',
                  }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  
                  {exp.description && (
                    <p style={{
                      fontSize: '11px',
                      lineHeight: '1.5',
                      color: colors.textDark,
                      margin: '0 0 8px 0',
                    }}>
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: 0,
                      paddingLeft: '18px',
                      fontSize: '10px',
                      color: colors.textDark,
                      lineHeight: '1.6',
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

          {/* Education Section */}
          {data.education.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: colors.textDark,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `2px solid ${colors.cyan}`,
                paddingBottom: '8px',
              }}>
                Education
              </h2>
              {data.education.slice(0, 2).map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontSize: '10px',
                    color: colors.textMuted,
                    marginBottom: '4px',
                  }}>
                    {edu.startDate} — {edu.endDate}
                  </div>
                  
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: colors.textDark,
                    margin: '0 0 4px 0',
                  }}>
                    {edu.degree}
                  </h3>
                  
                  <div style={{
                    fontSize: '11px',
                    color: colors.cyan,
                    marginBottom: '4px',
                  }}>
                    {edu.institution} {edu.location && `• ${edu.location}`}
                  </div>
                  
                  {edu.gpa && (
                    <div style={{ fontSize: '10px', color: colors.textMuted }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Publications */}
          {data.publications && data.publications.length > 0 && data.publications.length <= 2 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: colors.textDark,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `2px solid ${colors.cyan}`,
                paddingBottom: '8px',
              }}>
                Publications
              </h2>
              {data.publications.map((pub, idx) => (
                <div key={idx} style={{ marginBottom: '12px', fontSize: '10px', color: colors.textDark }}>
                  <strong>{pub.date}</strong> - <em>{pub.title}</em>, {pub.publisher}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && data.certifications.length <= 2 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: colors.textDark,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: `2px solid ${colors.cyan}`,
                paddingBottom: '8px',
              }}>
                Certificates & Grants
              </h2>
              {data.certifications.map((cert, idx) => (
                <div key={idx} style={{ marginBottom: '10px', fontSize: '10px', color: colors.textDark }}>
                  <strong>{cert.date}</strong> - {cert.name}, {cert.issuer}
                </div>
              ))}
            </section>
          )}

          {/* Footer */}
          <footer style={{
            marginTop: 'auto',
            paddingTop: '15px',
            borderTop: `1px solid ${colors.border}`,
            textAlign: 'center',
            fontSize: '8px',
            color: colors.textMuted,
          }}>
            {data.personal.fullName} • {data.personal.email} • {data.personal.phone}
            {data.personal.location && ` • ${data.personal.location}`}
          </footer>
        </main>
      </div>
    </div>
  )
}
