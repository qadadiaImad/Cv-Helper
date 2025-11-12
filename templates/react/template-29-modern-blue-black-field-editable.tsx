/**
 * TEMPLATE 29 - MODERN BLUE BLACK - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const ModernBlueBlackFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Arial', sans-serif",
      display: 'flex',
      position: 'relative',
    }}>
      {/* Left Sidebar - Black */}
      <aside style={{
        width: '220px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '0',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Photo */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#333',
          margin: '40px auto 30px',
          border: '6px solid #ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}>
          {data.personal?.photo?.url ? (
            <img
              src={data.personal.photo.url}
              alt={data.personal?.fullName || 'Profile'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#444' }} />
          )}
        </div>

        {/* About Me */}
        {data.summary && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '15px',
              textTransform: 'capitalize',
            }}>About Me</h2>
            <p style={{
              fontSize: '9px',
              color: '#cccccc',
              lineHeight: '1.6',
              textAlign: 'center',
            }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#cccccc' }}
              />
            </p>
          </section>
        )}

        {/* Contact */}
        <section style={{ padding: '0 20px', marginBottom: '30px' }}>
          {data.personal?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>📞</div>
              <span style={{ fontSize: '9px', color: '#cccccc' }}>
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#cccccc', display: 'inline' }}
                />
              </span>
            </div>
          )}
          {data.personal?.email && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>✉️</div>
              <span style={{ fontSize: '9px', color: '#cccccc', wordBreak: 'break-all' }}>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#cccccc', display: 'inline' }}
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
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '12px',
              }}>📍</div>
              <span style={{ fontSize: '9px', color: '#cccccc' }}>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#cccccc', display: 'inline' }}
                />
              </span>
            </div>
          )}
        </section>

        {/* Language */}
        {data.languages && data.languages.length > 0 && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#2563eb',
              borderRadius: '20px',
              padding: '8px 20px',
              textAlign: 'center',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
              }}>Language</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('languages', [...(data.languages || []), { name: 'New Language', proficiency: 'Professional' }])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#ffffff',
                    color: '#2563eb',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    fontWeight: '600',
                  }}
                >
                  + Add
                </button>
              )}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.languages.slice(0, 4).map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name
                const proficiency = typeof lang === 'string' ? '' : lang.proficiency
                return (
                  <li key={i} style={{
                    fontSize: '10px',
                    color: '#cccccc',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    position: 'relative',
                    paddingRight: editMode ? '25px' : '0',
                  }}>
                    <span style={{ color: '#2563eb' }}>•</span>
                    <span>
                      <EditableText
                        value={langName}
                        onChange={(v: string) => {
                          const newLangs = [...data.languages!]
                          newLangs[i] = typeof lang === 'string' ? { name: v, proficiency: 'Professional' } : { ...lang, name: v }
                          onFieldChange('languages', newLangs)
                        }}
                        style={{ color: '#cccccc', display: 'inline' }}
                      />
                    </span>
                    {proficiency && <span style={{ fontSize: '8px', color: '#999' }}>({proficiency})</span>}
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
                          padding: '1px 3px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '7px',
                          fontWeight: '600'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Expertise */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ padding: '0 20px', marginBottom: '30px' }}>
            <div style={{
              backgroundColor: '#2563eb',
              borderRadius: '20px',
              padding: '8px 20px',
              textAlign: 'center',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
            }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
              }}>Expertise</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#ffffff',
                    color: '#2563eb',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    fontWeight: '600',
                  }}
                >
                  + Add
                </button>
              )}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.skills.slice(0, 6).map((skill, i) => (
                <li key={i} style={{
                  fontSize: '10px',
                  color: '#cccccc',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  position: 'relative',
                  paddingRight: editMode ? '25px' : '0',
                }}>
                  <span style={{ color: '#2563eb' }}>•</span>
                  <span>
                    <EditableText
                      value={skill}
                      onChange={(v: string) => {
                        const newSkills = [...data.skills!]
                        newSkills[i] = v
                        onFieldChange('skills', newSkills)
                      }}
                      style={{ color: '#cccccc', display: 'inline' }}
                    />
                  </span>
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
                        padding: '1px 3px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '7px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        position: 'relative',
      }}>
        {/* Blue Header Bar */}
        <div style={{
          backgroundColor: '#2563eb',
          padding: '40px 40px',
          color: '#ffffff',
        }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#ffffff' }}
            />
          </h1>
          <div style={{
            fontSize: '14px',
            color: '#e0e7ff',
            letterSpacing: '1px',
          }}>
            <EditableText
              value={data.personal?.title || 'Your Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#e0e7ff' }}
            />
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '30px 40px' }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-flex',
                marginBottom: '20px',
                alignItems: 'center',
                gap: '10px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Experience</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      const newExp = {
                        company: 'Company',
                        position: 'Position',
                        startDate: 'Start',
                        endDate: 'End',
                      }
                      onFieldChange('experience', [...(data.experience || []), newExp])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#ffffff',
                      color: '#2563eb',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '8px',
                      fontWeight: '600',
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i} style={{ marginBottom: '25px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                        padding: '1px 4px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '7px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    margin: 0,
                    marginBottom: '3px',
                  }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#1a1a1a' }}
                    />
                  </h3>
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '2px',
                  }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#999',
                    marginBottom: '10px',
                  }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                  {exp.description && (
                    <p style={{
                      fontSize: '10px',
                      color: '#666',
                      lineHeight: '1.7',
                      margin: 0,
                    }}>
                      <EditableText
                        value={exp.description}
                        onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                        multiline
                        style={{ color: '#666' }}
                      />
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-flex',
                marginBottom: '20px',
                alignItems: 'center',
                gap: '10px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Education</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      const newEdu = {
                        institution: 'Institution',
                        degree: 'Degree',
                        startDate: 'Start',
                        endDate: 'End',
                      }
                      onFieldChange('education', [...(data.education || []), newEdu])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#ffffff',
                      color: '#2563eb',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '8px',
                      fontWeight: '600',
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.education.map((edu, i) => (
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
                        padding: '1px 4px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '7px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    margin: 0,
                    marginBottom: '3px',
                  }}>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#1a1a1a' }}
                    />
                  </h3>
                  <div style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '2px',
                  }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#999',
                  }}>
                    <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills Summary with Progress Bars */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <div style={{
                backgroundColor: '#2563eb',
                borderRadius: '20px',
                padding: '8px 25px',
                display: 'inline-block',
                marginBottom: '20px',
              }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  margin: 0,
                }}>Skills Summary</h2>
              </div>
              {data.skills.slice(0, 4).map((skill, i) => {
                // Generate a percentage based on position (just for visual demo)
                const percentage = 85 - (i * 5)
                return (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}>
                      <span style={{ fontSize: '11px', color: '#333', fontWeight: '500' }}>
                        <EditableText
                          value={skill}
                          onChange={(v: string) => {
                            const newSkills = [...data.skills!]
                            newSkills[i] = v
                            onFieldChange('skills', newSkills)
                          }}
                          style={{ color: '#333', display: 'inline' }}
                        />
                      </span>
                      <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 'bold' }}>{percentage}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: '#2563eb',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                )
              })}
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
