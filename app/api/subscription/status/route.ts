import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { SubscriptionService } from '@/lib/services/subscription.service'
import { verifyAuth } from '@/lib/auth'

const prisma = new PrismaClient()
const subscriptionService = new SubscriptionService(prisma)

/**
 * GET /api/subscription/status
 * Get current user's subscription status and available upgrades
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

    // Get subscription details
    const subscriptionData = await subscriptionService.getUserSubscription(userId)

    return NextResponse.json({
      success: true,
      data: {
        currentPlan: subscriptionData.status,
        subscription: subscriptionData.subscription,
        canUpgrade: subscriptionData.canUpgrade,
        availableUpgrades: subscriptionData.availableUpgrades,
        aiCreditsRemaining: subscriptionData.subscription?.aiCreditsRemaining || null,
      },
    })
  } catch (error: any) {
    console.error('Error fetching subscription status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscription status' },
      { status: 500 }
    )
  }
}
