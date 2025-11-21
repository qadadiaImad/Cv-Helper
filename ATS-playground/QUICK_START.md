# 🚀 ATS Module - Quick Start Guide

Get started with the ATS module in 5 minutes!

---

## ⚡ Quick Setup

```bash
# 1. Navigate to ATS playground
cd ATS-playground

# 2. Install dependencies
npm install

# 3. Run tests
npm test
```

---

## 📊 What You Get

### **Input:** Resume JSON from Parse CV Module
```json
{
  "resume_text": "...",
  "file_type": "pdf",
  "file_size_kb": 145,
  "candidate_name": "John Doe",
  "job_description": "...", // optional
  "parsed_cv": {} // optional: structured JSON from Parse CV
}
```

### **Output:** Comprehensive ATS Report
```json
{
  "global_score": 85,
  "issues_count": 12,
  "overall_comment": "Very good! Your resume is strong...",
  "sections": {
    "ats_parse_rate": { "score": 90, "status": "excellent", ... },
    "quantify_impact": { "score": 75, "examples": [...], ... },
    "keywords_relevance": { "score": 80, "missing_keywords": [...], ... },
    // ... 12 total sections
  }
}
```

---

## 🎯 12 Analysis Dimensions

1. **ATS Parse Rate** - Structure & parseability
2. **Design & Layout** - Visual formatting
3. **Keywords & Relevance** - Job match
4. **Quantify Impact** - XYZ method compliance
5. **Repetition & Buzzwords** - Avoid clichés
6. **Grammar & Spelling** - Error detection
7. **Essential Sections** - Required sections
8. **Contact Info** - Completeness check
9. **File Format & Size** - ATS compatibility
10. **Length & Bullets** - Optimal length
11. **Style & Active Voice** - Professional tone
12. **Template Suggestions** - Recommendations

---

## 🔧 Basic Usage

```typescript
import { analyzeCV } from './ATS-playground'

const input = {
  resume_text: "John Smith\njohn@email.com...",
  file_type: "pdf",
  file_size_kb: 150,
  candidate_name: "John Smith",
  job_description: "We're seeking...", // optional
  parse_coverage_ratio: 0.9,
  extra_metadata: {
    word_count: 320,
    bullet_count: 12
  }
}

const report = await analyzeCV(input)

console.log(`Score: ${report.global_score}/100`)
console.log(`Issues: ${report.issues_count}`)
```

---

## 📁 Project Structure

```
ATS-playground/
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── ats-analyzer.ts       # Main orchestrator
│   ├── ats-scorer.ts         # Scoring logic
│   ├── checks/               # 12 check modules
│   └── utils/                # Helper functions
├── test/
│   ├── sample-cvs/          # Test data
│   │   ├── sample-cv-good.json
│   │   ├── sample-cv-poor.json
│   │   └── sample-cv-french.json
│   └── run-ats-test.ts      # Test runner
├── index.ts                 # Main entry point
├── package.json
└── README.md
```

---

## 🧪 Test Examples

### **Good CV** (Score: ~85-90)
- Clean structure
- Strong action verbs
- Quantified achievements
- ATS-friendly format

### **Poor CV** (Score: ~40-50)
- Image format (JPG)
- Buzzword-heavy
- Vague descriptions
- Missing sections

---

## 🎨 Integration Steps

1. **Development** (Current Phase)
   - ✅ Build ATS module in playground
   - ✅ Test with sample CVs
   - ✅ Refine scoring logic

2. **Integration** (Next Phase)
   - Create API route: `/api/ai/ats`
   - Connect with Parse CV module
   - Build UI components

3. **Deployment**
   - Add to landing page
   - Monitor performance
   - Collect user feedback

See [INTEGRATION.md](./INTEGRATION.md) for detailed integration guide.

---

## 💡 Key Features

✅ **English-only** (optimized for English CVs)
✅ **Rule-based scoring** (fast, deterministic)
✅ **Concrete recommendations** (actionable)
✅ **XYZ method** (Google-style achievements)
✅ **Job matching** (keyword analysis)
✅ **Type-safe** (full TypeScript)
✅ **Standalone** (easy integration)

---

## 🔍 Example Output

```
📄 Testing: sample-cv-good.json
------------------------------------------------------------
   Candidate: John Smith
   File type: pdf
   Word count: 320

   ⏳ Running ATS analysis...
   ✅ Analysis complete in 45ms

   📊 RESULTS:
   Global Score: 87/100
   Status: 🔵 Very Good
   Issues Count: 8
   Language Used: en

   📋 Section Scores:
   - ATS Parse Rate: 92/100 (excellent)
   - Design & Layout: 85/100 (good)
   - Keywords Relevance: 88/100 (excellent)
   - Quantify Impact: 82/100 (good)
   ...

   💡 Top Recommendations:
   1. Add missing keywords: Docker, Kubernetes
   2. Improve bullet points with XYZ method
   3. Reduce repetition of "managed" (used 7 times)
```

---

## 🎯 Next Steps

1. **Test Now**
   ```bash
   npm test
   ```

2. **Review Reports**
   - Check `test/output/` for detailed JSON reports
   - Analyze scoring logic
   - Adjust thresholds if needed

3. **Start Integration**
   - Follow [INTEGRATION.md](./INTEGRATION.md)
   - Create API endpoint
   - Build UI

4. **Iterate**
   - Add more test cases
   - Refine recommendations
   - Optimize performance

---

## 📞 Support

Questions? Check:
- [README.md](./README.md) - Full documentation
- [INTEGRATION.md](./INTEGRATION.md) - Integration guide
- [types.ts](./lib/types.ts) - Type definitions

---

**Ready to analyze CVs? Run `npm test` now!** 🚀
