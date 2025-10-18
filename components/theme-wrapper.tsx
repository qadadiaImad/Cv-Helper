"use client"

import { useEffect } from 'react'
import { useTheme } from '@/lib/theme-context'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme colors to body and CSS custom properties
    const root = document.documentElement
    
    // Set CSS custom properties for global access
    root.style.setProperty('--theme-bg', theme.bg)
    root.style.setProperty('--theme-bg-secondary', theme.bgSecondary)
    root.style.setProperty('--theme-sidebar', theme.sidebar)
    root.style.setProperty('--theme-card', theme.card)
    root.style.setProperty('--theme-text', theme.text)
    root.style.setProperty('--theme-text-secondary', theme.textSecondary)
    root.style.setProperty('--theme-border', theme.border)
    root.style.setProperty('--theme-accent', theme.accent)
    
    // Apply to body
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.text
    document.body.style.transition = 'background-color 300ms, color 300ms'
  }, [theme])

  return <>{children}</>
}
