import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SubscriptionService } from '@/lib/services/subscription.service'
import { resumeJsonToUniversal, universalToPlainTextCV, type AIResumeJSON } from '@/lib/ai/adapter'
import { createCVDocument } from '@/lib/schemas/cv-document'
import { verifyAuth } from '@/lib/auth-helper'

// Import AIservice adapt logic
import { sanitizeResumeForSchema } from '@/AIservice/lib/sanitize'
import { ResumeJSON } from '@/AIservice/lib/schema'
import { SYSTEM_PROMPT } from '@/AIservice/lib/prompt'
import { callWithFallbackChat } from '@/AIservice/Integration/orchestrator'
import { getConfiguredModel } from '@/AIservice/config/models'

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/adapt
 * Adapt existing CV to a job description
 * 
 * Body: {
 *   cvId: string
 *   jobDescription: string
 *   createNew?: boolean (default: true - creates adapted copy)
 *   cvName?: string (for new CV, default: "CV - Adapted to Job")
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
          message: 'AI job adaptation requires a paid plan. Upgrade to One-Time or Pro.',
          requiredPlan: 'ONE_TIME'
        },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { cvId, jobDescription, createNew = true, cvName = 'CV - Adapted to Job' } = body

    if (!cvId || !jobDescription) {
      return NextResponse.json(
        { error: 'CV ID and job description are required' },
        { status: 400 }
      )
    }

    if (typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description cannot be empty' },
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

    // TODO: Load CV from database/store
    // For now, we'll expect the CV data to be passed in the request
    // In production, you'd load from your CV store:
    // const cvDocument = await loadCVDocument(cvId, userId)
    
    // Temporary: accept CV data in request for testing
    const cvData = body.cvData
    if (!cvData) {
      return NextResponse.json(
        { 
          error: 'CV data not found',
          message: 'Please provide cvData in request body (temporary until CV storage is implemented)'
        },
        { status: 400 }
      )
    }

    // Step 1: Convert CV to plain text
    const cvText = universalToPlainTextCV(cvData)

    // Step 2: Call AIservice adaptation
    const OpenAI = (await import('openai')).default
    const apiKey = process.env.OPENROUTER_KEY_ARBITRAGE || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    const model = getConfiguredModel('arbitrage') || 'gpt-4o-mini'
    const client = new OpenAI({
      apiKey,
      baseURL: process.env.OPENROUTER_KEY_ARBITRAGE 
        ? 'https://openrouter.ai/api/v1' 
        : undefined,
      defaultHeaders: process.env.OPENROUTER_KEY_ARBITRAGE ? {
        'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_APP_TITLE || 'CV-Helper',
      } : undefined,
    })

    // Build prompt for adaptation
    const userMessage = JSON.stringify({
      cv_text: cvText,
      jd_text: jobDescription.trim()
    })

    const systemPrompt = `${SYSTEM_PROMPT}

ADAPTATION RULES:
- Tailor the CV to match the job description
- Highlight relevant experience and skills
- Use keywords from the job description naturally
- Preserve all factual information (don't invent)
- Reorder bullets to emphasize relevant achievements
- Keep the same language as the original CV
- Maximum 6 experiences, 5 bullets each

Return ONLY valid JSON conforming to ResumeJSON schema.`

    let adaptedJson: any

    try {
      const response = await callWithFallbackChat({
        client,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.0,
        validate: (text: string) => {
          try {
            JSON.parse(text)
            return true
          } catch {
            return false
          }
        },
      })

      adaptedJson = JSON.parse(response.text)
    } catch (error: any) {
      console.error('AI adaptation failed:', error)
      return NextResponse.json(
        { 
          error: 'AI adaptation failed',
          details: error.message || 'Could not adapt CV to job description'
        },
        { status: 500 }
      )
    }

    // Step 3: Sanitize and validate
    const sanitized = sanitizeResumeForSchema(adaptedJson, { 
      cvText, 
      jdText: jobDescription 
    })

    const validationResult = ResumeJSON.safeParse(sanitized)
    
    if (!validationResult.success) {
      console.error('Schema validation failed:', validationResult.error.issues)
      return NextResponse.json(
        { 
          error: 'Failed to adapt CV',
          details: 'The AI output did not match the expected format.',
          issues: validationResult.error.issues.slice(0, 3)
        },
        { status: 422 }
      )
    }

    // Step 4: Convert to UniversalResumeData
    const aiResumeJson: AIResumeJSON = validationResult.data as any
    const universalData = resumeJsonToUniversal(aiResumeJson)

    // Step 5: Create new CV or update existing
    let resultCV
    if (createNew) {
      resultCV = createCVDocument(cvName, body.templateId || 'classic')
      resultCV.data = universalData
    } else {
      // Update existing CV
      resultCV = { id: cvId, data: universalData }
    }

    return NextResponse.json({
      success: true,
      cv: resultCV,
      metadata: {
        language: aiResumeJson.metadata?.language || 'unknown',
        warnings: aiResumeJson.metadata?.warnings || [],
        creditsRemaining: user?.subscription?.aiCreditsRemaining || null,
        adapted: true,
      },
    })

  } catch (error: any) {
    console.error('Error adapting CV:', error)
    return NextResponse.json(
      { 
        error: 'Failed to adapt CV',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}
