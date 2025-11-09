import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { FigmaHeader } from "@/components/figma-header"
import { GlobalBackground } from "@/components/global-background"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/lib/theme-context"
import { ThemeWrapper } from "@/components/theme-wrapper"

export const metadata: Metadata = {
  title: "FlowCV - Professional LaTeX Resume Builder",
  description:
    "Create stunning, ATS-friendly resumes with professional LaTeX templates. AI-powered adaptation to match any job description.",
  generator: "FlowCV",
  keywords: ["resume", "cv", "latex", "professional", "ats-friendly", "job application", "career"],
  authors: [{ name: "FlowCV Team" }],
  creator: "FlowCV",
  publisher: "FlowCV",
  openGraph: {
    title: "FlowCV - Professional LaTeX Resume Builder",
    description: "Create stunning, ATS-friendly resumes with professional LaTeX templates",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowCV - Professional LaTeX Resume Builder",
    description: "Create stunning, ATS-friendly resumes with professional LaTeX templates",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <ThemeWrapper>
            {/* Main wrapper with relative positioning for GlobalBackground */}
            <div className="relative min-h-screen">
              {/* Global Figma-style background on all pages */}
              <GlobalBackground />
              
              {/* Header and content */}
              <div className="relative" style={{ zIndex: 10 }}>
                <FigmaHeader />
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </div>
            
            <Analytics />
            <Toaster richColors closeButton />
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
