import { NextRequest, NextResponse } from 'next/server'
import { analyzeResume } from '../../../lib/ats-analyzer'
import type { ATSInput } from '../../../lib/types'

export async function POST(req: NextRequest) {
  try {
    const input: ATSInput = await req.json()
    
    // Validate required fields
    if (!input.resume_text || input.resume_text.trim().length === 0) {
      return NextResponse.json(
        { error: 'resume_text is required' },
        { status: 400 }
      )
    }
    
    if (!input.file_type) {
      return NextResponse.json(
        { error: 'file_type is required' },
        { status: 400 }
      )
    }
    
    if (typeof input.file_size_kb !== 'number') {
      return NextResponse.json(
        { error: 'file_size_kb must be a number' },
        { status: 400 }
      )
    }
    
    // Run ATS analysis
    const report = await analyzeResume(input)
    
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

export async function GET() {
  return NextResponse.json({
    message: 'ATS Analysis API',
    version: '1.0.0',
    endpoints: {
      POST: 'Analyze a resume and return ATS report'
    }
  })
}
