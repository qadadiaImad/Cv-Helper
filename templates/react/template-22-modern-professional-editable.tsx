/**
 * TEMPLATE 22: MODERN PROFESSIONAL (CV9) - EDITABLE VERSION
 * Left gray column with white sections + Right white content + Contact bar
 * Green icon with initials - Enhanced with inline editing capabilities
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

export const ModernProfessionalEditable: React.FC<EditableTemplateProps> = ({ 
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
  const initials = displayData.personal?.fullName?.split(' ').map((n: string) => n[0]).slice(0, 2) || ['F', 'L'];
  
  return (
    <div style={{
      width: '850px',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Lato', Arial, sans-serif",
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top section with icon and name - Personal Info Editable */}
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
          <div style={{
            display: 'flex',
            padding: '35px 30px 20px',
            background: '#e8ebe8',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{
              width: '85px',
              height: '85px',
              background: '#2d7a6e',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '16px',
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: 1,
              }}>
                <span>{initials[0]}</span>
                <span>{initials[1]}</span>
              </div>
              {/* Diagonal X lines */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                <div style={{
                  content: '',
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.7)',
                  width: '55px',
                  height: '1.5px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                }} />
                <div style={{
                  content: '',
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.7)',
                  width: '55px',
                  height: '1.5px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                }} />
              </div>
            </div>
            <div>
              <h1 style={{
                fontSize: '30px',
                fontWeight: 300,
                color: '#333',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                margin: 0,
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
            </div>
          </div>

          {/* Contact bar */}
          <div style={{
            background: '#2b2b2b',
            color: 'white',
            padding: '12px 30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '10px',
          }}>
            {displayData.personal?.location && <span>{displayData.personal.location}</span>}
            <span>•</span>
            {displayData.personal?.phone && <span>{displayData.personal.phone}</span>}
            <span>•</span>
            {displayData.personal?.email && <span>{displayData.personal.email}</span>}
          </div>
        </InlineSectionWrapper>
      ) : (
        <>
          <div style={{
            display: 'flex',
            padding: '35px 30px 20px',
            background: '#e8ebe8',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{
              width: '85px',
              height: '85px',
              background: '#2d7a6e',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '16px',
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: 1,
              }}>
                <span>{initials[0]}</span>
                <span>{initials[1]}</span>
              </div>
              {/* Diagonal X lines */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                <div style={{
                  content: '',
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.7)',
                  width: '55px',
                  height: '1.5px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                }} />
                <div style={{
                  content: '',
                  position: 'absolute',
                  background: 'rgba(255,255,255,0.7)',
                  width: '55px',
                  height: '1.5px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                }} />
              </div>
            </div>
            <div>
              <h1 style={{
                fontSize: '30px',
                fontWeight: 300,
                color: '#333',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                margin: 0,
              }}>{displayData.personal?.fullName || 'Your Name'}</h1>
            </div>
          </div>

          {/* Contact bar */}
          <div style={{
            background: '#2b2b2b',
            color: 'white',
            padding: '12px 30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '10px',
          }}>
            {displayData.personal?.location && <span>{displayData.personal.location}</span>}
            <span>•</span>
            {displayData.personal?.phone && <span>{displayData.personal.phone}</span>}
            <span>•</span>
            {displayData.personal?.email && <span>{displayData.personal.email}</span>}
          </div>
        </>
      )}

      {/* Main content - two columns */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left column - gray with white sections */}
        <aside style={{
          width: '25%',
          background: '#e8ebe8',
          padding: '20px 15px',
          overflowY: 'auto',
        }}>
          {/* Professional Summary */}
          {displayData.summary && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Professional Summary</h2>
              <p style={{ fontSize: '10px', color: '#333', lineHeight: 1.7, textAlign: 'justify' }}>
                {displayData.summary}
              </p>
            </div>
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
                <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
                  <h2 style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #333',
                    letterSpacing: '1px',
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ fontSize: '10px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
                      <p style={{ marginBottom: '2px' }}><strong>{edu.degree}</strong></p>
                      <p>{edu.institution}</p>
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.education && displayData.education.length > 0 && (
                <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
                  <h2 style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid #333',
                    letterSpacing: '1px',
                  }}>Education</h2>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ fontSize: '10px', color: '#333', lineHeight: 1.6, marginBottom: '8px' }}>
                      <p style={{ marginBottom: '2px' }}><strong>{edu.degree}</strong></p>
                      <p>{edu.institution}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Languages */}
          {displayData.languages && displayData.languages.length > 0 && (
            <div style={{ background: 'white', padding: '18px 15px', marginBottom: '15px' }}>
              <h2 style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Languages</h2>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '10px', color: '#333', lineHeight: 1.7 }}>
                {displayData.languages.map((lang: any, i: number) => {
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
                  return (
                    <li key={i} style={{ marginBottom: '6px', paddingLeft: '12px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#2d7a6e' }}>•</span>
                      {langName} ({proficiency})
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Right column - white */}
        <main style={{
          width: '75%',
          background: '#ffffff',
          padding: '25px 30px',
          overflowY: 'auto',
        }}>
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
                    marginBottom: '15px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #2d7a6e',
                    letterSpacing: '1px',
                  }}>Experience</h2>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                        {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#2d7a6e', marginBottom: '8px' }}>{exp.company}</div>
                      {exp.description && (
                        <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.3, margin: 0 }}>
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
                <section style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '15px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #2d7a6e',
                    letterSpacing: '1px',
                  }}>Experience</h2>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                        {exp.position}, {exp.startDate} - {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#2d7a6e', marginBottom: '8px' }}>{exp.company}</div>
                      {exp.description && (
                        <p style={{ fontSize: '10px', color: '#666', lineHeight: 1.3, margin: 0 }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </>
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
                <section style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '15px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #2d7a6e',
                    letterSpacing: '1px',
                  }}>Core Qualifications</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <div key={i} style={{ fontSize: '10px', lineHeight: 1.6, color: '#333' }}>
                        <strong>{skill}:</strong> Professional expertise and proven track record.
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                  <h2 style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    marginBottom: '15px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #2d7a6e',
                    letterSpacing: '1px',
                  }}>Core Qualifications</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <div key={i} style={{ fontSize: '10px', lineHeight: 1.6, color: '#333' }}>
                        <strong>{skill}:</strong> Professional expertise and proven track record.
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
