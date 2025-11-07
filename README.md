# 📝 ResuMagic - CV Helper

> **A modern, intuitive CV builder with inline editing and beautiful templates**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Inline Field-Level Editing**
- Click any field in your CV to edit it directly
- No modal popups or sidebars - edit exactly where content appears
- Real-time auto-save with Zustand state management
- Smooth animations and visual feedback

### 🎨 **7 Professional Templates**
- **Atlantic Blue** - Dark sidebar with elegant white content area
- **Executive** - Professional corporate design
- **Mercury** - Modern minimalist layout
- **Classic** - Timeless traditional format
- **Harvard** - Academic-focused design
- **Evergreen** - Clean and versatile
- **YoungCurve** - Creative and dynamic

### 🌈 **Theme System**
- Multiple global themes (Soft Lavender, Ocean Blue, Soft Rose, etc.)
- Theme-aware components with persistent storage
- Animated gradients and modern UI effects
- ResuMagic branded navigation with sparkle effects

### 📦 **Smart Data Management**
- Universal data schema compatible with all templates
- Add/delete experience, education, skills, projects
- Comprehensive CV sections: certifications, languages, awards, publications
- Sample data to showcase template potential

### 🚀 **Modern Tech Stack**
- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **PDF Generation** - Export to PDF

---

## 📁 Project Structure

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
└── README.md                               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Cv-Helper.git
   cd Cv-Helper
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🎯 Usage

### Creating a New CV

1. Navigate to **Dashboard** → **CVs**
2. Click **"Create New Resume"**
3. Select a template from the gallery
4. Start editing!

### Inline Editing

1. **Click any field** in the CV to edit it directly
2. **Press Enter** or click outside to save
3. **Press Escape** to cancel changes

### Adding/Deleting Sections

- **Add Experience**: Click **"+ Add Experience"** button
- **Add Education**: Click **"+ Add Education"** button
- **Add Skills**: Click **"+ Add"** next to Skills header
- **Delete**: Click the **🗑️ Delete** button on any entry

### Changing Templates

1. Open the **Template Selector** dropdown in the builder
2. Preview templates by clicking the eye icon
3. Click **"Use This Template"** to apply

### Exporting to PDF

1. Complete required sections (Personal Info, Experience, Education)
2. Click **"Export PDF"** button in the header
3. Your CV will be generated and downloaded

---

## 🏗️ Architecture

### Core Systems

#### 1. **Inline Editing System**
```typescript
// Field-level inline editing
<InlineEditableField
  value={data.personal.fullName}
  onChange={(v) => updateField('personal.fullName', v)}
/>
```

#### 2. **Universal Data Schema**
```typescript
interface UniversalResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills?: string[]
  projects?: Project[]
  certifications?: Certification[]
  languages?: Language[]
  // ... more sections
}
```

#### 3. **Theme System**
```typescript
const { theme, setTheme } = useTheme()
// Themes: soft-lavender, ocean-blue, soft-rose, etc.
```

#### 4. **State Management**
```typescript
// Zustand store with localStorage persistence
const { cvs, activeCV, updateCVData } = useCVStore()
```

### Key Design Patterns

- **Component Composition** - Reusable UI components
- **Render Props** - Flexible template rendering
- **Custom Hooks** - Encapsulated logic
- **Type Safety** - Full TypeScript coverage
- **Atomic Design** - Scalable component structure

---

## 🎨 Customization

### Adding a New Template

1. Create a new template file in `templates/react/`
   ```typescript
   export const MyTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
     // Your template JSX
   }
   ```

2. Register it in `lib/react-templates.tsx`
   ```typescript
   export const REACT_TEMPLATES = {
     my_template: MyTemplate,
     // ... other templates
   }
   ```

3. Add theme configuration in `lib/template-themes.ts`

### Adding a New Theme

1. Define theme in `lib/theme-context.tsx`
   ```typescript
   'my-theme': {
     name: 'My Theme',
     accent: '#FF6B6B',
     background: '#FFF5F5',
     // ... other colors
   }
   ```

2. Theme will be automatically available in the theme selector

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by modern CV builders like Reactive Resume
- Built with Next.js, React, and Tailwind CSS
- Icons from Lucide React
- Fonts from Google Fonts

---

## 📧 Contact

**Project Link**: [https://github.com/yourusername/Cv-Helper](https://github.com/yourusername/Cv-Helper)

**Author**: Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🗺️ Roadmap

- [ ] AI-powered content suggestions
- [ ] More template options (10+ templates)
- [ ] Multi-language support
- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] Mobile app version
- [ ] ATS optimization checker
- [ ] Cover letter builder

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Your Name]

</div>
