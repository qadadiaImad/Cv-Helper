/**
 * Unified Design Token System for CV-Helper
 * 
 * This file centralizes all design tokens (colors, spacing, typography, etc.)
 * to ensure consistency across the application and make theme updates easier.
 * 
 * Usage:
 * import { designTokens } from '@/lib/design-tokens'
 * style={{ color: designTokens.colors.text.primary }}
 */

export const designTokens = {
  /**
   * COLOR SYSTEM
   * Theme-aware colors that automatically update based on selected theme
   */
  colors: {
    // Core theme colors (connect to CSS variables set by ThemeWrapper)
    background: {
      primary: 'var(--theme-bg)',
      secondary: 'var(--theme-bg-secondary)',
      sidebar: 'var(--theme-sidebar)',
    },
    surface: {
      card: 'var(--theme-card)',
      elevated: 'var(--theme-card)', // Can be enhanced with shadows
    },
    text: {
      primary: 'var(--theme-text)',
      secondary: 'var(--theme-text-secondary)',
      muted: 'var(--muted-foreground)',
      inverse: 'var(--theme-bg)', // Text on accent backgrounds
    },
    border: {
      default: 'var(--theme-border)',
      muted: 'var(--border)',
      focus: 'var(--theme-accent)',
    },
    accent: {
      default: 'var(--theme-accent)',
      hover: 'var(--theme-accent)', // Slightly different shade in future
      active: 'var(--theme-accent)',
    },
    
    // Semantic colors (consistent across all themes)
    semantic: {
      success: {
        light: '#10B981',
        dark: '#34D399',
        bg: '#D1FAE5',
        bgDark: '#064E3B',
      },
      warning: {
        light: '#F59E0B',
        dark: '#FBBF24',
        bg: '#FEF3C7',
        bgDark: '#78350F',
      },
      error: {
        light: '#EF4444',
        dark: '#F87171',
        bg: '#FEE2E2',
        bgDark: '#7F1D1D',
      },
      info: {
        light: '#3B82F6',
        dark: '#60A5FA',
        bg: '#DBEAFE',
        bgDark: '#1E3A8A',
      },
    },
    
    // FlowCV Brand Colors (for logo, hero sections, etc.)
    brand: {
      purple: '#3626A7',
      ink: '#2B0B3C',
      sand: '#F6F6F9',
      cream: '#FAF8F4',
    },
  },

  /**
   * SPACING SYSTEM
   * Consistent spacing scale based on 4px grid
   */
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem',       // 384px
  },

  /**
   * TYPOGRAPHY SYSTEM
   * Font families, sizes, weights, and line heights
   */
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-geist-mono), "SF Mono", Monaco, monospace',
      display: '"DM Sans", var(--font-geist-sans), sans-serif',
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },      // 12px
      sm: { size: '0.875rem', lineHeight: '1.25rem' },  // 14px
      base: { size: '1rem', lineHeight: '1.5rem' },     // 16px
      lg: { size: '1.125rem', lineHeight: '1.75rem' },  // 18px
      xl: { size: '1.25rem', lineHeight: '1.75rem' },   // 20px
      '2xl': { size: '1.5rem', lineHeight: '2rem' },    // 24px
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' }, // 30px
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' }, // 36px
      '5xl': { size: '3rem', lineHeight: '1' },         // 48px
      '6xl': { size: '3.75rem', lineHeight: '1' },      // 60px
      '7xl': { size: '4.5rem', lineHeight: '1' },       // 72px
      '8xl': { size: '6rem', lineHeight: '1' },         // 96px
      '9xl': { size: '8rem', lineHeight: '1' },         // 128px
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  /**
   * ANIMATION SYSTEM
   * Durations, easings, and common animation values
   */
  animation: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    },
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideUp: {
        from: { transform: 'translateY(10px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
      slideDown: {
        from: { transform: 'translateY(-10px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
      scaleIn: {
        from: { transform: 'scale(0.95)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
      },
    },
  },

  /**
   * SHADOW SYSTEM
   * Elevation levels for depth perception
   */
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    
    // FlowCV custom shadows
    soft: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    medium: '0px 8px 24px rgba(0, 0, 0, 0.12)',
    large: '0px 16px 48px rgba(0, 0, 0, 0.16)',
    hero: '0px 34px 68px -16px rgba(0, 0, 0, 0.25)',
  },

  /**
   * BORDER RADIUS SYSTEM
   * Consistent rounding values
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',    // 4px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  /**
   * Z-INDEX SYSTEM
   * Layering system for overlays
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },

  /**
   * BREAKPOINTS
   * Responsive design breakpoints
   */
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * CONTAINER SIZES
   * Max-width values for content containers
   */
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    full: '100%',
  },
} as const

/**
 * TYPE EXPORTS
 * For TypeScript autocomplete
 */
export type DesignTokens = typeof designTokens
export type ColorToken = keyof typeof designTokens.colors
export type SpacingToken = keyof typeof designTokens.spacing
export type FontSizeToken = keyof typeof designTokens.typography.fontSize
export type ShadowToken = keyof typeof designTokens.shadows
export type BorderRadiusToken = keyof typeof designTokens.borderRadius

/**
 * HELPER FUNCTIONS
 */

/** Get semantic color based on dark mode */
export function getSemanticColor(
  type: 'success' | 'warning' | 'error' | 'info',
  isDark: boolean,
  variant: 'light' | 'dark' | 'bg' | 'bgDark' = 'light'
) {
  if (variant === 'light' || variant === 'dark') {
    return designTokens.colors.semantic[type][isDark ? 'dark' : 'light']
  }
  return designTokens.colors.semantic[type][isDark ? 'bgDark' : 'bg']
}

/** Get shadow value with optional opacity override */
export function getShadow(size: ShadowToken, opacity: number = 1) {
  const shadow = designTokens.shadows[size]
  if (opacity === 1 || shadow === 'none') return shadow
  
  // Adjust opacity in shadow
  return shadow.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g, 
    (match, r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * opacity})`
  )
}

export default designTokens
