/**
 * CREATIVE CV TEMPLATE - FIELD-LEVEL EDITABLE VERSION
 * Each field is individually editable inline with Add/Delete buttons
 * Includes: Philosophy, Most Proud Of, Donut Chart, Circle Photo
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineEditableField } from '@/components/builder/inline-editable-field'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

interface DailyActivity {
  label: string
  percentage: number
  color: string
}

export const CreativeCVFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
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

  // Default daily activities if not provided
  const dailyActivities: DailyActivity[] = (data as any).dailyActivities || [
    { label: 'Productive/Useful (at night)', percentage: 40, color: '#c41e3a' },
    { label: 'Sleep, beautiful sleep', percentage: 30, color: '#e8a5a5' },
    { label: 'Family time/relaxation', percentage: 20, color: '#f5d0d0' },
    { label: 'Hobbies/Fun with others', percentage: 10, color: '#fae5e5' },
  ]

  // Calculate donut chart segments
  const radius = 60
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header - Full Width with Circle Photo */}
      <header style={{
        background: '#ffffff',
        padding: '20px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid #e0e0e0',
        minHeight: '100px',
        width: '100%',
        flexShrink: 0,
        position: 'relative',
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#333',
            marginBottom: '5px',
            letterSpacing: '2px',
          }}>
            <EditableText
              value={data.personal?.fullName || 'BRIAN T. WAYNE'}
              onChange={(v: string) => updateField('personal.fullName', v)}
              style={{ color: '#333' }}
            />
          </h1>
          {data.personal?.title && (
            <p style={{ fontSize: '13px', color: '#c41e3a', fontStyle: 'italic' }}>
              <EditableText
                value={data.personal.title}
                onChange={(v: string) => updateField('personal.title', v)}
                style={{ color: '#c41e3a' }}
              />
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
          <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.8', textAlign: 'right' }}>
            {data.personal?.email && (
              <div>
                ✉ <EditableText
                  value={data.personal.email}
                  onChange={(v: string) => updateField('personal.email', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
            {data.personal?.phone && (
              <div>
                📱 <EditableText
                  value={data.personal.phone}
                  onChange={(v: string) => updateField('personal.phone', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
            {data.personal?.location && (
              <div>
                📍 <EditableText
                  value={data.personal.location}
                  onChange={(v: string) => updateField('personal.location', v)}
                  style={{ color: '#666', display: 'inline' }}
                />
              </div>
            )}
          </div>
          {/* Circle Photo with Name */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid #c41e3a',
            background: '#f9f9f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#c41e3a', textAlign: 'center', lineHeight: '1.2' }}>
              {data.personal?.fullName?.split(' ')[0] || 'Brian'}<br/>{data.personal?.fullName?.split(' ').slice(-1)[0] || 'Wayne'}
            </div>
          </div>
        </div>
      </header>

      {/* Content Wrapper */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <aside style={{ flex: '0 0 40%', padding: '25px 20px', background: '#ffffff' }}>
          {/* Experience */}
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '2px solid #c41e3a',
                letterSpacing: '0.5px',
                flex: 1,
              }}>Experience</h2>
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
                    padding: '2px 6px',
                    backgroundColor: '#c41e3a',
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
            {(data.experience || []).slice(0, 2).map((exp, i) => (
                <div key={i} style={{ marginBottom: '15px', paddingLeft: '15px', borderLeft: '2px solid #c41e3a', position: 'relative', paddingRight: editMode ? '25px' : '0' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '5px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#c41e3a',
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
                  <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '3px' }}>
                    <EditableText
                      value={exp.startDate}
                      onChange={(v: string) => updateField(`experience.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={exp.endDate || 'Present'}
                      onChange={(v: string) => updateField(`experience.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                    <EditableText
                      value={exp.position}
                      onChange={(v: string) => updateField(`experience.${i}.position`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v: string) => updateField(`experience.${i}.company`, v)}
                      style={{ color: '#c41e3a' }}
                    />
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '5px' }}>
                      <EditableText
                        value={exp.description}
                        onChange={(v: string) => updateField(`experience.${i}.description`, v)}
                        multiline
                        style={{ color: '#666' }}
                      />
                    </div>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', margin: '5px 0 0 15px', padding: 0 }}>
                      {exp.achievements.slice(0, 3).map((achievement, j) => (
                        <li key={j} style={{ marginBottom: '3px' }}>
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

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '5px',
                  borderBottom: '2px solid #c41e3a',
                  letterSpacing: '0.5px',
                  flex: 1,
                }}>Projects</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('projects', [...(data.projects || []), { name: 'Project', description: 'Description' }])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#c41e3a',
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
              {data.projects.slice(0, 2).map((proj, i) => (
                <div key={i} style={{ marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderLeft: '3px solid #c41e3a', position: 'relative', paddingRight: editMode ? '25px' : '10px' }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newProjects = data.projects!.filter((_, index) => index !== i)
                        onFieldChange('projects', newProjects)
                      }}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
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
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                    <EditableText
                      value={proj.name}
                      onChange={(v: string) => updateField(`projects.${i}.name`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.3' }}>
                    <EditableText
                      value={proj.description}
                      onChange={(v: string) => updateField(`projects.${i}.description`, v)}
                      multiline
                      style={{ color: '#666' }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* A Day of My Life - Donut Chart */}
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '2px solid #c41e3a',
                letterSpacing: '0.5px',
                flex: 1,
              }}>A Day of My Life</h2>
              {editMode && (
                <button
                  onClick={() => {
                    onFieldChange('dailyActivities', [...dailyActivities, { label: 'New Activity', percentage: 5, color: '#ddd' }])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#c41e3a',
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
              {/* Donut Chart */}
              <div style={{ position: 'relative', width: '150px', height: '150px', marginBottom: '20px' }}>
                <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: 'rotate(-90deg)' }}>
                  {dailyActivities.map((activity: DailyActivity, i: number) => {
                    const segmentLength = (activity.percentage / 100) * circumference
                    const currentOffset = offset
                    offset -= segmentLength
                    
                    return (
                      <circle
                        key={i}
                        cx="75"
                        cy="75"
                        r={radius}
                        fill="none"
                        stroke={activity.color}
                        strokeWidth="30"
                        strokeDasharray={`${segmentLength} ${circumference}`}
                        strokeDashoffset={currentOffset}
                      />
                    )
                  })}
                </svg>
                {/* Center white circle */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#fff',
                }} />
              </div>
              {/* Legend - Editable */}
              <div style={{ fontSize: '10px', lineHeight: '1.8', width: '100%' }}>
                {dailyActivities.map((activity: DailyActivity, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: i < dailyActivities.length - 1 ? '5px' : '0', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
                    <div style={{ width: '12px', height: '12px', background: activity.color, borderRadius: '2px', flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>
                      <EditableText
                        value={activity.label}
                        onChange={(v: string) => {
                          const newActivities = [...dailyActivities]
                          newActivities[i] = { ...newActivities[i], label: v }
                          onFieldChange('dailyActivities', newActivities)
                        }}
                        style={{ color: '#333', display: 'inline' }}
                      />
                    </span>
                    {editMode && (
                      <>
                        <input
                          type="number"
                          value={activity.percentage}
                          onChange={(e) => {
                            const newActivities = [...dailyActivities]
                            newActivities[i] = { ...newActivities[i], percentage: parseInt(e.target.value) || 0 }
                            onFieldChange('dailyActivities', newActivities)
                          }}
                          style={{
                            width: '35px',
                            padding: '2px 4px',
                            fontSize: '9px',
                            border: '1px solid #ddd',
                            borderRadius: '2px',
                            textAlign: 'center',
                          }}
                        />
                        <span style={{ fontSize: '9px', color: '#666' }}>%</span>
                        <button
                          onClick={() => {
                            const newActivities = dailyActivities.filter((_: DailyActivity, index: number) => index !== i)
                            onFieldChange('dailyActivities', newActivities)
                          }}
                          style={{
                            position: 'absolute',
                            top: '2px',
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
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '25px 30px', background: '#fafafa' }}>
          {/* Philosophy */}
          {data.summary && (
            <section style={{ marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '5px',
                borderBottom: '2px solid #c41e3a',
                letterSpacing: '0.5px',
              }}>My Life Philosophy</h2>
              <div style={{ background: '#fff', padding: '15px', borderLeft: '4px solid #c41e3a', fontStyle: 'italic', color: '#666', fontSize: '11px', lineHeight: '1.6' }}>
                "<EditableText
                  value={data.summary}
                  onChange={(v: string) => updateField('summary', v)}
                  multiline
                  style={{ color: '#666' }}
                />"
              </div>
            </section>
          )}

          {/* Most Proud Of */}
          <section style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                margin: 0,
                paddingBottom: '5px',
                borderBottom: '2px solid #c41e3a',
                letterSpacing: '0.5px',
                flex: 1,
              }}>Most Proud Of</h2>
              {editMode && (
                <button
                  onClick={() => {
                    const newAward = {
                      title: 'Achievement Title',
                      issuer: 'Organization',
                      date: new Date().getFullYear().toString(),
                      description: 'Description of achievement'
                    }
                    onFieldChange('awards', [...(data.awards || []), newAward])
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#c41e3a',
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
            <div style={{ background: '#fff', padding: '15px' }}>
              {(data.awards && data.awards.length > 0) ? (
                data.awards.slice(0, 3).map((award, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: i < Math.min(data.awards!.length, 3) - 1 ? '12px' : '0', position: 'relative', paddingRight: editMode ? '30px' : '0' }}>
                    <div style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      background: '#c41e3a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '18px',
                    }}>🏆</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                        <EditableText
                          value={award.title}
                          onChange={(v: string) => updateField(`awards.${i}.title`, v)}
                          style={{ color: '#333' }}
                        />
                      </div>
                      <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                        <EditableText
                          value={award.description || award.issuer}
                          onChange={(v: string) => updateField(`awards.${i}.description`, v)}
                          multiline
                          style={{ color: '#666' }}
                        />
                      </div>
                    </div>
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
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '10px', color: '#999', textAlign: 'center', padding: '10px' }}>
                  {editMode ? 'Click "+ Add" to add achievements' : 'No achievements to display'}
                </div>
              )}
            </div>
          </section>

          {/* Strengths (Skills as tags) */}
          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '5px',
                  borderBottom: '2px solid #c41e3a',
                  letterSpacing: '0.5px',
                  flex: 1,
                }}>Strengths</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('skills', [...(data.skills || []), 'New Skill'])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#c41e3a',
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: '#fff' }}>
                {data.skills.slice(0, 6).map((skill, i) => (
                  <span key={i} style={{
                    padding: '5px 12px',
                    background: '#f0f0f0',
                    borderRadius: '15px',
                    fontSize: '10px',
                    color: '#333',
                    border: '1px solid #ddd',
                    position: 'relative',
                    paddingRight: editMode ? '28px' : '12px',
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
                          top: '3px',
                          right: '3px',
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
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '5px',
                  borderBottom: '2px solid #c41e3a',
                  letterSpacing: '0.5px',
                  flex: 1,
                }}>Languages</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      onFieldChange('languages', [...(data.languages || []), { name: 'Language', proficiency: 'Professional' }])
                    }}
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#c41e3a',
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
              {data.languages.map((lang, i) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                // Map proficiency to level (1-5)
                const proficiencyToLevel: Record<string, number> = {
                  'Beginner': 1,
                  'Elementary': 2,
                  'Intermediate': 3,
                  'Professional': 4,
                  'Advanced': 4,
                  'Fluent': 5,
                  'Native': 5,
                  'Basic': 2,
                }
                const level = proficiencyToLevel[proficiency] || 3;
                
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#fff', position: 'relative', paddingRight: editMode ? '30px' : '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>
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
                        style={{ color: '#333' }}
                      />
                    </span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(dot => (
                        <div 
                          key={dot} 
                          onClick={() => {
                            if (editMode) {
                              const newLangs = [...data.languages!]
                              const currentLang = newLangs[i]
                              // Map dot position (1-5) to proficiency level
                              const levelToProficiency = ['', 'Beginner', 'Elementary', 'Intermediate', 'Professional', 'Native']
                              const newProficiency = levelToProficiency[dot]
                              newLangs[i] = typeof currentLang === 'string'
                                ? { name: currentLang, proficiency: newProficiency as any }
                                : { ...currentLang, proficiency: newProficiency as any }
                              onFieldChange('languages', newLangs)
                            }
                          }}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: dot <= level ? '#c41e3a' : '#e0e0e0',
                            cursor: editMode ? 'pointer' : 'default',
                            transition: 'transform 0.1s',
                          }}
                          onMouseEnter={(e) => {
                            if (editMode) {
                              e.currentTarget.style.transform = 'scale(1.2)'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (editMode) {
                              e.currentTarget.style.transform = 'scale(1)'
                            }
                          }}
                        />
                      ))}
                    </div>
                    {editMode && (
                      <button
                        onClick={() => {
                          const newLangs = data.languages!.filter((_, index) => index !== i)
                          onFieldChange('languages', newLangs)
                        }}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
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
                  </div>
                );
              })}
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  margin: 0,
                  paddingBottom: '5px',
                  borderBottom: '2px solid #c41e3a',
                  letterSpacing: '0.5px',
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
                      backgroundColor: '#c41e3a',
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
                <div key={i} style={{ marginBottom: '15px', padding: '12px', background: '#fff', borderLeft: '3px solid #c41e3a', position: 'relative', paddingRight: editMode ? '30px' : '12px' }}>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newEdu = data.education!.filter((_, index) => index !== i)
                        onFieldChange('education', newEdu)
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
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
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                    <EditableText
                      value={edu.degree}
                      onChange={(v: string) => updateField(`education.${i}.degree`, v)}
                      style={{ color: '#333' }}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>
                    <EditableText
                      value={edu.institution}
                      onChange={(v: string) => updateField(`education.${i}.institution`, v)}
                      style={{ color: '#c41e3a' }}
                    />
                  </div>
                  <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>
                    📅 <EditableText
                      value={edu.startDate}
                      onChange={(v: string) => updateField(`education.${i}.startDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                    {' – '}
                    <EditableText
                      value={edu.endDate}
                      onChange={(v: string) => updateField(`education.${i}.endDate`, v)}
                      style={{ color: '#999', display: 'inline' }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
