# 🔧 Template Converter Guide

## Quick Start: Convert CodePen Templates to React

### Step 1: Download Template from CodePen

1. Visit template URL (e.g., https://codepen.io/mariosmaselli/pen/CDcmb)
2. Click **"Export"** button (bottom right)
3. Click **"Export .zip"**
4. Extract the downloaded ZIP file

You'll get files like:
```
dist/
  ├── index.html
  ├── style.css
  └── script.js
```

---

### Step 2: Run the Converter

```bash
# Navigate to your project
cd D:\GitHub\Cv-Helper

# Run the converter
npx tsx scripts/template-converter.ts responsive-professional ./downloads/dist/index.html ./downloads/dist/style.css
```

**Arguments:**
- `responsive-professional` - Name for your template (kebab-case)
- `./downloads/dist/index.html` - Path to HTML file
- `./downloads/dist/style.css` - Path to CSS file

---

### Step 3: Review Generated Files

The converter creates:

1. **`lib/templates/responsive-professional.tsx`**
   - React component skeleton
   - Original HTML structure converted to JSX
   - CSS included as template

2. **`lib/templates/responsive-professional-mapping.md`**
   - Data field mapping guide
   - Placeholders identified
   - CVData interface reference

---

### Step 4: Manual Refinement

#### A. Map Data Fields

Open the generated `.tsx` file and replace placeholders:

**Before:**
```tsx
<h1>John Anderson</h1>
<p>j.anderson@gmail.com</p>
```

**After:**
```tsx
<h1>{data.name}</h1>
<p>{data.email}</p>
```

#### B. Convert CSS to Tailwind

**Before:**
```tsx
<div className="profile-section">
```

**After:**
```tsx
<div className="bg-white p-8 rounded-lg shadow-md">
```

#### C. Map Complex Structures

**Experience Array:**
```tsx
{data.experience.map((exp, idx) => (
  <div key={idx}>
    <h3>{exp.company}</h3>
    <p>{exp.role}</p>
    <span>{exp.period}</span>
    <ul>
      {exp.details.map((detail, didx) => (
        <li key={didx}>{detail}</li>
      ))}
    </ul>
  </div>
))}
```

**Skills Array:**
```tsx
{data.skills.map((skill, idx) => (
  <li key={idx}>{skill}</li>
))}
```

---

### Step 5: Add to Template Library

1. **Import the template:**

```typescript
// lib/react-templates.tsx
import { ResponsiveProfessional } from './templates/responsive-professional'
```

2. **Add to REACT_TEMPLATES:**

```typescript
export const REACT_TEMPLATES: Record<TemplateId, TemplateComponent> = {
  // ... existing templates
  responsive_professional: ResponsiveProfessional,
}
```

3. **Update TemplateId type:**

```typescript
export type TemplateId =
  | 'classic_minimal'
  | 'modern_blue'
  // ... existing
  | 'responsive_professional'
```

4. **Add metadata:**

```typescript
// app/dashboard/templates/page.tsx
const TEMPLATE_META: Record<TemplateId, { name: string; category: string; description: string }> = {
  // ... existing
  responsive_professional: {
    name: "RESPONSIVE PROFESSIONAL",
    category: "Modern",
    description: "Clean responsive layout"
  },
}
```

---

### Step 6: Test the Template

1. **Start dev server:**
```bash
npm run dev
```

2. **Navigate to templates page:**
```
http://localhost:3000/dashboard/templates
```

3. **Select your new template and verify:**
   - All data fields display correctly
   - Layout is responsive
   - Styling looks good
   - No console errors

---

## 📋 Batch Conversion Workflow

### Convert Top 3 Templates:

```bash
# 1. Responsive Resume Template
npx tsx scripts/template-converter.ts responsive-professional ./downloads/responsive/index.html ./downloads/responsive/style.css

# 2. Simple HTML Resume
npx tsx scripts/template-converter.ts simple-print-ready ./downloads/simple/index.html ./downloads/simple/style.css

# 3. Dark Theme Resume
npx tsx scripts/template-converter.ts dark-modern ./downloads/dark/index.html ./downloads/dark/style.css
```

---

## 🎯 CVData Interface Reference

Your templates should map to this interface:

```typescript
interface ResumeData {
  name: string
  email: string
  phone?: string
  location?: string
  summary?: string
  
  experience: Array<{
    company: string
    role: string
    period: string
    details: string[]
  }>
  
  education: Array<{
    institution: string
    degree: string
    period: string
    details?: string[]
  }>
  
  skills: string[]
  
  projects?: Array<{
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
  
  links?: {
    website?: string
    linkedin?: string
    github?: string
    twitter?: string
  }
}
```

---

## 💡 Tips & Best Practices

### 1. **Preserve Original Structure**
Keep the original HTML structure initially, then refine gradually.

### 2. **Use Tailwind Classes**
Convert CSS to Tailwind for consistency:
- `padding: 20px` → `p-5`
- `background: #fff` → `bg-white`
- `border-radius: 8px` → `rounded-lg`

### 3. **Handle Missing Data**
Provide fallbacks for optional fields:
```tsx
{data.phone || '+1 (555) 123-4567'}
{data.summary || 'Professional summary...'}
```

### 4. **Responsive Design**
Use Tailwind responsive prefixes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### 5. **Print Styles**
Add print-specific classes:
```tsx
<div className="print:hidden">
  {/* Hide in print */}
</div>
```

---

## 🐛 Troubleshooting

### Issue: CSS not applying
**Solution:** Check if CSS needs to be converted to Tailwind or added to globals.css

### Issue: Data not displaying
**Solution:** Verify data field names match CVData interface exactly

### Issue: Layout broken
**Solution:** Check responsive classes and container widths

### Issue: TypeScript errors
**Solution:** Ensure all data fields are properly typed and optional fields use `?`

---

## 📚 Resources

- **CodePen Templates:** See `TEMPLATE_ANALYSIS_DEVSNAP.md`
- **CVData Interface:** See `lib/react-templates.tsx`
- **Existing Templates:** See `lib/templates/` for examples
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## ✅ Checklist

Before marking a template as complete:

- [ ] All data fields mapped to CVData
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Print styles applied
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Template added to REACT_TEMPLATES
- [ ] Metadata added to TEMPLATE_META
- [ ] Tested in template gallery
- [ ] Live preview works
- [ ] PDF export works

---

**Happy Converting! 🎉**
