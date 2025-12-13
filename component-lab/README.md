# CV Component Lab

An interactive development environment for the CV template component library.

## Features

### 1. Component Explorer
- Browse all atoms, molecules, organisms, and layouts
- Live preview with interactive prop controls
- Real-time code snippet generation
- Variant presets for quick exploration

### 2. Visual Builder
- Drag-and-drop component composition
- Nested component support
- Live property editing
- Undo/redo functionality
- Export React/TypeScript code with Monaco editor

### 3. Documentation
- Auto-generated API documentation
- Props tables with types and defaults
- Variant showcase with live previews
- Best practices and usage examples

## Getting Started

### Installation
```bash
cd component-lab
npm install
```

### Development
```bash
npm run dev
```

The lab will be available at http://localhost:3003

### From Root Directory
```bash
npm run dev:lab
```

## Architecture

### Component Metadata System
All components are registered in `src/lib/component-metadata.ts` with:
- Props definitions with types and controls
- Variant presets
- Usage examples
- Best practices

### Composition Engine
Zustand store (`src/lib/composition-engine.ts`) manages:
- Composition tree state
- Undo/redo history
- Node selection
- LocalStorage persistence

### Code Generator
Generates clean React/TypeScript code from composition trees with:
- Proper imports
- Type-safe props
- Formatted JSX

## Component Categories

### Atoms (7)
Text, Badge, Avatar, Icon, Divider, ProgressBar, Spacer

### Molecules (3)
ContactItem, SectionHeader, SkillTag

### Organisms (8)
PersonalInfoSection, ExperienceSection, EducationSection, SkillsSection, LanguagesSection, ProjectsSection, CertificationsSection, SummarySection

### Layouts (3)
TwoColumnLayout, SingleColumnLayout, SectionedLayout

## Technology Stack

- **Vite** - Fast dev server and build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Zustand** - State management
- **react-dnd** - Drag-and-drop
- **Monaco Editor** - Code editing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Path Aliases

The project uses Vite path aliases to import existing CV components without duplication:

```typescript
import { Text, Badge } from '@cv-components/atoms'
import { ContactItem } from '@cv-components/molecules'
import type { UniversalResumeData } from '@cv-lib/schemas'
```

## Usage

### Component Explorer
1. Select a component from the sidebar
2. Adjust props using the controls panel
3. See live preview in the center
4. Copy the generated code from the bottom panel

### Visual Builder
1. Drag components from the palette to the canvas
2. Drop components inside others to create nesting
3. Select a component to edit its props
4. Click "Export Code" to generate React code

### Documentation
1. Browse components in the sidebar
2. View comprehensive API documentation
3. Explore variants with live previews
4. Read best practices and examples

## Future Enhancements

- [ ] Template save/load functionality
- [ ] Component search
- [ ] Style editor for custom CSS
- [ ] Template gallery with 30+ examples
- [ ] Component testing utilities
- [ ] Responsive preview modes
- [ ] Export to different formats (HTML, PDF)
