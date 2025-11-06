/**
 * TEMPLATE 7 GENERATOR - CV Template 12 (LiveCareer)
 * 
 * Custom HTML/CSS generator for Template 7
 * Two-column with colored header
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
  <title>Template 7 - CV12 Comparison</title>
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
    
    /* Template 7 Specific Styles - Two-column with colored header */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Arial', sans-serif;
      overflow: hidden;
      position: relative;
    }
    
    /* Colored header bar */
    .header-bar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 35px 40px;
      color: white;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-left h1 {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .header-left h2 {
      font-size: 16px;
      font-weight: 300;
      opacity: 0.95;
    }
    
    .header-photo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: white;
      border: 4px solid rgba(255,255,255,0.3);
      overflow: hidden;
    }
    
    /* Two-column layout */
    .content-wrapper {
      display: flex;
      height: calc(100% - 120px);
    }
    
    .left-column {
      width: 32%;
      background: #f8f9fa;
      padding: 30px 25px;
      overflow-y: auto;
    }
    
    .right-column {
      width: 68%;
      padding: 30px 35px;
      overflow-y: auto;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 14px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding-bottom: 6px;
      border-bottom: 2px solid #667eea;
    }
    
    /* Left column styles */
    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      font-size: 11px;
      color: #666;
      line-height: 1.5;
    }
    
    .contact-icon {
      width: 20px;
      flex-shrink: 0;
      margin-right: 8px;
      color: #667eea;
    }
    
    .skill-item {
      margin-bottom: 12px;
    }
    
    .skill-name {
      font-size: 11px;
      color: #333;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .skill-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 4px;
    }
    
    .language-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 11px;
    }
    
    .language-name {
      font-weight: 500;
      color: #333;
    }
    
    .language-level {
      color: #666;
      font-size: 10px;
    }
    
    /* Right column styles */
    .summary-text {
      font-size: 12px;
      color: #666;
      line-height: 1.8;
      text-align: justify;
    }
    
    .experience-item {
      margin-bottom: 20px;
      padding-left: 18px;
      border-left: 3px solid #667eea;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }
    
    .experience-position {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    
    .experience-date {
      font-size: 11px;
      color: #999;
      font-style: italic;
    }
    
    .experience-company {
      font-size: 12px;
      color: #667eea;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .experience-description {
      font-size: 11px;
      color: #666;
      line-height: 1.7;
    }
    
    .experience-description ul {
      padding-left: 18px;
      margin: 5px 0;
    }
    
    .experience-description li {
      margin-bottom: 4px;
    }
    
    .education-item {
      margin-bottom: 18px;
    }
    
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }
    
    .education-degree {
      font-size: 13px;
      font-weight: bold;
      color: #333;
    }
    
    .education-date {
      font-size: 11px;
      color: #999;
      font-style: italic;
    }
    
    .education-school {
      font-size: 12px;
      color: #667eea;
      margin-bottom: 6px;
    }
    
    .education-details {
      font-size: 11px;
      color: #666;
      line-height: 1.6;
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
      <div class="panel-header">🎨 Generated HTML/CSS - Template 7</div>
      <div class="template-container">
        <!-- Colored Header -->
        <header class="header-bar">
          <div class="header-content">
            <div class="header-left">
              <h1>YOUR NAME</h1>
              <h2>Professional Title / Position</h2>
            </div>
            <div class="header-photo">
              <div style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">PHOTO</div>
            </div>
          </div>
        </header>
        
        <!-- Two-column content -->
        <div class="content-wrapper">
          <!-- Left Column -->
          <aside class="left-column">
            <div class="section">
              <h3 class="section-title">Contact</h3>
              <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div>email@example.com</div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div>+1 (555) 123-4567</div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>City, State, ZIP</div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">🌐</div>
                <div>yourwebsite.com</div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">💼</div>
                <div>linkedin.com/in/yourname</div>
              </div>
            </div>
            
            <div class="section">
              <h3 class="section-title">Skills</h3>
              <div class="skill-item">
                <div class="skill-name">Project Management</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 95%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Team Leadership</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Strategic Planning</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Data Analysis</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Communication</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%;"></div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h3 class="section-title">Languages</h3>
              <div class="language-item">
                <span class="language-name">English</span>
                <span class="language-level">Native</span>
              </div>
              <div class="language-item">
                <span class="language-name">Spanish</span>
                <span class="language-level">Fluent</span>
              </div>
              <div class="language-item">
                <span class="language-name">French</span>
                <span class="language-level">Intermediate</span>
              </div>
            </div>
            
            <div class="section">
              <h3 class="section-title">Certifications</h3>
              <div style="font-size: 11px; color: #666; line-height: 1.6;">
                <div style="margin-bottom: 10px;">
                  <strong style="color: #333;">PMP Certification</strong><br>
                  <span style="font-size: 10px;">Project Management Institute</span><br>
                  <span style="font-size: 10px; color: #999;">2022</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <strong style="color: #333;">Agile Scrum Master</strong><br>
                  <span style="font-size: 10px;">Scrum Alliance</span><br>
                  <span style="font-size: 10px; color: #999;">2021</span>
                </div>
              </div>
            </div>
          </aside>
          
          <!-- Right Column -->
          <main class="right-column">
            <div class="section">
              <h3 class="section-title">Professional Summary</h3>
              <p class="summary-text">
                Results-driven professional with 10+ years of experience in project management and strategic 
                leadership. Proven track record of delivering complex projects on time and within budget while 
                maintaining high quality standards. Skilled in team leadership, stakeholder management, and 
                process optimization. Passionate about driving innovation and fostering collaborative environments 
                that enable teams to achieve exceptional results.
              </p>
            </div>
            
            <div class="section">
              <h3 class="section-title">Professional Experience</h3>
              
              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-position">Senior Project Manager</div>
                  <div class="experience-date">January 2020 - Present</div>
                </div>
                <div class="experience-company">Tech Corporation, San Francisco, CA</div>
                <div class="experience-description">
                  <ul>
                    <li>Lead cross-functional teams of 15+ members in delivering enterprise software solutions</li>
                    <li>Manage project portfolios valued at $5M+ with 98% on-time delivery rate</li>
                    <li>Implement agile methodologies resulting in 35% improvement in team productivity</li>
                    <li>Collaborate with C-level executives to align project goals with business strategy</li>
                  </ul>
                </div>
              </div>
              
              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-position">Project Manager</div>
                  <div class="experience-date">March 2017 - December 2019</div>
                </div>
                <div class="experience-company">Digital Solutions Inc., New York, NY</div>
                <div class="experience-description">
                  <ul>
                    <li>Managed multiple concurrent projects with teams of 8-12 members</li>
                    <li>Reduced project delivery time by 28% through process optimization</li>
                    <li>Facilitated stakeholder meetings and provided regular project updates</li>
                    <li>Mentored junior project managers and contributed to team development</li>
                  </ul>
                </div>
              </div>
              
              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-position">Associate Project Manager</div>
                  <div class="experience-date">June 2015 - February 2017</div>
                </div>
                <div class="experience-company">Startup Ventures, Austin, TX</div>
                <div class="experience-description">
                  <ul>
                    <li>Assisted in planning and execution of software development projects</li>
                    <li>Coordinated with development teams to ensure timely deliverables</li>
                    <li>Created project documentation and status reports</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h3 class="section-title">Education</h3>
              
              <div class="education-item">
                <div class="education-header">
                  <div class="education-degree">Master of Business Administration (MBA)</div>
                  <div class="education-date">2013 - 2015</div>
                </div>
                <div class="education-school">Stanford University, Stanford, CA</div>
                <div class="education-details">
                  Concentration: Technology Management | GPA: 3.8/4.0<br>
                  Honors: Dean's List (All Semesters)
                </div>
              </div>
              
              <div class="education-item">
                <div class="education-header">
                  <div class="education-degree">Bachelor of Science in Computer Science</div>
                  <div class="education-date">2009 - 2013</div>
                </div>
                <div class="education-school">UC Berkeley, Berkeley, CA</div>
                <div class="education-details">
                  GPA: 3.7/4.0 | Honors: Magna Cum Laude<br>
                  Relevant Coursework: Software Engineering, Algorithms, Data Structures
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
  console.log('🎨 Generating Template 7 (CV12 - Two-column with colored header)...\n')
  
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
  console.log('\n✨ Template 7 Features:')
  console.log('   - Gradient header (purple/blue)')
  console.log('   - Photo in header (right side)')
  console.log('   - Two-column layout (32% / 68%)')
  console.log('   - Gradient skill progress bars')
  console.log('   - Left sidebar with gray background')
  console.log('   - Modern professional design')
  console.log('\n🎉 Done!')
}

main()
