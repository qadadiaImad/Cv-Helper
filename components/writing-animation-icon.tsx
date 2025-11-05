"use client"

import Image from 'next/image'

/**
 * Writing Animation Icon
 * Dynamic vibrant 3D illustrations based on builder state
 */

interface WritingAnimationIconProps {
  progress?: number // 0-100
  isEditing?: boolean
}

export function WritingAnimationIcon({ 
  progress = 0, 
  isEditing = false 
}: WritingAnimationIconProps) {
  
  // Determine which image to show based on state
  const getIllustration = () => {
    if (progress >= 100) {
      return {
        src: '/images/Resume_Validated.png',
        alt: 'Resume completed and validated',
        message: '🎉 Resume Complete!'
      }
    }
    
    if (isEditing || progress > 0) {
      return {
        src: '/images/Resume_editing.png',
        alt: 'Editing resume',
        message: '✍️ Crafting your resume...'
      }
    }
    
    return {
      src: '/images/Happy_With_Resume.png',
      alt: 'Ready to build resume',
      message: '🚀 Let\'s build your resume!'
    }
  }
  
  const illustration = getIllustration()
  
  return (
    <div className="writing-animation-wrapper">
      <div className="animation-card">
        <div className="illustration-container">
          <Image
            src={illustration.src}
            alt={illustration.alt}
            width={280}
            height={280}
            priority
            className="illustration-image"
          />
        </div>
        
        <p className="animation-text">{illustration.message}</p>
        
        {/* Progress indicator */}
        {progress > 0 && progress < 100 && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{progress}% Complete</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .writing-animation-wrapper {
          margin-top: 1.5rem;
        }
        
        .animation-card {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #bfdbfe;
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
          transition: all 0.3s ease;
        }
        
        .animation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.15);
        }
        
        .illustration-container {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .illustration-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          animation: fadeInScale 0.5s ease-out;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animation-text {
          margin-top: 1.25rem;
          font-size: 1rem;
          font-weight: 600;
          color: #1e40af;
          animation: textSlideIn 0.5s ease-out 0.2s both;
        }
        
        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .progress-container {
          margin-top: 1rem;
          animation: fadeIn 0.5s ease-out 0.3s both;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 9999px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 9999px;
          transition: width 0.5s ease;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .progress-text {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #3b82f6;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .illustration-image,
          .animation-text,
          .progress-container,
          .animation-card {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}
