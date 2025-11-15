/**
 * Unit Tests - Feature Access Control
 * Test-Driven Development (TDD) approach
 * 
 * Test Cases:
 * 1. AI Polish access by plan
 * 2. AI Cover Letter access by plan
 * 3. ATS Score access by plan
 * 4. Template access by plan
 * 5. Resume limits by plan
 * 6. Feature gating logic
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { prisma } from '../setup'

// Mock Stripe to avoid API key requirement
vi.mock('stripe', () => {
  return {
    default: vi.fn().mockImplementation(() => ({}))
  }
})

import { SubscriptionService } from '@/lib/services/subscription.service'

describe('Subscription - Feature Access', () => {
  let subscriptionService: SubscriptionService
  let freeUser: any
  let quickBoostUser: any
  let basicUser: any
  let proUser: any

  beforeEach(async () => {
    subscriptionService = new SubscriptionService(prisma)

    // Create test users (reuse from setup-test-users.ts logic)
    const users = await Promise.all([
      prisma.user.findUnique({ where: { email: 'free@test.com' } }),
      prisma.user.findUnique({ where: { email: 'quickboost@test.com' } }),
      prisma.user.findUnique({ where: { email: 'basic@test.com' } }),
      prisma.user.findUnique({ where: { email: 'pro@test.com' } }),
    ])

    freeUser = users[0]
    quickBoostUser = users[1]
    basicUser = users[2]
    proUser = users[3]

    // Ensure users exist
    if (!freeUser || !quickBoostUser || !basicUser || !proUser) {
      throw new Error('Test users not found. Run: npx tsx tests/setup-test-users.ts')
    }

    // Update subscription status on User model to match subscription
    await prisma.user.update({
      where: { id: quickBoostUser.id },
      data: { subscriptionStatus: 'ONE_TIME' }
    })
    await prisma.user.update({
      where: { id: basicUser.id },
      data: { subscriptionStatus: 'BASIC' }
    })
    await prisma.user.update({
      where: { id: proUser.id },
      data: { subscriptionStatus: 'PRO' }
    })
  })

  describe('AI Polish Access', () => {
    it('should block AI Polish for FREE users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        freeUser.id,
        'ai_polish'
      )

      expect(hasAccess).toBe(false)
    })

    it('should allow AI Polish for QUICK BOOST with credits', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'ai_polish'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow AI Polish for BASIC users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        basicUser.id,
        'ai_polish'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow AI Polish for PRO users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        proUser.id,
        'ai_polish'
      )

      expect(hasAccess).toBe(true)
    })

    it('should block AI Polish for QUICK BOOST without credits', async () => {
      // Set credits to 0
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 0 }
      })

      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'ai_polish'
      )

      expect(hasAccess).toBe(false)

      // Restore credits
      await prisma.subscription.update({
        where: { userId: quickBoostUser.id },
        data: { aiCreditsRemaining: 3 }
      })
    })
  })

  describe('AI Cover Letter Access', () => {
    it('should block AI Cover Letter for FREE users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        freeUser.id,
        'ai_cover_letter'
      )

      expect(hasAccess).toBe(false)
    })

    it('should block AI Cover Letter for QUICK BOOST users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'ai_cover_letter'
      )

      expect(hasAccess).toBe(false)
    })

    it('should allow AI Cover Letter for BASIC users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        basicUser.id,
        'ai_cover_letter'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow AI Cover Letter for PRO users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        proUser.id,
        'ai_cover_letter'
      )

      expect(hasAccess).toBe(true)
    })
  })

  describe('ATS Score Access', () => {
    it('should block ATS Score for FREE users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        freeUser.id,
        'ats_score'
      )

      expect(hasAccess).toBe(false)
    })

    it('should block ATS Score for QUICK BOOST users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'ats_score'
      )

      expect(hasAccess).toBe(false)
    })

    it('should allow ATS Score for BASIC users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        basicUser.id,
        'ats_score'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow ATS Score for PRO users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        proUser.id,
        'ats_score'
      )

      expect(hasAccess).toBe(true)
    })
  })

  describe('Template Access', () => {
    it('should block premium templates for FREE users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        freeUser.id,
        'all_templates'
      )

      expect(hasAccess).toBe(false)
    })

    it('should allow all templates for QUICK BOOST users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'all_templates'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow all templates for BASIC users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        basicUser.id,
        'all_templates'
      )

      expect(hasAccess).toBe(true)
    })

    it('should allow all templates for PRO users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        proUser.id,
        'all_templates'
      )

      expect(hasAccess).toBe(true)
    })
  })

  describe('Unlimited Resumes Access', () => {
    it('should block unlimited resumes for FREE users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        freeUser.id,
        'unlimited_resumes'
      )

      expect(hasAccess).toBe(false)
    })

    it('should block unlimited resumes for QUICK BOOST users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        quickBoostUser.id,
        'unlimited_resumes'
      )

      expect(hasAccess).toBe(false)
    })

    it('should block unlimited resumes for BASIC users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        basicUser.id,
        'unlimited_resumes'
      )

      expect(hasAccess).toBe(false)
    })

    it('should allow unlimited resumes for PRO users', async () => {
      const hasAccess = await subscriptionService.hasFeatureAccess(
        proUser.id,
        'unlimited_resumes'
      )

      expect(hasAccess).toBe(true)
    })
  })

  describe('Feature Access Matrix', () => {
    it('should return correct feature matrix for FREE', async () => {
      const features = {
        ai_polish: await subscriptionService.hasFeatureAccess(freeUser.id, 'ai_polish'),
        ai_cover_letter: await subscriptionService.hasFeatureAccess(freeUser.id, 'ai_cover_letter'),
        ats_score: await subscriptionService.hasFeatureAccess(freeUser.id, 'ats_score'),
        all_templates: await subscriptionService.hasFeatureAccess(freeUser.id, 'all_templates'),
        unlimited_resumes: await subscriptionService.hasFeatureAccess(freeUser.id, 'unlimited_resumes'),
      }

      expect(features).toEqual({
        ai_polish: false,
        ai_cover_letter: false,
        ats_score: false,
        all_templates: false,
        unlimited_resumes: false,
      })
    })

    it('should return correct feature matrix for QUICK BOOST', async () => {
      const features = {
        ai_polish: await subscriptionService.hasFeatureAccess(quickBoostUser.id, 'ai_polish'),
        ai_cover_letter: await subscriptionService.hasFeatureAccess(quickBoostUser.id, 'ai_cover_letter'),
        ats_score: await subscriptionService.hasFeatureAccess(quickBoostUser.id, 'ats_score'),
        all_templates: await subscriptionService.hasFeatureAccess(quickBoostUser.id, 'all_templates'),
        unlimited_resumes: await subscriptionService.hasFeatureAccess(quickBoostUser.id, 'unlimited_resumes'),
      }

      expect(features).toEqual({
        ai_polish: true,
        ai_cover_letter: false,
        ats_score: false,
        all_templates: true,
        unlimited_resumes: false,
      })
    })

    it('should return correct feature matrix for BASIC', async () => {
      const features = {
        ai_polish: await subscriptionService.hasFeatureAccess(basicUser.id, 'ai_polish'),
        ai_cover_letter: await subscriptionService.hasFeatureAccess(basicUser.id, 'ai_cover_letter'),
        ats_score: await subscriptionService.hasFeatureAccess(basicUser.id, 'ats_score'),
        all_templates: await subscriptionService.hasFeatureAccess(basicUser.id, 'all_templates'),
        unlimited_resumes: await subscriptionService.hasFeatureAccess(basicUser.id, 'unlimited_resumes'),
      }

      expect(features).toEqual({
        ai_polish: true,
        ai_cover_letter: true,
        ats_score: true,
        all_templates: true,
        unlimited_resumes: false,
      })
    })

    it('should return correct feature matrix for PRO', async () => {
      const features = {
        ai_polish: await subscriptionService.hasFeatureAccess(proUser.id, 'ai_polish'),
        ai_cover_letter: await subscriptionService.hasFeatureAccess(proUser.id, 'ai_cover_letter'),
        ats_score: await subscriptionService.hasFeatureAccess(proUser.id, 'ats_score'),
        all_templates: await subscriptionService.hasFeatureAccess(proUser.id, 'all_templates'),
        unlimited_resumes: await subscriptionService.hasFeatureAccess(proUser.id, 'unlimited_resumes'),
      }

      expect(features).toEqual({
        ai_polish: true,
        ai_cover_letter: true,
        ats_score: true,
        all_templates: true,
        unlimited_resumes: true,
      })
    })
  })
})
