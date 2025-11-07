/**
 * GENERATE ALL TEMPLATES
 * 
 * Runs all template generators at once
 * Usage: node generate-all.js
 */

import { execSync } from 'child_process'

console.log('🎨 Generating All Templates...\n')
console.log('━'.repeat(60))

// Template 1
console.log('\n📝 Template 1: Jack Sparrow CV')
try {
  execSync('node convert-template.js', { stdio: 'inherit' })
  console.log('✅ Template 1 complete!')
} catch (error) {
  console.log('❌ Template 1 failed')
}

console.log('\n' + '━'.repeat(60))

// Template 2
console.log('\n📝 Template 2: Creative CV')
try {
  execSync('node generate-template-2.js', { stdio: 'inherit' })
  console.log('✅ Template 2 complete!')
} catch (error) {
  console.log('❌ Template 2 failed')
}

console.log('\n' + '━'.repeat(60))

// Template 3
console.log('\n📝 Template 3: Academic CV')
try {
  execSync('node generate-template-3.js', { stdio: 'inherit' })
  console.log('✅ Template 3 complete!')
} catch (error) {
  console.log('❌ Template 3 failed')
}

console.log('\n' + '━'.repeat(60))

// Template 4 note
console.log('\n📝 Template 4: Duplicate of Template 2')
console.log('⚠️  Skipped - Template 4 uses the same image as Template 2')
console.log('   Use template-2-custom.html for both')

console.log('\n' + '━'.repeat(60))
console.log('\n🎉 All Templates Generated!')
console.log('\n📁 Output files in: src/utils/output/')
console.log('   • template-1-comparison.html')
console.log('   • template-2-custom.html')
console.log('   • template-3-custom.html')
console.log('\n💡 Open each file in your browser to compare!')
