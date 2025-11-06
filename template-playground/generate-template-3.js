/**
 * TEMPLATE 3 GENERATOR
 * 
 * Custom HTML/CSS generator for Template 3
 * Based on visual analysis of the template image
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate3HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 3 Comparison</title>
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
    
    /* Template 3 Specific Styles - Single Column Layout */
    .template-container {
      width: 850px;
      height: 1200px;
      background: #ffffff;
      font-family: 'Times New Roman', Georgia, serif;
      overflow: hidden;
      position: relative;
      padding: 40px 60px;
    }
    
    .template-header {
      text-align: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #333;
    }
    
    .template-header h1 {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    
    .template-header .contact-info {
      font-size: 11px;
      color: #666;
      line-height: 1.6;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section-header {
      font-size: 14px;
      font-weight: bold;
      color: #333;
      text-transform: uppercase;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #333;
      letter-spacing: 1px;
    }
    
    .section-content {
      font-size: 11px;
      color: #333;
      line-height: 1.6;
    }
    
    /* Education Section */
    .education-item {
      margin-bottom: 12px;
    }
    
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    
    .education-degree {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }
    
    .education-date {
      font-size: 11px;
      color: #666;
      font-style: italic;
    }
    
    .education-school {
      font-size: 11px;
      color: #333;
      margin-bottom: 3px;
    }
    
    .education-details {
      font-size: 10px;
      color: #666;
      line-height: 1.5;
      margin-left: 15px;
    }
    
    /* Experience Section */
    .experience-item {
      margin-bottom: 15px;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }
    
    .experience-title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }
    
    .experience-date {
      font-size: 11px;
      color: #666;
      font-style: italic;
    }
    
    .experience-company {
      font-size: 11px;
      color: #333;
      margin-bottom: 5px;
    }
    
    .experience-description {
      font-size: 10px;
      color: #666;
      line-height: 1.5;
      margin-left: 15px;
    }
    
    .experience-description ul {
      margin: 5px 0;
      padding-left: 20px;
    }
    
    .experience-description li {
      margin-bottom: 3px;
    }
    
    /* Skills Section */
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    
    .skill-category {
      flex: 1;
      min-width: 200px;
    }
    
    .skill-category-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    
    .skill-items {
      font-size: 10px;
      color: #666;
      line-height: 1.5;
    }
    
    /* Publications Section */
    .publication-item {
      margin-bottom: 10px;
      font-size: 10px;
      color: #333;
      line-height: 1.5;
      padding-left: 15px;
      text-indent: -15px;
    }
    
    /* Awards Section */
    .award-item {
      margin-bottom: 8px;
    }
    
    .award-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    
    .award-title {
      font-size: 11px;
      font-weight: bold;
      color: #333;
    }
    
    .award-date {
      font-size: 10px;
      color: #666;
      font-style: italic;
    }
    
    .award-description {
      font-size: 10px;
      color: #666;
      line-height: 1.4;
      margin-left: 15px;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 3</div>
      <img src="${imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 3</div>
      <div class="template-container">
        <div class="template-header">
          <h1>YOUR NAME</h1>
          <div class="contact-info">
            Address Line 1 • City, State ZIP<br>
            Phone: (123) 456-7890 • Email: your.email@example.com<br>
            LinkedIn: linkedin.com/in/yourprofile • Website: yourwebsite.com
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Education</h2>
          <div class="education-item">
            <div class="education-header">
              <div class="education-degree">Master of Science in Computer Science</div>
              <div class="education-date">Expected May 2024</div>
            </div>
            <div class="education-school">University Name, City, State</div>
            <div class="education-details">
              • GPA: 3.9/4.0<br>
              • Relevant Coursework: Machine Learning, Data Structures, Algorithms<br>
              • Thesis: Advanced Topics in Artificial Intelligence
            </div>
          </div>
          <div class="education-item">
            <div class="education-header">
              <div class="education-degree">Bachelor of Science in Computer Science</div>
              <div class="education-date">May 2022</div>
            </div>
            <div class="education-school">University Name, City, State</div>
            <div class="education-details">
              • GPA: 3.8/4.0<br>
              • Honors: Magna Cum Laude, Dean's List (All Semesters)<br>
              • Minor in Mathematics
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Experience</h2>
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-title">Software Engineer Intern</div>
              <div class="experience-date">June 2023 – August 2023</div>
            </div>
            <div class="experience-company">Company Name, City, State</div>
            <div class="experience-description">
              <ul>
                <li>Developed and maintained web applications using React and Node.js</li>
                <li>Collaborated with cross-functional teams to deliver high-quality software solutions</li>
                <li>Implemented new features that improved user engagement by 25%</li>
                <li>Participated in code reviews and contributed to team best practices</li>
              </ul>
            </div>
          </div>
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-title">Research Assistant</div>
              <div class="experience-date">January 2022 – May 2023</div>
            </div>
            <div class="experience-company">University Research Lab, City, State</div>
            <div class="experience-description">
              <ul>
                <li>Conducted research on machine learning algorithms for natural language processing</li>
                <li>Published findings in peer-reviewed conferences and journals</li>
                <li>Mentored undergraduate students in research methodologies</li>
                <li>Presented research at national conferences</li>
              </ul>
            </div>
          </div>
          <div class="experience-item">
            <div class="experience-header">
              <div class="experience-title">Teaching Assistant</div>
              <div class="experience-date">September 2021 – December 2021</div>
            </div>
            <div class="experience-company">University Name, City, State</div>
            <div class="experience-description">
              <ul>
                <li>Assisted professor in teaching Introduction to Programming course</li>
                <li>Held office hours and provided one-on-one tutoring to students</li>
                <li>Graded assignments and provided constructive feedback</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Skills</h2>
          <div class="skills-list">
            <div class="skill-category">
              <div class="skill-category-title">Programming Languages:</div>
              <div class="skill-items">Python, JavaScript, Java, C++, SQL, R</div>
            </div>
            <div class="skill-category">
              <div class="skill-category-title">Technologies:</div>
              <div class="skill-items">React, Node.js, Django, TensorFlow, PyTorch, Git</div>
            </div>
            <div class="skill-category">
              <div class="skill-category-title">Tools:</div>
              <div class="skill-items">VS Code, Docker, AWS, Linux, Jupyter Notebook</div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Publications</h2>
          <div class="publication-item">
            [1] Author Name, Co-Author Name. "Title of Research Paper." Conference Name, Year. pp. 123-456.
          </div>
          <div class="publication-item">
            [2] Author Name, Co-Author Name. "Another Research Paper Title." Journal Name, Vol. X, No. Y, Year.
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Awards & Honors</h2>
          <div class="award-item">
            <div class="award-header">
              <div class="award-title">Best Paper Award</div>
              <div class="award-date">2023</div>
            </div>
            <div class="award-description">Received for outstanding research contribution at International Conference</div>
          </div>
          <div class="award-item">
            <div class="award-header">
              <div class="award-title">Graduate Research Fellowship</div>
              <div class="award-date">2022-2024</div>
            </div>
            <div class="award-description">Competitive fellowship awarded to top graduate students</div>
          </div>
          <div class="award-item">
            <div class="award-header">
              <div class="award-title">Dean's List</div>
              <div class="award-date">2019-2022</div>
            </div>
            <div class="award-description">Achieved every semester during undergraduate studies</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`
}

// Main
function main() {
  console.log('🎨 Generating Template 3 (Academic CV)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  if (links.length < 3) {
    console.log('❌ Template 3 URL not found')
    return
  }
  
  const template3Url = links[2] // Third link
  const html = generateTemplate3HTML(template3Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-3-custom.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 3 Features:')
  console.log('   - Single column academic layout')
  console.log('   - Traditional serif font (Times New Roman)')
  console.log('   - Centered header with contact info')
  console.log('   - Clean section dividers')
  console.log('   - Education with GPA and coursework')
  console.log('   - Experience with bullet points')
  console.log('   - Skills organized by category')
  console.log('   - Publications in academic format')
  console.log('   - Awards & Honors section')
  console.log('\n🎉 Done!')
}

main()
