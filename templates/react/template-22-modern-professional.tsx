/**
 * TEMPLATE 22: MODERN PROFESSIONAL (CV9)
 * Left gray column with white sections + Right white content + Contact bar
 * Green icon with initials
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ModernProfessionalTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  const initials = data.personal?.fullName?.split(' ').map(n => n[0]).slice(0, 2) || ['F', 'L'];
  
  return (
    <div style={{
      width: '850px',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Lato', Arial, sans-serif",
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top section with icon and name */}
      <div style={{
        display: 'flex',
        padding: '35px 30px 20px',
        background: '#e8ebe8',
        alignItems: 'center',
        gap: '20px',
      }}>
        <div style={{
          width: '85px',
          height: '85px',
          background: '#2d7a6e',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1,
          }}>
            <span>{initials[0]}</span>
            <span>{initials[1]}</span>
          </div>
          {/* Diagonal X lines */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
            <div style={{
              content: '',
              position: 'absolute',
              background: 'rgba(255,255,255,0.7)',
              width: '55px',
              height: '1.5px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }} />
            <div style={{
              content: '',
              position: 'absolute',
              background: 'rgba(255,255,255,0.7)',
              width: '55px',
              height: '1.5px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
            }} />
          </div>
        </div>
        <div>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 300,
            color: '#333',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: 0,
          }}>{data.personal?.fullName || 'Your Name'}</h1>
        </div>
      </div>

      {/* Contact bar */}
      <div style={{
        background: '#2b2b2b',
        color: 'white',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        fontSize: '10px',
      }}>
        {data.personal?.location && <span>{data.personal.location}</span>}
        <span>•</span>
        {data.personal?.phone && <span>{data.personal.phone}</span>}
        <span>•</span>
        {data.personal?.email && <span>{data.personal.email}</span>}
      </div>

      {/* Main content - two columns */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left column - gray with white sections */}
        <aside style={{
          width: '25%',
          background: '#e8ebe8',
          padding: '20px 15px',
          overflowY: 'auto',
        }}>
          {/* Professional Summary */}
          {data.summary && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Professional Summary</h2>
              <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, textAlign: 'justify' }}>
                {data.summary}
              </p>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
                  <p style={{ marginBottom: '2px' }}><strong>{edu.degree}</strong></p>
                  <p>{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Languages</h2>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '10px', color: '#333', lineHeight: 1.7 }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                  return (
                    <li key={i} style={{ marginBottom: '6px', paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#2d7a6e' }}>•</span>
                      {langName} ({proficiency})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Right column - white */}
        <main style={{
          width: '75%',
          background: '#ffffff',
          padding: '25px 30px',
          overflowY: 'auto',
        }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: '2px solid #2d7a6e',
                letterSpacing: '1px',
              }}>Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                    {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#2d7a6e', marginBottom: '8px' }}>{exp.company}</div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.3, margin: 0 }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Core Qualifications */}
          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: '2px solid #2d7a6e',
                letterSpacing: '1px',
              }}>Core Qualifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {data.skills.slice(0, 6).map((skill, i) => (
                  <div key={i} style={{ fontSize: '10px', lineHeight: 1.6, color: '#333' }}>
                    <strong>{skill}:</strong> Professional expertise and proven track record.
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
