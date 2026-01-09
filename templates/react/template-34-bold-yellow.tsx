/**
 * TEMPLATE 34 - BOLD YELLOW
 * Professional resume with dark header, yellow gradient bar, and two-column layout
 * Features: Yellow section headers, left sidebar with contact/education, main content area
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template34: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#F5F5F5',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
    }}>
      {/* Dark Header */}
      <div style={{
        background: '#3A4A5C',
        padding: '40px 60px',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          margin: '0 0 8px 0',
        }}>
          {data.personal?.fullName || 'Your Name'}
        </h1>
        <div style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#C8A951',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}>
          {data.personal?.title || 'Professional Title'}
        </div>
      </div>

      {/* Yellow Gradient Bar */}
      <div style={{
        height: '8px',
        background: 'linear-gradient(to right, #C8A951 0%, #E8D68A 50%, #A8C957 100%)',
      }} />

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '0',
        minHeight: '800px',
      }}>
        {/* Left Sidebar */}
        <div style={{
          background: '#FFFFFF',
          padding: '40px 30px',
        }}>
          {/* Contact Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#C8A951',
              textTransform: 'uppercase',
              marginBottom: '16px',
              letterSpacing: '1px',
            }}>
              CONTACT
            </h3>
            <div style={{ fontSize: '12px', color: '#333333', lineHeight: 1.8 }}>
              {data.personal?.phone && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>Phone</div>
                  <div>{data.personal.phone}</div>
                </div>
              )}
              {data.personal?.location && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>Address</div>
                  <div>{data.personal.location}</div>
                </div>
              )}
              {data.personal?.email && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>Email</div>
                  <div style={{ wordBreak: 'break-all' }}>{data.personal.email}</div>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>LinkedIn</div>
                  <div style={{ wordBreak: 'break-all' }}>{data.personal.linkedIn}</div>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '16px',
                letterSpacing: '1px',
              }}>
                EDUCATION
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#666666',
                    marginBottom: '2px',
                  }}>
                    {edu.endDate || edu.startDate || ''}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#555555',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#666666',
                  }}>
                    {edu.location || ''}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#555555',
                      marginTop: '4px',
                      fontStyle: 'italic',
                    }}>
                      {edu.honors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Relevant Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '16px',
                letterSpacing: '1px',
              }}>
                RELEVANT SKILLS
              </h3>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
                  <li key={i} style={{
                    fontSize: '12px',
                    color: '#333333',
                    marginBottom: '8px',
                    paddingLeft: '16px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#C8A951',
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div style={{
          background: '#FFFFFF',
          padding: '40px 50px',
          marginLeft: '2px',
        }}>
          {/* Profile Section */}
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '16px',
                letterSpacing: '1px',
              }}>
                PROFILE
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#555555',
                lineHeight: 1.7,
                margin: '0',
              }}>
                {data.summary}
              </p>
            </div>
          )}

          {/* Professional Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                PROFESSIONAL EXPERIENCE
              </h3>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '28px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '2px',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                      }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      textAlign: 'right',
                    }}>
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </div>
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 18px',
                      listStyle: 'none',
                    }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '6px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '-18px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#C8A951',
                          }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                PROJECTS
              </h3>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '6px',
                  }}>
                    {proj.name}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                    lineHeight: 1.6,
                  }}>
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#C8A951',
                textTransform: 'uppercase',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                CERTIFICATIONS
              </h3>
              <ul style={{
                margin: '0',
                padding: '0 0 0 18px',
                listStyle: 'none',
              }}>
                {data.certifications.map((cert, i) => (
                  <li key={i} style={{
                    fontSize: '11px',
                    color: '#555555',
                    marginBottom: '8px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '-18px',
                      top: '6px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#C8A951',
                    }} />
                    {cert.name}
                    {cert.issuer && ` - ${cert.issuer}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
