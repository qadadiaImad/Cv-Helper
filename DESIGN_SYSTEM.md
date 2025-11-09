# CV Helper Design System Rules

## Project Overview
**Framework**: Next.js 15 with React 19  
**Styling**: Tailwind CSS v4 with custom FlowCV-inspired design tokens  
**UI Components**: shadcn/ui with Radix UI primitives  
**Icons**: Lucide React  

---

## Design Tokens from Figma

### Color Palette
Based on the Figma design "3d-shape-Landing-page", the following colors are extracted:

- **Primary Color**: `#1D1C24` (Dark ink/header color)
- **Body Color**: `#52575C` (Text gray)
- **Inactive Color**: `#A0A4A8` (Muted elements)
- **Neutral**: `#FFFFFF` (White)
- **Accent Purple**: `#8468F5` (Highlighted text/elements)

### Integration with Existing CV Helper Tokens

Map Figma colors to existing FlowCV design system:

```css
/* Figma Design Mapping */
--figma-primary: #1D1C24;        /* Maps to --flowcv-ink */
--figma-body: #52575C;           /* Maps to --flowcv-gray-600 */
--figma-accent: #8468F5;         /* New accent color for 3D elements */
--figma-inactive: #A0A4A8;       /* Maps to --flowcv-gray-530 */
--figma-neutral: #FFFFFF;        /* Standard white */

/* Background Gradient */
--figma-bg-gradient: linear-gradient(180deg, #FFE5E5 0%, #FFF5F5 100%);
```

---

## Component Architecture

### 1. **Layout Structure**
- **Container**: `container-flowcv` (max-width: 1280px, centered)
- **Section**: `section-flowcv` (padding: 5rem 1.5rem)
- **Responsive Grid**: Use Tailwind's grid system

### 2. **Typography System**

```tsx
// Heading Classes (from globals.css)
.heading-xs    // 12px, uppercase, letter-spacing: 0.1em
.heading-xl    // 20px, font-weight: 600
.heading-2xl   // 24px, font-weight: 700
.heading-4xl   // 36px, font-weight: 700
.heading-6xl   // 60px, font-weight: 700, letter-spacing: -0.05em

// Body Text
.text-flowcv-gray-600  // #475569
.text-flowcv-ink       // #2B0B3C
```

### 3. **Button System**

```tsx
// Primary Button
.btn-flowcv-primary {
  background: var(--flowcv-brand-purple);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

// Secondary Button
.btn-flowcv-secondary {
  background: white;
  color: var(--flowcv-brand-purple);
  border: 2px solid var(--flowcv-brand-purple);
}
```

---

## Asset Management

### Images from Figma
All images are hosted on Figma's CDN with 7-day expiration:
```tsx
const imgAsset = "https://www.figma.com/api/mcp/asset/[uuid]";
```

**Best Practice**: Download and store assets locally in `/public/assets/` directory for production use.

### Icon System
- **Library**: Lucide React
- **Usage**: Import specific icons
```tsx
import { ArrowRight, Download, Sparkles } from "lucide-react"
```

---

## Styling Approach

### CSS Methodology
1. **Tailwind Utility Classes**: Primary styling method
2. **CSS Custom Properties**: Design tokens in `globals.css`
3. **Component-Scoped Styles**: Minimal, only when necessary

### Responsive Design
```tsx
// Breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
```

---

## Figma Design Integration Patterns

### 1. **3D Shape Elements**
The Figma design features decorative 3D shapes with:
- Rounded rectangles with rotation
- Opacity variations (80%)
- Mix-blend modes (multiply, overlay, screen)
- Gradient backgrounds

**Implementation Strategy**:
```tsx
// Use absolute positioning with transforms
<div className="absolute rotate-[145deg] opacity-80 rounded-[4px]">
  <img src={shapeAsset} alt="" />
</div>
```

### 2. **Strip Patterns**
Decorative background patterns with:
- Multiple overlapping shapes
- Various sizes and rotations
- Positioned absolutely

### 3. **Email Form Component**
```tsx
<div className="rounded-full bg-white shadow-lg">
  <input placeholder="Your email address" />
  <button className="rounded-full bg-purple">Download</button>
</div>
```

### 4. **Social Media Icons**
Circular icons with hover effects:
```tsx
<div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
  <Icon />
</div>
```

---

## Project Structure

```
c:\Test\Cv-Helper\
├── app/
│   ├── page.tsx              # Landing page (main entry)
│   ├── globals.css           # Design tokens & utilities
│   ├── layout.tsx            # Root layout
│   └── dashboard/            # Protected routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── site-header.tsx       # Navigation
│   └── [feature-components]  # Feature-specific
└── public/
    └── assets/               # Static images, icons
```

---

## Conversion Guidelines: Figma → React

### Step 1: Extract Layout Structure
- Identify main sections (hero, features, CTA)
- Map Figma frames to React components

### Step 2: Convert Styles
```tsx
// Figma: absolute positioning with inset
inset-[38.8%_55.93%_46.6%_6.2%]

// Convert to Tailwind
className="absolute top-[38.8%] right-[55.93%] bottom-[46.6%] left-[6.2%]"
```

### Step 3: Handle Images
- Download from Figma CDN
- Store in `/public/assets/landing/`
- Use Next.js `<Image>` component for optimization

### Step 4: Adapt Typography
```tsx
// Figma: font-['Mont:Bold',sans-serif]
// CV Helper: Use existing heading classes

<h1 className="heading-6xl">Your Heading</h1>
```

### Step 5: Color Mapping
```tsx
// Figma: text-[#8468f5]
// CV Helper: Create new utility or use inline

<span className="text-[#8468f5]">highlighted text</span>
```

---

## Animation & Interactions

### Floating Animations
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

### Hover Effects
```tsx
className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
```

---

## Best Practices

1. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
2. **Accessibility**: Include alt text, ARIA labels, keyboard navigation
3. **Performance**: 
   - Lazy load images below fold
   - Use Next.js Image optimization
   - Minimize CSS bundle size
4. **Responsive**: Mobile-first approach
5. **Consistency**: Use existing FlowCV design tokens before creating new ones

---

## Figma Design Adaptation Checklist

- [ ] Extract all color variables
- [ ] Download and optimize images
- [ ] Convert absolute positioning to Tailwind utilities
- [ ] Map fonts to existing typography system
- [ ] Implement responsive breakpoints
- [ ] Add hover/focus states
- [ ] Test accessibility (WCAG AA)
- [ ] Optimize for performance (Lighthouse score > 90)

---

## Notes

- **Figma Assets Expiration**: 7 days - download immediately
- **3D Shape Theme**: Maintain playful, modern aesthetic while keeping CV Helper's professional tone
- **Brand Consistency**: Purple accent (#8468F5) complements existing FlowCV purple (#3626A7)
- **Inline Editing**: Remember user preference for inline CV editing (from memory)
