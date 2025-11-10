/**
 * ACADEMIC CV TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const AcademicCVFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Times New Roman', Georgia, serif",
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 60px',
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '2px solid #333',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px',
            letterSpacing: '1px',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#333' }}
            />
          </h1>
          <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
            {data.personal?.location && (
              <span>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
                {' • '}
              </span>
            )}
            {data.personal?.phone && (
              <span>
                Phone: <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
                {' • '}
              </span>
            )}
            {data.personal?.email && (
              <span>
                Email: <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </span>
            )}
            {data.personal?.website && (
              <div style={{ marginTop: '4px' }}>
                Website: <EditableText
                  value={data.personal.website}
                  onChange={(v: string) => updateField('personal.website', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
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
                    padding: '3px 8px',
                    backgroundColor: '#333',
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
              <div key={i} style={{ marginBottom: '12px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                    <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#333', marginBottom: '3px' }}>
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

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
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
                    backgroundColor: '#333',
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
              <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#333', marginBottom: '5px' }}>
                  <EditableText
                    value={exp.company}
                    onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    style={{ color: '#333' }}
                  />
                </div>
                {exp.description && (
                  <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', margin: '5px 0', paddingLeft: '15px' }}>
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

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
                flex: 1,
              }}>Skills</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                  }}
                  style={{
                    padding: '3px 8px',
                    backgroundColor: '#333',
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
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
              <strong>Technical Skills:</strong>{' '}
              {data.skills.map((skill, i) => (
                <span key={i} style={{ position: 'relative', display: 'inline' }}>
                  <EditableText
                    value={skill}
                    onChange={(v: string) => {
                      const newSkills = [...data.skills!]
                      newSkills[i] = v
                      onFieldChange('skills', newSkills)
                    }}
                    style={{ color: '#666', display: 'inline' }}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const newSkills = data.skills!.filter((_, index) => index !== i)
                        onFieldChange('skills', newSkills)
                      }}
                      style={{
                        padding: '1px 3px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        fontSize: '7px',
                        fontWeight: '600',
                        marginLeft: '3px'
                      }}
                    >
                      ✕
                    </button>
                  )}
                  {i < data.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
                flex: 1,
              }}>Certifications</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('certifications', [...(data.certifications || []), { name: 'Certification', issuer: 'Issuer', date: 'Date' }])
                  }}
                  style={{
                    padding: '3px 8px',
                    backgroundColor: '#333',
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
            {data.certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: '8px', fontSize: '10px', color: '#666', lineHeight: '1.4', position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
                {editMode && (
                  <button
                    onClick={() => {
                      const newCerts = data.certifications!.filter((_, index) => index !== i)
                      onFieldChange('certifications', newCerts)
                    }}
                    style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      padding: '2px 4px',
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
                <strong>
                  <EditableText
                    value={cert.name}
                    onChange={(v: string) => updateField(`certifications.${i}.name`, v)}
                    style={{ color: '#666' }}
                  />
                </strong>
                {' - '}
                <EditableText
                  value={cert.issuer}
                  onChange={(v: string) => updateField(`certifications.${i}.issuer`, v)}
                  style={{ color: '#666', display: 'inline' }}
                />
                {', '}
                <EditableText
                  value={cert.date}
                  onChange={(v: string) => updateField(`certifications.${i}.date`, v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
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
                    padding: '3px 8px',
                    backgroundColor: '#333',
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
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                return (
                  <span key={i} style={{ position: 'relative', display: 'inline' }}>
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
                      style={{ color: '#666', display: 'inline' }}
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
                          padding: '1px 3px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '7px',
                          fontWeight: '600',
                          marginLeft: '3px'
                        }}
                      >
                        ✕
                      </button>
                    )}
                    {i < (data.languages?.length || 0) - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
                flex: 1,
              }}>Projects</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('projects', [...(data.projects || []), { name: 'Project', description: 'Description' }])
                  }}
                  style={{
                    padding: '3px 8px',
                    backgroundColor: '#333',
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
            {data.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '12px', position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
                {editMode && (
                  <button
                    onClick={() => {
                      const newProjects = data.projects!.filter((_, index) => index !== i)
                      onFieldChange('projects', newProjects)
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
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                  <EditableText
                    value={proj.name}
                    onChange={(v: string) => updateField(`projects.${i}.name`, v)}
                    style={{ color: '#333' }}
                  />
                </div>
                <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '3px' }}>
                  <EditableText
                    value={proj.description}
                    onChange={(v: string) => updateField(`projects.${i}.description`, v)}
                    multiline
                    style={{ color: '#666' }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
