/**
 * TEMPLATE 16: TEAL ROUNDED - EDITABLE VERSION
 * Modern CV with dark teal background, circular profile photo, and rounded white sections
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

export const TealRoundedEditable: React.FC<EditableTemplateProps> = ({ 
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
      width: '850px',
      minHeight: '1200px',
      background: 'linear-gradient(135deg, #0a4d4d 0%, #0d5858 50%, #0a4040 100%)',
      padding: '40px',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
      position: 'relative',
    }}>
      {/* Header Section with Photo and Name - Personal Info Editable */}
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
            alignItems: 'center',
            marginBottom: '30px',
            gap: '30px',
          }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '5px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0,
              background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {photoUrl && !photoHidden ? (
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
              ) : (
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                  <circle cx="35" cy="25" r="12" fill="#999999" opacity="0.5" />
                  <path
                    d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
                    fill="#999999"
                    opacity="0.5"
                  />
                </svg>
              )}
            </div>

            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 8px 0',
                letterSpacing: '0.5px',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#b0d4d4',
                margin: '0',
                letterSpacing: '0.5px',
              }}>
                {displayData.personal?.title || 'Professional Title'}
              </h2>
            </div>
          </div>
        </InlineSectionWrapper>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '30px',
        }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid rgba(255, 255, 255, 0.2)',
            flexShrink: 0,
            background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {photoUrl && !photoHidden ? (
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
            ) : (
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                <circle cx="35" cy="25" r="12" fill="#999999" opacity="0.5" />
                <path
                  d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
                  fill="#999999"
                  opacity="0.5"
                />
              </svg>
            )}
          </div>

          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 8px 0',
              letterSpacing: '0.5px',
            }}>
              {displayData.personal?.fullName || 'Your Name'}
            </h1>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#b0d4d4',
              margin: '0',
              letterSpacing: '0.5px',
            }}>
              {displayData.personal?.title || 'Professional Title'}
            </h2>
          </div>
        </div>
      )}

      {/* Profile Summary - Rounded White Box */}
      {displayData.summary && (
        <div style={{
          background: '#ffffff',
          borderRadius: '15px',
          padding: '25px 30px',
          marginBottom: '25px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        }}>
          <p style={{
            fontSize: '12px',
            lineHeight: '1.8',
            color: '#2d2d2d',
            margin: 0,
          }}>
            {displayData.summary}
          </p>
        </div>
      )}

      {/* Two Column Layout */}
      <div style={{
        display: 'flex',
        gap: '25px',
      }}>
        {/* Left Column */}
        <div style={{
          width: '35%',
        }}>
          {/* Contact Section */}
          <div style={{
            background: '#0a3838',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '25px',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px',
            }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {displayData.personal?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '12px' }}>📞</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                    {displayData.personal.phone}
                  </span>
                </div>
              )}
              {displayData.personal?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '12px' }}>✉️</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                    {displayData.personal.email}
                  </span>
                </div>
              )}
              {displayData.personal?.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '12px' }}>🌐</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#b0d4d4', wordBreak: 'break-all' }}>
                    {displayData.personal.website}
                  </span>
                </div>
              )}
              {displayData.personal?.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: '12px' }}>📍</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#b0d4d4' }}>
                    {displayData.personal.location}
                  </span>
                </div>
              )}
            </div>
          </div>

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
                <div style={{
                  background: '#0a3838',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '25px',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Education
                  </h3>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < displayData.education.length - 1 ? '20px' : '0' }}>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 5px 0',
                      }}>
                        {edu.institution}
                      </h4>
                      <p style={{
                        fontSize: '11px',
                        color: '#b0d4d4',
                        margin: '0 0 3px 0',
                      }}>
                        {edu.degree}
                      </p>
                      <p style={{
                        fontSize: '10px',
                        color: '#80a8a8',
                        margin: 0,
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.education && displayData.education.length > 0 && (
                <div style={{
                  background: '#0a3838',
                  borderRadius: '15px',
                  padding: '25px',
                  marginBottom: '25px',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Education
                  </h3>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < displayData.education.length - 1 ? '20px' : '0' }}>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 5px 0',
                      }}>
                        {edu.institution}
                      </h4>
                      <p style={{
                        fontSize: '11px',
                        color: '#b0d4d4',
                        margin: '0 0 3px 0',
                      }}>
                        {edu.degree}
                      </p>
                      <p style={{
                        fontSize: '10px',
                        color: '#80a8a8',
                        margin: 0,
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Award Section */}
          {displayData.certifications && displayData.certifications.length > 0 && (
            <div style={{
              background: '#0a3838',
              borderRadius: '15px',
              padding: '25px',
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 20px 0',
                letterSpacing: '0.5px',
              }}>
                Award
              </h3>
              {displayData.certifications.slice(0, 1).map((cert: any, i: number) => (
                <div key={i}>
                  <h4 style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: '0 0 5px 0',
                  }}>
                    {cert.name}
                  </h4>
                  <p style={{
                    fontSize: '11px',
                    color: '#b0d4d4',
                    margin: 0,
                  }}>
                    {cert.issuer} | {cert.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{
          width: '65%',
        }}>
          {/* Work Experience Section - Editable */}
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
                <div style={{
                  background: '#ffffff',
                  borderRadius: '15px',
                  padding: '25px 30px',
                  marginBottom: '25px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0a4d4d',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Work Experience
                  </h3>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < displayData.experience.length - 1 ? '25px' : '0' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0a4d4d',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.company} ({exp.startDate} - {exp.endDate || 'Present'})
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 10px 0',
                      }}>
                        {exp.position}
                      </p>
                      {exp.description && (
                        <p style={{
                          fontSize: '11px',
                          lineHeight: '1.7',
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
                <div style={{
                  background: '#ffffff',
                  borderRadius: '15px',
                  padding: '25px 30px',
                  marginBottom: '25px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0a4d4d',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Work Experience
                  </h3>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: i < displayData.experience.length - 1 ? '25px' : '0' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0a4d4d',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.company} ({exp.startDate} - {exp.endDate || 'Present'})
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 10px 0',
                      }}>
                        {exp.position}
                      </p>
                      {exp.description && (
                        <p style={{
                          fontSize: '11px',
                          lineHeight: '1.7',
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
                <div style={{
                  background: '#ffffff',
                  borderRadius: '15px',
                  padding: '25px 30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0a4d4d',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Skills
                  </h3>
                  {displayData.skills.slice(0, 5).map((skill: string, i: number) => {
                    const percentages = [90, 85, 80, 75, 70];
                    const percent = percentages[i] || 70;
                    return (
                      <div key={i} style={{ marginBottom: '15px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px',
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: '#2d2d2d',
                            fontWeight: 500,
                          }}>
                            {skill}
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: '#e8e8e8',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${percent}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #0d5858 0%, #0a4d4d 100%)',
                            borderRadius: '4px',
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
                <div style={{
                  background: '#ffffff',
                  borderRadius: '15px',
                  padding: '25px 30px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0a4d4d',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.5px',
                  }}>
                    Skills
                  </h3>
                  {displayData.skills.slice(0, 5).map((skill: string, i: number) => {
                    const percentages = [90, 85, 80, 75, 70];
                    const percent = percentages[i] || 70;
                    return (
                      <div key={i} style={{ marginBottom: '15px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '8px',
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: '#2d2d2d',
                            fontWeight: 500,
                          }}>
                            {skill}
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: '#e8e8e8',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: `${percent}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #0d5858 0%, #0a4d4d 100%)',
                            borderRadius: '4px',
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
