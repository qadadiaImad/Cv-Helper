/**
 * Generate Template Thumbnails Script
 * 
 * This script uses Playwright to:
 * 1. Visit each template preview route
 * 2. Take a full-page screenshot (including scrollable content)
 * 3. Save thumbnails to public/template-thumbnails/
 * 
 * Usage: npm run generate-thumbnails
 */

import { chromium } from 'playwright'
import { mkdir, access } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Template IDs to generate thumbnails for
const TEMPLATES = [
  'atlantic_blue',
  'classic',
  'executive',
  'harvard',
  'mercury',
  'evergreen',
  'youngcurve',
]

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  outputDir: join(__dirname, '../public/template-thumbnails'),
  // Full A4 size for complete resume capture
  viewport: { width: 1240, height: 1754 },
  // Thumbnail size for gallery
  thumbnailWidth: 300,
}

async function ensureDirectoryExists(dir) {
  try {
    await access(dir)
  } catch {
    await mkdir(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
}

async function generateThumbnail(browser, templateId) {
  const page = await browser.newPage({
    viewport: CONFIG.viewport,
  })

  try {
    const url = `${CONFIG.baseUrl}/api/template-preview/${templateId}`
    console.log(`📸 Capturing ${templateId}...`)
    
    // Navigate to template preview (API route returns pure HTML)
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    })

    // Wait a bit for fonts and styles to load
    await page.waitForTimeout(1000)

    // Get the bounding box of actual content (excluding whitespace)
    const contentBox = await page.evaluate(() => {
      // Get the first child of body (the template container)
      const container = document.body.firstElementChild
      if (!container) {
        return {
          x: 0,
          y: 0,
          width: document.body.scrollWidth,
          height: document.body.scrollHeight
        }
      }
      
      // Get the bounding rectangle of the actual content
      const rect = container.getBoundingClientRect()
      
      return {
        x: rect.left,
        y: rect.top,
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height)
      }
    })

    console.log(`   Content box: ${contentBox.width}x${contentBox.height}px at (${contentBox.x}, ${contentBox.y})`)

    // Take screenshot with clip to capture only the content area
    const screenshotPath = join(CONFIG.outputDir, `${templateId}.png`)
    await page.screenshot({
      path: screenshotPath,
      type: 'png',
      clip: {
        x: contentBox.x,
        y: contentBox.y,
        width: contentBox.width,
        height: contentBox.height
      }
    })

    console.log(`   ✅ Saved: ${screenshotPath}`)

    // Generate thumbnail (same clip area)
    const thumbnailPath = join(CONFIG.outputDir, `${templateId}-thumb.png`)
    await page.screenshot({
      path: thumbnailPath,
      type: 'png',
      clip: {
        x: contentBox.x,
        y: contentBox.y,
        width: contentBox.width,
        height: contentBox.height
      }
    })

    console.log(`   ✅ Thumbnail saved: ${thumbnailPath}`)

  } catch (error) {
    console.error(`   ❌ Error capturing ${templateId}:`, error.message)
  } finally {
    await page.close()
  }
}

async function main() {
  console.log('🚀 Starting thumbnail generation...\n')
  console.log(`📍 Base URL: ${CONFIG.baseUrl}`)
  console.log(`📁 Output directory: ${CONFIG.outputDir}`)
  console.log(`📋 Templates to capture: ${TEMPLATES.length}\n`)

  // Ensure output directory exists
  await ensureDirectoryExists(CONFIG.outputDir)

  // Launch browser
  console.log('🌐 Launching browser...')
  const browser = await chromium.launch({
    headless: false, // Show browser window
  })

  try {
    // Generate thumbnails for all templates
    for (const templateId of TEMPLATES) {
      await generateThumbnail(browser, templateId)
    }

    console.log('\n✨ All thumbnails generated successfully!')
    console.log(`\n💡 Thumbnails saved to: ${CONFIG.outputDir}`)
    console.log('💡 Update template-gallery.tsx to use <img> tags instead of iframes')
    
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// Run the script
main().catch(console.error)
