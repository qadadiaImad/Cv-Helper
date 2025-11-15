import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GET /api/subscription/limits
 * 
 * Returns the current user's subscription limits and feature access
 */
export async function GET(request: NextRequest) {
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

    // Get user with subscription
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Determine limits based on subscription
    const subscription = user.subscription
    const planType = subscription?.planType || 'free'

    // Define limits for each plan
    const limits = {
      free: {
        maxResumes: 1,
        hasAIAccess: false,
        hasUnlimitedAI: false,
        aiCreditsRemaining: 0,
        hasPremiumTemplates: false,
        hasAICoverLetter: false,
        hasATSScore: false,
        planType: 'free' as const,
        planName: 'Free',
      },
      one_time: {
        maxResumes: 1,
        hasAIAccess: true,
        hasUnlimitedAI: false,
        aiCreditsRemaining: subscription?.aiCreditsRemaining || 0,
        hasPremiumTemplates: true,
        hasAICoverLetter: false,
        hasATSScore: false,
        planType: 'one_time' as const,
        planName: 'Quick Boost',
      },
      basic: {
        maxResumes: 5,
        hasAIAccess: true,
        hasUnlimitedAI: true,
        aiCreditsRemaining: -1, // unlimited
        hasPremiumTemplates: true,
        hasAICoverLetter: true,
        hasATSScore: true,
        planType: 'basic' as const,
        planName: 'Basic Monthly',
      },
      pro: {
        maxResumes: -1, // unlimited
        hasAIAccess: true,
        hasUnlimitedAI: true,
        aiCreditsRemaining: -1, // unlimited
        hasPremiumTemplates: true,
        hasAICoverLetter: true,
        hasATSScore: true,
        planType: 'pro' as const,
        planName: 'Pro Unlimited',
      },
    }

    const userLimits = limits[planType as keyof typeof limits] || limits.free

    return NextResponse.json(userLimits)
  } catch (error) {
    console.error('[Subscription Limits] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
