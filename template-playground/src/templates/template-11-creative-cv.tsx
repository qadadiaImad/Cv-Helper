/**
 * CREATIVE CV TEMPLATE
 * Two-column layout with photo in header, pie chart, red/burgundy theme
 * Based on LaTeX Overleaf template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const CreativeCV: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    backgroundColor: '#ffffff',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    overflow: 'hidden',
    position: 'relative',
  }}>
    {/* Header */}
    <header style={{
      background: '#ffffff',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e0e0e0',
      height: '100px',
    }}>
      <div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#333',
          marginBottom: '5px',
          letterSpacing: '2px',
        }}>{data.personal.fullName}</h1>
        {data.personal.title && (
          <p style={{ fontSize: '14px', color: '#c41e3a', fontStyle: 'italic' }}>{data.personal.title}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.6', textAlign: 'right' }}>
          {data.personal.email && <div>📧 {data.personal.email}</div>}
          {data.personal.phone && <div>📱 {data.personal.phone}</div>}
          {data.personal.location && <div>📍 {data.personal.location}</div>}
        </div>
        {data.personal.photo && (
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#ddd',
            border: '3px solid #c41e3a',
            overflow: 'hidden',
          }}>
            <img src={data.personal.photo} alt={data.personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    </header>

    {/* Content Wrapper */}
    <div style={{ display: 'flex', height: 'calc(100% - 100px)' }}>
      {/* Left Sidebar */}
      <aside style={{ width: '40%', padding: '25px 20px', background: '#ffffff', overflowY: 'auto' }}>
        {/* Experience */}
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '12px',
            paddingBottom: '5px',
            borderBottom: '2px solid #c41e3a',
            letterSpacing: '0.5px',
          }}>Experience</h2>
          {data.experience.slice(0, 2).map((exp, i) => (
            <div key={i} style={{ marginBottom: '15px', paddingLeft: '15px', borderLeft: '2px solid #c41e3a', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-6px',
                top: '5px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#c41e3a',
              }} />
              <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '3px' }}>
                {exp.startDate} – {exp.endDate}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>{exp.position}</div>
              <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{exp.company}</div>
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                {exp.achievements.slice(0, 2).map((ach, j) => (
                  <div key={j}>• {ach}</div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              paddingBottom: '5px',
              borderBottom: '2px solid #c41e3a',
              letterSpacing: '0.5px',
            }}>Projects</h2>
            {data.projects.slice(0, 2).map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderLeft: '3px solid #c41e3a' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>{proj.name}</div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.3' }}>{proj.description}</div>
              </div>
            ))}
          </section>
        )}

        {/* Pie Chart - A Day of My Life */}
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '12px',
            paddingBottom: '5px',
            borderBottom: '2px solid #c41e3a',
            letterSpacing: '0.5px',
          }}>A Day of My Life</h2>
          <div style={{ textAlign: 'center', padding: '15px 10px', background: '#fff' }}>
            <svg width="180" height="180" viewBox="-10 -10 200 200" style={{ transform: 'rotate(-90deg)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
              <circle cx="90" cy="90" r="70" fill="none" stroke="#d4a5a5" strokeWidth="52" strokeDasharray="140 320" strokeDashoffset="0" />
              <circle cx="90" cy="90" r="70" fill="none" stroke="#e8b4b8" strokeWidth="52" strokeDasharray="95 320" strokeDashoffset="-140" />
              <circle cx="90" cy="90" r="70" fill="none" stroke="#f5d5d8" strokeWidth="52" strokeDasharray="60 320" strokeDashoffset="-235" />
              <circle cx="90" cy="90" r="70" fill="none" stroke="#c85a6e" strokeWidth="52" strokeDasharray="25 320" strokeDashoffset="-295" />
            </svg>
            <div style={{ marginTop: '10px', fontSize: '9px', textAlign: 'left', padding: '0 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', lineHeight: '1.3' }}>
                <div style={{ width: '10px', height: '10px', marginRight: '6px', borderRadius: '2px', background: '#d4a5a5', flexShrink: 0 }} />
                <span>Hopeful/cheerful by night</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', lineHeight: '1.3' }}>
                <div style={{ width: '10px', height: '10px', marginRight: '6px', borderRadius: '2px', background: '#e8b4b8', flexShrink: 0 }} />
                <span>Sleep, beautiful sleep</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', lineHeight: '1.3' }}>
                <div style={{ width: '10px', height: '10px', marginRight: '6px', borderRadius: '2px', background: '#f5d5d8', flexShrink: 0 }} />
                <span>Sports and relaxation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', lineHeight: '1.3' }}>
                <div style={{ width: '10px', height: '10px', marginRight: '6px', borderRadius: '2px', background: '#c85a6e', flexShrink: 0 }} />
                <span>Spending time with family</span>
              </div>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main style={{ width: '60%', padding: '25px 30px', background: '#fafafa', overflowY: 'auto' }}>
        {/* Philosophy */}
        {data.summary && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              paddingBottom: '5px',
              borderBottom: '2px solid #c41e3a',
              letterSpacing: '0.5px',
            }}>My Life Philosophy</h2>
            <div style={{ background: '#fff', padding: '15px', borderLeft: '4px solid #c41e3a', fontStyle: 'italic', color: '#666', fontSize: '12px', lineHeight: '1.6' }}>
              "{data.summary.text}"
            </div>
          </section>
        )}

        {/* Most Proud Of (Awards) */}
        {data.awards && data.awards.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              paddingBottom: '5px',
              borderBottom: '2px solid #c41e3a',
              letterSpacing: '0.5px',
            }}>Most Proud Of</h2>
            {data.awards.slice(0, 3).map((award, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', padding: '8px', background: '#fff' }}>
                <div style={{
                  width: '30px',
                  height: '30px',
                  background: '#c41e3a',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  marginRight: '10px',
                  flexShrink: 0,
                }}>🏆</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>{award.title}</div>
                  <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.3' }}>{award.description || award.issuer}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Strengths (Skills as tags) */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              paddingBottom: '5px',
              borderBottom: '2px solid #c41e3a',
              letterSpacing: '0.5px',
            }}>Strengths</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: '#fff' }}>
              {data.skills.slice(0, 6).map((skill, i) => (
                <span key={i} style={{
                  padding: '5px 12px',
                  background: '#f0f0f0',
                  borderRadius: '15px',
                  fontSize: '10px',
                  color: '#333',
                  border: '1px solid #ddd',
                }}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              paddingBottom: '5px',
              borderBottom: '2px solid #c41e3a',
              letterSpacing: '0.5px',
            }}>Languages</h2>
            {data.languages.map((lang, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#fff' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>{lang.name}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(dot => (
                    <div key={dot} style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: dot <= (['Native', 'Fluent'].includes(lang.proficiency) ? 5 : ['Professional'].includes(lang.proficiency) ? 4 : 3) ? '#c41e3a' : '#e0e0e0',
                    }} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '12px',
            paddingBottom: '5px',
            borderBottom: '2px solid #c41e3a',
            letterSpacing: '0.5px',
          }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px', padding: '12px', background: '#fff', borderLeft: '3px solid #c41e3a' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                {edu.degree}{edu.field && ` in ${edu.field}`}
              </div>
              <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{edu.institution}</div>
              <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>
                📅 {edu.startDate} – {edu.endDate}
              </div>
              {edu.gpa && <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', lineHeight: '1.3' }}>GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      </main>
    </div>
  </div>
)
