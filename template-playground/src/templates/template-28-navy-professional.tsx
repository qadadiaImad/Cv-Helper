/**
 * TEMPLATE 28: NAVY PROFESSIONAL
 * Professional CV with navy blue sidebar and white main content
 * Features profile photo, bullet points, and clean sections
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const NavyProfessionalTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    display: 'flex',
    fontFamily: "'Arial', 'Helvetica', sans-serif",
  }}>
    {/* Left Navy Sidebar */}
    <div style={{
      width: '35%',
      background: '#1e3a5f',
      padding: '40px 30px',
      color: '#ffffff',
    }}>
      {/* Profile Photo */}
      <div style={{
        width: '100%',
        marginBottom: '35px',
      }}>
        <div style={{
          width: '160px',
          height: '200px',
          background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="30" r="16" fill="#999999" opacity="0.5" />
            <path
              d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
              fill="#999999"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* Informations Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 20px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          INFORMATIONS
        </h3>
        <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#d0d8e0' }}>
          {data.personal.phone && (
            <p style={{ margin: '0 0 8px 0' }}>
              {data.personal.phone}
            </p>
          )}
          {data.personal.email && (
            <p style={{ margin: '0 0 8px 0', wordBreak: 'break-all' }}>
              {data.personal.email}
            </p>
          )}
          {data.personal.location && (
            <p style={{ margin: '0' }}>
              {data.personal.location}
            </p>
          )}
        </div>
      </div>

      {/* Compétences Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 20px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          COMPÉTENCES
        </h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}>
          {data.skills && data.skills.map((skill, i) => (
            <li key={i} style={{
              fontSize: '11px',
              color: '#d0d8e0',
              marginBottom: '8px',
              paddingLeft: '15px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '5px',
                height: '5px',
                background: '#ffffff',
                borderRadius: '50%',
              }} />
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Langues Section */}
      {data.languages && data.languages.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            LANGUES
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.languages.map((lang, i) => (
              <li key={i} style={{
                fontSize: '11px',
                color: '#d0d8e0',
                marginBottom: '8px',
              }}>
                {typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Intérêts Section */}
      {data.interests && data.interests.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            INTÉRÊTS
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.interests.map((interest, i) => (
              <li key={i} style={{
                fontSize: '11px',
                color: '#d0d8e0',
                marginBottom: '8px',
              }}>
                {typeof interest === 'string' ? interest : interest.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Right Content Area */}
    <div style={{
      width: '65%',
      padding: '40px 45px',
      background: '#ffffff',
    }}>
      {/* Name and Title */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 700,
          color: '#1e3a5f',
          margin: '0 0 8px 0',
          letterSpacing: '1px',
        }}>
          {data.personal.fullName}
        </h1>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#4a4a4a',
          margin: '0 0 20px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {data.personal.title || 'Chargé de Communication'}
        </h2>
        {data.summary && (
          <p style={{
            fontSize: '11px',
            lineHeight: '1.8',
            color: '#4a4a4a',
            margin: 0,
          }}>
            {data.summary}
          </p>
        )}
      </div>

      {/* Expériences Professionnelles Section */}
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#ffffff',
          background: '#1e3a5f',
          padding: '12px 20px',
          margin: '0 0 25px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          EXPÉRIENCES PROFESSIONNELLES
        </h3>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '25px', paddingLeft: '25px', position: 'relative' }}>
            {/* Bullet Point */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '6px',
              width: '10px',
              height: '10px',
              background: '#1e3a5f',
              borderRadius: '50%',
            }} />
            
            <h4 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#1e3a5f',
              margin: '0 0 5px 0',
            }}>
              {exp.position} - {exp.company}
            </h4>
            <p style={{
              fontSize: '10px',
              color: '#808080',
              margin: '0 0 10px 0',
              textTransform: 'uppercase',
            }}>
              {exp.startDate} - {exp.endDate || 'ACTUEL'}
            </p>
            {exp.description && (
              <p style={{
                fontSize: '11px',
                lineHeight: '1.7',
                color: '#4a4a4a',
                margin: '0 0 8px 0',
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
                    color: '#4a4a4a',
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

      {/* Formations Section */}
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#ffffff',
          background: '#1e3a5f',
          padding: '12px 20px',
          margin: '0 0 25px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          FORMATIONS
        </h3>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '20px', paddingLeft: '25px', position: 'relative' }}>
            {/* Bullet Point */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '6px',
              width: '10px',
              height: '10px',
              background: '#1e3a5f',
              borderRadius: '50%',
            }} />
            
            <h4 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#1e3a5f',
              margin: '0 0 5px 0',
            }}>
              {edu.degree}
            </h4>
            <p style={{
              fontSize: '10px',
              color: '#808080',
              margin: '0 0 5px 0',
            }}>
              {edu.startDate} - {edu.endDate}
            </p>
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
    </div>
  </div>
)
