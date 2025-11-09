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
                  {/* Logo container - Exploding Infinity to Resume */}
                  <div 
                    className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-visible"
                    style={{ 
                      background: `linear-gradient(135deg, 
                        #FF6B6B 0%, 
                        #FFA500 15%, 
                        #FFD700 25%, 
                        #32CD32 35%, 
                        #00CED1 45%, 
                        #1E90FF 55%, 
                        #9370DB 65%, 
                        #FF1493 75%, 
                        #FF6B6B 100%)`,
                      backgroundSize: '400% 400%',
                      animation: 'gradientShift 4s ease infinite',
                      boxShadow: `
                        0 0 20px rgba(168, 85, 247, 0.6),
                        0 0 40px rgba(236, 72, 153, 0.4),
                        0 0 60px rgba(59, 130, 246, 0.3),
                        inset 0 2px 4px rgba(255, 255, 255, 0.3)
                      `
                    }}
                  >
                    {/* Explosion particles */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * Math.PI / 180
                      const distance = 30
                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${['#FF6B6B', '#FFA500', '#FFD700', '#32CD32', '#00CED1', '#1E90FF', '#9370DB', '#FF1493'][i]}, ${['#FFA500', '#FFD700', '#32CD32', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#FF6B6B'][i]})`,
                            '--tx': `${Math.cos(angle) * distance}px`,
                            '--ty': `${Math.sin(angle) * distance}px`,
                            animation: 'particleSpread 8s ease-in-out infinite'
                          } as React.CSSProperties}
                        />
                      )
                    })}
                    
                    {/* Glossy 3D effect overlay */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(255, 255, 255, 0.4) 0%, 
                          rgba(255, 255, 255, 0.1) 40%, 
                          rgba(0, 0, 0, 0.1) 60%, 
                          rgba(0, 0, 0, 0.2) 100%)`,
                        opacity: 0.8
                      }}
                    />
                    
                    {/* Morphing Icon Container */}
                    <div 
                      className="relative z-10 flex items-center justify-center w-full h-full"
                      style={{ 
                        animation: 'explodeToResume 8s ease-in-out infinite'
                      }}
                    >
                      {/* Infinity symbol (visible 0-40% and 80-100%) */}
                      <div
                        className="absolute flex items-center justify-center"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                          animation: 'fadeInfinity 8s ease-in-out infinite'
                        }}
                      >
                        <span 
                          className="text-white font-black text-3xl leading-none"
                          style={{
                            textShadow: `
                              0 2px 4px rgba(0, 0, 0, 0.4),
                              0 0 10px rgba(255, 255, 255, 0.6),
                              0 0 20px rgba(255, 255, 255, 0.4)
                            `
                          }}
                        >
                          ∞
                        </span>
                        <span 
                          className="absolute text-white font-bold text-[10px] leading-none tracking-tight"
                          style={{
                            textShadow: '0 1px 3px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.5)'
                          }}
                        >
                          CV
                        </span>
                      </div>
                      
                      {/* Resume icon (visible 40-70%) */}
                      <svg
                        className="absolute w-7 h-7 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
                          animation: 'fadeResume 8s ease-in-out infinite'
                        }}
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <path d="M14 2v6h6"/>
                        <path d="M8 13h8"/>
                        <path d="M8 17h8"/>
                        <path d="M8 9h2"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Brand name and tagline */}
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-0.5">
                    <span 
                      className="text-2xl font-black tracking-tight transition-all duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundImage: `linear-gradient(90deg, 
                          #FF6B6B 0%, 
                          #FFA500 20%, 
                          #FFD700 40%, 
                          #32CD32 60%, 
                          #00CED1 80%, 
                          #1E90FF 100%)`,
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'gradientShift 3s ease infinite'
                      }}
                    >
                      InfCV
                    </span>
                  </div>
                  <div className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
                    <span style={{ color: theme.accent }}>∞</span>
                    {['I', 'n', 'f', 'i', 'n', 'i', 't', 'e', ' ', 'P', 'o', 's', 's', 'i', 'b', 'i', 'l', 'i', 't', 'i', 'e', 's'].map((letter, index) => {
                      const colors = [
                        '#FF6B6B', '#FFA500', '#FFD700', '#32CD32', '#00CED1', 
                        '#1E90FF', '#9370DB', '#FF1493', '#FF6B6B', '#FFA500',
                        '#FFD700', '#32CD32', '#00CED1', '#1E90FF', '#9370DB',
                        '#FF1493', '#FF6B6B', '#FFA500', '#FFD700', '#32CD32', '#00CED1', '#1E90FF'
                      ]
                      return (
                        <span
                          key={index}
                          style={{
                            color: colors[index % colors.length],
                            animation: `fadeInUp 0.5s ease forwards`,
                            animationDelay: `${index * 0.05}s`,
                            opacity: 0,
                            display: 'inline-block'
                          }}
                        >
                          {letter === ' ' ? '\u00A0' : letter}
                        </span>
                      )
                    })}
                  </div>
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
                  href="/pricing" 
                  className="group relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.textSecondary }}
                >
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <svg className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="relative z-10">Pricing</span>
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
                        {/* <div className="px-2 py-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Theme</p>
                          <ThemeSwitcher compact />
                        </div> */}
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
