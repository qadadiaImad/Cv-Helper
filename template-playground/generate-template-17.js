/**
 * TEMPLATE 17 GENERATOR - Ivy League (Enhancv)
 * 
 * Professional single-column layout with blue accents and achievement grid
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function generateTemplate17HTML(imageUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template 17 - Ivy League Comparison</title>
  <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Volkhov:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'PT Sans', Arial, Helvetica, sans-serif;
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
      background: #002b7f;
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
    
    /* Template 17 - Ivy League Layout */
    .template-container {
      width: 850px;
      min-height: 1200px;
      background: #ffffff;
      padding: 50px;
      font-family: 'PT Sans', Arial, Helvetica, sans-serif;
      overflow: hidden;
    }
    
    /* Header */
    .header {
      text-align: center;
      margin-bottom: 24px;
      padding: 6px 12px;
    }
    
    .name {
      font-family: 'Volkhov', serif;
      font-size: 22px;
      font-weight: 700;
      color: #002b7f;
      margin-bottom: 6px;
    }
    
    .title {
      font-size: 18px;
      color: #56acf2;
      margin-bottom: 12px;
    }
    
    .contact-info {
      font-size: 13px;
      color: #333;
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .contact-separator {
      color: #999;
    }
    
    /* Sections */
    .section {
      margin-bottom: 24px;
      padding: 6px 12px;
    }
    
    .section-header {
      font-family: 'Volkhov', serif;
      font-size: 18px;
      font-weight: 700;
      color: #002b7f;
      border-bottom: 1px solid #002b7f;
      padding-bottom: 4px;
      margin-bottom: 12px;
    }
    
    .summary-text {
      font-size: 15px;
      color: #333;
      line-height: 1.6;
    }
    
    /* Awards Grid */
    .awards-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 12px;
    }
    
    .award-item {
      text-align: center;
      padding: 8px;
    }
    
    .award-title {
      font-size: 13px;
      font-weight: 700;
      color: #002b7f;
      margin-bottom: 4px;
    }
    
    .award-description {
      font-size: 11px;
      color: #666;
    }
    
    /* Experience Items */
    .experience-item {
      margin-bottom: 16px;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    
    .company-name {
      font-size: 18px;
      color: #56acf2;
      font-weight: 400;
    }
    
    .location {
      font-size: 15px;
      color: #333;
    }
    
    .position-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .position-title {
      font-size: 15px;
      color: #002b7f;
      font-weight: 700;
    }
    
    .date-range {
      font-size: 15px;
      color: #333;
    }
    
    .description {
      font-size: 13px;
      color: #333;
      line-height: 1.5;
      margin-bottom: 6px;
    }
    
    .description ul {
      margin-left: 20px;
    }
    
    .description li {
      margin-bottom: 4px;
    }
    
    /* Education Items */
    .education-item {
      margin-bottom: 12px;
    }
    
    .degree {
      font-size: 15px;
      color: #002b7f;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .institution {
      font-size: 13px;
      color: #56acf2;
      margin-bottom: 4px;
    }
    
    .education-details {
      font-size: 13px;
      color: #333;
    }
    
    /* Certifications */
    .certification-item {
      margin-bottom: 8px;
    }
    
    .certification-name {
      font-size: 13px;
      color: #002b7f;
      font-weight: 700;
    }
    
    .certification-issuer {
      font-size: 13px;
      color: #666;
    }
    
    /* Skills */
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-tag {
      font-size: 13px;
      color: #333;
      background: #f0f0f0;
      padding: 4px 12px;
      border-radius: 4px;
    }
    
    /* Projects */
    .project-item {
      margin-bottom: 12px;
    }
    
    .project-name {
      font-size: 15px;
      color: #002b7f;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .project-description {
      font-size: 13px;
      color: #333;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template 17 (Ivy League)</div>
      <img src="${imageUrl}" alt="Original Template" onerror="this.parentElement.innerHTML='<div style=\\"padding: 40px; text-align: center; color: #999;\\">Image not available</div>'">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS - Template 17 (Ivy League)</div>
      <div class="template-container">
        <!-- Header -->
        <header class="header">
          <h1 class="name">John Anderson</h1>
          <div class="title">Senior Financial Analyst</div>
          <div class="contact-info">
            <span>john.anderson@email.com</span>
            <span class="contact-separator">•</span>
            <span>linkedin.com/in/johnanderson</span>
            <span class="contact-separator">•</span>
            <span>New York, NY</span>
            <span class="contact-separator">•</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </header>

        <!-- Summary -->
        <section class="section">
          <h2 class="section-header">Professional Summary</h2>
          <p class="summary-text">
            Results-driven financial analyst with 8+ years of experience in financial modeling, 
            forecasting, and strategic planning. Proven track record of delivering actionable insights 
            that drive business growth and optimize financial performance. Expert in data analysis, 
            budgeting, and cross-functional collaboration.
          </p>
        </section>

        <!-- Awards -->
        <section class="section">
          <h2 class="section-header">Key Achievements</h2>
          <div class="awards-grid">
            <div class="award-item">
              <div class="award-title">$2.5M</div>
              <div class="award-description">Cost savings identified through process optimization</div>
            </div>
            <div class="award-item">
              <div class="award-title">98%</div>
              <div class="award-description">Forecast accuracy achieved in FY2023</div>
            </div>
            <div class="award-item">
              <div class="award-title">15+</div>
              <div class="award-description">Cross-functional projects led successfully</div>
            </div>
          </div>
        </section>

        <!-- Experience -->
        <section class="section">
          <h2 class="section-header">Professional Experience</h2>
          
          <div class="experience-item">
            <div class="experience-header">
              <div class="company-name">Goldman Sachs</div>
              <div class="location">New York, NY</div>
            </div>
            <div class="position-row">
              <div class="position-title">Senior Financial Analyst</div>
              <div class="date-range">Jan 2020 - Present</div>
            </div>
            <div class="description">
              <ul>
                <li>Lead financial modeling and forecasting for $500M portfolio, achieving 98% accuracy</li>
                <li>Develop strategic recommendations that resulted in $2.5M annual cost savings</li>
                <li>Collaborate with C-suite executives on quarterly business reviews and strategic planning</li>
                <li>Mentor team of 3 junior analysts, improving team productivity by 25%</li>
              </ul>
            </div>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div class="company-name">JPMorgan Chase</div>
              <div class="location">New York, NY</div>
            </div>
            <div class="position-row">
              <div class="position-title">Financial Analyst</div>
              <div class="date-range">Jun 2017 - Dec 2019</div>
            </div>
            <div class="description">
              <ul>
                <li>Conducted variance analysis and prepared monthly financial reports for senior management</li>
                <li>Built automated Excel models reducing reporting time by 40%</li>
                <li>Supported M&A due diligence for 5 transactions totaling $1.2B</li>
              </ul>
            </div>
          </div>

          <div class="experience-item">
            <div class="experience-header">
              <div class="company-name">Deloitte</div>
              <div class="location">New York, NY</div>
            </div>
            <div class="position-row">
              <div class="position-title">Junior Analyst</div>
              <div class="date-range">Jul 2015 - May 2017</div>
            </div>
            <div class="description">
              <ul>
                <li>Performed financial analysis and valuation for consulting engagements</li>
                <li>Created client presentations and executive dashboards</li>
                <li>Assisted in budget planning and forecasting processes</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section class="section">
          <h2 class="section-header">Education</h2>
          
          <div class="education-item">
            <div class="degree">Master of Business Administration (MBA)</div>
            <div class="institution">Columbia Business School</div>
            <div class="education-details">Finance Concentration • GPA: 3.8/4.0 • Graduated 2015</div>
          </div>

          <div class="education-item">
            <div class="degree">Bachelor of Science in Economics</div>
            <div class="institution">University of Pennsylvania</div>
            <div class="education-details">Magna Cum Laude • GPA: 3.7/4.0 • Graduated 2013</div>
          </div>
        </section>

        <!-- Certifications -->
        <section class="section">
          <h2 class="section-header">Certifications</h2>
          
          <div class="certification-item">
            <span class="certification-name">Chartered Financial Analyst (CFA)</span>
            <span class="certification-issuer"> • CFA Institute • 2018</span>
          </div>
          <div class="certification-item">
            <span class="certification-name">Financial Modeling & Valuation Analyst (FMVA)</span>
            <span class="certification-issuer"> • CFI • 2019</span>
          </div>
        </section>

        <!-- Skills -->
        <section class="section">
          <h2 class="section-header">Skills & Expertise</h2>
          <div class="skills-list">
            <span class="skill-tag">Financial Modeling</span>
            <span class="skill-tag">Excel (Advanced)</span>
            <span class="skill-tag">SQL</span>
            <span class="skill-tag">Python</span>
            <span class="skill-tag">Tableau</span>
            <span class="skill-tag">Bloomberg Terminal</span>
            <span class="skill-tag">Forecasting</span>
            <span class="skill-tag">Budgeting</span>
            <span class="skill-tag">Variance Analysis</span>
            <span class="skill-tag">M&A Analysis</span>
            <span class="skill-tag">Strategic Planning</span>
            <span class="skill-tag">Data Visualization</span>
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
  console.log('🎨 Generating Template 17 (Ivy League)...\n')
  
  const linksPath = path.join(__dirname, 'src', 'utils', 'images', 'images_links')
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'))
  
  // Use a placeholder if Template 17 URL not yet added
  let template17Url = 'https://via.placeholder.com/850x1200/002b7f/ffffff?text=Ivy+League+Template'
  
  if (links.length >= 9) {
    template17Url = links[8] // Ninth link (index 8)
  } else {
    console.log('⚠️  Template 17 URL not found in images_links, using placeholder')
  }
  
  const html = generateTemplate17HTML(template17Url)
  
  const outputDir = path.join(__dirname, 'src', 'utils', 'output')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const outputPath = path.join(outputDir, 'template-17-ivy-league.html')
  fs.writeFileSync(outputPath, html, 'utf-8')
  
  console.log(`✅ Generated: ${outputPath}`)
  console.log(`🌐 Open in browser: file:///${outputPath.replace(/\\/g, '/')}`)
  console.log('\n✨ Template 17 Features:')
  console.log('   - Professional single-column layout')
  console.log('   - Navy blue (#002b7f) section headers')
  console.log('   - Light blue (#56acf2) company names')
  console.log('   - Achievement grid (3 columns)')
  console.log('   - Centered header with contact info')
  console.log('   - Volkhov serif headings')
  console.log('   - PT Sans body text')
  console.log('   - A4 optimized (850×1200px)')
  console.log('\n🎯 Best for: Finance, Consulting, Corporate, Traditional industries')
  console.log('\n🎉 Done!')
}

main()
