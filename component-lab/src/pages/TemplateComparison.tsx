/**
 * TEMPLATE COMPARISON PAGE
 * Side-by-side comparison of original vs refactored templates
 */

import React, { useState } from 'react'
import { DarkProfessionalLayout } from '@cv-components/templates'
import { PersonalInfoSection } from '@cv-components/organisms/PersonalInfoSection'
import { ExperienceSection } from '@cv-components/organisms/ExperienceSection'
import { EducationSection } from '@cv-components/organisms/EducationSection'
import { SkillsSection } from '@cv-components/organisms/SkillsSection'
import { DarkProfessionalTemplate } from '@cv-templates/template-14-dark-professional'
import { SAMPLE_CV_DATA } from '@/lib/sample-data'

export default function TemplateComparison() {
  const [scale, setScale] = useState(0.45)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[2000px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dark Professional Template Comparison
          </h1>
          <p className="text-gray-600 mb-4">
            Original (left) vs Refactored Component-Based (right)
          </p>
          
          {/* Scale Control */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Zoom: {Math.round(scale * 100)}%
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-64"
            />
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-6">
          {/* Original Template */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 font-bold">
              ⭐ ORIGINAL TEMPLATE
            </div>
            <div className="p-4 bg-gray-50">
              <div 
                style={{ 
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                }}
              >
                <DarkProfessionalTemplate data={SAMPLE_CV_DATA} />
              </div>
            </div>
          </div>

          {/* Refactored Template */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-3 font-bold">
              🔧 REFACTORED (Component-Based)
            </div>
            <div className="p-4 bg-gray-50">
              <div 
                style={{ 
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                }}
              >
                <DarkProfessionalLayout
                  gradientStart="#0a2e2e"
                  gradientMiddle="#1a3a3a"
                  gradientEnd="#0f2626"
                  leftPadding="60px 50px"
                  rightPadding="60px 50px"
                  left={
                    <>
                      <PersonalInfoSection
                        data={{
                          ...SAMPLE_CV_DATA.personal,
                          summary: SAMPLE_CV_DATA.summary
                        }}
                        variant="custom"
                        showPhoto={false}
                        showContact={false}
                        showSummary={true}
                        textAlign="left"
                        textColor="#ffffff"
                        nameSize="48px"
                        nameWeight={300}
                        nameLetterSpacing="1px"
                        titleSize="16px"
                        titleWeight={400}
                        titleLetterSpacing="2px"
                        titleTransform="uppercase"
                        titleColor="#a0a0a0"
                        summaryColor="#c0c0c0"
                        summarySize="13px"
                        summaryLineHeight="1.8"
                      />

                      <ExperienceSection
                        data={SAMPLE_CV_DATA.experience}
                        variant="detailed"
                        title="WORK EXPERIENCE"
                        textColor="#ffffff"
                        accentColor="#4ade80"
                        showHeader={true}
                      />
                    </>
                  }
                  right={
                    <>
                      <EducationSection
                        data={SAMPLE_CV_DATA.education}
                        variant="compact"
                        title="EDUCATION"
                        textColor="#ffffff"
                        accentColor="#4ade80"
                        showHeader={true}
                      />
                      <div style={{ marginTop: '40px' }}>
                        <SkillsSection
                          data={SAMPLE_CV_DATA.skills || ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL']}
                          variant="progress-bars"
                          title="SKILLS"
                          textColor="#ffffff"
                          accentColor="#4ade80"
                          headerVariant="sidebar"
                          showHeader={true}
                        />
                      </div>
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Difference Checklist */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            🔍 Visual Differences to Check
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Typography</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Name size (48px vs actual)</li>
                <li>• Title size & letter-spacing</li>
                <li>• Section header sizes</li>
                <li>• Body text line-height</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Colors</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Gradient background match</li>
                <li>• Text colors (#ffffff, #a0a0a0, #c0c0c0)</li>
                <li>• Accent color (#4ade80)</li>
                <li>• Section backgrounds</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Spacing</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Padding (60px 50px)</li>
                <li>• Margins between sections</li>
                <li>• Line gaps in lists</li>
                <li>• Header bottom spacing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Layout</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 55/45 split ratio</li>
                <li>• Geometric pattern opacity</li>
                <li>• Component alignment</li>
                <li>• Sidebar background darkness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
