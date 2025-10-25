/**
 * YOUNGCURVE TEMPLATE
 * Academic CV with burgundy accents and photo
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const YoungCurve: React.FC<UniversalTemplateProps> = ({ data }) => {
  const accentColor = '#8B1538' // Burgundy/maroon

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '50px 60px',
      fontFamily: 'serif',
      backgroundColor: '#ffffff',
      color: '#000',
      minHeight: '1200px',
    }}>
      {/* Header with Name and Photo */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '35px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0', fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {data.personal.fullName}{data.personal.title && `, ${data.personal.title}`}
          </h1>
          
          {/* Contact Info */}
          <div style={{ fontSize: '9px', color: '#333', lineHeight: '1.6' }}>
            {data.personal.email && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontSize: '11px' }}>✉</span> {data.personal.email}
              </p>
            )}
            {data.personal.website && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontSize: '11px' }}>🌐</span> {data.personal.website}
              </p>
            )}
            {data.personal.linkedIn && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontWeight: 'bold' }}>in</span> {data.personal.linkedIn}
              </p>
            )}
            {data.personal.github && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontWeight: 'bold' }}>X</span> {data.personal.github}
              </p>
            )}
          </div>
        </div>

        {/* Photo */}
        {data.personal.photo && (
          <div style={{
            width: '100px',
            height: '120px',
            backgroundColor: '#b8dde8',
            padding: '8px',
            marginLeft: '30px',
          }}>
            <img src={data.personal.photo} alt={data.personal.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </header>

      {/* Employment History */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2.5px solid #000', paddingBottom: '6px', fontFamily: 'Georgia, "Times New Roman", serif' }}>Employment History</h2>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', minWidth: '95px' }}>
              <span style={{ 
                display: 'inline-block', 
                width: '7px', 
                height: '7px', 
                backgroundColor: accentColor,
                marginTop: '5px',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '9px', whiteSpace: 'nowrap', color: '#333' }}>{exp.startDate} – {exp.endDate}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.5' }}>
                <strong>{exp.position}</strong>, {exp.company}{exp.location && `, ${exp.location}`}.
              </p>
              {exp.description && (
                <p style={{ fontSize: '9px', margin: '3px 0 0 0', color: '#555', lineHeight: '1.4' }}>
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2.5px solid #000', paddingBottom: '6px', fontFamily: 'Georgia, "Times New Roman", serif' }}>Education</h2>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', minWidth: '95px' }}>
              <span style={{ 
                display: 'inline-block', 
                width: '7px', 
                height: '7px', 
                backgroundColor: accentColor,
                marginTop: '5px',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '9px', whiteSpace: 'nowrap', color: '#333' }}>{edu.startDate} – {edu.endDate}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.5' }}>
                <strong>{edu.degree}</strong>, {edu.institution} {edu.location}.
              </p>
              {edu.field && (
                <p style={{ fontSize: '9px', margin: '3px 0 0 0', color: '#555', fontStyle: 'italic', lineHeight: '1.4' }}>
                  Thesis title: <em>{edu.field}</em>
                </p>
              )}
              {edu.honors && edu.honors.length > 0 && (
                <p style={{ fontSize: '9px', margin: '3px 0 0 0', color: '#555', fontStyle: 'italic', lineHeight: '1.4' }}>
                  {edu.honors.join('. ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Research Publications */}
      {(data.publications && data.publications.length > 0) && (
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2.5px solid #000', paddingBottom: '6px', fontFamily: 'Georgia, "Times New Roman", serif' }}>Research Publications</h2>
          
          {/* Journal Articles */}
          <h3 style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '12px', marginTop: '18px' }}>Journal Articles</h3>
          {data.publications.slice(0, 9).map((pub, i) => (
            <div key={i} style={{ marginBottom: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: accentColor,
                color: '#fff',
                fontSize: '10px',
                fontWeight: 'bold',
                flexShrink: 0,
                marginTop: '2px',
              }}>{i + 1}</span>
              <p style={{ fontSize: '9px', margin: 0, lineHeight: '1.6', flex: 1, textAlign: 'justify' }}>
                "{pub.title}," <em>{pub.publisher}</em>, {pub.date}.
                {pub.url && (
                  <span style={{ marginLeft: '6px' }}>
                    <span style={{ color: accentColor }}>🔗</span> <span style={{ fontSize: '8px', color: '#666' }}>DOI: {pub.url}</span>
                  </span>
                )}
              </p>
            </div>
          ))}

          {/* Conference Proceedings */}
          {data.publications.length > 9 && (
            <>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '12px', marginTop: '22px' }}>Conference Proceedings</h3>
              {data.publications.slice(9).map((pub, i) => (
                <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: accentColor,
                    color: '#fff',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>{i + 1}</span>
                  <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.5', flex: 1 }}>
                    {pub.title}, in <em>{pub.publisher}</em>, {pub.date}.
                    {pub.url && (
                      <span style={{ marginLeft: '4px' }}>
                        <span style={{ color: accentColor }}>🔗</span> <span style={{ fontSize: '9px', color: '#666' }}>{pub.url}</span>
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </>
          )}
        </section>
      )}

      {/* Projects (if no publications) */}
      {(!data.publications || data.publications.length === 0) && data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: accentColor,
                color: '#fff',
                fontSize: '9px',
                fontWeight: 'bold',
                flexShrink: 0,
                marginTop: '1px',
              }}>{i + 1}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '10px', margin: 0, lineHeight: '1.5' }}>
                  <strong>{proj.name}</strong>: {proj.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2.5px solid #000', paddingBottom: '6px', fontFamily: 'Georgia, "Times New Roman", serif' }}>Awards & Honors</h2>
          {data.awards.map((award, i) => (
            <p key={i} style={{ fontSize: '9px', margin: '8px 0', lineHeight: '1.5' }}>
              • {award.title}, {award.issuer}, {award.date}.
            </p>
          ))}
        </section>
      )}
    </div>
  )
}
