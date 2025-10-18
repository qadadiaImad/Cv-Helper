"use client"

import React from 'react'
import { Palette } from 'lucide-react'
import { useTheme, THEMES, type ThemeKey } from '@/lib/theme-context'

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { currentTheme, setTheme, theme } = useTheme()
  const [showThemePicker, setShowThemePicker] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Wait for client-side mount to avoid hydration issues
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2.5 rounded-lg border bg-muted h-10 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {!compact && (
        <p 
          className="text-xs uppercase tracking-wide mb-2 opacity-70 font-semibold" 
          style={{ color: theme.text }}
        >
          Theme
        </p>
      )}
      
      <div className="flex items-center gap-2">
        {/* Current Theme Display + Picker Button */}
        <button 
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between gap-2 border hover:opacity-80"
          style={{ 
            backgroundColor: 'var(--theme-bg-secondary)',
            borderColor: 'var(--theme-border)',
            color: 'var(--theme-text)'
          }}
          title="Change Theme"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{THEMES[currentTheme].icon}</span>
            <span className="font-semibold">{THEMES[currentTheme].name}</span>
          </div>
          <Palette className="h-4 w-4" />
        </button>
      </div>

      {/* Theme Picker Dropdown */}
      {showThemePicker && (
        <div 
          className="rounded-lg shadow-2xl border p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)'
          }}
        >
          <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--theme-border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--theme-text-secondary)' }}>
              Choose Theme
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
              const themeConfig = THEMES[key]
              const isActive = currentTheme === key
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key)
                    setShowThemePicker(false)
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-md text-sm transition-all hover:opacity-80"
                  style={{
                    backgroundColor: isActive ? 'var(--theme-accent)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--theme-text)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{themeConfig.icon}</span>
                    <div className="flex-1">
                      <span className="font-medium">{themeConfig.name}</span>
                    </div>
                    {isActive && (
                      <span className="text-sm font-bold">✓</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
