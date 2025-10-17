# 🎯 Quick Paste Guide

## 📋 Copy-Paste Workflow

### **For Each Template:**

1. **Open CodePen URL** in browser
2. **Click HTML editor** → Press `Ctrl+A` → Press `Ctrl+C`
3. **Open** `StyledTemplates/XX-template-name/index.html`
4. **Paste** → `Ctrl+V` → Save

5. **Click CSS editor** → Press `Ctrl+A` → Press `Ctrl+C`
6. **Open** `StyledTemplates/XX-template-name/style.css`
7. **Paste** → `Ctrl+V` → Save

8. **Click JS editor** (if exists) → Press `Ctrl+A` → Press `Ctrl+C`
9. **Open** `StyledTemplates/XX-template-name/script.js`
10. **Paste** → `Ctrl+V` → Save

---

## ⚡ Speed Tips

### **Use VS Code Multi-Cursor:**
1. Open all 3 files in tabs
2. Use `Ctrl+Tab` to switch between them
3. Paste quickly without mouse

### **Browser Shortcuts:**
- `Ctrl+T` - New tab
- `Ctrl+L` - Focus URL bar
- `Ctrl+W` - Close tab

### **VS Code Shortcuts:**
- `Ctrl+P` - Quick file open
- `Ctrl+S` - Save
- `Ctrl+W` - Close file

---

## 📊 Estimated Time

- **Per template:** 2-3 minutes
- **All 18 templates:** 30-45 minutes

---

## ✅ Verification

After pasting each template, verify:
- [ ] HTML file is not empty
- [ ] CSS file is not empty
- [ ] JS file exists (even if empty)
- [ ] No syntax errors

---

## 🚀 Batch Processing

**After all templates are pasted:**

```bash
# Navigate to scripts
cd D:\GitHub\Cv-Helper\scripts

# Convert all templates (example)
for /d %i in (..\StyledTemplates\*) do (
  npx tsx template-converter.ts %~ni %i
)
```

---

## 📁 Quick Navigation

**VS Code:**
- Press `Ctrl+P`
- Type: `StyledTemplates/01`
- Select folder
- Open files

---

**Ready to paste! Start with template #1** 🎯
