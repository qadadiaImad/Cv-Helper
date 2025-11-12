/**
 * TEMPLATE 28 - GEOMETRIC CORAL - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const GeometricCoralFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      position: 'relative',
    }}>
      {/* Geometric Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '320px',
        overflow: 'hidden',
        zIndex: 0,
      }}>
        {/* Navy triangle - left side */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderTop: '320px solid #3d4c5f',
          borderRight: '240px solid transparent',
        }} />
        {/* Coral diagonal section - top right */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: '195px',
          height: '320px',
          background: 'linear-gradient(135deg, #e88d7a 0%, #d97764 100%)',
        }} />
        {/* White diagonal overlay - bottom portion */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '195px',
          right: 0,
          height: '220px',
          backgroundColor: '#ffffff',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        }} />
      </div>

      {/* Left Sidebar */}
      <aside style={{
        width: '195px',
        backgroundColor: '#e8e6e1',
        padding: '30px 20px',
        position: 'relative',
        zIndex: 1,
        flexShrink: 0,
      }}>
        {/* Photo */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#d8d6d1',
          marginBottom: '30px',
          border: '4px solid #f5f3ee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
            <div style={{ width: '100%', height: '100%', background: '#d0ccc5' }} />
          )}
        </div>

        {/* Professional Skills */}
        <section style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#3d4c5f',
              textTransform: 'uppercase',
              margin: 0,
              letterSpacing: '1px',
              flex: 1,
            }}>Professional Skills</h2>
            {editMode && (
              <button
                onClick={() => {
                  onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                }}
                style={{
                  padding: '2px 6px',
                  backgroundColor: '#d97764',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
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
          {data.skills && data.skills.length > 0 && (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.skills.slice(0, 8).map((skill, i) => (
                <li key={i} style={{
                  fontSize: '11px',
                  color: '#666',
                  marginBottom: '8px',
                  lineHeight: '1.4',
                  position: 'relative',
                  paddingRight: editMode ? '25px' : '0',
                }}>
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
          )}
        </section>

        {/* Personal Skills */}
        {data.interests && data.interests.length > 0 && (
          <section style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#3d4c5f',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1px',
                flex: 1,
              }}>Personal Skills</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('interests', [...(data.interests || []), { name: 'New Interest' }])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#d97764',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
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
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {data.interests.slice(0, 6).map((interest, i) => {
                const interestName = typeof interest === 'string' ? interest : interest.name
                return (
                  <li key={i} style={{
                    fontSize: '11px',
                    color: '#666',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    position: 'relative',
                    paddingRight: editMode ? '25px' : '0',
                  }}>
                    <EditableText
                      value={interestName}
                      onChange={(v: string) => {
                        const newInterests = [...data.interests!]
                        newInterests[i] = typeof interest === 'string' ? v : { ...interest, name: v }
                        onFieldChange('interests', newInterests)
                      }}
                      style={{ color: '#666', display: 'inline' }}
                    />
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

        {/* Contact */}
        <section style={{ marginBottom: '35px' }}>
          <h2 style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#3d4c5f',
            textTransform: 'uppercase',
            marginBottom: '15px',
            letterSpacing: '1px',
          }}>Contact</h2>
          <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8' }}>
            {data.personal?.phone && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>P:</span>{' '}
                <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
            {data.personal?.email && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>E:</span>{' '}
                <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
            {data.personal?.website && (
              <div style={{ marginBottom: '6px' }}>
                <span style={{ fontWeight: 'bold', color: '#3d4c5f' }}>W:</span>{' '}
                <EditableText
                  value={data.personal.website}
                  onChange={(v: string) => updateField('personal.website', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Social */}
        {data.personal?.linkedIn && (
          <section>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#3d4c5f',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '1px',
            }}>Social</h2>
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '6px' }}>
                fb.me/<EditableText
                  value={data.personal.linkedIn.split('/').pop() || 'username'}
                  onChange={(v: string) => updateField('personal.linkedIn', `https://linkedin.com/in/${v}`)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
              <div style={{ marginBottom: '6px' }}>
                @<EditableText
                  value={data.personal.linkedIn.split('/').pop() || 'username'}
                  onChange={(v: string) => updateField('personal.linkedIn', `https://linkedin.com/in/${v}`)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
              <div>
                @<EditableText
                  value={data.personal.linkedIn.split('/').pop() || 'username'}
                  onChange={(v: string) => updateField('personal.linkedIn', `https://linkedin.com/in/${v}`)}
                  style={{ color: '#666', display: 'inline' }}
                />tweets
              </div>
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '140px 50px 50px 50px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '300',
            color: '#d97764',
            margin: 0,
            marginBottom: '5px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            lineHeight: '1.1',
          }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#d97764' }}
            />
          </h1>
          <div style={{
            fontSize: '13px',
            color: '#d4b5ad',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            <EditableText
              value={data.personal?.title || 'Your Title'}
              onChange={(v: string) => updateField('personal.title', v)}
              style={{ color: '#d4b5ad' }}
            />
          </div>
        </div>

        {/* About */}
        {data.summary && (
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#d97764',
              textTransform: 'uppercase',
              marginBottom: '15px',
              letterSpacing: '1.5px',
            }}>About</h2>
            <p style={{
              fontSize: '11px',
              color: '#666',
              lineHeight: '1.7',
              margin: 0,
            }}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                multiline
                style={{ color: '#666' }}
              />
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#d97764',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
                flex: 1,
              }}>Work Experience</h2>
              {editMode && (
                <button
                  onClick={() => {
                    const newExp = {
                      company: 'Company',
                      position: 'Position',
                      startDate: 'Start',
                      endDate: 'End',
                      achievements: []
                    }
                    onFieldChange('experience', [...(data.experience || []), newExp])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#d97764',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
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
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '3px',
                  textTransform: 'uppercase',
                }}>
                  <EditableText
                    value={exp.position}
                    onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                    style={{ color: '#3d4c5f' }}
                  />
                </h3>
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                  marginBottom: '10px',
                }}>
                  <EditableText
                    value={exp.company}
                    onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                    style={{ color: '#999', display: 'inline' }}
                  />
                  {' | '}
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
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{
                    margin: 0,
                    paddingLeft: '18px',
                    fontSize: '10px',
                    color: '#666',
                    lineHeight: '1.6',
                  }}>
                    {exp.achievements.slice(0, 3).map((achievement, j) => (
                      <li key={j} style={{ marginBottom: '5px' }}>
                        <EditableText
                          value={achievement}
                          onChange={(v: string) => {
                            const newExp = [...data.experience!]
                            const newAchievements = [...newExp[i].achievements]
                            newAchievements[j] = v
                            newExp[i] = { ...newExp[i], achievements: newAchievements }
                            onFieldChange('experience', newExp)
                          }}
                          multiline
                          style={{ color: '#666', display: 'inline' }}
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
          <section style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#d97764',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
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
                    backgroundColor: '#d97764',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
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
              <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
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
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '3px',
                  textTransform: 'uppercase',
                }}>
                  <EditableText
                    value={edu.degree}
                    onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                    style={{ color: '#3d4c5f' }}
                  />
                </h3>
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                }}>
                  <EditableText
                    value={edu.institution}
                    onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                    style={{ color: '#999', display: 'inline' }}
                  />
                  {' | '}
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
                {edu.gpa && (
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '3px' }}>
                    GPA{' '}
                    <EditableText
                      value={edu.gpa}
                      onChange={(v: string) => updateField(`education.${i}.gpa`, v)}
                      style={{ color: '#666', display: 'inline' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#d97764',
                textTransform: 'uppercase',
                margin: 0,
                letterSpacing: '1.5px',
                flex: 1,
              }}>Awards</h2>
              {editMode && (
                <button
                  onClick={() => {
                    const newAward = {
                      title: 'Award Title',
                      issuer: 'Organization',
                      date: new Date().getFullYear().toString()
                    }
                    onFieldChange('awards', [...(data.awards || []), newAward])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#d97764',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
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
            {data.awards.map((award, i) => (
              <div key={i} style={{ marginBottom: '15px', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
                {editMode && (
                  <button
                    onClick={() => {
                      const newAwards = data.awards!.filter((_, index) => index !== i)
                      onFieldChange('awards', newAwards)
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
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#3d4c5f',
                  margin: 0,
                  marginBottom: '3px',
                  textTransform: 'uppercase',
                }}>
                  <EditableText
                    value={award.title}
                    onChange={(v: string) => updateField(`awards.${i}.title`, v)}
                    style={{ color: '#3d4c5f' }}
                  />
                </h3>
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                }}>
                  <EditableText
                    value={award.issuer}
                    onChange={(v: string) => updateField(`awards.${i}.issuer`, v)}
                    style={{ color: '#999', display: 'inline' }}
                  />
                  {' | '}
                  <EditableText
                    value={award.date}
                    onChange={(v: string) => updateField(`awards.${i}.date`, v)}
                    style={{ color: '#999', display: 'inline' }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
