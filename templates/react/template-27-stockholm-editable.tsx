/**
 * TEMPLATE 27: STOCKHOLM - EDITABLE VERSION
 * Clean, minimalist single-column layout with green/teal accents
 * Based on Enhancv Stockholm template - Enhanced with inline editing
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

export const StockholmEditable: React.FC<EditableTemplateProps> = ({ 
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
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '60px 80px',
      }}>
      {/* Header - Personal Info Editable */}
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
            marginBottom: '30px',
          }}>
            <h1 style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: '36px',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}>
              {(displayData.personal?.fullName || 'YOUR NAME').toUpperCase()}
            </h1>
            {displayData.personal?.title && (
              <h2 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                color: '#7BA3D1',
                marginBottom: '16px',
              }}>
                {displayData.personal.title}
              </h2>
            )}
            <div style={{
              fontSize: '12px',
              color: '#666666',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              fontFamily: "'Arial', sans-serif",
            }}>
              {displayData.personal?.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✉</span>
                  <span>{displayData.personal.email}</span>
                </span>
              )}
              {displayData.personal?.location && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍</span>
                  <span>{displayData.personal.location}</span>
                </span>
              )}
            </div>
          </header>
        </InlineSectionWrapper>
      ) : (
        <header style={{
          marginBottom: '30px',
        }}>
          <h1 style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}>
            {(displayData.personal?.fullName || 'YOUR NAME').toUpperCase()}
          </h1>
          {displayData.personal?.title && (
            <h2 style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '16px',
              fontWeight: 400,
              color: '#7BA3D1',
              marginBottom: '16px',
            }}>
              {displayData.personal.title}
            </h2>
          )}
          <div style={{
            fontSize: '12px',
            color: '#666666',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: "'Arial', sans-serif",
          }}>
            {displayData.personal?.email && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✉</span>
                <span>{displayData.personal.email}</span>
              </span>
            )}
            {displayData.personal?.location && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📍</span>
                <span>{displayData.personal.location}</span>
              </span>
            )}
          </div>
        </header>
      )}

      {/* Summary */}
      {displayData.summary && (
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            paddingBottom: '6px',
            borderBottom: '3px solid #000000',
          }}>
            SUMMARY
          </h3>
          <p style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#333333',
          }}>
            {displayData.summary}
          </p>
        </section>
      )}

      {/* Skills - Editable */}
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
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                SKILLS
              </h3>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#333333',
                lineHeight: 1.8,
              }}>
                {displayData.skills.join(' • ')}
              </div>
            </section>
          )}
        </InlineSectionWrapper>
      ) : (
        <>
          {displayData.skills && displayData.skills.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                SKILLS
              </h3>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#333333',
                lineHeight: 1.8,
              }}>
                {displayData.skills.join(' • ')}
              </div>
            </section>
          )}
        </>
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
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                EXPERIENCE
              </h3>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '4px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '13px',
                    color: '#7BA782',
                    marginBottom: '4px',
                  }}>
                    {exp.company}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '8px',
                    display: 'flex',
                    gap: '12px',
                  }}>
                    {exp.startDate && exp.endDate && (
                      <span>📅 {exp.startDate} - {exp.endDate || 'Present'}</span>
                    )}
                  </div>
                  {exp.description && (
                    <p style={{
                      fontFamily: "'Arial', sans-serif",
                      fontSize: '13px',
                      color: '#333333',
                      lineHeight: 1.6,
                      marginBottom: '6px',
                    }}>
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
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                EXPERIENCE
              </h3>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '4px',
                  }}>
                    {exp.position}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '13px',
                    color: '#7BA782',
                    marginBottom: '4px',
                  }}>
                    {exp.company}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '12px',
                    color: '#666666',
                    marginBottom: '8px',
                    display: 'flex',
                    gap: '12px',
                  }}>
                    {exp.startDate && exp.endDate && (
                      <span>📅 {exp.startDate} - {exp.endDate || 'Present'}</span>
                    )}
                  </div>
                  {exp.description && (
                    <p style={{
                      fontFamily: "'Arial', sans-serif",
                      fontSize: '13px',
                      color: '#333333',
                      lineHeight: 1.6,
                      marginBottom: '6px',
                    }}>
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
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                EDUCATION
              </h3>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '13px',
                    color: '#7BA782',
                    marginBottom: '4px',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '12px',
                    color: '#666666',
                  }}>
                    {edu.startDate && edu.endDate && (
                      <span>📅 {edu.startDate} - {edu.endDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </InlineSectionWrapper>
      ) : (
        <>
          {displayData.education && displayData.education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                paddingBottom: '6px',
                borderBottom: '3px solid #000000',
              }}>
                EDUCATION
              </h3>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '4px',
                  }}>
                    {edu.degree}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '13px',
                    color: '#7BA782',
                    marginBottom: '4px',
                  }}>
                    {edu.institution}
                  </div>
                  <div style={{
                    fontFamily: "'Arial', sans-serif",
                    fontSize: '12px',
                    color: '#666666',
                  }}>
                    {edu.startDate && edu.endDate && (
                      <span>📅 {edu.startDate} - {edu.endDate}</span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {/* Certifications */}
      {displayData.certifications && displayData.certifications.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            paddingBottom: '6px',
            borderBottom: '3px solid #000000',
          }}>
            TRAINING / COURSES
          </h3>
          {displayData.certifications.map((cert: any, i: number) => (
            <div key={i} style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '#333333',
              marginBottom: '8px',
            }}>
              <div style={{ fontWeight: 700 }}>{cert.name}</div>
              {cert.issuer && (
                <div style={{ fontSize: '12px', color: '#666666' }}>
                  {cert.issuer} {cert.date && `• ${cert.date}`}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {displayData.projects && displayData.projects.length > 0 && (
        <section style={{ marginBottom: '30px' }}>
          <h3 style={{
            fontFamily: "'Arial', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            paddingBottom: '6px',
            borderBottom: '3px solid #000000',
          }}>
            PROJECTS
          </h3>
          {displayData.projects.map((project: any, i: number) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '4px',
              }}>
                {project.name}
              </div>
              {project.description && (
                <p style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: '13px',
                  color: '#333333',
                  lineHeight: 1.6,
                }}>
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      </div>
    </div>
  );
};
