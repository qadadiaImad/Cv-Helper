"use client"

import { useEffect } from 'react'
import { useTheme } from '@/lib/theme-context'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme colors to body
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.text
    document.body.style.transition = 'background-color 300ms, color 300ms'
  }, [theme])

  return <>{children}</>
}
