/**
 * TEMPLATE 8: DOUBLE COLUMN - EDITABLE VERSION
 * Smart hybrid generation: extracted styles + proper data binding
 * Layout: two-column-asymmetric
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

export const DoubleColumnEditable: React.FC<EditableTemplateProps> = ({ 
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
      minHeight: '1200px',
      background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
      display: 'flex',
      justifyContent: 'center',
      padding: '60px 20px',
    }}>
      <div style={{
        maxWidth: '850px',
        width: '100%',
        display: 'flex',
        gap: '30px',
      }}>
      {/* Left Column */}
      <div style={{ 
        flex: '60%',
        background: 'transparent',
        padding: '0',
      }}>
        {/* Header - Personal Info Editable */}
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
            <header style={{ marginBottom: '30px' }}>
              <h1 style={{
                fontSize: '34px',
                fontWeight: '500',
                fontFamily: 'Rubik, Arial, sans-serif',
                textTransform: 'uppercase',
                color: '#000000',
                marginBottom: '8px',
              }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>
              {displayData.personal?.title && (
                <h2 style={{
                  fontSize: '17px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  color: '#1E90FF',
                  marginBottom: '16px',
                }}>
                  {displayData.personal.title}
                </h2>
              )}
              <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {displayData.personal?.email && <span>📧 {displayData.personal.email}</span>}
                {displayData.personal?.linkedIn && <span>🔗 {displayData.personal.linkedIn}</span>}
                {displayData.personal?.location && <span>📍 {displayData.personal.location}</span>}
              </div>
            </header>
          </InlineSectionWrapper>
        ) : (
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{
              fontSize: '34px',
              fontWeight: '500',
              fontFamily: 'Rubik, Arial, sans-serif',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '8px',
            }}>
              {displayData.personal?.fullName || 'Your Name'}
            </h1>
            {displayData.personal?.title && (
              <h2 style={{
                fontSize: '17px',
                fontWeight: '500',
                fontFamily: 'Rubik, Arial, sans-serif',
                color: '#1E90FF',
                marginBottom: '16px',
              }}>
                {displayData.personal.title}
              </h2>
            )}
            <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {displayData.personal?.email && <span>📧 {displayData.personal.email}</span>}
              {displayData.personal?.linkedIn && <span>🔗 {displayData.personal.linkedIn}</span>}
              {displayData.personal?.location && <span>📍 {displayData.personal.location}</span>}
            </div>
          </header>
        )}

        {/* Summary */}
        {displayData.summary && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              fontFamily: 'Rubik, Arial, sans-serif',
              textTransform: 'uppercase',
              borderBottom: '3px solid #000',
              paddingBottom: '6px',
              marginBottom: '12px',
            }}>
              Summary
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
              {displayData.summary}
            </p>
          </section>
        )}

        {/* Experience - Editable */}
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
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Experience
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555', marginTop: '4px' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.experience && displayData.experience.length > 0 && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Experience
                </h3>
                {displayData.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                      {exp.position}
                    </div>
                    <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                      {exp.company}
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555', marginTop: '4px' }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </section>
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
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.education && displayData.education.length > 0 && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid #000',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Education
                </h3>
                {displayData.education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </>
        )}
      </div>

      {/* Right Column */}
      <div style={{ 
        flex: '40%',
        background: 'transparent',
        padding: '0',
        color: '#000000',
      }}>
        {/* Skills - Editable */}
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
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid currentColor',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Skills
                </h3>
                <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                  {displayData.skills.join(' • ')}
                </div>
              </section>
            )}
          </InlineSectionWrapper>
        ) : (
          <>
            {displayData.skills && displayData.skills.length > 0 && (
              <section style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  fontFamily: 'Rubik, Arial, sans-serif',
                  textTransform: 'uppercase',
                  borderBottom: '3px solid currentColor',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                }}>
                  Skills
                </h3>
                <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                  {displayData.skills.join(' • ')}
                </div>
              </section>
            )}
          </>
        )}

        {/* Languages */}
        {displayData.languages && displayData.languages.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              fontFamily: 'Rubik, Arial, sans-serif',
              textTransform: 'uppercase',
              borderBottom: '3px solid currentColor',
              paddingBottom: '6px',
              marginBottom: '12px',
            }}>
              Languages
            </h3>
            <div style={{ fontSize: '13px' }}>
              {displayData.languages.map((lang: any, i: number) => (
                <div key={i}>
                  {typeof lang === 'string' ? lang : `${lang.name} - ${lang.proficiency}`}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      </div>
    </div>
  )
}
