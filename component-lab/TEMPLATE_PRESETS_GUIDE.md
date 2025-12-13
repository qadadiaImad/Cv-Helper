# Template Presets Guide

## Overview

The Visual Builder now includes a **Template Presets** system that allows you to:
- Load pre-built CV templates (like Atlantic Blue)
- Modify them with full drag-and-drop capabilities
- Add, delete, and resize components
- Customize all properties and styling

## How to Use Template Presets

### 1. Access Templates

1. Open the **Visual Builder** tab
2. Click the purple **"Templates"** button in the top toolbar
3. A modal will open showing available template presets

### 2. Load Atlantic Blue Template

1. In the Templates modal, you'll see the **Atlantic Blue** template card
2. Click on the template card to load it
3. The template will be loaded to the canvas with:
   - **TwoColumnLayout** with dark blue sidebar (#1a3a52)
   - **PersonalInfoSection** in sidebar (photo, name, contact)
   - **SkillsSection** in sidebar (bordered list style)
   - **ExperienceSection** in main content
   - **EducationSection** in main content

### 3. Modify the Template

Once loaded, you have full control:

#### **Drag & Drop Components**
- Drag new components from the Component Library into sidebar or main zones
- Reorder components by dragging them within their zones
- Move components between sidebar and main areas

#### **Add Components**
- Expand any category (atoms, molecules, organisms, layouts)
- Drag any component into the sidebar or main drop zones
- Components will be added with appropriate default props

#### **Delete Components**
- Click on any component to select it
- Click the **X** button in the component's header bar
- Or use the **Remove** button in the Properties panel

#### **Resize & Adjust Layout**
- Select the TwoColumnLayout
- In the Properties panel, adjust:
  - `sidebarWidth`: Change from `280px` to any value
  - `sidebarPosition`: Switch between `left` and `right`
  - Colors: `sidebarBackground`, `sidebarColor`, `mainBackground`

#### **Customize Components**
- Click any component to select it
- Use the Properties panel on the right to edit:
  - `data`: Edit content (names, dates, descriptions)
  - `variant`: Change visual style
  - `textColor`, `accentColor`: Adjust colors
  - `showPhoto`, `showContact`: Toggle visibility

### 4. Export Your Customized Template

1. Click the **"Export Code"** button in the toolbar
2. Copy the generated React component code
3. The code will reflect all your modifications

## Atlantic Blue Template Structure

```
TwoColumnLayout
├─ Sidebar (dark blue #1a3a52)
│  ├─ PersonalInfoSection
│  │  ├─ Profile Photo (centered, circular)
│  │  ├─ Name & Title (white text)
│  │  └─ Contact Info (email, phone, location, links)
│  └─ SkillsSection
│     └─ Skills List (blue left borders, light backgrounds)
└─ Main Content (white)
   ├─ ExperienceSection
   │  └─ Job entries with achievements
   └─ EducationSection
      └─ Education entries with degrees
```

## Component Defaults for Atlantic Blue

### TwoColumnLayout
- `sidebarWidth`: `280px`
- `sidebarBackground`: `#1a3a52` (dark blue)
- `sidebarColor`: `#ffffff` (white text)
- `mainBackground`: `#ffffff`
- `sidebarPadding`: `40px 30px`
- `mainPadding`: `40px 50px`

### PersonalInfoSection (Sidebar)
- `variant`: `sidebar` (centered layout)
- `textColor`: `#ffffff`
- `showPhoto`: `true`
- `showContact`: `true`

### SkillsSection (Sidebar)
- `variant`: `sidebar-bordered`
- `textColor`: `#ffffff`
- `accentColor`: `#4a90e2` (blue borders)
- `headerVariant`: `sidebar`

### ExperienceSection (Main)
- `variant`: `detailed`
- `textColor`: `#333333`
- `accentColor`: `#1a3a52`

### EducationSection (Main)
- `textColor`: `#333333`
- `accentColor`: `#1a3a52`

## Tips

### Best Practices
- **Start with a template** rather than building from scratch
- **Customize gradually** - change one thing at a time and preview
- **Use the Undo button** if you make a mistake
- **Save your work** using the browser's localStorage (automatic)

### Common Modifications

**Change sidebar width:**
```
Select TwoColumnLayout → Properties → sidebarWidth → "250px" or "300px"
```

**Switch sidebar position:**
```
Select TwoColumnLayout → Properties → sidebarPosition → "right"
```

**Change color scheme:**
```
Select TwoColumnLayout → Properties:
- sidebarBackground → "#2c3e50" (darker)
- sidebarColor → "#ecf0f1" (light gray)
```

**Add more sections:**
```
Drag ProjectsSection to Main Content zone
Drag LanguagesSection to Sidebar zone
```

**Remove a section:**
```
Click section → Click X button in header
```

## Technical Details

### File Locations
- **Template Presets**: `src/lib/template-presets.ts`
- **Template UI**: `src/components/builder/TemplatePresets.tsx`
- **Composition Engine**: `src/lib/composition-engine.ts`
- **Component Metadata**: `src/lib/component-metadata.ts`

### Adding New Templates

To add a new template preset, edit `src/lib/template-presets.ts`:

```typescript
export const MY_TEMPLATE_PRESET: TemplatePreset = {
  id: 'my-template',
  name: 'My Template',
  description: 'Description of my template',
  tags: ['tag1', 'tag2'],
  composition: {
    id: nanoid(),
    componentId: 'layout-component-id',
    props: { /* layout props */ },
    children: [
      // Component nodes with area: 'sidebar' or 'main'
    ],
  },
}

// Add to TEMPLATE_PRESETS array
export const TEMPLATE_PRESETS: TemplatePreset[] = [
  ATLANTIC_BLUE_PRESET,
  MY_TEMPLATE_PRESET, // Add here
]
```

### Component Areas

When creating template presets, specify the `area` property for layout children:
- `area: 'sidebar'` - Component goes in left/right sidebar
- `area: 'main'` - Component goes in main content area
- No `area` - Component is at root level (not in a layout)

## Troubleshooting

**Template doesn't load:**
- Check browser console for errors
- Ensure all component IDs in the preset are valid
- Verify the composition structure matches the schema

**Components don't render:**
- Check that component metadata exists in `component-metadata.ts`
- Verify default props are provided
- Ensure `data` props contain valid sample data

**Drag-drop doesn't work:**
- Make sure you're dropping into the colored drop zones (sidebar/main)
- Check that the layout is selected (orange border)
- Try refreshing the page if HMR gets stuck

**Changes don't appear:**
- Hard refresh the browser (Ctrl+Shift+R or Ctrl+F5)
- Check that the dev server is running
- Clear browser cache if needed

## Summary

The Template Presets system provides a powerful starting point for CV creation. Load the Atlantic Blue template, customize it to your needs, and export production-ready React code. All components are fully editable, draggable, and deletable, giving you complete control over your CV layout.
