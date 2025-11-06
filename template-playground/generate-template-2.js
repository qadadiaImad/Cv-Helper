/**
 * TEMPLATE 2 GENERATOR - Creative CV (YOUR NAME HERE)
 * 
 * Custom HTML/CSS generator specifically for Template 2
 * Features: Pie chart, language dots, red theme, photo in header
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate2HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 2 - Creative CV Comparison</title>
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
    
    .original-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    /* Template 2 Specific Styles */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      overflow: hidden;
      position: relative;
    }
    
    .template-header {
      background: #ffffff;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      height: 100px;
    }
    
    .header-left h1 {
      font-size: 32px;
      font-weight: bold;
      text-transform: uppercase;
      color: #333;
      margin-bottom: 5px;
      letter-spacing: 2px;
    }
    
    .header-left p {
      font-size: 14px;
      color: #c41e3a;
      font-style: italic;
    }
    
    .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .header-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #ddd;
      border: 3px solid #c41e3a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #999;
    }
    
    .header-contact {
      font-size: 10px;
      color: #666;
      line-height: 1.6;
    }
    
    .content-wrapper {
      display: flex;
      height: calc(100% - 100px);
    }
    
    .sidebar {
      width: 40%;
      padding: 25px 20px;
      background: #ffffff;
      overflow-y: auto;
    }
    
    .main-content {
      width: 60%;
      padding: 25px 30px;
      background: #fafafa;
      overflow-y: auto;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-header {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 12px;
      padding-bottom: 5px;
      border-bottom: 2px solid #c41e3a;
      letter-spacing: 0.5px;
    }
    
    /* Timeline Style (Left Sidebar) */
    .timeline-item {
      margin-bottom: 15px;
      padding-left: 15px;
      border-left: 2px solid #c41e3a;
      position: relative;
    }
    
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #c41e3a;
    }
    
    .timeline-date {
      font-size: 10px;
      color: #999;
      font-weight: bold;
      margin-bottom: 3px;
    }
    
    .timeline-title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      margin-bottom: 2px;
    }
    
    .timeline-company {
      font-size: 11px;
      color: #c41e3a;
      margin-bottom: 5px;
    }
    
    .timeline-description {
      font-size: 10px;
      color: #666;
      line-height: 1.4;
    }
    
    /* Projects Section */
    .project-item {
      margin-bottom: 12px;
      padding: 10px;
      background: #f9f9f9;
      border-left: 3px solid #c41e3a;
    }
    
    .project-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    
    .project-funding {
      font-size: 9px;
      color: #c41e3a;
      font-style: italic;
      margin-bottom: 5px;
    }
    
    .project-description {
      font-size: 10px;
      color: #666;
      line-height: 1.3;
    }
    
    /* Pie Chart */
    .pie-chart-container {
      text-align: center;
      padding: 15px 10px;
      background: #fff;
      margin: 0 -20px;
    }
    
    .pie-chart {
      width: 200px;
      height: 200px;
      margin: 0 auto 10px;
      position: relative;
      padding: 10px;
    }
    
    .pie-chart svg {
      transform: rotate(-90deg);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
      overflow: visible;
    }
    
    .pie-legend {
      margin-top: 10px;
      font-size: 9px;
      text-align: left;
      padding: 0 10px;
    }
    
    .pie-legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      line-height: 1.3;
    }
    
    .pie-legend-color {
      width: 10px;
      height: 10px;
      margin-right: 6px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    
    /* Philosophy Box */
    .philosophy-box {
      background: #fff;
      padding: 15px;
      border-left: 4px solid #c41e3a;
      font-style: italic;
      color: #666;
      font-size: 12px;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    /* Proud Of Section */
    .proud-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      padding: 8px;
      background: #fff;
    }
    
    .proud-icon {
      width: 30px;
      height: 30px;
      background: #c41e3a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
      margin-right: 10px;
      flex-shrink: 0;
    }
    
    .proud-content {
      flex: 1;
    }
    
    .proud-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
      margin-bottom: 2px;
    }
    
    .proud-description {
      font-size: 10px;
      color: #666;
      line-height: 1.3;
    }
    
    /* Strengths Tag Cloud */
    .strengths-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px;
      background: #fff;
    }
    
    .strength-tag {
      padding: 5px 12px;
      background: #f0f0f0;
      border-radius: 15px;
      font-size: 10px;
      color: #333;
      border: 1px solid #ddd;
    }
    
    /* Language Proficiency Dots */
    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding: 8px;
      background: #fff;
    }
    
    .language-name {
      font-size: 11px;
      font-weight: bold;
      color: #333;
    }
    
    .language-dots {
      display: flex;
      gap: 4px;
    }
    
    .language-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #e0e0e0;
    }
    
    .language-dot.filled {
      background: #c41e3a;
    }
    
    /* Education */
    .education-item {
      margin-bottom: 15px;
      padding: 12px;
      background: #fff;
      border-left: 3px solid #c41e3a;
    }
    
    .education-degree {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    
    .education-school {
      font-size: 11px;
      color: #c41e3a;
      margin-bottom: 5px;
    }
    
    .education-date {
      font-size: 10px;
      color: #999;
      margin-bottom: 5px;
    }
    
    .education-thesis {
      font-size: 10px;
      color: #666;
      font-style: italic;
      line-height: 1.3;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 2</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 2</div>
      <div class="template-container">
        <div class="template-header">
          <div class="header-left">
            <h1>YOUR NAME HERE</h1>
            <p>Your Position or Tagline Here</p>
          </div>
          <div class="header-right">
            <div class="header-contact">
              📧 email@example.com<br>
              📱 +1 234 567 8900<br>
              🌐 yourwebsite.com<br>
              📍 City, Country
            </div>
            <div class="header-photo">PHOTO</div>
          </div>
        </div>
        
        <div class="content-wrapper">
          <!-- Left Sidebar -->
          <aside class="sidebar">
            <div class="section">
              <h2 class="section-header">Experience</h2>
              <div class="timeline-item">
                <div class="timeline-date">Month XXXX — Ongoing</div>
                <div class="timeline-title">Job Title 1</div>
                <div class="timeline-company">Company 1</div>
                <div class="timeline-description">
                  • Job description 1<br>
                  • Job description 1
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-date">Month XXXX — Month XXXX</div>
                <div class="timeline-title">Job Title 2</div>
                <div class="timeline-company">Company 2</div>
                <div class="timeline-description">
                  • Job description 1<br>
                  • Job description 2
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-header">Projects</h2>
              <div class="project-item">
                <div class="project-title">Project 1</div>
                <div class="project-funding">Funding agency/Institution</div>
                <div class="project-description">• Details</div>
              </div>
              <div class="project-item">
                <div class="project-title">Project 2</div>
                <div class="project-funding">Funding agency/Institution</div>
                <div class="project-description">
                  A short abstract would also work.<br>
                  Or a list of your achievements.
                </div>
              </div>
            </div>
                        <div class="section">
              <h2 class="section-header">A Day of My Life</h2>
              <div class="pie-chart-container">
                <div class="pie-chart">
                  <svg width="180" height="180" viewBox="-10 -10 200 200">
                    <!-- Pie chart slices with better colors -->
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#d4a5a5" stroke-width="52" 
                            stroke-dasharray="140 320" stroke-dashoffset="0" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#e8b4b8" stroke-width="52" 
                            stroke-dasharray="95 320" stroke-dashoffset="-140" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#f5d5d8" stroke-width="52" 
                            stroke-dasharray="60 320" stroke-dashoffset="-235" />
                    <circle cx="90" cy="90" r="70" fill="none" stroke="#c85a6e" stroke-width="52" 
                            stroke-dasharray="25 320" stroke-dashoffset="-295" />
                  </svg>
                </div>
                <div class="pie-legend">
                  <div class="pie-legend-item">
                    <div class="pie-legend-color" style="background: #d4a5a5;"></div>
                    <span>Hopeful/cheerful by night</span>
                  </div>
                  <div class="pie-legend-item">
                    <div class="pie-legend-color" style="background: #e8b4b8;"></div>
                    <span>Sleep, beautiful sleep</span>
                  </div>
                  <div class="pie-legend-item">
                    <div class="pie-legend-color" style="background: #f5d5d8;"></div>
                    <span>Sports and relaxation</span>
                  </div>
                  <div class="pie-legend-item">
                    <div class="pie-legend-color" style="background: #c85a6e;"></div>
                    <span>Spending time with family</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          <!-- Main Content -->
          <main class="main-content">
            <div class="section">
              <h2 class="section-header">My Life Philosophy</h2>
              <div class="philosophy-box">
                "Something smart or heartfelt, preferably in one sentence."
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-header">Most Proud Of</h2>
              <div class="proud-item">
                <div class="proud-icon">🏆</div>
                <div class="proud-content">
                  <div class="proud-title">Fantastic Achievement</div>
                  <div class="proud-description">And some details about it of course</div>
                </div>
              </div>
              <div class="proud-item">
                <div class="proud-icon">❤️</div>
                <div class="proud-content">
                  <div class="proud-title">Another achievement</div>
                  <div class="proud-description">More details about it of course</div>
                </div>
              </div>
              <div class="proud-item">
                <div class="proud-icon">⭐</div>
                <div class="proud-content">
                  <div class="proud-title">Another achievement</div>
                  <div class="proud-description">More details about it of course</div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-header">Strengths</h2>
              <div class="strengths-cloud">
                <span class="strength-tag">Hard-working</span>
                <span class="strength-tag">Eye for detail</span>
                <span class="strength-tag">Motivator & Leader</span>
                <span class="strength-tag">C++</span>
                <span class="strength-tag">Embedded Systems</span>
                <span class="strength-tag">Statistical Analysis</span>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-header">Languages</h2>
              <div class="language-item">
                <span class="language-name">English</span>
                <div class="language-dots">
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                </div>
              </div>
              <div class="language-item">
                <span class="language-name">French</span>
                <div class="language-dots">
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot"></div>
                </div>
              </div>
              <div class="language-item">
                <span class="language-name">German</span>
                <div class="language-dots">
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot filled"></div>
                  <div class="language-dot"></div>
                  <div class="language-dot"></div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2 class="section-header">Education</h2>
              <div class="education-item">
                <div class="education-degree">Ph.D. in Your Discipline</div>
                <div class="education-school">Your University</div>
                <div class="education-date">📅 Sept 2007 – June 2009</div>
                <div class="education-thesis">Thesis title: Wonderful Research</div>
              </div>
              <div class="education-item">
                <div class="education-degree">M.Sc. in Your Discipline</div>
                <div class="education-school">Your University</div>
                <div class="education-date">📅 Sept 2001 – June 2002</div>
              </div>
              <div class="education-item">
                <div class="education-degree">B.Sc. in Your Discipline</div>
                <div class="education-school">Stanford University</div>
                <div class="education-date">📅 Sept 1998 – June 2001</div>
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
  console.log('🎨 Generating Template 2 (Creative CV)...\n')
  
  // Read the second URL from images_links
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 2) {
    console.log('❌ Template 2 URL not found')
    return
  }
  
  const template2Url = links[1] // Second link
  const html = generateTemplate2HTML(template2Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-2-custom.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 2 Features:')
  console.log('   - Photo in header (top right)')
  console.log('   - Red/burgundy theme')
  console.log('   - Pie chart for "A Day of My Life"')
  console.log('   - Language proficiency dots')
  console.log('   - Tag cloud for strengths')
  console.log('   - Icon badges for achievements')
  console.log('   - Timeline style for experience')
  console.log('\n🎉 Done!')
}

main()
