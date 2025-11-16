/**
 * HARVARD TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Minimal clean academic design - Education first
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const HarvardFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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
      maxWidth: '800px',
      margin: '0 auto',
      padding: '50px 40px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      backgroundColor: '#ffffff',
      color: '#000',
      minHeight: '1200px',
    }}>
      {/* Header - Simple centered */}
      <header style={{ marginBottom: '35px', textAlign: 'center', borderBottom: '1px solid #000', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'normal', marginBottom: '10px', letterSpacing: '0.5px' }}>
          <EditableText value={data.personal?.fullName || 'Your Name'} onChange={(v: string) => updateField('personal.fullName', v)} />
        </h1>
        <div style={{ fontSize: '11px', color: '#666', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span><EditableText value={data.personal?.email || ''} onChange={(v: string) => updateField('personal.email', v)} /></span>
          <span>|</span>
          <span><EditableText value={data.personal?.phone || ''} onChange={(v: string) => updateField('personal.phone', v)} /></span>
          {data.personal?.location && (
            <>
              <span>|</span>
              <span><EditableText value={data.personal.location} onChange={(v: string) => updateField('personal.location', v)} /></span>
            </>
          )}
          {data.personal?.linkedIn && (
            <>
              <span>|</span>
              <span><EditableText value={data.personal.linkedIn} onChange={(v: string) => updateField('personal.linkedIn', v)} /></span>
            </>
          )}
        </div>
      </header>

      {/* Education first (Harvard/Academic style) */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Education</h2>
          {editMode && (
            <button onClick={() => onFieldChange('education', [...(data.education || []), { institution: 'University', degree: 'Degree', field: 'Field', startDate: 'Start', endDate: 'End' }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.education && data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '15px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('education', data.education!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>
                <EditableText value={edu.institution || ''} onChange={(v: string) => updateArrayField('education', i, 'institution', v)} />
              </h3>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                <EditableText value={edu.startDate || ''} onChange={(v: string) => updateArrayField('education', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={edu.endDate || ''} onChange={(v: string) => updateArrayField('education', i, 'endDate', v)} isDate />
              </span>
            </div>
            <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '2px' }}>
              <EditableText value={edu.degree || ''} onChange={(v: string) => updateArrayField('education', i, 'degree', v)} />
              {edu.field && <> in <EditableText value={edu.field} onChange={(v: string) => updateArrayField('education', i, 'field', v)} /></>}
            </p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Experience</h2>
          {editMode && (
            <button onClick={() => onFieldChange('experience', [...(data.experience || []), { company: 'Company', position: 'Position', startDate: 'Start', endDate: 'End', achievements: ['Achievement'] }])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
          )}
        </div>
        {data.experience && data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px', position: 'relative', padding: editMode ? '8px' : '0', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '4px' }}>
            {editMode && <button onClick={() => onFieldChange('experience', data.experience!.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '4px', right: '4px', padding: '2px 6px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '9px' }}>✕</button>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold' }}>
                <EditableText value={exp.company || ''} onChange={(v: string) => updateArrayField('experience', i, 'company', v)} />
              </h3>
              <span style={{ fontSize: '11px', color: '#666', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                <EditableText value={exp.startDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)} isDate />
                {' – '}
                <EditableText value={exp.endDate || ''} onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)} isDate />
              </span>
            </div>
            <p style={{ fontSize: '11px', fontStyle: 'italic', marginBottom: '6px' }}>
              <EditableText value={exp.position || ''} onChange={(v: string) => updateArrayField('experience', i, 'position', v)} />
            </p>
            {exp.achievements && (
              <ul style={{ fontSize: '11px', lineHeight: '1.6', paddingLeft: '20px', color: '#333' }}>
                {exp.achievements.map((ach, j) => (
                  <li key={j} style={{ marginBottom: '3px' }}>
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
        <section style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Skills</h2>
            {editMode && (
              <button onClick={() => onFieldChange('skills', [...(data.skills || []), 'New Skill'])} style={{ padding: '4px 12px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '10px' }}>+ Add</button>
            )}
          </div>
          <p style={{ fontSize: '11px', lineHeight: '1.8', color: '#333' }}>
            {data.skills.map((skill, i) => (
              <span key={i}>
                <EditableText value={skill} onChange={(v: string) => { const newSkills = [...data.skills!]; newSkills[i] = v; onFieldChange('skills', newSkills) }} />
                {editMode && <button onClick={() => onFieldChange('skills', data.skills!.filter((_, idx) => idx !== i))} style={{ marginLeft: '4px', padding: '1px 4px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '8px' }}>✕</button>}
                {i < (data.skills?.length || 0) - 1 && ' • '}
              </span>
            ))}
          </p>
        </section>
      )}
    </div>
  )
}
