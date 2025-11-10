/**
 * DOUBLE COLUMN TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const DoubleColumnFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
      display: 'flex',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>
      <div style={{
        maxWidth: '850px',
        width: '100%',
        display: 'flex',
        gap: '30px',
      }}>
        {/* Left Column */}
        <div style={{ 
          flex: '60%',
          background: 'transparent',
          padding: '0',
        }}>
          {/* Header */}
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '34px',
              fontWeight: '500',
              fontFamily: 'Rubik, Arial, sans-serif',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '8px',
            }}>
              <EditableText
                value={data.personal?.fullName || 'Your Name'}
                onChange={(v: string) => updateField('personal.fullName', v)}
              />
            </h1>
            {data.personal?.title && (
              <h2 style={{
                fontSize: '17px',
                fontWeight: '500',
                fontFamily: 'Rubik, Arial, sans-serif',
                color: '#1E90FF',
                marginBottom: '16px',
              }}>
                <EditableText
                  value={data.personal.title}
                  onChange={(v: string) => updateField('personal.title', v)}
                />
              </h2>
            )}
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.personal?.email && (
                <span>📧 <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                /></span>
              )}
              {data.personal?.linkedIn && (
                <span>🔗 <EditableText
                  value={data.personal.linkedIn}
                  onChange={(v: string) => updateField('personal.linkedIn', v)}
                /></span>
              )}
              {data.personal?.location && (
                <span>📍 <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                /></span>
              )}
            </div>
          </header>

          {/* Summary */}
          {data.summary && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                fontFamily: 'Rubik, Arial, sans-serif',
                textTransform: 'uppercase',
                borderBottom: '3px solid #000',
                paddingBottom: '6px',
                marginBottom: '12px',
              }}>
                Summary
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
                <EditableText
                  value={data.summary}
                  onChange={(v: string) => updateField('summary', v)}
                  multiline
                />
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
                  flex: 1,
                }}>
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
                        achievements: ['Key achievement']
                      }
                      onFieldChange('experience', [...(data.experience || []), newExp])
                    }}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#1E90FF',
                      color: 'white',
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
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #ddd' : 'none', borderRadius: '4px' }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newExp = data.experience!.filter((_, index) => index !== i)
                        onFieldChange('experience', newExp)
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        padding: '2px 6px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                    />
                  </div>
                  <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    />
                  </div>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ fontSize: '13px', lineHeight: 1.6, color: '#555', marginTop: '4px', paddingLeft: '20px' }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j}>
                          <EditableText
                            value={achievement}
                            onChange={(v: string) => {
                              const newAchievements = [...exp.achievements!]
                              newAchievements[j] = v
                              updateField(`experience.${i}.achievements`, newAchievements)
                            }}
                            multiline
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
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
                      padding: '6px 12px',
                      backgroundColor: '#1E90FF',
                      color: 'white',
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
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #ddd' : 'none', borderRadius: '4px' }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newEdu = data.education!.filter((_, index) => index !== i)
                        onFieldChange('education', newEdu)
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        padding: '2px 6px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                    />
                  </div>
                  <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div style={{ 
          flex: '40%',
          background: 'transparent',
          padding: '0',
          color: '#000000',
        }}>
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid currentColor',
                  paddingBottom: '6px',
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
                      backgroundColor: '#1E90FF',
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
              <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                {data.skills.map((skill, i) => (
                  <span key={i}>
                    <EditableText
                      value={skill}
                      onChange={(v: string) => {
                        const newSkills = [...data.skills!]
                        newSkills[i] = v
                        onFieldChange('skills', newSkills)
                      }}
                    />
                    {i < data.skills!.length - 1 && ' • '}
                    {editMode && (
                      <button
                        onClick={() => {
                          const newSkills = data.skills!.filter((_, index) => index !== i)
                          onFieldChange('skills', newSkills)
                        }}
                        style={{
                          padding: '2px 4px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '9px',
                          marginLeft: '4px'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid currentColor',
                  paddingBottom: '6px',
                  flex: 1,
                }}>
                  Languages
                </h3>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Proficient' }])
                    }}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#1E90FF',
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
              <div style={{ fontSize: '13px' }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name
                  const proficiency = typeof lang === 'string' ? '' : lang.proficiency
                  return (
                    <div key={i} style={{ marginBottom: '4px', position: 'relative' }}>
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
                      />
                      {proficiency && ` - ${proficiency}`}
                      {editMode && (
                        <button
                          onClick={() => {
                            const newLangs = data.languages!.filter((_, index) => index !== i)
                            onFieldChange('languages', newLangs)
                          }}
                          style={{
                            padding: '2px 4px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '9px',
                            marginLeft: '8px'
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
