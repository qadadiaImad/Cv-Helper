/**
 * TEAL MODERN TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const TealModernFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: '#E8E8E8',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Teal Header - Full Width */}
      <div style={{
        background: 'linear-gradient(135deg, #2DBFB8 0%, #1FA39C 100%)',
        height: '180px',
        width: '100%',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          position: 'relative',
        }}>
          {/* Profile Photo */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '8px solid white',
            background: data.personal?.photo?.url ? 'transparent' : 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '40px',
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
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <circle cx="35" cy="26" r="14" fill="#7BA8C0" opacity="0.6" />
                <path
                  d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
                  fill="#7BA8C0"
                  opacity="0.6"
                />
              </svg>
            )}
          </div>

          {/* Header Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginLeft: 'auto',
          }}>
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>📧</span>
                </div>
                <span style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: 'white' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>📱</span>
                </div>
                <span style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: 'white' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>🔗</span>
                </div>
                <span style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 500,
                }}>
                  <EditableText
                    value={data.personal.linkedIn}
                    onChange={(v: string) => updateField('personal.linkedIn', v)}
                    style={{ color: 'white' }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '30px',
          padding: '100px 40px 40px',
        }}>
          {/* Left Sidebar */}
          <div>
            {/* Interests Section */}
            {data.interests && data.interests.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #B8B8B8 0%, #A0A0A0 100%)',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}>
                <div style={{
                  background: '#2DBFB8',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}>
                  INTERESTS
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('interests', [...(data.interests || []), { name: 'Interest' }])
                    }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
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

                {/* Interests List */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  {data.interests.slice(0, 6).map((interest, i) => {
                    const interestName = typeof interest === 'string' ? interest : interest.name
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        position: 'relative',
                      }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                        }}>
                          {['🎨', '⚽', '📚', '🎵', '✈️', '💻'][i % 6]}
                        </div>
                        <div style={{
                          flex: 1,
                          fontSize: '12px',
                          color: 'white',
                          fontWeight: 500,
                        }}>
                          <EditableText
                            value={interestName}
                            onChange={(v: string) => {
                              const newInterests = [...data.interests!]
                              newInterests[i] = typeof newInterests[i] === 'string' ? { name: v } : { ...newInterests[i], name: v }
                              onFieldChange('interests', newInterests)
                            }}
                            style={{ color: 'white' }}
                          />
                        </div>
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
            )}

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div style={{ marginTop: '30px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#2DBFB8',
                    margin: 0,
                    textTransform: 'uppercase',
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
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  {data.skills.slice(0, 6).map((skill, i) => (
                    <div key={i} style={{
                      fontSize: '12px',
                      color: '#666666',
                      padding: '6px 12px',
                      background: 'white',
                      borderRadius: '6px',
                      position: 'relative',
                      paddingRight: editMode ? '35px' : '12px',
                    }}>
                      <EditableText
                        value={skill}
                        onChange={(v: string) => {
                          const newSkills = [...data.skills!]
                          newSkills[i] = v
                          onFieldChange('skills', newSkills)
                        }}
                        style={{ color: '#666666' }}
                      />
                      {editMode && (
                        <button
                          onClick={() => {
                            const newSkills = data.skills!.filter((_, index) => index !== i)
                            onFieldChange('skills', newSkills)
                          }}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: '6px',
                            transform: 'translateY(-50%)',
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
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content Area */}
          <div>
            {/* Name Header */}
            <div style={{
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '3px solid #2DBFB8',
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#333333',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>
                <EditableText
                  value={data.personal?.fullName || 'Your Name'}
                  onChange={(v: string) => updateField('personal.fullName', v)}
                  style={{ color: '#333333' }}
                />
              </h1>
              {data.personal?.title && (
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#666666',
                }}>
                  <EditableText
                    value={data.personal.title}
                    onChange={(v: string) => updateField('personal.title', v)}
                    style={{ color: '#666666' }}
                  />
                </h2>
              )}
            </div>

            {/* Summary Section */}
            {data.summary && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}>
                  Professional Summary
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#666666',
                  lineHeight: 1.6,
                }}>
                  <EditableText
                    value={data.summary}
                    onChange={(v: string) => updateField('summary', v)}
                    multiline
                    style={{ color: '#666666' }}
                  />
                </p>
              </div>
            )}

            {/* Experience Sections with Checkmarks */}
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
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '40px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
                    {/* Section Header with Checkmark */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#2DBFB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          color: '#333333',
                          marginBottom: '4px',
                        }}>
                          <EditableText
                            value={exp.position}
                            onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                            style={{ color: '#333333' }}
                          />
                        </h3>
                        <div style={{
                          fontSize: '13px',
                          color: '#666666',
                        }}>
                          <EditableText
                            value={exp.company}
                            onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                            style={{ color: '#666666' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div style={{
                      paddingLeft: '64px',
                      marginBottom: '12px',
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#2DBFB8',
                        fontWeight: 600,
                        marginBottom: '8px',
                      }}>
                        ✓ <EditableText
                          value={exp.company.toUpperCase()}
                          onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                          style={{ color: '#2DBFB8', display: 'inline' }}
                        />
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666666',
                        lineHeight: 1.5,
                      }}>
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
                        {exp.location && (
                          <>
                            {' • '}
                            <EditableText
                              value={exp.location}
                              onChange={(v: string) => updateField(`experience.${i}.location`, v)}
                              style={{ color: '#666666', display: 'inline' }}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div style={{
                        paddingLeft: '64px',
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#2DBFB8',
                          fontWeight: 600,
                          marginBottom: '8px',
                        }}>
                          ✓ KEY RESPONSIBILITIES
                        </div>
                        <ul style={{
                          margin: 0,
                          paddingLeft: '18px',
                          listStyle: 'disc',
                        }}>
                          {exp.achievements.map((achievement: string, j: number) => (
                            <li key={j} style={{
                              fontSize: '12px',
                              color: '#666666',
                              lineHeight: 1.6,
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
                                style={{ color: '#666666' }}
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
                        {editMode && (
                          <button
                            onClick={() => {
                              const newAchievements = [...(exp.achievements || []), 'New achievement']
                              updateField(`experience.${i}.achievements`, newAchievements)
                            }}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#2DBFB8',
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
                  <div key={i} style={{ marginBottom: '30px', position: 'relative', paddingRight: editMode ? '40px' : '0' }}>
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
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: '#2DBFB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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
                          color: '#666666',
                        }}>
                          <EditableText
                            value={edu.institution}
                            onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                            style={{ color: '#666666' }}
                          />
                        </div>
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
