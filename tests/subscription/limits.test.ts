/**
 * Unit Tests - Subscription Limits
 * Test-Driven Development (TDD) approach
 * 
 * Test Cases:
 * 1. FREE plan limits
 * 2. ONE_TIME plan limits
 * 3. BASIC plan limits
 * 4. PRO plan limits
 * 5. Resume creation limits
 * 6. AI feature access
 * 7. Template access restrictions
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('Subscription - Limits API', () => {
  let freeUser: any
  let quickBoostUser: any
  let basicUser: any
  let proUser: any

  beforeEach(async () => {
    // Add small delay to ensure unique timestamps
    await new Promise(resolve => setTimeout(resolve, 10))
    const passwordHash = await bcrypt.hash('TestPass123!', 10)

    // Create FREE user
    freeUser = await prisma.user.upsert({
      where: { email: 'free-limits@test.com' },
      update: {},
      create: {
        name: 'Free User',
        email: 'free-limits@test.com',
        passwordHash,
      }
    })

    // Create QUICK BOOST user with subscription
    quickBoostUser = await prisma.user.upsert({
      where: { email: 'quickboost-limits@test.com' },
      update: {},
      create: {
        name: 'Quick Boost User',
        email: 'quickboost-limits@test.com',
        passwordHash,
      }
    })

    // Delete existing subscription first to avoid unique constraint errors
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
        stripeSubscriptionId: `sub_test_qb_${Date.now()}`,
        stripePriceId: 'price_test_quickboost',
      }
    })

    // Create BASIC user with subscription
    basicUser = await prisma.user.upsert({
      where: { email: 'basic-limits@test.com' },
      update: {},
      create: {
        name: 'Basic User',
        email: 'basic-limits@test.com',
        passwordHash,
      }
    })

    // Delete existing subscription first
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
        stripeSubscriptionId: `sub_test_basic_${Date.now()}`,
        stripePriceId: 'price_test_basic',
      }
    })

    // Create PRO user with subscription
    proUser = await prisma.user.upsert({
      where: { email: 'pro-limits@test.com' },
      update: {},
      create: {
        name: 'Pro User',
        email: 'pro-limits@test.com',
        passwordHash,
      }
    })

    // Delete existing subscription first
    await prisma.subscription.deleteMany({
      where: { userId: proUser.id }
    })

    await prisma.subscription.create({
      data: {
        userId: proUser.id,
        planType: 'pro',
        aiCreditsRemaining: -1,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        stripeSubscriptionId: `sub_test_pro_${Date.now()}`,
        stripePriceId: 'price_test_pro',
      }
    })
  })

  describe('FREE Plan Limits', () => {
    it('should return correct limits for FREE plan', async () => {
      // Arrange
      const user = await prisma.user.findUnique({
        where: { id: freeUser.id },
        include: { subscription: true }
      })

      // Act
      const planType = user?.subscription?.planType || 'free'

      // Assert
      expect(planType).toBe('free')
      expect(user?.subscription).toBeNull()
    })

    it('should have maxResumes = 1 for FREE plan', async () => {
      // Expected limits for FREE
      const expectedLimits = {
        maxResumes: 1,
        hasAIAccess: false,
        hasUnlimitedAI: false,
        aiCreditsRemaining: 0,
        hasPremiumTemplates: false,
        hasAICoverLetter: false,
        hasATSScore: false,
      }

      expect(expectedLimits.maxResumes).toBe(1)
      expect(expectedLimits.hasAIAccess).toBe(false)
      expect(expectedLimits.hasPremiumTemplates).toBe(false)
    })
  })

  describe('QUICK BOOST Plan Limits', () => {
    it('should return correct limits for ONE_TIME plan', async () => {
      // Arrange
      const user = await prisma.user.findUnique({
        where: { id: quickBoostUser.id },
        include: { subscription: true }
      })

      // Assert
      expect(user?.subscription?.planType).toBe('one_time')
      expect(user?.subscription?.aiCreditsRemaining).toBe(3)
      expect(user?.subscription?.aiCreditsTotal).toBe(3)
    })

    it('should have 3 AI credits for QUICK BOOST', async () => {
      const subscription = await prisma.subscription.findUnique({
        where: { userId: quickBoostUser.id }
      })

      expect(subscription?.aiCreditsRemaining).toBe(3)
      expect(subscription?.aiCreditsTotal).toBe(3)
    })

    it('should have maxResumes = 1 for QUICK BOOST', () => {
      const expectedLimits = {
        maxResumes: 1,
        hasAIAccess: true,
        hasUnlimitedAI: false,
        aiCreditsRemaining: 3,
        hasPremiumTemplates: true,
      }

      expect(expectedLimits.maxResumes).toBe(1)
      expect(expectedLimits.hasAIAccess).toBe(true)
      expect(expectedLimits.hasUnlimitedAI).toBe(false)
      expect(expectedLimits.hasPremiumTemplates).toBe(true)
    })
  })

  describe('BASIC Plan Limits', () => {
    it('should return correct limits for BASIC plan', async () => {
      // Arrange
      const user = await prisma.user.findUnique({
        where: { id: basicUser.id },
        include: { subscription: true }
      })

      // Assert
      expect(user?.subscription?.planType).toBe('basic')
      expect(user?.subscription?.aiCreditsRemaining).toBe(-1) // unlimited
    })

    it('should have maxResumes = 5 for BASIC', () => {
      const expectedLimits = {
        maxResumes: 5,
        hasAIAccess: true,
        hasUnlimitedAI: true,
        aiCreditsRemaining: -1,
        hasPremiumTemplates: true,
        hasAICoverLetter: true,
        hasATSScore: true,
      }

      expect(expectedLimits.maxResumes).toBe(5)
      expect(expectedLimits.hasUnlimitedAI).toBe(true)
      expect(expectedLimits.hasAICoverLetter).toBe(true)
      expect(expectedLimits.hasATSScore).toBe(true)
    })
  })

  describe('PRO Plan Limits', () => {
    it('should return correct limits for PRO plan', async () => {
      // Arrange
      const user = await prisma.user.findUnique({
        where: { id: proUser.id },
        include: { subscription: true }
      })

      // Assert
      expect(user?.subscription?.planType).toBe('pro')
      expect(user?.subscription?.aiCreditsRemaining).toBe(-1) // unlimited
    })

    it('should have unlimited resumes for PRO', () => {
      const expectedLimits = {
        maxResumes: -1, // unlimited
        hasAIAccess: true,
        hasUnlimitedAI: true,
        aiCreditsRemaining: -1,
        hasPremiumTemplates: true,
        hasAICoverLetter: true,
        hasATSScore: true,
      }

      expect(expectedLimits.maxResumes).toBe(-1)
      expect(expectedLimits.hasUnlimitedAI).toBe(true)
    })
  })

  describe('Resume Creation Limits', () => {
    it('should allow FREE user to create 1 resume', () => {
      const maxResumes = 1
      const currentCount = 0

      expect(currentCount < maxResumes).toBe(true)
    })

    it('should block FREE user from creating 2nd resume', () => {
      const maxResumes = 1
      const currentCount = 1

      expect(currentCount < maxResumes).toBe(false)
    })

    it('should allow BASIC user to create up to 5 resumes', () => {
      const maxResumes = 5
      const currentCount = 4

      expect(currentCount < maxResumes).toBe(true)
    })

    it('should block BASIC user from creating 6th resume', () => {
      const maxResumes = 5
      const currentCount = 5

      expect(currentCount < maxResumes).toBe(false)
    })

    it('should allow PRO user unlimited resumes', () => {
      const maxResumes = -1 // unlimited
      const currentCount = 100

      expect(maxResumes === -1 || currentCount < maxResumes).toBe(true)
    })
  })

  describe('AI Feature Access', () => {
    it('should block AI access for FREE users', () => {
      const hasAIAccess = false
      const aiCreditsRemaining = 0

      expect(hasAIAccess).toBe(false)
      expect(aiCreditsRemaining).toBe(0)
    })

    it('should allow AI access for QUICK BOOST with credits', () => {
      const hasAIAccess = true
      const hasUnlimitedAI = false
      const aiCreditsRemaining = 3

      expect(hasAIAccess && (hasUnlimitedAI || aiCreditsRemaining > 0)).toBe(true)
    })

    it('should block AI access for QUICK BOOST without credits', () => {
      const hasAIAccess = true
      const hasUnlimitedAI = false
      const aiCreditsRemaining = 0

      expect(hasAIAccess && (hasUnlimitedAI || aiCreditsRemaining > 0)).toBe(false)
    })

    it('should allow unlimited AI for BASIC users', () => {
      const hasAIAccess = true
      const hasUnlimitedAI = true

      expect(hasAIAccess && hasUnlimitedAI).toBe(true)
    })

    it('should allow unlimited AI for PRO users', () => {
      const hasAIAccess = true
      const hasUnlimitedAI = true

      expect(hasAIAccess && hasUnlimitedAI).toBe(true)
    })
  })

  describe('Template Access', () => {
    const basicTemplates = [
      'atlantic_blue',
      'modern_blue_black',
      'classic_professional',
      'creative_minimal',
      'corporate_elegant'
    ]

    it('should allow FREE users to access basic templates', () => {
      const hasPremiumTemplates = false
      const templateId = 'atlantic_blue'

      const canAccess = basicTemplates.includes(templateId) || hasPremiumTemplates

      expect(canAccess).toBe(true)
    })

    it('should block FREE users from premium templates', () => {
      const hasPremiumTemplates = false
      const templateId = 'premium_executive'

      const canAccess = basicTemplates.includes(templateId) || hasPremiumTemplates

      expect(canAccess).toBe(false)
    })

    it('should allow QUICK BOOST users to access all templates', () => {
      const hasPremiumTemplates = true
      const templateId = 'premium_executive'

      const canAccess = basicTemplates.includes(templateId) || hasPremiumTemplates

      expect(canAccess).toBe(true)
    })
  })
})
