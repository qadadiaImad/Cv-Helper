import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Download, FileText, Shield, Sparkles, Zap, Workflow, Star, CheckCircle, Users, Clock, Eye, LayoutTemplate, User } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-flowcv-sand">
      {/* FlowCV-style Hero Section */}
      <section className="section-flowcv relative overflow-hidden">
        <div className="container-flowcv">
          <div className="text-center space-y-8">
            {/* Micro Heading */}
            <div className="heading-xs text-flowcv-brand">Free Online Resume Builder</div>
            
            {/* Main Headline */}
            <h1 className="heading-6xl max-w-4xl mx-auto">
              Create a professional resume that gets you hired
            </h1>
            
            {/* Subheading */}
            <p className="text-flowcv-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Build a beautiful resume in minutes with our AI-powered builder. Choose from professional templates, 
              customize with ease, and download instantly.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
                Create My Resume
              </Link>
              <Link href="/dashboard/templates" className="btn-flowcv-secondary btn-large">
                Browse Templates
              </Link>
            </div>
          </div>
          
          {/* Hero Image with Floating Comment Cards */}
          <div className="relative mt-16 flex justify-center">
            {/* Main Hero Image Container */}
            <div className="relative max-w-4xl">
              {/* Main Resume Preview */}
              <div className="bg-white rounded-2xl shadow-flowcv-hero border border-gray-100 p-8 max-w-2xl mx-auto">
                <div className="space-y-6">
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
              
              {/* Floating Comment Card 1 */}
              <div className="absolute -left-8 top-16 hidden lg:block animate-float">
                <div className="bg-white rounded-2xl shadow-flowcv-comment border border-gray-100 p-4 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-flowcv-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-flowcv-ink text-sm">ATS Optimized</span>
                        <div className="flex">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-flowcv-gray-600 text-xs leading-relaxed">
                        Your resume passes through applicant tracking systems with 95% success rate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Comment Card 2 */}
              <div className="absolute -right-8 bottom-16 hidden lg:block animate-float" style={{animationDelay: '1s'}}>
                <div className="bg-white rounded-2xl shadow-flowcv-comment border border-gray-100 p-4 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-flowcv-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-flowcv-ink text-sm">Live Preview</span>
                        <span className="px-2 py-0.5 bg-flowcv-brand-purple/10 text-flowcv-brand-purple rounded text-xs font-medium">
                          Real-time
                        </span>
                      </div>
                      <p className="text-flowcv-gray-600 text-xs leading-relaxed">
                        See changes instantly as you type. No more guessing how it looks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FlowCV-style Three Features Section */}
      <section className="section-flowcv bg-white">
        <div className="container-flowcv">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-flowcv-feature-blue rounded-2xl flex items-center justify-center mx-auto">
                <LayoutTemplate className="h-8 w-8 text-white" />
              </div>
              <h3 className="heading-2xl">Professional Templates</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Choose from dozens of expertly designed templates. Each one is ATS-friendly and optimized for modern hiring processes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-flowcv-feature-blue rounded-2xl flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="heading-2xl">Easy to Use</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Our intuitive builder makes creating a professional resume simple. No design experience required – just fill in your details.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-flowcv-feature-blue rounded-2xl flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="heading-2xl">Instant Download</h3>
              <p className="text-flowcv-gray-600 leading-relaxed">
                Download your resume as a high-quality PDF instantly. Print-ready and perfect for both digital and physical applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="section-flowcv">
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
                <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
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
      <section className="section-flowcv bg-white">
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
              <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
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
      <footer className="bg-flowcv-cream-dark border-t border-gray-200">
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

