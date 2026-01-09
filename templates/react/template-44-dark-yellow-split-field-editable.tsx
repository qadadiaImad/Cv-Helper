/**
 * TEMPLATE 44 - DARK YELLOW SPLIT - FIELD EDITABLE VERSION
 * Modern resume with dark blue/yellow split design, circular photo, and diagonal accent
 * Features: Dark navy left sidebar, yellow right content, diagonal yellow wave
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template44FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: '#1A2332',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
      display: 'flex',
    }}>
      {/* Left Sidebar - Dark Navy */}
      <div style={{
        width: '340px',
        background: '#1A2332',
        padding: '50px 35px',
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
      }}>
        {/* Circular Photo */}
        {data.personal?.photo && typeof data.personal.photo === 'string' && (
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '6px solid #FFFFFF',
            margin: '0 auto 40px auto',
            background: '#FFFFFF',
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

        {/* Contacts Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#FDB927',
            textTransform: 'uppercase',
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            CONTACTS
          </h3>
          <div style={{ fontSize: '11px', lineHeight: 1.8 }}>
            {data.personal?.phone && (
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#FDB927', fontSize: '14px' }}>📞</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{data.personal.phone}</div>
                  {data.personal?.phone && (
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>{data.personal.phone}</div>
                  )}
                </div>
              </div>
            )}
            {data.personal?.website && (
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#FDB927', fontSize: '14px' }}>🌐</span>
                <div>
                  <div style={{ fontWeight: 600, wordBreak: 'break-all' }}>{data.personal.website}</div>
                  {data.personal?.email && (
                    <div style={{ fontSize: '10px', opacity: 0.8, wordBreak: 'break-all' }}>{data.personal.email}</div>
                  )}
                </div>
              </div>
            )}
            {data.personal?.location && (
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#FDB927', fontSize: '14px' }}>📍</span>
                <div style={{ fontWeight: 600 }}>{data.personal.location}</div>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#FDB927',
              textTransform: 'uppercase',
              marginBottom: '20px',
              letterSpacing: '1px',
            }}>
              SKILLS
            </h3>
            <div style={{ fontSize: '11px', lineHeight: 2 }}>
              {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
                <div key={i} style={{
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#FDB927',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontWeight: 500 }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Section */}
        {data.certifications && data.certifications.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#FDB927',
              textTransform: 'uppercase',
              marginBottom: '20px',
              letterSpacing: '1px',
            }}>
              AWARDS
            </h3>
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FDB927',
                    flexShrink: 0,
                  }} />
                  {cert.name}
                </div>
                {cert.issuer && (
                  <div style={{
                    fontSize: '10px',
                    lineHeight: 1.5,
                    opacity: 0.9,
                    paddingLeft: '14px',
                  }}>
                    {cert.issuer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content Area - Yellow */}
      <div style={{
        flex: 1,
        background: '#FDB927',
        position: 'relative',
        clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
        marginLeft: '-60px',
        padding: '50px 60px 50px 100px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#1A2332',
            margin: '0 0 5px 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            <span style={{ color: '#FDB927', WebkitTextStroke: '2px #1A2332' }}>
              {data.personal?.fullName?.split(' ')[0] || 'JOHN'}
            </span>{' '}
            <span style={{ color: '#1A2332' }}>
              {data.personal?.fullName?.split(' ').slice(1).join(' ') || 'DOE'}
            </span>
          </h1>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1A2332',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            {data.personal?.title || 'Full-Stack Developer'}
          </div>
        </div>

        {/* About Me Section */}
        {data.summary && (
          <div style={{ marginBottom: '35px' }}>
            <div style={{
              background: '#1A2332',
              padding: '15px 20px',
              marginBottom: '15px',
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#FDB927',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
              }}>
                ABOUT ME
              </h2>
            </div>
            <div style={{
              background: '#FFFFFF',
              padding: '20px',
              fontSize: '11px',
              lineHeight: 1.7,
              color: '#333333',
            }}>
              {data.summary}
            </div>
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <div style={{
              background: '#1A2332',
              padding: '15px 20px',
              marginBottom: '15px',
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#FDB927',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
              }}>
                EDUCATION
              </h2>
            </div>
            {data.education.map((edu, i) => (
              <div key={i} style={{
                marginBottom: '20px',
                paddingLeft: '20px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '5px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#1A2332',
                }} />
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1A2332',
                  marginBottom: '3px',
                }}>
                  {edu.institution}
                </div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1A2332',
                  marginBottom: '3px',
                }}>
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#333333',
                }}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <div style={{
              background: '#1A2332',
              padding: '15px 20px',
              marginBottom: '15px',
            }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#FDB927',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
              }}>
                EXPERIENCE
              </h2>
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} style={{
                marginBottom: '25px',
                paddingLeft: '20px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0',
                  top: '5px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#1A2332',
                }} />
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1A2332',
                  marginBottom: '3px',
                  textTransform: 'uppercase',
                }}>
                  {exp.company}
                </div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1A2332',
                  marginBottom: '3px',
                }}>
                  {exp.position}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#333333',
                  marginBottom: '8px',
                }}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <div style={{
                    fontSize: '10px',
                    lineHeight: 1.6,
                    color: '#333333',
                  }}>
                    {exp.achievements.slice(0, 2).map((achievement: string, j: number) => (
                      <div key={j} style={{ marginBottom: '4px' }}>
                        • {achievement}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
