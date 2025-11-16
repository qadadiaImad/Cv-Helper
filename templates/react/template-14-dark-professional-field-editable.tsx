/**
 * DARK PROFESSIONAL TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const DarkProfessionalFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <HtmlRenderer html={value} as="span" className={className} style={style} />
  )

  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: 'linear-gradient(135deg, #0a2e2e 0%, #1a3a3a 50%, #0f2626 100%)',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      position: 'relative',
    }}>
      {/* Geometric Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 35px,
          rgba(255,255,255,0.03) 35px,
          rgba(255,255,255,0.03) 70px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Main Layout Container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        minHeight: '1200px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Left Content Area */}
        <div style={{
          width: '55%',
          padding: '60px 50px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Name and Title */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 300,
              color: '#ffffff',
              margin: '0 0 10px 0',
              letterSpacing: '1px',
            }}>
              <EditableText
                value={data.personal?.fullName || 'Your Name'}
                onChange={(v: string) => updateField('personal.fullName', v)}
                style={{ color: '#ffffff' }}
              />
            </h1>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#a0a0a0',
              margin: '0 0 25px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              <EditableText
                value={data.personal?.title || 'Software Engineer'}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: '#a0a0a0' }}
              />
            </h2>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#c0c0c0',
              margin: 0,
              maxWidth: '90%',
            }}>
              <EditableText
                value={data.summary || 'Professional summary goes here...'}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#c0c0c0' }}
              />
            </p>
          </div>

          {/* Work Experience Section */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                flex: 1,
              }}>
                Work Experience
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
                    backgroundColor: '#4ade80',
                    color: '#0a2e2e',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: '600',
                    marginLeft: '12px'
                  }}
                >
                  + Add
                </button>
              )}
            </div>

            {data.experience && data.experience.map((exp, i) => {
              const icons = ['💼', '⚙️', '🎯', '🔧', '📊', '🎨'];
              return (
                <div key={i} style={{
                  marginBottom: '35px',
                  paddingLeft: '70px',
                  position: 'relative',
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
                  {/* Icon Circle */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {icons[i % icons.length]}
                  </div>

                  {/* Connecting Line */}
                  {i < (data.experience?.length || 0) - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '24px',
                      top: '50px',
                      width: '2px',
                      height: 'calc(100% + 10px)',
                      background: 'rgba(255, 255, 255, 0.1)',
                    }} />
                  )}

                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: '0 0 5px 0',
                  }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    color: '#a0a0a0',
                    margin: '0 0 12px 0',
                  }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#a0a0a0', display: 'inline' }}
                    />
                    {' | '}
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#a0a0a0', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#a0a0a0', display: 'inline' }}
                    />
                  </p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ fontSize: '12px', lineHeight: '1.7', color: '#c0c0c0', margin: 0, paddingLeft: '20px' }}>
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
                            style={{ color: '#c0c0c0' }}
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
                        backgroundColor: '#4ade80',
                        color: '#0a2e2e',
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
              );
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{
          width: '45%',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '60px 40px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Profile Photo */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '12px',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #2a4a4a 0%, #1a3535 100%)',
            marginBottom: '40px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255, 255, 255, 0.1)',
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
                <circle cx="40" cy="30" r="16" fill="#ffffff" opacity="0.3" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#ffffff"
                  opacity="0.3"
                />
              </svg>
            )}
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                flex: 1,
              }}>
                Education
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
                    padding: '4px 8px',
                    backgroundColor: '#4ade80',
                    color: '#0a2e2e',
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
              <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 5px 0',
                }}>
                  <EditableText
                    value={edu.degree}
                    onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                    style={{ color: '#ffffff' }}
                  />
                </h4>
                <p style={{
                  fontSize: '12px',
                  color: '#a0a0a0',
                  margin: '0 0 3px 0',
                }}>
                  <EditableText
                    value={edu.institution}
                    onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    style={{ color: '#a0a0a0' }}
                  />
                </p>
                <p style={{
                  fontSize: '11px',
                  color: '#808080',
                  margin: 0,
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
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                flex: 1,
              }}>
                Skills
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#4ade80',
                    color: '#0a2e2e',
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
            {data.skills && data.skills.slice(0, 6).map((skill, i) => {
              const percentages = [90, 85, 80, 75, 70, 65];
              const percent = percentages[i] || 70;
              return (
                <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newSkills = data.skills!.filter((_, index) => index !== i)
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: '#ffffff',
                      fontWeight: 500,
                    }}>
                      <EditableText
                        value={skill}
                        onChange={(v: string) => {
                          const newSkills = [...data.skills!]
                          newSkills[i] = v
                          onFieldChange('skills', newSkills)
                        }}
                        style={{ color: '#ffffff' }}
                      />
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
                      borderRadius: '4px',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#ffffff',
              margin: '0 0 25px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              Contact Info
            </h3>
            {data.personal?.phone && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(74, 222, 128, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '16px' }}>📞</span>
                </div>
                <span style={{
                  fontSize: '12px',
                  color: '#4ade80',
                  fontWeight: 500,
                }}>
                  <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: '#4ade80' }}
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
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(74, 222, 128, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '16px' }}>✉️</span>
                </div>
                <span style={{
                  fontSize: '12px',
                  color: '#4ade80',
                  fontWeight: 500,
                  wordBreak: 'break-all',
                }}>
                  <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: '#4ade80' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.website && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(74, 222, 128, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '16px' }}>🌐</span>
                </div>
                <span style={{
                  fontSize: '12px',
                  color: '#4ade80',
                  fontWeight: 500,
                  wordBreak: 'break-all',
                }}>
                  <EditableText
                    value={data.personal.website}
                    onChange={(v: string) => updateField('personal.website', v)}
                    style={{ color: '#4ade80' }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
