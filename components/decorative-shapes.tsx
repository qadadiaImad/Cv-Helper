"use client"

import React from 'react'

interface ShapeProps {
  className?: string
  variant?: 'purple' | 'pink' | 'blue' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  rotation?: number
  opacity?: number
}

const sizeClasses = {
  sm: 'w-12 h-16',
  md: 'w-24 h-32',
  lg: 'w-32 h-44',
  xl: 'w-48 h-64'
}

const variantClasses = {
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-300 to-pink-500',
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  gradient: 'bg-gradient-to-br from-purple-300 via-pink-300 to-purple-400'
}

export function DecorativeShape({ 
  className = '', 
  variant = 'purple', 
  size = 'md',
  rotation = 0,
  opacity = 0.8
}: ShapeProps) {
  return (
    <div 
      className={`rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        opacity: opacity
      }}
    />
  )
}

export function StripPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Left Patterns */}
      <DecorativeShape 
        className="absolute top-[-2%] left-[16%]" 
        variant="purple" 
        size="lg" 
        rotation={145} 
      />
      <DecorativeShape 
        className="absolute top-[-3%] left-[40%]" 
        variant="pink" 
        size="md" 
        rotation={145} 
      />
      <DecorativeShape 
        className="absolute top-[10%] left-[61%]" 
        variant="blue" 
        size="sm" 
        rotation={145} 
      />
      
      {/* Middle Patterns */}
      <DecorativeShape 
        className="absolute top-[30%] left-[5%]" 
        variant="gradient" 
        size="md" 
        rotation={-35} 
      />
      <DecorativeShape 
        className="absolute top-[45%] left-[85%]" 
        variant="purple" 
        size="lg" 
        rotation={25} 
      />
      
      {/* Bottom Patterns */}
      <DecorativeShape 
        className="absolute bottom-[10%] left-[38%]" 
        variant="pink" 
        size="lg" 
        rotation={145} 
      />
      <DecorativeShape 
        className="absolute bottom-[15%] right-[10%]" 
        variant="blue" 
        size="xl" 
        rotation={-15} 
      />
      <DecorativeShape 
        className="absolute bottom-[5%] left-[48%]" 
        variant="gradient" 
        size="md" 
        rotation={145} 
      />
    </div>
  )
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated floating shapes */}
      <div className="absolute top-[20%] right-[15%] animate-float">
        <DecorativeShape variant="purple" size="lg" rotation={25} opacity={0.6} />
      </div>
      <div className="absolute top-[60%] left-[10%] animate-float" style={{ animationDelay: '1s' }}>
        <DecorativeShape variant="pink" size="md" rotation={-15} opacity={0.5} />
      </div>
      <div className="absolute bottom-[30%] right-[25%] animate-float" style={{ animationDelay: '2s' }}>
        <DecorativeShape variant="blue" size="sm" rotation={45} opacity={0.7} />
      </div>
    </div>
  )
}

// 3D-style shapes with shadows and depth
export function Shape3D({ 
  className = '', 
  variant = 'purple',
  size = 'md'
}: ShapeProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Shadow layer */}
      <div 
        className={`absolute inset-0 ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg blur-xl opacity-40 translate-y-2`}
      />
      {/* Main shape */}
      <div 
        className={`relative ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg shadow-2xl`}
      />
    </div>
  )
}
