import type { ResumeData } from '../templates/react-templates'

export function getSampleData(): ResumeData {
  return {
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
      {
        school: 'Tech Institute',
        degree: 'Advanced Web Development Certificate',
        year: '2020',
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
          'Implemented CI/CD pipelines reducing deployment time by 60%',
        ],
      },
      {
        company: 'Startup Inc',
        role: 'Full Stack Developer',
        period: '2019 - 2020',
        details: [
          'Built scalable web applications using React and Node.js',
          'Reduced load time by 50% through code optimization',
          'Collaborated with design team to improve UX',
        ],
      },
    ],
    projects: [
      {
        title: 'E-Commerce Platform',
        description: 'Built a scalable e-commerce solution with React, Node.js, and PostgreSQL serving 10k+ daily users',
        link: 'github.com/johndoe/ecommerce',
      },
      {
        title: 'Task Management App',
        description: 'Collaborative tool with real-time updates using WebSocket and React',
        link: 'github.com/johndoe/taskmanager',
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization dashboard with D3.js and TypeScript',
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
}
