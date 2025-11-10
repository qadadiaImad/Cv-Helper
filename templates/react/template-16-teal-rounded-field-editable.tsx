/**
 * TEAL ROUNDED TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const TealRoundedFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: 'linear-gradient(135deg, #0a4d4d 0%, #0d5858 50%, #0a4040 100%)',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Content Container */}
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '40px',
        position: 'relative',
      }}>
        {/* Header Section with Photo and Name */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '30px',
        }}>
          {/* Profile Photo - Circular */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid rgba(255, 255, 255, 0.2)',
            flexShrink: 0,
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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

          {/* Name and Title */}
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 8px 0',
              letterSpacing: '0.5px',
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
              color: '#b0d4d4',
              margin: '0',
              letterSpacing: '0.5px',
            }}>
              <EditableText
                value={data.personal?.title || 'Graphic Designer'}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: '#b0d4d4' }}
              />
            </h2>
          </div>
        </div>

        {/* Profile Summary - Rounded White Box */}
        {data.summary && (
          <div style={{
            background: '#ffffff',
            borderRadius: '15px',
            padding: '25px 30px',
            marginBottom: '25px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          }}>
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

        {/* Two Column Layout */}
        <div style={{
          display: 'flex',
          gap: '25px',
        }}>
          {/* Left Column */}
          <div style={{
            width: '35%',
          }}>
            {/* Contact Section */}
            <div style={{
              background: '#0a3838',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '25px',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 20px 0',
                letterSpacing: '0.5px',
              }}>
                Contact
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.personal?.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '12px' }}>📞</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                      <EditableText
                        value={data.personal.phone}
                        onChange={(v: string) => updateField('personal.phone', v)}
                        style={{ color: '#b0d4d4' }}
                      />
                    </span>
                  </div>
                )}
                {data.personal?.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '12px' }}>✉️</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                      <EditableText
                        value={data.personal.email}
                        onChange={(v: string) => updateField('personal.email', v)}
                        style={{ color: '#b0d4d4' }}
                      />
                    </span>
                  </div>
                )}
                {data.personal?.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '12px' }}>🌐</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                      <EditableText
                        value={data.personal.website}
                        onChange={(v: string) => updateField('personal.website', v)}
                        style={{ color: '#b0d4d4' }}
                      />
                    </span>
                  </div>
                )}
                {data.personal?.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: '12px' }}>📍</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                      <EditableText
                        value={data.personal.location}
                        onChange={(v: string) => updateField('personal.location', v)}
                        style={{ color: '#b0d4d4' }}
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div style={{
              background: '#0a3838',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '25px',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '0.5px',
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
                      backgroundColor: '#b0d4d4',
                      color: '#0a3838',
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
                <div key={i} style={{ marginBottom: i < data.education!.length - 1 ? '20px' : '0', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: '0 0 5px 0',
                  }}>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </h4>
                  <p style={{
                    fontSize: '11px',
                    color: '#b0d4d4',
                    margin: '0 0 3px 0',
                  }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#b0d4d4' }}
                    />
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: '#80a8a8',
                    margin: 0,
                  }}>
                    <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#80a8a8', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#80a8a8', display: 'inline' }}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{
            width: '65%',
          }}>
            {/* Work Experience Section */}
            <div style={{
              background: '#ffffff',
              borderRadius: '15px',
              padding: '25px 30px',
              marginBottom: '25px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0a4d4d',
                  margin: 0,
                  letterSpacing: '0.5px',
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
                      backgroundColor: '#0a4d4d',
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
                <div key={i} style={{ marginBottom: i < data.experience!.length - 1 ? '25px' : '0', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0a4d4d',
                    margin: '0 0 5px 0',
                  }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#0a4d4d', display: 'inline' }}
                    />
                    {' ('}
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#0a4d4d', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#0a4d4d', display: 'inline' }}
                    />
                    {')'}
                  </h4>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#2d2d2d',
                    margin: '0 0 10px 0',
                  }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#2d2d2d' }}
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
                        backgroundColor: '#0a4d4d',
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

            {/* Skills Section */}
            <div style={{
              background: '#ffffff',
              borderRadius: '15px',
              padding: '25px 30px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0a4d4d',
                  margin: 0,
                  letterSpacing: '0.5px',
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
                      backgroundColor: '#0a4d4d',
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
              {data.skills && data.skills.slice(0, 5).map((skill, i) => {
                const percentages = [90, 85, 80, 75, 70];
                const percent = percentages[i] || 70;
                return (
                  <div key={i} style={{ marginBottom: '15px', position: 'relative' }}>
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
                        fontSize: '12px',
                        color: '#2d2d2d',
                        fontWeight: 500,
                      }}>
                        <EditableText
                          value={skill}
                          onChange={(v: string) => {
                            const newSkills = [...data.skills!]
                            newSkills[i] = v
                            onFieldChange('skills', newSkills)
                          }}
                          style={{ color: '#2d2d2d' }}
                        />
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e8e8e8',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${percent}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #0d5858 0%, #0a4d4d 100%)',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
