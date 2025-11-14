import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SubscriptionService } from '@/lib/services/subscription.service'
import { resumeJsonToUniversal, universalToPlainTextCV, type AIResumeJSON } from '@/lib/ai/adapter'
import { verifyAuth } from '@/lib/auth-helper'

// Import AIservice functions
import { sanitizeResumeForSchema } from '@/AIservice/lib/sanitize'
import { ResumeJSON } from '@/AIservice/lib/schema'
import { callWithFallbackChat } from '@/AIservice/Integration/orchestrator'
import { getConfiguredModel } from '@/AIservice/config/models'

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/polish
 * Polish/improve CV without job description (general improvement)
 * 
 * Body: {
 *   cvId: string
 *   cvData: UniversalResumeData (temporary until CV storage)
 *   mode?: 'concise' | 'impactful' | 'professional' (default: 'professional')
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
          message: 'AI polish requires a paid plan. Upgrade to One-Time or Pro.',
          requiredPlan: 'ONE_TIME'
        },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { cvId, cvData, mode = 'professional' } = body

    if (!cvId || !cvData) {
      return NextResponse.json(
        { error: 'CV ID and CV data are required' },
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

    // Step 1: Convert CV to plain text
    const cvText = universalToPlainTextCV(cvData)

    // Step 2: Build polish prompt based on mode
    const modeInstructions = {
      concise: 'Make the CV more concise. Remove redundant information, combine similar points, use fewer words while maintaining impact. Target 3-4 bullets per experience.',
      impactful: 'Maximize impact. Start bullets with strong action verbs, add quantifiable results where metrics exist (never invent), emphasize achievements over responsibilities.',
      professional: 'Improve professional tone and clarity. Fix grammar, improve phrasing, ensure consistency, use industry-standard terminology, maintain factual accuracy.',
    }

    const instruction = modeInstructions[mode as keyof typeof modeInstructions] || modeInstructions.professional

    const systemPrompt = `You are an expert CV editor. Your task is to polish and improve a CV.

STRICT RULES:
- NEVER invent facts, dates, companies, or achievements
- ONLY improve phrasing, grammar, and presentation
- Preserve all factual information exactly
- Keep the same language as the original CV
- ${instruction}

Return ONLY valid JSON conforming to ResumeJSON schema with the polished content.`

    const userMessage = JSON.stringify({
      cv_text: cvText,
      instruction: `Polish this CV with focus on: ${mode}`
    })

    // Step 3: Call AI
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

    let polishedJson: any

    try {
      const response = await callWithFallbackChat({
        client,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.1, // Low temperature for consistency
        validate: (text: string) => {
          try {
            JSON.parse(text)
            return true
          } catch {
            return false
          }
        },
      })

      polishedJson = JSON.parse(response.text)
    } catch (error: any) {
      console.error('AI polish failed:', error)
      return NextResponse.json(
        { 
          error: 'AI polish failed',
          details: error.message || 'Could not polish CV'
        },
        { status: 500 }
      )
    }

    // Step 4: Sanitize and validate
    const sanitized = sanitizeResumeForSchema(polishedJson, { 
      cvText, 
      jdText: '' 
    })

    const validationResult = ResumeJSON.safeParse(sanitized)
    
    if (!validationResult.success) {
      console.error('Schema validation failed:', validationResult.error.issues)
      return NextResponse.json(
        { 
          error: 'Failed to polish CV',
          details: 'The AI output did not match the expected format.',
          issues: validationResult.error.issues.slice(0, 3)
        },
        { status: 422 }
      )
    }

    // Step 5: Convert to UniversalResumeData
    const aiResumeJson: AIResumeJSON = validationResult.data as any
    const universalData = resumeJsonToUniversal(aiResumeJson)

    return NextResponse.json({
      success: true,
      cv: {
        id: cvId,
        data: universalData,
      },
      metadata: {
        language: aiResumeJson.metadata?.language || 'unknown',
        warnings: aiResumeJson.metadata?.warnings || [],
        creditsRemaining: user?.subscription?.aiCreditsRemaining || null,
        mode,
        polished: true,
      },
    })

  } catch (error: any) {
    console.error('Error polishing CV:', error)
    return NextResponse.json(
      { 
        error: 'Failed to polish CV',
        details: error.message || 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}
