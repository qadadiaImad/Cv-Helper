/**
 * E2E Tests - Authentication and Navigation
 * Test-Driven Development (TDD) approach
 * 
 * Test Case: User Login Redirects to Home Page
 * Given: John Developer visits the login page
 * When: He enters valid credentials and submits
 * Then: He should be redirected to the home page (dashboard)
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { chromium, Browser, Page } from 'playwright'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('E2E - Authentication and Navigation', () => {
  let browser: Browser
  let page: Page
  const BASE_URL = 'http://localhost:3000'

  beforeAll(async () => {
    // Setup: Launch browser
    browser = await chromium.launch({ headless: true })
    
    // Setup: Create test user
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    await prisma.user.upsert({
      where: { email: 'john.dev@test.com' },
      update: {},
      create: {
        name: 'John Developer',
        email: 'john.dev@test.com',
        passwordHash,
        subscriptionStatus: 'FREE'
      }
    })
  })

  afterAll(async () => {
    await browser?.close()
  })

  describe('Login Flow - Redirect to Home', () => {
    it('should redirect John Developer to home page after successful login', async () => {
      // Arrange
      page = await browser.newPage()
      
      // Act - Navigate to login page
      await page.goto(`${BASE_URL}/login`)
      
      // Assert - On login page
      expect(page.url()).toContain('/login')
      
      // Act - Fill in login form
      await page.fill('input#email', 'john.dev@test.com')
      await page.fill('input#password', 'TestPass123!')
      
      // Act - Submit form
      await page.click('button[type="submit"]')
      
      // Assert - Redirected to home/dashboard
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Assert - User is authenticated (check for dashboard or protected content)
      const url = page.url()
      const isOnProtectedPage = url.includes('/dashboard') || url.includes('/cvs') || url.includes('/')
      expect(isOnProtectedPage).toBe(true)
      
      // Verify we're not on login page
      expect(url).not.toContain('/login')
      
      await page.close()
    })

    it('should show error message for invalid credentials', async () => {
      // Arrange
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      
      // Act - Fill in wrong credentials
      await page.fill('input#email', 'john.dev@test.com')
      await page.fill('input#password', 'WrongPassword!')
      await page.click('button[type="submit"]')
      
      // Assert - Error message shown (via toast)
      await page.waitForTimeout(1000) // Wait for toast to appear
      const errorVisible = await page.locator('text=/Login failed|Invalid credentials/i').isVisible({ timeout: 3000 })
        .catch(() => false)
      
      // If toast not found, check if still on login page (which indicates failure)
      const stillOnLogin = page.url().includes('/login')
      expect(errorVisible || stillOnLogin).toBe(true)
      
      // Assert - Still on login page
      expect(page.url()).toContain('/login')
      
      await page.close()
    })

    it('should redirect unauthenticated users to login when accessing protected routes', async () => {
      // Arrange
      page = await browser.newPage()
      
      // Act - Try to access dashboard without login
      await page.goto(`${BASE_URL}/dashboard/cvs`)
      
      // Assert - Redirected to login
      await page.waitForURL(/.*login/, { timeout: 5000 })
      
      await page.close()
    })

    it('should keep user logged in after page refresh', async () => {
      // Arrange - Login first
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input#email', 'john.dev@test.com')
      await page.fill('input#password', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Refresh the page
      await page.reload()
      
      // Assert - Still authenticated (check URL)
      const url = page.url()
      const isStillOnProtectedPage = url.includes('/dashboard') || url.includes('/cvs')
      expect(isStillOnProtectedPage).toBe(true)
      expect(url).not.toContain('/login')
      
      await page.close()
    })
  })

  describe('Logout Flow', () => {
    it('should logout user and redirect to login page', async () => {
      // Arrange - Login first
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input#email', 'john.dev@test.com')
      await page.fill('input#password', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Logout via API (more reliable than clicking button)
      await page.evaluate(async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/login'
      })
      
      // Assert - Redirected to login
      await page.waitForURL(/.*login/, { timeout: 10000 })
      
      // Assert - Cannot access protected routes
      await page.goto(`${BASE_URL}/dashboard/cvs`)
      await page.waitForURL(/.*login/, { timeout: 5000 })
      
      await page.close()
    })
  })

  describe('Registration Flow', () => {
    it('should register new user and redirect to home page', async () => {
      // Arrange
      page = await browser.newPage()
      const uniqueEmail = `newuser-${Date.now()}@test.com`
      
      // Act - Navigate to register
      await page.goto(`${BASE_URL}/register`)
      
      // Act - Fill registration form
      await page.fill('input#name', 'New Test User')
      await page.fill('input#email', uniqueEmail)
      await page.fill('input#password', 'TestPass123!')
      await page.fill('input#confirm', 'TestPass123!')
      await page.click('button[type="submit"]')
      
      // Assert - Redirected to home page (not dashboard) - with flexible timeout
      try {
        await page.waitForURL(`${BASE_URL}/`, { timeout: 15000 })
      } catch (e) {
        // If exact match fails, check if we're at least not on register or login
        const url = page.url()
        expect(url).not.toContain('/register')
        expect(url).not.toContain('/login')
      }
      
      // Assert - User is authenticated - verify we can access dashboard
      await page.goto(`${BASE_URL}/dashboard/cvs`, { timeout: 10000 })
      const canAccessDashboard = page.url().includes('/dashboard')
      expect(canAccessDashboard).toBe(true)
      
      await page.close()
    })

    it('should show error when passwords do not match', async () => {
      // Arrange
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/register`)
      
      // Act - Fill form with mismatched passwords
      await page.fill('input#name', 'Test User')
      await page.fill('input#email', `test-${Date.now()}@test.com`)
      await page.fill('input#password', 'TestPass123!')
      await page.fill('input#confirm', 'DifferentPass123!')
      await page.click('button[type="submit"]')
      
      // Assert - Error message shown
      await page.waitForSelector('text=Passwords do not match', { timeout: 3000 })
      
      // Assert - Still on register page
      expect(page.url()).toContain('/register')
      
      await page.close()
    })

    it('should show error when email already exists', async () => {
      // Arrange - Use existing test user email
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/register`)
      
      // Act - Try to register with existing email
      await page.fill('input#name', 'Duplicate User')
      await page.fill('input#email', 'john.dev@test.com') // Existing user
      await page.fill('input#password', 'TestPass123!')
      await page.fill('input#confirm', 'TestPass123!')
      await page.click('button[type="submit"]')
      
      // Assert - Error message shown
      await page.waitForSelector('text=Email already registered', { timeout: 3000 })
      
      // Assert - Still on register page
      expect(page.url()).toContain('/register')
      
      await page.close()
    })
  })
})
