/**
 * TEMPLATE 27: TEAL ROUNDED
 * Modern CV with dark teal background, circular profile photo, and rounded white sections
 * Features skill progress bars and clean card-based layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const TealRoundedTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    minHeight: '1200px',
    background: 'linear-gradient(135deg, #0a4d4d 0%, #0d5858 50%, #0a4040 100%)',
    fontFamily: "'Arial', 'Helvetica', sans-serif",
  }}>
    {/* Content Container */}
    <div style={{
      maxWidth: '850px',
      margin: '0 auto',
      padding: '40px',
      position: 'relative',
    }}>
    {/* Header Section with Photo and Name */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      gap: '30px',
    }}>
      {/* Profile Photo - Circular */}
      <div style={{
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '5px solid rgba(255, 255, 255, 0.2)',
        flexShrink: 0,
        background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="25" r="12" fill="#999999" opacity="0.5" />
          <path
            d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
            fill="#999999"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Name and Title */}
      <div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 8px 0',
          letterSpacing: '0.5px',
        }}>
          {data.personal.fullName}
        </h1>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#b0d4d4',
          margin: '0',
          letterSpacing: '0.5px',
        }}>
          {data.personal.title || 'Graphic Designer'}
        </h2>
      </div>
    </div>

    {/* Profile Summary - Rounded White Box */}
    {data.summary && (
      <div style={{
        background: '#ffffff',
        borderRadius: '15px',
        padding: '25px 30px',
        marginBottom: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      }}>
        <p style={{
          fontSize: '12px',
          lineHeight: '1.8',
          color: '#2d2d2d',
          margin: 0,
        }}>
          {data.summary}
        </p>
      </div>
    )}

    {/* Two Column Layout */}
    <div style={{
      display: 'flex',
      gap: '25px',
    }}>
      {/* Left Column */}
      <div style={{
        width: '35%',
      }}>
        {/* Contact Section */}
        <div style={{
          background: '#0a3838',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '25px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '0.5px',
          }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.personal.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '12px' }}>📞</span>
                </div>
                <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                  {data.personal.phone}
                </span>
              </div>
            )}
            {data.personal.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '12px' }}>✉️</span>
                </div>
                <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                  {data.personal.email}
                </span>
              </div>
            )}
            {data.personal.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '12px' }}>🌐</span>
                </div>
                <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                  {data.personal.website}
                </span>
              </div>
            )}
            {data.personal.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '12px' }}>📍</span>
                </div>
                <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                  {data.personal.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        <div style={{
          background: '#0a3838',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '25px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '0.5px',
          }}>
            Education
          </h3>
          {data.education && data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: i < data.education!.length - 1 ? '20px' : '0' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#ffffff',
                margin: '0 0 5px 0',
              }}>
                {edu.institution}
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#b0d4d4',
                margin: '0 0 3px 0',
              }}>
                {edu.degree}
              </p>
              <p style={{
                fontSize: '10px',
                color: '#80a8a8',
                margin: 0,
              }}>
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>

        {/* Award Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div style={{
            background: '#0a3838',
            borderRadius: '15px',
            padding: '25px',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px',
            }}>
              Award
            </h3>
            {data.certifications.slice(0, 1).map((cert, i) => (
              <div key={i}>
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 5px 0',
                }}>
                  {cert.name}
                </h4>
                <p style={{
                  fontSize: '11px',
                  color: '#b0d4d4',
                  margin: 0,
                }}>
                  {cert.issuer} | {cert.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div style={{
        width: '65%',
      }}>
        {/* Work Experience Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '15px',
          padding: '25px 30px',
          marginBottom: '25px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#0a4d4d',
            margin: '0 0 20px 0',
            letterSpacing: '0.5px',
          }}>
            Work Experience
          </h3>
          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: i < data.experience!.length - 1 ? '25px' : '0' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#0a4d4d',
                margin: '0 0 5px 0',
              }}>
                {exp.company} ({exp.startDate} - {exp.endDate || 'Present'})
              </h4>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#2d2d2d',
                margin: '0 0 10px 0',
              }}>
                {exp.position}
              </p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{
                  margin: 0,
                  paddingLeft: '18px',
                  listStyle: 'disc',
                }}>
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} style={{
                      fontSize: '11px',
                      lineHeight: '1.7',
                      color: '#4a4a4a',
                      marginBottom: '5px',
                    }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
              {!exp.achievements && exp.description && (
                <p style={{
                  fontSize: '11px',
                  lineHeight: '1.7',
                  color: '#4a4a4a',
                  margin: 0,
                }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '15px',
          padding: '25px 30px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#0a4d4d',
            margin: '0 0 20px 0',
            letterSpacing: '0.5px',
          }}>
            Skills
          </h3>
          {data.skills && data.skills.slice(0, 5).map((skill, i) => {
            const percentages = [90, 85, 80, 75, 70];
            const percent = percentages[i] || 70;
            return (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#2d2d2d',
                    fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e8e8e8',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${percent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #0d5858 0%, #0a4d4d 100%)',
                    borderRadius: '4px',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  </div>
)
