import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Zap, Download, Shield, Sparkles, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between font-sans">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">{"RealCV"}</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard/builder">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance opacity-90 border-4 border-dashed border-foreground font-serif">
              Professional React Resumes
              <span className="text-primary">  Made Simple</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto text-center">
              Create stunning resumes with modern React templates. Real-time preview and instant PDF export with professional designs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/builder">
              <Button size="lg" className="text-lg px-8">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Why Choose FlowCV?</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional resume creation with the power of LaTeX and the intelligence of AI
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Professional Templates"
            description="Choose from carefully crafted LaTeX templates designed by professionals. Each template is ATS-friendly and follows industry best practices."
          />

          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-primary" />}
            title="AI-Powered Adaptation"
            description="Upload your existing CV and a job description. Our AI will automatically tailor your resume to match the job requirements."
          />

          <FeatureCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Instant Compilation"
            description="See your changes in real-time with our fast LaTeX compilation engine. No need to install anything locally."
          />

          <FeatureCard
            icon={<Download className="h-8 w-8 text-primary" />}
            title="Multiple Export Formats"
            description="Export your resume as PDF, LaTeX source code, or JSON data. Perfect for version control and customization."
          />

          <FeatureCard
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Secure & Private"
            description="Your data is processed securely with strict privacy controls. No data is stored permanently on our servers."
          />

          <FeatureCard
            icon={<FileText className="h-8 w-8 text-primary" />}
            title="Open Source Templates"
            description="All templates are based on popular open-source LaTeX resume templates with proper attribution and MIT licensing."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Create Your Perfect Resume?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of professionals who trust FlowCV for their career success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/builder">
              <Button size="lg" className="text-lg px-8">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold">FlowCV</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with Next.js, LaTeX, and AI. Open source templates with proper attribution.
            </p>
          </div>
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
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
