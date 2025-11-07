/**
 * TEMPLATE 22: BEIGE SIDEBAR
 * Based on CodePen by mavrK - Clean professional CV with beige sidebar
 * Features hexagonal logo, social links, and justified text
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const BeigeSidebarTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '90%',
    maxWidth: '1200px',
    margin: '80px auto',
    backgroundColor: 'white',
    boxShadow: '6px 10px 28px 0px rgba(0,0,0,0.4)',
    position: 'relative',
    fontFamily: "'Open Sans', sans-serif",
  }}>
    {/* Top Bar */}
    <div style={{
      height: '220px',
      backgroundColor: '#848484',
      color: 'white',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 'calc(350px + 5%)',
        right: '0',
        bottom: '0',
        height: '120px',
        textAlign: 'center',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '58px',
          letterSpacing: '8px',
          fontWeight: 100,
          lineHeight: '60px',
          textTransform: 'uppercase',
          width: '94%',
        }}>
          {data.personal.fullName}
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <div style={{
      position: 'absolute',
      top: '60px',
      left: '5%',
      width: '350px',
      backgroundColor: '#F7E0C1',
      padding: '320px 30px 50px',
      minHeight: 'calc(100% - 60px)',
    }}>
      {/* Mugshot/Logo */}
      <div style={{
        position: 'absolute',
        top: '50px',
        left: '70px',
        height: '210px',
        width: '210px',
      }}>
        <div style={{
          position: 'relative',
          margin: '-23px',
          height: '250px',
          width: '250px',
        }}>
          {/* Hexagonal Logo */}
          <svg viewBox="0 0 80 80" style={{
            height: '100%',
            width: '100%',
            stroke: 'black',
            strokeWidth: '2.5',
            fill: 'none',
          }}>
            <path d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z" />
          </svg>
          {/* Initials */}
          <p style={{
            position: 'absolute',
            top: '58%',
            left: '16%',
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '55px',
            fontWeight: 400,
            lineHeight: '60px',
            letterSpacing: '0px',
          }}>
            {data.personal.fullName.split(' ').map(n => n[0]).join('').toLowerCase()}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
        {data.personal.location || '123 My Place Drive'}
      </p>
      <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
        {data.personal.phone || '1-800-CALLPLZ'}
      </p>
      <p style={{ margin: '0 0 20px', fontSize: '16px', lineHeight: '24px' }}>
        {data.personal.email}
      </p>

      {/* Social Links */}
      {data.personal.linkedIn && (
        <p style={{
          position: 'relative',
          paddingLeft: '60px',
          marginBottom: '20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          <span style={{
            position: 'absolute',
            top: '-4px',
            left: '10px',
            height: '35px',
            width: '35px',
            display: 'inline-block',
          }}>
            🔗
          </span>
          LinkedIn
        </p>
      )}
      {data.personal.website && (
        <p style={{
          position: 'relative',
          paddingLeft: '60px',
          marginBottom: '20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          <span style={{
            position: 'absolute',
            top: '-4px',
            left: '10px',
            height: '35px',
            width: '35px',
            display: 'inline-block',
          }}>
            🌐
          </span>
          Website
        </p>
      )}

      {/* Expertise */}
      <p style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '18px',
        letterSpacing: '4px',
        fontWeight: 600,
        lineHeight: '28px',
        textTransform: 'uppercase',
        margin: '60px auto 10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #888',
      }}>
        Expertise
      </p>
      {data.skills && data.skills.slice(0, 6).map((skill, i) => (
        <p key={i} style={{
          paddingLeft: '25px',
          marginBottom: '10px',
          fontSize: '16px',
          lineHeight: '24px',
        }}>
          {skill}
        </p>
      ))}

      {/* Education */}
      <p style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '18px',
        letterSpacing: '4px',
        fontWeight: 600,
        lineHeight: '28px',
        textTransform: 'uppercase',
        margin: '60px auto 10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #888',
      }}>
        Education
      </p>
      {data.education && data.education.map((edu, i) => (
        <p key={i} style={{
          paddingLeft: '25px',
          marginBottom: '10px',
          fontSize: '16px',
          lineHeight: '24px',
        }}>
          {edu.degree}
        </p>
      ))}
    </div>

    {/* Main Content */}
    <div style={{
      marginRight: '0',
      width: 'calc(95% - 350px)',
      padding: '25px 40px 50px',
      marginLeft: 'auto',
    }}>
      {/* Title */}
      <h2 style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '30px',
        letterSpacing: '5px',
        fontWeight: 600,
        lineHeight: '40px',
        color: 'black',
        width: '80%',
        textAlign: 'center',
        margin: '0 auto 25px',
        textTransform: 'uppercase',
      }}>
        {data.personal.title || 'Jr Front-End Developer'}
      </h2>

      {/* Separator */}
      <div style={{
        width: '240px',
        height: '2px',
        backgroundColor: '#999',
        margin: '0 auto 25px',
      }} />

      {/* Profile Section */}
      <div style={{
        backgroundColor: '#DDD',
        width: '100%',
        maxWidth: '580px',
        textAlign: 'center',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '18px',
        letterSpacing: '6px',
        fontWeight: 600,
        lineHeight: '28px',
        textTransform: 'uppercase',
        margin: '0 auto 25px',
        padding: '8px 0',
      }}>
        Profile
      </div>

      <p style={{
        fontSize: '18px',
        lineHeight: '28px',
        fontWeight: 400,
        margin: '0 auto 50px',
        textAlign: 'justify',
      }}>
        {data.summary || 'Professional summary goes here...'}
      </p>

      {/* Experience Section */}
      <div style={{
        backgroundColor: '#DDD',
        width: '100%',
        maxWidth: '580px',
        textAlign: 'center',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '18px',
        letterSpacing: '6px',
        fontWeight: 600,
        lineHeight: '28px',
        textTransform: 'uppercase',
        margin: '0 auto 25px',
        padding: '8px 0',
      }}>
        Experience
      </div>

      {data.experience && data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '21px',
            letterSpacing: '1px',
            fontWeight: 600,
            lineHeight: '28px',
            color: 'black',
            margin: '0 auto 5px',
          }}>
            {exp.position}
          </h3>
          <p style={{
            color: '#777',
            fontSize: '18px',
            lineHeight: '28px',
            margin: '0 auto 10px',
          }}>
            {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
          </p>
          {exp.description && (
            <p style={{
              fontSize: '18px',
              lineHeight: '28px',
              fontWeight: 400,
              margin: '0 auto 25px',
              textAlign: 'justify',
            }}>
              {exp.description}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
)
