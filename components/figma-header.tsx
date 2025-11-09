"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, LayoutTemplate, ChevronDown } from "lucide-react"
import { useTheme } from "@/lib/theme-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSwitcher } from "@/components/theme-switcher"

type ApiUser = { id: string; name: string; email: string }

export function FigmaHeader() {
  const { theme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [user, setUser] = React.useState<ApiUser | null>(null)
  const [loading, setLoading] = React.useState(false)

  const fetchMe = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" })
      if (!res.ok) {
        setUser(null)
        return
      }
      const data = await res.json()
      setUser(data.user ?? null)
    } catch {
      setUser(null)
    }
  }, [])

  React.useEffect(() => {
    fetchMe()
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-refresh') fetchMe()
    }
    const handleAuthChange = () => fetchMe()
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-changed', handleAuthChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-changed', handleAuthChange)
    }
  }, [fetchMe])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Stylish Header with Figma Placement */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-2xl shadow-xl px-6 py-4 relative overflow-hidden backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: theme.accent,
              boxShadow: `0 8px 32px rgba(132, 104, 245, 0.15)`
            }}
          >
            {/* Decorative gradient overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{ 
                background: `linear-gradient(135deg, ${theme.accent} 0%, transparent 50%)`
              }}
            />
            
            <div className="flex items-center justify-between relative z-10">
              {/* Stylish Logo - Left aligned (Figma placement) */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  {/* Animated glow */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-40 blur-lg transition-all duration-300 group-hover:opacity-60 group-hover:blur-xl animate-pulse"
                    style={{ backgroundColor: theme.accent }}
                  />
                  {/* Logo container */}
                  <div 
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl overflow-hidden"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* RM monogram with sparkle */}
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="text-white font-black text-2xl leading-none tracking-tighter">R</span>
                      <span className="text-white font-black text-lg leading-none tracking-tighter opacity-90">M</span>
                      <span className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-pulse">✨</span>
                    </div>
                  </div>
                </div>
                
                {/* Brand name and tagline */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-0.5">
                    <span 
                      className="text-2xl font-black tracking-tight transition-all duration-300 group-hover:scale-105"
                      style={{ color: theme.text }}
                    >
                      Resu
                    </span>
                    <span 
                      className="text-2xl font-black tracking-tight transition-all duration-300 group-hover:scale-105 italic"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}aa 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Magic
                    </span>
                    <span className="text-xl animate-bounce">✨</span>
                  </div>
                  <span 
                    className="text-xs font-semibold tracking-wider uppercase animate-pulse"
                    style={{ color: theme.textSecondary }}
                  >
                    🪄 Create Perfect Resumes
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Right aligned with icons */}
              <nav className="hidden lg:flex items-center gap-6">
                <Link 
                  href="/" 
                  className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.textSecondary }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="relative z-10">Home</span>
                </Link>
                <Link 
                  href="/dashboard/templates" 
                  className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.textSecondary }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <LayoutTemplate className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 relative z-10" />
                  <span className="relative z-10">Templates</span>
                </Link>
                <Link 
                  href="/discover" 
                  className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.textSecondary }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="relative z-10">Discover</span>
                </Link>
                <Link 
                  href="/about" 
                  className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.textSecondary }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="relative z-10">About</span>
                </Link>
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link href="/dashboard/cvs" className="btn-flowcv-secondary text-sm">
                      Dashboard
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.accent }}
                          >
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <ChevronDown className="h-4 w-4" style={{ color: theme.textSecondary }} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/templates" className="cursor-pointer">
                            <LayoutTemplate className="mr-2 h-4 w-4" />
                            Templates
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <div className="px-2 py-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Theme</p>
                          <ThemeSwitcher compact />
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={handleLogout}
                          disabled={loading}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="btn-flowcv-secondary text-sm">
                      Login
                    </Link>
                    <Link 
                      href="/dashboard/cvs"
                      className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                      style={{ backgroundColor: theme.accent }}
                    >
                      Start Building
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 transition-colors"
                style={{ color: theme.textSecondary }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <span className="text-xl font-bold" style={{ color: 'var(--figma-primary)' }}>Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                  style={{ color: 'var(--figma-primary)' }}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-6 space-y-4">
                <Link 
                  href="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium py-2 transition-colors hover:opacity-70"
                  style={{ color: 'var(--figma-primary)' }}
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard/templates" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium py-2 transition-colors hover:opacity-70"
                  style={{ color: 'var(--figma-primary)' }}
                >
                  Products
                </Link>
                <Link 
                  href="/discover" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium py-2 transition-colors hover:opacity-70"
                  style={{ color: 'var(--figma-primary)' }}
                >
                  Support
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium py-2 transition-colors hover:opacity-70"
                  style={{ color: 'var(--figma-primary)' }}
                >
                  About
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div className="p-6 border-t">
                <Link 
                  href="/dashboard/cvs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 rounded-full text-center text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--figma-accent-purple)' }}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
