/**
 * CLASSIC TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Traditional right-aligned header with clean layout
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const ClassicFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const updateField = (path: string, value: any) => onFieldChange(path, value)
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
      padding: '40px 50px',
      fontFamily: 'Times New Roman, serif',
      backgroundColor: '#ffffff',
      color: '#000',
      minHeight: '1200px',
    }}>
      {/* Header - Right aligned contact */}
      <header style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '6px', lineHeight: '1.2' }}>
              <EditableText value={data.personal?.fullName || 'Your Name'} onChange={(v: string) => updateField('personal.fullName', v)} />
            </h1>
            {data.personal?.title && (
              <p style={{ fontSize: '16px', color: '#555', fontStyle: 'italic' }}>
                <EditableText value={data.personal.title} onChange={(v: string) => updateField('personal.title', v)} />
              </p>
            )}
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', lineHeight: '1.6', minWidth: '200px' }}>
            <p><EditableText value={data.personal?.email || ''} onChange={(v: string) => updateField('personal.email', v)} /></p>
            <p><EditableText value={data.personal?.phone || ''} onChange={(v: string) => updateField('personal.phone', v)} /></p>
            {data.personal?.location && <p><EditableText value={data.personal.location} onChange={(v: string) => updateField('personal.location', v)} /></p>}
            {data.personal?.linkedIn && <p><EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} /></p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>PROFESSIONAL SUMMARY</h2>
        <p style={{ fontSize: '12px', lineHeight: '1.7', textAlign: 'justify', color: '#333' }}>
          <EditableText value={data.summary || 'Click to add summary...'} onChange={(v: string) => updateField('summary', v)} multiline />
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>EXPERIENCE</h2>
          {editMode && (
            <button onClick={() => onFieldChange('experience', [...(data.experience || []), { company: 'Company', position: 'Position', startDate: 'Start', endDate: 'End', achievements: ['Achievement'] }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('experience', data.experience!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }}>
                  <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
                </h3>
                <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#333' }}>
                  <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
                </p>
              </div>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate />
              </span>
            </div>
            {exp.location && <p style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}><EditableText value={exp.location} onChange={(v: string) => updateArrayField('experience', i, 'location', v)} /></p>}
            {exp.achievements && (
              <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', marginTop: '6px', color: '#333' }}>
                {exp.achievements.map((ach, j) => (
                  <li key={j} style={{ marginBottom: '3px' }}>
                    <EditableText value={ach} onChange={(v: string) => { const newAch = [...exp.achievements!]; newAch[j] = v; updateArrayField('experience', i, 'achievements', newAch) }} multiline />
                    {editMode && (
                      <button
                        onClick={() => {
                          const newAch = exp.achievements!.filter((_, idx) => idx !== j)
                          updateArrayField('experience', i, 'achievements', newAch)
                        }}
                        style={{
                          marginLeft: '8px',
                          padding: '2px 6px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '9px'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {editMode && (
              <button
                onClick={() => {
                  const newAch = [...(exp.achievements || []), 'New achievement']
                  updateArrayField('experience', i, 'achievements', newAch)
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  marginTop: '8px',
                  marginLeft: '20px'
                }}
              >
                + Add Achievement
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>EDUCATION</h2>
          {editMode && (
            <button onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University', degree: 'Degree', field: 'Field', startDate: 'Start', endDate: 'End' }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('education', data.education!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
                <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
                {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
              </h3>
              <p style={{ fontSize: '11px', color: '#333' }}>
                <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
              </p>
            </div>
            <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>
              <EditableText value={edu.startDate || ''} onChange={(v: string) => updateArrayField('education', i, 'startDate', v)} isDate />
              {' – '}
              <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate />
            </span>
          </div>
        ))}
      </section>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>SKILLS</h2>
            {editMode && (
              <button onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
            )}
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.8', color: '#333' }}>
            {data.skills.map((skill, i) => (
              <span key={i}>
                <EditableText value={skill} onChange={(v: string) => { const newSkills = [...data.skills!]; newSkills[i] = v; onFieldChange('skills', newSkills) }} />
                {editMode && <button onClick={() => onFieldChange('skills', data.skills!.filter((_, idx) => idx !== i))} style={{ marginLeft: '4px', padding: '1px 4px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '8px' }}>✕</button>}
                {i < data.skills.length - 1 && ' • '}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  )
}
