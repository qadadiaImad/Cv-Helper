# CV-Helper Project Structure

## 📁 Project File Tree

```
Cv-Helper/
├── 📱 app/
│   ├── api/
│   │   ├── generate-react-pdf/
│   │   │   └── route.ts                    # PDF generation endpoint
│   │   └── template-preview/
│   │       └── [id]/
│   │           └── route.tsx               # Template preview API
│   ├── dashboard/
│   │   ├── builder/
│   │   │   └── page.tsx                    # ⭐ Main CV builder with inline editing
│   │   ├── cvs/
│   │   │   └── page.tsx                    # CV management dashboard
│   │   └── templates/
│   │       └── page.tsx                    # Template selection page
│   ├── preview-clean/
│   │   └── [id]/
│   │       └── page.tsx                    # Clean preview for PDF export
│   └── layout.tsx                          # Root layout
│
├── 🎨 components/
│   ├── builder/
│   │   ├── education-form.tsx              # Education section form
│   │   ├── experience-form.tsx             # Experience section form
│   │   ├── inline-editable-field.tsx       # ⭐ Field-level inline editing
│   │   ├── inline-section-wrapper.tsx      # Section-level editing wrapper
│   │   ├── personal-form.tsx               # Personal info form
│   │   ├── projects-form.tsx               # Projects section form
│   │   └── skills-form.tsx                 # Skills section form
│   ├── ui/
│   │   ├── button.tsx                      # Button component
│   │   ├── card.tsx                        # Card component
│   │   ├── dialog.tsx                      # Dialog/Modal component
│   │   ├── dropdown-menu.tsx               # Dropdown menu
│   │   ├── input.tsx                       # Input component
│   │   ├── label.tsx                       # Label component
│   │   ├── select.tsx                      # Select dropdown
│   │   └── textarea.tsx                    # Textarea component
│   ├── animated-background.tsx             # Animated gradient background
│   ├── cv-preview.tsx                      # CV preview wrapper
│   ├── inline-cv-preview.tsx               # Inline editable CV preview
│   ├── site-header.tsx                     # ⭐ Global navigation (ResuMagic branding)
│   ├── template-gallery.tsx                # Template gallery component
│   └── writing-animation-icon.tsx          # Crafting resume animation icon
│
├── 🎭 templates/
│   └── react/
│       ├── template-1-atlantic-blue.tsx            # Atlantic Blue template
│       ├── template-1-atlantic-blue-editable.tsx   # Section-level editable version
│       ├── template-1-atlantic-blue-field-editable.tsx  # ⭐ Field-level editable version
│       ├── template-2-executive.tsx                # Executive template
│       ├── template-3-mercury.tsx                  # Mercury template
│       ├── template-4-classic.tsx                  # Classic template
│       ├── template-5-harvard.tsx                  # Harvard template
│       ├── template-6-evergreen.tsx                # Evergreen template
│       ├── template-7-youngcurve.tsx               # YoungCurve template
│       ├── index.ts                                # Template exports
│       ├── react-templates.tsx                     # Template registry
│       ├── sample-data-universal.ts                # Sample CV data
│       ├── universal-schema.ts                     # Template schema
│       └── universal-templates.tsx                 # Universal template wrapper
│
├── 🔧 lib/
│   ├── auth/
│   │   └── schemas.ts                      # Authentication schemas
│   ├── schemas/
│   │   ├── basics.ts                       # Personal info schema
│   │   ├── cv-document.ts                  # CV document schema
│   │   ├── index.ts                        # ⭐ UniversalResumeData schema
│   │   ├── sections.ts                     # Section schemas (experience, education, etc.)
│   │   └── shared.ts                       # Shared types
│   ├── field-updater.ts                    # ⭐ Nested field update utility
│   ├── react-templates.tsx                 # React template registry
│   ├── template-registry.ts                # Template metadata registry
│   ├── template-themes.ts                  # Template theme configurations
│   ├── theme-config.ts                     # Global theme definitions
│   ├── theme-context.tsx                   # ⭐ Theme context provider (Zustand)
│   └── utils.ts                            # Utility functions (cn, etc.)
│
├── 🪝 hooks/
│   ├── use-cv-preview.ts                   # CV preview hook
│   ├── use-cv-store.ts                     # ⭐ CV state management (Zustand)
│   └── use-theme.ts                        # Theme hook
│
├── 🎨 public/
│   └── images/
│       ├── Cv_helper_validation.png        # Logo image
│       ├── Resumer_compeleted.png          # Completed status icon
│       └── not_yet_completed.png           # Incomplete status icon
│
├── 📦 template-playground/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DataEditor.tsx              # Template data editor
│   │   │   └── TemplatePreview.tsx         # Template preview
│   │   ├── templates/
│   │   │   ├── sample-data-universal.ts    # Sample data
│   │   │   ├── universal-registry.ts       # Template registry
│   │   │   ├── universal-schema.ts         # Schema definitions
│   │   │   └── universal-templates.tsx     # Template components
│   │   └── App.tsx                         # Playground app
│   └── package.json                        # Playground dependencies
│
├── 📄 Configuration Files
├── .eslintrc.json                          # ESLint configuration
├── .gitignore                              # Git ignore rules
├── next.config.js                          # Next.js configuration
├── package.json                            # Project dependencies
├── postcss.config.js                       # PostCSS configuration
├── tailwind.config.ts                      # Tailwind CSS configuration
├── tsconfig.json                           # TypeScript configuration
└── README.md                               # Project documentation
```

## 🔑 Key Features by File

### ⭐ Core Inline Editing System
- **`app/dashboard/builder/page.tsx`** - Main builder with field-level inline editing
- **`components/builder/inline-editable-field.tsx`** - Click-to-edit field component
- **`templates/react/template-1-atlantic-blue-field-editable.tsx`** - Template with inline editing
- **`lib/field-updater.ts`** - Nested field update utility

### 🎨 Theming System
- **`lib/theme-context.tsx`** - Global theme provider (Soft Lavender, Ocean Blue, etc.)
- **`components/site-header.tsx`** - ResuMagic branded header with theme-aware styling
- **`lib/template-themes.ts`** - Template-specific theme configurations

### 💾 State Management
- **`hooks/use-cv-store.ts`** - Zustand store for CV data persistence
- **`lib/schemas/index.ts`** - UniversalResumeData interface

### 📝 CV Templates
- 7 professional templates (Atlantic Blue, Executive, Mercury, Classic, Harvard, Evergreen, YoungCurve)
- Each with field-level inline editing capabilities

### 🎯 Forms & Components
- Modular form components for each CV section
- Reusable UI components (Button, Card, Input, etc.)
- Animated backgrounds and icons

## 📊 Architecture Highlights

1. **Inline Editing**: Click any field in the CV to edit it directly
2. **Theme System**: Global themes with persistent storage
3. **Template System**: 7 universal templates with consistent data schema
4. **State Management**: Zustand for CV data, localStorage persistence
5. **Type Safety**: Full TypeScript with comprehensive schemas
6. **Modern Stack**: Next.js 14, React, Tailwind CSS, Zustand

## 🚀 Key User Flows

1. **Create CV**: Dashboard → Templates → Builder
2. **Edit CV**: Builder → Click any field → Edit inline → Auto-save
3. **Add Items**: Click "+ Add Experience/Education/Skills" buttons
4. **Delete Items**: Click delete button on any entry
5. **Export**: Builder → Export PDF (when complete)
