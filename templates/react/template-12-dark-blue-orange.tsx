/**
 * TEMPLATE 23: DARK BLUE ORANGE
 * Professional CV with dark blue background and orange accents
 * Features skill bars, circular progress indicators, and social links
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const DarkBlueOrangeTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '960px',
    background: '#1a237e',
    color: '#ffffff',
    margin: '20px auto',
    boxShadow: '10px 10px #0e1442',
    position: 'relative',
    display: 'flex',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '16px',
  }}>
    {/* Left Sidebar (Base) */}
    <div style={{
      width: '30%',
      padding: '30px 15px',
      background: '#283593',
      color: '#ffffff',
    }}>
      {/* Profile Section */}
      <div style={{
        background: '#ffb300',
        padding: '30px 15px 40px 15px',
        margin: '-30px -15px 45px -15px',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Skewed bottom decoration */}
        <div style={{
          content: '""',
          position: 'absolute',
          background: '#303f9f',
          width: '100%',
          height: '30px',
          bottom: '-15px',
          left: '0',
          transform: 'skewY(-5deg)',
          zIndex: -1,
        }} />

        {/* Photo/Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '100px',
          color: '#283593',
          marginBottom: '10px',
        }}>
          🚀
        </div>

        {/* Name and Title */}
        <div style={{ textAlign: 'center', color: '#ffffff' }}>
          <h1 style={{
            marginTop: '10px',
            marginBottom: '0',
            fontSize: '1.75em',
            textTransform: 'lowercase',
            color: '#1a237e',
            fontWeight: 600,
          }}>
            {data.personal.fullName}
          </h1>
          <h2 style={{
            marginTop: '10px',
            marginBottom: '0',
            fontSize: '1.5em',
            textTransform: 'lowercase',
            color: '#283593',
            fontWeight: 400,
          }}>
            {data.personal.title || 'Frontend Web Designer'}
          </h2>
        </div>
      </div>

      {/* About Me */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
        }}>
          About Me
        </h3>
        <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
          {data.summary || "Professional summary goes here..."}
        </p>
      </div>

      {/* Contact Me */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
        }}>
          Contact Me
        </h3>
        {data.personal.phone && (
          <div style={{
            lineHeight: '24px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>📞</span>
            <span>{data.personal.phone}</span>
          </div>
        )}
        {data.personal.location && (
          <div style={{
            lineHeight: '24px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>📍</span>
            <span>{data.personal.location}</span>
          </div>
        )}
        {data.personal.email && (
          <div style={{
            lineHeight: '24px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>✉️</span>
            <span>{data.personal.email}</span>
          </div>
        )}
        {data.personal.website && (
          <div style={{
            lineHeight: '24px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>🏠</span>
            <span>{data.personal.website}</span>
          </div>
        )}
      </div>

      {/* Follow Me */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
        }}>
          Follow Me
        </h3>
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
        }}>
          {['🔗', '📷', '📌', '💼', '💻', '🎨'].map((icon, i) => (
            <div key={i} style={{
              display: 'inline-flex',
              fontSize: '20px',
              background: '#ffb300',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#283593',
              cursor: 'pointer',
            }}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right Content (Func) */}
    <div style={{
      width: '70%',
      padding: '30px',
    }}>
      {/* Experience */}
      <div style={{
        background: '#283593',
        padding: '15px',
        marginBottom: '15px',
      }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            color: '#283593',
            background: '#ffb300',
            width: '42px',
            height: '42px',
            fontSize: '20px',
            lineHeight: '42px',
            borderRadius: '50%',
            textAlign: 'center',
            marginRight: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            💼
          </span>
          Experience
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data.experience && data.experience.map((exp, i) => (
            <li key={i} style={{
              position: 'relative',
              marginLeft: '15px',
              paddingLeft: '25px',
              paddingBottom: '15px',
              borderLeft: '3px solid #ffffff',
            }}>
              <div style={{
                position: 'absolute',
                width: '7px',
                height: '7px',
                border: '3px solid #ffffff',
                background: '#ffb300',
                borderRadius: '50%',
                left: '-8px',
                top: '5px',
              }} />
              <span style={{
                display: 'block',
                fontWeight: 600,
                fontSize: '16px',
                marginBottom: '4px',
              }}>
                {exp.position}
              </span>
              <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                {exp.company}
              </small>
              <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                {exp.startDate} - {exp.endDate || 'Now'}
              </small>
            </li>
          ))}
        </ul>
      </div>

      {/* Education */}
      <div style={{
        background: '#283593',
        padding: '15px',
        marginBottom: '15px',
      }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            color: '#283593',
            background: '#ffb300',
            width: '42px',
            height: '42px',
            fontSize: '20px',
            lineHeight: '42px',
            borderRadius: '50%',
            textAlign: 'center',
            marginRight: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            🎓
          </span>
          Education
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data.education && data.education.map((edu, i) => (
            <li key={i} style={{
              position: 'relative',
              marginLeft: '15px',
              paddingLeft: '25px',
              paddingBottom: '15px',
              borderLeft: '3px solid #ffffff',
            }}>
              <div style={{
                position: 'absolute',
                width: '7px',
                height: '7px',
                border: '3px solid #ffffff',
                background: '#ffb300',
                borderRadius: '50%',
                left: '-8px',
                top: '5px',
              }} />
              <span style={{
                display: 'block',
                fontWeight: 600,
                fontSize: '16px',
                marginBottom: '4px',
              }}>
                {edu.degree}
              </span>
              <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                {edu.institution}
              </small>
              <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                {edu.startDate} - {edu.endDate}
              </small>
            </li>
          ))}
        </ul>
      </div>

      {/* Programming Skills */}
      <div style={{
        background: '#283593',
        padding: '15px',
        marginBottom: '15px',
      }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            color: '#283593',
            background: '#ffb300',
            width: '42px',
            height: '42px',
            fontSize: '20px',
            lineHeight: '42px',
            borderRadius: '50%',
            textAlign: 'center',
            marginRight: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            💻
          </span>
          Programming Skills
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 15px' }}>
          {data.skills && data.skills.slice(0, 7).map((skill, i) => {
            const percent = [95, 90, 60, 50, 40, 55, 40][i] || 70;
            return (
              <li key={i} style={{
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{
                  display: 'block',
                  width: '120px',
                  fontSize: '14px',
                }}>
                  {skill}
                </span>
                <div style={{
                  background: '#ffffff',
                  height: '2px',
                  width: 'calc(100% - 120px)',
                  position: 'relative',
                  borderRadius: '2px',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-1px',
                    height: '4px',
                    background: '#ffb300',
                    boxShadow: '0 0 0 #ffb300',
                    borderRadius: '5px',
                    width: `${percent}%`,
                  }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Interests */}
      <div style={{
        background: '#283593',
        padding: '15px',
      }}>
        <h3 style={{
          color: '#ffb300',
          margin: '10px 0',
          textTransform: 'lowercase',
          fontSize: '1.25em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{
            color: '#283593',
            background: '#ffb300',
            width: '42px',
            height: '42px',
            fontSize: '20px',
            lineHeight: '42px',
            borderRadius: '50%',
            textAlign: 'center',
            marginRight: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            ⭐
          </span>
          Interests
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          {data.interests && data.interests.slice(0, 5).map((interest, i) => {
            const icons = ['🎨', '📚', '🎬', '🎧', '🎮'];
            return (
              <div key={i} style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
              }}>
                <div style={{
                  fontSize: '45px',
                  color: '#ffb300',
                  marginBottom: '8px',
                }}>
                  {icons[i]}
                </div>
                <span style={{
                  display: 'block',
                  fontSize: '14px',
                  textAlign: 'center',
                }}>
                  {typeof interest === 'string' ? interest : interest.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
)
