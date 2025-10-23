/**
 * UNIVERSAL TEMPLATE REGISTRY
 * Metadata for all universal templates
 */

interface UniversalTemplateMetadata {
  id: string
  name: string
  description: string
  category: 'minimal' | 'modern' | 'creative' | 'classic' | 'executive' | 'academic'
  tags: string[]
  author: string
  features: string[]
  bestFor: string[]
  popularity?: number
}

export const UNIVERSAL_TEMPLATE_REGISTRY: UniversalTemplateMetadata[] = [
  {
    id: 'atlantic_blue',
    name: 'Atlantic Blue',
    description: 'Professional design with dark sidebar and photo',
    category: 'modern',
    tags: ['sidebar', 'photo', 'modern', 'professional', 'blue'],
    author: 'CV-Helper',
    features: [
      'Dark left sidebar with photo',
      'Visual skill indicators',
      'Clean white content area',
      'Sidebar certifications',
    ],
    bestFor: [
      'Creative professionals',
      'Tech workers',
      'Modern industries',
      'Candidates with photo',
    ],
    popularity: 95,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Traditional two-column formal layout with serif typography',
    category: 'executive',
    tags: ['traditional', 'serif', 'two-column', 'formal', 'executive'],
    author: 'CV-Helper',
    features: [
      'Centered header with contact',
      'Two-column layout',
      'Serif typography',
      'Professional formatting',
    ],
    bestFor: [
      'Senior executives',
      'Management positions',
      'Traditional industries',
      'Formal contexts',
    ],
    popularity: 92,
  },
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'Clean centered design with photo and modern aesthetic',
    category: 'modern',
    tags: ['centered', 'photo', 'modern', 'clean', 'minimal'],
    author: 'CV-Helper',
    features: [
      'Centered photo at top',
      'Skills as tags',
      'Clean modern aesthetic',
      'Visual language indicators',
    ],
    bestFor: [
      'Young professionals',
      'Creative roles',
      'Modern companies',
      'Visual portfolios',
    ],
    popularity: 90,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional right-aligned header with timeless design',
    category: 'classic',
    tags: ['traditional', 'serif', 'right-aligned', 'classic', 'professional'],
    author: 'CV-Helper',
    features: [
      'Right-aligned contact info',
      'Traditional serif font',
      'Clean sectioning',
      'ATS-friendly',
    ],
    bestFor: [
      'All industries',
      'Conservative fields',
      'ATS systems',
      'Traditional companies',
    ],
    popularity: 88,
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'Minimal academic design with education-first approach',
    category: 'academic',
    tags: ['academic', 'minimal', 'education-first', 'research', 'simple'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/harvard.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      custom: ['title'],
    },
    features: ['Education listed first', 'Categorized skills', 'Research-friendly', 'Minimal clean design'],
    popularity: 85,
  },
  {
    id: 'evergreen',
    name: 'Evergreen',
    description: 'Two-column layout with dark header and skill progress bars',
    category: 'modern',
    tags: ['modern', 'two-column', 'progress-bars', 'photo', 'professional'],
    author: 'CV-Helper',
    features: ['Dark teal header', 'Skill progress bars', 'Two-column layout', 'Photo integrated'],
    bestFor: [
      'Tech professionals',
      'AEM Developers',
      'Experienced candidates',
      'Skill-heavy roles',
    ],
    popularity: 88,
  },
]

/**
 * Get template metadata by ID
 */
export function getUniversalTemplateById(id: string): UniversalTemplateMetadata | undefined {
  return UNIVERSAL_TEMPLATE_REGISTRY.find(t => t.id === id)
}

/**
 * Get all visible templates
 */
export function getUniversalTemplates(): UniversalTemplateMetadata[] {
  return UNIVERSAL_TEMPLATE_REGISTRY
}

/**
 * Get templates by category
 */
export function getUniversalTemplatesByCategory(
  category: UniversalTemplateMetadata['category']
): UniversalTemplateMetadata[] {
  return UNIVERSAL_TEMPLATE_REGISTRY.filter(t => t.category === category)
}

/**
 * Search templates by query
 */
export function searchUniversalTemplates(query: string): UniversalTemplateMetadata[] {
  const lowerQuery = query.toLowerCase()
  return UNIVERSAL_TEMPLATE_REGISTRY.filter(
    t =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      t.bestFor.some(use => use.toLowerCase().includes(lowerQuery))
  )
}
