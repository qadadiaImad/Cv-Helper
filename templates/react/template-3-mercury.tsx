/**
 * MERCURY TEMPLATE
 * Professional layout with photo on left and gray section backgrounds
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { HtmlRenderer } from '@/components/builder/html-renderer'

export const Mercury: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    padding: '0',
    fontFamily: 'Georgia, serif',
    backgroundColor: '#e8e8e8',
    color: '#5a5a5a',
    minHeight: '1200px',
  }}>
    {/* Header with Photo on Left */}
    <header style={{ padding: '50px 60px 40px', backgroundColor: '#e8e8e8', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
      {data.personal.photo && (
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: '#fff',
        }}>
          <img src={data.personal.photo.url} alt={data.personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px', color: '#2c2c2c' }}>{data.personal.fullName}</h1>
        {data.personal.title && <p style={{ fontSize: '16px', color: '#6a6a6a', marginBottom: '15px' }}>{data.personal.title}</p>}
        
        {/* Contact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: '#5a5a5a' }}>
          {data.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✉</span> {data.personal.email}
            </div>
          )}
          {data.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📞</span> {data.personal.phone}
            </div>
          )}
          {data.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span> {data.personal.location}
            </div>
          )}
          {data.personal.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>in</span> {data.personal.linkedIn}
            </div>
          )}
          {data.personal.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔗</span> {data.personal.website}
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Profile Section */}
    {data.summary && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Profile</h2>
        <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
          <HtmlRenderer html={data.summary} as="div" style={{ fontSize: '11px', lineHeight: '1.7', textAlign: 'justify', color: '#5a5a5a' }} />
        </div>
      </section>
    )}

    {/* Work Experience */}
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Work Experience</h2>
      <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6a6a6a' }}>
              <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>{exp.startDate} – {exp.endDate}</p>
              {exp.location && <p>{exp.location}</p>}
            </div>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: '#2c2c2c' }}>{exp.company}</h3>
              <p style={{ fontSize: '11px', marginBottom: '8px', color: '#5a5a5a' }}>{exp.position}</p>
              <ul style={{ fontSize: '10px', lineHeight: '1.6', paddingLeft: '15px', color: '#6a6a6a', margin: 0 }}>
                {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '4px' }}>{ach}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Education */}
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Education</h2>
      <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6a6a6a' }}>
              <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>{edu.startDate} – {edu.endDate}</p>
              {edu.location && <p>{edu.location}</p>}
            </div>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: '#2c2c2c' }}>{edu.degree}{edu.field && ` in ${edu.field}`}</h3>
              <p style={{ fontSize: '11px', color: '#5a5a5a' }}>{edu.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Skills - 3 columns with bullets */}
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Skills</h2>
      <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
        {data.skillCategories ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 30px' }}>
            {data.skillCategories.flatMap(cat => cat.skills.map(s => s.name)).map((skill, i) => (
              <div key={i} style={{ fontSize: '10px', color: '#5a5a5a' }}>• {skill}</div>
            ))}
          </div>
        ) : data.skills && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 30px' }}>
            {data.skills.map((skill, i) => (
              <div key={i} style={{ fontSize: '10px', color: '#5a5a5a' }}>• {skill}</div>
            ))}
          </div>
        )}
      </div>
    </section>

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Languages</h2>
        <div style={{ padding: '20px 60px', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', gap: '80px' }}>
          {data.languages.map((lang, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(dot => (
                  <div key={dot} style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: dot <= (['Native', 'Fluent'].includes(lang.proficiency) ? 5 : ['Professional'].includes(lang.proficiency) ? 4 : 3) ? '#4a4a4a' : '#d9d9d9',
                  }} />
                ))}
              </div>
              <p style={{ fontSize: '11px', color: '#5a5a5a' }}>{lang.name}</p>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* Awards */}
    {data.awards && data.awards.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Awards</h2>
        <div style={{ padding: '20px 60px', backgroundColor: '#fff' }}>
          {data.awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#2c2c2c', marginBottom: '2px' }}>{award.title}</p>
              <p style={{ fontSize: '10px', color: '#6a6a6a', fontStyle: 'italic' }}>{award.issuer}, {award.date}</p>
            </div>
          ))}
        </div>
      </section>
    )}
  </div>
)
