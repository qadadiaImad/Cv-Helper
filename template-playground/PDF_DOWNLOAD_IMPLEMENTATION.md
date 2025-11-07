# PDF Download Feature Implementation

## Overview
The template-playground now uses the **exact same PDF generation mechanism** as the main CV-Helper project.

## Implementation Details

### 1. PDF Generation Utility (`src/utils/pdf-generator.ts`)

This utility replicates the approach from `lib/react-pdf-generator.tsx` in the main project:

**Key Features:**
- ✅ Renders template in an **isolated iframe** (not directly on the page)
- ✅ Uses **html2canvas** to capture the rendered template
- ✅ Generates **A4-sized PDF** with jsPDF
- ✅ Copies all styles from parent document to iframe
- ✅ High-quality rendering (scale: 2)
- ✅ JPEG compression for smaller file sizes
- ✅ Auto-generates filename from user's name

**Why Iframe Approach?**
1. **Style Isolation**: Prevents interference from page styles
2. **Dimension Control**: Fixed A4 dimensions (210mm x 297mm)
3. **Accurate Rendering**: Exactly what you see is what you get
4. **Clean Capture**: No UI elements (buttons, borders) in PDF

### 2. Updated Components

#### `TemplatePreview.tsx`
- Added **Download PDF** button in header
- Shows loading state while generating
- Uses `useRef` to capture template element
- Calls `generatePDFFromTemplate()` utility

### 3. Dependencies Added

```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2"
}
```

## How It Works

```
User clicks "Download PDF"
        ↓
Create hidden iframe (210mm x 297mm)
        ↓
Clone template HTML + styles into iframe
        ↓
Wait for rendering (requestAnimationFrame)
        ↓
Capture iframe content with html2canvas
        ↓
Convert canvas to JPEG image
        ↓
Embed image in jsPDF document (A4)
        ↓
Save PDF with user's name
        ↓
Remove iframe from DOM
```

## Comparison with Main Project

| Feature | CV-Helper Main | Template Playground |
|---------|---------------|---------------------|
| PDF Library | jsPDF + html2canvas | ✅ Same |
| Rendering Method | Isolated iframe | ✅ Same |
| Image Format | JPEG (0.98 quality) | ✅ Same |
| PDF Size | A4 portrait | ✅ Same |
| Scale Quality | 2x | ✅ Same |
| Style Copying | All stylesheets | ✅ Same |
| Filename Generation | From user name | ✅ Same |

## Usage

### For Users
1. Select a template from the sidebar
2. Edit resume data in the JSON editor
3. Click **"Download PDF"** button in preview header
4. PDF downloads automatically with filename: `{Name}_Resume.pdf`

### For Developers
```typescript
import { generatePDFFromTemplate } from '../utils/pdf-generator'

// In your component
const templateRef = useRef<HTMLDivElement>(null)

const handleDownload = async () => {
  if (templateRef.current) {
    await generatePDFFromTemplate(
      templateRef.current,  // DOM element to capture
      resumeData,           // Resume data
      'Template Name'       // For filename
    )
  }
}

// In JSX
<div ref={templateRef}>
  <TemplateComponent data={resumeData} />
</div>
```

## Installation

```bash
cd template-playground

# Install new dependencies
npm install

# Start dev server
npm run dev
```

## Testing

1. **Test with different templates**: Each template should render correctly in PDF
2. **Test with long content**: Multi-page content should fit properly
3. **Test with images**: If templates have images, they should appear in PDF
4. **Test filename generation**: PDF should be named after the user

## Known Limitations

1. **Cross-origin images**: External images may not render (CORS)
2. **Complex CSS**: Some advanced CSS features may not capture perfectly
3. **Fonts**: Custom fonts must be loaded before PDF generation
4. **File size**: High-quality PDFs can be 500KB-2MB

## Future Enhancements

- [ ] Multi-page PDF support for long resumes
- [ ] PDF quality selector (low/medium/high)
- [ ] Custom filename input
- [ ] Print preview before download
- [ ] PDF metadata (author, title, keywords)

## Troubleshooting

### PDF is blank
- Check if template is rendering in preview
- Ensure `templateRef` is attached to correct element
- Check browser console for errors

### Styles missing in PDF
- Verify styles are loaded before PDF generation
- Check for cross-origin stylesheet issues
- Ensure inline styles are used for critical elements

### PDF quality is poor
- Increase `scale` parameter in html2canvas options
- Use PNG instead of JPEG for better quality (larger file)
- Ensure template dimensions match A4 size

## References

- Main implementation: `lib/react-pdf-generator.tsx`
- API endpoint: `app/api/generate-react-pdf/route.ts`
- Component usage: `components/cv-preview.tsx`
