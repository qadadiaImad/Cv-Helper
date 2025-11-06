# 📄 A4 Template Sizing Guide

## Critical A4 Dimensions

**ALWAYS use these exact dimensions to prevent PDF cutting:**

```tsx
<div style={{
  width: '850px',        // A4 width in pixels (210mm ≈ 850px at 96dpi)
  maxWidth: '850px',
  height: '1200px',      // A4 height in pixels (297mm ≈ 1200px at 96dpi)
  margin: '0 auto',
  overflow: 'hidden',    // Critical: prevents content bleeding
  boxSizing: 'border-box',
  position: 'relative',
}}>
```

**⚠️ IMPORTANT:** Use **pixels (px)** not millimeters (mm)! The PDF generator works better with pixel-based dimensions.

## Why Templates Get Cut

❌ **Common Mistakes:**
1. Using `mm` instead of `px` (PDF generator doesn't handle mm well)
2. Using `minHeight` without `height` (allows overflow)
3. No `overflow: 'hidden'` (content bleeds outside)
4. Too much padding/margin (wastes space)
5. Font sizes too large (doesn't fit)
6. Section margins too big (content doesn't fit)

✅ **Correct Approach:**
1. Use `px` units for dimensions (850px × 1200px)
2. Set exact `height: '1200px'` (not minHeight)
3. Add `overflow: 'hidden'`
4. Optimize spacing for A4 (padding ≤ 30px, margins ≤ 20px)
5. Use appropriate font sizes (11-32px range)

## A4 Specifications

| Property | Value | Notes |
|----------|-------|-------|
| Width | 210mm | 8.27 inches |
| Height | 297mm | 11.69 inches |
| Aspect Ratio | 1:1.414 | ISO 216 standard |
| Pixels (96 DPI) | 794 x 1123 | Approximate |
| Pixels (300 DPI) | 2480 x 3508 | Print quality |

## Recommended Spacing

### Container Padding
```tsx
{
  padding: '20mm 15mm', // Top/Bottom: 20mm, Left/Right: 15mm
  // OR
  padding: '25mm 20mm', // More conservative
}
```

### Section Margins
```tsx
{
  marginBottom: '15px',  // Between sections
  marginBottom: '20px',  // For major sections
  marginBottom: '25px',  // Maximum recommended
}
```

### Font Sizes (A4 Optimized)
```tsx
{
  h1: '28-32px',      // Name/Title
  h2: '16-20px',      // Section headers
  h3: '14-16px',      // Subsection headers
  body: '11-13px',    // Body text
  small: '9-11px',    // Footer/metadata
}
```

## Template Structure Example

```tsx
export const MyTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  return (
    <div style={{
      // A4 CONTAINER
      width: '210mm',
      maxWidth: '210mm',
      minHeight: '297mm',
      maxHeight: '297mm',
      margin: '0 auto',
      padding: '20mm 15mm',  // Safe print margins
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Header - compact */}
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>
          {data.personal.fullName}
        </h1>
      </header>

      {/* Sections - optimized spacing */}
      <section style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>
          Experience
        </h2>
        {/* Content */}
      </section>

      {/* Footer - minimal */}
      <footer style={{ 
        marginTop: 'auto',
        fontSize: '10px',
        paddingTop: '15px'
      }}>
        {/* Footer content */}
      </footer>
    </div>
  )
}
```

## Two-Column Layout (A4)

```tsx
<div style={{
  width: '210mm',
  maxHeight: '297mm',
  display: 'flex',
  overflow: 'hidden',
}}>
  {/* Sidebar - 30% */}
  <aside style={{
    width: '30%',
    padding: '20mm 10mm',
    overflow: 'auto',  // Allow internal scroll if needed
  }}>
    {/* Sidebar content */}
  </aside>

  {/* Main - 70% */}
  <main style={{
    width: '70%',
    padding: '20mm 15mm',
    overflow: 'auto',
  }}>
    {/* Main content */}
  </main>
</div>
```

## Content Density Tips

### 1. Reduce Whitespace
```tsx
// ❌ Too much space
marginBottom: '40px'

// ✅ Optimized for A4
marginBottom: '20px'
```

### 2. Compact Lists
```tsx
<ul style={{ 
  margin: 0, 
  paddingLeft: '18px',
  lineHeight: '1.4'  // Tighter line spacing
}}>
```

### 3. Smaller Headings
```tsx
// ❌ Too large for A4
fontSize: '42px'

// ✅ Fits better
fontSize: '28px'
```

### 4. Efficient Sections
```tsx
// Show only essential sections
{data.experience.length > 0 && (
  <section style={{ marginBottom: '18px' }}>
    {/* Only render if has data */}
  </section>
)}
```

## Testing Checklist

Before finalizing a template:

- [ ] Container has `width: '210mm'`
- [ ] Container has `maxHeight: '297mm'`
- [ ] Container has `overflow: 'hidden'`
- [ ] Padding is ≤ 25mm total
- [ ] Section margins are ≤ 25px
- [ ] Font sizes are appropriate (11-32px)
- [ ] Test with maximum data (10+ jobs, skills, etc.)
- [ ] Test with minimal data (1 job, no photo)
- [ ] Download PDF and check for cutting
- [ ] Verify footer is visible
- [ ] Check that all sections fit

## Common Fixes

### Issue: Content Cut at Bottom
```tsx
// Add maxHeight and overflow
maxHeight: '297mm',
overflow: 'hidden',
```

### Issue: Content Too Wide
```tsx
// Use exact A4 width
width: '210mm',
maxWidth: '210mm',
```

### Issue: Text Too Small in PDF
```tsx
// Increase minimum font size
fontSize: '11px',  // Minimum readable
```

### Issue: Too Much Content
```tsx
// Reduce spacing
marginBottom: '15px',  // Instead of 30px
padding: '20mm 15mm',  // Instead of 40mm
```

## Multi-Page Support (Future)

For resumes that need multiple pages:

```tsx
// Page 1
<div style={{ width: '210mm', height: '297mm' }}>
  {/* Page 1 content */}
</div>

// Page 2
<div style={{ width: '210mm', height: '297mm', pageBreakBefore: 'always' }}>
  {/* Page 2 content */}
</div>
```

## Print-Safe Margins

Recommended safe zones to avoid printer cutting:

```tsx
{
  paddingTop: '20mm',     // Top margin
  paddingBottom: '20mm',  // Bottom margin
  paddingLeft: '15mm',    // Left margin
  paddingRight: '15mm',   // Right margin
}
```

**Printable area:** ~180mm × 257mm

## Quick Reference

```tsx
// ✅ PERFECT A4 TEMPLATE STARTER
const A4_CONTAINER_STYLE = {
  width: '850px',        // A4 width
  maxWidth: '850px',
  height: '1200px',      // A4 height (EXACT - prevents cutting!)
  margin: '0 auto',
  padding: '25px 30px',  // Safe margins
  overflow: 'hidden',    // CRITICAL!
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  position: 'relative',
}

// Use it:
<div style={A4_CONTAINER_STYLE}>
  {/* Your template content */}
</div>
```

## Examples

### ✅ Good A4 Template
- Atlantic Blue
- Executive
- Simple Hipster (after fixes)

### ⚠️ Needs Review
- Check all existing templates for A4 compliance
- Verify PDF downloads don't cut content

---

**Remember:** When in doubt, test the PDF download! 📄✨
