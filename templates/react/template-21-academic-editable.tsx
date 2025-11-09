/**
 * TEMPLATE 21: ACADEMIC CV - EDITABLE VERSION
 * Single-column traditional academic layout with serif font
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

export const AcademicCVEditable: React.FC<EditableTemplateProps> = ({ 
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
      background: '#ffffff',
      fontFamily: "'Times New Roman', Georgia, serif",
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '40px 60px',
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
          <header style={{
            textAlign: 'center',
            marginBottom: '25px',
            paddingBottom: '15px',
            borderBottom: '2px solid #333',
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px',
              letterSpacing: '1px',
            }}>{displayData.personal?.fullName || 'Your Name'}</h1>
            <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              {displayData.personal?.location && <span>{displayData.personal.location} • </span>}
              {displayData.personal?.phone && <span>Phone: {displayData.personal.phone} • </span>}
              {displayData.personal?.email && <span>Email: {displayData.personal.email}</span>}
              {displayData.personal?.website && (
                <div style={{ marginTop: '4px' }}>
                  Website: {displayData.personal.website}
                </div>
              )}
            </div>
          </header>
        </InlineSectionWrapper>
      ) : (
        <header style={{
          textAlign: 'center',
          marginBottom: '25px',
          paddingBottom: '15px',
          borderBottom: '2px solid #333',
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '8px',
            letterSpacing: '1px',
          }}>{displayData.personal?.fullName || 'Your Name'}</h1>
          <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
            {displayData.personal?.location && <span>{displayData.personal.location} • </span>}
            {displayData.personal?.phone && <span>Phone: {displayData.personal.phone} • </span>}
            {displayData.personal?.email && <span>Email: {displayData.personal.email}</span>}
            {displayData.personal?.website && (
              <div style={{ marginTop: '4px' }}>
                Website: {displayData.personal.website}
              </div>
            )}
          </div>
        </header>
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
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Education</h2>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#333', marginBottom: '3px' }}>
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
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Education</h2>
              {displayData.education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#333', marginBottom: '3px' }}>
                    {edu.institution}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
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
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Experience</h2>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{exp.position}</div>
                    <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#333', marginBottom: '5px' }}>
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', margin: '5px 0', paddingLeft: '15px' }}>
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
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Experience</h2>
              {displayData.experience.map((exp: any, i: number) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>{exp.position}</div>
                    <div style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>
                      {exp.startDate} – {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#333', marginBottom: '5px' }}>
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '10px', color: '#666', lineHeight: '1.5', margin: '5px 0', paddingLeft: '15px' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </>
      )}

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
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Skills</h2>
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
                <strong>Technical Skills:</strong> {displayData.skills.join(', ')}
              </div>
            </section>
          )}
        </InlineSectionWrapper>
      ) : (
        <>
          {displayData.skills && displayData.skills.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                textTransform: 'uppercase',
                marginBottom: '10px',
                paddingBottom: '5px',
                borderBottom: '1px solid #333',
                letterSpacing: '1px',
              }}>Skills</h2>
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
                <strong>Technical Skills:</strong> {displayData.skills.join(', ')}
              </div>
            </section>
          )}
        </>
      )}

      {/* Certifications */}
      {displayData.certifications && displayData.certifications.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '10px',
            paddingBottom: '5px',
            borderBottom: '1px solid #333',
            letterSpacing: '1px',
          }}>Certifications</h2>
          {displayData.certifications.map((cert: any, i: number) => (
            <div key={i} style={{ marginBottom: '8px', fontSize: '10px', color: '#666', lineHeight: '1.4' }}>
              <strong>{cert.name}</strong> - {cert.issuer}, {cert.date}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {displayData.languages && displayData.languages.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '10px',
            paddingBottom: '5px',
            borderBottom: '1px solid #333',
            letterSpacing: '1px',
          }}>Languages</h2>
          <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.5' }}>
            {displayData.languages.map((lang: any, i: number) => {
              const langName = typeof lang === 'string' ? lang : lang.name;
              const proficiency = typeof lang === 'string' ? 'Proficient' : lang.proficiency;
              return (
                <span key={i}>
                  {langName} ({proficiency}){i < (displayData.languages?.length || 0) - 1 ? ', ' : ''}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects */}
      {displayData.projects && displayData.projects.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'uppercase',
            marginBottom: '10px',
            paddingBottom: '5px',
            borderBottom: '1px solid #333',
            letterSpacing: '1px',
          }}>Projects</h2>
          {displayData.projects.map((proj: any, i: number) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#333', marginBottom: '3px' }}>
                {proj.name}
              </div>
              <div style={{ fontSize: '10px', color: '#666', lineHeight: '1.4', marginBottom: '3px' }}>
                {proj.description}
              </div>
            </div>
          ))}
        </section>
      )}
      </div>
    </div>
  );
};
