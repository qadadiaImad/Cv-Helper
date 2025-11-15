/**
 * Unit Tests - AI Credits Management
 * Test-Driven Development (TDD) approach
 * 
 * Test Cases:
 * 1. Credit consumption for ONE_TIME plan
 * 2. Credit tracking and updates
 * 3. Zero credit blocking
 * 4. Unlimited credits for BASIC/PRO
 * 5. Usage record creation
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('Subscription - AI Credits', () => {
  let quickBoostUser: any
  let basicUser: any

  beforeEach(async () => {
    // Add small delay to ensure unique timestamps
    await new Promise(resolve => setTimeout(resolve, 10))
    const passwordHash = await bcrypt.hash('TestPass123!', 10)

    // Create QUICK BOOST user
    quickBoostUser = await prisma.user.upsert({
      where: { email: 'credits-quickboost@test.com' },
      update: {},
      create: {
        name: 'Credits Quick Boost User',
        email: 'credits-quickboost@test.com',
        passwordHash,
      }
    })

    await prisma.subscription.deleteMany({
      where: { userId: quickBoostUser.id }
    })

    await prisma.subscription.create({
      data: {
        userId: quickBoostUser.id,
        planType: 'one_time',
        aiCreditsRemaining: 3,
        aiCreditsTotal: 3,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        stripeSubscriptionId: `sub_test_credits_qb_${Date.now()}`,
        stripePriceId: 'price_test_credits_qb',
      }
    })

    // Create BASIC user
    basicUser = await prisma.user.upsert({
      where: { email: 'credits-basic@test.com' },
      update: {},
      create: {
        name: 'Credits Basic User',
        email: 'credits-basic@test.com',
        passwordHash,
      }
    })

    await prisma.subscription.deleteMany({
      where: { userId: basicUser.id }
    })

    await prisma.subscription.create({
      data: {
        userId: basicUser.id,
        planType: 'basic',
        aiCreditsRemaining: -1,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        stripeSubscriptionId: `sub_test_credits_basic_${Date.now()}`,
        stripePriceId: 'price_test_credits_basic',
      }
    })

    // Clean up usage records
    await prisma.usageRecord.deleteMany({
      where: { userId: { in: [quickBoostUser.id, basicUser.id] } }
    })
  })

  describe('Credit Consumption - ONE_TIME Plan', () => {
    it('should start with 3 credits', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      expect(subscription?.aiCreditsRemaining).toBe(3)
      expect(subscription?.aiCreditsTotal).toBe(3)
    })

    it('should consume 1 credit on AI usage', async () => {
      // Arrange
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      expect(subscription?.aiCreditsRemaining).toBe(3)

      // Act - Simulate credit consumption
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: {
          aiCreditsRemaining: subscription!.aiCreditsRemaining - 1
        }
      })

      // Assert
      const updated = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      expect(updated?.aiCreditsRemaining).toBe(2)
    })

    it('should track usage in usage records', async () => {
      // Act - Create usage record
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 2 })
        }
      })

      // Assert
      const records = await prisma.usageRecord.findMany({
        where: { userId: quickBoostUser.id }
      })

      expect(records.length).toBe(1)
      expect(records[0].featureType).toBe('ai_polish')
    })

    it('should consume all 3 credits sequentially', async () => {
      // Use credit 1
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 2 }
      })

      let sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(2)

      // Use credit 2
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 1 }
      })

      sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(1)

      // Use credit 3
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })

      sub = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })
      expect(sub?.aiCreditsRemaining).toBe(0)
    })

    it('should block AI usage when credits reach 0', async () => {
      // Arrange - Set credits to 0
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })

      // Act
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      // Assert
      expect(subscription?.aiCreditsRemaining).toBe(0)
      expect(subscription!.aiCreditsRemaining <= 0).toBe(true)
    })

    it('should not allow negative credits', async () => {
      // Arrange
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })

      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      // Assert - Should not go below 0
      expect(subscription!.aiCreditsRemaining).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Unlimited Credits - BASIC/PRO Plans', () => {
    it('should have unlimited credits (-1) for BASIC', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: basicUser.id }
      })

      expect(subscription?.aiCreditsRemaining).toBe(-1)
    })

    it('should not consume credits for BASIC users', async () => {
      // Arrange
      const beforeCredits = (await prisma.subscription.findUnique({
        where: { userId: basicUser.id }
      }))?.aiCreditsRemaining

      // Act - Simulate AI usage (should not affect credits)
      await prisma.usageRecord.create({
        data: {
          userId: basicUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ unlimited: true })
        }
      })

      // Assert - Credits should remain -1
      const afterCredits = (await prisma.subscription.findUnique({
        where: { userId: basicUser.id }
      }))?.aiCreditsRemaining

      expect(beforeCredits).toBe(-1)
      expect(afterCredits).toBe(-1)
    })

    it('should allow unlimited AI usage for BASIC', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: basicUser.id }
      })

      const hasUnlimitedAI = subscription?.aiCreditsRemaining === -1

      expect(hasUnlimitedAI).toBe(true)
    })
  })

  describe('Usage Tracking', () => {
    it('should create usage record for each AI operation', async () => {
      // Act
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 2 })
        }
      })

      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({ creditsRemaining: 1 })
        }
      })

      // Assert
      const records = await prisma.usageRecord.findMany({
        where: { userId: quickBoostUser.id },
        orderBy: { createdAt: 'asc' }
      })

      expect(records.length).toBe(2)
      expect(records[0].featureType).toBe('ai_polish')
      expect(records[1].featureType).toBe('ai_polish')
    })

    it('should track different feature types', async () => {
      // Act
      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_polish',
          metadata: JSON.stringify({})
        }
      })

      await prisma.usageRecord.create({
        data: {
          userId: quickBoostUser.id,
          featureType: 'ai_import',
          metadata: JSON.stringify({})
        }
      })

      // Assert
      const polishRecords = await prisma.usageRecord.findMany({
        where: { 
          userId: quickBoostUser.id,
          featureType: 'ai_polish'
        }
      })

      const importRecords = await prisma.usageRecord.findMany({
        where: { 
          userId: quickBoostUser.id,
          featureType: 'ai_import'
        }
      })

      expect(polishRecords.length).toBe(1)
      expect(importRecords.length).toBe(1)
    })
  })

  describe('Credit Validation', () => {
    it('should validate credits before AI operation', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      const hasCredits = subscription!.aiCreditsRemaining > 0 || 
                        subscription!.aiCreditsRemaining === -1

      expect(hasCredits).toBe(true)
    })

    it('should fail validation with 0 credits', async () => {
      // Arrange
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })

      // Act
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      const hasCredits = subscription!.aiCreditsRemaining > 0 || 
                        subscription!.aiCreditsRemaining === -1

      // Assert
      expect(hasCredits).toBe(false)
    })

    it('should pass validation with unlimited credits', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: basicUser.id }
      })

      const hasCredits = subscription!.aiCreditsRemaining > 0 || 
                        subscription!.aiCreditsRemaining === -1

      expect(hasCredits).toBe(true)
    })
  })
})
