/**
 * DARK BLUE ORANGE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const DarkBlueOrangeFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  // Helper to update nested fields
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
      background: '#1a237e',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      {/* Content Container */}
      <div style={{
        maxWidth: '960px',
        margin: '20px auto',
        position: 'relative',
        display: 'flex',
        color: '#ffffff',
        fontSize: '16px',
        background: '#1a237e',
      }}>
        {/* Left Sidebar (Base) */}
        <div style={{
          width: '30%',
          padding: '30px 15px',
          background: '#283593',
          color: '#ffffff',
        }}>
          {/* Profile Section */}
          <div style={{
            background: '#ffb300',
            padding: '30px 15px 40px 15px',
            margin: '-30px -15px 45px -15px',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* Skewed bottom decoration */}
            <div style={{
              content: '""',
              position: 'absolute',
              background: '#303f9f',
              width: '100%',
              height: '30px',
              bottom: '-15px',
              left: '0',
              transform: 'skewY(-5deg)',
              zIndex: -1,
            }} />

            {/* Photo/Icon */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '100px',
              color: '#283593',
              marginBottom: '10px',
            }}>
              🚀
            </div>

            {/* Name and Title */}
            <div style={{ textAlign: 'center', color: '#ffffff' }}>
              <h1 style={{
                marginTop: '10px',
                marginBottom: '0',
                fontSize: '1.75em',
                textTransform: 'lowercase',
                color: '#1a237e',
                fontWeight: 600,
              }}>
                <EditableText
                  value={data.personal?.fullName || 'Your Name'}
                  onChange={(v: string) => updateField('personal.fullName', v)}
                  style={{ color: '#1a237e' }}
                />
              </h1>
              <h2 style={{
                marginTop: '10px',
                marginBottom: '0',
                fontSize: '1.5em',
                textTransform: 'lowercase',
                color: '#283593',
                fontWeight: 400,
              }}>
                <EditableText
                  value={data.personal?.title || 'Professional'}
                  onChange={(v: string) => updateField('personal.title', v)}
                  style={{ color: '#283593' }}
                />
              </h2>
            </div>
          </div>

          {/* About Me */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#ffb300',
              margin: '10px 0',
              textTransform: 'lowercase',
              fontSize: '1.25em',
            }}>
              About Me
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <EditableText
                value={data.summary || "Professional summary goes here..."}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#ffffff' }}
              />
            </p>
          </div>

          {/* Contact Me */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#ffb300',
              margin: '10px 0',
              textTransform: 'lowercase',
              fontSize: '1.25em',
            }}>
              Contact Me
            </h3>
            {data.personal?.phone && (
              <div style={{
                lineHeight: '24px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>📞</span>
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#ffffff' }}
                />
              </div>
            )}
            {data.personal?.location && (
              <div style={{
                lineHeight: '24px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>📍</span>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#ffffff' }}
                />
              </div>
            )}
            {data.personal?.email && (
              <div style={{
                lineHeight: '24px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>✉️</span>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#ffffff' }}
                />
              </div>
            )}
            {data.personal?.website && (
              <div style={{
                lineHeight: '24px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{ color: '#ffb300', marginRight: '15px', fontSize: '20px' }}>🏠</span>
                <EditableText
                  value={data.personal.website}
                  onChange={(v: string) => updateField('personal.website', v)}
                  style={{ color: '#ffffff' }}
                />
              </div>
            )}
          </div>

          {/* Follow Me */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              color: '#ffb300',
              margin: '10px 0',
              textTransform: 'lowercase',
              fontSize: '1.25em',
            }}>
              Follow Me
            </h3>
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
            }}>
              {['🔗', '📷', '📌', '💼', '💻', '🎨'].map((icon, i) => (
                <div key={i} style={{
                  display: 'inline-flex',
                  fontSize: '20px',
                  background: '#ffb300',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#283593',
                  cursor: 'pointer',
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content (Func) */}
        <div style={{
          width: '70%',
          padding: '30px',
        }}>
          {/* Experience */}
          <div style={{
            background: '#283593',
            padding: '15px',
            marginBottom: '15px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{
                color: '#ffb300',
                margin: '10px 0',
                textTransform: 'lowercase',
                fontSize: '1.25em',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}>
                <span style={{
                  color: '#283593',
                  background: '#ffb300',
                  width: '42px',
                  height: '42px',
                  fontSize: '20px',
                  lineHeight: '42px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  💼
                </span>
                Experience
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
                      achievements: ['Key achievement or responsibility']
                    }
                    onFieldChange('experience', [...(data.experience || []), newExp])
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginLeft: '12px'
                  }}
                >
                  + Add Experience
                </button>
              )}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {data.experience && data.experience.map((exp, i) => (
                <li key={i} style={{
                  position: 'relative',
                  marginLeft: '15px',
                  paddingLeft: '25px',
                  paddingBottom: '15px',
                  borderLeft: '3px solid #ffffff',
                }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newExp = data.experience!.filter((_, index) => index !== i)
                        onFieldChange('experience', newExp)
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '4px 8px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                  <div style={{
                    position: 'absolute',
                    width: '7px',
                    height: '7px',
                    border: '3px solid #ffffff',
                    background: '#ffb300',
                    borderRadius: '50%',
                    left: '-8px',
                    top: '5px',
                  }} />
                  <span style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '16px',
                    marginBottom: '4px',
                  }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </span>
                  <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </small>
                  <small style={{ display: 'block', opacity: 0.7, fontSize: '14px', marginBottom: '8px' }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#ffffff', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Now'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#ffffff', display: 'inline' }}
                    />
                  </small>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginTop: '8px', fontSize: '13px', lineHeight: '1.6' }}>
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
                            style={{ color: '#ffffff' }}
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
                        backgroundColor: '#4a90e2',
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
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div style={{
            background: '#283593',
            padding: '15px',
            marginBottom: '15px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{
                color: '#ffb300',
                margin: '10px 0',
                textTransform: 'lowercase',
                fontSize: '1.25em',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}>
                <span style={{
                  color: '#283593',
                  background: '#ffb300',
                  width: '42px',
                  height: '42px',
                  fontSize: '20px',
                  lineHeight: '42px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  🎓
                </span>
                Education
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    const newEdu = {
                      institution: 'Institution Name',
                      degree: 'Degree',
                      startDate: 'Start Date',
                      endDate: 'End Date'
                    }
                    onFieldChange('education', [...(data.education || []), newEdu])
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4a90e2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginLeft: '12px'
                  }}
                >
                  + Add Education
                </button>
              )}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {data.education && data.education.map((edu, i) => (
                <li key={i} style={{
                  position: 'relative',
                  marginLeft: '15px',
                  paddingLeft: '25px',
                  paddingBottom: '15px',
                  borderLeft: '3px solid #ffffff',
                }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newEdu = data.education!.filter((_, index) => index !== i)
                        onFieldChange('education', newEdu)
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '4px 8px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                  <div style={{
                    position: 'absolute',
                    width: '7px',
                    height: '7px',
                    border: '3px solid #ffffff',
                    background: '#ffb300',
                    borderRadius: '50%',
                    left: '-8px',
                    top: '5px',
                  }} />
                  <span style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '16px',
                    marginBottom: '4px',
                  }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </span>
                  <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#ffffff' }}
                    />
                  </small>
                  <small style={{ display: 'block', opacity: 0.7, fontSize: '14px' }}>
                    <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#ffffff', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#ffffff', display: 'inline' }}
                    />
                  </small>
                </li>
              ))}
            </ul>
          </div>

          {/* Programming Skills */}
          <div style={{
            background: '#283593',
            padding: '15px',
            marginBottom: '15px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{
                color: '#ffb300',
                margin: '10px 0',
                textTransform: 'lowercase',
                fontSize: '1.25em',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}>
                <span style={{
                  color: '#283593',
                  background: '#ffb300',
                  width: '42px',
                  height: '42px',
                  fontSize: '20px',
                  lineHeight: '42px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  💻
                </span>
                Programming Skills
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    const newSkills = [...(data.skills || []), 'New Skill']
                    onFieldChange('skills', newSkills)
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#4a90e2',
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
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 0 15px' }}>
              {data.skills && data.skills.slice(0, 7).map((skill, i) => {
                const percent = [95, 90, 60, 50, 40, 55, 40][i] || 70;
                return (
                  <li key={i} style={{
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}>
                    <span style={{
                      display: 'block',
                      width: '120px',
                      fontSize: '14px',
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
                    <div style={{
                      background: '#ffffff',
                      height: '2px',
                      width: 'calc(100% - 120px)',
                      position: 'relative',
                      borderRadius: '2px',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-1px',
                        height: '4px',
                        background: '#ffb300',
                        boxShadow: '0 0 0 #ffb300',
                        borderRadius: '5px',
                        width: `${percent}%`,
                      }} />
                    </div>
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
                );
              })}
            </ul>
          </div>

          {/* Interests */}
          <div style={{
            background: '#283593',
            padding: '15px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{
                color: '#ffb300',
                margin: '10px 0',
                textTransform: 'lowercase',
                fontSize: '1.25em',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}>
                <span style={{
                  color: '#283593',
                  background: '#ffb300',
                  width: '42px',
                  height: '42px',
                  fontSize: '20px',
                  lineHeight: '42px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  ⭐
                </span>
                Interests
              </h3>
              {editMode && (
                <button
                  onClick={() => {
                    const newInterest = { name: 'New Interest' }
                    onFieldChange('interests', [...(data.interests || []), newInterest])
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#4a90e2',
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
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {data.interests && data.interests.slice(0, 5).map((interest, i) => {
                const icons = ['🎨', '📚', '🎬', '🎧', '🎮'];
                const interestName = typeof interest === 'string' ? interest : interest.name;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100px',
                    height: '100px',
                    position: 'relative',
                  }}>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newInterests = data.interests!.filter((_, index) => index !== i)
                          onFieldChange('interests', newInterests)
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
                      fontSize: '45px',
                      color: '#ffb300',
                      marginBottom: '8px',
                    }}>
                      {icons[i]}
                    </div>
                    <span style={{
                      display: 'block',
                      fontSize: '14px',
                      textAlign: 'center',
                    }}>
                      <EditableText
                        value={interestName}
                        onChange={(v: string) => {
                          const newInterests = [...data.interests!]
                          const currentInterest = newInterests[i]
                          newInterests[i] = typeof currentInterest === 'string' 
                            ? { name: v } 
                            : { ...currentInterest, name: v }
                          onFieldChange('interests', newInterests)
                        }}
                        style={{ color: '#ffffff' }}
                      />
                    </span>
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
