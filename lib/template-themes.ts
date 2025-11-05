/**
 * Template Theme Configuration
 * Maps template IDs to their visual theme colors
 */

export interface TemplateTheme {
  background: string
  border: string
  hoverBorder: string
  accent: string
}

export const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  // Blue themes
  atlantic_blue: {
    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    border: '#3b82f6',
    hoverBorder: '#2563eb',
    accent: '#3b82f6'
  },
  
  // Gray/Minimal themes
  executive: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    border: '#64748b',
    hoverBorder: '#475569',
    accent: '#64748b'
  },
  mercury: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    border: '#64748b',
    hoverBorder: '#475569',
    accent: '#64748b'
  },
  classic: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    border: '#64748b',
    hoverBorder: '#475569',
    accent: '#64748b'
  },
  
  // Green themes
  harvard: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#22c55e',
    hoverBorder: '#16a34a',
    accent: '#22c55e'
  },
  evergreen: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#22c55e',
    hoverBorder: '#16a34a',
    accent: '#22c55e'
  },
  
  // Purple/Creative themes
  youngcurve: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    border: '#a855f7',
    hoverBorder: '#9333ea',
    accent: '#a855f7'
  },
  
  // Legacy template IDs (if any exist)
  modern_minimal: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    border: '#64748b',
    hoverBorder: '#475569',
    accent: '#64748b'
  },
  creative_purple: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    border: '#a855f7',
    hoverBorder: '#9333ea',
    accent: '#a855f7'
  },
  professional_green: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    border: '#22c55e',
    hoverBorder: '#16a34a',
    accent: '#22c55e'
  }
}

// Default theme (fallback)
export const DEFAULT_THEME: TemplateTheme = {
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  border: '#3b82f6',
  hoverBorder: '#2563eb',
  accent: '#3b82f6'
}

/**
 * Get theme for a template ID
 */
export function getTemplateTheme(templateId?: string): TemplateTheme {
  if (!templateId) return DEFAULT_THEME
  return TEMPLATE_THEMES[templateId] || DEFAULT_THEME
}
