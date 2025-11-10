/**
 * RED TOPBAR TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const RedTopBarFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      background: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Red top bar */}
      <div style={{
        background: '#c9302c',
        height: '25px',
        width: '100%',
      }} />

      {/* Content wrapper */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Column - White */}
        <main style={{
          flex: 1,
          background: 'white',
          padding: '30px 35px',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#333' }}
            />
          </h1>
          <div style={{
            height: '2px',
            background: '#333',
            margin: '15px 0 25px 0',
          }} />

          {/* Professional Summary */}
          {data.summary && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                letterSpacing: '1px',
                paddingBottom: '8px',
                borderBottom: '2px solid #e0e0e0',
              }}>Professional Summary</h2>
              <div style={{
                fontSize: '10px',
                color: '#333',
                lineHeight: 1.7,
                textAlign: 'justify',
                background: '#fef5f5',
                padding: '12px',
                marginTop: '8px',
              }}>
                <EditableText
                  value={data.summary}
                  onChange={(v: string) => updateField('summary', v)}
                  multiline
                  style={{ color: '#333' }}
                />
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  letterSpacing: '1px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e0e0e0',
                  flex: 1,
                }}>Experience</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      const newExp = {
                        company: 'Company',
                        position: 'Position',
                        startDate: 'Start',
                        endDate: 'End',
                        description: 'Description'
                      }
                      onFieldChange('experience', [...(data.experience || []), newExp])
                    }}
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#c9302c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '9px',
                      fontWeight: '600',
                      marginLeft: '10px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '18px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                        padding: '2px 5px',
                        backgroundColor: '#dc2626',
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
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#333', display: 'inline' }}
                    />
                    {', '}
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#333', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#333', display: 'inline' }}
                    />
                  </div>
                  <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#666' }}
                    />
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, margin: 0, paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
                      <EditableText
                        value={exp.description}
                        onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                        multiline
                        style={{ color: '#333' }}
                      />
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  letterSpacing: '1px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e0e0e0',
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
                      padding: '3px 8px',
                      backgroundColor: '#c9302c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '9px',
                      fontWeight: '600',
                      marginLeft: '10px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px', fontSize: '10px', color: '#333', lineHeight: 1.6, position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
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
                        backgroundColor: '#dc2626',
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
                  <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#333', display: 'inline' }}
                    />
                    {', '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#333', display: 'inline' }}
                    />
                  </div>
                  <div>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  letterSpacing: '1px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #e0e0e0',
                  flex: 1,
                }}>Languages</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                    }}
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#c9302c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '9px',
                      fontWeight: '600',
                      marginLeft: '10px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              <ul style={{ fontSize: '10px', color: '#333', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                  return (
                    <li key={i} style={{ paddingLeft: '12px', position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
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
                        style={{ color: '#333', display: 'inline' }}
                      />
                      {' ('}
                      {proficiency}
                      {')'}
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
                  );
                })}
              </ul>
            </section>
          )}
        </main>

        {/* Right Column - Gray */}
        <aside style={{
          flex: '0 0 40%',
          background: '#f0f0f0',
          padding: '30px 25px',
        }}>
          {/* Photo */}
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: data.personal?.photo?.url ? 'transparent' : 'white',
              margin: '0 auto',
              overflow: 'hidden',
              border: '3px solid #ddd',
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
                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
              )}
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #ddd',
            }}>Contact</h3>
            <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📍</span>
                <span>
                  <EditableText
                    value={data.personal?.location || 'City, State'}
                    onChange={(v: string) => updateField('personal.location', v)}
                    style={{ color: '#333', display: 'inline' }}
                  />
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📞</span>
                <span>
                  Phone: <EditableText
                    value={data.personal?.phone || 'Phone'}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: '#333', display: 'inline' }}
                  />
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>✉️</span>
                <span>
                  Email: <EditableText
                    value={data.personal?.email || 'Email'}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: '#333', display: 'inline' }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Core Qualifications */}
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  letterSpacing: '1px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #ddd',
                  flex: 1,
                }}>Core Qualifications</h3>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#c9302c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '8px',
                      fontWeight: '600',
                      marginLeft: '8px'
                    }}
                  >
                    + Add
                  </button>
                )}
              </div>
              <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
                {data.skills.slice(0, 5).map((skill, i) => (
                  <div key={i} style={{ marginBottom: '15px', fontSize: '10px', color: '#333', lineHeight: 1.6, position: 'relative', paddingRight: editMode ? '20px' : '0' }}>
                    <strong style={{ display: 'block', marginBottom: '4px', fontSize: '10px', color: '#333' }}>
                      • <EditableText
                        value={skill}
                        onChange={(v: string) => {
                          const newSkills = [...data.skills!]
                          newSkills[i] = v
                          onFieldChange('skills', newSkills)
                        }}
                        style={{ color: '#333', display: 'inline' }}
                      />:
                    </strong>
                    Professional expertise and proven track record.
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
