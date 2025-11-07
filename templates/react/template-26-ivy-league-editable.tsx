/**
 * TEMPLATE 26: IVY LEAGUE - EDITABLE VERSION
 * Single-column professional layout with blue accents
 * Based on Enhancv's Ivy League template - Enhanced with inline editing
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

export const IvyLeagueEditable: React.FC<EditableTemplateProps> = ({ 
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
      fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
      overflow: 'hidden',
      position: 'relative',
      padding: '50px',
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
            textAlign: 'center',
            marginBottom: '24px',
            padding: '6px 12px',
          }}>
            <h1 style={{
              fontFamily: "Volkhov, Georgia, serif",
              textTransform: 'uppercase',
              color: '#002b7f',
              fontSize: '22px',
              lineHeight: '28px',
              fontWeight: 700,
              marginBottom: '6px',
            }}>
              {displayData.personal?.fullName || 'Your Name'}
            </h1>
            {displayData.personal?.title && (
              <h2 style={{
                color: '#56acf2',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 400,
                marginBottom: '12px',
              }}>
                {displayData.personal.title}
              </h2>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              lineHeight: '16px',
              color: '#333',
              flexWrap: 'wrap',
            }}>
              {displayData.personal?.email && <span>{displayData.personal.email}</span>}
              {displayData.personal?.location && (
                <>
                  <span>•</span>
                  <span>{displayData.personal.location}</span>
                </>
              )}
            </div>
          </header>
        </InlineSectionWrapper>
      ) : (
        <header style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '6px 12px',
        }}>
          <h1 style={{
            fontFamily: "Volkhov, Georgia, serif",
            textTransform: 'uppercase',
            color: '#002b7f',
            fontSize: '22px',
            lineHeight: '28px',
            fontWeight: 700,
            marginBottom: '6px',
          }}>
            {displayData.personal?.fullName || 'Your Name'}
          </h1>
          {displayData.personal?.title && (
            <h2 style={{
              color: '#56acf2',
              fontSize: '18px',
              lineHeight: '22px',
              fontWeight: 400,
              marginBottom: '12px',
            }}>
              {displayData.personal.title}
            </h2>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            lineHeight: '16px',
            color: '#333',
            flexWrap: 'wrap',
          }}>
            {displayData.personal?.email && <span>{displayData.personal.email}</span>}
            {displayData.personal?.location && (
              <>
                <span>•</span>
                <span>{displayData.personal.location}</span>
              </>
            )}
          </div>
        </header>
      )}

      {/* Summary */}
      {displayData.summary && (
        <section style={{ marginBottom: '24px', padding: '6px 12px' }}>
          <h3 style={{
            fontFamily: "Volkhov, Georgia, serif",
            borderBottom: '1px solid #002b7f',
            color: '#002b7f',
            fontSize: '18px',
            lineHeight: '23px',
            fontWeight: 700,
            marginBottom: '12px',
            paddingBottom: '4px',
          }}>
            Summary
          </h3>
          <p style={{
            fontSize: '13px',
            lineHeight: '18px',
            color: '#333',
            textAlign: 'left',
          }}>
            {displayData.summary}
          </p>
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
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Experience
              </h3>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4px',
                  }}>
                    <div style={{
                      color: '#56acf2',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: 400,
                    }}>
                      {exp.company}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      color: '#333',
                      textAlign: 'right',
                    }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{
                    color: '#002b7f',
                    fontSize: '15px',
                    lineHeight: '18px',
                    fontWeight: 400,
                  }}>
                    {exp.position}
                  </div>
                  {exp.description && (
                    <p style={{
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#333',
                      marginTop: '8px',
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
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Experience
              </h3>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '4px',
                  }}>
                    <div style={{
                      color: '#56acf2',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: 400,
                    }}>
                      {exp.company}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      color: '#333',
                      textAlign: 'right',
                    }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{
                    color: '#002b7f',
                    fontSize: '15px',
                    lineHeight: '18px',
                    fontWeight: 400,
                  }}>
                    {exp.position}
                  </div>
                  {exp.description && (
                    <p style={{
                      fontSize: '13px',
                      lineHeight: '18px',
                      color: '#333',
                      marginTop: '8px',
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
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Education
              </h3>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      color: '#56acf2',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      flex: 1,
                    }}>
                      {edu.institution}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      color: '#333',
                      fontWeight: 400,
                    }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div style={{
                    color: '#002b7f',
                    fontSize: '15px',
                    lineHeight: '18px',
                    fontWeight: 400,
                    marginTop: '4px',
                  }}>
                    {edu.degree}
                  </div>
                </div>
              ))}
            </section>
          )}
        </InlineSectionWrapper>
      ) : (
        <>
          {displayData.education && displayData.education.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Education
              </h3>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div style={{
                      color: '#56acf2',
                      fontSize: '18px',
                      lineHeight: '22px',
                      fontWeight: 400,
                      flex: 1,
                    }}>
                      {edu.institution}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      color: '#333',
                      fontWeight: 400,
                    }}>
                      {edu.startDate} - {edu.endDate}
                    </div>
                  </div>
                  <div style={{
                    color: '#002b7f',
                    fontSize: '15px',
                    lineHeight: '18px',
                    fontWeight: 400,
                    marginTop: '4px',
                  }}>
                    {edu.degree}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {/* Certifications */}
      {displayData.certifications && displayData.certifications.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: "Volkhov, Georgia, serif",
            borderBottom: '1px solid #002b7f',
            color: '#002b7f',
            fontSize: '18px',
            lineHeight: '23px',
            fontWeight: 700,
            marginBottom: '12px',
            paddingBottom: '4px',
            padding: '6px 12px 4px',
          }}>
            Certification
          </h3>
          {displayData.certifications.map((cert: any, i: number) => (
            <div key={i} style={{ padding: '6px 12px', marginBottom: '8px' }}>
              <div style={{
                color: '#56acf2',
                fontSize: '15px',
                lineHeight: '18px',
                fontWeight: 400,
              }}>
                {cert.name}
              </div>
            </div>
          ))}
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
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Skills
              </h3>
              <div style={{ padding: '6px 12px' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <span key={i} style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#333',
                      padding: '4px 8px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </InlineSectionWrapper>
      ) : (
        <>
          {displayData.skills && displayData.skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "Volkhov, Georgia, serif",
                borderBottom: '1px solid #002b7f',
                color: '#002b7f',
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 700,
                marginBottom: '12px',
                paddingBottom: '4px',
                padding: '6px 12px 4px',
              }}>
                Skills
              </h3>
              <div style={{ padding: '6px 12px' }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <span key={i} style={{
                      fontSize: '13px',
                      lineHeight: '16px',
                      color: '#333',
                      padding: '4px 8px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Projects */}
      {displayData.projects && displayData.projects.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontFamily: "Volkhov, Georgia, serif",
            borderBottom: '1px solid #002b7f',
            color: '#002b7f',
            fontSize: '18px',
            lineHeight: '23px',
            fontWeight: 700,
            marginBottom: '12px',
            paddingBottom: '4px',
            padding: '6px 12px 4px',
          }}>
            Projects
          </h3>
          {displayData.projects.map((project: any, i: number) => (
            <div key={i} style={{ padding: '6px 12px', marginBottom: '12px' }}>
              <div style={{
                color: '#56acf2',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 400,
              }}>
                {project.name}
              </div>
              {project.description && (
                <p style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: '#333',
                  marginTop: '8px',
                }}>
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
