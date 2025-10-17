"use client"

import React, { useState } from 'react'
import { Moon, Sun, Palette } from 'lucide-react'
import { useTheme, THEMES, type ThemeKey } from '@/lib/theme-context'

export function ThemeSwitcher() {
  const { currentTheme, isDarkMode, setTheme, toggleDarkMode, theme } = useTheme()
  const [showThemePicker, setShowThemePicker] = useState(false)

  return (
    <div className="space-y-3">
      <p 
        className="text-xs uppercase tracking-wide mb-2 opacity-70 font-semibold" 
        style={{ color: theme.text }}
      >
        Theme
      </p>
      
      <div className="flex items-center gap-2">
        {/* Dark/Light Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            color: theme.text
          }}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden xl:inline font-semibold">
            {isDarkMode ? 'Light' : 'Dark'}
          </span>
        </button>

        {/* Theme Picker Button */}
        <button 
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="px-3 py-2.5 rounded-lg text-sm font-medium transition-all border"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
            color: theme.text
          }}
          title="Change Color Theme"
        >
          <Palette className="h-4 w-4" />
        </button>
      </div>

      {/* Theme Picker Dropdown */}
      {showThemePicker && (
        <div 
          className="rounded-lg shadow-2xl border p-2 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border
          }}
        >
          <div className="px-3 py-2 border-b" style={{ borderColor: theme.border }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: theme.textSecondary }}>
              Choose Theme
            </p>
          </div>
          
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
                className="w-full text-left px-3 py-2.5 rounded-md text-sm transition-all"
                style={{
                  backgroundColor: isActive ? theme.accent : 'transparent',
                  color: isActive ? '#FFFFFF' : theme.text
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
      )}
    </div>
  )
}
