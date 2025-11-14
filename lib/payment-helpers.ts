import { PrismaClient, PaymentStatus, SubscriptionStatus } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Create or get Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(userId: string, email: string, name: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true }
  })

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId
  }

  // Customer will be created in Stripe during checkout
  // This is just a placeholder - actual creation happens in create-checkout-session
  return ''
}

/**
 * Save Stripe customer ID to user
 */
export async function saveStripeCustomerId(userId: string, stripeCustomerId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId }
  })
}

/**
 * Create a payment record
 */
export async function createPayment(data: {
  userId: string
  stripePaymentIntentId: string
  amount: number
  currency: string
  planType: string
  status: PaymentStatus
  description?: string
}) {
  return await prisma.payment.create({
    data: {
      userId: data.userId,
      stripePaymentIntentId: data.stripePaymentIntentId,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      planType: data.planType,
      description: data.description,
      paidAt: data.status === 'SUCCEEDED' ? new Date() : null
    }
  })
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
  stripePaymentIntentId: string,
  status: PaymentStatus
) {
  return await prisma.payment.update({
    where: { stripePaymentIntentId },
    data: {
      status,
      paidAt: status === 'SUCCEEDED' ? new Date() : undefined
    }
  })
}

/**
 * Create or update subscription
 */
export async function upsertSubscription(data: {
  userId: string
  stripeSubscriptionId: string
  stripePriceId: string
  stripeProductId?: string
  status: string
  planType: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  aiCreditsTotal?: number
}) {
  const existingSub = await prisma.subscription.findUnique({
    where: { userId: data.userId }
  })

  if (existingSub) {
    return await prisma.subscription.update({
      where: { userId: data.userId },
      data: {
        stripeSubscriptionId: data.stripeSubscriptionId,
        stripePriceId: data.stripePriceId,
        stripeProductId: data.stripeProductId,
        status: data.status,
        planType: data.planType,
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        aiCreditsRemaining: data.aiCreditsTotal || 0,
        aiCreditsTotal: data.aiCreditsTotal || 0
      }
    })
  }

  return await prisma.subscription.create({
    data: {
      userId: data.userId,
      stripeSubscriptionId: data.stripeSubscriptionId,
      stripePriceId: data.stripePriceId,
      stripeProductId: data.stripeProductId,
      status: data.status,
      planType: data.planType,
      currentPeriodStart: data.currentPeriodStart,
      currentPeriodEnd: data.currentPeriodEnd,
      aiCreditsRemaining: data.aiCreditsTotal || 0,
      aiCreditsTotal: data.aiCreditsTotal || 0
    }
  })
}

/**
 * Update user subscription status
 */
export async function updateUserSubscriptionStatus(
  userId: string,
  status: SubscriptionStatus
) {
  return await prisma.user.update({
    where: { id: userId },
    data: { subscriptionStatus: status }
  })
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId }
  })

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  await prisma.subscription.update({
    where: { userId },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
      cancelAtPeriodEnd: true
    }
  })

  await updateUserSubscriptionStatus(userId, 'CANCELLED')
}

/**
 * Get user's subscription with payment history
 */
export async function getUserSubscriptionDetails(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      payments: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  })
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { subscriptionStatus: true }
  })

  return user?.subscriptionStatus === 'PRO' || user?.subscriptionStatus === 'ONE_TIME'
}

/**
 * Get remaining AI credits for user
 */
export async function getRemainingCredits(userId: string): Promise<number> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    select: { aiCreditsRemaining: true, planType: true }
  })

  if (!subscription) return 0
  if (subscription.planType === 'pro') return -1 // Unlimited
  return subscription.aiCreditsRemaining
}

/**
 * Use AI credit
 */
export async function useAICredit(userId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId }
  })

  if (!subscription) return false
  if (subscription.planType === 'pro') return true // Unlimited

  if (subscription.aiCreditsRemaining <= 0) return false

  await prisma.subscription.update({
    where: { userId },
    data: {
      aiCreditsRemaining: { decrement: 1 }
    }
  })

  return true
}

/**
 * Track feature usage
 */
export async function trackUsage(
  userId: string,
  featureType: string,
  metadata?: Record<string, any>
) {
  return await prisma.usageRecord.create({
    data: {
      userId,
      featureType,
      metadata: metadata ? JSON.stringify(metadata) : null
    }
  })
}

/**
 * Get user usage statistics
 */
export async function getUserUsageStats(userId: string, featureType?: string) {
  const where = featureType
    ? { userId, featureType }
    : { userId }

  const records = await prisma.usageRecord.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  return {
    total: records.length,
    byFeature: records.reduce((acc, record) => {
      acc[record.featureType] = (acc[record.featureType] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }
}
