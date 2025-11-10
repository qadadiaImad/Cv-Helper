/**
 * STOCKHOLM TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const StockholmFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '60px 80px',
      }}>
      {/* Header */}
      <header style={{
        marginBottom: '30px',
      }}>
        <h1 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '36px',
          fontWeight: 700,
          color: '#000000',
          marginBottom: '8px',
          letterSpacing: '-0.5px',
        }}>
          <EditableText
            value={(data.personal?.fullName || 'YOUR NAME').toUpperCase()}
            onChange={(v: string) => updateField('personal.fullName', v)}
            style={{ color: '#000000' }}
          />
        </h1>
        {data.personal?.title && (
          <h2 style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '16px',
            fontWeight: 400,
            color: '#7BA3D1',
            marginBottom: '16px',
          }}>
            <EditableText
              value={data.personal.title}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#7BA3D1' }}
            />
          </h2>
        )}
        <div style={{
          fontSize: '12px',
          color: '#666666',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          fontFamily: "'Arial', sans-serif",
        }}>
          {data.personal?.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✉</span>
              <span>
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
              </span>
            </span>
          )}
          {data.personal?.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span>
              <span>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#666666', display: 'inline' }}
                />
              </span>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            paddingBottom: '6px',
            borderBottom: '3px solid #000000',
          }}>
            SUMMARY
          </h3>
          <p style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#333333',
          }}>
            <EditableText
              value={data.summary}
              onChange={(v: string) => updateField('summary', v)}
              multiline
              style={{ color: '#333333' }}
            />
          </p>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '3px solid #000000',
              flex: 1,
            }}>
              SKILLS
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#000000',
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
          <div style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '13px',
            color: '#333333',
            lineHeight: 1.8,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center',
          }}>
            {data.skills.map((skill, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative', paddingRight: editMode ? '20px' : '0' }}>
                <EditableText
                  value={skill}
                  onChange={(v: string) => {
                    const newSkills = [...data.skills!]
                    newSkills[i] = v
                    onFieldChange('skills', newSkills)
                  }}
                  style={{ color: '#333333', display: 'inline' }}
                />
                {i < data.skills.length - 1 && <span>•</span>}
                {editMode && (
                  <button
                    onClick={() => {
                      const newSkills = data.skills!.filter((_, index) => index !== i)
                      onFieldChange('skills', newSkills)
                    }}
                    style={{
                      position: 'absolute',
                      top: '-2px',
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
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '3px solid #000000',
              flex: 1,
            }}>
              EXPERIENCE
            </h3>
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
                  backgroundColor: '#000000',
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
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '4px',
              }}>
                <EditableText
                  value={exp.position}
                  onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                  style={{ color: '#000000' }}
                />
              </div>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#7BA782',
                marginBottom: '4px',
              }}>
                <EditableText
                  value={exp.company}
                  onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                  style={{ color: '#7BA782' }}
                />
              </div>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '12px',
                color: '#666666',
                marginBottom: '8px',
                display: 'flex',
                gap: '12px',
              }}>
                {exp.startDate && exp.endDate && (
                  <span>
                    📅 <EditableText
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
                  </span>
                )}
              </div>
              {exp.description && (
                <p style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: '13px',
                  color: '#333333',
                  lineHeight: 1.6,
                  marginBottom: '6px',
                }}>
                  <EditableText
                    value={exp.description}
                    onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                    multiline
                    style={{ color: '#333333' }}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '3px solid #000000',
              flex: 1,
            }}>
              EDUCATION
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
                  padding: '3px 8px',
                  backgroundColor: '#000000',
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
            <div key={i} style={{ marginBottom: '16px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '4px',
              }}>
                <EditableText
                  value={edu.degree}
                  onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                  style={{ color: '#000000' }}
                />
              </div>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#7BA782',
                marginBottom: '4px',
              }}>
                <EditableText
                  value={edu.institution}
                  onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                  style={{ color: '#7BA782' }}
                />
              </div>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '12px',
                color: '#666666',
              }}>
                {edu.startDate && edu.endDate && (
                  <span>
                    📅 <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#666666', display: 'inline' }}
                    />
                    {' - '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#666666', display: 'inline' }}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '3px solid #000000',
              flex: 1,
            }}>
              TRAINING / COURSES
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('certifications', [...(data.certifications || []), { name: 'Certification', issuer: 'Issuer', date: 'Date' }])
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#000000',
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
            <div key={i} style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '#333333',
              marginBottom: '8px',
              position: 'relative',
              paddingRight: editMode ? '30px' : '0'
            }}>
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
              <div style={{ fontWeight: 700 }}>
                <EditableText
                  value={cert.name}
                  onChange={(v: string) => updateField(`certifications.${i}.name`, v)}
                  style={{ color: '#333333' }}
                />
              </div>
              {cert.issuer && (
                <div style={{ fontSize: '12px', color: '#666666' }}>
                  <EditableText
                    value={cert.issuer}
                    onChange={(v: string) => updateField(`certifications.${i}.issuer`, v)}
                    style={{ color: '#666666', display: 'inline' }}
                  />
                  {cert.date && (
                    <>
                      {' • '}
                      <EditableText
                        value={cert.date}
                        onChange={(v: string) => updateField(`certifications.${i}.date`, v)}
                        style={{ color: '#666666', display: 'inline' }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              margin: 0,
              paddingBottom: '6px',
              borderBottom: '3px solid #000000',
              flex: 1,
            }}>
              PROJECTS
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('projects', [...(data.projects || []), { name: 'Project', description: 'Description' }])
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#000000',
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
          {data.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: '16px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '4px',
              }}>
                <EditableText
                  value={project.name}
                  onChange={(v: string) => updateField(`projects.${i}.name`, v)}
                  style={{ color: '#000000' }}
                />
              </div>
              {project.description && (
                <p style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: '13px',
                  color: '#333333',
                  lineHeight: 1.6,
                }}>
                  <EditableText
                    value={project.description}
                    onChange={(v: string) => updateField(`projects.${i}.description`, v)}
                    multiline
                    style={{ color: '#333333' }}
                  />
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      </div>
    </div>
  );
};
