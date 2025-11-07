/**
 * TEMPLATE 24: GRAY MINIMAL
 * Clean and minimal CV with gray sidebar and professional layout
 * Features expandable sections and bullet points
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const GrayMinimalTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1100px',
    background: '#ffffff',
    display: 'flex',
    fontFamily: "'Arial', 'Helvetica', sans-serif",
    position: 'relative',
  }}>
    {/* Left Content Area */}
    <div style={{
      width: '60%',
      padding: '50px 40px',
      background: '#ffffff',
    }}>
      {/* Name */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#666666',
          margin: '0 0 5px 0',
        }}>
          {data.personal.fullName.split(' ')[0]}
        </h1>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#2d2d2d',
          margin: '0 0 20px 0',
          letterSpacing: '2px',
        }}>
          {data.personal.fullName.split(' ').slice(1).join(' ')}
        </h1>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#2d2d2d',
          margin: '0',
        }}>
          {data.personal.title || 'Content Creator'}
        </h2>
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontSize: '12px',
            lineHeight: '1.8',
            color: '#2d2d2d',
            margin: 0,
          }}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #e0e0e0',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: 0,
          }}>
            EXPERIENCE
          </h3>
          <span style={{
            fontSize: '20px',
            color: '#666666',
            cursor: 'pointer',
          }}>
            +
          </span>
        </div>

        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '25px' }}>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#2d2d2d',
              margin: '0 0 5px 0',
            }}>
              {exp.position}
            </h4>
            <p style={{
              fontSize: '11px',
              color: '#666666',
              margin: '0 0 10px 0',
            }}>
              {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
            </p>
            {exp.description && (
              <p style={{
                fontSize: '11px',
                lineHeight: '1.7',
                color: '#2d2d2d',
                margin: '0 0 10px 0',
              }}>
                {exp.description}
              </p>
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul style={{
                margin: 0,
                paddingLeft: '18px',
                listStyle: 'disc',
              }}>
                {exp.achievements.map((achievement, j) => (
                  <li key={j} style={{
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#2d2d2d',
                    marginBottom: '5px',
                  }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #e0e0e0',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: 0,
          }}>
            EDUCATION
          </h3>
          <span style={{
            fontSize: '20px',
            color: '#666666',
            cursor: 'pointer',
          }}>
            +
          </span>
        </div>

        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <h4 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#2d2d2d',
              margin: '0 0 5px 0',
            }}>
              {edu.degree}
            </h4>
            <p style={{
              fontSize: '11px',
              color: '#666666',
              margin: '0',
            }}>
              {edu.institution} | Graduated {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#2d2d2d',
              margin: 0,
            }}>
              CERTIFICATIONS
            </h3>
            <span style={{
              fontSize: '20px',
              color: '#666666',
              cursor: 'pointer',
            }}>
              +
            </span>
          </div>

          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 5px 0',
              }}>
                {cert.name}
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#666666',
                margin: '0',
              }}>
                {cert.issuer}, {cert.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Right Sidebar */}
    <div style={{
      width: '40%',
      background: '#b8b8b8',
      padding: '40px 30px',
      position: 'relative',
    }}>
      {/* Profile Photo - Top Right */}
      <div style={{
        width: '180px',
        height: '180px',
        background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
        borderRadius: '50%',
        position: 'absolute',
        top: '30px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '8px solid #ffffff',
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="35" r="18" fill="#999999" opacity="0.5" />
          <path
            d="M18 80C18 62.327 32.327 48 50 48C67.673 48 82 62.327 82 80"
            fill="#999999"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Contact Info - Positioned below photo */}
      <div style={{ marginTop: '230px', marginBottom: '35px' }}>
        {data.personal.phone && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
              <path d="M13 9.5v2a1.5 1.5 0 01-1.64 1.5A13 13 0 011 3.64 1.5 1.5 0 012.5 2h2a1.5 1.5 0 011.5 1.29c.1.76.28 1.5.54 2.21a1.5 1.5 0 01-.34 1.58l-.85.84a12 12 0 005.73 5.73l.84-.85a1.5 1.5 0 011.58-.34c.71.26 1.45.44 2.21.54A1.5 1.5 0 0113 9.5z" fill="#2d2d2d"/>
            </svg>
            <span style={{
              fontSize: '11px',
              color: '#2d2d2d',
              lineHeight: '1.4',
            }}>
              {data.personal.phone}
            </span>
          </div>
        )}
        {data.personal.email && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
              <path d="M2 2h10a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
              <path d="M13 3L7 8 1 3" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{
              fontSize: '11px',
              color: '#2d2d2d',
              lineHeight: '1.4',
              wordBreak: 'break-all',
            }}>
              {data.personal.email}
            </span>
          </div>
        )}
        {data.personal.location && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
              <path d="M7 1a5 5 0 00-5 5c0 3.5 5 7 5 7s5-3.5 5-7a5 5 0 00-5-5z" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
              <circle cx="7" cy="6" r="1.5" fill="#2d2d2d"/>
            </svg>
            <span style={{
              fontSize: '11px',
              color: '#2d2d2d',
              lineHeight: '1.4',
            }}>
              {data.personal.location}
            </span>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#2d2d2d',
          margin: '0 0 20px 0',
        }}>
          SKILLS
        </h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}>
          {data.skills && data.skills.map((skill, i) => (
            <li key={i} style={{
              fontSize: '12px',
              color: '#2d2d2d',
              marginBottom: '10px',
              paddingLeft: '15px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '4px',
                height: '4px',
                background: '#2d2d2d',
                borderRadius: '50%',
              }} />
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Portfolio Section */}
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#2d2d2d',
          margin: '0 0 20px 0',
        }}>
          PORTFOLIO
        </h3>
        {data.personal.website && (
          <p style={{
            fontSize: '11px',
            color: '#2d2d2d',
            margin: '0 0 10px 0',
            wordBreak: 'break-all',
          }}>
            {data.personal.website}
          </p>
        )}
        {data.personal.linkedIn && (
          <p style={{
            fontSize: '11px',
            color: '#2d2d2d',
            margin: '0 0 10px 0',
          }}>
            Links to blog posts, videos, and other creative work
          </p>
        )}
      </div>

      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: '0 0 20px 0',
          }}>
            LANGUAGES
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.languages.map((lang, i) => (
              <li key={i} style={{
                fontSize: '12px',
                color: '#2d2d2d',
                marginBottom: '10px',
                paddingLeft: '15px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '4px',
                  height: '4px',
                  background: '#2d2d2d',
                  borderRadius: '50%',
                }} />
                {typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)
