# 🤖 Automated Template Extractor

## Overview

Automated script that extracts CV templates from providers (Enhancv, Resume.io, FlowCV) and generates React components automatically.

## Features

- ✅ Automated browser navigation through onboarding
- ✅ HTML extraction using provider-specific selectors
- ✅ Style parsing (colors, fonts, layout)
- ✅ React component generation
- ✅ Automatic integration (exports, mappings)
- ✅ Batch processing support
- ✅ Progress tracking and error handling

## Installation

```bash
cd template-playground
npm install playwright
npx playwright install chromium
```

## Usage

### Extract All Templates from Enhancv

```bash
node scripts/extract-templates.js --provider enhancv --all
```

### Extract Specific Template

```bash
node scripts/extract-templates.js --provider enhancv --template milan
```

### Extract Multiple Templates

```bash
node scripts/extract-templates.js --provider enhancv --templates milan,vienna,new-york
```

### Using NPM Scripts

```bash
# Extract all Enhancv templates
npm run extract:all

# Extract specific template
npm run extract:template milan

# Extract multiple templates
npm run extract:templates milan,vienna,new-york
```

## Command Line Options

| Option | Alias | Description | Example |
|--------|-------|-------------|---------|
| `--provider` | `-p` | Provider name | `--provider enhancv` |
| `--all` | `-a` | Extract all templates | `--all` |
| `--template` | `-t` | Extract single template | `--template milan` |
| `--templates` | `-ts` | Extract multiple templates | `--templates milan,vienna` |

## Supported Providers

### Enhancv
- **Base URL:** https://app.enhancv.com
- **Selector:** `.resume-editor-wrapper`
- **Templates:** 16+ available

### Resume.io (Coming Soon)
- **Base URL:** https://resume.io
- **Status:** Planned

### FlowCV (Coming Soon)
- **Base URL:** https://flowcv.io
- **Status:** Planned

## Output

### 1. Extracted Data
```
extracted/
  ├── milan.json          # Raw HTML + parsed styles
  ├── vienna.json
  └── new-york.json
```

### 2. React Components
```
src/templates/
  ├── template-19-milan.tsx
  ├── template-20-vienna.tsx
  └── template-21-new-york.tsx
```

### 3. Integration Updates
- ✅ `universal-templates.tsx` - Export added
- ✅ `TemplatePreview.tsx` - Mapping added
- 📝 `universal-registry.ts` - Entry printed (manual add)

## Workflow

```
1. Launch Browser (Playwright)
   ↓
2. Navigate to Provider
   ↓
3. Complete Onboarding
   ↓
4. Select Template
   ↓
5. Extract HTML (.resume-editor-wrapper)
   ↓
6. Parse Styles (colors, fonts, layout)
   ↓
7. Generate React Component
   ↓
8. Save Component File
   ↓
9. Update Integration Files
   ↓
10. Print Registry Entry
```

## Example Output

```bash
$ node scripts/extract-templates.js --provider enhancv --template milan

============================================================
🎯 Extracting: Milan (milan)
============================================================

📍 Navigating to Enhancv...
🔘 Clicking "No" for existing resume...
🎨 Selecting template: Milan...
⏭️ Skipping LinkedIn import...
🚀 Entering editor...
📄 Extracting HTML using selector: .resume-editor-wrapper...
🎨 Parsing styles from HTML...
✅ Extracted styles: {
  colors: {
    name: '#000000',
    title: '#7BA782',
    sectionUnderline: '#000000'
  },
  fonts: { primary: 'Bitter' },
  layout: { underlineThickness: '3px' }
}
💾 Saved extracted data to: extracted/milan.json
⚛️ Generating React component...
💾 Saved React component to: src/templates/template-19-milan.tsx
🔗 Updating integration files...
✅ Updated universal-templates.tsx
✅ Updated TemplatePreview.tsx
✅ Integration files updated!

📝 Add this to universal-registry.ts:

  {
    id: 'milan',
    name: 'Milan',
    description: 'Extracted from Enhancv - Milan template',
    category: 'modern',
    tags: ['enhancv', 'professional', 'clean', 'modern'],
    author: 'Enhancv (Converted)',
    features: [
      'Clean professional design',
      'Single-column layout',
      'Color-coded sections',
      'ATS-friendly format',
    ],
    bestFor: [
      'Professional roles',
      'Modern industries',
      'Clean aesthetic',
    ],
    popularity: 89,
  },

✅ Successfully extracted: Milan
```

## Configuration

Edit `PROVIDERS` object in `extract-templates.js` to:
- Add new providers
- Add new templates
- Modify selectors
- Adjust template numbering

```javascript
const PROVIDERS = {
  enhancv: {
    name: 'Enhancv',
    baseUrl: 'https://app.enhancv.com',
    templatesUrl: 'https://app.enhancv.com/templates',
    selector: '.resume-editor-wrapper',
    templates: [
      { id: 'milan', name: 'Milan', number: 19 },
      // Add more templates here
    ],
  },
  // Add more providers here
};
```

## Troubleshooting

### Browser doesn't open
```bash
npx playwright install chromium
```

### Template not found
Check the template name matches exactly (case-sensitive):
```bash
node scripts/extract-templates.js --provider enhancv --template "Single Column"
```

### Selector not found
The provider may have changed their HTML structure. Update the selector in the `PROVIDERS` config.

### Integration files not updated
Check file permissions and paths. The script expects:
- `src/templates/universal-templates.tsx`
- `src/components/TemplatePreview.tsx`

## Manual Steps

After running the script, you need to:

1. **Add registry entry** to `src/templates/universal-registry.ts`
   - Copy the printed entry
   - Add to `UNIVERSAL_TEMPLATE_REGISTRY` array

2. **Test the template**
   ```bash
   npm run dev
   # Open http://localhost:3002/
   # Select the new template
   ```

3. **Verify rendering**
   - Check all sections display correctly
   - Compare with original screenshot
   - Test PDF generation

## Batch Processing

To extract all templates at once:

```bash
# This will process all 16+ Enhancv templates
node scripts/extract-templates.js --provider enhancv --all

# Takes approximately 5-10 minutes
# (20 seconds per template × 16 templates)
```

## Future Enhancements

- [ ] Automatic registry entry insertion
- [ ] Screenshot comparison
- [ ] Style validation
- [ ] Multi-provider support
- [ ] Parallel processing
- [ ] Progress bar
- [ ] Retry logic
- [ ] Template preview generation

## Contributing

To add a new provider:

1. Add provider config to `PROVIDERS`
2. Implement provider-specific navigation
3. Test with one template
4. Add to documentation

## License

MIT

---

**Created by:** Template Playground Team
**Last Updated:** November 2, 2025
