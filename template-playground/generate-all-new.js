/**
 * GENERATE ALL NEW TEMPLATES (5, 6, 7)
 * 
 * Runs generators for the 3 new SVG templates
 * Usage: node generate-all-new.js
 */

import { execSync } from 'child_process'

console.log('🎨 Generating New Templates (5, 6, 7)...\n')
console.log('━'.repeat(60))

// Template 5
console.log('\n📝 Template 5: CV9 (Modern Professional)')
try {
  execSync('node generate-template-5.js', { stdio: 'inherit' })
  console.log('✅ Template 5 complete!')
} catch (error) {
  console.log('❌ Template 5 failed')
}

console.log('\n' + '━'.repeat(60))

// Template 6
console.log('\n📝 Template 6: CV1 (Minimal Clean)')
try {
  execSync('node generate-template-6.js', { stdio: 'inherit' })
  console.log('✅ Template 6 complete!')
} catch (error) {
  console.log('❌ Template 6 failed')
}

console.log('\n' + '━'.repeat(60))

// Template 7
console.log('\n📝 Template 7: CV12 (Two-column with gradient header)')
try {
  execSync('node generate-template-7.js', { stdio: 'inherit' })
  console.log('✅ Template 7 complete!')
} catch (error) {
  console.log('❌ Template 7 failed')
}

console.log('\n' + '━'.repeat(60))
console.log('\n🎉 All New Templates Generated!')
console.log('\n📁 Output files in: src/utils/output/')
console.log('   • template-5-custom.html (CV9 - Modern Professional)')
console.log('   • template-6-custom.html (CV1 - Minimal Clean)')
console.log('   • template-7-custom.html (CV12 - Gradient Header)')
console.log('\n💡 Open each file in your browser to compare!')
console.log('\n📊 Summary:')
console.log('   Template 5: Left sidebar (35%), blue theme, skill bars')
console.log('   Template 6: Single column, centered header, minimal')
console.log('   Template 7: Two-column (32%/68%), gradient header, purple theme')
