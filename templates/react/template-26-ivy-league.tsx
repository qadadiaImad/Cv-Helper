/**
 * TEMPLATE 26: IVY LEAGUE
 * Single-column professional layout with blue accents
 * Based on Enhancv's Ivy League template
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const IvyLeagueTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
    overflow: 'hidden',
    position: 'relative',
    padding: '50px',
  }}>
    {/* Header */}
    <header style={{
      textAlign: 'center',
      marginBottom: '24px',
      padding: '6px 12px',
    }}>
      <h1 style={{
        fontFamily: "Volkhov, Georgia, serif",
        textTransform: 'uppercase',
        color: '#002b7f',
        fontSize: '22px',
        lineHeight: '28px',
        fontWeight: 700,
        marginBottom: '6px',
      }}>
        {data.personal?.fullName || 'Your Name'}
      </h1>
      {data.personal?.title && (
        <h2 style={{
          color: '#56acf2',
          fontSize: '18px',
          lineHeight: '22px',
          fontWeight: 400,
          marginBottom: '12px',
        }}>
          {data.personal.title}
        </h2>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        fontSize: '13px',
        lineHeight: '16px',
        color: '#333',
        flexWrap: 'wrap',
      }}>
        {data.personal?.email && <span>{data.personal.email}</span>}
        {data.personal?.location && (
          <>
            <span>•</span>
            <span>{data.personal.location}</span>
          </>
        )}
      </div>
    </header>

    {/* Summary */}
    {data.summary && (
      <section style={{ marginBottom: '24px', padding: '6px 12px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
        }}>
          Summary
        </h3>
        <p style={{
          fontSize: '13px',
          lineHeight: '18px',
          color: '#333',
          textAlign: 'left',
        }}>
          {data.summary}
        </p>
      </section>
    )}

    {/* Experience */}
    {data.experience && data.experience.length > 0 && (
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
          padding: '6px 12px 4px',
        }}>
          Experience
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '4px',
            }}>
              <div style={{
                color: '#56acf2',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 400,
              }}>
                {exp.company}
              </div>
              <div style={{
                fontSize: '15px',
                lineHeight: '18px',
                color: '#333',
                textAlign: 'right',
              }}>
                {exp.startDate} - {exp.endDate || 'Present'}
              </div>
            </div>
            <div style={{
              color: '#002b7f',
              fontSize: '15px',
              lineHeight: '18px',
              fontWeight: 400,
            }}>
              {exp.position}
            </div>
            {exp.description && (
              <p style={{
                fontSize: '13px',
                lineHeight: '18px',
                color: '#333',
                marginTop: '8px',
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
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
          padding: '6px 12px 4px',
        }}>
          Education
        </h3>
        {data.education.map((edu, i) => (
          <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <div style={{
                color: '#56acf2',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 400,
                flex: 1,
              }}>
                {edu.institution}
              </div>
              <div style={{
                fontSize: '15px',
                lineHeight: '18px',
                color: '#333',
                fontWeight: 400,
              }}>
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
            <div style={{
              color: '#002b7f',
              fontSize: '15px',
              lineHeight: '18px',
              fontWeight: 400,
              marginTop: '4px',
            }}>
              {edu.degree}
            </div>
          </div>
        ))}
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
          padding: '6px 12px 4px',
        }}>
          Certification
        </h3>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ padding: '6px 12px', marginBottom: '8px' }}>
            <div style={{
              color: '#56acf2',
              fontSize: '15px',
              lineHeight: '18px',
              fontWeight: 400,
            }}>
              {cert.name}
            </div>
          </div>
        ))}
      </section>
    )}

    {/* Skills */}
    {data.skills && data.skills.length > 0 && (
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
          padding: '6px 12px 4px',
        }}>
          Skills
        </h3>
        <div style={{ padding: '6px 12px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{
                fontSize: '13px',
                lineHeight: '16px',
                color: '#333',
                padding: '4px 8px',
                background: '#f0f0f0',
                borderRadius: '4px',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: "Volkhov, Georgia, serif",
          borderBottom: '1px solid #002b7f',
          color: '#002b7f',
          fontSize: '18px',
          lineHeight: '23px',
          fontWeight: 700,
          marginBottom: '12px',
          paddingBottom: '4px',
          padding: '6px 12px 4px',
        }}>
          Projects
        </h3>
        {data.projects.map((project, i) => (
          <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
            <div style={{
              color: '#56acf2',
              fontSize: '18px',
              lineHeight: '22px',
              fontWeight: 400,
            }}>
              {project.name}
            </div>
            {project.description && (
              <p style={{
                fontSize: '13px',
                lineHeight: '18px',
                color: '#333',
                marginTop: '8px',
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
