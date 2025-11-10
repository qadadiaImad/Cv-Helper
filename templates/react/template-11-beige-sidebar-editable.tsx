/**
 * TEMPLATE 11: BEIGE SIDEBAR - EDITABLE VERSION
 * Clean professional CV with beige sidebar, hexagonal logo, and social links
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

export const BeigeSidebarEditable: React.FC<EditableTemplateProps> = ({ 
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
      backgroundColor: 'white',
      fontFamily: "'Open Sans', sans-serif",
    }}>
      {/* Top Bar - Full Width - Personal Info Editable */}
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
            height: '220px',
            backgroundColor: '#848484',
            color: 'white',
            width: '100%',
            position: 'relative',
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              height: '100%',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 'calc(350px + 5%)',
                right: '0',
                bottom: '0',
                height: '120px',
                textAlign: 'center',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '58px',
                  letterSpacing: '8px',
                  fontWeight: 100,
                  lineHeight: '60px',
                  textTransform: 'uppercase',
                  width: '94%',
                }}>
                  {displayData.personal?.fullName || 'Your Name'}
                </div>
              </div>
            </div>
          </div>
        </InlineSectionWrapper>
      ) : (
        <div style={{
          height: '220px',
          backgroundColor: '#848484',
          color: 'white',
          width: '100%',
          position: 'relative',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            height: '100%',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(350px + 5%)',
              right: '0',
              bottom: '0',
              height: '120px',
              textAlign: 'center',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: '58px',
                letterSpacing: '8px',
                fontWeight: 100,
                lineHeight: '60px',
                textTransform: 'uppercase',
                width: '94%',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '1200px',
        backgroundColor: 'white',
      }}>
        {/* Sidebar */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '5%',
          width: '350px',
          backgroundColor: '#F7E0C1',
          padding: '320px 30px 50px',
          minHeight: 'calc(100% - 60px)',
        }}>
          {/* Hexagonal Logo */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '70px',
            height: '210px',
            width: '210px',
          }}>
            <div style={{
              position: 'relative',
              margin: '-23px',
              height: '250px',
              width: '250px',
            }}>
              <svg viewBox="0 0 80 80" style={{
                height: '100%',
                width: '100%',
                stroke: 'black',
                strokeWidth: '2.5',
                fill: 'none',
              }}>
                <path d="M 10 10 L 52 10 L 72 30 L 72 70 L 30 70 L 10 50 Z" />
              </svg>
              <p style={{
                position: 'absolute',
                top: '58%',
                left: '16%',
                margin: 0,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '55px',
                fontWeight: 400,
                lineHeight: '60px',
                letterSpacing: '0px',
              }}>
                {displayData.personal?.fullName?.split(' ').map((n: string) => n[0]).join('').toLowerCase() || 'yn'}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
            {displayData.personal?.location || '123 My Place Drive'}
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '16px', lineHeight: '24px' }}>
            {displayData.personal?.phone || '1-800-CALLPLZ'}
          </p>
          <p style={{ margin: '0 0 20px', fontSize: '16px', lineHeight: '24px' }}>
            {displayData.personal?.email || 'email@example.com'}
          </p>

          {/* Social Links */}
          {displayData.personal?.linkedIn && (
            <p style={{
              position: 'relative',
              paddingLeft: '60px',
              marginBottom: '20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              <span style={{
                position: 'absolute',
                top: '-4px',
                left: '10px',
                height: '35px',
                width: '35px',
                display: 'inline-block',
              }}>
                🔗
              </span>
              LinkedIn
            </p>
          )}
          {displayData.personal?.website && (
            <p style={{
              position: 'relative',
              paddingLeft: '60px',
              marginBottom: '20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              <span style={{
                position: 'absolute',
                top: '-4px',
                left: '10px',
                height: '35px',
                width: '35px',
                display: 'inline-block',
              }}>
                🌐
              </span>
              Website
            </p>
          )}

          {/* Expertise - Skills Editable */}
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
                <div>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '4px',
                    fontWeight: 600,
                    lineHeight: '28px',
                    textTransform: 'uppercase',
                    margin: '60px auto 10px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #888',
                  }}>
                    Expertise
                  </p>
                  {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                    <p key={i} style={{
                      paddingLeft: '25px',
                      marginBottom: '10px',
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}>
                      {skill}
                    </p>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '4px',
                    fontWeight: 600,
                    lineHeight: '28px',
                    textTransform: 'uppercase',
                    margin: '60px auto 10px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #888',
                  }}>
                    Expertise
                  </p>
                  {displayData.skills.slice(0, 6).map((skill: string, i: number) => (
                    <p key={i} style={{
                      paddingLeft: '25px',
                      marginBottom: '10px',
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}>
                      {skill}
                    </p>
                  ))}
                </div>
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
                <div>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '4px',
                    fontWeight: 600,
                    lineHeight: '28px',
                    textTransform: 'uppercase',
                    margin: '60px auto 10px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #888',
                  }}>
                    Education
                  </p>
                  {displayData.education.map((edu: any, i: number) => (
                    <p key={i} style={{
                      paddingLeft: '25px',
                      marginBottom: '10px',
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}>
                      {edu.degree}
                    </p>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.education && displayData.education.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '4px',
                    fontWeight: 600,
                    lineHeight: '28px',
                    textTransform: 'uppercase',
                    margin: '60px auto 10px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #888',
                  }}>
                    Education
                  </p>
                  {displayData.education.map((edu: any, i: number) => (
                    <p key={i} style={{
                      paddingLeft: '25px',
                      marginBottom: '10px',
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}>
                      {edu.degree}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Main Content */}
        <div style={{
          marginRight: '0',
          width: 'calc(95% - 350px)',
          padding: '25px 40px 50px',
          marginLeft: 'auto',
        }}>
          {/* Title */}
          <h2 style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '30px',
            letterSpacing: '5px',
            fontWeight: 600,
            lineHeight: '40px',
            color: 'black',
            width: '80%',
            textAlign: 'center',
            margin: '0 auto 25px',
            textTransform: 'uppercase',
          }}>
            {displayData.personal?.title || 'Professional Title'}
          </h2>

          {/* Separator */}
          <div style={{
            width: '240px',
            height: '2px',
            backgroundColor: '#999',
            margin: '0 auto 25px',
          }} />

          {/* Profile Section */}
          <div style={{
            backgroundColor: '#DDD',
            width: '100%',
            maxWidth: '580px',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '18px',
            letterSpacing: '6px',
            fontWeight: 600,
            lineHeight: '28px',
            textTransform: 'uppercase',
            margin: '0 auto 25px',
            padding: '8px 0',
          }}>
            Profile
          </div>

          <p style={{
            fontSize: '18px',
            lineHeight: '28px',
            fontWeight: 400,
            margin: '0 auto 50px',
            textAlign: 'justify',
          }}>
            {displayData.summary || 'Professional summary goes here...'}
          </p>

          {/* Experience Section - Editable */}
          <div style={{
            backgroundColor: '#DDD',
            width: '100%',
            maxWidth: '580px',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '18px',
            letterSpacing: '6px',
            fontWeight: 600,
            lineHeight: '28px',
            textTransform: 'uppercase',
            margin: '0 auto 25px',
            padding: '8px 0',
          }}>
            Experience
          </div>

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
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <h3 style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '21px',
                        letterSpacing: '1px',
                        fontWeight: 600,
                        lineHeight: '28px',
                        color: 'black',
                        margin: '0 auto 5px',
                      }}>
                        {exp.position}
                      </h3>
                      <p style={{
                        color: '#777',
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: '0 auto 10px',
                      }}>
                        {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      {exp.description && (
                        <p style={{
                          fontSize: '18px',
                          lineHeight: '28px',
                          fontWeight: 400,
                          margin: '0 auto 25px',
                          textAlign: 'justify',
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
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <h3 style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: '21px',
                        letterSpacing: '1px',
                        fontWeight: 600,
                        lineHeight: '28px',
                        color: 'black',
                        margin: '0 auto 5px',
                      }}>
                        {exp.position}
                      </h3>
                      <p style={{
                        color: '#777',
                        fontSize: '18px',
                        lineHeight: '28px',
                        margin: '0 auto 10px',
                      }}>
                        {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                      {exp.description && (
                        <p style={{
                          fontSize: '18px',
                          lineHeight: '28px',
                          fontWeight: 400,
                          margin: '0 auto 25px',
                          textAlign: 'justify',
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
    </div>
  )
}
