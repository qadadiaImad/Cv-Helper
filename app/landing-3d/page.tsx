import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Download, 
  FileText, 
  Sparkles, 
  Zap, 
  Users, 
  Star,
  CheckCircle,
  LayoutTemplate,
  Clock
} from 'lucide-react'
import { LandingHero3D, EmailCTASection } from '@/components/landing-hero-3d'
import { Shape3D } from '@/components/decorative-shapes'

export default function Landing3DPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Design */}
      <LandingHero3D />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--figma-primary)' }}>
              Everything you need to{' '}
              <span style={{ color: 'var(--figma-accent-purple)' }}>stand out</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--figma-body)' }}>
              Professional tools designed to help you create the perfect resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center space-y-4 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" style={{ backgroundColor: 'var(--figma-accent-purple)' }} />
                <div 
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ backgroundColor: 'var(--figma-accent-purple)' }}
                >
                  <LayoutTemplate className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--figma-primary)' }}>
                Professional Templates
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--figma-body)' }}>
                Choose from dozens of expertly designed templates. Each one is ATS-friendly and optimized for modern hiring.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center space-y-4 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity bg-pink-400" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--figma-primary)' }}>
                AI-Powered Builder
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--figma-body)' }}>
                Let AI help you write compelling content. Get suggestions for skills, experience, and achievements.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center space-y-4 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity bg-blue-400" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Download className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--figma-primary)' }}>
                Instant Download
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--figma-body)' }}>
                Download your resume as a high-quality PDF instantly. Print-ready and perfect for applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--figma-bg-gradient-pink)' }}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--figma-accent-purple)' }}>
                50K+
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--figma-body)' }}>
                Resumes Created
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--figma-accent-purple)' }}>
                95%
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--figma-body)' }}>
                ATS Success Rate
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--figma-accent-purple)' }}>
                4.9
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--figma-body)' }}>
                Average Rating
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: 'var(--figma-accent-purple)' }}>
                5min
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--figma-body)' }}>
                Average Setup Time
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Shape3D variant="purple" size="lg" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <Shape3D variant="pink" size="md" />
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--figma-accent-purple)' }}>
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--figma-primary)' }}>
              Create your resume in 3 simple steps
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white"
                style={{ backgroundColor: 'var(--figma-accent-purple)' }}
              >
                1
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--figma-primary)' }}>
                  Choose Your Template
                </h3>
                <p className="text-lg" style={{ color: 'var(--figma-body)' }}>
                  Browse our collection of professional templates and pick the one that matches your style and industry.
                </p>
              </div>
              <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                <LayoutTemplate className="h-20 w-20" style={{ color: 'var(--figma-accent-purple)' }} />
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white"
                style={{ backgroundColor: 'var(--figma-accent-purple)' }}
              >
                2
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--figma-primary)' }}>
                  Fill in Your Details
                </h3>
                <p className="text-lg" style={{ color: 'var(--figma-body)' }}>
                  Add your information with our intuitive form builder. AI assists you with content suggestions.
                </p>
              </div>
              <div className="w-48 h-48 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                <FileText className="h-20 w-20" style={{ color: 'var(--figma-accent-purple)' }} />
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white"
                style={{ backgroundColor: 'var(--figma-accent-purple)' }}
              >
                3
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--figma-primary)' }}>
                  Download & Apply
                </h3>
                <p className="text-lg" style={{ color: 'var(--figma-body)' }}>
                  Preview your resume, make final adjustments, and download as PDF. You're ready to apply!
                </p>
              </div>
              <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <Download className="h-20 w-20" style={{ color: 'var(--figma-accent-purple)' }} />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/dashboard/cvs">
              <Button 
                size="lg"
                className="px-8 py-6 text-lg rounded-full"
                style={{ 
                  backgroundColor: 'var(--figma-accent-purple)',
                  color: 'white'
                }}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Email CTA Section */}
      <EmailCTASection />
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--figma-accent-purple)' }}
                >
                  <span className="text-white font-bold text-lg">CV</span>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--figma-primary)' }}>
                  CV Helper
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--figma-body)' }}>
                Create professional resumes that get you hired.
              </p>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--figma-primary)' }}>
                Product
              </h4>
              <div className="space-y-2">
                <Link href="/dashboard/builder" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Resume Builder
                </Link>
                <Link href="/dashboard/templates" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Templates
                </Link>
                <Link href="/about" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  About
                </Link>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--figma-primary)' }}>
                Resources
              </h4>
              <div className="space-y-2">
                <Link href="/discover" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Career Tips
                </Link>
                <Link href="#" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Resume Examples
                </Link>
                <Link href="#" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Help Center
                </Link>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--figma-primary)' }}>
                Company
              </h4>
              <div className="space-y-2">
                <Link href="#" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Terms of Service
                </Link>
                <Link href="#" className="block text-sm hover:underline" style={{ color: 'var(--figma-body)' }}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t text-center">
            <p className="text-sm" style={{ color: 'var(--figma-body)' }}>
              © {new Date().getFullYear()} CV Helper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
