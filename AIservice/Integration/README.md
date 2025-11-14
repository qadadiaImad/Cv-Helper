# QuickCV Integration

A minimal integration guide to embed QuickCV as a service inside your site. It exposes two core capabilities:

- PDF → JSON (resume structuring)
- Arbitration (input: resume JSON + Job Description)

This package contains:
- Integration/client.ts — tiny TS client wrapper for your site
- Integration/orchestrator.ts — 8‑model fallback orchestrator for arbitration chat calls (OpenRouter)

No changes are required to your current PDF→JSON structure. All language and integrity guards remain enforced.

## Architecture overview

- POST /api/adapt (existing)
  - Use as Parse endpoint by sending `only_clean=true`
  - Use as Arbitrate endpoint by sending `arb_only=true` with `clean_cv_json`
- Internals (already implemented):
  - Strict language preservation: outputs must match `clean_cv.metadata.language` (no translation)
  - Digits guard: no invented metrics in bullets
  - Education merge + canonical date normalization (no loss of original)
  - Global de‑duplication across sections
  - Bullets XYZ rewrite per experience/projects with action‑verb harmonization
  - Full report for traceability (decisions, pruned, shortened, recommendations)

## Environment variables

Set the following environment variables in your site:

- OPENROUTER_KEY_ARBITRAGE — API key for arbitration/rewrites
- OPENROUTER_KEY_PDF_TO_JSON — API key for PDF→JSON (optional if using deterministic parser)
- OPENROUTER_KEY_JUDGE — API key for judge evaluator (optional)
- OPENROUTER_HTTP_REFERER — Optional referrer header
- OPENROUTER_APP_TITLE — Optional app title header

## Arbitration model fallback (8 models)

Order (default = #1; fallback cascades to next on failure):
1. qwen/qwen3-coder-30b-a3b-instruct
2. meta-llama/llama-3.3-70b-instruct
3. qwen/qwen3-235b-a22b-thinking-2507
4. qwen/qwen3-coder-flash
5. x-ai/grok-code-fast-1
6. qwen/qwen-plus-2025-07-28
7. openai/gpt-4o-mini
8. google/gemini-2.5-flash-lite-preview-09-2025

Fallback triggers (any of):
- Transport/timeout/5xx
- Empty content or non‑JSON when JSON is required
- JSON schema validation failure
- Guard violations (e.g., wrong language)

Use Integration/orchestrator.ts to make chat calls with this fallback chain.

## Endpoints usage

### 1) Parse: PDF → JSON

Call existing endpoint with `only_clean=true`.

- Request (multipart/form-data)
  - cv_text: string (optional)
  - images[]: array of base64 images (optional)
  - only_clean: true
- Response (JSON)
  - clean: Clean CV JSON
  - usage (if AI structurer used)

cURL:

```bash
curl -X POST \
  -F "cv_text=@/path/to/resume.txt" \
  -F "only_clean=true" \
  http://localhost:3000/api/adapt
```

TypeScript (Node/Next):

```ts
import { parseCV } from '../Integration/client';
const { clean_cv } = await parseCV({ baseUrl: '/api', cv_text: resumeText });
```

### 2) Arbitrate: Resume JSON + JD

Call existing endpoint with `arb_only=true`.

- Request (multipart/form-data)
  - jd_text: string
  - clean_cv_json: stringified clean CV JSON
  - arb_only: true
- Response (JSON)
  - result: adapted resume JSON
  - report: arbitration report (decisions, narrative, bulletRewrite logs)
  - judge?: optional evaluation
  - cost: token usage and cost

cURL:

```bash
curl -X POST \
  -F "jd_text=$(cat /path/to/jd.txt)" \
  -F "clean_cv_json=$(cat /path/to/clean_cv.json)" \
  -F "arb_only=true" \
  http://localhost:3000/api/adapt
```

TypeScript (Node/Next):

```ts
import { arbitrate } from '../Integration/client';
const { result, report } = await arbitrate({ baseUrl: '/api', clean_cv, jd_text });
```

## Client wrapper (Integration/client.ts)

- parseCV: wraps `/api/adapt` (only_clean)
- arbitrate: wraps `/api/adapt` (arb_only)

```ts
import { parseCV, arbitrate } from '../Integration/client';
```

## Orchestrator (Integration/orchestrator.ts)

Use `callWithFallbackChat` to attempt the 8 models in order until one succeeds.

```ts
import { callWithFallbackChat, ARB_MODELS } from '../Integration/orchestrator';
const { text, modelUsed, usage } = await callWithFallbackChat({
  messages: [
    { role: 'system', content: '...' },
    { role: 'user', content: '...' },
  ],
  response_format: { type: 'json_object' },
  validate: (t) => { try { JSON.parse(t); return true; } catch { return false; } },
});
```

## Guarantees and guards

- Never translate the CV content. All outputs must match `clean_cv.metadata.language`.
- No invented metrics. Numeric patterns not present in the source bullets are stripped.
- Education is preserved and reclassifications are appended (deduplicated, capped to schema).
- Global deduplication across sections.
- Bullets XYZ rewrite + action‑verb harmonization (EN/FR guardrails).

## Notes

- Deploy behind your site’s API routes; keep keys server‑side only.
- Judge evaluator is optional; useful for QA and price‑performance appraisal.
- Cost tracking per step is returned in `cost`.
