import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, FileText, Shield, Sparkles, Zap, Workflow } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-aurora text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 surface-high-contrast">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 animate-float">
                <FileText className="h-6 w-6 text-white dark:text-slate-900" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">RealCV Studio</p>
                <h1 className="text-2xl font-semibold text-high-contrast">Craft resumes that glow</h1>
              </div>
            </div>
            <nav className="flex items-center gap-3">
              <Link href="/templates" className="hidden md:block">
                <Button variant="ghost" className="surface-glass-accessible border border-border/60 text-high-contrast">
                  Explore templates
                </Button>
              </Link>
              <Link href="/dashboard/builder">
                <Button className="btn-accessible-primary">
                  Launch builder
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pb-24 pt-16 text-center">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full surface-glass-accessible px-5 py-2 text-sm font-medium text-high-contrast animate-float">
              <Sparkles className="h-4 w-4" />
              Powered by AI + React templates
            </div>
            <h2 className="text-balance text-4xl font-semibold leading-tight text-high-contrast md:text-6xl">
              Design a resume that speaks with{" "}
              <span className="relative text-high-contrast">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-sm"></span>
                <span className="relative font-bold">clarity and flair</span>
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-balance text-lg text-muted-foreground md:text-xl">
              Orchestrate your career story with live previews, cinematic animations, and export-ready PDFs. Every
              detail is polished so you can focus on landing the role you want.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard/builder" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-full btn-accessible-primary text-lg tracking-wide">
                Start building now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full surface-glass-accessible border-slate-300 dark:border-slate-600 text-high-contrast bg-transparent"
              >
                Browse template gallery
              </Button>
            </Link>
          </div>

          <div className="relative mx-auto flex max-w-5xl items-center justify-center">
            <div className="surface-high-contrast w-full rounded-3xl border border-primary/20 p-1">
              <div className="rounded-[26px] bg-background/95 p-6 shadow-2xl shadow-primary/20">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-4 text-left">
                    <h3 className="text-2xl font-semibold text-high-contrast">Curated template OS</h3>
                    <p className="text-muted-foreground">
                      Switch between polished layouts instantly, preview changes live, and export razor-sharp PDFs
                      without leaving your browser.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["One-click themes", "ATS friendly", "Real-time preview", "AI adaptation"].map((chip) => (
                        <span
                          key={chip}
                          className="surface-glass-accessible border border-primary/30 px-3 py-1 rounded-full text-sm text-high-contrast font-medium"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute -inset-6 rounded-[34px] bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20 blur-2xl" />
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-primary/30 surface-glass-accessible">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="h-20 w-20 text-primary/70" />
                      </div>
                      <div className="absolute inset-0 bg-grid opacity-40" />
                      <div className="absolute inset-x-6 top-6 rounded-2xl border border-border/60 surface-glass-accessible p-4 text-left">
                        <p className="text-sm font-semibold text-high-contrast">Preview • Elegant Black</p>
                        <div className="mt-3 h-32 rounded-xl border border-border/40 bg-muted/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-semibold md:text-4xl">Why designers & engineers trust RealCV</h3>
          <p className="mt-4 text-lg text-muted-foreground">
            From academic dossiers to design portfolios, you get flexible building blocks, automation, and total control
            over your personal branding.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Signature templates"
            description="Select from art-directed layouts inspired by proven open-source CV frameworks and tuned for ATS readability."
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-accent" />}
            title="AI blending"
            description="Fuse saved profiles, job descriptions, and portfolio links. Our AI assistant adapts tone and highlights to each opportunity."
          />
          <FeatureCard
            icon={<Workflow className="h-8 w-8 text-primary" />}
            title="Profile vaults"
            description="Store multiple personas—consultant, academic, creator—and switch context instantly without rewriting your story."
          />
          <FeatureCard
            icon={<Download className="h-8 w-8 text-primary" />}
            title="Pixel-perfect exports"
            description="Generate PDFs, JSON, or LaTeX sources on demand. Every render is retina-ready and print safe."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-accent" />}
            title="Realtime editing"
            description="Stay in flow with instant previews, keyboard-friendly inputs, and autosaving that never interrupts your momentum."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Secure workspace"
            description="All input stays encrypted in-memory with optional account sync. Export and delete with one click."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-24">
        <Card className="surface-high-contrast max-w-5xl mx-auto overflow-hidden border border-primary/30 text-center">
          <CardHeader className="space-y-3">
            <CardTitle className="text-3xl md:text-4xl text-high-contrast">
              Build a resume that moves hiring teams
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Join product designers, engineers, and leaders enhancing their applications with our intelligent CV
              studio.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <Link href="/dashboard/builder">
              <Button size="lg" className="rounded-full btn-accessible-primary">
                Go to dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full surface-glass-accessible border border-border/60 text-high-contrast"
              >
                Tour the library
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 surface-high-contrast">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="text-sm uppercase tracking-[0.35em] text-muted-foreground">RealCV</span>
              <p className="text-sm text-muted-foreground/90">Next.js • Tailwind • AI-assisted editing</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} RealCV Studio. Crafted for ambitious builders.
          </p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="surface-high-contrast h-full border border-border/40 text-left transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">{icon}</div>
        <CardTitle className="text-xl font-semibold text-high-contrast">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
