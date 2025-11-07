/**
 * JACK SPARROW CV TEMPLATE
 * Two-column layout with left sidebar (27%), dark gray header, cyan accents, orange skill bars
 * Based on LaTeX Overleaf template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const JackSparrow: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, Helvetica, sans-serif',
    overflow: 'hidden',
    position: 'relative',
  }}>
    {/* Header */}
    <header style={{
      background: '#4a4a4a',
      color: 'white',
      padding: '18px 20px',
      textAlign: 'center',
      height: '65px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 3px 0', letterSpacing: '1px' }}>
        {data.personal.fullName}
      </h1>
      {data.personal.title && (
        <h2 style={{ fontSize: '13px', fontWeight: '300', margin: 0, opacity: 0.85, letterSpacing: '0.5px' }}>
          {data.personal.title}
        </h2>
      )}
    </header>

    {/* Content Wrapper */}
    <div style={{ display: 'flex', height: 'calc(100% - 65px)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '27%',
        background: '#f0f0f0',
        padding: '15px 12px',
        overflowY: 'auto',
      }}>
        {/* Photo */}
        {data.personal.photo && (
          <div style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            background: '#ddd',
            margin: '0 auto 15px',
            border: '3px solid #00bcd4',
            overflow: 'hidden',
          }}>
            <img src={data.personal.photo} alt={data.personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

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
              {data.summary.text}
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
            <div style={{ marginBottom: '5px' }}><strong>{data.personal.fullName}</strong></div>
            {data.personal.location && <div style={{ marginBottom: '5px' }}>{data.personal.location}</div>}
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
                <strong>{lang.name}:</strong> {lang.proficiency}
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
            {data.personal.email && <div style={{ marginBottom: '5px' }}>📧 {data.personal.email}</div>}
            {data.personal.phone && <div style={{ marginBottom: '5px' }}>📱 {data.personal.phone}</div>}
            {data.personal.website && <div style={{ marginBottom: '5px' }}>🌐 {data.personal.website}</div>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ width: '73%', padding: '20px 25px', overflowY: 'auto' }}>
        {/* Experience */}
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
                {exp.startDate} – {exp.endDate}
              </div>
              <div style={{ flex: 1, borderLeft: '2px solid #00bcd4', paddingLeft: '15px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                  {exp.position}
                </h3>
                <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>{exp.company}</div>
                <ul style={{ paddingLeft: '18px', fontSize: '10px', color: '#666', margin: 0 }}>
                  {exp.achievements.slice(0, 3).map((ach, j) => (
                    <li key={j} style={{ marginBottom: '3px', lineHeight: '1.3' }}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
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
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </h3>
                <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>
                  {edu.institution} • {edu.location}
                </div>
                {edu.gpa && <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '6px' }}>GPA: {edu.gpa}</p>}
              </div>
            </div>
          ))}
        </section>

        {/* Certifications & Grants */}
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
            }}>Certifications & Grants</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '10px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                <strong>{cert.name}</strong> - {cert.issuer} ({cert.date})
              </div>
            ))}
          </section>
        )}

        {/* Publications */}
        {data.publications && data.publications.length > 0 && (
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
            }}>Publications</h2>
            {data.publications.map((pub, i) => (
              <div key={i} style={{ marginBottom: '10px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                <strong>{pub.title}</strong>, {pub.publisher}, {pub.date}
              </div>
            ))}
          </section>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
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
            }}>Talks</h2>
            {data.awards.map((award, i) => (
              <div key={i} style={{ marginBottom: '10px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                <strong>{award.title}</strong> - {award.issuer}, {award.date}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  </div>
)
