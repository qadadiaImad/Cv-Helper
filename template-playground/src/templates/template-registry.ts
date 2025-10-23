/**
 * Template Registry
 * Single source of truth for all templates with field mappings and metadata
 */

export type TemplateCategory = 'minimal' | 'modern' | 'creative' | 'classic' | 'executive'

export interface TemplateFieldMap {
  /** Basic required fields */
  basic?: string[]
  /** Experience-specific fields */
  experience?: string[]
  /** Education-specific fields */
  education?: string[]
  /** Skills-specific fields */
  skills?: string[]
  /** Optional custom fields */
  custom?: string[]
}

export interface TemplateMetadata {
  /** Unique template identifier */
  id: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Category for filtering */
  category: TemplateCategory
  /** Tags for search */
  tags: string[]
  /** Author/source */
  author: string
  /** License type */
  license: string
  /** Template type */
  type: 'react' | 'html' | 'latex'
  /** Hide from gallery (e.g., HTML export templates) */
  hidden: boolean
  /** Preview thumbnail path */
  thumbnailPath: string
  /** Required fields for this template */
  requiredFields: string[]
  /** Field mapping for data transformation */
  fieldMap: TemplateFieldMap
  /** Template features */
  features: string[]
  /** Is this a new template? */
  isNew?: boolean
  /** Popularity score (for sorting) */
  popularity?: number
}

/**
 * Default fields available in all templates
 */
export const DEFAULT_FIELDS = [
  'name',
  'email',
  'phone',
  'links',
  'education',
  'experience',
  'projects',
  'skills',
]

/**
 * Template Registry - All available templates
 */
export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  // ========== REACT TEMPLATES (Visible in Gallery) ==========
  {
    id: 'classic_minimal',
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
    id: 'modern_blue',
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
  {
    id: 'creative_gradient',
    name: 'Creative Gradient',
    description: 'Bold gradient style perfect for creative professionals',
    category: 'creative',
    tags: ['creative', 'gradient', 'colorful', 'bold', 'startup'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/creative_gradient.webp',
    requiredFields: ['name', 'email', 'phone', 'experience'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period'],
      custom: ['summary'],
    },
    features: ['Purple/pink gradient', 'Timeline layout', 'Creative style', 'Eye-catching'],
    popularity: 88,
  },
  {
    id: 'elegant_black',
    name: 'Elegant Black',
    description: 'Sophisticated dark theme with premium monochrome elegance',
    category: 'classic',
    tags: ['dark', 'elegant', 'premium', 'monochrome', 'sophisticated'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/elegant_black.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period'],
      skills: ['skills'],
      custom: ['skillsLevels'],
    },
    features: ['Dark background', 'Premium feel', 'Skill levels', 'Two-column'],
    popularity: 85,
  },
  {
    id: 'compact_cards',
    name: 'Compact Cards',
    description: 'Card-based layout for organized information display',
    category: 'modern',
    tags: ['cards', 'modern', 'organized', 'clean', 'data'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/compact_cards.webp',
    requiredFields: ['name', 'experience', 'projects'],
    fieldMap: {
      basic: ['name'],
      experience: ['company', 'role', 'period'],
      custom: ['projects'],
    },
    features: ['Card sections', 'Grid layout', 'Compact design', 'IT/Data focus'],
    popularity: 80,
  },
  {
    id: 'timeline_modern',
    name: 'Timeline Modern',
    description: 'Visual timeline display with modern aesthetics',
    category: 'creative',
    tags: ['timeline', 'visual', 'modern', 'horizontal', 'design'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/timeline_modern.webp',
    requiredFields: ['name', 'experience'],
    fieldMap: {
      basic: ['name'],
      experience: ['company', 'role', 'start', 'end'],
    },
    features: ['Timeline layout', 'Visual design', 'Modern colors', 'Horizontal flow'],
    popularity: 78,
  },
  {
    id: 'corporate_clean',
    name: 'Corporate Clean',
    description: 'Professional executive style for corporate positions',
    category: 'classic',
    tags: ['corporate', 'executive', 'clean', 'professional', 'finance'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/corporate_clean.webp',
    requiredFields: ['name', 'email', 'phone', 'experience'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period'],
      custom: ['title'],
    },
    features: ['Executive style', 'Clean borders', 'Professional', 'Finance/Banking'],
    popularity: 83,
  },
  {
    id: 'lofi_minimal',
    name: 'Lofi Minimal',
    description: 'Minimalist monospace design for developers',
    category: 'minimal',
    tags: ['minimal', 'developer', 'monospace', 'simple', 'tech'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/lofi_minimal.webp',
    requiredFields: ['name', 'experience', 'skills'],
    fieldMap: {
      basic: ['name'],
      experience: ['company', 'role', 'period'],
      skills: ['skills'],
    },
    features: ['Monospace font', 'Developer-focused', 'Ultra minimal', 'Tech style'],
    popularity: 75,
  },
  {
    id: 'color_blocks',
    name: 'Color Blocks',
    description: 'Bold colored sections for creative professionals',
    category: 'creative',
    tags: ['colorful', 'bold', 'blocks', 'creative', 'vibrant'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/color_blocks.webp',
    requiredFields: ['name', 'skills', 'projects'],
    fieldMap: {
      basic: ['name'],
      skills: ['skills'],
      custom: ['projects', 'themeColor'],
    },
    features: ['Color blocks', 'Bold sections', 'Creative style', 'Vibrant'],
    popularity: 70,
  },
  {
    id: 'european_standard',
    name: 'European Standard',
    description: 'Europass-inspired format for international applications',
    category: 'classic',
    tags: ['europass', 'international', 'standard', 'photo', 'formal'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/european_standard.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period'],
      education: ['school', 'degree', 'year'],
      custom: ['photoUrl', 'address'],
    },
    features: ['Photo support', 'Europass style', 'International', 'Formal layout'],
    popularity: 72,
  },
  {
    id: 'responsive_professional',
    name: 'Responsive Professional',
    description: 'Two-column responsive design with animated elements',
    category: 'modern',
    tags: ['responsive', 'professional', 'two-column', 'animated', 'modern'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/responsive_professional.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['sidebarSkills'],
    },
    features: ['Two-column', 'Responsive', 'Animated background', 'Skill bars'],
    popularity: 87,
    isNew: true,
  },
  {
    id: 'simple_elegant',
    name: 'Simple Elegant',
    description: 'Clean typography with decorative shadow effects',
    category: 'minimal',
    tags: ['elegant', 'simple', 'typography', 'clean', 'shadow'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/simple_elegant.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['summary'],
    },
    features: ['Clean typography', 'Shadow effects', 'Elegant borders', 'Minimal'],
    popularity: 82,
    isNew: true,
  },
  {
    id: 'rwd_modern',
    name: 'RWD Modern',
    description: 'Responsive web design with gradient header and progress bars',
    category: 'modern',
    tags: ['rwd', 'gradient', 'progress', 'modern', 'responsive'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/rwd_modern.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period'],
      skills: ['skills'],
      custom: ['skillsProgress'],
    },
    features: ['Gradient header', 'Progress bars', 'Timeline elements', 'Modern'],
    popularity: 89,
    isNew: true,
  },

  // ========== HTML EXPORT TEMPLATES (Hidden from Gallery) ==========
  {
    id: 'html_classic_minimal',
    name: 'HTML Classic Minimal',
    description: 'HTML export version - Classic minimal',
    category: 'minimal',
    tags: ['html', 'export', 'hidden'],
    author: 'Community',
    license: 'MIT',
    type: 'html',
    hidden: true,
    thumbnailPath: '',
    requiredFields: [],
    fieldMap: {},
    features: ['HTML export', 'Print optimized'],
  },
  {
    id: 'html_modern_blue',
    name: 'HTML Modern Blue',
    description: 'HTML export version - Modern blue',
    category: 'modern',
    tags: ['html', 'export', 'hidden'],
    author: 'Community',
    license: 'MIT',
    type: 'html',
    hidden: true,
    thumbnailPath: '',
    requiredFields: [],
    fieldMap: {},
    features: ['HTML export', 'Print optimized'],
  },

  // ========== LATEX TEMPLATES (Hidden from Gallery) ==========
  {
    id: 'latex_jake_gutierrez',
    name: 'Jake Gutierrez LaTeX',
    description: 'LaTeX export - Modern with FontAwesome icons',
    category: 'modern',
    tags: ['latex', 'export', 'hidden'],
    author: 'Jake Gutierrez',
    license: 'MIT',
    type: 'latex',
    hidden: true,
    thumbnailPath: '',
    requiredFields: [],
    fieldMap: {},
    features: ['LaTeX', 'Professional typesetting'],
  },
  {
    id: 'latex_sb2nov',
    name: 'SB2nov LaTeX',
    description: 'LaTeX export - Classic academic layout',
    category: 'classic',
    tags: ['latex', 'export', 'hidden'],
    author: 'Sourabh Bajaj',
    license: 'MIT',
    type: 'latex',
    hidden: true,
    thumbnailPath: '',
    requiredFields: [],
    fieldMap: {},
    features: ['LaTeX', 'Academic format'],
  },
]

/**
 * Get visible templates (exclude hidden ones)
 */
export function getVisibleTemplates(): TemplateMetadata[] {
  return TEMPLATE_REGISTRY.filter(t => !t.hidden)
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): TemplateMetadata | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id)
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: TemplateCategory): TemplateMetadata[] {
  return getVisibleTemplates().filter(t => t.category === category)
}

/**
 * Search templates by name or tags
 */
export function searchTemplates(query: string): TemplateMetadata[] {
  const lowerQuery = query.toLowerCase()
  return getVisibleTemplates().filter(
    t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get templates sorted by criteria
 */
export function getSortedTemplates(
  sortBy: 'popularity' | 'name' | 'new' = 'popularity'
): TemplateMetadata[] {
  const templates = getVisibleTemplates()
  
  switch (sortBy) {
    case 'popularity':
      return templates.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    case 'name':
      return templates.sort((a, b) => a.name.localeCompare(b.name))
    case 'new':
      return templates.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return (b.popularity || 0) - (a.popularity || 0)
      })
    default:
      return templates
  }
}

/**
 * Validate if resume data has all required fields for a template
 */
export function validateRequiredFields(
  templateId: string,
  resumeData: any
): { valid: boolean; missing: string[] } {
  const template = getTemplateById(templateId)
  
  if (!template) {
    return { valid: false, missing: [] }
  }

  const missing: string[] = []
  
  for (const field of template.requiredFields) {
    const value = resumeData[field]
    
    if (value === undefined || value === null || value === '' || 
        (Array.isArray(value) && value.length === 0)) {
      missing.push(field)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}

/**
 * Get user-friendly field names
 */
export function getFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    links: 'Links / URLs',
    education: 'Education',
    experience: 'Work Experience',
    projects: 'Projects',
    skills: 'Skills',
    title: 'Professional Title',
    summary: 'Professional Summary',
    skillsLevels: 'Skill Levels',
    sidebarSkills: 'Sidebar Skills',
    skillsProgress: 'Skill Progress Bars',
    themeColor: 'Theme Color',
    photoUrl: 'Profile Photo',
    address: 'Address',
  }
  
  return labels[field] || field
}
