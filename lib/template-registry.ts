/**
 * Template Registry
 * Single source of truth for all templates with field mappings and metadata
 */

export type TemplateCategory = 'minimal' | 'modern' | 'creative' | 'classic' | 'executive'
export type TemplateComplexity = 'simple' | 'medium' | 'complex'
export type TemplateLayout = 'single-column' | 'two-column' | 'multi-column'

export interface TemplateCompatibility {
  atsScore: number
  printOptimized: boolean
  mobileResponsive: boolean
  accessibilityScore: number
}

export interface TemplateCustomization {
  colorCustomizable: boolean
  colorVariants: number
  supportsPhoto: boolean
  fontCustomizable: boolean
}

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
  /** Complexity level for user guidance */
  complexity: TemplateComplexity
  /** Layout structure */
  layout: TemplateLayout
  /** Best suited for these roles/industries */
  bestFor: string[]
  /** ATS and compatibility info */
  compatibility: TemplateCompatibility
  /** Customization capabilities */
  customization: TemplateCustomization
  /** Estimated completion time */
  estimatedTime: string
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
  // ========== OLD TEMPLATES REMOVED ==========
  // The following 13 templates have been removed:
  // classic_minimal, modern_blue, creative_gradient, elegant_black,
  // compact_cards, timeline_modern, corporate_clean, lofi_minimal,
  // color_blocks, european_standard, responsive_professional,
  // simple_elegant, rwd_modern
  
  // ========== NEW UNIVERSAL TEMPLATES (From Playground) ==========
  {
    id: 'atlantic_blue',
    name: 'Atlantic Blue',
    description: 'Professional design with dark sidebar and photo support',
    category: 'modern',
    tags: ['sidebar', 'photo', 'modern', 'professional', 'blue', 'dark-theme'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/Atlantic Blue.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo', 'location', 'website', 'linkedIn', 'github'],
    },
    features: ['Dark left sidebar', 'Photo support', 'Visual skill indicators', 'Certifications section'],
    popularity: 95,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['creative', 'tech', 'modern-industries', 'photo-resume', 'professionals'],
    compatibility: { atsScore: 88, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-30 minutes',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Traditional two-column formal layout with serif typography',
    category: 'executive',
    tags: ['traditional', 'serif', 'two-column', 'formal', 'executive', 'management'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/Executive.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Centered header', 'Two-column layout', 'Serif typography', 'Professional formatting'],
    popularity: 92,
    isNew: true,
    complexity: 'simple',
    layout: 'two-column',
    bestFor: ['executives', 'management', 'traditional-industries', 'formal', 'senior-roles'],
    compatibility: { atsScore: 95, printOptimized: true, mobileResponsive: true, accessibilityScore: 94 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'Clean centered design with photo and modern aesthetic',
    category: 'modern',
    tags: ['centered', 'photo', 'modern', 'clean', 'minimal', 'visual'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/ClassicBlue.png',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo', 'languages'],
    },
    features: ['Centered photo', 'Skills as tags', 'Modern aesthetic', 'Language indicators'],
    popularity: 90,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['young-professionals', 'creative', 'modern-companies', 'visual-portfolios'],
    compatibility: { atsScore: 85, printOptimized: true, mobileResponsive: true, accessibilityScore: 88 },
    customization: { colorCustomizable: true, colorVariants: 4, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '18-25 minutes',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional right-aligned header with timeless design',
    category: 'classic',
    tags: ['traditional', 'serif', 'right-aligned', 'classic', 'professional', 'ats-friendly'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/classic.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Right-aligned contact', 'Serif font', 'Clean sections', 'ATS-friendly'],
    popularity: 88,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['all-industries', 'conservative', 'ats-systems', 'traditional-companies'],
    compatibility: { atsScore: 98, printOptimized: true, mobileResponsive: true, accessibilityScore: 96 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '12-18 minutes',
  },
  {
    id: 'harvard',
    name: 'Harvard',
    description: 'Minimal academic design with education-first approach',
    category: 'classic',
    tags: ['academic', 'minimal', 'education-first', 'research', 'simple', 'students'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/harvard.webp',
    requiredFields: ['name', 'email', 'phone', 'education', 'experience'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      education: ['school', 'degree', 'year', 'gpa'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['coursework', 'honors'],
    },
    features: ['Education first', 'Categorized skills', 'Research-friendly', 'Minimal design'],
    popularity: 85,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['students', 'recent-graduates', 'academic-positions', 'research-roles'],
    compatibility: { atsScore: 94, printOptimized: true, mobileResponsive: true, accessibilityScore: 95 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'evergreen',
    name: 'Evergreen',
    description: 'Two-column layout with dark header and skill progress bars',
    category: 'modern',
    tags: ['modern', 'two-column', 'progress-bars', 'photo', 'professional', 'tech'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/Evergreen.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo', 'skillLevels', 'languages'],
    },
    features: ['Dark teal header', 'Skill progress bars', 'Two-column layout', 'Photo integrated'],
    popularity: 88,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['tech-professionals', 'developers', 'experienced', 'skill-heavy-roles'],
    compatibility: { atsScore: 87, printOptimized: true, mobileResponsive: true, accessibilityScore: 89 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-28 minutes',
  },
  {
    id: 'youngcurve',
    name: 'YoungCurve',
    description: 'Academic CV with burgundy accents and numbered publications',
    category: 'classic',
    tags: ['academic', 'research', 'publications', 'photo', 'clean', 'phd'],
    author: 'CV-Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/youngcurve.webp',
    requiredFields: ['name', 'email', 'phone', 'education', 'experience'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      education: ['school', 'degree', 'year', 'field'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo', 'publications', 'research'],
    },
    features: ['Burgundy markers', 'Numbered publications', 'Photo in header', 'Research-focused'],
    popularity: 82,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['phd-candidates', 'researchers', 'academics', 'publication-heavy'],
    compatibility: { atsScore: 91, printOptimized: true, mobileResponsive: true, accessibilityScore: 92 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '22-30 minutes',
  },
  {
    id: 'double-column',
    name: 'Double Column',
    description: 'Professional double column template with clean design',
    category: 'modern',
    tags: ['enhancv', 'professional', 'clean', 'multi-column', 'modern'],
    author: 'Enhancv (Converted)',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/double-column.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Clean professional design', 'ATS-friendly format', 'Color-coded sections', 'Modern typography'],
    popularity: 88,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['professional-roles', 'modern-industries', 'clean-aesthetic'],
    compatibility: { atsScore: 92, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '18-25 minutes',
  },
  {
    id: 'creative-orange',
    name: 'Creative Orange',
    description: 'Creative CV with orange wave header and teal accents',
    category: 'creative',
    tags: ['creative', 'orange', 'teal', 'two-column', 'photo', 'waves', 'modern'],
    author: 'Custom Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/creative-orange.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Orange gradient wave header', 'Circular profile photo', 'Progress bars for skills', 'Icon-based sections'],
    popularity: 89,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['creative-professionals', 'designers', 'modern-industries', 'portfolio-roles'],
    compatibility: { atsScore: 82, printOptimized: true, mobileResponsive: true, accessibilityScore: 86 },
    customization: { colorCustomizable: true, colorVariants: 4, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-28 minutes',
  },
  {
    id: 'teal-modern',
    name: 'Teal Modern',
    description: 'Modern CV with teal header and gray sidebar',
    category: 'modern',
    tags: ['modern', 'teal', 'gray', 'sidebar', 'checkmarks', 'clean', 'professional'],
    author: 'Custom Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/teal-modern.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Teal gradient header', 'Circular profile photo', 'Gray rounded sidebar', 'Checkmark indicators'],
    popularity: 87,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['modern-professionals', 'consultants', 'freelancers', 'tech-industry'],
    compatibility: { atsScore: 85, printOptimized: true, mobileResponsive: true, accessibilityScore: 88 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '18-25 minutes',
  },
  {
    id: 'beige-sidebar',
    name: 'Beige Sidebar',
    description: 'Professional CV with beige sidebar and hexagonal logo',
    category: 'classic',
    tags: ['classic', 'beige', 'sidebar', 'professional', 'clean', 'elegant', 'hexagon'],
    author: 'CodePen by mavrK',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/beige-sidebar.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Beige sidebar', 'Hexagonal logo', 'Social media links', 'Justified text layout'],
    popularity: 90,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['corporate-professionals', 'executives', 'traditional-industries', 'consultants'],
    compatibility: { atsScore: 89, printOptimized: true, mobileResponsive: true, accessibilityScore: 91 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '20-25 minutes',
  },
  {
    id: 'dark-blue-orange',
    name: 'Dark Blue Orange',
    description: 'Modern CV with dark blue background and orange accents',
    category: 'modern',
    tags: ['modern', 'dark', 'blue', 'orange', 'skills', 'progress-bars', 'creative'],
    author: 'CodePen Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/dark-blue-orange.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
    },
    features: ['Dark blue background', 'Orange accent color', 'Skill progress bars', 'Timeline-style experience'],
    popularity: 92,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['web-designers', 'frontend-developers', 'creative-professionals', 'tech-industry'],
    compatibility: { atsScore: 80, printOptimized: true, mobileResponsive: true, accessibilityScore: 84 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '22-30 minutes',
  },
  {
    id: 'gray-minimal',
    name: 'Gray Minimal',
    description: 'Clean and minimal CV with gray sidebar',
    category: 'minimal',
    tags: ['minimal', 'gray', 'clean', 'professional', 'sidebar', 'modern'],
    author: 'Professional Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/gray-minimal.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Gray sidebar', 'White main content', 'Circular profile photo', 'Clean typography'],
    popularity: 88,
    isNew: true,
    complexity: 'simple',
    layout: 'two-column',
    bestFor: ['content-creators', 'marketing-professionals', 'corporate-roles', 'professional-services'],
    compatibility: { atsScore: 90, printOptimized: true, mobileResponsive: true, accessibilityScore: 92 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '15-22 minutes',
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    description: 'Modern dark CV with geometric patterns and green accents',
    category: 'modern',
    tags: ['dark', 'modern', 'green', 'geometric', 'timeline', 'professional'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/dark-professional.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Dark teal gradient', 'Geometric pattern overlay', 'Green accent color', 'Icon-based timeline'],
    popularity: 91,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['software-engineers', 'web-developers', 'tech-professionals', 'modern-industries'],
    compatibility: { atsScore: 83, printOptimized: true, mobileResponsive: true, accessibilityScore: 85 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-28 minutes',
  },
  {
    id: 'orange-sidebar',
    name: 'Orange Sidebar',
    description: 'Modern two-column CV with dark sidebar and orange contact section',
    category: 'modern',
    tags: ['modern', 'orange', 'two-column', 'sidebar', 'clean', 'professional'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/orange-sidebar.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Dark sidebar', 'Orange contact section', 'Two-column layout', 'Profile photo area'],
    popularity: 89,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['ui-ux-designers', 'graphic-designers', 'creative-professionals', 'modern-industries'],
    compatibility: { atsScore: 86, printOptimized: true, mobileResponsive: true, accessibilityScore: 88 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '18-25 minutes',
  },
  {
    id: 'teal-rounded',
    name: 'Teal Rounded',
    description: 'Modern CV with dark teal background and rounded white sections',
    category: 'modern',
    tags: ['modern', 'teal', 'rounded', 'cards', 'dark', 'clean'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/teal-rounded.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'skills'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Dark teal gradient', 'Circular profile photo', 'Rounded white cards', 'Skill progress bars'],
    popularity: 90,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['graphic-designers', 'creative-professionals', 'modern-industries', 'digital-designers'],
    compatibility: { atsScore: 84, printOptimized: true, mobileResponsive: true, accessibilityScore: 87 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-28 minutes',
  },
  {
    id: 'navy-professional',
    name: 'Navy Professional',
    description: 'Professional CV with navy blue sidebar and white main content',
    category: 'classic',
    tags: ['classic', 'navy', 'blue', 'professional', 'sidebar', 'clean'],
    author: 'Professional Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/navy-professional.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo'],
    },
    features: ['Navy blue sidebar', 'White main content', 'Profile photo section', 'Bullet points for entries'],
    popularity: 87,
    isNew: true,
    complexity: 'simple',
    layout: 'two-column',
    bestFor: ['communication-professionals', 'corporate-roles', 'traditional-industries', 'business-professionals'],
    compatibility: { atsScore: 91, printOptimized: true, mobileResponsive: true, accessibilityScore: 93 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '15-22 minutes',
  },
  {
    id: 'blue-circular',
    name: 'Blue Circular',
    description: 'Modern French CV with dark blue sidebar and circular profile photo',
    category: 'modern',
    tags: ['modern', 'blue', 'circular', 'timeline', 'french', 'clean'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/blue-circular.webp',
    requiredFields: ['name', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'phone'],
      experience: ['company', 'role', 'period', 'details'],
      education: ['school', 'degree', 'year'],
      skills: ['skills'],
      custom: ['photo', 'languages'],
    },
    features: ['Dark blue sidebar', 'Circular profile photo', 'Timeline layout with dots', 'Language progress bars'],
    popularity: 89,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['project-managers', 'french-professionals', 'modern-industries', 'creative-roles'],
    compatibility: { atsScore: 87, printOptimized: true, mobileResponsive: true, accessibilityScore: 89 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '18-25 minutes',
  },
  {
    id: 'jack-sparrow',
    name: 'Jack Sparrow',
    description: 'Two-column layout with dark gray header, cyan accents, and orange skill bars',
    category: 'modern',
    tags: ['modern', 'cyan', 'orange', 'two-column', 'skills', 'compact'],
    author: 'LaTeX Overleaf',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/jack-sparrow.webp',
    requiredFields: ['name', 'title', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'location'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['summary', 'languages', 'certifications'],
    },
    features: ['Dark gray header', 'Cyan section badges', 'Orange skill progress bars', 'Compact sidebar layout'],
    popularity: 85,
    isNew: true,
    complexity: 'simple',
    layout: 'two-column',
    bestFor: ['developers', 'technical-roles', 'modern-industries', 'compact-cv'],
    compatibility: { atsScore: 88, printOptimized: true, mobileResponsive: true, accessibilityScore: 87 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'creative-cv',
    name: 'Creative CV',
    description: 'Creative design with circular photo, donut chart, and red burgundy theme',
    category: 'creative',
    tags: ['creative', 'red', 'burgundy', 'photo', 'chart', 'achievements'],
    author: 'LaTeX Overleaf',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/creative-cv.webp',
    requiredFields: ['name', 'title', 'email', 'phone', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'location'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['summary', 'projects', 'languages', 'photo'],
    },
    features: ['Circular photo with name', 'Most Proud Of section with trophy icons', 'A Day of My Life donut chart', 'Red accent color throughout'],
    popularity: 92,
    isNew: true,
    complexity: 'complex',
    layout: 'two-column',
    bestFor: ['creative-roles', 'designers', 'product-managers', 'unique-cv'],
    compatibility: { atsScore: 75, printOptimized: true, mobileResponsive: true, accessibilityScore: 82 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '25-35 minutes',
  },
  {
    id: 'academic',
    name: 'Academic CV',
    description: 'Academic-focused CV with publications, research, and teaching experience',
    category: 'classic',
    tags: ['academic', 'research', 'publications', 'teaching', 'formal'],
    author: 'Academic Template',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/academic.webp',
    requiredFields: ['name', 'title', 'email', 'education', 'experience'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'location'],
      experience: ['institution', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['publications', 'research', 'teaching', 'awards'],
    },
    features: ['Publications section', 'Research experience', 'Teaching history', 'Academic achievements'],
    popularity: 78,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['academics', 'researchers', 'professors', 'phd-candidates'],
    compatibility: { atsScore: 92, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '30-40 minutes',
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean modern design with professional layout and clear sections',
    category: 'modern',
    tags: ['modern', 'professional', 'clean', 'corporate'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/modern-professional.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Modern layout', 'Professional design', 'Clear sections', 'ATS-friendly'],
    popularity: 88,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['professionals', 'corporate', 'business', 'general-use'],
    compatibility: { atsScore: 95, printOptimized: true, mobileResponsive: true, accessibilityScore: 92 },
    customization: { colorCustomizable: true, colorVariants: 4, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-25 minutes',
  },
  {
    id: 'orange-accent',
    name: 'Orange Accent',
    description: 'Professional CV with orange accent colors and modern styling',
    category: 'modern',
    tags: ['modern', 'orange', 'accent', 'colorful'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/orange-accent.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Orange accents', 'Modern design', 'Clean layout', 'Professional'],
    popularity: 84,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['creative-professionals', 'marketing', 'design', 'modern-industries'],
    compatibility: { atsScore: 90, printOptimized: true, mobileResponsive: true, accessibilityScore: 88 },
    customization: { colorCustomizable: true, colorVariants: 5, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'red-topbar',
    name: 'Red Topbar',
    description: 'Professional CV with distinctive red top bar and clean layout',
    category: 'modern',
    tags: ['modern', 'red', 'topbar', 'professional'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/red-topbar.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Red top bar', 'Professional layout', 'Clean design', 'Modern styling'],
    popularity: 86,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['professionals', 'business', 'corporate', 'modern-roles'],
    compatibility: { atsScore: 92, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
    customization: { colorCustomizable: true, colorVariants: 4, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'modern-resume-yellow',
    name: 'Modern Resume Yellow',
    description: 'Modern resume with yellow accents and contemporary design',
    category: 'modern',
    tags: ['modern', 'yellow', 'contemporary', 'fresh'],
    author: 'Modern Design',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/modern-resume-yellow.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
    },
    features: ['Yellow accents', 'Modern design', 'Fresh look', 'Professional'],
    popularity: 82,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['young-professionals', 'creative-roles', 'modern-industries', 'startups'],
    compatibility: { atsScore: 88, printOptimized: true, mobileResponsive: true, accessibilityScore: 87 },
    customization: { colorCustomizable: true, colorVariants: 5, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-22 minutes',
  },
  {
    id: 'ivy-league',
    name: 'Ivy League',
    description: 'Classic academic CV with traditional formatting and serif fonts',
    category: 'classic',
    tags: ['classic', 'academic', 'traditional', 'formal'],
    author: 'Academic Template',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/ivy-league.webp',
    requiredFields: ['name', 'email', 'education', 'experience'],
    fieldMap: {
      basic: ['name', 'email', 'phone', 'address'],
      experience: ['institution', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['publications', 'awards'],
    },
    features: ['Traditional layout', 'Serif typography', 'Academic focus', 'Formal design'],
    popularity: 76,
    isNew: true,
    complexity: 'medium',
    layout: 'single-column',
    bestFor: ['academics', 'law', 'finance', 'traditional-industries'],
    compatibility: { atsScore: 94, printOptimized: true, mobileResponsive: true, accessibilityScore: 91 },
    customization: { colorCustomizable: false, colorVariants: 1, supportsPhoto: false, fontCustomizable: false },
    estimatedTime: '20-30 minutes',
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    description: 'Clean single-column design with teal accents and generous whitespace',
    category: 'minimal',
    tags: ['minimal', 'clean', 'teal', 'single-column', 'professional'],
    author: 'Enhancv',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/stockholm.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'location'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['summary', 'achievements', 'interests'],
    },
    features: ['Single column layout', 'Teal company names', 'Generous whitespace', 'Professional typography'],
    popularity: 90,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['professionals', 'tech', 'modern-industries', 'clean-design-lovers'],
    compatibility: { atsScore: 96, printOptimized: true, mobileResponsive: true, accessibilityScore: 93 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: false, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'geometric-coral',
    name: 'Geometric Coral',
    description: 'Modern geometric design with diagonal split layout and coral accent colors',
    category: 'creative',
    tags: ['creative', 'modern', 'geometric', 'coral', 'two-column', 'photo'],
    author: 'CV Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/geometric-coral.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'website'],
      experience: ['company', 'position', 'period', 'achievements'],
      education: ['institution', 'degree', 'year', 'gpa'],
      skills: ['skills'],
      custom: ['summary', 'awards', 'interests', 'social'],
    },
    features: ['Geometric background', 'Circular photo', 'Coral accent color', 'Two-column layout', 'Social media links'],
    popularity: 85,
    isNew: true,
    complexity: 'medium',
    layout: 'two-column',
    bestFor: ['creatives', 'social-media', 'marketing', 'modern-industries'],
    compatibility: { atsScore: 82, printOptimized: true, mobileResponsive: true, accessibilityScore: 88 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-25 minutes',
  },
  {
    id: 'modern-blue-black',
    name: 'Modern Blue Black',
    description: 'Modern two-column design with circular photo, blue header, and skill progress bars',
    category: 'modern',
    tags: ['modern', 'blue', 'black', 'two-column', 'photo', 'skills-bars'],
    author: 'CV Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/modern-blue-black.webp',
    requiredFields: ['name', 'title', 'email', 'experience', 'education'],
    fieldMap: {
      basic: ['name', 'title', 'email', 'phone', 'location'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year'],
      skills: ['skills'],
      custom: ['summary', 'languages'],
    },
    features: ['Circular photo', 'Blue header bar', 'Skill progress bars', 'Black sidebar', 'Rounded section badges'],
    popularity: 88,
    isNew: true,
    complexity: 'simple',
    layout: 'two-column',
    bestFor: ['tech', 'designers', 'modern-professionals', 'creatives'],
    compatibility: { atsScore: 85, printOptimized: true, mobileResponsive: true, accessibilityScore: 90 },
    customization: { colorCustomizable: true, colorVariants: 3, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '15-20 minutes',
  },
  {
    id: 'academic-burgundy',
    name: 'Academic Burgundy',
    description: 'Clean academic CV with burgundy accents, numbered publications, and research focus',
    category: 'classic',
    tags: ['academic', 'burgundy', 'publications', 'research', 'clean', 'professional'],
    author: 'CV Helper',
    license: 'MIT',
    type: 'react',
    hidden: false,
    thumbnailPath: '/templates/academic-burgundy.webp',
    requiredFields: ['name', 'education'],
    fieldMap: {
      basic: ['name', 'email', 'website'],
      experience: ['company', 'position', 'period', 'description'],
      education: ['institution', 'degree', 'year', 'field'],
      skills: ['skills'],
      custom: ['summary', 'awards'],
    },
    features: ['Numbered publications', 'Burgundy accents', 'Research-focused', 'Photo support', 'Awards section'],
    popularity: 82,
    isNew: true,
    complexity: 'simple',
    layout: 'single-column',
    bestFor: ['academics', 'researchers', 'phd-students', 'professors'],
    compatibility: { atsScore: 88, printOptimized: true, mobileResponsive: true, accessibilityScore: 92 },
    customization: { colorCustomizable: true, colorVariants: 2, supportsPhoto: true, fontCustomizable: true },
    estimatedTime: '20-25 minutes',
  },
]

// ========== REMOVED TEMPLATES ==========
// HTML Export Templates (2): html_classic_minimal, html_modern_blue
// LaTeX Templates (2): latex_jake_gutierrez, latex_sb2nov
// Total active templates: 30 (all React-based universal templates)

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
  
  // Field mapping for UniversalResumeData
  const fieldMap: Record<string, any> = {
    name: resumeData.personal?.fullName,
    email: resumeData.personal?.email,
    phone: resumeData.personal?.phone,
    title: resumeData.personal?.title,
    location: resumeData.personal?.location,
    experience: resumeData.experience,
    education: resumeData.education,
    skills: resumeData.skills,
    projects: resumeData.projects,
    summary: resumeData.summary,
  }
  
  for (const field of template.requiredFields) {
    const value = fieldMap[field] !== undefined ? fieldMap[field] : resumeData[field]
    
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
