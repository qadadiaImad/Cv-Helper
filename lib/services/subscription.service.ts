import { PrismaClient, SubscriptionStatus } from '@prisma/client'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export class SubscriptionService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get user's current subscription with plan details
   */
  async getUserSubscription(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user,
      subscription: user.subscription,
      status: user.subscriptionStatus,
      canUpgrade: this.canUpgrade(user.subscriptionStatus),
      availableUpgrades: this.getAvailableUpgrades(user.subscriptionStatus),
    }
  }

  /**
   * Check if user can upgrade from current plan
   */
  canUpgrade(currentStatus: SubscriptionStatus): boolean {
    return currentStatus === SubscriptionStatus.FREE || 
           currentStatus === SubscriptionStatus.ONE_TIME
  }

  /**
   * Get available upgrade options for user
   */
  getAvailableUpgrades(currentStatus: SubscriptionStatus): string[] {
    switch (currentStatus) {
      case SubscriptionStatus.FREE:
        return ['one-time', 'pro']
      case SubscriptionStatus.ONE_TIME:
        return ['pro']
      case SubscriptionStatus.PRO:
        return []
      default:
        return ['one-time', 'pro']
    }
  }

  /**
   * Create or update subscription after Stripe checkout
   */
  async createSubscription(
    userId: string,
    stripeSubscriptionId: string,
    stripePriceId: string,
    planType: 'one-time' | 'pro'
  ) {
    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)

    const subscription = await this.prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        stripeSubscriptionId,
        stripePriceId,
        stripeProductId: stripeSubscription.items.data[0]?.price.product as string,
        status: stripeSubscription.status,
        planType,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        aiCreditsRemaining: planType === 'one-time' ? 3 : 0,
        aiCreditsTotal: planType === 'one-time' ? 3 : 0,
      },
      update: {
        stripeSubscriptionId,
        stripePriceId,
        status: stripeSubscription.status,
        planType,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      },
    })

    // Update user subscription status
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: planType === 'one-time' 
          ? SubscriptionStatus.ONE_TIME 
          : SubscriptionStatus.PRO,
      },
    })

    return subscription
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(userId: string, cancelImmediately = false) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    })

    if (!subscription) {
      throw new Error('No active subscription found')
    }

    // Cancel in Stripe
    if (cancelImmediately) {
      await stripe.subscriptions.cancel(subscription.stripeSubscriptionId)
    } else {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      })
    }

    // Update in database
    await this.prisma.subscription.update({
      where: { userId },
      data: {
        cancelAtPeriodEnd: !cancelImmediately,
        canceledAt: cancelImmediately ? new Date() : null,
        status: cancelImmediately ? 'canceled' : subscription.status,
      },
    })

    if (cancelImmediately) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { subscriptionStatus: SubscriptionStatus.CANCELLED },
      })
    }

    return { success: true }
  }

  /**
   * Use AI credit (for one-time plan)
   */
  async useAICredit(userId: string): Promise<boolean> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    })

    if (!subscription || subscription.planType !== 'one-time') {
      throw new Error('No one-time subscription found')
    }

    if (subscription.aiCreditsRemaining <= 0) {
      return false
    }

    await this.prisma.subscription.update({
      where: { userId },
      data: {
        aiCreditsRemaining: subscription.aiCreditsRemaining - 1,
      },
    })

    // Track usage
    await this.prisma.usageRecord.create({
      data: {
        userId,
        featureType: 'ai_polish',
        metadata: JSON.stringify({ creditsRemaining: subscription.aiCreditsRemaining - 1 }),
      },
    })

    return true
  }

  /**
   * Check if user has access to a feature
   */
  async hasFeatureAccess(userId: string, feature: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (!user) return false

    const status = user.subscriptionStatus

    // Feature access matrix
    const featureAccess: Record<string, SubscriptionStatus[]> = {
      'ai_polish': [SubscriptionStatus.ONE_TIME, SubscriptionStatus.PRO],
      'unlimited_resumes': [SubscriptionStatus.PRO],
      'all_templates': [SubscriptionStatus.ONE_TIME, SubscriptionStatus.PRO],
      'ai_cover_letter': [SubscriptionStatus.PRO],
      'ats_score': [SubscriptionStatus.PRO],
    }

    const allowedStatuses = featureAccess[feature] || []
    
    // For one-time, check credits for AI features
    if (status === SubscriptionStatus.ONE_TIME && feature === 'ai_polish') {
      return (user.subscription?.aiCreditsRemaining || 0) > 0
    }

    return allowedStatuses.includes(status)
  }
}
