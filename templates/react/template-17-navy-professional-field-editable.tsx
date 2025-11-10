/**
 * NAVY PROFESSIONAL TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const NavyProfessionalFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      display: 'flex',
    }}>
      {/* Left Navy Sidebar */}
      <div style={{
        width: '297.5px',
        background: '#1e3a5f',
        padding: '40px 30px',
        color: '#ffffff',
        flexShrink: 0,
      }}>
        {/* Profile Photo */}
        <div style={{
          width: '100%',
          marginBottom: '35px',
        }}>
          <div style={{
            width: '160px',
            height: '200px',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
            margin: '0 auto',
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
                <circle cx="40" cy="30" r="16" fill="#999999" opacity="0.5" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#999999"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Informations Section */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 20px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            INFORMATIONS
          </h3>
          <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#d0d8e0' }}>
            {data.personal?.phone && (
              <p style={{ margin: '0 0 8px 0' }}>
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#d0d8e0' }}
                />
              </p>
            )}
            {data.personal?.email && (
              <p style={{ margin: '0 0 8px 0', wordBreak: 'break-all' }}>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#d0d8e0' }}
                />
              </p>
            )}
            {data.personal?.location && (
              <p style={{ margin: '0' }}>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#d0d8e0' }}
                />
              </p>
            )}
          </div>
        </div>

        {/* Compétences Section */}
        <div style={{ marginBottom: '40px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              COMPÉTENCES
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#ffffff',
                  color: '#1e3a5f',
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
                fontSize: '11px',
                color: '#d0d8e0',
                marginBottom: '8px',
                paddingLeft: '15px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: '0',
                  top: '6px',
                  width: '5px',
                  height: '5px',
                  background: '#ffffff',
                  borderRadius: '50%',
                }} />
                <EditableText
                  value={skill}
                  onChange={(v: string) => {
                    const newSkills = [...data.skills!]
                    newSkills[i] = v
                    onFieldChange('skills', newSkills)
                  }}
                  style={{ color: '#d0d8e0' }}
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

        {/* Langues Section */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: '40px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                LANGUES
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ffffff',
                    color: '#1e3a5f',
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
                    fontSize: '11px',
                    color: '#d0d8e0',
                    marginBottom: '8px',
                    position: 'relative',
                  }}>
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
                      style={{ color: '#d0d8e0' }}
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

        {/* Intérêts Section */}
        {data.interests && data.interests.length > 0 && (
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                INTÉRÊTS
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('interests', [...(data.interests || []), { name: 'Interest' }])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ffffff',
                    color: '#1e3a5f',
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
              {data.interests.map((interest, i) => {
                const interestName = typeof interest === 'string' ? interest : interest.name
                return (
                  <li key={i} style={{
                    fontSize: '11px',
                    color: '#d0d8e0',
                    marginBottom: '8px',
                    position: 'relative',
                  }}>
                    <EditableText
                      value={interestName}
                      onChange={(v: string) => {
                        const newInterests = [...data.interests!]
                        newInterests[i] = typeof newInterests[i] === 'string' ? { name: v } : { ...newInterests[i], name: v }
                        onFieldChange('interests', newInterests)
                      }}
                      style={{ color: '#d0d8e0' }}
                    />
                    {editMode && (
                      <button
                        onClick={() => {
                          const newInterests = data.interests!.filter((_, index) => index !== i)
                          onFieldChange('interests', newInterests)
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

      {/* Right Content Area */}
      <div style={{
        flex: 1,
        padding: '40px 45px',
        background: '#ffffff',
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1e3a5f',
            margin: '0 0 8px 0',
            letterSpacing: '1px',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#1e3a5f' }}
            />
          </h1>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4a4a4a',
            margin: '0 0 20px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            <EditableText
              value={data.personal?.title || 'Professional Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#4a4a4a' }}
            />
          </h2>
          {data.summary && (
            <p style={{
              fontSize: '11px',
              lineHeight: '1.8',
              color: '#4a4a4a',
              margin: 0,
            }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#4a4a4a' }}
              />
            </p>
          )}
        </div>

        {/* Expériences Professionnelles Section */}
        <div style={{ marginBottom: '35px' }}>
          <div style={{ position: 'relative' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              background: '#1e3a5f',
              padding: '12px 20px',
              margin: '0 0 25px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              EXPÉRIENCES PROFESSIONNELLES
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
                  position: 'absolute',
                  top: '12px',
                  right: '20px',
                  padding: '6px 12px',
                  backgroundColor: '#ffffff',
                  color: '#1e3a5f',
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
            <div key={i} style={{ marginBottom: '25px', paddingLeft: '25px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
              {/* Bullet Point */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                background: '#1e3a5f',
                borderRadius: '50%',
              }} />
              
              <h4 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#1e3a5f',
                margin: '0 0 5px 0',
              }}>
                <EditableText
                  value={exp.position}
                  onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                  style={{ color: '#1e3a5f', display: 'inline' }}
                />
                {' - '}
                <EditableText
                  value={exp.company}
                  onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                  style={{ color: '#1e3a5f', display: 'inline' }}
                />
              </h4>
              <p style={{
                fontSize: '10px',
                color: '#808080',
                margin: '0 0 10px 0',
                textTransform: 'uppercase',
              }}>
                <EditableText
                  value={exp.startDate}
                  onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                  style={{ color: '#808080', display: 'inline' }}
                />
                {' - '}
                <EditableText
                  value={exp.endDate || 'ACTUEL'}
                  onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                  style={{ color: '#808080', display: 'inline' }}
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
                      color: '#4a4a4a',
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
                        style={{ color: '#4a4a4a' }}
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
                    backgroundColor: '#1e3a5f',
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

        {/* Formations Section */}
        <div>
          <div style={{ position: 'relative' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              background: '#1e3a5f',
              padding: '12px 20px',
              margin: '0 0 25px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              FORMATIONS
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
                  position: 'absolute',
                  top: '12px',
                  right: '20px',
                  padding: '6px 12px',
                  backgroundColor: '#ffffff',
                  color: '#1e3a5f',
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
            <div key={i} style={{ marginBottom: '20px', paddingLeft: '25px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
              {/* Bullet Point */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '10px',
                height: '10px',
                background: '#1e3a5f',
                borderRadius: '50%',
              }} />
              
              <h4 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#1e3a5f',
                margin: '0 0 5px 0',
              }}>
                <EditableText
                  value={edu.degree}
                  onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                  style={{ color: '#1e3a5f' }}
                />
              </h4>
              <p style={{
                fontSize: '10px',
                color: '#808080',
                margin: '0 0 5px 0',
              }}>
                <EditableText
                  value={edu.startDate}
                  onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                  style={{ color: '#808080', display: 'inline' }}
                />
                {' - '}
                <EditableText
                  value={edu.endDate}
                  onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                  style={{ color: '#808080', display: 'inline' }}
                />
              </p>
              <p style={{
                fontSize: '11px',
                color: '#4a4a4a',
                margin: 0,
              }}>
                <EditableText
                  value={edu.institution}
                  onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                  style={{ color: '#4a4a4a' }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
