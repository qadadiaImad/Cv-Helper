/**
 * TEMPLATE 10: TEAL MODERN - EDITABLE VERSION
 * Modern CV with teal header and sidebar, clean layout with checkmark sections
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

export const TealModernEditable: React.FC<EditableTemplateProps> = ({ 
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
      background: '#E8E8E8',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Teal Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2DBFB8 0%, #1FA39C 100%)',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        position: 'relative',
      }}>
        {/* Profile Photo */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '8px solid white',
          background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '40px',
          overflow: 'hidden',
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
              <circle cx="35" cy="26" r="14" fill="#7BA8C0" opacity="0.6" />
              <path
                d="M12 60C12 47.297 22.297 37 35 37C47.703 37 58 47.297 58 60"
                fill="#7BA8C0"
                opacity="0.6"
              />
            </svg>
          )}
        </div>

        {/* Header Contact Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginLeft: 'auto',
        }}>
          {displayData.personal?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: '14px' }}>📧</span>
              </div>
              <span style={{
                color: 'white',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                {displayData.personal.email}
              </span>
            </div>
          )}
          {displayData.personal?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: '14px' }}>📱</span>
              </div>
              <span style={{
                color: 'white',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                {displayData.personal.phone}
              </span>
            </div>
          )}
          {displayData.personal?.linkedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: '14px' }}>🔗</span>
              </div>
              <span style={{
                color: 'white',
                fontSize: '12px',
                fontWeight: 500,
              }}>
                {displayData.personal.linkedIn}
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '30px',
        padding: '100px 40px 40px',
      }}>
        {/* Left Sidebar */}
        <div>
          {/* Interests Section */}
          {displayData.interests && displayData.interests.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #B8B8B8 0%, #A0A0A0 100%)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                background: '#2DBFB8',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
                INTERESTS
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {displayData.interests.slice(0, 6).map((interest: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    }}>
                      {['🎨', '⚽', '📚', '🎵', '✈️', '💻'][i % 6]}
                    </div>
                    <div style={{
                      flex: 1,
                      fontSize: '12px',
                      color: 'white',
                      fontWeight: 500,
                    }}>
                      {typeof interest === 'string' ? interest : interest.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    color: '#2DBFB8',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}>
                    Skills
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <div key={i} style={{
                        fontSize: '12px',
                        color: '#666666',
                        padding: '6px 12px',
                        background: 'white',
                        borderRadius: '6px',
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
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
                    color: '#2DBFB8',
                    marginBottom: '16px',
                    textTransform: 'uppercase',
                  }}>
                    Skills
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}>
                    {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                      <div key={i} style={{
                        fontSize: '12px',
                        color: '#666666',
                        padding: '6px 12px',
                        background: 'white',
                        borderRadius: '6px',
                      }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Content Area */}
        <div>
          {/* Name Header - Personal Info Editable */}
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
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '3px solid #2DBFB8',
              }}>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>
                  {displayData.personal?.fullName || 'Your Name'}
                </h1>
                {displayData.personal?.title && (
                  <h2 style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#666666',
                  }}>
                    {displayData.personal.title}
                  </h2>
                )}
              </div>
            </InlineSectionWrapper>
          ) : (
            <div style={{
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '3px solid #2DBFB8',
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#333333',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>
              {displayData.personal?.title && (
                <h2 style={{
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#666666',
                }}>
                  {displayData.personal.title}
                </h2>
              )}
            </div>
          )}

          {/* Summary Section */}
          {displayData.summary && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#333333',
                marginBottom: '12px',
                textTransform: 'uppercase',
              }}>
                Professional Summary
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#666666',
                lineHeight: 1.6,
              }}>
                {displayData.summary}
              </p>
            </div>
          )}

          {/* Experience Sections with Checkmarks - Editable */}
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
                <div>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '40px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '16px',
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: '#2DBFB8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#333333',
                            marginBottom: '4px',
                          }}>
                            {exp.position}
                          </h3>
                          <div style={{
                            fontSize: '13px',
                            color: '#666666',
                          }}>
                            {exp.company}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        paddingLeft: '64px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#2DBFB8',
                          fontWeight: 600,
                          marginBottom: '8px',
                        }}>
                          ✓ {exp.company?.toUpperCase()}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#666666',
                          lineHeight: 1.5,
                        }}>
                          {exp.startDate} - {exp.endDate || 'Present'}
                          {exp.location && ` • ${exp.location}`}
                        </div>
                      </div>

                      {exp.description && (
                        <div style={{ paddingLeft: '64px' }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#2DBFB8',
                            fontWeight: 600,
                            marginBottom: '8px',
                          }}>
                            ✓ KEY RESPONSIBILITIES
                          </div>
                          <p style={{
                            fontSize: '12px',
                            color: '#666666',
                            lineHeight: 1.6,
                          }}>
                            {exp.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.experience && displayData.experience.length > 0 && (
                <div>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '40px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '16px',
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: '#2DBFB8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#333333',
                            marginBottom: '4px',
                          }}>
                            {exp.position}
                          </h3>
                          <div style={{
                            fontSize: '13px',
                            color: '#666666',
                          }}>
                            {exp.company}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        paddingLeft: '64px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          fontSize: '12px',
                          color: '#2DBFB8',
                          fontWeight: 600,
                          marginBottom: '8px',
                        }}>
                          ✓ {exp.company?.toUpperCase()}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#666666',
                          lineHeight: 1.5,
                        }}>
                          {exp.startDate} - {exp.endDate || 'Present'}
                          {exp.location && ` • ${exp.location}`}
                        </div>
                      </div>

                      {exp.description && (
                        <div style={{ paddingLeft: '64px' }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#2DBFB8',
                            fontWeight: 600,
                            marginBottom: '8px',
                          }}>
                            ✓ KEY RESPONSIBILITIES
                          </div>
                          <p style={{
                            fontSize: '12px',
                            color: '#666666',
                            lineHeight: 1.6,
                          }}>
                            {exp.description}
                          </p>
                        </div>
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
                <div style={{ marginTop: '40px' }}>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: '#2DBFB8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#333333',
                            marginBottom: '4px',
                          }}>
                            {edu.degree}
                          </h4>
                          <div style={{
                            fontSize: '13px',
                            color: '#666666',
                          }}>
                            {edu.institution}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.education && displayData.education.length > 0 && (
                <div style={{ marginTop: '40px' }}>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: '#2DBFB8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(45, 191, 184, 0.3)',
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#333333',
                            marginBottom: '4px',
                          }}>
                            {edu.degree}
                          </h4>
                          <div style={{
                            fontSize: '13px',
                            color: '#666666',
                          }}>
                            {edu.institution}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
