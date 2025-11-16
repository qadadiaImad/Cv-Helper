/**
 * Script to fix HtmlRenderer imports and syntax errors in templates
 * Run with: node scripts/fix-html-renderer-imports.js
 */

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates/react');

// Get all template files
const files = fs.readdirSync(templatesDir)
  .filter(f => f.startsWith('template-') && f.endsWith('.tsx'));

console.log(`Checking ${files.length} templates for HtmlRenderer issues\n`);

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if uses HtmlRenderer but missing import
  if (content.includes('<HtmlRenderer') && !content.includes("import { HtmlRenderer }")) {
    // Find the last import line
    const lines = content.split('\n');
    let lastImportIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, "import { HtmlRenderer } from '@/components/builder/html-renderer'");
      content = lines.join('\n');
      modified = true;
    }
  }
  
  // Fix malformed HtmlRenderer tags (missing closing bracket or style prop)
  // Pattern: <HtmlRenderer ... <p style={{ ... }}>
  const malformedPattern = /<HtmlRenderer\s+html=\{[^}]+\}\s+as="[^"]+"\s+<p\s+style=\{\{/g;
  if (malformedPattern.test(content)) {
    content = content.replace(
      /<HtmlRenderer\s+html=\{([^}]+)\}\s+as="([^"]+)"\s+<p\s+style=\{\{([^}]+)\}\}>\s+\/>/g,
      '<HtmlRenderer\n          html={$1}\n          as="$2"\n          style={{\n$3}}\n        />'
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file} - Fixed`);
    fixedCount++;
  }
});

console.log(`\n📊 Fixed ${fixedCount} templates`);
