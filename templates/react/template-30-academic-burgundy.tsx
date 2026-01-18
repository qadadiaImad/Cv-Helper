import React from 'react'
import type { UniversalResumeData } from '@/lib/schemas'
import type { UniversalTemplateProps } from './universal-schema'

export const AcademicBurgundyTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  const primaryColor = '#722F37'
  const lightBg = '#F5F3EF'
  const borderColor = '#E0DCD5'
  const accentLight = '#F5E6E0'
  const accentMedium = '#D4A5A5'
  const accentDark = '#B8848C'

  // Calculate donut chart segments (simplified - Work, Research, Exercise, Family, Reading)
  const dayDistribution = [
    { label: 'Work', percentage: 40, color: primaryColor },
    { label: 'Research', percentage: 25, color: accentMedium },
    { label: 'Exercise', percentage: 15, color: '#E8D4C4' },
    { label: 'Family', percentage: 10, color: accentDark },
    { label: 'Reading', percentage: 10, color: accentLight }
  ]

  const calculateDonutSegments = () => {
    const radius = 90
    const circumference = 2 * Math.PI * radius
    let offset = 0
    
    return dayDistribution.map(segment => {
      const dashArray = (segment.percentage / 100) * circumference
      const currentOffset = offset
      offset += dashArray
      return { ...segment, dashArray, dashOffset: -currentOffset, circumference }
    })
  }

  const segments = calculateDonutSegments()

  return (
    <div style={{
      width: '800px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      fontFamily: 'Georgia, serif',
      color: '#333333'
    }}>
      {/* Header Section */}
      <header style={{
        position: 'relative',
        padding: '40px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{
              borderBottom: `3px solid ${primaryColor}`,
              paddingBottom: '0.5rem',
              fontSize: '32px',
              textTransform: 'uppercase',
              color: primaryColor,
              margin: 0,
              fontWeight: 'normal',
              letterSpacing: '1px'
            }}>
              {data.personal.fullName || 'YOUR NAME'}
            </h1>
            <p style={{
              marginTop: '0.5rem',
              fontSize: '14px',
              fontStyle: 'italic',
              color: primaryColor,
              margin: '8px 0 0 0'
            }}>
              {data.personal.title || 'Your Professional Title'}
            </p>
            <div style={{
              marginTop: '12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '11px'
            }}>
              {data.personal.email && (
                <a href={`mailto:${data.personal.email}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#555555',
                  textDecoration: 'none'
                }}>
                  <img src="https://api.iconify.design/lucide-mail.svg?color=%23722F37" alt="Email" style={{ width: '14px', height: '14px' }} />
                  <span>{data.personal.email}</span>
                </a>
              )}
              {data.personal.phone && (
                <a href={`tel:${data.personal.phone}`} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#555555',
                  textDecoration: 'none'
                }}>
                  <img src="https://api.iconify.design/lucide-phone.svg?color=%23722F37" alt="Phone" style={{ width: '14px', height: '14px' }} />
                  <span>{data.personal.phone}</span>
                </a>
              )}
              {data.personal.location && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#555555'
                }}>
                  <img src="https://api.iconify.design/lucide-map-pin.svg?color=%23722F37" alt="Location" style={{ width: '14px', height: '14px' }} />
                  <span>{data.personal.location}</span>
                </div>
              )}
              {data.personal.website && (
                <a href={data.personal.website} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#555555',
                  textDecoration: 'none'
                }}>
                  <img src="https://api.iconify.design/lucide-globe.svg?color=%23722F37" alt="Website" style={{ width: '14px', height: '14px' }} />
                  <span>{data.personal.website}</span>
                </a>
              )}
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <img 
              src="https://app.grapesjs.com/api/assets/random-image?query=%22globe%20sepia%20burgundy%22&w=80&h=80" 
              alt="Illustration" 
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Two Column Layout */}
      <main style={{
        display: 'flex',
        gap: '32px',
        padding: '0 40px 40px 40px'
      }}>
        {/* Left Column - 55% */}
        <div style={{
          width: '55%',
          paddingRight: '32px',
          borderRight: `1px solid ${borderColor}`
        }}>
          {/* Experience Section */}
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '16px',
              letterSpacing: '2px',
              color: primaryColor,
              marginBottom: '12px',
              fontWeight: 'normal',
              textTransform: 'uppercase'
            }}>
              EXPERIENCE
            </h2>
            {data.experience.map((exp, index) => (
              <article key={index} style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}>
                  <div>
                    <h3 style={{
                      color: '#333333',
                      fontWeight: 600,
                      fontSize: '15px',
                      margin: 0
                    }}>
                      {exp.position}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: primaryColor,
                      fontWeight: 600,
                      margin: '2px 0 0 0'
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <div style={{
                    color: '#888888',
                    fontStyle: 'italic',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexShrink: 0
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src="https://api.iconify.design/lucide-calendar.svg?color=%23722F37" alt="Calendar" style={{ width: '14px', height: '14px' }} />
                      <span>{exp.startDate} – {exp.endDate || 'Present'}</span>
                    </span>
                    {exp.location && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src="https://api.iconify.design/lucide-map-pin.svg?color=%23722F37" alt="Location" style={{ width: '14px', height: '14px' }} />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul style={{ marginTop: '12px', padding: 0, listStyle: 'none' }}>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          marginTop: '4px',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: primaryColor,
                          flexShrink: 0
                        }} />
                        <p style={{
                          fontSize: '12px',
                          color: '#555555',
                          margin: 0
                        }} dangerouslySetInnerHTML={{ __html: achievement }} />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: primaryColor,
                marginBottom: '12px',
                fontWeight: 'normal',
                textTransform: 'uppercase'
              }}>
                PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                <article key={index} style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <div>
                      <h3 style={{
                        color: '#333333',
                        fontWeight: 600,
                        fontSize: '15px',
                        margin: 0
                      }}>
                        {project.name}
                      </h3>
                      {project.role && (
                        <p style={{
                          fontSize: '13px',
                          color: primaryColor,
                          fontWeight: 600,
                          margin: '2px 0 0 0'
                        }}>
                          {project.role}
                        </p>
                      )}
                    </div>
                    <div style={{
                      color: '#888888',
                      fontStyle: 'italic',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexShrink: 0
                    }}>
                      {project.startDate && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <img src="https://api.iconify.design/lucide-calendar.svg?color=%23722F37" alt="Calendar" style={{ width: '14px', height: '14px' }} />
                          <span>{project.startDate} – {project.endDate || 'Present'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p style={{
                      fontSize: '12px',
                      color: '#555555',
                      marginTop: '8px',
                      margin: '8px 0 0 0'
                    }}>
                      {project.description}
                    </p>
                  )}
                  {project.url && (
                    <p style={{
                      marginTop: '8px',
                      color: '#888888',
                      fontStyle: 'italic',
                      fontSize: '11px',
                      margin: '8px 0 0 0'
                    }}>
                      Note: Repository and documentation available upon request.
                    </p>
                  )}
                </article>
              ))}
            </section>
          )}

          {/* Day Distribution Chart */}
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '16px',
              letterSpacing: '2px',
              color: primaryColor,
              marginBottom: '12px',
              fontWeight: 'normal',
              textTransform: 'uppercase'
            }}>
              A DAY OF MY LIFE
            </h2>
            <div style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              margin: '0 auto'
            }}>
              <svg viewBox="0 0 200 200" style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                {/* Background circle */}
                <circle cx="100" cy="100" r="90" fill="none" stroke={accentLight} strokeWidth="36" />
                {/* Segments */}
                {segments.map((segment, index) => (
                  <circle
                    key={index}
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="36"
                    strokeDasharray={`${segment.dashArray} ${segment.circumference}`}
                    strokeDashoffset={segment.dashOffset}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                ))}
                {/* Center circle */}
                <circle cx="100" cy="100" r="54" fill={lightBg} />
              </svg>
              {/* Labels */}
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '12px', height: '1px', backgroundColor: primaryColor }} />
                <span style={{ fontSize: '10px', color: '#333333' }}>Work 40%</span>
              </div>
              <div style={{
                position: 'absolute',
                top: '70%',
                left: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '12px', height: '1px', backgroundColor: primaryColor }} />
                <span style={{ fontSize: '10px', color: '#333333' }}>Research 25%</span>
              </div>
              <div style={{
                position: 'absolute',
                top: '80%',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '12px', height: '1px', backgroundColor: primaryColor }} />
                <span style={{ fontSize: '10px', color: '#333333' }}>Exercise 15%</span>
              </div>
              <div style={{
                position: 'absolute',
                top: '30%',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '12px', height: '1px', backgroundColor: primaryColor }} />
                <span style={{ fontSize: '10px', color: '#333333' }}>Family 10%</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '12px', height: '1px', backgroundColor: primaryColor }} />
                <span style={{ fontSize: '10px', color: '#333333' }}>Reading 10%</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - 45% */}
        <aside style={{ width: '45%' }}>
          {/* Life Philosophy */}
          {data.summary && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: primaryColor,
                marginBottom: '12px',
                fontWeight: 'normal',
                textTransform: 'uppercase'
              }}>
                MY LIFE PHILOSOPHY
              </h2>
              <blockquote style={{
                fontSize: '13px',
                fontStyle: 'italic',
                color: primaryColor,
                backgroundColor: '#F9F7F4',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                padding: '12px',
                margin: 0
              }}>
                {data.summary}
              </blockquote>
            </section>
          )}

          {/* Most Proud Of - Using certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: primaryColor,
                marginBottom: '12px',
                fontWeight: 'normal',
                textTransform: 'uppercase'
              }}>
                MOST PROUD OF
              </h2>
              <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                {data.certifications.slice(0, 2).map((cert, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      marginTop: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: primaryColor,
                      flexShrink: 0
                    }} />
                    <div>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: primaryColor,
                        margin: 0
                      }}>
                        {cert.name}
                      </p>
                      <p style={{
                        fontSize: '11px',
                        color: '#777777',
                        margin: '2px 0 0 0'
                      }}>
                        {cert.issuer} {cert.date && `• ${cert.date}`}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Strengths - Skills */}
          {data.skills && data.skills.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: primaryColor,
                marginBottom: '12px',
                fontWeight: 'normal',
                textTransform: 'uppercase'
              }}>
                STRENGTHS
              </h2>
              <div style={{ marginBottom: '8px' }}>
                <p style={{
                  fontSize: '12px',
                  color: '#555555',
                  marginBottom: '8px',
                  margin: '0 0 8px 0'
                }}>
                  Technical
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {data.skills.slice(0, 8).map((skill, index) => (
                    <span key={index} style={{
                      fontSize: '11px',
                      color: primaryColor,
                      border: `1px solid ${primaryColor}`,
                      borderRadius: '3px',
                      padding: '6px 12px',
                      transition: 'all 0.15s'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '16px',
                letterSpacing: '2px',
                color: primaryColor,
                marginBottom: '12px',
                fontWeight: 'normal',
                textTransform: 'uppercase'
              }}>
                LANGUAGES
              </h2>
              <ul style={{ padding: 0, listStyle: 'none', margin: 0 }}>
                {data.languages.map((lang, index) => {
                  const proficiencyMap: { [key: string]: number } = {
                    'native': 5,
                    'fluent': 5,
                    'professional': 4,
                    'intermediate': 3,
                    'basic': 2,
                    'beginner': 1
                  }
                  const dots = proficiencyMap[lang.proficiency?.toLowerCase() || 'intermediate'] || 3
                  
                  return (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: '#333333'
                      }}>
                        {lang.name}
                      </span>
                      <span style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        {[...Array(5)].map((_, dotIndex) => (
                          <span key={dotIndex} style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: dotIndex < dots ? primaryColor : borderColor
                          }} />
                        ))}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {/* Education */}
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontSize: '16px',
              letterSpacing: '2px',
              color: primaryColor,
              marginBottom: '12px',
              fontWeight: 'normal',
              textTransform: 'uppercase'
            }}>
              EDUCATION
            </h2>
            <div>
              {data.education.map((edu, index) => (
                <article key={index} style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}>
                    <div>
                      <h3 style={{
                        color: '#333333',
                        fontWeight: 700,
                        fontSize: '14px',
                        margin: 0
                      }}>
                        {edu.degree}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        color: primaryColor,
                        fontWeight: 600,
                        margin: '2px 0 0 0'
                      }}>
                        {edu.institution}
                      </p>
                    </div>
                    <div style={{
                      color: '#888888',
                      fontStyle: 'italic',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      flexShrink: 0
                    }}>
                      <img src="https://api.iconify.design/lucide-calendar.svg?color=%23722F37" alt="Calendar" style={{ width: '14px', height: '14px' }} />
                      <span>{edu.startDate} – {edu.endDate || 'Present'}</span>
                    </div>
                  </div>
                  {edu.field && (
                    <p style={{
                      fontSize: '11px',
                      fontStyle: 'italic',
                      color: '#777777',
                      marginTop: '4px',
                      margin: '4px 0 0 0'
                    }}>
                      Thesis: {edu.field}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  )
}
