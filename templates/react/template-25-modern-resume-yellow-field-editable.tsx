/**
 * MODERN RESUME YELLOW TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const ModernResumeYellowFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      height: '100vh',
      fontFamily: "'Poppins', 'Arial', sans-serif",
      display: 'flex',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }}>
      {/* Left Sidebar - Yellow + Navy */}
      <aside style={{
        width: '195.5px',
        background: '#1e2532',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexShrink: 0,
        height: '100%',
      }}>
        {/* Yellow section */}
        <div style={{
          background: '#FDB913',
          padding: '140px 25px 190px',
          position: 'relative',
        }}>
          {/* Photo and Name */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            position: 'relative',
            marginTop: '-140px',
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: data.personal?.photo?.url ? 'transparent' : 'white',
              margin: '0 auto 25px',
              overflow: 'hidden',
              border: '8px solid #1e2532',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              position: 'relative',
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
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '8px',
              textAlign: 'center',
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
              <EditableText
                value={data.personal?.fullName || 'Your Name'}
                onChange={(v: string) => updateField('personal.fullName', v)}
                style={{ color: 'white' }}
              />
            </h2>
            <p style={{
              fontSize: '13px',
              color: 'white',
              textAlign: 'center',
              fontWeight: 300,
              opacity: 0.95,
            }}>
              <EditableText
                value={data.personal?.title || 'Professional'}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: 'white' }}
              />
            </p>
          </div>
        </div>

        {/* Navy section */}
        <div style={{ background: '#1e2532', padding: '30px 25px', flex: 1, overflowY: 'auto' }}>
          {/* Contact */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{
                width: '28px',
                height: '28px',
                background: '#FDB913',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
              }}>📞</span>
              Contact
            </h3>
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
                <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>✉️</span>
                <span>
                  <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    style={{ color: 'white', display: 'inline' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
                <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>📞</span>
                <span>
                  <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    style={{ color: 'white', display: 'inline' }}
                  />
                </span>
              </div>
            )}
            {data.personal?.website && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', gap: '8px', lineHeight: 1.5 }}>
                <span style={{ color: '#FDB913', fontSize: '12px', flexShrink: 0 }}>🌐</span>
                <span>
                  <EditableText
                    value={data.personal.website}
                    onChange={(v: string) => updateField('personal.website', v)}
                    style={{ color: 'white', display: 'inline' }}
                  />
                </span>
              </div>
            )}
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1,
                }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    background: '#FDB913',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>⚡</span>
                  Skills
                </h3>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                    }}
                    style={{
                      padding: '2px 5px',
                      backgroundColor: '#FDB913',
                      color: '#1e2532',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '8px',
                      fontWeight: '600'
                    }}
                  >
                    +
                  </button>
                )}
              </div>
              {data.skills.slice(0, 5).map((skill, i) => (
                <div key={i} style={{ marginBottom: '12px', position: 'relative', paddingRight: editMode ? '18px' : '0' }}>
                  <div style={{ fontSize: '10px', marginBottom: '5px', fontWeight: 400 }}>
                    <EditableText
                      value={skill}
                      onChange={(v: string) => {
                        const newSkills = [...data.skills!]
                        newSkills[i] = v
                        onFieldChange('skills', newSkills)
                      }}
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      background: '#FDB913',
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
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1,
                }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    background: '#FDB913',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0,
                  }}>🌍</span>
                  Languages
                </h3>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                    }}
                    style={{
                      padding: '2px 5px',
                      backgroundColor: '#FDB913',
                      color: '#1e2532',
                      border: 'none',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '8px',
                      fontWeight: '600'
                    }}
                  >
                    +
                  </button>
                )}
              </div>
              <div style={{ fontSize: '10px', lineHeight: 1.8 }}>
                {data.languages.map((lang, i) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  return (
                    <div key={i} style={{ position: 'relative', paddingRight: editMode ? '18px' : '0', marginBottom: '5px' }}>
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
                        style={{ color: 'white' }}
                      />
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
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content - White */}
      <main style={{
        flex: 1,
        background: '#f8f8f8',
        padding: '40px 40px',
        overflowY: 'auto',
      }}>
        {/* Profile */}
        {data.summary && (
          <section style={{
            marginBottom: '30px',
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f0f0f0',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: '#FDB913',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
              }}>👤</div>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
                Profile
              </h2>
            </div>
            <p style={{ fontSize: '11px', color: '#555', lineHeight: 1.8, textAlign: 'justify' }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#555' }}
              />
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{
            marginBottom: '30px',
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#FDB913',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}>💼</div>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
                  Experience
                </h2>
              </div>
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
                    backgroundColor: '#FDB913',
                    color: '#1e2532',
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
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '25px', paddingRight: editMode ? '25px' : '0' }}>
                <div style={{
                  content: '',
                  position: 'absolute',
                  left: 0,
                  top: '6px',
                  width: '12px',
                  height: '12px',
                  background: '#FDB913',
                  borderRadius: '50%',
                }} />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1e2532' }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#1e2532' }}
                    />
                  </div>
                  <div style={{ fontSize: '10px', color: '#999', fontStyle: 'italic' }}>
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
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                  <EditableText
                    value={exp.company}
                    onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    style={{ color: '#666' }}
                  />
                </div>
                {exp.description && (
                  <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.7 }}>
                    <EditableText
                      value={exp.description}
                      onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                      multiline
                      style={{ color: '#555' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section style={{
            marginBottom: '30px',
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#FDB913',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}>🎓</div>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
                  Education
                </h2>
              </div>
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
                    backgroundColor: '#FDB913',
                    color: '#1e2532',
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
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '25px', paddingRight: editMode ? '25px' : '0' }}>
                <div style={{
                  content: '',
                  position: 'absolute',
                  left: 0,
                  top: '6px',
                  width: '12px',
                  height: '12px',
                  background: '#FDB913',
                  borderRadius: '50%',
                }} />
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
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#1e2532', marginBottom: '3px' }}>
                  <EditableText
                    value={edu.degree}
                    onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                    style={{ color: '#1e2532' }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
                  <EditableText
                    value={edu.institution}
                    onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    style={{ color: '#666' }}
                  />
                </div>
                <div style={{ fontSize: '10px', color: '#555' }}>
                  <EditableText
                    value={edu.startDate}
                    onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                    style={{ color: '#555', display: 'inline' }}
                  />
                  {' - '}
                  <EditableText
                    value={edu.endDate}
                    onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                    style={{ color: '#555', display: 'inline' }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section style={{
            marginBottom: '30px',
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f0f0f0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#FDB913',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  flexShrink: 0,
                }}>📁</div>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e2532', textTransform: 'capitalize' }}>
                  Portfolio
                </h2>
              </div>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('projects', [...(data.projects || []), { name: 'Project', description: 'Description' }])
                  }}
                  style={{
                    padding: '3px 8px',
                    backgroundColor: '#FDB913',
                    color: '#1e2532',
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
            {data.projects.map((project, i) => (
              <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
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
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1e2532', marginBottom: '5px' }}>
                  <EditableText
                    value={project.name}
                    onChange={(v: string) => updateField(`projects.${i}.name`, v)}
                    style={{ color: '#1e2532' }}
                  />
                </div>
                <div style={{ fontSize: '10px', color: '#555', lineHeight: 1.6 }}>
                  <EditableText
                    value={project.description}
                    onChange={(v: string) => updateField(`projects.${i}.description`, v)}
                    multiline
                    style={{ color: '#555' }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
