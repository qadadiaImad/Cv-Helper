/**
 * TEMPLATE 9: CREATIVE ORANGE - EDITABLE VERSION
 * Creative CV with orange wave header and two-column layout with teal accents
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

export const CreativeOrangeEditable: React.FC<EditableTemplateProps> = ({ 
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: 'relative',
    }}>
      {/* Orange Wave Header - Full Width */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          zIndex: 0,
        }}
        viewBox="0 0 1920 180"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="50%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FFA040" />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L1920,0 L1920,120 Q1440,180 960,120 Q480,60 0,120 Z"
          fill="url(#orangeGradient)"
        />
      </svg>

      {/* Teal Wave Footer - Full Width */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '50%',
          height: '150px',
          zIndex: 0,
        }}
        viewBox="0 0 960 150"
        preserveAspectRatio="none"
      >
        <path
          d="M960,150 L960,50 Q720,80 480,50 Q240,20 0,50 L0,150 Z"
          fill="#2DBFB8"
        />
      </svg>

      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '0',
        position: 'relative',
        zIndex: 1,
        padding: '40px',
      }}>
        {/* Left Sidebar */}
        <div style={{ paddingRight: '30px' }}>
          {/* Profile Photo */}
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '8px solid #2DBFB8',
            background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
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
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="30" r="16" fill="#7BA8C0" opacity="0.6" />
                <path
                  d="M15 70C15 54.536 27.536 42 43 42C58.464 42 71 54.536 71 70"
                  fill="#7BA8C0"
                  opacity="0.6"
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
              <div>
                <h1 style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#FF6B4A',
                  textAlign: 'center',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                }}>
                  {displayData.personal?.fullName?.split(' ')[0] || 'First'}
                </h1>
                <h2 style={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#666666',
                  textAlign: 'center',
                  marginBottom: '30px',
                }}>
                  {displayData.personal?.title || 'Professional Title'}
                </h2>
              </div>
            </InlineSectionWrapper>
          ) : (
            <div>
              <h1 style={{
                fontFamily: "'Arial Black', sans-serif",
                fontSize: '28px',
                fontWeight: 900,
                color: '#FF6B4A',
                textAlign: 'center',
                marginBottom: '4px',
                textTransform: 'uppercase',
              }}>
                {displayData.personal?.fullName?.split(' ')[0] || 'First'}
              </h1>
              <h2 style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                color: '#666666',
                textAlign: 'center',
                marginBottom: '30px',
              }}>
                {displayData.personal?.title || 'Professional Title'}
              </h2>
            </div>
          )}

          {/* Disciplines Section */}
          <div style={{
            background: '#2DBFB8',
            color: 'white',
            padding: '8px 16px',
            marginLeft: '-10px',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>Disciplines</div>
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: 0,
              width: 0,
              height: 0,
              borderTop: '16px solid transparent',
              borderBottom: '16px solid transparent',
              borderLeft: '10px solid #2DBFB8',
            }} />
          </div>

          {/* Skills with Icons */}
          <div style={{ marginBottom: '30px' }}>
            {[
              { icon: '📱', title: 'Mobile Design', desc: 'User Interface & Experience' },
              { icon: '🏢', title: 'Corporate', desc: 'Business Solutions' },
              { icon: '⚙️', title: 'Development', desc: 'Technical Implementation' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#2DBFB8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#333333',
                    marginBottom: '2px',
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#666666',
                    lineHeight: 1.3,
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EDU Section */}
          <div style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#2DBFB8',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}>
            EDU
          </div>

          {/* Education Icons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '30px',
          }}>
            {['🎓', '💼', '👶', '👣'].map((icon, i) => (
              <div key={i} style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#E8E8E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}>
                {icon}
              </div>
            ))}
          </div>

          {/* Skills Section Header */}
          <div style={{
            background: '#FF6B4A',
            color: 'white',
            padding: '8px 16px',
            marginLeft: '-10px',
            marginBottom: '20px',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}>Skills</div>
            <div style={{
              position: 'absolute',
              right: '-10px',
              top: 0,
              width: 0,
              height: 0,
              borderTop: '16px solid transparent',
              borderBottom: '16px solid transparent',
              borderLeft: '10px solid #FF6B4A',
            }} />
          </div>

          {/* Languages */}
          {displayData.languages && displayData.languages.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2DBFB8',
                marginBottom: '8px',
              }}>
                Languages
              </div>
              <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
                {displayData.languages.map((lang: any, i: number) => (
                  <div key={i}>
                    {typeof lang === 'string' ? lang : lang.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software/Skills */}
          {displayData.skills && displayData.skills.length > 0 && (
            <div>
              <div style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#2DBFB8',
                marginBottom: '8px',
              }}>
                Software
              </div>
              <div style={{ fontSize: '11px', color: '#666666', lineHeight: 1.6 }}>
                {displayData.skills.slice(0, 3).join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div style={{ paddingTop: '20px' }}>
          {/* Skills Progress Bars - Editable */}
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '30px',
                  marginLeft: 'auto',
                  width: '200px',
                }}>
                  {displayData.skills.slice(0, 4).map((skill: string, i: number) => (
                    <div key={i}>
                      <div style={{
                        fontSize: '10px',
                        color: '#666666',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                      }}>
                        {skill}
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#E8E8E8',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${90 - i * 10}%`,
                          height: '100%',
                          background: ['#2DBFB8', '#FFB84D', '#FFA040', '#FF6B4A'][i % 4],
                          borderRadius: '4px',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </InlineSectionWrapper>
          ) : (
            <>
              {displayData.skills && displayData.skills.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '30px',
                  marginLeft: 'auto',
                  width: '200px',
                }}>
                  {displayData.skills.slice(0, 4).map((skill: string, i: number) => (
                    <div key={i}>
                      <div style={{
                        fontSize: '10px',
                        color: '#666666',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                      }}>
                        {skill}
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#E8E8E8',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${90 - i * 10}%`,
                          height: '100%',
                          background: ['#2DBFB8', '#FFB84D', '#FFA040', '#FF6B4A'][i % 4],
                          borderRadius: '4px',
                        }} />
                      </div>
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
                  {displayData.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: '#FF6B4A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '24px',
                          flexShrink: 0,
                        }}>
                          {exp.company?.charAt(0) || '?'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#FF6B4A',
                            marginBottom: '4px',
                          }}>
                            {exp.position}
                          </h3>
                          <div style={{
                            fontSize: '13px',
                            color: '#2DBFB8',
                            marginBottom: '8px',
                          }}>
                            {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                          </div>
                        </div>
                      </div>

                      {exp.description && (
                        <div style={{ paddingLeft: '66px' }}>
                          {exp.description.split('.').filter((s: string) => s.trim()).map((point: string, j: number) => (
                            <div key={j} style={{
                              display: 'flex',
                              gap: '8px',
                              marginBottom: '8px',
                              fontSize: '12px',
                              color: '#666666',
                              lineHeight: 1.5,
                            }}>
                              <span style={{ color: '#2DBFB8', flexShrink: 0 }}>✓</span>
                              <span>{point.trim()}.</span>
                            </div>
                          ))}
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
                    <div key={i} style={{ marginBottom: '30px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '16px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: '#FF6B4A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '24px',
                          flexShrink: 0,
                        }}>
                          {exp.company?.charAt(0) || '?'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#FF6B4A',
                            marginBottom: '4px',
                          }}>
                            {exp.position}
                          </h3>
                          <div style={{
                            fontSize: '13px',
                            color: '#2DBFB8',
                            marginBottom: '8px',
                          }}>
                            {exp.company} • {exp.startDate} - {exp.endDate || 'Present'}
                          </div>
                        </div>
                      </div>

                      {exp.description && (
                        <div style={{ paddingLeft: '66px' }}>
                          {exp.description.split('.').filter((s: string) => s.trim()).map((point: string, j: number) => (
                            <div key={j} style={{
                              display: 'flex',
                              gap: '8px',
                              marginBottom: '8px',
                              fontSize: '12px',
                              color: '#666666',
                              lineHeight: 1.5,
                            }}>
                              <span style={{ color: '#2DBFB8', flexShrink: 0 }}>✓</span>
                              <span>{point.trim()}.</span>
                            </div>
                          ))}
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
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      marginBottom: '20px',
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#2DBFB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        flexShrink: 0,
                      }}>
                        🎓
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
                          color: '#2DBFB8',
                        }}>
                          {edu.institution}
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
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      marginBottom: '20px',
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: '#2DBFB8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        flexShrink: 0,
                      }}>
                        🎓
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
                          color: '#2DBFB8',
                        }}>
                          {edu.institution}
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
    </div>
  )
}
