import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyAuth } from "@/lib/auth"
import { SubscriptionService } from "@/lib/services/subscription.service"
import { aiArbitrateWithService } from "@/lib/services/ai.service"

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * POST /api/ai/polish
 * 
 * AI-powered resume polish: adapts a CV to match a job description using
 * AIservice-infcv arbitration. Access is gated by subscription plan:
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
        { error: "Unauthorized. Please log in to use AI features." },
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

      // Provide helpful error based on plan
      if (user?.subscriptionStatus === "FREE") {
        return NextResponse.json(
          {
            error: "AI Polish requires a paid plan",
            message: "Upgrade to Quick Boost or Pro to use AI-powered resume optimization.",
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
    const { clean_cv, jd_text } = body

    if (!clean_cv || !jd_text) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          message: "Both clean_cv (structured CV JSON) and jd_text (job description) are required.",
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

    // 5. Call AIservice arbitration (factorized, no logic duplication)
    const result = await aiArbitrateWithService({
      clean_cv,
      jd_text,
      timeoutMs: 45000,
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
    return NextResponse.json({
      success: true,
      result: result.result,
      report: result.report,
      judge: result.judge,
      cost: result.cost,
      creditsRemaining,
    })
  } catch (error: any) {
    console.error("[AI Polish] Error:", error)

    // Handle AIservice-specific errors
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
        error: "AI polish failed",
        message: error.message || "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ai/polish
 * Returns API info and user's current AI credit status
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request)
    if (!authResult.user) {
      return NextResponse.json({
        message: "AI Polish API",
        description: "AI-powered resume optimization using job description matching",
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
      message: "AI Polish API",
      description: "AI-powered resume optimization using job description matching",
      hasAccess,
      creditsRemaining,
      unlimited: creditsRemaining === -1,
      endpoints: {
        POST: "Polish a resume with AI (requires clean_cv and jd_text)",
      },
    })
  } catch (error: any) {
    console.error("[AI Polish GET] Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch AI polish status" },
      { status: 500 }
    )
  }
}
