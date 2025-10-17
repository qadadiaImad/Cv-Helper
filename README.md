# CV-Helper - Professional Multi-Format Resume Builder

*AI-powered resume generation with LaTeX, HTML, and React templates*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/imadqadadia-4062s-projects/v0-cv-generator)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

## 🚀 Overview

CV-Helper is a comprehensive, AI-powered resume builder that offers multiple template formats (LaTeX, HTML, React) with FlowCV-inspired design. Create, customize, and export professional resumes with real-time preview, AI adaptation to job descriptions, and a beautiful theme system.

### ✨ Key Features

- **🤖 AI-Powered Adaptation**: GPT-4o-mini adapts resumes to job descriptions
- **🎨 13 Professional Templates**: LaTeX (2), HTML (6), React (13) templates
- **🎭 8 Theme System**: Light/Dark modes with 8 color themes (Rose, Lavender, Mint, Ocean, Sunset, Slate, Forest, Cosmic)
- **👤 User Authentication**: Secure JWT-based auth with Prisma + SQLite
- **⚡ Real-time Preview**: Instant PDF and live preview with multiple renderers
- **📁 Multiple Export Formats**: PDF, LaTeX source, HTML, JSON
- **🔐 Protected Routes**: Middleware-based route protection
- **📱 Responsive Design**: FlowCV-inspired UI with modern aesthetics

## 🏗️ Architecture & Implementation

### 📡 API Endpoints

#### Resume Generation
- **`POST /api/generate`** - Generate LaTeX resume from structured JSON data
  - Input: Resume data (JSON)
  - Output: LaTeX source code
  - Templates: Jake Gutierrez, SB2nov

- **`POST /api/generate-react-pdf`** - Generate PDF from React templates
  - Input: Resume data + template ID
  - Output: PDF file
  - Uses: @react-pdf/renderer

#### LaTeX Compilation
- **`POST /api/compile`** - Compile LaTeX to PDF
  - Input: LaTeX source code
  - Output: PDF binary
  - Engine: Tectonic LaTeX

#### AI Services
- **`POST /api/adapt`** - AI-powered resume adaptation
  - Input: Resume data + Job description
  - Output: Adapted resume with improvements
  - Model: GPT-4o-mini
  - Features: Keyword extraction, content optimization

#### File Processing
- **`POST /api/parse`** - Parse uploaded resume files
  - Formats: PDF, DOCX, DOC, TXT
  - Output: Extracted text
  - Libraries: pdf-parse, mammoth

#### Authentication
- **`POST /api/auth/register`** - User registration
  - Input: name, email, password
  - Output: JWT token + user data
  
- **`POST /api/auth/login`** - User login
  - Input: email, password
  - Output: JWT token + user data

- **`POST /api/auth/logout`** - User logout
  - Clears authentication cookies

- **`GET /api/auth/me`** - Get current user
  - Returns: User profile from JWT
  - Protected: Requires authentication

### 🌐 Application Routes

#### Public Pages
- **`/`** - Landing page with hero, features, how it works
- **`/about`** - Mission, vision, values, team stats
- **`/discover`** - Career resources, expert tips, guides
- **`/auth`** - Combined login/register with tab switching
- **`/login`** - Dedicated login page
- **`/register`** - Dedicated registration page
- **`/templates`** - Public template gallery

#### Protected Dashboard (Requires Auth)
- **`/dashboard/builder`** - Main resume builder with form and preview
- **`/dashboard/templates`** - Template gallery with 13 React templates
- **`/dashboard/personal`** - User profile and settings

### 🎨 Template System

#### React Templates (13 Total)
Live rendering with TypeScript + inline styles:
1. **Classic Minimal** - Traditional serif layout
2. **Modern Blue** - Blue/gray professional
3. **Creative Gradient** - Purple/pink gradient
4. **Elegant Black** - Dark monochrome
5. **Compact Cards** - Card-based sections
6. **Timeline Modern** - Timeline layout
7. **Corporate Clean** - Executive style
8. **Lofi Minimal** - Developer-focused
9. **Color Blocks** - Bold colored sections
10. **European Standard** - Europass-inspired
11. **Responsive Professional** - Two-column split
12. **Simple Elegant** - Clean typography with shadows
13. **RWD Modern** - Gradient header with progress bars

#### HTML Templates (6 Total)
Standalone HTML/CSS with data-key mapping:
1. **Classic Minimal** - ATS-friendly traditional
2. **Modern Blue** - Contemporary blue accents
3. **Compact Cards** - Card organization
4. **Timeline Modern** - Creative timeline
5. **Executive Pro** - Premium executive
6. **Creative Portfolio** - Visual elements for creatives
7. **Academic Research** - Publications & research

#### LaTeX Templates (2 Total)
Professional typesetting:
1. **Jake Gutierrez** - Modern with FontAwesome icons
2. **SB2nov** - Classic academic layout

### 🎭 Theme System

8 color themes with light/dark modes:
- **Rose** 🌸 - Soft pink tones
- **Lavender** 💜 - Purple elegance
- **Mint** 🌿 - Fresh green
- **Ocean** 🌊 - Professional blue
- **Sunset** 🌅 - Warm orange
- **Slate** ⚡ - Cool gray
- **Forest** 🌲 - Deep green
- **Cosmic** ✨ - Vibrant purple

**Theme Properties:**
- `bg` - Main background
- `bgSecondary` - Secondary background
- `sidebar` - Sidebar background
- `card` - Card background
- `text` - Primary text
- `textSecondary` - Secondary text
- `border` - Border colors
- `accent` - Accent color

**Persistence:** LocalStorage
**Context:** `lib/theme-context.tsx`
**Components:** `components/theme-switcher.tsx`

### 💻 Technical Stack

#### Frontend
- **Next.js 15.2.4** - App Router, Server Components, Streaming SSR
- **React 19** - Latest with Server Components support
- **TypeScript 5** - Full type safety
- **Tailwind CSS v4.1.9** - Utility-first styling with @tailwindcss/postcss
- **shadcn/ui** - 40+ accessible Radix UI components
- **React Hook Form** - Performant form management
- **Zod 3.25** - Schema validation and type inference
- **Lucide React** - 1000+ SVG icons

#### Backend & Services
- **Next.js API Routes** - Serverless edge functions
- **Prisma 6.16.2** - Type-safe ORM
- **SQLite** - Local database (switchable to PostgreSQL)
- **Jose** - JWT token management
- **bcryptjs** - Password hashing
- **Tectonic** - LaTeX compilation engine
- **OpenAI AI SDK** - GPT-4o-mini integration
- **pdf-parse** - PDF text extraction
- **mammoth** - DOCX parsing

#### PDF Generation
- **@react-pdf/renderer 3.4.4** - React to PDF
- **pdfmake 0.2.10** - PDF generation
- **jspdf** - Client-side PDF
- **html2pdf.js** - HTML to PDF conversion

#### State & Data Management
- **Zustand** (via hooks) - Client state management
- **React Context** - Theme and auth context
- **LocalStorage** - Theme and preferences persistence

#### Development Tools
- **TypeScript** - Static typing
- **PostCSS** - CSS processing
- **Vercel Analytics** - Usage tracking
- **ESLint** - Code linting

### 🗄️ Database Schema

**Provider:** SQLite (Prisma)
**Location:** `prisma/schema.prisma`

```prisma
model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}
```

**Migrations:**
```bash
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

### 🔐 Authentication Mechanism

**Flow:**
1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server validates credentials, hashes password (bcryptjs)
3. JWT token created with Jose (HS256 algorithm)
4. Token stored in HTTP-only cookie (`auth-token`)
5. Middleware (`middleware.ts`) checks token on protected routes
6. Routes starting with `/dashboard` require valid JWT

**Protected Routes:** All `/dashboard/*` paths
**Public Routes:** `/`, `/about`, `/discover`, `/auth`, `/login`, `/register`

**Token Payload:**
```typescript
{
  userId: string
  name: string
  email: string
  iat: number
  exp: number  // 7 days expiration
}
```

## 📂 Project Structure

```
cv-helper/
├── app/                           # Next.js App Router
│   ├── api/                       # API Routes
│   │   ├── adapt/                 # AI resume adaptation
│   │   ├── auth/                  # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── me/
│   │   │   └── register/
│   │   ├── compile/               # LaTeX to PDF compilation
│   │   ├── generate/              # LaTeX resume generation
│   │   ├── generate-react-pdf/    # React to PDF generation
│   │   └── parse/                 # File parsing
│   ├── dashboard/                 # Protected dashboard pages
│   │   ├── builder/               # Resume builder UI
│   │   ├── personal/              # User profile
│   │   └── templates/             # Template gallery
│   ├── about/                     # About page
│   ├── auth/                      # Auth page (login/register tabs)
│   ├── discover/                  # Discover resources
│   ├── login/                     # Login page
│   ├── register/                  # Register page
│   ├── templates/                 # Public template showcase
│   ├── globals.css                # Global styles + FlowCV design tokens
│   ├── layout.tsx                 # Root layout with providers
│   └── page.tsx                   # Landing page
├── components/                    # React components
│   ├── ui/                        # shadcn/ui components (40+)
│   ├── cv-form.tsx                # Resume form builder
│   ├── cv-preview.tsx             # Live preview component
│   ├── html-template-preview.tsx  # HTML template renderer
│   ├── site-header.tsx            # Global navigation header
│   ├── template-gallery-modal.tsx # Template selection modal
│   ├── template-picker.tsx        # LaTeX template picker
│   ├── template-selector.tsx      # React template selector
│   └── theme-switcher.tsx         # Theme toggle component
├── lib/                           # Utility libraries
│   ├── ai/                        # AI integration utilities
│   ├── auth/                      # Auth utilities
│   ├── latex/                     # LaTeX processing
│   ├── parse/                     # File parsing utilities
│   ├── html-templates.ts          # HTML template definitions (6)
│   ├── react-templates.tsx        # React template components (13)
│   ├── templates.ts               # LaTeX template configs (2)
│   └── theme-context.tsx          # Theme system context
├── hooks/                         # Custom React hooks
│   └── use-resume-store.ts        # Resume data state management
├── prisma/                        # Database
│   ├── schema.prisma              # Database schema
│   └── dev.db                     # SQLite database file
├── public/                        # Static assets
├── styles/                        # Additional stylesheets
├── templates/                     # LaTeX template files
│   ├── jake_gutierrez/
│   └── sb2nov/
├── StyledTemplates/               # External HTML templates
├── middleware.ts                  # Route protection middleware
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
└── .env                           # Environment variables
```

## 🔧 Key Mechanisms

### Resume Data Flow
1. **User Input** → Form Builder (`components/cv-form.tsx`)
2. **State Management** → Zustand store (`hooks/use-resume-store.ts`)
3. **Template Selection** → User chooses from 13 React templates
4. **Preview** → Real-time rendering via `cv-preview.tsx`
5. **Export** → PDF generation via multiple methods:
   - React PDF: `@react-pdf/renderer`
   - LaTeX: Tectonic engine
   - HTML: Direct download or print

### AI Adaptation Flow
1. **Input** → User uploads resume + pastes job description
2. **Parse** → `/api/parse` extracts text from files
3. **AI Processing** → `/api/adapt` sends to GPT-4o-mini
4. **Analysis** → Keyword extraction, content optimization
5. **Output** → Adapted resume data returned as JSON
6. **Apply** → User reviews and accepts changes

### Authentication Flow
1. **Registration** → User submits form → Password hashed → User created in DB
2. **Login** → Credentials verified → JWT signed → Cookie set
3. **Protected Access** → Middleware checks JWT → Allows/denies access
4. **Logout** → Cookie cleared → User redirected

### Theme System Flow
1. **Selection** → User picks theme + mode (light/dark)
2. **Context** → Theme values propagated via React Context
3. **Persistence** → Saved to LocalStorage
4. **Application** → CSS custom properties + inline styles
5. **Hydration** → `suppressHydrationWarning` prevents SSR mismatches

### Template Gallery System
1. **Discovery** → User visits `/dashboard/templates`
2. **Browse** → Image-first gallery with search, filter, sort
3. **Select** → Click template → Navigate to `/dashboard/builder?templateId=<id>`
4. **Validation** → Builder checks required fields for selected template
5. **Guidance** → Missing fields shown with clickable badges
6. **Complete** → User fills required fields, sees progress
7. **Export** → Download PDF via @react-pdf/renderer

**Template Registry:**
- Centralized in `lib/template-registry.ts`
- Each template has: metadata, required fields, field mappings
- 13 React templates visible in gallery
- HTML/LaTeX templates hidden from UI (APIs functional)

## 🚧 Future Development Roadmap

### Immediate Priorities
- [ ] **Profile Save System**: Save and reuse personal info profiles
- [ ] **Job Description Library**: Save and manage job descriptions
- [ ] **Template Preview Images**: Generate thumbnail previews for templates
- [ ] **Export History**: Track exported resumes

### Phase 1: Enhanced Features
- [ ] **Multi-Model AI Support**: Claude, Gemini integration
- [ ] **Cover Letter Generation**: AI-powered cover letters
- [ ] **Skills Gap Analysis**: Compare CV to job requirements
- [ ] **ATS Score**: Calculate ATS compatibility score

### Phase 2: Advanced Integration
- [ ] **LinkedIn Import**: Auto-fill from LinkedIn profile
- [ ] **GitHub Integration**: Auto-import projects and contributions
- [ ] **Portfolio Links**: Connect external portfolios
- [ ] **Version History**: Track resume changes over time

## 🛠️ Development Setup

### Prerequisites
- **Node.js 18+** and npm/pnpm
- **OpenAI API key** (for AI features)
- **Tectonic LaTeX engine** (for LaTeX compilation)

### Installation

```bash
# Clone the repository
git clone https://github.com/qadadiaImad/Cv-Helper.git
cd Cv-Helper

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your credentials

# Generate Prisma Client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Key (required for AI features)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database URL (SQLite by default)
DATABASE_URL="file:./dev.db"

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Optional: Switch to PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/cvhelper"
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio UI
```

### First Time Setup

1. **Install dependencies**
2. **Configure environment variables** (`.env`)
3. **Run database migrations** (`npm run db:migrate`)
4. **Start the dev server** (`npm run dev`)
5. **Create an account** at `/register`
6. **Start building resumes!**

### Thumbnail Generation (Optional)

To generate template preview thumbnails:

```bash
# Install dev dependencies
npm install --save-dev puppeteer sharp

# Start dev server in one terminal
npm run dev

# Generate thumbnails in another terminal
node scripts/generate-thumbnails.js
```

Thumbnails are stored in `public/templates/` as WebP files (1240x1754px, A4 aspect ratio).

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

## 📊 Current Status

### ✅ Completed Features
- [x] User authentication with JWT
- [x] **13 React templates** with live preview
- [x] **Image-first template gallery** with search/filter/sort
- [x] **Template registry system** with field validation
- [x] **Required fields validation** with inline prompts
- [x] **Single template selection flow** (no duplicate pickers)
- [x] 6 HTML templates (hidden from UI, APIs functional)
- [x] 2 LaTeX templates (hidden from UI, APIs functional)
- [x] 8-theme system with light/dark modes
- [x] AI-powered resume adaptation
- [x] File upload and parsing (PDF, DOCX)
- [x] Multiple export formats (PDF, LaTeX, HTML)
- [x] Protected dashboard routes
- [x] FlowCV-inspired UI design
- [x] Responsive mobile design
- [x] Real-time preview system
- [x] Accessibility-compliant (keyboard nav, ARIA labels)

### 🚀 In Progress
- [ ] Thumbnail generation for all templates
- [ ] Profile save/load system
- [ ] Job description library
- [ ] Export history tracking

### 📈 Statistics
- **Total Templates**: 21 (13 React + 6 HTML + 2 LaTeX)
- **API Endpoints**: 10 (added thumbnails endpoint)
- **Application Routes**: 11
- **Color Themes**: 8
- **Component Library**: 40+ shadcn/ui components
- **Template Categories**: 5 (Minimal, Modern, Creative, Classic, Executive)

## 🎨 Template Gallery Features

### Image-First Design
- **WebP Thumbnails**: 1240x1754px (A4 aspect ratio), ~100KB each
- **SVG Fallbacks**: Lightweight placeholders until screenshots generated
- **Lazy Loading**: Next/Image optimization with proper sizing
- **Error Handling**: Graceful fallback chain (WebP → SVG → Placeholder)

### Search & Discovery
- **Real-time Search**: Filter by name, description, tags (< 100ms latency)
- **Category Filters**: Minimal, Modern, Creative, Classic, Executive
- **Sort Options**: Popular, Alphabetical, Newest First
- **Results Count**: Live update of filtered templates

### User Experience
- **Responsive Grid**: 1-4 columns adapting to viewport
- **Hover Effects**: Smooth lift animation + "Use this template" overlay
- **Selection State**: Visual checkmark + ring border
- **New Badges**: Purple gradient badge for new templates
- **Keyboard Navigation**: Full arrow key + Enter/Space support
- **Screen Readers**: Proper ARIA labels and roles

### Template Registry
**Location**: `lib/template-registry.ts`

Each template includes:
```typescript
{
  id: string                    // Unique identifier
  name: string                  // Display name
  description: string           // Short description
  category: TemplateCategory    // Filter category
  tags: string[]               // Search tags
  type: 'react' | 'html' | 'latex'
  hidden: boolean              // Hide from gallery
  thumbnailPath: string        // Image path
  requiredFields: string[]     // Validation
  fieldMap: TemplateFieldMap   // Data mapping
  features: string[]           // Feature list
  popularity: number           // Sort weight
  isNew: boolean              // New badge
}
```

### Field Validation
**Location**: `components/missing-fields-prompt.tsx`

Three validation components:
1. **MissingFieldsPrompt** - Orange alert with clickable field badges
2. **FieldChecklist** - Progress bar + checkbox list
3. **CompletionBadge** - Compact status (X% / Complete)

**Validation Flow**:
- Builder reads `templateId` from query params
- Validates against `requiredFields` from registry
- Shows inline prompt with auto-focus on field click
- Updates progress in real-time

### Adding New Templates

1. **Create React Component** (`lib/react-templates.tsx`):
```typescript
export const MyTemplate: React.FC<Props> = ({ data }) => (
  <div>Your template JSX</div>
)
```

2. **Register Template** (`lib/template-registry.ts`):
```typescript
{
  id: 'my_template',
  name: 'My Template',
  requiredFields: ['name', 'email'],
  // ... other metadata
}
```

3. **Generate Thumbnail**:
```bash
# Option 1: SVG Placeholder (instant)
npm run thumbnails:placeholder

# Option 2: Real Screenshot (requires Puppeteer)
npm run thumbnails:generate
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Follow existing TypeScript/React patterns
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Templates
- **Jake Gutierrez** - Original LaTeX resume template
- **Sourabh Bajaj** - SB2nov LaTeX template
- **Community Contributors** - External HTML/CSS templates

### Technologies
- **OpenAI** - GPT-4o-mini AI model
- **Vercel** - Hosting and deployment
- **shadcn/ui** - Component library
- **Tectonic** - LaTeX compilation engine
- **Prisma** - Database ORM
- **Next.js Team** - Framework

### Design Inspiration
- **FlowCV** - UI/UX design inspiration
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support & Resources

### Documentation
- **README**: You're reading it! 📖
- **API Docs**: See `/app/api/` directories
- **Theme Guide**: [THEME_GUIDE.md](THEME_GUIDE.md)
- **Template Converter**: [TEMPLATE_CONVERTER_GUIDE.md](TEMPLATE_CONVERTER_GUIDE.md)

### Get Help
- **Issues**: [GitHub Issues](https://github.com/qadadiaImad/Cv-Helper/issues)
- **Discussions**: [GitHub Discussions](https://github.com/qadadiaImad/Cv-Helper/discussions)
- **Email**: imadqadadia@gmail.com

### Links
- **GitHub**: [github.com/qadadiaImad/Cv-Helper](https://github.com/qadadiaImad/Cv-Helper)
- **Demo**: [Coming Soon]
- **Documentation**: [In Repository]

---

**Built with ❤️ using Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, and OpenAI**

*Last Updated: October 2025*
