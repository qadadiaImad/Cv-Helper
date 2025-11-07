/**
 * SIMPLE TEMPLATE VIEWER
 * 
 * Just displays all template images in a clean gallery view
 * for manual analysis and documentation
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read image links
function readImageLinks() {
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  
  if (!fs.existsSync(linksPath)) {
    console.error('❌ images_links file not found')
    return []
  }
  
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'))
  
  return links
}

// Generate simple gallery HTML
function generateGalleryHTML(links) {
  const templateCards = links.map((link, index) => `
    <div class="template-card">
      <div class="template-header">
        <h3>Template ${index + 1}</h3>
        <a href="${link}" target="_blank" class="view-original">View Original</a>
      </div>
      <div class="template-image">
        <img src="${link}" alt="Template ${index + 1}">
      </div>
      <div class="template-notes">
        <h4>📝 Analysis Notes:</h4>
        <textarea id="notes-${index + 1}" placeholder="Add your analysis notes here...
        
Layout: [single/two/three column]
Colors: [primary, accent, background]
Special features: [list unique elements]
Sections: [list all sections]
"></textarea>
        <button onclick="saveNotes(${index + 1})">Save Notes</button>
      </div>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Gallery - Analysis View</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 40px;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .header h1 {
      color: #333;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #666;
      font-size: 16px;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
      gap: 30px;
      max-width: 1800px;
      margin: 0 auto;
    }
    
    .template-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .template-header {
      background: #333;
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .template-header h3 {
      margin: 0;
      font-size: 18px;
    }
    
    .view-original {
      color: #4CAF50;
      text-decoration: none;
      font-size: 14px;
      padding: 5px 15px;
      border: 1px solid #4CAF50;
      border-radius: 4px;
      transition: all 0.3s;
    }
    
    .view-original:hover {
      background: #4CAF50;
      color: white;
    }
    
    .template-image {
      padding: 20px;
      background: #fafafa;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 600px;
    }
    
    .template-image img {
      max-width: 100%;
      height: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .template-notes {
      padding: 20px;
      border-top: 1px solid #eee;
    }
    
    .template-notes h4 {
      color: #333;
      margin-bottom: 10px;
      font-size: 16px;
    }
    
    .template-notes textarea {
      width: 100%;
      min-height: 150px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      resize: vertical;
      margin-bottom: 10px;
    }
    
    .template-notes button {
      background: #2196F3;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s;
    }
    
    .template-notes button:hover {
      background: #1976D2;
    }
    
    .instructions {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      max-width: 1800px;
      margin: 0 auto 30px;
    }
    
    .instructions h3 {
      color: #856404;
      margin-bottom: 15px;
    }
    
    .instructions ol {
      color: #856404;
      padding-left: 25px;
    }
    
    .instructions li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
    
    .saved-indicator {
      display: none;
      color: #4CAF50;
      font-size: 14px;
      margin-left: 10px;
    }
    
    .saved-indicator.show {
      display: inline;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📸 Template Gallery - Analysis View</h1>
    <p>View and analyze all template images in one place</p>
  </div>
  
  <div class="instructions">
    <h3>📋 How to Analyze Templates:</h3>
    <ol>
      <li><strong>View each template image</strong> - Study the layout, colors, and design</li>
      <li><strong>Document your findings</strong> - Use the notes area to record:
        <ul>
          <li>Layout type (single/two/three column)</li>
          <li>Color palette (primary, accent, backgrounds)</li>
          <li>Special features (pie charts, timelines, icons, etc.)</li>
          <li>All sections present</li>
        </ul>
      </li>
      <li><strong>Save your notes</strong> - Click "Save Notes" to store in localStorage</li>
      <li><strong>Use notes to create React components</strong> - Reference your analysis when building templates</li>
    </ol>
  </div>
  
  <div class="gallery">
    ${templateCards}
  </div>
  
  <script>
    // Load saved notes from localStorage
    window.addEventListener('DOMContentLoaded', () => {
      for (let i = 1; i <= ${links.length}; i++) {
        const saved = localStorage.getItem('template-' + i + '-notes')
        if (saved) {
          document.getElementById('notes-' + i).value = saved
        }
      }
    })
    
    // Save notes to localStorage
    function saveNotes(templateId) {
      const notes = document.getElementById('notes-' + templateId).value
      localStorage.setItem('template-' + templateId + '-notes', notes)
      
      // Show saved indicator
      const button = event.target
      const originalText = button.textContent
      button.textContent = '✓ Saved!'
      button.style.background = '#4CAF50'
      
      setTimeout(() => {
        button.textContent = originalText
        button.style.background = '#2196F3'
      }, 2000)
    }
    
    // Export all notes
    function exportNotes() {
      const allNotes = {}
      for (let i = 1; i <= ${links.length}; i++) {
        const notes = localStorage.getItem('template-' + i + '-notes')
        if (notes) {
          allNotes['template-' + i] = notes
        }
      }
      
      const blob = new Blob([JSON.stringify(allNotes, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'template-analysis-notes.json'
      a.click()
    }
  </script>
</body>
</html>`
}

// Main function
function main() {
  console.log('🎨 Template Gallery Generator Starting...\n')
  
  const links = readImageLinks()
  
  if (links.length === 0) {
    console.log('❌ No image links found')
    return
  }
  
  console.log(`📸 Found ${links.length} template(s)\n`)
  
  const html = generateGalleryHTML(links)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-gallery.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n📝 This gallery view allows you to:')
  console.log('   - View all templates in one place')
  console.log('   - Add analysis notes for each template')
  console.log('   - Save notes locally (persists in browser)')
  console.log('   - Use notes as reference when creating React components')
  console.log('\n🎉 Done!')
}

main()
