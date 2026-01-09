/**
 * TEMPLATE 36 - ADVANCED BLUE - FIELD EDITABLE VERSION
 * Professional resume with blue accents, contact badges, and photo in corner
 * Features: Icon-based contact info, skill tags, clean single-column layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template36FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      padding: '50px 60px',
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
            fontSize: '44px',
            fontWeight: 700,
            color: '#2C3E50',
            margin: '0 0 8px 0',
          }}>
            {data.personal?.fullName || 'Your Name'}
          </h1>
          <div style={{
            fontSize: '18px',
            fontWeight: 400,
            color: '#5B9BD5',
            marginBottom: '25px',
          }}>
            {data.personal?.title || 'Professional Title'}
          </div>

          {/* Contact Info Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '10px',
          }}>
            {data.personal?.phone && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
              }}>
                <span style={{ color: '#5B9BD5' }}>📞</span>
                {data.personal.phone}
              </div>
            )}
            {data.personal?.email && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
                wordBreak: 'break-all',
              }}>
                <span style={{ color: '#5B9BD5' }}>✉️</span>
                {data.personal.email}
              </div>
            )}
            {data.personal?.location && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
              }}>
                <span style={{ color: '#5B9BD5' }}>📍</span>
                {data.personal.location}
              </div>
            )}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {data.personal?.website && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
                wordBreak: 'break-all',
              }}>
                <span style={{ color: '#5B9BD5' }}>🌐</span>
                {data.personal.website}
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
                wordBreak: 'break-all',
              }}>
                <span style={{ color: '#5B9BD5' }}>💼</span>
                {data.personal.linkedIn}
              </div>
            )}
          </div>
        </div>

        {/* Profile Photo */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '8px',
          background: data.personal?.photo?.url ? 'transparent' : '#E8F4FC',
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
                <circle cx="30" cy="22" r="12" fill="#5B9BD5" opacity="0.5" />
                <path
                  d="M10 50C10 38.402 19.402 29 31 29C42.598 29 52 38.402 52 50"
                  fill="#5B9BD5"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2C3E50',
            textTransform: 'uppercase',
            marginBottom: '15px',
            letterSpacing: '1px',
          }}>
            SUMMARY
          </h2>
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
            fontSize: '16px',
            fontWeight: 700,
            color: '#2C3E50',
            textTransform: 'uppercase',
            marginBottom: '20px',
            letterSpacing: '1px',
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
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#2C3E50',
                    marginBottom: '2px',
                  }}>
                    {exp.position}, {exp.location}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5B9BD5',
                    fontWeight: 600,
                  }}>
                    {exp.company}
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontStyle: 'italic',
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
                        background: '#2C3E50',
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
            letterSpacing: '1px',
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
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#2C3E50',
                    marginBottom: '2px',
                  }}>
                    {edu.degree}
                    {edu.field && ` IN ${edu.field.toUpperCase()}`}, {edu.location}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5B9BD5',
                    fontWeight: 600,
                  }}>
                    {edu.institution}
                  </div>
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#888888',
                  fontStyle: 'italic',
                  textAlign: 'right',
                }}>
                  {edu.endDate || edu.startDate || ''}
                </div>
              </div>
              {edu.honors && edu.honors.length > 0 && (
                <div style={{
                  fontSize: '12px',
                  color: '#555555',
                  marginTop: '6px',
                  fontStyle: 'italic',
                }}>
                  {edu.honors.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2C3E50',
            textTransform: 'uppercase',
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            SKILLS
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {(Array.isArray(data.skills) ? data.skills : Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : [])).map((skill, i) => (
              <div key={i} style={{
                padding: '10px 18px',
                background: '#E8F4FC',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#2C3E50',
                fontWeight: 500,
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <div style={{ marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#2C3E50',
            textTransform: 'uppercase',
            marginBottom: '20px',
            letterSpacing: '1px',
          }}>
            CERTIFICATIONS
          </h2>
          <ul style={{
            margin: '0',
            padding: '0 0 0 20px',
            listStyle: 'none',
          }}>
            {data.certifications.map((cert, i) => (
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
                  background: '#2C3E50',
                }} />
                {cert.name}
                {cert.issuer && ` - ${cert.issuer}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
