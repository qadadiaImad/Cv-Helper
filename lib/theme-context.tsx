"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// State-of-the-art theme configurations inspired by popular design systems
// (Tailwind, Radix, shadcn, Vercel, Linear, etc.)
export const THEMES = {
  rose: {
    name: "Soft Rose",
    icon: "🌸",
    light: {
      bg: "#FFF1F2",
      bgSecondary: "#FFE4E6", 
      sidebar: "#FFE4E6",
      card: "#FFFFFF",
      text: "#4C0519",
      textSecondary: "#881337",
      border: "#FECDD3",
      accent: "#FB7185"
    },
    dark: {
      bg: "#0F0A0D",
      bgSecondary: "#1A0F14",
      sidebar: "#1A0F14",
      card: "#251419",
      text: "#FECDD3",
      textSecondary: "#FDA4AF",
      border: "#4C1D24",
      accent: "#FB7185"
    }
  },
  lavender: {
    name: "Soft Lavender",
    icon: "💜",
    light: {
      bg: "#F5F3FF",
      bgSecondary: "#EDE9FE",
      sidebar: "#EDE9FE",
      card: "#FFFFFF",
      text: "#2B0B3C",
      textSecondary: "#5B21B6",
      border: "#DDD6FE",
      accent: "#8B5CF6"
    },
    dark: {
      bg: "#0A0612",
      bgSecondary: "#150E1F",
      sidebar: "#150E1F",
      card: "#1E1532",
      text: "#E9D5FF",
      textSecondary: "#C4B5FD",
      border: "#4C1D95",
      accent: "#8B5CF6"
    }
  },
  mint: {
    name: "Mint Fresh",
    icon: "🌿",
    light: {
      bg: "#F0FDF4",
      bgSecondary: "#DCFCE7",
      sidebar: "#DCFCE7",
      card: "#FFFFFF",
      text: "#14532D",
      textSecondary: "#166534",
      border: "#BBF7D0",
      accent: "#10B981"
    },
    dark: {
      bg: "#021208",
      bgSecondary: "#052E16",
      sidebar: "#052E16",
      card: "#064E3B",
      text: "#D1FAE5",
      textSecondary: "#A7F3D0",
      border: "#065F46",
      accent: "#10B981"
    }
  },
  ocean: {
    name: "Ocean Blue",
    icon: "🌊",
    light: {
      bg: "#EFF6FF",
      bgSecondary: "#DBEAFE",
      sidebar: "#DBEAFE",
      card: "#FFFFFF",
      text: "#1E3A8A",
      textSecondary: "#1E40AF",
      border: "#BFDBFE",
      accent: "#3B82F6"
    },
    dark: {
      bg: "#020617",
      bgSecondary: "#0F172A",
      sidebar: "#0F172A",
      card: "#1E293B",
      text: "#DBEAFE",
      textSecondary: "#93C5FD",
      border: "#1E3A8A",
      accent: "#3B82F6"
    }
  },
  sunset: {
    name: "Warm Sunset",
    icon: "🌅",
    light: {
      bg: "#FFF7ED",
      bgSecondary: "#FFEDD5",
      sidebar: "#FFEDD5",
      card: "#FFFFFF",
      text: "#7C2D12",
      textSecondary: "#C2410C",
      border: "#FED7AA",
      accent: "#F97316"
    },
    dark: {
      bg: "#0C0604",
      bgSecondary: "#1C0F08",
      sidebar: "#1C0F08",
      card: "#2C1810",
      text: "#FFEDD5",
      textSecondary: "#FED7AA",
      border: "#7C2D12",
      accent: "#F97316"
    }
  },
  slate: {
    name: "Cool Slate",
    icon: "⚡",
    light: {
      bg: "#F8FAFC",
      bgSecondary: "#F1F5F9",
      sidebar: "#F1F5F9",
      card: "#FFFFFF",
      text: "#0F172A",
      textSecondary: "#334155",
      border: "#E2E8F0",
      accent: "#0EA5E9"
    },
    dark: {
      bg: "#020617",
      bgSecondary: "#0F172A",
      sidebar: "#0F172A",
      card: "#1E293B",
      text: "#F1F5F9",
      textSecondary: "#CBD5E1",
      border: "#334155",
      accent: "#0EA5E9"
    }
  },
  forest: {
    name: "Deep Forest",
    icon: "🌲",
    light: {
      bg: "#F0FDF4",
      bgSecondary: "#DCFCE7",
      sidebar: "#DCFCE7",
      card: "#FFFFFF",
      text: "#14532D",
      textSecondary: "#15803D",
      border: "#BBF7D0",
      accent: "#22C55E"
    },
    dark: {
      bg: "#021208",
      bgSecondary: "#052E16",
      sidebar: "#052E16",
      card: "#14532D",
      text: "#D1FAE5",
      textSecondary: "#86EFAC",
      border: "#166534",
      accent: "#22C55E"
    }
  },
  cosmic: {
    name: "Cosmic Purple",
    icon: "✨",
    light: {
      bg: "#FAF5FF",
      bgSecondary: "#F3E8FF",
      sidebar: "#F3E8FF",
      card: "#FFFFFF",
      text: "#581C87",
      textSecondary: "#7E22CE",
      border: "#E9D5FF",
      accent: "#A855F7"
    },
    dark: {
      bg: "#0A0412",
      bgSecondary: "#1A0B2E",
      sidebar: "#1A0B2E",
      card: "#2E1065",
      text: "#F3E8FF",
      textSecondary: "#D8B4FE",
      border: "#581C87",
      accent: "#A855F7"
    }
  }
} as const

export type ThemeKey = keyof typeof THEMES
export type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  currentTheme: ThemeKey
  isDarkMode: boolean
  setTheme: (theme: ThemeKey) => void
  toggleDarkMode: () => void
  theme: typeof THEMES[ThemeKey][ThemeMode]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('rose')
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('cv-helper-theme') as ThemeKey
    const savedMode = localStorage.getItem('cv-helper-dark-mode')
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
    if (savedMode) {
      setIsDarkMode(savedMode === 'true')
    }
  }, [])

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('cv-helper-theme', currentTheme)
    localStorage.setItem('cv-helper-dark-mode', isDarkMode.toString())
  }, [currentTheme, isDarkMode])

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme)
    toast.success(`Theme changed to ${THEMES[theme].name}`)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    toast.success(isDarkMode ? 'Light mode enabled' : 'Dark mode enabled')
  }

  const theme = THEMES[currentTheme][isDarkMode ? 'dark' : 'light']

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ currentTheme, isDarkMode, setTheme, toggleDarkMode, theme }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, isDarkMode, setTheme, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
