/**
 * TEMPLATE CONVERTER SCRIPT
 * 
 * Takes template image URLs and generates HTML/CSS output
 * that can be viewed in a browser for comparison.
 * 
 * Usage:
 * 1. Add image URLs to images/images_links file
 * 2. Run: npm run convert-template
 * 3. Open generated HTML file in browser
 * 4. Compare side-by-side with original image
 */

import * as fs from 'fs'
import * as path from 'path'

interface TemplateAnalysis {
  name: string
  imageUrl: string
  layout: {
    type: 'single-column' | 'two-column' | 'three-column'
    headerHeight?: string
    sidebarWidth?: string
    mainWidth?: string
  }
  colors: {
    primary: string
    accent: string
    background: string
    sidebarBg?: string
    textDark: string
    textLight: string
  }
  typography: {
    fontFamily: string
    h1Size: string
    h2Size: string
    h3Size: string
    bodySize: string
    smallSize: string
  }
  spacing: {
    padding: string
    sectionMargin: string
    itemMargin: string
  }
}

/**
 * Read image URLs from the images_links file
 */
export function readImageLinks(): string[] {
  const linksPath = path.join(__dirname, 'images', 'images_links')
  
  if (!fs.existsSync(linksPath)) {
    console.error('❌ images_links file not found')
    return []
  }
  
  const content = fs.readFileSync(linksPath, 'utf-8')
  const links = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'))
  
  return links
}

/**
 * Analyze template from image URL
 * This is a manual process - you need to look at the image and fill this out
 */
export function analyzeTemplate(imageUrl: string, templateName: string): TemplateAnalysis {
  // Default analysis - customize based on actual image
  return {
    name: templateName,
    imageUrl: imageUrl,
    layout: {
      type: 'two-column',
      headerHeight: '100px',
      sidebarWidth: '30%',
      mainWidth: '70%'
    },
    colors: {
      primary: '#4a4a4a',
      accent: '#00bcd4',
      background: '#ffffff',
      sidebarBg: '#f0f0f0',
      textDark: '#333333',
      textLight: '#666666'
    },
    typography: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      h1Size: '32px',
      h2Size: '16px',
      h3Size: '14px',
      bodySize: '11px',
      smallSize: '9px'
    },
    spacing: {
      padding: '20px',
      sectionMargin: '15px',
      itemMargin: '10px'
    }
  }
}

/**
 * Generate HTML/CSS from template analysis
 */
export function generateHTML(analysis: TemplateAnalysis): string {
  const { layout, colors, typography, spacing } = analysis
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${analysis.name} - Template Comparison</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${typography.fontFamily};
      background: #e0e0e0;
      padding: 20px;
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: flex-start;
    }
    
    .comparison-container {
      display: flex;
      gap: 20px;
      max-width: 1800px;
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
      padding: 10px 20px;
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
    
    /* Generated Template Styles */
    .template-container {
      width: 850px;
      height: 1200px;
      background: ${colors.background};
      font-family: ${typography.fontFamily};
      overflow: hidden;
      position: relative;
    }
    
    ${layout.type === 'two-column' ? generateTwoColumnCSS(analysis) : ''}
    
    .header {
      background: ${colors.primary};
      color: white;
      padding: ${spacing.padding};
      text-align: center;
      height: ${layout.headerHeight || 'auto'};
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .header h1 {
      font-size: ${typography.h1Size};
      font-weight: bold;
      margin: 0 0 5px 0;
    }
    
    .header h2 {
      font-size: ${typography.h2Size};
      font-weight: 300;
      margin: 0;
    }
    
    .content-wrapper {
      display: flex;
      height: calc(100% - ${layout.headerHeight || '0px'});
    }
    
    .sidebar {
      width: ${layout.sidebarWidth};
      background: ${colors.sidebarBg};
      padding: ${spacing.padding};
      overflow-y: auto;
    }
    
    .main-content {
      width: ${layout.mainWidth};
      padding: ${spacing.padding};
      overflow-y: auto;
    }
    
    .section {
      margin-bottom: ${spacing.sectionMargin};
    }
    
    .section-header {
      font-size: ${typography.h2Size};
      font-weight: bold;
      color: ${colors.textDark};
      margin-bottom: ${spacing.itemMargin};
      text-transform: uppercase;
      border-bottom: 2px solid ${colors.accent};
      padding-bottom: 5px;
    }
    
    .section-item {
      margin-bottom: ${spacing.itemMargin};
    }
    
    .item-title {
      font-size: ${typography.h3Size};
      font-weight: 600;
      color: ${colors.textDark};
      margin-bottom: 4px;
    }
    
    .item-subtitle {
      font-size: ${typography.bodySize};
      color: ${colors.accent};
      margin-bottom: 4px;
    }
    
    .item-description {
      font-size: ${typography.bodySize};
      color: ${colors.textLight};
      line-height: 1.5;
    }
    
    .photo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #ddd;
      margin: 0 auto ${spacing.sectionMargin};
      border: 3px solid ${colors.accent};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 12px;
    }
    
    .skill-bar {
      margin-bottom: 8px;
    }
    
    .skill-name {
      font-size: ${typography.smallSize};
      margin-bottom: 4px;
      color: ${colors.textDark};
    }
    
    .skill-progress {
      width: 100%;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .skill-fill {
      height: 100%;
      background: ${colors.accent};
    }
    
    .badge {
      background: ${colors.accent};
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: ${typography.smallSize};
      display: inline-block;
      margin-bottom: 5px;
    }
    
    .contact-item {
      font-size: ${typography.smallSize};
      color: ${colors.textLight};
      margin-bottom: 5px;
    }
    
    ul {
      padding-left: 20px;
      font-size: ${typography.bodySize};
      color: ${colors.textLight};
    }
    
    li {
      margin-bottom: 4px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="comparison-container">
    <!-- Original Image -->
    <div class="panel original-image">
      <div class="panel-header">📸 Original Template</div>
      <img src="${analysis.imageUrl}" alt="Original Template">
    </div>
    
    <!-- Generated HTML/CSS -->
    <div class="panel">
      <div class="panel-header">🎨 Generated HTML/CSS</div>
      <div class="template-container">
        ${generateTemplateContent(analysis)}
      </div>
    </div>
  </div>
</body>
</html>`
}

function generateTwoColumnCSS(analysis: TemplateAnalysis): string {
  return `
    /* Two-column layout specific styles */
  `
}

function generateTemplateContent(analysis: TemplateAnalysis): string {
  return `
    <div class="header">
      <h1>Brian T. Wayne</h1>
      <h2>Product Manager</h2>
    </div>
    
    <div class="content-wrapper">
      <aside class="sidebar">
        <div class="photo">PHOTO</div>
        
        <div class="section">
          <div class="badge">ABOUT ME</div>
          <p class="item-description">
            Results-driven Product Manager with 8+ years of experience leading 
            cross-functional teams to deliver innovative solutions.
          </p>
        </div>
        
        <div class="section">
          <div class="badge">PERSONAL</div>
          <div class="contact-item"><strong>Brian T. Wayne</strong></div>
          <div class="contact-item">San Francisco, CA</div>
        </div>
        
        <div class="section">
          <div class="badge">SKILLS</div>
          <div class="skill-bar">
            <div class="skill-name">Product Management</div>
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
        </div>
        
        <div class="section">
          <div class="badge">LANGUAGES</div>
          <div class="contact-item"><strong>English:</strong> Native</div>
          <div class="contact-item"><strong>Spanish:</strong> Professional</div>
        </div>
        
        <div class="section">
          <div class="badge">CONTACT</div>
          <div class="contact-item">✉ brian.wayne@email.com</div>
          <div class="contact-item">📱 +1 (555) 234-5678</div>
          <div class="contact-item">🔗 linkedin.com/in/brianwayne</div>
        </div>
      </aside>
      
      <main class="main-content">
        <div class="section">
          <h2 class="section-header">Experience</h2>
          
          <div class="section-item">
            <h3 class="item-title">Senior Product Manager</h3>
            <div class="item-subtitle">Tech Corp • Jan 2020 - Present</div>
            <p class="item-description">
              Leading product strategy for enterprise SaaS platform
            </p>
            <ul>
              <li>Launched 3 major product features that increased user engagement by 45%</li>
              <li>Managed $2M product development budget and delivered projects on time</li>
              <li>Led cross-functional team of 12 engineers, designers, and analysts</li>
            </ul>
          </div>
          
          <div class="section-item">
            <h3 class="item-title">Product Manager</h3>
            <div class="item-subtitle">Startup Inc • Mar 2018 - Dec 2019</div>
            <p class="item-description">
              Managed mobile app product lifecycle
            </p>
            <ul>
              <li>Grew monthly active users from 50K to 500K in 18 months</li>
              <li>Conducted user research with 200+ customers to inform product roadmap</li>
            </ul>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Education</h2>
          
          <div class="section-item">
            <h3 class="item-title">MBA in Business Administration</h3>
            <div class="item-subtitle">Stanford University • 2014 - 2016</div>
            <div class="item-description">GPA: 3.9 • Dean's List, Product Management Specialization</div>
          </div>
          
          <div class="section-item">
            <h3 class="item-title">Bachelor of Science in Computer Science</h3>
            <div class="item-subtitle">UC Berkeley • 2010 - 2014</div>
            <div class="item-description">Cum Laude</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-header">Certifications</h2>
          <div class="section-item">
            <div class="item-subtitle">Mar 2019</div>
            <div class="item-description"><strong>Certified Scrum Product Owner (CSPO)</strong> - Scrum Alliance</div>
          </div>
        </div>
      </main>
    </div>
  `
}

/**
 * Main conversion function
 */
export function convertTemplates() {
  console.log('🎨 Template Converter Starting...\n')
  
  // Read image links
  const links = readImageLinks()
  
  if (links.length === 0) {
    console.log('❌ No image links found in images_links file')
    console.log('💡 Add image URLs (one per line) to: src/utils/images/images_links')
    return
  }
  
  console.log(`📸 Found ${links.length} template image(s)\n`)
  
  // Process each link
  links.forEach((link, index) => {
    const templateName = `template-${index + 1}`
    console.log(`Processing: ${templateName}`)
    console.log(`URL: ${link}\n`)
    
    // Analyze template (manual for now)
    const analysis = analyzeTemplate(link, templateName)
    
    // Generate HTML
    const html = generateHTML(analysis)
    
    // Save to file
    const outputDir = path.join(__dirname, 'output')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    const outputPath = path.join(outputDir, `${templateName}-comparison.html`)
    fs.writeFileSync(outputPath, html, 'utf-8')
    
    console.log(`✅ Generated: ${outputPath}`)
    console.log(`🌐 Open in browser to compare!\n`)
  })
  
  console.log('🎉 Conversion complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Open the generated HTML files in your browser')
  console.log('2. Compare side-by-side with original images')
  console.log('3. Adjust colors, spacing, and layout in the analysis')
  console.log('4. Re-run to see updated results')
}

// Run if executed directly
if (require.main === module) {
  convertTemplates()
}
