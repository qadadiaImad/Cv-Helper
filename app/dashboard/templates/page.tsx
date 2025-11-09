"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TemplateGallery } from "@/components/template-gallery"
import { useTheme } from "@/lib/theme-context"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function TemplateLibraryPage() {
  const router = useRouter()
  const { theme } = useTheme()

  const handleSelectTemplate = (templateId: string) => {
    // Redirect to CV management page to create a new CV with this template
    router.push(`/dashboard/cvs`)
  }

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-300 pt-20 relative overflow-hidden" 
      style={{ 
        background: `linear-gradient(to bottom right, ${theme.bg}, ${theme.bgSecondary})`
      }}
      suppressHydrationWarning
    >
      {/* MANY Decorative Background Shapes with Theme Colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient blobs */}
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}40, ${theme.accent}20)`
          }}
        />
        <div 
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}30, ${theme.accent}15)`
          }}
        />
        <div 
          className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ 
            background: `linear-gradient(to bottom right, ${theme.accent}25, ${theme.accent}15)`
          }}
        />
        
        {/* Diagonal stripes */}
        <div className="absolute top-20 left-32 w-2 h-52 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-50" />
        <div className="absolute bottom-32 right-40 w-2 h-48 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full rotate-45 opacity-45" />
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 right-24 w-44 h-60 bg-gradient-to-br from-purple-300/35 to-purple-400/35 rounded-3xl rotate-15 shadow-xl" />
        <div className="absolute bottom-1/4 left-24 w-40 h-40 bg-gradient-to-br from-pink-300/40 to-pink-400/40 rounded-full shadow-2xl" />
        <div className="absolute top-1/2 right-1/3 w-36 h-52 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-2xl -rotate-12 shadow-lg" />
      </div>

      {/* Main Content - Centered Modal-like Container */}
      <main className="overflow-y-auto px-4 py-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header - Modal Style */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
                }}
              >
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold transition-colors" style={{ color: theme.text }} suppressHydrationWarning>
                  Choose a Template
                </h1>
                <p className="text-sm transition-colors" style={{ color: theme.textSecondary }} suppressHydrationWarning>
                  Select a professional template to start building your resume
                </p>
              </div>
            </div>
            <Link href="/dashboard/builder">
              <Button variant="ghost" size="icon" className="transition-colors" style={{ color: theme.text }} suppressHydrationWarning>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Template Gallery */}
          <TemplateGallery
            selectedTemplateId={undefined}
            onTemplateSelect={handleSelectTemplate}
          />
        </div>
      </main>
    </div>
  )
}
