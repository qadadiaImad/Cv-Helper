# 🎨 CV-Helper Theme System

## Overview
The template gallery now features a dynamic theme system with **6 beautiful color schemes** and **dark mode support** for each theme.

## Available Themes

### 1. **Soft Lavender** (Default)
**Light Mode:**
- Background: `#F5F3FF` - Soft purple-white
- Sidebar: `#EDE9FE` - Light lavender
- Text: `#2B0B3C` - Deep purple

**Dark Mode:**
- Background: `#1E1B4B` - Deep indigo
- Sidebar: `#312E81` - Rich purple
- Text: `#F5F3FF` - Soft white

**Vibe:** Calm, modern, creative

---

### 2. **Mint Fresh**
**Light Mode:**
- Background: `#F0FDF4` - Soft mint
- Sidebar: `#DCFCE7` - Light green
- Text: `#14532D` - Forest green

**Dark Mode:**
- Background: `#14532D` - Deep forest
- Sidebar: `#166534` - Rich green
- Text: `#F0FDF4` - Mint white

**Vibe:** Clean, energetic, fresh

---

### 3. **Warm Peach**
**Light Mode:**
- Background: `#FFF7ED` - Soft peach
- Sidebar: `#FFEDD5` - Light orange
- Text: `#431407` - Dark brown

**Dark Mode:**
- Background: `#431407` - Deep brown
- Sidebar: `#7C2D12` - Rich orange-brown
- Text: `#FFF7ED` - Peach white

**Vibe:** Friendly, inviting, warm

---

### 4. **Cool Slate**
**Light Mode:**
- Background: `#F8FAFC` - Slate-50
- Sidebar: `#F1F5F9` - Slate-100
- Text: `#0F172A` - Slate-900

**Dark Mode:**
- Background: `#0F172A` - Deep slate
- Sidebar: `#1E293B` - Slate-800
- Text: `#F8FAFC` - Slate white

**Vibe:** Professional, calm, corporate

---

### 5. **Soft Rose**
**Light Mode:**
- Background: `#FFF1F2` - Rose-50
- Sidebar: `#FFE4E6` - Rose-100
- Text: `#4C0519` - Deep rose

**Dark Mode:**
- Background: `#4C0519` - Deep burgundy
- Sidebar: `#881337` - Rich rose
- Text: `#FFF1F2` - Rose white

**Vibe:** Elegant, warm, sophisticated

---

### 6. **Classic Cream** (Original FlowCV)
**Light Mode:**
- Background: `#FAF8F4` - Warm cream
- Sidebar: `#f2f0ed` - Darker cream
- Text: `#2B0B3C` - Deep purple

**Dark Mode:**
- Background: `#1C1917` - Stone-900
- Sidebar: `#292524` - Stone-800
- Text: `#FAF8F4` - Cream white

**Vibe:** Classic, professional, timeless

---

## How to Use

### Theme Switcher Location
The theme controls are located in the **left sidebar** at the bottom:

1. **Dark/Light Toggle Button** - Click to switch between dark and light modes
2. **Palette Button** - Click to open theme picker dropdown

### Theme Picker
- Shows all 6 available themes
- Each theme displays a color preview dot
- Click any theme to apply it instantly
- Current theme is highlighted in purple

### Features
- ✅ **Smooth transitions** - 300ms color transitions for seamless changes
- ✅ **Persistent state** - Theme preference saved in component state
- ✅ **Toast notifications** - Confirmation when theme changes
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Accessibility** - Proper contrast ratios in all themes

---

## Technical Implementation

### Theme Structure
```typescript
const THEMES = {
  themeName: {
    name: "Display Name",
    light: { bg: "#hex", sidebar: "#hex", text: "#hex" },
    dark: { bg: "#hex", sidebar: "#hex", text: "#hex" }
  }
}
```

### Dynamic Styling
- Background colors applied via inline styles for dynamic theming
- Smooth transitions using CSS `transition-colors duration-300`
- Text opacity adjustments for secondary text (99% light, CC% dark)

### State Management
- `isDarkMode` - Boolean for dark/light mode
- `currentTheme` - String key for selected theme
- `showThemePicker` - Boolean for dropdown visibility

---

## Recommendations

### Best Themes by Use Case

**For Professional/Corporate:**
- Cool Slate (most professional)
- Classic Cream (traditional)

**For Creative/Design:**
- Soft Lavender (modern creative)
- Soft Rose (elegant creative)

**For Tech/Startup:**
- Mint Fresh (energetic)
- Cool Slate (clean tech)

**For Warm/Friendly:**
- Warm Peach (inviting)
- Soft Rose (approachable)

---

## Future Enhancements

Potential additions:
- [ ] Save theme preference to localStorage
- [ ] Custom color picker for user-defined themes
- [ ] Theme presets for different industries
- [ ] Gradient background options
- [ ] Animation speed controls
- [ ] High contrast mode for accessibility

---

## CSS Lint Notes

The following CSS warnings are **safe to ignore**:
- `Unknown at rule @custom-variant` - Tailwind CSS v4 directive
- `Unknown at rule @theme` - Tailwind CSS v4 directive

These are valid Tailwind v4 syntax that the CSS linter doesn't recognize yet.
