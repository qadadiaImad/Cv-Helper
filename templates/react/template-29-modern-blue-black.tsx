/**
 * TEMPLATE 29 - MODERN BLUE BLACK
 * Modern two-column design with circular photo and skill bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ModernBlueBlackTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Arial', sans-serif",
      display: 'flex',
      position: 'relative',
    }}>
      {/* Left Sidebar - Black */}
      <aside style={{
        width: '220px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '0',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Photo */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#333',
          margin: '40px auto 30px',
          border: '6px solid #ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}>
          {data.personal?.photo?.url ? (
            <img
              src={data.personal.photo.url}
              alt={data.personal?.fullName || 'Profile'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#444' }} />
          )}
        </div>

        {/* About Me */}
        {data.summary && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '15px',
              textTransform: 'capitalize',
            }}>About Me</h2>
            <p style={{
              fontSize: '9px',
              color: '#cccccc',
              lineHeight: '1.6',
              textAlign: 'center',
            }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Contact */}
        <section style={{ padding: '0 20px', marginBottom: '30px' }}>
          {data.personal?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>📞</div>
              <span style={{ fontSize: '9px', color: '#cccccc' }}>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.email && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>✉️</div>
              <span style={{ fontSize: '9px', color: '#cccccc', wordBreak: 'break-all' }}>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>📍</div>
              <span style={{ fontSize: '9px', color: '#cccccc' }}>{data.personal.location}</span>
            </div>
          )}
        </section>

        {/* Language */}
        {data.languages && data.languages.length > 0 && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#2563eb',
              borderRadius: '20px',
              padding: '8px 20px',
              textAlign: 'center',
              marginBottom: '15px',
            }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
              }}>Language</h2>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.languages.slice(0, 4).map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name
                const proficiency = typeof lang === 'string' ? '' : lang.proficiency
                return (
                  <li key={i} style={{
                    fontSize: '10px',
                    color: '#cccccc',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    <span style={{ color: '#2563eb' }}>•</span>
                    <span>{langName}</span>
                    {proficiency && <span style={{ fontSize: '8px', color: '#999' }}>({proficiency})</span>}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Expertise */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#2563eb',
              borderRadius: '20px',
              padding: '8px 20px',
              textAlign: 'center',
              marginBottom: '15px',
            }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
              }}>Expertise</h2>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.skills.slice(0, 6).map((skill, i) => (
                <li key={i} style={{
                  fontSize: '10px',
                  color: '#cccccc',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}>
                  <span style={{ color: '#2563eb' }}>•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        position: 'relative',
      }}>
        {/* Blue Header Bar */}
        <div style={{
          backgroundColor: '#2563eb',
          padding: '40px 40px',
          color: '#ffffff',
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            {data.personal?.fullName || 'Your Name'}
          </h1>
          <div style={{
            fontSize: '14px',
            color: '#e0e7ff',
            letterSpacing: '1px',
          }}>
            {data.personal?.title || 'Your Title'}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '30px 40px' }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Experience</h2>
              </div>
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    margin: 0,
                    marginBottom: '3px',
                  }}>
                    {exp.company}
                  </h3>
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '2px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#999',
                    marginBottom: '10px',
                  }}>
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                  {exp.description && (
                    <p style={{
                      fontSize: '10px',
                      color: '#666',
                      lineHeight: '1.7',
                      margin: 0,
                    }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Education</h2>
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    margin: 0,
                    marginBottom: '3px',
                  }}>
                    {edu.institution}
                  </h3>
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '2px',
                  }}>
                    {edu.degree}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#999',
                  }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills Summary with Progress Bars */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Skills Summary</h2>
              </div>
              {data.skills.slice(0, 4).map((skill, i) => {
                // Generate a percentage based on position (just for visual demo)
                const percentage = 85 - (i * 5)
                return (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}>
                      <span style={{ fontSize: '11px', color: '#333', fontWeight: '500' }}>{skill}</span>
                      <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>{percentage}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: '#2563eb',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                )
              })}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
