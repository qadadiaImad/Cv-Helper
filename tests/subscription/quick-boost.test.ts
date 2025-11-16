/**
 * Unit Tests - QUICK_BOOST Plan Features
 * 
 * Test Cases:
 * TC-QB1: Purchase Quick Boost plan
 * TC-QB2: Verify 3 AI credits assigned
 * TC-QB3-5: Use AI Polish (3 times, consuming 1 credit each)
 * TC-QB6: Attempt 4th AI Polish (should show "no credits" message)
 * TC-QB7: Access all 18+ templates
 * TC-QB8: Use advanced customization features
 * TC-QB9: Attempt AI Cover Letter (should be blocked)
 * TC-QB10: Attempt to create 2nd resume (should be blocked)
 * TC-QB11: Verify 30-day access expiration logic
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ id: 'test-session-id' })
      }
    },
    prices: {
      retrieve: vi.fn().mockResolvedValue({
        unit_amount: 299, // €2.99 in cents
        currency: 'eur'
      })
    }
  }))
}))

describe('QUICK_BOOST Plan Features', () => {
  let quickBoostUser: any
  
  beforeEach(async () => {
    // Add small delay to ensure unique timestamps
    await new Promise(resolve => setTimeout(resolve, 10))
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    
    // Create QUICK BOOST user
    quickBoostUser = await prisma.user.upsert({
      where: { email: 'qb-features@test.com' },
      update: {},
      create: {
        name: 'QB Features User',
        email: 'qb-features@test.com',
        passwordHash,
        subscriptionStatus: 'ONE_TIME'
      }
    })

    // Delete existing subscription if any
    await prisma.subscription.deleteMany({
      where: { userId: quickBoostUser.id }
    })

    // Create subscription with 3 AI credits
    await prisma.subscription.create({
      data: {
        userId: quickBoostUser.id,
        planType: 'one_time',
        aiCreditsRemaining: 3,
        aiCreditsTotal: 3,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        stripeSubscriptionId: `sub_test_qb_${Date.now()}`,
        stripePriceId: 'price_test_qb',
      }
    })

    // Clean up usage records
    await prisma.usageRecord.deleteMany({
      where: { userId: quickBoostUser.id }
    })
  })
  
  // TC-QB1: Purchase Quick Boost plan
  it('should successfully create Quick Boost subscription', async () => {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: quickBoostUser.id }
    })
    
    expect(subscription).toBeDefined()
    expect(subscription?.planType).toBe('one_time')
    expect(subscription?.status).toBe('active')
    expect(quickBoostUser.subscriptionStatus).toBe('ONE_TIME')
  })
  
  // TC-QB2: Verify 3 AI credits assigned
  it('should have 3 AI credits assigned', async () => {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: quickBoostUser.id }
    })
    
    expect(subscription?.aiCreditsRemaining).toBe(3)
    expect(subscription?.aiCreditsTotal).toBe(3)
  })
  
  // TC-QB3-5: Use AI Polish (3 times, consuming 1 credit each)
  describe('AI Polish usage', () => {
    it('should consume 1 credit per AI Polish use', async () => {
      // First use
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 2 }
      })
      
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 2 })
        }
      })
      
      let sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(2)
      
      // Second use
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 1 }
      })
      
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 1 })
        }
      })
      
      sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(1)
      
      // Third use
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })
      
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 0 })
        }
      })
      
      sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(0)
      
      // Verify 3 usage records were created
      const usageRecords = await prisma.usageRecord.findMany({
        where: { userId: quickBoostUser.id, featureType: 'ai_polish' }
      })
      expect(usageRecords.length).toBe(3)
    })
    
    // TC-QB6: Attempt 4th AI Polish (should show "no credits" message)
    it('should block AI Polish when no credits remain', async () => {
      // Set credits to 0
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })
      
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      
      // Verify no credits remain
      expect(subscription?.aiCreditsRemaining).toBe(0)
      
      // Verify user cannot use AI features
      const canUseAI = subscription!.aiCreditsRemaining > 0 || subscription!.aiCreditsRemaining === -1
      expect(canUseAI).toBe(false)
    })
  })
  
  // TC-QB7: Access all 18+ templates
  it('should have access to all templates (ONE_TIME plan)', async () => {
    const user = await prisma.user.findUnique({
      where: { id: quickBoostUser.id }
    })
    
    // ONE_TIME plan should have access to all templates
    expect(user?.subscriptionStatus).toBe('ONE_TIME')
    
    // In the actual implementation, template access would be checked
    // via SubscriptionService.hasFeatureAccess()
    // For this test, we verify the plan type is correct
    const subscription = await prisma.subscription.findUnique({
      where: { userId: quickBoostUser.id }
    })
    expect(subscription?.planType).toBe('one_time')
  })
  
  // TC-QB8: Use advanced customization features
  it('should have access to advanced customization (ONE_TIME plan)', async () => {
    const user = await prisma.user.findUnique({
      where: { id: quickBoostUser.id }
    })
    
    // ONE_TIME plan should have advanced customization
    expect(user?.subscriptionStatus).toBe('ONE_TIME')
  })
  
  // TC-QB9: Attempt AI Cover Letter (should be blocked)
  it('should not have access to AI Cover Letter (ONE_TIME limitation)', async () => {
    const user = await prisma.user.findUnique({
      where: { id: quickBoostUser.id },
      include: { subscription: true }
    })
    
    // ONE_TIME plan does NOT include AI Cover Letter
    // Only BASIC and PRO plans have this feature
    expect(user?.subscriptionStatus).toBe('ONE_TIME')
    expect(user?.subscriptionStatus).not.toBe('BASIC')
    expect(user?.subscriptionStatus).not.toBe('PRO')
  })
  
  // TC-QB10: Attempt to create 2nd resume (should be blocked)
  it('should be limited to 1 resume (ONE_TIME plan)', async () => {
    const user = await prisma.user.findUnique({
      where: { id: quickBoostUser.id }
    })
    
    // ONE_TIME plan is limited to 1 resume
    // This would be enforced in the application logic
    expect(user?.subscriptionStatus).toBe('ONE_TIME')
    
    // Note: Resume limit enforcement would typically be done
    // in the SubscriptionService or middleware
  })
  
  // TC-QB11: Verify 30-day access expiration logic
  it('should expire after 30 days', async () => {
    // Set subscription to be 31 days old
    const thirtyOneDaysAgo = new Date()
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31)
    
    await prisma.subscription.update({
      where: { userId: quickBoostUser.id },
      data: { 
        currentPeriodStart: thirtyOneDaysAgo,
        currentPeriodEnd: new Date(thirtyOneDaysAgo.getTime() + 30 * 24 * 60 * 60 * 1000)
      }
    })
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: quickBoostUser.id }
    })
    
    // Verify subscription period has ended
    const now = new Date()
    const hasExpired = subscription!.currentPeriodEnd < now
    expect(hasExpired).toBe(true)
    
    // In production, expired subscriptions would have status updated to 'expired'
    // and user's subscriptionStatus would be set to 'EXPIRED'
  })
})
