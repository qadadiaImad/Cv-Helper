# 🎯 Enhancv Templates - Complete Roadmap

## Overview

Complete workflow for extracting and integrating all Enhancv templates into the template playground using the proven Stockholm pipeline.

## ✅ Completed Templates

### Template 18: Stockholm (Single Column)
- **Status:** ✅ Complete
- **File:** `src/templates/template-18-stockholm.tsx`
- **Colors:** Black name, Green accents (#7BA782), Black underlines
- **Registry:** Added
- **Preview:** Mapped
- **Tested:** ✅ Working

## 📋 Remaining Enhancv Templates

### Template 19: Milan
- **Status:** ⏳ Ready to extract
- **Screenshot:** Captured
- **Next Steps:**
  1. Navigate to Enhancv → Select Milan
  2. Extract HTML using `.resume-editor-wrapper`
  3. Parse colors and styles from HTML
  4. Create `template-19-milan.tsx`
  5. Export, register, map
  6. Test

### Template 20: Vienna
- **Status:** ⏳ Ready to extract
- **Screenshot:** Captured
- **Next Steps:** Same as Milan

### Template 21: New York
- **Status:** ⏳ Ready to extract
- **Screenshot:** Captured
- **Next Steps:** Same as Milan

### Additional Templates Available
From the template gallery, we also have:
- Double Column
- Ivy League (already done as template-17)
- Elegant
- Contemporary
- Polished
- Modern
- Creative
- Timeline
- Stylish
- Compact
- Multicolumn
- Classic
- High Performer
- Minimal

## 🔄 Proven Pipeline (Per Template)

### Step 1: Navigate & Setup (2 min)
```
1. Navigate to https://app.enhancv.com/templates
2. Click "No" (no existing resume)
3. Select template from gallery
4. Click "Skip This Step" (LinkedIn)
5. Click "Show more" to enter editor
```

### Step 2: Extract HTML (1 min)
```javascript
// Use MCP Playwright evaluate
const html = document.querySelector('.resume-editor-wrapper').outerHTML;

// Extract key information:
- Name color: Look for header name style
- Title color: Look for header title style  
- Section underline: Look for border-bottom
- Company/School color: Look for specific text colors
- Fonts: Extract font-family values
```

### Step 3: Parse & Analyze (2 min)
```
From the extracted HTML, identify:
- Primary color (name)
- Accent color (title, companies, schools)
- Section header style (underline color/thickness)
- Font families (heading vs body)
- Layout structure
- Special features
```

### Step 4: Create React Component (10 min)
```typescript
// File: src/templates/template-[N]-[name].tsx

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const [Name]Template: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    // Use extracted styles
    width: '850px',
    minHeight: '1200px',
    // ... colors from HTML
  }}>
    {/* Implement all sections */}
  </div>
)
```

### Step 5: Integration (3 min)
```typescript
// 1. Export in universal-templates.tsx
export { [Name]Template } from './template-[N]-[name]'

// 2. Register in universal-registry.ts
{
  id: '[name]',
  name: '[Name]',
  description: '...',
  category: 'modern',
  tags: [...],
  features: [...],
  bestFor: [...],
  popularity: 90,
}

// 3. Map in TemplatePreview.tsx
'[name]': '[Name]Template'
```

### Step 6: Test (2 min)
```
1. Open http://localhost:3002/
2. Select template
3. Verify rendering
4. Check PDF generation
5. Compare with original
```

**Total Time Per Template:** ~20 minutes

## 📊 Progress Tracker

| # | Template | Status | HTML Extracted | Component Created | Integrated | Tested |
|---|----------|--------|----------------|-------------------|------------|--------|
| 17 | Ivy League | ✅ | ✅ | ✅ | ✅ | ✅ |
| 18 | Stockholm | ✅ | ✅ | ✅ | ✅ | ✅ |
| 19 | Milan | ⏳ | ❌ | ❌ | ❌ | ❌ |
| 20 | Vienna | ⏳ | ❌ | ❌ | ❌ | ❌ |
| 21 | New York | ⏳ | ❌ | ❌ | ❌ | ❌ |
| 22 | Elegant | 📝 | ❌ | ❌ | ❌ | ❌ |
| 23 | Modern | 📝 | ❌ | ❌ | ❌ | ❌ |
| 24 | Contemporary | 📝 | ❌ | ❌ | ❌ | ❌ |

Legend:
- ✅ Complete
- ⏳ Ready (screenshot captured)
- 📝 Planned
- ❌ Not started

## 🎨 Template Naming Convention

```
Template Number: Sequential (17, 18, 19, ...)
File Name: template-[N]-[name].tsx
Component Name: [Name]Template (PascalCase)
Registry ID: [name] (lowercase with underscores)
```

Examples:
- `template-18-stockholm.tsx` → `StockholmTemplate` → `stockholm`
- `template-19-milan.tsx` → `MilanTemplate` → `milan`
- `template-20-vienna.tsx` → `ViennaTemplate` → `vienna`

## 🔧 Automation Script (Future)

```javascript
// auto-extract-template.js
// Automates steps 1-3 of the pipeline

async function extractTemplate(templateName) {
  // 1. Navigate through onboarding
  await navigateToTemplate(templateName);
  
  // 2. Extract HTML
  const html = await page.evaluate(() => {
    return document.querySelector('.resume-editor-wrapper').outerHTML;
  });
  
  // 3. Parse styles
  const styles = parseStyles(html);
  
  // 4. Save to file
  fs.writeFileSync(`extracted/${templateName}.json`, JSON.stringify({
    html,
    styles,
    timestamp: new Date().toISOString(),
  }));
  
  // 5. Generate component template
  generateComponent(templateName, styles);
}
```

## 📝 Next Session Checklist

For each template session:

- [ ] Start MCP Playwright browser
- [ ] Navigate to Enhancv templates
- [ ] Complete onboarding flow
- [ ] Select target template
- [ ] Extract HTML using `.resume-editor-wrapper`
- [ ] Parse colors and styles
- [ ] Create React component
- [ ] Export in universal-templates.tsx
- [ ] Register in universal-registry.ts
- [ ] Map in TemplatePreview.tsx
- [ ] Test in browser
- [ ] Take comparison screenshot
- [ ] Update this roadmap
- [ ] Commit changes

## 🎯 Goals

### Short Term (Next 3 Sessions)
- ✅ Stockholm complete
- ⏳ Milan complete
- ⏳ Vienna complete
- ⏳ New York complete

### Medium Term (Next 10 Sessions)
- Complete all 20 Enhancv templates
- 35 total templates in playground

### Long Term
- Add Resume.io templates
- Add FlowCV templates
- 50+ total templates

## 💡 Key Learnings from Stockholm

1. **Use `.resume-editor-wrapper` selector** - Direct access to template HTML
2. **Extract colors from inline styles** - More accurate than guessing
3. **Parse `rgb()` values** - Convert to hex for React
4. **Check section underlines** - `border-bottom` style
5. **Font families** - Usually Bitter/Roboto or similar
6. **Green accent common** - But verify each template
7. **Black underlines** - Most templates use black section dividers

## 🚀 Ready to Scale!

The pipeline is proven and ready to process all remaining Enhancv templates. Each template follows the exact same workflow, making it easy to scale to dozens of templates.

**Next Action:** Process Milan template using the proven pipeline!

---

**Status:** 🟢 Pipeline Proven & Ready
**Templates Completed:** 2/20+ Enhancv templates
**Success Rate:** 100%
**Average Time:** 20 minutes per template
