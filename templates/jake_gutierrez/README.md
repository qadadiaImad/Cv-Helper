# Jake Gutierrez Resume Template

## License
MIT License - Based on the original work by Jake Gutierrez

## Source
Original template: https://github.com/jakegut/resume

## Description
A clean, professional LaTeX resume template with a modern layout. Features clear section divisions and excellent readability.

## Required Fields
- fullName
- email
- education (at least one entry)
- experience (at least one entry)

## Optional Fields
- phone
- links (linkedin, github, portfolio)
- projects
- skills
- photoPath (not supported in this template)

## Template Anchors
- `%HEADER` - Personal information and contact details
- `%EDUCATION` - Educational background
- `%EXPERIENCE` - Work experience
- `%PROJECTS` - Personal/professional projects
- `%SKILLS` - Technical skills and competencies

## Example JSON
\`\`\`json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "links": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  },
  "education": [
    {
      "school": "University of Technology",
      "city": "San Francisco, CA",
      "degree": "Bachelor of Science in Computer Science",
      "dates": "Aug. 2018 -- May 2022"
    }
  ],
  "experience": [
    {
      "company": "Tech Corp",
      "title": "Software Engineer",
      "city": "San Francisco, CA",
      "dates": "June 2022 -- Present",
      "bullets": [
        "Developed and maintained web applications using React and Node.js",
        "Collaborated with cross-functional teams to deliver high-quality software"
      ]
    }
  ],
  "projects": [
    {
      "name": "Personal Portfolio",
      "stack": "React, TypeScript, Tailwind CSS",
      "dates": "2022",
      "bullets": [
        "Built responsive portfolio website showcasing projects and skills"
      ]
    }
  ],
  "skills": {
    "languages": ["JavaScript", "TypeScript", "Python"],
    "frameworks": ["React", "Node.js", "Express"],
    "tools": ["Git", "Docker", "AWS"]
  }
}
