/**
 * CLASSIC TEMPLATE
 * Traditional right-aligned header with clean layout
 */

import React from 'react'
import type { UniversalTemplateProps} from './universal-schema'
import { HtmlRenderer } from '@/components/builder/html-renderer'

export const ClassicTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    padding: '40px 50px',
    fontFamily: 'Times New Roman, serif',
    backgroundColor: '#ffffff',
    color: '#000',
    minHeight: '1200px',
  }}>
    {/* Header - Right aligned contact */}
    <header style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '6px', lineHeight: '1.2' }}>{data.personal.fullName}</h1>
          {data.personal.title && <p style={{ fontSize: '16px', color: '#555', fontStyle: 'italic' }}>{data.personal.title}</p>}
        </div>
        <div style={{ textAlign: 'right', fontSize: '11px', lineHeight: '1.6', minWidth: '200px' }}>
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          {data.personal.location && <p>{data.personal.location}</p>}
          {data.personal.linkedIn && <p>{data.personal.linkedIn}</p>}
          {data.personal.website && <p>{data.personal.website}</p>}
        </div>
      </div>
    </header>

    {/* Summary */}
    {data.summary && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>PROFESSIONAL SUMMARY</h2>
        <HtmlRenderer html={data.summary} as="div" style={{ fontSize: '11px', lineHeight: '1.6', color: '#333', textAlign: 'justify' }} />
      </section>
    )}

    {/* Experience */}
    <section style={{ marginBottom: '25px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>EXPERIENCE</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }}>{exp.company}</h3>
              <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#333' }}>{exp.position}</p>
            </div>
            <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{exp.startDate} – {exp.endDate}</span>
          </div>
          {exp.location && <p style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>{exp.location}</p>}
          {exp.description && (
            <HtmlRenderer html={exp.description} as="div" style={{ fontSize: '11px', color: '#555', marginBottom: '6px', fontStyle: 'italic' }} />
          )}
          <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', marginTop: '6px', color: '#333' }}>
            {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '3px' }}>{ach}</li>)}
          </ul>
          {exp.technologies && exp.technologies.length > 0 && (
            <p style={{ fontSize: '10px', marginTop: '6px', color: '#666', fontStyle: 'italic' }}>
              <strong>Technologies:</strong> {exp.technologies.join(', ')}
            </p>
          )}
        </div>
      ))}
    </section>

    {/* Education */}
    <section style={{ marginBottom: '25px' }}>
      <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>EDUCATION</h2>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
              {edu.degree}{edu.field && ` in ${edu.field}`}
            </h3>
            <p style={{ fontSize: '11px', color: '#333' }}>{edu.institution}{edu.location && ` • ${edu.location}`}</p>
            {edu.gpa && <p style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>GPA: {edu.gpa}</p>}
            {edu.honors && edu.honors.length > 0 && (
              <p style={{ fontSize: '10px', color: '#666', marginTop: '2px', fontStyle: 'italic' }}>{edu.honors.join(', ')}</p>
            )}
          </div>
          <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{edu.endDate}</span>
        </div>
      ))}
    </section>

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>PROJECTS</h2>
        {data.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>{proj.name}</h3>
            {proj.role && <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#666', marginBottom: '4px' }}>{proj.role}</p>}
            <p style={{ fontSize: '11px', color: '#333', lineHeight: '1.5', marginBottom: '6px' }}>{proj.description}</p>
            {proj.highlights && proj.highlights.length > 0 && (
              <ul style={{ fontSize: '10px', lineHeight: '1.5', paddingLeft: '18px', color: '#555' }}>
                {proj.highlights.map((hl, j) => <li key={j}>{hl}</li>)}
              </ul>
            )}
            {proj.technologies && proj.technologies.length > 0 && (
              <p style={{ fontSize: '10px', marginTop: '4px', color: '#666', fontStyle: 'italic' }}>
                {proj.technologies.join(', ')}
              </p>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Skills */}
    {data.skillCategories ? (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>SKILLS</h2>
        {data.skillCategories.map((cat, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <span style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px' }}>{cat.category}:</span>
            <span style={{ marginLeft: '8px', color: '#333' }}>{cat.skills.map(s => s.name).join(', ')}</span>
          </div>
        ))}
      </section>
    ) : data.skills && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>SKILLS</h2>
        <div style={{ fontSize: '11px', display: 'flex', flexWrap: 'wrap', gap: '15px', color: '#333' }}>
          {data.skills.map((skill, i) => (
            <span key={i}>{skill}{i < data.skills!.length - 1 ? ' •' : ''}</span>
          ))}
        </div>
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>CERTIFICATIONS</h2>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <span style={{ fontWeight: '600' }}>{cert.name}</span>
            <span style={{ color: '#666', marginLeft: '8px' }}>– {cert.issuer} ({cert.date})</span>
          </div>
        ))}
      </section>
    )}

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>LANGUAGES</h2>
        <div style={{ fontSize: '11px', color: '#333' }}>
          {data.languages.map((lang, i) => (
            <span key={i} style={{ marginRight: '15px' }}>
              {lang.name} ({lang.proficiency}){i < data.languages!.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </section>
    )}

    {/* Awards */}
    {data.awards && data.awards.length > 0 && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>AWARDS & ACHIEVEMENTS</h2>
        {data.awards.map((award, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <span style={{ fontWeight: '600' }}>{award.title}</span>
            <span style={{ color: '#666', marginLeft: '8px' }}>– {award.issuer} ({award.date})</span>
            {award.description && <p style={{ fontSize: '10px', color: '#555', marginTop: '2px', marginLeft: '0' }}>{award.description}</p>}
          </div>
        ))}
      </section>
    )}

    {/* Publications */}
    {data.publications && data.publications.length > 0 && (
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>PUBLICATIONS</h2>
        {data.publications.map((pub, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <p style={{ fontWeight: '600' }}>{pub.title}</p>
            <p style={{ fontSize: '10px', color: '#666' }}>{pub.publisher} • {pub.date}</p>
          </div>
        ))}
      </section>
    )}

    {/* Interests */}
    {data.interests && data.interests.length > 0 && (
      <section>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>INTERESTS</h2>
        <div style={{ fontSize: '11px', color: '#333' }}>
          {data.interests.map((interest, i) => (
            <span key={i} style={{ marginRight: '12px' }}>
              {interest.name}{i < data.interests!.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </section>
    )}
  </div>
)
