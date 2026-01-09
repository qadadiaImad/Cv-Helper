/**
 * TEMPLATE 32 - ORANGE SIDEBAR LEFT - FIELD EDITABLE VERSION
 * Professional resume with orange left sidebar and white main content
 * Features: Contact icons, summary section, skills list
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const Template32FieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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

  const firstName = data.personal?.fullName?.split(' ')[0] || 'LAUREN'
  const lastName = data.personal?.fullName?.split(' ').slice(1).join(' ') || 'CHEN'

  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      display: 'flex',
    }}>
      {/* Orange Left Sidebar */}
      <div style={{
        width: '280px',
        background: '#D4915E',
        padding: '40px 30px',
        color: 'white',
        flexShrink: 0,
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 8px 0',
            lineHeight: 1.2,
          }}>
            <EditableText
              value={firstName}
              onChange={(v: string) => updateField('personal.fullName', `${v} ${lastName}`)}
              style={{ color: 'white' }}
            />
          </h1>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: '0 0 12px 0',
            lineHeight: 1.2,
          }}>
            <EditableText
              value={lastName}
              onChange={(v: string) => updateField('personal.fullName', `${firstName} ${v}`)}
              style={{ color: 'white' }}
            />
          </h1>
          <div style={{
            fontSize: '11px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: 0.95,
          }}>
            <EditableText
              value={data.personal?.title || 'Professional Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: 'white', opacity: 0.95 }}
            />
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
          }}>
            CONTACT
          </h3>
          <div style={{ fontSize: '11px', lineHeight: 1.8 }}>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                📞
              </div>
              <EditableText
                value={data.personal?.phone || ''}
                onChange={(v: string) => updateField('personal.phone', v)}
                style={{ color: 'white' }}
              />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                ✉️
              </div>
              <EditableText
                value={data.personal?.email || ''}
                onChange={(v: string) => updateField('personal.email', v)}
                style={{ color: 'white', wordBreak: 'break-all' }}
              />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                📍
              </div>
              <EditableText
                value={data.personal?.location || ''}
                onChange={(v: string) => updateField('personal.location', v)}
                style={{ color: 'white' }}
              />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                🌐
              </div>
              <EditableText
                value={data.personal?.website || ''}
                onChange={(v: string) => updateField('personal.website', v)}
                style={{ color: 'white', wordBreak: 'break-all' }}
              />
            </div>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                💼
              </div>
              <EditableText
                value={data.personal?.linkedIn || ''}
                onChange={(v: string) => updateField('personal.linkedIn', v)}
                style={{ color: 'white', wordBreak: 'break-all' }}
              />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
          }}>
            SUMMARY
          </h3>
          <div style={{
            fontSize: '11px',
            lineHeight: 1.6,
            textAlign: 'justify',
          }}>
            <EditableText
              value={data.summary || ''}
              onChange={(v: string) => updateField('summary', v)}
              multiline
              style={{ color: 'white' }}
            />
          </div>
        </div>

        {/* Skills Section */}
        {data.skills && (Array.isArray(data.skills) ? data.skills.length > 0 : Object.keys(data.skills).length > 0) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
            }}>
              SKILLS
            </h3>
            <ul style={{
              margin: '0',
              padding: '0',
              listStyle: 'none',
            }}>
              {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'object' && data.skills ? Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : [])).map((skill, i) => (
                <li key={i} style={{
                  fontSize: '11px',
                  marginBottom: '8px',
                  paddingLeft: '16px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '6px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'white',
                  }} />
                  <EditableText
                    value={skill}
                    onChange={(v: string) => {
                      const skillsArray = Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'object' && data.skills ? Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : [])
                      const newSkills = [...skillsArray]
                      newSkills[i] = v
                      onFieldChange('skills', newSkills)
                    }}
                    style={{ color: 'white' }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* White Main Content */}
      <div style={{
        flex: 1,
        padding: '40px 50px',
        color: '#333333',
      }}>
        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              PROFESSIONAL EXPERIENCE
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '25px' }}>
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
                  color: '#666666',
                  marginBottom: '10px',
                }}>
                  <EditableText
                    value={`${exp.company}${exp.location ? `, ${exp.location}` : ''}`}
                    onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    style={{ color: '#666666' }}
                  />
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
                          background: '#333333',
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

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div style={{ marginBottom: '35px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: '#333333',
              marginBottom: '20px',
              paddingBottom: '8px',
              borderBottom: '2px solid #E8E8E8',
            }}>
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '11px',
                  color: '#888888',
                  marginBottom: '4px',
                }}>
                  <EditableText
                    value={edu.endDate || edu.startDate || ''}
                    onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                    style={{ color: '#888888' }}
                  />
                </div>
                <div style={{
                  fontSize: '13px',
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
                  fontSize: '12px',
                  color: '#666666',
                }}>
                  <EditableText
                    value={`${edu.institution}${edu.location ? `, ${edu.location}` : ''}`}
                    onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    style={{ color: '#666666' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
