/**
 * TEMPLATE 23: ORANGE ACCENT (CV1) - EDITABLE VERSION
 * Left orange sidebar (30%) with photo + Right white content (70%)
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

export const OrangeAccentEditable: React.FC<EditableTemplateProps> = ({ 
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
      width: '850px',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      overflow: 'hidden',
    }}>
      {/* Left Sidebar - Orange */}
      <aside style={{
        width: '30%',
        background: '#f39c12',
        color: 'white',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Photo section */}
        <div style={{
          background: '#3a3a3a',
          padding: '25px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            margin: '0 auto',
            border: '8px solid #f39c12',
            background: 'white',
            overflow: 'hidden',
            borderRadius: '4px',
          }}>
            <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
          </div>
        </div>

        {/* Sidebar content */}
        <div style={{ padding: '25px 20px', flex: 1, overflowY: 'auto' }}>
          {/* Contact */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
              <span style={{ fontSize: '12px' }}>📍</span>
              <span>{displayData.personal?.location || 'City, State'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
              <span style={{ fontSize: '12px' }}>📞</span>
              <span>{displayData.personal?.phone || 'Phone'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '10px', gap: '8px' }}>
              <span style={{ fontSize: '12px' }}>✉️</span>
              <span>{displayData.personal?.email || 'Email'}</span>
            </div>
          </div>

          {/* Professional Summary */}
          {displayData.summary && (
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '12px',
                letterSpacing: '1px',
              }}>Professional Summary</h3>
              <p style={{ fontSize: '10px', lineHeight: 1.7, textAlign: 'justify' }}>
                {displayData.summary}
              </p>
            </div>
          )}

          {/* Core Qualifications (Skills) - Editable */}
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
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                  }}>Core Qualifications</h3>
                  {displayData.skills.slice(0, 5).map((skill: string, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', fontSize: '10px', lineHeight: 1.6 }}>
                      <strong style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>{skill}:</strong>
                      Professional expertise and proven track record in this area.
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                  <h3 style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                  }}>Core Qualifications</h3>
                  {displayData.skills.slice(0, 5).map((skill: string, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', fontSize: '10px', lineHeight: 1.6 }}>
                      <strong style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>{skill}:</strong>
                      Professional expertise and proven track record in this area.
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      {/* Main Content - White */}
      <main style={{
        width: '70%',
        background: 'white',
        padding: '35px 30px',
        overflowY: 'auto',
      }}>
        {/* Name - Personal Info Editable */}
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
            <header style={{ marginBottom: '30px' }}>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#f39c12',
                marginBottom: '8px',
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
            </header>
          </InlineSectionWrapper>
        ) : (
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#f39c12',
              marginBottom: '8px',
            }}>{displayData.personal?.fullName || 'Your Name'}</h1>
          </header>
        )}

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
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #f39c12',
                  letterSpacing: '1px',
                }}>Experience</h2>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.7, margin: 0, paddingLeft: '15px' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.experience && displayData.experience.length > 0 && (
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #f39c12',
                  letterSpacing: '1px',
                }}>Experience</h2>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.7, margin: 0, paddingLeft: '15px' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </>
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
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #f39c12',
                  letterSpacing: '1px',
                }}>Education</h2>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.education && displayData.education.length > 0 && (
              <section style={{ marginBottom: '25px' }}>
                <h2 style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#333',
                  textTransform: 'uppercase',
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid #f39c12',
                  letterSpacing: '1px',
                }}>Education</h2>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '10px', color: '#f39c12', fontWeight: 'bold', marginBottom: '3px' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666' }}>
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}

        {/* Languages */}
        {displayData.languages && displayData.languages.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '15px',
              paddingBottom: '8px',
              borderBottom: '2px solid #f39c12',
              letterSpacing: '1px',
            }}>Languages</h2>
            <ul style={{ fontSize: '10px', color: '#666', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              {displayData.languages.map((lang: any, i: number) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                return (
                  <li key={i} style={{ paddingLeft: '15px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#f39c12' }}>•</span>
                    {langName} ({proficiency})
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};
