/**
 * TEMPLATE 25: DARK PROFESSIONAL
 * Modern dark CV with geometric patterns and green accents
 * Features icon-based experience timeline and skill progress bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const DarkProfessionalTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '1200px',
    background: 'linear-gradient(135deg, #0a2e2e 0%, #1a3a3a 50%, #0f2626 100%)',
    fontFamily: "'Segoe UI', 'Arial', sans-serif",
    position: 'relative',
  }}>
    {/* Geometric Background Pattern */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      background: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(255,255,255,0.03) 35px,
        rgba(255,255,255,0.03) 70px
      )`,
      pointerEvents: 'none',
    }} />

    {/* Main Layout Container */}
    <div style={{
      display: 'flex',
      position: 'relative',
      minHeight: '1200px',
      maxWidth: '1400px',
      margin: '0 auto',
    }}>

    {/* Left Content Area */}
    <div style={{
      width: '55%',
      padding: '60px 50px',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Name and Title */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 300,
          color: '#ffffff',
          margin: '0 0 10px 0',
          letterSpacing: '1px',
        }}>
          {data.personal.fullName}
        </h1>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#a0a0a0',
          margin: '0 0 25px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {data.personal.title || 'Software Engineer'}
        </h2>
        <p style={{
          fontSize: '13px',
          lineHeight: '1.8',
          color: '#c0c0c0',
          margin: 0,
          maxWidth: '90%',
        }}>
          {data.summary || 'Professional summary goes here...'}
        </p>
      </div>

      {/* Work Experience Section */}
      <div style={{ marginBottom: '50px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0 0 30px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Work Experience
        </h3>

        {data.experience && data.experience.map((exp, i) => {
          const icons = ['💼', '⚙️', '🎯', '🔧', '📊', '🎨'];
          return (
            <div key={i} style={{
              marginBottom: '35px',
              paddingLeft: '70px',
              position: 'relative',
            }}>
              {/* Icon Circle */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                {icons[i % icons.length]}
              </div>

              {/* Connecting Line */}
              {i < (data.experience?.length || 0) - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '24px',
                  top: '50px',
                  width: '2px',
                  height: 'calc(100% + 10px)',
                  background: 'rgba(255, 255, 255, 0.1)',
                }} />
              )}

              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#ffffff',
                margin: '0 0 5px 0',
              }}>
                {exp.position}
              </h4>
              <p style={{
                fontSize: '12px',
                color: '#a0a0a0',
                margin: '0 0 12px 0',
              }}>
                {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <p style={{
                fontSize: '12px',
                lineHeight: '1.7',
                color: '#c0c0c0',
                margin: 0,
              }}>
                {exp.description || 'Became a Wordpress Developer at a small startup in Argentina. Any City and as a charge of building wordpress Theme'}
              </p>
            </div>
          );
        })}
      </div>
    </div>

    {/* Right Sidebar */}
    <div style={{
      width: '45%',
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '60px 40px',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Profile Photo */}
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #2a4a4a 0%, #1a3535 100%)',
        marginBottom: '40px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid rgba(255, 255, 255, 0.1)',
      }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="30" r="16" fill="#ffffff" opacity="0.3" />
          <path
            d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
            fill="#ffffff"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Education Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0 0 25px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Education
        </h3>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 5px 0',
            }}>
              {edu.degree}
            </h4>
            <p style={{
              fontSize: '12px',
              color: '#a0a0a0',
              margin: '0 0 3px 0',
            }}>
              {edu.institution}
            </p>
            <p style={{
              fontSize: '11px',
              color: '#808080',
              margin: 0,
            }}>
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0 0 25px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Skills
        </h3>
        {data.skills && data.skills.slice(0, 6).map((skill, i) => {
          const percentages = [90, 85, 80, 75, 70, 65];
          const percent = percentages[i] || 70;
          return (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}>
                <span style={{
                  fontSize: '13px',
                  color: '#ffffff',
                  fontWeight: 500,
                }}>
                  {skill}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
                  borderRadius: '4px',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Info Section */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0 0 25px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Contact Info
        </h3>
        {data.personal.phone && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(74, 222, 128, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '16px' }}>📞</span>
            </div>
            <span style={{
              fontSize: '12px',
              color: '#4ade80',
              fontWeight: 500,
            }}>
              {data.personal.phone}
            </span>
          </div>
        )}
        {data.personal.email && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(74, 222, 128, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '16px' }}>✉️</span>
            </div>
            <span style={{
              fontSize: '12px',
              color: '#4ade80',
              fontWeight: 500,
              wordBreak: 'break-all',
            }}>
              {data.personal.email}
            </span>
          </div>
        )}
        {data.personal.website && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(74, 222, 128, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '16px' }}>🌐</span>
            </div>
            <span style={{
              fontSize: '12px',
              color: '#4ade80',
              fontWeight: 500,
              wordBreak: 'break-all',
            }}>
              {data.personal.website}
            </span>
          </div>
        )}
      </div>
    </div>
    </div>
  </div>
)
