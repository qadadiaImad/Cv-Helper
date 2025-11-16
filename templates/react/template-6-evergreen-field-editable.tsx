/**
 * EVERGREEN TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Two-column layout with dark header, photo on left, and skill progress bars
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const EvergreenFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const updateField = (path: string, value: any) => onFieldChange(path, value)
  const updateArrayField = (arrayName: string, index: number, field: string, value: any) => {
    onFieldChange(`${arrayName}.${index}.${field}`, value)
  }

  const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <HtmlRenderer html={value} as="span" className={className} style={style} />
  )

  return (
    <div style={{
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fff',
      color: '#333',
      minHeight: '1200px',
    }}>
      {/* Header - Dark teal with photo */}
      <header style={{
        backgroundColor: '#546975',
        color: '#fff',
        padding: '40px 50px',
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
      }}>
        {/* Photo */}
        {data.personal?.photo?.url && (
          <div style={{
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#fff',
            border: '5px solid rgba(255,255,255,0.2)',
          }}>
            <img src={data.personal.photo.url} alt={data.personal?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Name and Contact */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '15px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 5px 0', display: 'inline' }}>
              <EditableText value={data.personal?.fullName || 'Your Name'} onChange={(v: string) => updateField('personal.fullName', v)} />
            </h1>
            {data.personal?.title && (
              <span style={{ fontSize: '20px', marginLeft: '15px', fontWeight: '300' }}>
                <EditableText value={data.personal.title} onChange={(v: string) => updateField('personal.title', v)} />
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
            {data.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✉</span> <EditableText value={data.personal.email} onChange={(v: string) => updateField('personal.email', v)} />
              </div>
            )}
            {data.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📞</span> <EditableText value={data.personal.phone} onChange={(v: string) => updateField('personal.phone', v)} />
              </div>
            )}
            {data.personal?.linkedIn && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>in</span> <EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} />
              </div>
            )}
            {data.personal?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1 / -1' }}>
                <span>📍</span> <EditableText value={data.personal.location} onChange={(v: string) => updateField('personal.location', v)} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr' }}>
        {/* Left Column - Beige */}
        <aside style={{ backgroundColor: '#f5f3f0', padding: '40px 35px' }}>
          {/* Profile */}
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>Profile</h2>
            <div style={{ fontSize: '11px', lineHeight: '1.7', textAlign: 'justify', color: '#444' }}>
              <EditableText value={data.summary || 'Click to add profile...'} onChange={(v: string) => updateField('summary', v)} multiline />
            </div>
          </section>

          {/* Skills with Progress Bars */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 }}>Skills</h2>
              {editMode && (
                <button onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])} style={{ padding: '2px 8px', backgroundColor: '#546975', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>+</button>
              )}
            </div>
            {data.skills && data.skills.slice(0, 6).map((skill, i) => (
              <div key={i} style={{ marginBottom: '20px', position: 'relative' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#222' }}>
                  <EditableText value={skill} onChange={(v: string) => { const newSkills = [...data.skills!]; newSkills[i] = v; onFieldChange('skills', newSkills) }} />
                  {editMode && (
                    <button onClick={() => onFieldChange('skills', data.skills!.filter((_, idx) => idx !== i))} style={{ marginLeft: '6px', padding: '1px 4px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '8px' }}>✕</button>
                  )}
                </h3>
                <div 
                  onClick={() => {
                    if (editMode) {
                      const currentLevel = 85 - (i * 5)
                      const newLevel = currentLevel >= 85 ? 60 : currentLevel + 5
                      // Note: This is a simplified example. In a real implementation, 
                      // you'd store skill levels separately in the data structure
                    }
                  }}
                  style={{
                    height: '6px',
                    backgroundColor: '#d5d5d5',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    cursor: editMode ? 'pointer' : 'default',
                  }}
                >
                  <div style={{
                    width: `${85 - (i * 5)}%`,
                    height: '100%',
                    backgroundColor: '#546975',
                    borderRadius: '3px',
                  }} />
                </div>
              </div>
            ))}
          </section>
        </aside>

        {/* Right Column - Light Gray */}
        <main style={{ backgroundColor: '#ebebeb', padding: '40px 45px' }}>
          {/* Professional Experience */}
          <section style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 }}>Professional Experience</h2>
              {editMode && (
                <button onClick={() => onFieldChange('experience', [...(data.experience || []), { company: 'Company', position: 'Position', startDate: 'Start', endDate: 'End', location: '', achievements: ['Achievement'] }])} style={{ padding: '4px 12px', backgroundColor: '#546975', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
              )}
            </div>
            {data.experience && data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '25px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #d5d5d5' : 'none', borderRadius: '4px' }}>
                {editMode && <button onClick={() => onFieldChange('experience', data.experience!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px', color: '#222' }}>
                  <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
                </h3>
                <p style={{ fontSize: '11px', marginBottom: '2px', color: '#444' }}>
                  <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
                  {' | '}
                  <EditableText value={exp.location || ''} onChange={(v: string) => updateArrayField('experience', i, 'location', v)} />
                </p>
                <p style={{ fontSize: '10px', marginBottom: '10px', color: '#666' }}>
                  <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate />
                  {' – '}
                  <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate />
                </p>
                {exp.achievements && (
                  <ul style={{ fontSize: '10px', lineHeight: '1.6', paddingLeft: '18px', color: '#444', margin: 0 }}>
                    {exp.achievements.map((ach, j) => (
                      <li key={j} style={{ marginBottom: '4px' }}>
                        <EditableText value={ach} onChange={(v: string) => { const newAch = [...exp.achievements!]; newAch[j] = v; updateArrayField('experience', i, 'achievements', newAch) }} multiline />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {/* Education */}
          <section style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 }}>Education</h2>
              {editMode && (
                <button onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University', degree: 'Degree', field: 'Field', endDate: 'Year', location: '' }])} style={{ padding: '4px 12px', backgroundColor: '#546975', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
              )}
            </div>
            {data.education && data.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '15px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #d5d5d5' : 'none', borderRadius: '4px' }}>
                {editMode && <button onClick={() => onFieldChange('education', data.education!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#222' }}>
                  <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
                  {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
                </h3>
                <p style={{ fontSize: '11px', color: '#444' }}>
                  <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
                  {' | '}
                  <EditableText value={edu.location || ''} onChange={(v: string) => updateArrayField('education', i, 'location', v)} />
                </p>
                <p style={{ fontSize: '10px', color: '#666' }}>
                  <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate />
                </p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
