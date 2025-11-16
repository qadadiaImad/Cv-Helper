/**
 * ATLANTIC BLUE TEMPLATE
 * Dark left sidebar with photo, white content area
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { HtmlRenderer } from '@/components/builder/html-renderer'

export const AtlanticBlue: React.FC<UniversalTemplateProps> = ({ data }) => {
  console.log('🎨 AtlanticBlue template rendering with:', data.personal?.fullName)
  
  // Photo configuration with defaults
  const photoConfig = data.personal?.photo
  const photoSize = photoConfig?.size || 120
  const photoBorderRadius = photoConfig?.borderRadius ?? 50
  const photoUrl = photoConfig?.url
  const photoHidden = photoConfig?.effects?.hidden
  const photoGrayscale = photoConfig?.effects?.grayscale
  const photoBorder = photoConfig?.effects?.border

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      minHeight: '1200px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      {/* Left Sidebar - Dark Blue */}
      <aside style={{
        width: '280px',
        backgroundColor: '#1a3a52',
        color: '#ffffff',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>
        {/* Photo */}
        {photoUrl && !photoHidden && (
          <div style={{
            width: `${photoSize}px`,
            height: `${photoSize}px`,
            borderRadius: `${photoBorderRadius}%`,
            backgroundColor: '#ffffff',
            margin: '0 auto',
            overflow: 'hidden',
            border: photoBorder ? '4px solid rgba(255,255,255,0.3)' : '4px solid rgba(255,255,255,0.1)',
          }}>
            <img 
              src={photoUrl} 
              alt={data.personal?.fullName || 'Profile'} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: photoGrayscale ? 'grayscale(100%)' : 'none',
              }} 
            />
          </div>
        )}

      {/* Name & Title */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>{data.personal?.fullName || 'Your Name'}</h1>
        {data.personal?.title && <p style={{ fontSize: '14px', opacity: 0.9, fontWeight: '300' }}>{data.personal.title}</p>}
      </div>

      {/* Contact */}
      <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>CONTACT</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ wordBreak: 'break-word' }}>✉️ {data.personal?.email || 'email@example.com'}</p>
          <p>📱 {data.personal?.phone || '123-456-7890'}</p>
          {data.personal?.location && <p>📍 {data.personal.location}</p>}
          {data.personal?.website && <p>🌐 {data.personal.website}</p>}
          {data.personal?.linkedIn && <p>💼 {data.personal.linkedIn}</p>}
          {data.personal?.github && <p>💻 {data.personal.github}</p>}
          {data.personal?.portfolio && <p>🎨 {data.personal.portfolio}</p>}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div style={{ fontSize: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>SKILLS</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.skills.map((skill, i) => (
              <li key={i} style={{ padding: '6px 0 6px 12px', borderLeft: '3px solid #4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div style={{ fontSize: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>LANGUAGES</h3>
          {data.languages.map((lang, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <p style={{ fontWeight: '600', marginBottom: '2px' }}>{lang.name}</p>
              <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} style={{
                    width: '30px',
                    height: '4px',
                    backgroundColor: level <= (['Native', 'Fluent'].includes(lang.proficiency) ? 5 : ['Professional'].includes(lang.proficiency) ? 4 : 3) ? '#4a90e2' : 'rgba(255,255,255,0.2)',
                    borderRadius: '2px',
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications in sidebar */}
      {data.certifications && data.certifications.length > 0 && (
        <div style={{ fontSize: '11px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>CERTIFICATIONS</h3>
          {data.certifications.map((cert, i) => (
            <div key={i} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: i < data.certifications!.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>{cert.name}</p>
              <p style={{ opacity: 0.8, fontSize: '10px' }}>{cert.issuer}</p>
              <p style={{ opacity: 0.7, fontSize: '10px' }}>{cert.date}{cert.expiryDate && ` - ${cert.expiryDate}`}</p>
              {cert.credentialId && <p style={{ opacity: 0.6, fontSize: '9px', marginTop: '2px' }}>ID: {cert.credentialId}</p>}
              {cert.url && <a href={cert.url} style={{ opacity: 0.9, fontSize: '9px', color: '#4a90e2', display: 'block', marginTop: '2px' }}>🔗 Verify</a>}
            </div>
          ))}
        </div>
      )}
    </aside>

    {/* Right Content Area - White */}
    <main style={{
      flex: 1,
      backgroundColor: '#ffffff',
      padding: '40px 50px',
    }}>
      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '12px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>PROFESSIONAL SUMMARY</h2>
          <HtmlRenderer
            html={data.summary}
            as="div"
            style={{ fontSize: '13px', lineHeight: '1.7', color: '#333', textAlign: 'justify' }}
          />
        </section>
      )}

      {/* Experience */}
      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>EXPERIENCE</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '25px', paddingBottom: '25px', borderBottom: i < data.experience.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a3a52' }}>{exp.position}</h3>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{exp.startDate} - {exp.endDate}</span>
            </div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#4a90e2', marginBottom: '10px' }}>
              {exp.company}{exp.location && ` • ${exp.location}`}
            </p>
            {exp.description && (
              <HtmlRenderer
                html={exp.description}
                as="div"
                style={{ fontSize: '12px', color: '#555', marginBottom: '8px', fontStyle: 'italic' }}
              />
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul style={{ fontSize: '12px', lineHeight: '1.7', paddingLeft: '20px', color: '#444' }}>
                {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '4px' }}>{ach}</li>)}
              </ul>
            )}
            {exp.technologies && exp.technologies.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exp.technologies.map((tech, k) => (
                  <span key={k} style={{ fontSize: '10px', padding: '3px 8px', backgroundColor: '#e8f4ff', color: '#1a3a52', borderRadius: '3px' }}>{tech}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>PROJECTS</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52' }}>{proj.name}</h3>
                {(proj.startDate || proj.endDate) && (
                  <span style={{ fontSize: '10px', color: '#666', whiteSpace: 'nowrap' }}>
                    {proj.startDate} {proj.endDate && `- ${proj.endDate}`}
                  </span>
                )}
              </div>
              {proj.role && <p style={{ fontSize: '11px', color: '#4a90e2', marginBottom: '4px' }}>{proj.role}</p>}
              <p style={{ fontSize: '12px', color: '#555', marginBottom: '8px' }}>{proj.description}</p>
              {proj.highlights && proj.highlights.length > 0 && (
                <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', color: '#444' }}>
                  {proj.highlights.map((hl, j) => <li key={j}>{hl}</li>)}
                </ul>
              )}
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                {proj.technologies && proj.technologies.map((tech, k) => (
                  <span key={k} style={{ fontSize: '10px', padding: '3px 8px', backgroundColor: '#f0f0f0', color: '#555', borderRadius: '3px' }}>{tech}</span>
                ))}
                {proj.url && <a href={proj.url} style={{ fontSize: '10px', color: '#4a90e2', marginLeft: '8px' }}>🔗 Live Demo</a>}
                {proj.github && <a href={proj.github} style={{ fontSize: '10px', color: '#4a90e2', marginLeft: '8px' }}>💻 GitHub</a>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      <section style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>EDUCATION</h2>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a3a52' }}>{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{edu.startDate} - {edu.endDate}</span>
            </div>
            <p style={{ fontSize: '13px', color: '#4a90e2', marginBottom: '4px' }}>{edu.institution}{edu.location && ` • ${edu.location}`}</p>
            {edu.gpa && <p style={{ fontSize: '11px', color: '#666' }}>GPA: {edu.gpa}</p>}
            {edu.honors && edu.honors.length > 0 && (
              <p style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Honors: {edu.honors.join(', ')}</p>
            )}
            {edu.coursework && edu.coursework.length > 0 && (
              <p style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Relevant Coursework: {edu.coursework.join(', ')}</p>
            )}
          </div>
        ))}
      </section>

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>AWARDS & ACHIEVEMENTS</h2>
          {data.awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#1a3a52' }}>{award.title}</h3>
              <p style={{ fontSize: '11px', color: '#4a90e2' }}>{award.issuer} • {award.date}</p>
              {award.description && <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>{award.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Volunteer Experience */}
      {data.volunteer && data.volunteer.length > 0 && (
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>VOLUNTEER EXPERIENCE</h2>
          {data.volunteer.map((vol, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52' }}>{vol.role}</h3>
                <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap' }}>{vol.startDate} - {vol.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#4a90e2', marginBottom: '8px' }}>{vol.organization}</p>
              {vol.description && <p style={{ fontSize: '12px', color: '#555', marginBottom: '6px' }}>{vol.description}</p>}
              {vol.achievements && vol.achievements.length > 0 && (
                <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', color: '#444' }}>
                  {vol.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Interests */}
      {data.interests && data.interests.length > 0 && (
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>INTERESTS</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.interests.map((interest, i) => (
              <div key={i} style={{ fontSize: '12px', color: '#555' }}>
                <strong>{interest.name}</strong>
                {interest.description && <span style={{ fontSize: '11px', color: '#666', marginLeft: '4px' }}>- {interest.description}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {data.references && data.references.length > 0 && (
        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>REFERENCES</h2>
          {data.references.map((ref, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#1a3a52' }}>{ref.name}</h3>
              <p style={{ fontSize: '11px', color: '#4a90e2' }}>{ref.title} at {ref.company}</p>
              <p style={{ fontSize: '11px', color: '#666' }}>{ref.email} • {ref.phone}</p>
              <p style={{ fontSize: '10px', color: '#888', fontStyle: 'italic' }}>Relationship: {ref.relationship}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  </div>
  )
}
