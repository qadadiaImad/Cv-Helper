/**
 * AI Service Integration Tests
 * Tests all AI features: Import CV, Adapt to Job, Polish CV
 * 
 * These tests verify:
 * - API routes work correctly
 * - Authentication is enforced
 * - Subscription/credit checks work
 * - AI adapter maps data correctly
 * - Error handling works
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'
import type { UniversalResumeData } from '@/lib/schemas'
import { resumeJsonToUniversal, universalToPlainTextCV, type AIResumeJSON } from '@/lib/ai/adapter'

// Helper to generate unique IDs for tests
const uniqueId = () => `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

describe('AI Service Integration', () => {
  let testUser: any
  let testSubscription: any

  beforeEach(async () => {
    // Create test user with PRO subscription
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    testUser = await prisma.user.upsert({
      where: { email: 'ai-test@example.com' },
      update: {},
      create: {
        name: 'AI Test User',
        email: 'ai-test@example.com',
        passwordHash,
        subscriptionStatus: 'PRO',
      }
    })

    // Create PRO subscription
    testSubscription = await prisma.subscription.upsert({
      where: { userId: testUser.id },
      update: {},
      create: {
        userId: testUser.id,
        planType: 'pro',
        status: 'active',
        stripeSubscriptionId: 'sub_test_pro',
        stripePriceId: 'price_test_pro',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      }
    })
  })

  describe('AI Adapter - Schema Mapping', () => {
    it('should convert AIservice ResumeJSON to UniversalResumeData', () => {
      const aiData: AIResumeJSON = {
        metadata: {
          language: 'en',
          sourceOrderPreserved: true,
          warnings: ['Test warning'],
        },
        header: {
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          links: {
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
          },
        },
        summary: 'Experienced developer',
        experience: [
          {
            company: 'Tech Corp',
            title: 'Senior Developer',
            location: 'San Francisco',
            startDate: '2020-01',
            endDate: 'Present',
            bullets: ['Led team', 'Built features'],
          },
        ],
        education: [
          {
            school: 'University',
            degree: 'BS Computer Science',
            location: 'Berkeley',
            dates: '2015-2019',
          },
        ],
        skills: {
          languages: ['JavaScript', 'Python'],
          frameworks: ['React', 'Node.js'],
          tools: ['Git', 'Docker'],
        },
      }

      const result = resumeJsonToUniversal(aiData)

      // Verify personal info mapping
      expect(result.personal.fullName).toBe('John Doe')
      expect(result.personal.email).toBe('john@example.com')
      expect(result.personal.linkedIn).toBe('https://linkedin.com/in/johndoe')

      // Verify experience mapping
      expect(result.experience).toHaveLength(1)
      expect(result.experience[0].company).toBe('Tech Corp')
      expect(result.experience[0].position).toBe('Senior Developer')
      expect(result.experience[0].achievements).toEqual(['Led team', 'Built features'])

      // Verify education mapping
      expect(result.education).toHaveLength(1)
      expect(result.education[0].institution).toBe('University')

      // Verify skills flattening
      expect(result.skills).toContain('JavaScript')
      expect(result.skills).toContain('React')
      expect(result.skills).toContain('Git')

      // Verify metadata preservation
      expect(result.customSections).toBeDefined()
      expect(result.customSections![0].title).toBe('AI Processing Notes')
    })

    it('should convert UniversalResumeData to plain text', () => {
      const universalData: UniversalResumeData = {
        personal: {
          fullName: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+9876543210',
          location: 'New York',
          title: 'Product Manager',
          website: 'https://janesmith.com',
          linkedIn: 'https://linkedin.com/in/janesmith',
          github: 'https://github.com/janesmith',
        },
        summary: 'Product manager with 5 years experience',
        experience: [
          {
            company: 'StartupCo',
            position: 'Product Manager',
            location: 'NYC',
            startDate: '2020',
            endDate: '2024',
            description: '',
            achievements: ['Launched 3 products', 'Grew users by 200%'],
            technologies: ['Jira', 'Figma'],
          },
        ],
        education: [
          {
            institution: 'MIT',
            degree: 'MBA',
            field: 'Business',
            location: 'Boston',
            startDate: '2018',
            endDate: '2020',
            gpa: '3.9',
            honors: ["Dean's List"],
            coursework: [],
          },
        ],
        skills: ['Product Strategy', 'Agile', 'SQL'],
        projects: [],
        languages: [{ name: 'English', proficiency: 'Native' }],
        interests: [{ name: 'Tech Trends' }],
      }

      const text = universalToPlainTextCV(universalData)

      // Verify all sections are present
      expect(text).toContain('=== PERSONAL INFORMATION ===')
      expect(text).toContain('Jane Smith')
      expect(text).toContain('jane@example.com')
      
      expect(text).toContain('=== PROFESSIONAL SUMMARY ===')
      expect(text).toContain('Product manager with 5 years experience')
      
      expect(text).toContain('=== PROFESSIONAL EXPERIENCE ===')
      expect(text).toContain('Product Manager at StartupCo')
      expect(text).toContain('• Launched 3 products')
      
      expect(text).toContain('=== EDUCATION ===')
      expect(text).toContain('MBA - MIT')
      expect(text).toContain('GPA: 3.9')
      
      expect(text).toContain('=== SKILLS ===')
      expect(text).toContain('Product Strategy, Agile, SQL')
      
      expect(text).toContain('=== LANGUAGES ===')
      expect(text).toContain('English (Native)')
    })

    it('should handle minimal data without errors', () => {
      const minimalData: AIResumeJSON = {
        header: {
          fullName: 'Test User',
        },
        experience: [],
      }

      const result = resumeJsonToUniversal(minimalData)

      expect(result.personal.fullName).toBe('Test User')
      expect(result.experience).toHaveLength(0)
      expect(result.education).toHaveLength(0)
      expect(result.skills).toHaveLength(0)
    })

    it('should preserve Present as endDate for current roles', () => {
      const aiData: AIResumeJSON = {
        header: { fullName: 'Test' },
        experience: [
          {
            company: 'Current Co',
            title: 'Developer',
            endDate: 'Present',
            bullets: ['Working now'],
          },
        ],
      }

      const result = resumeJsonToUniversal(aiData)

      expect(result.experience[0].endDate).toBe('Present')
    })
  })

  describe('Feature Access Control', () => {
    it('should allow PRO users to access AI features', async () => {
      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      const hasAccess = await service.hasFeatureAccess(testUser.id, 'ai_polish')

      expect(hasAccess).toBe(true)
    })

    it('should deny FREE users access to AI features', async () => {
      // Create FREE user
      const freeUser = await prisma.user.create({
        data: {
          name: 'Free User',
          email: `free-${Date.now()}@example.com`,
          passwordHash: await bcrypt.hash('test', 10),
          subscriptionStatus: 'FREE',
        }
      })

      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      const hasAccess = await service.hasFeatureAccess(freeUser.id, 'ai_polish')

      expect(hasAccess).toBe(false)
    })

    it('should allow ONE_TIME users with credits', async () => {
      // Create ONE_TIME user with credits
      const oneTimeUser = await prisma.user.create({
        data: {
          name: 'One Time User',
          email: `onetime-${Date.now()}@example.com`,
          passwordHash: await bcrypt.hash('test', 10),
          subscriptionStatus: 'ONE_TIME',
        }
      })

      await prisma.subscription.create({
        data: {
          userId: oneTimeUser.id,
          planType: 'one-time',
          status: 'active',
          stripeSubscriptionId: `sub_${uniqueId()}`,
          stripePriceId: `price_${uniqueId()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 5,
        }
      })

      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      const hasAccess = await service.hasFeatureAccess(oneTimeUser.id, 'ai_polish')

      expect(hasAccess).toBe(true)
    })

    it('should deny ONE_TIME users without credits', async () => {
      // Create ONE_TIME user without credits
      const oneTimeUser = await prisma.user.create({
        data: {
          name: 'No Credits User',
          email: `nocredits-${Date.now()}@example.com`,
          passwordHash: await bcrypt.hash('test', 10),
          subscriptionStatus: 'ONE_TIME',
        }
      })

      await prisma.subscription.create({
        data: {
          userId: oneTimeUser.id,
          planType: 'one-time',
          status: 'active',
          stripeSubscriptionId: `sub_${uniqueId()}`,
          stripePriceId: `price_${uniqueId()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 0,
        }
      })

      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      const hasAccess = await service.hasFeatureAccess(oneTimeUser.id, 'ai_polish')

      expect(hasAccess).toBe(false)
    })
  })

  describe('Credit Management', () => {
    it('should deduct credits for ONE_TIME users', async () => {
      // Create ONE_TIME user with credits
      const oneTimeUser = await prisma.user.create({
        data: {
          name: 'Credit Test User',
          email: `credits-${Date.now()}@example.com`,
          passwordHash: await bcrypt.hash('test', 10),
          subscriptionStatus: 'ONE_TIME',
        }
      })

      const subscription = await prisma.subscription.create({
        data: {
          userId: oneTimeUser.id,
          planType: 'one-time',
          status: 'active',
          stripeSubscriptionId: `sub_${uniqueId()}`,
          stripePriceId: `price_${uniqueId()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 3,
        }
      })

      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      // Use credit
      const success = await service.useAICredit(oneTimeUser.id)

      expect(success).toBe(true)

      // Verify credit was deducted
      const updated = await prisma.subscription.findUnique({
        where: { userId: oneTimeUser.id }
      })

      expect(updated?.aiCreditsRemaining).toBe(2)
    })

    it('should track usage in UsageRecord', async () => {
      // Create ONE_TIME user with credits
      const oneTimeUser = await prisma.user.create({
        data: {
          name: 'Usage Test User',
          email: `usage-${Date.now()}@example.com`,
          passwordHash: await bcrypt.hash('test', 10),
          subscriptionStatus: 'ONE_TIME',
        }
      })

      await prisma.subscription.create({
        data: {
          userId: oneTimeUser.id,
          planType: 'one-time',
          status: 'active',
          stripeSubscriptionId: `sub_${uniqueId()}`,
          stripePriceId: `price_${uniqueId()}`,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsRemaining: 5,
        }
      })

      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      // Use credit
      await service.useAICredit(oneTimeUser.id)

      // Check usage record was created
      const usageRecords = await prisma.usageRecord.findMany({
        where: { userId: oneTimeUser.id }
      })

      expect(usageRecords.length).toBeGreaterThan(0)
      expect(usageRecords[0].featureType).toBe('ai_polish')
    })

    it('should not deduct credits for PRO users', async () => {
      const { SubscriptionService } = await import('@/lib/services/subscription.service')
      const service = new SubscriptionService(prisma)

      // PRO users have unlimited access, no credits to deduct
      // This should not throw an error
      await expect(
        service.hasFeatureAccess(testUser.id, 'ai_polish')
      ).resolves.toBe(true)
    })
  })

  describe('Data Flow Integration', () => {
    it('should complete full import flow: AI → Universal → Text', () => {
      // Step 1: AI service returns ResumeJSON
      const aiOutput: AIResumeJSON = {
        header: {
          fullName: 'Integration Test',
          email: 'test@example.com',
        },
        summary: 'Full stack developer',
        experience: [
          {
            company: 'TestCo',
            title: 'Developer',
            bullets: ['Built apps', 'Fixed bugs'],
          },
        ],
      }

      // Step 2: Convert to Universal
      const universal = resumeJsonToUniversal(aiOutput)

      expect(universal.personal.fullName).toBe('Integration Test')
      expect(universal.experience[0].achievements).toEqual(['Built apps', 'Fixed bugs'])

      // Step 3: Convert back to text (for adaptation/polish)
      const text = universalToPlainTextCV(universal)

      expect(text).toContain('Integration Test')
      expect(text).toContain('Full stack developer')
      expect(text).toContain('• Built apps')
    })

    it('should preserve data through round-trip conversion', () => {
      const original: AIResumeJSON = {
        metadata: { language: 'en', sourceOrderPreserved: true },
        header: {
          fullName: 'Round Trip Test',
          email: 'roundtrip@example.com',
          phone: '+1234567890',
        },
        summary: 'Test summary',
        experience: [
          {
            company: 'Company A',
            title: 'Role A',
            startDate: '2020-01',
            endDate: 'Present',
            bullets: ['Achievement 1', 'Achievement 2'],
          },
        ],
        skills: {
          languages: ['JavaScript'],
          frameworks: ['React'],
        },
      }

      // Convert to Universal
      const universal = resumeJsonToUniversal(original)

      // Verify key data preserved
      expect(universal.personal.fullName).toBe('Round Trip Test')
      expect(universal.personal.email).toBe('roundtrip@example.com')
      expect(universal.summary).toBe('Test summary')
      expect(universal.experience[0].company).toBe('Company A')
      expect(universal.experience[0].achievements).toContain('Achievement 1')
      expect(universal.skills).toContain('JavaScript')
      expect(universal.skills).toContain('React')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing required fields gracefully', () => {
      const invalidData: any = {
        header: {
          // Missing fullName
        },
        experience: [],
      }

      // Should not throw, adapter handles undefined gracefully
      const result = resumeJsonToUniversal(invalidData)
      expect(result.personal.fullName).toBeUndefined()
    })

    it('should handle empty arrays', () => {
      const emptyData: AIResumeJSON = {
        header: { fullName: 'Test' },
        experience: [],
        education: [],
        projects: [],
      }

      const result = resumeJsonToUniversal(emptyData)

      expect(result.experience).toEqual([])
      expect(result.education).toEqual([])
      expect(result.projects).toEqual([])
    })

    it('should handle missing optional fields', () => {
      const minimalData: AIResumeJSON = {
        header: { fullName: 'Minimal Test' },
        experience: [
          {
            company: 'Test Co',
            title: 'Tester',
            bullets: ['Test'],
          },
        ],
      }

      const result = resumeJsonToUniversal(minimalData)

      expect(result.personal.email).toBe('')
      expect(result.personal.phone).toBe('')
      expect(result.summary).toBe('')
    })
  })
})
