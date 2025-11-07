#!/usr/bin/env node

/**
 * Automated Template Extractor V2
 * 
 * Generic approach: Discovers templates from the page dynamically
 * 
 * Usage:
 *   node scripts/extract-templates-v2.js --provider enhancv --index 0
 *   node scripts/extract-templates-v2.js --provider enhancv --name "Deux colonnes"
 *   node scripts/extract-templates-v2.js --provider enhancv --all
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
    templatesUrl: 'https://app.enhancv.com/onboarding#5',
    templateCardSelector: '.ResumeTemplateCard-module_templateCardContainer__8o5Kz',
    templateNameSelector: '.text-lg',
    templateButtonSelector: 'button',
    // We'll extract from the preview modal, not the editor
    previewButtonSelector: '[aria-label="Preview Document"]',
    // The actual rendered resume in preview
    resumeRenderedSelector: '.resume-renderer',
    // Fallback to editor if preview doesn't work
    resumeEditorSelector: '.resume-editor-wrapper',
  },
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    provider: 'enhancv',
    all: false,
    index: null,
    name: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' || args[i] === '-p') {
      options.provider = args[++i];
    } else if (args[i] === '--all' || args[i] === '-a') {
      options.all = true;
    } else if (args[i] === '--index' || args[i] === '-i') {
      options.index = parseInt(args[++i]);
    } else if (args[i] === '--name' || args[i] === '-n') {
      options.name = args[++i];
    }
  }

  return options;
}

// Navigate to templates page
async function navigateToTemplates(page, provider) {
  console.log(`📍 Navigating to ${provider.name} templates...`);
  await page.goto('https://app.enhancv.com/templates');
  await page.waitForTimeout(3000);

  // Click "No" for existing resume
  console.log(`🔘 Clicking "No" for existing resume...`);
  try {
    await page.click('[data-test-id="onboarding-button-no"]', { timeout: 5000 });
    await page.waitForTimeout(2000);
  } catch (e) {
    console.log(`⚠️ Already past onboarding step`);
  }

  // Wait for template cards to load
  await page.waitForSelector(provider.templateCardSelector, { timeout: 10000 });
  console.log(`✅ Template gallery loaded`);
}

// Discover all templates on the page
async function discoverTemplates(page, provider) {
  console.log(`🔍 Discovering templates...`);

  const templates = await page.evaluate(({ cardSelector, nameSelector }) => {
    const cards = Array.from(document.querySelectorAll(cardSelector));
    return cards.map((card, index) => {
      const nameElement = card.querySelector(nameSelector);
      const imgElement = card.querySelector('img');
      const ariaLabel = card.querySelector('[aria-label]')?.getAttribute('aria-label');
      
      return {
        index,
        name: nameElement?.textContent?.trim() || ariaLabel || `Template ${index}`,
        imageUrl: imgElement?.src || '',
        ariaLabel: ariaLabel || '',
      };
    });
  }, {
    cardSelector: provider.templateCardSelector,
    nameSelector: provider.templateNameSelector,
  });

  console.log(`✅ Found ${templates.length} templates:`);
  templates.forEach(t => console.log(`   ${t.index}: ${t.name}`));

  return templates;
}

// Select template by index or name
async function selectTemplate(page, provider, templates, index = null, name = null) {
  let selectedTemplate;

  if (index !== null) {
    selectedTemplate = templates[index];
  } else if (name) {
    selectedTemplate = templates.find(t => 
      t.name.toLowerCase().includes(name.toLowerCase()) ||
      t.ariaLabel.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (!selectedTemplate) {
    throw new Error(`Template not found: ${name || `index ${index}`}`);
  }

  console.log(`🎨 Selecting template: ${selectedTemplate.name} (index ${selectedTemplate.index})...`);

  // Click the template card
  await page.evaluate(({ idx, cardSelector }) => {
    const cards = Array.from(document.querySelectorAll(cardSelector));
    const card = cards[idx];
    if (card) {
      // Click the overlay or button
      const overlay = card.querySelector('.ResumeTemplateCard-module_clickableOverlay__oEyjc');
      const button = card.querySelector('button');
      if (overlay) overlay.click();
      else if (button) button.click();
    }
  }, { idx: selectedTemplate.index, cardSelector: provider.templateCardSelector });

  await page.waitForTimeout(2000);

  // Skip LinkedIn import if present
  try {
    const skipButton = await page.getByText('Skip This Step').first();
    if (await skipButton.isVisible({ timeout: 2000 })) {
      console.log(`⏭️ Skipping LinkedIn import...`);
      await skipButton.click();
      await page.waitForTimeout(2000);
    }
  } catch (e) {
    console.log(`⚠️ No LinkedIn skip needed`);
  }

  // Click continue/show button to enter editor
  console.log(`🚀 Entering editor...`);
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const continueButton = buttons.find(b => 
      b.textContent.includes('Show') || 
      b.textContent.includes('Continue') ||
      b.textContent.includes('Continuer')
    );
    if (continueButton) continueButton.click();
  });
  await page.waitForTimeout(3000);

  // Now open the preview to get the clean rendered version
  console.log(`📱 Opening preview for clean rendered HTML...`);
  try {
    // Try multiple selectors for the preview button
    let previewClicked = false;
    
    // Try aria-label
    try {
      const previewButton = await page.locator(provider.previewButtonSelector).first();
      if (await previewButton.isVisible({ timeout: 2000 })) {
        await previewButton.click();
        previewClicked = true;
        console.log(`✅ Preview opened via aria-label`);
      }
    } catch (e) {}
    
    // Try by text if aria-label didn't work
    if (!previewClicked) {
      try {
        await page.getByText('Preview Document').first().click({ timeout: 2000 });
        previewClicked = true;
        console.log(`✅ Preview opened via text`);
      } catch (e) {}
    }
    
    // Try by looking for preview icon button
    if (!previewClicked) {
      try {
        await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
          const previewBtn = buttons.find(b => 
            b.getAttribute('aria-label')?.includes('Preview') ||
            b.getAttribute('title')?.includes('Preview') ||
            b.textContent?.includes('Preview')
          );
          if (previewBtn) previewBtn.click();
        });
        previewClicked = true;
        console.log(`✅ Preview opened via evaluate`);
      } catch (e) {}
    }
    
    if (previewClicked) {
      await page.waitForTimeout(3000); // Wait for preview to load
    } else {
      console.log(`⚠️ Could not find preview button, will extract from editor`);
    }
  } catch (e) {
    console.log(`⚠️ Error opening preview: ${e.message}`);
  }

  return selectedTemplate;
}

// Extract HTML from template
async function extractTemplateHTML(page, provider) {
  console.log(`📄 Extracting rendered HTML...`);
  
  // Try to extract from rendered preview first (clean HTML)
  let html = await page.evaluate((sel) => {
    const wrapper = document.querySelector(sel);
    if (wrapper) {
      console.log('Found rendered preview:', sel);
      return wrapper.outerHTML;
    }
    return null;
  }, provider.resumeRenderedSelector);

  let source = 'preview';

  // If preview not found, try editor view
  if (!html) {
    console.log(`⚠️ Preview not found, trying editor view...`);
    html = await page.evaluate((sel) => {
      const wrapper = document.querySelector(sel);
      if (wrapper) {
        console.log('Found editor view:', sel);
        return wrapper.outerHTML;
      }
      return null;
    }, provider.resumeEditorSelector);
    source = 'editor';
  }

  if (!html) {
    // Last resort: try to find any resume container
    console.log(`⚠️ Trying to find any resume container...`);
    html = await page.evaluate(() => {
      // Try various selectors
      const selectors = [
        '.resume-renderer',
        '.resume-editor-wrapper',
        '[class*="resume"]',
        '[class*="Resume"]',
      ];
      
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.outerHTML.length > 1000) {
          console.log('Found via fallback:', sel);
          return el.outerHTML;
        }
      }
      return null;
    });
    source = 'fallback';
  }

  if (!html) {
    throw new Error(`Could not find resume HTML with any selector`);
  }

  console.log(`✅ Extracted ${html.length} characters of HTML from ${source}`);
  return { html, source };
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

  console.log(`✅ Extracted styles:`, JSON.stringify(styles, null, 2));
  return styles;
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

// Generate template ID from name
function generateTemplateId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate React component
function generateReactComponent(templateId, templateName, templateNumber, styles) {
  console.log(`⚛️ Generating React component...`);

  const componentName = templateName.replace(/[^a-zA-Z0-9]/g, '');
  const fileName = `template-${templateNumber}-${templateId}.tsx`;

  const component = `/**
 * TEMPLATE ${templateNumber}: ${templateName.toUpperCase()}
 * Extracted from Enhancv
 * Auto-generated by extract-templates-v2.js
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

// Get next available template number
async function getNextTemplateNumber() {
  const templatesDir = path.join(__dirname, '..', 'src', 'templates');
  const files = await fs.readdir(templatesDir);
  
  const numbers = files
    .filter(f => f.match(/^template-(\d+)-/))
    .map(f => parseInt(f.match(/^template-(\d+)-/)[1]));
  
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 19;
}

// Save extracted data
async function saveExtractedData(templateId, html, styles, templateInfo, source) {
  const outputDir = path.join(__dirname, '..', 'extracted');
  await fs.mkdir(outputDir, { recursive: true });

  // Save JSON with metadata
  const dataFile = path.join(outputDir, `${templateId}.json`);
  await fs.writeFile(dataFile, JSON.stringify({
    templateId,
    templateInfo,
    htmlPreview: html.substring(0, 5000),
    htmlLength: html.length,
    source,
    styles,
    extractedAt: new Date().toISOString(),
  }, null, 2));

  // Save complete HTML separately for analysis
  const htmlFile = path.join(outputDir, `${templateId}.html`);
  await fs.writeFile(htmlFile, html);

  console.log(`💾 Saved extracted data to: ${dataFile}`);
  console.log(`💾 Saved complete HTML to: ${htmlFile}`);
}

// Save React component
async function saveReactComponent(fileName, component) {
  const componentsDir = path.join(__dirname, '..', 'src', 'templates');
  const componentFile = path.join(componentsDir, fileName);
  
  await fs.writeFile(componentFile, component);
  console.log(`💾 Saved React component to: ${componentFile}`);
}

// Update integration files
async function updateIntegrationFiles(templateId, componentName, templateNumber) {
  console.log(`🔗 Updating integration files...`);

  // 1. Update universal-templates.tsx
  const universalTemplatesPath = path.join(__dirname, '..', 'src', 'templates', 'universal-templates.tsx');
  let universalTemplates = await fs.readFile(universalTemplatesPath, 'utf-8');
  
  const exportLine = `export { ${componentName}Template } from './template-${templateNumber}-${templateId}'`;
  if (!universalTemplates.includes(exportLine)) {
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
function generateRegistryEntry(templateId, templateName, templateNumber) {
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
async function extractTemplate(provider, templateInfo, templateNumber) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🎯 Extracting: ${templateInfo.name} (index ${templateInfo.index})`);
  console.log(`${'='.repeat(60)}\n`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to templates
    await navigateToTemplates(page, provider);

    // Discover templates
    const templates = await discoverTemplates(page, provider);

    // Select template
    const selected = await selectTemplate(page, provider, templates, templateInfo.index);

    // Extract HTML (now returns object with html and source)
    const { html, source } = await extractTemplateHTML(page, provider);
    console.log(`📊 HTML source: ${source}`);

    // Parse styles
    const styles = parseStyles(html);

    // Generate template ID
    const templateId = generateTemplateId(selected.name);

    // Save extracted data
    await saveExtractedData(templateId, html, styles, selected, source);

    // Generate React component (skip for now, will use converter)
    console.log(`⚠️  Skipping generic component generation`);
    console.log(`📝 Use html-to-react-converter.js to generate proper component`);
    
    const componentName = selected.name.replace(/[^a-zA-Z0-9]/g, '');
    const fileName = `template-${templateNumber}-${templateId}.tsx`;
    
    // Don't save generic component anymore
    // await saveReactComponent(fileName, component);

    // Update integration files
    await updateIntegrationFiles(templateId, componentName, templateNumber);

    // Generate registry entry
    const registryEntry = generateRegistryEntry(templateId, selected.name, templateNumber);
    console.log(`\n📝 Add this to universal-registry.ts:\n`);
    console.log(registryEntry);

    console.log(`\n✅ Successfully extracted: ${selected.name}\n`);

    return { success: true, templateId, componentName };

  } catch (error) {
    console.error(`❌ Error extracting template:`, error.message);
    return { success: false, error: error.message };
  } finally {
    await browser.close();
  }
}

// Main function
async function main() {
  const options = parseArgs();

  console.log(`\n🚀 Template Extractor V2 Started`);
  console.log(`Provider: ${options.provider}\n`);

  const provider = PROVIDERS[options.provider];
  if (!provider) {
    console.error(`❌ Unknown provider: ${options.provider}`);
    process.exit(1);
  }

  // Get next template number
  const startNumber = await getNextTemplateNumber();
  console.log(`📊 Next template number: ${startNumber}\n`);

  if (options.all) {
    console.log(`📋 Mode: Extract ALL templates`);
    console.log(`⚠️  This will open browser for each template`);
    console.log(`⚠️  You'll need to manually confirm each extraction\n`);
    
    // For --all, we need to discover templates first
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await navigateToTemplates(page, provider);
    const templates = await discoverTemplates(page, provider);
    await browser.close();

    console.log(`\n🎯 Found ${templates.length} templates to extract\n`);
    
    for (let i = 0; i < templates.length; i++) {
      await extractTemplate(provider, { index: i }, startNumber + i);
      if (i < templates.length - 1) {
        console.log(`\n⏳ Waiting 3 seconds before next template...\n`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  } else if (options.index !== null) {
    await extractTemplate(provider, { index: options.index }, startNumber);
  } else if (options.name) {
    // For name search, we need to discover first
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await navigateToTemplates(page, provider);
    const templates = await discoverTemplates(page, provider);
    await browser.close();

    const found = templates.find(t => 
      t.name.toLowerCase().includes(options.name.toLowerCase())
    );
    
    if (found) {
      await extractTemplate(provider, { index: found.index }, startNumber);
    } else {
      console.error(`❌ Template not found: ${options.name}`);
      console.log(`Available templates:`);
      templates.forEach(t => console.log(`   ${t.index}: ${t.name}`));
    }
  } else {
    console.error(`❌ Please specify --index, --name, or --all`);
    process.exit(1);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Extraction Complete!`);
  console.log(`${'='.repeat(60)}\n`);
}

// Run
main().catch(console.error);
