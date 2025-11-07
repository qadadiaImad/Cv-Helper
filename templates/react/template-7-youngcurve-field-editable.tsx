/**
 * YOUNGCURVE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Academic CV with burgundy accents and photo
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const YoungCurveFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  const accentColor = '#8B1538' // Burgundy/maroon
  
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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '50px 60px',
      fontFamily: 'serif',
      backgroundColor: '#ffffff',
      color: '#000',
      minHeight: '1200px',
    }}>
      {/* Header with Name and Photo */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '35px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0', fontFamily: 'Georgia, "Times New Roman", serif' }}>
            <EditableText value={data.personal?.fullName || 'Your Name'} onChange={(v: string) => updateField('personal.fullName', v)} />
            {data.personal?.title && (
              <>, <EditableText value={data.personal.title} onChange={(v: string) => updateField('personal.title', v)} /></>
            )}
          </h1>
          
          {/* Contact Info */}
          <div style={{ fontSize: '9px', color: '#333', lineHeight: '1.6' }}>
            {data.personal?.email && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontSize: '11px' }}>✉</span> <EditableText value={data.personal.email} onChange={(v: string) => updateField('personal.email', v)} />
              </p>
            )}
            {data.personal?.linkedIn && (
              <p style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: accentColor, fontWeight: 'bold' }}>in</span> <EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} />
              </p>
            )}
          </div>
        </div>

        {/* Photo */}
        {data.personal?.photo?.url && (
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginLeft: '30px',
            border: `3px solid ${accentColor}`,
          }}>
            <img src={data.personal.photo.url} alt={data.personal?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Profile</h2>
          <p style={{ fontSize: '10px', lineHeight: '1.7', textAlign: 'justify' }}>
            <EditableText value={data.summary} onChange={(v: string) => updateField('summary', v)} multiline />
          </p>
        </section>
      )}

      {/* Education */}
      <section style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Education</h2>
          {editMode && (
            <button onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University', degree: 'Degree', field: 'Field', startDate: 'Start', endDate: 'End' }])} style={{ padding: '4px 12px', backgroundColor: accentColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '15px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('education', data.education!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold' }}>
                <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
              </h3>
              <span style={{ fontSize: '9px', color: '#666', whiteSpace: 'nowrap' }}>
                <EditableText value={edu.startDate || ''} onChange={(v: string) => updateArrayField('education', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate />
              </span>
            </div>
            <p style={{ fontSize: '10px', fontStyle: 'italic', color: '#333' }}>
              <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
              {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
            </p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Experience</h2>
          {editMode && (
            <button onClick={() => onFieldChange('experience', [...(data.experience || []), { company: 'Company', position: 'Position', startDate: 'Start', endDate: 'End', achievements: ['Achievement'] }])} style={{ padding: '4px 12px', backgroundColor: accentColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '18px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('experience', data.experience!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 'bold' }}>
                <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
              </h3>
              <span style={{ fontSize: '9px', color: '#666', whiteSpace: 'nowrap' }}>
                <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate />
              </span>
            </div>
            <p style={{ fontSize: '10px', fontStyle: 'italic', marginBottom: '5px', color: '#333' }}>
              <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
            </p>
            {exp.achievements && (
              <ul style={{ fontSize: '9px', lineHeight: '1.6', paddingLeft: '15px', color: '#333' }}>
                {exp.achievements.map((ach, j) => (
                  <li key={j} style={{ marginBottom: '2px' }}>
                    <EditableText value={ach} onChange={(v: string) => { const newAch = [...exp.achievements!]; newAch[j] = v; updateArrayField('experience', i, 'achievements', newAch) }} multiline />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', color: accentColor, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Skills</h2>
            {editMode && (
              <button onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])} style={{ padding: '4px 12px', backgroundColor: accentColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
            )}
          </div>
          <p style={{ fontSize: '10px', lineHeight: '1.8' }}>
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
