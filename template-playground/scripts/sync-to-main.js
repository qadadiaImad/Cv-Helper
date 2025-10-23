import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const mainProjectDir = join(__dirname, '..', '..');

const filesToSync = [
  {
    from: join(rootDir, 'src', 'templates', 'react-templates.tsx'),
    to: join(mainProjectDir, 'lib', 'react-templates.tsx'),
  },
  {
    from: join(rootDir, 'src', 'templates', 'template-registry.ts'),
    to: join(mainProjectDir, 'lib', 'template-registry.ts'),
  },
];

console.log('💾 Syncing templates TO main project...\n');

let syncCount = 0;
let errorCount = 0;

filesToSync.forEach(({ from, to }) => {
  if (!existsSync(from)) {
    console.warn(`⚠️  Source file not found: ${from}`);
    errorCount++;
    return;
  }

  if (!existsSync(to)) {
    console.warn(`⚠️  Destination file not found: ${to}`);
    console.warn(`     This might be a fresh setup. Please check paths.`);
    errorCount++;
    return;
  }

  try {
    copyFileSync(from, to);
    console.log(`✅ Saved: ${from.split('template-playground')[1]} → ${to.split('Cv-Helper')[1]}`);
    syncCount++;
  } catch (error) {
    console.error(`❌ Failed to copy ${from}: ${error.message}`);
    errorCount++;
  }
});

console.log('\n' + '='.repeat(60));
if (errorCount === 0) {
  console.log(`✨ Successfully synced ${syncCount} file(s) to main project!`);
  console.log('\n🎉 Your template changes are now in the main CV-Helper project!');
  console.log('💡 Remember to test in the main app before deploying.');
} else {
  console.log(`⚠️  Completed with ${errorCount} error(s).`);
  console.log('   Please check the warnings above.');
}
console.log('='.repeat(60) + '\n');
