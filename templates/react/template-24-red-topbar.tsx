/**
 * TEMPLATE 24: RED TOP BAR (CV12)
 * Red top bar + Left white content (60%) + Right gray sidebar (40%) with photo
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const RedTopBarTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }}>
    {/* Red top bar */}
    <div style={{
      background: '#c9302c',
      height: '25px',
      width: '100%',
    }} />

    {/* Content wrapper */}
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* Left Column - White */}
      <main style={{
        width: '60%',
        background: 'white',
        padding: '30px 35px',
        overflowY: 'auto',
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '5px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>{data.personal?.fullName || 'Your Name'}</h1>
        <div style={{
          height: '2px',
          background: '#333',
          margin: '15px 0 25px 0',
        }} />

        {/* Professional Summary */}
        {data.summary && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #e0e0e0',
            }}>Professional Summary</h2>
            <div style={{
              fontSize: '10px',
              color: '#333',
              lineHeight: 1.7,
              textAlign: 'justify',
              background: '#fef5f5',
              padding: '12px',
              marginTop: '8px',
            }}>
              {data.summary}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #e0e0e0',
            }}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                  {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                </div>
                <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>
                  {exp.company}
                </div>
                {exp.description && (
                  <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, margin: 0, paddingLeft: '12px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #e0e0e0',
            }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                  {edu.degree}, {edu.endDate}
                </div>
                <div>{edu.institution}</div>
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #e0e0e0',
            }}>Languages</h2>
            <ul style={{ fontSize: '10px', color: '#333', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                return (
                  <li key={i} style={{ paddingLeft: '12px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
                    {langName} ({proficiency})
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>

      {/* Right Column - Gray */}
      <aside style={{
        width: '40%',
        background: '#f0f0f0',
        padding: '30px 25px',
        overflowY: 'auto',
      }}>
        {/* Photo */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'white',
            margin: '0 auto',
            overflow: 'hidden',
            border: '3px solid #ddd',
          }}>
            <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '12px',
            letterSpacing: '1px',
            paddingBottom: '8px',
            borderBottom: '2px solid #ddd',
          }}>Contact</h3>
          <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
              <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📍</span>
              <span>{data.personal?.location || 'City, State'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
              <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📞</span>
              <span>Phone: {data.personal?.phone || 'Phone'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
              <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>✉️</span>
              <span>Email: {data.personal?.email || 'Email'}</span>
            </div>
          </div>
        </div>

        {/* Core Qualifications */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #ddd',
            }}>Core Qualifications</h3>
            <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
              {data.skills.slice(0, 5).map((skill, i) => (
                <div key={i} style={{ marginBottom: '15px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                  <strong style={{ display: 'block', marginBottom: '4px', fontSize: '10px', color: '#333' }}>
                    • {skill}:
                  </strong>
                  Professional expertise and proven track record.
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  </div>
)
