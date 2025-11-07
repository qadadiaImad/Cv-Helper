/**
 * EXECUTIVE TEMPLATE
 * Single-column professional layout matching classic resume format
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Executive: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    padding: '50px 60px',
    fontFamily: 'serif',
    backgroundColor: '#ffffff',
    color: '#000',
    minHeight: '1200px',
  }}>
    {/* Header - Name and Title on same line */}
    <header style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{data.personal.fullName}</h1>
        {data.personal.title && <span style={{ fontSize: '20px', fontStyle: 'italic', color: '#333' }}>{data.personal.title}</span>}
      </div>
      
      {/* Contact Info - Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', marginTop: '8px' }}>
        <div>
          {data.personal.location && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>📍 {data.personal.location}</p>}
          {data.personal.phone && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>📱 {data.personal.phone}</p>}
        </div>
        <div>
          {data.personal.email && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>✉️ {data.personal.email}</p>}
          {data.personal.linkedIn && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>in {data.personal.linkedIn}</p>}
        </div>
      </div>
    </header>

    {/* Profile */}
    {data.summary && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Profile</h2>
        <p style={{ fontSize: '11px', lineHeight: '1.6', textAlign: 'justify' }}>{data.summary}</p>
      </section>
    )}

    {/* Professional Experience */}
    <section style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Professional Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '18px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px' }}>
          <div style={{ fontSize: '10px' }}>
            <p style={{ marginBottom: '2px' }}>{exp.startDate} – {exp.endDate}</p>
            {exp.location && <p style={{ color: '#666' }}>{exp.location}</p>}
          </div>
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>{exp.position}</h3>
            <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px', color: '#333' }}>{exp.company}</p>
            <ul style={{ fontSize: '10px', lineHeight: '1.5', paddingLeft: '15px', color: '#333', margin: 0 }}>
              {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '3px' }}>{ach}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </section>

    {/* Education */}
    <section style={{ marginBottom: '20px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Education</h2>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px' }}>
          <div style={{ fontSize: '10px' }}>
            <p style={{ marginBottom: '2px' }}>{edu.startDate} – {edu.endDate}</p>
            {edu.location && <p style={{ color: '#666' }}>{edu.location}</p>}
          </div>
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
              {edu.degree}{edu.field && ` in ${edu.field}`}
            </h3>
            <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#333' }}>{edu.institution}</p>
          </div>
        </div>
      ))}
    </section>

    {/* Skills with dot indicators */}
    {data.skillCategories ? (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px' }}>
          {data.skillCategories.flatMap(cat => cat.skills).map((skill, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
              <span>{skill.name}</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3, 4, 5].map(dot => (
                  <span key={dot} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: dot <= (skill.level === 'Expert' ? 5 : skill.level === 'Advanced' ? 4 : skill.level === 'Intermediate' ? 3 : 2) ? '#000' : '#fff',
                    border: '1px solid #000',
                    display: 'inline-block'
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : data.skills && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Skills</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px' }}>
          {data.skills.map((skill, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px' }}>
              <span>{skill}</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[1, 2, 3, 4, 5].map(dot => (
                  <span key={dot} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: dot <= 4 ? '#000' : '#fff',
                    border: '1px solid #000',
                    display: 'inline-block'
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Languages</h2>
        <div style={{ fontSize: '10px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {data.languages.map((lang, i) => (
            <span key={i}>• {lang.name}</span>
          ))}
        </div>
      </section>
    )}

    {/* Awards */}
    {data.awards && data.awards.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Awards</h2>
        {data.awards.map((award, i) => (
          <div key={i} style={{ fontSize: '11px', marginBottom: '8px' }}>
            <p style={{ fontWeight: 'bold' }}>{award.title}</p>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{award.issuer}</p>
          </div>
        ))}
      </section>
    )}

    {/* Favorite Quote (using custom sections or interests) */}
    {data.customSections && data.customSections.length > 0 && (
      data.customSections.map((section, i) => (
        <section key={i}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>{section.title}</h2>
          <div style={{ fontSize: '11px' }}>
            {typeof section.content === 'string' ? (
              <p style={{ fontStyle: 'italic' }}>{section.content}</p>
            ) : (
              section.content.map((line, j) => <p key={j} style={{ marginBottom: '4px', fontStyle: 'italic' }}>{line}</p>)
            )}
          </div>
        </section>
      ))
    )}
  </div>
)
