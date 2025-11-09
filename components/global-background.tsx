"use client"

export function GlobalBackground() {
  return (
    <div 
      className="absolute top-0 left-0 right-0 pointer-events-none" 
      style={{ zIndex: 0, minHeight: '3000px' }}
      data-testid="global-background"
    >
      {/* TEST: Large visible shape to confirm rendering */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-3xl opacity-80" data-testid="test-shape" />
      
      {/* MANY MORE Purple diagonal stripes - Figma style */}
      <div className="absolute top-0 left-10 w-3 h-60 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-70" />
      <div className="absolute top-20 left-32 w-3 h-48 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
      <div className="absolute top-10 left-56 w-3 h-72 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-50" />
      <div className="absolute top-40 left-80 w-2 h-40 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
      
      <div className="absolute top-0 right-10 w-3 h-60 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-70" />
      <div className="absolute top-20 right-32 w-3 h-48 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
      <div className="absolute top-10 right-56 w-3 h-72 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-50" />
      <div className="absolute top-40 right-80 w-2 h-40 bg-gradient-to-b from-purple-400 to-purple-500 rounded-full rotate-45 opacity-60" />
      
      {/* LARGE 3D Geometric Shapes - Much more visible */}
      
      {/* BIG Tilted purple rectangles */}
      <div className="absolute top-20 right-20 w-64 h-96 bg-gradient-to-br from-purple-200/60 to-purple-300/60 rounded-[3rem] transform rotate-12 shadow-2xl" />
      <div className="absolute bottom-20 left-20 w-56 h-80 bg-gradient-to-br from-purple-300/50 to-purple-400/50 rounded-[3rem] transform -rotate-6 shadow-2xl" />
      <div className="absolute top-1/3 left-1/2 w-48 h-72 bg-gradient-to-br from-purple-200/50 to-purple-300/50 rounded-[2.5rem] transform rotate-20 shadow-xl" />
      
      {/* LARGE Pink circles */}
      <div className="absolute top-40 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-200/70 to-pink-300/70 rounded-full shadow-2xl" />
      <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-br from-pink-300/60 to-pink-400/60 rounded-full shadow-xl" />
      <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-gradient-to-br from-pink-200/60 to-pink-300/60 rounded-full shadow-xl" />
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-300/50 to-pink-400/50 rounded-full shadow-lg" />
      
      {/* Blue/teal shapes - MORE */}
      <div className="absolute top-1/4 left-10 w-52 h-72 bg-gradient-to-br from-blue-200/50 to-cyan-200/50 rounded-[2rem] transform rotate-45 shadow-xl" />
      <div className="absolute bottom-1/3 right-10 w-44 h-44 bg-gradient-to-br from-cyan-200/60 to-teal-200/60 rounded-full shadow-2xl" />
      <div className="absolute top-1/2 right-1/2 w-40 h-60 bg-gradient-to-br from-blue-300/50 to-cyan-300/50 rounded-[2rem] transform -rotate-12 shadow-lg" />
      
      {/* Yellow/Orange shapes */}
      <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-gradient-to-br from-yellow-200/60 to-orange-200/60 rounded-full shadow-xl" />
      <div className="absolute top-1/3 right-1/4 w-44 h-64 bg-gradient-to-br from-yellow-100/50 to-orange-100/50 rounded-[2rem] transform rotate-15 shadow-lg" />
      
      {/* Diagonal lines connecting shapes - THICKER */}
      <div className="absolute top-32 right-1/3 w-2 h-48 bg-gradient-to-b from-purple-300/70 to-transparent rounded-full transform rotate-45" />
      <div className="absolute top-1/2 left-1/4 w-2 h-56 bg-gradient-to-b from-pink-300/60 to-transparent rounded-full transform -rotate-30" />
      <div className="absolute bottom-1/3 right-1/2 w-2 h-40 bg-gradient-to-b from-blue-300/60 to-transparent rounded-full transform rotate-60" />
      
      {/* HUGE gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/50 to-pink-300/50 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] bg-gradient-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl" />
      
      {/* Yellow curved line - top right */}
      <svg 
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-40"
        viewBox="0 0 500 500"
        fill="none"
      >
        <path
          d="M 500 0 Q 400 100 300 200 Q 200 300 100 400"
          stroke="url(#yellowGradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Pink curved line - bottom left */}
      <svg 
        className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-30"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M 0 300 Q 100 250 200 200"
          stroke="url(#pinkGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* MORE shapes for MIDDLE section of page */}
      <div className="absolute" style={{ top: '800px', left: '15%' }}>
        <div className="w-56 h-80 bg-gradient-to-br from-purple-200/60 to-purple-300/60 rounded-[3rem] transform -rotate-12 shadow-2xl" />
      </div>
      <div className="absolute" style={{ top: '900px', right: '10%' }}>
        <div className="w-44 h-44 bg-gradient-to-br from-pink-200/70 to-pink-300/70 rounded-full shadow-2xl" />
      </div>
      <div className="absolute" style={{ top: '1000px', left: '40%' }}>
        <div className="w-48 h-68 bg-gradient-to-br from-blue-200/50 to-cyan-200/50 rounded-[2rem] transform rotate-25 shadow-xl" />
      </div>
      
      {/* MORE shapes for BOTTOM section of page */}
      <div className="absolute" style={{ top: '1400px', right: '20%' }}>
        <div className="w-52 h-76 bg-gradient-to-br from-purple-300/50 to-purple-400/50 rounded-[3rem] transform rotate-15 shadow-2xl" />
      </div>
      <div className="absolute" style={{ top: '1500px', left: '25%' }}>
        <div className="w-40 h-40 bg-gradient-to-br from-pink-300/60 to-pink-400/60 rounded-full shadow-xl" />
      </div>
      <div className="absolute" style={{ top: '1600px', right: '30%' }}>
        <div className="w-36 h-36 bg-gradient-to-br from-yellow-200/60 to-orange-200/60 rounded-full shadow-xl" />
      </div>
      <div className="absolute" style={{ top: '1700px', left: '15%' }}>
        <div className="w-44 h-64 bg-gradient-to-br from-cyan-200/50 to-teal-200/50 rounded-[2rem] transform -rotate-20 shadow-lg" />
      </div>
      
      {/* EVEN MORE shapes for LOWER section */}
      <div className="absolute" style={{ top: '2000px', right: '15%' }}>
        <div className="w-48 h-72 bg-gradient-to-br from-purple-200/50 to-purple-300/50 rounded-[2.5rem] transform rotate-10 shadow-xl" />
      </div>
      <div className="absolute" style={{ top: '2100px', left: '35%' }}>
        <div className="w-38 h-38 bg-gradient-to-br from-pink-200/60 to-pink-300/60 rounded-full shadow-xl" />
      </div>
      
      {/* Decorative circles throughout */}
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}} />
      <div className="absolute" style={{ top: '1200px', left: '20%' }}>
        <div className="w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse" />
      </div>
      <div className="absolute" style={{ top: '1800px', right: '25%' }}>
        <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>
    </div>
  )
}
