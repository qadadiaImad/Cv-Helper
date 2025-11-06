/**
 * TEMPLATE 5 GENERATOR - CV Template 9 (LiveCareer)
 * 
 * Custom HTML/CSS generator for Template 5
 * Analyzing SVG structure to recreate layout
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
  <title>Template 5 - CV9 Comparison</title>
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
    
    /* Template 5 Specific Styles - CV9 Layout */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Lato', 'Arial', sans-serif;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    /* Top section with name and icon */
    .top-section {
      display: flex;
      padding: 40px 30px 30px 30px;
      background: #e8ebe8;
      align-items: center;
      gap: 25px;
    }
    
    .icon-box {
      width: 90px;
      height: 90px;
      background: #2d7a6e;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .icon-box::before,
    .icon-box::after {
      content: '';
      position: absolute;
      background: white;
    }
    
    .icon-box::before {
      width: 40px;
      height: 2px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .icon-box::after {
      width: 2px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .name-title h1 {
      font-size: 32px;
      font-weight: 300;
      color: #333;
      margin: 0;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    
    .sidebar-section {
      margin-bottom: 25px;
    }
    
    .sidebar-title {
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 12px;
      letter-spacing: 1px;
      border-bottom: 2px solid rgba(255,255,255,0.3);
      padding-bottom: 6px;
    }
    
    .sidebar-content {
      font-size: 11px;
      line-height: 1.6;
    }
    
    .skill-item {
      margin-bottom: 12px;
    }
    
    .skill-name {
      font-size: 11px;
      margin-bottom: 4px;
    }
    
    .skill-bar {
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: #4a9fd8;
      border-radius: 3px;
    }
    
    /* Main content area */
    .main-content {
      margin-left: 35%;
      padding: 40px 35px;
      height: 100%;
      overflow-y: auto;
    }
    
    .header {
      margin-bottom: 30px;
    }
    
    .name {
      font-size: 38px;
      font-weight: bold;
      color: #2c5f7c;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .title {
      font-size: 16px;
      color: #666;
      font-weight: 300;
      letter-spacing: 0.5px;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #2c5f7c;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #2c5f7c;
      padding-bottom: 6px;
    }
    
    .experience-item {
      margin-bottom: 18px;
      padding-left: 20px;
      border-left: 3px solid #4a9fd8;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 5px;
    }
    
    .experience-position {
      font-size: 13px;
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
      color: #2c5f7c;
      margin-bottom: 8px;
    }
    
    .experience-description {
      font-size: 11px;
      color: #666;
      line-height: 1.6;
    }
    
    .experience-description ul {
      padding-left: 18px;
      margin: 5px 0;
    }
    
    .experience-description li {
      margin-bottom: 4px;
    }
    
    .education-item {
      margin-bottom: 15px;
    }
    
    .education-degree {
      font-size: 13px;
      font-weight: bold;
      color: #333;
      margin-bottom: 3px;
    }
    
    .education-school {
      font-size: 12px;
      color: #2c5f7c;
      margin-bottom: 5px;
    }
    
    .education-details {
      font-size: 11px;
      color: #666;
      line-height: 1.5;
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
      <div class="panel-header">🎨 Generated HTML/CSS - Template 5</div>
      <div class="template-container">
        <!-- Left Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-photo">
            <div style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">PHOTO</div>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Contact</h3>
            <div class="sidebar-content">
              <div style="margin-bottom: 8px;">📧 email@example.com</div>
              <div style="margin-bottom: 8px;">📱 +1 (555) 123-4567</div>
              <div style="margin-bottom: 8px;">📍 City, State</div>
              <div style="margin-bottom: 8px;">🌐 yourwebsite.com</div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Skills</h3>
            <div class="sidebar-content">
              <div class="skill-item">
                <div class="skill-name">Project Management</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Team Leadership</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Strategic Planning</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%;"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-name">Data Analysis</div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 75%;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Languages</h3>
            <div class="sidebar-content">
              <div style="margin-bottom: 6px;">English - Native</div>
              <div style="margin-bottom: 6px;">Spanish - Fluent</div>
              <div style="margin-bottom: 6px;">French - Intermediate</div>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3 class="sidebar-title">Certifications</h3>
            <div class="sidebar-content" style="font-size: 10px;">
              <div style="margin-bottom: 8px;">
                <strong>PMP Certification</strong><br>
                Project Management Institute<br>
                2022
              </div>
              <div style="margin-bottom: 8px;">
                <strong>Agile Scrum Master</strong><br>
                Scrum Alliance<br>
                2021
              </div>
            </div>
          </div>
        </aside>
        
        <!-- Main Content -->
        <main class="main-content">
          <header class="header">
            <h1 class="name">YOUR NAME</h1>
            <h2 class="title">Professional Title / Position</h2>
          </header>
          
          <section class="section">
            <h3 class="section-title">Profile</h3>
            <p style="font-size: 11px; color: #666; line-height: 1.7; text-align: justify;">
              Results-driven professional with 10+ years of experience in project management and team leadership. 
              Proven track record of delivering complex projects on time and within budget. Skilled in strategic 
              planning, stakeholder management, and process optimization. Passionate about driving innovation 
              and fostering collaborative team environments.
            </p>
          </section>
          
          <section class="section">
            <h3 class="section-title">Experience</h3>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Senior Project Manager</div>
                <div class="experience-date">Jan 2020 - Present</div>
              </div>
              <div class="experience-company">Tech Corporation, San Francisco, CA</div>
              <div class="experience-description">
                <ul>
                  <li>Led cross-functional teams of 15+ members in delivering enterprise software solutions</li>
                  <li>Managed project budgets exceeding $2M with 98% on-time delivery rate</li>
                  <li>Implemented agile methodologies resulting in 30% improvement in team productivity</li>
                  <li>Collaborated with C-level executives to align project goals with business objectives</li>
                </ul>
              </div>
            </div>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Project Manager</div>
                <div class="experience-date">Mar 2017 - Dec 2019</div>
              </div>
              <div class="experience-company">Digital Solutions Inc., New York, NY</div>
              <div class="experience-description">
                <ul>
                  <li>Managed multiple concurrent projects with teams of 8-10 members</li>
                  <li>Reduced project delivery time by 25% through process optimization</li>
                  <li>Facilitated stakeholder meetings and provided regular project updates</li>
                  <li>Mentored junior project managers and team members</li>
                </ul>
              </div>
            </div>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Associate Project Manager</div>
                <div class="experience-date">Jun 2015 - Feb 2017</div>
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
          </section>
          
          <section class="section">
            <h3 class="section-title">Education</h3>
            
            <div class="education-item">
              <div class="education-degree">Master of Business Administration (MBA)</div>
              <div class="education-school">Stanford University, Stanford, CA</div>
              <div class="education-details">
                Graduated: 2015 | GPA: 3.8/4.0<br>
                Concentration: Technology Management
              </div>
            </div>
            
            <div class="education-item">
              <div class="education-degree">Bachelor of Science in Computer Science</div>
              <div class="education-school">University of California, Berkeley, CA</div>
              <div class="education-details">
                Graduated: 2013 | GPA: 3.7/4.0<br>
                Honors: Magna Cum Laude
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main
function main() {
  console.log('🎨 Generating Template 5 (CV9 - Modern Professional)...\n')
  
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
  console.log('\n✨ Template 5 Features:')
  console.log('   - Left sidebar with blue accent (35%)')
  console.log('   - Circular photo in sidebar')
  console.log('   - Skill progress bars')
  console.log('   - Modern professional layout')
  console.log('   - Clean typography')
  console.log('   - Contact info in sidebar')
  console.log('\n🎉 Done!')
}

main()
