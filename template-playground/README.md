# 🎮 Template Playground

A standalone testing environment for CV-Helper templates. Test, debug, and preview templates in isolation before deploying to production.

## ✨ Features

- 🔄 **Live Preview** - See template changes in real-time
- 📝 **JSON Editor** - Edit resume data on the fly
- 🎨 **All Templates** - Access all templates from the main project
- 🔍 **Search & Filter** - Find templates by name, category, or tags
- 📱 **Split View** - Edit data and preview side-by-side
- ⚡ **Hot Reload** - Vite-powered instant updates
- 🎯 **Isolated Testing** - No dependencies on main app infrastructure

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd template-playground
npm install
```

### 2. Sync Templates from Main Project

```bash
npm run sync-templates
```

This copies the latest templates from `../lib/` to `src/templates/`.

### 3. Start Development Server

```bash
npm run dev
```

The playground will open at `http://localhost:3001`

## 📖 Usage Guide

### Testing New Templates

1. **Add your template** to the main project:
   - `../lib/react-templates.tsx` - Add React component
   - `../lib/template-registry.ts` - Add metadata

2. **Sync templates** to playground:
   ```bash
   npm run sync-templates
   ```

3. **Preview in playground** - Your template appears automatically!

### Editing Data

- **Split View Mode**: Edit JSON on left, see preview on right
- **Preview Only Mode**: Full-width template preview
- **Apply Changes**: Click button to update preview
- **Reset**: Restore sample data anytime

### Testing Workflow

1. Select template from sidebar
2. Edit resume data in JSON editor
3. See live preview
4. Test edge cases (missing fields, long text, etc.)
5. Once satisfied, deploy to main app

## 🏗️ Project Structure

```
template-playground/
├── src/
│   ├── components/
│   │   ├── TemplateSelector.tsx    # Template list sidebar
│   │   ├── TemplatePreview.tsx     # Preview renderer
│   │   └── DataEditor.tsx          # JSON editor
│   ├── data/
│   │   └── sample-data.ts          # Default resume data
│   ├── templates/                   # ← Synced from main project
│   │   ├── react-templates.tsx     # Template components
│   │   └── template-registry.ts    # Template metadata
│   ├── App.tsx                     # Main app
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Styles
├── scripts/
│   └── sync-templates.js           # Sync script
└── package.json
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run sync-templates` | Copy latest templates from main project |

## 🎯 Use Cases

### 1. New Template Development
- Develop templates in isolation
- Test with various data sets
- Preview before adding to main app

### 2. Bug Fixing
- Reproduce template rendering issues
- Test fixes quickly
- Verify edge cases

### 3. Template Comparison
- Compare multiple templates side-by-side
- Test same data across different designs
- Choose best option for production

### 4. Data Testing
- Test templates with minimal data
- Test with maximum data
- Find breaking points

## 🔄 Keeping Templates in Sync

**Important:** Template files are **copied**, not linked. 

### When to Sync

Run `npm run sync-templates` whenever you:
- Add a new template to main project
- Update existing template styles
- Modify template metadata
- Change template registry

### Auto-sync (Optional)

Add to your main project's `package.json`:

```json
{
  "scripts": {
    "dev": "next dev && npm run sync-playground",
    "sync-playground": "cd template-playground && npm run sync-templates"
  }
}
```

## 🎨 Customization

### Change Sample Data

Edit `src/data/sample-data.ts` to customize default resume data.

### Add More Views

Create new components in `src/components/` and add to `App.tsx`.

### Styling

Uses Tailwind CSS. Modify `tailwind.config.js` for custom theme.

## 🐛 Troubleshooting

### Templates not showing?
```bash
# Re-sync templates
npm run sync-templates

# Check if files exist
ls src/templates/
```

### JSON errors?
- Use "Format" button to auto-fix formatting
- Check for missing commas or quotes
- Click "Reset" to restore sample data

### Port 3001 already in use?
Change port in `vite.config.ts`:
```ts
server: {
  port: 3002, // Change this
}
```

## 📦 Technology Stack

- **Vite** - Fast development server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🤝 Workflow Integration

### Development Cycle

```
Main Project (CV-Helper)
    ↓
  [Edit templates]
    ↓
  npm run sync-templates
    ↓
Template Playground
    ↓
  [Test & Preview]
    ↓
  [Bugs found?] → Fix in main project → Sync again
    ↓
  [Looks good?] → Deploy main project
```

## 📝 Notes

- **Independent**: Runs separately from main Next.js app
- **No Database**: Pure frontend testing
- **Fast**: Vite ensures instant hot reload
- **Safe**: Test without affecting production

## 🎉 Happy Testing!

Use this playground to perfect your templates before deploying to production. Faster iteration = better templates!

---

**Need help?** Check the main CV-Helper documentation or the template architecture guide.
