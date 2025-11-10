/**
 * TEMPLATE 20: CREATIVE CV - EDITABLE VERSION
 * Two-column layout with photo in header, pie chart, red/burgundy theme
 * Enhanced with inline editing capabilities
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineSectionWrapper } from '@/components/builder/inline-section-wrapper'
import { PersonalForm } from '@/components/builder/personal-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'

interface EditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  editingSection?: string | null
  onEditSection?: (sectionId: string) => void
  onSaveSection?: () => void
  onCancelSection?: () => void
  onDataChange?: (data: any) => void
  tempData?: any
}

export const CreativeCVEditable: React.FC<EditableTemplateProps> = ({ 
  data, 
  editMode = false,
  editingSection = null,
  onEditSection = () => {},
  onSaveSection = () => {},
  onCancelSection = () => {},
  onDataChange = () => {},
  tempData
}) => {
  const displayData = editingSection ? tempData : data

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header - Personal Info Editable - Full Width */}
      {editMode ? (
        <InlineSectionWrapper
          sectionId="personal"
          title="Personal Info"
          isEditing={editingSection === 'personal'}
          onEdit={() => onEditSection('personal')}
          onSave={onSaveSection}
          onCancel={onCancelSection}
          isEmpty={!displayData.personal?.fullName}
          formContent={<PersonalForm data={tempData || data} onChange={onDataChange} />}
        >
          <header style={{
            background: '#ffffff',
            padding: '20px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            width: '100%',
            flexShrink: 0,
            height: '100px',
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#333',
                marginBottom: '5px',
                letterSpacing: '2px',
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
              {displayData.personal?.title && (
                <p style={{ fontSize: '14px', color: '#c41e3a', fontStyle: 'italic' }}>{displayData.personal.title}</p>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.6', textAlign: 'right' }}>
                {displayData.personal?.email && <div>📧 {displayData.personal.email}</div>}
                {displayData.personal?.phone && <div>📱 {displayData.personal.phone}</div>}
                {displayData.personal?.location && <div>📍 {displayData.personal.location}</div>}
              </div>
            </div>
          </header>
        </InlineSectionWrapper>
      ) : (
        <header style={{
          background: '#ffffff',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          height: '100px',
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#333',
              marginBottom: '5px',
              letterSpacing: '2px',
            }}>{displayData.personal?.fullName || 'Your Name'}</h1>
            {displayData.personal?.title && (
              <p style={{ fontSize: '14px', color: '#c41e3a', fontStyle: 'italic' }}>{displayData.personal.title}</p>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.6', textAlign: 'right' }}>
              {displayData.personal?.email && <div>📧 {displayData.personal.email}</div>}
              {displayData.personal?.phone && <div>📱 {displayData.personal.phone}</div>}
              {displayData.personal?.location && <div>📍 {displayData.personal.location}</div>}
            </div>
          </div>
        </header>
      )}

      {/* Content Wrapper */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <aside style={{ flex: '0 0 40%', padding: '25px 20px', background: '#ffffff' }}>
          {/* Experience - Editable */}
          {editMode ? (
            <InlineSectionWrapper
              sectionId="experience"
              title="Experience"
              isEditing={editingSection === 'experience'}
              onEdit={() => onEditSection('experience')}
              onSave={onSaveSection}
              onCancel={onCancelSection}
              isEmpty={!displayData.experience || displayData.experience.length === 0}
              formContent={<ExperienceForm data={tempData || data} onChange={onDataChange} />}
            >
              {displayData.experience && displayData.experience.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    paddingBottom: '5px',
                    borderBottom: '2px solid #c41e3a',
                    letterSpacing: '0.5px',
                  }}>Experience</h2>
                  {displayData.experience.slice(0, 2).map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '15px', paddingLeft: '15px', borderLeft: '2px solid #c41e3a', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-6px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#c41e3a',
                      }} />
                      <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '3px' }}>
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>{exp.position}</div>
                      <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{exp.company}</div>
                      {exp.description && (
                        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.experience && displayData.experience.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    paddingBottom: '5px',
                    borderBottom: '2px solid #c41e3a',
                    letterSpacing: '0.5px',
                  }}>Experience</h2>
                  {displayData.experience.slice(0, 2).map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '15px', paddingLeft: '15px', borderLeft: '2px solid #c41e3a', position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-6px',
                        top: '5px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#c41e3a',
                      }} />
                      <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '3px' }}>
                        {exp.startDate} – {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>{exp.position}</div>
                      <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{exp.company}</div>
                      {exp.description && (
                        <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </>
          )}

          {/* Projects */}
          {displayData.projects && displayData.projects.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '5px',
                borderBottom: '2px solid #c41e3a',
                letterSpacing: '0.5px',
              }}>Projects</h2>
              {displayData.projects.slice(0, 2).map((proj: any, i: number) => (
                <div key={i} style={{ marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderLeft: '3px solid #c41e3a' }}>
                  <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>{proj.name}</div>
                  <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.3' }}>{proj.description}</div>
                </div>
              ))}
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '25px 30px', background: '#fafafa' }}>
          {/* Professional Summary */}
          {displayData.summary && (
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
              }}>Professional Summary</h2>
              <div style={{ background: '#fff', padding: '15px', borderLeft: '4px solid #c41e3a', fontStyle: 'italic', color: '#666', fontSize: '12px', lineHeight: '1.6' }}>
                "{displayData.summary}"
              </div>
            </section>
          )}

          {/* Strengths (Skills) - Editable */}
          {editMode ? (
            <InlineSectionWrapper
              sectionId="skills"
              title="Skills"
              isEditing={editingSection === 'skills'}
              onEdit={() => onEditSection('skills')}
              onSave={onSaveSection}
              onCancel={onCancelSection}
              isEmpty={!displayData.skills || displayData.skills.length === 0}
              formContent={<SkillsForm data={tempData || data} onChange={onDataChange} />}
            >
              {displayData.skills && displayData.skills.length > 0 && (
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
                  }}>Strengths</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: '#fff' }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <span key={i} style={{
                        padding: '5px 12px',
                        background: '#f0f0f0',
                        borderRadius: '15px',
                        fontSize: '10px',
                        color: '#333',
                        border: '1px solid #ddd',
                      }}>{skill}</span>
                    ))}
                  </div>
                </section>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
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
                  }}>Strengths</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '10px', background: '#fff' }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <span key={i} style={{
                        padding: '5px 12px',
                        background: '#f0f0f0',
                        borderRadius: '15px',
                        fontSize: '10px',
                        color: '#333',
                        border: '1px solid #ddd',
                      }}>{skill}</span>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Languages */}
          {displayData.languages && displayData.languages.length > 0 && (
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
              }}>Languages</h2>
              {displayData.languages.map((lang: any, i: number) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                const level = ['Native', 'Fluent'].includes(proficiency) ? 5 : ['Professional'].includes(proficiency) ? 4 : 3;
                
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#fff' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#333' }}>{langName}</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(dot => (
                        <div key={dot} style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: dot <= level ? '#c41e3a' : '#e0e0e0',
                        }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Education - Editable */}
          {editMode ? (
            <InlineSectionWrapper
              sectionId="education"
              title="Education"
              isEditing={editingSection === 'education'}
              onEdit={() => onEditSection('education')}
              onSave={onSaveSection}
              onCancel={onCancelSection}
              isEmpty={!displayData.education || displayData.education.length === 0}
              formContent={<EducationForm data={tempData || data} onChange={onDataChange} />}
            >
              {displayData.education && displayData.education.length > 0 && (
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
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '15px', padding: '12px', background: '#fff', borderLeft: '3px solid #c41e3a' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                        {edu.degree}
                      </div>
                      <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{edu.institution}</div>
                      <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>
                        📅 {edu.startDate} – {edu.endDate}
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.education && displayData.education.length > 0 && (
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
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '15px', padding: '12px', background: '#fff', borderLeft: '3px solid #c41e3a' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                        {edu.degree}
                      </div>
                      <div style={{ fontSize: '11px', color: '#c41e3a', marginBottom: '5px' }}>{edu.institution}</div>
                      <div style={{ fontSize: '10px', color: '#999', marginBottom: '5px' }}>
                        📅 {edu.startDate} – {edu.endDate}
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
