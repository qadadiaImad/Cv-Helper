# ATS Module Integration Guide

Complete guide to integrate the ATS Playground module into the main CV-Helper application.

---

## 🎯 Integration Overview

The ATS module is designed to be easily integrated into the main app once development and testing are complete.

**Flow:**
```
User uploads CV → Parse CV (existing) → JSON → ATS Analysis → Score + Recommendations → UI Display
```

---

## 📦 Step 1: Install Dependencies

From the ATS-playground directory:

```bash
cd ATS-playground
npm install
```

---

## 🧪 Step 2: Test the Module

Run the test suite to verify everything works:

```bash
npm test
```

This will analyze the 3 sample CVs and generate reports in `test/output/`.

---

## 🔌 Step 3: Create API Route

Create the API endpoint in the main app:

**File:** `app/api/ai/ats/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { analyzeCV } from '@/ATS-playground'
import type { ATSInput } from '@/ATS-playground/lib/types'

export async function POST(req: NextRequest) {
  try {
    const input: ATSInput = await req.json()
    
    // Validate input
    if (!input.resume_text || !input.language_detected) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Run ATS analysis
    const report = await analyzeCV(input)
    
    return NextResponse.json({
      success: true,
      report
    })
    
  } catch (error) {
    console.error('ATS analysis error:', error)
    return NextResponse.json(
      { 
        error: 'ATS analysis failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
```

---

## 🔄 Step 4: Connect with Parse CV Module

The ATS module requires the JSON output from the Parse CV module. Here's how to connect them:

**File:** `lib/services/cv-ats-flow.ts`

```typescript
import { aiParseCvWithService } from './ai.service'
import { analyzeCV } from '@/ATS-playground'
import type { ATSInput } from '@/ATS-playground/lib/types'

/**
 * Complete flow: Parse CV → ATS Analysis
 */
export async function parseCVAndAnalyzeATS(params: {
  cvText: string
  fileType: string
  fileSizeKb: number
  jobDescription?: string
  jobTitleTarget?: string
  candidateName?: string
  language?: string
}) {
  // Step 1: Parse CV with existing Parse module
  const parseResult = await aiParseCvWithService({
    cv_text: params.cvText
  })
  
  if (!parseResult.clean) {
    throw new Error('CV parsing failed')
  }
  
  // Step 2: Extract metadata from parsed CV
  const cleanCV = parseResult.clean
  const resumeText = params.cvText
  
  // Count words, bullets, etc.
  const wordCount = resumeText.split(/\s+/).length
  const bulletCount = (resumeText.match(/^[-•*]/gm) || []).length
  
  // Step 3: Build ATS input
  const atsInput: ATSInput = {
    resume_text: resumeText,
    language_detected: params.language || cleanCV.metadata?.language || 'en',
    preferred_language: 'same_as_resume',
    file_type: params.fileType,
    file_size_kb: params.fileSizeKb,
    candidate_name: params.candidateName || cleanCV.header?.fullName || null,
    job_title_target: params.jobTitleTarget || null,
    job_description: params.jobDescription || null,
    parse_coverage_ratio: 0.9, // Assume good parsing from our module
    available_templates: [
      'Clean One-Column',
      'Modern Two-Tone',
      'Professional Classic',
      'Tech Minimal'
    ],
    extra_metadata: {
      sections: {
        experience: cleanCV.experience ? 'Present' : null,
        education: cleanCV.education ? 'Present' : null,
        skills: cleanCV.skills ? 'Present' : null,
        summary: cleanCV.summary ? 'Present' : null,
        projects: cleanCV.projects ? 'Present' : null
      },
      word_count: wordCount,
      bullet_count: bulletCount,
      years_of_experience: calculateYearsOfExperience(cleanCV.experience)
    }
  }
  
  // Step 4: Run ATS analysis
  const atsReport = await analyzeCV(atsInput)
  
  return {
    parsedCV: parseResult.clean,
    atsReport,
    usage: parseResult.usage
  }
}

function calculateYearsOfExperience(experiences?: any[]): number | null {
  if (!experiences || experiences.length === 0) return null
  
  // Simple calculation - count years from first to last job
  // You can improve this logic based on your data structure
  return experiences.length * 2 // Rough estimate
}
```

---

## 🎨 Step 5: Create UI Component (React)

**File:** `components/ats-report-viewer.tsx`

```typescript
'use client'

import { useState } from 'react'
import type { ATSReport } from '@/ATS-playground/lib/types'

interface ATSReportViewerProps {
  report: ATSReport
}

export function ATSReportViewer({ report }: ATSReportViewerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  
  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey)
    } else {
      newExpanded.add(sectionKey)
    }
    setExpandedSections(newExpanded)
  }
  
  return (
    <div className="ats-report-container">
      {/* Left Panel - Fixed */}
      <div className="fixed left-0 top-20 w-80 h-screen bg-white p-6 border-r">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-blue-600">
            {report.global_score}
          </div>
          <div className="text-sm text-gray-500">/ 100</div>
          <div className="mt-2 text-lg font-semibold">
            {getScoreLabel(report.global_score)}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Issues Found</span>
            <span className="text-lg font-bold text-red-600">
              {report.issues_count}
            </span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          {report.overall_comment}
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View Full Report
        </button>
      </div>
      
      {/* Main Content - Scrollable */}
      <div className="ml-80 p-8">
        <h1 className="text-3xl font-bold mb-8">ATS Analysis Report</h1>
        
        {/* Section: ATS Parse Rate */}
        <Section
          title={report.sections.ats_parse_rate.headline}
          score={report.sections.ats_parse_rate.score}
          status={report.sections.ats_parse_rate.status}
          explanation={report.sections.ats_parse_rate.explanation}
          suggestions={report.sections.ats_parse_rate.suggestions}
          expanded={expandedSections.has('parse_rate')}
          onToggle={() => toggleSection('parse_rate')}
        />
        
        {/* Section: Quantify Impact */}
        <Section
          title={report.sections.quantify_impact.headline}
          score={report.sections.quantify_impact.score}
          status={report.sections.quantify_impact.status}
          explanation={report.sections.quantify_impact.explanation}
          suggestions={report.sections.quantify_impact.general_tips}
          expanded={expandedSections.has('impact')}
          onToggle={() => toggleSection('impact')}
        >
          {report.sections.quantify_impact.examples.length > 0 && (
            <div className="mt-4 space-y-4">
              <h4 className="font-semibold">Example Improvements:</h4>
              {report.sections.quantify_impact.examples.map((ex, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-red-600 mb-2">
                    ❌ {ex.original_bullet}
                  </div>
                  <div className="text-sm text-gray-600 italic mb-2">
                    {ex.analysis}
                  </div>
                  <div className="text-sm text-green-600">
                    ✅ {ex.improved_bullet}
                  </div>
                </div>
              ))}
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Rewrite My Bullet Points
              </button>
            </div>
          )}
        </Section>
        
        {/* Add more sections similarly... */}
        
        {/* Template Suggestions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recommended Templates</h3>
          <div className="grid grid-cols-3 gap-4">
            {report.sections.template_suggestions.recommended_templates.map((template, i) => (
              <div key={i} className="border rounded-lg p-4 hover:shadow-lg cursor-pointer">
                <h4 className="font-semibold mb-2">{template.template_name}</h4>
                <p className="text-sm text-gray-600">{template.reason}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Choose This Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, score, status, explanation, suggestions, expanded, onToggle, children }: any) {
  return (
    <div className="mb-6 border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={onToggle}>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className="text-2xl font-bold">{score}/100</span>
          <span>{expanded ? '▼' : '▶'}</span>
        </div>
      </div>
      
      {expanded && (
        <>
          <p className="text-gray-600 mb-4">{explanation}</p>
          <div className="space-y-2">
            {suggestions.map((s: string, i: number) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-sm">{s}</span>
              </div>
            ))}
          </div>
          {children}
        </>
      )}
    </div>
  )
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Very Good'
  if (score >= 60) return 'Fair'
  return 'Needs Improvement'
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'excellent': return 'bg-green-100 text-green-800'
    case 'good': return 'bg-blue-100 text-blue-800'
    case 'needs_improvement': return 'bg-yellow-100 text-yellow-800'
    case 'poor': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
```

---

## 🔗 Step 6: Add to tsconfig.json

Update the main app's `tsconfig.json` to include the ATS-playground module:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/ATS-playground": ["./ATS-playground"],
      "@/ATS-playground/*": ["./ATS-playground/*"]
    }
  }
}
```

---

## 🎯 Step 7: Landing Page Integration

Add ATS score check to the landing page:

```typescript
// app/page.tsx or landing page
<section className="hero">
  <h1>Check Your ATS Score - Free!</h1>
  <UploadCVButton onUpload={handleATSCheck} />
</section>
```

---

## ✅ Integration Checklist

- [ ] Install dependencies in ATS-playground
- [ ] Run tests and verify all pass
- [ ] Create `/api/ai/ats/route.ts` endpoint
- [ ] Create CV-ATS flow service in `lib/services/`
- [ ] Build UI components for report display
- [ ] Update tsconfig paths
- [ ] Wire buttons to backend services
- [ ] Test complete flow: Upload → Parse → ATS → Display
- [ ] Add to landing page
- [ ] Deploy and monitor

---

## 🐛 Troubleshooting

**Module not found:**
- Check tsconfig.json paths
- Restart dev server after changes

**Type errors:**
- Ensure types are exported from ATS-playground/index.ts
- Check import paths

**API errors:**
- Verify input structure matches ATSInput type
- Check console for detailed error messages

---

## 📚 Resources

- [ATS Playground README](./README.md)
- [Type Definitions](./lib/types.ts)
- [Test Examples](./test/sample-cvs/)

---

**Ready to integrate? Start with Step 1!** 🚀
