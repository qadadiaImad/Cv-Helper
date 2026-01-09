/**
 * TEMPLATE 35 - TWO COLUMN YELLOW
 * Professional resume with circular photo, navy/orange accents, and two-column layout
 * Features: Contact icons, skill tags, decorative diagonal elements
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const Template35: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#F8F8F8',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
    }}>
      {/* Top Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to right, #3D4A5C 0%, #3D4A5C 40%, transparent 40%)',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: '40%',
          width: '200px',
          height: '80px',
          background: '#E8B44D',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)',
        }} />
      </div>

      {/* Bottom Decorative Elements */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '200px',
          height: '60px',
          background: '#E8B44D',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50%',
          height: '60px',
          background: '#3D4A5C',
        }} />
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '40px',
        padding: '120px 60px 100px',
      }}>
        {/* Left Column */}
        <div>
          {/* Profile Photo */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '6px solid white',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
            margin: '0 0 25px 0',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="22" r="12" fill="#7BA8C0" opacity="0.7" />
                  <path
                    d="M10 50C10 38.402 19.402 29 31 29C42.598 29 52 38.402 52 50"
                    fill="#7BA8C0"
                    opacity="0.7"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Name and Title */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#3D4A5C',
            margin: '0 0 6px 0',
            textTransform: 'uppercase',
          }}>
            {data.personal?.fullName || 'Your Name'}
          </h1>
          <div style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#E8B44D',
            marginBottom: '35px',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>

          {/* Professional Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D4A5C',
                textTransform: 'uppercase',
                marginBottom: '18px',
                letterSpacing: '1px',
              }}>
                PROFESSIONAL EXPERIENCE
              </h3>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#666666',
                    marginBottom: '8px',
                  }}>
                    {exp.company}, {exp.location} | {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 16px',
                      listStyle: 'none',
                    }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '5px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '-16px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#E8B44D',
                          }} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Contact Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#3D4A5C',
              textTransform: 'uppercase',
              marginBottom: '18px',
              letterSpacing: '1px',
            }}>
              CONTACT
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.personal?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#E8B44D', fontSize: '14px' }}>📞</span>
                  <span style={{ fontSize: '12px', color: '#333333' }}>{data.personal.phone}</span>
                </div>
              )}
              {data.personal?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#E8B44D', fontSize: '14px' }}>✉️</span>
                  <span style={{ fontSize: '12px', color: '#333333', wordBreak: 'break-all' }}>{data.personal.email}</span>
                </div>
              )}
              {data.personal?.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#E8B44D', fontSize: '14px' }}>📍</span>
                  <span style={{ fontSize: '12px', color: '#333333' }}>{data.personal.location}</span>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#E8B44D', fontSize: '14px' }}>💼</span>
                  <span style={{ fontSize: '12px', color: '#333333', wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Section */}
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D4A5C',
                textTransform: 'uppercase',
                marginBottom: '18px',
                letterSpacing: '1px',
              }}>
                PROFILE
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#555555',
                lineHeight: 1.7,
                margin: '0',
              }}>
                {data.summary}
              </p>
            </div>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D4A5C',
                textTransform: 'uppercase',
                marginBottom: '18px',
                letterSpacing: '1px',
              }}>
                EDUCATION
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                  }}>
                    {edu.institution} - {edu.location} | {edu.endDate || edu.startDate || ''}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#555555',
                      marginTop: '4px',
                      fontStyle: 'italic',
                    }}>
                      {edu.honors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Key Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D4A5C',
                textTransform: 'uppercase',
                marginBottom: '18px',
                letterSpacing: '1px',
              }}>
                KEY SKILLS
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 5).map((skill, i) => (
                  <div key={i} style={{
                    padding: '8px 16px',
                    background: '#FFF8E8',
                    border: '1px solid #E8B44D',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#333333',
                    fontWeight: 600,
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 5 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D4A5C',
                textTransform: 'uppercase',
                marginBottom: '18px',
                letterSpacing: '1px',
              }}>
                ADDITIONAL SKILLS
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(5, 10).map((skill, i) => (
                  <div key={i} style={{
                    padding: '8px 16px',
                    background: '#FFF8E8',
                    border: '1px solid #E8B44D',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#333333',
                    fontWeight: 600,
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
