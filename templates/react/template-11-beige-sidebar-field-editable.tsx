/**
 * BEIGE SIDEBAR TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const BeigeSidebarFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <span className={className} style={style}>{value}</span>
  )

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'white',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* Top Bar - Full Width */}
      <div style={{
        height: '220px',
        backgroundColor: '#848484',
        color: 'white',
        width: '100%',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '100%',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 'calc(350px + 5%)',
            right: '0',
            bottom: '0',
            height: '120px',
            textAlign: 'center',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '58px',
              letterSpacing: '8px',
              fontWeight: 100,
              lineHeight: '60px',
              textTransform: 'uppercase',
              width: '94%',
            }}>
              <EditableText
                value={data.personal?.fullName || 'Your Name'}
                onChange={(v: string) => updateField('personal.fullName', v)}
                style={{ color: 'white' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '800px',
        backgroundColor: 'white',
      }}>
        {/* Sidebar */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '5%',
          width: '350px',
          backgroundColor: '#F7E0C1',
          padding: '320px 30px 50px',
          minHeight: 'calc(100% - 60px)',
        }}>
          {/* Mugshot/Logo */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '70px',
            height: '210px',
            width: '210px',
          }}>
            <div style={{
              position: 'relative',
              margin: '-23px',
              height: '250px',
              width: '250px',
            }}>
              {/* Hexagonal Logo */}
              <svg viewBox="0 0 80 80" style={{
                height: '100%',
                width: '100%',
                stroke: 'black',
                strokeWidth: '2.5',
                fill: 'none',
              }}>
                <path d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z" />
              </svg>
              {/* Initials */}
              <p style={{
                position: 'absolute',
                top: '58%',
                left: '16%',
                margin: 0,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '55px',
                fontWeight: 400,
                lineHeight: '60px',
                letterSpacing: '0px',
              }}>
                {data.personal?.fullName?.split(' ').map(n => n[0]).join('').toLowerCase() || 'yn'}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
            <EditableText
              value={data.personal?.location || '123 My Place Drive'}
              onChange={(v: string) => updateField('personal.location', v)}
            />
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
            <EditableText
              value={data.personal?.phone || '1-800-CALLPLZ'}
              onChange={(v: string) => updateField('personal.phone', v)}
            />
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '16px', lineHeight: '24px' }}>
            <EditableText
              value={data.personal?.email || 'email@example.com'}
              onChange={(v: string) => updateField('personal.email', v)}
            />
          </p>

          {/* Social Links */}
          {data.personal?.linkedIn && (
            <p style={{
              position: 'relative',
              paddingLeft: '60px',
              marginBottom: '20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              <span style={{
                position: 'absolute',
                top: '-4px',
                left: '10px',
                height: '35px',
                width: '35px',
                display: 'inline-block',
              }}>
                🔗
              </span>
              <EditableText
                value={data.personal.linkedIn}
                onChange={(v: string) => updateField('personal.linkedIn', v)}
              />
            </p>
          )}
          {data.personal?.website && (
            <p style={{
              position: 'relative',
              paddingLeft: '60px',
              marginBottom: '20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              <span style={{
                position: 'absolute',
                top: '-4px',
                left: '10px',
                height: '35px',
                width: '35px',
                display: 'inline-block',
              }}>
                🌐
              </span>
              <EditableText
                value={data.personal.website}
                onChange={(v: string) => updateField('personal.website', v)}
              />
            </p>
          )}

          {/* Expertise */}
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '18px',
              letterSpacing: '4px',
              fontWeight: 600,
              lineHeight: '28px',
              textTransform: 'uppercase',
              margin: '60px auto 10px',
              paddingBottom: '5px',
              borderBottom: '1px solid #888',
            }}>
              Expertise
            </p>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                }}
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  padding: '4px 8px',
                  backgroundColor: '#848484',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: '600'
                }}
              >
                + Add
              </button>
            )}
          </div>
          {data.skills && data.skills.slice(0, 6).map((skill, i) => (
            <p key={i} style={{
              paddingLeft: '25px',
              marginBottom: '10px',
              fontSize: '16px',
              lineHeight: '24px',
              position: 'relative',
            }}>
              <EditableText
                value={skill}
                onChange={(v: string) => {
                  const newSkills = [...data.skills!]
                  newSkills[i] = v
                  onFieldChange('skills', newSkills)
                }}
              />
              {editMode && (
                <button
                  onClick={() => {
                    const newSkills = data.skills!.filter((_, index) => index !== i)
                    onFieldChange('skills', newSkills)
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '9px',
                    fontWeight: '600',
                    marginLeft: '8px'
                  }}
                >
                  ✕
                </button>
              )}
            </p>
          ))}

          {/* Education */}
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '18px',
              letterSpacing: '4px',
              fontWeight: 600,
              lineHeight: '28px',
              textTransform: 'uppercase',
              margin: '60px auto 10px',
              paddingBottom: '5px',
              borderBottom: '1px solid #888',
            }}>
              Education
            </p>
            {editMode && (
              <button
                onClick={() => {
                  const newEdu = {
                    institution: 'Institution',
                    degree: 'Degree',
                    startDate: 'Start',
                    endDate: 'End'
                  }
                  onFieldChange('education', [...(data.education || []), newEdu])
                }}
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '0',
                  padding: '4px 8px',
                  backgroundColor: '#848484',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: '600'
                }}
              >
                + Add
              </button>
            )}
          </div>
          {data.education && data.education.map((edu, i) => (
            <p key={i} style={{
              paddingLeft: '25px',
              marginBottom: '10px',
              fontSize: '16px',
              lineHeight: '24px',
              position: 'relative',
            }}>
              <EditableText
                value={edu.degree}
                onChange={(v: string) => updateField(`education.${i}.degree`, v)}
              />
              {editMode && (
                <button
                  onClick={() => {
                    const newEdu = data.education!.filter((_, index) => index !== i)
                    onFieldChange('education', newEdu)
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '9px',
                    fontWeight: '600',
                    marginLeft: '8px'
                  }}
                >
                  ✕
                </button>
              )}
            </p>
          ))}
        </div>

        {/* Main Content */}
        <div style={{
          marginRight: '0',
          width: 'calc(95% - 350px)',
          padding: '25px 40px 50px',
          marginLeft: 'auto',
        }}>
          {/* Title */}
          <h2 style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '30px',
            letterSpacing: '5px',
            fontWeight: 600,
            lineHeight: '40px',
            color: 'black',
            width: '80%',
            textAlign: 'center',
            margin: '0 auto 25px',
            textTransform: 'uppercase',
          }}>
            <EditableText
              value={data.personal?.title || 'Jr Front-End Developer'}
              onChange={(v: string) => updateField('personal.title', v)}
            />
          </h2>

          {/* Separator */}
          <div style={{
            width: '240px',
            height: '2px',
            backgroundColor: '#999',
            margin: '0 auto 25px',
          }} />

          {/* Profile Section */}
          <div style={{
            backgroundColor: '#DDD',
            width: '100%',
            maxWidth: '580px',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '18px',
            letterSpacing: '6px',
            fontWeight: 600,
            lineHeight: '28px',
            textTransform: 'uppercase',
            margin: '0 auto 25px',
            padding: '8px 0',
          }}>
            Profile
          </div>

          <p style={{
            fontSize: '18px',
            lineHeight: '28px',
            fontWeight: 400,
            margin: '0 auto 50px',
            textAlign: 'justify',
          }}>
            <EditableText
              value={data.summary || 'Professional summary goes here...'}
              onChange={(v: string) => updateField('summary', v)}
              multiline
            />
          </p>

          {/* Experience Section */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#DDD',
              width: '100%',
              maxWidth: '580px',
              textAlign: 'center',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '18px',
              letterSpacing: '6px',
              fontWeight: 600,
              lineHeight: '28px',
              textTransform: 'uppercase',
              margin: '0 auto 25px',
              padding: '8px 0',
            }}>
              Experience
            </div>
            {editMode && (
              <button
                onClick={() => {
                  const newExp = {
                    company: 'Company Name',
                    position: 'Position Title',
                    startDate: 'Start Date',
                    endDate: 'End Date',
                    location: '',
                    achievements: ['Key achievement']
                  }
                  onFieldChange('experience', [...(data.experience || []), newExp])
                }}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  padding: '6px 12px',
                  backgroundColor: '#848484',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
              >
                + Add
              </button>
            )}
          </div>

          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '30px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newExp = data.experience!.filter((_, index) => index !== i)
                    onFieldChange('experience', newExp)
                  }}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    padding: '4px 8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}
                >
                  🗑️
                </button>
              )}
              <h3 style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '21px',
                letterSpacing: '1px',
                fontWeight: 600,
                lineHeight: '28px',
                color: 'black',
                margin: '0 auto 5px',
              }}>
                <EditableText
                  value={exp.position}
                  onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                />
              </h3>
              <p style={{
                color: '#777',
                fontSize: '18px',
                lineHeight: '28px',
                margin: '0 auto 10px',
              }}>
                <EditableText
                  value={exp.company}
                  onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                  style={{ color: '#777', display: 'inline' }}
                />
                {' • '}
                <EditableText
                  value={exp.startDate}
                  onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                  style={{ color: '#777', display: 'inline' }}
                />
                {' - '}
                <EditableText
                  value={exp.endDate || 'Present'}
                  onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                  style={{ color: '#777', display: 'inline' }}
                />
              </p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{ fontSize: '18px', lineHeight: '28px', fontWeight: 400, margin: '0 auto 25px', textAlign: 'justify', paddingLeft: '20px' }}>
                  {exp.achievements.map((achievement: string, j: number) => (
                    <li key={j} style={{ marginBottom: '4px' }}>
                      <EditableText
                        value={achievement}
                        onChange={(v: string) => {
                          const newAchievements = [...exp.achievements!]
                          newAchievements[j] = v
                          updateField(`experience.${i}.achievements`, newAchievements)
                        }}
                        multiline
                      />
                      {editMode && (
                        <button
                          onClick={() => {
                            const newAchievements = exp.achievements!.filter((_: string, index: number) => index !== j)
                            updateField(`experience.${i}.achievements`, newAchievements)
                          }}
                          style={{
                            padding: '2px 6px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '9px',
                            fontWeight: '600',
                            marginLeft: '8px'
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {editMode && (
                <button
                  onClick={() => {
                    const newAchievements = [...(exp.achievements || []), 'New achievement']
                    updateField(`experience.${i}.achievements`, newAchievements)
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#848484',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: '600',
                    marginTop: '8px'
                  }}
                >
                  + Add Achievement
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
