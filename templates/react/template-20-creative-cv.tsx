/**
 * TEMPLATE 20: CREATIVE CV
 * Two-column layout with photo in header, pie chart, red/burgundy theme
 * Based on LaTeX Overleaf template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const CreativeCVTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Header - Full Width with Circle Photo */}
    <header style={{
      background: '#ffffff',
      padding: '20px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '1px solid #e0e0e0',
      minHeight: '100px',
      width: '100%',
      flexShrink: 0,
      position: 'relative',
    }}>
      <div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#333',
          marginBottom: '5px',
          letterSpacing: '2px',
        }}>{data.personal?.fullName || 'BRIAN T. WAYNE'}</h1>
        {data.personal?.title && (
          <p style={{ fontSize: '13px', color: '#c41e3a', fontStyle: 'italic' }}>{data.personal.title}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8', textAlign: 'right' }}>
          {data.personal?.email && <div>✉ {data.personal.email}</div>}
          {data.personal?.phone && <div>📱 {data.personal.phone}</div>}
          {data.personal?.location && <div>📍 {data.personal.location}</div>}
        </div>
        {/* Circle Photo with Name */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '3px solid #c41e3a',
          background: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#c41e3a', textAlign: 'center', lineHeight: '1.2' }}>
            {data.personal?.fullName?.split(' ')[0] || 'Brian'}<br/>{data.personal?.fullName?.split(' ').slice(-1)[0] || 'Wayne'}
          </div>
        </div>
      </div>
    </header>

    {/* Content Wrapper */}
    <div style={{ display: 'flex', flex: 1 }}>
      {/* Left Sidebar */}
      <aside style={{ flex: '0 0 40%', padding: '25px 20px', background: '#ffffff' }}>
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
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
                  {exp.startDate} – {exp.endDate || 'Present'}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>{exp.position}</div>
                <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{exp.company}</div>
                {exp.description && (
                  <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
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

        {/* A Day of My Life - Donut Chart */}
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
            {/* Donut Chart */}
            <div style={{ position: 'relative', width: '150px', height: '150px', marginBottom: '20px' }}>
              <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
                {/* Work segment (40%) - Red */}
                <circle cx="75" cy="75" r="60" fill="none" stroke="#c41e3a" strokeWidth="30" 
                  strokeDasharray="150.8 376.99" strokeDashoffset="0" />
                {/* Sleep segment (30%) - Light pink */}
                <circle cx="75" cy="75" r="60" fill="none" stroke="#e8a5a5" strokeWidth="30" 
                  strokeDasharray="113.1 376.99" strokeDashoffset="-150.8" />
                {/* Hobbies segment (20%) - Lighter pink */}
                <circle cx="75" cy="75" r="60" fill="none" stroke="#f5d0d0" strokeWidth="30" 
                  strokeDasharray="75.4 376.99" strokeDashoffset="-263.9" />
                {/* Other segment (10%) - Lightest */}
                <circle cx="75" cy="75" r="60" fill="none" stroke="#fae5e5" strokeWidth="30" 
                  strokeDasharray="37.7 376.99" strokeDashoffset="-339.3" />
              </svg>
              {/* Center white circle */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: '#fff',
              }} />
            </div>
            {/* Legend */}
            <div style={{ fontSize: '10px', lineHeight: '1.8', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div style={{ width: '12px', height: '12px', background: '#c41e3a', borderRadius: '2px' }} />
                <span>Productive/Useful (at night)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div style={{ width: '12px', height: '12px', background: '#e8a5a5', borderRadius: '2px' }} />
                <span>Sleep, beautiful sleep</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div style={{ width: '12px', height: '12px', background: '#f5d0d0', borderRadius: '2px' }} />
                <span>Family time/relaxation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', background: '#fae5e5', borderRadius: '2px' }} />
                <span>Hobbies/Fun with others</span>
              </div>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '25px 30px', background: '#fafafa' }}>
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
            <div style={{ background: '#fff', padding: '15px', borderLeft: '4px solid #c41e3a', fontStyle: 'italic', color: '#666', fontSize: '11px', lineHeight: '1.6' }}>
              "{data.summary}"
            </div>
          </section>
        )}

        {/* Most Proud Of */}
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
          <div style={{ background: '#fff', padding: '15px' }}>
            {/* Achievement 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#c41e3a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '18px',
              }}>🏆</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                  Product Manager of the Year
                </div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                  Recognized for exceptional product leadership
                </div>
              </div>
            </div>
            {/* Achievement 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#c41e3a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '18px',
              }}>🏆</div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                  Innovation Award
                </div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                  Startup Inc
                </div>
              </div>
            </div>
          </div>
        </section>

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
            {data.languages.map((lang, i) => {
              const langName = typeof lang === 'string' ? lang : lang.name;
              const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
              const level = ['Native', 'Fluent'].includes(proficiency) ? 5 : ['Professional'].includes(proficiency) ? 4 : 3;
              
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#fff' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>{langName}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div key={dot} style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: dot <= level ? '#c41e3a' : '#e0e0e0',
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
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
                  {edu.degree}
                </div>
                <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{edu.institution}</div>
                <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>
                  📅 {edu.startDate} – {edu.endDate}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  </div>
)
