/**
 * TEMPLATE 41 - UNIQUE MODERN ORANGE - FIELD EDITABLE VERSION
 * Professional resume with circular initials, orange accents, and two-column layout
 * Features: Circular monogram, orange headings, clean typography
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template41FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
  // Get initials from full name
  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#FFFFFF',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: '60px 70px',
    }}>
      {/* Header with Circle and Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        marginBottom: '50px',
      }}>
        {/* Circular Initials */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '2px solid #C87D4F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          fontWeight: 400,
          color: '#C87D4F',
          letterSpacing: '2px',
          flexShrink: 0,
        }}>
          {getInitials(data.personal?.fullName || 'LC')}
        </div>

        {/* Name and Title */}
        <div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 400,
            color: '#C87D4F',
            margin: '0 0 5px 0',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}>
            {data.personal?.fullName || 'YOUR NAME'}
          </h1>
          <div style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#666666',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '60px',
      }}>
        {/* Left Column */}
        <div>
          {/* Career Objective */}
          {data.summary && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C87D4F',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '15px',
              }}>
                Career Objective
              </h2>
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

          {/* Professional Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C87D4F',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
              }}>
                Professional Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '30px' }}>
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
                        color: '#333333',
                        marginBottom: '3px',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        fontStyle: 'italic',
                      }}>
                        {exp.company}, {exp.location}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#666666',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}>
                      {exp.startDate}–{exp.endDate || 'Present'}
                    </div>
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 20px',
                      listStyle: 'disc',
                    }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '6px',
                        }}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Contact */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#C87D4F',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '15px',
            }}>
              Contact
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {data.personal?.phone && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    Phone
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                  }}>
                    {data.personal.phone}
                  </div>
                </div>
              )}
              {data.personal?.email && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    Email
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                    wordBreak: 'break-all',
                  }}>
                    {data.personal.email}
                  </div>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    LinkedIn
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                    wordBreak: 'break-all',
                  }}>
                    {data.personal.linkedIn}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C87D4F',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '15px',
              }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '3px',
                  }}>
                    {edu.institution},
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '3px',
                  }}>
                    {edu.location} | {edu.endDate || edu.startDate || ''}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                    fontStyle: 'italic',
                    marginBottom: '3px',
                  }}>
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </div>
                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{
                      fontSize: '11px',
                      color: '#555555',
                      fontStyle: 'italic',
                    }}>
                      {edu.honors.join(', ')} {edu.gpa && `(GPA: ${edu.gpa})`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Relevant Skills */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C87D4F',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '15px',
              }}>
                Relevant Skills
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
                  <div key={i} style={{
                    fontSize: '11px',
                    color: '#555555',
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C87D4F',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '15px',
              }}>
                Languages
              </h2>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name
                  return (
                    <div key={i} style={{
                      fontSize: '11px',
                      color: '#555555',
                    }}>
                      {langName}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
