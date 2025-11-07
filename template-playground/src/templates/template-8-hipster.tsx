/**
 * Simple Hipster CV Template
 * Converted from LaTeX Overleaf template: https://fr.overleaf.com/latex/templates/simple-hipster-cv/cnpkkjdkyhhw
 * Two-column layout with green sidebar, photo, and skill progress bars
 * 
 * NOTE: External photos (like pravatar.cc) may not appear in PDF due to CORS restrictions.
 * For PDF generation, use base64-encoded images or images from same domain.
 * Content is limited to fit A4: max 3 experiences, 2 education, limited publications/certs/projects.
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const SimpleHipster: React.FC<UniversalTemplateProps> = ({ data }) => {
  const colors = {
    darkGray: '#4a4a4a',      // Header background
    cyan: '#00bcd4',          // Accent color (buttons, highlights)
    lightGray: '#f0f0f0',     // Sidebar background
    textDark: '#333333',
    textLight: '#666666',
    orange: '#ff6b35',        // Skill bars
    background: '#ffffff',
  }

  const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ fontSize: '11px', marginBottom: '4px', color: colors.textDark }}>{skill}</div>
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: '#e0e0e0', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${level * 100}%`, 
          height: '100%', 
          backgroundColor: colors.green,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  )

  return (
    <div style={{
      width: '850px', // A4 width in pixels (210mm ≈ 850px at 96dpi)
      maxWidth: '850px',
      height: '1200px', // A4 height in pixels (297mm ≈ 1200px at 96dpi)
      margin: '0 auto',
      fontFamily: 'Raleway, Arial, sans-serif',
      backgroundColor: colors.background,
      display: 'flex',
      overflow: 'hidden', // Prevent content overflow
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* Left Sidebar - 23% */}
      <aside style={{
        width: '23%',
        backgroundColor: colors.sidebarBg,
        padding: '12px 8px 5px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        {/* Photo */}
        {data.personal.photo && (
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '12px',
            border: `2px solid ${colors.green}`,
            backgroundColor: '#e0e0e0',
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
          <div style={{ marginBottom: '8px', width: '100%' }}>
            <div style={{
              backgroundColor: colors.green,
              color: 'white',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              About Me
            </div>
            <p style={{ 
              fontSize: '9px', 
              lineHeight: '1.5', 
              color: colors.textDark,
              textAlign: 'justify'
            }}>
              {data.summary.text}
            </p>
          </div>
        )}

        {/* Personal Info */}
        <div style={{ marginBottom: '8px', width: '100%' }}>
          <div style={{
            backgroundColor: colors.green,
            color: 'white',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            Personal
          </div>
          <div style={{ fontSize: '9px', color: colors.textDark }}>
            <div style={{ marginBottom: '4px' }}><strong>{data.personal.fullName}</strong></div>
            {data.personal.location && (
              <div style={{ marginBottom: '4px' }}>{data.personal.location}</div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skillCategories && data.skillCategories.length > 0 && (
          <div style={{ marginBottom: '8px', width: '100%' }}>
            <div style={{
              backgroundColor: colors.green,
              color: 'white',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Skills
            </div>
            <div style={{ fontSize: '9px' }}>
              {data.skillCategories.map((category, idx) => (
                <div key={idx} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px', color: colors.textDark, fontSize: '9px' }}>
                    {category.category}
                  </div>
                  {category.skills.map((skill, i) => (
                    <SkillBar 
                      key={i} 
                      skill={skill.name} 
                      level={skill.level === 'Expert' ? 0.9 : skill.level === 'Advanced' ? 0.7 : skill.level === 'Intermediate' ? 0.5 : 0.3}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Simple skills list as fallback */}
        {data.skills && data.skills.length > 0 && !data.skillCategories && (
          <div style={{ marginBottom: '8px', width: '100%' }}>
            <div style={{
              backgroundColor: colors.green,
              color: 'white',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Skills
            </div>
            <div style={{ fontSize: '9px', lineHeight: '1.6' }}>
              {data.skills.join(' • ')}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: '8px', width: '100%' }}>
            <div style={{
              backgroundColor: colors.green,
              color: 'white',
              padding: '6px 10px',
              fontSize: '11px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Languages
            </div>
            {data.languages.map((lang, idx) => (
              <div key={idx} style={{ fontSize: '9px', marginBottom: '4px' }}>
                <strong>{lang.name}</strong>: {lang.proficiency}
              </div>
            ))}
          </div>
        )}

        {/* Contact Info */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ fontSize: '9px', color: colors.textDark }}>
            {data.personal.email && (
              <div style={{
                backgroundColor: colors.green,
                color: 'white',
                padding: '5px 8px',
                marginBottom: '6px',
                borderRadius: '4px',
                wordBreak: 'break-all',
              }}>
                ✉ {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div style={{
                backgroundColor: colors.green,
                color: 'white',
                padding: '5px 8px',
                marginBottom: '6px',
                borderRadius: '4px',
              }}>
                📱 {data.personal.phone}
              </div>
            )}
            {data.personal.linkedIn && (
              <div style={{
                backgroundColor: colors.green,
                color: 'white',
                padding: '5px 8px',
                marginBottom: '6px',
                borderRadius: '4px',
              }}>
                in {data.personal.linkedIn}
              </div>
            )}
            {data.personal.github && (
              <div style={{
                backgroundColor: colors.green,
                color: 'white',
                padding: '5px 8px',
                marginBottom: '6px',
                borderRadius: '4px',
              }}>
                🐙 {data.personal.github}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Right Column - 75% */}
      <main style={{
        width: '75%',
        padding: '12px 18px 5px 22px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <header style={{ 
          marginBottom: '10px',
          borderBottom: `2px solid ${colors.green}`,
          paddingBottom: '6px',
        }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: 'bold',
            color: colors.textDark,
            margin: '0 0 4px 0',
            letterSpacing: '0.5px',
          }}>
            {data.personal.fullName}
          </h1>
          {data.personal.title && (
            <h2 style={{
              fontSize: '13px',
              fontWeight: '300',
              color: colors.textLight,
              margin: 0,
            }}>
              {data.personal.title}
            </h2>
          )}
        </header>

        {/* Experience */}
        {data.experience.length > 0 && (
          <section style={{ marginBottom: '10px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: colors.textDark,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Experience
            </h3>
            {data.experience.slice(0, 3).map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <div style={{ 
                  minWidth: '100px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: colors.textLight,
                  paddingTop: '2px',
                }}>
                  {exp.startDate} — {exp.endDate}
                </div>
                <div style={{ flex: 1, borderLeft: `2px solid ${colors.green}`, paddingLeft: '12px' }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: colors.textDark,
                    margin: '0 0 4px 0',
                  }}>
                    {exp.position}
                  </h4>
                  <div style={{
                    fontSize: '10px',
                    color: colors.red,
                    marginBottom: '4px',
                  }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', lineHeight: '1.4', color: colors.textDark, margin: '0 0 4px 0' }}>
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '9px', color: colors.textDark }}>
                      {exp.achievements.slice(0, 3).map((achievement, i) => (
                        <li key={i} style={{ marginBottom: '2px', lineHeight: '1.3' }}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: '10px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: colors.textDark,
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Education
            </h3>
            {data.education.slice(0, 2).map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                <div style={{ 
                  minWidth: '100px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: colors.textLight,
                  paddingTop: '2px',
                }}>
                  {edu.startDate} — {edu.endDate}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: colors.textDark,
                    margin: '0 0 4px 0',
                  }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <div style={{
                    fontSize: '13px',
                    color: colors.blue,
                    marginBottom: '4px',
                  }}>
                    {edu.institution} {edu.location && `• ${edu.location}`}
                  </div>
                  {edu.gpa && (
                    <div style={{ fontSize: '12px', color: colors.textLight }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{ fontSize: '12px', color: colors.textDark, marginTop: '6px' }}>
                      <em>{edu.honors.join(', ')}</em>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {data.publications && data.publications.length > 0 && data.publications.length <= 2 && (
          <section style={{ marginBottom: '15px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: colors.textDark,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Publications
            </h3>
            {data.publications.map((pub, idx) => (
              <div key={idx} style={{ marginBottom: '15px', display: 'flex', gap: '20px' }}>
                <div style={{ 
                  minWidth: '60px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: colors.textLight,
                }}>
                  {pub.date}
                </div>
                <div style={{ flex: 1, fontSize: '12px', color: colors.textDark }}>
                  <em>{pub.title}</em>, {pub.publisher}.
                  {pub.description && ` ${pub.description}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && data.certifications.length <= 2 && (
          <section style={{ marginBottom: '15px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: colors.textDark,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Certificates & Grants
            </h3>
            {data.certifications.map((cert, idx) => (
              <div key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '20px' }}>
                <div style={{ 
                  minWidth: '100px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: colors.textLight,
                }}>
                  {cert.date}
                </div>
                <div style={{ flex: 1, fontSize: '12px', color: colors.textDark }}>
                  <strong>{cert.name}</strong> - {cert.issuer}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && data.projects.length <= 1 && (
          <section style={{ marginBottom: '15px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: colors.textDark,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Projects
            </h3>
            {data.projects.map((project, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: colors.textDark,
                  margin: '0 0 6px 0',
                }}>
                  {project.name}
                </h4>
                <p style={{ fontSize: '12px', lineHeight: '1.6', color: colors.textDark, margin: '0 0 6px 0' }}>
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div style={{ fontSize: '11px', color: colors.textLight }}>
                    <strong>Tech:</strong> {project.technologies.join(', ')}
                  </div>
                )}
                {project.url && (
                  <div style={{ fontSize: '11px', color: colors.blue, marginTop: '4px' }}>
                    🔗 {project.url}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <footer style={{
          marginTop: 'auto',
          paddingTop: '6px',
          borderTop: `1px solid #e0e0e0`,
          textAlign: 'center',
          fontSize: '7px',
          color: colors.textLight,
        }}>
          {data.personal.fullName} • {data.personal.email} • {data.personal.phone}
          {data.personal.location && ` • ${data.personal.location}`}
        </footer>
      </main>
    </div>
  )
}
