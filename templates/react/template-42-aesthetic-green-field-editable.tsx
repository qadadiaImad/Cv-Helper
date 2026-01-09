/**
 * TEMPLATE 42 - AESTHETIC GREEN - FIELD EDITABLE VERSION
 * Modern resume with teal header, timeline dots, and clean two-column layout
 * Features: Teal header bar, timeline dots, left sidebar, professional design
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template42FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
    }}>
      {/* Teal Header */}
      <div style={{
        background: '#6AADA8',
        padding: '40px 60px',
        color: '#FFFFFF',
        textAlign: 'right',
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 700,
          margin: '0 0 8px 0',
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}>
          {data.personal?.fullName || 'YOUR NAME'}
        </h1>
        <div style={{
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: '2px',
        }}>
          {data.personal?.title || 'Professional Title'}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '0',
        minHeight: '900px',
      }}>
        {/* Left Sidebar */}
        <div style={{
          background: '#F5F5F5',
          padding: '40px 30px',
        }}>
          {/* Contact */}
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#6AADA8',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '15px',
            }}>
              Contact
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {data.personal?.phone && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '3px',
                  }}>
                    Phone
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#555555',
                    lineHeight: 1.4,
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
                    marginBottom: '3px',
                  }}>
                    Email
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#555555',
                    lineHeight: 1.4,
                    wordBreak: 'break-all',
                  }}>
                    {data.personal.email}
                  </div>
                </div>
              )}
              {data.personal?.location && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '3px',
                  }}>
                    Address
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#555555',
                    lineHeight: 1.4,
                  }}>
                    {data.personal.location}
                  </div>
                </div>
              )}
              {data.personal?.linkedIn && (
                <div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '3px',
                  }}>
                    LinkedIn
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#555555',
                    lineHeight: 1.4,
                    wordBreak: 'break-all',
                  }}>
                    {data.personal.linkedIn}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#6AADA8',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
              }}>
                Skills
              </h2>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 6).map((skill, i) => (
                  <li key={i} style={{
                    fontSize: '10px',
                    color: '#555555',
                    marginBottom: '8px',
                    paddingLeft: '12px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '5px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#333333',
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Skills */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 6 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#6AADA8',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
              }}>
                Additional Skills
              </h2>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(6, 12).map((skill, i) => (
                  <li key={i} style={{
                    fontSize: '10px',
                    color: '#555555',
                    marginBottom: '8px',
                    paddingLeft: '12px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '5px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#333333',
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#6AADA8',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
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
                  const proficiency = typeof lang === 'object' && lang.proficiency ? lang.proficiency : ''
                  return (
                    <div key={i} style={{
                      fontSize: '10px',
                      color: '#555555',
                    }}>
                      <div style={{ fontWeight: 700, color: '#333333' }}>{langName}</div>
                      {proficiency && <div style={{ fontSize: '9px' }}>{proficiency}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Awards */}
          {data.certifications && data.certifications.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#6AADA8',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
              }}>
                Awards
              </h2>
              <ul style={{
                margin: '0',
                padding: '0',
                listStyle: 'none',
              }}>
                {data.certifications.map((cert, i) => (
                  <li key={i} style={{
                    fontSize: '10px',
                    color: '#555555',
                    marginBottom: '8px',
                    paddingLeft: '12px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '5px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#333333',
                    }} />
                    {cert.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - Main Content */}
        <div style={{
          padding: '40px 50px',
        }}>
          {/* Profile */}
          {data.summary && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#6AADA8',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '15px',
              }}>
                Profile
              </h2>
              <p style={{
                fontSize: '11px',
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
            <div style={{ marginBottom: '35px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#6AADA8',
                  flexShrink: 0,
                }} />
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#6AADA8',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: 0,
                  flexShrink: 0,
                }}>
                  Professional Experience
                </h2>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: '#DDDDDD',
                }} />
              </div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{
                  marginBottom: '30px',
                  position: 'relative',
                  paddingLeft: '25px',
                }}>
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '5px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#6AADA8',
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '3px',
                      }}>
                        {exp.position}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#666666',
                      }}>
                        {exp.company}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#666666',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                      marginLeft: '20px',
                    }}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                      {exp.location && (
                        <div>{exp.location}</div>
                      )}
                    </div>
                  </div>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 18px',
                      listStyle: 'disc',
                    }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '10px',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '5px',
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

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#6AADA8',
                  flexShrink: 0,
                }} />
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#6AADA8',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  margin: 0,
                  flexShrink: 0,
                }}>
                  Education
                </h2>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: '#DDDDDD',
                }} />
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{
                  marginBottom: '25px',
                  position: 'relative',
                  paddingLeft: '25px',
                }}>
                  {/* Timeline Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '5px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#6AADA8',
                  }} />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '5px',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '3px',
                      }}>
                        {edu.degree}
                        {edu.field && ` In ${edu.field}`}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#666666',
                      }}>
                        {edu.institution}
                      </div>
                      {edu.gpa && (
                        <div style={{
                          fontSize: '10px',
                          color: '#666666',
                          marginTop: '3px',
                        }}>
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#666666',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                      marginLeft: '20px',
                    }}>
                      {edu.endDate || edu.startDate || ''}
                      {edu.location && (
                        <div>{edu.location}</div>
                      )}
                    </div>
                  </div>

                  {edu.honors && edu.honors.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '5px',
                      }}>
                        Relevant Coursework
                      </div>
                      <ul style={{
                        margin: '0',
                        padding: '0 0 0 18px',
                        listStyle: 'disc',
                      }}>
                        {edu.honors.map((course, j) => (
                          <li key={j} style={{
                            fontSize: '10px',
                            color: '#555555',
                            lineHeight: 1.5,
                            marginBottom: '3px',
                          }}>
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
        </div>
      </div>
    </div>
  )
}
