/**
 * TEMPLATE 32 - ORANGE SIDEBAR LEFT
 * Professional resume with orange left sidebar and white main content
 * Features: Contact icons, summary section, skills list
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template32: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      display: 'flex',
    }}>
      {/* Orange Left Sidebar */}
      <div style={{
        width: '280px',
        background: '#D4915E',
        padding: '40px 30px',
        color: 'white',
        flexShrink: 0,
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 8px 0',
            lineHeight: 1.2,
          }}>
            {data.personal?.fullName?.split(' ')[0] || 'LAUREN'}
          </h1>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            {data.personal?.fullName?.split(' ').slice(1).join(' ') || 'CHEN'}
          </h1>
          <div style={{
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: 0.95,
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
          }}>
            CONTACT
          </h3>
          <div style={{ fontSize: '11px', lineHeight: 1.8 }}>
            {data.personal?.phone && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  📞
                </div>
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal?.email && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  ✉️
                </div>
                <span style={{ wordBreak: 'break-all' }}>{data.personal.email}</span>
              </div>
            )}
            {data.personal?.location && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  📍
                </div>
                <span>{data.personal.location}</span>
              </div>
            )}
            {data.personal?.website && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  🌐
                </div>
                <span style={{ wordBreak: 'break-all' }}>{data.personal.website}</span>
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  💼
                </div>
                <span style={{ wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
              </div>
            )}
            {data.personal?.github && (
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  💻
                </div>
                <span style={{ wordBreak: 'break-all' }}>{data.personal.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {data.summary && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            }}>
              SUMMARY
            </h3>
            <div style={{
              fontSize: '11px',
              lineHeight: 1.6,
              textAlign: 'justify',
            }}>
              {data.summary}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            }}>
              SKILLS
            </h3>
            <ul style={{
              margin: '0',
              padding: '0',
              listStyle: 'none',
            }}>
              {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
                <li key={i} style={{
                  fontSize: '11px',
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
                    background: 'white',
                  }} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* White Main Content */}
      <div style={{
        flex: 1,
        padding: '40px 50px',
        color: '#333333',
      }}>
        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '25px' }}>
                <div style={{
                  fontSize: '11px',
                  color: '#888888',
                  marginBottom: '4px',
                }}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '2px',
                }}>
                  {exp.position}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666666',
                  marginBottom: '10px',
                }}>
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
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
                          background: '#333333',
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
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '11px',
                  color: '#888888',
                  marginBottom: '4px',
                }}>
                  {edu.endDate || edu.startDate || ''}
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '2px',
                }}>
                  {edu.degree}
                  {edu.field && `, ${edu.field}`}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#666666',
                }}>
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              PROJECTS
            </h2>
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
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              CERTIFICATIONS
            </h2>
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
                    background: '#333333',
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
