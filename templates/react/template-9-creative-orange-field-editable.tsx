/**
 * CREATIVE ORANGE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const CreativeOrangeFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
    }}>
      {/* Orange Wave Header - Full Width */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          zIndex: 0,
        }}
        viewBox="0 0 1920 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="50%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FFA040" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1920,0 L1920,120 Q1440,180 960,120 Q480,60 0,120 Z"
          fill="url(#orangeGradient)"
        />
      </svg>

      {/* Teal Wave Footer - Full Width */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50%',
          height: '150px',
          zIndex: 0,
        }}
        viewBox="0 0 960 150"
        preserveAspectRatio="none"
      >
        <path
          d="M960,150 L960,50 Q720,80 480,50 Q240,20 0,50 L0,150 Z"
          fill="#2DBFB8"
        />
      </svg>

      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '0',
          position: 'relative',
          zIndex: 1,
          padding: '40px',
        }}>
          {/* Left Sidebar */}
          <div style={{ paddingRight: '30px' }}>
            {/* Profile Photo */}
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '8px solid #2DBFB8',
              background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
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

            {/* Name */}
            <h1 style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: '28px',
              fontWeight: 900,
              color: '#FF6B4A',
              textAlign: 'center',
              marginBottom: '4px',
              textTransform: 'uppercase',
            }}>
              <EditableText
                value={data.personal?.fullName?.split(' ')[0] || 'Name'}
                onChange={(v: string) => {
                  const lastName = data.personal?.fullName?.split(' ').slice(1).join(' ') || ''
                  updateField('personal.fullName', lastName ? `${v} ${lastName}` : v)
                }}
                style={{ color: '#FF6B4A' }}
              />
            </h1>
            <h2 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              color: '#666666',
              textAlign: 'center',
              marginBottom: '30px',
            }}>
              <EditableText
                value={data.personal?.title || 'Professional'}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: '#666666' }}
              />
            </h2>

            {/* Disciplines Section */}
            <div style={{
              background: '#2DBFB8',
              color: 'white',
              padding: '8px 16px',
              marginLeft: '-10px',
              marginBottom: '20px',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>Disciplines</div>
              <div style={{
                position: 'absolute',
                right: '-10px',
                top: 0,
                width: 0,
                height: 0,
                borderTop: '16px solid transparent',
                borderBottom: '16px solid transparent',
                borderLeft: '10px solid #2DBFB8',
              }} />
            </div>

            {/* Skills with Icons */}
            <div style={{ marginBottom: '30px', position: 'relative' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const currentSkills = Array.isArray(data.skills) ? data.skills : 
                      (typeof data.skills === 'object' && data.skills ? 
                        Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : 
                        [])
                    onFieldChange('skills', [...currentSkills, 'New Skill'])
                  }}
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '0',
                    padding: '4px 8px',
                    backgroundColor: '#2DBFB8',
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
              {(Array.isArray(data.skills) ? data.skills : (typeof data.skills === 'object' && data.skills ? Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : [])).slice(0, 3).map((skill, i) => {
                const icons = ['📱', '🏢', '⚙️'];
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '16px',
                    position: 'relative',
                    paddingRight: editMode ? '30px' : '0',
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#2DBFB8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      flexShrink: 0,
                    }}>
                      {icons[i]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '2px',
                      }}>
                        <EditableText
                          value={skill}
                          onChange={(v: string) => {
                            const skillsArray = Array.isArray(data.skills) ? data.skills : 
                              (typeof data.skills === 'object' && data.skills ? 
                                Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : 
                                [])
                            const newSkills = [...skillsArray]
                            newSkills[i] = v
                            onFieldChange('skills', newSkills)
                          }}
                          style={{ color: '#333333' }}
                        />
                      </div>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => {
                          const skillsArray = Array.isArray(data.skills) ? data.skills : 
                            (typeof data.skills === 'object' && data.skills ? 
                              Object.values(data.skills).flatMap((cat: any) => Array.isArray(cat) ? cat : []) : 
                              [])
                          const newSkills = skillsArray.filter((_, index) => index !== i)
                          onFieldChange('skills', newSkills)
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

            {/* EDU Section */}
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#2DBFB8',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              EDU
            </div>

            {/* Education Icons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '30px',
            }}>
              {['🎓', '💼', '👶', '👣'].map((icon, i) => (
                <div key={i} style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  {icon}
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{
              background: '#FF6B4A',
              color: 'white',
              padding: '8px 16px',
              marginLeft: '-10px',
              marginBottom: '20px',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}>Skills</div>
              <div style={{
                position: 'absolute',
                right: '-10px',
                top: 0,
                width: 0,
                height: 0,
                borderTop: '16px solid transparent',
                borderBottom: '16px solid transparent',
                borderLeft: '10px solid #FF6B4A',
              }} />
            </div>

            {/* Languages */}
            <div style={{ marginBottom: '20px', position: 'relative' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2DBFB8',
                marginBottom: '8px',
              }}>
                Languages
              </div>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                  }}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    padding: '4px 8px',
                    backgroundColor: '#2DBFB8',
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
              <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
                {data.languages && data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name
                  return (
                    <div key={i} style={{ marginBottom: '4px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                        style={{ color: '#666666' }}
                      />
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
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div style={{ paddingTop: '20px' }}>
            {/* Skills Progress Bars */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '30px',
              marginLeft: 'auto',
              width: '200px',
            }}>
              {[
                { label: 'WORK', value: 90, color: '#2DBFB8' },
                { label: 'Stress LIFE', value: 75, color: '#FFB84D' },
                { label: 'SLEEP', value: 60, color: '#FFA040' },
                { label: 'HEALTH', value: 85, color: '#FF6B4A' },
              ].map((skill, i) => (
                <div key={i}>
                  <div style={{
                    fontSize: '10px',
                    color: '#666666',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}>
                    {skill.label}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#E8E8E8',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${skill.value}%`,
                      height: '100%',
                      background: skill.color,
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Section */}
            {data.experience && data.experience.length > 0 && (
              <div style={{ position: 'relative' }}>
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
                      top: '-10px',
                      right: '0',
                      padding: '6px 12px',
                      backgroundColor: '#FF6B4A',
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
                {data.experience.map((exp, i) => (
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
                    {/* Company Icon */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      marginBottom: '12px',
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#FF6B4A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        flexShrink: 0,
                      }}>
                        {exp.company.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#FF6B4A',
                          marginBottom: '4px',
                        }}>
                          <EditableText
                            value={exp.position}
                            onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                            style={{ color: '#FF6B4A' }}
                          />
                        </h3>
                        <div style={{
                          fontSize: '13px',
                          color: '#2DBFB8',
                          marginBottom: '8px',
                        }}>
                          <EditableText
                            value={exp.company}
                            onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                            style={{ color: '#2DBFB8', display: 'inline' }}
                          />
                          {' • '}
                          <EditableText
                            value={exp.startDate}
                            onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                            style={{ color: '#2DBFB8', display: 'inline' }}
                          />
                          {' - '}
                          <EditableText
                            value={exp.endDate || 'Present'}
                            onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                            style={{ color: '#2DBFB8', display: 'inline' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Achievements with checkmarks */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div style={{ paddingLeft: '66px' }}>
                        {exp.achievements.map((achievement: string, j: number) => (
                          <div key={j} style={{
                            display: 'flex',
                            gap: '8px',
                            marginBottom: '8px',
                            fontSize: '12px',
                            color: '#666666',
                            lineHeight: 1.5,
                          }}>
                            <span style={{ color: '#2DBFB8', flexShrink: 0 }}>✓</span>
                            <span style={{ flex: 1 }}>
                              <EditableText
                                value={achievement}
                                onChange={(v: string) => {
                                  const newAchievements = [...exp.achievements!]
                                  newAchievements[j] = v
                                  updateField(`experience.${i}.achievements`, newAchievements)
                                }}
                                multiline
                                style={{ color: '#666666' }}
                              />
                            </span>
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
                                  flexShrink: 0
                                }}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                        {editMode && (
                          <button
                            onClick={() => {
                              const newAchievements = [...(exp.achievements || []), 'New achievement']
                              updateField(`experience.${i}.achievements`, newAchievements)
                            }}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#FF6B4A',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '10px',
                              fontWeight: '600',
                              marginTop: '8px',
                              marginLeft: '24px'
                            }}
                          >
                            + Add Achievement
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {data.education && data.education.length > 0 && (
              <div style={{ marginTop: '40px', position: 'relative' }}>
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
                      top: '-10px',
                      right: '0',
                      padding: '6px 12px',
                      backgroundColor: '#2DBFB8',
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
                {data.education.map((edu, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '20px',
                    position: 'relative',
                    paddingRight: editMode ? '40px' : '0',
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
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: '#2DBFB8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}>
                      🎓
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#333333',
                        marginBottom: '4px',
                      }}>
                        <EditableText
                          value={edu.degree}
                          onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                          style={{ color: '#333333' }}
                        />
                      </h4>
                      <div style={{
                        fontSize: '13px',
                        color: '#2DBFB8',
                      }}>
                        <EditableText
                          value={edu.institution}
                          onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                          style={{ color: '#2DBFB8' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
