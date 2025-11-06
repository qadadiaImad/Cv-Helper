/**
 * COMPLETE SAMPLE DATA - Shows 100% of schema capabilities
 */

import type { UniversalResumeData } from './universal-schema'

export const COMPLETE_SAMPLE_DATA: UniversalResumeData = {
  personal: {
    fullName: 'Brian T. Wayne',
    title: 'Product Manager',
    email: 'brian.wayne@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'brianwayne.com',
    linkedIn: 'linkedin.com/in/brianwayne',
    github: 'github.com/brianwayne',
    portfolio: 'portfolio.brianwayne.com',
    photo: {
      url: 'https://i.pravatar.cc/200?img=12',
      size: 120,
      aspectRatio: 1,
      borderRadius: 50,
    },
  },

  summary: 'Results-driven Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative solutions. Proven track record of launching successful products that drive business growth and enhance user experience. Skilled in agile methodologies, data analysis, and stakeholder management.',

  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Product Manager',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: 'Leading product strategy for enterprise SaaS platform',
      achievements: [
        'Launched 3 major product features that increased user engagement by 45%',
        'Managed $2M product development budget and delivered projects on time',
        'Led cross-functional team of 12 engineers, designers, and analysts',
        'Implemented data-driven decision making process that reduced churn by 25%',
      ],
      technologies: ['Jira', 'Confluence', 'Mixpanel', 'Figma'],
    },
    {
      company: 'Startup Inc',
      position: 'Product Manager',
      location: 'San Francisco, CA',
      startDate: 'Mar 2018',
      endDate: 'Dec 2019',
      description: 'Managed mobile app product lifecycle',
      achievements: [
        'Grew monthly active users from 50K to 500K in 18 months',
        'Conducted user research with 200+ customers to inform product roadmap',
        'Collaborated with engineering team to improve app performance by 60%',
      ],
      technologies: ['Firebase', 'Google Analytics', 'Sketch'],
    },
    {
      company: 'Digital Agency',
      position: 'Associate Product Manager',
      location: 'New York, NY',
      startDate: 'Jun 2016',
      endDate: 'Feb 2018',
      description: 'Supported product development for client projects',
      achievements: [
        'Assisted in launching 5 client projects with 100% satisfaction rate',
        'Created product requirements documents and user stories',
        'Facilitated sprint planning and retrospective meetings',
      ],
      technologies: ['Trello', 'Slack', 'Adobe XD'],
    },
  ],

  education: [
    {
      institution: 'Stanford University',
      degree: 'MBA',
      field: 'Business Administration',
      location: 'Stanford, CA',
      startDate: '2014',
      endDate: '2016',
      gpa: '3.8',
      honors: ['Dean\'s List', 'Product Management Specialization'],
      coursework: ['Strategy', 'Marketing', 'Data Analytics'],
    },
    {
      institution: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2010',
      endDate: '2014',
      gpa: '3.6',
      honors: ['Cum Laude'],
    },
  ],

  skills: [
    'Product Strategy',
    'Agile/Scrum',
    'User Research',
    'A/B Testing',
    'Data Analysis',
    'Roadmap Planning',
    'Stakeholder Management',
    'SQL',
    'Jira',
    'Figma',
    'Google Analytics',
    'Mixpanel',
  ],

  skillCategories: [
    {
      category: 'Product Management',
      skills: [
        { name: 'Product Strategy', level: 'Expert' },
        { name: 'Agile/Scrum', level: 'Expert', years: 8 },
        { name: 'Roadmap Planning', level: 'Advanced' },
      ],
    },
    {
      category: 'Technical',
      skills: [
        { name: 'SQL', level: 'Advanced' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'APIs', level: 'Intermediate' },
      ],
    },
    {
      category: 'Design & Analytics',
      skills: [
        { name: 'Figma', level: 'Advanced' },
        { name: 'Google Analytics', level: 'Expert' },
        { name: 'Mixpanel', level: 'Advanced' },
      ],
    },
  ],

  projects: [
    {
      name: 'Mobile Payment Platform',
      description: 'Led development of peer-to-peer payment app with 100K+ downloads',
      role: 'Product Lead',
      startDate: 'Jan 2020',
      endDate: 'Dec 2020',
      technologies: ['React Native', 'Node.js', 'Stripe', 'Firebase'],
      url: 'paymentapp.com',
      github: 'github.com/brianwayne/payment-platform',
      highlights: [
        'Achieved 4.8 star rating on App Store',
        'Processed $5M in transactions in first year',
        'Featured in TechCrunch',
      ],
    },
    {
      name: 'E-commerce Analytics Dashboard',
      description: 'Built analytics dashboard for small business owners',
      role: 'Product Manager',
      technologies: ['React', 'D3.js', 'PostgreSQL'],
      highlights: [
        'Served 500+ active businesses',
        'Reduced reporting time by 70%',
      ],
    },
  ],

  certifications: [
    {
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      date: 'Mar 2019',
      credentialId: 'CSPO-123456',
    },
    {
      name: 'Google Analytics Certification',
      issuer: 'Google',
      date: 'Jun 2020',
      expiryDate: 'Jun 2023',
    },
  ],

  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Professional' },
    { name: 'Mandarin', proficiency: 'Intermediate' },
  ],

  awards: [
    {
      title: 'Product Manager of the Year',
      issuer: 'Tech Corp',
      date: '2022',
      description: 'Recognized for exceptional product leadership',
    },
    {
      title: 'Innovation Award',
      issuer: 'Startup Inc',
      date: '2019',
    },
  ],

  volunteer: [
    {
      organization: 'Code for America',
      role: 'Product Advisor',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Providing pro-bono product consulting for civic tech projects',
      achievements: [
        'Advised 3 civic tech projects serving 50K+ citizens',
        'Mentored junior product managers',
      ],
    },
  ],

  interests: [
    { name: 'Technology', description: 'AI/ML and emerging tech' },
    { name: 'Photography', description: 'Landscape and street photography' },
    { name: 'Hiking' },
  ],

  publications: [
    {
      title: 'The Future of Product Management',
      publisher: 'Medium',
      date: 'Oct 2022',
      url: 'medium.com/@brianwayne/future-of-pm',
    },
  ],
}
