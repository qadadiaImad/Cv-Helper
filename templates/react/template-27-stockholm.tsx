/**
 * TEMPLATE 27: STOCKHOLM
 * Clean, minimalist single-column layout with green/teal accents
 * Based on Enhancv Stockholm template
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const StockholmTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    padding: '60px 80px',
    overflow: 'hidden',
  }}>
    {/* Header */}
    <header style={{
      marginBottom: '30px',
    }}>
      <h1 style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '36px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '8px',
        letterSpacing: '-0.5px',
      }}>
        {(data.personal?.fullName || 'YOUR NAME').toUpperCase()}
      </h1>
      {data.personal?.title && (
        <h2 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '16px',
          fontWeight: 400,
          color: '#7BA3D1',
          marginBottom: '16px',
        }}>
          {data.personal.title}
        </h2>
      )}
      <div style={{
        fontSize: '12px',
        color: '#666666',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        fontFamily: "'Arial', sans-serif",
      }}>
        {data.personal?.email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>✉</span>
            <span>{data.personal.email}</span>
          </span>
        )}
        {data.personal?.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📍</span>
            <span>{data.personal.location}</span>
          </span>
        )}
      </div>
    </header>

    {/* Summary */}
    {data.summary && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          SUMMARY
        </h3>
        <p style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#333333',
        }}>
          {data.summary}
        </p>
      </section>
    )}

    {/* Skills */}
    {data.skills && data.skills.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          SKILLS
        </h3>
        <div style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '13px',
          color: '#333333',
          lineHeight: 1.8,
        }}>
          {data.skills.join(' • ')}
        </div>
      </section>
    )}

    {/* Experience */}
    {data.experience && data.experience.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          EXPERIENCE
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '4px',
            }}>
              {exp.position}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '#7BA782',
              marginBottom: '4px',
            }}>
              {exp.company}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '12px',
              color: '#666666',
              marginBottom: '8px',
              display: 'flex',
              gap: '12px',
            }}>
              {exp.startDate && exp.endDate && (
                <span>📅 {exp.startDate} - {exp.endDate || 'Present'}</span>
              )}
            </div>
            {exp.description && (
              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#333333',
                lineHeight: 1.6,
                marginBottom: '6px',
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
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          EDUCATION
        </h3>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '4px',
            }}>
              {edu.degree}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '#7BA782',
              marginBottom: '4px',
            }}>
              {edu.institution}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '12px',
              color: '#666666',
            }}>
              {edu.startDate && edu.endDate && (
                <span>📅 {edu.startDate} - {edu.endDate}</span>
              )}
            </div>
          </div>
        ))}
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          TRAINING / COURSES
        </h3>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '13px',
            color: '#333333',
            marginBottom: '8px',
          }}>
            <div style={{ fontWeight: 700 }}>{cert.name}</div>
            {cert.issuer && (
              <div style={{ fontSize: '12px', color: '#666666' }}>
                {cert.issuer} {cert.date && `• ${cert.date}`}
              </div>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '3px solid #000000',
        }}>
          PROJECTS
        </h3>
        {data.projects.map((project, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '4px',
            }}>
              {project.name}
            </div>
            {project.description && (
              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#333333',
                lineHeight: 1.6,
              }}>
                {project.description}
              </p>
            )}
          </div>
        ))}
      </section>
    )}
  </div>
)
