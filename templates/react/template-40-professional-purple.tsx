/**
 * TEMPLATE 40 - PROFESSIONAL PURPLE
 * Professional resume with purple header, timeline design, and skill progress bars
 * Features: Two-column layout, circular timeline markers, contact icons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template40: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#F5F5F5',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Purple Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #9B6B9E 0%, #B088B3 100%)',
        padding: '50px 60px',
        color: '#FFFFFF',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          {/* Left - Name */}
          <div>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 10px 0',
              lineHeight: 1,
            }}>
              {data.personal?.fullName?.split(' ')[0] || 'First'}
            </h1>
            <h1 style={{
              fontSize: '56px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              lineHeight: 1,
            }}>
              {data.personal?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
            </h1>
          </div>

          {/* Right - Title Badge */}
          <div style={{
            border: '2px solid #FFFFFF',
            borderRadius: '25px',
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#FFFFFF',
            marginTop: '10px',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <p style={{
            fontSize: '14px',
            color: '#FFFFFF',
            lineHeight: 1.6,
            margin: '20px 0 0 0',
            maxWidth: '700px',
          }}>
            {data.summary}
          </p>
        )}
      </div>

      {/* Contact Bar */}
      <div style={{
        background: '#F5F5F5',
        padding: '20px 60px',
        display: 'flex',
        gap: '40px',
        flexWrap: 'wrap',
      }}>
        {data.personal?.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#9B6B9E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '14px',
            }}>
              📞
            </div>
            <span style={{ fontSize: '13px', color: '#555555' }}>{data.personal.phone}</span>
          </div>
        )}
        {data.personal?.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#9B6B9E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '14px',
            }}>
              📍
            </div>
            <span style={{ fontSize: '13px', color: '#555555' }}>{data.personal.location}</span>
          </div>
        )}
        {data.personal?.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#9B6B9E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '14px',
            }}>
              ✉️
            </div>
            <span style={{ fontSize: '13px', color: '#555555', wordBreak: 'break-all' }}>{data.personal.email}</span>
          </div>
        )}
        {data.personal?.linkedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#9B6B9E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '14px',
            }}>
              💼
            </div>
            <span style={{ fontSize: '13px', color: '#555555', wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '0',
      }}>
        {/* Left Column - Experience */}
        <div style={{
          background: '#FFFFFF',
          padding: '40px 60px',
        }}>
          {/* Professional Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#9B6B9E',
                textTransform: 'capitalize',
                marginBottom: '30px',
              }}>
                Professional Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ 
                  marginBottom: '40px',
                  position: 'relative',
                  paddingLeft: '70px',
                }}>
                  {/* Timeline Oval */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      width: '48px',
                      height: '75px',
                      borderRadius: '24px',
                      background: '#E8DDD0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      color: '#555555',
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '10px 6px',
                      lineHeight: 1.4,
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}>
                      {exp.startDate?.split(' ')[1] || exp.startDate} — {exp.endDate?.split(' ')[1] || exp.endDate || '22'}
                    </div>
                    {i < data.experience.length - 1 && (
                      <div style={{
                        width: '2px',
                        height: '45px',
                        background: '#E8DDD0',
                        marginTop: '5px',
                      }} />
                    )}
                  </div>

                  <div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#9B6B9E',
                      marginBottom: '4px',
                    }}>
                      {exp.position}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666666',
                      marginBottom: '10px',
                    }}>
                      {exp.company}, {exp.location}
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
                              background: '#9B6B9E',
                            }} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Education & Skills */}
        <div style={{
          background: '#FFFFFF',
          padding: '40px 40px',
        }}>
          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#9B6B9E',
                textTransform: 'capitalize',
                marginBottom: '25px',
                textAlign: 'center',
              }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ 
                  marginBottom: '25px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '4px',
                  }}>
                    {edu.endDate || edu.startDate || ''}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#9B6B9E',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                  }}>
                    {edu.institution}, {edu.location}
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

          {/* Key Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#9B6B9E',
                textTransform: 'capitalize',
                marginBottom: '25px',
                textAlign: 'center',
              }}>
                Key Skills
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 4).map((skill, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#333333',
                      marginBottom: '6px',
                      textAlign: 'center',
                    }}>
                      {skill}
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#E0E0E0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: '85%',
                        height: '100%',
                        background: '#9B6B9E',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 4 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#9B6B9E',
                textTransform: 'capitalize',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                Additional Skills
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(4, 8).map((skill, i) => (
                  <div key={i} style={{
                    fontSize: '13px',
                    color: '#555555',
                    textAlign: 'center',
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#9B6B9E',
                textTransform: 'capitalize',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                Languages
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
              }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name
                  return (
                    <div key={i} style={{
                      fontSize: '13px',
                      color: '#555555',
                      textAlign: 'center',
                    }}>
                      {langName}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
