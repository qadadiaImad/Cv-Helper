/**
 * ACADEMIC CV TEMPLATE
 * Single-column traditional academic layout with serif font
 * Based on LaTeX academic template - optimized for A4 PDF
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const AcademicCV: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'Times New Roman', Georgia, serif",
    overflow: 'hidden',
    position: 'relative',
    padding: '40px 60px',
  }}>
    {/* Header */}
    <header style={{
      textAlign: 'center',
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '2px solid #333',
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
        letterSpacing: '1px',
      }}>{data.personal.fullName}</h1>
      <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
        {data.personal.location && <span>{data.personal.location} • </span>}
        {data.personal.phone && <span>Phone: {data.personal.phone} • </span>}
        {data.personal.email && <span>Email: {data.personal.email}</span>}
        {data.personal.website && (
          <div style={{ marginTop: '4px' }}>
            {data.personal.linkedIn && <span>LinkedIn: {data.personal.linkedIn} • </span>}
            {data.personal.website && <span>Website: {data.personal.website}</span>}
          </div>
        )}
      </div>
    </header>

    {/* Education */}
    <section style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        marginBottom: '10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #333',
        letterSpacing: '1px',
      }}>Education</h2>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
              {edu.degree}{edu.field && ` in ${edu.field}`}
            </div>
            <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
              {edu.startDate} – {edu.endDate}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#333', marginBottom: '3px' }}>
            {edu.institution}, {edu.location}
          </div>
          {(edu.gpa || edu.honors || edu.coursework) && (
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', marginLeft: '15px' }}>
              {edu.gpa && <div>• GPA: {edu.gpa}</div>}
              {edu.honors && edu.honors.length > 0 && <div>• Honors: {edu.honors.join(', ')}</div>}
              {edu.coursework && edu.coursework.length > 0 && <div>• Relevant Coursework: {edu.coursework.join(', ')}</div>}
            </div>
          )}
        </div>
      ))}
    </section>

    {/* Experience */}
    <section style={{ marginBottom: '20px' }}>
      <h2 style={{
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        marginBottom: '10px',
        paddingBottom: '5px',
        borderBottom: '1px solid #333',
        letterSpacing: '1px',
      }}>Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{exp.position}</div>
            <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
              {exp.startDate} – {exp.endDate}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#333', marginBottom: '5px' }}>
            {exp.company}{exp.location && `, ${exp.location}`}
          </div>
          <ul style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', paddingLeft: '20px', margin: '5px 0' }}>
            {exp.achievements.map((ach, j) => (
              <li key={j} style={{ marginBottom: '3px' }}>{ach}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    {/* Skills */}
    {(data.skillCategories || data.skills) && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Skills</h2>
        {data.skillCategories ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {data.skillCategories.map((cat, i) => (
              <div key={i} style={{ flex: '1', minWidth: '200px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                  {cat.category}:
                </div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
                  {cat.skills.map(s => s.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
            <strong>Technical Skills:</strong> {data.skills?.join(', ')}
          </div>
        )}
      </section>
    )}

    {/* Publications */}
    {data.publications && data.publications.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Publications</h2>
        {data.publications.map((pub, i) => (
          <div key={i} style={{
            marginBottom: '10px',
            fontSize: '10px',
            color: '#333',
            lineHeight: '1.5',
            paddingLeft: '15px',
            textIndent: '-15px',
          }}>
            [{i + 1}] <strong>{pub.title}</strong> {pub.publisher}, {pub.date}.
            {pub.description && <span> {pub.description}</span>}
          </div>
        ))}
      </section>
    )}

    {/* Awards & Honors */}
    {data.awards && data.awards.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Awards & Honors</h2>
        {data.awards.map((award, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>{award.title}</div>
              <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>{award.date}</div>
            </div>
            {award.description && (
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginLeft: '15px' }}>
                {award.description}
              </div>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Certifications</h2>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
            <strong>{cert.name}</strong> - {cert.issuer}, {cert.date}
            {cert.credentialId && <span> (ID: {cert.credentialId})</span>}
          </div>
        ))}
      </section>
    )}

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Languages</h2>
        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
          {data.languages.map((lang, i) => (
            <span key={i}>
              {lang.name} ({lang.proficiency}){i < data.languages!.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      </section>
    )}

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
              {proj.name}
              {proj.role && <span style={{ fontWeight: 'normal', fontStyle: 'italic' }}> - {proj.role}</span>}
            </div>
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '3px' }}>
              {proj.description}
            </div>
            {proj.technologies && proj.technologies.length > 0 && (
              <div style={{ fontSize: '9px', color: '#999' }}>
                Technologies: {proj.technologies.join(', ')}
              </div>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Volunteer */}
    {data.volunteer && data.volunteer.length > 0 && (
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#333',
          textTransform: 'uppercase',
          marginBottom: '10px',
          paddingBottom: '5px',
          borderBottom: '1px solid #333',
          letterSpacing: '1px',
        }}>Volunteer Experience</h2>
        {data.volunteer.map((vol, i) => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>{vol.role}</div>
              <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
                {vol.startDate} – {vol.endDate}
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#333', marginBottom: '3px' }}>{vol.organization}</div>
            {vol.description && (
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginLeft: '15px' }}>
                {vol.description}
              </div>
            )}
          </div>
        ))}
      </section>
    )}
  </div>
)
