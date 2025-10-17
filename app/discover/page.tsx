import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, TrendingUp, Users, Target, CheckCircle, ArrowRight, Clock, Star } from "lucide-react"

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-flowcv-sand">
      {/* Hero Section */}
      <section className="section-flowcv">
        <div className="container-flowcv text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <div className="heading-xs text-flowcv-brand">Career Resources</div>
              <h1 className="heading-5xl">
                Discover expert tips to accelerate your career
              </h1>
              <p className="text-flowcv-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                From resume writing best practices to interview preparation, explore our comprehensive guides 
                to help you land your dream job.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="section-flowcv bg-white">
        <div className="container-flowcv">
          <div className="text-center space-y-4 mb-16">
            <div className="heading-xs text-flowcv-brand">Featured Guides</div>
            <h2 className="heading-4xl max-w-3xl mx-auto">
              Essential career advice from industry experts
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Article 1 */}
            <Card className="card-flowcv-feature group cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-flowcv-brand-purple rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-530">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                </div>
                <CardTitle className="heading-2xl group-hover:text-flowcv-brand transition-colors">
                  How to Write a Resume That Gets Past ATS Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed mb-4">
                  Learn the insider secrets to optimizing your resume for applicant tracking systems. 
                  Discover the keywords, formatting, and structure that hiring managers actually look for.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-flowcv-gray-530">4.9 (2.1k reads)</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-flowcv-brand group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
            
            {/* Featured Article 2 */}
            <Card className="card-flowcv-feature group cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-flowcv-feature-blue rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-530">
                    <Clock className="h-4 w-4" />
                    <span>7 min read</span>
                  </div>
                </div>
                <CardTitle className="heading-2xl group-hover:text-flowcv-brand transition-colors">
                  2024 Resume Trends: What Hiring Managers Want to See
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed mb-4">
                  Stay ahead of the curve with the latest resume trends. From modern design elements to 
                  new sections that showcase your skills, discover what's working in today's job market.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-flowcv-gray-530">4.8 (1.8k reads)</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-flowcv-brand group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Resource Categories */}
      <section className="section-flowcv">
        <div className="container-flowcv">
          <div className="text-center space-y-4 mb-16">
            <div className="heading-xs text-flowcv-brand">Browse by Category</div>
            <h2 className="heading-4xl max-w-3xl mx-auto">
              Find exactly what you need
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resume Writing */}
            <Card className="card-flowcv-feature group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-brand-purple rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl group-hover:text-flowcv-brand transition-colors">
                  Resume Writing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed mb-4">
                  Master the art of resume writing with our comprehensive guides covering everything from structure to content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>ATS Optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Industry-Specific Tips</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Common Mistakes to Avoid</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Career Growth */}
            <Card className="card-flowcv-feature group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-feature-blue rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl group-hover:text-flowcv-brand transition-colors">
                  Career Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed mb-4">
                  Accelerate your career with strategies for professional development, networking, and skill building.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Networking Strategies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Skill Development</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Leadership Tips</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Interview Prep */}
            <Card className="card-flowcv-feature group cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 bg-flowcv-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="heading-xl group-hover:text-flowcv-brand transition-colors">
                  Interview Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-flowcv-gray-600 leading-relaxed mb-4">
                  Ace your interviews with proven techniques, common questions, and confidence-building strategies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Common Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>STAR Method</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-flowcv-gray-600">
                    <CheckCircle className="h-4 w-4 text-flowcv-green-600" />
                    <span>Virtual Interview Tips</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quick Tips */}
      <section className="section-flowcv bg-white">
        <div className="container-flowcv">
          <div className="text-center space-y-4 mb-16">
            <div className="heading-xs text-flowcv-brand">Quick Tips</div>
            <h2 className="heading-4xl max-w-3xl mx-auto">
              Actionable advice you can use today
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Tailor Your Resume for Each Job</h3>
                  <p className="text-flowcv-gray-600">
                    Customize your resume for each application by incorporating keywords from the job description. 
                    This increases your chances of passing ATS screening by up to 40%.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Quantify Your Achievements</h3>
                  <p className="text-flowcv-gray-600">
                    Use numbers, percentages, and metrics to demonstrate your impact. Instead of "improved sales," 
                    write "increased sales by 25% over 6 months."
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-flowcv-brand-purple rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="heading-xl mb-2">Keep It Concise</h3>
                  <p className="text-flowcv-gray-600">
                    Aim for 1-2 pages maximum. Recruiters spend an average of 6 seconds scanning a resume, 
                    so make every word count.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-flowcv-brand-purple/5 rounded-2xl p-8 border border-flowcv-brand-purple/10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-flowcv-brand-purple rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="heading-2xl">Pro Tip</h3>
                <p className="text-flowcv-gray-600 leading-relaxed">
                  Use our AI-powered resume builder to automatically optimize your resume for ATS systems. 
                  Our templates are pre-formatted to pass through 95% of applicant tracking systems.
                </p>
                <Link href="/dashboard/builder" className="btn-flowcv-primary inline-flex">
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-flowcv">
        <div className="container-flowcv text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="heading-4xl">
                Ready to put these tips into action?
              </h2>
              <p className="text-flowcv-gray-600 text-lg leading-relaxed">
                Create your professional resume with our expert-designed templates and built-in optimization.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard/builder" className="btn-flowcv-primary btn-large">
                Start Building Your Resume
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
