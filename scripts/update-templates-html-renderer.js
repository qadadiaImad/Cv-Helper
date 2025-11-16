/**
 * Script to update all templates to use HtmlRenderer
 * Run with: node scripts/update-templates-html-renderer.js
 */

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates/react');

// Get all editable template files
const files = fs.readdirSync(templatesDir)
  .filter(f => f.includes('editable.tsx'));

console.log(`Found ${files.length} editable templates to update\n`);

let updatedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already has HtmlRenderer
  if (content.includes('HtmlRenderer')) {
    console.log(`✓ ${file} - Already updated`);
    skippedCount++;
    return;
  }
  
  let modified = false;
  
  // Step 1: Add import if not present
  if (!content.includes("import { HtmlRenderer }")) {
    const importMatch = content.match(/(import.*InlineEditableField.*\n)/);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        importMatch[0] + "import { HtmlRenderer } from '@/components/builder/html-renderer'\n"
      );
      modified = true;
    }
  }
  
  // Step 2: Update EditableText component definition
  const editableTextPattern = /const EditableText = editMode \? InlineEditableField : \(\{ value, className, style \}: any\) => \(\s*<span className=\{className\} style=\{style\}>\{value\}<\/span>\s*\)/g;
  
  if (editableTextPattern.test(content)) {
    content = content.replace(
      editableTextPattern,
      `const EditableText = editMode ? InlineEditableField : ({ value, className, style }: any) => (
    <HtmlRenderer html={value} as="span" className={className} style={style} />
  )`
    );
    modified = true;
  }
  
  // Step 3: Update summary sections to use conditional rendering
  const summaryPattern = /<p style=\{\{[^}]+\}\}>\s*<EditableText\s+value=\{data\.summary[^}]+\}\s+onChange=\{[^}]+\}\s+multiline\s+style=\{[^}]+\}\s+\/>\s*<\/p>/g;
  
  if (summaryPattern.test(content)) {
    // This is complex, mark for manual review
    console.log(`⚠ ${file} - Summary section needs manual update`);
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file} - Updated successfully`);
    updatedCount++;
  } else {
    console.log(`⏭ ${file} - No changes needed`);
    skippedCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updatedCount}`);
console.log(`   Skipped: ${skippedCount}`);
console.log(`   Total: ${files.length}`);
