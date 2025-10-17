"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, RefreshCw } from "lucide-react"

type ApiUser = { id: string; name: string; email: string }

export function SiteHeader() {
  const [user, setUser] = React.useState<ApiUser | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

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
      {/* FlowCV-style Header */}
      <header className="sticky top-0 z-50 w-full">
        <div className="bg-flowcv-sand px-4 py-3">
          <div className="container-flowcv">
            <div className="bg-white rounded-2xl shadow-flowcv-soft border border-gray-100/50 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CV</span>
                  </div>
                  <span className="heading-xl text-flowcv-ink">CV Helper</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                  <Link 
                    href="/" 
                    className="text-flowcv-gray-600 hover:text-flowcv-ink transition-colors duration-200 font-medium text-sm"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/dashboard/templates" 
                    className="text-flowcv-gray-600 hover:text-flowcv-ink transition-colors duration-200 font-medium text-sm"
                  >
                    Templates
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-flowcv-gray-600 hover:text-flowcv-ink transition-colors duration-200 font-medium text-sm"
                  >
                    About
                  </Link>
                  <Link 
                    href="/discover" 
                    className="text-flowcv-gray-600 hover:text-flowcv-ink transition-colors duration-200 font-medium text-sm"
                  >
                    Discover
                  </Link>
                </nav>

                {/* Desktop CTA Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  {user ? (
                    <div className="flex items-center gap-3">
                      {/* User Info */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-flowcv-gray-600" />
                        <div className="text-sm">
                          <div className="font-medium text-flowcv-ink">{user.name}</div>
                          <div className="text-xs text-flowcv-gray-530">{user.email}</div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <Link href="/dashboard/builder" className="btn-flowcv-secondary">
                        Dashboard
                      </Link>
                      
                      <button 
                        onClick={fetchMe} 
                        disabled={loading}
                        className="p-2 text-flowcv-gray-600 hover:text-flowcv-ink transition-colors"
                        title="Refresh"
                      >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      </button>
                      
                      <button 
                        onClick={handleLogout} 
                        disabled={loading}
                        className="p-2 text-flowcv-gray-600 hover:text-red-600 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link href="/login" className="btn-flowcv-secondary">
                        Login
                      </Link>
                      <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
                        Start Building
                      </Link>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-flowcv-gray-600 hover:text-flowcv-ink transition-colors"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-flowcv-large">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="heading-xl text-flowcv-ink">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-flowcv-gray-600 hover:text-flowcv-ink transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-flowcv-ink font-medium text-lg hover:text-flowcv-brand transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/dashboard/templates" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-flowcv-ink font-medium text-lg hover:text-flowcv-brand transition-colors"
                  >
                    Templates
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-flowcv-ink font-medium text-lg hover:text-flowcv-brand transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="/discover" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-flowcv-ink font-medium text-lg hover:text-flowcv-brand transition-colors"
                  >
                    Discover
                  </Link>
                </div>
              </nav>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-100">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-flowcv-gray-600" />
                      <div>
                        <div className="font-medium text-flowcv-ink">{user.name}</div>
                        <div className="text-sm text-flowcv-gray-530">{user.email}</div>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard/builder" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-flowcv-primary w-full justify-center"
                    >
                      Dashboard
                    </Link>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { fetchMe(); setMobileMenuOpen(false); }} 
                        disabled={loading}
                        className="btn-flowcv-secondary flex-1 justify-center"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                      </button>
                      <button 
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                        disabled={loading}
                        className="btn-flowcv-secondary flex-1 justify-center text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-flowcv-secondary w-full justify-center"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/dashboard/builder" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-flowcv-primary w-full justify-center btn-large"
                    >
                      Start Building
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
