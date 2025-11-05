/**
 * Global Theme Configuration System
 * Manages app-wide theme colors and styles
 */

export type ThemeColor = 
  | 'blue'           // Default blue
  | 'lavender'       // Soft lavender/purple
  | 'green'          // Professional green
  | 'orange'         // Warm orange
  | 'pink'           // Creative pink
  | 'teal'           // Modern teal
  | 'slate'          // Minimal gray

export interface Theme {
  name: string
  colors: {
    primary: string
    primaryHover: string
    primaryLight: string
    primaryDark: string
    secondary: string
    accent: string
    background: string
    backgroundGradient: string
    cardBackground: string
    border: string
    text: string
  }
}

export const THEMES: Record<ThemeColor, Theme> = {
  blue: {
    name: 'Ocean Blue',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      primaryLight: '#dbeafe',
      primaryDark: '#1e40af',
      secondary: '#6366f1',
      accent: '#0ea5e9',
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      backgroundGradient: 'from-slate-50 via-blue-50 to-indigo-50',
      cardBackground: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      border: '#3b82f6',
      text: '#1e293b'
    }
  },
  lavender: {
    name: 'Soft Lavender',
    colors: {
      primary: '#a855f7',
      primaryHover: '#9333ea',
      primaryLight: '#f3e8ff',
      primaryDark: '#7e22ce',
      secondary: '#c084fc',
      accent: '#d946ef',
      background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      backgroundGradient: 'from-purple-50 via-pink-50 to-fuchsia-50',
      cardBackground: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      border: '#a855f7',
      text: '#1e293b'
    }
  },
  green: {
    name: 'Fresh Green',
    colors: {
      primary: '#22c55e',
      primaryHover: '#16a34a',
      primaryLight: '#dcfce7',
      primaryDark: '#15803d',
      secondary: '#10b981',
      accent: '#14b8a6',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      backgroundGradient: 'from-green-50 via-emerald-50 to-teal-50',
      cardBackground: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      border: '#22c55e',
      text: '#1e293b'
    }
  },
  orange: {
    name: 'Warm Orange',
    colors: {
      primary: '#f97316',
      primaryHover: '#ea580c',
      primaryLight: '#ffedd5',
      primaryDark: '#c2410c',
      secondary: '#fb923c',
      accent: '#f59e0b',
      background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      backgroundGradient: 'from-orange-50 via-amber-50 to-yellow-50',
      cardBackground: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      border: '#f97316',
      text: '#1e293b'
    }
  },
  pink: {
    name: 'Creative Pink',
    colors: {
      primary: '#ec4899',
      primaryHover: '#db2777',
      primaryLight: '#fce7f3',
      primaryDark: '#be185d',
      secondary: '#f472b6',
      accent: '#f43f5e',
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      backgroundGradient: 'from-pink-50 via-rose-50 to-red-50',
      cardBackground: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      border: '#ec4899',
      text: '#1e293b'
    }
  },
  teal: {
    name: 'Modern Teal',
    colors: {
      primary: '#14b8a6',
      primaryHover: '#0d9488',
      primaryLight: '#ccfbf1',
      primaryDark: '#0f766e',
      secondary: '#2dd4bf',
      accent: '#06b6d4',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
      backgroundGradient: 'from-teal-50 via-cyan-50 to-sky-50',
      cardBackground: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
      border: '#14b8a6',
      text: '#1e293b'
    }
  },
  slate: {
    name: 'Minimal Slate',
    colors: {
      primary: '#64748b',
      primaryHover: '#475569',
      primaryLight: '#e2e8f0',
      primaryDark: '#334155',
      secondary: '#94a3b8',
      accent: '#71717a',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      backgroundGradient: 'from-slate-50 via-gray-50 to-zinc-50',
      cardBackground: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      border: '#64748b',
      text: '#1e293b'
    }
  }
}

// Default theme
export const DEFAULT_THEME: ThemeColor = 'blue'

/**
 * Get theme configuration
 */
export function getTheme(themeColor?: ThemeColor): Theme {
  return THEMES[themeColor || DEFAULT_THEME] || THEMES[DEFAULT_THEME]
}

/**
 * Get CSS variables for theme
 */
export function getThemeCSSVars(themeColor?: ThemeColor): Record<string, string> {
  const theme = getTheme(themeColor)
  return {
    '--theme-primary': theme.colors.primary,
    '--theme-primary-hover': theme.colors.primaryHover,
    '--theme-primary-light': theme.colors.primaryLight,
    '--theme-primary-dark': theme.colors.primaryDark,
    '--theme-secondary': theme.colors.secondary,
    '--theme-accent': theme.colors.accent,
    '--theme-border': theme.colors.border,
    '--theme-text': theme.colors.text
  }
}
