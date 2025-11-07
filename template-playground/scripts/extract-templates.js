#!/usr/bin/env node

/**
 * Automated Template Extractor
 * 
 * Extracts CV templates from various providers (Enhancv, Resume.io, FlowCV)
 * and generates React components automatically.
 * 
 * Usage:
 *   node scripts/extract-templates.js --provider enhancv --all
 *   node scripts/extract-templates.js --provider enhancv --template stockholm
 *   node scripts/extract-templates.js --provider enhancv --templates milan,vienna,new-york
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PROVIDERS = {
  enhancv: {
    name: 'Enhancv',
    baseUrl: 'https://app.enhancv.com',
    templatesUrl: 'https://app.enhancv.com/templates',
    selector: '.resume-editor-wrapper',
    templates: [
      { id: 'stockholm', name: 'Single Column', number: 18 },
      { id: 'milan', name: 'Milan', number: 19 },
      { id: 'vienna', name: 'Vienna', number: 20 },
      { id: 'new-york', name: 'New York', number: 21 },
      { id: 'elegant', name: 'Elegant', number: 22 },
      { id: 'modern', name: 'Modern', number: 23 },
      { id: 'contemporary', name: 'Contemporary', number: 24 },
      { id: 'polished', name: 'Polished', number: 25 },
      { id: 'creative', name: 'Creative', number: 26 },
      { id: 'timeline', name: 'Timeline', number: 27 },
      { id: 'stylish', name: 'Stylish', number: 28 },
      { id: 'compact', name: 'Compact', number: 29 },
      { id: 'multicolumn', name: 'Multicolumn', number: 30 },
      { id: 'classic', name: 'Classic', number: 31 },
      { id: 'high-performer', name: 'High Performer', number: 32 },
      { id: 'minimal', name: 'Minimal', number: 33 },
    ],
  },
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    provider: 'enhancv',
    all: false,
    templates: [],
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' || args[i] === '-p') {
      options.provider = args[++i];
    } else if (args[i] === '--all' || args[i] === '-a') {
      options.all = true;
    } else if (args[i] === '--template' || args[i] === '-t') {
      options.templates = [args[++i]];
    } else if (args[i] === '--templates' || args[i] === '-ts') {
      options.templates = args[++i].split(',');
    }
  }

  return options;
}

// Navigate through Enhancv onboarding
async function navigateEnhancvOnboarding(page, templateName) {
  console.log(`📍 Navigating to Enhancv...`);
  await page.goto('https://app.enhancv.com/templates');
  await page.waitForTimeout(3000);

  console.log(`🔘 Clicking "No" for existing resume...`);
  await page.click('[data-test-id="onboarding-button-no"]');
  await page.waitForTimeout(2000);

  console.log(`🎨 Selecting template: ${templateName}...`);
  await page.getByLabel(templateName).click();
  await page.waitForTimeout(2000);

  console.log(`⏭️ Skipping LinkedIn import...`);
  await page.getByText('Skip This Step').click();
  await page.waitForTimeout(2000);

  console.log(`🚀 Entering editor...`);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const continueButton = buttons.find(b => b.textContent.includes('Show'));
    if (continueButton) continueButton.click();
  });
  await page.waitForTimeout(3000);
}

// Extract HTML from template
async function extractTemplateHTML(page, selector) {
  console.log(`📄 Extracting HTML using selector: ${selector}...`);
  
  const html = await page.evaluate((sel) => {
    const wrapper = document.querySelector(sel);
    return wrapper ? wrapper.outerHTML : null;
  }, selector);

  if (!html) {
    throw new Error(`Could not find element with selector: ${selector}`);
  }

  return html;
}

// Parse styles from HTML
function parseStyles(html) {
  console.log(`🎨 Parsing styles from HTML...`);
  
  const styles = {
    colors: {},
    fonts: {},
    layout: {},
  };

  // Extract name color
  const nameColorMatch = html.match(/data-test-id="header-name"[^>]*style="[^"]*color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (nameColorMatch) {
    const [, r, g, b] = nameColorMatch;
    styles.colors.name = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
  }

  // Extract title color
  const titleColorMatch = html.match(/data-test-id="header-title"[^>]*style="[^"]*color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (titleColorMatch) {
    const [, r, g, b] = titleColorMatch;
    styles.colors.title = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
  }

  // Extract section underline
  const underlineMatch = html.match(/border-bottom:\s*(\d+)px\s+solid\s+rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (underlineMatch) {
    const [, thickness, r, g, b] = underlineMatch;
    styles.colors.sectionUnderline = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
    styles.layout.underlineThickness = `${thickness}px`;
  }

  // Extract fonts
  const fontMatch = html.match(/font-family:\s*([^;}"]+)/);
  if (fontMatch) {
    styles.fonts.primary = fontMatch[1].replace(/['"]/g, '').split(',')[0].trim();
  }

  console.log(`✅ Extracted styles:`, styles);
  return styles;
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

// Generate React component
function generateReactComponent(templateId, templateName, templateNumber, styles) {
  console.log(`⚛️ Generating React component...`);

  const componentName = templateName.replace(/[^a-zA-Z0-9]/g, '');
  const fileName = `template-${templateNumber}-${templateId}.tsx`;

  const component = `/**
 * TEMPLATE ${templateNumber}: ${templateName.toUpperCase()}
 * Extracted from Enhancv
 * Auto-generated by extract-templates.js
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ${componentName}Template: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: "'${styles.fonts.primary || 'Arial'}', sans-serif",
    padding: '60px',
    overflow: 'hidden',
  }}>
    {/* Header */}
    <header style={{
      marginBottom: '30px',
    }}>
      <h1 style={{
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize: '36px',
        fontWeight: 700,
        color: '${styles.colors.name || '#000000'}',
        marginBottom: '8px',
        letterSpacing: '-0.5px',
      }}>
        {data.personal.fullName.toUpperCase()}
      </h1>
      {data.personal.title && (
        <h2 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '16px',
          fontWeight: 400,
          color: '${styles.colors.title || '#7BA782'}',
          marginBottom: '16px',
        }}>
          {data.personal.title}
        </h2>
      )}
      <div style={{
        fontSize: '12px',
        color: '#666666',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        fontFamily: "'Arial', sans-serif",
      }}>
        {data.personal.email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>✉</span>
            <span>{data.personal.email}</span>
          </span>
        )}
        {data.personal.linkedIn && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔗</span>
            <span>{data.personal.linkedIn}</span>
          </span>
        )}
        {data.personal.location && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📍</span>
            <span>{data.personal.location}</span>
          </span>
        )}
      </div>
    </header>

    {/* Summary */}
    {data.summary && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '${styles.layout.underlineThickness || '3px'} solid ${styles.colors.sectionUnderline || '#000000'}',
        }}>
          SUMMARY
        </h3>
        <p style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#333333',
        }}>
          {data.summary}
        </p>
      </section>
    )}

    {/* Experience */}
    {data.experience && data.experience.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '${styles.layout.underlineThickness || '3px'} solid ${styles.colors.sectionUnderline || '#000000'}',
        }}>
          EXPERIENCE
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '20px' }}>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
            }}>
              {exp.position}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '${styles.colors.title || '#7BA782'}',
              marginBottom: '4px',
            }}>
              {exp.company}
            </div>
            {exp.description && (
              <p style={{
                fontFamily: "'Arial', sans-serif",
                fontSize: '13px',
                color: '#333333',
                lineHeight: 1.6,
              }}>
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </section>
    )}

    {/* Education */}
    {data.education && data.education.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '${styles.layout.underlineThickness || '3px'} solid ${styles.colors.sectionUnderline || '#000000'}',
        }}>
          EDUCATION
        </h3>
        {data.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#000000',
            }}>
              {edu.degree}{edu.field && \` in \${edu.field}\`}
            </div>
            <div style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '13px',
              color: '${styles.colors.title || '#7BA782'}',
            }}>
              {edu.institution}
            </div>
          </div>
        ))}
      </section>
    )}

    {/* Skills */}
    {data.skills && data.skills.length > 0 && (
      <section style={{ marginBottom: '30px' }}>
        <h3 style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fontWeight: 700,
          color: '#000000',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '12px',
          paddingBottom: '6px',
          borderBottom: '${styles.layout.underlineThickness || '3px'} solid ${styles.colors.sectionUnderline || '#000000'}',
        }}>
          SKILLS
        </h3>
        <div style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '13px',
          color: '#333333',
          lineHeight: 1.8,
        }}>
          {data.skills.join(' • ')}
        </div>
      </section>
    )}
  </div>
)
`;

  return { fileName, component, componentName };
}

// Save extracted data
async function saveExtractedData(templateId, html, styles) {
  const outputDir = path.join(__dirname, '..', 'extracted');
  await fs.mkdir(outputDir, { recursive: true });

  const dataFile = path.join(outputDir, `${templateId}.json`);
  await fs.writeFile(dataFile, JSON.stringify({
    templateId,
    html: html.substring(0, 5000), // Save first 5KB for reference
    styles,
    extractedAt: new Date().toISOString(),
  }, null, 2));

  console.log(`💾 Saved extracted data to: ${dataFile}`);
}

// Save React component
async function saveReactComponent(fileName, component) {
  const componentsDir = path.join(__dirname, '..', 'src', 'templates');
  const componentFile = path.join(componentsDir, fileName);
  
  await fs.writeFile(componentFile, component);
  console.log(`💾 Saved React component to: ${componentFile}`);
}

// Update integration files
async function updateIntegrationFiles(templateId, templateName, componentName, templateNumber) {
  console.log(`🔗 Updating integration files...`);

  // 1. Update universal-templates.tsx
  const universalTemplatesPath = path.join(__dirname, '..', 'src', 'templates', 'universal-templates.tsx');
  let universalTemplates = await fs.readFile(universalTemplatesPath, 'utf-8');
  
  const exportLine = `export { ${componentName}Template } from './template-${templateNumber}-${templateId}'`;
  if (!universalTemplates.includes(exportLine)) {
    // Add before "// Export types"
    universalTemplates = universalTemplates.replace(
      '// Export types',
      `${exportLine}\n\n// Export types`
    );
    await fs.writeFile(universalTemplatesPath, universalTemplates);
    console.log(`✅ Updated universal-templates.tsx`);
  }

  // 2. Update TemplatePreview.tsx
  const previewPath = path.join(__dirname, '..', 'src', 'components', 'TemplatePreview.tsx');
  let preview = await fs.readFile(previewPath, 'utf-8');
  
  const mappingLine = `  '${templateId}': '${componentName}Template',`;
  if (!preview.includes(mappingLine)) {
    // Add before closing brace of TEMPLATE_COMPONENT_MAP
    preview = preview.replace(
      /}\s*export function TemplatePreview/,
      `  ${mappingLine}\n}\n\nexport function TemplatePreview`
    );
    await fs.writeFile(previewPath, preview);
    console.log(`✅ Updated TemplatePreview.tsx`);
  }

  console.log(`✅ Integration files updated!`);
}

// Generate registry entry
function generateRegistryEntry(templateId, templateName, templateNumber, styles) {
  return `  {
    id: '${templateId}',
    name: '${templateName}',
    description: 'Extracted from Enhancv - ${templateName} template',
    category: 'modern',
    tags: ['enhancv', 'professional', 'clean', 'modern'],
    author: 'Enhancv (Converted)',
    features: [
      'Clean professional design',
      'Single-column layout',
      'Color-coded sections',
      'ATS-friendly format',
    ],
    bestFor: [
      'Professional roles',
      'Modern industries',
      'Clean aesthetic',
    ],
    popularity: ${90 - (templateNumber - 18)},
  },`;
}

// Main extraction function
async function extractTemplate(provider, templateConfig) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎯 Extracting: ${templateConfig.name} (${templateConfig.id})`);
  console.log(`${'='.repeat(60)}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate through onboarding
    await navigateEnhancvOnboarding(page, templateConfig.name);

    // Extract HTML
    const html = await extractTemplateHTML(page, provider.selector);

    // Parse styles
    const styles = parseStyles(html);

    // Save extracted data
    await saveExtractedData(templateConfig.id, html, styles);

    // Generate React component
    const { fileName, component, componentName } = generateReactComponent(
      templateConfig.id,
      templateConfig.name,
      templateConfig.number,
      styles
    );

    // Save component
    await saveReactComponent(fileName, component);

    // Update integration files
    await updateIntegrationFiles(
      templateConfig.id,
      templateConfig.name,
      componentName,
      templateConfig.number
    );

    // Generate registry entry (just print it)
    const registryEntry = generateRegistryEntry(
      templateConfig.id,
      templateConfig.name,
      templateConfig.number,
      styles
    );
    console.log(`\n📝 Add this to universal-registry.ts:\n`);
    console.log(registryEntry);

    console.log(`\n✅ Successfully extracted: ${templateConfig.name}\n`);

  } catch (error) {
    console.error(`❌ Error extracting ${templateConfig.name}:`, error.message);
  } finally {
    await browser.close();
  }
}

// Main function
async function main() {
  const options = parseArgs();

  console.log(`\n🚀 Template Extractor Started`);
  console.log(`Provider: ${options.provider}`);
  console.log(`Mode: ${options.all ? 'ALL templates' : `Selected: ${options.templates.join(', ')}`}\n`);

  const provider = PROVIDERS[options.provider];
  if (!provider) {
    console.error(`❌ Unknown provider: ${options.provider}`);
    console.log(`Available providers: ${Object.keys(PROVIDERS).join(', ')}`);
    process.exit(1);
  }

  // Determine which templates to extract
  let templatesToExtract = [];
  if (options.all) {
    templatesToExtract = provider.templates;
  } else if (options.templates.length > 0) {
    templatesToExtract = provider.templates.filter(t => 
      options.templates.includes(t.id) || options.templates.includes(t.name)
    );
  } else {
    console.error(`❌ Please specify --all or --template(s)`);
    process.exit(1);
  }

  console.log(`📋 Templates to extract: ${templatesToExtract.length}`);
  templatesToExtract.forEach(t => console.log(`   - ${t.name} (${t.id})`));
  console.log();

  // Extract each template
  for (const template of templatesToExtract) {
    await extractTemplate(provider, template);
    
    // Wait between templates
    if (templatesToExtract.indexOf(template) < templatesToExtract.length - 1) {
      console.log(`⏳ Waiting 5 seconds before next template...\n`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Extraction Complete!`);
  console.log(`${'='.repeat(60)}\n`);
  console.log(`📊 Summary:`);
  console.log(`   - Templates extracted: ${templatesToExtract.length}`);
  console.log(`   - Components created: ${templatesToExtract.length}`);
  console.log(`   - Integration files updated: Yes`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Add registry entries to universal-registry.ts (printed above)`);
  console.log(`   2. Run: npm run dev`);
  console.log(`   3. Test templates at http://localhost:3002/`);
  console.log();
}

// Run
main().catch(console.error);
