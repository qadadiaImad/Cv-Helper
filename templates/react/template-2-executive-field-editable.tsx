/**
 * EXECUTIVE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Single-column professional layout matching classic resume format
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const ExecutiveFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      padding: '50px 60px',
      fontFamily: 'serif',
      backgroundColor: '#ffffff',
      color: '#000',
      minHeight: '1200px',
    }}>
      {/* Header - Name and Title on same line */}
      <header style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0 }}>
            <EditableText value={data.personal?.fullName || 'Your Name'} onChange={(v: string) => updateField('personal.fullName', v)} />
          </h1>
          {data.personal?.title && (
            <span style={{ fontSize: '20px', fontStyle: 'italic', color: '#333' }}>
              <EditableText value={data.personal.title} onChange={(v: string) => updateField('personal.title', v)} />
            </span>
          )}
        </div>
        
        {/* Contact Info - Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', marginTop: '8px' }}>
          <div>
            {data.personal?.location && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>📍 <EditableText value={data.personal.location} onChange={(v: string) => updateField('personal.location', v)} /></p>}
            {data.personal?.phone && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>📱 <EditableText value={data.personal.phone} onChange={(v: string) => updateField('personal.phone', v)} /></p>}
          </div>
          <div>
            {data.personal?.email && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>✉️ <EditableText value={data.personal.email} onChange={(v: string) => updateField('personal.email', v)} /></p>}
            {data.personal?.linkedIn && <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>in <EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} /></p>}
          </div>
        </div>
      </header>

      {/* Profile */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '2px solid #000', paddingBottom: '4px' }}>Profile</h2>
        <div style={{ fontSize: '11px', lineHeight: '1.6', textAlign: 'justify' }}>
          <EditableText value={data.summary || 'Click to add profile...'} onChange={(v: string) => updateField('summary', v)} multiline />
        </div>
      </section>

      {/* Professional Experience */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '4px', margin: 0, flex: 1 }}>Professional Experience</h2>
          {editMode && (
            <button onClick={() => onFieldChange('experience', [...(data.experience || []), { company: 'Company', position: 'Position', startDate: 'Start', endDate: 'End', location: '', achievements: ['Achievement'] }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', marginLeft: '12px' }}>+ Add</button>
          )}
        </div>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '18px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('experience', data.experience!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', zIndex: 10 }}>✕</button>}
            <div style={{ fontSize: '10px' }}>
              <p style={{ marginBottom: '2px' }}>
                <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate />
              </p>
              {exp.location && <p style={{ color: '#666' }}><EditableText value={exp.location} onChange={(v: string) => updateArrayField('experience', i, 'location', v)} /></p>}
            </div>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
                <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
              </h3>
              <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px', color: '#333' }}>
                <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
              </p>
              {exp.achievements && (
                <ul style={{ fontSize: '10px', lineHeight: '1.5', paddingLeft: '15px', color: '#333', margin: 0 }}>
                  {exp.achievements.map((ach, j) => (
                    <li key={j} style={{ marginBottom: '3px' }}>
                      <EditableText value={ach} onChange={(v: string) => { const newAch = [...exp.achievements!]; newAch[j] = v; updateArrayField('experience', i, 'achievements', newAch) }} multiline />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '4px', margin: 0, flex: 1 }}>Education</h2>
          {editMode && (
            <button onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University', degree: 'Degree', field: 'Field', startDate: 'Start', endDate: 'End', location: '' }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', marginLeft: '12px' }}>+ Add</button>
          )}
        </div>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: '15px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('education', data.education!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px', zIndex: 10 }}>✕</button>}
            <div style={{ fontSize: '10px' }}>
              <p style={{ marginBottom: '2px' }}>
                <EditableText value={edu.startDate || ''} onChange={(v: string) => updateArrayField('education', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate />
              </p>
              {edu.location && <p style={{ color: '#666' }}><EditableText value={edu.location} onChange={(v: string) => updateArrayField('education', i, 'location', v)} /></p>}
            </div>
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px' }}>
                <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
                {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
              </h3>
              <p style={{ fontSize: '11px', color: '#333' }}>
                <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #000', paddingBottom: '4px', margin: 0, flex: 1 }}>Skills</h2>
            {editMode && (
              <button onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', marginLeft: '12px' }}>+ Add</button>
            )}
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.6' }}>
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
