/**
 * TEMPLATE 7 GENERATOR - CV12 (LiveCareer) - FIXED
 * 
 * Accurate recreation based on actual image analysis
 * Layout: Red top bar + Left white content (60%) + Right gray sidebar (40%) with photo
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate7HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 7 - CV12 Comparison (FIXED)</title>
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
    
    /* Template 7 - CV12 Accurate Layout */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    /* Red top bar */
    .top-bar {
      background: #c9302c;
      height: 25px;
      width: 100%;
    }
    
    /* Content wrapper */
    .content-wrapper {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    /* Left column - White */
    .left-column {
      width: 60%;
      background: white;
      padding: 30px 35px;
      overflow-y: auto;
    }
    
    .name {
      font-size: 32px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .divider {
      height: 2px;
      background: #333;
      margin: 15px 0 25px 0;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 12px;
      letter-spacing: 1px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .section-content {
      font-size: 10px;
      color: #333;
      line-height: 1.7;
      text-align: justify;
      background: #fef5f5;
      padding: 12px;
      margin-top: 8px;
    }
    
    .experience-item {
      margin-bottom: 18px;
    }
    
    .experience-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
      margin-bottom: 2px;
    }
    
    .experience-company {
      font-size: 10px;
      color: #666;
      font-style: italic;
      margin-bottom: 8px;
    }
    
    .experience-description ul {
      list-style: none;
      padding: 0;
      font-size: 10px;
      color: #333;
      line-height: 1.7;
    }
    
    .experience-description li {
      margin-bottom: 5px;
      padding-left: 12px;
      position: relative;
    }
    
    .experience-description li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #c9302c;
    }
    
    .education-item {
      margin-bottom: 12px;
      font-size: 10px;
      color: #333;
      line-height: 1.6;
    }
    
    .education-degree {
      font-weight: bold;
      margin-bottom: 2px;
    }
    
    .languages-list {
      font-size: 10px;
      color: #333;
      line-height: 1.8;
    }
    
    .languages-list li {
      list-style: none;
      padding-left: 12px;
      position: relative;
    }
    
    .languages-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #c9302c;
    }
    
    /* Right column - Light gray */
    .right-column {
      width: 40%;
      background: #f0f0f0;
      padding: 30px 25px;
      overflow-y: auto;
    }
    
    .photo-section {
      text-align: center;
      margin-bottom: 25px;
    }
    
    .photo-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: white;
      margin: 0 auto;
      overflow: hidden;
      border: 3px solid #ddd;
    }
    
    .photo-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .sidebar-section {
      margin-bottom: 25px;
    }
    
    .sidebar-title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 12px;
      letter-spacing: 1px;
      padding-bottom: 8px;
      border-bottom: 2px solid #ddd;
    }
    
    .sidebar-content {
      background: #fef5f5;
      padding: 12px;
      margin-top: 8px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      font-size: 10px;
      color: #333;
      gap: 8px;
    }
    
    .contact-icon {
      color: #c9302c;
      font-size: 11px;
      flex-shrink: 0;
    }
    
    .qualification-item {
      margin-bottom: 15px;
      font-size: 10px;
      color: #333;
      line-height: 1.6;
    }
    
    .qualification-item strong {
      display: block;
      margin-bottom: 4px;
      font-size: 10px;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 7 (CV12)</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 7 (FIXED)</div>
      <div class="template-container">
        <!-- Red top bar -->
        <div class="top-bar"></div>
        
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Left Column - White -->
          <main class="left-column">
            <h1 class="name">OLIVIA TAYLOR</h1>
            <div class="divider"></div>
            
            <section class="section">
              <h2 class="section-title">Professional Summary</h2>
              <div class="section-content">
                Meticulous sales professional with 4+ years of retail outlet experience. 
                Proven track record of exceeding monthly sales targets at Co-operative store 
                for 18 months in a row. Repeatedly scoring 95%+ on product knowledge assessments 
                at Primark. Seeking to leverage proven sales skills in a more dynamic position 
                with Zara.
              </div>
            </section>
            
            <section class="section">
              <h2 class="section-title">Experience</h2>
              
              <div class="experience-item">
                <div class="experience-title">Sales Assistant, 02/2018 - Current</div>
                <div class="experience-company">Co-Operative, Bath</div>
                <div class="experience-description">
                  <ul>
                    <li>Operated checkout and assisted customers at high-traffic location with £750K+ in annual turnover.</li>
                    <li>Exceeded monthly sales target by a minimum of 5% for 18 months in a row.</li>
                    <li>Achieved £150 extra daily turnover by upselling products at the counter.</li>
                    <li>Reduced stock losses by 30%.</li>
                    <li>Trained 2 new full-time and part-time team members, and also updating them on company policy and procedures.</li>
                    <li>Created and fostered warm customer relationships.</li>
                    <li>Took charge of opening and closing up the shop at times, cashing up, stock control and visual merchandising.</li>
                  </ul>
                </div>
              </div>
              
              <div class="experience-item">
                <div class="experience-title">Sales Assistant, 06/2016 - 02/2018</div>
                <div class="experience-company">Primark, Bath</div>
                <div class="experience-description">
                  <ul>
                    <li>Maintained sales floor presence at shopping center fashion outlet that exceed £2m in annual sales.</li>
                    <li>Regularly assisted 250+ customers a day on the shop floor, following up and upselling.</li>
                    <li>Contributed to visual appearance of the store that won national award for best presented store in the chain.</li>
                    <li>Repeatedly scoring 95%+ on product knowledge assessments.</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section class="section">
              <h2 class="section-title">Education</h2>
              <div class="education-item">
                <div class="education-degree">5 GCSEs including Mathematics and English, 2016</div>
                <div>Greenford Academy, London, UK</div>
              </div>
            </section>
            
            <section class="section">
              <h2 class="section-title">Languages</h2>
              <ul class="languages-list">
                <li>English (Native)</li>
                <li>Spanish (Fluent)</li>
                <li>French (Intermediate)</li>
              </ul>
            </section>
          </main>
          
          <!-- Right Column - Gray -->
          <aside class="right-column">
            <div class="photo-section">
              <div class="photo-circle">
                <div style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">PHOTO</div>
              </div>
            </div>
            
            <div class="sidebar-section">
              <h3 class="sidebar-title">Contact</h3>
              <div class="sidebar-content">
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>Hinton SN14</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📞</span>
                  <span>Phone: 0702288776</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">✉️</span>
                  <span>Email: olivia@taylor.com</span>
                </div>
              </div>
            </div>
            
            <div class="sidebar-section">
              <h3 class="sidebar-title">Core Qualifications</h3>
              <div class="sidebar-content">
                <div class="qualification-item">
                  <strong>• Product knowledge:</strong>
                  Rapidly gaining and successfully maintaining complete knowledge of products, 
                  proven by track record of product knowledge assessment.
                </div>
                
                <div class="qualification-item">
                  <strong>• Upselling:</strong>
                  Proven track record in creating extra turnover by upselling products at 
                  the counter and on the shop floor.
                </div>
                
                <div class="qualification-item">
                  <strong>• Visual merchandising:</strong>
                  Contributed to award-winning shop floor arrangements.
                </div>
                
                <div class="qualification-item">
                  <strong>• New employee training:</strong>
                  Successfully trained multiple new colleagues for sales-related positions.
                </div>
                
                <div class="qualification-item">
                  <strong>• Interpersonal skills:</strong>
                  Built warm relationships with regular customers resulting in repeat business.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main
function main() {
  console.log('🎨 Generating Template 7 (CV12 - FIXED VERSION)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 7) {
    console.log('❌ Template 7 URL not found')
    return
  }
  
  const template7Url = links[6] // Seventh link (index 6)
  const html = generateTemplate7HTML(template7Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-7-custom.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 7 ACTUAL Features:')
  console.log('   - Red top bar (#c9302c)')
  console.log('   - Left column (60%): White with name, summary, experience, education, languages')
  console.log('   - Right column (40%): Light gray with photo, contact, qualifications')
  console.log('   - Photo: Circular in right sidebar')
  console.log('   - Red accent color for bullets and icons')
  console.log('\n🎉 Done!')
}

main()
