/**
 * TEMPLATE 5 GENERATOR - CV9 (LiveCareer) - FIXED
 * 
 * Accurate recreation based on actual SVG analysis
 * Layout: Left column (25%) + Right column (75%) + Bottom contact bar
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate5HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 5 - CV9 Comparison (FIXED)</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: #e0e0e0;
      padding: 20px;
    }
    
    .comparison-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      max-width: 1800px;
      margin: 0 auto;
    }
    
    .panel {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .panel-header {
      background: #333;
      color: white;
      padding: 15px 20px;
      font-weight: bold;
    }
    
    .original-image {
      width: 850px;
    }
    
    .original-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    /* Template 5 - CV9 Accurate Layout */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Lato', Arial, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    /* Top header with icon and name */
    .header-section {
      background: #e8ebe8;
      padding: 35px 30px 20px;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .icon-square {
      width: 85px;
      height: 85px;
      background: #2d7a6e;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }
    
    .initials {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      font-size: 16px;
      font-weight: 300;
      line-height: 1;
    }
    
    .initials span {
      display: block;
    }
    
    /* Only diagonal X lines - NO horizontal/vertical */
    .icon-lines {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .icon-lines::before,
    .icon-lines::after {
      content: '';
      position: absolute;
      background: rgba(255,255,255,0.7);
      width: 55px;
      height: 1.5px;
    }
    
    .icon-lines::before {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    
    .icon-lines::after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    
    .name-block h1 {
      font-size: 30px;
      font-weight: 300;
      color: #333;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin: 0;
    }
    
    /* Contact bar - directly below header */
    .contact-bar {
      background: #2b2b2b;
      color: white;
      padding: 12px 30px;
      display: flex;
      justify-content: center;
      gap: 25px;
      font-size: 10px;
    }
    
    .contact-bar span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Main content area - two columns */
    .content-area {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    /* Left column - light gray with white sections */
    .left-column {
      width: 25%;
      background: #e8ebe8;
      padding: 20px 15px;
      overflow-y: auto;
    }
    
    .section {
      background: white;
      padding: 18px 15px;
      margin-bottom: 15px;
    }
    
    .section-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333;
    }
    
    .section-content {
      font-size: 10px;
      color: #333;
      line-height: 1.7;
    }
    
    .section-content p {
      margin-bottom: 8px;
      text-align: justify;
    }
    
    .section-content ul {
      list-style: none;
      padding: 0;
    }
    
    .section-content li {
      margin-bottom: 6px;
      padding-left: 12px;
      position: relative;
    }
    
    .section-content li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #2d7a6e;
    }
    
    /* Right column - white */
    .right-column {
      width: 75%;
      background: #ffffff;
      padding: 25px 30px;
      overflow-y: auto;
    }
    
    .experience-item {
      margin-bottom: 20px;
    }
    
    .job-header {
      margin-bottom: 8px;
    }
    
    .job-title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    
    .job-company {
      font-size: 11px;
      color: #666;
      font-style: italic;
    }
    
    .job-description ul {
      list-style: none;
      padding: 0;
      font-size: 10px;
      color: #333;
      line-height: 1.6;
    }
    
    .job-description li {
      margin-bottom: 5px;
      padding-left: 15px;
      position: relative;
    }
    
    .job-description li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #2d7a6e;
    }
    
    .qualifications-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 12px;
    }
    
    .qual-item {
      font-size: 10px;
      line-height: 1.6;
    }
    
    .qual-item strong {
      color: #333;
      display: block;
      margin-bottom: 3px;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 5 (CV9)</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 5 (FIXED)</div>
      <div class="template-container">
        <!-- Header with icon and name -->
        <div class="header-section">
          <div class="icon-square">
            <div class="initials">
              <span>O</span>
              <span>T</span>
            </div>
            <div class="icon-lines"></div>
          </div>
          <div class="name-block">
            <h1>OLIVIA TAYLOR</h1>
          </div>
        </div>
        
        <!-- Contact bar - directly below header -->
        <div class="contact-bar">
          <span>Hinton SN14</span>
          <span>•</span>
          <span>0702288776</span>
          <span>•</span>
          <span>olivia@taylor.com</span>
        </div>
        
        <!-- Main content - two columns -->
        <div class="content-area">
          <!-- Left column -->
          <aside class="left-column">
            <div class="section">
              <h2 class="section-title">Professional Summary</h2>
              <div class="section-content">
                <p>Meticulous sales professional with 4+ years of retail outlet experience. Proven track record of exceeding monthly sales targets at a co-operative store. Possess product knowledge assessments at Primark. Seeking to prove proven sales skills in a more dynamic setting with Zara.</p>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-title">Education</h2>
              <div class="section-content">
                <p><strong>5 GCSEs</strong> including Mathematics and English, 2015</p>
                <p><strong>Greenford Academy, London, UK</strong></p>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-title">Languages</h2>
              <div class="section-content">
                <ul>
                  <li>English (Native)</li>
                  <li>Spanish (Fluent)</li>
                  <li>French (Intermediate)</li>
                  <li>Italian (Basic)</li>
                </ul>
              </div>
            </div>
          </aside>
          
          <!-- Right column -->
          <main class="right-column">
            <div class="section">
              <h2 class="section-title">Experience</h2>
              
              <div class="experience-item">
                <div class="job-header">
                  <div class="job-title">Sales Assistant, 02/2018 to Current</div>
                  <div class="job-company">Co-Operative, Bath</div>
                </div>
                <div class="job-description">
                  <ul>
                    <li>Operated checkout and assisted customers at high-traffic location with £700K+ annual turnover.</li>
                    <li>Exceeded monthly sales target by a minimum of 5% for 18 months in a row.</li>
                    <li>Volunteered to cover shifts for other team members, and also updating them on company policy and procedures.</li>
                    <li>Trained 2 new full-time and 6 part-time team members, and also updating them on company policy and procedures.</li>
                    <li>Created and fostered relationships with regular customers.</li>
                    <li>Took charge of opening and closing up the shop at times, cashing up, stock replenishment and visual merchandising.</li>
                  </ul>
                </div>
              </div>
              
              <div class="experience-item">
                <div class="job-header">
                  <div class="job-title">Sales Assistant, 06/2016 to 02/2018</div>
                  <div class="job-company">Primark, Bath</div>
                </div>
                <div class="job-description">
                  <ul>
                    <li>Maintained sales floor presence at shopping center fashion outlet that exceed £2m in annual revenue.</li>
                    <li>Regularly assisted 250+ customers a day on the shop floor, following up and upselling.</li>
                    <li>Contributed to visual appearance of the store that won national award for best presented outlet.</li>
                    <li>Repeatedly scoring 95%+ on product knowledge assessments.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-title">Core Qualifications</h2>
              <div class="qualifications-grid">
                <div class="qual-item">
                  <strong>Product knowledge:</strong> Rapidly gaining and successfully maintaining complete knowledge of products, proven by track record of product knowledge assessment.
                </div>
                <div class="qual-item">
                  <strong>New employee training:</strong> Successfully trained multiple new colleagues for sales-related positions.
                </div>
                <div class="qual-item">
                  <strong>Upselling:</strong> Proven track record in creating extra turnover by upselling products at the counter and on the shop floor.
                </div>
                <div class="qual-item">
                  <strong>Interpersonal skills:</strong> Built warm relationships with regular customers resulting in repeat business.
                </div>
                <div class="qual-item">
                  <strong>Visual merchandising:</strong> Contributed to award-winning shop floor arrangements.
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main
function main() {
  console.log('🎨 Generating Template 5 (CV9 - FIXED VERSION)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 5) {
    console.log('❌ Template 5 URL not found')
    return
  }
  
  const template5Url = links[4] // Fifth link (index 4)
  const html = generateTemplate5HTML(template5Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-5-custom.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 5 ACTUAL Features:')
  console.log('   - Top: Icon + Name on light gray background')
  console.log('   - Left column (25%): Light gray, Summary/Education/Languages')
  console.log('   - Right column (75%): White, Experience/Qualifications')
  console.log('   - Bottom: Dark contact bar')
  console.log('   - Green square icon with cross design')
  console.log('\n🎉 Done!')
}

main()
