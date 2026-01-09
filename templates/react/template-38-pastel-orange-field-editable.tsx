/**
 * TEMPLATE 38 - PASTEL ORANGE - FIELD EDITABLE VERSION
 * Professional resume with pastel beige sidebar, orange accents, and skill tags
 * Features: Contact icons, bordered skill tags, two-column layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template38FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false, 
  onFieldChange = () => {},
  onFieldEditStart,
  onFieldEditEnd
}) => {
  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  const EditableText = editMode 
    ? (props: any) => (
        <InlineEditableField
          {...props}
          onEditStart={onFieldEditStart}
          onEditEnd={onFieldEditEnd}
        />
      )
    : ({ value, className, style }: any) => (
        <HtmlRenderer html={value} as="span" className={className} style={style} />
      )
  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#FFFFFF',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      display: 'flex',
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '300px',
        background: '#F5EFE7',
        padding: '50px 35px',
        flexShrink: 0,
      }}>
        {/* Contact Section */}
        <div style={{ marginBottom: '35px' }}>
          {data.personal?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: '#E8934F', fontSize: '14px' }}>📞</span>
              <span style={{ fontSize: '13px', color: '#555555' }}>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: '#E8934F', fontSize: '14px' }}>✉️</span>
              <span style={{ fontSize: '13px', color: '#555555', wordBreak: 'break-all' }}>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: '#E8934F', fontSize: '14px' }}>📍</span>
              <span style={{ fontSize: '13px', color: '#555555' }}>{data.personal.location}</span>
            </div>
          )}
          {data.personal?.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ color: '#E8934F', fontSize: '14px' }}>💼</span>
              <span style={{ fontSize: '13px', color: '#555555', wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
            </div>
          )}
        </div>

        {/* Profile Section */}
        {data.summary && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '15px',
            }}>
              PROFILE
            </h3>
            <p style={{
              fontSize: '12px',
              color: '#555555',
              lineHeight: 1.7,
              margin: '0',
            }}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '15px',
            }}>
              SKILLS
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 6).map((skill, i) => (
                <div key={i} style={{
                  padding: '6px 14px',
                  border: '1.5px solid #2C3E50',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#2C3E50',
                  fontWeight: 500,
                }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 6 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '15px',
            }}>
              ADDITIONAL SKILLS
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(6, 12).map((skill, i) => (
                <div key={i} style={{
                  padding: '6px 14px',
                  border: '1.5px solid #2C3E50',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#2C3E50',
                  fontWeight: 500,
                }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '15px',
            }}>
              LANGUAGES
            </h3>
            {data.languages.map((lang, i) => {
              const langName = typeof lang === 'string' ? lang : lang.name
              const proficiency = typeof lang === 'string' ? '' : lang.proficiency
              return (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#E8934F',
                  }}>
                    {langName}
                  </div>
                  {proficiency && (
                    <div style={{
                      fontSize: '11px',
                      color: '#666666',
                    }}>
                      {proficiency}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '15px',
            }}>
              LICENSES AND CERTIFICATIONS
            </h3>
            <ul style={{
              margin: '0',
              padding: '0 0 0 18px',
              listStyle: 'none',
            }}>
              {data.certifications.map((cert, i) => (
                <li key={i} style={{
                  fontSize: '11px',
                  color: '#555555',
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '-18px',
                    top: '6px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#2C3E50',
                  }} />
                  {cert.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div style={{
        flex: 1,
        padding: '50px 60px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#E8934F',
            margin: '0 0 8px 0',
            textTransform: 'uppercase',
          }}>
            {data.personal?.fullName || 'YOUR NAME'}
          </h1>
          <div style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#2C3E50',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>
        </div>

        {/* Professional Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '28px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                }}>
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2C3E50',
                      marginBottom: '2px',
                    }}>
                      {exp.position}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666666',
                    }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#888888',
                    textAlign: 'right',
                  }}>
                    {exp.startDate} — {exp.endDate || 'Present'}
                    <br />
                    {exp.location}
                  </div>
                </div>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{
                    margin: '0',
                    padding: '0 0 0 20px',
                    listStyle: 'none',
                  }}>
                    {exp.achievements.map((achievement: string, j: number) => (
                      <li key={j} style={{
                        fontSize: '12px',
                        color: '#555555',
                        lineHeight: 1.6,
                        marginBottom: '6px',
                        position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '-20px',
                          top: '7px',
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: '#E8934F',
                        }} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2C3E50',
                      marginBottom: '2px',
                    }}>
                      {edu.degree}
                      {edu.field && ` In ${edu.field}`}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666666',
                    }}>
                      {edu.institution}
                    </div>
                    {edu.gpa && (
                      <div style={{
                        fontSize: '12px',
                        color: '#888888',
                      }}>
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#888888',
                    textAlign: 'right',
                  }}>
                    {edu.endDate || edu.startDate || ''}
                    <br />
                    {edu.location}
                  </div>
                </div>
                {edu.honors && edu.honors.length > 0 && (
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#555555',
                    marginTop: '6px',
                  }}>
                    {edu.honors.join(', ')}
                  </div>
                )}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#2C3E50',
                      marginBottom: '4px',
                    }}>
                      Relevant Coursework
                    </div>
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 20px',
                      listStyle: 'none',
                    }}>
                      {edu.coursework.map((course: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          marginBottom: '4px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '-20px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#E8934F',
                          }} />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Awards Section */}
        {data.awards && data.awards.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Awards And Honors
            </h2>
            <ul style={{
              margin: '0',
              padding: '0 0 0 20px',
              listStyle: 'none',
            }}>
              {data.awards.map((award, i) => (
                <li key={i} style={{
                  fontSize: '12px',
                  color: '#555555',
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '7px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#E8934F',
                  }} />
                  {award.title}
                  {award.date && `, ${award.date}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
