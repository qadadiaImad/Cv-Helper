/**
 * TEMPLATE 30 - ACADEMIC BURGUNDY
 * Clean academic CV with burgundy accents and numbered publications
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const AcademicBurgundyTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Times New Roman', serif",
      padding: '40px 50px',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #ddd',
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '12px',
            color: '#000',
          }}>
            {data.personal?.fullName || 'Your Name Here, Ph.D.'}
          </h1>
          
          {/* Contact Info */}
          <div style={{ fontSize: '9px', color: '#333', lineHeight: '1.8' }}>
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#8b1538' }}>✉</span>
                <span>{data.personal.email}</span>
              </div>
            )}
            {data.personal?.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#8b1538' }}>🔗</span>
                <span>{data.personal.website}</span>
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#8b1538' }}>in</span>
                <span>{data.personal.linkedIn}</span>
              </div>
            )}
          </div>
        </div>

        {/* Photo */}
        {data.personal?.photo?.url && (
          <div style={{
            width: '80px',
            height: '100px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            marginLeft: '20px',
            flexShrink: 0,
          }}>
            <img
              src={data.personal.photo.url}
              alt={data.personal?.fullName || 'Profile'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </header>

      {/* Employment History */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '12px',
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
          }}>Employment History</h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '15px' }}>
              <div style={{
                fontSize: '9px',
                color: '#666',
                minWidth: '80px',
                flexShrink: 0,
              }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{
                    color: '#8b1538',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>▪</span>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span style={{ fontSize: '10px', color: '#333' }}>
                        , {exp.company}.
                      </span>
                    )}
                    {exp.description && (
                      <div style={{ fontSize: '9px', color: '#666', marginTop: '3px', fontStyle: 'italic' }}>
                        {exp.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '12px',
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
          }}>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '15px' }}>
              <div style={{
                fontSize: '9px',
                color: '#666',
                minWidth: '80px',
                flexShrink: 0,
              }}>
                {edu.startDate} – {edu.endDate}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{
                    color: '#8b1538',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>▪</span>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#000' }}>
                      {edu.degree}
                    </span>
                    {edu.institution && (
                      <span style={{ fontSize: '10px', color: '#333' }}>
                        , {edu.institution}
                      </span>
                    )}
                    {edu.field && (
                      <span style={{ fontSize: '10px', color: '#333' }}>
                        {' '}in {edu.field}.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Research Publications */}
      {data.publications && data.publications.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '12px',
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
          }}>Research Publications</h2>

          {data.publications.map((pub, i) => (
            <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#8b1538',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '9px',
                fontWeight: 'bold',
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: '9px',
                  lineHeight: '1.6',
                  margin: 0,
                  color: '#333',
                }}>
                  <span style={{ fontStyle: 'italic' }}>"{pub.title}"</span>
                  {pub.publisher && <span>, {pub.publisher}</span>}
                  {pub.date && <span>, {pub.date}</span>}
                  {pub.description && (
                    <span style={{ display: 'block', marginTop: '3px', color: '#666' }}>
                      {pub.description}
                    </span>
                  )}
                  {pub.url && (
                    <span style={{ color: '#8b1538', display: 'block', marginTop: '2px' }}>
                      🔗 URL: {pub.url}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Awards & Honors */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '12px',
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
          }}>Awards & Honors</h2>
          {data.awards.map((award, i) => (
            <div key={i} style={{ marginBottom: '10px', display: 'flex', gap: '15px' }}>
              <div style={{
                fontSize: '9px',
                color: '#666',
                minWidth: '80px',
                flexShrink: 0,
              }}>
                {award.date}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{
                    color: '#8b1538',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>▪</span>
                  <div style={{ fontSize: '10px', color: '#333' }}>
                    <span style={{ fontWeight: 'bold' }}>{award.title}</span>
                    {award.issuer && <span>, {award.issuer}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills/Research Interests */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
            marginBottom: '12px',
            borderBottom: '2px solid #000',
            paddingBottom: '3px',
          }}>Research Interests</h2>
          <div style={{ fontSize: '10px', color: '#333', lineHeight: '1.8' }}>
            {data.skills.join(', ')}
          </div>
        </section>
      )}
    </div>
  )
}
