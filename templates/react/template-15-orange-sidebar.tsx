/**
 * TEMPLATE 26: ORANGE SIDEBAR
 * Modern three-column CV with dark sidebar, white content, and orange contact section
 * Features profile photo, skills list, and clean typography
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const OrangeSidebarTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'Arial', 'Helvetica', sans-serif",
    display: 'flex',
  }}>
    {/* Left Dark Sidebar */}
    <div style={{
      width: '255px', // Fixed width for sidebar (30% of 850px)
      background: '#3d3d3d',
      padding: '0',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Profile Photo */}
      <div style={{
        width: '100%',
        height: '280px',
        background: 'linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="45" r="25" fill="#ffffff" opacity="0.3" />
          <path
            d="M25 110C25 85.147 45.147 65 70 65C94.853 65 115 85.147 115 110"
            fill="#ffffff"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Name and Title */}
      <div style={{
        padding: '35px 30px',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 5px 0',
          lineHeight: '1.1',
        }}>
          {data.personal.fullName.split(' ')[0]}
        </h1>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 12px 0',
          lineHeight: '1.1',
        }}>
          {data.personal.fullName.split(' ').slice(1).join(' ')}
        </h1>
        <h2 style={{
          fontSize: '12px',
          fontWeight: 400,
          color: '#a0a0a0',
          margin: '0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {data.personal.title || 'UI/UX Designer'}
        </h2>
      </div>

      {/* Skills Section */}
      <div style={{
        padding: '0 30px 30px',
      }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 18px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          SKILLS
        </h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}>
          {data.skills && data.skills.slice(0, 6).map((skill, i) => (
            <li key={i} style={{
              fontSize: '12px',
              color: '#c0c0c0',
              marginBottom: '10px',
              paddingLeft: '18px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '6px',
                height: '6px',
                background: '#ff6347',
                borderRadius: '50%',
              }} />
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div style={{
          padding: '0 30px 30px',
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 18px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
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
                color: '#c0c0c0',
                marginBottom: '8px',
              }}>
                {typeof lang === 'string' ? lang : lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Right Content Area - with horizontal sections */}
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Section - Profile, Education, Experience (Light Gray) */}
      <div style={{
        flex: 1,
        padding: '50px 40px',
        background: '#e8e8e8',
      }}>
      {/* Profile Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#2d2d2d',
          margin: '0 0 15px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          PROFILE
        </h3>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.8',
          color: '#4a4a4a',
          margin: 0,
        }}>
          {data.summary || 'I am a UI/UX designer. UX is the process of enhancing user satisfaction by improving the usability and accessibility of a product. Products with good design can increase user satisfaction with products.'}
        </p>
      </div>

        {/* Education Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#2d2d2d',
            margin: '0 0 20px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            EDUCATION
          </h3>
          {data.education && data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <p style={{
                fontSize: '10px',
                color: '#808080',
                margin: '0 0 5px 0',
              }}>
                {edu.startDate} - {edu.endDate}
              </p>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#2d2d2d',
                margin: '0 0 3px 0',
              }}>
                {edu.degree}
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#4a4a4a',
                margin: 0,
              }}>
                {edu.institution}
              </p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#2d2d2d',
            margin: '0 0 20px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            EXPERIENCE
          </h3>
          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '25px' }}>
              <p style={{
                fontSize: '10px',
                color: '#808080',
                margin: '0 0 5px 0',
              }}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#2d2d2d',
                margin: '0 0 5px 0',
              }}>
                {exp.position}
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#4a4a4a',
                margin: '0 0 5px 0',
              }}>
                {exp.description || 'Collaboration with dev team to solve for UI/UX problems on an e-commerce sites'}
              </p>
              <p style={{
                fontSize: '10px',
                color: '#808080',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {exp.company}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section - Contact (Orange) */}
      <div style={{
        background: '#ff6347',
        padding: '40px 40px',
      }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 25px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          CONTACT
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {/* Phone */}
          {data.personal.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: '200px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 9.5v2a1.5 1.5 0 01-1.64 1.5A13 13 0 011 3.64 1.5 1.5 0 012.5 2h2a1.5 1.5 0 011.5 1.29c.1.76.28 1.5.54 2.21a1.5 1.5 0 01-.34 1.58l-.85.84a12 12 0 005.73 5.73l.84-.85a1.5 1.5 0 011.58-.34c.71.26 1.45.44 2.21.54A1.5 1.5 0 0113 9.5z" fill="#ffffff"/>
                </svg>
              </div>
              <span style={{
                fontSize: '11px',
                color: '#ffffff',
                lineHeight: '1.4',
              }}>
                {data.personal.phone}
              </span>
            </div>
          )}

          {/* Email */}
          {data.personal.email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: '200px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h10a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                  <path d="M13 3L7 8 1 3" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <span style={{
                fontSize: '11px',
                color: '#ffffff',
                lineHeight: '1.4',
                wordBreak: 'break-all',
              }}>
                {data.personal.email}
              </span>
            </div>
          )}

          {/* Website */}
          {data.personal.website && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: '200px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                  <path d="M7 1.5v11M1.5 7h11" stroke="#ffffff" strokeWidth="1.5"/>
                </svg>
              </div>
              <span style={{
                fontSize: '11px',
                color: '#ffffff',
                lineHeight: '1.4',
                wordBreak: 'break-all',
              }}>
                {data.personal.website}
              </span>
            </div>
          )}

          {/* Location */}
          {data.personal.location && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              minWidth: '200px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '10px',
                flexShrink: 0,
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1a5 5 0 00-5 5c0 3.5 5 7 5 7s5-3.5 5-7a5 5 0 00-5-5z" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                  <circle cx="7" cy="6" r="1.5" fill="#ffffff"/>
                </svg>
              </div>
              <span style={{
                fontSize: '11px',
                color: '#ffffff',
                lineHeight: '1.4',
              }}>
                {data.personal.location}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)
