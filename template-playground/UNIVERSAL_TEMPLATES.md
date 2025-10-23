# 🎯 Universal Template System

## New Architecture

### 📋 Core Principles

1. **ONE JSON Schema** = Fits ALL templates
2. **Templates = Pure Visual Shells** (colors, fonts, spacing only)
3. **100% Data Coverage** = Every field is used by at least one template

---

## 📂 New Files Created

```
src/templates/
├── universal-schema.ts          ← Complete data model (type definitions)
├── universal-templates.tsx      ← New templates (AtlanticBlue, Executive, Mercury, etc.)
└── sample-data-universal.ts     ← Complete example showing 100% of schema
```

---

## 🎨 Templates Implemented (Based on Image)

### 1. **Atlantic Blue**
- Dark left sidebar with photo
- White content area
- Sections: Contact, Skills, Languages | Summary, Experience, Education

### 2. **Executive** 
- Traditional two-column
- Serif typography
- Formal layout with centered header

### 3. **Mercury**
- Centered design
- Photo at top
- Clean, modern aesthetic
- Skills as tags

### 4. **Classic**
- Right-aligned header contact
- Traditional serif font
- Professional layout

### 5. **Harvard**
- Minimal design
- Education-first (academic style)
- Clean sectioning

---

## 📊 Universal Data Schema

### Required Sections
```typescript
{
  personal: {
    fullName, title, email, phone, 
    location, photo, links...
  },
  experience: [...],
  education: [...],
}
```

### Optional Sections
```typescript
{
  summary: { text },
  skills: [...],
  skillCategories: [...],
  projects: [...],
  certifications: [...],
  languages: [...],
  publications: [...],
  awards: [...],
  volunteer: [...],
  interests: [...],
  references: [...],
}
```

---

## 🚀 How to Use in Playground

### Step 1: Update App.tsx

```tsx
// Import new schema and templates
import { COMPLETE_SAMPLE_DATA } from './templates/sample-data-universal'
import type { UniversalResumeData } from './templates/universal-schema'

// State type
const [resumeData, setResumeData] = useState<UniversalResumeData>(COMPLETE_SAMPLE_DATA)
```

### Step 2: Update TemplatePreview.tsx

```tsx
import * as UniversalTemplates from '../templates/universal-templates'

// Render template
const TemplateComponent = UniversalTemplates[templateId]
<TemplateComponent data={data} />
```

### Step 3: Update Template Registry

Add metadata for new templates:
```typescript
{
  id: 'atlantic_blue',
  name: 'Atlantic Blue',
  category: 'modern',
  // ... metadata
}
```

---

## ✨ Benefits

### For Development
- ✅ Add new template = Just copy/paste and change styles
- ✅ No data structure changes needed
- ✅ Test with complete dataset instantly
- ✅ Hot reload works perfectly

### For Testing
- ✅ One JSON file tests ALL templates
- ✅ See 100% of template potential
- ✅ Find missing fields easily
- ✅ Compare templates side-by-side

### For Maintenance
- ✅ Single source of truth for data model
- ✅ TypeScript ensures type safety
- ✅ Easy to add new optional fields
- ✅ Templates don't break when data changes

---

## 🎯 Adding New Templates

### Template Checklist

1. Copy existing template as starting point
2. Change ONLY visual styles:
   - Colors
   - Fonts
   - Spacing/padding
   - Layout (grid, flex, etc.)
   - Borders, shadows, etc.

3. Keep data access consistent:
   ```tsx
   data.personal.fullName  // ✅ Good
   data.name               // ❌ Bad - doesn't exist
   ```

4. Handle optional fields:
   ```tsx
   {data.summary && <section>...</section>}
   {data.projects && data.projects.map(...)}
   ```

---

## 📝 Example: Adding a New Template

```tsx
export const YourNewTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    // Your custom styles
    backgroundColor: '#YOUR_COLOR',
    fontFamily: 'YOUR_FONT',
    padding: 'YOUR_SPACING',
  }}>
    {/* Header */}
    <header>
      <h1>{data.personal.fullName}</h1>
      <p>{data.personal.title}</p>
    </header>

    {/* Experience */}
    <section>
      {data.experience.map(exp => (
        <div key={exp.company}>
          <h3>{exp.position}</h3>
          <p>{exp.company}</p>
          {/* Your custom layout */}
        </div>
      ))}
    </section>

    {/* ... more sections */}
  </div>
)
```

---

## 🔄 Migration Path

### Current System → Universal System

**Old way:**
```tsx
type ResumeData = {
  name: string
  email: string
  // Limited fields
}
```

**New way:**
```tsx
interface UniversalResumeData {
  personal: { fullName, email, ... }
  experience: [...]
  // ALL possible fields
}
```

### Gradual Adoption

1. Keep old templates working
2. Add new universal templates alongside
3. Test with COMPLETE_SAMPLE_DATA
4. Migrate UI when ready
5. Deprecate old system

---

## 🎨 Styling Guidelines

### DO ✅
- Use inline styles (PDF-compatible)
- Responsive units (%, vh, em)
- Flexbox/Grid for layout
- Conditional rendering for optional fields

### DON'T ❌
- Don't use external CSS
- Don't hardcode data
- Don't assume field exists
- Don't use CSS modules

---

## 🧪 Testing Your Template

```tsx
// 1. Test with full data
<YourTemplate data={COMPLETE_SAMPLE_DATA} />

// 2. Test with minimal data
<YourTemplate data={{
  personal: { fullName: 'John Doe', email: '...', phone: '...' },
  experience: [],
  education: [],
}} />

// 3. Test with missing optional fields
// Template should NOT break!
```

---

## 📦 Ready to Deploy?

### Checklist
- [ ] Template works with COMPLETE_SAMPLE_DATA
- [ ] Template works with minimal data
- [ ] All sections render correctly
- [ ] Optional fields handled gracefully
- [ ] Styles are PDF-compatible
- [ ] No console errors
- [ ] Tested in playground
- [ ] Synced to main project

---

## 🎉 Result

**Before:** 13 templates, limited data, hard to test

**After:** Unlimited templates, complete data model, easy to test

**Time saved:** 5-10 minutes per template creation/testing!

