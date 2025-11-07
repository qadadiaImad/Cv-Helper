/**
 * TEMPLATE 23: ORANGE ACCENT (CV1)
 * Left orange sidebar (30%) with photo + Right white content (70%)
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const OrangeAccentTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    overflow: 'hidden',
  }}>
    {/* Left Sidebar - Orange */}
    <aside style={{
      width: '30%',
      background: '#f39c12',
      color: 'white',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Photo section */}
      <div style={{
        background: '#3a3a3a',
        padding: '25px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '140px',
          height: '140px',
          margin: '0 auto',
          border: '8px solid #f39c12',
          background: 'white',
          overflow: 'hidden',
          borderRadius: '4px',
        }}>
          <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
        </div>
      </div>

      {/* Sidebar content */}
      <div style={{ padding: '25px 20px', flex: 1, overflowY: 'auto' }}>
        {/* Contact */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
            <span style={{ fontSize: '12px' }}>📍</span>
            <span>{data.personal?.location || 'City, State'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
            <span style={{ fontSize: '12px' }}>📞</span>
            <span>{data.personal?.phone || 'Phone'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
            <span style={{ fontSize: '12px' }}>✉️</span>
            <span>{data.personal?.email || 'Email'}</span>
          </div>
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
            }}>Professional Summary</h3>
            <p style={{ fontSize: '10px', lineHeight: 1.7, textAlign: 'justify' }}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Core Qualifications */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
            }}>Core Qualifications</h3>
            {data.skills.slice(0, 5).map((skill, i) => (
              <div key={i} style={{ marginBottom: '12px', fontSize: '10px', lineHeight: 1.6 }}>
                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>{skill}:</strong>
                Professional expertise and proven track record in this area.
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>

    {/* Main Content - White */}
    <main style={{
      width: '70%',
      background: 'white',
      padding: '35px 30px',
      overflowY: 'auto',
    }}>
      {/* Name */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#f39c12',
          marginBottom: '8px',
        }}>{data.personal?.fullName || 'Your Name'}</h1>
      </header>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '15px',
            paddingBottom: '8px',
            borderBottom: '2px solid #f39c12',
            letterSpacing: '1px',
          }}>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                {exp.position}
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                {exp.company}
              </div>
              {exp.description && (
                <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.7, margin: 0, paddingLeft: '15px' }}>
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
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '15px',
            paddingBottom: '8px',
            borderBottom: '2px solid #f39c12',
            letterSpacing: '1px',
          }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                {edu.startDate} – {edu.endDate}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                {edu.institution}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '15px',
            paddingBottom: '8px',
            borderBottom: '2px solid #f39c12',
            letterSpacing: '1px',
          }}>Languages</h2>
          <ul style={{ fontSize: '10px', color: '#666', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
            {data.languages.map((lang, i) => {
              const langName = typeof lang === 'string' ? lang : lang.name;
              const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
              return (
                <li key={i} style={{ paddingLeft: '15px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#f39c12' }}>•</span>
                  {langName} ({proficiency})
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  </div>
)
