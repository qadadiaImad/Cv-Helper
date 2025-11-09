/**
 * TEMPLATE 19: JACK SPARROW
 * Two-column layout with left sidebar (27%), dark gray header, cyan accents, orange skill bars
 * Based on LaTeX Overleaf template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const JackSparrowTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Header - Full Width */}
    <header style={{
      background: '#4a4a4a',
      color: 'white',
      padding: '18px 20px',
      textAlign: 'center',
      height: '65px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      flexShrink: 0,
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 3px 0', letterSpacing: '1px' }}>
        {data.personal?.fullName || 'Your Name'}
      </h1>
      {data.personal?.title && (
        <h2 style={{ fontSize: '13px', fontWeight: '300', margin: 0, opacity: 0.85, letterSpacing: '0.5px' }}>
          {data.personal.title}
        </h2>
      )}
    </header>

    {/* Content Wrapper */}
    <div style={{ display: 'flex', flex: 1 }}>
      {/* Sidebar */}
      <aside style={{
        width: '229.5px', // Fixed width (27% of 850px)
        background: '#f0f0f0',
        padding: '15px 12px',
        flexShrink: 0,
      }}>
        {/* About Me */}
        {data.summary && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: '#00bcd4',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>About Me</div>
            <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', textAlign: 'justify' }}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Personal Info */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{
            background: '#00bcd4',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>Personal</div>
          <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '5px' }}><strong>{data.personal?.fullName || 'Your Name'}</strong></div>
            {data.personal?.location && <div style={{ marginBottom: '5px' }}>{data.personal.location}</div>}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: '#00bcd4',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>Skills</div>
            {data.skills.slice(0, 5).map((skill, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '9px', color: '#333', minWidth: '80px', flexShrink: 0 }}>{skill}</div>
                <div style={{ flex: 1, height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #ff6b35, #ff8c42)',
                    boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.15)',
                    borderRadius: '3px',
                    width: `${90 - i * 5}%`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: '#00bcd4',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>Languages</div>
            {data.languages.map((lang, i) => (
              <div key={i} style={{ fontSize: '9px', color: '#666', marginBottom: '5px', lineHeight: '1.4' }}>
                <strong>{typeof lang === 'string' ? lang : lang.name}:</strong> {typeof lang === 'string' ? 'Proficient' : lang.proficiency}
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{
            background: '#00bcd4',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>Contact</div>
          <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
            {data.personal?.email && <div style={{ marginBottom: '5px' }}>📧 {data.personal.email}</div>}
            {data.personal?.phone && <div style={{ marginBottom: '5px' }}>📱 {data.personal.phone}</div>}
            {data.personal?.website && <div style={{ marginBottom: '5px' }}>🌐 {data.personal.website}</div>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px 25px' }}>
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '12px',
              textTransform: 'uppercase',
              borderBottom: '2px solid #00bcd4',
              paddingBottom: '6px',
              letterSpacing: '0.5px',
            }}>Experience</h2>
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i} style={{ marginBottom: '15px', display: 'flex', gap: '12px' }}>
                <div style={{ minWidth: '90px', fontSize: '10px', fontWeight: 'bold', color: '#999', paddingTop: '2px', lineHeight: '1.3' }}>
                  {exp.startDate} – {exp.endDate || 'Present'}
                </div>
                <div style={{ flex: 1, borderLeft: '2px solid #00bcd4', paddingLeft: '15px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                    {exp.position}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>{exp.company}</div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', margin: 0 }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '12px',
              textTransform: 'uppercase',
              borderBottom: '2px solid #00bcd4',
              paddingBottom: '6px',
              letterSpacing: '0.5px',
            }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px', display: 'flex', gap: '12px' }}>
                <div style={{ minWidth: '90px', fontSize: '10px', fontWeight: 'bold', color: '#999', paddingTop: '2px', lineHeight: '1.3' }}>
                  {edu.startDate} – {edu.endDate}
                </div>
                <div style={{ flex: 1, borderLeft: '2px solid #00bcd4', paddingLeft: '15px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                    {edu.degree}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>
                    {edu.institution}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '12px',
              textTransform: 'uppercase',
              borderBottom: '2px solid #00bcd4',
              paddingBottom: '6px',
              letterSpacing: '0.5px',
            }}>Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '10px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  </div>
)
