# 🎨 Template Converter Guide

## Overview

This tool converts template images into HTML/CSS that you can view side-by-side with the original to identify discrepancies.

## 📋 Quick Start

### 1. Add Template Image URLs

Edit the file: `src/utils/images/images_links`

Add one URL per line:
```
https://example.com/template1.jpg
https://example.com/template2.png
```

### 2. Run the Converter

```bash
node convert-template.js
```

### 3. View Results

The script will generate HTML files in: `src/utils/output/`

Open them in your browser to see:
- **Left side:** Original template image
- **Right side:** Generated HTML/CSS

### 4. Compare & Iterate

1. Look at both versions side-by-side
2. Note differences in:
   - Colors
   - Spacing (padding, margins)
   - Font sizes
   - Layout structure
   - Border styles
   - Element positions

3. Edit `convert-template.js` to adjust the HTML/CSS
4. Re-run the script
5. Repeat until they match!

## 🎯 What Gets Generated

The script creates a comparison page with:

### Original Template (Left)
- Shows your template image
- Exactly as it appears in the source

### Generated HTML/CSS (Right)
- Live HTML/CSS preview
- Same dimensions (850px × 1200px for A4)
- Styled to match the original

## 🔧 Customization

### Adjusting Colors

In `convert-template.js`, find the CSS section and modify:

```css
.template-header {
  background: #4a4a4a;  /* Change header color */
}

.badge {
  background: #00bcd4;  /* Change accent color */
}

.sidebar {
  background: #f0f0f0;  /* Change sidebar background */
}
```

### Adjusting Spacing

```css
.sidebar {
  padding: 20px 15px;  /* Adjust sidebar padding */
}

.section {
  margin-bottom: 20px;  /* Adjust section spacing */
}

.skill-bar {
  margin-bottom: 10px;  /* Adjust skill bar spacing */
}
```

### Adjusting Typography

```css
.template-header h1 {
  font-size: 32px;  /* Adjust name size */
}

.section-header {
  font-size: 16px;  /* Adjust section header size */
}

.section-text {
  font-size: 11px;  /* Adjust body text size */
}
```

### Adjusting Layout

```css
.sidebar {
  width: 27%;  /* Adjust sidebar width */
}

.main-content {
  width: 73%;  /* Adjust main content width */
}

.template-header {
  height: 100px;  /* Adjust header height */
}
```

## 📊 Example Workflow

### Step 1: Initial Run
```bash
node convert-template.js
```

Output:
```
🎨 Template Converter Starting...

📸 Found 1 template image(s)

📝 Processing: template-1
   URL: https://example.com/template.jpg
✅ Generated: src/utils/output/template-1-comparison.html
🌐 Open in browser: file:///C:/path/to/template-1-comparison.html

🎉 Conversion complete!
```

### Step 2: Open in Browser

Double-click the generated HTML file or drag it into your browser.

### Step 3: Compare

Look at both sides and note:
- ❌ Header color is too light
- ❌ Sidebar needs more padding
- ❌ Skill bars should be orange, not cyan
- ✅ Layout structure is correct
- ✅ Font sizes look good

### Step 4: Adjust CSS

Edit `convert-template.js`:

```css
/* Before */
.template-header {
  background: #4a4a4a;
}

/* After */
.template-header {
  background: #3a3a3a;  /* Darker */
}
```

### Step 5: Re-run

```bash
node convert-template.js
```

Refresh browser to see changes!

### Step 6: Repeat

Keep iterating until perfect match! ✨

## 🎨 Common Adjustments

### Colors Don't Match

**Problem:** Colors look different

**Solution:**
1. Use a color picker tool (browser DevTools, ColorZilla)
2. Get exact hex codes from original image
3. Update CSS color values
4. Re-run script

### Spacing Too Tight/Loose

**Problem:** Elements too close or too far apart

**Solution:**
1. Measure spacing in original (estimate in pixels)
2. Adjust padding/margin values in CSS
3. Re-run script
4. Fine-tune until it matches

### Fonts Too Big/Small

**Problem:** Text sizes don't match

**Solution:**
1. Compare text sizes visually
2. Adjust font-size values in CSS
3. Remember: h1 > h2 > h3 > body > small
4. Re-run script

### Layout Structure Wrong

**Problem:** Columns, header, or sections in wrong places

**Solution:**
1. Identify layout type (single/two/three column)
2. Adjust width percentages
3. Check header/footer heights
4. Re-run script

## 💡 Pro Tips

### 1. Start with Structure
Get the layout right first (columns, header, sections), then worry about details.

### 2. Use Browser DevTools
- Right-click → Inspect Element
- Modify CSS live in browser
- Copy working CSS back to script

### 3. Take Screenshots
Take screenshots at each iteration to track progress.

### 4. Focus on Key Elements
Don't obsess over tiny details. Focus on:
- Overall layout
- Color scheme
- Typography hierarchy
- Spacing consistency

### 5. Test with Real Data
Once close, convert to React component and test with real resume data.

## 🚀 Next Steps

Once your HTML/CSS matches the original:

1. **Convert to React Component**
   - Copy the HTML structure
   - Convert to JSX
   - Add data bindings
   - Create as `template-X-name.tsx`

2. **Integrate with System**
   - Register in `universal-registry.ts`
   - Export from `universal-templates.tsx`
   - Map in `TemplatePreview.tsx`

3. **Test Thoroughly**
   - Test with sample data
   - Check PDF generation
   - Verify A4 compliance
   - Test edge cases

4. **Deploy!** 🎉

## 📁 File Structure

```
template-playground/
├── convert-template.js              # Main converter script
├── src/
│   └── utils/
│       ├── images/
│       │   └── images_links         # Your image URLs (input)
│       └── output/
│           └── template-1-comparison.html  # Generated files (output)
```

## 🔍 Troubleshooting

### Script Won't Run

**Error:** `Cannot find module`

**Solution:**
```bash
# Make sure you're in the right directory
cd template-playground

# Run the script
node convert-template.js
```

### No Images Found

**Error:** `No image links found`

**Solution:**
1. Check file exists: `src/utils/images/images_links`
2. Make sure URLs start with `http://` or `https://`
3. One URL per line, no extra spaces

### HTML File Won't Open

**Problem:** Double-clicking doesn't work

**Solution:**
1. Right-click the HTML file
2. Choose "Open with" → Browser (Chrome, Firefox, etc.)
3. Or drag the file into an open browser window

### Image Doesn't Load

**Problem:** Original image shows broken

**Solution:**
1. Check the URL is accessible
2. Try opening URL directly in browser
3. Some URLs expire (like S3 signed URLs)
4. Download image and use local path instead

## 📚 Resources

- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Color Picker Tools](https://coolors.co/)
- [Google Fonts](https://fonts.google.com/)
- [A4 Template Guide](./src/templates/A4_TEMPLATE_GUIDE.md)

---

**Happy Template Converting! 🎨✨**
