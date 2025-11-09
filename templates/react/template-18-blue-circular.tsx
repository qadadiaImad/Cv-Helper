/**
 * TEMPLATE 29: BLUE CIRCULAR
 * Modern French CV with dark blue sidebar, circular profile photo, and timeline layout
 * Features progress bars for languages and clean bullet points
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const BlueCircularTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    display: 'flex',
    fontFamily: "'Arial', 'Helvetica', sans-serif",
  }}>
    {/* Left Dark Blue Sidebar */}
    <div style={{
      width: '28%',
      background: '#1e3d5c',
      padding: '0',
      position: 'relative',
    }}>
      {/* Circular Profile Photo with Curved Background */}
      <div style={{
        position: 'relative',
        height: '220px',
        background: '#1e3d5c',
        marginBottom: '40px',
      }}>
        {/* Curved white section */}
        <div style={{
          position: 'absolute',
          bottom: '-1px',
          right: '-1px',
          width: '100%',
          height: '120px',
          background: '#d0d4d8',
          borderTopLeftRadius: '100%',
        }} />
        
        {/* Circular Photo */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '5px solid #ffffff',
          background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
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
      </div>

      {/* Coordonnées Section */}
      <div style={{ padding: '0 25px 30px' }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 15px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          COORDONNÉES
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.personal.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>📞</span>
              <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                {data.personal.phone}
              </span>
            </div>
          )}
          {data.personal.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>✉️</span>
              <span style={{ fontSize: '10px', color: '#d0d8e0', wordBreak: 'break-all' }}>
                {data.personal.email}
              </span>
            </div>
          )}
          {data.personal.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px' }}>📍</span>
              <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                {data.personal.location}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Langues Section */}
      {data.languages && data.languages.length > 0 && (
        <div style={{ padding: '0 25px 30px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 15px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            LANGUES
          </h3>
          {data.languages.map((lang, i) => {
            const levels = [100, 80, 60];
            const level = levels[i] || 50;
            return (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  marginBottom: '6px',
                }}>
                  {typeof lang === 'string' ? lang : lang.name}
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${level}%`,
                    height: '100%',
                    background: '#ffffff',
                    borderRadius: '3px',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compétences Section */}
      <div style={{ padding: '0 25px 30px' }}>
        <h3 style={{
          fontSize: '13px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 15px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          COMPÉTENCES
        </h3>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}>
          {data.skills && data.skills.map((skill, i) => (
            <li key={i} style={{
              fontSize: '10px',
              color: '#d0d8e0',
              marginBottom: '8px',
              paddingLeft: '12px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: '0',
                top: '5px',
                width: '4px',
                height: '4px',
                background: '#ffffff',
                borderRadius: '50%',
              }} />
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Centres d'Intérêt Section */}
      {data.interests && data.interests.length > 0 && (
        <div style={{ padding: '0 25px 30px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 15px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            CENTRES D'INTÉRÊT
          </h3>
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.interests.map((interest, i) => (
              <li key={i} style={{
                fontSize: '10px',
                color: '#d0d8e0',
                marginBottom: '8px',
              }}>
                {typeof interest === 'string' ? interest : interest.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Right Content Area */}
    <div style={{
      width: '72%',
      padding: '40px 40px',
      background: '#d0d4d8',
    }}>
      {/* Name and Title */}
      <div style={{ marginBottom: '35px' }}>
        <h1 style={{
          fontSize: '38px',
          fontWeight: 700,
          color: '#1e3d5c',
          margin: '0 0 5px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          {data.personal.fullName}
        </h1>
        <h2 style={{
          fontSize: '13px',
          fontWeight: 400,
          color: '#4a4a4a',
          margin: '0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          {data.personal.title || 'Chargée de Projet'}
        </h2>
      </div>

      {/* Formation Section */}
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#1e3d5c',
          margin: '0 0 20px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          FORMATION
        </h3>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ 
            marginBottom: '20px', 
            paddingLeft: '20px', 
            position: 'relative',
            borderLeft: '2px solid #1e3d5c',
          }}>
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '5px',
              width: '10px',
              height: '10px',
              background: '#1e3d5c',
              borderRadius: '50%',
            }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <h4 style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#1e3d5c',
                margin: 0,
              }}>
                {edu.degree}
              </h4>
              <span style={{
                fontSize: '10px',
                color: '#808080',
              }}>
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
            <p style={{
              fontSize: '10px',
              color: '#4a4a4a',
              margin: 0,
            }}>
              {edu.institution}
            </p>
          </div>
        ))}
      </div>

      {/* Expérience Professionnelle Section */}
      <div>
        <h3 style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#1e3d5c',
          margin: '0 0 20px 0',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          EXPÉRIENCE PROFESSIONNELLE
        </h3>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ 
            marginBottom: '25px', 
            paddingLeft: '20px', 
            position: 'relative',
            borderLeft: '2px solid #1e3d5c',
          }}>
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '5px',
              width: '10px',
              height: '10px',
              background: '#1e3d5c',
              borderRadius: '50%',
            }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <h4 style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#1e3d5c',
                margin: 0,
              }}>
                {exp.position}
              </h4>
              <span style={{
                fontSize: '10px',
                color: '#808080',
              }}>
                {exp.startDate} - {exp.endDate || 'Présent'}
              </span>
            </div>
            <p style={{
              fontSize: '10px',
              color: '#4a4a4a',
              margin: '0 0 8px 0',
              fontStyle: 'italic',
            }}>
              {exp.company}
            </p>
            {exp.achievements && exp.achievements.length > 0 && (
              <ul style={{
                margin: 0,
                paddingLeft: '15px',
                listStyle: 'disc',
              }}>
                {exp.achievements.map((achievement, j) => (
                  <li key={j} style={{
                    fontSize: '10px',
                    lineHeight: '1.6',
                    color: '#4a4a4a',
                    marginBottom: '4px',
                  }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
            {!exp.achievements && exp.description && (
              <p style={{
                fontSize: '10px',
                lineHeight: '1.6',
                color: '#4a4a4a',
                margin: 0,
              }}>
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)
