/**
 * JACK SPARROW TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const JackSparrowFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: 'Arial, Helvetica, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header - Full Width */}
      <header style={{
        background: '#4a4a4a',
        color: 'white',
        padding: '18px 20px',
        textAlign: 'center',
        height: '65px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        flexShrink: 0,
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 3px 0', letterSpacing: '1px' }}>
          <EditableText
            value={data.personal?.fullName || 'Your Name'}
            onChange={(v: string) => updateField('personal.fullName', v)}
            style={{ color: 'white' }}
          />
        </h1>
        {data.personal?.title && (
          <h2 style={{ fontSize: '13px', fontWeight: '300', margin: 0, opacity: 0.85, letterSpacing: '0.5px' }}>
            <EditableText
              value={data.personal.title}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: 'white' }}
            />
          </h2>
        )}
      </header>

      {/* Content Wrapper */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: '229.5px',
          background: '#f0f0f0',
          padding: '15px 12px',
          flexShrink: 0,
        }}>
          {/* About Me */}
          {data.summary && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{
                background: '#00bcd4',
                color: 'white',
                padding: '6px 10px',
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>About Me</div>
              <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', textAlign: 'justify' }}>
                <EditableText
                  value={data.summary}
                  onChange={(v: string) => updateField('summary', v)}
                  multiline
                  style={{ color: '#666' }}
                />
              </p>
            </div>
          )}

          {/* Personal Info */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: '#00bcd4',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>Personal</div>
            <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>
                  <EditableText
                    value={data.personal?.fullName || 'Your Name'}
                    onChange={(v: string) => updateField('personal.fullName', v)}
                    style={{ color: '#666' }}
                  />
                </strong>
              </div>
              {data.personal?.location && (
                <div style={{ marginBottom: '5px' }}>
                  <EditableText
                    value={data.personal.location}
                    onChange={(v: string) => updateField('personal.location', v)}
                    style={{ color: '#666' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '15px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                  background: '#00bcd4',
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Skills</div>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                    }}
                    style={{
                      padding: '3px 6px',
                      backgroundColor: '#00bcd4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '9px',
                      fontWeight: '600'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.skills.slice(0, 5).map((skill, i) => (
                <div key={i} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                  <div style={{ fontSize: '9px', color: '#333', minWidth: '80px', flexShrink: 0 }}>
                    <EditableText
                      value={skill}
                      onChange={(v: string) => {
                        const newSkills = [...data.skills!]
                        newSkills[i] = v
                        onFieldChange('skills', newSkills)
                      }}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ flex: 1, height: '6px', background: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff6b35, #ff8c42)',
                      boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.15)',
                      borderRadius: '3px',
                      width: `${90 - i * 5}%`,
                    }} />
                  </div>
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
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '8px',
                        fontWeight: '600'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '15px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                  background: '#00bcd4',
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Languages</div>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                    }}
                    style={{
                      padding: '3px 6px',
                      backgroundColor: '#00bcd4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '9px',
                      fontWeight: '600'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency
                return (
                  <div key={i} style={{ fontSize: '9px', color: '#666', marginBottom: '5px', lineHeight: '1.4', position: 'relative' }}>
                    <strong>
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
                        style={{ color: '#666' }}
                      />
                    </strong>: {proficiency}
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
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '8px',
                          fontWeight: '600',
                          marginLeft: '5px'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Contact */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{
              background: '#00bcd4',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '3px',
              fontSize: '10px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>Contact</div>
            <div style={{ fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
              {data.personal?.email && (
                <div style={{ marginBottom: '5px' }}>
                  📧 <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: '#666', display: 'inline' }}
                  />
                </div>
              )}
              {data.personal?.phone && (
                <div style={{ marginBottom: '5px' }}>
                  📱 <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: '#666', display: 'inline' }}
                  />
                </div>
              )}
              {data.personal?.website && (
                <div style={{ marginBottom: '5px' }}>
                  🌐 <EditableText
                    value={data.personal.website}
                    onChange={(v: string) => updateField('personal.website', v)}
                    style={{ color: '#666', display: 'inline' }}
                  />
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px 25px' }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: 0,
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #00bcd4',
                  paddingBottom: '6px',
                  letterSpacing: '0.5px',
                  flex: 1,
                }}>Experience</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      const newExp = {
                        company: 'Company Name',
                        position: 'Position Title',
                        startDate: 'Start',
                        endDate: 'End',
                        description: 'Description',
                      }
                      onFieldChange('experience', [...(data.experience || []), newExp])
                    }}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#00bcd4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '10px',
                      fontWeight: '600',
                      marginLeft: '10px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.experience.slice(0, 3).map((exp, i) => (
                <div key={i} style={{ marginBottom: '15px', display: 'flex', gap: '12px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                        padding: '3px 6px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '9px',
                        fontWeight: '600'
                      }}
                    >
                      🗑️
                    </button>
                  )}
                  <div style={{ minWidth: '90px', fontSize: '10px', fontWeight: 'bold', color: '#999', paddingTop: '2px', lineHeight: '1.3' }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                  <div style={{ flex: 1, borderLeft: '2px solid #00bcd4', paddingLeft: '15px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                      <EditableText
                        value={exp.position}
                        onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                        style={{ color: '#333' }}
                      />
                    </h3>
                    <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>
                      <EditableText
                        value={exp.company}
                        onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                        style={{ color: '#00bcd4' }}
                      />
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', margin: 0 }}>
                        <EditableText
                          value={exp.description}
                          onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                          multiline
                          style={{ color: '#666' }}
                        />
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: 0,
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #00bcd4',
                  paddingBottom: '6px',
                  letterSpacing: '0.5px',
                  flex: 1,
                }}>Education</h2>
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
                      backgroundColor: '#00bcd4',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '10px',
                      fontWeight: '600',
                      marginLeft: '10px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px', display: 'flex', gap: '12px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                        padding: '2px 5px',
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
                  <div style={{ minWidth: '90px', fontSize: '10px', fontWeight: 'bold', color: '#999', paddingTop: '2px', lineHeight: '1.3' }}>
                    <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                  <div style={{ flex: 1, borderLeft: '2px solid #00bcd4', paddingLeft: '15px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                      <EditableText
                        value={edu.degree}
                        onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                        style={{ color: '#333' }}
                      />
                    </h3>
                    <div style={{ fontSize: '11px', color: '#00bcd4', marginBottom: '6px' }}>
                      <EditableText
                        value={edu.institution}
                        onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                        style={{ color: '#00bcd4' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
