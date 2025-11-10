/**
 * IVY LEAGUE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const IvyLeagueFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '50px',
      }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '24px',
        padding: '6px 12px',
      }}>
        <h1 style={{
          fontFamily: "Volkhov, Georgia, serif",
          textTransform: 'uppercase',
          color: '#002b7f',
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: 700,
          marginBottom: '6px',
        }}>
          <EditableText
            value={data.personal?.fullName || 'Your Name'}
            onChange={(v: string) => updateField('personal.fullName', v)}
            style={{ color: '#002b7f' }}
          />
        </h1>
        {data.personal?.title && (
          <h2 style={{
            color: '#56acf2',
            fontSize: '18px',
            lineHeight: '22px',
            fontWeight: 400,
            marginBottom: '12px',
          }}>
            <EditableText
              value={data.personal.title}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#56acf2' }}
            />
          </h2>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          fontSize: '13px',
          lineHeight: '16px',
          color: '#333',
          flexWrap: 'wrap',
        }}>
          {data.personal?.email && (
            <span>
              <EditableText
                value={data.personal.email}
                onChange={(v: string) => updateField('personal.email', v)}
                style={{ color: '#333', display: 'inline' }}
              />
            </span>
          )}
          {data.personal?.location && (
            <>
              <span>•</span>
              <span>
                <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#333', display: 'inline' }}
                />
              </span>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: '24px', padding: '6px 12px' }}>
          <h3 style={{
            fontFamily: "Volkhov, Georgia, serif",
            borderBottom: '1px solid #002b7f',
            color: '#002b7f',
            fontSize: '18px',
            lineHeight: '23px',
            fontWeight: 700,
            marginBottom: '12px',
            paddingBottom: '4px',
          }}>
            Summary
          </h3>
          <p style={{
            fontSize: '13px',
            lineHeight: '18px',
            color: '#333',
            textAlign: 'left',
          }}>
            <EditableText
              value={data.summary}
              onChange={(v: string) => updateField('summary', v)}
              multiline
              style={{ color: '#333' }}
            />
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "Volkhov, Georgia, serif",
              borderBottom: '1px solid #002b7f',
              color: '#002b7f',
              fontSize: '18px',
              lineHeight: '23px',
              fontWeight: 700,
              margin: 0,
              paddingBottom: '4px',
              padding: '6px 12px 4px',
              flex: 1,
            }}>
              Experience
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
                  backgroundColor: '#002b7f',
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
            <div key={i} style={{ padding: '6px 12px', marginBottom: '12px', position: 'relative', paddingRight: editMode ? '30px' : '12px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newExp = data.experience!.filter((_, index) => index !== i)
                    onFieldChange('experience', newExp)
                  }}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '12px',
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '4px',
              }}>
                <div style={{
                  color: '#56acf2',
                  fontSize: '18px',
                  lineHeight: '22px',
                  fontWeight: 400,
                }}>
                  <EditableText
                    value={exp.company}
                    onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    style={{ color: '#56acf2' }}
                  />
                </div>
                <div style={{
                  fontSize: '15px',
                  lineHeight: '18px',
                  color: '#333',
                  textAlign: 'right',
                }}>
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
              </div>
              <div style={{
                color: '#002b7f',
                fontSize: '15px',
                lineHeight: '18px',
                fontWeight: 400,
              }}>
                <EditableText
                  value={exp.position}
                  onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                  style={{ color: '#002b7f' }}
                />
              </div>
              {exp.description && (
                <p style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#333',
                  marginTop: '8px',
                }}>
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
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "Volkhov, Georgia, serif",
              borderBottom: '1px solid #002b7f',
              color: '#002b7f',
              fontSize: '18px',
              lineHeight: '23px',
              fontWeight: 700,
              margin: 0,
              paddingBottom: '4px',
              padding: '6px 12px 4px',
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
                  padding: '3px 8px',
                  backgroundColor: '#002b7f',
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
            <div key={i} style={{ padding: '6px 12px', marginBottom: '12px', position: 'relative', paddingRight: editMode ? '30px' : '12px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newEdu = data.education!.filter((_, index) => index !== i)
                    onFieldChange('education', newEdu)
                  }}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '12px',
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  color: '#56acf2',
                  fontSize: '18px',
                  lineHeight: '22px',
                  fontWeight: 400,
                  flex: 1,
                }}>
                  <EditableText
                    value={edu.institution}
                    onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    style={{ color: '#56acf2' }}
                  />
                </div>
                <div style={{
                  fontSize: '15px',
                  lineHeight: '18px',
                  color: '#333',
                  fontWeight: 400,
                }}>
                  <EditableText
                    value={edu.startDate}
                    onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                    style={{ color: '#333', display: 'inline' }}
                  />
                  {' - '}
                  <EditableText
                    value={edu.endDate}
                    onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                    style={{ color: '#333', display: 'inline' }}
                  />
                </div>
              </div>
              <div style={{
                color: '#002b7f',
                fontSize: '15px',
                lineHeight: '18px',
                fontWeight: 400,
                marginTop: '4px',
              }}>
                <EditableText
                  value={edu.degree}
                  onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                  style={{ color: '#002b7f' }}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "Volkhov, Georgia, serif",
              borderBottom: '1px solid #002b7f',
              color: '#002b7f',
              fontSize: '18px',
              lineHeight: '23px',
              fontWeight: 700,
              margin: 0,
              paddingBottom: '4px',
              padding: '6px 12px 4px',
              flex: 1,
            }}>
              Certification
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('certifications', [...(data.certifications || []), { name: 'Certification', issuer: 'Issuer', date: 'Date' }])
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#002b7f',
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
            <div key={i} style={{ padding: '6px 12px', marginBottom: '8px', position: 'relative', paddingRight: editMode ? '30px' : '12px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newCerts = data.certifications!.filter((_, index) => index !== i)
                    onFieldChange('certifications', newCerts)
                  }}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '12px',
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
                color: '#56acf2',
                fontSize: '15px',
                lineHeight: '18px',
                fontWeight: 400,
              }}>
                <EditableText
                  value={cert.name}
                  onChange={(v: string) => updateField(`certifications.${i}.name`, v)}
                  style={{ color: '#56acf2' }}
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "Volkhov, Georgia, serif",
              borderBottom: '1px solid #002b7f',
              color: '#002b7f',
              fontSize: '18px',
              lineHeight: '23px',
              fontWeight: 700,
              margin: 0,
              paddingBottom: '4px',
              padding: '6px 12px 4px',
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
                  padding: '3px 8px',
                  backgroundColor: '#002b7f',
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
          <div style={{ padding: '6px 12px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {data.skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#333',
                  padding: '4px 8px',
                  background: '#f0f0f0',
                  borderRadius: '4px',
                  position: 'relative',
                  paddingRight: editMode ? '24px' : '8px',
                }}>
                  <EditableText
                    value={skill}
                    onChange={(v: string) => {
                      const newSkills = [...data.skills!]
                      newSkills[i] = v
                      onFieldChange('skills', newSkills)
                    }}
                    style={{ color: '#333', display: 'inline' }}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const newSkills = data.skills!.filter((_, index) => index !== i)
                        onFieldChange('skills', newSkills)
                      }}
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
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
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{
              fontFamily: "Volkhov, Georgia, serif",
              borderBottom: '1px solid #002b7f',
              color: '#002b7f',
              fontSize: '18px',
              lineHeight: '23px',
              fontWeight: 700,
              margin: 0,
              paddingBottom: '4px',
              padding: '6px 12px 4px',
              flex: 1,
            }}>
              Projects
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('projects', [...(data.projects || []), { name: 'Project', description: 'Description' }])
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: '#002b7f',
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
            <div key={i} style={{ padding: '6px 12px', marginBottom: '12px', position: 'relative', paddingRight: editMode ? '30px' : '12px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newProjects = data.projects!.filter((_, index) => index !== i)
                    onFieldChange('projects', newProjects)
                  }}
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '12px',
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
                color: '#56acf2',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 400,
              }}>
                <EditableText
                  value={project.name}
                  onChange={(v: string) => updateField(`projects.${i}.name`, v)}
                  style={{ color: '#56acf2' }}
                />
              </div>
              {project.description && (
                <p style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#333',
                  marginTop: '8px',
                }}>
                  <EditableText
                    value={project.description}
                    onChange={(v: string) => updateField(`projects.${i}.description`, v)}
                    multiline
                    style={{ color: '#333' }}
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
