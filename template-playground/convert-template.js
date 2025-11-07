/**
 * TEMPLATE CONVERTER - Standalone Script
 * 
 * Reads image URLs from src/utils/images/images_links
 * Generates HTML comparison files in src/utils/output/
 * 
 * Usage: node convert-template.js
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
    console.error('❌ images_links file not found at:', linksPath)
    return []
  }
  
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'))
  
  return links
}

// Get template-specific configuration
function getTemplateConfig(templateIndex) {
  const configs = {
    1: {
      name: 'Jack Sparrow CV',
      layout: 'two-column-sidebar-left',
      headerHeight: '65px',
      sidebarWidth: '27%',
      colors: {
        header: '#4a4a4a',
        accent: '#00bcd4',
        sidebar: '#f0f0f0',
        skillBars: '#ff6b35'
      }
    },
    2: {
      name: 'Creative CV',
      layout: 'two-column-different',
      headerHeight: '80px',
      sidebarWidth: '40%',
      colors: {
        header: '#ffffff',
        accent: '#c41e3a',
        sidebar: '#ffffff',
        skillBars: '#c41e3a'
      },
      note: 'Photo in header, pie chart, red accents'
    },
    3: {
      name: 'Template 3',
      layout: 'unknown',
      note: 'Needs manual analysis'
    },
    4: {
      name: 'Template 4',
      layout: 'unknown',
      note: 'Needs manual analysis'
    }
  }
  
  return configs[templateIndex] || configs[1]
}

// Generate HTML comparison page
function generateHTML(imageUrl, templateName, templateIndex) {
  // Use different configs based on template index
  const config = getTemplateConfig(templateIndex)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName} - Template Comparison</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #e0e0e0;
      padding: 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .header h1 {
      color: #333;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #666;
    }
    
    .comparison-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    
    .panel {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      max-width: 850px;
    }
    
    .panel-header {
      background: #333;
      color: white;
      padding: 15px 20px;
      font-weight: bold;
      font-size: 16px;
    }
    
    .panel-content {
      padding: 20px;
    }
    
    .original-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    /* Generated Template Styles */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: Arial, Helvetica, sans-serif;
      overflow: hidden;
      position: relative;
      border: 1px solid #ddd;
    }
    
    .template-header {
      background: #4a4a4a;
      color: white;
      padding: 18px 20px;
      text-align: center;
      height: 65px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .template-header h1 {
      font-size: 28px;
      font-weight: bold;
      margin: 0 0 3px 0;
      letter-spacing: 1px;
    }
    
    .template-header h2 {
      font-size: 13px;
      font-weight: 300;
      margin: 0;
      opacity: 0.85;
      letter-spacing: 0.5px;
    }
    
    .content-wrapper {
      display: flex;
      height: calc(100% - 65px);
    }
    
    .sidebar {
      width: 27%;
      background: #f0f0f0;
      padding: 15px 12px;
      overflow-y: auto;
      height: 100%;
    }
    
    .main-content {
      width: 73%;
      padding: 20px 25px;
      overflow-y: auto;
      height: 100%;
    }
    
    .photo {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: #ddd;
      margin: 0 auto 15px;
      border: 3px solid #00bcd4;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 11px;
    }
    
    .section {
      margin-bottom: 15px;
    }
    
    .badge {
      background: #00bcd4;
      color: white;
      padding: 6px 10px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .section-header {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-bottom: 12px;
      text-transform: uppercase;
      border-bottom: 2px solid #00bcd4;
      padding-bottom: 6px;
      letter-spacing: 0.5px;
    }
    
    .section-text {
      font-size: 10px;
      color: #666;
      line-height: 1.5;
      text-align: justify;
    }
    
    .skill-bar {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .skill-name {
      font-size: 9px;
      color: #333;
      min-width: 80px;
      flex-shrink: 0;
    }
    
    .skill-progress {
      flex: 1;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff6b35, #ff8c42);
      box-shadow: inset 0 -1px 2px rgba(0,0,0,0.15);
      border-radius: 3px;
    }
    
    .contact-item {
      font-size: 9px;
      color: #666;
      margin-bottom: 5px;
      line-height: 1.4;
    }
    
    .experience-item {
      margin-bottom: 15px;
      display: flex;
      gap: 12px;
    }
    
    .experience-date {
      min-width: 90px;
      font-size: 10px;
      font-weight: bold;
      color: #999;
      padding-top: 2px;
      line-height: 1.3;
    }
    
    .experience-content {
      flex: 1;
      border-left: 2px solid #00bcd4;
      padding-left: 15px;
    }
    
    .experience-title {
      font-size: 13px;
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    
    .experience-company {
      font-size: 11px;
      color: #00bcd4;
      margin-bottom: 6px;
    }
    
    .experience-description {
      font-size: 10px;
      color: #666;
      line-height: 1.4;
      margin-bottom: 6px;
    }
    
    .experience-list {
      padding-left: 18px;
      font-size: 10px;
      color: #666;
      margin: 0;
    }
    
    .experience-list li {
      margin-bottom: 3px;
      line-height: 1.3;
    }
    
    .instructions {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    
    .instructions h3 {
      color: #856404;
      margin-bottom: 10px;
    }
    
    .instructions ol {
      color: #856404;
      padding-left: 20px;
    }
    
    .instructions li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📸 Template Comparison Tool</h1>
    <p>Compare original template image with generated HTML/CSS</p>
    <p style="margin-top: 10px; font-size: 14px; color: #666;">
      <strong>Template:</strong> ${config.name} | 
      <strong>Layout:</strong> ${config.layout} | 
      ${config.note ? `<strong>Note:</strong> ${config.note}` : ''}
    </p>
  </div>
  
  <div class="instructions">
    <h3>📝 How to Use:</h3>
    <ol>
      <li>Look at both templates side by side</li>
      <li>Note any differences in colors, spacing, fonts, or layout</li>
      <li>Update the template analysis in <code>convert-template.js</code></li>
      <li>Re-run <code>node convert-template.js</code> to see changes</li>
      <li>Iterate until they match perfectly!</li>
    </ol>
    <p style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 4px;">
      <strong>⚠️ Important:</strong> Currently, all templates use the same base HTML/CSS (optimized for Template 1).
      Each template needs custom CSS configuration to match its unique layout and design.
    </p>
  </div>
  
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel">
      <div class="panel-header">📸 Original Template Image</div>
      <div class="panel-content">
        <img src="${imageUrl}" alt="Original Template" style="width: 100%; height: auto;">
      </div>
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS Preview</div>
      <div class="panel-content">
        <div class="template-container">
          <div class="template-header">
            <h1>Brian T. Wayne</h1>
            <h2>Product Manager</h2>
          </div>
          
          <div class="content-wrapper">
            <aside class="sidebar">
              <div class="photo">PHOTO</div>
              
              <div class="section">
                <div class="badge">About Me</div>
                <p class="section-text">
                  Results-driven Product Manager with 8+ years of experience leading 
                  cross-functional teams to deliver innovative solutions. Proven track 
                  record of launching successful products.
                </p>
              </div>
              
              <div class="section">
                <div class="badge">Personal</div>
                <div class="contact-item"><strong>Brian T. Wayne</strong></div>
                <div class="contact-item">San Francisco, CA</div>
              </div>
              
              <div class="section">
                <div class="badge">Skills</div>
                <div class="skill-bar">
                  <div class="skill-name">Product Mgmt</div>
                  <div class="skill-progress">
                    <div class="skill-fill" style="width: 90%"></div>
                  </div>
                </div>
                <div class="skill-bar">
                  <div class="skill-name">Agile/Scrum</div>
                  <div class="skill-progress">
                    <div class="skill-fill" style="width: 85%"></div>
                  </div>
                </div>
                <div class="skill-bar">
                  <div class="skill-name">Data Analysis</div>
                  <div class="skill-progress">
                    <div class="skill-fill" style="width: 80%"></div>
                  </div>
                </div>
                <div class="skill-bar">
                  <div class="skill-name">Technical</div>
                  <div class="skill-progress">
                    <div class="skill-fill" style="width: 75%"></div>
                  </div>
                </div>
                <div class="skill-bar">
                  <div class="skill-name">Leadership</div>
                  <div class="skill-progress">
                    <div class="skill-fill" style="width: 85%"></div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <div class="badge">Languages</div>
                <div class="contact-item"><strong>English:</strong> Native</div>
                <div class="contact-item"><strong>Spanish:</strong> Professional</div>
                <div class="contact-item"><strong>Mandarin:</strong> Intermediate</div>
              </div>
              
              <div class="section">
                <div class="badge">Contact</div>
                <div class="contact-item">✉ brian.wayne@email.com</div>
                <div class="contact-item">📱 +1 (555) 234-5678</div>
                <div class="contact-item">🔗 linkedin.com/in/brianwayne</div>
                <div class="contact-item">🐙 github.com/brianwayne</div>
              </div>
            </aside>
            
            <main class="main-content">
              <div class="section">
                <h2 class="section-header">Experience</h2>
                
                <div class="experience-item">
                  <div class="experience-date">Jan 2020 —<br>Present</div>
                  <div class="experience-content">
                    <h3 class="experience-title">Senior Product Manager</h3>
                    <div class="experience-company">Tech Corp • San Francisco, CA</div>
                    <p class="experience-description">
                      Leading product strategy for enterprise SaaS platform
                    </p>
                    <ul class="experience-list">
                      <li>Launched 3 major product features that increased user engagement by 45%</li>
                      <li>Managed $2M product development budget and delivered projects on time</li>
                      <li>Led cross-functional team of 12 engineers, designers, and analysts</li>
                    </ul>
                  </div>
                </div>
                
                <div class="experience-item">
                  <div class="experience-date">Mar 2018 —<br>Dec 2019</div>
                  <div class="experience-content">
                    <h3 class="experience-title">Product Manager</h3>
                    <div class="experience-company">Startup Inc • San Francisco, CA</div>
                    <p class="experience-description">
                      Managed mobile app product lifecycle
                    </p>
                    <ul class="experience-list">
                      <li>Grew monthly active users from 50K to 500K in 18 months</li>
                      <li>Conducted user research with 200+ customers to inform product roadmap</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h2 class="section-header">Education</h2>
                
                <div class="experience-item">
                  <div class="experience-date">2014 — 2016</div>
                  <div class="experience-content">
                    <h3 class="experience-title">MBA in Business Administration</h3>
                    <div class="experience-company">Stanford University • Stanford, CA</div>
                    <p class="experience-description">
                      GPA: 3.9 • Dean's List, Product Management Specialization
                    </p>
                  </div>
                </div>
                
                <div class="experience-item">
                  <div class="experience-date">2010 — 2014</div>
                  <div class="experience-content">
                    <h3 class="experience-title">Bachelor of Science in Computer Science</h3>
                    <div class="experience-company">UC Berkeley • Berkeley, CA</div>
                    <p class="experience-description">Cum Laude</p>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h2 class="section-header">Certifications & Grants</h2>
                <div class="experience-item">
                  <div class="experience-date">1708<br>1710<br>1715-1716</div>
                  <div class="experience-content">
                    <div class="experience-description">
                      <strong>Captain's Certificates</strong><br>
                      Travel grant<br>
                      Grant from the Pirate's Company
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h2 class="section-header">Publications</h2>
                <div class="experience-item">
                  <div class="experience-date">1729<br><br>1720</div>
                  <div class="experience-content">
                    <div class="experience-description">
                      <strong>How I almost got killed by Lady Swan.</strong> Tortuga Printing Press.<br><br>
                      <strong>"Privateering for Beginners"</strong>, in The Pragmatic Pirate (1/1720)
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="section">
                <h2 class="section-header">Talks</h2>
                <div class="experience-item">
                  <div class="experience-date">Nov 1726</div>
                  <div class="experience-content">
                    <div class="experience-description">
                      <strong>"How I lost my ship (& and how to get it back)"</strong>, at Ahoy Pirate's Conference in Tortuga, Nov 1726.
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main function
function main() {
  console.log('🎨 Template Converter Starting...\n')
  
  // Read image links
  const links = readImageLinks()
  
  if (links.length === 0) {
    console.log('❌ No image links found')
    console.log('💡 Add image URLs (one per line) to: src/utils/images/images_links')
    console.log('   Example: https://example.com/template-image.jpg\n')
    return
  }
  
  console.log(`📸 Found ${links.length} template image(s)\n`)
  
  // Create output directory
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Process each link
  links.forEach((link, index) => {
    const templateIndex = index + 1
    const templateName = `template-${templateIndex}`
    console.log(`📝 Processing: ${templateName}`)
    console.log(`   URL: ${link}`)
    
    // Generate HTML with template-specific config
    const html = generateHTML(link, templateName, templateIndex)
    
    // Save to file
    const outputPath = path.join(outputDir, `${templateName}-comparison.html`)
    fs.writeFileSync(outputPath, html, 'utf-8')
    
    console.log(`✅ Generated: ${outputPath}`)
    console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}\n`)
  })
  
  console.log('🎉 Conversion complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Open the generated HTML files in your browser')
  console.log('2. Compare side-by-side with original images')
  console.log('3. Note any differences (colors, spacing, fonts)')
  console.log('4. Adjust the HTML/CSS in this script')
  console.log('5. Re-run to see updated results\n')
}

// Run
main()
