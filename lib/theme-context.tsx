"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

// Unified theme system: 8 light themes + 1 dark mode
export const THEMES = {
  rose: {
    name: "Soft Rose",
    icon: "🌸",
    bg: "#FFF1F2",
    bgSecondary: "#FFE4E6", 
    sidebar: "#FFE4E6",
    card: "#FFFFFF",
    text: "#4C0519",
    textSecondary: "#881337",
    border: "#FECDD3",
    accent: "#FB7185"
  },
  lavender: {
    name: "Soft Lavender",
    icon: "💜",
    bg: "#F5F3FF",
    bgSecondary: "#EDE9FE",
    sidebar: "#EDE9FE",
    card: "#FFFFFF",
    text: "#2B0B3C",
    textSecondary: "#5B21B6",
    border: "#DDD6FE",
    accent: "#8B5CF6"
  },
  mint: {
    name: "Mint Fresh",
    icon: "🌿",
    bg: "#F0FDF4",
    bgSecondary: "#DCFCE7",
    sidebar: "#DCFCE7",
    card: "#FFFFFF",
    text: "#14532D",
    textSecondary: "#166534",
    border: "#BBF7D0",
    accent: "#10B981"
  },
  ocean: {
    name: "Ocean Blue",
    icon: "🌊",
    bg: "#EFF6FF",
    bgSecondary: "#DBEAFE",
    sidebar: "#DBEAFE",
    card: "#FFFFFF",
    text: "#172554",        // Enhanced: Darker for 10.5:1 contrast (was #1E3A8A)
    textSecondary: "#1E3A8A",  // Enhanced: Better secondary
    border: "#BFDBFE",
    accent: "#3B82F6"
  },
  sunset: {
    name: "Warm Sunset",
    icon: "🌅",
    bg: "#FFF7ED",
    bgSecondary: "#FFEDD5",
    sidebar: "#FFEDD5",
    card: "#FFFFFF",
    text: "#6B2710",        // Enhanced: Darker for 9.5:1 contrast (was #7C2D12)
    textSecondary: "#7C2D12",  // Enhanced: Better secondary
    border: "#FED7AA",
    accent: "#F97316"
  },
  slate: {
    name: "Cool Slate",
    icon: "⚡",
    bg: "#F8FAFC",
    bgSecondary: "#F1F5F9",
    sidebar: "#F1F5F9",
    card: "#FFFFFF",
    text: "#0F172A",
    textSecondary: "#334155",
    border: "#E2E8F0",
    accent: "#0EA5E9"
  },
  forest: {
    name: "Deep Forest",
    icon: "🌲",
    bg: "#F0FDF4",
    bgSecondary: "#DCFCE7",
    sidebar: "#DCFCE7",
    card: "#FFFFFF",
    text: "#14532D",
    textSecondary: "#15803D",
    border: "#BBF7D0",
    accent: "#22C55E"
  },
  cosmic: {
    name: "Cosmic Purple",
    icon: "✨",
    bg: "#FAF5FF",
    bgSecondary: "#F3E8FF",
    sidebar: "#F3E8FF",
    card: "#FFFFFF",
    text: "#581C87",
    textSecondary: "#7E22CE",
    border: "#E9D5FF",
    accent: "#A855F7"
  },
  // ONE unified dark mode
  dark: {
    name: "Dark Mode",
    icon: "🌙",
    bg: "#0A0A0F",
    bgSecondary: "#141419",
    sidebar: "#141419",
    card: "#1E1E24",
    text: "#F5F5F7",
    textSecondary: "#E0E0E3",
    border: "#3A3A44",
    accent: "#6366F1"
  }
} as const

export type ThemeKey = keyof typeof THEMES

interface ThemeContextType {
  currentTheme: ThemeKey
  setTheme: (theme: ThemeKey) => void
  theme: typeof THEMES[ThemeKey]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('rose')

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('cv-helper-theme') as ThemeKey
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cv-helper-theme', currentTheme)
    }
  }, [currentTheme, mounted])

  const setTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme)
    toast.success(`Theme changed to ${THEMES[theme].name}`)
  }

  const theme = THEMES[currentTheme]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ currentTheme, setTheme, theme }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, theme }}>
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
