/**
 * Generate Placeholder SVG Thumbnails
 * 
 * Usage: node scripts/generate-placeholder-thumbnails.js
 * 
 * Creates simple SVG placeholders for templates until screenshots are generated.
 * These are lightweight and don't require Puppeteer.
 */

const fs = require('fs')
const path = require('path')

// Template IDs and their display info
const TEMPLATES = [
  { id: 'classic_minimal', name: 'Classic Minimal', color: '#64748b' },
  { id: 'modern_blue', name: 'Modern Blue', color: '#3b82f6' },
  { id: 'creative_gradient', name: 'Creative Gradient', color: '#8b5cf6' },
  { id: 'elegant_black', name: 'Elegant Black', color: '#1f2937' },
  { id: 'compact_cards', name: 'Compact Cards', color: '#06b6d4' },
  { id: 'timeline_modern', name: 'Timeline Modern', color: '#10b981' },
  { id: 'corporate_clean', name: 'Corporate Clean', color: '#1e40af' },
  { id: 'lofi_minimal', name: 'Lofi Minimal', color: '#6b7280' },
  { id: 'color_blocks', name: 'Color Blocks', color: '#ef4444' },
  { id: 'european_standard', name: 'European Standard', color: '#0ea5e9' },
  { id: 'responsive_professional', name: 'Responsive Pro', color: '#7c3aed' },
  { id: 'simple_elegant', name: 'Simple Elegant', color: '#14b8a6' },
  { id: 'rwd_modern', name: 'RWD Modern', color: '#ec4899' },
]

function generateSVG(template) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1240" height="1754" viewBox="0 0 1240 1754">
  <!-- Background -->
  <rect width="1240" height="1754" fill="#f9fafb"/>
  
  <!-- Header section -->
  <rect y="0" width="1240" height="200" fill="${template.color}"/>
  
  <!-- Name placeholder -->
  <rect x="80" y="80" width="300" height="40" fill="white" opacity="0.9" rx="4"/>
  
  <!-- Contact info placeholders -->
  <rect x="80" y="140" width="200" height="20" fill="white" opacity="0.7" rx="2"/>
  <rect x="300" y="140" width="200" height="20" fill="white" opacity="0.7" rx="2"/>
  
  <!-- Content sections -->
  <rect x="80" y="240" width="500" height="30" fill="#e5e7eb" rx="4"/>
  <rect x="80" y="290" width="1080" height="100" fill="white" rx="4"/>
  
  <rect x="80" y="410" width="500" height="30" fill="#e5e7eb" rx="4"/>
  <rect x="80" y="460" width="1080" height="120" fill="white" rx="4"/>
  
  <rect x="80" y="600" width="500" height="30" fill="#e5e7eb" rx="4"/>
  <rect x="80" y="650" width="1080" height="80" fill="white" rx="4"/>
  
  <!-- Template name watermark -->
  <text x="620" y="1700" font-family="system-ui, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle" font-weight="600">
    ${template.name}
  </text>
  <text x="620" y="1730" font-family="system-ui, sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle">
    Preview Placeholder
  </text>
</svg>`
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'templates')
  
  // Create output directory
  try {
    await fs.promises.mkdir(outputDir, { recursive: true })
    console.log(`📁 Created directory: ${outputDir}`)
  } catch (error) {
    // Directory might already exist
  }
  
  console.log('🎨 Generating placeholder thumbnails...\n')
  
  for (const template of TEMPLATES) {
    const svg = generateSVG(template)
    const outputPath = path.join(outputDir, `${template.id}.svg`)
    
    await fs.promises.writeFile(outputPath, svg, 'utf-8')
    console.log(`✅ Generated: ${template.id}.svg`)
  }
  
  console.log(`\n✨ Generated ${TEMPLATES.length} placeholder thumbnails!`)
  console.log(`📂 Location: ${outputDir}`)
  console.log('\n💡 Tip: Run "npm run thumbnails:generate" to create real WebP screenshots')
}

main().catch(error => {
  console.error('Error:', error)
  process.exit(1)
})
