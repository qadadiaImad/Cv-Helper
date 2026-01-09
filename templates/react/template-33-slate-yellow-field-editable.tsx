/**
 * TEMPLATE 33 - SLATE YELLOW - FIELD EDITABLE VERSION
 * Professional resume with yellow photo box, two-column layout, and skill tags
 * Features: Contact info with separators, bullet points, skill badges
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template33FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: '#ffffff',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      padding: '50px 60px',
      position: 'relative',
    }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '30px',
      }}>
        {/* Name and Title */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#2B5A9E',
            margin: '0 0 8px 0',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              fieldPath="personal.fullName"
              fieldType="text"
              style={{ color: '#2B5A9E' }}
            />
          </h1>
          <div style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#333333',
            marginBottom: '20px',
          }}>
            <EditableText
              value={data.personal?.title || 'Professional Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              fieldPath="personal.title"
              fieldType="text"
              style={{ color: '#333333' }}
            />
          </div>

          {/* Summary */}
          {data.summary && (
            <p style={{
              fontSize: '12px',
              color: '#555555',
              lineHeight: 1.6,
              margin: '0 0 20px 0',
              maxWidth: '500px',
            }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                fieldPath="summary"
                fieldType="richtext"
                multiline
                style={{ color: '#555555' }}
              />
            </p>
          )}

          {/* Contact Info */}
          <div style={{
            fontSize: '12px',
            color: '#555555',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
          }}>
            {data.personal?.phone && (
              <>
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  fieldPath="personal.phone"
                  fieldType="text"
                  style={{ color: '#555555' }}
                />
                <span style={{ color: '#FDB927' }}>|</span>
              </>
            )}
            {data.personal?.location && (
              <>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  fieldPath="personal.location"
                  fieldType="text"
                  style={{ color: '#555555' }}
                />
                <span style={{ color: '#FDB927' }}>|</span>
              </>
            )}
            {data.personal?.email && (
              <>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  fieldPath="personal.email"
                  fieldType="text"
                  style={{ color: '#555555' }}
                />
                <span style={{ color: '#FDB927' }}>|</span>
              </>
            )}
            {data.personal?.linkedIn && (
              <EditableText
                value={data.personal.linkedIn}
                onChange={(v: string) => updateField('personal.linkedIn', v)}
                fieldPath="personal.linkedIn"
                fieldType="text"
                style={{ color: '#555555' }}
              />
            )}
          </div>
        </div>

        {/* Photo Box */}
        <div style={{
          width: '140px',
          height: '140px',
          background: data.personal?.photo?.url ? 'transparent' : '#FDB927',
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
          marginLeft: '30px',
        }}>
          {data.personal?.photo?.url ? (
            <img
              src={data.personal.photo.url}
              alt={data.personal?.fullName || 'Profile'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: data.personal.photo.effects?.grayscale ? 'grayscale(100%)' : 'none',
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="22" r="12" fill="white" opacity="0.7" />
                <path
                  d="M10 50C10 38.402 19.402 29 31 29C42.598 29 52 38.402 52 50"
                  fill="white"
                  opacity="0.7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: '40px',
        borderTop: '2px solid #E8E8E8',
        paddingTop: '30px',
      }}>
        {/* Left Column - Experience */}
        <div>
          {/* Professional Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                PROFESSIONAL EXPERIENCE
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '8px',
                  }}>
                    {exp.company}
                    {exp.location && `, ${exp.location}`}
                    {' | '}
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 18px',
                      listStyle: 'none',
                    }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{
                          fontSize: '11px',
                          color: '#555555',
                          lineHeight: 1.6,
                          marginBottom: '6px',
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '-18px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#2B5A9E',
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
        </div>

        {/* Right Column - Education & Skills */}
        <div>
          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                EDUCATION
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '4px',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#888888',
                  }}>
                    {edu.location && `${edu.location} | `}
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
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                KEY SKILLS
              </h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(0, 6).map((skill, i) => (
                  <div key={i} style={{
                    padding: '6px 14px',
                    border: '1.5px solid #FDB927',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#333333',
                    fontWeight: 500,
                    background: '#FFFBF0',
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
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                ADDITIONAL SKILLS
              </h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).slice(6, 12).map((skill, i) => (
                  <div key={i} style={{
                    padding: '6px 14px',
                    border: '1.5px solid #FDB927',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: '#333333',
                    fontWeight: 500,
                    background: '#FFFBF0',
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
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                LANGUAGES
              </h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name
                  const proficiency = typeof lang === 'string' ? '' : lang.proficiency
                  return (
                    <div key={i} style={{
                      padding: '6px 14px',
                      border: '1.5px solid #FDB927',
                      borderRadius: '4px',
                      fontSize: '11px',
                      color: '#333333',
                      fontWeight: 500,
                      background: '#FFFBF0',
                    }}>
                      {langName}
                      {proficiency && ` (${proficiency})`}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#2B5A9E',
                marginBottom: '20px',
                letterSpacing: '1px',
              }}>
                CERTIFICATIONS
              </h2>
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
                      background: '#2B5A9E',
                    }} />
                    {cert.name}
                    {cert.issuer && ` - ${cert.issuer}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
