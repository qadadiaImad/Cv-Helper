/**
 * MERCURY TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Professional layout with photo on left and gray section backgrounds
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const MercuryFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  const updateArrayField = (arrayName: string, index: number, field: string, value: any) => {
    onFieldChange(`${arrayName}.${index}.${field}`, value)
  }

  const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <span className={className} style={style}>{value}</span>
  )

  return (
    <div style={{
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      padding: '0',
      fontFamily: 'Georgia, serif',
      backgroundColor: '#e8e8e8',
      color: '#5a5a5a',
      minHeight: '1200px',
    }}>
      {/* Header with Photo on Left */}
      <header style={{ padding: '50px 60px 40px', backgroundColor: '#e8e8e8', display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        {data.personal?.photo?.url && (
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#fff',
          }}>
            <img src={data.personal.photo.url} alt={data.personal?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px', color: '#2c2c2c' }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
            />
          </h1>
          {data.personal?.title && (
            <p style={{ fontSize: '16px', color: '#6a6a6a', marginBottom: '15px' }}>
              <EditableText
                value={data.personal.title}
                onChange={(v: string) => updateField('personal.title', v)}
              />
            </p>
          )}
          
          {/* Contact Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: '#5a5a5a' }}>
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✉</span> <EditableText value={data.personal.email} onChange={(v: string) => updateField('personal.email', v)} />
              </div>
            )}
            {data.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📞</span> <EditableText value={data.personal.phone} onChange={(v: string) => updateField('personal.phone', v)} />
              </div>
            )}
            {data.personal?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📍</span> <EditableText value={data.personal.location} onChange={(v: string) => updateField('personal.location', v)} />
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>in</span> <EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', padding: '12px', backgroundColor: '#d9d9d9', marginBottom: '0', color: '#4a4a4a' }}>Profile</h2>
        <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '11px', lineHeight: '1.7', textAlign: 'justify', color: '#5a5a5a' }}>
            <EditableText
              value={data.summary || 'Click to add profile...'}
              onChange={(v: string) => updateField('summary', v)}
              multiline
            />
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#d9d9d9', padding: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', flex: 1, margin: 0, color: '#4a4a4a' }}>Work Experience</h2>
          {editMode && (
            <button
              onClick={() => {
                const newExp = { company: 'Company Name', position: 'Position Title', startDate: 'Start Date', endDate: 'End Date', location: '', achievements: ['Key achievement'] }
                onFieldChange('experience', [...(data.experience || []), newExp])
              }}
              style={{ padding: '4px 12px', backgroundColor: '#4a4a4a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', fontWeight: '600' }}
            >
              + Add
            </button>
          )}
        </div>
        <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
              {editMode && (
                <button
                  onClick={() => onFieldChange('experience', data.experience!.filter((_, index) => index !== i))}
                  style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', fontWeight: '600' }}
                >
                  ✕
                </button>
              )}
              <div style={{ fontSize: '10px', color: '#6a6a6a' }}>
                <p style={{ marginBottom: '2px', fontWeight: 'bold' }}>
                  <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate={true} />
                  {' – '}
                  <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate={true} />
                </p>
                {exp.location && <p><EditableText value={exp.location} onChange={(v: string) => updateArrayField('experience', i, 'location', v)} /></p>}
              </div>
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: '#2c2c2c' }}>
                  <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
                </h3>
                <p style={{ fontSize: '11px', marginBottom: '8px', color: '#5a5a5a' }}>
                  <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
                </p>
                {exp.achievements && (
                  <ul style={{ fontSize: '10px', lineHeight: '1.6', paddingLeft: '15px', color: '#6a6a6a', margin: 0 }}>
                    {exp.achievements.map((ach, j) => (
                      <li key={j} style={{ marginBottom: '4px' }}>
                        <EditableText
                          value={ach}
                          onChange={(v: string) => {
                            const newAchievements = [...exp.achievements!]
                            newAchievements[j] = v
                            updateArrayField('experience', i, 'achievements', newAchievements)
                          }}
                          multiline
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#d9d9d9', padding: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', flex: 1, margin: 0, color: '#4a4a4a' }}>Education</h2>
            {editMode && (
              <button
                onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University Name', degree: 'Degree', field: 'Field of Study', startDate: 'Start Year', endDate: 'End Year' }])}
                style={{ padding: '4px 12px', backgroundColor: '#4a4a4a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', fontWeight: '600' }}
              >
                + Add
              </button>
            )}
          </div>
          <div style={{ padding: '30px 60px', backgroundColor: '#fff' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '20px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
                {editMode && (
                  <button
                    onClick={() => onFieldChange('education', data.education!.filter((_, index) => index !== i))}
                    style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', fontWeight: '600' }}
                  >
                    ✕
                  </button>
                )}
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', color: '#2c2c2c' }}>
                  <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
                  {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
                </h3>
                <p style={{ fontSize: '11px', marginBottom: '4px', color: '#5a5a5a' }}>
                  <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
                </p>
                <p style={{ fontSize: '10px', color: '#6a6a6a' }}>
                  <EditableText value={edu.startDate || ''} onChange={(v: string) => updateArrayField('education', i, 'startDate', v)} isDate={true} />
                  {' – '}
                  <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate={true} />
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#d9d9d9', padding: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', flex: 1, margin: 0, color: '#4a4a4a' }}>Skills</h2>
            {editMode && (
              <button
                onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])}
                style={{ padding: '4px 12px', backgroundColor: '#4a4a4a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', fontWeight: '600' }}
              >
                + Add
              </button>
            )}
          </div>
          <div style={{ padding: '30px 60px', backgroundColor: '#fff', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {data.skills.map((skill, i) => (
              <div key={i} style={{ padding: '6px 12px', backgroundColor: '#e8e8e8', borderRadius: '4px', fontSize: '10px', color: '#5a5a5a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <EditableText value={skill} onChange={(v: string) => { const newSkills = [...data.skills!]; newSkills[i] = v; onFieldChange('skills', newSkills) }} />
                {editMode && (
                  <button
                    onClick={() => onFieldChange('skills', data.skills!.filter((_, index) => index !== i))}
                    style={{ padding: '1px 4px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '8px' }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
