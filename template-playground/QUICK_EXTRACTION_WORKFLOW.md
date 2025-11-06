# ⚡ Quick Template Extraction Workflow

## 🎯 Goal
Extract CV templates from websites and add them to the playground in **under 30 minutes per template**.

## 📋 5-Step Process

### Step 1: Find & Capture (5 min)
1. Navigate to template source (Enhancv, Resume.io, etc.)
2. Fill with sample data
3. Open DevTools (F12)
4. Copy HTML: Right-click main container → Copy → Copy outerHTML
5. Take screenshot for reference

### Step 2: Extract Styles (5 min)
From the HTML, identify:
- **Colors**: Primary, accent, background, text
- **Fonts**: Heading font, body font
- **Layout**: Single/two/three column, widths
- **Spacing**: Padding, margins, gaps
- **Special elements**: Progress bars, icons, charts

**Quick tip:** Use browser's computed styles panel

### Step 3: Create React Component (10 min)
```bash
# Create new file
touch src/templates/template-{N}-{name}.tsx
```

Template structure:
```typescript
import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const {Name}Template: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: '#ffffff',
    fontFamily: '{font}',
    padding: '{padding}',
    overflow: 'hidden',
  }}>
    {/* Header */}
    <header>...</header>
    
    {/* Sections */}
    {data.summary && <section>...</section>}
    {data.experience && <section>...</section>}
    {data.education && <section>...</section>}
    {data.skills && <section>...</section>}
  </div>
)
```

### Step 4: Create Standalone HTML (5 min)
```bash
# Create test file
touch template-{N}-{name}-standalone.html
```

Copy styles from React component, add sample data.

### Step 5: Register Template (5 min)
Add to `universal-registry.ts`:
```typescript
{
  id: '{template_id}',
  name: '{Template Name}',
  description: '{Brief description}',
  category: 'modern' | 'classic' | 'creative' | 'academic' | 'executive',
  tags: ['tag1', 'tag2', ...],
  author: '{Source} (Converted)',
  features: ['Feature 1', 'Feature 2', ...],
  bestFor: ['Role 1', 'Role 2', ...],
  popularity: 85,
}
```

## 🛠️ Tools Checklist

- [ ] Browser DevTools (F12)
- [ ] Color picker (ColorZilla or built-in)
- [ ] Text editor (VS Code)
- [ ] Screenshot tool
- [ ] Template source website access

## 📊 Template Extraction Log

| # | Name | Source | Status | Time | Date | Notes |
|---|------|--------|--------|------|------|-------|
| 17 | Ivy League | Enhancv | ✅ Done | 25min | 2025-11-02 | Blue accents, achievement grid |
| 18 | Stockholm | Resume.io | ⏳ Pending | - | - | - |
| 19 | Modern Pro | FlowCV | ⏳ Pending | - | - | - |

## 🎨 Common Patterns

### Header Styles
```typescript
// Centered with contact
<header style={{ textAlign: 'center', marginBottom: '24px' }}>
  <h1>{data.personal.fullName}</h1>
  <div>{data.personal.title}</div>
  <div>{email} • {linkedin} • {location}</div>
</header>
```

### Section Headers
```typescript
// With bottom border
<h2 style={{
  borderBottom: '1px solid {color}',
  color: '{color}',
  fontSize: '18px',
  fontWeight: 700,
  marginBottom: '12px',
  paddingBottom: '4px',
}}>
  {sectionName}
</h2>
```

### Experience Items
```typescript
// Company + Position + Dates
<div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>{exp.company}</div>
    <div>{exp.location}</div>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>{exp.position}</div>
    <div>{exp.startDate} - {exp.endDate}</div>
  </div>
</div>
```

## ⚡ Speed Tips

1. **Use template boilerplate** - Copy from existing template
2. **Focus on structure first** - Get layout right, then polish
3. **Test incrementally** - Check each section as you build
4. **Reuse components** - Copy similar sections from other templates
5. **Skip perfection** - 85% match is good enough

## 🎯 Quality Checklist

Before marking as "Done":
- [ ] React component created
- [ ] Standalone HTML created
- [ ] Tested with sample data
- [ ] A4 compliant (850×1200px)
- [ ] All sections render
- [ ] Colors match original
- [ ] Fonts loaded correctly
- [ ] Registered in registry
- [ ] Visual match 85%+

## 📈 Batch Extraction Strategy

### Week 1: Foundation (5 templates)
- Enhancv: Ivy League ✅, Stockholm, Milan
- Resume.io: Toronto, Dublin

### Week 2: Diversity (5 templates)
- FlowCV: 3 templates
- Overleaf LaTeX: 2 templates

### Week 3: Polish (5 templates)
- Canva: 3 templates
- Novoresume: 2 templates

### Week 4: Variants (5 templates)
- Create color variants of popular templates
- Add customization options

## 🚀 Next Template: Stockholm (Resume.io)

**Estimated time:** 30 minutes

**Steps:**
1. Go to resume.io
2. Select Stockholm template
3. Fill with sample data
4. Copy HTML from DevTools
5. Extract styles
6. Create `template-18-stockholm.tsx`
7. Create `template-18-stockholm-standalone.html`
8. Add to registry
9. Test and verify

## 💡 Pro Tips

- **Batch similar templates** - Extract all from one source at once
- **Document as you go** - Add notes to extraction log
- **Create variants** - One template → multiple color schemes
- **Automate repetitive tasks** - Use scripts for boilerplate
- **Focus on popular sources** - Enhancv, Resume.io, FlowCV first

## 📞 Troubleshooting

### Issue: Can't access HTML
**Solution:** Use screenshot + manual recreation

### Issue: Complex JavaScript
**Solution:** Simplify to static version

### Issue: External fonts not loading
**Solution:** Use Google Fonts CDN or fallback fonts

### Issue: Layout breaks with real data
**Solution:** Add overflow handling and test with max data

---

**Target:** 20 templates in 1 month = 1 template per day (30 min/day)

**Current Progress:** 17/20 templates (85% complete) ✅
