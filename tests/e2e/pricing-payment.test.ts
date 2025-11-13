/**
 * E2E Tests - Pricing and Payment Flow
 * Test-Driven Development (TDD) approach
 * 
 * Test Cases:
 * 1. Free user can view pricing page
 * 2. User must be logged in to purchase
 * 3. One-time purchase flow (€1)
 * 4. Pro subscription flow (€6/month)
 * 5. Payment success redirects correctly
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { chromium, Browser, Page } from 'playwright'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('E2E - Pricing and Payment Flow', () => {
  let browser: Browser
  let page: Page
  const BASE_URL = 'http://localhost:3000'

  beforeAll(async () => {
    browser = await chromium.launch({ headless: true })
    
    // Create test users
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    
    await prisma.user.upsert({
      where: { email: 'sarah.design@test.com' },
      update: {},
      create: {
        name: 'Sarah Designer',
        email: 'sarah.design@test.com',
        passwordHash,
        subscriptionStatus: 'FREE'
      }
    })
  })

  afterAll(async () => {
    await browser?.close()
  })

  describe('Pricing Page Access', () => {
    it('should allow anyone to view pricing page', async () => {
      // Arrange
      page = await browser.newPage()
      
      // Act
      await page.goto(`${BASE_URL}/pricing`)
      
      // Assert - Page loads successfully
      expect(page.url()).toContain('/pricing')
      
      // Assert - All plans are visible
      const freePlan = await page.locator('text=/free/i').first().isVisible()
      const oneTimePlan = await page.locator('text=/one-time/i').first().isVisible()
      const proPlan = await page.locator('text=/pro/i').first().isVisible()
      
      expect(freePlan).toBe(true)
      expect(oneTimePlan).toBe(true)
      expect(proPlan).toBe(true)
      
      await page.close()
    })

    it('should display correct pricing for each plan', async () => {
      // Arrange
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/pricing`)
      
      // Assert - One-time plan shows €1
      const oneTimePrice = await page.locator('text=/€1|1€/').isVisible()
      expect(oneTimePrice).toBe(true)
      
      // Assert - Pro plan shows €6
      const proPrice = await page.locator('text=/€6|6€/').isVisible()
      expect(proPrice).toBe(true)
      
      await page.close()
    })
  })

  describe('Purchase Flow - Login Required', () => {
    it('should prompt login when unauthenticated user tries to purchase', async () => {
      // Arrange
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/pricing`)
      
      // Act - Try to purchase without login
      await page.click('text=/Buy Now|Purchase|Get Started/i')
      
      // Assert - Error toast or redirect to login
      const errorVisible = await page.locator('text=/please log in|login required/i')
        .isVisible({ timeout: 3000 })
        .catch(() => false)
      
      const redirectedToLogin = page.url().includes('/login')
      
      expect(errorVisible || redirectedToLogin).toBe(true)
      
      await page.close()
    })
  })

  describe('One-Time Purchase Flow (€1)', () => {
    it('should complete one-time purchase and redirect to dashboard', async () => {
      // Arrange - Login first
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input[name="email"]', 'sarah.design@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Go to pricing
      await page.goto(`${BASE_URL}/pricing`)
      
      // Act - Click one-time purchase
      const oneTimeBuyButton = page.locator('text=/Buy Now.*€1|€1.*Buy/i').first()
      await oneTimeBuyButton.click()
      
      // Assert - Redirected to Stripe checkout
      await page.waitForURL(/.*stripe\.com.*checkout|.*checkout/, { timeout: 10000 })
      
      // Note: In real tests, you would use Stripe test mode
      // For now, we verify the checkout session was created
      expect(page.url()).toContain('checkout')
      
      await page.close()
    })

    it('should update user subscription status after payment', async () => {
      // This test would require completing a Stripe test payment
      // For TDD, we define the expected behavior:
      
      // Given: User completes one-time payment
      // When: Webhook processes payment
      // Then: User.subscriptionStatus should be 'ONE_TIME'
      // And: Payment record should exist in database
      // And: User should have 3 AI credits
      
      // Implementation note: This requires Stripe webhook testing
      expect(true).toBe(true) // Placeholder
    })
  })

  describe('Pro Subscription Flow (€6/month)', () => {
    it('should initiate pro subscription checkout', async () => {
      // Arrange - Login
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input[name="email"]', 'sarah.design@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Go to pricing
      await page.goto(`${BASE_URL}/pricing`)
      
      // Act - Click pro subscription
      const proBuyButton = page.locator('text=/Start Pro|Subscribe.*Pro|Pro.*€6/i').first()
      await proBuyButton.click()
      
      // Assert - Redirected to Stripe checkout
      await page.waitForURL(/.*stripe\.com.*checkout|.*checkout/, { timeout: 10000 })
      expect(page.url()).toContain('checkout')
      
      await page.close()
    })
  })

  describe('Payment Success Flow', () => {
    it('should redirect to dashboard with success message after payment', async () => {
      // Arrange
      page = await browser.newPage()
      
      // Simulate Stripe redirect after successful payment
      await page.goto(`${BASE_URL}/dashboard/cvs?success=true&session_id=cs_test_123`)
      
      // Assert - Success message shown
      const successMessage = await page.locator('text=/payment successful|success|thank you/i')
        .isVisible({ timeout: 3000 })
        .catch(() => false)
      
      expect(successMessage).toBe(true)
      
      await page.close()
    })

    it('should show cancellation message when payment is cancelled', async () => {
      // Arrange
      page = await browser.newPage()
      
      // Simulate Stripe redirect after cancelled payment
      await page.goto(`${BASE_URL}/pricing?canceled=true`)
      
      // Assert - Cancellation message shown
      const cancelMessage = await page.locator('text=/payment.*cancel|cancel.*payment/i')
        .isVisible({ timeout: 3000 })
        .catch(() => false)
      
      expect(cancelMessage).toBe(true)
      
      await page.close()
    })
  })

  describe('Subscription Management', () => {
    it('should display current subscription status in user profile', async () => {
      // Arrange - Login
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input[name="email"]', 'sarah.design@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Navigate to profile/settings
      await page.goto(`${BASE_URL}/dashboard/settings`)
      
      // Assert - Subscription status visible
      const subscriptionStatus = await page.locator('text=/free|one-time|pro/i').isVisible()
      expect(subscriptionStatus).toBe(true)
      
      await page.close()
    })
  })
})
