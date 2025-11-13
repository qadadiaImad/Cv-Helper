import { NextRequest, NextResponse } from 'next/server'
import { getSessionUserFromHeader } from '@/lib/auth/session'
import { prisma } from '@/lib/db/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

/**
 * Upgrade subscription with proration
 * POST /api/subscription/upgrade
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

    // Fetch full user data with subscription
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
    if (!user.subscription || !user.subscription.stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found. Please create a subscription first.' },
        { status: 400 }
      )
    }

    // Get the new price ID
    const priceIds: Record<string, string> = {
      'basic': process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC || '',
      'pro': process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || ''
    }

    const newPriceId = priceIds[targetPlan]

    if (!newPriceId) {
      return NextResponse.json(
        { error: 'Price ID not configured' },
        { status: 500 }
      )
    }

    console.log('🔄 Upgrading subscription:', {
      userId: user.id,
      currentPlan: user.subscriptionStatus,
      targetPlan,
      subscriptionId: user.subscription.stripeSubscriptionId
    })

    // Get the current subscription from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      user.subscription.stripeSubscriptionId
    )

    // Get the subscription item ID (first item)
    const subscriptionItemId = stripeSubscription.items.data[0]?.id

    if (!subscriptionItemId) {
      return NextResponse.json(
        { error: 'Subscription item not found' },
        { status: 500 }
      )
    }

    // Update the subscription with proration
    const updatedSubscription = await stripe.subscriptions.update(
      user.subscription.stripeSubscriptionId,
      {
        items: [{
          id: subscriptionItemId,
          price: newPriceId,
        }],
        proration_behavior: 'create_prorations', // Enable automatic proration
        billing_cycle_anchor: 'unchanged', // Keep the same billing date
      }
    )

    console.log('✅ Subscription upgraded:', updatedSubscription.id)

    // Update user's subscription status in database
    const newStatus = targetPlan === 'pro' ? 'PRO' : 'BASIC'
    
    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: newStatus }
    })

    await prisma.subscription.update({
      where: { id: user.subscription.id },
      data: {
        stripePriceId: newPriceId,
        planType: targetPlan,
        status: updatedSubscription.status,
        currentPeriodEnd: new Date((updatedSubscription as any).current_period_end * 1000)
      }
    })

    // Calculate approximate proration (for display purposes)
    const prices: Record<string, number> = {
      'basic': 8.99,
      'pro': 15.99
    }
    const currentPrice = user.subscriptionStatus === 'BASIC' ? prices.basic : prices.pro
    const targetPrice = prices[targetPlan]
    const daysInMonth = 30
    const dailyDifference = (targetPrice - currentPrice) / daysInMonth
    
    // Estimate days remaining (rough calculation)
    const now = new Date()
    const periodEnd = new Date((updatedSubscription as any).current_period_end * 1000)
    const daysRemaining = Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const estimatedProration = Math.max(0, dailyDifference * daysRemaining)

    return NextResponse.json({
      success: true,
      message: 'Subscription upgraded successfully',
      newPlan: newStatus,
      proratedAmount: estimatedProration,
      nextBillingDate: periodEnd.toISOString(),
      nextBillingAmount: targetPrice
    })
  } catch (error: any) {
    console.error('Upgrade error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
