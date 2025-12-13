/**
 * DARK PROFESSIONAL LAYOUT
 * Modern dark CV layout with geometric patterns and green accents
 * Complete wrapper with background styling for Dark Professional template
 */

import React from 'react'

export interface DarkProfessionalLayoutProps {
  /** Left content area (55% width) */
  left?: React.ReactNode
  /** Right sidebar area (45% width) */
  right?: React.ReactNode
  /** Background gradient colors */
  gradientStart?: string
  gradientMiddle?: string
  gradientEnd?: string
  /** Pattern opacity */
  patternOpacity?: number
  /** Maximum container width */
  maxWidth?: string
  /** Left padding */
  leftPadding?: string
  /** Right padding */
  rightPadding?: string
  /** Additional CSS class names */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
}

/**
 * DarkProfessionalLayout Component
 * 
 * Complete layout wrapper for Dark Professional template with:
 * - Dark gradient background
 * - Geometric pattern overlay
 * - Two-column layout (55/45 split)
 * - Professional dark aesthetic
 */
export const DarkProfessionalLayout: React.FC<DarkProfessionalLayoutProps> = ({
  left,
  right,
  gradientStart = '#0a2e2e',
  gradientMiddle = '#1a3a3a',
  gradientEnd = '#0f2626',
  patternOpacity = 0.1,
  maxWidth = '1400px',
  leftPadding = '60px 50px',
  rightPadding = '60px 50px',
  className,
  style,
}) => {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        minHeight: '1200px',
        background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientMiddle} 50%, ${gradientEnd} 100%)`,
        fontFamily: "'Segoe UI', 'Arial', sans-serif",
        position: 'relative',
        ...style,
      }}
    >
      {/* Geometric Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: patternOpacity,
        background: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 35px,
          rgba(255,255,255,0.03) 35px,
          rgba(255,255,255,0.03) 70px
        )`,
        pointerEvents: 'none',
      }} />

      {/* Main Layout Container */}
      <div style={{
        display: 'flex',
        position: 'relative',
        minHeight: '1200px',
        maxWidth,
        margin: '0 auto',
      }}>
        {/* Left Content Area (55%) */}
        <div style={{
          width: '55%',
          padding: leftPadding,
          position: 'relative',
          zIndex: 1,
        }}>
          {left}
        </div>

        {/* Right Sidebar Area (45%) */}
        <div style={{
          width: '45%',
          padding: rightPadding,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          position: 'relative',
          zIndex: 1,
        }}>
          {right}
        </div>
      </div>
    </div>
  )
}
