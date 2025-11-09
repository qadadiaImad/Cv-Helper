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
    <div className="flex h-screen w-full flex-col lg:flex-row transition-colors duration-300 pt-20" style={{ backgroundColor: theme.bg }} suppressHydrationWarning>
      {/* Left Sidebar */}
      <aside className="w-full lg:sticky lg:top-0 lg:h-screen lg:w-[200px] lg:min-w-[200px] xl:w-[240px] xl:min-w-[240px] px-6 py-6 lg:px-8 transition-colors duration-300 flex flex-col" style={{ backgroundColor: theme.sidebar }} suppressHydrationWarning>
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CV</span>
          </div>
          <span className="text-xl font-semibold transition-colors duration-300" style={{ color: theme.text }} suppressHydrationWarning>flowcv</span>
        </Link>
        
        <nav className="space-y-2">
          <Link href="/dashboard/templates">
            <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-white text-flowcv-ink shadow-sm">
              Templates
            </button>
          </Link>
          <Link href="/dashboard/builder">
            <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-flowcv-gray-600 hover:bg-white/50 transition-colors">
              Builder
            </button>
          </Link>
          <Link href="/dashboard/personal">
            <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-flowcv-gray-600 hover:bg-white/50 transition-colors">
              Profile
            </button>
          </Link>
        </nav>

        <div className="mt-8 pt-8 border-t" style={{ borderColor: theme.border }} suppressHydrationWarning>
          <button className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors" style={{ color: theme.text }} suppressHydrationWarning>
            More
          </button>
        </div>

        {/* Theme Controls - Pushed to bottom */}
        <div className="mt-auto pt-8">
          <ThemeSwitcher />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard/builder">
              <Button variant="ghost" className="mb-4 transition-colors" style={{ color: theme.text }} suppressHydrationWarning>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to builder
              </Button>
            </Link>
            <h1 className="text-3xl font-bold mb-2 transition-colors" style={{ color: theme.text }} suppressHydrationWarning>
              Choose a Template
            </h1>
            <p className="transition-colors" style={{ color: theme.textSecondary }} suppressHydrationWarning>
              Browse our collection of professional resume templates. Click any template to start building.
            </p>
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
