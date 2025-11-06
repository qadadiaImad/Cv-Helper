/**
 * ATLANTIC BLUE TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const AtlanticBlueFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  // Photo configuration
  const photoConfig = data.personal?.photo
  const photoSize = photoConfig?.size || 120
  const photoBorderRadius = photoConfig?.borderRadius ?? 50
  const photoUrl = photoConfig?.url
  const photoHidden = photoConfig?.effects?.hidden
  const photoGrayscale = photoConfig?.effects?.grayscale
  const photoBorder = photoConfig?.effects?.border

  // Helper to update nested fields
  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  // Helper to update array item field
  const updateArrayField = (arrayName: string, index: number, field: string, value: any) => {
    onFieldChange(`${arrayName}.${index}.${field}`, value)
  }

  const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <span className={className} style={style}>{value}</span>
  )

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      minHeight: '1200px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      {/* Left Sidebar - Dark Blue */}
      <aside style={{
        width: '280px',
        backgroundColor: '#1a3a52',
        color: '#ffffff',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>
        {/* Photo */}
        {photoUrl && !photoHidden && (
          <div style={{
            width: `${photoSize}px`,
            height: `${photoSize}px`,
            borderRadius: `${photoBorderRadius}%`,
            backgroundColor: '#ffffff',
            margin: '0 auto',
            overflow: 'hidden',
            border: photoBorder ? '4px solid rgba(255,255,255,0.3)' : '4px solid rgba(255,255,255,0.1)',
          }}>
            <img 
              src={photoUrl} 
              alt={data.personal?.fullName || 'Profile'} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: photoGrayscale ? 'grayscale(100%)' : 'none',
              }} 
            />
          </div>
        )}

        {/* Name & Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
            <EditableText
              value={data.personal?.fullName || 'Your Name'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#ffffff' }}
            />
          </h1>
          {data.personal?.title && (
            <p style={{ fontSize: '14px', opacity: 0.9, fontWeight: '300' }}>
              <EditableText
                value={data.personal.title}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: '#ffffff' }}
              />
            </p>
          )}
        </div>

        {/* Contact */}
        <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>
            CONTACT
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <p style={{ wordBreak: 'break-word' }}>
              ✉️ <EditableText
                value={data.personal?.email || 'email@example.com'}
                onChange={(v: string) => updateField('personal.email', v)}
                style={{ color: '#ffffff' }}
              />
            </p>
            <p>
              📱 <EditableText
                value={data.personal?.phone || '123-456-7890'}
                onChange={(v: string) => updateField('personal.phone', v)}
                style={{ color: '#ffffff' }}
              />
            </p>
            {data.personal?.location && (
              <p>
                📍 <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#ffffff' }}
                />
              </p>
            )}
            {data.personal?.website && (
              <p>
                🌐 <EditableText
                  value={data.personal.website}
                  onChange={(v: string) => updateField('personal.website', v)}
                  style={{ color: '#ffffff' }}
                />
              </p>
            )}
            {data.personal?.linkedIn && (
              <p>
                💼 <EditableText
                  value={data.personal.linkedIn}
                  onChange={(v: string) => updateField('personal.linkedIn', v)}
                  style={{ color: '#ffffff' }}
                />
              </p>
            )}
            {data.personal?.github && (
              <p>
                💻 <EditableText
                  value={data.personal.github}
                  onChange={(v: string) => updateField('personal.github', v)}
                  style={{ color: '#ffffff' }}
                />
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div style={{ fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px', flex: 1 }}>
              SKILLS
            </h3>
            {editMode && (
              <button
                onClick={() => {
                  const newSkills = [...(data.skills || []), 'New Skill']
                  onFieldChange('skills', newSkills)
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: '600'
                }}
              >
                + Add
              </button>
            )}
          </div>
          {data.skills && data.skills.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {data.skills.map((skill, i) => (
                <li key={i} style={{ padding: '6px 0 6px 12px', borderLeft: '3px solid #4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.1)', position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <EditableText
                    value={skill}
                    onChange={(v: string) => {
                      const newSkills = [...data.skills!]
                      newSkills[i] = v
                      onFieldChange('skills', newSkills)
                    }}
                    style={{ color: '#ffffff', flex: 1 }}
                  />
                  {editMode && (
                    <button
                      onClick={() => {
                        const newSkills = data.skills!.filter((_, index) => index !== i)
                        onFieldChange('skills', newSkills)
                      }}
                      style={{
                        padding: '2px 6px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '9px',
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
        </div>
      </aside>

      {/* Right Content Area - White */}
      <main style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '40px 50px',
      }}>
        {/* Experience Section */}
        <section style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px', flex: 1 }}>
              EXPERIENCE
            </h2>
            {editMode && (
              <button
                onClick={() => {
                  const newExp = {
                    company: 'Company Name',
                    position: 'Position Title',
                    startDate: 'Start Date',
                    endDate: 'End Date',
                    location: '',
                    achievements: ['Key achievement or responsibility']
                  }
                  const newExperiences = [...(data.experience || []), newExp]
                  onFieldChange('experience', newExperiences)
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginLeft: '12px'
                }}
              >
                + Add Experience
              </button>
            )}
          </div>
          {data.experience && data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px', position: 'relative', padding: '12px', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '8px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newExperiences = data.experience!.filter((_, index) => index !== i)
                    onFieldChange('experience', newExperiences)
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                >
                  🗑️ Delete
                </button>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a3a52' }}>
                    <EditableText
                      value={exp.position || ''}
                      onChange={(v: string) => updateArrayField('experience', i, 'position', v)}
                    />
                  </h3>
                  <p style={{ fontSize: '13px', color: '#4a90e2', fontWeight: '600' }}>
                    <EditableText
                      value={exp.company || ''}
                      onChange={(v: string) => updateArrayField('experience', i, 'company', v)}
                    />
                  </p>
                </div>
                <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  <EditableText
                    value={exp.startDate || ''}
                    onChange={(v: string) => updateArrayField('experience', i, 'startDate', v)}
                    isDate={true}
                  />
                  {' - '}
                  <EditableText
                    value={exp.endDate || ''}
                    onChange={(v: string) => updateArrayField('experience', i, 'endDate', v)}
                    isDate={true}
                  />
                </p>
              </div>
              {exp.achievements && (
                <ul style={{ fontSize: '12px', lineHeight: '1.7', color: '#333', paddingLeft: '20px' }}>
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} style={{ marginBottom: '4px' }}>
                      <EditableText
                        value={achievement}
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
          ))}
        </section>

        {/* Education Section */}
        <section style={{ marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px', flex: 1 }}>
              EDUCATION
            </h2>
            {editMode && (
              <button
                onClick={() => {
                  const newEdu = {
                    institution: 'University Name',
                    degree: 'Degree',
                    field: 'Field of Study',
                    startDate: 'Start Year',
                    endDate: 'End Year',
                    gpa: '',
                    honors: []
                  }
                  const newEducation = [...(data.education || []), newEdu]
                  onFieldChange('education', newEducation)
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginLeft: '12px'
                }}
              >
                + Add Education
              </button>
            )}
          </div>
          {data.education && data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '15px', position: 'relative', padding: '12px', border: editMode ? '1px solid #e5e7eb' : 'none', borderRadius: '8px' }}>
              {editMode && (
                <button
                  onClick={() => {
                    const newEducation = data.education!.filter((_, index) => index !== i)
                    onFieldChange('education', newEducation)
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                >
                  🗑️ Delete
                </button>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52' }}>
                    <EditableText
                      value={edu.degree || ''}
                      onChange={(v: string) => updateArrayField('education', i, 'degree', v)}
                    />
                    {' in '}
                    <EditableText
                      value={edu.field || ''}
                      onChange={(v: string) => updateArrayField('education', i, 'field', v)}
                    />
                  </h3>
                  <p style={{ fontSize: '13px', color: '#4a90e2' }}>
                    <EditableText
                      value={edu.institution || ''}
                      onChange={(v: string) => updateArrayField('education', i, 'institution', v)}
                    />
                  </p>
                </div>
                <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  <EditableText
                    value={edu.startDate || ''}
                    onChange={(v: string) => updateArrayField('education', i, 'startDate', v)}
                    isDate={true}
                  />
                  {' - '}
                  <EditableText
                    value={edu.endDate || ''}
                    onChange={(v: string) => updateArrayField('education', i, 'endDate', v)}
                    isDate={true}
                  />
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
