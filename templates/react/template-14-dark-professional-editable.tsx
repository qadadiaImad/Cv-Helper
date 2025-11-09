/**
 * TEMPLATE 14: DARK PROFESSIONAL - EDITABLE VERSION
 * Modern dark CV with geometric patterns and green accents
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

export const DarkProfessionalEditable: React.FC<EditableTemplateProps> = ({ 
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
      background: 'linear-gradient(135deg, #0a2e2e 0%, #1a3a3a 50%, #0f2626 100%)',
      fontFamily: "'Segoe UI', 'Arial', sans-serif",
      position: 'relative',
    }}>
      {/* Geometric Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 35px,
          rgba(255,255,255,0.03) 35px,
          rgba(255,255,255,0.03) 70px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Main Layout Container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        minHeight: '1200px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>

      {/* Left Content Area */}
      <div style={{
        width: '55%',
        padding: '60px 50px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Name and Title - Personal Info Editable */}
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
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 300,
                color: '#ffffff',
                margin: '0 0 10px 0',
                letterSpacing: '1px',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>
              <h2 style={{
                fontSize: '16px',
                fontWeight: 400,
                color: '#a0a0a0',
                margin: '0 0 25px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.title || 'Professional Title'}
              </h2>
              <p style={{
                fontSize: '13px',
                lineHeight: '1.8',
                color: '#c0c0c0',
                margin: 0,
                maxWidth: '90%',
              }}>
                {displayData.summary || 'Professional summary goes here...'}
              </p>
            </div>
          </InlineSectionWrapper>
        ) : (
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 300,
              color: '#ffffff',
              margin: '0 0 10px 0',
              letterSpacing: '1px',
            }}>
              {displayData.personal?.fullName || 'Your Name'}
            </h1>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#a0a0a0',
              margin: '0 0 25px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              {displayData.personal?.title || 'Professional Title'}
            </h2>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#c0c0c0',
              margin: 0,
              maxWidth: '90%',
            }}>
              {displayData.summary || 'Professional summary goes here...'}
            </p>
          </div>
        )}

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
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 30px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Work Experience
                </h3>

                {displayData.experience.map((exp: any, i: number) => {
                  const icons = ['💼', '⚙️', '🎯', '🔧', '📊', '🎨'];
                  return (
                    <div key={i} style={{
                      marginBottom: '35px',
                      paddingLeft: '70px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}>
                        {icons[i % icons.length]}
                      </div>

                      {i < displayData.experience.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '24px',
                          top: '50px',
                          width: '2px',
                          height: 'calc(100% + 10px)',
                          background: 'rgba(255, 255, 255, 0.1)',
                        }} />
                      )}

                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.position}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: '#a0a0a0',
                        margin: '0 0 12px 0',
                      }}>
                        {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        lineHeight: '1.7',
                        color: '#c0c0c0',
                        margin: 0,
                      }}>
                        {exp.description || 'Job description goes here...'}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.experience && displayData.experience.length > 0 && (
              <div style={{ marginBottom: '50px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 30px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Work Experience
                </h3>

                {displayData.experience.map((exp: any, i: number) => {
                  const icons = ['💼', '⚙️', '🎯', '🔧', '📊', '🎨'];
                  return (
                    <div key={i} style={{
                      marginBottom: '35px',
                      paddingLeft: '70px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}>
                        {icons[i % icons.length]}
                      </div>

                      {i < displayData.experience.length - 1 && (
                        <div style={{
                          position: 'absolute',
                          left: '24px',
                          top: '50px',
                          width: '2px',
                          height: 'calc(100% + 10px)',
                          background: 'rgba(255, 255, 255, 0.1)',
                        }} />
                      )}

                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.position}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: '#a0a0a0',
                        margin: '0 0 12px 0',
                      }}>
                        {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        lineHeight: '1.7',
                        color: '#c0c0c0',
                        margin: 0,
                      }}>
                        {exp.description || 'Job description goes here...'}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <div style={{
        width: '45%',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '60px 40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Profile Photo */}
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #2a4a4a 0%, #1a3535 100%)',
          marginBottom: '40px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid rgba(255, 255, 255, 0.1)',
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
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="30" r="16" fill="#ffffff" opacity="0.3" />
              <path
                d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                fill="#ffffff"
                opacity="0.3"
              />
            </svg>
          )}
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
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0a0a0',
                      margin: '0 0 3px 0',
                    }}>
                      {edu.institution}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#808080',
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
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#ffffff',
                      margin: '0 0 5px 0',
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#a0a0a0',
                      margin: '0 0 3px 0',
                    }}>
                      {edu.institution}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#808080',
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
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Skills
                </h3>
                {displayData.skills.slice(0, 6).map((skill: string, i: number) => {
                  const percentages = [90, 85, 80, 75, 70, 65];
                  const percent = percentages[i] || 70;
                  return (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}>
                        <span style={{
                          fontSize: '13px',
                          color: '#ffffff',
                          fontWeight: 500,
                        }}>
                          {skill}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
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
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#ffffff',
                  margin: '0 0 25px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Skills
                </h3>
                {displayData.skills.slice(0, 6).map((skill: string, i: number) => {
                  const percentages = [90, 85, 80, 75, 70, 65];
                  const percent = percentages[i] || 70;
                  return (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}>
                        <span style={{
                          fontSize: '13px',
                          color: '#ffffff',
                          fontWeight: 500,
                        }}>
                          {skill}
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #4ade80 0%, #22c55e 100%)',
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

        {/* Contact Info Section */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#ffffff',
            margin: '0 0 25px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Contact Info
          </h3>
          {displayData.personal?.phone && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(74, 222, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px' }}>📞</span>
              </div>
              <span style={{
                fontSize: '12px',
                color: '#4ade80',
                fontWeight: 500,
              }}>
                {displayData.personal.phone}
              </span>
            </div>
          )}
          {displayData.personal?.email && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(74, 222, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px' }}>✉️</span>
              </div>
              <span style={{
                fontSize: '12px',
                color: '#4ade80',
                fontWeight: 500,
                wordBreak: 'break-all',
              }}>
                {displayData.personal.email}
              </span>
            </div>
          )}
          {displayData.personal?.website && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(74, 222, 128, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px' }}>🌐</span>
              </div>
              <span style={{
                fontSize: '12px',
                color: '#4ade80',
                fontWeight: 500,
                wordBreak: 'break-all',
              }}>
                {displayData.personal.website}
              </span>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
