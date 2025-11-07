/**
 * TEMPLATE 13: GRAY MINIMAL - EDITABLE VERSION
 * Clean and minimal CV with gray sidebar
 * Enhanced with inline editing capabilities
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineSectionWrapper } from '@/components/builder/inline-section-wrapper'
import { PersonalForm } from '@/components/builder/personal-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'
import { ProjectsForm } from '@/components/builder/projects-form'

interface EditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  editingSection?: string | null
  onEditSection?: (sectionId: string) => void
  onSaveSection?: () => void
  onCancelSection?: () => void
  onDataChange?: (data: any) => void
  tempData?: any
}

export const GrayMinimalEditable: React.FC<EditableTemplateProps> = ({ 
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
  
  // Photo configuration
  const photoConfig = displayData.personal?.photo
  const photoUrl = photoConfig?.url
  const photoHidden = photoConfig?.effects?.hidden
  const photoGrayscale = photoConfig?.effects?.grayscale

  return (
    <div style={{
      width: '850px',
      minHeight: '1200px',
      background: '#ffffff',
      display: 'flex',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Left Gray Sidebar */}
      <div style={{
        width: '35%',
        background: '#b8b8b8',
        padding: '40px 30px',
        color: '#2d2d2d',
      }}>
        {/* Personal Info Section - Editable */}
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
            <div>
              {/* Profile Photo */}
              {photoUrl && !photoHidden && (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 25px',
                  background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                }}>
                  <img 
                    src={photoUrl} 
                    alt={displayData.personal?.fullName || 'Profile'} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                    }} 
                  />
                </div>
              )}

              {/* Name */}
              <h1 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 10px 0',
                textAlign: 'center',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>

              {/* Title */}
              {displayData.personal?.title && (
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#4a4a4a',
                  margin: '0 0 25px 0',
                  textAlign: 'center',
                }}>
                  {displayData.personal.title}
                </h2>
              )}

              {/* Contact */}
              <div style={{ marginTop: '25px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 15px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Contact
                </h3>
                <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#2d2d2d' }}>
                  {displayData.personal?.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span>📞 {displayData.personal.phone}</span>
                    </div>
                  )}
                  {displayData.personal?.email && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span>✉️ {displayData.personal.email}</span>
                    </div>
                  )}
                  {displayData.personal?.location && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span>📍 {displayData.personal.location}</span>
                    </div>
                  )}
                  {displayData.personal?.website && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <span>🌐 {displayData.personal.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </InlineSectionWrapper>
        ) : (
          <>
            {photoUrl && !photoHidden && (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 25px',
                background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              }}>
                <img 
                  src={photoUrl} 
                  alt={displayData.personal?.fullName || 'Profile'} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                  }} 
                />
              </div>
            )}

            <h1 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#2d2d2d',
              margin: '0 0 10px 0',
              textAlign: 'center',
            }}>
              {displayData.personal?.fullName || 'Your Name'}
            </h1>

            {displayData.personal?.title && (
              <h2 style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#4a4a4a',
                margin: '0 0 25px 0',
                textAlign: 'center',
              }}>
                {displayData.personal.title}
              </h2>
            )}

            <div style={{ marginTop: '25px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 15px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Contact
              </h3>
              <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#2d2d2d' }}>
                {displayData.personal?.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span>📞 {displayData.personal.phone}</span>
                  </div>
                )}
                {displayData.personal?.email && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span>✉️ {displayData.personal.email}</span>
                  </div>
                )}
                {displayData.personal?.location && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span>📍 {displayData.personal.location}</span>
                  </div>
                )}
                {displayData.personal?.website && (
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <span>🌐 {displayData.personal.website}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Skills Section - Editable */}
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
              <div style={{ marginTop: '30px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 15px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Skills
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '11px',
                      color: '#2d2d2d',
                      marginBottom: '8px',
                      paddingLeft: '15px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '5px',
                        height: '5px',
                        background: '#2d2d2d',
                        borderRadius: '50%',
                      }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.skills && displayData.skills.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 15px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Skills
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '11px',
                      color: '#2d2d2d',
                      marginBottom: '8px',
                      paddingLeft: '15px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '5px',
                        height: '5px',
                        background: '#2d2d2d',
                        borderRadius: '50%',
                      }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Content Area */}
      <div style={{
        width: '65%',
        padding: '40px',
        background: '#ffffff',
      }}>
        {/* Summary */}
        {displayData.summary && (
          <div style={{ marginBottom: '30px' }}>
            <p style={{
              fontSize: '12px',
              lineHeight: '1.7',
              color: '#4a4a4a',
              margin: 0,
            }}>
              {displayData.summary}
            </p>
          </div>
        )}

        {/* Experience Section - Editable */}
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
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Experience
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2d2d2d',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.position}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#4a4a4a',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '11px',
                        lineHeight: '1.6',
                        color: '#4a4a4a',
                        margin: 0,
                      }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.experience && displayData.experience.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Experience
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2d2d2d',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.position}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#4a4a4a',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '11px',
                        lineHeight: '1.6',
                        color: '#4a4a4a',
                        margin: 0,
                      }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Education Section - Editable */}
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
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2d2d2d',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#4a4a4a',
                      margin: 0,
                    }}>
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.education && displayData.education.length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2d2d2d',
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '15px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2d2d2d',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#4a4a4a',
                      margin: 0,
                    }}>
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
