/**
 * MODERN PROFESSIONAL TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const ModernProfessionalFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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

  const initials = data.personal?.fullName?.split(' ').map(n => n[0]).slice(0, 2) || ['F', 'L'];
  
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: "'Lato', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top section with icon and name - Full Width */}
      <div style={{
        display: 'flex',
        padding: '35px 30px 20px',
        background: '#e8ebe8',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        flexShrink: 0,
      }}>
        <div style={{
          width: '85px',
          height: '85px',
          background: '#2d7a6e',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: 1,
          }}>
            <span>{initials[0]}</span>
            <span>{initials[1]}</span>
          </div>
          {/* Diagonal X lines */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
            <div style={{
              content: '',
              position: 'absolute',
              background: 'rgba(255,255,255,0.7)',
              width: '55px',
              height: '1.5px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(45deg)',
            }} />
            <div style={{
              content: '',
              position: 'absolute',
              background: 'rgba(255,255,255,0.7)',
              width: '55px',
              height: '1.5px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-45deg)',
            }} />
          </div>
        </div>
        <div>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 300,
            color: '#333',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#333' }}
            />
          </h1>
        </div>
      </div>

      {/* Contact bar */}
      <div style={{
        background: '#2b2b2b',
        color: 'white',
        padding: '12px 30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '25px',
        fontSize: '10px',
      }}>
        {data.personal?.location && (
          <span>
            <EditableText
              value={data.personal.location}
              onChange={(v: string) => updateField('personal.location', v)}
              style={{ color: 'white', display: 'inline' }}
            />
          </span>
        )}
        <span>•</span>
        {data.personal?.phone && (
          <span>
            <EditableText
              value={data.personal.phone}
              onChange={(v: string) => updateField('personal.phone', v)}
              style={{ color: 'white', display: 'inline' }}
            />
          </span>
        )}
        <span>•</span>
        {data.personal?.email && (
          <span>
            <EditableText
              value={data.personal.email}
              onChange={(v: string) => updateField('personal.email', v)}
              style={{ color: 'white', display: 'inline' }}
            />
          </span>
        )}
      </div>

      {/* Main content - two columns */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left column - gray with white sections */}
        <aside style={{
          flex: '0 0 25%',
          background: '#e8ebe8',
          padding: '20px 15px',
        }}>
          {/* Professional Summary */}
          {data.summary && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Professional Summary</h2>
              <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, textAlign: 'justify' }}>
                <EditableText
                  value={data.summary}
                  onChange={(v: string) => updateField('summary', v)}
                  multiline
                  style={{ color: '#333' }}
                />
              </p>
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '1px solid #333',
                  letterSpacing: '1px',
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
                      padding: '2px 6px',
                      backgroundColor: '#2d7a6e',
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
              {data.education.map((edu, i) => (
                <div key={i} style={{ fontSize: '10px', color: '#333', lineHeight: 1.6, marginBottom: '8px', position: 'relative', paddingRight: editMode ? '20px' : '0' }}>
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
                  <p style={{ marginBottom: '2px' }}>
                    <strong>
                      <EditableText
                        value={edu.degree}
                        onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                        style={{ color: '#333' }}
                      />
                    </strong>
                  </p>
                  <p>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#333' }}
                    />
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '1px solid #333',
                  letterSpacing: '1px',
                  flex: 1,
                }}>Languages</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#2d7a6e',
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
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '10px', color: '#333', lineHeight: 1.7 }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                  return (
                    <li key={i} style={{ marginBottom: '6px', paddingLeft: '12px', position: 'relative', paddingRight: editMode ? '20px' : '0' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#2d7a6e' }}>•</span>
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
            </div>
          )}
        </aside>

        {/* Right column - white */}
        <main style={{
          flex: 1,
          background: '#ffffff',
          padding: '25px 30px',
        }}>
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '2px solid #2d7a6e',
                  letterSpacing: '1px',
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
                      backgroundColor: '#2d7a6e',
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
                <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
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
                  <div style={{ fontSize: '11px', color: '#2d7a6e', marginBottom: '8px' }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#2d7a6e' }}
                    />
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.3, margin: 0 }}>
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

          {/* Core Qualifications */}
          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '8px',
                  borderBottom: '2px solid #2d7a6e',
                  letterSpacing: '1px',
                  flex: 1,
                }}>Core Qualifications</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                    }}
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#2d7a6e',
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {data.skills.slice(0, 6).map((skill, i) => (
                  <div key={i} style={{ fontSize: '10px', lineHeight: 1.6, color: '#333', position: 'relative', paddingRight: editMode ? '20px' : '0' }}>
                    <strong>
                      <EditableText
                        value={skill}
                        onChange={(v: string) => {
                          const newSkills = [...data.skills!]
                          newSkills[i] = v
                          onFieldChange('skills', newSkills)
                        }}
                        style={{ color: '#333', display: 'inline' }}
                      />
                    </strong>
                    : Professional expertise and proven track record.
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
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
