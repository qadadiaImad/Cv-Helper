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
      await expect(page).toHaveURL(/.*login/)
      
      // Act - Fill in login form
      await page.fill('input[name="email"]', 'john.dev@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      
      // Act - Submit form
      await page.click('button[type="submit"]')
      
      // Assert - Redirected to home/dashboard
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Assert - User is authenticated (check for user menu or logout button)
      const isAuthenticated = await page.locator('[data-testid="user-menu"]').isVisible()
        .catch(() => page.locator('text=Logout').isVisible())
        .catch(() => page.locator('text=Dashboard').isVisible())
      
      expect(isAuthenticated).toBe(true)
      
      await page.close()
    })

    it('should show error message for invalid credentials', async () => {
      // Arrange
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      
      // Act - Fill in wrong credentials
      await page.fill('input[name="email"]', 'john.dev@test.com')
      await page.fill('input[name="password"]', 'WrongPassword!')
      await page.click('button[type="submit"]')
      
      // Assert - Error message shown
      const errorMessage = await page.locator('text=/invalid credentials/i').isVisible({ timeout: 3000 })
      expect(errorMessage).toBe(true)
      
      // Assert - Still on login page
      await expect(page).toHaveURL(/.*login/)
      
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
      await page.fill('input[name="email"]', 'john.dev@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Refresh page
      await page.reload()
      
      // Assert - Still authenticated
      const isStillAuthenticated = await page.locator('[data-testid="user-menu"]').isVisible()
        .catch(() => page.locator('text=Logout').isVisible())
        .catch(() => page.locator('text=Dashboard').isVisible())
      
      expect(isStillAuthenticated).toBe(true)
      
      await page.close()
    })
  })

  describe('Logout Flow', () => {
    it('should logout user and redirect to login page', async () => {
      // Arrange - Login first
      page = await browser.newPage()
      await page.goto(`${BASE_URL}/login`)
      await page.fill('input[name="email"]', 'john.dev@test.com')
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Act - Click logout
      await page.click('text=Logout')
      
      // Assert - Redirected to login
      await page.waitForURL(/.*login/, { timeout: 5000 })
      
      // Assert - Cannot access protected routes
      await page.goto(`${BASE_URL}/dashboard/cvs`)
      await page.waitForURL(/.*login/, { timeout: 5000 })
      
      await page.close()
    })
  })

  describe('Registration Flow', () => {
    it('should register new user and redirect to home', async () => {
      // Arrange
      page = await browser.newPage()
      const uniqueEmail = `newuser-${Date.now()}@test.com`
      
      // Act - Navigate to register
      await page.goto(`${BASE_URL}/register`)
      
      // Act - Fill registration form
      await page.fill('input[name="name"]', 'New Test User')
      await page.fill('input[name="email"]', uniqueEmail)
      await page.fill('input[name="password"]', 'TestPass123!')
      await page.click('button[type="submit"]')
      
      // Assert - Redirected to home/dashboard
      await page.waitForURL(/.*dashboard|.*home|.*cvs/, { timeout: 5000 })
      
      // Assert - User is authenticated
      const isAuthenticated = await page.locator('[data-testid="user-menu"]').isVisible()
        .catch(() => page.locator('text=Logout').isVisible())
      
      expect(isAuthenticated).toBe(true)
      
      await page.close()
    })
  })
})
