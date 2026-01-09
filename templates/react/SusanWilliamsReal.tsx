import React from 'react'
import type { UniversalResumeData } from '@/lib/schemas'

/**
 * SusanWilliamsReal - REAL AI-Generated Template
 * Generated from: https://www.coolfreecv.com/images/cv-template-0003.jpg
 * Extracted Name: Susan Williams
 * Generated: 2026-01-07T16:29:18.572Z
 * 
 * This template was created using REAL AI extraction from the CV image.
 * Data accuracy: Based on actual AI vision processing results.
 */

interface TemplateProps {
  data: UniversalResumeData
}

export const SusanWilliamsReal: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div className="cv-template-real-susan-williams-real max-w-4xl mx-auto p-8 bg-white">
      {/* AI-Extracted Header - Matching Original Layout */}
      <header className="bg-blue-900 text-white p-6 mb-8 rounded-lg relative">
        <div className="flex items-center space-x-6">
          {/* Profile Photo Placeholder */}
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {data.personal.fullName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              {data.personal.phone && (
                <span>📞 {data.personal.phone}</span>
              )}
              {data.personal.email && (
                <span>✉️ {data.personal.email}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {data.summary && (
        <section className="mb-8">
          <p className="text-gray-800 leading-relaxed text-lg bg-gray-50 p-4 rounded-lg">
            {data.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Experience */}
        <div className="lg:col-span-2">
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-blue-900 pb-2">
              Experience
            </h3>
            <div className="space-y-6">
              
              <div key={0} className="bg-white border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Store Manager
                    </h4>
                    <p className="text-blue-700 font-semibold uppercase tracking-wide">
                      LUXURY CAR CENTER, New York
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    09/2015 to 05/2019
                  </span>
                </div>
                
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
                  
                  <li key={0} className="text-sm">Motivate and coach employees to meet goals and modify sales goals</li>
                  
                  <li key={1} className="text-sm">Create and modify employee schedules with service levels in mind</li>
                  
                  <li key={2} className="text-sm">Maintain good relations</li>
                  
                  <li key={3} className="text-sm">Maintain detailed logs and reports of services</li>
                  
                </ul>
                
              </div>
              
              <div key={1} className="bg-white border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      Store Manager
                    </h4>
                    <p className="text-blue-700 font-semibold uppercase tracking-wide">
                      JAPAN CAR CENTER, New York
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    09/2014 to 09/2015
                  </span>
                </div>
                
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
                  
                  <li key={0} className="text-sm">Answered customer questions and received service needs in a timely manner</li>
                  
                  <li key={1} className="text-sm">Coordinated equipment repairs and maintenance</li>
                  
                </ul>
                
              </div>
              
            </div>
          </section>
        </div>

        {/* Right Column - Highlights, Education, Hobbies */}
        <div>
          {/* Highlights Section */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
              Highlights
            </h3>
            <div className="space-y-2">
              
              <div key={0} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Results-oriented
              </div>
              
              <div key={1} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Business development
              </div>
              
              <div key={2} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Effective marketing
              </div>
              
              <div key={3} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Organizational capacity
              </div>
              
              <div key={4} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Leadership and recruitment
              </div>
              
              <div key={5} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Ability to work with people
              </div>
              
              <div key={6} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Service delivery
              </div>
              
            </div>
          </section>

          {/* Education Section */}
          
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
              Education
            </h3>
            
            <div key={0} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-1">
                Bachelor of Science: Automotive Technology
              </h4>
              <p className="text-blue-700 font-medium text-sm">
                Technical Institute, NY • 2014 - 2019
              </p>
            </div>
            
          </section>
          

          {/* Hobbies Section */}
          
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-900 pb-2">
              Hobbies
            </h3>
            <div className="space-y-2">
              
              <div key={0} className="flex items-start text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></span>
                <span className="text-sm">Playing chess - great way to unwind, destress, and keep the mind sharp</span>
              </div>
              
            </div>
          </section>
          
        </div>
      </div>
    </div>
  )
}

export default SusanWilliamsReal

// Real extraction metadata
export const templateMetadata = {
  id: 'susan-williams-real',
  name: 'SusanWilliamsReal',
  category: 'AI-Generated',
  tier: 1,
  tags: ['ai-extracted', 'real-data', 'automotive', 'management'],
  source: 'cv-image-processor',
  originalImage: 'https://www.coolfreecv.com/images/cv-template-0003.jpg',
  extractedName: 'Susan Williams',
  generatedAt: '2026-01-07T16:29:18.573Z',
  extractionQuality: {
    personalInfo: 4,
    experience: 3,
    education: 2,
    skills: 2,
    totalScore: 11
  }
}