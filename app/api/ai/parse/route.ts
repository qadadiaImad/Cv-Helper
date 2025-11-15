import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyAuth } from "@/lib/auth"
import { SubscriptionService } from "@/lib/services/subscription.service"
import { aiParseCvWithService } from "@/lib/services/ai.service"

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/parse
 * 
 * AI-powered CV parsing: converts raw CV text or images to structured JSON
 * using AIservice-infcv. Access is gated by subscription plan:
 * - FREE: blocked
 * - ONE_TIME (Quick Boost): allowed while credits > 0
 * - BASIC/PRO: unlimited access
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to use AI parsing." },
        { status: 401 }
      )
    }

    const userId = authResult.user.id

    // 2. Check feature access (subscription + credits)
    const hasAccess = await subscriptionService.hasFeatureAccess(userId, "ai_polish")
    if (!hasAccess) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      })

      if (user?.subscriptionStatus === "FREE") {
        return NextResponse.json(
          {
            error: "AI parsing requires a paid plan",
            message: "Upgrade to Quick Boost or Pro to use AI-powered CV parsing.",
            upgradeUrl: "/pricing",
          },
          { status: 403 }
        )
      } else if (user?.subscriptionStatus === "ONE_TIME") {
        return NextResponse.json(
          {
            error: "No AI credits remaining",
            message: "You've used all 3 AI Polish credits. Upgrade to Basic or Pro for unlimited AI.",
            creditsRemaining: user.subscription?.aiCreditsRemaining || 0,
            upgradeUrl: "/pricing",
          },
          { status: 403 }
        )
      }

      return NextResponse.json(
        { error: "Feature access denied" },
        { status: 403 }
      )
    }

    // 3. Parse request body
    const body = await request.json()
    const { cv_text, images } = body

    if (!cv_text && (!images || images.length === 0)) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Either cv_text (string) or images (array of base64 data URLs) is required.",
        },
        { status: 400 }
      )
    }

    // 4. Consume AI credit if ONE_TIME plan
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionStatus: true },
    })

    if (user?.subscriptionStatus === "ONE_TIME") {
      const creditUsed = await subscriptionService.useAICredit(userId)
      if (!creditUsed) {
        return NextResponse.json(
          {
            error: "Failed to consume AI credit",
            message: "Unable to process your request. Please contact support.",
          },
          { status: 500 }
        )
      }
    }

    // 5. Call AIservice parse (factorized, no logic duplication)
    const result = await aiParseCvWithService({
      cv_text,
      images,
      timeoutMs: 30000,
    })

    // 6. Get updated credits for response
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { aiCreditsRemaining: true, planType: true },
    })

    const creditsRemaining = subscription?.planType === "pro" || subscription?.planType === "basic"
      ? -1 // unlimited
      : subscription?.aiCreditsRemaining || 0

    // 7. Return AIservice response + credit info
    console.log('[AI Parse] Returning clean_cv:', JSON.stringify(result.clean).substring(0, 200))
    console.log('[AI Parse] clean_cv keys:', Object.keys(result.clean || {}))
    console.log('[AI Parse] First experience:', JSON.stringify(result.clean?.experience?.[0], null, 2))
    return NextResponse.json({
      success: true,
      clean_cv: result.clean,
      usage: result.usage,
      creditsRemaining,
    })
  } catch (error: any) {
    console.error("[AI Parse] Error:", error)

    if (error.message?.includes("HTTP")) {
      return NextResponse.json(
        {
          error: "AI service unavailable",
          message: "The AI service is temporarily unavailable. Please try again later.",
          details: error.message,
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      {
        error: "AI parsing failed",
        message: error.message || "An unexpected error occurred while parsing your CV.",
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ai/parse
 * Returns API info and user's current AI credit status
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.user) {
      return NextResponse.json({
        message: "AI Parse API",
        description: "AI-powered CV parsing from text or images to structured JSON",
        authRequired: true,
      })
    }

    const userId = authResult.user.id
    const hasAccess = await subscriptionService.hasFeatureAccess(userId, "ai_polish")

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { aiCreditsRemaining: true, planType: true },
    })

    const creditsRemaining = subscription?.planType === "pro" || subscription?.planType === "basic"
      ? -1 // unlimited
      : subscription?.aiCreditsRemaining || 0

    return NextResponse.json({
      message: "AI Parse API",
      description: "AI-powered CV parsing from text or images to structured JSON",
      hasAccess,
      creditsRemaining,
      unlimited: creditsRemaining === -1,
      endpoints: {
        POST: "Parse a CV with AI (requires cv_text or images[])",
      },
    })
  } catch (error: any) {
    console.error("[AI Parse GET] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch AI parse status" },
      { status: 500 }
    )
  }
}
