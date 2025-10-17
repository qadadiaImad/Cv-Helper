import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award, Zap, Shield, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-flowcv-sand">
      {/* Hero Section */}
      <section className="section-flowcv">
        <div className="container-flowcv text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="heading-xs text-flowcv-brand">About CV Helper</div>
              <h1 className="heading-5xl">
                We're building the future of resume creation
              </h1>
              <p className="text-flowcv-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                CV Helper empowers job seekers with professional, ATS-friendly resume templates and an intuitive builder. 
                Our mission is to make creating standout resumes accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="section-flowcv bg-white">
        <div className="container-flowcv">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="heading-4xl text-flowcv-brand-purple">10,000+</div>
              <p className="text-flowcv-gray-600 font-medium">Resumes Created</p>
            </div>
            <div className="space-y-2">
              <div className="heading-4xl text-flowcv-brand-purple">95%</div>
              <p className="text-flowcv-gray-600 font-medium">ATS Pass Rate</p>
            </div>
            <div className="space-y-2">
              <div className="heading-4xl text-flowcv-brand-purple">4.9/5</div>
              <p className="text-flowcv-gray-600 font-medium">User Rating</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="section-flowcv">
        <div className="container-flowcv">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="heading-xs text-flowcv-brand">Our Story</div>
                <h2 className="heading-3xl">
                  Born from the frustration of outdated resume tools
                </h2>
              </div>
              <div className="space-y-4 text-flowcv-gray-600 leading-relaxed">
                <p>
                  We started CV Helper because we experienced firsthand how difficult it was to create a professional 
                  resume that actually gets past applicant tracking systems and impresses hiring managers.
                </p>
                <p>
                  Traditional resume builders were either too basic, too expensive, or produced documents that looked 
                  outdated. We knew there had to be a better way.
                </p>
                <p>
                  Today, CV Helper combines modern design principles with ATS optimization, giving job seekers the 
                  tools they need to stand out in a competitive market.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-flowcv-large border border-gray-100 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-flowcv-brand-purple rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-flowcv-ink">Our Mission</h3>
                      <p className="text-sm text-flowcv-gray-600">Democratize professional resume creation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-flowcv-feature-blue rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-flowcv-ink">Our Vision</h3>
                      <p className="text-sm text-flowcv-gray-600">Every job seeker deserves a standout resume</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-flowcv-green-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-flowcv-ink">Our Values</h3>
                      <p className="text-sm text-flowcv-gray-600">Quality, accessibility, and user success</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-flowcv bg-white">
        <div className="container-flowcv">
          <div className="text-center space-y-4 mb-16">
            <div className="heading-xs text-flowcv-brand">What Makes Us Different</div>
            <h2 className="heading-4xl max-w-3xl mx-auto">
              Built for the modern job market
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-flowcv-feature">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-feature-blue rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed">
                  Create a professional resume in under 5 minutes. Our streamlined interface gets you from blank page to polished document quickly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-flowcv-feature">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-feature-blue rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl">ATS Optimized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed">
                  All our templates are tested against major ATS systems to ensure your resume gets seen by human recruiters.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-flowcv-feature">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-feature-blue rounded-xl flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl">Global Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed">
                  Our templates follow international best practices and can be adapted for different countries and industries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-flowcv">
        <div className="container-flowcv text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="heading-4xl">
                Ready to create your professional resume?
              </h2>
              <p className="text-flowcv-gray-600 text-lg leading-relaxed">
                Join thousands of job seekers who have successfully landed their dream jobs using CV Helper.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
                Start Building Now
              </Link>
              <Link href="/dashboard/templates" className="btn-flowcv-secondary btn-large">
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-flowcv-cream-dark border-t border-gray-200">
        <div className="container-flowcv py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <span className="heading-xl text-flowcv-ink">CV Helper</span>
            </div>
            <p className="text-flowcv-gray-530 text-sm">
              © {new Date().getFullYear()} CV Helper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
