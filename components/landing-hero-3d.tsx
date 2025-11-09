"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { StripPattern, Shape3D } from './decorative-shapes'

export function LandingHero3D() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: 'var(--figma-bg-gradient-pink)' }}>
      {/* Decorative Strip Patterns */}
      <StripPattern />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ color: 'var(--figma-primary)' }}>
              A massive library of{' '}
              <span className="block mt-2">
                free CV{' '}
                <span style={{ color: 'var(--figma-accent-purple)' }}>templates</span>
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--figma-body)' }}>
              Create professional resumes that get you hired. Choose from expertly designed templates, 
              customize with our AI-powered builder, and download instantly.
            </p>
            
            {/* Email Form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-base"
                  style={{ backgroundColor: 'var(--figma-neutral)' }}
                />
              </div>
              <Button 
                className="px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 whitespace-nowrap"
                style={{ 
                  backgroundColor: 'var(--figma-accent-purple)',
                  color: 'white'
                }}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              {['Facebook', 'Twitter', 'Instagram', 'Dribbble', 'Behance'].map((social, idx) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center group"
                  aria-label={social}
                >
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--figma-accent-purple)' }} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Content - 3D Objects */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Main 3D Shape Cluster */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Center large shape */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float">
                  <Shape3D variant="purple" size="xl" />
                </div>
                
                {/* Orbiting shapes */}
                <div className="absolute top-0 right-0 animate-float" style={{ animationDelay: '0.5s' }}>
                  <Shape3D variant="pink" size="md" />
                </div>
                
                <div className="absolute bottom-0 left-0 animate-float" style={{ animationDelay: '1s' }}>
                  <Shape3D variant="blue" size="lg" />
                </div>
                
                <div className="absolute top-1/4 left-0 animate-float" style={{ animationDelay: '1.5s' }}>
                  <Shape3D variant="gradient" size="sm" />
                </div>
                
                <div className="absolute bottom-1/4 right-0 animate-float" style={{ animationDelay: '2s' }}>
                  <Shape3D variant="purple" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EmailCTASection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'var(--figma-bg-gradient-cream)' }}>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--figma-primary)' }}>
            Ready to build your{' '}
            <span style={{ color: 'var(--figma-accent-purple)' }}>perfect resume</span>?
          </h2>
          
          <p className="text-lg" style={{ color: 'var(--figma-body)' }}>
            Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder.
          </p>
          
          {/* Email Form */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-full shadow-lg p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 outline-none text-base"
                  style={{ color: 'var(--figma-primary)' }}
                />
              </div>
              <Button 
                className="px-8 py-3 rounded-full text-base font-semibold"
                style={{ 
                  backgroundColor: 'var(--figma-accent-purple)',
                  color: 'white'
                }}
              >
                Download
              </Button>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            {['Facebook', 'Twitter', 'Instagram', 'Dribbble', 'Behance'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center group hover:scale-110"
                aria-label={social}
              >
                <div 
                  className="w-6 h-6 rounded-full transition-all" 
                  style={{ backgroundColor: 'var(--figma-accent-purple)' }} 
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-10 left-10 opacity-30">
        <Shape3D variant="pink" size="md" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-30">
        <Shape3D variant="blue" size="lg" />
      </div>
    </section>
  )
}
