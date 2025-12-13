/**
 * SAMPLE CV DATA
 * Provides realistic sample data for all components
 */

import type { UniversalResumeData } from '@cv-lib/schemas'

export const SAMPLE_CV_DATA: UniversalResumeData = {
  personal: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'johndoe.dev',
    linkedIn: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'portfolio.johndoe.dev',
    photo: {
      url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      size: 120,
    },
  },

  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2020',
      endDate: 'Present',
      description: 'Leading development of cloud-native applications',
      achievements: [
        'Led team of 5 engineers to deliver major product features',
        'Reduced API response time by 60% through optimization',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
        'Mentored junior developers and conducted code reviews',
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    },
    {
      company: 'Startup Inc',
      position: 'Full Stack Developer',
      location: 'New York, NY',
      startDate: '2018',
      endDate: '2020',
      achievements: [
        'Built MVP from scratch serving 10,000+ users',
        'Integrated payment processing with Stripe',
        'Implemented real-time features using WebSockets',
      ],
      technologies: ['Vue.js', 'Python', 'MongoDB'],
    },
  ],

  education: [
    {
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2014',
      endDate: '2018',
      gpa: '3.8',
      honors: ['Magna Cum Laude', 'Dean\'s List'],
      coursework: ['Data Structures', 'Algorithms', 'Machine Learning', 'Distributed Systems'],
    },
  ],

  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Git'],

  skillCategories: [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 'Expert' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'Vue.js', level: 'Advanced' },
        { name: 'CSS/Tailwind', level: 'Advanced' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 'Expert' },
        { name: 'Python', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'MongoDB', level: 'Intermediate' },
      ],
    },
    {
      category: 'DevOps',
      skills: [
        { name: 'AWS', level: 'Advanced' },
        { name: 'Docker', level: 'Advanced' },
        { name: 'CI/CD', level: 'Intermediate' },
      ],
    },
  ],

  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management',
      role: 'Lead Developer',
      startDate: '2023',
      endDate: 'Present',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe'],
      url: 'https://example-ecommerce.com',
      github: 'github.com/johndoe/ecommerce',
      highlights: [
        'Handles 1000+ concurrent users',
        'Integrated with 5+ payment providers',
        'Achieved 99.9% uptime',
      ],
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      technologies: ['Vue.js', 'Firebase', 'WebSockets'],
      highlights: [
        'Real-time collaboration features',
        'Mobile-responsive design',
      ],
    },
  ],

  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-12345',
      url: 'https://aws.amazon.com/certification',
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      date: '2022',
    },
  ],

  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Professional' },
    { name: 'French', proficiency: 'Intermediate' },
  ],

  summary: 'Experienced software engineer with 6+ years building scalable web applications. Passionate about clean code, system design, and mentoring. Proven track record of delivering high-impact features and leading technical initiatives.',
}

// Individual component sample data
export const COMPONENT_SAMPLES = {
  text: {
    children: 'Sample Text',
  },
  badge: {
    children: 'React',
  },
  avatar: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sample',
    alt: 'Profile Photo',
  },
  icon: {
    children: '📧',
  },
  contactItem: {
    icon: '📧',
    value: 'john@example.com',
  },
  sectionHeader: {
    title: 'Experience',
  },
  skillTag: {
    skill: 'React',
    level: 4,
  },
}
