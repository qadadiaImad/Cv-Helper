/**
 * HARVARD TEMPLATE
 * Minimal clean academic design - Education first
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { HtmlRenderer } from '@/components/builder/html-renderer'

export const Harvard: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '50px 40px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000',
    minHeight: '1200px',
  }}>
    {/* Header - Simple centered */}
    <header style={{ marginBottom: '35px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '15px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'normal', marginBottom: '10px', letterSpacing: '0.5px' }}>{data.personal.fullName}</h1>
      <div style={{ fontSize: '11px', color: '#666', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span>{data.personal.email}</span>
        <span>|</span>
        <span>{data.personal.phone}</span>
        {data.personal.location && (
          <>
            <span>|</span>
            <span>{data.personal.location}</span>
          </>
        )}
        {data.personal.linkedIn && (
          <>
            <span>|</span>
            <span>{data.personal.linkedIn}</span>
          </>
        )}
      </div>
    </header>

    {/* Education first (Harvard/Academic style) */}
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Education</h2>
      {data.education.map((edu, i) => (
        <div key={i} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>{edu.institution}</h3>
            <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{edu.startDate} – {edu.endDate}</span>
          </div>
          <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '2px' }}>
            {edu.degree}{edu.field && ` in ${edu.field}`}
          </p>
          {edu.location && <p style={{ fontSize: '10px', color: '#666' }}>{edu.location}</p>}
          {edu.gpa && <p style={{ fontSize: '10px', marginTop: '2px', color: '#666' }}>GPA: {edu.gpa}</p>}
          {edu.honors && edu.honors.length > 0 && (
            <p style={{ fontSize: '10px', marginTop: '2px', color: '#666' }}>• {edu.honors.join(' • ')}</p>
          )}
          {edu.coursework && edu.coursework.length > 0 && (
            <p style={{ fontSize: '10px', marginTop: '4px', color: '#666' }}>
              <em>Relevant Coursework:</em> {edu.coursework.join(', ')}
            </p>
          )}
        </div>
      ))}
    </section>

    {/* Technical Skills (categorized for academic/tech resumes) */}
    {data.skillCategories && data.skillCategories.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Technical Skills</h2>
        {data.skillCategories.map((cat, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px', display: 'flex' }}>
            <span style={{ fontWeight: '600', minWidth: '120px', flexShrink: 0 }}>{cat.category}:</span>
            <span style={{ color: '#333' }}>{cat.skills.map(s => s.name).join(', ')}</span>
          </div>
        ))}
      </section>
    )}

    {/* Skills (if no categories) */}
    {!data.skillCategories && data.skills && data.skills.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skills</h2>
        <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#333' }}>
          {data.skills.join(', ')}
        </p>
      </section>
    )}

    {/* Professional Experience */}
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Professional Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {exp.company}{exp.location && `, ${exp.location}`}
            </h3>
            <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{exp.startDate} – {exp.endDate}</span>
          </div>
          <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px', color: '#333' }}>{exp.position}</p>
          {exp.description && <HtmlRenderer html={exp.description} as="div" style={{ fontSize: '10px', color: '#666', marginBottom: '6px' }} />}
          <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '18px', color: '#333' }}>
            {exp.achievements.map((ach, j) => <li key={j} style={{ marginBottom: '3px' }}>{ach}</li>)}
          </ul>
          {exp.technologies && exp.technologies.length > 0 && (
            <p style={{ fontSize: '10px', marginTop: '4px', color: '#666', fontStyle: 'italic' }}>
              <em>Technologies:</em> {exp.technologies.join(', ')}
            </p>
          )}
        </div>
      ))}
    </section>

    {/* Projects */}
    {data.projects && data.projects.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Projects</h2>
        {data.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>{proj.name}</h3>
              {proj.startDate && proj.endDate && (
                <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{proj.startDate} – {proj.endDate}</span>
              )}
            </div>
            {proj.role && <p style={{ fontSize: '10px', fontStyle: 'italic', color: '#666', marginBottom: '4px' }}>{proj.role}</p>}
            <HtmlRenderer html={proj.description} as="div" style={{ fontSize: '11px', color: '#333', marginBottom: '4px', lineHeight: '1.5' }} />
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
            {(proj.url || proj.github) && (
              <p style={{ fontSize: '10px', marginTop: '2px', color: '#0066cc' }}>
                {proj.url && <span>{proj.url}</span>}
                {proj.url && proj.github && <span> | </span>}
                {proj.github && <span>{proj.github}</span>}
              </p>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Research & Publications */}
    {data.publications && data.publications.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Publications</h2>
        {data.publications.map((pub, i) => (
          <div key={i} style={{ marginBottom: '12px', fontSize: '11px' }}>
            <p style={{ fontWeight: '600', marginBottom: '2px' }}>{pub.title}</p>
            <p style={{ fontSize: '10px', color: '#666' }}>{pub.publisher}, {pub.date}</p>
            {pub.description && <p style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{pub.description}</p>}
          </div>
        ))}
      </section>
    )}

    {/* Certifications */}
    {data.certifications && data.certifications.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certifications</h2>
        {data.certifications.map((cert, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <span style={{ fontWeight: '600' }}>{cert.name}</span>
            <span style={{ color: '#666', marginLeft: '6px' }}>– {cert.issuer}, {cert.date}</span>
          </div>
        ))}
      </section>
    )}

    {/* Awards & Honors */}
    {data.awards && data.awards.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Awards & Honors</h2>
        {data.awards.map((award, i) => (
          <div key={i} style={{ marginBottom: '8px', fontSize: '11px' }}>
            <span style={{ fontWeight: '600' }}>{award.title}</span>
            <span style={{ color: '#666', marginLeft: '6px' }}>– {award.issuer}, {award.date}</span>
            {award.description && <p style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>{award.description}</p>}
          </div>
        ))}
      </section>
    )}

    {/* Leadership & Activities */}
    {data.volunteer && data.volunteer.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Leadership & Activities</h2>
        {data.volunteer.map((vol, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>{vol.organization}</h3>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>{vol.startDate} – {vol.endDate}</span>
            </div>
            <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px', color: '#333' }}>{vol.role}</p>
            {vol.description && <p style={{ fontSize: '10px', color: '#555', marginBottom: '4px' }}>{vol.description}</p>}
            {vol.achievements && vol.achievements.length > 0 && (
              <ul style={{ fontSize: '10px', lineHeight: '1.5', paddingLeft: '18px', color: '#555' }}>
                {vol.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
              </ul>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Languages */}
    {data.languages && data.languages.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Languages</h2>
        <p style={{ fontSize: '11px', color: '#333' }}>
          {data.languages.map((lang, i) => (
            <span key={i}>
              {lang.name} ({lang.proficiency}){i < data.languages!.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </section>
    )}

    {/* Interests */}
    {data.interests && data.interests.length > 0 && (
      <section>
        <h2 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Interests</h2>
        <p style={{ fontSize: '11px', color: '#333' }}>
          {data.interests.map(int => int.name).join(', ')}
        </p>
      </section>
    )}
  </div>
)
