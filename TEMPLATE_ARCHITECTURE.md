# 🏗️ Architecture Complète des Templates

**Comment les templates fonctionnent de A à Z**

---

## 📂 Structure des Fichiers

```
cv-helper/
├── lib/
│   ├── react-templates.tsx        ← 1. COMPOSANTS React des templates
│   └── template-registry.ts       ← 2. MÉTADONNÉES des templates
│
├── app/
│   ├── preview/
│   │   ├── layout.tsx             ← 3. Layout VIDE (pas de header)
│   │   └── [id]/
│   │       └── page.tsx           ← 4. PAGE de preview
│   │
│   └── dashboard/
│       └── templates/
│           └── page.tsx           ← 5. GALERIE des templates
│
└── components/
    └── template-gallery.tsx        ← 6. COMPOSANT galerie
```

---

## 1️⃣ COMPOSANTS React (`lib/react-templates.tsx`)

### **C'est quoi?**
Les templates React purs - le code qui rend le CV.

### **Structure:**

```tsx
// Type des données
type ResumeData = {
  name: string
  email: string
  phone: string
  links: { label: string; url: string }[]
  education: { school: string; degree: string; year: string }[]
  experience: { company: string; role: string; period: string; details: string[] }[]
  projects: { title: string; description: string; link?: string }[]
  skills: string[]
}

// Props des composants
interface Props {
  data: ResumeData
}

// TEMPLATE 1: Classic Minimal
export const ClassicMinimal: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'serif',
    // ... styles inline pour PDF
  }}>
    <header>
      <h1>{data.name}</h1>
      <p>{data.email} | {data.phone}</p>
    </header>
    <main>
      {/* Render experience, education, skills, etc. */}
    </main>
  </div>
)

// TEMPLATE 2: Modern Blue
export const ModernBlue: React.FC<Props> = ({ data }) => (
  <div style={{
    backgroundColor: '#f9fafb',
    // ... styles différents
  }}>
    <header style={{ backgroundColor: '#1d4ed8', color: '#fff' }}>
      <h1>{data.name}</h1>
    </header>
    {/* Layout différent */}
  </div>
)

// ... 11 autres templates

// EXPORT REGISTRY
export const REACT_TEMPLATES = {
  classic_minimal: ClassicMinimal,      // ← Clé = ID
  modern_blue: ModernBlue,
  creative_gradient: CreativeGradient,
  elegant_black: ElegantBlack,
  compact_cards: CompactCards,
  timeline_modern: TimelineModern,
  corporate_clean: CorporateClean,
  lofi_minimal: LofiMinimal,
  color_blocks: ColorBlocks,
  european_standard: EuropeanStandard,
  responsive_professional: ResponsiveProfessional,
  simple_elegant: SimpleElegant,
  rwd_modern: RWDModern,
}

export type TemplateId = keyof typeof REACT_TEMPLATES
// TemplateId = 'classic_minimal' | 'modern_blue' | ...
```

### **Caractéristiques:**

✅ **Styles inline** - Pour PDF export  
✅ **Props typées** - Type safety  
✅ **Pure React** - Pas de hooks, pas d'état  
✅ **Map sur data** - Render dynamique  

---

## 2️⃣ MÉTADONNÉES (`lib/template-registry.ts`)

### **C'est quoi?**
Les informations d'affichage, catégories, tags, etc.

### **Structure:**

```tsx
export interface TemplateMetadata {
  id: string                    // ← Même ID que REACT_TEMPLATES
  name: string                  // Nom d'affichage
  description: string           // Description courte
  category: TemplateCategory    // minimal | modern | creative | classic | executive
  tags: string[]               // Pour recherche
  author: string               // Auteur
  license: string              // MIT, etc.
  type: 'react' | 'html' | 'latex'
  hidden: boolean              // Cacher de la galerie?
  thumbnailPath: string        // Chemin de l'image
  requiredFields: string[]     // Champs requis
  fieldMap: TemplateFieldMap   // Mapping des champs
  features: string[]           // Features du template
  isNew?: boolean              // Badge "New"
  popularity?: number          // Score de tri
}

// EXEMPLE COMPLET
export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  {
    id: 'classic_minimal',              // ← MÊME ID que REACT_TEMPLATES
    name: 'Classic Minimal',
    description: 'Clean professional layout with traditional serif typography',
    category: 'minimal',
    tags: ['minimal', 'professional', 'traditional', 'serif', 'ats-friendly'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/classic_minimal.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Serif typography', 'Two-column layout', 'ATS-friendly', 'Print optimized'],
    popularity: 95,
  },
  {
    id: 'modern_blue',                  // ← MÊME ID que REACT_TEMPLATES
    name: 'Modern Blue',
    description: 'Contemporary design with blue accent colors and bold header',
    category: 'modern',
    tags: ['modern', 'blue', 'corporate', 'bold', 'header'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/modern_blue.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'projects'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      custom: ['title'],
    },
    features: ['Blue header', 'Modern sans-serif', 'Project showcase', 'Bold design'],
    popularity: 92,
  },
  // ... 11 autres
]
```

### **Helpers:**

```tsx
// Récupérer UN template par ID
export function getTemplateById(id: string): TemplateMetadata | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id)
}

// Récupérer templates visibles (hidden: false)
export function getVisibleTemplates(): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter(t => !t.hidden)
}

// Filtrer par catégorie
export function getTemplatesByCategory(category: TemplateCategory): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter(t => t.category === category && !t.hidden)
}

// Recherche
export function searchTemplates(query: string): TemplateMetadata[] {
  const lowerQuery = query.toLowerCase()
  return TEMPLATE_REGISTRY.filter(t => 
    !t.hidden &&
    (t.name.toLowerCase().includes(lowerQuery) ||
     t.description.toLowerCase().includes(lowerQuery) ||
     t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  )
}
```

---

## 3️⃣ LAYOUT PREVIEW (`app/preview/layout.tsx`)

### **Rôle:**
Court-circuiter le layout global (pas de header/nav)

```tsx
import type { ReactNode } from 'react'

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}  {/* Juste le contenu, pas de SiteHeader! */}
      </body>
    </html>
  )
}
```

### **Pourquoi?**

```
Sans ce layout:
GET /preview/modern_blue
  ↓
  Utilise app/layout.tsx (global)
    ↓
    Rend <SiteHeader /> + <Navigation /> + {children}
      ↓
      ❌ Header visible dans preview!

Avec ce layout:
GET /preview/modern_blue
  ↓
  Utilise app/preview/layout.tsx (local)
    ↓
    Rend juste {children}
      ↓
      ✅ Pas de header!
```

---

## 4️⃣ PAGE PREVIEW (`app/preview/[id]/page.tsx`)

### **Rôle:**
Charger et afficher un template spécifique

```tsx
export default async function TemplatePreviewPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await params (Next.js 15)
  const { id } = await params
  
  // 2. Récupérer métadonnées
  const template = getTemplateById(id)
  
  if (!template || template.hidden) {
    notFound()  // 404
  }

  // 3. Importer le composant React
  const { REACT_TEMPLATES } = await import('@/lib/react-templates')
  const TemplateComponent = REACT_TEMPLATES[template.id as keyof typeof REACT_TEMPLATES]
  
  if (!TemplateComponent) {
    return <div>Template not found: {template.id}</div>
  }

  // 4. Render avec données d'exemple
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            width: 1240px;
            min-height: 1754px;
            font-family: system-ui;
            background: white;
          }
          #preview-container {
            width: 1240px;
            min-height: 1754px;
          }
        `
      }} />
      
      <div id="preview-container">
        <TemplateComponent data={SAMPLE_DATA} />
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('load', function() {
            setTimeout(function() {
              window.previewReady = true;
            }, 500);
          });
        `
      }} />
    </>
  )
}
```

### **Données d'exemple (SAMPLE_DATA):**

```tsx
const SAMPLE_DATA: ResumeData = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  links: [
    { label: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
    { label: 'GitHub', url: 'github.com/johndoe' },
    { label: 'Portfolio', url: 'johndoe.com' },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      year: '2015 - 2019',
    },
  ],
  experience: [
    {
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      period: '2020 - Present',
      details: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored team of 5 junior developers',
        'Improved system performance by 40%',
      ],
    },
    {
      company: 'Startup Inc',
      role: 'Full Stack Developer',
      period: '2019 - 2020',
      details: [
        'Built scalable web applications using React and Node.js',
        'Reduced load time by 50% through optimization',
      ],
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Built a scalable solution with React, Node.js, and PostgreSQL',
      link: 'github.com/johndoe/ecommerce',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative tool with real-time updates',
      link: 'github.com/johndoe/taskmanager',
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Git',
    'Agile/Scrum',
  ],
}
```

---

## 5️⃣ GALERIE (`app/dashboard/templates/page.tsx`)

### **Rôle:**
Afficher tous les templates disponibles

```tsx
export default function TemplateLibraryPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64">
        {/* Sidebar navigation */}
      </aside>
      
      <main className="flex-1">
        <TemplateGallery />  {/* ← Le composant galerie */}
      </main>
    </div>
  )
}
```

---

## 6️⃣ COMPOSANT GALERIE (`components/template-gallery.tsx`)

### **Rôle:**
UI de la galerie avec filtres, recherche, et cartes

```tsx
export function TemplateGallery() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | TemplateCategory>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // 1. Récupérer TOUS les templates visibles
  const allTemplates = getVisibleTemplates()

  // 2. Filtrer par recherche
  const searchedTemplates = searchQuery
    ? searchTemplates(searchQuery)
    : allTemplates

  // 3. Filtrer par catégorie
  const filteredTemplates = selectedCategory === 'all'
    ? searchedTemplates
    : searchedTemplates.filter(t => t.category === selectedCategory)

  // 4. Trier par popularité
  const sortedTemplates = getSortedTemplates(filteredTemplates, 'popularity')

  return (
    <div>
      {/* Barre de recherche */}
      <Input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search templates..."
      />

      {/* Filtre catégorie */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectItem value="all">All Templates</SelectItem>
        <SelectItem value="minimal">Minimal</SelectItem>
        <SelectItem value="modern">Modern</SelectItem>
        {/* ... */}
      </Select>

      {/* Grille de templates */}
      <div className="grid grid-cols-4 gap-6">
        {sortedTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onClick={() => setSelectedTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  )
}
```

### **Card Template:**

```tsx
function TemplateCard({ template, isSelected, onClick }: TemplateCardProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <div onClick={onClick} className="card">
        {/* iFrame Miniature */}
        <div className="aspect-[8.5/11] bg-white">
          <iframe
            src={`/preview/${template.id}`}
            style={{
              transform: 'scale(0.25)',
              transformOrigin: 'top left',
              width: '400%',
              height: '400%',
            }}
            loading="lazy"
            className="pointer-events-none"
          />
        </div>

        {/* Hover Overlay */}
        <div className="overlay">
          <Button onClick={(e) => {
            e.stopPropagation()
            setShowPreview(true)
          }}>
            👁️ Preview
          </Button>
          <Button>Use this template</Button>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3>{template.name}</h3>
          <p>{template.description}</p>
          <Badge>{template.category}</Badge>
          {template.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>
      </div>

      {/* Modal Preview */}
      {showPreview && (
        <div className="modal">
          <div className="modal-content">
            <h2>{template.name}</h2>
            <iframe
              src={`/preview/${template.id}`}
              style={{
                transform: 'scale(0.5)',
                width: '200%',
                height: '200%',
              }}
              className="pointer-events-none"
            />
            <Button onClick={() => setShowPreview(false)}>Close</Button>
          </div>
        </div>
      )}
    </>
  )
}
```

---

## 🔄 FLUX COMPLET

### **Scénario: User visite /dashboard/templates**

```
1. User → http://localhost:3000/dashboard/templates

2. Next.js charge app/dashboard/templates/page.tsx
   ↓
   Rend <TemplateGallery />

3. TemplateGallery appelle getVisibleTemplates()
   ↓
   lib/template-registry.ts
   ↓
   Retourne liste de TemplateMetadata[]
   [
     { id: 'classic_minimal', name: 'Classic Minimal', ... },
     { id: 'modern_blue', name: 'Modern Blue', ... },
     ... (13 templates)
   ]

4. Pour chaque template, rend une <TemplateCard>
   ↓
   Card contient une iframe:
   <iframe src="/preview/classic_minimal" />

5. Iframe charge GET /preview/classic_minimal
   ↓
   app/preview/[id]/page.tsx
   ↓
   const { id } = await params  // 'classic_minimal'
   const template = getTemplateById('classic_minimal')
   const { REACT_TEMPLATES } = await import('@/lib/react-templates')
   const TemplateComponent = REACT_TEMPLATES['classic_minimal']
   ↓
   Rend: <ClassicMinimal data={SAMPLE_DATA} />
   ↓
   Template affiché dans iframe!

6. User voit 13 miniatures de templates
```

### **Scénario: User clique "Preview"**

```
1. User clique bouton "👁️ Preview" sur Modern Blue
   ↓
   setShowPreview(true)

2. Modal s'ouvre avec:
   <iframe src="/preview/modern_blue" />
   ↓
   Plus grand (scale 0.5 au lieu de 0.25)
   ↓
   Template visible en détail!

3. User clique "Use Template"
   ↓
   setSelectedTemplate('modern_blue')
   ↓
   Router push vers builder avec ce template
```

---

## 🎯 Points Clés

### **1. Séparation des Responsabilités**

```
react-templates.tsx    → CODE React (comment rendre)
template-registry.ts   → MÉTADONNÉES (quoi afficher)
preview/[id]/page.tsx  → SERVEUR (charger et rendre)
template-gallery.tsx   → UI (afficher et filtrer)
```

### **2. Mapping ID ↔ Composant**

```tsx
// TOUJOURS le même ID!
REACT_TEMPLATES = {
  classic_minimal: ClassicMinimal,  // ← ID
}

TEMPLATE_REGISTRY = [
  { id: 'classic_minimal', ... },   // ← MÊME ID
]

// Récupération:
const template = getTemplateById('classic_minimal')
const Component = REACT_TEMPLATES['classic_minimal']
```

### **3. iFrames pour Preview**

```tsx
// Miniature dans galerie
<iframe 
  src="/preview/classic_minimal"
  style={{ transform: 'scale(0.25)' }}
/>

// Grande preview dans modal
<iframe 
  src="/preview/classic_minimal"
  style={{ transform: 'scale(0.5)' }}
/>

// Même source, différente taille!
```

### **4. Layout Isolation**

```
app/layout.tsx (GLOBAL)
└─ <SiteHeader />
└─ <Navigation />
└─ {children}

app/preview/layout.tsx (LOCAL pour /preview/*)
└─ {children}  (PAS de header!)
```

---

## 🎨 Ajouter un Nouveau Template

### **Étape 1: Créer le Composant**

```tsx
// lib/react-templates.tsx

export const MyAwesomeTemplate: React.FC<Props> = ({ data }) => (
  <div style={{ backgroundColor: '#f0f0f0' }}>
    <h1>{data.name}</h1>
    <p>{data.email}</p>
    {/* Votre design */}
  </div>
)
```

### **Étape 2: Ajouter à l'Export**

```tsx
// lib/react-templates.tsx

export const REACT_TEMPLATES = {
  classic_minimal: ClassicMinimal,
  modern_blue: ModernBlue,
  my_awesome_template: MyAwesomeTemplate,  // ← Ajout
}
```

### **Étape 3: Ajouter les Métadonnées**

```tsx
// lib/template-registry.ts

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // ... existing templates
  {
    id: 'my_awesome_template',  // ← MÊME ID
    name: 'My Awesome Template',
    description: 'An awesome new template',
    category: 'modern',
    tags: ['awesome', 'new', 'modern'],
    author: 'Vous',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/my_awesome_template.webp',
    requiredFields: ['name', 'email', 'phone'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
    },
    features: ['Awesome design', 'Modern look'],
    popularity: 100,
    isNew: true,  // Badge "New"!
  },
]
```

### **Étape 4: C'est tout!**

```
✅ Visible dans /dashboard/templates
✅ Prévisualisable dans /preview/my_awesome_template
✅ Utilisable dans le builder
```

---

## 🎉 Résumé

**Templates = 3 Fichiers Principaux:**

1. `lib/react-templates.tsx` - **Composants** React
2. `lib/template-registry.ts` - **Métadonnées** & helpers
3. `app/preview/[id]/page.tsx` - **Server** render

**Frontend comprend via:**
- `getVisibleTemplates()` - Liste tous
- `getTemplateById(id)` - Récupère un
- `REACT_TEMPLATES[id]` - Composant React
- `<iframe src="/preview/{id}"/>` - Affiche

**Simple, non?** 🚀
