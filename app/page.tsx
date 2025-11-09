import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, FileText, Shield, Sparkles, Zap, Workflow, Star, CheckCircle, Users, Clock, Eye, LayoutTemplate, User } from "lucide-react"
import { FloatingShapes } from "@/components/decorative-shapes"

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg)' }}>
      {/* FlowCV-style Hero Section */}
      <section className="section-flowcv relative overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50/30 to-white pt-24">
        {/* Decorative elements - Figma-inspired stripes and shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Purple diagonal stripes from Figma */}
          <div className="absolute top-0 left-10 w-2 h-40 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
          <div className="absolute top-20 left-32 w-2 h-32 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-50" />
          <div className="absolute top-10 left-56 w-2 h-48 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-40" />
          
          <div className="absolute top-0 right-10 w-2 h-40 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
          <div className="absolute top-20 right-32 w-2 h-32 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-50" />
          <div className="absolute top-10 right-56 w-2 h-48 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-40" />
          
          {/* Top left gradient blob */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl" />
          
          {/* Top right shapes */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl rotate-12 opacity-20 animate-float" />
          <div className="absolute top-40 right-40 w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
          
          {/* Bottom decorations */}
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-3xl rotate-45 blur-xl" />
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl -rotate-12 opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container-flowcv relative z-10">
          <div className="text-center space-y-8">
            {/* Micro Heading */}
            <div className="heading-xs" style={{ color: 'var(--figma-accent-purple)' }}>
              ✨ Free Online Resume Builder
            </div>
            
            {/* Main Headline with Figma-inspired accent */}
            <h1 className="heading-6xl max-w-4xl mx-auto" style={{ color: 'var(--figma-primary)' }}>
              A massive library of free{' '}
              <span className="relative inline-block">
                <span style={{ color: 'var(--figma-accent-purple)' }}>CV templates</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 2 150 6 200 4" stroke="var(--figma-accent-purple)" strokeWidth="2" opacity="0.3"/>
                </svg>
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-flowcv-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Build a beautiful resume in minutes with our AI-powered builder. Choose from professional templates, 
              customize with ease, and download instantly.
            </p>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/dashboard/cvs" 
                className="group relative px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: 'var(--figma-accent-purple)',
                  color: 'white'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create My Resume
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="/dashboard/templates" 
                className="px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all hover:scale-105 hover:shadow-lg bg-white"
                style={{ 
                  borderColor: 'var(--figma-accent-purple)',
                  color: 'var(--figma-accent-purple)'
                }}
              >
                Browse Templates
              </Link>
            </div>
          </div>
          
          {/* Hero Image with Floating Comment Cards */}
          <div className="relative mt-16 flex justify-center">
            {/* Main Hero Image Container */}
            <div className="relative max-w-4xl">
              {/* Main Resume Preview - Enhanced */}
              <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 p-10 max-w-2xl mx-auto relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full blur-3xl" />
                
                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-flowcv-brand-purple rounded-full mx-auto flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="heading-2xl">Sarah Johnson</h3>
                    <p className="text-flowcv-gray-600">Senior Product Designer</p>
                  </div>
                  
                  {/* Content Blocks */}
                  <div className="space-y-4">
                    <div className="h-3 bg-flowcv-brand-purple/20 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {['UI/UX Design', 'Figma', 'React', 'TypeScript'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-flowcv-brand-purple/10 text-flowcv-brand-purple rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Comment Card 1 - Enhanced */}
              <div className="absolute -left-12 top-16 hidden lg:block animate-float">
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-5 max-w-xs backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-flowcv-ink text-base">ATS Optimized</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-flowcv-gray-600 text-sm leading-relaxed">
                        Your resume passes through applicant tracking systems with <span className="font-semibold text-green-600">95% success rate</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Comment Card 2 - Enhanced */}
              <div className="absolute -right-12 bottom-16 hidden lg:block animate-float" style={{animationDelay: '1s'}}>
                <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-100 p-5 max-w-xs backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-flowcv-ink text-base">AI-Powered</span>
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-semibold">
                          ✨ Smart
                        </span>
                      </div>
                      <p className="text-flowcv-gray-600 text-sm leading-relaxed">
                        Get <span className="font-semibold" style={{ color: 'var(--figma-accent-purple)' }}>AI suggestions</span> for skills, experience, and achievements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FlowCV-style Three Features Section - Enhanced */}
      <section className="section-flowcv relative overflow-hidden bg-gradient-to-b from-white to-purple-50/30">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        
        <div className="container-flowcv relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4">
              ✨ Why Choose Us
            </div>
            <h2 className="heading-4xl mb-4" style={{ color: 'var(--figma-primary)' }}>
              Everything you need to{' '}
              <span style={{ color: 'var(--figma-accent-purple)' }}>stand out</span>
            </h2>
            <p className="text-lg text-flowcv-gray-600 max-w-2xl mx-auto">
              Professional tools designed to help you create the perfect resume
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="heading-2xl" style={{ color: 'var(--figma-primary)' }}>Professional Templates</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Choose from dozens of expertly designed templates. Each one is ATS-friendly and optimized for modern hiring processes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="heading-2xl" style={{ color: 'var(--figma-primary)' }}>AI-Powered Builder</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Let AI help you write compelling content. Get smart suggestions for skills, experience, and achievements that impress.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                  <Download className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="heading-2xl" style={{ color: 'var(--figma-primary)' }}>Instant Download</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Download your resume as a high-quality PDF instantly. Print-ready and perfect for both digital and physical applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section-flowcv" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <div className="container-flowcv">
          <div className="text-center space-y-4 mb-16">
            <div className="heading-xs text-flowcv-brand">How It Works</div>
            <h2 className="heading-4xl max-w-3xl mx-auto">
              Create your resume in 3 simple steps
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Choose Your Template</h3>
                  <p className="text-flowcv-gray-600">
                    Browse our collection of professional templates and pick the one that matches your style and industry.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Fill in Your Details</h3>
                  <p className="text-flowcv-gray-600">
                    Add your personal information, work experience, education, and skills using our easy-to-use form builder.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Download & Apply</h3>
                  <p className="text-flowcv-gray-600">
                    Preview your resume, make final adjustments, and download as a PDF. You're ready to start applying!
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/dashboard/cvs" className="btn-flowcv-primary btn-large">
                  Get Started Now
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-flowcv-large border border-gray-100 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1 flex-1">
                      <div className="h-4 bg-flowcv-brand-purple/20 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-flowcv-brand-purple/20 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-flowcv-brand-purple/10 rounded-full">
                      <div className="h-3 bg-flowcv-brand-purple/40 rounded w-12"></div>
                    </div>
                    <div className="px-3 py-1 bg-flowcv-brand-purple/10 rounded-full">
                      <div className="h-3 bg-flowcv-brand-purple/40 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FlowCV-style CTA Section */}
      <section className="section-flowcv" style={{ backgroundColor: 'var(--theme-bg-secondary)' }}>
        <div className="container-flowcv text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="heading-4xl">
                Ready to create your professional resume?
              </h2>
              <p className="text-flowcv-gray-600 text-lg leading-relaxed">
                Join thousands of job seekers who have successfully landed their dream jobs using our resume builder.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard/cvs" className="btn-flowcv-primary btn-large">
                Create My Resume
              </Link>
              <Link href="/dashboard/templates" className="btn-flowcv-secondary btn-large">
                View Templates
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-flowcv-gray-530">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">10,000+ users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">5 min setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FlowCV-style Footer */}
      <footer className="border-t" style={{ backgroundColor: 'var(--theme-bg-secondary)', borderColor: 'var(--theme-border)' }}>
        <div className="container-flowcv py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CV</span>
                </div>
                <span className="heading-xl text-flowcv-ink">CV Helper</span>
              </div>
              <p className="text-flowcv-gray-600 text-sm leading-relaxed">
                Create professional resumes that get you hired. Fast, easy, and ATS-friendly.
              </p>
            </div>
            
            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold text-flowcv-ink">Product</h4>
              <div className="space-y-2">
                <Link href="/dashboard/builder" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Resume Builder
                </Link>
                <Link href="/dashboard/templates" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Templates
                </Link>
                <Link href="/about" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  About
                </Link>
              </div>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-semibold text-flowcv-ink">Resources</h4>
              <div className="space-y-2">
                <Link href="/discover" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Career Tips
                </Link>
                <Link href="#" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Resume Examples
                </Link>
                <Link href="#" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Help Center
                </Link>
              </div>
            </div>
            
            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-flowcv-ink">Company</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-flowcv-gray-600 hover:text-flowcv-ink transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-flowcv-gray-530 text-sm">
              © {new Date().getFullYear()} CV Helper. All rights reserved.
            </p>
            <p className="text-flowcv-gray-530 text-sm">
              Built with Next.js • Powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

