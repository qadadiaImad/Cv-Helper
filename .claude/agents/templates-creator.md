# Component Library Enrichment Prompt for Claude Sonnet

## Context & Objective

You are tasked with enriching the CV component library (`components/cv-templates/`) to achieve **pixel-perfect replication** of existing CV templates from the templates library (`templates/react/`). This is a specialized manufacturing process focused on learning to replicate perfectly from existing templates.

**Current Issue:** The visual builder can load template presets (like Atlantic Blue), but the rendered output has visual differences from the original template due to missing styling details, incomplete component props, and gaps in the atomic design system.

**Goal:** Systematically analyze each original template and enrich atoms, molecules, and organisms so that the visual builder can recreate templates with 100% visual fidelity.

---

## Your Manufacturing Process

### Phase 1: Template Analysis & Gap Identification

For each template in `templates/react/` (starting with `template-1-atlantic-blue.tsx`):

1. **Extract Visual Specifications**
   - Document all inline styles with exact values (colors, spacing, borders, fonts)
   - Identify typography hierarchy (font sizes, weights, line heights, letter spacing)
   - Map layout structure (flexbox, grid, positioning, gaps)
   - Note all visual effects (borders, shadows, backgrounds, opacity)
   - Capture spacing patterns (padding, margins, gaps between elements)

2. **Map to Component Hierarchy**
   - Break down template into: Layout → Organisms → Molecules → Atoms
   - Identify which existing components are used
   - Flag missing components or variants
   - Document styling gaps in existing components

3. **Create Comparison Matrix**
   ```
   Template Element          | Current Component      | Visual Gaps
   --------------------------|------------------------|------------------
   Section Header (CONTACT)  | SectionHeader          | Missing: borderBottom (2px solid rgba(255,255,255,0.3))
                             |                        | Missing: letterSpacing (0.5px)
                             |                        | Missing: paddingBottom (8px)
   Skills List Item          | SkillTag               | Missing: padding (6px 0 6px 12px)
                             |                        | Missing: borderLeft (3px solid #4a90e2)
                             |                        | Missing: backgroundColor (rgba(74, 144, 226, 0.1))
   ```

### Phase 2: Component Enrichment Strategy

For each identified gap:

1. **Determine Component Level**
   - **Atom**: Single-purpose, no children (Text, Badge, Icon, Divider, Avatar)
   - **Molecule**: Combines 2-3 atoms (ContactItem, SectionHeader, SkillTag)
   - **Organism**: Complete sections (PersonalInfoSection, ExperienceSection, SkillsSection)

2. **Add Missing Props**
   - Add style-related props to component interfaces
   - Provide sensible defaults matching the template
   - Ensure props are granular enough for customization
   - Example:
   ```typescript
   export interface SectionHeaderProps {
     title: string
     variant?: 'main' | 'sidebar' | 'minimal'
     // ADD THESE:
     borderWidth?: string        // default: '3px' for main, '2px' for sidebar
     borderColor?: string        // default: '#1a3a52' for main, 'rgba(255,255,255,0.3)' for sidebar
     letterSpacing?: string      // default: '0.5px'
     paddingBottom?: string      // default: '8px'
     marginBottom?: string       // default: '12px'
   }
   ```

3. **Create Missing Variants**
   - If a component needs different visual styles for different contexts, add variant prop
   - Example: `SectionHeader` needs `sidebar` variant with white text and lighter border
   - Document variant presets in component metadata

4. **Update Component Metadata**
   - Add new props to `component-metadata.ts`
   - Set default values that match the template
   - Add control types for visual builder (color, text, number, select)
   - Create variant presets for quick selection

### Phase 3: Systematic Enrichment Workflow

**For each template (start with Atlantic Blue):**

#### Step 1: Sidebar Components Analysis

Compare original template sidebar with current components:

**Original Template Sidebar Structure:**
```tsx
<aside style={{ width: '280px', backgroundColor: '#1a3a52', padding: '40px 30px', gap: '30px' }}>
  {/* Photo with specific border and sizing */}
  {/* Name & Title with exact typography */}
  {/* Contact section with header styling */}
  {/* Skills with bordered list items */}
  {/* Languages with proficiency bars */}
  {/* Certifications with detailed layout */}
</aside>
```

**Current Components:**
- `PersonalInfoSection` - Check if it matches photo border, name typography
- `SkillsSection` - Check if `sidebar-bordered` variant matches exactly
- Missing: `LanguagesSection` organism
- Missing: `CertificationsSection` organism (or enhance existing)

**Action Items:**
1. Enhance `PersonalInfoSection`:
   - Add `photoBorder` prop: `'4px solid rgba(255,255,255,0.1)'`
   - Add `nameSize` prop: `'24px'`
   - Add `titleSize` prop: `'14px'`
   - Add `titleOpacity` prop: `0.9`
   - Add `titleWeight` prop: `300`

2. Enhance `SectionHeader` molecule:
   - Add `borderBottom` style for sidebar variant
   - Add `letterSpacing: '0.5px'`
   - Add `paddingBottom: '8px'`

3. Enhance `SkillsSection`:
   - Verify `sidebar-bordered` variant matches:
     - `padding: '6px 0 6px 12px'`
     - `borderLeft: '3px solid #4a90e2'`
     - `backgroundColor: 'rgba(74, 144, 226, 0.1)'`

4. Create `LanguagesSection` organism:
   - Proficiency bar visualization
   - Sidebar-friendly compact layout

5. Create/Enhance `CertificationsSection` organism:
   - Compact sidebar layout
   - Border between items
   - Small font sizes (11px, 10px, 9px)

#### Step 2: Main Content Components Analysis

Compare original template main content with current components:

**Original Template Main Structure:**
```tsx
<main style={{ flex: 1, backgroundColor: '#ffffff', padding: '40px 50px' }}>
  {/* Summary section */}
  {/* Experience with specific header styling */}
  {/* Projects with technology badges */}
  {/* Education with honors and coursework */}
  {/* Awards, Volunteer, Interests, References */}
</main>
```

**Action Items:**
1. Enhance `ExperienceSection`:
   - Add technology badges display
   - Add description field support (italic, smaller font)
   - Verify header styling: `borderBottom: '3px solid #1a3a52'`
   - Add date positioning (right-aligned, smaller font)

2. Enhance `EducationSection`:
   - Add GPA display
   - Add honors array support
   - Add coursework array support
   - Add location display

3. Create missing organisms:
   - `SummarySection` (if not exists)
   - `ProjectsSection` with highlights and tech badges
   - `AwardsSection`
   - `VolunteerSection`
   - `InterestsSection`
   - `ReferencesSection`

#### Step 3: Typography & Spacing Atoms

Create or enhance typography atoms to match template exactly:

**Typography Scale from Atlantic Blue:**
```typescript
// Headers
h1: { fontSize: '24px', fontWeight: 'bold', lineHeight: '1.2' }
h2: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' }
h3: { fontSize: '16px', fontWeight: 'bold' } // Experience position
h3_alt: { fontSize: '15px', fontWeight: 'bold' } // Education degree
h3_small: { fontSize: '14px', fontWeight: 'bold' } // Projects
h3_tiny: { fontSize: '13px', fontWeight: '600' } // Awards

// Body text
body_large: { fontSize: '13px', lineHeight: '1.7' }
body_medium: { fontSize: '12px', lineHeight: '1.7' }
body_small: { fontSize: '11px', lineHeight: '1.6' }
body_tiny: { fontSize: '10px' }

// Special
contact_text: { fontSize: '12px', lineHeight: '1.8' }
```

**Action:** Enhance `Text` atom with these size presets

#### Step 4: Validation & Testing

After enrichment:

1. **Load Template Preset in Visual Builder**
   - Load Atlantic Blue preset
   - Compare side-by-side with original template
   - Take screenshots and measure pixel differences

2. **Check Each Section**
   - Verify spacing matches (use browser dev tools)
   - Verify colors match exactly (use color picker)
   - Verify typography matches (font size, weight, spacing)
   - Verify borders and backgrounds

3. **Export Code Comparison**
   - Export code from visual builder
   - Compare with original template
   - Ensure generated code produces identical output

4. **Document Remaining Gaps**
   - Create issue list for any remaining differences
   - Prioritize by visual impact

---

## Specific Instructions for Atlantic Blue Template

### Critical Visual Details to Match

**Sidebar:**
- Width: `280px` (fixed)
- Background: `#1a3a52` (exact color)
- Padding: `40px 30px`
- Gap between sections: `30px`
- Photo border: `4px solid rgba(255,255,255,0.1)` (or 0.3 if border effect enabled)
- Section headers: 
  - Font: `14px bold`
  - Border bottom: `2px solid rgba(255,255,255,0.3)`
  - Padding bottom: `8px`
  - Letter spacing: `0.5px`
  - Margin bottom: `12px`

**Main Content:**
- Background: `#ffffff`
- Padding: `40px 50px`
- Section headers:
  - Font: `18px bold`
  - Color: `#1a3a52`
  - Border bottom: `3px solid #1a3a52`
  - Padding bottom: `8px`
  - Letter spacing: `0.5px`
  - Margin bottom: `15px`

**Experience Items:**
- Position title: `16px bold #1a3a52`
- Company name: `13px weight:600 #4a90e2`
- Date: `11px #666` (right-aligned)
- Description: `12px #555 italic`
- Achievements: `12px #444 line-height:1.7`
- Tech badges: `10px padding:3px 8px background:#e8f4ff color:#1a3a52 border-radius:3px`
- Bottom border: `1px solid #e0e0e0` (between items)
- Margin bottom: `25px`
- Padding bottom: `25px`

**Skills List (Sidebar):**
- Each item:
  - Padding: `6px 0 6px 12px`
  - Border left: `3px solid #4a90e2`
  - Background: `rgba(74, 144, 226, 0.1)`
  - Gap between items: `6px`

### Missing Components to Create

1. **LanguagesSection** organism
2. **ProjectsSection** organism (with tech badges and links)
3. **AwardsSection** organism
4. **VolunteerSection** organism
5. **InterestsSection** organism
6. **ReferencesSection** organism
7. **SummarySection** organism (if not exists)

### Components to Enhance

1. **SectionHeader** molecule - Add sidebar variant styling
2. **Text** atom - Add all typography presets from template
3. **Badge** atom - Add tech badge variant
4. **PersonalInfoSection** - Add photo border customization
5. **ExperienceSection** - Add technology badges, description field
6. **EducationSection** - Add GPA, honors, coursework fields
7. **SkillsSection** - Verify sidebar-bordered variant matches exactly

---

## Deliverables

For each template you analyze:

1. **Gap Analysis Document** (`TEMPLATE_NAME_gaps.md`)
   - Visual comparison table
   - List of missing components
   - List of components needing enhancement
   - Exact style specifications

2. **Enhanced Components**
   - Updated component files with new props
   - Updated component metadata with defaults
   - New component files for missing organisms

3. **Template Preset**
   - Updated preset in `template-presets.ts`
   - With all correct prop values

4. **Validation Report**
   - Side-by-side screenshots
   - Pixel difference measurements
   - Remaining gaps (if any)

---

## Success Criteria

A template is **perfectly replicated** when:

1. ✅ Visual builder loads the template preset
2. ✅ All sections render with correct spacing
3. ✅ All colors match exactly (use color picker to verify)
4. ✅ All typography matches (size, weight, spacing, line-height)
5. ✅ All borders and backgrounds match
6. ✅ Exported code produces visually identical output
7. ✅ Side-by-side comparison shows <5px differences (accounting for browser rendering)

---

## Workflow Summary

```
1. SELECT TEMPLATE (start with atlantic-blue.tsx)
   ↓
2. ANALYZE & DOCUMENT
   - Extract all visual specs
   - Create gap analysis
   ↓
3. ENRICH COMPONENTS
   - Add missing props to existing components
   - Create missing components
   - Update component metadata
   ↓
4. UPDATE PRESET
   - Set correct prop values in template-presets.ts
   ↓
5. VALIDATE
   - Load in visual builder
   - Compare with original
   - Measure differences
   ↓
6. ITERATE until perfect match
   ↓
7. MOVE TO NEXT TEMPLATE
```

---

## Important Notes

- **Ignore field-editable versions** - Focus only on the base template files (e.g., `template-1-atlantic-blue.tsx`, not `template-1-atlantic-blue-field-editable.tsx`)
- **Exact values matter** - Don't approximate. Use exact pixel values, exact colors, exact spacing
- **Component reusability** - When adding props, think about reusability across templates
- **Metadata is critical** - Always update `component-metadata.ts` with new props and defaults
- **Test in visual builder** - The ultimate test is loading the preset and comparing visually

---

## Starting Point

Begin with **Atlantic Blue** template:
- File: `templates/react/template-1-atlantic-blue.tsx`
- Current preset: `src/lib/template-presets.ts` → `ATLANTIC_BLUE_PRESET`
- Focus areas: Sidebar section headers, skills list styling, experience section layout

**First task:** Create a detailed gap analysis document comparing the original Atlantic Blue template with the current preset output in the visual builder.
