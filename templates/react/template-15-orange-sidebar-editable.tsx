/**
 * TEMPLATE 15: ORANGE SIDEBAR - EDITABLE VERSION
 * Modern three-column CV with dark sidebar, white content, and orange contact section
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

export const OrangeSidebarEditable: React.FC<EditableTemplateProps> = ({ 
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
      background: '#ffffff',
      display: 'flex',
      fontFamily: "'Arial', 'Helvetica', sans-serif",
    }}>
      {/* Left Dark Sidebar */}
      <div style={{
        width: '30%',
        background: '#3d3d3d',
        padding: '0',
        position: 'relative',
      }}>
        {/* Profile Photo */}
        <div style={{
          width: '100%',
          height: '280px',
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2d2d2d 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="45" r="25" fill="#ffffff" opacity="0.3" />
              <path
                d="M25 110C25 85.147 45.147 65 70 65C94.853 65 115 85.147 115 110"
                fill="#ffffff"
                opacity="0.3"
              />
            </svg>
          )}
        </div>

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
            <div style={{ padding: '35px 30px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 5px 0',
                lineHeight: '1.1',
              }}>
                {displayData.personal?.fullName?.split(' ')[0] || 'First'}
              </h1>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 12px 0',
                lineHeight: '1.1',
              }}>
                {displayData.personal?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
              </h1>
              <h2 style={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#a0a0a0',
                margin: '0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.title || 'Professional Title'}
              </h2>
            </div>
          </InlineSectionWrapper>
        ) : (
          <div style={{ padding: '35px 30px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 5px 0',
              lineHeight: '1.1',
            }}>
              {displayData.personal?.fullName?.split(' ')[0] || 'First'}
            </h1>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 12px 0',
              lineHeight: '1.1',
            }}>
              {displayData.personal?.fullName?.split(' ').slice(1).join(' ') || 'Last'}
            </h1>
            <h2 style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#a0a0a0',
              margin: '0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              {displayData.personal?.title || 'Professional Title'}
            </h2>
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
              <div style={{ padding: '0 30px 30px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 18px 0',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  SKILLS
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '12px',
                      color: '#c0c0c0',
                      marginBottom: '10px',
                      paddingLeft: '18px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '6px',
                        height: '6px',
                        background: '#ff6347',
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
              <div style={{ padding: '0 30px 30px' }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: '0 0 18px 0',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  SKILLS
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                    <li key={i} style={{
                      fontSize: '12px',
                      color: '#c0c0c0',
                      marginBottom: '10px',
                      paddingLeft: '18px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '6px',
                        height: '6px',
                        background: '#ff6347',
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

        {/* Languages Section */}
        {displayData.languages && displayData.languages.length > 0 && (
          <div style={{ padding: '0 30px 30px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 18px 0',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              LANGUAGES
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {displayData.languages.map((lang: any, i: number) => (
                <li key={i} style={{
                  fontSize: '12px',
                  color: '#c0c0c0',
                  marginBottom: '8px',
                }}>
                  {typeof lang === 'string' ? lang : lang.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content Area - with horizontal sections */}
      <div style={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top Section - Profile, Education, Experience (Light Gray) */}
        <div style={{
          flex: 1,
          padding: '50px 40px',
          background: '#e8e8e8',
        }}>
          {/* Profile Section */}
          {displayData.summary && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#2d2d2d',
                margin: '0 0 15px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                PROFILE
              </h3>
              <p style={{
                fontSize: '12px',
                lineHeight: '1.8',
                color: '#4a4a4a',
                margin: 0,
              }}>
                {displayData.summary}
              </p>
            </div>
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
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0 0 20px 0',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    EDUCATION
                  </h3>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: '0 0 5px 0',
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 3px 0',
                      }}>
                        {edu.degree}
                      </h4>
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
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0 0 20px 0',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    EDUCATION
                  </h3>
                  {displayData.education.map((edu: any, i: number) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: '0 0 5px 0',
                      }}>
                        {edu.startDate} - {edu.endDate}
                      </p>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 3px 0',
                      }}>
                        {edu.degree}
                      </h4>
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
                <div>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0 0 20px 0',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    EXPERIENCE
                  </h3>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '25px' }}>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.position}
                      </h4>
                      <p style={{
                        fontSize: '11px',
                        color: '#4a4a4a',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.description || 'Collaboration with dev team to solve for UI/UX problems'}
                      </p>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: 0,
                        fontStyle: 'italic',
                      }}>
                        {exp.company}
                      </p>
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
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2d2d2d',
                    margin: '0 0 20px 0',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    EXPERIENCE
                  </h3>
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '25px' }}>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      <h4 style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#2d2d2d',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.position}
                      </h4>
                      <p style={{
                        fontSize: '11px',
                        color: '#4a4a4a',
                        margin: '0 0 5px 0',
                      }}>
                        {exp.description || 'Collaboration with dev team to solve for UI/UX problems'}
                      </p>
                      <p style={{
                        fontSize: '10px',
                        color: '#808080',
                        margin: 0,
                        fontStyle: 'italic',
                      }}>
                        {exp.company}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Section - Contact (Orange) */}
        <div style={{
          background: '#ff6347',
          padding: '40px 40px',
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 25px 0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            CONTACT
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Phone */}
            {displayData.personal?.phone && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '200px',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13 9.5v2a1.5 1.5 0 01-1.64 1.5A13 13 0 011 3.64 1.5 1.5 0 012.5 2h2a1.5 1.5 0 011.5 1.29c.1.76.28 1.5.54 2.21a1.5 1.5 0 01-.34 1.58l-.85.84a12 12 0 005.73 5.73l.84-.85a1.5 1.5 0 011.58-.34c.71.26 1.45.44 2.21.54A1.5 1.5 0 0113 9.5z" fill="#ffffff"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  lineHeight: '1.4',
                }}>
                  {displayData.personal.phone}
                </span>
              </div>
            )}

            {/* Email */}
            {displayData.personal?.email && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '200px',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h10a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                    <path d="M13 3L7 8 1 3" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  lineHeight: '1.4',
                  wordBreak: 'break-all',
                }}>
                  {displayData.personal.email}
                </span>
              </div>
            )}

            {/* Website */}
            {displayData.personal?.website && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '200px',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                    <path d="M7 1.5v11M1.5 7h11" stroke="#ffffff" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  lineHeight: '1.4',
                  wordBreak: 'break-all',
                }}>
                  {displayData.personal.website}
                </span>
              </div>
            )}

            {/* Location */}
            {displayData.personal?.location && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '200px',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1a5 5 0 00-5 5c0 3.5 5 7 5 7s5-3.5 5-7a5 5 0 00-5-5z" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
                    <circle cx="7" cy="6" r="1.5" fill="#ffffff"/>
                  </svg>
                </div>
                <span style={{
                  fontSize: '11px',
                  color: '#ffffff',
                  lineHeight: '1.4',
                }}>
                  {displayData.personal.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
