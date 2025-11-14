import { describe, it, expect } from 'vitest'
import { resumeJsonToUniversal, universalToPlainTextCV, type AIResumeJSON } from '@/lib/ai/adapter'

describe('AI Adapter', () => {
  describe('resumeJsonToUniversal', () => {
    it('should convert AIservice ResumeJSON to UniversalResumeData', () => {
      const aiData: AIResumeJSON = {
        metadata: {
          language: 'en',
          sourceOrderPreserved: true,
          warnings: ['Removed 1 old experience'],
        },
        header: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          links: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            portfolio: 'https://johndoe.com',
          },
        },
        summary: 'Experienced software engineer with 5 years in web development.',
        experience: [
          {
            company: 'Tech Corp',
            title: 'Senior Developer',
            location: 'San Francisco, CA',
            startDate: '2020-01',
            endDate: 'Present',
            bullets: [
              'Led team of 5 developers',
              'Improved performance by 40%',
            ],
          },
        ],
        education: [
          {
            school: 'University of California',
            degree: 'BS Computer Science',
            location: 'Berkeley, CA',
            dates: '2015-2019',
          },
        ],
        projects: [
          {
            name: 'Open Source Library',
            dates: '2021-2022',
            bullets: [
              'Created popular React library',
              '1000+ GitHub stars',
            ],
          },
        ],
        skills: {
          languages: ['JavaScript', 'TypeScript', 'Python'],
          frameworks: ['React', 'Node.js'],
          tools: ['Git', 'Docker'],
          other: ['Agile', 'CI/CD'],
        },
        languages: ['English', 'Spanish'],
        interests: ['Open Source', 'Machine Learning'],
      }

      const result = resumeJsonToUniversal(aiData)

      // Check personal info
      expect(result.personal.fullName).toBe('John Doe')
      expect(result.personal.email).toBe('john@example.com')
      expect(result.personal.phone).toBe('+1234567890')
      expect(result.personal.linkedIn).toBe('https://linkedin.com/in/johndoe')
      expect(result.personal.github).toBe('https://github.com/johndoe')

      // Check experience
      expect(result.experience).toHaveLength(1)
      expect(result.experience[0].company).toBe('Tech Corp')
      expect(result.experience[0].position).toBe('Senior Developer')
      expect(result.experience[0].endDate).toBe('Present')
      expect(result.experience[0].achievements).toHaveLength(2)

      // Check education
      expect(result.education).toHaveLength(1)
      expect(result.education[0].institution).toBe('University of California')
      expect(result.education[0].degree).toBe('BS Computer Science')

      // Check projects
      expect(result.projects).toHaveLength(1)
      expect(result.projects![0].name).toBe('Open Source Library')
      expect(result.projects![0].highlights).toHaveLength(2)

      // Check skills (flattened)
      expect(result.skills).toContain('JavaScript')
      expect(result.skills).toContain('React')
      expect(result.skills).toContain('Git')
      expect(result.skills).toContain('Agile')

      // Check languages
      expect(result.languages).toHaveLength(2)
      expect(result.languages![0].name).toBe('English')
      expect(result.languages![0].proficiency).toBe('Intermediate')

      // Check interests
      expect(result.interests).toHaveLength(2)
      expect(result.interests![0].name).toBe('Open Source')

      // Check summary
      expect(result.summary).toBe('Experienced software engineer with 5 years in web development.')

      // Check custom sections (warnings)
      expect(result.customSections).toBeDefined()
      expect(result.customSections![0].title).toBe('AI Processing Notes')
    })

    it('should handle minimal data', () => {
      const minimalData: AIResumeJSON = {
        header: {
          fullName: 'Jane Smith',
        },
        experience: [],
      }

      const result = resumeJsonToUniversal(minimalData)

      expect(result.personal.fullName).toBe('Jane Smith')
      expect(result.personal.email).toBe('')
      expect(result.experience).toHaveLength(0)
      expect(result.education).toHaveLength(0)
      expect(result.skills).toHaveLength(0)
    })
  })

  describe('universalToPlainTextCV', () => {
    it('should convert UniversalResumeData to plain text', () => {
      const universalData = {
        personal: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          location: 'San Francisco, CA',
          title: 'Senior Developer',
          website: 'https://johndoe.com',
          linkedIn: 'https://linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
        },
        summary: 'Experienced software engineer',
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Developer',
            location: 'San Francisco, CA',
            startDate: '2020-01',
            endDate: 'Present',
            description: '',
            achievements: ['Led team of 5', 'Improved performance'],
            technologies: ['React', 'Node.js'],
          },
        ],
        education: [
          {
            institution: 'UC Berkeley',
            degree: 'BS Computer Science',
            field: 'Computer Science',
            location: 'Berkeley, CA',
            startDate: '2015',
            endDate: '2019',
            gpa: '3.8',
            honors: ['Dean\'s List'],
            coursework: [],
          },
        ],
        skills: ['JavaScript', 'React', 'Node.js'],
        projects: [],
        languages: [
          { name: 'English', proficiency: 'Native' as const },
          { name: 'Spanish', proficiency: 'Intermediate' as const },
        ],
        interests: [{ name: 'Open Source' }],
      }

      const result = universalToPlainTextCV(universalData)

      // Check that all sections are present
      expect(result).toContain('=== PERSONAL INFORMATION ===')
      expect(result).toContain('Name: John Doe')
      expect(result).toContain('Email: john@example.com')
      expect(result).toContain('LinkedIn: https://linkedin.com/in/johndoe')

      expect(result).toContain('=== PROFESSIONAL SUMMARY ===')
      expect(result).toContain('Experienced software engineer')

      expect(result).toContain('=== PROFESSIONAL EXPERIENCE ===')
      expect(result).toContain('Senior Developer at Tech Corp')
      expect(result).toContain('• Led team of 5')

      expect(result).toContain('=== EDUCATION ===')
      expect(result).toContain('BS Computer Science - UC Berkeley')
      expect(result).toContain('GPA: 3.8')

      expect(result).toContain('=== SKILLS ===')
      expect(result).toContain('JavaScript, React, Node.js')

      expect(result).toContain('=== LANGUAGES ===')
      expect(result).toContain('English (Native)')
      expect(result).toContain('Spanish (Intermediate)')

      expect(result).toContain('=== INTERESTS ===')
      expect(result).toContain('Open Source')
    })
  })
})
