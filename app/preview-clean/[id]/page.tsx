/**
 * Clean Template Preview Page (No Headers/Toolbars)
 * 
 * GET /preview-clean/[id]
 * - Renders template with sample data
 * - No CV Helper headers or toolbars
 * - Clean preview for thumbnails and modals
 */

import { REACT_TEMPLATES, type TemplateId } from '@/lib/react-templates'
import { notFound } from 'next/navigation'
import type { UniversalResumeData } from '@/lib/schemas'

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
  summary: "Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers.",
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
        "Implemented CI/CD pipeline reducing deployment time by 60%"
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
        "Improved test coverage from 45% to 85%"
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
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    "Git", "CI/CD", "Agile/Scrum", "REST APIs", "GraphQL"
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
      url: "github.com/johnanderson/ecommerce",
      highlights: [
        "Processed $500K+ in transactions",
        "Implemented secure payment gateway"
      ]
    }
  ],
  languages: [
    { name: "English", proficiency: "Native" },
    { name: "Spanish", proficiency: "Professional" }
  ]
}

export default async function CleanPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const templateId = id as TemplateId
  const TemplateComponent = REACT_TEMPLATES[templateId]

  if (!TemplateComponent) {
    return (
      <div className="p-8 text-center">
        <h1>Template not found: {templateId}</h1>
      </div>
    )
  }

  return (
    <html lang="en">
      <head>
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
              margin: 0 !important;
              padding: 0 !important;
            }
            
            #preview-container {
              width: 1240px;
              min-height: 1754px;
            }
          `
        }} />
      </head>
      <body>
        <div id="preview-container">
          <TemplateComponent data={SAMPLE_CV_DATA} />
        </div>
      </body>
    </html>
  )
}
