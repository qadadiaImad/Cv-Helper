/**
 * Test script to replicate "Fill Template with AI" functionality
 * This mimics the behavior of the web UI when parsing a CV
 * 
 * Usage: node test-ai-parse.js
 */

const fs = require('fs');
const path = require('path');

const PDF_PATH = path.join(__dirname, 'Cv_ahmad.pdf');
const OUTPUT_PATH = path.join(__dirname, 'cv_ahmad.json');
const API_URL = 'http://localhost:3000/api/ai/parse';

async function testAiParse() {
  console.log('=== Testing AI Parse Functionality ===\n');
  
  // Step 1: Check if PDF exists
  if (!fs.existsSync(PDF_PATH)) {
    console.error(`❌ Error: PDF file not found at ${PDF_PATH}`);
    process.exit(1);
  }
  
  console.log(`📄 Reading PDF: ${PDF_PATH}`);
  
  try {
    // Step 2: Read PDF file as text
    // Note: For actual PDF parsing, you'd need a PDF library
    // For now, we'll read it as buffer and convert to base64 or text
    const fileBuffer = fs.readFileSync(PDF_PATH);
    const fileText = fileBuffer.toString('utf-8');
    
    console.log(`📝 File size: ${fileBuffer.length} bytes`);
    console.log(`📝 Text length: ${fileText.length} characters\n`);
    
    // Step 3: Call the AI parse API (same as the UI does)
    console.log(`🚀 Calling API: ${API_URL}`);
    console.log('   Method: POST');
    console.log('   Body: { cv_text: <file_content> }\n');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cv_text: fileText,
      }),
    });
    
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`❌ API Error:`, errorData);
      process.exit(1);
    }
    
    // Step 4: Parse response
    const data = await response.json();
    
    console.log('\n✅ API Response received:');
    console.log(`   - success: ${data.success}`);
    console.log(`   - clean_cv exists: ${!!data.clean_cv}`);
    console.log(`   - creditsRemaining: ${data.creditsRemaining}`);
    
    if (data.clean_cv) {
      console.log(`   - clean_cv keys: ${Object.keys(data.clean_cv).join(', ')}`);
      
      // Step 5: Save parsed CV to JSON file
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data.clean_cv, null, 2), 'utf-8');
      console.log(`\n💾 Saved parsed CV to: ${OUTPUT_PATH}`);
      
      // Step 6: Display summary of parsed data
      console.log('\n📊 Parsed CV Summary:');
      if (data.clean_cv.header) {
        console.log(`   - Name: ${data.clean_cv.header.fullName || 'N/A'}`);
        console.log(`   - Phone: ${data.clean_cv.header.phone || 'N/A'}`);
        console.log(`   - Email: ${data.clean_cv.header.email || 'N/A'}`);
      }
      if (data.clean_cv.experience) {
        console.log(`   - Experience entries: ${data.clean_cv.experience.length}`);
      }
      if (data.clean_cv.education) {
        console.log(`   - Education entries: ${data.clean_cv.education.length}`);
      }
      if (data.clean_cv.metadata) {
        console.log(`   - Language: ${data.clean_cv.metadata.language || 'N/A'}`);
        if (data.clean_cv.metadata.warnings && data.clean_cv.metadata.warnings.length > 0) {
          console.log(`   - Warnings: ${data.clean_cv.metadata.warnings.length}`);
          data.clean_cv.metadata.warnings.forEach((w, i) => {
            console.log(`     ${i + 1}. ${w}`);
          });
        }
      }
      
      console.log('\n✅ Test completed successfully!');
      console.log(`\nThis simulates what happens when you click "Fill Template with AI" in the UI.`);
      console.log(`The parsed data should now be applied to the CV template.`);
      
    } else {
      console.error('\n❌ Error: No clean_cv data in response');
      console.log('Full response:', JSON.stringify(data, null, 2));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause);
    }
    process.exit(1);
  }
}

// Run the test
testAiParse().catch(console.error);
