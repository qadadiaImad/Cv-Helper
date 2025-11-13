import { NextRequest, NextResponse } from 'next/server'
import { getSessionUserFromHeader } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import { SubscriptionStatus } from '@prisma/client'
import { calculateProration, getDaysRemaining } from '@/lib/subscription-rules'

/**
 * Calculate proration for subscription upgrade
 * POST /api/subscription/calculate-proration
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieHeader = request.headers.get('cookie')
    const sessionUser = await getSessionUserFromHeader(cookieHeader)
    
    if (!sessionUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch full user data with subscription from database
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: { subscription: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const { targetPlan } = await request.json()

    if (!targetPlan || !['basic', 'pro'].includes(targetPlan)) {
      return NextResponse.json(
        { error: 'Invalid target plan' },
        { status: 400 }
      )
    }

    // Check if user has an active subscription
    if (!user.subscription || !user.subscription.currentPeriodEnd) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      )
    }

    // Get current and target prices
    const prices: Record<string, number> = {
      'basic': 8.99,
      'pro': 15.99
    }

    const currentPrice = user.subscriptionStatus === 'BASIC' ? prices.basic : prices.pro
    const targetPrice = prices[targetPlan]

    // Calculate days remaining
    const daysRemaining = getDaysRemaining(user.subscription.currentPeriodEnd)

    // Calculate proration
    const proration = calculateProration(currentPrice, targetPrice, daysRemaining)

    return NextResponse.json({
      success: true,
      currentPlan: user.subscriptionStatus,
      targetPlan: targetPlan.toUpperCase(),
      currentPrice,
      targetPrice,
      daysRemaining,
      proratedAmount: proration.proratedAmount,
      dailyDifference: proration.dailyDifference,
      nextBillingAmount: proration.nextBillingAmount,
      nextBillingDate: user.subscription.currentPeriodEnd.toISOString(),
      breakdown: {
        message: `You'll pay €${proration.proratedAmount.toFixed(2)} today for the remaining ${daysRemaining} days, then €${targetPrice}/month.`,
        calculation: `(€${targetPrice} - €${currentPrice}) / 30 days × ${daysRemaining} days = €${proration.proratedAmount.toFixed(2)}`
      }
    })
  } catch (error: any) {
    console.error('Proration calculation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
