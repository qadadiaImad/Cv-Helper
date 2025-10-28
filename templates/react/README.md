# React Templates Directory

**Replicated from:** `template-playground/src/templates`  
**Date:** October 28, 2025  
**Status:** ✅ Complete

## 📁 Directory Structure

```
templates/react/
├── index.ts                          # Main export file (use this!)
├── universal-templates.tsx           # Re-exports all templates
├── universal-schema.ts               # TypeScript types for resume data
├── universal-registry.ts             # Template metadata & utilities
├── sample-data-universal.ts          # Sample data for testing
├── types.ts                          # Additional type definitions
├── template-registry.ts              # Legacy registry (for reference)
├── react-templates.tsx               # Legacy templates (for reference)
│
├── template-1-atlantic-blue.tsx      # ⭐ Atlantic Blue Template
├── template-2-executive.tsx          # ⭐ Executive Template
├── template-3-mercury.tsx            # ⭐ Mercury Template
├── template-4-classic.tsx            # ⭐ Classic Template
├── template-5-harvard.tsx            # ⭐ Harvard Template
├── template-6-evergreen.tsx          # ⭐ Evergreen Template
├── template-7-youngcurve.tsx         # ⭐ YoungCurve Template
│
├── Atlantic Blue.webp                # Preview images
├── ClassicBlue.png
├── Evergreen.webp
└── Executive.webp
```

## 🚀 Usage

### Import All Templates
```typescript
import {
  AtlanticBlue,
  Executive,
  Mercury,
  ClassicTemplate,
  Harvard,
  Evergreen,
  YoungCurve,
  UNIVERSAL_TEMPLATE_REGISTRY,
  COMPLETE_SAMPLE_DATA,
  type UniversalResumeData,
  type UniversalTemplateProps,
} from '@/templates/react'
```

### Use a Template
```typescript
import { AtlanticBlue, COMPLETE_SAMPLE_DATA } from '@/templates/react'

function MyResume() {
  return <AtlanticBlue data={COMPLETE_SAMPLE_DATA} />
}
```

### Get Template Metadata
```typescript
import { 
  getUniversalTemplateById, 
  searchUniversalTemplates 
} from '@/templates/react'

const atlanticMeta = getUniversalTemplateById('atlantic_blue')
const modernTemplates = searchUniversalTemplates('modern')
```

## 📋 Available Templates

| ID | Name | Category | Best For | Popularity |
|----|------|----------|----------|------------|
| `atlantic_blue` | Atlantic Blue | Modern | Creative professionals, Tech | 95 |
| `executive` | Executive | Executive | Senior executives, Management | 92 |
| `mercury` | Mercury | Modern | Young professionals, Creative | 90 |
| `classic` | Classic | Classic | All industries, ATS-friendly | 88 |
| `evergreen` | Evergreen | Modern | Tech professionals, AEM Devs | 88 |
| `harvard` | Harvard | Academic | Students, Recent graduates | 85 |
| `youngcurve` | YoungCurve | Academic | PhD candidates, Researchers | 82 |

## 🎨 Template Features

### Atlantic Blue
- Dark left sidebar with photo
- Visual skill indicators
- Clean white content area
- Sidebar certifications

### Executive
- Centered header with contact
- Two-column layout
- Serif typography
- Professional formatting

### Mercury
- Centered photo at top
- Skills as tags
- Clean modern aesthetic
- Visual language indicators

### Classic
- Right-aligned contact info
- Traditional serif font
- Clean sectioning
- ATS-friendly

### Harvard
- Education listed first
- Categorized skills
- Research-friendly
- Minimal clean design

### Evergreen
- Dark teal header
- Skill progress bars
- Two-column layout
- Photo integrated

### YoungCurve
- Burgundy square markers
- Numbered publications
- Photo in header
- Research-focused

## 📊 Data Schema

All templates use the `UniversalResumeData` schema which includes:

### Core Sections (Required)
- `personal` - Name, contact, photo, social links
- `experience` - Work history with achievements
- `education` - Academic background

### Optional Sections
- `summary` - Professional summary
- `skills` - Flat list or categorized
- `projects` - Portfolio projects
- `certifications` - Professional certifications
- `languages` - Language proficiency
- `publications` - Research publications
- `awards` - Awards & achievements
- `volunteer` - Volunteer experience
- `interests` - Personal interests
- `references` - Professional references
- `customSections` - Flexible custom content

## 🔧 Integration with CV-Helper

### Step 1: Update Template Registry
Add the new templates to `lib/template-registry.ts`:

```typescript
import { 
  AtlanticBlue, 
  Executive, 
  Mercury 
} from '@/templates/react'

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // ... existing templates
  {
    id: 'atlantic_blue',
    name: 'Atlantic Blue',
    component: AtlanticBlue,
    // ... metadata
  },
  // ... more templates
]
```

### Step 2: Update Template Gallery
The templates are now available in `components/template-gallery.tsx`

### Step 3: Data Transformation
Create a mapper to transform CV-Helper data to `UniversalResumeData` format

## 📝 Notes

- All templates use inline styles for PDF compatibility
- Templates are fully responsive
- Photo support varies by template
- ATS-friendly designs available (Classic, Harvard)
- All templates support dark/light themes where applicable

## 🔄 Differences from Playground

1. **Location**: Moved from `template-playground/src/templates` to `templates/react`
2. **Exports**: Added centralized `index.ts` for easier imports
3. **Integration**: Ready to integrate with CV-Helper's existing infrastructure
4. **Metadata**: Enhanced with popularity scores and bestFor recommendations

## ⚠️ Legacy Files

- `template-registry.ts` - Old registry (kept for reference)
- `react-templates.tsx` - Old inline templates (kept for reference)

These can be removed once the new templates are fully integrated.

## 🎯 Next Steps

1. ✅ Templates copied to `templates/react/`
2. ✅ Central export file created (`index.ts`)
3. ⏭️ Integrate with main `lib/template-registry.ts`
4. ⏭️ Update template gallery to use new templates
5. ⏭️ Create data transformation layer
6. ⏭️ Add preview images to public folder
7. ⏭️ Test all templates with real data
8. ⏭️ Remove legacy files after migration

---

**Last Updated:** October 28, 2025  
**Maintained by:** CV-Helper Team
