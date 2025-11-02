/**
 * API Route for Clean Template Preview
 * Returns pure HTML without any Next.js layouts
 */

import { REACT_TEMPLATES, type TemplateId } from '@/lib/react-templates'
import type { UniversalResumeData } from '@/lib/schemas'
import { createElement } from 'react'

// Sample data for preview
const SAMPLE_CV_DATA: UniversalResumeData = {
  personal: {
    fullName: "John Anderson",
    title: "Senior Software Engineer",
    email: "john.anderson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedIn: "linkedin.com/in/johnanderson",
    github: "github.com/johnanderson",
    website: "johnanderson.dev",
  },
  summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership.",
  experience: [
    {
      company: "Tech Innovations Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      achievements: [
        "Led development of microservices architecture serving 2M+ daily users",
        "Reduced system latency by 40% through optimization strategies",
        "Mentored team of 5 junior developers",
      ]
    },
    {
      company: "Digital Solutions Corp",
      position: "Software Engineer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      location: "Seattle, WA",
      achievements: [
        "Developed RESTful APIs handling 100K+ requests per day",
        "Built responsive web applications using React and TypeScript",
      ]
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2011",
      endDate: "2015",
      gpa: "3.8/4.0"
    }
  ],
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "Python",
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution",
      technologies: ["React", "Node.js", "Stripe"],
      url: "github.com/johnanderson/ecommerce",
      highlights: ["Processed $500K+ in transactions"]
    }
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Professional" }
  ]
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const templateId = id as TemplateId
  const TemplateComponent = REACT_TEMPLATES[templateId]

  if (!TemplateComponent) {
    return new Response('Template not found', { status: 404 })
  }

  // Dynamically import ReactDOMServer to avoid Next.js warning
  const ReactDOMServer = (await import('react-dom/server')).default
  
  // Render template to static HTML
  const templateHtml = ReactDOMServer.renderToStaticMarkup(
    createElement(TemplateComponent, { data: SAMPLE_CV_DATA })
  )

  // Return complete HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template Preview</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: white;
      display: inline-block;
    }
  </style>
</head>
<body>
  ${templateHtml}
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
