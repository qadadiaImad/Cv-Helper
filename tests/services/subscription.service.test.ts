import { describe, it, expect, beforeEach } from 'vitest'
import { PrismaClient, SubscriptionStatus } from '@prisma/client'
import { SubscriptionService } from '@/lib/services/subscription.service'
import { prisma } from '../setup'

describe('SubscriptionService', () => {
  let service: SubscriptionService
  let testUserId: string

  beforeEach(async () => {
    service = new SubscriptionService(prisma)
    
    // Create a test user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        passwordHash: 'hashed_password',
        subscriptionStatus: SubscriptionStatus.FREE,
      },
    })
    testUserId = user.id
  })

  describe('getUserSubscription', () => {
    it('should return user subscription details for FREE user', async () => {
      const result = await service.getUserSubscription(testUserId)

      expect(result.user).toBeDefined()
      expect(result.status).toBe(SubscriptionStatus.FREE)
      expect(result.canUpgrade).toBe(true)
      expect(result.availableUpgrades).toEqual(['one-time', 'pro'])
    })

    it('should throw error for non-existent user', async () => {
      await expect(
        service.getUserSubscription('non-existent-id')
      ).rejects.toThrow('User not found')
    })
  })

  describe('canUpgrade', () => {
    it('should return true for FREE users', () => {
      expect(service.canUpgrade(SubscriptionStatus.FREE)).toBe(true)
    })

    it('should return true for ONE_TIME users', () => {
      expect(service.canUpgrade(SubscriptionStatus.ONE_TIME)).toBe(true)
    })

    it('should return false for PRO users', () => {
      expect(service.canUpgrade(SubscriptionStatus.PRO)).toBe(false)
    })
  })

  describe('getAvailableUpgrades', () => {
    it('should return both upgrades for FREE users', () => {
      const upgrades = service.getAvailableUpgrades(SubscriptionStatus.FREE)
      expect(upgrades).toEqual(['one-time', 'pro'])
    })

    it('should return only PRO upgrade for ONE_TIME users', () => {
      const upgrades = service.getAvailableUpgrades(SubscriptionStatus.ONE_TIME)
      expect(upgrades).toEqual(['pro'])
    })

    it('should return no upgrades for PRO users', () => {
      const upgrades = service.getAvailableUpgrades(SubscriptionStatus.PRO)
      expect(upgrades).toEqual([])
    })
  })

  describe('useAICredit', () => {
    it('should successfully use AI credit when available', async () => {
      // Create a one-time subscription with credits
      await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeSubscriptionId: 'sub_test_123',
          stripePriceId: 'price_test_123',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 3,
          aiCreditsTotal: 3,
        },
      })

      const result = await service.useAICredit(testUserId)
      expect(result).toBe(true)

      // Verify credit was deducted
      const subscription = await prisma.subscription.findUnique({
        where: { userId: testUserId },
      })
      expect(subscription?.aiCreditsRemaining).toBe(2)
    })

    it('should return false when no credits remaining', async () => {
      // Create a one-time subscription with no credits
      await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeSubscriptionId: 'sub_test_123',
          stripePriceId: 'price_test_123',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 0,
          aiCreditsTotal: 3,
        },
      })

      const result = await service.useAICredit(testUserId)
      expect(result).toBe(false)
    })

    it('should throw error for non-one-time subscription', async () => {
      await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeSubscriptionId: 'sub_test_123',
          stripePriceId: 'price_test_123',
          status: 'active',
          planType: 'pro',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 0,
          aiCreditsTotal: 0,
        },
      })

      await expect(service.useAICredit(testUserId)).rejects.toThrow(
        'No one-time subscription found'
      )
    })
  })

  describe('hasFeatureAccess', () => {
    it('should deny AI polish access for FREE users', async () => {
      const hasAccess = await service.hasFeatureAccess(testUserId, 'ai_polish')
      expect(hasAccess).toBe(false)
    })

    it('should allow AI polish access for ONE_TIME users with credits', async () => {
      await prisma.user.update({
        where: { id: testUserId },
        data: { subscriptionStatus: SubscriptionStatus.ONE_TIME },
      })

      await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeSubscriptionId: 'sub_test_123',
          stripePriceId: 'price_test_123',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 3,
          aiCreditsTotal: 3,
        },
      })

      const hasAccess = await service.hasFeatureAccess(testUserId, 'ai_polish')
      expect(hasAccess).toBe(true)
    })

    it('should allow unlimited AI polish for PRO users', async () => {
      await prisma.user.update({
        where: { id: testUserId },
        data: { subscriptionStatus: SubscriptionStatus.PRO },
      })

      await prisma.subscription.create({
        data: {
          userId: testUserId,
          stripeSubscriptionId: 'sub_test_123',
          stripePriceId: 'price_test_123',
          status: 'active',
          planType: 'pro',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 0,
          aiCreditsTotal: 0,
        },
      })

      const hasAccess = await service.hasFeatureAccess(testUserId, 'ai_polish')
      expect(hasAccess).toBe(true)
    })

    it('should deny unlimited_resumes for ONE_TIME users', async () => {
      await prisma.user.update({
        where: { id: testUserId },
        data: { subscriptionStatus: SubscriptionStatus.ONE_TIME },
      })

      const hasAccess = await service.hasFeatureAccess(testUserId, 'unlimited_resumes')
      expect(hasAccess).toBe(false)
    })

    it('should allow unlimited_resumes for PRO users', async () => {
      await prisma.user.update({
        where: { id: testUserId },
        data: { subscriptionStatus: SubscriptionStatus.PRO },
      })

      const hasAccess = await service.hasFeatureAccess(testUserId, 'unlimited_resumes')
      expect(hasAccess).toBe(true)
    })
  })
})
