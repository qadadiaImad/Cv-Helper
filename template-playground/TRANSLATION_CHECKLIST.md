# ✅ Template Translation Checklist

Use this checklist when translating a new template from an image.

---

## 📋 Pre-Translation

- [ ] Template image URL added to `src/utils/images/images_links.md`
- [ ] Image is high quality (min 800px wide)
- [ ] Image shows complete template design
- [ ] Source is noted (Overleaf, CodePen, etc.)

---

## 🔍 Analysis Phase

### Layout
- [ ] Identified layout type (single/two/three column)
- [ ] Measured column widths (%)
- [ ] Noted header presence and height
- [ ] Noted footer presence and height
- [ ] Identified sidebar position (left/right)

### Colors
- [ ] Extracted primary color (hex code)
- [ ] Extracted accent color (hex code)
- [ ] Extracted background colors
- [ ] Extracted text colors (dark, light, muted)
- [ ] Extracted border colors (if any)

### Typography
- [ ] Identified font family
- [ ] Measured H1 size (name)
- [ ] Measured H2 size (section headers)
- [ ] Measured H3 size (subsections)
- [ ] Measured body text size
- [ ] Measured small text size
- [ ] Noted font weights used

### Spacing
- [ ] Measured container padding
- [ ] Measured section margins
- [ ] Measured item margins
- [ ] Noted line height

### Visual Elements
- [ ] Photo present? (yes/no)
- [ ] Photo shape (circle/square/rounded)
- [ ] Photo size
- [ ] Photo position
- [ ] Icons present? (yes/no)
- [ ] Icon style (filled/outlined/emoji)
- [ ] Progress bars present? (yes/no)
- [ ] Progress bar style (linear/circular/dots)
- [ ] Badges present? (yes/no)
- [ ] Badge style (rounded/square/pill)
- [ ] Borders present? (yes/no)
- [ ] Border style and width

### Sections
- [ ] Header section
- [ ] Summary/About section
- [ ] Experience section
- [ ] Education section
- [ ] Skills section
- [ ] Languages section
- [ ] Certifications section
- [ ] Publications section
- [ ] Projects section
- [ ] Contact section
- [ ] Footer section

---

## 💻 Code Generation

- [ ] Created `TemplateAnalysis` object with all data
- [ ] Ran `generateTemplateCode(analysis, 'template-name')`
- [ ] Saved output to `src/templates/template-X-name.tsx`
- [ ] Verified code compiles without errors
- [ ] Component name is PascalCase
- [ ] Export statement is correct

---

## 🎨 Manual Refinement

### Structure
- [ ] A4 container dimensions set (850px × 1200px)
- [ ] `overflow: 'hidden'` added
- [ ] `boxSizing: 'border-box'` added
- [ ] Layout matches original design

### Colors
- [ ] All colors match original
- [ ] Color variables defined at top
- [ ] Colors used consistently throughout

### Typography
- [ ] Font family matches or is appropriate
- [ ] Font sizes are readable
- [ ] Font weights are correct
- [ ] Line heights are appropriate

### Spacing
- [ ] Container padding optimized for A4
- [ ] Section margins reasonable (≤ 25px)
- [ ] Item margins reasonable (≤ 20px)
- [ ] No excessive whitespace

### Components
- [ ] Photo component works
- [ ] Skill bars render correctly
- [ ] Progress indicators work
- [ ] Badges display properly
- [ ] Icons show correctly
- [ ] Timeline elements work

### Sections
- [ ] All sections render with data
- [ ] Sections handle missing data gracefully
- [ ] Section order matches original
- [ ] Section styling matches original

### Special Features
- [ ] Timeline dots/lines (if applicable)
- [ ] Skill rating systems (if applicable)
- [ ] Language proficiency indicators (if applicable)
- [ ] Custom badges/buttons (if applicable)
- [ ] Special layouts (if applicable)

---

## 🔧 A4 Optimization

- [ ] Container width: `850px`
- [ ] Container height: `1200px`
- [ ] Content fits within height
- [ ] No vertical overflow
- [ ] Footer is visible
- [ ] Padding ≤ 30px
- [ ] Section margins ≤ 25px
- [ ] Font sizes appropriate (10-32px)

### Content Limiting
- [ ] Experience limited to 3-4 items
- [ ] Achievements limited to 3 per job
- [ ] Education limited to 2-3 items
- [ ] Publications conditionally shown
- [ ] Certifications conditionally shown
- [ ] Projects conditionally shown

---

## 📝 Registration

- [ ] Exported in `src/templates/universal-templates.tsx`
- [ ] Added to `src/templates/universal-registry.ts` with:
  - [ ] Unique ID (snake_case)
  - [ ] Display name
  - [ ] Description
  - [ ] Category
  - [ ] Tags (array)
  - [ ] Author
  - [ ] Features (array)
  - [ ] Best for (array)
  - [ ] Popularity score
- [ ] Added to `src/components/TemplatePreview.tsx` component map
- [ ] ID matches across all three files

---

## 🧪 Testing

### Browser Testing
- [ ] Template displays in browser
- [ ] All sections render correctly
- [ ] Colors display correctly
- [ ] Typography is readable
- [ ] Spacing looks good
- [ ] No layout breaks
- [ ] No console errors

### Data Testing
- [ ] Works with full sample data
- [ ] Works with minimal data (1 job, 1 education)
- [ ] Works with missing photo
- [ ] Works with missing sections
- [ ] Works with long text
- [ ] Works with short text
- [ ] Works with many items
- [ ] Works with few items

### PDF Testing
- [ ] PDF downloads successfully
- [ ] No content cut at top
- [ ] No content cut at bottom
- [ ] No content cut at sides
- [ ] Footer is visible in PDF
- [ ] Colors render correctly in PDF
- [ ] Text is readable in PDF
- [ ] Photo displays in PDF (if not external URL)

### Responsive Testing (Optional)
- [ ] Looks good at different zoom levels
- [ ] Maintains aspect ratio
- [ ] No horizontal scroll

---

## 📚 Documentation

- [ ] Added template to `images_links.md` as completed
- [ ] Noted any special features or limitations
- [ ] Documented color palette
- [ ] Documented any custom components
- [ ] Added comments in code for complex sections

---

## ✅ Final Checks

- [ ] Template matches original design ≥ 90%
- [ ] All TypeScript errors resolved
- [ ] All linting warnings addressed
- [ ] Code is clean and readable
- [ ] No hardcoded values (use variables)
- [ ] No magic numbers (use named constants)
- [ ] Performance is acceptable
- [ ] File size is reasonable

---

## 🚀 Deployment

- [ ] Committed to version control
- [ ] Tested in production build
- [ ] Verified in different browsers
- [ ] User feedback collected (if applicable)
- [ ] Documentation updated
- [ ] Template marked as complete

---

## 📊 Quality Score

Rate each category from 1-5:

- Design Accuracy: ___/5
- Code Quality: ___/5
- A4 Compliance: ___/5
- PDF Generation: ___/5
- Documentation: ___/5

**Total Score: ___/25**

**Status:**
- 20-25: ✅ Excellent - Ready for production
- 15-19: ⚠️ Good - Minor improvements needed
- 10-14: 🔧 Fair - Significant work needed
- 0-9: ❌ Poor - Major revision required

---

## 📝 Notes

Use this section for any additional notes, issues, or future improvements:

```
[Add notes here]
```

---

**Checklist Version:** 1.0  
**Last Updated:** October 28, 2025
