# 🎯 Template Extraction Cheatsheet

## ⚡ 30-Minute Extraction Process

### 1️⃣ CAPTURE (5 min)
```bash
# Open template in browser
# Fill with sample data
# F12 → Elements tab
# Right-click container → Copy → Copy outerHTML
# Save to clipboard
```

### 2️⃣ ANALYZE (5 min)
```javascript
// Extract from HTML:
Colors:
  - Primary: #______
  - Accent: #______
  - Background: #______

Fonts:
  - Heading: _______
  - Body: _______

Layout:
  - Type: single/two/three column
  - Width: _____px
  - Padding: _____px
```

### 3️⃣ CODE (10 min)
```typescript
// Create: src/templates/template-N-name.tsx
import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const NameTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{ width: '850px', minHeight: '1200px', ... }}>
    <header>
      <h1>{data.personal.fullName}</h1>
      <div>{data.personal.title}</div>
    </header>
    {data.summary && <section>...</section>}
    {data.experience && <section>...</section>}
    {data.education && <section>...</section>}
  </div>
)
```

### 4️⃣ TEST (5 min)
```html
<!-- Create: template-N-name-standalone.html -->
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Font+Name" rel="stylesheet">
  <style>/* Copy styles from React */</style>
</head>
<body>
  <div class="template-container">
    <!-- Static HTML with sample data -->
  </div>
</body>
</html>
```

### 5️⃣ REGISTER (5 min)
```typescript
// Add to: universal-registry.ts
{
  id: 'template_id',
  name: 'Template Name',
  description: 'Brief description',
  category: 'modern',
  tags: ['tag1', 'tag2'],
  author: 'Source (Converted)',
  features: ['Feature 1', 'Feature 2'],
  bestFor: ['Role 1', 'Role 2'],
  popularity: 85,
}
```

---

## 🎨 Common Code Patterns

### Header (Centered)
```typescript
<header style={{ textAlign: 'center', marginBottom: '24px', padding: '6px 12px' }}>
  <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#002b7f', marginBottom: '6px' }}>
    {data.personal.fullName}
  </h1>
  <div style={{ fontSize: '18px', color: '#56acf2', marginBottom: '12px' }}>
    {data.personal.title}
  </div>
  <div style={{ fontSize: '13px', color: '#333', display: 'flex', justifyContent: 'center', gap: '12px' }}>
    <span>{data.personal.email}</span>
    <span>•</span>
    <span>{data.personal.location}</span>
  </div>
</header>
```

### Section Header
```typescript
<h2 style={{
  borderBottom: '1px solid #002b7f',
  color: '#002b7f',
  fontSize: '18px',
  fontWeight: 700,
  marginBottom: '12px',
  paddingBottom: '4px',
  padding: '6px 12px 4px',
}}>
  Section Name
</h2>
```

### Experience Item
```typescript
<div style={{ padding: '6px 12px', marginBottom: '12px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
    <div style={{ color: '#56acf2', fontSize: '18px' }}>{exp.company}</div>
    <div style={{ fontSize: '15px', color: '#333' }}>{exp.location}</div>
  </div>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ color: '#002b7f', fontSize: '15px' }}>{exp.position}</div>
    <div style={{ fontSize: '15px', color: '#333' }}>{exp.startDate} - {exp.endDate}</div>
  </div>
</div>
```

### Skills Grid
```typescript
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
  {data.skills.map((skill, i) => (
    <span key={i} style={{
      padding: '4px 8px',
      background: '#f0f0f0',
      borderRadius: '4px',
      fontSize: '13px',
    }}>
      {skill}
    </span>
  ))}
</div>
```

---

## 🛠️ Quick Commands

### Create Files
```bash
# React component
touch src/templates/template-18-stockholm.tsx

# Standalone HTML
touch template-18-stockholm-standalone.html
```

### Test in Browser
```bash
# Open standalone HTML
start template-18-stockholm-standalone.html  # Windows
open template-18-stockholm-standalone.html   # Mac
```

### Copy HTML from Browser
```javascript
// In browser console
document.querySelector('.resume-container').outerHTML
```

---

## 📊 Quality Checklist

- [ ] Width: 850px ✓
- [ ] Min-height: 1200px ✓
- [ ] Overflow: hidden ✓
- [ ] All sections render ✓
- [ ] Colors match ✓
- [ ] Fonts loaded ✓
- [ ] Spacing correct ✓
- [ ] Registered ✓

---

## 🎯 Target Sites

### High Priority
1. **Enhancv** - app.enhancv.com
2. **Resume.io** - resume.io
3. **FlowCV** - flowcv.com

### Medium Priority
4. **Overleaf** - overleaf.com/latex/templates
5. **Canva** - canva.com/resumes

---

## 💡 Pro Tips

1. **Copy similar template** as starting point
2. **Test incrementally** - one section at a time
3. **Use browser DevTools** to inspect live styles
4. **Focus on structure** before perfecting details
5. **Document as you go** - add notes immediately

---

## 🚀 Speed Hacks

### Boilerplate
```typescript
// Copy this structure for every template
export const {Name}Template: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{ width: '850px', minHeight: '1200px', overflow: 'hidden' }}>
    {/* Your content */}
  </div>
)
```

### Color Constants
```typescript
const colors = {
  primary: '#002b7f',
  accent: '#56acf2',
  background: '#ffffff',
  text: '#333333',
}
```

### Common Spacing
```typescript
const spacing = {
  section: '24px',
  item: '12px',
  padding: '6px 12px',
}
```

---

## 📈 Progress Tracker

| Template | Source | Time | Status |
|----------|--------|------|--------|
| 17. Ivy League | Enhancv | 25min | ✅ |
| 18. Stockholm | Resume.io | - | ⏳ |
| 19. Milan | Enhancv | - | ⏳ |

---

## 🎨 Color Schemes Reference

### Professional Blue
```
Primary: #002b7f (Navy)
Accent: #56acf2 (Light Blue)
```

### Creative Orange
```
Primary: #f39c12 (Orange)
Accent: #e67e22 (Dark Orange)
```

### Modern Green
```
Primary: #2d7a6e (Teal)
Accent: #3ba99c (Light Teal)
```

### Classic Red
```
Primary: #c41e3a (Burgundy)
Accent: #e74c3c (Red)
```

---

## 🔧 Troubleshooting

### Issue: HTML too complex
**Fix:** Simplify to essential elements

### Issue: Fonts not loading
**Fix:** Use Google Fonts CDN

### Issue: Layout breaks
**Fix:** Add overflow: hidden, test with max data

### Issue: Colors don't match
**Fix:** Use ColorZilla to extract exact hex codes

---

**⏱️ Target Time: 20-30 minutes per template**

**🎯 Goal: 50 templates by end of year**

**📊 Current: 17/50 (34% complete)**
