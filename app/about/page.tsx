"use client"

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Award, Zap, Shield, Globe, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/lib/theme-context"

export default function AboutPage() {
  const { theme } = useTheme()

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-300 pt-20 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom right, ${theme.bg}, ${theme.bgSecondary})`
      }}
      suppressHydrationWarning
    >
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient blobs */}
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
        
        {/* Infinity symbols */}
        <div 
          className="absolute top-40 left-1/4 text-9xl font-black opacity-8 -rotate-12"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
        <div 
          className="absolute bottom-32 right-1/3 text-8xl font-black opacity-8 rotate-12"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
        <div 
          className="absolute top-2/3 left-16 text-7xl font-black opacity-6 rotate-45"
          style={{ color: theme.accent }}
        >
          ∞
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge 
              className="mb-4 px-4 py-2 text-sm font-semibold"
              style={{ 
                backgroundColor: `${theme.accent}20`,
                color: theme.accent,
                borderColor: theme.accent
              }}
            >
              ∞ About InfCV
            </Badge>
            
            <h1 
              className="text-5xl md:text-6xl font-black tracking-tight"
              style={{ color: theme.text }}
            >
              Building the Future of
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}aa 100%)`
                }}
              >
                Resume Creation
              </span>
            </h1>
            
            <p 
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: theme.textSecondary }}
            >
              InfCV empowers job seekers with professional, ATS-friendly resume templates and an intuitive builder. 
              Our mission is to make creating standout resumes accessible to everyone.
            </p>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "10,000+", label: "Resumes Created", icon: "📄" },
              { value: "95%", label: "ATS Pass Rate", icon: "✅" },
              { value: "4.9/5", label: "User Rating", icon: "⭐" }
            ].map((stat, index) => (
              <Card 
                key={index}
                className="text-center p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: theme.card, borderColor: theme.border }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div 
                  className="text-5xl font-black mb-2"
                  style={{ color: theme.accent }}
                >
                  {stat.value}
                </div>
                <p 
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: theme.textSecondary }}
                >
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge 
                className="px-3 py-1 text-xs font-semibold"
                style={{ 
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent
                }}
              >
                Our Story
              </Badge>
              
              <h2 
                className="text-4xl font-black"
                style={{ color: theme.text }}
              >
                Born from the frustration of outdated resume tools
              </h2>
              
              <div 
                className="space-y-4 text-lg leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                <p>
                  We started InfCV because we experienced firsthand how difficult it was to create a professional 
                  resume that actually gets past applicant tracking systems and impresses hiring managers.
                </p>
                <p>
                  Traditional resume builders were either too basic, too expensive, or produced documents that looked 
                  outdated. We knew there had to be a better way.
                </p>
                <p>
                  Today, InfCV combines modern design principles with ATS optimization, giving job seekers the 
                  tools they need to stand out in a competitive market.
                </p>
              </div>
            </div>
            
            <Card 
              className="p-8 shadow-2xl"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <div className="space-y-8">
                {[
                  { icon: Target, title: "Our Mission", desc: "Democratize professional resume creation", color: theme.accent },
                  { icon: Award, title: "Our Vision", desc: "Every job seeker deserves a standout resume", color: theme.accent },
                  { icon: Users, title: "Our Values", desc: "Quality, accessibility, and user success", color: theme.accent }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`
                        }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="font-bold text-lg mb-1"
                          style={{ color: theme.text }}
                        >
                          {item.title}
                        </h3>
                        <p style={{ color: theme.textSecondary }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge 
              className="px-3 py-1 text-xs font-semibold"
              style={{ 
                backgroundColor: `${theme.accent}20`,
                color: theme.accent
              }}
            >
              What Makes Us Different
            </Badge>
            
            <h2 
              className="text-4xl font-black max-w-3xl mx-auto"
              style={{ color: theme.text }}
            >
              Built for the modern job market
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Create a professional resume in under 5 minutes. Our streamlined interface gets you from blank page to polished document quickly." },
              { icon: Shield, title: "ATS Optimized", desc: "All our templates are tested against major ATS systems to ensure your resume gets seen by human recruiters." },
              { icon: Globe, title: "Global Standards", desc: "Our templates follow international best practices and can be adapted for different countries and industries." }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index}
                  className="p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  style={{ backgroundColor: theme.card, borderColor: theme.border }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
                    }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: theme.text }}
                  >
                    {feature.title}
                  </h3>
                  
                  <p 
                    className="leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    {feature.desc}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <Card 
            className="max-w-4xl mx-auto p-12 shadow-2xl"
            style={{ backgroundColor: theme.card, borderColor: theme.accent }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 
                  className="text-4xl font-black"
                  style={{ color: theme.text }}
                >
                  Ready to create your professional resume?
                </h2>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  Join thousands of job seekers who have successfully landed their dream jobs using InfCV.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  className="text-base font-semibold"
                  style={{ 
                    backgroundColor: theme.accent,
                    color: "white"
                  }}
                  asChild
                >
                  <Link href="/dashboard/builder">
                    Start Building Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-base font-semibold"
                  asChild
                >
                  <Link href="/dashboard/templates">
                    Browse Templates
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* Footer */}
      <footer 
        className="relative z-10 border-t py-12"
        style={{ borderColor: theme.border }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}dd 100%)`
                }}
              >
                <span className="text-white font-black text-xl">∞</span>
              </div>
              <span 
                className="text-2xl font-black"
                style={{ color: theme.text }}
              >
                InfCV
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: theme.textSecondary }}
            >
              © {new Date().getFullYear()} InfCV. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
