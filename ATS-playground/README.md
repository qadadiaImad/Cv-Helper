# ATS Playground Module

**InfiniteCV ATS Coach & Dev Helper** - A comprehensive ATS scoring and analysis module.

## 🎯 Purpose

This module analyzes resumes/CVs like a modern ATS + recruiter and produces structured JSON reports with:
- Global ATS score (0-100)
- Detailed breakdowns across 12 dimensions
- Concrete, actionable recommendations
- English language support

## 📦 Architecture

```
ATS-playground/
├── lib/
│   ├── types.ts              # TypeScript types and schemas
│   ├── ats-analyzer.ts       # Main analysis orchestrator
│   ├── ats-scorer.ts         # Scoring logic (4 pillars)
│   ├── ats-recommendations.ts # Recommendations generator
│   ├── checks/               # Individual check modules
│   │   ├── parse-rate.ts
│   │   ├── design-layout.ts
│   │   ├── keywords.ts
│   │   ├── impact.ts
│   │   ├── repetition.ts
│   │   ├── grammar.ts
│   │   ├── sections.ts
│   │   ├── contact.ts
│   │   ├── file-format.ts
│   │   ├── length.ts
│   │   └── style.ts
│   └── utils/
│       ├── text-analysis.ts
│       └── language.ts
├── test/
│   ├── sample-cvs/          # Test JSON files
│   └── run-ats-test.ts      # Test runner
├── index.ts                 # Main entry point
└── package.json
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run test
npm test

# Development mode
npm run dev
```

## 📋 Input Contract

```typescript
interface ATSInput {
  resume_text: string
  file_type: string
  file_size_kb: number
  candidate_name?: string | null
  job_title_target?: string | null
  job_description?: string | null
  parse_coverage_ratio?: number | null
  available_templates?: string[] | null
  parsed_cv?: any // Optional: The structured JSON from Parse CV module
  extra_metadata?: {
    sections?: {
      experience?: string | null
      education?: string | null
      skills?: string | null
      summary?: string | null
      projects?: string | null
      certifications?: string | null
      languages?: string | null
    }
    font_name?: string | null
    word_count?: number | null
    bullet_count?: number | null
    years_of_experience?: number | null
  }
}
```

## 📊 Output Format

```typescript
interface ATSReport {
  language_used: string
  global_score: number        // 0-100
  issues_count: number
  overall_comment: string
  sections: {
    ats_parse_rate: { ... }
    design_layout: { ... }
    keywords_relevance: { ... }
    quantify_impact: { ... }
    repetition: { ... }
    grammar_spelling: { ... }
    essential_sections: { ... }
    contact_info: { ... }
    file_format_size: { ... }
    length_and_bullets: { ... }
    style_active_voice: { ... }
    template_suggestions: { ... }
  }
}
```

## 🎯 Scoring Pillars (4 x 25%)

1. **Technical ATS Compatibility** - Parseability, structure, format
2. **Content Quality & Clarity** - Action verbs, clear bullets, no fluff
3. **Impact & Specificity** - XYZ-style achievements, metrics
4. **Relevance & Keywords** - Match to job description

## 💡 Key Features

✅ **English-only** (optimized for English CVs)
✅ **Rule-based scoring** (fast, deterministic)
✅ **Concrete recommendations** (actionable)
✅ **XYZ method** (Google-style achievements)
✅ **Job matching** (keyword analysis)
✅ **Type-safe** (full TypeScript)
✅ **Standalone** (easy integration)

## 🔗 Integration

Once ready, integrate into main app:

```typescript
// app/api/ai/ats/route.ts
import { analyzeCV } from '@/ATS-playground'

export async function POST(req: Request) {
  const input = await req.json()
  const atsResult = await analyzeCV(input)
  return Response.json(atsResult)
}
```

## 📝 License

Part of InfiniteCV project - MIT License
