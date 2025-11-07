/**
 * TEMPLATE 24: RED TOP BAR (CV12) - EDITABLE VERSION
 * Red top bar + Left white content (60%) + Right gray sidebar (40%) with photo
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

export const RedTopBarEditable: React.FC<EditableTemplateProps> = ({ 
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
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Red top bar */}
      <div style={{
        background: '#c9302c',
        height: '25px',
        width: '100%',
      }} />

      {/* Content wrapper */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Column - White */}
        <main style={{
          width: '60%',
          background: 'white',
          padding: '30px 35px',
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
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
              <div style={{
                height: '2px',
                background: '#333',
                margin: '15px 0 25px 0',
              }} />
            </InlineSectionWrapper>
          ) : (
            <>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '5px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
              <div style={{
                height: '2px',
                background: '#333',
                margin: '15px 0 25px 0',
              }} />
            </>
          )}

          {/* Professional Summary */}
          {displayData.summary && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                letterSpacing: '1px',
                paddingBottom: '8px',
                borderBottom: '2px solid #e0e0e0',
              }}>Professional Summary</h2>
              <div style={{
                fontSize: '10px',
                color: '#333',
                lineHeight: 1.7,
                textAlign: 'justify',
                background: '#fef5f5',
                padding: '12px',
                marginTop: '8px',
              }}>
                {displayData.summary}
              </div>
            </section>
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #e0e0e0',
                  }}>Experience</h2>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                        {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>
                        {exp.company}
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, margin: 0, paddingLeft: '12px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #e0e0e0',
                  }}>Experience</h2>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '18px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                        {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>
                        {exp.company}
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, margin: 0, paddingLeft: '12px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #e0e0e0',
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                        {edu.degree}, {edu.endDate}
                      </div>
                      <div>{edu.institution}</div>
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
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #e0e0e0',
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '12px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                        {edu.degree}, {edu.endDate}
                      </div>
                      <div>{edu.institution}</div>
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
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                letterSpacing: '1px',
                paddingBottom: '8px',
                borderBottom: '2px solid #e0e0e0',
              }}>Languages</h2>
              <ul style={{ fontSize: '10px', color: '#333', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
                {displayData.languages.map((lang: any, i: number) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                  return (
                    <li key={i} style={{ paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#c9302c' }}>•</span>
                      {langName} ({proficiency})
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </main>

        {/* Right Column - Gray */}
        <aside style={{
          width: '40%',
          background: '#f0f0f0',
          padding: '30px 25px',
          overflowY: 'auto',
        }}>
          {/* Photo */}
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'white',
              margin: '0 auto',
              overflow: 'hidden',
              border: '3px solid #ddd',
            }}>
              <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>PHOTO</div>
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
              textTransform: 'uppercase',
              marginBottom: '12px',
              letterSpacing: '1px',
              paddingBottom: '8px',
              borderBottom: '2px solid #ddd',
            }}>Contact</h3>
            <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📍</span>
                <span>{displayData.personal?.location || 'City, State'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>📞</span>
                <span>Phone: {displayData.personal?.phone || 'Phone'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '10px', color: '#333', gap: '8px' }}>
                <span style={{ color: '#c9302c', fontSize: '11px', flexShrink: 0 }}>✉️</span>
                <span>Email: {displayData.personal?.email || 'Email'}</span>
              </div>
            </div>
          </div>

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
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #ddd',
                  }}>Core Qualifications</h3>
                  <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
                    {displayData.skills.slice(0, 5).map((skill: string, i: number) => (
                      <div key={i} style={{ marginBottom: '15px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                        <strong style={{ display: 'block', marginBottom: '4px', fontSize: '10px', color: '#333' }}>
                          • {skill}:
                        </strong>
                        Professional expertise and proven track record.
                      </div>
                    ))}
                  </div>
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
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    letterSpacing: '1px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #ddd',
                  }}>Core Qualifications</h3>
                  <div style={{ background: '#fef5f5', padding: '12px', marginTop: '8px' }}>
                    {displayData.skills.slice(0, 5).map((skill: string, i: number) => (
                      <div key={i} style={{ marginBottom: '15px', fontSize: '10px', color: '#333', lineHeight: 1.6 }}>
                        <strong style={{ display: 'block', marginBottom: '4px', fontSize: '10px', color: '#333' }}>
                          • {skill}:
                        </strong>
                        Professional expertise and proven track record.
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
};
