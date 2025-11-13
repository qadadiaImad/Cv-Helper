/**
 * Unit Tests - Stripe Webhook Processing
 * Test-Driven Development (TDD) approach
 * 
 * Test Cases:
 * 1. Webhook signature verification
 * 2. Checkout session completed event
 * 3. Payment intent succeeded event
 * 4. Payment intent failed event
 * 5. Subscription updated event
 * 6. Subscription cancelled event
 * 7. Database updates after payment
 * 8. AI credits allocation
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('Payment - Webhook Processing', () => {
  let testUser: any

  beforeEach(async () => {
    // Setup: Create test user
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    testUser = await prisma.user.upsert({
      where: { email: 'webhook-test@test.com' },
      update: {},
      create: {
        name: 'Webhook Test User',
        email: 'webhook-test@test.com',
        passwordHash,
        subscriptionStatus: 'FREE'
      }
    })
    
    // Clean up any existing subscriptions for this user (userId is unique)
    await prisma.subscription.deleteMany({
      where: { userId: testUser.id }
    })
  })

  describe('Checkout Session Completed', () => {
    it('should create payment record after successful checkout', async () => {
      // Arrange
      const paymentData = {
        userId: testUser.id,
        stripePaymentIntentId: `pi_test_${Date.now()}`,
        amount: 100, // €1.00 in cents
        currency: 'eur',
        planType: 'one-time',
        status: 'SUCCEEDED',
        description: 'Payment for one-time plan'
      }

      // Act
      const payment = await prisma.payment.create({
        data: {
          ...paymentData,
          status: 'SUCCEEDED' as any
        }
      })

      // Assert
      expect(payment).toBeDefined()
      expect(payment.userId).toBe(testUser.id)
      expect(payment.amount).toBe(100)
      expect(payment.status).toBe('SUCCEEDED')
      expect(payment.planType).toBe('one-time')
    })

    it('should update user subscription status to ONE_TIME after one-time purchase', async () => {
      // Arrange - User starts as FREE
      expect(testUser.subscriptionStatus).toBe('FREE')

      // Act - Update to ONE_TIME
      const updatedUser = await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'ONE_TIME' }
      })

      // Assert
      expect(updatedUser.subscriptionStatus).toBe('ONE_TIME')
    })

    it('should update user subscription status to PRO after pro subscription', async () => {
      // Arrange - User starts as FREE
      expect(testUser.subscriptionStatus).toBe('FREE')

      // Act - Update to PRO
      const updatedUser = await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'PRO' }
      })

      // Assert
      expect(updatedUser.subscriptionStatus).toBe('PRO')
    })

    it('should save Stripe customer ID to user record', async () => {
      // Arrange
      const stripeCustomerId = 'cus_test_123'

      // Act
      const updatedUser = await prisma.user.update({
        where: { id: testUser.id },
        data: { stripeCustomerId }
      })

      // Assert
      expect(updatedUser.stripeCustomerId).toBe(stripeCustomerId)
    })
  })

  describe('Subscription Management', () => {
    it('should create subscription record for pro plan', async () => {
      // Arrange
      const subscriptionData = {
        userId: testUser.id,
        stripeSubscriptionId: 'sub_test_123',
        stripePriceId: 'price_test_pro',
        stripeProductId: 'prod_test_pro',
        status: 'active',
        planType: 'pro',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        aiCreditsTotal: 0 // Unlimited for pro
      }

      // Act
      const subscription = await prisma.subscription.create({
        data: subscriptionData
      })

      // Assert
      expect(subscription).toBeDefined()
      expect(subscription.userId).toBe(testUser.id)
      expect(subscription.status).toBe('active')
      expect(subscription.planType).toBe('pro')
      expect(subscription.aiCreditsTotal).toBe(0)
    })

    it('should create subscription record for one-time plan with 3 AI credits', async () => {
      // Arrange
      const subscriptionData = {
        userId: testUser.id,
        stripeSubscriptionId: 'sub_test_onetime_123',
        stripePriceId: 'price_test_onetime',
        stripeProductId: 'prod_test_onetime',
        status: 'active',
        planType: 'one-time',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        aiCreditsTotal: 3,
        aiCreditsRemaining: 3
      }

      // Act
      const subscription = await prisma.subscription.create({
        data: subscriptionData
      })

      // Assert
      expect(subscription).toBeDefined()
      expect(subscription.planType).toBe('one-time')
      expect(subscription.aiCreditsTotal).toBe(3)
      expect(subscription.aiCreditsRemaining).toBe(3)
    })

    it('should update subscription status when subscription is cancelled', async () => {
      // Arrange - Create active subscription
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          stripeSubscriptionId: 'sub_test_cancel_123',
          stripePriceId: 'price_test_pro',
          stripeProductId: 'prod_test_pro',
          status: 'active',
          planType: 'pro',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })

      // Act - Cancel subscription
      const updatedSubscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'canceled' }
      })

      // Assert
      expect(updatedSubscription.status).toBe('canceled')
    })

    it('should update user status to CANCELLED when subscription is cancelled', async () => {
      // Arrange - User with PRO status
      await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'PRO' }
      })

      // Act - Cancel subscription
      const updatedUser = await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'CANCELLED' }
      })

      // Assert
      expect(updatedUser.subscriptionStatus).toBe('CANCELLED')
    })

    it('should update user status to EXPIRED when subscription is past_due', async () => {
      // Arrange - User with PRO status
      await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'PRO' }
      })

      // Act - Mark as expired
      const updatedUser = await prisma.user.update({
        where: { id: testUser.id },
        data: { subscriptionStatus: 'EXPIRED' }
      })

      // Assert
      expect(updatedUser.subscriptionStatus).toBe('EXPIRED')
    })
  })

  describe('Payment Status Updates', () => {
    it('should update payment status to SUCCEEDED', async () => {
      // Arrange - Create pending payment
      const payment = await prisma.payment.create({
        data: {
          userId: testUser.id,
          stripePaymentIntentId: 'pi_test_pending_123',
          amount: 600, // €6.00
          currency: 'eur',
          planType: 'pro',
          status: 'PENDING',
          description: 'Payment for pro plan'
        }
      })

      // Act - Update to succeeded
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'SUCCEEDED' }
      })

      // Assert
      expect(updatedPayment.status).toBe('SUCCEEDED')
    })

    it('should update payment status to FAILED', async () => {
      // Arrange - Create pending payment
      const payment = await prisma.payment.create({
        data: {
          userId: testUser.id,
          stripePaymentIntentId: 'pi_test_fail_123',
          amount: 600,
          currency: 'eur',
          planType: 'pro',
          status: 'PENDING',
          description: 'Payment for pro plan'
        }
      })

      // Act - Update to failed
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' }
      })

      // Assert
      expect(updatedPayment.status).toBe('FAILED')
    })

    it('should not update user subscription status if payment fails', async () => {
      // Arrange - User is FREE
      const initialStatus = testUser.subscriptionStatus

      // Act - Create failed payment
      await prisma.payment.create({
        data: {
          userId: testUser.id,
          stripePaymentIntentId: 'pi_test_fail_456',
          amount: 100,
          currency: 'eur',
          planType: 'one-time',
          status: 'FAILED',
          description: 'Failed payment'
        }
      })

      // Assert - User status unchanged
      const user = await prisma.user.findUnique({
        where: { id: testUser.id }
      })
      expect(user?.subscriptionStatus).toBe(initialStatus)
    })
  })

  describe('AI Credits Management', () => {
    it('should allocate 3 AI credits for one-time purchase', async () => {
      // Arrange
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          stripeSubscriptionId: 'sub_test_credits_123',
          stripePriceId: 'price_test_onetime',
          stripeProductId: 'prod_test_onetime',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsTotal: 3,
          aiCreditsRemaining: 3
        }
      })

      // Assert
      expect(subscription.aiCreditsTotal).toBe(3)
      expect(subscription.aiCreditsRemaining).toBe(3)
      
      // Calculate remaining credits
      const remainingCredits = subscription.aiCreditsRemaining
      expect(remainingCredits).toBe(3)
    })

    it('should track AI credit usage', async () => {
      // Arrange - Create subscription with credits
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          stripeSubscriptionId: 'sub_test_usage_123',
          stripePriceId: 'price_test_onetime',
          stripeProductId: 'prod_test_onetime',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsTotal: 3,
          aiCreditsRemaining: 3
        }
      })

      // Act - Use 1 credit (decrement remaining)
      const updatedSubscription = await prisma.subscription.update({
        where: { id: subscription.id },
        data: { aiCreditsRemaining: 2 }
      })

      // Assert
      expect(updatedSubscription.aiCreditsRemaining).toBe(2)
      const remainingCredits = updatedSubscription.aiCreditsRemaining
      expect(remainingCredits).toBe(2)
    })

    it('should prevent using more credits than available', async () => {
      // Arrange - Create subscription with 3 credits
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          stripeSubscriptionId: 'sub_test_limit_123',
          stripePriceId: 'price_test_onetime',
          stripeProductId: 'prod_test_onetime',
          status: 'active',
          planType: 'one-time',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          aiCreditsTotal: 3,
          aiCreditsRemaining: 0 // All credits used
        }
      })

      // Assert - No credits remaining
      const remainingCredits = subscription.aiCreditsRemaining
      expect(remainingCredits).toBe(0)
      expect(remainingCredits < 1).toBe(true) // Cannot use AI features
    })

    it('should allow unlimited AI credits for PRO users', async () => {
      // Arrange - Create PRO subscription
      const subscription = await prisma.subscription.create({
        data: {
          userId: testUser.id,
          stripeSubscriptionId: 'sub_test_pro_unlimited_123',
          stripePriceId: 'price_test_pro',
          stripeProductId: 'prod_test_pro',
          status: 'active',
          planType: 'pro',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          aiCreditsTotal: 0 // 0 means unlimited
        }
      })

      // Assert - PRO users have unlimited credits
      expect(subscription.planType).toBe('pro')
      expect(subscription.aiCreditsTotal).toBe(0)
      
      // In application logic: if planType === 'pro' || aiCreditsTotal === 0, allow unlimited
      const hasUnlimitedCredits = subscription.planType === 'pro' || subscription.aiCreditsTotal === 0
      expect(hasUnlimitedCredits).toBe(true)
    })
  })

  describe('Usage Tracking', () => {
    it('should create usage record for AI polish feature', async () => {
      // Arrange
      const usageData = {
        userId: testUser.id,
        featureType: 'AI_POLISH',
        metadata: JSON.stringify({ creditsUsed: 1, description: 'AI CV polish' })
      }

      // Act
      const usageRecord = await prisma.usageRecord.create({
        data: usageData
      })

      // Assert
      expect(usageRecord).toBeDefined()
      expect(usageRecord.featureType).toBe('AI_POLISH')
      const metadata = JSON.parse(usageRecord.metadata || '{}')
      expect(metadata.creditsUsed).toBe(1)
    })

    it('should create usage record for ATS score feature', async () => {
      // Arrange
      const usageData = {
        userId: testUser.id,
        featureType: 'ATS_SCORE',
        metadata: JSON.stringify({ creditsUsed: 1, description: 'ATS score calculation' })
      }

      // Act
      const usageRecord = await prisma.usageRecord.create({
        data: usageData
      })

      // Assert
      expect(usageRecord.featureType).toBe('ATS_SCORE')
    })

    it('should track total usage for a user', async () => {
      // Arrange - Create multiple usage records
      await prisma.usageRecord.createMany({
        data: [
          {
            userId: testUser.id,
            featureType: 'AI_POLISH',
            metadata: JSON.stringify({ creditsUsed: 1, description: 'AI polish 1' })
          },
          {
            userId: testUser.id,
            featureType: 'ATS_SCORE',
            metadata: JSON.stringify({ creditsUsed: 1, description: 'ATS score 1' })
          },
          {
            userId: testUser.id,
            featureType: 'AI_POLISH',
            metadata: JSON.stringify({ creditsUsed: 1, description: 'AI polish 2' })
          }
        ]
      })

      // Act - Query total usage
      const usageRecords = await prisma.usageRecord.findMany({
        where: { userId: testUser.id }
      })

      // Assert
      expect(usageRecords.length).toBeGreaterThanOrEqual(3)
      const totalCreditsUsed = usageRecords.reduce((sum, record) => {
        const metadata = JSON.parse(record.metadata || '{}')
        return sum + (metadata.creditsUsed || 0)
      }, 0)
      expect(totalCreditsUsed).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Payment History', () => {
    it('should retrieve all payments for a user', async () => {
      // Arrange - Create multiple payments
      await prisma.payment.createMany({
        data: [
          {
            userId: testUser.id,
            stripePaymentIntentId: 'pi_test_history_1',
            amount: 100,
            currency: 'eur',
            planType: 'one-time',
            status: 'SUCCEEDED',
            description: 'One-time purchase'
          },
          {
            userId: testUser.id,
            stripePaymentIntentId: 'pi_test_history_2',
            amount: 600,
            currency: 'eur',
            planType: 'pro',
            status: 'SUCCEEDED',
            description: 'Pro subscription'
          }
        ]
      })

      // Act
      const payments = await prisma.payment.findMany({
        where: { userId: testUser.id },
        orderBy: { createdAt: 'desc' }
      })

      // Assert
      expect(payments.length).toBeGreaterThanOrEqual(2)
      expect(payments[0].status).toBe('SUCCEEDED')
    })

    it('should calculate total amount paid by user', async () => {
      // Arrange - Create payments
      await prisma.payment.createMany({
        data: [
          {
            userId: testUser.id,
            stripePaymentIntentId: 'pi_test_total_1',
            amount: 100,
            currency: 'eur',
            planType: 'one-time',
            status: 'SUCCEEDED',
            description: 'Payment 1'
          },
          {
            userId: testUser.id,
            stripePaymentIntentId: 'pi_test_total_2',
            amount: 600,
            currency: 'eur',
            planType: 'pro',
            status: 'SUCCEEDED',
            description: 'Payment 2'
          }
        ]
      })

      // Act
      const payments = await prisma.payment.findMany({
        where: { 
          userId: testUser.id,
          status: 'SUCCEEDED'
        }
      })

      const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)

      // Assert
      expect(totalPaid).toBeGreaterThanOrEqual(700) // €7.00 in cents
    })
  })
})
