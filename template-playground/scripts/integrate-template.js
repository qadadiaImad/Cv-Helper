#!/usr/bin/env node

/**
 * Template Integration Script
 * 
 * Automatically integrates extracted templates by adding registry entries
 * 
 * Usage:
 *   node scripts/integrate-template.js --id double-column --name "Double Column" --number 19
 *   node scripts/integrate-template.js --auto (reads from extracted/ folder)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    id: null,
    name: null,
    number: null,
    auto: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--id') {
      options.id = args[++i];
    } else if (args[i] === '--name') {
      options.name = args[++i];
    } else if (args[i] === '--number') {
      options.number = parseInt(args[++i]);
    } else if (args[i] === '--auto') {
      options.auto = true;
    }
  }

  return options;
}

// Read extracted template data
async function readExtractedData(templateId) {
  const extractedDir = path.join(__dirname, '..', 'extracted');
  const dataFile = path.join(extractedDir, `${templateId}.json`);
  
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Could not read extracted data for: ${templateId}`);
    return null;
  }
}

// Get all extracted templates
async function getAllExtractedTemplates() {
  const extractedDir = path.join(__dirname, '..', 'extracted');
  
  try {
    const files = await fs.readdir(extractedDir);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    const templates = [];
    for (const file of jsonFiles) {
      const data = await fs.readFile(path.join(extractedDir, file), 'utf-8');
      const parsed = JSON.parse(data);
      templates.push({
        id: parsed.templateId,
        name: parsed.templateInfo?.name || parsed.templateId,
        file: file,
        extractedAt: parsed.extractedAt,
      });
    }
    
    return templates;
  } catch (error) {
    return [];
  }
}

// Check if template is already in registry
async function isTemplateInRegistry(templateId) {
  const registryPath = path.join(__dirname, '..', 'src', 'templates', 'universal-registry.ts');
  const registry = await fs.readFile(registryPath, 'utf-8');
  
  return registry.includes(`id: '${templateId}'`);
}

// Generate registry entry
function generateRegistryEntry(templateId, templateName, templateNumber, styles = {}) {
  // Determine category based on styles or name
  let category = 'modern';
  if (templateName.toLowerCase().includes('classic')) category = 'traditional';
  if (templateName.toLowerCase().includes('creative')) category = 'creative';
  if (templateName.toLowerCase().includes('minimal')) category = 'minimalist';

  // Generate tags
  const tags = ['enhancv', 'professional', 'clean'];
  if (templateName.toLowerCase().includes('logo')) tags.push('with-logos');
  if (templateName.toLowerCase().includes('column')) tags.push('multi-column');
  if (templateName.toLowerCase().includes('timeline')) tags.push('timeline');

  return `  {
    id: '${templateId}',
    name: '${templateName}',
    description: 'Extracted from Enhancv - ${templateName} template with professional design',
    category: '${category}',
    tags: ${JSON.stringify(tags)},
    author: 'Enhancv (Converted)',
    features: [
      'Clean professional design',
      'ATS-friendly format',
      'Color-coded sections',
      'Modern typography',
    ],
    bestFor: [
      'Professional roles',
      'Modern industries',
      'Clean aesthetic',
    ],
    popularity: ${Math.max(50, 90 - (templateNumber - 18))},
  }`;
}

// Add registry entry to universal-registry.ts
async function addToRegistry(registryEntry) {
  const registryPath = path.join(__dirname, '..', 'src', 'templates', 'universal-registry.ts');
  let registry = await fs.readFile(registryPath, 'utf-8');

  // Find the closing bracket of UNIVERSAL_TEMPLATE_REGISTRY array
  // Look for the pattern: },\n] or }\n]
  const arrayEndMatch = registry.match(/,?\s*\n\]\s*\n/);
  if (!arrayEndMatch) {
    throw new Error('Could not find end of UNIVERSAL_TEMPLATE_REGISTRY array');
  }

  // Insert before the closing bracket
  const insertPosition = arrayEndMatch.index + arrayEndMatch[0].indexOf(']');
  const before = registry.substring(0, insertPosition);
  const after = registry.substring(insertPosition);

  // Add comma if needed
  const needsComma = !before.trimEnd().endsWith(',');
  const newRegistry = before + (needsComma ? ',' : '') + '\n' + registryEntry + '\n' + after;

  await fs.writeFile(registryPath, newRegistry);
  console.log(`✅ Added to universal-registry.ts`);
}

// Verify integration
async function verifyIntegration(templateId, componentName, templateNumber) {
  console.log(`\n🔍 Verifying integration for: ${templateId}...\n`);

  const checks = [];

  // 1. Check component file exists
  const componentPath = path.join(__dirname, '..', 'src', 'templates', `template-${templateNumber}-${templateId}.tsx`);
  try {
    await fs.access(componentPath);
    checks.push({ name: 'Component file', status: '✅', path: componentPath });
  } catch {
    checks.push({ name: 'Component file', status: '❌', path: componentPath });
  }

  // 2. Check export in universal-templates.tsx
  const universalTemplatesPath = path.join(__dirname, '..', 'src', 'templates', 'universal-templates.tsx');
  const universalTemplates = await fs.readFile(universalTemplatesPath, 'utf-8');
  const hasExport = universalTemplates.includes(`export { ${componentName}Template }`);
  checks.push({ 
    name: 'Export in universal-templates.tsx', 
    status: hasExport ? '✅' : '❌',
    detail: `export { ${componentName}Template }`
  });

  // 3. Check mapping in TemplatePreview.tsx
  const previewPath = path.join(__dirname, '..', 'src', 'components', 'TemplatePreview.tsx');
  const preview = await fs.readFile(previewPath, 'utf-8');
  const hasMapping = preview.includes(`'${templateId}': '${componentName}Template'`);
  checks.push({ 
    name: 'Mapping in TemplatePreview.tsx', 
    status: hasMapping ? '✅' : '❌',
    detail: `'${templateId}': '${componentName}Template'`
  });

  // 4. Check registry entry
  const registryPath = path.join(__dirname, '..', 'src', 'templates', 'universal-registry.ts');
  const registry = await fs.readFile(registryPath, 'utf-8');
  const hasRegistry = registry.includes(`id: '${templateId}'`);
  checks.push({ 
    name: 'Registry entry in universal-registry.ts', 
    status: hasRegistry ? '✅' : '❌',
    detail: `id: '${templateId}'`
  });

  // Print results
  console.log(`Integration Status:`);
  checks.forEach(check => {
    console.log(`${check.status} ${check.name}`);
    if (check.detail) console.log(`   ${check.detail}`);
    if (check.path) console.log(`   ${check.path}`);
  });

  const allPassed = checks.every(c => c.status === '✅');
  console.log(`\n${allPassed ? '✅ All checks passed!' : '❌ Some checks failed'}\n`);

  return allPassed;
}

// Integrate a single template
async function integrateTemplate(templateId, templateName, templateNumber) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔗 Integrating: ${templateName} (${templateId})`);
  console.log(`${'='.repeat(60)}\n`);

  // Check if already in registry
  const alreadyExists = await isTemplateInRegistry(templateId);
  if (alreadyExists) {
    console.log(`⚠️  Template already in registry: ${templateId}`);
    console.log(`   Skipping registry entry...\n`);
  } else {
    // Read extracted data for additional info
    const extractedData = await readExtractedData(templateId);
    
    // Generate registry entry
    const registryEntry = generateRegistryEntry(
      templateId,
      templateName,
      templateNumber,
      extractedData?.styles
    );

    console.log(`📝 Registry entry:\n`);
    console.log(registryEntry);
    console.log();

    // Add to registry
    await addToRegistry(registryEntry);
  }

  // Verify integration
  const componentName = templateName.replace(/[^a-zA-Z0-9]/g, '');
  const verified = await verifyIntegration(templateId, componentName, templateNumber);

  if (verified) {
    console.log(`✅ Successfully integrated: ${templateName}\n`);
  } else {
    console.log(`⚠️  Integration incomplete for: ${templateName}\n`);
  }

  return verified;
}

// Main function
async function main() {
  const options = parseArgs();

  console.log(`\n🔗 Template Integration Tool\n`);

  if (options.auto) {
    // Auto mode: integrate all extracted templates
    console.log(`📋 Auto mode: Integrating all extracted templates...\n`);

    const templates = await getAllExtractedTemplates();
    if (templates.length === 0) {
      console.log(`❌ No extracted templates found in extracted/ folder`);
      return;
    }

    console.log(`Found ${templates.length} extracted templates:\n`);
    templates.forEach((t, i) => console.log(`   ${i + 1}. ${t.name} (${t.id})`));
    console.log();

    // Get next template number
    const templatesDir = path.join(__dirname, '..', 'src', 'templates');
    const files = await fs.readdir(templatesDir);
    const numbers = files
      .filter(f => f.match(/^template-(\d+)-/))
      .map(f => parseInt(f.match(/^template-(\d+)-/)[1]));
    let nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 19;

    // Integrate each template
    let successCount = 0;
    for (const template of templates) {
      const success = await integrateTemplate(template.id, template.name, nextNumber);
      if (success) successCount++;
      nextNumber++;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Integration Complete!`);
    console.log(`${'='.repeat(60)}\n`);
    console.log(`📊 Summary:`);
    console.log(`   - Templates processed: ${templates.length}`);
    console.log(`   - Successfully integrated: ${successCount}`);
    console.log(`   - Failed: ${templates.length - successCount}`);
    console.log();

  } else if (options.id && options.name && options.number) {
    // Manual mode: integrate specific template
    await integrateTemplate(options.id, options.name, options.number);
  } else {
    console.error(`❌ Invalid arguments`);
    console.log(`\nUsage:`);
    console.log(`  Auto mode:   node scripts/integrate-template.js --auto`);
    console.log(`  Manual mode: node scripts/integrate-template.js --id <id> --name <name> --number <num>`);
    console.log();
    console.log(`Examples:`);
    console.log(`  node scripts/integrate-template.js --auto`);
    console.log(`  node scripts/integrate-template.js --id double-column --name "Double Column" --number 19`);
    process.exit(1);
  }
}

// Run
main().catch(console.error);
