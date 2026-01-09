/**
 * TEMPLATE 37 - PREMIUM GREEN - FIELD EDITABLE VERSION
 * Professional resume with green accent line, left sidebar, and bordered skill tags
 * Features: Contact icons, bordered skill tags, two-column layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template37FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Courier New', 'Courier', monospace",
      padding: '50px 60px',
    }}>
      {/* Header Section */}
      <div style={{
        borderBottom: '4px solid #7FA99B',
        paddingBottom: '20px',
        marginBottom: '35px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: 700,
          color: '#2C3E50',
          margin: '0 0 8px 0',
          letterSpacing: '8px',
          textTransform: 'uppercase',
        }}>
          {data.personal?.fullName || 'YOUR NAME'}
        </h1>
        <div style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#95A5A6',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}>
          {data.personal?.title || 'Professional Title'}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '40px',
      }}>
        {/* Left Sidebar */}
        <div>
          {/* Contact Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#2C3E50',
              textTransform: 'uppercase',
              marginBottom: '18px',
              borderBottom: '2px solid #2C3E50',
              paddingBottom: '8px',
            }}>
              — CONTACT
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {data.personal?.phone && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    border: '2px solid #E8E8E8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    📞
                  </div>
                  <span style={{ fontSize: '12px', color: '#333333', paddingTop: '4px' }}>{data.personal.phone}</span>
                </div>
              )}
              {data.personal?.location && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    border: '2px solid #E8E8E8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    📍
                  </div>
                  <span style={{ fontSize: '12px', color: '#333333', paddingTop: '4px' }}>{data.personal.location}</span>
                </div>
              )}
              {data.personal?.email && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    border: '2px solid #E8E8E8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    ✉️
                  </div>
                  <span style={{ fontSize: '12px', color: '#333333', paddingTop: '4px', wordBreak: 'break-all' }}>{data.personal.email}</span>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    border: '2px solid #E8E8E8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    💼
                  </div>
                  <span style={{ fontSize: '12px', color: '#333333', paddingTop: '4px', wordBreak: 'break-all' }}>{data.personal.linkedIn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginBottom: '18px',
                borderBottom: '2px solid #2C3E50',
                paddingBottom: '8px',
              }}>
                — EDUCATION
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '2px',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#888888',
                  }}>
                    {edu.endDate || edu.startDate || ''}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#555555',
                      marginTop: '4px',
                      fontStyle: 'italic',
                    }}>
                      {edu.honors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Key Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginBottom: '18px',
                borderBottom: '2px solid #2C3E50',
                paddingBottom: '8px',
              }}>
                — KEY SKILLS
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 5).map((skill, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    border: '1.5px solid #2C3E50',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#2C3E50',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 5 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginBottom: '18px',
                borderBottom: '2px solid #2C3E50',
                paddingBottom: '8px',
              }}>
                — ADDITIONAL SKILLS
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(5, 10).map((skill, i) => (
                  <div key={i} style={{
                    padding: '8px 12px',
                    border: '1.5px solid #2C3E50',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#2C3E50',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div>
          {/* Summary/Profile */}
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <p style={{
                fontSize: '13px',
                color: '#555555',
                lineHeight: 1.7,
                margin: '0',
              }}>
                {data.summary}
              </p>
            </div>
          )}

          {/* Professional Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginBottom: '20px',
                borderBottom: '2px solid #2C3E50',
                paddingBottom: '8px',
              }}>
                — PROFESSIONAL EXPERIENCE
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
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#2C3E50',
                        marginBottom: '2px',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        textTransform: 'uppercase',
                      }}>
                        {exp.company} | {exp.location}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#888888',
                      textAlign: 'right',
                    }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
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
                            background: '#7FA99B',
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

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2C3E50',
                textTransform: 'uppercase',
                marginBottom: '20px',
                borderBottom: '2px solid #2C3E50',
                paddingBottom: '8px',
              }}>
                — PROJECTS
              </h2>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2C3E50',
                    marginBottom: '6px',
                  }}>
                    {proj.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#555555',
                    lineHeight: 1.6,
                  }}>
                    {proj.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
