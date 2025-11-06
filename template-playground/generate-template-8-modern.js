/**
 * TEMPLATE 8 GENERATOR - Modern Resume (ResumeSector)
 * 
 * Highly accurate recreation based on detailed analysis
 * Will analyze the actual image to ensure maximum correlation
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate8HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 8 - Modern Resume Comparison</title>
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
    
    /* Template 8 - Modern Resume Accurate Layout */
    .template-container {
      width: 850px;
      min-height: 1200px;
      background: #ffffff;
      font-family: 'Helvetica', 'Arial', sans-serif;
      display: flex;
      overflow: hidden;
    }
    
    /* Left sidebar - Dark blue/navy */
    .sidebar {
      width: 35%;
      background: #1a2332;
      color: white;
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
    }
    
    /* Photo section */
    .photo-section {
      text-align: center;
      margin-bottom: 35px;
    }
    
    .photo-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: white;
      margin: 0 auto 20px;
      overflow: hidden;
      border: 4px solid #3498db;
    }
    
    .photo-circle img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .name-sidebar {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
      text-align: center;
      color: white;
    }
    
    .title-sidebar {
      font-size: 14px;
      color: #3498db;
      text-align: center;
      font-weight: 300;
    }
    
    /* Sidebar sections */
    .sidebar-section {
      margin-bottom: 30px;
    }
    
    .sidebar-title {
      font-size: 14px;
      font-weight: bold;
      color: #3498db;
      text-transform: uppercase;
      margin-bottom: 15px;
      letter-spacing: 1px;
      padding-bottom: 8px;
      border-bottom: 2px solid #3498db;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      font-size: 11px;
      gap: 10px;
      line-height: 1.6;
    }
    
    .contact-icon {
      color: #3498db;
      font-size: 14px;
      flex-shrink: 0;
      width: 20px;
    }
    
    .skill-item {
      margin-bottom: 15px;
    }
    
    .skill-name {
      font-size: 11px;
      margin-bottom: 6px;
      font-weight: 500;
    }
    
    .skill-bar {
      height: 6px;
      background: #2c3e50;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: #3498db;
      border-radius: 3px;
      transition: width 0.3s ease;
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
    }
    
    .language-dots {
      display: flex;
      gap: 4px;
    }
    
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2c3e50;
    }
    
    .dot.filled {
      background: #3498db;
    }
    
    /* Main content area */
    .main-content {
      width: 65%;
      background: white;
      padding: 40px 40px 40px 45px;
      overflow-y: auto;
    }
    
    .header {
      margin-bottom: 35px;
    }
    
    .name-main {
      font-size: 42px;
      font-weight: bold;
      color: #1a2332;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .title-main {
      font-size: 18px;
      color: #3498db;
      font-weight: 300;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #1a2332;
      text-transform: uppercase;
      margin-bottom: 18px;
      padding-bottom: 10px;
      border-bottom: 3px solid #3498db;
      letter-spacing: 1px;
    }
    
    .profile-text {
      font-size: 12px;
      color: #555;
      line-height: 1.8;
      text-align: justify;
    }
    
    .experience-item {
      margin-bottom: 25px;
      position: relative;
      padding-left: 25px;
    }
    
    .experience-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      width: 10px;
      height: 10px;
      background: #3498db;
      border-radius: 50%;
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
      color: #1a2332;
    }
    
    .experience-date {
      font-size: 11px;
      color: #3498db;
      font-weight: 500;
    }
    
    .experience-company {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      font-style: italic;
    }
    
    .experience-description {
      font-size: 11px;
      color: #555;
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
      margin-bottom: 20px;
      position: relative;
      padding-left: 25px;
    }
    
    .education-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      width: 10px;
      height: 10px;
      background: #3498db;
      border-radius: 50%;
    }
    
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 6px;
    }
    
    .education-degree {
      font-size: 13px;
      font-weight: bold;
      color: #1a2332;
    }
    
    .education-date {
      font-size: 11px;
      color: #3498db;
      font-weight: 500;
    }
    
    .education-school {
      font-size: 12px;
      color: #666;
      margin-bottom: 6px;
    }
    
    .education-details {
      font-size: 11px;
      color: #555;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 8 (Modern Resume)</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 8</div>
      <div class="template-container">
        <!-- Left Sidebar - Dark Navy -->
        <aside class="sidebar">
          <!-- Photo and Name -->
          <div class="photo-section">
            <div class="photo-circle">
              <div style="width: 100%; height: 100%; background: #ddd; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #999;">PHOTO</div>
            </div>
            <h2 class="name-sidebar">JOHN DOE</h2>
            <p class="title-sidebar">Senior Software Engineer</p>
          </div>
          
          <!-- Contact -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Contact</h3>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <span>john.doe@email.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>San Francisco, CA 94102</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
              <span>linkedin.com/in/johndoe</span>
            </div>
          </div>
          
          <!-- Skills -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Skills</h3>
            <div class="skill-item">
              <div class="skill-name">JavaScript / TypeScript</div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: 95%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-name">React / Next.js</div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: 90%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-name">Node.js / Express</div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: 85%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-name">Python / Django</div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: 80%;"></div>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-name">SQL / MongoDB</div>
              <div class="skill-bar">
                <div class="skill-progress" style="width: 85%;"></div>
              </div>
            </div>
          </div>
          
          <!-- Languages -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">Languages</h3>
            <div class="language-item">
              <span class="language-name">English</span>
              <div class="language-dots">
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
              </div>
            </div>
            <div class="language-item">
              <span class="language-name">Spanish</span>
              <div class="language-dots">
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot"></span>
              </div>
            </div>
            <div class="language-item">
              <span class="language-name">French</span>
              <div class="language-dots">
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot filled"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </aside>
        
        <!-- Main Content - White -->
        <main class="main-content">
          <!-- Header -->
          <header class="header">
            <h1 class="name-main">JOHN DOE</h1>
            <p class="title-main">Senior Software Engineer</p>
          </header>
          
          <!-- Profile -->
          <section class="section">
            <h2 class="section-title">Profile</h2>
            <p class="profile-text">
              Results-driven Senior Software Engineer with 8+ years of experience in full-stack development. 
              Proven expertise in building scalable web applications using modern JavaScript frameworks and 
              cloud technologies. Strong background in leading development teams and delivering high-quality 
              solutions that drive business growth. Passionate about clean code, best practices, and continuous 
              learning in the ever-evolving tech landscape.
            </p>
          </section>
          
          <!-- Experience -->
          <section class="section">
            <h2 class="section-title">Work Experience</h2>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Senior Software Engineer</div>
                <div class="experience-date">Jan 2021 - Present</div>
              </div>
              <div class="experience-company">Tech Innovations Inc., San Francisco, CA</div>
              <div class="experience-description">
                <ul>
                  <li>Lead development of microservices architecture serving 2M+ daily active users</li>
                  <li>Architected and implemented real-time data processing pipeline using Node.js and Redis</li>
                  <li>Reduced API response time by 40% through optimization and caching strategies</li>
                  <li>Mentored team of 5 junior developers and conducted code reviews</li>
                </ul>
              </div>
            </div>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Full Stack Developer</div>
                <div class="experience-date">Mar 2018 - Dec 2020</div>
              </div>
              <div class="experience-company">Digital Solutions Ltd., New York, NY</div>
              <div class="experience-description">
                <ul>
                  <li>Developed and maintained 15+ client-facing web applications using React and Node.js</li>
                  <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                  <li>Collaborated with UX team to improve user engagement by 35%</li>
                  <li>Integrated third-party APIs and payment gateways</li>
                </ul>
              </div>
            </div>
            
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-position">Junior Developer</div>
                <div class="experience-date">Jun 2016 - Feb 2018</div>
              </div>
              <div class="experience-company">StartUp Ventures, Austin, TX</div>
              <div class="experience-description">
                <ul>
                  <li>Built responsive web interfaces using HTML5, CSS3, and JavaScript</li>
                  <li>Participated in agile development process and daily stand-ups</li>
                  <li>Fixed bugs and implemented new features based on user feedback</li>
                </ul>
              </div>
            </div>
          </section>
          
          <!-- Education -->
          <section class="section">
            <h2 class="section-title">Education</h2>
            
            <div class="education-item">
              <div class="education-header">
                <div class="education-degree">Master of Science in Computer Science</div>
                <div class="education-date">2014 - 2016</div>
              </div>
              <div class="education-school">Stanford University, Stanford, CA</div>
              <div class="education-details">
                GPA: 3.9/4.0 | Focus: Distributed Systems and Machine Learning
              </div>
            </div>
            
            <div class="education-item">
              <div class="education-header">
                <div class="education-degree">Bachelor of Science in Software Engineering</div>
                <div class="education-date">2010 - 2014</div>
              </div>
              <div class="education-school">UC Berkeley, Berkeley, CA</div>
              <div class="education-details">
                GPA: 3.8/4.0 | Honors: Magna Cum Laude | Dean's List (All Semesters)
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
  console.log('🎨 Generating Template 8 (Modern Resume - ResumeSector)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 8) {
    console.log('❌ Template 8 URL not found')
    return
  }
  
  const template8Url = links[7] // Eighth link (index 7)
  const html = generateTemplate8HTML(template8Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-8-modern.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 8 Features:')
  console.log('   - Dark navy sidebar (35%) with white text')
  console.log('   - Circular photo with blue border')
  console.log('   - Blue accent color (#3498db)')
  console.log('   - Skill progress bars')
  console.log('   - Language proficiency dots')
  console.log('   - Blue bullet points for timeline')
  console.log('   - White main content (65%)')
  console.log('   - Modern professional design')
  console.log('\n🎉 Done!')
}

main()
