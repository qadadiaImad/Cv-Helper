import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const mainProjectDir = join(__dirname, '..', '..');

const filesToSync = [
  {
    from: join(mainProjectDir, 'lib', 'react-templates.tsx'),
    to: join(rootDir, 'src', 'templates', 'react-templates.tsx'),
  },
  {
    from: join(mainProjectDir, 'lib', 'template-registry.ts'),
    to: join(rootDir, 'src', 'templates', 'template-registry.ts'),
  },
];

console.log('🔄 Syncing templates from main project...\n');

filesToSync.forEach(({ from, to }) => {
  if (!existsSync(from)) {
    console.warn(`⚠️  Source file not found: ${from}`);
    return;
  }

  // Create destination directory if it doesn't exist
  const toDir = dirname(to);
  if (!existsSync(toDir)) {
    mkdirSync(toDir, { recursive: true });
  }

  copyFileSync(from, to);
  console.log(`✅ Copied: ${from.split('Cv-Helper')[1]} → ${to.split('template-playground')[1]}`);
});

console.log('\n✨ Template sync complete!\n');
console.log('💡 Tip: Run this script whenever you update templates in the main project.');
