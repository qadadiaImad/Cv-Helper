"use client"

import React, { useState } from 'react'
import { CVPreview } from '@/components/cv-preview'
import { InlineSectionWrapper } from '@/components/builder/inline-section-wrapper'
import { PersonalForm } from '@/components/builder/personal-form'
import { ExperienceForm } from '@/components/builder/experience-form'
import { EducationForm } from '@/components/builder/education-form'
import { SkillsForm } from '@/components/builder/skills-form'
import { ProjectsForm } from '@/components/builder/projects-form'
import type { UniversalResumeData } from '@/lib/schemas'
import type { TemplateId } from '@/lib/react-templates'

type SectionId = 'personal' | 'experience' | 'education' | 'skills' | 'projects'

interface InlineCVPreviewProps {
  data: UniversalResumeData
  selectedTemplate: TemplateId
  onChange: (data: UniversalResumeData) => void
}

export function InlineCVPreview({ data, selectedTemplate, onChange }: InlineCVPreviewProps) {
  const [editingSection, setEditingSection] = useState<SectionId | null>(null)
  const [tempData, setTempData] = useState<UniversalResumeData>(data)

  // Check if sections are empty
  const isSectionEmpty = (sectionId: SectionId): boolean => {
    switch (sectionId) {
      case 'personal':
        return !data.personal?.fullName && !data.personal?.email
      case 'experience':
        return !data.experience || data.experience.length === 0
      case 'education':
        return !data.education || data.education.length === 0
      case 'skills':
        return !data.skills || data.skills.length === 0
      case 'projects':
        return !data.projects || data.projects.length === 0
      default:
        return false
    }
  }

  const handleEdit = (sectionId: SectionId) => {
    setTempData(data)
    setEditingSection(sectionId)
  }

  const handleSave = () => {
    onChange(tempData)
    setEditingSection(null)
  }

  const handleCancel = () => {
    setTempData(data)
    setEditingSection(null)
  }

  const handleFormChange = (newData: UniversalResumeData) => {
    setTempData(newData)
  }

  // Render the CV with inline editing wrappers
  // We'll need to modify the CVPreview component to accept section wrappers
  // For now, let's create a custom render

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <InlineSectionWrapper
        sectionId="personal"
        title="Personal Information"
        isEditing={editingSection === 'personal'}
        onEdit={() => handleEdit('personal')}
        onSave={handleSave}
        onCancel={handleCancel}
        isEmpty={isSectionEmpty('personal')}
        formContent={
          <PersonalForm 
            data={tempData} 
            onChange={handleFormChange}
          />
        }
      >
        {/* Render personal info preview */}
        <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-t-lg">
          <h1 className="text-4xl font-bold mb-2">
            {data.personal?.fullName || 'Your Name'}
          </h1>
          {data.personal?.title && (
            <p className="text-xl text-slate-300 mb-4">{data.personal.title}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {data.personal?.email && <span>📧 {data.personal.email}</span>}
            {data.personal?.phone && <span>📱 {data.personal.phone}</span>}
            {data.personal?.location && <span>📍 {data.personal.location}</span>}
          </div>
        </div>
      </InlineSectionWrapper>

      {/* Experience Section */}
      <InlineSectionWrapper
        sectionId="experience"
        title="Work Experience"
        isEditing={editingSection === 'experience'}
        onEdit={() => handleEdit('experience')}
        onSave={handleSave}
        onCancel={handleCancel}
        isEmpty={isSectionEmpty('experience')}
        formContent={
          <ExperienceForm 
            data={tempData} 
            onChange={handleFormChange}
          />
        }
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-slate-300 pb-2">
            EXPERIENCE
          </h2>
          {data.experience && data.experience.length > 0 ? (
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-slate-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.achievements && (
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">No experience added yet</p>
          )}
        </div>
      </InlineSectionWrapper>

      {/* Education Section */}
      <InlineSectionWrapper
        sectionId="education"
        title="Education"
        isEditing={editingSection === 'education'}
        onEdit={() => handleEdit('education')}
        onSave={handleSave}
        onCancel={handleCancel}
        isEmpty={isSectionEmpty('education')}
        formContent={
          <EducationForm 
            data={tempData} 
            onChange={handleFormChange}
          />
        }
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-slate-300 pb-2">
            EDUCATION
          </h2>
          {data.education && data.education.length > 0 ? (
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{edu.degree} in {edu.field}</h3>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-slate-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">No education added yet</p>
          )}
        </div>
      </InlineSectionWrapper>

      {/* Skills Section */}
      <InlineSectionWrapper
        sectionId="skills"
        title="Skills"
        isEditing={editingSection === 'skills'}
        onEdit={() => handleEdit('skills')}
        onSave={handleSave}
        onCancel={handleCancel}
        isEmpty={isSectionEmpty('skills')}
        formContent={
          <SkillsForm 
            data={tempData} 
            onChange={handleFormChange}
          />
        }
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-slate-300 pb-2">
            SKILLS
          </h2>
          {data.skills && data.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">No skills added yet</p>
          )}
        </div>
      </InlineSectionWrapper>

      {/* Projects Section */}
      <InlineSectionWrapper
        sectionId="projects"
        title="Projects"
        isEditing={editingSection === 'projects'}
        onEdit={() => handleEdit('projects')}
        onSave={handleSave}
        onCancel={handleCancel}
        isEmpty={isSectionEmpty('projects')}
        formContent={
          <ProjectsForm 
            data={tempData} 
            onChange={handleFormChange}
          />
        }
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-slate-300 pb-2">
            PROJECTS
          </h2>
          {data.projects && data.projects.length > 0 ? (
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic">No projects added yet</p>
          )}
        </div>
      </InlineSectionWrapper>
    </div>
  )
}
