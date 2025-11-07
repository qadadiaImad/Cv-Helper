#!/usr/bin/env node

/**
 * HTML to React Converter
 * 
 * Converts extracted Enhancv HTML to React TSX components
 * Preserves structure, styles, and layout (single/multi-column)
 * 
 * Usage:
 *   node scripts/html-to-react-converter.js --id double-column --number 19
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'node-html-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    id: null,
    number: null,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--id') {
      options.id = args[++i];
    } else if (args[i] === '--number') {
      options.number = parseInt(args[++i]);
    }
  }

  return options;
}

// Clean HTML - remove editor attributes
function cleanHTML(html) {
  console.log(`🧹 Cleaning HTML...`);
  
  // Remove editor-specific attributes
  html = html.replace(/\s*contenteditable="[^"]*"/g, '');
  html = html.replace(/\s*data-field-path="[^"]*"/g, '');
  html = html.replace(/\s*data-test-id="[^"]*"/g, '');
  html = html.replace(/\s*data-gramm="[^"]*"/g, '');
  html = html.replace(/\s*data-decoratable="[^"]*"/g, '');
  html = html.replace(/\s*spellcheck="[^"]*"/g, '');
  html = html.replace(/\s*placeholder="[^"]*"/g, '');
  html = html.replace(/\s*draggable="[^"]*"/g, '');
  
  // Remove empty editable wrappers
  html = html.replace(/<div class="editable-field-wrapper[^>]*>\s*<\/div>/g, '');
  
  console.log(`✅ HTML cleaned`);
  return html;
}

// Analyze structure
function analyzeStructure(root) {
  console.log(`🔍 Analyzing template structure...`);
  
  const structure = {
    hasMultipleColumns: false,
    columnCount: 1,
    sections: [],
    hasGraphics: false,
    hasSVG: false,
    layout: 'single-column',
  };

  // Check for grid layouts (multi-column)
  const grids = root.querySelectorAll('[style*="grid-template-columns"]');
  grids.forEach(grid => {
    const style = grid.getAttribute('style') || '';
    const colMatch = style.match(/grid-template-columns:\s*repeat\((\d+)/);
    if (colMatch) {
      const cols = parseInt(colMatch[1]);
      if (cols > 1) {
        structure.hasMultipleColumns = true;
        structure.columnCount = Math.max(structure.columnCount, cols);
        structure.layout = `${cols}-column`;
      }
    }
  });

  // Check for flex layouts (side-by-side)
  const flexContainers = root.querySelectorAll('[style*="display: flex"], [class*="flex"]');
  if (flexContainers.length > 5) {
    structure.hasMultipleColumns = true;
    structure.layout = 'flex-layout';
  }

  // Check for SVG/graphics
  structure.hasSVG = root.querySelectorAll('svg').length > 0;
  structure.hasGraphics = root.querySelectorAll('img, svg, canvas').length > 0;

  // Find sections
  const sectionElements = root.querySelectorAll('[id*="Section"], [class*="Section"]');
  structure.sections = Array.from(sectionElements).map(el => {
    const id = el.getAttribute('id') || '';
    const className = el.getAttribute('class') || '';
    return {
      id,
      type: id.replace(/Section-\d+/, '').replace(/-/g, ''),
      className,
    };
  });

  console.log(`✅ Structure analyzed:`, structure);
  return structure;
}

// Convert HTML attributes to React props
function htmlToReactAttrs(attrs) {
  const reactAttrs = {};
  
  for (const [key, value] of Object.entries(attrs)) {
    // Skip editor attributes
    if (key.startsWith('data-field') || key.startsWith('data-test') || 
        key === 'contenteditable' || key === 'spellcheck' || 
        key === 'placeholder' || key === 'draggable') {
      continue;
    }
    
    // Convert attribute names
    let reactKey = key;
    if (key === 'class') reactKey = 'className';
    else if (key === 'for') reactKey = 'htmlFor';
    else if (key.includes('-')) {
      // Convert kebab-case to camelCase
      reactKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    
    reactAttrs[reactKey] = value;
  }
  
  return reactAttrs;
}

// Convert inline styles to React style object
function styleStringToObject(styleString) {
  if (!styleString) return {};
  
  const styleObj = {};
  const declarations = styleString.split(';').filter(d => d.trim());
  
  for (const decl of declarations) {
    const [property, value] = decl.split(':').map(s => s.trim());
    if (!property || !value) continue;
    
    // Convert CSS property to camelCase
    const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    styleObj[camelProperty] = value;
  }
  
  return styleObj;
}

// Generate data binding for text content
function generateDataBinding(text, sectionType) {
  // Map section types to data paths
  const bindings = {
    'header-name': 'data.personal.fullName',
    'header-title': 'data.personal.title',
    'header-email': 'data.personal.email',
    'header-location': 'data.personal.location',
    'header-link': 'data.personal.linkedIn',
  };
  
  return bindings[sectionType] || null;
}

// Convert HTML node to React JSX
function nodeToReact(node, depth = 0, context = {}) {
  const indent = '  '.repeat(depth);
  
  // Text node
  if (node.nodeType === 3) {
    const text = node.text.trim();
    if (!text) return '';
    
    // Check if this is a data field
    const binding = context.dataBinding;
    if (binding) {
      return `{${binding}}`;
    }
    
    return text;
  }
  
  // Element node
  if (node.nodeType === 1) {
    const tagName = node.tagName.toLowerCase();
    
    // Skip certain elements
    if (tagName === 'script' || tagName === 'style') return '';
    
    // Get attributes
    const attrs = htmlToReactAttrs(node.attributes);
    
    // Handle style attribute
    if (attrs.style) {
      const styleObj = styleStringToObject(attrs.style);
      attrs.style = styleObj;
    }
    
    // Build attributes string
    let attrsString = '';
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'style') {
        const styleStr = JSON.stringify(value, null, 2)
          .split('\n')
          .map((line, i) => i === 0 ? line : '  '.repeat(depth + 1) + line)
          .join('\n');
        attrsString += ` style={${styleStr}}`;
      } else if (key === 'className') {
        attrsString += ` className="${value}"`;
      } else {
        attrsString += ` ${key}="${value}"`;
      }
    }
    
    // Get children
    const children = node.childNodes
      .map(child => nodeToReact(child, depth + 1, context))
      .filter(c => c)
      .join('');
    
    // Self-closing tags
    if (['img', 'br', 'hr', 'input'].includes(tagName) || !children) {
      return `${indent}<${tagName}${attrsString} />`;
    }
    
    // Regular tags
    return `${indent}<${tagName}${attrsString}>\n${children}\n${indent}</${tagName}>`;
  }
  
  return '';
}

// Generate React component from HTML
function generateReactComponent(templateId, templateName, templateNumber, html, structure) {
  console.log(`⚛️ Generating React component...`);
  
  // Clean HTML
  const cleanedHTML = cleanHTML(html);
  
  // Parse HTML
  const root = parse(cleanedHTML);
  
  // Find the main resume container
  const resumeContainer = root.querySelector('.resume-renderer') || 
                         root.querySelector('.resume-editor-wrapper') ||
                         root.querySelector('[class*="resume"]');
  
  if (!resumeContainer) {
    throw new Error('Could not find resume container in HTML');
  }
  
  // Extract inline styles from container
  const containerStyle = resumeContainer.getAttribute('style') || '';
  const styleObj = styleStringToObject(containerStyle);
  
  // Generate component name
  const componentName = templateName.replace(/[^a-zA-Z0-9]/g, '');
  
  // Start building component
  let component = `/**
 * TEMPLATE ${templateNumber}: ${templateName.toUpperCase()}
 * Extracted from Enhancv - Preserving original structure
 * Auto-generated by html-to-react-converter.js
 * Layout: ${structure.layout}
 * Columns: ${structure.columnCount}
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const ${componentName}Template: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      width: '850px',
      minHeight: '1200px',
      background: '#ffffff',
      padding: '60px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      ...${JSON.stringify(styleObj, null, 2)},
    }}>
`;

  // Convert main content
  const children = resumeContainer.childNodes;
  for (const child of children) {
    const reactCode = nodeToReact(child, 3);
    if (reactCode) {
      component += reactCode + '\n';
    }
  }
  
  component += `    </div>
  )
}
`;

  console.log(`✅ React component generated`);
  return component;
}

// Main function
async function main() {
  const options = parseArgs();
  
  if (!options.id || !options.number) {
    console.error(`❌ Missing required arguments`);
    console.log(`\nUsage: node scripts/html-to-react-converter.js --id <template-id> --number <template-number>`);
    console.log(`Example: node scripts/html-to-react-converter.js --id double-column --number 19`);
    process.exit(1);
  }
  
  console.log(`\n🔄 HTML to React Converter`);
  console.log(`Template: ${options.id}`);
  console.log(`Number: ${options.number}\n`);
  
  try {
    // Read extracted HTML
    const htmlFile = path.join(__dirname, '..', 'extracted', `${options.id}.html`);
    const html = await fs.readFile(htmlFile, 'utf-8');
    console.log(`✅ Loaded HTML: ${html.length} characters`);
    
    // Read metadata
    const metadataFile = path.join(__dirname, '..', 'extracted', `${options.id}.json`);
    const metadata = JSON.parse(await fs.readFile(metadataFile, 'utf-8'));
    const templateName = metadata.templateInfo?.name || options.id;
    
    // Parse and analyze
    const root = parse(html);
    const structure = analyzeStructure(root);
    
    // Generate React component
    const component = generateReactComponent(
      options.id,
      templateName,
      options.number,
      html,
      structure
    );
    
    // Save component
    const componentFile = path.join(
      __dirname,
      '..',
      'src',
      'templates',
      `template-${options.number}-${options.id}.tsx`
    );
    await fs.writeFile(componentFile, component);
    console.log(`✅ Saved component: ${componentFile}`);
    
    // Print summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Conversion Complete!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`\n📊 Template Structure:`);
    console.log(`   - Layout: ${structure.layout}`);
    console.log(`   - Columns: ${structure.columnCount}`);
    console.log(`   - Sections: ${structure.sections.length}`);
    console.log(`   - Has Graphics: ${structure.hasGraphics ? 'Yes' : 'No'}`);
    console.log(`   - Has SVG: ${structure.hasSVG ? 'Yes' : 'No'}`);
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Review the generated component`);
    console.log(`   2. Add data bindings for dynamic content`);
    console.log(`   3. Test in playground: npm run dev`);
    console.log();
    
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    process.exit(1);
  }
}

// Run
main().catch(console.error);
