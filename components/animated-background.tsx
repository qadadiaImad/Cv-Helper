"use client"

/**
 * Animated Background Component
 * Hybrid approach: Gradient mesh + animated writing lines
 * - Subtle gradient morphing (30s loop)
 * - Writing lines appear periodically
 * - Respects prefers-reduced-motion
 */

export function AnimatedBackground() {
  return (
    <div className="animated-background-container">
      {/* Gradient Mesh Layer */}
      <div className="gradient-mesh" />
      
      {/* Writing Lines Layer */}
      <div className="writing-lines">
        <svg className="writing-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          {/* Writing line 1 - Top */}
          <path
            className="writing-line line-1"
            d="M 100 200 Q 400 180 700 200 T 1300 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.15"
          />
          
          {/* Writing line 2 - Middle */}
          <path
            className="writing-line line-2"
            d="M 200 500 Q 500 480 800 500 T 1400 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.12"
          />
          
          {/* Writing line 3 - Bottom */}
          <path
            className="writing-line line-3"
            d="M 150 800 Q 450 780 750 800 T 1350 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.10"
          />
          
          {/* Decorative dots */}
          <circle className="writing-dot dot-1" cx="300" cy="300" r="4" fill="currentColor" opacity="0.15" />
          <circle className="writing-dot dot-2" cx="900" cy="600" r="4" fill="currentColor" opacity="0.12" />
          <circle className="writing-dot dot-3" cx="1500" cy="400" r="4" fill="currentColor" opacity="0.10" />
        </svg>
      </div>

      <style jsx>{`
        .animated-background-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }

        /* Gradient Mesh Layer */
        .gradient-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(14, 165, 233, 0.10) 0%, transparent 50%);
          animation: gradientMorph 20s ease-in-out infinite;
        }

        @keyframes gradientMorph {
          0%, 100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          25% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) rotate(-3deg);
          }
          75% {
            opacity: 0.9;
            transform: scale(1.08) rotate(4deg);
          }
        }

        /* Writing Lines Layer */
        .writing-lines {
          position: absolute;
          inset: 0;
          color: rgb(71, 85, 105); /* slate-600 */
        }

        .writing-svg {
          width: 100%;
          height: 100%;
        }

        /* Writing line animations */
        .writing-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: writeLine 8s ease-in-out infinite;
        }

        .line-1 {
          animation-delay: 0s;
        }

        .line-2 {
          animation-delay: 2.5s;
        }

        .line-3 {
          animation-delay: 5s;
        }

        @keyframes writeLine {
          0%, 15% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          20%, 80% {
            stroke-dashoffset: 0;
            opacity: 0.15;
          }
          85%, 100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        /* Dot animations */
        .writing-dot {
          animation: dotPulse 6s ease-in-out infinite;
        }

        .dot-1 {
          animation-delay: 1s;
        }

        .dot-2 {
          animation-delay: 3s;
        }

        .dot-3 {
          animation-delay: 5s;
        }

        @keyframes dotPulse {
          0%, 20%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          30%, 70% {
            opacity: 0.15;
            transform: scale(1);
          }
          80% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .gradient-mesh,
          .writing-line,
          .writing-dot {
            animation: none !important;
          }
          
          .gradient-mesh {
            opacity: 0.5;
          }
          
          .writing-line {
            stroke-dashoffset: 0;
            opacity: 0.03;
          }
          
          .writing-dot {
            opacity: 0.05;
          }
        }

        /* Pause animations on hover (accessibility) */
        .animated-background-container:hover .gradient-mesh,
        .animated-background-container:hover .writing-line,
        .animated-background-container:hover .writing-dot {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
