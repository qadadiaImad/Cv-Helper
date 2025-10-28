/**
 * Template Preview Page for Puppeteer Screenshots
 * 
 * GET /preview/[id]
 * - Renders template with sample data
 * - No navigation, headers, or footers
 * - Optimized for screenshot capture
 * - Fixed dimensions (1240x1754 - A4 ratio)
 */

import { getTemplateById } from '@/lib/template-registry'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Sample resume data for OLD templates
const SAMPLE_DATA = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  links: [
    { label: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
    { label: 'GitHub', url: 'github.com/johndoe' },
    { label: 'Portfolio', url: 'johndoe.com' },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      year: '2015 - 2019',
    },
  ],
  experience: [
    {
      company: 'Tech Corp',
      role: 'Senior Software Engineer',
      period: '2020 - Present',
      details: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored team of 5 junior developers',
        'Improved system performance by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
    },
    {
      company: 'Startup Inc',
      role: 'Full Stack Developer',
      period: '2019 - 2020',
      details: [
        'Built and deployed scalable web applications using React and Node.js',
        'Collaborated with cross-functional teams in agile environment',
        'Reduced load time by 50% through code optimization',
      ],
    },
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Built a scalable e-commerce solution with React, Node.js, and PostgreSQL',
      link: 'github.com/johndoe/ecommerce',
    },
    {
      title: 'Task Management App',
      description: 'Developed a collaborative task management tool with real-time updates',
      link: 'github.com/johndoe/taskmanager',
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Git',
    'Agile/Scrum',
  ],
}

// Sample data for NEW universal templates
const UNIVERSAL_SAMPLE_DATA = {
  personal: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.com',
  },
  summary: {
    text: 'Experienced software engineer with 5+ years building scalable web applications. Passionate about clean code, mentorship, and delivering high-quality solutions.',
  },
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      achievements: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored team of 5 junior developers',
        'Improved system performance by 40% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker'],
    },
    {
      company: 'Startup Inc',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: 'Jun 2019',
      endDate: 'Dec 2019',
      achievements: [
        'Built and deployed scalable web applications using React and Node.js',
        'Collaborated with cross-functional teams in agile environment',
        'Reduced load time by 50% through code optimization',
      ],
      technologies: ['React', 'Express', 'MongoDB'],
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      gpa: '3.8/4.0',
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Git',
    'Agile/Scrum',
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Built a scalable e-commerce solution with React, Node.js, and PostgreSQL',
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      highlights: [
        'Implemented secure payment processing',
        'Built real-time inventory management',
      ],
      url: 'github.com/johndoe/ecommerce',
    },
    {
      name: 'Task Management App',
      description: 'Developed a collaborative task management tool with real-time updates',
      technologies: ['React', 'Firebase', 'TypeScript'],
      highlights: [
        'Real-time collaboration features',
        'Drag-and-drop interface',
      ],
      url: 'github.com/johndoe/taskmanager',
    },
  ],
  languages: [
    { name: 'English', proficiency: 'Native' as const },
    { name: 'Spanish', proficiency: 'Professional' as const },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)
  return {
    title: template ? `${template.name} Preview` : 'Template Preview',
    robots: 'noindex, nofollow', // Don't index preview pages
  }
}

export default async function TemplatePreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)

  if (!template || template.hidden) {
    notFound()
  }

  // Import template from react-templates
  const { REACT_TEMPLATES } = await import('@/lib/react-templates')
  const TemplateComponent = REACT_TEMPLATES[template.id as keyof typeof REACT_TEMPLATES]
  
  if (!TemplateComponent) {
    return (
      <div className="p-8 text-center">
        <h1>Template not found: {template.id}</h1>
      </div>
    )
  }

  // Determine which data format to use based on template ID
  const isUniversalTemplate = [
    'atlantic_blue',
    'executive',
    'mercury',
    'classic',
    'harvard',
    'evergreen',
    'youngcurve',
  ].includes(template.id)

  const templateData = isUniversalTemplate ? UNIVERSAL_SAMPLE_DATA : SAMPLE_DATA

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            width: 1240px;
            min-height: 1754px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: white;
            overflow-x: hidden;
          }
          
          #preview-container {
            width: 1240px;
            min-height: 1754px;
          }
        `
      }} />
      
      <div id="preview-container">
        <TemplateComponent data={templateData} />
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            window.addEventListener('load', function() {
              setTimeout(function() {
                window.previewReady = true;
                console.log('Preview ready!');
              }, 500);
            });
            
            setTimeout(function() {
              window.previewReady = true;
            }, 2000);
          })();
        `
      }} />
    </>
  )
}
