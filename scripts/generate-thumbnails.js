/**
 * Template Thumbnail Generation Script
 * 
 * Usage: node scripts/generate-thumbnails.js
 * 
 * This script generates WebP thumbnails for all React templates
 * using Puppeteer to screenshot a preview page.
 * 
 * Install dependencies first:
 * npm install --save-dev puppeteer sharp
 */

const puppeteer = require('puppeteer')
const sharp = require('sharp')
const fs = require('fs/promises')
const path = require('path')

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  viewport: { width: 1240, height: 1754 }, // A4 aspect ratio at high DPI
  outputDir: path.join(__dirname, '..', 'public', 'templates'),
  format: 'webp',
  quality: 82,
  timeout: 10000,
}

// Template IDs to generate thumbnails for
const TEMPLATE_IDS = [
  'classic_minimal',
  'modern_blue',
  'creative_gradient',
  'elegant_black',
  'compact_cards',
  'timeline_modern',
  'corporate_clean',
  'lofi_minimal',
  'color_blocks',
  'european_standard',
  'responsive_professional',
  'simple_elegant',
  'rwd_modern',
]

async function generateThumbnail(browser, templateId) {
  console.log(`📸 Generating thumbnail for: ${templateId}`)
  
  try {
    const page = await browser.newPage()
    await page.setViewport(CONFIG.viewport)
    
    // Navigate to preview page
    const previewUrl = `${CONFIG.baseUrl}/preview/template/${templateId}`
    await page.goto(previewUrl, {
      waitUntil: 'networkidle0',
      timeout: CONFIG.timeout,
    })
    
    // Wait a bit for any animations
    await page.waitForTimeout(1000)
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
    })
    
    await page.close()
    
    // Convert to WebP with sharp
    const outputPath = path.join(CONFIG.outputDir, `${templateId}.webp`)
    await sharp(screenshot)
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath)
    
    console.log(`✅ Generated: ${templateId}.webp`)
    return true
  } catch (error) {
    console.error(`❌ Failed to generate ${templateId}:`, error.message)
    return false
  }
}

async function main() {
  console.log('🚀 Starting thumbnail generation...\n')
  
  // Ensure output directory exists
  try {
    await fs.mkdir(CONFIG.outputDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
  
  // Launch browser
  console.log('🌐 Launching headless browser...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  
  // Generate thumbnails
  const results = []
  for (const templateId of TEMPLATE_IDS) {
    const success = await generateThumbnail(browser, templateId)
    results.push({ templateId, success })
  }
  
  await browser.close()
  
  // Summary
  console.log('\n📊 Summary:')
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`✅ Successful: ${successful}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📁 Output directory: ${CONFIG.outputDir}`)
  
  if (failed > 0) {
    console.log('\n⚠️  Some thumbnails failed to generate.')
    console.log('Make sure the dev server is running on http://localhost:3000')
    process.exit(1)
  }
  
  console.log('\n✨ All thumbnails generated successfully!')
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}

module.exports = { generateThumbnail, CONFIG }
