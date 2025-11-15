import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import { prisma } from '../setup'
import * as bcrypt from 'bcryptjs'

/**
 * Helper function to extract text from PDF using pdfjs-dist/legacy
 * Uses the legacy build which works in Node.js without DOM dependencies
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Use legacy build for Node.js compatibility
    const pdfjsLib: any = await import('pdfjs-dist/legacy/build/pdf.mjs')
    
    // Disable worker for Node.js environment
    const uint8 = new Uint8Array(buffer)
    const loadingTask = pdfjsLib.getDocument({
      data: uint8,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    })
    
    const pdf = await loadingTask.promise

    const maxPages = Math.min(pdf.numPages, 6)
    let fullText = ''
    
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = (textContent.items || [])
        .map((it: any) => (it && it.str ? String(it.str) : ''))
        .join(' ')
      
      if (pageText.trim()) {
        fullText += (fullText ? '\n\n' : '') + pageText.trim()
      }
    }
    
    return fullText.trim()
  } catch (e) {
    console.error('PDF extraction failed:', e)
    throw e
  }
}

/**
 * Integration test for AI CV parsing functionality
 * Tests the complete flow: PDF file -> text extraction -> API -> parsed CV data
 */
describe('AI Parse Service', () => {
  const API_URL = 'http://localhost:3000/api/ai/parse'
  const PDF_PATH = path.join(process.cwd(), 'Cv_ahmad.pdf')
  const OUTPUT_PATH = path.join(__dirname, 'cv_ahmad_parsed.json')
  let authCookie: string

  beforeAll(async () => {
    // Verify test file exists
    if (!fs.existsSync(PDF_PATH)) {
      throw new Error(`Test PDF file not found at ${PDF_PATH}`)
    }

    // Create test user with PRO subscription for unlimited AI access
    const passwordHash = await bcrypt.hash('TestPass123!', 10)
    const testUser = await prisma.user.upsert({
      where: { email: 'ai-test@test.com' },
      update: {
        subscriptionStatus: 'PRO'
      },
      create: {
        name: 'AI Test User',
        email: 'ai-test@test.com',
        passwordHash,
        subscriptionStatus: 'PRO'
      }
    })

    // Create PRO subscription for the user
    await prisma.subscription.upsert({
      where: { userId: testUser.id },
      update: {
        status: 'active',
        planType: 'pro'
      },
      create: {
        userId: testUser.id,
        stripeSubscriptionId: 'sub_test_ai_parse',
        stripePriceId: 'price_test_pro',
        status: 'active',
        planType: 'pro',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        aiCreditsRemaining: 0,
        aiCreditsTotal: 0
      }
    })

    // Login to get auth cookie
    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'ai-test@test.com',
        password: 'TestPass123!'
      })
    })

    const cookies = loginResponse.headers.get('set-cookie')
    if (cookies) {
      authCookie = cookies.split(';')[0]
    }
  })

  describe('POST /api/ai/parse', () => {
    it('should successfully parse CV and return clean_cv data', async () => {
      // Read and extract text from PDF
      const fileBuffer = fs.readFileSync(PDF_PATH)
      const fileText = await extractTextFromPDF(fileBuffer)

      console.log('\n=== PDF Content Analysis ===')
      console.log(`Text length: ${fileText.length} characters`)
      console.log(`First 300 chars: ${fileText.substring(0, 300)}`)
      console.log(`Contains readable text: ${/[a-zA-Z]{3,}/.test(fileText)}`)
      console.log('===========================\n')

      expect(fileText.length).toBeGreaterThan(0)

      // Call AI parse API with authentication
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': authCookie,
        },
        body: JSON.stringify({
          cv_text: fileText,
        }),
      })

      // Log response for debugging
      console.log(`Response status: ${response.status} ${response.statusText}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', JSON.stringify(errorData, null, 2))
      }

      expect(response.ok).toBe(true)
      expect(response.status).toBe(200)

      // Parse response
      const data = await response.json()
      console.log('API Response keys:', Object.keys(data))

      // Verify response structure
      expect(data).toBeDefined()
      expect(data.success).toBe(true)
      expect(data.clean_cv).toBeDefined()
      expect(data.creditsRemaining).toBeDefined()

      // Verify clean_cv structure
      expect(data.clean_cv).toHaveProperty('metadata')
      expect(data.clean_cv).toHaveProperty('header')
      expect(data.clean_cv).toHaveProperty('experience')
      expect(data.clean_cv).toHaveProperty('education')

      // Verify metadata
      expect(data.clean_cv.metadata).toHaveProperty('language')
      expect(data.clean_cv.metadata.language).toBeTruthy()

      // Verify header contains at least some data
      expect(data.clean_cv.header).toBeDefined()
      
      // Save parsed CV to JSON file for inspection
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data.clean_cv, null, 2), 'utf-8')
      
      console.log('\n📊 Parsed CV Summary:')
      console.log(`   - Name: ${data.clean_cv.header.fullName || 'N/A'}`)
      console.log(`   - Phone: ${data.clean_cv.header.phone || 'N/A'}`)
      console.log(`   - Email: ${data.clean_cv.header.email || 'N/A'}`)
      console.log(`   - Experience entries: ${data.clean_cv.experience?.length || 0}`)
      console.log(`   - Education entries: ${data.clean_cv.education?.length || 0}`)
      console.log(`   - Language: ${data.clean_cv.metadata.language}`)
      console.log(`   - Credits remaining: ${data.creditsRemaining}`)
    }, 30000) // 30 second timeout for AI processing

    it('should return error for empty cv_text', async () => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv_text: '',
        }),
      })

      expect(response.ok).toBe(false)
      expect(response.status).toBeGreaterThanOrEqual(400)
    })

    it('should return error for missing cv_text', async () => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      expect(response.ok).toBe(false)
      expect(response.status).toBeGreaterThanOrEqual(400)
    })

    it('should handle malformed JSON', async () => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      })

      expect(response.ok).toBe(false)
      expect(response.status).toBeGreaterThanOrEqual(400)
    })
  })

  describe('Parsed CV Data Structure', () => {
    let parsedCV: any

    beforeAll(async () => {
      // Parse CV once for all structure tests
      const fileBuffer = fs.readFileSync(PDF_PATH)
      const fileText = await extractTextFromPDF(fileBuffer)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': authCookie,
        },
        body: JSON.stringify({
          cv_text: fileText,
        }),
      })

      const data = await response.json()
      parsedCV = data.clean_cv
    }, 30000)

    it('should have valid metadata structure', () => {
      expect(parsedCV.metadata).toBeDefined()
      expect(parsedCV.metadata).toHaveProperty('language')
      expect(parsedCV.metadata).toHaveProperty('sourceOrderPreserved')
      expect(typeof parsedCV.metadata.language).toBe('string')
      expect(typeof parsedCV.metadata.sourceOrderPreserved).toBe('boolean')
    })

    it('should have valid header structure', () => {
      expect(parsedCV.header).toBeDefined()
      expect(parsedCV.header).toHaveProperty('fullName')
      
      // At least one contact method should be present
      const hasContact = 
        parsedCV.header.phone || 
        parsedCV.header.email || 
        parsedCV.header.links
      expect(hasContact).toBeTruthy()
    })

    it('should have experience array', () => {
      expect(parsedCV.experience).toBeDefined()
      expect(Array.isArray(parsedCV.experience)).toBe(true)
    })

    it('should have education array', () => {
      expect(parsedCV.education).toBeDefined()
      expect(Array.isArray(parsedCV.education)).toBe(true)
    })

    it('should match expected CV data from Cv_ahmad.pdf', () => {
      // Verify specific data from the actual PDF
      expect(parsedCV.header.fullName).toContain('Ahmad')
      expect(parsedCV.header.phone).toBeTruthy() // Phone exists
      expect(parsedCV.header.email).toContain('@') // Email exists
      
      // Should have experience and education
      expect(parsedCV.experience.length).toBeGreaterThan(0)
      expect(parsedCV.education.length).toBeGreaterThan(0)
    })
  })
})
