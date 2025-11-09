/**
 * TEMPLATE 20: CREATIVE ORANGE
 * Based on screenshot - Creative CV with orange wave header
 * Two-column layout with teal accents
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const CreativeOrangeTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
  }}>
    {/* Orange Wave Header - Full Width */}
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '180px',
        zIndex: 0,
      }}
      viewBox="0 0 1920 180"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B4A" />
          <stop offset="50%" stopColor="#FF8C42" />
          <stop offset="100%" stopColor="#FFA040" />
        </linearGradient>
      </defs>
      <path
        d="M0,0 L1920,0 L1920,120 Q1440,180 960,120 Q480,60 0,120 Z"
        fill="url(#orangeGradient)"
      />
    </svg>

    {/* Teal Wave Footer - Full Width */}
    <svg
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '50%',
        height: '150px',
        zIndex: 0,
      }}
      viewBox="0 0 960 150"
      preserveAspectRatio="none"
    >
      <path
        d="M960,150 L960,50 Q720,80 480,50 Q240,20 0,50 L0,150 Z"
        fill="#2DBFB8"
      />
    </svg>

    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
    }}>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '0',
      position: 'relative',
      zIndex: 1,
      padding: '40px',
    }}>
      {/* Left Sidebar */}
      <div style={{ paddingRight: '30px' }}>
        {/* Profile Photo */}
        <div style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '8px solid #2DBFB8',
          background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="30" r="16" fill="#7BA8C0" opacity="0.6" />
            <path
              d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
              fill="#7BA8C0"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Arial Black', sans-serif",
          fontSize: '28px',
          fontWeight: 900,
          color: '#FF6B4A',
          textAlign: 'center',
          marginBottom: '4px',
          textTransform: 'uppercase',
        }}>
          {data.personal.fullName.split(' ')[0]}
        </h1>
        <h2 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '16px',
          fontWeight: 400,
          color: '#666666',
          textAlign: 'center',
          marginBottom: '30px',
        }}>
          {data.personal.title || 'Frutigrafion'}
        </h2>

        {/* Diciplines Section */}
        <div style={{
          background: '#2DBFB8',
          color: 'white',
          padding: '8px 16px',
          marginLeft: '-10px',
          marginBottom: '20px',
          position: 'relative',
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>Disciplines</div>
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: 0,
            width: 0,
            height: 0,
            borderTop: '16px solid transparent',
            borderBottom: '16px solid transparent',
            borderLeft: '10px solid #2DBFB8',
          }} />
        </div>

        {/* Skills with Icons */}
        <div style={{ marginBottom: '30px' }}>
          {[
            { icon: '📱', title: 'Fooball Mould', desc: 'Neuromusculoskeletal Sporting Care Rehabilitation' },
            { icon: '🏢', title: 'Postile line', desc: 'Neuromusculoskeletal in Pediatri' },
            { icon: '⚙️', title: 'Posicionhobla', desc: 'Neuromusculoskeletal SPORTS' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#2DBFB8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '2px',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#666666',
                  lineHeight: 1.3,
                }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EDU Section */}
        <div style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#2DBFB8',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          EDU
        </div>

        {/* Education Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '30px',
        }}>
          {['🎓', '💼', '👶', '👣'].map((icon, i) => (
            <div key={i} style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#E8E8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}>
              {icon}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div style={{
          background: '#FF6B4A',
          color: 'white',
          padding: '8px 16px',
          marginLeft: '-10px',
          marginBottom: '20px',
          position: 'relative',
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}>Skills</div>
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: 0,
            width: 0,
            height: 0,
            borderTop: '16px solid transparent',
            borderBottom: '16px solid transparent',
            borderLeft: '10px solid #FF6B4A',
          }} />
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#2DBFB8',
            marginBottom: '8px',
          }}>
            Talen
          </div>
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
            Nederlandstalige<br />
            Engelstalige<br />
            Grootbritanië
          </div>
        </div>

        {/* Software */}
        <div>
          <div style={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#2DBFB8',
            marginBottom: '8px',
          }}>
            Sotware
          </div>
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
            Propegator graphic.cpp
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div style={{ paddingTop: '20px' }}>
        {/* Skills Progress Bars */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '30px',
          marginLeft: 'auto',
          width: '200px',
        }}>
          {[
            { label: 'WORK', value: 90, color: '#2DBFB8' },
            { label: 'Stress LIFE', value: 75, color: '#FFB84D' },
            { label: 'SLEEP', value: 60, color: '#FFA040' },
            { label: 'HEALTH', value: 85, color: '#FF6B4A' },
          ].map((skill, i) => (
            <div key={i}>
              <div style={{
                fontSize: '10px',
                color: '#666666',
                marginBottom: '4px',
                textTransform: 'uppercase',
              }}>
                {skill.label}
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#E8E8E8',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${skill.value}%`,
                  height: '100%',
                  background: skill.color,
                  borderRadius: '4px',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '30px' }}>
                {/* Company Icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#FF6B4A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}>
                    {exp.company.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FF6B4A',
                      marginBottom: '4px',
                    }}>
                      {exp.position}
                    </h3>
                    <div style={{
                      fontSize: '13px',
                      color: '#2DBFB8',
                      marginBottom: '8px',
                    }}>
                      {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                </div>

                {/* Description with checkmarks */}
                {exp.description && (
                  <div style={{
                    paddingLeft: '66px',
                  }}>
                    {exp.description.split('.').filter(s => s.trim()).map((point, j) => (
                      <div key={j} style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '8px',
                        fontSize: '12px',
                        color: '#666666',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: '#2DBFB8', flexShrink: 0 }}>✓</span>
                        <span>{point.trim()}.</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#2DBFB8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  flexShrink: 0,
                }}>
                  🎓
                </div>
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                  </h4>
                  <div style={{
                    fontSize: '13px',
                    color: '#2DBFB8',
                  }}>
                    {edu.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  </div>
)
