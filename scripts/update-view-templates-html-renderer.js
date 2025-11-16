/**
 * Script to update all view-only templates to use HtmlRenderer
 * These are templates WITHOUT "-field-" in the name
 * Run with: node scripts/update-view-templates-html-renderer.js
 */

const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates/react');

// Get all template files that are NOT field-editable (view-only templates)
const files = fs.readdirSync(templatesDir)
  .filter(f => f.startsWith('template-') && f.endsWith('.tsx') && !f.includes('field-editable'));

console.log(`Found ${files.length} view-only templates to update\n`);

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
  
  // Step 1: Add import after other imports
  const lastImportMatch = content.match(/(import.*\n)(?!import)/);
  if (lastImportMatch && !content.includes("import { HtmlRenderer }")) {
    const insertPos = content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
    content = content.slice(0, insertPos) + 
              "import { HtmlRenderer } from '@/components/builder/html-renderer'\n" +
              content.slice(insertPos);
    modified = true;
  }
  
  // Step 2: Replace summary plain text with HtmlRenderer
  // Pattern: {displayData.summary || 'text'} or {data.summary || 'text'}
  const summaryPatterns = [
    /\{displayData\.summary \|\| ['"][^'"]+['"]\}/g,
    /\{data\.summary \|\| ['"][^'"]+['"]\}/g,
    /\{displayData\.summary\}/g,
    /\{data\.summary\}/g
  ];
  
  summaryPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      // Find the paragraph or div containing the summary
      const lines = content.split('\n');
      let inSummaryBlock = false;
      let blockStart = -1;
      let blockEnd = -1;
      let indentation = '';
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check if this line contains summary
        if ((line.includes('displayData.summary') || line.includes('data.summary')) && 
            !line.includes('HtmlRenderer')) {
          
          // Find the opening tag (p, div, etc.)
          let j = i;
          while (j >= 0 && !lines[j].includes('<p ') && !lines[j].includes('<div ')) {
            j--;
          }
          
          if (j >= 0) {
            blockStart = j;
            indentation = lines[j].match(/^\s*/)[0];
            
            // Find the closing tag
            let k = i;
            while (k < lines.length && !lines[k].includes('</p>') && !lines[k].includes('</div>')) {
              k++;
            }
            
            if (k < lines.length) {
              blockEnd = k;
              
              // Extract style
              let styleMatch = '';
              for (let m = blockStart; m <= i; m++) {
                if (lines[m].includes('style={{')) {
                  let styleStart = m;
                  let braceCount = 0;
                  let styleEnd = m;
                  
                  for (let n = styleStart; n < lines.length; n++) {
                    const l = lines[n];
                    braceCount += (l.match(/\{/g) || []).length;
                    braceCount -= (l.match(/\}/g) || []).length;
                    if (braceCount === 0) {
                      styleEnd = n;
                      break;
                    }
                  }
                  
                  styleMatch = lines.slice(styleStart, styleEnd + 1).join('\n');
                  break;
                }
              }
              
              // Get the data variable name
              const dataVar = line.includes('displayData') ? 'displayData' : 'data';
              
              // Build replacement
              const replacement = [
                `${indentation}<HtmlRenderer`,
                `${indentation}  html={${dataVar}.summary || '<p>Professional summary goes here...</p>'}`,
                `${indentation}  as="div"`,
                styleMatch ? styleMatch.replace('style={{', `${indentation}  style={{`) : `${indentation}  style={{}}`,
                `${indentation}/>`
              ].join('\n');
              
              // Replace the block
              lines.splice(blockStart, blockEnd - blockStart + 1, replacement);
              modified = true;
              break;
            }
          }
        }
      }
      
      if (modified) {
        content = lines.join('\n');
      }
    }
  });
  
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
