import { NextRequest, NextResponse } from 'next/server'
import { analyzeResume } from '../../../ATS-playground/lib/ats-analyzer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { parsedCV, fileName, fileSize } = body
    
    if (!parsedCV) {
      return NextResponse.json(
        { error: 'Invalid or missing parsed CV data' },
        { status: 400 }
      )
    }
    
    // Extract text from the parsed CV for ATS analysis
    const resumeText = extractTextFromCV(parsedCV)
    
    // Run ATS analysis
    const atsInput = {
      resume_text: resumeText,
      file_type: fileName?.split('.').pop() || 'pdf',
      file_size_kb: (fileSize || 0) / 1024,
      candidate_name: parsedCV?.header?.fullName || null,
      job_title_target: null,
      job_description: null,
      parse_coverage_ratio: 0.9,
      available_templates: [
        'Clean One-Column',
        'Modern Two-Tone',
        'Professional Classic',
        'Tech Minimal'
      ],
      parsed_cv: parsedCV,
      extra_metadata: {
        sections: {
          experience: parsedCV?.experience ? 'Present' : null,
          education: parsedCV?.education ? 'Present' : null,
          skills: parsedCV?.skills ? 'Present' : null,
          summary: parsedCV?.summary ? 'Present' : null
        },
        word_count: resumeText.split(/\s+/).length,
        bullet_count: (resumeText.match(/^[-•*]/gm) || []).length
      }
    }
    
    const report = await analyzeResume(atsInput)
    
    return NextResponse.json({
      success: true,
      report
    })
    
  } catch (error) {
    console.error('ATS upload error:', error)
    return NextResponse.json(
      {
        error: 'Analysis failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Extract text from structured CV (fallback if raw_text not available)
function extractTextFromCV(cv: any): string {
  if (!cv) return ''
  
  const parts: string[] = []
  
  // Header
  if (cv.header) {
    if (cv.header.fullName) parts.push(cv.header.fullName)
    if (cv.header.email) parts.push(cv.header.email)
    if (cv.header.phone) parts.push(cv.header.phone)
    if (cv.header.location) parts.push(cv.header.location)
    parts.push('')
  }
  
  // Summary
  if (cv.summary) {
    parts.push('PROFESSIONAL SUMMARY')
    parts.push(cv.summary)
    parts.push('')
  }
  
  // Experience
  if (cv.experience?.length > 0) {
    parts.push('WORK EXPERIENCE')
    cv.experience.forEach((exp: any) => {
      if (exp.title) parts.push(exp.title)
      if (exp.company) parts.push(exp.company)
      if (exp.bullets) {
        exp.bullets.forEach((bullet: string) => parts.push(`• ${bullet}`))
      }
      parts.push('')
    })
  }
  
  // Education
  if (cv.education?.length > 0) {
    parts.push('EDUCATION')
    cv.education.forEach((edu: any) => {
      if (edu.degree) parts.push(edu.degree)
      if (edu.school) parts.push(edu.school)
      parts.push('')
    })
  }
  
  // Skills
  if (cv.skills) {
    parts.push('SKILLS')
    const allSkills: string[] = []
    if (cv.skills.technical) allSkills.push(...cv.skills.technical)
    if (cv.skills.languages) allSkills.push(...cv.skills.languages)
    if (cv.skills.frameworks) allSkills.push(...cv.skills.frameworks)
    if (cv.skills.tools) allSkills.push(...cv.skills.tools)
    parts.push(allSkills.join(', '))
    parts.push('')
  }
  
  return parts.join('\n')
}
