import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SubscriptionService } from '@/lib/services/subscription.service'
import { resumeJsonToUniversal, type AIResumeJSON } from '@/lib/ai/adapter'
import { createCVDocument } from '@/lib/schemas/cv-document'
import { verifyAuth } from '@/lib/auth-helper'

// Import ALL AI functionality from AIservice unified export
import { 
  toCleanResume,
  structureCvTextWithAI,
  sanitizeResumeForSchema,
  ResumeJSON,
  parseDocument
} from '@/AIservice'

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/import
 * Import CV from PDF/DOCX file and structure it with AI
 * 
 * FormData:
 *   file: File (PDF/DOCX/TXT)
 *   templateId?: string (default: 'classic')
 *   cvName?: string (default: filename)
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = authResult.user.id

    // Check feature access
    const hasAccess = await subscriptionService.hasFeatureAccess(userId, 'ai_polish')
    if (!hasAccess) {
      return NextResponse.json(
        { 
          error: 'Upgrade required',
          message: 'AI CV import requires a paid plan. Upgrade to One-Time or Pro.',
          requiredPlan: 'ONE_TIME'
        },
        { status: 403 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const templateId = (formData.get('templateId') as string) || 'classic'
    const cvName = (formData.get('cvName') as string) || file?.name?.replace(/\.[^/.]+$/, '') || 'Imported CV'

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Use AI credit for one-time plan users
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (user?.subscriptionStatus === 'ONE_TIME') {
      const creditUsed = await subscriptionService.useAICredit(userId)
      if (!creditUsed) {
        return NextResponse.json(
          { 
            error: 'No AI credits remaining',
            message: 'You have used all your AI credits. Upgrade to Pro for unlimited access.',
            creditsRemaining: 0
          },
          { status: 403 }
        )
      }
    }

    // Step 1: Extract text from file using AIservice
    let cvText: string
    
    try {
      console.log('[AI Import] Using AIservice parseDocument')
      const parsed = await parseDocument(file)
      cvText = parsed.text

      if (!cvText || cvText.trim().length === 0) {
        return NextResponse.json(
          { 
            error: 'No text found in file',
            message: 'The uploaded file appears to be empty or could not be processed.'
          },
          { status: 400 }
        )
      }
    } catch (error: any) {
      console.error('File parsing error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to parse file',
          message: error.message || 'Could not extract text from the uploaded file.'
        },
        { status: 400 }
      )
    }

    // Step 2: Structure CV text with AI
    let structuredCV: any
    
    try {
      if (process.env.OPENROUTER_KEY_PDF_TO_JSON) {
        const aiResult = await structureCvTextWithAI(cvText)
        structuredCV = aiResult.structured
      } else {
        structuredCV = toCleanResume(cvText)
      }
    } catch (error) {
      console.error('AI structuring failed, using fallback:', error)
      structuredCV = toCleanResume(cvText)
    }

    // Step 3: Sanitize and validate
    const sanitized = sanitizeResumeForSchema(structuredCV, { 
      cvText, 
      jdText: '' 
    })

    const validationResult = ResumeJSON.safeParse(sanitized)
    
    if (!validationResult.success) {
      console.error('Schema validation failed:', validationResult.error.issues)
      return NextResponse.json(
        { 
          error: 'Failed to structure CV',
          details: 'The AI could not properly structure your CV. Please try again or contact support.',
          issues: validationResult.error.issues.slice(0, 3)
        },
        { status: 422 }
      )
    }

    // Step 4: Convert to UniversalResumeData
    const aiResumeJson: AIResumeJSON = validationResult.data as any
    const universalData = resumeJsonToUniversal(aiResumeJson)

    // Step 5: Create CV document
    const cvDocument = createCVDocument(cvName, templateId as any)
    cvDocument.data = universalData

    return NextResponse.json({
      success: true,
      cv: cvDocument,
      metadata: {
        language: aiResumeJson.metadata?.language || 'unknown',
        warnings: aiResumeJson.metadata?.warnings || [],
        creditsRemaining: user?.subscription?.aiCreditsRemaining || null,
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      },
    })

  } catch (error: any) {
    console.error('Error importing CV:', error)
    return NextResponse.json(
      { 
        error: 'Failed to import CV',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}
