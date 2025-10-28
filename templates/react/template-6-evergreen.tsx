/**
 * EVERGREEN TEMPLATE
 * Two-column layout with dark header, photo on left, and skill progress bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Evergreen: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    color: '#333',
    minHeight: '1200px',
  }}>
    {/* Header - Dark teal with photo */}
    <header style={{
      backgroundColor: '#546975',
      color: '#fff',
      padding: '40px 50px',
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    }}>
      {/* Photo */}
      {data.personal.photo && (
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: '#fff',
          border: '5px solid rgba(255,255,255,0.2)',
        }}>
          <img src={data.personal.photo} alt={data.personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      {/* Name and Contact */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '15px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 5px 0', display: 'inline' }}>{data.personal.fullName}</h1>
          {data.personal.title && <span style={{ fontSize: '20px', marginLeft: '15px', fontWeight: '300' }}>{data.personal.title}</span>}
        </div>

        {/* Contact Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
          {data.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✉</span> {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📞</span> {data.personal.phone}
            </div>
          )}
          {data.personal.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>in</span> {data.personal.linkedIn}
            </div>
          )}
          {data.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1 / -1' }}>
              <span>📍</span> {data.personal.location}
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Two Column Layout */}
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr' }}>
      {/* Left Column - Beige */}
      <aside style={{ backgroundColor: '#f5f3f0', padding: '40px 35px' }}>
        {/* Profile */}
        {data.summary && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Profile</h2>
            <p style={{ fontSize: '11px', lineHeight: '1.7', textAlign: 'justify', color: '#444' }}>{data.summary.text}</p>
          </section>
        )}

        {/* Skills with Progress Bars */}
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Skills</h2>

          {/* CMS Skills */}
          {data.skillCategories && data.skillCategories.map((category, catIdx) => (
            <div key={catIdx} style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '10px', color: '#222' }}>{category.category}:</h3>
              <div style={{ fontSize: '10px', color: '#444', marginBottom: '12px', lineHeight: '1.5' }}>
                {category.skills.map(s => s.name).join(', ')}
              </div>
              <div style={{
                height: '6px',
                backgroundColor: '#d5d5d5',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '85%',
                  height: '100%',
                  backgroundColor: '#546975',
                  borderRadius: '3px',
                }} />
              </div>
            </div>
          ))}

          {/* Flat skills list as fallback */}
          {!data.skillCategories && data.skills && (
            <div>
              {data.skills.slice(0, 6).map((skill, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#222' }}>{skill}</h3>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${85 - (i * 5)}%`,
                      height: '100%',
                      backgroundColor: '#546975',
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </aside>

      {/* Right Column - Light Gray */}
      <main style={{ backgroundColor: '#ebebeb', padding: '40px 45px' }}>
        {/* Professional Experience */}
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Professional Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#222' }}>{exp.position}</h3>
              <p style={{ fontSize: '11px', marginBottom: '2px', color: '#444' }}>
                {exp.company} | {exp.location}
              </p>
              <p style={{ fontSize: '10px', marginBottom: '10px', color: '#666' }}>
                {exp.startDate} – {exp.endDate}
              </p>
              <ul style={{ fontSize: '10px', lineHeight: '1.6', paddingLeft: '18px', color: '#444', margin: 0 }}>
                {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '4px' }}>{ach}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* Certificates */}
        {data.certifications && data.certifications.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Certificates</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '11px', color: '#222' }}>• {cert.name} {cert.url && '🔗'}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#222' }}>
                {edu.degree}{edu.field && ` in ${edu.field}`}
              </h3>
              <p style={{ fontSize: '11px', color: '#444' }}>
                {edu.institution} | {edu.location}
              </p>
              <p style={{ fontSize: '10px', color: '#666' }}>{edu.endDate}</p>
            </div>
          ))}
        </section>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Languages</h2>
            {data.languages.map((lang, i) => (
              <p key={i} style={{ fontSize: '11px', marginBottom: '6px', color: '#444' }}>
                • {lang.name}
              </p>
            ))}
          </section>
        )}
      </main>
    </div>
  </div>
)
