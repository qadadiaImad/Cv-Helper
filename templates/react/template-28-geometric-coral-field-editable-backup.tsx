/**
 * TEMPLATE 28 - GEOMETRIC CORAL
 * Modern geometric design with diagonal split and coral accent
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const GeometricCoralTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      position: 'relative',
    }}>
      {/* Geometric Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '320px',
        overflow: 'hidden',
        zIndex: 0,
      }}>
        {/* Navy triangle - left side */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderTop: '320px solid #3d4c5f',
          borderRight: '240px solid transparent',
        }} />
        {/* Coral diagonal section - top right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: '195px',
          height: '320px',
          background: 'linear-gradient(135deg, #e88d7a 0%, #d97764 100%)',
        }} />
        {/* White diagonal overlay - bottom portion */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '195px',
          right: 0,
          height: '220px',
          backgroundColor: '#ffffff',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        }} />
      </div>

      {/* Left Sidebar */}
      <aside style={{
        width: '195px',
        backgroundColor: '#e8e6e1',
        padding: '30px 20px',
        position: 'relative',
        zIndex: 1,
        flexShrink: 0,
      }}>
        {/* Photo */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#d8d6d1',
          marginBottom: '30px',
          border: '4px solid #f5f3ee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {data.personal?.photo?.url ? (
            <img
              src={data.personal.photo.url}
              alt={data.personal?.fullName || 'Profile'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: data.personal.photo.effects?.grayscale ? 'grayscale(100%)' : 'none',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#c8c6c1' }} />
          )}
        </div>

        {/* Professional Skills */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#3d4c5f',
            textTransform: 'uppercase',
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}>Professional Skills</h2>
          {data.skills && data.skills.length > 0 && (
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8' }}>
              {data.skills.slice(0, 10).map((skill, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  {skill}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Personal Skills */}
        {data.interests && data.interests.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#3d4c5f',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '0.5px',
            }}>Personal Skills</h2>
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8' }}>
              {data.interests.slice(0, 8).map((interest, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  {typeof interest === 'string' ? interest : interest.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#3d4c5f',
            textTransform: 'uppercase',
            marginBottom: '12px',
            letterSpacing: '0.5px',
          }}>Contact</h2>
          <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.9' }}>
            {data.personal?.phone && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>P:</span> {data.personal.phone}
              </div>
            )}
            {data.personal?.email && (
              <div style={{ marginBottom: '4px', wordBreak: 'break-all' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>E:</span> {data.personal.email}
              </div>
            )}
            {data.personal?.website && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>W:</span> {data.personal.website}
              </div>
            )}
          </div>
        </section>

        {/* Social */}
        {data.personal?.linkedIn && (
          <section>
            <h2 style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#3d4c5f',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '0.5px',
            }}>Social</h2>
            <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.9' }}>
              {data.personal.linkedIn && (
                <div style={{ marginBottom: '4px' }}>fb.me/{data.personal.linkedIn.split('/').pop()}</div>
              )}
              {data.personal.linkedIn && (
                <div style={{ marginBottom: '4px' }}>@{data.personal.linkedIn.split('/').pop()}</div>
              )}
              {data.personal.linkedIn && (
                <div>@{data.personal.linkedIn.split('/').pop()}tweets</div>
              )}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '50px 45px 40px 45px',
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#ffffff',
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '35px', paddingTop: '80px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#d97764',
            margin: 0,
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '8px',
            lineHeight: '1',
          }}>
            {data.personal?.fullName || 'Your Name'}
          </h1>
          <div style={{
            fontSize: '11px',
            color: '#d4b5ad',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: '300',
          }}>
            {data.personal?.title || 'Your Title'}
          </div>
        </div>

        {/* About */}
        {data.summary && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#d97764',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '2px',
            }}>About</h2>
            <p style={{
              fontSize: '10px',
              color: '#666',
              lineHeight: '1.8',
              margin: 0,
            }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#d97764',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '2px',
            }}>Work Experience</h2>
            {data.experience.slice(0, 3).map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                }}>
                  {exp.position}
                </h3>
                <div style={{
                  fontSize: '10px',
                  color: '#999',
                  marginBottom: '8px',
                }}>
                  {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{
                    margin: 0,
                    paddingLeft: '15px',
                    fontSize: '9px',
                    color: '#666',
                    lineHeight: '1.7',
                  }}>
                    {exp.achievements.slice(0, 3).map((achievement, j) => (
                      <li key={j} style={{ marginBottom: '4px' }}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#d97764',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '2px',
            }}>Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                }}>
                  {edu.degree}
                </h3>
                <div style={{
                  fontSize: '10px',
                  color: '#999',
                }}>
                  {edu.institution} | {edu.startDate} - {edu.endDate}
                </div>
                {edu.gpa && (
                  <div style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                    GPA {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <section>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#d97764',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '2px',
            }}>Awards</h2>
            {data.awards.map((award, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '2px',
                  textTransform: 'uppercase',
                }}>
                  {award.title}
                </h3>
                <div style={{
                  fontSize: '10px',
                  color: '#999',
                }}>
                  {award.issuer} | {award.date}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
