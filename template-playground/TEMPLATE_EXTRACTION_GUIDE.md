# 🎨 Template Extraction Guide

## Overview

This guide shows you how to extract CV templates from websites and convert them into React components for your playground.

## ✅ Successfully Extracted: Template 17 - Ivy League

### Source
- **Website:** Enhancv (app.enhancv.com)
- **Template Name:** Ivy League
- **Style:** Professional, clean, single-column with blue accents

### Extraction Method

#### 1. **Inspect the Live HTML**
Use browser DevTools to copy the rendered HTML:
```javascript
// In browser console:
document.querySelector('.resume-renderer').outerHTML
```

#### 2. **Analyze Key Styles**
From the HTML, extract:
- **Colors:**
  - Primary: `#002b7f` (Navy blue)
  - Accent: `#56acf2` (Light blue)
  - Background: `#ffffff` (White)
  
- **Typography:**
  - Headings: `Volkhov` (serif)
  - Body: `PT Sans` (sans-serif)
  - Sizes: 13px-22px range

- **Layout:**
  - Single column
  - 850px width
  - 50px padding
  - Centered sections

#### 3. **Map to Universal Schema**
Convert HTML structure to match your `UniversalTemplateProps`:

```typescript
// HTML: <div class="workplace">Company Name</div>
// Maps to: {exp.company}

// HTML: <div class="position">Job Title</div>
// Maps to: {exp.position}
```

#### 4. **Create React Component**
File: `template-17-ivy-league.tsx`

Key features:
- Clean section headers with bottom border
- Blue color scheme
- Achievement grid (3 columns)
- Flexible layout for all sections

#### 5. **Create Standalone HTML**
File: `template-17-ivy-league-standalone.html`

For testing and comparison without React.

## 🚀 Replication Strategy for Other Sites

### Method 1: Live HTML Extraction (Best for SPAs)

**Works for:**
- Enhancv ✅
- Resume.io ✅
- FlowCV ✅
- Canva (with limitations)

**Steps:**
1. Open template in browser
2. Fill with sample data
3. Open DevTools (F12)
4. Find main container element
5. Right-click → Copy → Copy outerHTML
6. Paste into text editor
7. Extract styles from `<style>` tags or computed styles
8. Convert to React component

**Example Code:**
```javascript
// Browser console
const html = document.querySelector('.resume-container').outerHTML;
const styles = Array.from(document.styleSheets)
  .flatMap(sheet => Array.from(sheet.cssRules))
  .map(rule => rule.cssText)
  .join('\n');

console.log('HTML:', html);
console.log('CSS:', styles);
```

### Method 2: Screenshot + Manual Recreation

**Works for:**
- Image-only templates
- Protected/paywalled templates
- LaTeX templates (Overleaf)

**Steps:**
1. Take high-quality screenshot
2. Use image analysis (manual or AI)
3. Extract:
   - Layout structure
   - Colors (use color picker)
   - Font sizes (estimate)
   - Spacing (measure in pixels)
4. Build from scratch using measurements

### Method 3: PDF Inspection

**Works for:**
- Downloadable PDF templates
- LaTeX-generated PDFs

**Steps:**
1. Download PDF
2. Open in Adobe Acrobat or browser
3. Inspect text layers
4. Extract fonts and colors
5. Measure dimensions
6. Recreate structure

### Method 4: Network Tab Analysis

**Works for:**
- Templates loaded via API
- Dynamic content

**Steps:**
1. Open DevTools → Network tab
2. Load template
3. Find API calls returning template data
4. Copy response JSON
5. Analyze structure
6. Map to your schema

## 📋 Extraction Checklist

For each template, document:

- [ ] **Source URL**
- [ ] **Template name**
- [ ] **Screenshot saved**
- [ ] **Color palette extracted**
  - Primary color: `#______`
  - Accent color: `#______`
  - Background: `#______`
  - Text colors: `#______`
- [ ] **Fonts identified**
  - Heading font: `_______`
  - Body font: `_______`
- [ ] **Layout type**
  - [ ] Single column
  - [ ] Two column
  - [ ] Three column
  - [ ] Grid
- [ ] **Dimensions**
  - Width: `_____px`
  - Height: `_____px`
  - Padding: `_____px`
- [ ] **Special features**
  - [ ] Progress bars
  - [ ] Icons
  - [ ] Charts/graphs
  - [ ] Timeline
  - [ ] Photo
  - [ ] Badges
- [ ] **Sections present**
  - [ ] Header
  - [ ] Summary
  - [ ] Experience
  - [ ] Education
  - [ ] Skills
  - [ ] Projects
  - [ ] Certifications
  - [ ] Languages
  - [ ] Awards
  - [ ] Publications

## 🛠️ Tools & Resources

### Browser Extensions
- **ColorZilla** - Color picker
- **WhatFont** - Font identifier
- **Dimensions** - Measure elements
- **CSS Peeper** - Extract CSS

### Online Tools
- **Coolors.co** - Color palette generator
- **WhatTheFont** - Font identifier from images
- **PX to REM Converter** - Unit conversion
- **Can I Use** - CSS compatibility

### Code Tools
- **Prettier** - Format extracted HTML
- **CSS Beautifier** - Clean up CSS
- **HTML to JSX** - Convert HTML to React

## 💡 Pro Tips

### 1. **Start with Structure**
Get the layout right before worrying about exact colors/fonts.

### 2. **Use Browser DevTools**
- Inspect element styles
- Copy computed styles
- Test changes live
- Export as HTML

### 3. **Preserve Hierarchy**
Keep the same DOM structure for easier maintenance.

### 4. **Document Everything**
Add comments explaining non-obvious choices.

### 5. **Test with Real Data**
Use your sample data to verify all sections work.

### 6. **A4 Optimization**
Always ensure 850px × 1200px fits properly.

### 7. **Font Fallbacks**
```css
font-family: 'Primary Font', 'Fallback', sans-serif;
```

### 8. **Color Variables**
Define colors once at the top:
```typescript
const colors = {
  primary: '#002b7f',
  accent: '#56acf2',
  // ...
}
```

## 🎯 Target Sites for Extraction

### High Priority (Professional Quality)

1. **Enhancv** ⭐⭐⭐⭐⭐
   - URL: app.enhancv.com
   - Method: Live HTML extraction
   - Templates: 20+
   - Quality: Excellent
   - Extracted: Ivy League ✅

2. **Resume.io** ⭐⭐⭐⭐⭐
   - URL: resume.io
   - Method: Live HTML extraction
   - Templates: 50+
   - Quality: Excellent

3. **FlowCV** ⭐⭐⭐⭐
   - URL: flowcv.com
   - Method: Live HTML extraction
   - Templates: 30+
   - Quality: Very good

4. **Overleaf LaTeX** ⭐⭐⭐⭐
   - URL: overleaf.com/latex/templates/tagged/cv
   - Method: Screenshot + recreation
   - Templates: 100+
   - Quality: Excellent

5. **Canva** ⭐⭐⭐⭐
   - URL: canva.com/resumes/templates
   - Method: Screenshot + recreation
   - Templates: 1000+
   - Quality: Good to excellent

### Medium Priority

6. **Novoresume**
7. **Zety**
8. **VisualCV**
9. **Standard Resume**
10. **Kickresume**

## 📊 Batch Extraction Script

Create `scripts/batch-extract.js`:

```javascript
const templates = [
  {
    name: 'Ivy League',
    source: 'Enhancv',
    url: 'app.enhancv.com',
    status: 'completed',
    file: 'template-17-ivy-league.tsx'
  },
  {
    name: 'Stockholm',
    source: 'Resume.io',
    url: 'resume.io',
    status: 'pending',
    file: 'template-18-stockholm.tsx'
  },
  // Add more...
];

// Track progress
console.log(`Total templates: ${templates.length}`);
console.log(`Completed: ${templates.filter(t => t.status === 'completed').length}`);
console.log(`Pending: ${templates.filter(t => t.status === 'pending').length}`);
```

## 🎨 Style Patterns

### Common Patterns Found

1. **Header Styles**
   - Centered name + title
   - Contact info below
   - Often uses different font for name

2. **Section Headers**
   - Uppercase text
   - Border bottom or background
   - Accent color
   - Serif font common

3. **Content Layout**
   - Company/Institution name prominent
   - Position/Degree secondary
   - Dates right-aligned
   - Descriptions in smaller font

4. **Color Schemes**
   - Blue: Professional, corporate
   - Green: Tech, growth
   - Red/Burgundy: Creative, bold
   - Gray: Minimal, modern

## 🚀 Next Steps

1. **Extract 5 more templates** from different sources
2. **Create component library** for common elements
3. **Build template gallery** for easy browsing
4. **Add customization options** (color variants)
5. **Implement template search** and filtering

## 📝 Template Naming Convention

```
template-{number}-{name}.tsx

Examples:
- template-17-ivy-league.tsx
- template-18-stockholm.tsx
- template-19-modern-pro.tsx
```

## ✅ Success Metrics

A template is "done" when:
- ✅ React component created
- ✅ Standalone HTML created
- ✅ Tested with sample data
- ✅ A4 compliant (850×1200px)
- ✅ All sections render correctly
- ✅ PDF generation works
- ✅ Documented in registry
- ✅ 85%+ visual match to original

---

**Happy Template Hunting! 🎨✨**
