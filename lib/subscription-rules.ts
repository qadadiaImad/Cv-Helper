/**
 * Subscription Rules & Business Logic
 * Handles all subscription state transitions, constraints, and validations
 */

export type SubscriptionStatus = 'FREE' | 'ONE_TIME' | 'BASIC' | 'PRO'
export type PlanId = 'free' | 'one-time' | 'basic' | 'pro'

export interface SubscriptionDetails {
  status: SubscriptionStatus
  stripeSubscriptionId?: string
  stripeCustomerId?: string
  currentPeriodEnd?: Date
  cancelAtPeriodEnd?: boolean
  oneTimePurchaseDate?: Date
  oneTimeExpiryDate?: Date
}

export interface PlanAction {
  allowed: boolean
  reason?: string
  actionType: 'purchase' | 'upgrade' | 'downgrade' | 'current' | 'included' | 'blocked'
  requiresProration?: boolean
  buttonText: string
  buttonVariant: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'
  disabled: boolean
  tooltip?: string
}

/**
 * Check if user can purchase a specific plan
 */
export function canPurchasePlan(
  currentStatus: SubscriptionStatus,
  targetPlan: PlanId
): boolean {
  // FREE user can buy anything
  if (currentStatus === 'FREE') return true
  
  // ONE_TIME user cannot buy ONE_TIME again
  if (currentStatus === 'ONE_TIME' && targetPlan === 'one-time') return false
  
  // ONE_TIME user can subscribe to BASIC or PRO
  if (currentStatus === 'ONE_TIME' && (targetPlan === 'basic' || targetPlan === 'pro')) {
    return true
  }
  
  // BASIC user cannot buy ONE_TIME or BASIC again
  if (currentStatus === 'BASIC' && (targetPlan === 'one-time' || targetPlan === 'basic')) {
    return false
  }
  
  // BASIC user can upgrade to PRO
  if (currentStatus === 'BASIC' && targetPlan === 'pro') return true
  
  // PRO user cannot buy anything (already at top tier)
  if (currentStatus === 'PRO') return false
  
  return false
}

/**
 * Check if action is an upgrade
 */
export function isUpgrade(
  currentStatus: SubscriptionStatus,
  targetPlan: PlanId
): boolean {
  const hierarchy: Record<SubscriptionStatus, number> = {
    'FREE': 0,
    'ONE_TIME': 1,
    'BASIC': 2,
    'PRO': 3
  }
  
  const targetHierarchy: Record<PlanId, number> = {
    'free': 0,
    'one-time': 1,
    'basic': 2,
    'pro': 3
  }
  
  return targetHierarchy[targetPlan] > hierarchy[currentStatus]
}

/**
 * Check if action is a downgrade
 */
export function isDowngrade(
  currentStatus: SubscriptionStatus,
  targetPlan: PlanId
): boolean {
  const hierarchy: Record<SubscriptionStatus, number> = {
    'FREE': 0,
    'ONE_TIME': 1,
    'BASIC': 2,
    'PRO': 3
  }
  
  const targetHierarchy: Record<PlanId, number> = {
    'free': 0,
    'one-time': 1,
    'basic': 2,
    'pro': 3
  }
  
  return targetHierarchy[targetPlan] < hierarchy[currentStatus]
}

/**
 * Get action details for a plan based on user's current status
 */
export function getPlanAction(
  currentStatus: SubscriptionStatus,
  targetPlan: PlanId,
  cancelAtPeriodEnd: boolean = false
): PlanAction {
  // Current plan
  if (
    (currentStatus === 'ONE_TIME' && targetPlan === 'one-time') ||
    (currentStatus === 'BASIC' && targetPlan === 'basic') ||
    (currentStatus === 'PRO' && targetPlan === 'pro')
  ) {
    if (cancelAtPeriodEnd) {
      return {
        allowed: true,
        actionType: 'current',
        buttonText: 'Reactivate',
        buttonVariant: 'default',
        disabled: false,
        tooltip: 'Reactivate your subscription'
      }
    }
    return {
      allowed: false,
      actionType: 'current',
      buttonText: 'Current Plan',
      buttonVariant: 'outline',
      disabled: true,
      tooltip: 'This is your current plan'
    }
  }
  
  // Quick Boost included in higher plans
  if (targetPlan === 'one-time' && (currentStatus === 'BASIC' || currentStatus === 'PRO')) {
    return {
      allowed: false,
      actionType: 'included',
      buttonText: '✓ Included',
      buttonVariant: 'ghost',
      disabled: true,
      tooltip: 'Quick Boost features are included in your current plan'
    }
  }
  
  // Already purchased Quick Boost
  if (currentStatus === 'ONE_TIME' && targetPlan === 'one-time') {
    return {
      allowed: false,
      actionType: 'current',
      buttonText: '✓ Active',
      buttonVariant: 'outline',
      disabled: true,
      tooltip: 'You already have Quick Boost'
    }
  }
  
  // Cannot purchase lower tier
  if (!canPurchasePlan(currentStatus, targetPlan)) {
    return {
      allowed: false,
      reason: 'Cannot downgrade or purchase lower tier',
      actionType: 'blocked',
      buttonText: 'Not Available',
      buttonVariant: 'ghost',
      disabled: true,
      tooltip: 'This plan is not available with your current subscription'
    }
  }
  
  // Upgrade from BASIC to PRO (requires proration)
  if (currentStatus === 'BASIC' && targetPlan === 'pro') {
    return {
      allowed: true,
      actionType: 'upgrade',
      requiresProration: true,
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'default',
      disabled: false,
      tooltip: 'Upgrade now and pay only the prorated difference'
    }
  }
  
  // Upgrade from ONE_TIME to subscription
  if (currentStatus === 'ONE_TIME' && (targetPlan === 'basic' || targetPlan === 'pro')) {
    return {
      allowed: true,
      actionType: 'upgrade',
      requiresProration: false,
      buttonText: `Upgrade to ${targetPlan === 'basic' ? 'Basic' : 'Pro'}`,
      buttonVariant: 'default',
      disabled: false,
      tooltip: "You'll keep your Quick Boost benefits"
    }
  }
  
  // Downgrade from PRO to BASIC
  if (currentStatus === 'PRO' && targetPlan === 'basic') {
    return {
      allowed: true,
      actionType: 'downgrade',
      requiresProration: false,
      buttonText: 'Switch to Basic',
      buttonVariant: 'outline',
      disabled: false,
      tooltip: 'Downgrade at the end of your billing period'
    }
  }
  
  // New purchase for FREE user
  if (currentStatus === 'FREE') {
    const buttonTexts: Record<PlanId, string> = {
      'free': 'Get Started',
      'one-time': 'Buy Now - €2.99',
      'basic': 'Start Basic Plan',
      'pro': 'Start Pro Plan'
    }
    
    return {
      allowed: true,
      actionType: 'purchase',
      requiresProration: false,
      buttonText: buttonTexts[targetPlan],
      buttonVariant: 'default',
      disabled: false
    }
  }
  
  // Default: not allowed
  return {
    allowed: false,
    actionType: 'blocked',
    buttonText: 'Not Available',
    buttonVariant: 'ghost',
    disabled: true
  }
}

/**
 * Calculate proration for subscription upgrade
 * @param currentPrice Current monthly price in euros
 * @param newPrice New monthly price in euros
 * @param daysRemaining Days remaining in current billing period
 * @returns Prorated amount to charge today
 */
export function calculateProration(
  currentPrice: number,
  newPrice: number,
  daysRemaining: number
): {
  proratedAmount: number
  dailyDifference: number
  nextBillingAmount: number
} {
  const dailyDifference = (newPrice - currentPrice) / 30
  const proratedAmount = dailyDifference * daysRemaining
  
  return {
    proratedAmount: Math.max(0, Math.round(proratedAmount * 100) / 100),
    dailyDifference: Math.round(dailyDifference * 100) / 100,
    nextBillingAmount: newPrice
  }
}

/**
 * Get days remaining in billing period
 */
export function getDaysRemaining(periodEnd: Date): number {
  const now = new Date()
  const diff = periodEnd.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

/**
 * Check if Quick Boost has expired (30 days after purchase)
 */
export function isQuickBoostExpired(purchaseDate: Date): boolean {
  const expiryDate = new Date(purchaseDate)
  expiryDate.setDate(expiryDate.getDate() + 30)
  return new Date() > expiryDate
}

/**
 * Get user-friendly status label
 */
export function getStatusLabel(status: SubscriptionStatus): string {
  const labels: Record<SubscriptionStatus, string> = {
    'FREE': 'Free Plan',
    'ONE_TIME': 'Quick Boost',
    'BASIC': 'Basic Monthly',
    'PRO': 'Pro Unlimited'
  }
  return labels[status]
}

/**
 * Get status badge color
 */
export function getStatusColor(status: SubscriptionStatus): string {
  const colors: Record<SubscriptionStatus, string> = {
    'FREE': 'bg-gray-200 text-gray-800',
    'ONE_TIME': 'bg-yellow-500 text-white',
    'BASIC': 'bg-blue-500 text-white',
    'PRO': 'bg-purple-500 text-white'
  }
  return colors[status]
}

/**
 * Get features lost when downgrading
 */
export function getFeaturesLost(
  fromStatus: SubscriptionStatus,
  toStatus: SubscriptionStatus
): string[] {
  if (fromStatus === 'PRO' && toStatus === 'BASIC') {
    return [
      'Unlimited AI Polish (limited to 10/month)',
      'Unlimited Resumes (limited to 5)',
      'Priority Support',
      'Advanced Analytics',
      'Custom Branding',
      'Early Access to New Features'
    ]
  }
  
  if (fromStatus === 'PRO' && toStatus === 'FREE') {
    return [
      'All AI features',
      'Multiple resumes',
      'Premium templates',
      'Cover letter generator',
      'Priority support',
      'Analytics'
    ]
  }
  
  if (fromStatus === 'BASIC' && toStatus === 'FREE') {
    return [
      'AI Polish (10/month)',
      'Multiple resumes (up to 5)',
      'AI Cover Letter Generator',
      'Premium Templates',
      'Export Options'
    ]
  }
  
  return []
}

/**
 * Validate subscription transition
 */
export function validateTransition(
  currentStatus: SubscriptionStatus,
  targetPlan: PlanId
): { valid: boolean; error?: string } {
  if (!canPurchasePlan(currentStatus, targetPlan)) {
    return {
      valid: false,
      error: `Cannot transition from ${currentStatus} to ${targetPlan}`
    }
  }
  
  return { valid: true }
}
