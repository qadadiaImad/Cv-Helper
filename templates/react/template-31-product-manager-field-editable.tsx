/**
 * TEMPLATE 31 - PRODUCT MANAGER - FIELD-LEVEL EDITABLE VERSION
 * Professional CV with tropical leaf accent and clean layout
 */

import React, { useMemo } from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { TiptapEditableField } from '@/components/builder/tiptap-editable-field'
import { HtmlRenderer } from '@/components/builder/html-renderer'
import type { FieldEditableTemplateProps } from '@/lib/field-editable-templates'

export const ProductManagerFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {},
  onFieldEditStart,
  onFieldEditEnd,
  onAddArrayItem,
  onRemoveArrayItem
}) => {
  const hasExperience = data.experience && data.experience.length > 0
  const hasEducation = data.education && data.education.length > 0
  const hasCertifications = data.certifications && data.certifications.length > 0
  const hasLanguages = data.languages && data.languages.length > 0

  const updateField = (path: string, value: any) => {
    onFieldChange(path, value)
  }

  const updateArrayField = (arrayName: string, index: number, field: string, value: any) => {
    onFieldChange(`${arrayName}.${index}.${field}`, value)
  }

  // Memoize EditableText to prevent unmounting all fields on every render
  const EditableText = useMemo(() => 
    editMode 
      ? (props: any) => (
          <TiptapEditableField
            {...props}
            onEditStart={onFieldEditStart}
            onEditEnd={onFieldEditEnd}
          />
        )
      : ({ value, className, style }: any) => (
          <HtmlRenderer html={value} as="span" className={className} style={style} />
        )
  , [editMode, onFieldEditStart, onFieldEditEnd])

  return (
    <div style={styles.cvContainer}>
      <div style={styles.leftDecorativeBar} aria-hidden="true">
        <img
          src="https://app.grapesjs.com/api/assets/random-image?query=%22realistic%20tropical%20leaf%20dark%20green%20close-up%20vertical%22&w=45&h=1200"
          alt="Decorative tropical leaf accent"
          style={styles.leafImage}
        />
      </div>

      <section style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerTextBlock}>
            <h1 style={styles.name}>
              <EditableText
                value={data.personal?.fullName || 'Your Name'}
                onChange={(v: string) => updateField('personal.fullName', v)}
                fieldPath="personal.fullName"
                fieldType="text"
                style={styles.name}
              />
            </h1>
            <div style={styles.professionalTitle}>
              <EditableText
                value={data.personal?.title || 'Professional Title'}
                onChange={(v: string) => updateField('personal.title', v)}
                fieldPath="personal.title"
                fieldType="text"
                style={styles.professionalTitle}
              />
            </div>
            
            <ul style={styles.contactRow}>
              {data.personal?.email && (
                <li style={styles.contactItem}>
                  <img
                    alt="Email icon"
                    src="https://api.iconify.design/lucide-mail.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <EditableText
                    value={data.personal.email}
                    onChange={(v: string) => updateField('personal.email', v)}
                    fieldPath="personal.email"
                    fieldType="text"
                    style={styles.contactLink}
                  />
                </li>
              )}
              {data.personal?.phone && (
                <li style={styles.contactItem}>
                  <img
                    alt="Phone icon"
                    src="https://api.iconify.design/lucide-phone.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <EditableText
                    value={data.personal.phone}
                    onChange={(v: string) => updateField('personal.phone', v)}
                    fieldPath="personal.phone"
                    fieldType="text"
                    style={styles.contactLink}
                  />
                </li>
              )}
              {data.personal?.location && (
                <li style={styles.contactItem}>
                  <img
                    alt="Location icon"
                    src="https://api.iconify.design/lucide-map-pin.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <EditableText
                    value={data.personal.location}
                    onChange={(v: string) => updateField('personal.location', v)}
                    fieldPath="personal.location"
                    fieldType="text"
                  />
                </li>
              )}
              {data.personal?.website && (
                <li style={styles.contactItem}>
                  <img
                    alt="Website icon"
                    src="https://api.iconify.design/lucide-globe.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <EditableText
                    value={data.personal.website.replace('https://', '')}
                    onChange={(v: string) => updateField('personal.website', v.startsWith('http') ? v : `https://${v}`)}
                    fieldPath="personal.website"
                    fieldType="text"
                    style={styles.contactLink}
                  />
                </li>
              )}
            </ul>
          </div>

          {data.personal?.photo?.url && !data.personal.photo.effects?.hidden && (
            <div style={styles.photoWrapper}>
              <img
                src={data.personal.photo.url}
                alt="Profile photo"
                style={styles.profilePhoto}
              />
            </div>
          )}
        </header>

        {data.summary && (
          <section style={styles.profileSection}>
            <h2 style={styles.sectionTitle}>Profile</h2>
            <div style={styles.profileText}>
              <EditableText
                value={data.summary}
                onChange={(v: string) => updateField('summary', v)}
                fieldPath="summary"
                fieldType="richtext"
                style={styles.profileText}
              />
            </div>
          </section>
        )}

        {hasExperience && (
          <section>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
            <div style={styles.experienceList}>
              {data.experience!.map((exp, index) => (
                <article 
                  key={exp.id || `exp-${index}`} 
                  style={styles.experienceItem}
                  className="section-item-wrapper"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '0'
                  }}
                >
                  {editMode && onAddArrayItem && onRemoveArrayItem && (
                    <div className="section-controls" style={styles.sectionControls}>
                      <button
                        onClick={() => onAddArrayItem('experience', index, 'before')}
                        style={styles.sectionBtn}
                        title="Add experience above"
                      >
                        + Add Above
                      </button>
                      <button
                        onClick={() => onAddArrayItem('experience', index, 'after')}
                        style={styles.sectionBtn}
                        title="Add experience below"
                      >
                        + Add Below
                      </button>
                      {data.experience!.length > 1 && (
                        <button
                          onClick={() => onRemoveArrayItem('experience', index)}
                          style={{...styles.sectionBtn, ...styles.sectionBtnDelete}}
                          title="Remove this experience"
                        >
                          × Remove
                        </button>
                      )}
                    </div>
                  )}
                  <div style={styles.experienceLeft}>
                    <h3 style={styles.experienceCompany}>
                      <EditableText
                        value={exp.company}
                        onChange={(v: string) => updateArrayField('experience', index, 'company', v)}
                        fieldPath={`experience.${index}.company`}
                        fieldType="text"
                        style={styles.experienceCompany}
                      />
                      {exp.position && (
                        <span style={styles.experiencePosition}>
                          <EditableText
                            value={exp.position}
                            onChange={(v: string) => updateArrayField('experience', index, 'position', v)}
                            fieldPath={`experience.${index}.position`}
                            fieldType="text"
                            style={styles.experiencePosition}
                          />
                        </span>
                      )}
                    </h3>
                    {exp.description && (
                      <div style={styles.experienceDescription}>
                        <EditableText
                          value={exp.description}
                          onChange={(v: string) => updateArrayField('experience', index, 'description', v)}
                          fieldPath={`experience.${index}.description`}
                          fieldType="richtext"
                          style={styles.experienceDescription}
                        />
                      </div>
                    )}
                  </div>
                  <div style={styles.experienceRight}>
                    {(exp.startDate || exp.endDate) && (
                      <div style={styles.experienceDate}>
                        <EditableText
                          value={exp.startDate}
                          onChange={(v: string) => updateArrayField('experience', index, 'startDate', v)}
                          fieldPath={`experience.${index}.startDate`}
                          fieldType="text"
                          style={styles.experienceDate}
                        />
                        {' — '}
                        <EditableText
                          value={exp.endDate || 'Present'}
                          onChange={(v: string) => updateArrayField('experience', index, 'endDate', v)}
                          fieldPath={`experience.${index}.endDate`}
                          fieldType="text"
                          style={styles.experienceDate}
                        />
                      </div>
                    )}
                    {exp.location && (
                      <div style={styles.experienceLocation}>
                        <EditableText
                          value={exp.location}
                          onChange={(v: string) => updateArrayField('experience', index, 'location', v)}
                          fieldPath={`experience.${index}.location`}
                          fieldType="text"
                          style={styles.experienceLocation}
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {hasEducation && (
          <section>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.educationList}>
              {data.education!.map((edu, index) => (
                <article 
                  key={edu.id || `edu-${index}`} 
                  style={styles.educationItem}
                  className="section-item-wrapper"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '0'
                  }}
                >
                  {editMode && onAddArrayItem && onRemoveArrayItem && (
                    <div className="section-controls" style={styles.sectionControls}>
                      <button
                        onClick={() => onAddArrayItem('education', index, 'before')}
                        style={styles.sectionBtn}
                        title="Add education above"
                      >
                        + Add Above
                      </button>
                      <button
                        onClick={() => onAddArrayItem('education', index, 'after')}
                        style={styles.sectionBtn}
                        title="Add education below"
                      >
                        + Add Below
                      </button>
                      {data.education!.length > 1 && (
                        <button
                          onClick={() => onRemoveArrayItem('education', index)}
                          style={{...styles.sectionBtn, ...styles.sectionBtnDelete}}
                          title="Remove this education"
                        >
                          × Remove
                        </button>
                      )}
                    </div>
                  )}
                  <div style={styles.educationLeft}>
                    <h3 style={styles.educationUniversity}>
                      <EditableText
                        value={edu.institution}
                        onChange={(v: string) => updateArrayField('education', index, 'institution', v)}
                        fieldPath={`education.${index}.institution`}
                        fieldType="text"
                        style={styles.educationUniversity}
                      />
                      {edu.degree && (
                        <span style={styles.educationDegree}>
                          <EditableText
                            value={`${edu.degree}${edu.field ? `, ${edu.field}` : ''}`}
                            onChange={(v: string) => updateArrayField('education', index, 'degree', v)}
                            fieldPath={`education.${index}.degree`}
                            fieldType="text"
                            style={styles.educationDegree}
                          />
                        </span>
                      )}
                    </h3>
                    {edu.honors && edu.honors.length > 0 && (
                      <div style={styles.educationDescription}>{edu.honors.join(', ')}</div>
                    )}
                  </div>
                  <div style={styles.educationRight}>
                    {(edu.startDate || edu.endDate) && (
                      <div style={styles.educationDate}>
                        <EditableText
                          value={edu.startDate}
                          onChange={(v: string) => updateArrayField('education', index, 'startDate', v)}
                          fieldPath={`education.${index}.startDate`}
                          fieldType="text"
                          style={styles.educationDate}
                        />
                        {' — '}
                        <EditableText
                          value={edu.endDate || 'Present'}
                          onChange={(v: string) => updateArrayField('education', index, 'endDate', v)}
                          fieldPath={`education.${index}.endDate`}
                          fieldType="text"
                          style={styles.educationDate}
                        />
                      </div>
                    )}
                    {edu.location && (
                      <div style={styles.educationLocation}>
                        <EditableText
                          value={edu.location}
                          onChange={(v: string) => updateArrayField('education', index, 'location', v)}
                          fieldPath={`education.${index}.location`}
                          fieldType="text"
                          style={styles.educationLocation}
                        />
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {hasCertifications && (
          <section>
            <h2 style={styles.sectionTitle}>Certificates</h2>
            <div style={styles.certificatesList}>
              {data.certifications!.map((cert, index) => (
                <React.Fragment key={index}>
                  <span>
                    <EditableText
                      value={cert.name}
                      onChange={(v: string) => updateArrayField('certifications', index, 'name', v)}
                      fieldPath={`certifications.${index}.name`}
                      fieldType="text"
                    />
                  </span>
                  {index < data.certifications!.length - 1 && (
                    <span style={styles.certificateBullet} aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {hasLanguages && (
          <section>
            <h2 style={styles.sectionTitle}>Languages</h2>
            <div style={styles.languagesList}>
              {data.languages!.map((lang, index) => (
                <React.Fragment key={index}>
                  <span style={styles.languageItem}>
                    <EditableText
                      value={lang.name}
                      onChange={(v: string) => updateArrayField('languages', index, 'name', v)}
                      fieldPath={`languages.${index}.name`}
                      fieldType="text"
                      style={styles.languageItem}
                    />
                  </span>
                  {lang.proficiency && (
                    <span style={styles.languageLevel}>({lang.proficiency})</span>
                  )}
                  {index < data.languages!.length - 1 && (
                    <span style={styles.languageBullet} aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {data.skillCategories && data.skillCategories.length > 0 && (
          <section>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div style={styles.skillsGrid}>
              {data.skillCategories.map((skillCategory, index) => (
                <div 
                  key={skillCategory.id || `skill-${index}`} 
                  style={styles.skillCategory}
                  className="section-item-wrapper"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget.querySelector('.section-controls') as HTMLElement
                    if (target) target.style.opacity = '0'
                  }}
                >
                  {editMode && onAddArrayItem && onRemoveArrayItem && (
                    <div className="section-controls" style={styles.sectionControls}>
                      <button
                        onClick={() => onAddArrayItem('skillCategories', index, 'before')}
                        style={styles.sectionBtn}
                        title="Add skill category above"
                      >
                        + Add Above
                      </button>
                      <button
                        onClick={() => onAddArrayItem('skillCategories', index, 'after')}
                        style={styles.sectionBtn}
                        title="Add skill category below"
                      >
                        + Add Below
                      </button>
                      {data.skillCategories!.length > 1 && (
                        <button
                          onClick={() => onRemoveArrayItem('skillCategories', index)}
                          style={{...styles.sectionBtn, ...styles.sectionBtnDelete}}
                          title="Remove this skill category"
                        >
                          × Remove
                        </button>
                      )}
                    </div>
                  )}
                  <h3 style={styles.skillCategoryTitle}>
                    <EditableText
                      value={skillCategory.category}
                      onChange={(v: string) => updateArrayField('skillCategories', index, 'category', v)}
                      fieldPath={`skillCategories.${index}.category`}
                      fieldType="text"
                      style={styles.skillCategoryTitle}
                    />
                  </h3>
                  <ul style={styles.skillList}>
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} style={styles.skillItem}>
                        <span style={styles.skillDash}>-</span>
                        <span>
                          <EditableText
                            value={skill.name}
                            onChange={(v: string) => updateArrayField(`skillCategories.${index}.skills`, skillIndex, 'name', v)}
                            fieldPath={`skillCategories.${index}.skills.${skillIndex}.name`}
                            fieldType="text"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer style={styles.footer}>
          <div style={styles.footerLeft}>
            <img
              alt="Link icon"
              src="https://api.iconify.design/lucide-link.svg?color=%23666666"
              style={styles.footerIcon}
            />
            {data.personal?.linkedIn ? (
              <EditableText
                value={data.personal.linkedIn.replace('https://', '')}
                onChange={(v: string) => updateField('personal.linkedIn', v.startsWith('http') ? v : `https://${v}`)}
                fieldPath="personal.linkedIn"
                fieldType="text"
                style={styles.footerLink}
              />
            ) : (
              <span style={styles.footerLink}>linkedin.com/in/yourprofile</span>
            )}
          </div>
          <div style={styles.footerRight}>
            <span>References available upon request</span>
          </div>
        </footer>
      </section>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  cvContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(229, 231, 235)',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  leftDecorativeBar: {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    width: '45px',
    background: 'linear-gradient(180deg, #1d3b35 0%, #1d3b35 40%, #2d5a4f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  leafImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0',
    opacity: '0.9',
    display: 'block',
    mixBlendMode: 'multiply',
    filter: 'grayscale(100%) contrast(1.06) brightness(0.95)',
  },
  mainContent: {
    paddingTop: '30px',
    paddingBottom: '30px',
    paddingRight: '30px',
    paddingLeft: '85px',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
    borderBottom: '1px solid rgb(243, 244, 246)',
    paddingBottom: '1rem',
  },
  headerTextBlock: {
    flex: '1 1 0%',
  },
  name: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '32px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    lineHeight: '1.25',
    margin: '0',
  },
  professionalTitle: {
    marginTop: '0.25rem',
    fontSize: '18px',
    color: 'rgb(29, 59, 53)',
    fontWeight: 400,
    letterSpacing: '0.2px',
  },
  contactRow: {
    marginTop: '0.75rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.25rem',
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
    listStyle: 'none',
    padding: '0',
    margin: '0.75rem 0 0 0',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  contactIcon: {
    width: '1rem',
    height: '1rem',
    objectFit: 'contain',
  },
  contactLink: {
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
  },
  photoWrapper: {
    flexShrink: 0,
  },
  profilePhoto: {
    width: '100px',
    height: '120px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  profileSection: {
    marginTop: '1.5rem',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    borderBottom: '2px solid rgb(29, 59, 53)',
    paddingBottom: '6px',
    marginTop: '25px',
    marginBottom: '15px',
  },
  profileText: {
    color: 'rgb(51, 51, 51)',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
  },
  experienceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  experienceItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  experienceLeft: {
    flexBasis: '75%',
  },
  experienceCompany: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  experiencePosition: {
    marginLeft: '0.5rem',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    color: 'rgb(29, 59, 53)',
  },
  experienceDescription: {
    marginTop: '0.25rem',
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
  },
  experienceRight: {
    flexBasis: '25%',
    textAlign: 'right',
  },
  experienceDate: {
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
  },
  experienceLocation: {
    fontSize: '12px',
    color: 'rgb(102, 102, 102)',
  },
  educationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  educationItem: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  educationLeft: {
    flexBasis: '75%',
  },
  educationUniversity: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  educationDegree: {
    marginLeft: '0.5rem',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    color: 'rgb(29, 59, 53)',
  },
  educationDescription: {
    marginTop: '0.25rem',
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
  },
  educationRight: {
    flexBasis: '25%',
    textAlign: 'right',
  },
  educationDate: {
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
  },
  educationLocation: {
    fontSize: '12px',
    color: 'rgb(102, 102, 102)',
  },
  certificatesList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: '0.75rem',
    rowGap: '0.5rem',
    fontSize: '13px',
    color: 'rgb(51, 51, 51)',
  },
  certificateBullet: {
    fontSize: '18px',
    lineHeight: '1',
    color: 'rgb(29, 59, 53)',
  },
  languagesList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: '0.75rem',
    rowGap: '0.25rem',
    fontSize: '13px',
  },
  languageItem: {
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
  },
  languageLevel: {
    color: 'rgb(102, 102, 102)',
  },
  languageBullet: {
    fontSize: '18px',
    lineHeight: '1',
    color: 'rgb(29, 59, 53)',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    columnGap: '2.5rem',
    rowGap: '1.5rem',
  },
  skillCategory: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  skillCategoryTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  skillList: {
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  skillItem: {
    display: 'inline-flex',
  },
  skillDash: {
    marginRight: '0.5rem',
    color: 'rgb(68, 68, 68)',
  },
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgb(243, 244, 246)',
    fontSize: '11px',
    color: 'rgb(102, 102, 102)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  footerIcon: {
    width: '0.875rem',
    height: '0.875rem',
    objectFit: 'contain',
  },
  footerLink: {
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
  },
  footerRight: {
    textAlign: 'right',
  },
  sectionControls: {
    position: 'absolute' as const,
    top: '-8px',
    right: '0',
    display: 'flex',
    gap: '6px',
    opacity: '0',
    transition: 'opacity 0.2s ease',
    zIndex: 10,
  },
  sectionBtn: {
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgb(59, 130, 246)',
    backgroundColor: 'white',
    border: '1px solid rgb(59, 130, 246)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
  },
  sectionBtnDelete: {
    color: 'rgb(239, 68, 68)',
    borderColor: 'rgb(239, 68, 68)',
  },
}
