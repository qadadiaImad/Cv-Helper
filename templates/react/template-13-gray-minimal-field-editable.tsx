/**
 * GRAY MINIMAL TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const GrayMinimalFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      width: '850px',
      minHeight: '1100px',
      background: '#ffffff',
      display: 'flex',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
    }}>
      {/* Left Content Area */}
      <div style={{
        width: '60%',
        padding: '50px 40px',
        background: '#ffffff',
      }}>
        {/* Name */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#666666',
            margin: '0 0 5px 0',
          }}>
            <EditableText
              value={data.personal?.fullName?.split(' ')[0] || 'First'}
              onChange={(v: string) => {
                const lastName = data.personal?.fullName?.split(' ').slice(1).join(' ') || ''
                updateField('personal.fullName', lastName ? `${v} ${lastName}` : v)
              }}
              style={{ color: '#666666' }}
            />
          </h1>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: '0 0 20px 0',
            letterSpacing: '2px',
          }}>
            <EditableText
              value={data.personal?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
              onChange={(v: string) => {
                const firstName = data.personal?.fullName?.split(' ')[0] || ''
                updateField('personal.fullName', `${firstName} ${v}`)
              }}
              style={{ color: '#2d2d2d' }}
            />
          </h1>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: '0',
          }}>
            <EditableText
              value={data.personal?.title || 'Content Creator'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#2d2d2d' }}
            />
          </h2>
        </div>

        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.8',
              color: '#2d2d2d',
              margin: 0,
            }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#2d2d2d' }}
              />
            </p>
          </div>
        )}

        {/* Experience Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#2d2d2d',
              margin: 0,
            }}>
              EXPERIENCE
            </h3>
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
                  padding: '4px 12px',
                  backgroundColor: '#2d2d2d',
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
            <div key={i} style={{ marginBottom: '25px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
              <h4 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 5px 0',
              }}>
                <EditableText
                  value={exp.position}
                  onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                  style={{ color: '#2d2d2d' }}
                />
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#666666',
                margin: '0 0 10px 0',
              }}>
                <EditableText
                  value={exp.company}
                  onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
                {' | '}
                <EditableText
                  value={exp.startDate}
                  onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
                {' - '}
                <EditableText
                  value={exp.endDate || 'Present'}
                  onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
              </p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{
                  margin: 0,
                  paddingLeft: '18px',
                  listStyle: 'disc',
                }}>
                  {exp.achievements.map((achievement: string, j: number) => (
                    <li key={j} style={{
                      fontSize: '11px',
                      lineHeight: '1.7',
                      color: '#2d2d2d',
                      marginBottom: '5px',
                    }}>
                      <EditableText
                        value={achievement}
                        onChange={(v: string) => {
                          const newAchievements = [...exp.achievements!]
                          newAchievements[j] = v
                          updateField(`experience.${i}.achievements`, newAchievements)
                        }}
                        multiline
                        style={{ color: '#2d2d2d' }}
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
                    backgroundColor: '#2d2d2d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: '600',
                    marginTop: '8px',
                    marginLeft: '18px'
                  }}
                >
                  + Add Achievement
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #e0e0e0',
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#2d2d2d',
              margin: 0,
            }}>
              EDUCATION
            </h3>
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
                  padding: '4px 12px',
                  backgroundColor: '#2d2d2d',
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

          {data.education && data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newEdu = data.education!.filter((_, index) => index !== i)
                    onFieldChange('education', newEdu)
                  }}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    padding: '2px 6px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '9px',
                    fontWeight: '600'
                  }}
                >
                  ✕
                </button>
              )}
              <h4 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 5px 0',
              }}>
                <EditableText
                  value={edu.degree}
                  onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                  style={{ color: '#2d2d2d' }}
                />
              </h4>
              <p style={{
                fontSize: '11px',
                color: '#666666',
                margin: '0',
              }}>
                <EditableText
                  value={edu.institution}
                  onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
                {' | Graduated '}
                <EditableText
                  value={edu.endDate}
                  onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{
        width: '40%',
        background: '#b8b8b8',
        padding: '40px 30px',
        position: 'relative',
      }}>
        {/* Profile Photo - Top Right */}
        <div style={{
          width: '180px',
          height: '180px',
          background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
          borderRadius: '50%',
          position: 'absolute',
          top: '30px',
          right: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '8px solid #ffffff',
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
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="35" r="18" fill="#999999" opacity="0.5" />
              <path
                d="M18 80C18 62.327 32.327 48 50 48C67.673 48 82 62.327 82 80"
                fill="#999999"
                opacity="0.5"
              />
            </svg>
          )}
        </div>

        {/* Contact Info - Positioned below photo */}
        <div style={{ marginTop: '230px', marginBottom: '35px' }}>
          {data.personal?.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
                <path d="M13 9.5v2a1.5 1.5 0 01-1.64 1.5A13 13 0 011 3.64 1.5 1.5 0 012.5 2h2a1.5 1.5 0 011.5 1.29c.1.76.28 1.5.54 2.21a1.5 1.5 0 01-.34 1.58l-.85.84a12 12 0 005.73 5.73l.84-.85a1.5 1.5 0 011.58-.34c.71.26 1.45.44 2.21.54A1.5 1.5 0 0113 9.5z" fill="#2d2d2d"/>
              </svg>
              <span style={{
                fontSize: '11px',
                color: '#2d2d2d',
                lineHeight: '1.4',
              }}>
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#2d2d2d' }}
                />
              </span>
            </div>
          )}
          {data.personal?.email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
                <path d="M2 2h10a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
                <path d="M13 3L7 8 1 3" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
              </svg>
              <span style={{
                fontSize: '11px',
                color: '#2d2d2d',
                lineHeight: '1.4',
                wordBreak: 'break-all',
              }}>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#2d2d2d' }}
                />
              </span>
            </div>
          )}
          {data.personal?.location && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '12px', flexShrink: 0 }}>
                <path d="M7 1a5 5 0 00-5 5c0 3.5 5 7 5 7s5-3.5 5-7a5 5 0 00-5-5z" stroke="#2d2d2d" strokeWidth="1.5" fill="none"/>
                <circle cx="7" cy="6" r="1.5" fill="#2d2d2d"/>
              </svg>
              <span style={{
                fontSize: '11px',
                color: '#2d2d2d',
                lineHeight: '1.4',
              }}>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#2d2d2d' }}
                />
              </span>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div style={{ marginBottom: '35px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#2d2d2d',
              margin: 0,
            }}>
              SKILLS
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#2d2d2d',
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
          <ul style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}>
            {data.skills && data.skills.map((skill, i) => (
              <li key={i} style={{
                fontSize: '12px',
                color: '#2d2d2d',
                marginBottom: '10px',
                paddingLeft: '15px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '4px',
                  height: '4px',
                  background: '#2d2d2d',
                  borderRadius: '50%',
                }} />
                <EditableText
                  value={skill}
                  onChange={(v: string) => {
                    const newSkills = [...data.skills!]
                    newSkills[i] = v
                    onFieldChange('skills', newSkills)
                  }}
                  style={{ color: '#2d2d2d' }}
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
              </li>
            ))}
          </ul>
        </div>

        {/* Portfolio Section */}
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#2d2d2d',
            margin: '0 0 20px 0',
          }}>
            PORTFOLIO
          </h3>
          {data.personal?.website && (
            <p style={{
              fontSize: '11px',
              color: '#2d2d2d',
              margin: '0 0 10px 0',
              wordBreak: 'break-all',
            }}>
              <EditableText
                value={data.personal.website}
                onChange={(v: string) => updateField('personal.website', v)}
                style={{ color: '#2d2d2d' }}
              />
            </p>
          )}
          {data.personal?.linkedIn && (
            <p style={{
              fontSize: '11px',
              color: '#2d2d2d',
              margin: '0 0 10px 0',
            }}>
              <EditableText
                value={data.personal.linkedIn}
                onChange={(v: string) => updateField('personal.linkedIn', v)}
                style={{ color: '#2d2d2d' }}
              />
            </p>
          )}
        </div>

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#2d2d2d',
                margin: 0,
              }}>
                LANGUAGES
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#2d2d2d',
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
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}>
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name
                const proficiency = typeof lang === 'string' ? '' : lang.proficiency
                return (
                  <li key={i} style={{
                    fontSize: '12px',
                    color: '#2d2d2d',
                    marginBottom: '10px',
                    paddingLeft: '15px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '4px',
                      height: '4px',
                      background: '#2d2d2d',
                      borderRadius: '50%',
                    }} />
                    <EditableText
                      value={langName}
                      onChange={(v: string) => {
                        const newLangs = [...data.languages!]
                        const currentLang = newLangs[i]
                        newLangs[i] = typeof currentLang === 'string' 
                          ? { name: v, proficiency: 'Professional' as const }
                          : { ...currentLang, name: v }
                        onFieldChange('languages', newLangs)
                      }}
                      style={{ color: '#2d2d2d' }}
                    />
                    {proficiency && ` (${proficiency})`}
                    {editMode && (
                      <button
                        onClick={() => {
                          const newLangs = data.languages!.filter((_, index) => index !== i)
                          onFieldChange('languages', newLangs)
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
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
