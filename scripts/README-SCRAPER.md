# 🤖 Batch Template Extractor

Automated Python script to extract HTML/CSS from CodePen templates using Playwright.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Python packages
pip install -r requirements-scraper.txt

# Install Playwright browsers
playwright install chromium
```

### 2. Run the Extractor

```bash
# Navigate to scripts directory
cd scripts

# Run the extractor
python batch_extract_templates.py
```

## 📋 What It Does

1. **Navigates** to each CodePen URL
2. **Extracts** HTML and CSS code from editors
3. **Saves** to `scraped-templates/` directory
4. **Generates** markdown files with complete code
5. **Creates** summary JSON with extraction results

## 📁 Output Structure

```
scraped-templates/
├── responsive-professional-complete.md
├── simple-html-resume-complete.md
├── dark-theme-resume-complete.md
├── ... (17 templates total)
└── extraction_results.json
```

## ⚙️ Configuration

### Headless Mode
```python
# In batch_extract_templates.py, line ~280
await extractor.extract_all(
    headless=True,   # True = background, False = see browser
    max_concurrent=2  # Number of parallel extractions
)
```

### Add More Templates
```python
# Add to TEMPLATES list in batch_extract_templates.py
{
    "name": "your-template-name",
    "url": "https://codepen.io/author/pen/xxxxx",
    "author": "Author Name",
    "category": "Modern",
    "tier": 1
}
```

## 📊 Extraction Stats

Each template file includes:
- ✅ Complete HTML code
- ✅ Complete CSS code
- ✅ Metadata (author, category, tier)
- ✅ Line counts and statistics
- ✅ Extraction timestamp

## 🐛 Troubleshooting

### Issue: Playwright not found
```bash
pip install playwright
playwright install
```

### Issue: Extraction fails
- Check internet connection
- Try with `headless=False` to see browser
- Increase timeout in script (line ~95)

### Issue: Empty code extracted
- CodePen might have changed structure
- Check browser console for errors
- Try manual extraction for that template

## 🔄 Workflow After Extraction

1. **Review** extracted templates in `scraped-templates/`
2. **Convert** to React using `template-converter.ts`
3. **Map** data fields to CVData interface
4. **Add** to `lib/react-templates.tsx`
5. **Test** in template gallery

## 📈 Success Rate

Expected: **15-17 out of 17 templates** (88-100%)

Some templates may fail due to:
- Different CodePen editor structures
- Protected/private pens
- Network issues

## 🎯 Next Steps

After successful extraction:

```bash
# Convert to React components
npx tsx scripts/template-converter.ts responsive-professional ./scraped-templates/responsive-professional-complete.md

# Add to library
# See TEMPLATE_CONVERTER_GUIDE.md for details
```

## 📝 Notes

- Script uses **async/await** for concurrent extraction
- **Rate limiting** with max_concurrent parameter
- **Error handling** for failed extractions
- **JSON summary** for tracking results

---

**Happy Extracting! 🎉**
