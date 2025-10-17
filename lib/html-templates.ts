export interface HTMLTemplate {
  id: string
  name: string
  description: string
  category: "modern" | "classic" | "creative" | "minimal" | "executive"
  license: string
  author?: string
  source?: string
  html: string
  css: string
  js?: string
  features: string[]
  isNew?: boolean
  isPro?: boolean
}

export const htmlTemplates: HTMLTemplate[] = [
  {
    id: "classic-minimal",
    name: "Classic Minimal",
    description: "Clean, professional layout perfect for traditional industries",
    category: "minimal",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='border-b pb-4 mb-6'>
    <h1 class='text-3xl font-bold print:text-2xl' data-key='fullName'>John Doe</h1>
    <p class='text-sm text-neutral-600 print:text-xs'>
      <span data-key='email'>john@example.com</span> · 
      <span data-key='phone'>+33 6 12 34 56 78</span> ·
      <span data-key='links.linkedin'>linkedin.com/in/john</span>
    </p>
  </header>
  
  <section class='mb-6' id='experience'>
    <h2 class='text-xl font-semibold mb-3 print:text-lg'>Experience</h2>
    <article class='mb-4 print:mb-3' data-repeat='experience'>
      <div class='flex justify-between items-start mb-1'>
        <strong class='text-base print:text-sm' data-key='company'>Tech Corp</strong>
        <span class='text-sm text-neutral-500 print:text-xs' data-key='period'>2023–Present</span>
      </div>
      <div class='text-sm text-neutral-700 mb-2 print:text-xs' data-key='role'>Software Engineer — Paris</div>
      <ul class='list-disc ml-5 space-y-1 print:space-y-0' data-repeat='details'>
        <li class='text-sm print:text-xs' data-key='details.*'>Improved system performance by 40%</li>
      </ul>
    </article>
  </section>
  
  <section class='grid md:grid-cols-2 gap-6 print:gap-4'>
    <div id='projects'>
      <h2 class='text-xl font-semibold mb-3 print:text-lg'>Projects</h2>
      <article class='mb-3 print:mb-2' data-repeat='projects'>
        <div class='flex justify-between items-start'>
          <strong class='text-base print:text-sm' data-key='title'>Project X</strong>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='link'>github.com</span>
        </div>
        <div class='text-sm text-neutral-700 print:text-xs' data-key='description'>Analytics dashboard built with React and Node.js</div>
      </article>
    </div>
    
    <div>
      <h2 class='text-xl font-semibold mb-3 print:text-lg'>Education</h2>
      <article class='mb-3 print:mb-2' data-repeat='education'>
        <div class='flex justify-between items-start'>
          <strong class='text-base print:text-sm' data-key='school'>EPFL</strong>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='year'>2019–2022</span>
        </div>
        <div class='text-sm text-neutral-700 print:text-xs' data-key='degree'>MSc Computer Science — Lausanne</div>
      </article>
      
      <h2 class='text-xl font-semibold mt-4 mb-3 print:text-lg print:mt-3'>Skills</h2>
      <div class='text-sm print:text-xs' id='skills'>
        <div><strong>Languages:</strong> <span data-key='skills' class='skills-list'>Python, TypeScript, JavaScript</span></div>
      </div>
    </div>
  </section>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
    font-size: 12px;
    line-height: 1.4;
  }
  
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:text-lg { font-size: 14px; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-3 { margin-bottom: 0.75rem; }
  .print\\:mt-3 { margin-top: 0.75rem; }
  .print\\:gap-4 { gap: 1rem; }
  .print\\:space-y-0 > * + * { margin-top: 0; }
}`,
    features: ["ATS-friendly", "Single column", "Traditional layout", "Print optimized"],
  },
  
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Contemporary design with blue accent colors",
    category: "modern",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-0 print:p-0'>
  <div class='bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-8 print:p-4 print:bg-blue-700'>
    <h1 class='text-3xl font-bold print:text-2xl' data-key='fullName'>John Doe</h1>
    <p class='text-sm opacity-90 print:text-xs print:opacity-100'>
      <span data-key='email'>john@example.com</span> · 
      <span data-key='phone'>+33 6 12 34 56 78</span> · 
      <span data-key='links.github'>github.com/john</span>
    </p>
  </div>
  
  <div class='p-8 print:p-4'>
    <section class='mb-6 print:mb-4'>
      <h2 class='text-xl font-semibold text-blue-700 mb-3 print:text-lg print:mb-2'>Experience</h2>
      <article class='mb-4 print:mb-3' data-repeat='experience'>
        <div class='flex justify-between items-start mb-1'>
          <strong class='text-base print:text-sm' data-key='company'>Tech Corp</strong>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='period'>2023–Present</span>
        </div>
        <div class='text-sm text-neutral-700 mb-2 print:text-xs' data-key='role'>Software Engineer — Paris</div>
        <ul class='list-disc ml-5 space-y-1 print:space-y-0' data-repeat='details'>
          <li class='text-sm print:text-xs' data-key='details.*'>Reduced latency by 120ms</li>
        </ul>
      </article>
    </section>
    
    <section class='grid grid-cols-3 gap-6 print:gap-4'>
      <div class='col-span-2'>
        <h2 class='text-xl font-semibold text-blue-700 mb-3 print:text-lg print:mb-2'>Projects</h2>
        <article class='mb-3 print:mb-2' data-repeat='projects'>
          <div class='flex justify-between items-start'>
            <strong class='text-base print:text-sm' data-key='title'>Project X</strong>
            <span class='text-sm text-neutral-500 print:text-xs' data-key='link'>github.com</span>
          </div>
          <div class='text-sm text-neutral-700 print:text-xs' data-key='description'>Next.js application with server components</div>
        </article>
      </div>
      
      <aside>
        <h2 class='text-xl font-semibold text-blue-700 mb-3 print:text-lg print:mb-2'>Skills</h2>
        <div class='text-sm space-y-1 print:text-xs print:space-y-0' data-key='skills' class='skills-list'>
          TypeScript, Python, Next.js, FastAPI, Docker, Git
        </div>
        
        <h2 class='text-xl font-semibold text-blue-700 mt-4 mb-3 print:text-lg print:mt-3 print:mb-2'>Education</h2>
        <div data-repeat='education'>
          <div class='font-medium print:text-sm' data-key='school'>EPFL</div>
          <div class='text-sm text-neutral-600 print:text-xs' data-key='degree'>MSc CS</div>
          <div class='text-xs text-neutral-500' data-key='year'>2019–2022</div>
        </div>
      </aside>
    </section>
  </div>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:bg-blue-700 { background-color: #1d4ed8 !important; }
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:text-lg { font-size: 14px; }
  .print\\:p-0 { padding: 0; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-3 { margin-bottom: 0.75rem; }
  .print\\:mb-4 { margin-bottom: 1rem; }
  .print\\:mt-3 { margin-top: 0.75rem; }
  .print\\:gap-4 { gap: 1rem; }
  .print\\:space-y-0 > * + * { margin-top: 0; }
  .print\\:opacity-100 { opacity: 1; }
}`,
    features: ["Color accents", "Two-column", "Modern typography", "Print optimized"],
    isNew: true,
  },
  
  {
    id: "compact-cards",
    name: "Compact Cards",
    description: "Card-based layout for organized information display",
    category: "modern",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='mb-6 print:mb-4'>
    <h1 class='text-3xl font-bold print:text-2xl' data-key='fullName'>John Doe</h1>
    <div class='text-sm text-neutral-600 print:text-xs'>
      <span data-key='email'>john@example.com</span> · 
      <span data-key='links.portfolio'>johndoe.dev</span>
    </div>
  </header>
  
  <section class='grid md:grid-cols-2 gap-4 print:gap-3'>
    <div class='rounded-xl border p-4 shadow-sm print:border print:shadow-none print:p-3'>
      <h2 class='text-base font-semibold mb-2 print:text-sm print:mb-1'>Experience</h2>
      <div data-repeat='experience' class='space-y-3 print:space-y-2'>
        <div class='rounded-lg border p-3 print:border-0 print:p-0 print:border-b print:pb-2'>
          <div class='flex justify-between items-start mb-1'>
            <span class='font-medium print:text-sm' data-key='company'>Tech Corp</span>
            <span class='text-xs text-neutral-500' data-key='period'>2023–Present</span>
          </div>
          <div class='text-sm text-neutral-700 mb-1 print:text-xs' data-key='role'>Software Engineer — Paris</div>
          <ul class='list-disc ml-5 space-y-1 print:space-y-0' data-repeat='details'>
            <li class='text-sm print:text-xs' data-key='details.*'>Shipped feature flags system</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class='rounded-xl border p-4 shadow-sm print:border print:shadow-none print:p-3'>
      <h2 class='text-base font-semibold mb-2 print:text-sm print:mb-1'>Projects</h2>
      <div data-repeat='projects' class='space-y-3 print:space-y-2'>
        <div class='rounded-lg border p-3 print:border-0 print:p-0 print:border-b print:pb-2'>
          <div class='flex justify-between items-start mb-1'>
            <span class='font-medium print:text-sm' data-key='title'>Project X</span>
            <span class='text-xs text-neutral-500' data-key='link'>github.com</span>
          </div>
          <div class='text-sm text-neutral-700 print:text-xs' data-key='description'>Export to PDF functionality</div>
        </div>
      </div>
      
      <h2 class='text-base font-semibold mt-4 mb-2 print:text-sm print:mt-3 print:mb-1'>Education</h2>
      <div data-repeat='education' class='rounded-lg border p-3 print:border-0 print:p-0'>
        <div class='flex justify-between items-start mb-1'>
          <span class='font-medium print:text-sm' data-key='school'>EPFL</span>
          <span class='text-xs text-neutral-500' data-key='year'>2019–2022</span>
        </div>
        <div class='text-sm text-neutral-700 print:text-xs' data-key='degree'>MSc CS — Lausanne</div>
      </div>
      
      <h2 class='text-base font-semibold mt-4 mb-2 print:text-sm print:mt-3 print:mb-1'>Skills</h2>
      <div class='text-sm print:text-xs' data-key='skills' class='skills-list'>
        TypeScript, Python, Next.js, Docker
      </div>
    </div>
  </section>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:p-0 { padding: 0; }
  .print\\:p-3 { padding: 0.75rem; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:mb-1 { margin-bottom: 0.25rem; }
  .print\\:mb-4 { margin-bottom: 1rem; }
  .print\\:mt-3 { margin-top: 0.75rem; }
  .print\\:gap-3 { gap: 0.75rem; }
  .print\\:space-y-0 > * + * { margin-top: 0; }
  .print\\:space-y-2 > * + * { margin-top: 0.5rem; }
  .print\\:border { border-width: 1px; }
  .print\\:border-0 { border-width: 0; }
  .print\\:border-b { border-bottom-width: 1px; }
  .print\\:pb-2 { padding-bottom: 0.5rem; }
  .print\\:shadow-none { box-shadow: none; }
}`,
    features: ["Card layout", "Compact design", "Visual hierarchy", "Print optimized"],
  },
  
  {
    id: "timeline-modern",
    name: "Timeline Modern",
    description: "Timeline-based experience display with modern aesthetics",
    category: "creative",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[860px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='mb-6 flex items-end justify-between print:mb-4 print:block'>
    <div>
      <h1 class='text-3xl font-bold print:text-2xl' data-key='fullName'>John Doe</h1>
      <p class='text-sm text-neutral-600 print:text-xs'>
        <span data-key='email'>john@example.com</span> · 
        <span data-key='phone'>+33 6 12 34 56 78</span>
      </p>
    </div>
  </header>
  
  <section class='grid grid-cols-3 gap-8 print:gap-4'>
    <aside class='col-span-1 print:col-span-3 print:mb-4'>
      <h2 class='text-base font-semibold mb-3 print:text-sm print:mb-2'>Skills</h2>
      <div class='text-sm space-y-1 print:text-xs print:space-y-0' data-key='skills' class='skills-list'>
        TypeScript, Python, Next.js, Docker
      </div>
      
      <h2 class='text-base font-semibold mt-4 mb-3 print:text-sm print:mt-3 print:mb-2'>Education</h2>
      <div data-repeat='education'>
        <div class='font-medium print:text-sm' data-key='school'>EPFL</div>
        <div class='text-sm text-neutral-600 print:text-xs' data-key='degree'>MSc CS</div>
        <div class='text-xs text-neutral-500' data-key='year'>2019–2022</div>
      </div>
    </aside>
    
    <div class='col-span-2 print:col-span-3'>
      <h2 class='text-base font-semibold mb-3 print:text-sm print:mb-2'>Experience</h2>
      <ol class='relative border-s pl-6 print:border-s-0 print:pl-0' data-repeat='experience'>
        <li class='mb-6 print:mb-3 print:border-b print:pb-2'>
          <span class='absolute -start-2 mt-1.5 h-3 w-3 rounded-full bg-neutral-900 print:hidden'></span>
          <div class='flex justify-between items-start mb-1'>
            <strong class='print:text-sm' data-key='company'>Tech Corp</strong>
            <span class='text-xs text-neutral-500' data-key='period'>2023–Present</span>
          </div>
          <div class='text-sm text-neutral-700 mb-2 print:text-xs print:mb-1' data-key='role'>Software Engineer — Paris</div>
          <ul class='list-disc ml-5 space-y-1 print:ml-0 print:space-y-0' data-repeat='details'>
            <li class='text-sm print:text-xs' data-key='details.*'>Launched SSG export feature</li>
          </ul>
        </li>
      </ol>
      
      <h2 class='text-base font-semibold mt-4 mb-3 print:text-sm print:mt-3 print:mb-2'>Projects</h2>
      <div data-repeat='projects' class='mb-3 print:mb-2'>
        <div class='flex justify-between items-start mb-1'>
          <strong class='print:text-sm' data-key='title'>Project X</strong>
          <span class='text-xs text-neutral-500' data-key='link'>github.com</span>
        </div>
        <div class='text-sm text-neutral-700 print:text-xs' data-key='description'>PDF pipeline implementation</div>
      </div>
    </div>
  </section>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:mb-1 { margin-bottom: 0.25rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-3 { margin-bottom: 0.75rem; }
  .print\\:mb-4 { margin-bottom: 1rem; }
  .print\\:mt-3 { margin-top: 0.75rem; }
  .print\\:gap-4 { gap: 1rem; }
  .print\\:col-span-3 { grid-column: span 3 / span 3; }
  .print\\:block { display: block; }
  .print\\:border-s-0 { border-left-width: 0; }
  .print\\:border-b { border-bottom-width: 1px; }
  .print\\:pb-2 { padding-bottom: 0.5rem; }
  .print\\:pl-0 { padding-left: 0; }
  .print\\:ml-0 { margin-left: 0; }
  .print\\:space-y-0 > * + * { margin-top: 0; }
  .print\\:hidden { display: none; }
}`,
    features: ["Timeline design", "Visual flow", "Creative layout", "Print optimized"],
    isNew: true,
  },

  // External templates from various sources
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Premium template for senior positions and executives",
    category: "executive",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='text-center mb-8 print:mb-6 border-b-2 border-neutral-200 pb-6 print:pb-4'>
    <h1 class='text-4xl font-bold mb-2 print:text-3xl' data-key='fullName'>John Doe</h1>
    <h2 class='text-xl text-neutral-600 mb-3 print:text-lg' data-key='title'>Chief Technology Officer</h2>
    <div class='flex justify-center items-center gap-4 text-sm text-neutral-600 print:text-xs'>
      <span data-key='email'>john@example.com</span>
      <span>•</span>
      <span data-key='phone'>+1 (555) 123-4567</span>
      <span>•</span>
      <span data-key='location'>San Francisco, CA</span>
    </div>
  </header>

  <section class='mb-8 print:mb-6'>
    <h2 class='text-2xl font-bold mb-4 text-neutral-800 print:text-xl print:mb-3'>Executive Summary</h2>
    <p class='text-base leading-relaxed text-neutral-700 print:text-sm' data-key='summary'>
      Visionary technology leader with 15+ years of experience driving digital transformation and scaling engineering teams at Fortune 500 companies. Proven track record of delivering $100M+ revenue impact through strategic technology initiatives.
    </p>
  </section>

  <section class='mb-8 print:mb-6'>
    <h2 class='text-2xl font-bold mb-4 text-neutral-800 print:text-xl print:mb-3'>Leadership Experience</h2>
    <div data-repeat='experience' class='space-y-6 print:space-y-4'>
      <div class='border-l-4 border-blue-600 pl-6 print:pl-4'>
        <div class='flex justify-between items-start mb-2'>
          <h3 class='text-xl font-semibold print:text-lg' data-key='role'>Chief Technology Officer</h3>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='period'>2020 - Present</span>
        </div>
        <h4 class='text-lg text-neutral-600 mb-3 print:text-base print:mb-2' data-key='company'>TechCorp Inc. • San Francisco, CA</h4>
        <ul class='space-y-2 print:space-y-1' data-repeat='details'>
          <li class='flex items-start print:text-sm'>
            <span class='text-blue-600 mr-2 mt-1'>▪</span>
            <span data-key='details.*'>Led digital transformation initiative resulting in 40% operational efficiency improvement</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <div class='grid md:grid-cols-2 gap-8 print:gap-6'>
    <section>
      <h2 class='text-2xl font-bold mb-4 text-neutral-800 print:text-xl print:mb-3'>Core Competencies</h2>
      <div class='grid grid-cols-2 gap-2 print:gap-1' data-key='skills'>
        <div class='bg-neutral-50 p-3 rounded print:p-2 print:bg-transparent print:border'>Strategic Planning</div>
        <div class='bg-neutral-50 p-3 rounded print:p-2 print:bg-transparent print:border'>Team Leadership</div>
        <div class='bg-neutral-50 p-3 rounded print:p-2 print:bg-transparent print:border'>Digital Transformation</div>
        <div class='bg-neutral-50 p-3 rounded print:p-2 print:bg-transparent print:border'>P&L Management</div>
      </div>
    </section>

    <section>
      <h2 class='text-2xl font-bold mb-4 text-neutral-800 print:text-xl print:mb-3'>Education & Certifications</h2>
      <div data-repeat='education' class='space-y-3 print:space-y-2'>
        <div>
          <h3 class='font-semibold print:text-sm' data-key='degree'>MBA, Technology Management</h3>
          <p class='text-neutral-600 print:text-xs' data-key='school'>Stanford Graduate School of Business</p>
          <p class='text-sm text-neutral-500 print:text-xs' data-key='year'>2008</p>
        </div>
      </div>
    </section>
  </div>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:text-base { font-size: 12px; }
  .print\\:text-lg { font-size: 14px; }
  .print\\:text-xl { font-size: 16px; }
  .print\\:p-2 { padding: 0.5rem; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:pl-4 { padding-left: 1rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-3 { margin-bottom: 0.75rem; }
  .print\\:mb-6 { margin-bottom: 1.5rem; }
  .print\\:pb-4 { padding-bottom: 1rem; }
  .print\\:gap-1 { gap: 0.25rem; }
  .print\\:gap-6 { gap: 1.5rem; }
  .print\\:space-y-1 > * + * { margin-top: 0.25rem; }
  .print\\:space-y-2 > * + * { margin-top: 0.5rem; }
  .print\\:space-y-4 > * + * { margin-top: 1rem; }
  .print\\:bg-transparent { background-color: transparent; }
  .print\\:border { border-width: 1px; }
}`,
    features: ["Executive style", "Premium design", "Leadership focus", "Print optimized"],
    isPro: true,
  },

  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Showcase your creative work with visual elements",
    category: "creative",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='relative mb-8 print:mb-6'>
    <div class='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 print:hidden'></div>
    <h1 class='text-4xl font-bold mb-2 relative z-10 print:text-3xl' data-key='fullName'>Jane Smith</h1>
    <h2 class='text-xl text-purple-600 mb-4 print:text-lg print:text-purple-800' data-key='title'>Creative Director & UX Designer</h2>
    <div class='flex flex-wrap gap-4 text-sm text-neutral-600 print:text-xs'>
      <span data-key='email'>jane@example.com</span>
      <span data-key='portfolio'>portfolio.jane.com</span>
      <span data-key='location'>New York, NY</span>
    </div>
  </header>

  <section class='mb-8 print:mb-6'>
    <h2 class='text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-purple-500 pl-4 print:text-xl print:mb-3'>Creative Vision</h2>
    <p class='text-base leading-relaxed text-neutral-700 print:text-sm' data-key='summary'>
      Passionate creative professional with 8+ years of experience crafting compelling visual narratives and user experiences. Specialized in brand identity, digital design, and creative strategy for innovative startups and established brands.
    </p>
  </section>

  <section class='mb-8 print:mb-6'>
    <h2 class='text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-purple-500 pl-4 print:text-xl print:mb-3'>Experience</h2>
    <div data-repeat='experience' class='space-y-6 print:space-y-4'>
      <div class='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg print:bg-transparent print:border print:p-4'>
        <div class='flex justify-between items-start mb-2'>
          <h3 class='text-xl font-semibold text-purple-800 print:text-lg print:text-neutral-800' data-key='role'>Senior Creative Director</h3>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='period'>2021 - Present</span>
        </div>
        <h4 class='text-lg text-neutral-600 mb-3 print:text-base print:mb-2' data-key='company'>Design Studio Pro</h4>
        <ul class='space-y-2 print:space-y-1' data-repeat='details'>
          <li class='flex items-start print:text-sm'>
            <span class='text-purple-500 mr-2 mt-1'>✦</span>
            <span data-key='details.*'>Led rebranding project for Fortune 500 client, increasing brand recognition by 60%</span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <div class='grid md:grid-cols-2 gap-8 print:gap-6'>
    <section>
      <h2 class='text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-purple-500 pl-4 print:text-xl print:mb-3'>Featured Projects</h2>
      <div data-repeat='projects' class='space-y-4 print:space-y-3'>
        <div class='border border-purple-200 p-4 rounded-lg print:border-neutral-300'>
          <h3 class='font-semibold text-purple-800 print:text-neutral-800 print:text-sm' data-key='title'>Brand Identity Redesign</h3>
          <p class='text-sm text-neutral-600 mt-1 print:text-xs' data-key='description'>Complete visual identity overhaul for tech startup</p>
          <div class='flex flex-wrap gap-2 mt-2'>
            <span class='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs print:bg-transparent print:border'>Branding</span>
            <span class='bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs print:bg-transparent print:border'>UI/UX</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class='text-2xl font-bold mb-4 text-neutral-800 border-l-4 border-purple-500 pl-4 print:text-xl print:mb-3'>Skills & Tools</h2>
      <div class='space-y-3 print:space-y-2'>
        <div>
          <h3 class='font-semibold mb-2 print:text-sm'>Design Software</h3>
          <div class='flex flex-wrap gap-2' data-key='skills.design'>
            <span class='bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm print:bg-transparent print:border print:text-xs'>Adobe Creative Suite</span>
            <span class='bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm print:bg-transparent print:border print:text-xs'>Figma</span>
            <span class='bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm print:bg-transparent print:border print:text-xs'>Sketch</span>
          </div>
        </div>
        <div>
          <h3 class='font-semibold mb-2 print:text-sm'>Specializations</h3>
          <div class='flex flex-wrap gap-2' data-key='skills.specializations'>
            <span class='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm print:bg-transparent print:border print:text-xs'>Brand Identity</span>
            <span class='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm print:bg-transparent print:border print:text-xs'>UX Design</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:hidden { display: none; }
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:text-base { font-size: 12px; }
  .print\\:text-lg { font-size: 14px; }
  .print\\:text-xl { font-size: 16px; }
  .print\\:text-neutral-800 { color: #262626; }
  .print\\:text-purple-800 { color: #6b21a8; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-3 { margin-bottom: 0.75rem; }
  .print\\:mb-6 { margin-bottom: 1.5rem; }
  .print\\:gap-6 { gap: 1.5rem; }
  .print\\:space-y-1 > * + * { margin-top: 0.25rem; }
  .print\\:space-y-2 > * + * { margin-top: 0.5rem; }
  .print\\:space-y-3 > * + * { margin-top: 0.75rem; }
  .print\\:space-y-4 > * + * { margin-top: 1rem; }
  .print\\:bg-transparent { background-color: transparent; }
  .print\\:border { border-width: 1px; }
  .print\\:border-neutral-300 { border-color: #d4d4d8; }
}`,
    features: ["Portfolio sections", "Visual elements", "Creative industry", "Print optimized"],
  },

  {
    id: "academic-research",
    name: "Academic Research",
    description: "Comprehensive template for academic and research positions",
    category: "classic",
    license: "MIT (original)",
    html: `<main class='mx-auto max-w-[820px] bg-white text-neutral-900 p-8 print:p-4'>
  <header class='text-center mb-8 print:mb-6 border-b border-neutral-300 pb-6 print:pb-4'>
    <h1 class='text-3xl font-bold mb-2 print:text-2xl' data-key='fullName'>Dr. Sarah Johnson</h1>
    <h2 class='text-lg text-neutral-600 mb-3 print:text-base' data-key='title'>Associate Professor of Computer Science</h2>
    <div class='text-sm text-neutral-600 print:text-xs'>
      <div data-key='affiliation'>University of California, Berkeley • Department of Computer Science</div>
      <div class='mt-1'>
        <span data-key='email'>sarah.johnson@berkeley.edu</span> • 
        <span data-key='phone'>(510) 555-0123</span> • 
        <span data-key='orcid'>ORCID: 0000-0000-0000-0000</span>
      </div>
    </div>
  </header>

  <section class='mb-6 print:mb-4'>
    <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Research Interests</h2>
    <p class='text-base leading-relaxed text-neutral-700 print:text-sm' data-key='research_interests'>
      Machine Learning, Natural Language Processing, Computational Linguistics, AI Ethics, Human-Computer Interaction
    </p>
  </section>

  <section class='mb-6 print:mb-4'>
    <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Education</h2>
    <div data-repeat='education' class='space-y-3 print:space-y-2'>
      <div>
        <div class='flex justify-between items-start'>
          <div>
            <h3 class='font-semibold print:text-sm' data-key='degree'>Ph.D. in Computer Science</h3>
            <p class='text-neutral-600 print:text-xs' data-key='school'>Stanford University</p>
            <p class='text-sm text-neutral-500 print:text-xs' data-key='dissertation'>Dissertation: "Advanced Neural Networks for Natural Language Understanding"</p>
          </div>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='year'>2015</span>
        </div>
      </div>
    </div>
  </section>

  <section class='mb-6 print:mb-4'>
    <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Academic Positions</h2>
    <div data-repeat='experience' class='space-y-4 print:space-y-3'>
      <div>
        <div class='flex justify-between items-start mb-1'>
          <h3 class='font-semibold print:text-sm' data-key='role'>Associate Professor</h3>
          <span class='text-sm text-neutral-500 print:text-xs' data-key='period'>2020 - Present</span>
        </div>
        <p class='text-neutral-600 mb-2 print:text-xs print:mb-1' data-key='company'>University of California, Berkeley</p>
        <ul class='list-disc ml-5 space-y-1 print:space-y-0' data-repeat='details'>
          <li class='text-sm print:text-xs' data-key='details.*'>Lead research group of 8 PhD students and 4 postdocs</li>
        </ul>
      </div>
    </div>
  </section>

  <section class='mb-6 print:mb-4'>
    <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Selected Publications</h2>
    <div data-repeat='publications' class='space-y-3 print:space-y-2'>
      <div class='text-sm print:text-xs'>
        <p class='font-medium' data-key='authors'>Johnson, S., Smith, A., & Brown, M.</p>
        <p class='italic' data-key='title'>"Advances in Neural Language Models for Code Generation"</p>
        <p class='text-neutral-600' data-key='venue'>Proceedings of the 2024 Conference on Neural Information Processing Systems (NeurIPS)</p>
        <p class='text-neutral-500' data-key='year'>2024</p>
      </div>
    </div>
  </section>

  <div class='grid md:grid-cols-2 gap-6 print:gap-4'>
    <section>
      <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Grants & Funding</h2>
      <div data-repeat='grants' class='space-y-2 print:space-y-1'>
        <div class='text-sm print:text-xs'>
          <p class='font-medium' data-key='title'>NSF CAREER Award</p>
          <p class='text-neutral-600' data-key='amount'>$500,000 (2021-2026)</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class='text-xl font-bold mb-3 text-neutral-800 print:text-lg print:mb-2'>Professional Service</h2>
      <div class='space-y-2 print:space-y-1'>
        <div class='text-sm print:text-xs'>
          <p class='font-medium'>Program Committee Member</p>
          <p class='text-neutral-600'>ICML, NeurIPS, ICLR (2020-2024)</p>
        </div>
        <div class='text-sm print:text-xs'>
          <p class='font-medium'>Associate Editor</p>
          <p class='text-neutral-600'>Journal of Machine Learning Research (2022-Present)</p>
        </div>
      </div>
    </section>
  </div>
</main>`,
    css: `@page { 
  size: A4; 
  margin: 18mm; 
}

@media print { 
  body { 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }
  
  .print\\:text-xs { font-size: 10px; }
  .print\\:text-sm { font-size: 11px; }
  .print\\:text-base { font-size: 12px; }
  .print\\:text-lg { font-size: 14px; }
  .print\\:p-4 { padding: 1rem; }
  .print\\:pb-4 { padding-bottom: 1rem; }
  .print\\:mb-1 { margin-bottom: 0.25rem; }
  .print\\:mb-2 { margin-bottom: 0.5rem; }
  .print\\:mb-4 { margin-bottom: 1rem; }
  .print\\:mb-6 { margin-bottom: 1.5rem; }
  .print\\:gap-4 { gap: 1rem; }
  .print\\:space-y-0 > * + * { margin-top: 0; }
  .print\\:space-y-1 > * + * { margin-top: 0.25rem; }
  .print\\:space-y-2 > * + * { margin-top: 0.5rem; }
  .print\\:space-y-3 > * + * { margin-top: 0.75rem; }
}`,
    features: ["Academic format", "Publications section", "Research focus", "Print optimized"],
  },
  {
    id: "responsive-professional",
    name: "Responsive Professional",
    description: "Modern responsive design with animated background and clean sections for profile, experience, and skills",
    category: "modern",
    license: "MIT",
    author: "Community",
    html: `<div class="resume-wrapper">
  <section class="profile section-padding">
    <div class="container">
      <div class="picture-resume-wrapper">
        <div class="picture-resume">
          <span><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="150px" height="150px" viewBox="0 0 150 150" enable-background="new 0 0 150 150" xml:space="preserve">
            <g id="XMLID_1_"><circle class="bubble0" cx="75" cy="75" r="5"/><circle class="bubble1" cx="75" cy="75" r="5"/><circle class="bubble2" cx="75" cy="75" r="5"/><circle class="bubble3" cx="75" cy="75" r="5"/><circle class="bubble4" cx="75" cy="75" r="5"/><circle class="bubble5" cx="75" cy="75" r="5"/><circle class="bubble6" cx="75" cy="75" r="5"/><circle class="bubble7" cx="75" cy="75" r="5"/><circle class="bubble8" cx="75" cy="75" r="5"/><circle class="bubble9" cx="75" cy="75" r="5"/><circle class="bubble10" cx="75" cy="75" r="5"/><circle class="bubble11" cx="75" cy="75" r="5"/><circle class="bubble12" cx="75" cy="75" r="5"/><circle class="bubble13" cx="75" cy="75" r="5"/><circle class="bubble14" cx="75" cy="75" r="5"/><circle class="bubble15" cx="75" cy="75" r="5"/><circle class="bubble16" cx="75" cy="75" r="5"/><circle class="bubble17" cx="75" cy="75" r="5"/><circle class="bubble18" cx="75" cy="75" r="5"/><circle class="bubble19" cx="75" cy="75" r="5"/></g>
          </svg></span>
          <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="name-wrapper">
        <h1 data-key="fullName">John Doe</h1>
      </div>
      <div class="clearfix"></div>
      <div class="contact-info clearfix">
        <ul class="list-titles">
          <li>Call</li>
          <li>Mail</li>
          <li>Web</li>
          <li>Home</li>
        </ul>
        <ul class="list-content">
          <li data-key="phone">+33 6 12 34 56 78</li>
          <li data-key="email">john.doe@gmail.com</li>
          <li data-key="website">www.johndoe.com</li>
          <li data-key="location">Paris, France</li>
        </ul>
      </div>
      <div class="contact-presentation">
        <p data-key="summary"><span class="bold">Lorem</span> ipsum dolor sit amet, consectetur adipiscing elit. Vivamus euismod congue nisi, nec consequat quam. In consectetur faucibus turpis eget laoreet. Sed nec imperdiet purus.</p>
      </div>
      <div class="contact-social clearfix">
        <ul class="list-titles">
          <li>Twitter</li>
          <li>Dribbble</li>
          <li>Codepen</li>
        </ul>
        <ul class="list-content">
          <li><a href="">@johndoe</a></li>
          <li><a href="">johndoe</a></li>
          <li><a href="">johndoe</a></li>
        </ul>
      </div>
    </div>
  </section>
  
  <section class="experience section-padding">
    <div class="container">
      <h3 class="experience-title">Experience</h3>
      
      <div class="experience-wrapper" data-repeat="experience">
        <div class="company-wrapper clearfix">
          <div class="experience-title" data-key="company">Google</div>
          <div class="time" data-key="period">Nov 2012 - Present</div>
        </div>
        <div class="job-wrapper clearfix">
          <div class="experience-title" data-key="role">Front-end Developer / Designer</div>
          <div class="company-description" data-key="description">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a elit facilisis, adipiscing leo in, dignissim magna.</p>
          </div>
        </div>
      </div>
      
      <div class="section-wrapper clearfix">
        <h3 class="section-title">Skills</h3>
        <ul data-key="skills">
          <li class="skill-percentage">HTML / HTML5</li>
          <li class="skill-percentage">CSS / CSS3 / SASS / LESS</li>
          <li class="skill-percentage">Javascript</li>
          <li class="skill-percentage">Jquery</li>
          <li class="skill-percentage">Wordpress</li>
          <li class="skill-percentage">Photoshop</li>
        </ul>
      </div>
      
      <div class="section-wrapper clearfix">
        <h3 class="section-title">Hobbies</h3>
        <p data-key="interests">I like coding, gaming, reading and traveling.</p>
      </div>
    </div>
  </section>
  <div class="clearfix"></div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700|Raleway:300,600');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  line-height: 1.8em;
}

a {
  text-decoration: none;
}

.clearfix:after {
  content: " ";
  display: table;
  clear: both;
}

.bold {
  color: #4a4e51;
  font-weight: 600;
}

.resume-wrapper {
  position: relative;
  text-align: center;
  height: 100%;
}

.container {
  min-height: 600px;
}

.profile {
  background: #fff;
  width: 40%;
  float: left;
  color: #9099a0;
}

.experience {
  background: #3d3e42;
  width: 60%;
  float: left;
  color: #9099a0;
}

.section-padding {
  padding: 60px 60px 40px 40px;
}

.experience-title {
  color: white;
  margin-bottom: 15px;
}

.picture-resume-wrapper {
  width: 40%;
  display: block;
  float: left;
}

.picture-resume {
  width: 150px;
  height: 150px;
  background-size: cover;
  border-radius: 50%;
  margin-right: 0px;
  display: table;
  position: relative;
  vertical-align: middle;
}

.picture-resume span {
  display: table-cell;
  vertical-align: middle;
  position: relative;
  margin: 0 auto;
  z-index: 10;
  text-align: center;
}

.picture-resume svg {
  width: 100px;
}

.picture-resume .bubble0,
.picture-resume .bubble1,
.picture-resume .bubble2,
.picture-resume .bubble3,
.picture-resume .bubble4,
.picture-resume .bubble5,
.picture-resume .bubble6,
.picture-resume .bubble7,
.picture-resume .bubble8,
.picture-resume .bubble9,
.picture-resume .bubble10,
.picture-resume .bubble11,
.picture-resume .bubble12,
.picture-resume .bubble13,
.picture-resume .bubble14,
.picture-resume .bubble15,
.picture-resume .bubble16,
.picture-resume .bubble17,
.picture-resume .bubble18,
.picture-resume .bubble19 {
  fill: #4a4e51;
}

.name-wrapper {
  float: left;
  width: 60%;
}

.name-wrapper h1 {
  font-size: 2.5em;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  color: #4a4e51;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1em;
  padding-top: 40px;
}

.contact-info {
  margin-top: 100px;
  font-weight: 300;
}

.list-titles {
  float: left;
  text-align: left;
  font-weight: 600;
  width: 40%;
  color: #4a4e51;
}

.list-content {
  float: left;
  width: 60%;
  text-align: left;
  font-weight: 300;
}

.contact-presentation {
  text-align: left;
  font-weight: 300;
  margin-top: 100px;
  margin-bottom: 100px;
}

.contact-social {
  margin-top: 50px;
  font-weight: 300;
}

.contact-social a {
  color: #9099a0;
}

.contact-social a:hover {
  color: #4a4e51;
}

.experience-wrapper {
  margin-top: 40px;
  border-bottom: 1px solid #525252;
  padding-bottom: 40px;
}

.company-wrapper {
  width: 30%;
  float: left;
  text-align: left;
  padding-right: 5%;
  margin-bottom: 60px;
}

.job-wrapper {
  width: 70%;
  float: left;
  text-align: left;
  padding-right: 5%;
  margin-bottom: 60px;
}

.experience-title {
  color: white;
  margin-bottom: 15px;
}

.section-wrapper {
  margin-top: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #525252;
}

.section-wrapper:last-child {
  border-bottom: none;
}

.section-title {
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: left;
}

.skill-percentage {
  margin-bottom: 10px;
  position: relative;
}

.skill-percentage::after {
  content: "";
  width: 0;
  height: 6px;
  background: #fff;
  display: block;
  margin-top: 3px;
  border-radius: 3px;
}

.skill-percentage:nth-child(1)::after {
  width: 90%;
  animation: skill_1 0.6s ease;
}

.skill-percentage:nth-child(2)::after {
  width: 85%;
  animation: skill_2 0.6s ease;
}

.skill-percentage:nth-child(3)::after {
  width: 80%;
  animation: skill_3 0.6s ease;
}

.skill-percentage:nth-child(4)::after {
  width: 75%;
  animation: skill_4 0.6s ease;
}

.skill-percentage:nth-child(5)::after {
  width: 70%;
  animation: skill_5 0.6s ease;
}

.skill-percentage:nth-child(6)::after {
  width: 65%;
  animation: skill_6 0.6s ease;
}

@keyframes skill_1 {
  from { width: 0; }
  to { width: 90%; }
}

@keyframes skill_2 {
  from { width: 0; }
  to { width: 85%; }
}

@keyframes skill_3 {
  from { width: 0; }
  to { width: 80%; }
}

@keyframes skill_4 {
  from { width: 0; }
  to { width: 75%; }
}

@keyframes skill_5 {
  from { width: 0; }
  to { width: 70%; }
}

@keyframes skill_6 {
  from { width: 0; }
  to { width: 65%; }
}

@media (max-width: 768px) {
  .profile, .experience {
    width: 100%;
    float: none;
  }
  
  .picture-resume-wrapper,
  .name-wrapper {
    width: 100%;
    text-align: center;
  }
  
  .picture-resume {
    margin: 0 auto;
  }
  
  .name-wrapper h1 {
    text-align: center;
    padding-top: 20px;
  }
  
  .company-wrapper,
  .job-wrapper {
    width: 100%;
  }
}

@media print {
  body { font-size: 12px; }
  .resume-wrapper { height: auto; }
  .section-padding { padding: 30px 20px; }
}`,
    js: `// Animated bubble effect (requires GSAP library)
if (typeof TweenMax !== 'undefined') {
  var select = function(s) { return document.querySelector(s); }
  function randomBetween(min,max) {
    var number = Math.floor(Math.random()*(max-min+1)+min);
    return number !== 0 ? number : 0.5;
  }
  var tl = new TimelineMax();
  for(var i = 0; i < 20; i++){
    var t = TweenMax.to(select('.bubble' + i), randomBetween(1, 1.5), {
      x: randomBetween(12, 15) * (randomBetween(-1, 1)),
      y: randomBetween(12, 15) * (randomBetween(-1, 1)), 
      repeat:-1,
      repeatDelay:randomBetween(0.2, 0.5),
      yoyo:true,
      ease:Elastic.easeOut.config(1, 0.5)
    })
    tl.add(t, (i+1)/0.6)
  }
  tl.seek(50);
}`,
    features: ["Animated SVG background", "Two-column layout", "Skill bars with animation", "Responsive design", "Print optimized"],
    isNew: true
  },
  {
    id: "simple-elegant",
    name: "Simple Elegant",
    description: "Clean and elegant design with clear sections and professional typography",
    category: "minimal",
    license: "MIT",
    author: "Sonja Strieder",
    html: `<nav class="navbar">
  <div class="wrapper">
    <ul class="pull-right">
      <li><a href="#" class="navbar-btn">Download <span>(pdf)</span></a></li>
    </ul>
  </div>
</nav>

<article class="wrapper">
  <div class="header">
    <div class="header-col">
      <h1 class="title">
        <span class="shadow" data-key="fullName">John Doe</span>
        <span class="title-sub" data-key="role">Front-end Developer</span>
      </h1>
    </div>
    <div class="header-col contact">
      <div data-key="location">Seattle, WA</div>
      <div><a class="link" data-key="website" href="#">www.example.com</a></div>
      <div><a class="link" data-key="email" href="mailto:john@example.com">john@example.com</a></div>
    </div>
  </div>

  <section class="section">
    <h2 class="section-title">Profile</h2>
    <div class="section-content">
      <p data-key="summary">I specialize in component based HTML/CSS architecture, with a focus on maintainability and scalability, a mobile first approach.</p>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Skills</h2>
    <div class="section-content">
      <ul data-key="skills">
        <li>Highly skilled in creating performant <strong class="tag">HTML</strong>, <strong class="tag">CSS</strong></li>
        <li>Passionate about <strong class="tag">JavaScript</strong> and <strong class="tag">React</strong></li>
        <li>Experienced with <strong class="tag">Node.js</strong> and <strong class="tag">TypeScript</strong></li>
      </ul>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Experience</h2>
    <div class="section-content" data-repeat="experience">
      <h3 data-key="role">Front-end Developer</h3>
      <a class="link" data-key="company" href="#">Company Name</a><br>
      <span data-key="period">May 2017 - present</span>
      <ul data-key="responsibilities">
        <li>Developed and maintained web applications</li>
        <li>Collaborated with design team</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <h2 class="section-title">Education</h2>
    <div class="section-content" data-repeat="education">
      <h3 data-key="degree">BSc, Computer Science</h3>
      <a class="link" data-key="institution" href="#">University Name</a><br>
      <span data-key="period">2010 - 2014</span>
    </div>
  </section>
</article>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  background-color: #fff;
  color: #333;
  font-size: 1.6rem;
  font-family: Lato, Helvetica, Arial, sans-serif;
  font-weight: normal;
  letter-spacing: 0.008em;
  line-height: 1.5;
}

.wrapper {
  width: 80%;
  max-width: 90rem;
  margin-left: auto;
  margin-right: auto;
}

.navbar {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  line-height: 4rem;
  letter-spacing: 0.28rem;
  text-transform: uppercase;
  width: 100%;
  background-color: #111;
}

.navbar a {
  color: inherit;
  text-decoration: none;
  display: block;
  padding: 0 1rem;
}

.navbar-btn {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  background: #6fd1bd;
}

.navbar-btn:hover {
  background: salmon;
}

.pull-right {
  float: right;
  list-style: none;
}

.pull-right li {
  display: inline-block;
}

.header {
  margin-top: 8rem;
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.header-col:last-child {
  text-align: right;
}

.title {
  font-size: 4.2rem;
  font-family: Lato, 'Open Sans', Helvetica, Arial;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  display: inline-block;
}

.title-sub {
  font-size: 0.34em;
  letter-spacing: 0.16em;
  font-weight: 400;
  text-transform: none;
  display: block;
  margin-top: 1.5rem;
  padding-top: 2rem;
  border-top: 0.45em solid;
}

.shadow {
  text-shadow: 4px 4px 0 #6fd1bd;
  transition: text-shadow 0.2s ease-in-out;
}

.section {
  margin-top: 8rem;
  position: relative;
  border-top: 1px solid #ddd;
  padding-top: 5px;
}

.section:before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  border-top: 5px solid #333;
  width: 5rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 900;
  margin-top: 4rem;
  flex: 0 0 24%;
}

.section-content {
  margin-top: 4rem;
}

.section-content > :first-child {
  margin-top: 0;
}

h3 {
  font-size: 2rem;
  margin-top: 4rem;
}

ul {
  padding-left: 1.8rem;
  margin-top: 2rem;
}

.link {
  display: inline;
  position: relative;
  background-image: linear-gradient(to bottom, #8ee4d0 0, #8ee4d0 100%);
  background-position: 0 100%;
  background-repeat: repeat-x;
  background-size: 2px 2px;
  border-bottom: 0;
  text-decoration: none;
  color: #333;
}

.link:hover {
  background-image: linear-gradient(to bottom, #ffa68a 0, #ffa68a 100%);
}

.tag {
  color: #111;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
  font-weight: 700;
  line-height: 1;
  position: relative;
  display: inline-block;
  padding-left: 1rem;
  padding-right: 1rem;
}

.tag:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  height: 1em;
  bottom: 0;
  margin: auto;
  border-radius: 0.2rem;
  background-color: rgba(111, 209, 189, 0.5);
  transition: all 0.8s 0.4s ease-in-out;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-col:last-child {
    text-align: left;
    margin-top: 2rem;
  }
}

@media print {
  html {
    font-size: 50%;
  }
  
  .wrapper {
    width: 100%;
    max-width: none;
  }
  
  .navbar {
    display: none;
  }
  
  .header {
    margin-top: 0;
  }
  
  .section {
    margin-top: 4rem;
  }
  
  * {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  
  a, a:visited {
    text-decoration: underline;
  }
}

@page {
  margin: 2.2cm 2.2cm 1.8cm;
}`,
    features: ["Clean typography", "Professional layout", "Highlighted skills", "Print optimized", "Responsive design"],
    isNew: true
  },
  {
    id: "education-timeline",
    name: "Education Timeline",
    description: "Timeline-based layout perfect for showcasing educational background and career progression",
    category: "creative",
    license: "MIT",
    author: "Community",
    html: `<div class="container">
  <div class="row">
    <div class="col-main">
      <article class="timeline-item" data-repeat="education">
        <i class="timeline-icon fa fa-graduation-cap"></i>
        <h3 class="timeline-date" data-key="year">2019</h3>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" data-key="degree">PhD in Computer Engineering</h5>
            <h6 class="card-subtitle" data-key="institution">University Name</h6>
            <p class="card-text text-muted" data-key="period">2018 - 2019</p>
            <p class="card-text" data-key="description">
              Focused on advanced algorithms and machine learning applications. Published research in top-tier conferences.
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');

body {
  font-family: 'Open Sans', sans-serif;
  background: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: center;
}

.col-main {
  width: 100%;
  max-width: 800px;
}

.timeline-item {
  border-left: 1px solid #f4f5f7;
  position: relative;
  padding: 32px 24px 8px 40px;
  margin-left: 35px;
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .timeline-item {
    margin-left: 110px;
  }
}

.timeline-icon {
  position: absolute;
  left: -1.3rem;
  width: 42px;
  text-align: center;
  font-size: 22px;
  background-color: #fff;
  color: #3b82f6;
  padding: 8px 0;
}

.timeline-date {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .timeline-date {
    position: absolute;
    left: -10rem;
    width: 7.5rem;
    text-align: right;
  }
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 24px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
}

.card-title a {
  color: inherit;
  text-decoration: none;
}

.card-title a:hover {
  color: #3b82f6;
}

.card-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 8px;
}

.card-subtitle a {
  color: #3b82f6;
  text-decoration: none;
}

.card-subtitle a:hover {
  text-decoration: underline;
}

.card-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  margin-bottom: 12px;
}

.card-text:last-child {
  margin-bottom: 0;
}

.text-muted {
  color: #9ca3af !important;
  font-size: 0.9rem;
}

@media print {
  body {
    background: white;
    padding: 0;
  }
  
  .card {
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
  
  .timeline-item {
    page-break-inside: avoid;
  }
}`,
    features: ["Timeline layout", "Card-based design", "Hover effects", "Icon support", "Responsive design"],
    isNew: true
  },
  {
    id: "professional-compact",
    name: "Professional Compact",
    description: "Compact and information-dense layout ideal for experienced professionals",
    category: "executive",
    license: "MIT",
    author: "Community",
    html: `<div class="container">
  <div class="header">
    <div class="full-name">
      <span class="first-name" data-key="firstName">John</span> 
      <span class="last-name" data-key="lastName">Doe</span>
    </div>
    <div class="contact-info">
      <span class="email">Email: </span>
      <span class="email-val" data-key="email">john.doe@gmail.com</span>
      <span class="separator"></span>
      <span class="phone">Phone: </span>
      <span class="phone-val" data-key="phone">111-222-3333</span>
    </div>
    
    <div class="about">
      <span class="position" data-key="role">Front-End Developer</span>
      <span class="desc" data-key="summary">
        I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.
      </span>
    </div>
  </div>
  
  <div class="details">
    <div class="section">
      <div class="section__title">Experience</div>
      <div class="section__list">
        <div class="section__list-item" data-repeat="experience">
          <div class="left">
            <div class="name" data-key="company">Company Name</div>
            <div class="addr" data-key="location">San Francisco, CA</div>
            <div class="duration" data-key="period">Jan 2020 - Present</div>
          </div>
          <div class="right">
            <div class="name" data-key="role">Senior Developer</div>
            <div class="desc" data-key="description">Led development of key features and mentored junior developers.</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section__title">Education</div>
      <div class="section__list">
        <div class="section__list-item" data-repeat="education">
          <div class="left">
            <div class="name" data-key="institution">University Name</div>
            <div class="addr" data-key="location">San Francisco, CA</div>
            <div class="duration" data-key="period">2015 - 2019</div>
          </div>
          <div class="right">
            <div class="name" data-key="degree">Bachelor of Science</div>
            <div class="desc" data-key="field">Computer Science</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section__title">Skills</div>
      <div class="skills">
        <div class="skills__item" data-repeat="skills">
          <div class="left">
            <div class="name" data-key="skill">JavaScript</div>
          </div>
          <div class="right">
            <div class="skill-level" data-key="level">
              <span class="dot filled"></span>
              <span class="dot filled"></span>
              <span class="dot filled"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section__title">Interests</div>
      <div class="section__list">
        <div class="section__list-item">
          <span data-key="interests">Technology, Reading, Travel, Photography</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Lato:400,300,700');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  background: #eee;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: #222;
  font-size: 14px;
  line-height: 26px;
  padding-bottom: 50px;
}

.container {
  max-width: 700px;
  background: #fff;
  margin: 50px auto 0;
  box-shadow: 1px 1px 2px #DAD7D7;
  border-radius: 3px;
  padding: 40px;
}

.header {
  margin-bottom: 30px;
}

.full-name {
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.first-name {
  font-weight: 700;
}

.last-name {
  font-weight: 300;
}

.contact-info {
  margin-bottom: 20px;
}

.email,
.phone {
  color: #999;
  font-weight: 300;
}

.separator {
  height: 10px;
  display: inline-block;
  border-left: 2px solid #999;
  margin: 0px 10px;
}

.position {
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
  text-decoration: underline;
}

.details {
  line-height: 20px;
}

.section {
  margin-bottom: 40px;
}

.section:last-of-type {
  margin-bottom: 0px;
}

.section__title {
  letter-spacing: 2px;
  color: #54AFE4;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.section__list-item {
  margin-bottom: 40px;
}

.section__list-item:last-of-type {
  margin-bottom: 0;
}

.left,
.right {
  vertical-align: top;
  display: inline-block;
}

.left {
  width: 60%;
}

.right {
  text-align: right;
  width: 39%;
}

.name {
  font-weight: bold;
}

a {
  text-decoration: none;
  color: #000;
  font-style: italic;
}

a:hover {
  text-decoration: underline;
  color: #000;
}

.skills__item {
  margin-bottom: 10px;
}

.skills__item .right {
  text-align: right;
}

.dot {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #C3DEF3;
  border-radius: 20px;
  margin-right: 3px;
}

.dot.filled {
  background: #79A9CE;
}

@media (max-width: 600px) {
  .left,
  .right {
    width: 100%;
    text-align: left;
  }
  
  .right {
    margin-top: 10px;
  }
}

@media print {
  body {
    background: white;
  }
  
  .container {
    box-shadow: none;
    margin: 0;
  }
  
  .section {
    page-break-inside: avoid;
  }
}`,
    features: ["Compact layout", "Two-column sections", "Visual skill indicators", "Clean typography", "Print optimized"],
    isNew: true
  },
  {
    id: "rwd-modern",
    name: "RWD Modern",
    description: "Responsive web design with circular progress bars and modern visual elements",
    category: "modern",
    license: "MIT",
    author: "Community",
    html: `<div class="wrapper">
  <div class="intro">
    <div class="profile">
      <div class="photo">
        <svg viewBox="0 0 100 100" class="profile-icon">
          <circle cx="50" cy="50" r="45" fill="#3b82f6"/>
          <text x="50" y="60" font-size="40" text-anchor="middle" fill="white" font-weight="bold" data-key="initials">JD</text>
        </svg>
      </div>
      <h1 class="name" data-key="fullName">John Doe</h1>
      <h2 class="position" data-key="role">Full Stack Developer</h2>
    </div>
    <div class="contact">
      <div class="contact-item">
        <i class="icon">📧</i>
        <span data-key="email">john@example.com</span>
      </div>
      <div class="contact-item">
        <i class="icon">📱</i>
        <span data-key="phone">+1 234 567 890</span>
      </div>
      <div class="contact-item">
        <i class="icon">📍</i>
        <span data-key="location">San Francisco, CA</span>
      </div>
    </div>
  </div>
  
  <div class="detail">
    <div class="detail-section">
      <h3 class="section-title">About Me</h3>
      <p data-key="summary">Passionate developer with expertise in modern web technologies. Focused on creating elegant solutions to complex problems.</p>
    </div>
    
    <div class="detail-section">
      <h3 class="section-title">Experience</h3>
      <div class="timeline-block" data-repeat="experience">
        <h4 data-key="role">Senior Developer</h4>
        <p class="company" data-key="company">Tech Company</p>
        <p class="period" data-key="period">2020 - Present</p>
        <p data-key="description">Led development of key features and mentored junior developers.</p>
      </div>
    </div>
    
    <div class="detail-section">
      <h3 class="section-title">Education</h3>
      <div class="timeline-block" data-repeat="education">
        <h4 data-key="degree">Bachelor of Science</h4>
        <p class="company" data-key="institution">University Name</p>
        <p class="period" data-key="period">2015 - 2019</p>
      </div>
    </div>
    
    <div class="detail-section">
      <h3 class="section-title">Skills</h3>
      <div class="pg-list">
        <div class="pg-item" data-repeat="skills">
          <div class="skill-name" data-key="skill">JavaScript</div>
          <div class="pg-bar">
            <div class="pg-fill" style="width: 90%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-bg: #f9fafb;
  --color-white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

.wrapper {
  max-width: 1000px;
  margin: 40px auto;
  background: var(--color-white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.intro {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: var(--color-white);
  padding: 60px 40px;
  text-align: center;
}

.profile {
  margin-bottom: 30px;
}

.photo {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.profile-icon {
  width: 100%;
  height: 100%;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.position {
  font-size: 1.3rem;
  font-weight: 300;
  opacity: 0.9;
}

.contact {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.icon {
  font-size: 1.2rem;
}

.detail {
  padding: 40px;
}

.detail-section {
  margin-bottom: 40px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-primary);
}

.timeline-block {
  margin-bottom: 25px;
  padding-left: 20px;
  border-left: 2px solid #e5e7eb;
  position: relative;
}

.timeline-block:before {
  content: '';
  position: absolute;
  left: -6px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary);
}

.timeline-block h4 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.company {
  font-weight: 500;
  color: var(--color-text-light);
  margin-bottom: 3px;
}

.period {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-bottom: 10px;
}

.pg-list {
  display: grid;
  gap: 20px;
}

.pg-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skill-name {
  font-weight: 500;
  font-size: 1rem;
}

.pg-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.pg-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 4px;
  transition: width 1s ease;
}

@media (max-width: 768px) {
  .wrapper {
    margin: 20px;
  }
  
  .intro {
    padding: 40px 20px;
  }
  
  .detail {
    padding: 30px 20px;
  }
  
  .contact {
    flex-direction: column;
    gap: 15px;
  }
  
  .name {
    font-size: 2rem;
  }
}

@media print {
  body {
    background: white;
  }
  
  .wrapper {
    box-shadow: none;
    margin: 0;
  }
  
  .intro {
    background: var(--color-primary);
    print-color-adjust: exact;
  }
  
  .detail-section {
    page-break-inside: avoid;
  }
}`,
    features: ["Gradient header", "Circular progress bars", "Timeline layout", "Modern design", "Responsive"],
    isNew: true
  },
  {
    id: "creative-hexagon",
    name: "Creative Hexagon",
    description: "Unique creative design with hexagonal elements and animated background",
    category: "creative",
    license: "MIT",
    author: "Laighlin",
    html: `<main id="content">
  <h1>
    <div class="hex moved"></div>
    <span data-key="fullName">John Doe</span>
  </h1>
  <div class="subtext" id="main">
    <p data-key="summary">
      Creative developer and designer with a passion for innovative solutions. 
      Combining technical expertise with artistic vision to create memorable digital experiences.
    </p>
  </div>
  
  <h2>
    <div class="hex"></div>
    <span>Skills</span>
  </h2>
  <div class="subtext coll">
    <p data-key="skills">
      Proficient in modern web technologies including HTML5, CSS3, JavaScript, and React. 
      Strong design skills with Adobe Creative Suite. Experience with responsive design and accessibility.
    </p>
  </div>
  
  <h2>
    <div class="hex"></div>
    <span>Experience</span>
  </h2>
  <div class="subtext coll" data-repeat="experience">
    <h3 data-key="role">Creative Developer</h3>
    <p><strong data-key="company">Company Name</strong> | <span data-key="period">2020 - Present</span></p>
    <p data-key="description">Developed innovative web applications and interactive experiences.</p>
  </div>
  
  <h2>
    <div class="hex"></div>
    <span>Hobbies & Interests</span>
  </h2>
  <div class="subtext coll">
    <p data-key="interests">Design, coding, music, photography, and exploring new technologies.</p>
  </div>
  
  <h2>
    <div class="hex"></div>
    <span>Contact Me</span>
  </h2>
  <div class="subtext coll">
    <ul>
      <li>Phone: <span data-key="phone">+1 234 567 890</span></li>
      <li>E-mail: <span data-key="email">john@example.com</span></li>
      <li>Location: <span data-key="location">San Francisco, CA</span></li>
    </ul>
  </div>
</main>

<svg viewBox="0 0 500 150" preserveAspectRatio="none" class="wave" id="one">
  <path d="M-13.36,88.98 C168.85,182.73 276.72,-73.84 506.31,79.10 L500.00,150.00 L0.00,150.00 Z"></path>
</svg>
<svg viewBox="0 0 500 150" preserveAspectRatio="none" class="wave" id="two">
  <path d="M-13.36,88.98 C168.85,182.73 276.72,-73.84 506.31,79.10 L500.00,150.00 L0.00,150.00 Z"></path>
</svg>

<div id="hex-holder">
  <div class="hex" id="uno"></div>
  <div class="hex" id="dos"></div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css?family=Share+Tech|Share+Tech+Mono');

body {
  margin: 0;
  font-family: 'Share Tech', sans-serif;
  font-size: 16px;
  color: #505050;
  background: #eee;
  overflow-x: hidden;
}

main {
  position: relative;
  padding: 7vh 0 10vh;
  margin-top: -5px;
}

@media all and (min-width: 670px) {
  main {
    width: 570px;
    margin-left: 10vw;
  }
}

@media all and (max-width: 670px) {
  main {
    margin: 0 15px;
  }
}

.wave {
  width: 100vw;
  height: 150px;
  position: fixed;
  bottom: 0;
  fill: #1b7477;
  z-index: -1;
}

#one {
  height: 180px;
  fill: #8adbd3;
  width: 120vw;
  left: -10vw;
}

h1, h2 {
  position: relative;
  display: flex;
  align-items: center;
  font-family: 'Share Tech Mono', monospace;
  line-height: 1em;
  word-spacing: -0.1em;
  letter-spacing: -0.05em;
  transition: 0.2s all ease;
  margin-left: 10px;
  margin-bottom: 15px;
}

h1 span, h2 span {
  background: rgba(238, 238, 238, 0.7);
  padding: 5px 7px;
  border-radius: 10px;
  box-sizing: border-box;
}

h1:active, h2:active {
  color: #51b5ac;
}

h1 {
  font-size: 2.2em;
}

h2 {
  cursor: pointer;
  font-size: 1.5em;
}

h2:hover {
  color: #777;
}

h3 {
  margin: 10px 0 5px;
  font-size: 1.1em;
}

p:first-child {
  margin-top: 0;
}

p:last-child {
  margin-bottom: 0;
}

.subtext {
  position: relative;
  border-radius: 10px;
  background: white;
  border: 1px solid #bbb;
  padding: 13px;
  line-height: 1.5em;
  margin-bottom: 20px;
}

.subtext:not(#main) {
  display: block;
}

.subtext ul {
  margin: 0;
  padding: 0 25px;
}

.subtext a {
  color: #0a9;
  text-decoration: underline;
  cursor: pointer;
  transition: 0.2s all ease;
}

.subtext a:hover {
  color: #777;
}

.subtext:before {
  content: '';
  position: absolute;
  width: 1px;
  background: #bbb;
  left: 1.2em;
  height: 1.2em;
  top: calc(-1.2em - 1px);
}

.subtext.coll:before {
  left: 1em;
  height: 1.2em;
  top: calc(-1.2em - 1px);
}

.hex:hover {
  transform: rotate(30deg);
}

.hex, .hex:before, .hex:after {
  height: 1em;
  width: 0.59em;
  border: solid;
  border-width: 1px 0;
  border-radius: 2px;
  box-sizing: border-box;
  border-color: #bbb;
}

main .hex {
  position: relative;
  display: inline-block;
  margin-right: 0.5em;
  transition: 0.4s all ease;
}

.hex:before, .hex:after {
  content: '';
  position: absolute;
  margin-top: -1px;
}

.hex:before {
  transform: rotate(60deg);
}

.hex:after {
  transform: rotate(-60deg);
}

.hex.moved {
  transform: rotate(30deg);
}

#hex-holder {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: -1;
  pointer-events: none;
  font-size: 60px;
}

#hex-holder .hex {
  position: fixed;
}

#uno {
  border-radius: 4px;
  border: none;
  background: #5b8b8c;
  transform: rotate(-12deg);
  bottom: 30vh;
  left: 30px;
}

#uno:before, #uno:after {
  margin-top: 0;
  border: inherit;
  border-radius: inherit;
  background: inherit;
}

#dos {
  border-color: #1B7477;
  border-radius: 3px;
  border-width: 5px 0;
  font-size: 100px;
  bottom: 12vh;
  right: -20px;
  transform: rotate(7deg);
}

#dos:before, #dos:after {
  margin-top: -5px;
  border: inherit;
  border-radius: inherit;
  background: inherit;
}

@media print {
  body {
    background: white;
  }
  
  .wave, #hex-holder {
    display: none;
  }
  
  main {
    width: 100%;
    margin: 0;
    padding: 20px;
  }
  
  .subtext {
    page-break-inside: avoid;
  }
}`,
    features: ["Unique hexagonal design", "Animated waves", "Creative layout", "Interactive elements", "Modern typography"],
    isNew: true
  }
]

// Utility function to map resume data to HTML template
export function mapResumeDataToHTML(template: HTMLTemplate, resumeData: any): string {
  let html = template.html

  // Replace single data keys
  html = html.replace(/data-key='fullName'/g, `data-key='fullName'>${resumeData.name || 'John Doe'}<`)
  html = html.replace(/data-key='email'/g, `data-key='email'>${resumeData.email || 'john@example.com'}<`)
  html = html.replace(/data-key='phone'/g, `data-key='phone'>${resumeData.phone || '+33 6 12 34 56 78'}<`)

  // Handle skills array
  if (resumeData.skills && Array.isArray(resumeData.skills)) {
    const skillsText = resumeData.skills.join(', ')
    html = html.replace(/class='skills-list'[^>]*>[^<]*</g, `class='skills-list'>${skillsText}<`)
  }

  // Handle experience array
  if (resumeData.experience && Array.isArray(resumeData.experience)) {
    const experienceHTML = resumeData.experience.map((exp: any) => {
      const detailsHTML = exp.details?.map((detail: string) => 
        `<li class='text-sm print:text-xs'>${detail}</li>`
      ).join('') || ''
      
      return `<article class='mb-4 print:mb-3'>
        <div class='flex justify-between items-start mb-1'>
          <strong class='text-base print:text-sm'>${exp.company || 'Company'}</strong>
          <span class='text-sm text-neutral-500 print:text-xs'>${exp.period || 'Period'}</span>
        </div>
        <div class='text-sm text-neutral-700 mb-2 print:text-xs'>${exp.role || 'Role'}</div>
        <ul class='list-disc ml-5 space-y-1 print:space-y-0'>${detailsHTML}</ul>
      </article>`
    }).join('')
    
    // Replace the template experience section
    html = html.replace(/<article[^>]*data-repeat='experience'[^>]*>[\s\S]*?<\/article>/g, experienceHTML)
  }

  return html
}

// Function to generate complete HTML document
export function generateHTMLDocument(template: HTMLTemplate, resumeData: any): string {
  const mappedHTML = mapResumeDataToHTML(template, resumeData)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.name || 'Resume'} - ${template.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${template.css}
  </style>
</head>
<body>
  ${mappedHTML}
  ${template.js ? `<script>${template.js}</script>` : ''}
</body>
</html>`
}
