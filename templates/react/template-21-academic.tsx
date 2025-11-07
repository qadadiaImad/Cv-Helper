/**
 * TEMPLATE 21: ACADEMIC CV
 * Single-column traditional academic layout with serif font
 * Based on LaTeX academic template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const AcademicCVTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'Times New Roman', Georgia, serif",
    overflow: 'hidden',
    position: 'relative',
    padding: '40px 60px',
  }}>
    {/* Header */}
    <header style={{
      textAlign: 'center',
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '2px solid #333',
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
        letterSpacing: '1px',
      }}>{data.personal?.fullName || 'Your Name'}</h1>
      <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
        {data.personal?.location && <span>{data.personal.location} • </span>}
        {data.personal?.phone && <span>Phone: {data.personal.phone} • </span>}
        {data.personal?.email && <span>Email: {data.personal.email}</span>}
        {data.personal?.website && (
          <div style={{ marginTop: '4px' }}>
            Website: {data.personal.website}
          </div>
        )}
      </div>
    </header>

    {/* Education */}
    {data.education && data.education.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                {edu.startDate} – {edu.endDate}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#333', marginBottom: '3px' }}>
              {edu.institution}
            </div>
          </div>
        ))}
      </section>
    )}

    {/* Experience */}
    {data.experience && data.experience.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{exp.position}</div>
              <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#333', marginBottom: '5px' }}>
              {exp.company}
            </div>
            {exp.description && (
              <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', margin: '5px 0', paddingLeft: '15px' }}>
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Skills */}
    {data.skills && data.skills.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Skills</h2>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
          <strong>Technical Skills:</strong> {data.skills.join(', ')}
        </div>
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Certifications</h2>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
            <strong>{cert.name}</strong> - {cert.issuer}, {cert.date}
          </div>
        ))}
      </section>
    )}

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Languages</h2>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
          {data.languages.map((lang, i) => {
            const langName = typeof lang === 'string' ? lang : lang.name;
            const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
            return (
              <span key={i}>
                {langName} ({proficiency}){i < (data.languages?.length || 0) - 1 ? ', ' : ''}
              </span>
            );
          })}
        </div>
      </section>
    )}

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
              {proj.name}
            </div>
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '3px' }}>
              {proj.description}
            </div>
          </div>
        ))}
      </section>
    )}
  </div>
)
