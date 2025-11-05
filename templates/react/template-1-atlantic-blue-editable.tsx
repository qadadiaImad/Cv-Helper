/**
 * ATLANTIC BLUE TEMPLATE - EDITABLE VERSION
 * Dark left sidebar with photo, white content area
 * Enhanced with inline editing capabilities
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { InlineSectionWrapper } from '@/components/builder/inline-section-wrapper'
import { PersonalForm } from '@/components/builder/personal-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'
import { ProjectsForm } from '@/components/builder/projects-form'

interface EditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  editingSection?: string | null
  onEditSection?: (sectionId: string) => void
  onSaveSection?: () => void
  onCancelSection?: () => void
  onDataChange?: (data: any) => void
  tempData?: any
}

export const AtlanticBlueEditable: React.FC<EditableTemplateProps> = ({ 
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
  
  // Photo configuration
  const photoConfig = displayData.personal?.photo
  const photoSize = photoConfig?.size || 120
  const photoBorderRadius = photoConfig?.borderRadius ?? 50
  const photoUrl = photoConfig?.url
  const photoHidden = photoConfig?.effects?.hidden
  const photoGrayscale = photoConfig?.effects?.grayscale
  const photoBorder = photoConfig?.effects?.border

  const SectionWrapper = editMode ? InlineSectionWrapper : React.Fragment

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      minHeight: '1200px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    }}>
      {/* Left Sidebar - Dark Blue */}
      <aside style={{
        width: '280px',
        backgroundColor: '#1a3a52',
        color: '#ffffff',
        padding: '40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
      }}>
        {/* Personal Info Section - Editable */}
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
              {/* Photo */}
              {photoUrl && !photoHidden && (
                <div style={{
                  width: `${photoSize}px`,
                  height: `${photoSize}px`,
                  borderRadius: `${photoBorderRadius}%`,
                  backgroundColor: '#ffffff',
                  margin: '0 auto 20px',
                  overflow: 'hidden',
                  border: photoBorder ? '4px solid rgba(255,255,255,0.3)' : '4px solid rgba(255,255,255,0.1)',
                }}>
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
                </div>
              )}

              {/* Name & Title */}
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
                  {displayData.personal?.fullName || 'Your Name'}
                </h1>
                {displayData.personal?.title && (
                  <p style={{ fontSize: '14px', opacity: 0.9, fontWeight: '300' }}>
                    {displayData.personal.title}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div style={{ fontSize: '12px', lineHeight: '1.8', marginTop: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                  CONTACT
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ wordBreak: 'break-word' }}>✉️ {displayData.personal?.email || 'email@example.com'}</p>
                  <p>📱 {displayData.personal?.phone || '123-456-7890'}</p>
                  {displayData.personal?.location && <p>📍 {displayData.personal.location}</p>}
                  {displayData.personal?.website && <p>🌐 {displayData.personal.website}</p>}
                  {displayData.personal?.linkedIn && <p>💼 {displayData.personal.linkedIn}</p>}
                  {displayData.personal?.github && <p>💻 {displayData.personal.github}</p>}
                </div>
              </div>
            </div>
          </InlineSectionWrapper>
        ) : (
          <>
            {photoUrl && !photoHidden && (
              <div style={{
                width: `${photoSize}px`,
                height: `${photoSize}px`,
                borderRadius: `${photoBorderRadius}%`,
                backgroundColor: '#ffffff',
                margin: '0 auto',
                overflow: 'hidden',
                border: photoBorder ? '4px solid rgba(255,255,255,0.3)' : '4px solid rgba(255,255,255,0.1)',
              }}>
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
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
                {displayData.personal?.fullName || 'Your Name'}
              </h1>
              {displayData.personal?.title && (
                <p style={{ fontSize: '14px', opacity: 0.9, fontWeight: '300' }}>
                  {displayData.personal.title}
                </p>
              )}
            </div>

            <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                CONTACT
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ wordBreak: 'break-word' }}>✉️ {displayData.personal?.email || 'email@example.com'}</p>
                <p>📱 {displayData.personal?.phone || '123-456-7890'}</p>
                {displayData.personal?.location && <p>📍 {displayData.personal.location}</p>}
                {displayData.personal?.website && <p>🌐 {displayData.personal.website}</p>}
                {displayData.personal?.linkedIn && <p>💼 {displayData.personal.linkedIn}</p>}
                {displayData.personal?.github && <p>💻 {displayData.personal.github}</p>}
              </div>
            </div>
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
              <div style={{ fontSize: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                  SKILLS
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {displayData.skills.map((skill: string, i: number) => (
                    <li key={i} style={{ padding: '6px 0 6px 12px', borderLeft: '3px solid #4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </InlineSectionWrapper>
        ) : (
          displayData.skills && displayData.skills.length > 0 && (
            <div style={{ fontSize: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                SKILLS
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {displayData.skills.map((skill: string, i: number) => (
                  <li key={i} style={{ padding: '6px 0 6px 12px', borderLeft: '3px solid #4a90e2', backgroundColor: 'rgba(74, 144, 226, 0.1)' }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </aside>

      {/* Right Content Area - White */}
      <main style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '40px 50px',
      }}>
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
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                EXPERIENCE
              </h2>
              {displayData.experience && displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a3a52' }}>{exp.position}</h3>
                      <p style={{ fontSize: '13px', color: '#4a90e2', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  {exp.achievements && (
                    <ul style={{ fontSize: '12px', lineHeight: '1.7', color: '#333', paddingLeft: '20px' }}>
                      {exp.achievements.map((achievement: string, j: number) => (
                        <li key={j} style={{ marginBottom: '4px' }}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          </InlineSectionWrapper>
        ) : (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>
              EXPERIENCE
            </h2>
            {displayData.experience && displayData.experience.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a3a52' }}>{exp.position}</h3>
                    <p style={{ fontSize: '13px', color: '#4a90e2', fontWeight: '600' }}>{exp.company}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                {exp.achievements && (
                  <ul style={{ fontSize: '12px', lineHeight: '1.7', color: '#333', paddingLeft: '20px' }}>
                    {exp.achievements.map((achievement: string, j: number) => (
                      <li key={j} style={{ marginBottom: '4px' }}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
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
            <section style={{ marginBottom: '35px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>
                EDUCATION
              </h2>
              {displayData.education && displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52' }}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#4a90e2' }}>{edu.institution}</p>
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </InlineSectionWrapper>
        ) : (
          <section style={{ marginBottom: '35px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a3a52', marginBottom: '15px', borderBottom: '3px solid #1a3a52', paddingBottom: '8px', letterSpacing: '0.5px' }}>
              EDUCATION
            </h2>
            {displayData.education && displayData.education.map((edu: any, i: number) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a3a52' }}>
                      {edu.degree} in {edu.field}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4a90e2' }}>{edu.institution}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
