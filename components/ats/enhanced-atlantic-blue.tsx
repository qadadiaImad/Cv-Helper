/**
 * ENHANCED ATLANTIC BLUE TEMPLATE
 * Optimized for ATS Playground with better balance and bullets
 */

import React from 'react'
import type { UniversalTemplateProps } from '@/lib/schemas'

export const EnhancedAtlanticBlue: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      minHeight: '297mm',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      {/* Left Sidebar - Dark Blue */}
      <aside style={{
        width: '35%',
        backgroundColor: '#1a3a52',
        color: '#ffffff',
        padding: '25px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}>
        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
            {data.personal?.fullName || 'Your Name'}
          </h1>
        </div>

        {/* Contact */}
        <div style={{ fontSize: '10px', lineHeight: '1.5' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '5px' }}>
            CONTACT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {data.personal?.email && <p style={{ wordBreak: 'break-word', fontSize: '9px' }}>✉️ {data.personal.email}</p>}
            {data.personal?.phone && <p style={{ fontSize: '9px' }}>📱 {data.personal.phone}</p>}
            {data.personal?.location && <p style={{ fontSize: '9px' }}>📍 {data.personal.location}</p>}
            {data.personal?.links?.linkedin && (
              <p style={{ fontSize: '8px', wordBreak: 'break-all' }}>
                💼 {data.personal.links.linkedin.replace('https://', '').replace('http://', '')}
              </p>
            )}
          </div>
        </div>

        {/* Education in sidebar if present */}
        {data.education && data.education.length > 0 && (
          <div style={{ fontSize: '9px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '5px' }}>
              FORMATION
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontWeight: '600', fontSize: '10px', marginBottom: '2px' }}>{edu.degree}</p>
                <p style={{ fontSize: '9px', opacity: 0.9, marginBottom: '2px' }}>{edu.institution}</p>
                <p style={{ fontSize: '8px', opacity: 0.7 }}>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skillCategories && data.skillCategories.length > 0 && (
          <div style={{ fontSize: '9px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '5px' }}>
              COMPÉTENCES
            </h3>
            {data.skillCategories.map((cat, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '10px', fontWeight: '600', marginBottom: '3px', color: '#4a90e2' }}>
                  {cat.category}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {cat.skills.map((skill, j) => (
                    <span key={j} style={{ 
                      fontSize: '8px', 
                      padding: '2px 5px', 
                      backgroundColor: 'rgba(74, 144, 226, 0.2)', 
                      borderRadius: '2px',
                      border: '1px solid rgba(74, 144, 226, 0.4)'
                    }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ fontSize: '9px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '5px' }}>
              LANGUES
            </h3>
            {data.languages.map((lang, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: '600', fontSize: '9px' }}>
                  {lang.name} <span style={{ opacity: 0.8, fontWeight: 'normal' }}>• {lang.proficiency}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div style={{ fontSize: '9px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '5px' }}>
              CERTIFICATIONS
            </h3>
            {data.certifications.slice(0, 3).map((cert, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <p style={{ fontWeight: '600', fontSize: '9px' }}>{cert.name}</p>
                {cert.issuer && <p style={{ opacity: 0.7, fontSize: '8px' }}>{cert.issuer}</p>}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right Content Area */}
      <main style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '25px 30px',
      }}>
        {/* Summary */}
        {data.summary && (
          <section style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '8px', borderBottom: '2px solid #1a3a52', paddingBottom: '5px' }}>
              PROFIL PROFESSIONNEL
            </h2>
            <p style={{ fontSize: '9px', lineHeight: '1.5', color: '#333', textAlign: 'justify' }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '10px', borderBottom: '2px solid #1a3a52', paddingBottom: '5px' }}>
              EXPÉRIENCE PROFESSIONNELLE
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: i < data.experience.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#1a3a52' }}>{exp.position}</h3>
                  <span style={{ fontSize: '8px', color: '#666', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p style={{ fontSize: '10px', fontWeight: '600', color: '#4a90e2', marginBottom: '6px' }}>
                  {exp.company}{exp.location && ` • ${exp.location}`}
                </p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ 
                    fontSize: '8px', 
                    lineHeight: '1.4', 
                    paddingLeft: '18px', 
                    color: '#444', 
                    margin: 0,
                    listStyleType: 'disc',
                    listStylePosition: 'outside'
                  }}>
                    {exp.achievements.map((ach, j) => (
                      <li key={j} style={{ marginBottom: '3px', paddingLeft: '2px' }}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section style={{ marginBottom: '18px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '10px', borderBottom: '2px solid #1a3a52', paddingBottom: '5px' }}>
              PROJETS
            </h2>
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '10px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '3px' }}>
                  {proj.name}
                </h3>
                {proj.description && (
                  <p style={{ fontSize: '8px', color: '#555', marginBottom: '4px' }}>{proj.description}</p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul style={{ 
                    fontSize: '8px', 
                    lineHeight: '1.4', 
                    paddingLeft: '18px', 
                    color: '#444', 
                    margin: 0,
                    listStyleType: 'disc',
                    listStylePosition: 'outside'
                  }}>
                    {proj.highlights.map((hl, j) => (
                      <li key={j} style={{ marginBottom: '3px', paddingLeft: '2px' }}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
