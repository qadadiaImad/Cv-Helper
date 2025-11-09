/**
 * TEMPLATE 17: NAVY PROFESSIONAL - EDITABLE VERSION
 * Professional CV with navy blue sidebar and white main content
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

export const NavyProfessionalEditable: React.FC<EditableTemplateProps> = ({ 
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
  
  const photoConfig = displayData.personal?.photo
  const photoUrl = photoConfig?.url
  const photoHidden = photoConfig?.effects?.hidden
  const photoGrayscale = photoConfig?.effects?.grayscale

  return (
    <div style={{
      width: '100%',
      minHeight: '1200px',
      background: '#ffffff',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      display: 'flex',
    }}>
      {/* Left Navy Sidebar */}
      <div style={{
        width: '297.5px', // Fixed width (35% of 850px)
        background: '#1e3a5f',
        padding: '40px 30px',
        color: '#ffffff',
        flexShrink: 0,
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
              <div style={{ width: '100%', marginBottom: '35px' }}>
                {photoUrl && !photoHidden ? (
                  <div style={{
                    width: '160px',
                    height: '200px',
                    margin: '0 auto',
                    overflow: 'hidden',
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
                ) : (
                  <div style={{
                    width: '160px',
                    height: '200px',
                    background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                      <circle cx="40" cy="30" r="16" fill="#999999" opacity="0.5" />
                      <path d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70" fill="#999999" opacity="0.5" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Informations Section */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  INFORMATIONS
                </h3>
                <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#d0d8e0' }}>
                  {displayData.personal?.phone && <p style={{ margin: '0 0 8px 0' }}>{displayData.personal.phone}</p>}
                  {displayData.personal?.email && <p style={{ margin: '0 0 8px 0', wordBreak: 'break-all' }}>{displayData.personal.email}</p>}
                  {displayData.personal?.location && <p style={{ margin: '0' }}>{displayData.personal.location}</p>}
                </div>
              </div>
            </div>
          </InlineSectionWrapper>
        ) : (
          <>
            <div style={{ width: '100%', marginBottom: '35px' }}>
              {photoUrl && !photoHidden ? (
                <div style={{
                  width: '160px',
                  height: '200px',
                  margin: '0 auto',
                  overflow: 'hidden',
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
              ) : (
                <div style={{
                  width: '160px',
                  height: '200px',
                  background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="30" r="16" fill="#999999" opacity="0.5" />
                    <path d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70" fill="#999999" opacity="0.5" />
                  </svg>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 20px 0',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                INFORMATIONS
              </h3>
              <div style={{ fontSize: '11px', lineHeight: '1.8', color: '#d0d8e0' }}>
                {displayData.personal?.phone && <p style={{ margin: '0 0 8px 0' }}>{displayData.personal.phone}</p>}
                {displayData.personal?.email && <p style={{ margin: '0 0 8px 0', wordBreak: 'break-all' }}>{displayData.personal.email}</p>}
                {displayData.personal?.location && <p style={{ margin: '0' }}>{displayData.personal.location}</p>}
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
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  COMPÉTENCES
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '11px',
                      color: '#d0d8e0',
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
                        background: '#ffffff',
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
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  COMPÉTENCES
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '11px',
                      color: '#d0d8e0',
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
                        background: '#ffffff',
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

        {/* Languages */}
        {displayData.languages && displayData.languages.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 20px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              LANGUES
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {displayData.languages.map((lang: any, i: number) => (
                <li key={i} style={{ fontSize: '11px', color: '#d0d8e0', marginBottom: '8px' }}>
                  {typeof lang === 'string' ? lang : `${lang.name} (${lang.proficiency})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {displayData.interests && displayData.interests.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 20px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              INTÉRÊTS
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {displayData.interests.map((interest: any, i: number) => (
                <li key={i} style={{ fontSize: '11px', color: '#d0d8e0', marginBottom: '8px' }}>
                  {typeof interest === 'string' ? interest : interest.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div style={{
        flex: 1,
        padding: '40px 45px',
        background: '#ffffff',
      }}>
        {/* Name and Title */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1e3a5f',
            margin: '0 0 8px 0',
            letterSpacing: '1px',
          }}>
            {displayData.personal?.fullName || 'Your Name'}
          </h1>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4a4a4a',
            margin: '0 0 20px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {displayData.personal?.title || 'Professional Title'}
          </h2>
          {displayData.summary && (
            <p style={{
              fontSize: '11px',
              lineHeight: '1.8',
              color: '#4a4a4a',
              margin: 0,
            }}>
              {displayData.summary}
            </p>
          )}
        </div>

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
              <div style={{ marginBottom: '35px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: '#1e3a5f',
                  padding: '12px 20px',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  EXPÉRIENCES PROFESSIONNELLES
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '25px', paddingLeft: '25px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3a5f',
                      borderRadius: '50%',
                    }} />
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.position} - {exp.company}
                    </h4>
                    <p style={{
                      fontSize: '10px',
                      color: '#808080',
                      margin: '0 0 10px 0',
                      textTransform: 'uppercase',
                    }}>
                      {exp.startDate} - {exp.endDate || 'ACTUEL'}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '11px',
                        lineHeight: '1.7',
                        color: '#4a4a4a',
                        margin: '0 0 8px 0',
                      }}>
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '18px', listStyle: 'disc' }}>
                        {exp.achievements.map((achievement: string, j: number) => (
                          <li key={j} style={{
                            fontSize: '11px',
                            lineHeight: '1.7',
                            color: '#4a4a4a',
                            marginBottom: '5px',
                          }}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.experience && displayData.experience.length > 0 && (
              <div style={{ marginBottom: '35px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: '#1e3a5f',
                  padding: '12px 20px',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  EXPÉRIENCES PROFESSIONNELLES
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '25px', paddingLeft: '25px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3a5f',
                      borderRadius: '50%',
                    }} />
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      margin: '0 0 5px 0',
                    }}>
                      {exp.position} - {exp.company}
                    </h4>
                    <p style={{
                      fontSize: '10px',
                      color: '#808080',
                      margin: '0 0 10px 0',
                      textTransform: 'uppercase',
                    }}>
                      {exp.startDate} - {exp.endDate || 'ACTUEL'}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '11px',
                        lineHeight: '1.7',
                        color: '#4a4a4a',
                        margin: '0 0 8px 0',
                      }}>
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '18px', listStyle: 'disc' }}>
                        {exp.achievements.map((achievement: string, j: number) => (
                          <li key={j} style={{
                            fontSize: '11px',
                            lineHeight: '1.7',
                            color: '#4a4a4a',
                            marginBottom: '5px',
                          }}>
                            {achievement}
                          </li>
                        ))}
                      </ul>
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
                  color: '#ffffff',
                  background: '#1e3a5f',
                  padding: '12px 20px',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  FORMATIONS
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px', paddingLeft: '25px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3a5f',
                      borderRadius: '50%',
                    }} />
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '10px',
                      color: '#808080',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#4a4a4a',
                      margin: 0,
                    }}>
                      {edu.institution}
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
                  color: '#ffffff',
                  background: '#1e3a5f',
                  padding: '12px 20px',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  FORMATIONS
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px', paddingLeft: '25px', position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '6px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3a5f',
                      borderRadius: '50%',
                    }} />
                    <h4 style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#1e3a5f',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '10px',
                      color: '#808080',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#4a4a4a',
                      margin: 0,
                    }}>
                      {edu.institution}
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
