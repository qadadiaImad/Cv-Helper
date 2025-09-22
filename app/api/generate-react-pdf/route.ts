import { NextRequest, NextResponse } from "next/server"
import type { ResumeData, TemplateId } from "@/lib/react-templates"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, templateId = 'classic_minimal' }: { data: ResumeData; templateId?: TemplateId } = body

    console.log('[v0] Received PDF generation request for template:', templateId)
    console.log('[v0] Resume data:', JSON.stringify(data, null, 2))

    // Simply return the data - all rendering will be done client-side
    return NextResponse.json({
      success: true,
      data,
      templateId,
      message: 'Data processed successfully'
    })
  } catch (error) {
    console.error('[v0] API request failed:', error)
    return NextResponse.json(
      {
        error: 'Request processing failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}