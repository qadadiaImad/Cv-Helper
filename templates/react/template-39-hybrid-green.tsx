/**
 * TEMPLATE 39 - HYBRID MODERN GREEN
 * Professional resume with green top/bottom bars, skill tags, and clean layout
 * Features: Right-aligned contact, green skill badges, single-column layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template39: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#FFFFFF',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
    }}>
      {/* Header Section with Green Background */}
      <div style={{
        background: '#E8F0E3',
        padding: '0',
        margin: '20px 20px 30px 20px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        {/* Top Darker Green Bar */}
        <div style={{
          height: '12px',
          background: '#A4B494',
          width: '100%',
        }} />

        {/* Name and Contact Container */}
        <div style={{
          padding: '30px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          {/* Left - Name and Title */}
          <div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 700,
              color: '#2C3E50',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}>
              {data.personal?.fullName || 'YOUR NAME'}
            </h1>
            <div style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#666666',
            }}>
              {data.personal?.title || 'Professional Title'}
            </div>
          </div>

          {/* Right - Contact Info */}
          <div style={{
            textAlign: 'right',
            fontSize: '13px',
            color: '#555555',
            lineHeight: 1.8,
          }}>
            {data.personal?.phone && (
              <div>
                <span style={{ fontWeight: 600 }}>Phone:</span> {data.personal.phone}
              </div>
            )}
            {data.personal?.email && (
              <div>
                <span style={{ fontWeight: 600 }}>Email:</span> {data.personal.email}
              </div>
            )}
            {data.personal?.linkedIn && (
              <div>
                <span style={{ fontWeight: 600 }}>LinkedIn:</span> {data.personal.linkedIn}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 60px 50px' }}>
        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{
              fontSize: '13px',
              color: '#555555',
              lineHeight: 1.7,
              margin: '0',
            }}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Relevant Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '18px',
              borderBottom: '2px solid #E8E8E8',
              paddingBottom: '8px',
            }}>
              RELEVANT SKILLS
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  background: '#A4B494',
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#2C3E50',
                  fontWeight: 600,
                }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
              borderBottom: '2px solid #E8E8E8',
              paddingBottom: '8px',
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
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
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2C3E50',
                      marginBottom: '2px',
                    }}>
                      {exp.company}, {exp.location}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontStyle: 'italic',
                      color: '#666666',
                    }}>
                      {exp.position}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#888888',
                    fontStyle: 'italic',
                    textAlign: 'right',
                  }}>
                    {exp.startDate}—{exp.endDate || 'Present'}
                  </div>
                </div>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{
                    margin: '0',
                    padding: '0 0 0 20px',
                    listStyle: 'none',
                  }}>
                    {exp.achievements.map((achievement: string, j: number) => (
                      <li key={j} style={{
                        fontSize: '12px',
                        color: '#555555',
                        lineHeight: 1.6,
                        marginBottom: '6px',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-20px',
                          top: '7px',
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: '#2C3E50',
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

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
              borderBottom: '2px solid #E8E8E8',
              paddingBottom: '8px',
            }}>
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2C3E50',
                      marginBottom: '2px',
                    }}>
                      {edu.institution}, {edu.location}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontStyle: 'italic',
                      color: '#666666',
                    }}>
                      {edu.degree}
                      {edu.field && `, ${edu.field}`}
                      {edu.honors && edu.honors.length > 0 && `, Honors: ${edu.honors.join(', ')}`}
                      {edu.gpa && ` (GPA: ${edu.gpa})`}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#888888',
                    fontStyle: 'italic',
                    textAlign: 'right',
                  }}>
                    {edu.endDate || edu.startDate || ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
              borderBottom: '2px solid #E8E8E8',
              paddingBottom: '8px',
            }}>
              PROJECTS
            </h2>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2C3E50',
                  marginBottom: '6px',
                }}>
                  {proj.name}
                </div>
                <div style={{
                  fontSize: '12px',
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
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
              borderBottom: '2px solid #E8E8E8',
              paddingBottom: '8px',
            }}>
              CERTIFICATIONS
            </h2>
            <ul style={{
              margin: '0',
              padding: '0 0 0 20px',
              listStyle: 'none',
            }}>
              {data.certifications.map((cert, i) => (
                <li key={i} style={{
                  fontSize: '12px',
                  color: '#555555',
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '7px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#2C3E50',
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
  )
}
