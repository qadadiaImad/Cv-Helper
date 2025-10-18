# 🎨 Theme Usage Guide - Global Theme System

The CV-Helper theme system is **already applied globally** to all pages! Here's how to use it effectively.

## ✅ Current Setup

The theme system is configured in the root layout (`app/layout.tsx`):

```tsx
<ThemeProvider>
  <ThemeWrapper>
    <SiteHeader />
    {children}
  </ThemeWrapper>
</ThemeProvider>
```

This means **all pages automatically inherit the theme**!

---

## 🎯 How to Use Themes in Your Components

### **Method 1: CSS Custom Properties (Recommended)**

The theme colors are available as CSS variables throughout the entire app:

```tsx
// In any component
<div style={{ backgroundColor: 'var(--theme-bg)' }}>
  <h1 style={{ color: 'var(--theme-text)' }}>Hello</h1>
  <div style={{ backgroundColor: 'var(--theme-card)' }}>Card</div>
</div>
```

**Available CSS Variables:**
- `--theme-bg` - Main background
- `--theme-bg-secondary` - Secondary background
- `--theme-sidebar` - Sidebar background
- `--theme-card` - Card background
- `--theme-text` - Primary text color
- `--theme-text-secondary` - Secondary text color
- `--theme-border` - Border color
- `--theme-accent` - Accent/highlight color

### **Method 2: React Hook (For Dynamic Styling)**

Use the `useTheme` hook in any component:

```tsx
"use client"

import { useTheme } from '@/lib/theme-context'

export function MyComponent() {
  const { theme, isDarkMode, currentTheme, setTheme, toggleDarkMode } = useTheme()
  
  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text }}>
      <h1>Current Theme: {currentTheme}</h1>
      <p>Dark Mode: {isDarkMode ? 'Yes' : 'No'}</p>
      
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <button onClick={() => setTheme('ocean')}>Switch to Ocean</button>
    </div>
  )
}
```

### **Method 3: Tailwind CSS (Using Custom Properties)**

You can use the CSS variables in Tailwind classes:

```tsx
<div className="bg-[var(--theme-bg)] text-[var(--theme-text)]">
  <div className="border-[var(--theme-border)]">
    Content
  </div>
</div>
```

---

## 🎨 Available Themes

1. **🌸 Soft Rose** (Default)
2. **💜 Soft Lavender**
3. **🌿 Mint Fresh**
4. **🌊 Ocean Blue**
5. **🌅 Warm Sunset**
6. **⚡ Cool Slate**
7. **🌲 Deep Forest**
8. **✨ Cosmic Purple**

Each theme has **light** and **dark** mode variants!

---

## 🔧 Theme Properties

Each theme provides 8 color properties:

| Property | Usage |
|----------|-------|
| `bg` | Main page background |
| `bgSecondary` | Secondary sections |
| `sidebar` | Sidebar/navigation |
| `card` | Card components |
| `text` | Primary text |
| `textSecondary` | Secondary text |
| `border` | Borders and dividers |
| `accent` | Buttons, links, highlights |

---

## 📍 Where Themes Are Applied

### ✅ **Already Themed:**
- **Header** - User dropdown includes theme switcher
- **All Pages** - Body background and text color
- **Dashboard** - Builder, Templates, Personal pages
- **Landing Page** - Home, About, Discover

### 🎯 **How to Theme Your Page:**

#### **Example 1: Simple Page**
```tsx
export default function MyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div style={{ backgroundColor: 'var(--theme-card)' }} className="p-6 rounded-lg">
        <h1 style={{ color: 'var(--theme-text)' }}>My Page</h1>
        <p style={{ color: 'var(--theme-text-secondary)' }}>Content here</p>
      </div>
    </div>
  )
}
```

#### **Example 2: Using the Hook**
```tsx
"use client"

import { useTheme } from '@/lib/theme-context'

export default function MyPage() {
  const { theme } = useTheme()
  
  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh' }}>
      <div style={{ 
        backgroundColor: theme.card,
        borderColor: theme.border,
        color: theme.text
      }}>
        Content
      </div>
    </div>
  )
}
```

---

## 🎭 Accessing Theme Switcher

Users can change themes from:

1. **Header Dropdown** (when logged in)
   - Click on user avatar
   - See "Theme" section in dropdown
   - Select theme and toggle dark mode

2. **Programmatically** (in code)
   ```tsx
   const { setTheme, toggleDarkMode } = useTheme()
   
   setTheme('ocean')      // Change theme
   toggleDarkMode()       // Toggle dark/light mode
   ```

---

## 💡 Best Practices

### ✅ **DO:**
- Use CSS custom properties for static styling
- Use the `useTheme` hook for dynamic/conditional styling
- Apply theme colors to backgrounds, text, borders, and cards
- Test your components in both light and dark modes

### ❌ **DON'T:**
- Hardcode colors (use theme properties instead)
- Override theme colors with fixed values
- Forget to test in dark mode

---

## 🔄 Theme Persistence

Themes are automatically saved to `localStorage` and persist across:
- Page refreshes
- Browser sessions
- Different tabs (same domain)

---

## 🚀 Quick Start

### **Add Theme to Any Page:**

```tsx
"use client"

import { useTheme } from '@/lib/theme-context'

export default function MyPage() {
  const { theme } = useTheme()
  
  return (
    <div style={{ 
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ 
        backgroundColor: theme.card,
        padding: '2rem',
        borderRadius: '0.5rem',
        border: `1px solid ${theme.border}`
      }}>
        <h1 style={{ color: theme.text }}>My Themed Page</h1>
        <p style={{ color: theme.textSecondary }}>
          This page automatically adapts to the selected theme!
        </p>
        <button style={{ 
          backgroundColor: theme.accent,
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem'
        }}>
          Accent Button
        </button>
      </div>
    </div>
  )
}
```

---

## 📚 Examples in Codebase

Check these files for theme usage examples:

- `components/site-header.tsx` - Header with theme switcher
- `app/dashboard/templates/page.tsx` - Template gallery with themes
- `components/theme-switcher.tsx` - Theme switcher component
- `lib/theme-context.tsx` - Theme definitions and context

---

**The theme system is ready to use on ALL pages! Just use the CSS variables or the `useTheme` hook.** 🎨✨
