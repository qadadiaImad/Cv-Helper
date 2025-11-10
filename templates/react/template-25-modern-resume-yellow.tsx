/**
 * TEMPLATE 25: MODERN RESUME - YELLOW
 * Yellow/gold sidebar with photo + Navy bottom section + White main content
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ModernResumeYellowTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    height: '100vh',
    fontFamily: "'Poppins', 'Arial', sans-serif",
    display: 'flex',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  }}>
    {/* Left Sidebar - Yellow + Navy */}
    <aside style={{
      width: '195.5px', // Fixed width (23% of 850px)
      background: '#1e2532',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      flexShrink: 0,
      height: '100%',
    }}>
      {/* Yellow section */}
      <div style={{
        background: '#FDB913',
        padding: '140px 25px 190px',
        position: 'relative',
      }}>
        {/* Photo and Name - overlaps yellow and navy */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          position: 'relative',
          marginTop: '-140px',
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'white',
            margin: '0 auto 25px',
            overflow: 'hidden',
            border: '8px solid #1e2532',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            position: 'relative',
          }}>
            <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>{data.personal?.fullName || 'Your Name'}</h2>
          <p style={{
            fontSize: '13px',
            color: 'white',
            textAlign: 'center',
            fontWeight: 300,
            opacity: 0.95,
          }}>{data.personal?.title || 'Professional'}</p>
        </div>
      </div>

      {/* Navy section */}
      <div style={{ background: '#1e2532', padding: '30px 25px', flex: 1 }}>
        {/* Contact */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '28px',
              height: '28px',
              background: '#FDB913',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              flexShrink: 0,
            }}>📞</span>
            Contact
          </h3>
          {data.personal?.email && (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
              <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>✉️</span>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.phone && (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
              <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>📞</span>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.website && (
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
              <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>🌐</span>
              <span>{data.personal.website}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                background: '#FDB913',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}>⚡</span>
              Skills
            </h3>
            {data.skills.slice(0, 5).map((skill, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', marginBottom: '5px', fontWeight: 400 }}>{skill}</div>
                <div style={{ height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: '#FDB913',
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
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                background: '#FDB913',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}>🌍</span>
              Languages
            </h3>
            <div style={{ fontSize: '10px', lineHeight: 1.8 }}>
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                return <div key={i}>{langName}</div>;
              })}
            </div>
          </div>
        )}
      </div>
    </aside>

    {/* Main Content - White */}
    <main style={{
      flex: 1,
      background: '#f8f8f8',
      padding: '40px 40px',
    }}>
      {/* Profile */}
      {data.summary && (
        <section style={{
          marginBottom: '30px',
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '2px solid #f0f0f0',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FDB913',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}>👤</div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
              Profile
            </h2>
          </div>
          <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.8, textAlign: 'justify' }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{
          marginBottom: '30px',
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '2px solid #f0f0f0',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FDB913',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}>💼</div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
              Experience
            </h2>
          </div>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '25px' }}>
              <div style={{
                content: '',
                position: 'absolute',
                left: 0,
                top: '6px',
                width: '12px',
                height: '12px',
                background: '#FDB913',
                borderRadius: '50%',
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e2532' }}>
                  {exp.position}
                </div>
                <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                {exp.company}
              </div>
              {exp.description && (
                <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.7 }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section style={{
          marginBottom: '30px',
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '2px solid #f0f0f0',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FDB913',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}>🎓</div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
              Education
            </h2>
          </div>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '25px' }}>
              <div style={{
                content: '',
                position: 'absolute',
                left: 0,
                top: '6px',
                width: '12px',
                height: '12px',
                background: '#FDB913',
                borderRadius: '50%',
              }} />
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e2532', marginBottom: '3px' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: '10px', color: '#555' }}>
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section style={{
          marginBottom: '30px',
          background: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '12px',
            borderBottom: '2px solid #f0f0f0',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FDB913',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              flexShrink: 0,
            }}>📁</div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
              Portfolio
            </h2>
          </div>
          {data.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e2532', marginBottom: '5px' }}>
                {project.name}
              </div>
              <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.6 }}>
                {project.description}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  </div>
)
