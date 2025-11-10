/**
 * BLUE CIRCULAR TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const BlueCircularFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      {/* Left Dark Blue Sidebar */}
      <div style={{
        width: '238px',
        background: '#1e3d5c',
        padding: '0',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Circular Profile Photo with Curved Background */}
        <div style={{
          position: 'relative',
          height: '220px',
          background: '#1e3d5c',
          marginBottom: '40px',
        }}>
          {/* Curved white section */}
          <div style={{
            position: 'absolute',
            bottom: '-1px',
            right: '-1px',
            width: '100%',
            height: '120px',
            background: '#d0d4d8',
            borderTopLeftRadius: '100%',
          }} />
          
          {/* Circular Photo */}
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid #ffffff',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
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
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <circle cx="35" cy="25" r="12" fill="#999999" opacity="0.5" />
                <path
                  d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
                  fill="#999999"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Coordonnées Section */}
        <div style={{ padding: '0 25px 30px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 15px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            COORDONNÉES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📞</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                  <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: '#d0d8e0' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>✉️</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0', wordBreak: 'break-all' }}>
                  <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: '#d0d8e0' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                  <EditableText
                    value={data.personal.location}
                    onChange={(v: string) => updateField('personal.location', v)}
                    style={{ color: '#d0d8e0' }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Langues Section */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ padding: '0 25px 30px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{
                fontSize: '13px',
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
                    color: '#1e3d5c',
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
            {data.languages.map((lang, i) => {
              const levels = [100, 80, 60];
              const level = levels[i] || 50;
              const langName = typeof lang === 'string' ? lang : lang.name
              return (
                <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    marginBottom: '6px',
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
                      style={{ color: '#ffffff' }}
                    />
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${level}%`,
                      height: '100%',
                      background: '#ffffff',
                      borderRadius: '3px',
                    }} />
                  </div>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newLangs = data.languages!.filter((_, index) => index !== i)
                        onFieldChange('languages', newLangs)
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
                </div>
              );
            })}
          </div>
        )}

        {/* Compétences Section */}
        <div style={{ padding: '0 25px 30px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{
              fontSize: '13px',
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
                  color: '#1e3d5c',
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
                fontSize: '10px',
                color: '#d0d8e0',
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

        {/* Centres d'Intérêt Section */}
        {data.interests && data.interests.length > 0 && (
          <div style={{ padding: '0 25px 30px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                CENTRES D'INTÉRÊT
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('interests', [...(data.interests || []), { name: 'Interest' }])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#ffffff',
                    color: '#1e3d5c',
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
                    fontSize: '10px',
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
        padding: '40px 40px',
        background: '#d0d4d8',
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{
            fontSize: '38px',
            fontWeight: 700,
            color: '#1e3d5c',
            margin: '0 0 5px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#1e3d5c' }}
            />
          </h1>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#4a4a4a',
            margin: '0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            <EditableText
              value={data.personal?.title || 'Professional Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#4a4a4a' }}
            />
          </h2>
        </div>

        {/* Formation Section */}
        <div style={{ marginBottom: '35px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e3d5c',
              margin: 0,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              FORMATION
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
                  padding: '6px 12px',
                  backgroundColor: '#1e3d5c',
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
            <div key={i} style={{ 
              marginBottom: '20px', 
              paddingLeft: '20px', 
              position: 'relative',
              borderLeft: '2px solid #1e3d5c',
            }}>
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
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-6px',
                top: '5px',
                width: '10px',
                height: '10px',
                background: '#1e3d5c',
                borderRadius: '50%',
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', paddingRight: editMode ? '40px' : '0' }}>
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: 0,
                }}>
                  <EditableText
                    value={edu.degree}
                    onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                    style={{ color: '#1e3d5c' }}
                  />
                </h4>
                <span style={{
                  fontSize: '10px',
                  color: '#808080',
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
                </span>
              </div>
              <p style={{
                fontSize: '10px',
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

        {/* Expérience Professionnelle Section */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e3d5c',
              margin: 0,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              EXPÉRIENCE PROFESSIONNELLE
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
                  padding: '6px 12px',
                  backgroundColor: '#1e3d5c',
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
            <div key={i} style={{ 
              marginBottom: '25px', 
              paddingLeft: '20px', 
              position: 'relative',
              borderLeft: '2px solid #1e3d5c',
            }}>
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
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '-6px',
                top: '5px',
                width: '10px',
                height: '10px',
                background: '#1e3d5c',
                borderRadius: '50%',
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', paddingRight: editMode ? '40px' : '0' }}>
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: 0,
                }}>
                  <EditableText
                    value={exp.position}
                    onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                    style={{ color: '#1e3d5c' }}
                  />
                </h4>
                <span style={{
                  fontSize: '10px',
                  color: '#808080',
                }}>
                  <EditableText
                    value={exp.startDate}
                    onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                    style={{ color: '#808080', display: 'inline' }}
                  />
                  {' - '}
                  <EditableText
                    value={exp.endDate || 'Présent'}
                    onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                    style={{ color: '#808080', display: 'inline' }}
                  />
                </span>
              </div>
              <p style={{
                fontSize: '10px',
                color: '#4a4a4a',
                margin: '0 0 8px 0',
                fontStyle: 'italic',
              }}>
                <EditableText
                  value={exp.company}
                  onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                  style={{ color: '#4a4a4a' }}
                />
              </p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul style={{
                  margin: 0,
                  paddingLeft: '15px',
                  listStyle: 'disc',
                }}>
                  {exp.achievements.map((achievement: string, j: number) => (
                    <li key={j} style={{
                      fontSize: '10px',
                      lineHeight: '1.6',
                      color: '#4a4a4a',
                      marginBottom: '4px',
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
                    backgroundColor: '#1e3d5c',
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
