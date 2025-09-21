# FlowCV - Professional LaTeX Resume Builder

*AI-powered resume generation with professional LaTeX templates*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/imadqadadia-4062s-projects/v0-cv-generator)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/3QjjODCpove)

## 🚀 Overview

FlowCV is a modern, AI-powered resume builder that combines the professional typesetting quality of LaTeX with the convenience of a web application. Upload your existing CV, paste a job description, and let AI automatically adapt your resume to match the job requirements while maintaining professional formatting.

### ✨ Key Features

- **🤖 AI-Powered Adaptation**: Automatically tailor your resume to match job descriptions using OpenAI GPT-4o-mini
- **📄 Professional LaTeX Templates**: Choose from carefully crafted, ATS-friendly templates
- **⚡ Real-time Compilation**: See your changes instantly with fast LaTeX compilation
- **📁 Multiple Export Formats**: Download as PDF, LaTeX source, or JSON data
- **🔒 Secure & Private**: No permanent data storage, secure LaTeX compilation
- **🌐 Multi-language Support**: English and French language adaptation

## 🏗️ Current Implementation

### Core Features ✅

#### API Endpoints
- **`/api/parse`** - Extract text from uploaded files (PDF, DOCX, DOC, TXT)
- **`/api/adapt`** - AI-powered CV adaptation to job descriptions
- **`/api/generate`** - Generate resumes from structured data
- **`/api/compile`** - Secure LaTeX to PDF compilation

#### User Interface
- **Template Selection**: Interactive template picker with preview modals
- **CV Form Builder**: Comprehensive form with validation for all resume sections
- **File Upload**: Drag-and-drop interface for CV and job description files
- **LaTeX Editor**: Code editor with syntax highlighting and preview
- **PDF Preview**: Real-time PDF viewer with download capabilities

#### LaTeX Templates
- **Jake Gutierrez Template**: Modern design with FontAwesome icons
- **SB2nov Template**: Classic academic/professional layout
- Both templates support: Education, Experience, Projects, Skills sections
- ATS-friendly formatting with proper spacing and typography

#### AI Integration
- **OpenAI GPT-4o-mini**: Cost-effective, high-quality content generation
- **Smart Adaptation**: Analyzes job descriptions and adapts CV content accordingly
- **Keyword Extraction**: Identifies important skills and requirements
- **Content Scoring**: Measures alignment between CV and job requirements
- **Security Validation**: Prevents dangerous LaTeX command injection

### Technical Stack

#### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **React Hook Form** with Zod validation
- **Lucide React** icons

#### Backend
- **Next.js API Routes** for serverless functions
- **Tectonic LaTeX Engine** for PDF compilation
- **OpenAI AI SDK** for GPT integration
- **Zod** for schema validation and type safety

#### Development Tools
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Vercel Analytics** for usage tracking

## 🚧 Future Development Roadmap

### Phase 1: Enhanced User Experience (Q1 2025)
- [ ] **Monaco Editor Integration**: Advanced LaTeX editor with syntax highlighting
- [ ] **Template Preview System**: Live PDF previews for all templates
- [ ] **Drag & Drop Form Builder**: Visual form builder for custom sections
- [ ] **Real-time Collaboration**: Share and collaborate on resumes
- [ ] **Version History**: Track and revert resume changes

### Phase 2: Advanced AI Features (Q2 2025)
- [ ] **Multi-Model Support**: Integration with Claude, Gemini, and other AI models
- [ ] **Industry-Specific Optimization**: Tailored prompts for different industries
- [ ] **Skills Gap Analysis**: Identify missing skills from job descriptions
- [ ] **Cover Letter Generation**: AI-powered cover letter creation
- [ ] **Interview Preparation**: Generate potential interview questions

### Phase 3: Template Ecosystem (Q3 2025)
- [ ] **Template Marketplace**: Community-contributed templates
- [ ] **Custom Template Builder**: Visual template designer
- [ ] **Industry Templates**: Specialized templates for different fields
- [ ] **Multi-page Support**: Support for longer CVs and portfolios
- [ ] **Internationalization**: Templates for different countries/regions

### Phase 4: Professional Features (Q4 2025)
- [ ] **User Accounts & Profiles**: Save and manage multiple resumes
- [ ] **Team Collaboration**: HR teams and career counselors
- [ ] **Analytics Dashboard**: Track application success rates
- [ ] **API Access**: Public API for integrations
- [ ] **White-label Solution**: Branded versions for organizations

### Phase 5: Advanced Integrations (2026)
- [ ] **ATS Integration**: Direct submission to job boards
- [ ] **LinkedIn Sync**: Import profile data automatically
- [ ] **GitHub Integration**: Showcase projects and contributions
- [ ] **Portfolio Integration**: Link to personal websites and portfolios
- [ ] **Job Board Connections**: Integration with major job platforms

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- OpenAI API key
- Tectonic LaTeX engine (for local development)

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/flowcv.git
cd flowcv

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Run development server
npm run dev
\`\`\`

### Environment Variables

\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── adapt/         # CV adaptation endpoint
│   │   ├── compile/       # LaTeX compilation
│   │   ├── generate/      # Resume generation
│   │   └── parse/         # File parsing
│   ├── dashboard/         # Main application pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cv-form.tsx       # Resume form builder
│   ├── latex-editor.tsx  # LaTeX code editor
│   └── template-picker.tsx # Template selection
├── lib/                   # Utility libraries
│   ├── ai/               # AI integration
│   ├── latex/            # LaTeX processing
│   ├── parse/            # File parsing
│   └── templates.ts      # Template management
├── templates/            # LaTeX template files
│   ├── jake_gutierrez/   # Jake Gutierrez template
│   └── sb2nov/          # SB2nov template
└── scripts/             # Utility scripts
\`\`\`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jake Gutierrez** - Original LaTeX resume template
- **Sourabh Bajaj** - SB2nov LaTeX template
- **OpenAI** - GPT-4o-mini AI model
- **Vercel** - Hosting and deployment platform
- **shadcn/ui** - Beautiful UI components

## 📞 Support

- **Documentation**: [https://flowcv.dev/docs](https://flowcv.dev/docs)
- **Issues**: [GitHub Issues](https://github.com/your-username/flowcv/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/flowcv/discussions)
- **Email**: support@flowcv.dev

---

**Built with ❤️ using Next.js, LaTeX, and AI**
