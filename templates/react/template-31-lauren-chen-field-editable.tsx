/**
 * TEMPLATE 31 - LAUREN CHEN STYLE - FIELD EDITABLE VERSION
 * Professional resume with teal header, circular photo, and two-column layout
 * Features: Contact info with icons, summary section, skills with progress bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template31FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
    }}>
      {/* Teal Header */}
      <div style={{
        background: '#3D6B7D',
        padding: '40px 60px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 300,
          letterSpacing: '8px',
          textTransform: 'uppercase',
          margin: '0 0 8px 0',
        }}>
          <EditableText
            value={data.personal?.fullName || 'YOUR NAME'}
            onChange={(v: string) => updateField('personal.fullName', v)}
            style={{ color: 'white' }}
          />
        </h1>
        <div style={{
          fontSize: '13px',
          fontWeight: 400,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.95,
        }}>
          <EditableText
            value={data.personal?.title || 'Professional Title'}
            onChange={(v: string) => updateField('personal.title', v)}
            style={{ color: 'white', opacity: 0.95 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: '0',
        padding: '40px 60px',
      }}>
        {/* Left Column */}
        <div style={{ paddingRight: '40px' }}>
          {/* Profile Photo */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '8px solid #E8E8E8',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
            margin: '0 0 30px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
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
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="30" r="16" fill="#7BA8C0" opacity="0.6" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#7BA8C0"
                  opacity="0.6"
                />
              </svg>
            )}
          </div>

          {/* Contact Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#3D6B7D',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3D6B7D',
              }} />
              CONTACT
            </h3>
            <div style={{ fontSize: '11px', color: '#555555', lineHeight: 1.8 }}>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 700, minWidth: '60px' }}>phone</span>
                <EditableText
                  value={data.personal?.phone || ''}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#555555' }}
                />
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 700, minWidth: '60px' }}>email</span>
                <EditableText
                  value={data.personal?.email || ''}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#555555', wordBreak: 'break-all' }}
                />
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 700, minWidth: '60px' }}>address</span>
                <EditableText
                  value={data.personal?.location || ''}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#555555' }}
                />
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 700, minWidth: '60px' }}>website</span>
                <EditableText
                  value={data.personal?.website || ''}
                  onChange={(v: string) => updateField('personal.website', v)}
                  style={{ color: '#555555', wordBreak: 'break-all' }}
                />
              </div>
              <div style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ fontWeight: 700, minWidth: '60px' }}>linkedin</span>
                <EditableText
                  value={data.personal?.linkedIn || ''}
                  onChange={(v: string) => updateField('personal.linkedIn', v)}
                  style={{ color: '#555555', wordBreak: 'break-all' }}
                />
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#3D6B7D',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#3D6B7D',
              }} />
              SUMMARY
            </h3>
            <div style={{
              fontSize: '11px',
              color: '#555555',
              lineHeight: 1.7,
              textAlign: 'justify',
            }}>
              <EditableText
                value={data.summary || ''}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#555555' }}
              />
            </div>
          </div>

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                EDUCATION
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#888888',
                    marginBottom: '4px',
                  }}>
                    <EditableText
                      value={edu.endDate || ''}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#888888' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    <EditableText
                      value={`${edu.degree}${edu.field ? `, ${edu.field}` : ''}`}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#333333' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#555555',
                  }}>
                    <EditableText
                      value={`${edu.institution}${edu.location ? `, ${edu.location}` : ''}`}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#555555' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                RELEVANT SKILLS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'object' && data.skills ? Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : [])).slice(0, 6).map((skill, i) => {
                  const percentages = [80, 70, 90, 75, 95, 80]
                  return (
                    <div key={i}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px',
                      }}>
                        <span style={{
                          fontSize: '11px',
                          color: '#333333',
                          fontWeight: 600,
                        }}>
                          <EditableText
                            value={skill}
                            onChange={(v: string) => {
                              const skillsArray = Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'object' && data.skills ? Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : [])
                              const newSkills = [...skillsArray]
                              newSkills[i] = v
                              onFieldChange('skills', newSkills)
                            }}
                            style={{ color: '#333333' }}
                          />
                        </span>
                        <span style={{
                          fontSize: '11px',
                          color: '#3D6B7D',
                          fontWeight: 700,
                        }}>
                          {percentages[i]}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#E8E8E8',
                        borderRadius: '3px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${percentages[i]}%`,
                          height: '100%',
                          background: '#3D6B7D',
                          borderRadius: '3px',
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ paddingLeft: '40px', borderLeft: '1px solid #E8E8E8' }}>
          {/* Professional Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '35px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#3D6B7D',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3D6B7D',
                }} />
                PROFESSIONAL EXPERIENCE
              </h3>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '28px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#3D6B7D',
                  }} />
                  
                  <div style={{
                    fontSize: '11px',
                    color: '#888888',
                    marginBottom: '4px',
                  }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#888888', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#888888', display: 'inline' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#333333' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#3D6B7D',
                    fontWeight: 600,
                    marginBottom: '10px',
                  }}>
                    <EditableText
                      value={`${exp.company}${exp.location ? `, ${exp.location}` : ''}`}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#3D6B7D' }}
                    />
                  </div>
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{
                      margin: '0',
                      padding: '0 0 0 16px',
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
                            left: '-16px',
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: '#3D6B7D',
                          }} />
                          <EditableText
                            value={achievement}
                            onChange={(v: string) => {
                              const newAchievements = [...exp.achievements!]
                              newAchievements[j] = v
                              updateField(`experience.${i}.achievements`, newAchievements)
                            }}
                            multiline
                            style={{ color: '#555555' }}
                          />
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
    </div>
  )
}
