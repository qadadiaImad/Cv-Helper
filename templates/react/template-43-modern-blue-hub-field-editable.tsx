/**
 * TEMPLATE 43 - MODERN BLUE HUB - FIELD EDITABLE VERSION
 * Modern resume with blue background, circular photo, and clean two-column layout
 * Features: Blue header with photo, left sidebar sections, white text on blue
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template43FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: '#4A5FA8',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header Section */}
      <div style={{
        background: '#3D4E8F',
        padding: '40px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        {/* Left - Name and Title */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            margin: '0 0 12px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
          }}>
            {data.personal?.fullName || 'YOUR NAME'}
          </h1>
          <div style={{
            display: 'inline-block',
            background: '#5A6FB8',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>
          
          {/* Summary */}
          {data.summary && (
            <p style={{
              fontSize: '12px',
              lineHeight: 1.7,
              marginTop: '25px',
              marginBottom: '0',
              maxWidth: '600px',
            }}>
              {data.summary}
            </p>
          )}
        </div>

        {/* Right - Photo */}
        {data.personal?.photo && typeof data.personal.photo === 'string' && (
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid #FFFFFF',
            flexShrink: 0,
            marginLeft: '40px',
          }}>
            <img
              src={data.personal.photo}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '0',
        flex: 1,
      }}>
        {/* Left Sidebar */}
        <div style={{
          background: '#3D4E8F',
          padding: '40px 30px',
        }}>
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #5A6FB8',
              }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '5px',
                  }}>
                    {edu.degree}
                    {edu.field && `, ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#D0D8F0',
                    marginBottom: '3px',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#D0D8F0',
                  }}>
                    {edu.location}
                  </div>
                  {edu.gpa && (
                    <div style={{
                      fontSize: '10px',
                      color: '#D0D8F0',
                      marginTop: '3px',
                    }}>
                      Design GPA: {edu.gpa}
                    </div>
                  )}
                  {edu.endDate && (
                    <div style={{
                      fontSize: '10px',
                      color: '#D0D8F0',
                      marginTop: '3px',
                    }}>
                      {edu.endDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Key Skills */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #5A6FB8',
              }}>
                Key Skills
              </h2>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 4).map((skill, i) => (
                  <li key={i} style={{
                    fontSize: '11px',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    paddingLeft: '15px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Skills */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 4 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #5A6FB8',
              }}>
                Additional Skills
              </h2>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(4, 8).map((skill, i) => (
                  <li key={i} style={{
                    fontSize: '11px',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    paddingLeft: '15px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reference */}
          {data.certifications && data.certifications.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #5A6FB8',
              }}>
                Reference
              </h2>
              {data.certifications.slice(0, 1).map((cert, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginBottom: '3px',
                  }}>
                    {cert.name}
                  </div>
                  {cert.issuer && (
                    <div style={{
                      fontSize: '10px',
                      color: '#D0D8F0',
                      marginBottom: '3px',
                    }}>
                      {cert.issuer}
                    </div>
                  )}
                  {cert.date && (
                    <div style={{
                      fontSize: '10px',
                      color: '#D0D8F0',
                      marginBottom: '8px',
                    }}>
                      {cert.date}
                    </div>
                  )}
                  <div style={{
                    fontSize: '10px',
                    color: '#D0D8F0',
                    lineHeight: 1.5,
                  }}>
                    Reference information available upon request
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div style={{
          background: '#4A5FA8',
          padding: '40px 50px',
        }}>
          {/* Professional Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '25px',
                paddingBottom: '12px',
                borderBottom: '2px solid #5A6FB8',
              }}>
                Professional Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '30px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        marginBottom: '5px',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#D0D8F0',
                      }}>
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#D0D8F0',
                      textAlign: 'right',
                      marginLeft: '20px',
                    }}>
                      {exp.company}, {exp.location}
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
                          color: '#E8ECFA',
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
      </div>

      {/* Footer Contact Bar */}
      <div style={{
        background: '#2E3B6F',
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: '30px',
        flexWrap: 'wrap',
      }}>
        {data.personal?.phone && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            color: '#FFFFFF',
          }}>
            <span style={{ fontSize: '14px' }}>📞</span>
            {data.personal.phone}
          </div>
        )}
        {data.personal?.location && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            color: '#FFFFFF',
          }}>
            <span style={{ fontSize: '14px' }}>📍</span>
            {data.personal.location}
          </div>
        )}
        {data.personal?.email && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            color: '#FFFFFF',
          }}>
            <span style={{ fontSize: '14px' }}>✉️</span>
            {data.personal.email}
          </div>
        )}
        {data.personal?.linkedIn && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '11px',
            color: '#FFFFFF',
          }}>
            <span style={{ fontSize: '14px' }}>🌐</span>
            {data.personal.linkedIn}
          </div>
        )}
      </div>
    </div>
  )
}
