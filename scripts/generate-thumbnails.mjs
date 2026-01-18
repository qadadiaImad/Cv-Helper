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
  'double-column',
  'creative-orange',
  'teal-modern',
  'beige-sidebar',
  'dark-blue-orange',
  'gray-minimal',
  'dark-professional',
  'orange-sidebar',
  'teal-rounded',
  'navy-professional',
  'blue-circular',
  // Templates 19-27
  'jack-sparrow',
  'creative-cv',
  'academic',
  'modern-professional',
  'orange-accent',
  'red-topbar',
  'modern-resume-yellow',
  'ivy-league',
  'stockholm',
  // Templates 31-44 (New templates)
  'lauren-chen',
  'orange-sidebar-left',
  'slate-yellow',
  'bold-yellow',
  'two-column-yellow',
  'advanced-blue',
  'premium-green',
  'pastel-orange',
  'hybrid-green',
  'professional-purple',
  'unique-orange',
  'aesthetic-green',
  'modern-blue-hub',
  'dark-yellow-split',
]

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  outputDir: join(__dirname, '../public/template-thumbnails'),
  // A4 aspect ratio: 1:1.41 (210mm x 297mm)
  // Using 794px width (standard A4 at 96 DPI)
  viewport: { width: 794, height: 1123 }, // A4 at 96 DPI
  // Thumbnail dimensions for gallery (maintains 1:1.41 aspect ratio)
  thumbnailWidth: 600,
  thumbnailHeight: 846, // 600 * 1.41
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

    // Wait for fonts and styles to load
    await page.waitForTimeout(2000)

    // Get the template container dimensions
    const contentInfo = await page.evaluate(() => {
      const container = document.body.firstElementChild
      if (!container) {
        return {
          x: 0,
          y: 0,
          width: document.body.scrollWidth,
          height: document.body.scrollHeight,
          scrollHeight: document.body.scrollHeight
        }
      }
      
      const rect = container.getBoundingClientRect()
      return {
        x: Math.max(0, rect.left),
        y: Math.max(0, rect.top),
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        scrollHeight: container.scrollHeight
      }
    })

    console.log(`   Content: ${contentInfo.width}x${contentInfo.height}px, scroll: ${contentInfo.scrollHeight}px`)

    // Calculate the clip area to maintain A4 aspect ratio (1:1.41)
    const targetAspectRatio = 1.41
    let clipWidth = contentInfo.width
    let clipHeight = contentInfo.height
    
    // Adjust to maintain aspect ratio
    const currentAspectRatio = clipHeight / clipWidth
    if (currentAspectRatio > targetAspectRatio) {
      // Too tall, crop height
      clipHeight = Math.floor(clipWidth * targetAspectRatio)
    } else if (currentAspectRatio < targetAspectRatio) {
      // Too wide, crop width
      clipWidth = Math.floor(clipHeight / targetAspectRatio)
    }

    // Center the crop area
    const clipX = contentInfo.x + Math.floor((contentInfo.width - clipWidth) / 2)
    const clipY = contentInfo.y // Start from top to show header

    console.log(`   Crop area: ${clipWidth}x${clipHeight}px at (${clipX}, ${clipY})`)

    // Take screenshot - only one image per template
    const thumbnailPath = join(CONFIG.outputDir, `${templateId}-thumb.png`)
    await page.screenshot({
      path: thumbnailPath,
      type: 'png',
      clip: {
        x: clipX,
        y: clipY,
        width: clipWidth,
        height: clipHeight
      }
    })

    console.log(`   ✅ Saved: ${thumbnailPath}`)

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
