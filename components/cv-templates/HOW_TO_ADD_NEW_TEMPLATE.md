# How to Add a New Template to the Server

This guide explains how to integrate a newly created template (like `AtlanticBlueRefactored`) into the CV-Helper application so it appears in the template list and can be used.

## Step-by-Step Integration Process

### Step 1: Export the Template Component

**File:** `C:\Test\Cv-Helper\templates\react\universal-templates.tsx`

Add your new template export to this file:

```tsx
// Add after line 35 (after AcademicBurgundyTemplate)
export { AtlanticBlueRefactored } from './template-1-atlantic-blue-refactored'
```

**Full addition:**
```tsx
export { AcademicBurgundyTemplate } from './template-30-academic-burgundy'
export { AtlanticBlueRefactored } from './template-1-atlantic-blue-refactored'  // NEW

// Editable versions
export { AtlanticBlueFieldEditable } from './template-1-atlantic-blue-field-editable'
```

---

### Step 2: Add to React Templates Map

**File:** `C:\Test\Cv-Helper\lib\react-templates.tsx`

Add the template to the `REACT_TEMPLATES` object:

```tsx
import {
  AtlanticBlue,
  AtlanticBlueRefactored,  // NEW IMPORT
  Executive,
  // ... other imports
} from '@/templates/react'

export const REACT_TEMPLATES = {
  atlantic_blue: AtlanticBlue as any,
  atlantic_blue_refactored: AtlanticBlueRefactored as any,  // NEW ENTRY
  executive: Executive as any,
  // ... other templates
}
```

---

### Step 3: Add to Template Registry

**File:** `C:\Test\Cv-Helper\lib\template-registry.ts`

Add a new entry to the `TEMPLATE_REGISTRY` array. Place it after the existing `atlantic_blue` entry:

```tsx
export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // ... existing atlantic_blue entry ...
  {
    id: 'atlantic_blue',
    name: 'Atlantic Blue',
    // ... existing config
  },
  
  // NEW ENTRY - Add this
  {
    id: 'atlantic_blue_refactored',
    name: 'Atlantic Blue (Component-Based)',
    description: 'Refactored Atlantic Blue using reusable component architecture',
    category: 'modern',
    tags: ['sidebar', 'photo', 'modern', 'professional', 'blue', 'dark-theme', 'component-based', 'new-architecture'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,  // Set to true if you want to hide it initially
    thumbnailPath: '/templates/Atlantic Blue.webp',  // Reuse same thumbnail
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo', 'location', 'website', 'linkedIn', 'github'],
    },
    features: [
      'Component-based architecture',
      'Dark left sidebar',
      'Photo support',
      'Visual skill indicators',
      'Certifications section',
      'Reusable organisms'
    ],
    popularity: 96,  // Slightly higher than original
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['creative', 'tech', 'modern-industries', 'photo-resume', 'professionals'],
    compatibility: {
      atsScore: 88,
      printOptimized: true,
      mobileResponsive: true,
      accessibilityScore: 90
    },
    customization: {
      colorCustomizable: true,
      colorVariants: 3,
      supportsPhoto: true,
      fontCustomizable: true
    },
    estimatedTime: '20-30 minutes',
  },
  
  // Continue with other templates...
  {
    id: 'executive',
    name: 'Executive',
    // ...
  },
]
```

---

### Step 4: Add Theme Configuration (Optional)

**File:** `C:\Test\Cv-Helper\lib\template-themes.ts`

Add theme configuration for the template selector UI:

```tsx
export const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  atlantic_blue: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#3b82f6',
    hoverBorder: '#2563eb',
  },
  
  // NEW ENTRY
  atlantic_blue_refactored: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#1a3a52',  // Use the primary color from the theme
    hoverBorder: '#4a90e2',  // Use the accent color
  },
  
  // ... other themes
}
```

---

### Step 5: Add Field-Editable Version (If Needed)

If you want inline editing support, create a field-editable version:

**File:** `C:\Test\Cv-Helper\templates\react\template-1-atlantic-blue-refactored-field-editable.tsx`

```tsx
// This would need to be created by extending organism components
// with InlineEditableField support - see existing field-editable templates
```

Then add to:
- `universal-templates.tsx` (export)
- `lib/field-editable-templates.tsx` (map entry)

---

### Step 6: Create Thumbnail (Optional but Recommended)

1. Generate a preview of the template
2. Take a screenshot or export as image
3. Save as WebP format: `public/templates/Atlantic Blue Refactored.webp`
4. Update `thumbnailPath` in registry to point to new image

---

### Step 7: Test the Integration

1. **Restart the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to template selector:**
   - Go to `/dashboard/cvs` or wherever templates are displayed
   - Look for your new template in the list

3. **Test template rendering:**
   - Select the template
   - Verify it renders correctly with sample data
   - Test with empty/minimal data
   - Test with maximum data

4. **Test PDF generation:**
   - Generate a PDF using the template
   - Verify the output looks correct

---

## Quick Reference: Files to Modify

| File | Action | Line/Location |
|------|--------|---------------|
| `templates/react/universal-templates.tsx` | Add export | After line 35 |
| `lib/react-templates.tsx` | Add to map | In REACT_TEMPLATES object |
| `lib/template-registry.ts` | Add metadata | In TEMPLATE_REGISTRY array |
| `lib/template-themes.ts` | Add theme | In TEMPLATE_THEMES object |

---

## Example: Complete Integration Code

### 1. universal-templates.tsx
```tsx
export { AcademicBurgundyTemplate } from './template-30-academic-burgundy'
export { AtlanticBlueRefactored } from './template-1-atlantic-blue-refactored'
```

### 2. react-templates.tsx
```tsx
import {
  AtlanticBlue,
  AtlanticBlueRefactored,
  Executive,
  // ...
} from '@/templates/react'

export const REACT_TEMPLATES = {
  atlantic_blue: AtlanticBlue as any,
  atlantic_blue_refactored: AtlanticBlueRefactored as any,
  executive: Executive as any,
  // ...
}
```

### 3. template-registry.ts
```tsx
{
  id: 'atlantic_blue_refactored',
  name: 'Atlantic Blue (Component-Based)',
  description: 'Refactored Atlantic Blue using reusable component architecture',
  category: 'modern',
  tags: ['sidebar', 'photo', 'modern', 'professional', 'blue', 'component-based'],
  author: 'CV-Helper',
  license: 'MIT',
  type: 'react',
  hidden: false,
  thumbnailPath: '/templates/Atlantic Blue.webp',
  requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
  fieldMap: {
    basic: ['name', 'email', 'phone'],
    experience: ['company', 'role', 'period', 'details'],
    education: ['school', 'degree', 'year'],
    skills: ['skills'],
    custom: ['photo', 'location', 'website', 'linkedIn', 'github'],
  },
  features: ['Component-based architecture', 'Dark left sidebar', 'Photo support'],
  popularity: 96,
  isNew: true,
  complexity: 'medium',
  layout: 'two-column',
  bestFor: ['creative', 'tech', 'modern-industries'],
  compatibility: { atsScore: 88, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
  customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
  estimatedTime: '20-30 minutes',
},
```

### 4. template-themes.ts
```tsx
atlantic_blue_refactored: {
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  border: '#1a3a52',
  hoverBorder: '#4a90e2',
},
```

---

## Troubleshooting

### Template doesn't appear in list
- Check that `hidden: false` in registry
- Verify export in `universal-templates.tsx`
- Restart dev server
- Check browser console for errors

### Template renders incorrectly
- Verify all organism components are properly imported
- Check that data structure matches UniversalResumeData
- Test with COMPLETE_SAMPLE_DATA

### PDF generation fails
- Ensure template is added to REACT_TEMPLATES map
- Check that template ID matches across all files
- Verify no runtime errors in template component

### TypeScript errors
- Run `npm run type-check` to find issues
- Ensure all imports are correct
- Verify component props match interfaces

---

## Best Practices

1. **Use consistent naming:**
   - Template ID: `snake_case` (e.g., `atlantic_blue_refactored`)
   - Component name: `PascalCase` (e.g., `AtlanticBlueRefactored`)
   - File name: `kebab-case` (e.g., `template-1-atlantic-blue-refactored.tsx`)

2. **Test thoroughly:**
   - Test with minimal data
   - Test with maximum data
   - Test PDF generation
   - Test on different screen sizes

3. **Document features:**
   - List all unique features in registry
   - Add appropriate tags for searchability
   - Set realistic `estimatedTime`

4. **Set appropriate metadata:**
   - `hidden: true` for testing, `false` for production
   - `isNew: true` for new templates (shows "NEW" badge)
   - `popularity` affects sorting (0-100)

---

## Next Steps After Integration

1. **Create variations:**
   - Use component variants to create color variations
   - Add to `colorVariants` count in registry

2. **Add to tests:**
   - Add template ID to test suites
   - Verify rendering with test data

3. **Update documentation:**
   - Add to template showcase
   - Document unique features
   - Add usage examples

4. **Monitor usage:**
   - Track template selection analytics
   - Gather user feedback
   - Iterate based on usage patterns

---

**Need Help?**
- Check existing templates for reference
- Review component documentation in `/components/cv-templates/README.md`
- Test with `COMPLETE_SAMPLE_DATA` from `@/lib/sample-data`
