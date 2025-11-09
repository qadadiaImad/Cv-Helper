/**
 * TEMPLATE 18: BLUE CIRCULAR - EDITABLE VERSION
 * Modern French CV with dark blue sidebar, circular profile photo, and timeline layout
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

export const BlueCircularEditable: React.FC<EditableTemplateProps> = ({ 
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
      {/* Left Dark Blue Sidebar */}
      <div style={{
        width: '238px', // Fixed width (28% of 850px)
        background: '#1e3d5c',
        padding: '0',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Circular Profile Photo with Curved Background */}
        <div style={{
          position: 'relative',
          height: '220px',
          background: '#1e3d5c',
          marginBottom: '40px',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '-1px',
            right: '-1px',
            width: '100%',
            height: '120px',
            background: '#d0d4d8',
            borderTopLeftRadius: '100%',
          }} />
          
          <div style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid #ffffff',
            background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
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
        </div>

        {/* Coordonnées Section */}
        <div style={{ padding: '0 25px 30px' }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 15px 0',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            COORDONNÉES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {displayData.personal?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📞</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                  {displayData.personal.phone}
                </span>
              </div>
            )}
            {displayData.personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>✉️</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0', wordBreak: 'break-all' }}>
                  {displayData.personal.email}
                </span>
              </div>
            )}
            {displayData.personal?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ fontSize: '10px', color: '#d0d8e0' }}>
                  {displayData.personal.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Langues Section */}
        {displayData.languages && displayData.languages.length > 0 && (
          <div style={{ padding: '0 25px 30px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 15px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              LANGUES
            </h3>
            {displayData.languages.map((lang: any, i: number) => {
              const levels = [100, 80, 60];
              const level = levels[i] || 50;
              return (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#ffffff',
                    marginBottom: '6px',
                  }}>
                    {typeof lang === 'string' ? lang : lang.name}
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${level}%`,
                      height: '100%',
                      background: '#ffffff',
                      borderRadius: '3px',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compétences Section - Skills Editable */}
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
              <div style={{ padding: '0 25px 30px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 15px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  COMPÉTENCES
                </h3>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '10px',
                      color: '#d0d8e0',
                      marginBottom: '8px',
                      paddingLeft: '12px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '5px',
                        width: '4px',
                        height: '4px',
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
              <div style={{ padding: '0 25px 30px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 15px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  COMPÉTENCES
                </h3>
                <ul style={{
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '10px',
                      color: '#d0d8e0',
                      marginBottom: '8px',
                      paddingLeft: '12px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '5px',
                        width: '4px',
                        height: '4px',
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

        {/* Centres d'Intérêt Section */}
        {displayData.interests && displayData.interests.length > 0 && (
          <div style={{ padding: '0 25px 30px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 15px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              CENTRES D'INTÉRÊT
            </h3>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}>
              {displayData.interests.map((interest: any, i: number) => (
                <li key={i} style={{
                  fontSize: '10px',
                  color: '#d0d8e0',
                  marginBottom: '8px',
                }}>
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
        padding: '40px 40px',
        background: '#d0d4d8',
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
            <div style={{ marginBottom: '35px' }}>
              <h1 style={{
                fontSize: '38px',
                fontWeight: 700,
                color: '#1e3d5c',
                margin: '0 0 5px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#4a4a4a',
                margin: '0',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.title || 'Professional Title'}
              </h2>
            </div>
          </InlineSectionWrapper>
        ) : (
          <div style={{ marginBottom: '35px' }}>
            <h1 style={{
              fontSize: '38px',
              fontWeight: 700,
              color: '#1e3d5c',
              margin: '0 0 5px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              {displayData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 400,
              color: '#4a4a4a',
              margin: '0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              {displayData.personal?.title || 'Professional Title'}
            </h2>
          </div>
        )}

        {/* Formation Section - Education Editable */}
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
              <div style={{ marginBottom: '35px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  FORMATION
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ 
                    marginBottom: '20px', 
                    paddingLeft: '20px', 
                    position: 'relative',
                    borderLeft: '2px solid #1e3d5c',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '5px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3d5c',
                      borderRadius: '50%',
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h4 style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#1e3d5c',
                        margin: 0,
                      }}>
                        {edu.degree}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        color: '#808080',
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '10px',
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
              <div style={{ marginBottom: '35px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  FORMATION
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ 
                    marginBottom: '20px', 
                    paddingLeft: '20px', 
                    position: 'relative',
                    borderLeft: '2px solid #1e3d5c',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '5px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3d5c',
                      borderRadius: '50%',
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h4 style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#1e3d5c',
                        margin: 0,
                      }}>
                        {edu.degree}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        color: '#808080',
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '10px',
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

        {/* Expérience Professionnelle Section - Experience Editable */}
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
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  EXPÉRIENCE PROFESSIONNELLE
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ 
                    marginBottom: '25px', 
                    paddingLeft: '20px', 
                    position: 'relative',
                    borderLeft: '2px solid #1e3d5c',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '5px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3d5c',
                      borderRadius: '50%',
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h4 style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#1e3d5c',
                        margin: 0,
                      }}>
                        {exp.position}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        color: '#808080',
                      }}>
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '10px',
                      color: '#4a4a4a',
                      margin: '0 0 8px 0',
                      fontStyle: 'italic',
                    }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '10px',
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
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e3d5c',
                  margin: '0 0 20px 0',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  EXPÉRIENCE PROFESSIONNELLE
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ 
                    marginBottom: '25px', 
                    paddingLeft: '20px', 
                    position: 'relative',
                    borderLeft: '2px solid #1e3d5c',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '5px',
                      width: '10px',
                      height: '10px',
                      background: '#1e3d5c',
                      borderRadius: '50%',
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h4 style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#1e3d5c',
                        margin: 0,
                      }}>
                        {exp.position}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        color: '#808080',
                      }}>
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '10px',
                      color: '#4a4a4a',
                      margin: '0 0 8px 0',
                      fontStyle: 'italic',
                    }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p style={{
                        fontSize: '10px',
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
      </div>
    </div>
  )
}
