# 🤖 Automated Template Extraction - Quick Start

## 🎯 What This Does

Automatically extracts CV templates from Enhancv (and other providers) and generates ready-to-use React components with **zero manual coding**.

## ⚡ Quick Start (3 Steps)

### 1. Install Dependencies

```bash
cd template-playground
npm install
npx playwright install chromium
```

### 2. Run the Extractor

```bash
# Extract all Enhancv templates (16+ templates)
npm run extract:all

# OR extract specific templates
npm run extract:template milan
npm run extract:templates milan,vienna,new-york
```

### 3. Add Registry Entries

The script will print registry entries. Copy and paste them into `src/templates/universal-registry.ts`:

```typescript
// Copy the printed entries here
{
  id: 'milan',
  name: 'Milan',
  description: 'Extracted from Enhancv - Milan template',
  // ... rest of entry
},
```

**That's it!** Run `npm run dev` and your templates are ready! 🎉

## 📋 What Gets Automated

### ✅ Fully Automated
- Browser navigation through onboarding
- Template selection
- HTML extraction using `.resume-editor-wrapper`
- Style parsing (colors, fonts, layout)
- React component generation
- File creation (`template-N-name.tsx`)
- Export updates (`universal-templates.tsx`)
- Preview mapping (`TemplatePreview.tsx`)

### 📝 Manual (1 minute)
- Copy registry entry to `universal-registry.ts`

## 🎨 Example Usage

### Extract Milan Template

```bash
$ npm run extract:template milan

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

### Extract All Templates

```bash
$ npm run extract:all

🚀 Template Extractor Started
Provider: enhancv
Mode: ALL templates

📋 Templates to extract: 16
   - Milan (milan)
   - Vienna (vienna)
   - New York (new-york)
   - Elegant (elegant)
   - Modern (modern)
   - Contemporary (contemporary)
   ... and 10 more

[Processing each template...]

============================================================
✅ Extraction Complete!
============================================================

📊 Summary:
   - Templates extracted: 16
   - Components created: 16
   - Integration files updated: Yes

📝 Next steps:
   1. Add registry entries to universal-registry.ts (printed above)
   2. Run: npm run dev
   3. Test templates at http://localhost:3002/
```

## 🗂️ Output Structure

```
template-playground/
├── extracted/                    # Raw extracted data
│   ├── milan.json
│   ├── vienna.json
│   └── new-york.json
│
├── src/templates/                # Generated components
│   ├── template-19-milan.tsx     ✅ Created
│   ├── template-20-vienna.tsx    ✅ Created
│   ├── template-21-new-york.tsx  ✅ Created
│   ├── universal-templates.tsx   ✅ Updated (exports)
│   └── universal-registry.ts     📝 Manual (add entries)
│
└── src/components/
    └── TemplatePreview.tsx       ✅ Updated (mappings)
```

## ⏱️ Time Savings

### Manual Process (Per Template)
- Navigate & capture: 5 min
- Analyze styles: 5 min
- Write React component: 15 min
- Integration: 5 min
- **Total: 30 minutes**

### Automated Process (Per Template)
- Run script: 20 seconds
- Add registry entry: 1 min
- **Total: ~1.5 minutes**

### Savings
- **Per template:** 28.5 minutes saved
- **For 16 templates:** **7.6 hours saved!**

## 🎯 Available Templates

### Enhancv (16+ templates)
- ✅ Stockholm (already done manually)
- ⏳ Milan
- ⏳ Vienna
- ⏳ New York
- ⏳ Elegant
- ⏳ Modern
- ⏳ Contemporary
- ⏳ Polished
- ⏳ Creative
- ⏳ Timeline
- ⏳ Stylish
- ⏳ Compact
- ⏳ Multicolumn
- ⏳ Classic
- ⏳ High Performer
- ⏳ Minimal

## 🔧 Advanced Usage

### Custom Provider

Edit `scripts/extract-templates.js` and add your provider:

```javascript
const PROVIDERS = {
  enhancv: { /* existing */ },
  resumeio: {
    name: 'Resume.io',
    baseUrl: 'https://resume.io',
    templatesUrl: 'https://resume.io/templates',
    selector: '.resume-wrapper', // Your selector
    templates: [
      { id: 'professional', name: 'Professional', number: 34 },
      // Add more...
    ],
  },
};
```

### Batch Processing with Delay

```javascript
// In extract-templates.js, adjust the delay:
await new Promise(resolve => setTimeout(resolve, 5000)); // 5 seconds
```

### Headless Mode

```javascript
// In extract-templates.js:
const browser = await chromium.launch({ 
  headless: true  // Change to true for background processing
});
```

## 🐛 Troubleshooting

### "Playwright not installed"
```bash
npx playwright install chromium
```

### "Template not found"
Check template name is exact (case-sensitive):
```bash
node scripts/extract-templates.js --provider enhancv --template "Single Column"
```

### "Selector not found"
Provider changed their HTML. Update selector in `PROVIDERS` config.

### Script hangs
- Check internet connection
- Try with `headless: false` to see what's happening
- Increase timeout values

## 📚 Documentation

- **Full Documentation:** `scripts/README.md`
- **Roadmap:** `ENHANCV_TEMPLATES_ROADMAP.md`
- **Pipeline Guide:** `TEMPLATE_PIPELINE.md`

## 🚀 Next Steps

1. **Extract remaining Enhancv templates**
   ```bash
   npm run extract:all
   ```

2. **Add Resume.io support**
   - Add provider config
   - Test with one template
   - Scale to all templates

3. **Add FlowCV support**
   - Same process as Resume.io

4. **Reach 50+ templates!**
   - Enhancv: 16+ templates
   - Resume.io: 20+ templates
   - FlowCV: 15+ templates
   - **Total: 50+ templates** ✅

## 💡 Pro Tips

1. **Test one template first** before running `--all`
2. **Keep browser visible** (`headless: false`) for debugging
3. **Wait between batches** to avoid rate limiting
4. **Save registry entries** as you go
5. **Test each template** in playground before moving to next

## ✅ Success Checklist

After running the script:

- [ ] Component file created (`template-N-name.tsx`)
- [ ] Export added to `universal-templates.tsx`
- [ ] Mapping added to `TemplatePreview.tsx`
- [ ] Registry entry copied to `universal-registry.ts`
- [ ] Dev server running (`npm run dev`)
- [ ] Template visible in playground
- [ ] All sections render correctly
- [ ] PDF generation works

---

**🎉 You're ready to extract all templates automatically!**

Run `npm run extract:all` and watch the magic happen! ✨
