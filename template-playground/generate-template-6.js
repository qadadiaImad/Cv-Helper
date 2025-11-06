/**
 * TEMPLATE 6 GENERATOR - CV Template 1 (LiveCareer)
 * 
 * Custom HTML/CSS generator for Template 6
 * Minimal clean design
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate6HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 6 - CV1 Comparison</title>
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
      justify-center;
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
    
    /* Template 6 Specific Styles - Minimal Clean */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Arial', sans-serif;
      overflow: hidden;
      position: relative;
      padding: 50px 60px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 35px;
      padding-bottom: 20px;
      border-bottom: 3px solid #333;
    }
    
    .name {
      font-size: 42px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    
    .title {
      font-size: 18px;
      color: #666;
      font-weight: 300;
      margin-bottom: 15px;
    }
    
    .contact-info {
      font-size: 11px;
      color: #666;
      line-height: 1.8;
    }
    
    .contact-info span {
      margin: 0 10px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding-bottom: 8px;
      border-bottom: 2px solid #333;
    }
    
    .summary-text {
      font-size: 12px;
      color: #666;
      line-height: 1.8;
      text-align: justify;
    }
    
    .experience-item {
      margin-bottom: 20px;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    
    .experience-position {
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    
    .experience-date {
      font-size: 12px;
      color: #999;
      font-style: italic;
    }
    
    .experience-company {
      font-size: 13px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .experience-description {
      font-size: 11px;
      color: #666;
      line-height: 1.7;
    }
    
    .experience-description ul {
      padding-left: 20px;
      margin: 6px 0;
    }
    
    .experience-description li {
      margin-bottom: 5px;
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
      font-size: 14px;
      font-weight: bold;
      color: #333;
    }
    
    .education-date {
      font-size: 12px;
      color: #999;
      font-style: italic;
    }
    
    .education-school {
      font-size: 13px;
      color: #666;
      margin-bottom: 6px;
    }
    
    .education-details {
      font-size: 11px;
      color: #666;
      line-height: 1.6;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    
    .skill-item {
      font-size: 11px;
      color: #666;
      padding: 8px 12px;
      background: #f5f5f5;
      border-left: 3px solid #333;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 6 (CV1)</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 6</div>
      <div class="template-container">
        <header class="header">
          <h1 class="name">YOUR NAME</h1>
          <h2 class="title">Professional Title</h2>
          <div class="contact-info">
            <span>📧 email@example.com</span>
            <span>📱 +1 (555) 123-4567</span>
            <span>📍 City, State</span>
            <span>🌐 yourwebsite.com</span>
          </div>
        </header>
        
        <section class="section">
          <h3 class="section-title">Professional Summary</h3>
          <p class="summary-text">
            Accomplished professional with 10+ years of experience in project management and strategic planning. 
            Demonstrated expertise in leading cross-functional teams, optimizing processes, and delivering 
            high-impact results. Strong analytical and communication skills with a proven ability to drive 
            organizational success through innovative solutions and collaborative leadership.
          </p>
        </section>
        
        <section class="section">
          <h3 class="section-title">Professional Experience</h3>
          
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-position">Senior Project Manager</div>
              <div class="experience-date">January 2020 - Present</div>
            </div>
            <div class="experience-company">Tech Corporation | San Francisco, CA</div>
            <div class="experience-description">
              <ul>
                <li>Lead cross-functional teams of 15+ members in delivering enterprise software solutions valued at $5M+</li>
                <li>Implement agile methodologies resulting in 35% improvement in project delivery efficiency</li>
                <li>Manage stakeholder relationships and provide strategic guidance to C-level executives</li>
                <li>Oversee project budgets exceeding $2M with consistent on-time and under-budget delivery</li>
              </ul>
            </div>
          </div>
          
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-position">Project Manager</div>
              <div class="experience-date">March 2017 - December 2019</div>
            </div>
            <div class="experience-company">Digital Solutions Inc. | New York, NY</div>
            <div class="experience-description">
              <ul>
                <li>Managed portfolio of 5-7 concurrent projects with teams of 8-12 members</li>
                <li>Reduced project delivery time by 28% through process optimization and automation</li>
                <li>Facilitated weekly stakeholder meetings and provided comprehensive project updates</li>
                <li>Mentored 3 junior project managers, contributing to their professional development</li>
              </ul>
            </div>
          </div>
          
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-position">Associate Project Manager</div>
              <div class="experience-date">June 2015 - February 2017</div>
            </div>
            <div class="experience-company">Startup Ventures | Austin, TX</div>
            <div class="experience-description">
              <ul>
                <li>Supported senior project managers in planning and executing software development projects</li>
                <li>Coordinated with development teams to ensure timely completion of project milestones</li>
                <li>Created detailed project documentation, status reports, and risk assessments</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section class="section">
          <h3 class="section-title">Education</h3>
          
          <div class="education-item">
            <div class="education-header">
              <div class="education-degree">Master of Business Administration (MBA)</div>
              <div class="education-date">2013 - 2015</div>
            </div>
            <div class="education-school">Stanford University | Stanford, CA</div>
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
            <div class="education-school">University of California, Berkeley | Berkeley, CA</div>
            <div class="education-details">
              GPA: 3.7/4.0 | Honors: Magna Cum Laude<br>
              Relevant Coursework: Software Engineering, Data Structures, Algorithms
            </div>
          </div>
        </section>
        
        <section class="section">
          <h3 class="section-title">Skills & Competencies</h3>
          <div class="skills-grid">
            <div class="skill-item">Project Management</div>
            <div class="skill-item">Agile/Scrum</div>
            <div class="skill-item">Team Leadership</div>
            <div class="skill-item">Strategic Planning</div>
            <div class="skill-item">Stakeholder Management</div>
            <div class="skill-item">Budget Management</div>
            <div class="skill-item">Risk Assessment</div>
            <div class="skill-item">Process Optimization</div>
            <div class="skill-item">Data Analysis</div>
          </div>
        </section>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main
function main() {
  console.log('🎨 Generating Template 6 (CV1 - Minimal Clean)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 6) {
    console.log('❌ Template 6 URL not found')
    return
  }
  
  const template6Url = links[5] // Sixth link (index 5)
  const html = generateTemplate6HTML(template6Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-6-custom.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 6 Features:')
  console.log('   - Centered header with name and title')
  console.log('   - Clean minimal design')
  console.log('   - Single column layout')
  console.log('   - Skills in grid format')
  console.log('   - Professional typography')
  console.log('   - ATS-friendly format')
  console.log('\n🎉 Done!')
}

main()
