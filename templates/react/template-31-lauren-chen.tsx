/**
 * TEMPLATE 31 - LAUREN CHEN STYLE
 * Professional resume with teal header, circular photo, and two-column layout
 * Features: Contact info with icons, summary section, skills with progress bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template31: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
    }}>
      {/* Teal Header */}
      <div style={{
        background: '#3D6B7D',
        padding: '40px 60px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 300,
          letterSpacing: '8px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0',
        }}>
          {data.personal?.fullName || 'YOUR NAME'}
        </h1>
        <div style={{
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.95,
        }}>
          {data.personal?.title || 'Professional Title'}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '0',
        padding: '40px 60px',
      }}>
        {/* Left Column */}
        <div style={{ paddingRight: '40px' }}>
          {/* Profile Photo */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '8px solid #E8E8E8',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
            margin: '0 0 30px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {data.personal?.photo?.url ? (
              <img
                src={data.personal.photo.url}
                alt={data.personal?.fullName || 'Profile'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: data.personal.photo.effects?.grayscale ? 'grayscale(100%)' : 'none',
                }}
              />
            ) : (
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="30" r="16" fill="#7BA8C0" opacity="0.6" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#7BA8C0"
                  opacity="0.6"
                />
              </svg>
            )}
          </div>

          {/* Contact Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#3D6B7D',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3D6B7D',
              }} />
              CONTACT
            </h3>
            <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.8 }}>
              {data.personal?.phone && (
                <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, minWidth: '60px' }}>phone</span>
                  <span>{data.personal.phone}</span>
                </div>
              )}
              {data.personal?.email && (
                <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, minWidth: '60px' }}>email</span>
                  <span style={{ wordBreak: 'break-all' }}>{data.personal.email}</span>
                </div>
              )}
              {data.personal?.location && (
                <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, minWidth: '60px' }}>address</span>
                  <span>{data.personal.location}</span>
                </div>
              )}
              {data.personal?.website && (
                <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, minWidth: '60px' }}>website</span>
                  <span style={{ wordBreak: 'break-all' }}>{data.personal.website}</span>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontWeight: 700, minWidth: '60px' }}>linkedin</span>
                  <span style={{ wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                SUMMARY
              </h3>
              <div style={{
                fontSize: '11px',
                color: '#555555',
                lineHeight: 1.7,
                textAlign: 'justify',
              }}>
                {data.summary}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                EDUCATION
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#888888',
                    marginBottom: '4px',
                  }}>
                    {edu.startDate && edu.endDate ? `Expected Graduation ${edu.endDate}` : edu.endDate || ''}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </div>
                  {edu.gpa && (
                    <div style={{
                      fontSize: '11px',
                      color: '#555555',
                      marginBottom: '2px',
                    }}>
                      Honors: cum laude (GPA: {edu.gpa})
                    </div>
                  )}
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                  }}>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      {edu.honors.map((honor: string, j: number) => (
                        <div key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          marginBottom: '4px',
                          paddingLeft: '12px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '0',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#3D6B7D',
                          }} />
                          {honor}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                RELEVANT SKILLS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 6).map((skill, i) => {
                  const percentages = [80, 70, 90, 75, 95, 80]
                  return (
                    <div key={i}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                      }}>
                        <span style={{
                          fontSize: '11px',
                          color: '#333333',
                          fontWeight: 600,
                        }}>
                          {skill}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          color: '#3D6B7D',
                          fontWeight: 700,
                        }}>
                          {percentages[i]}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#E8E8E8',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${percentages[i]}%`,
                          height: '100%',
                          background: '#3D6B7D',
                          borderRadius: '3px',
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ paddingLeft: '40px', borderLeft: '1px solid #E8E8E8' }}>
          {/* Professional Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                PROFESSIONAL EXPERIENCE
              </h3>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '28px', position: 'relative', paddingLeft: '20px' }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3D6B7D',
                  }} />
                  
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
                    color: '#3D6B7D',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 16px',
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
                            left: '-16px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#3D6B7D',
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
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                PROJECTS
              </h3>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '20px', paddingLeft: '20px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3D6B7D',
                  }} />
                  <div style={{
                    fontSize: '12px',
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
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                CERTIFICATIONS
              </h3>
              {data.certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3D6B7D',
                  }} />
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                  }}>
                    {cert.name}
                    {cert.issuer && ` - ${cert.issuer}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
