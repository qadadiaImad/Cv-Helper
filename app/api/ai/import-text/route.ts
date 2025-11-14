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
  ResumeJSON
} from '@/AIservice'

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/import-text
 * Import CV from plain text and structure it with AI
 * 
 * Body: {
 *   cvText: string
 *   jobDescription?: string (optional, for adaptation)
 *   templateId?: string (default: 'classic')
 *   cvName?: string (default: 'Imported CV')
 * }
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

    // Parse request body
    const body = await request.json()
    const { cvText, jobDescription, templateId = 'classic', cvName = 'Imported CV' } = body

    if (!cvText || typeof cvText !== 'string' || cvText.trim().length === 0) {
      return NextResponse.json(
        { error: 'CV text is required' },
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

    // Step 1: Structure CV text with AI
    let structuredCV: any
    
    try {
      // Try AI structuring first (if OpenRouter key is configured)
      if (process.env.OPENROUTER_KEY_PDF_TO_JSON) {
        const aiResult = await structureCvTextWithAI(cvText)
        structuredCV = aiResult.structured
      } else {
        // Fallback to deterministic parsing
        structuredCV = toCleanResume(cvText)
      }
    } catch (error) {
      console.error('AI structuring failed, using fallback:', error)
      structuredCV = toCleanResume(cvText)
    }

    // Step 2: Sanitize and validate against ResumeJSON schema
    const sanitized = sanitizeResumeForSchema(structuredCV, { 
      cvText, 
      jdText: jobDescription || '' 
    })

    const validationResult = ResumeJSON.safeParse(sanitized)
    
    if (!validationResult.success) {
      console.error('Schema validation failed:', validationResult.error.issues)
      return NextResponse.json(
        { 
          error: 'Failed to structure CV',
          details: 'The AI could not properly structure your CV. Please try again or contact support.',
          issues: validationResult.error.issues.slice(0, 3) // Show first 3 issues only
        },
        { status: 422 }
      )
    }

    // Step 3: Convert to UniversalResumeData
    const aiResumeJson: AIResumeJSON = validationResult.data as any
    const universalData = resumeJsonToUniversal(aiResumeJson)

    // Step 4: Create CV document
    const cvDocument = createCVDocument(cvName, templateId as any)
    cvDocument.data = universalData

    // Step 5: Save to database (optional - for now just return it)
    // TODO: Add CV storage to database when ready

    return NextResponse.json({
      success: true,
      cv: cvDocument,
      metadata: {
        language: aiResumeJson.metadata?.language || 'unknown',
        warnings: aiResumeJson.metadata?.warnings || [],
        creditsRemaining: user?.subscription?.aiCreditsRemaining || null,
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
