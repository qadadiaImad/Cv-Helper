/**
 * Authentication Tests - Login Flow
 * Test-Driven Development (TDD) approach
 * 
 * Test Case: User Login and Redirection
 * Given: A registered user (John Developer)
 * When: User submits valid credentials
 * Then: User should be authenticated and redirected to home page
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

describe('Authentication - Login Flow', () => {
  let testUser: any

  beforeEach(async () => {
    // Setup: Create or get test user (John Developer)
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    testUser = await prisma.user.upsert({
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

  describe('POST /api/auth/login', () => {
    it('should authenticate user with valid credentials', async () => {
      // Arrange
      const loginData = {
        email: 'john.dev@test.com',
        password: 'TestPass123!'
      }

      // Act
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      // Assert
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.user).toBeDefined()
      expect(data.user.email).toBe('john.dev@test.com')
      expect(data.user.name).toBe('John Developer')
      
      // Check that session cookie is set
      const cookies = response.headers.get('set-cookie')
      expect(cookies).toContain('session')
    })

    it('should reject login with invalid password', async () => {
      // Arrange
      const loginData = {
        email: 'john.dev@test.com',
        password: 'WrongPassword123!'
      }

      // Act
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      // Assert
      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Invalid credentials')
    })

    it('should reject login with non-existent email', async () => {
      // Arrange
      const loginData = {
        email: 'nonexistent@test.com',
        password: 'TestPass123!'
      }

      // Act
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      // Assert
      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Invalid credentials')
    })

    it('should reject login with invalid email format', async () => {
      // Arrange
      const loginData = {
        email: 'invalid-email',
        password: 'TestPass123!'
      }

      // Act
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      // Assert
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Invalid input')
    })

    it('should reject login with missing fields', async () => {
      // Arrange
      const loginData = {
        email: 'john.dev@test.com'
        // password missing
      }

      // Act
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      // Assert
      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Invalid input')
    })
  })

  describe('Session Management', () => {
    it('should create valid session after login', async () => {
      // Arrange
      const loginData = {
        email: 'john.dev@test.com',
        password: 'TestPass123!'
      }

      // Act - Login
      const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      })

      const cookies = loginResponse.headers.get('set-cookie')
      
      // Act - Verify session
      const meResponse = await fetch('http://localhost:3000/api/auth/me', {
        headers: { 'Cookie': cookies || '' }
      })

      // Assert
      expect(meResponse.status).toBe(200)
      const userData = await meResponse.json()
      expect(userData.user.email).toBe('john.dev@test.com')
    })

    it('should reject requests without valid session', async () => {
      // Act
      const response = await fetch('http://localhost:3000/api/auth/me')

      // Assert
      expect(response.status).toBe(401)
    })
  })
})
