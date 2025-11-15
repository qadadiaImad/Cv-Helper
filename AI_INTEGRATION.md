# AIservice-infcv Integration Guide

This document describes how AIservice-infcv is integrated into the main Cv-Helper application, following the factorization principles defined in `.windsurf/rules/aiserviceexposure.md`.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Main Cv-Helper App                        │
│                                                               │
│  ┌──────────────────┐         ┌─────────────────────────┐   │
│  │  API Routes      │────────▶│  lib/services/          │   │
│  │  /api/ai/*       │         │  ai.service.ts          │   │
│  │                  │         │  (thin adapter)         │   │
│  └──────────────────┘         └─────────────────────────┘   │
│         │                               │                    │
│         │ Auth & Credits                │ Delegates to       │
│         ▼                               ▼                    │
│  ┌──────────────────┐         ┌─────────────────────────┐   │
│  │ SubscriptionSvc  │         │ AIservice-infcv/        │   │
│  │ hasFeatureAccess │         │ Integration/            │   │
│  │ useAICredit      │         │ - client.ts             │   │
│  └──────────────────┘         │ - orchestrator.ts       │   │
│                                └─────────────────────────┘   │
│                                          │                   │
│                                          │ HTTP calls        │
│                                          ▼                   │
│                                ┌─────────────────────────┐   │
│                                │ AIservice-infcv         │   │
│                                │ /api/adapt              │   │
│                                │ (OpenRouter models)     │   │
│                                └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Integration Points

### 1. Service Layer (`lib/services/ai.service.ts`)

**Purpose**: Thin adapter that re-exports AIservice-infcv functions with configurable base URL.

**Exports**:
- `aiParseCvWithService(opts)` → wraps `parseCV` from `AIservice-infcv/Integration/client`
- `aiArbitrateWithService(opts)` → wraps `arbitrate` from `AIservice-infcv/Integration/client`
- `callWithFallbackChat` → direct re-export from `AIservice-infcv/Integration/orchestrator`
- `ARB_MODELS` → direct re-export of 8-model arbitration chain

**Configuration**:
- Reads `AISERVICE_BASE_URL` env var (defaults to `/api`)
- Allows per-call override via `baseUrl` option

### 2. API Routes

#### `/api/ai/polish` (POST)

**Purpose**: AI-powered resume optimization (CV + JD arbitration)

**Access Control**:
- FREE: ❌ Blocked (403)
- ONE_TIME (Quick Boost): ✅ While credits > 0 (3 total)
- BASIC: ✅ Unlimited
- PRO: ✅ Unlimited

**Request Body**:
```json
{
  "clean_cv": { /* structured CV JSON */ },
  "jd_text": "Job description text..."
}
```

**Response**:
```json
{
  "success": true,
  "result": { /* adapted CV JSON */ },
  "report": { /* arbitration report */ },
  "judge": { /* optional evaluation */ },
  "cost": { /* token usage */ },
  "creditsRemaining": 2  // or -1 for unlimited
}
```

**Implementation**:
1. `verifyAuth(request)` → get userId
2. `subscriptionService.hasFeatureAccess(userId, 'ai_polish')` → check plan
3. If ONE_TIME: `subscriptionService.useAICredit(userId)` → burn 1 credit
4. `aiArbitrateWithService({ clean_cv, jd_text })` → delegate to AIservice
5. Return result + updated credits

#### `/api/ai/parse` (POST)

**Purpose**: AI-powered CV parsing (raw text/images → structured JSON)

**Access Control**: Same as `/api/ai/polish`

**Request Body**:
```json
{
  "cv_text": "Raw CV text...",
  "images": ["data:image/png;base64,..."]  // optional
}
```

**Response**:
```json
{
  "success": true,
  "clean_cv": { /* structured CV JSON */ },
  "usage": { /* token usage */ },
  "creditsRemaining": 2
}
```

**Implementation**: Same pattern as `/api/ai/polish`

### 3. Subscription Feature Matrix

Updated in `lib/services/subscription.service.ts`:

```typescript
const featureAccess: Record<string, SubscriptionStatus[]> = {
  'ai_polish': [ONE_TIME, BASIC, PRO],
  'ai_cover_letter': [BASIC, PRO],
  'ats_score': [BASIC, PRO],
  'unlimited_resumes': [PRO],
  'all_templates': [ONE_TIME, BASIC, PRO],
}
```

### 4. Credit Management

**ONE_TIME Plan**:
- Starts with 3 AI credits (`aiCreditsTotal: 3`, `aiCreditsRemaining: 3`)
- Each AI operation (parse or polish) consumes 1 credit
- Tracked via `SubscriptionService.useAICredit(userId)`
- Usage logged in `UsageRecord` table

**BASIC/PRO Plans**:
- Unlimited AI operations
- `aiCreditsRemaining` set to 0 (not checked)
- No credit consumption

## Adding New AI Features

To add a new AI-powered feature (e.g., cover letter, ATS score, job matching):

### Step 1: Add Feature to Access Matrix

```typescript
// lib/services/subscription.service.ts
const featureAccess: Record<string, SubscriptionStatus[]> = {
  // ...existing features
  'ai_cover_letter': [SubscriptionStatus.BASIC, SubscriptionStatus.PRO],
}
```

### Step 2: Create API Route

```typescript
// app/api/ai/cover-letter/route.ts
import { verifyAuth } from "@/lib/auth"
import { SubscriptionService } from "@/lib/services/subscription.service"
import { callWithFallbackChat } from "@/lib/services/ai.service"

export async function POST(request: NextRequest) {
  // 1. Auth
  const authResult = await verifyAuth(request)
  if (!authResult.user) return unauthorized()

  // 2. Feature access check
  const hasAccess = await subscriptionService.hasFeatureAccess(
    authResult.user.id,
    'ai_cover_letter'
  )
  if (!hasAccess) return forbidden()

  // 3. Parse input
  const { clean_cv, jd_text } = await request.json()

  // 4. Call AIservice (reuse existing functions or orchestrator)
  const result = await callWithFallbackChat({
    client: openaiClient,
    messages: [
      { role: 'system', content: coverLetterSystemPrompt },
      { role: 'user', content: JSON.stringify({ clean_cv, jd_text }) }
    ],
    temperature: 0.7,
  })

  // 5. Return result
  return NextResponse.json({ success: true, coverLetter: result.text })
}
```

### Step 3: Update Pricing Page (if needed)

Feature strings in `app/pricing/page.tsx` already mention:
- "AI Cover Letter Generator" (BASIC, PRO)
- "Real-time ATS Score" (BASIC, PRO)
- "AI Job Matching" (PRO)

No code changes needed in pricing page—just implement the routes.

## Environment Variables

Required for AIservice-infcv (copied into `/app/api/adapt`):

```bash
# OpenRouter API keys (AIservice uses these internally)
OPENROUTER_KEY_ARBITRAGE=sk-or-v1-...
OPENROUTER_KEY_PDF_TO_JSON=sk-or-v1-...  # optional
OPENROUTER_KEY_JUDGE=sk-or-v1-...        # optional

# Optional headers
OPENROUTER_HTTP_REFERER=https://your-site.com
OPENROUTER_APP_TITLE=Cv-Helper
```

**Note**: The `/api/adapt` endpoint from AIservice-infcv has been copied into the main app at `app/api/adapt/` along with all its dependencies. This means:
- No separate AIservice server needed
- Everything runs in one Next.js process
- No HTTP calls between services (direct function imports)
- Follows Windsurf rules: reuse AIservice bricks without modification

## Factorization Principles

Following `.windsurf/rules/aiserviceexposure.md`:

1. **Never duplicate AIservice logic**
   - All CV parsing, arbitration, and orchestration stays in `AIservice-infcv`
   - Main app only handles: auth, subscription checks, credit management, HTTP wiring

2. **Keep integration code thin**
   - `lib/services/ai.service.ts` is < 70 lines
   - API routes follow same pattern: auth → access check → delegate → return

3. **Reuse existing abstractions**
   - Use `parseCV`, `arbitrate`, `callWithFallbackChat` as-is
   - Use `ARB_MODELS` for model fallback chains
   - Don't re-implement guards, language detection, or validation

4. **Respect AIservice guarantees**
   - No translation (output matches `clean_cv.metadata.language`)
   - No invented metrics
   - Education preservation
   - Global deduplication
   - XYZ bullet rewrite + action-verb harmonization

## Testing

### Manual Testing

1. **Free user tries AI polish**:
   ```bash
   curl -X POST http://localhost:3000/api/ai/polish \
     -H "Cookie: session=..." \
     -H "Content-Type: application/json" \
     -d '{"clean_cv": {...}, "jd_text": "..."}'
   # Expected: 403 Forbidden
   ```

2. **Quick Boost user with credits**:
   ```bash
   # Same request as above
   # Expected: 200 OK, creditsRemaining: 2
   ```

3. **Quick Boost user without credits**:
   ```bash
   # Same request after 3 uses
   # Expected: 403 Forbidden, creditsRemaining: 0
   ```

4. **Pro user**:
   ```bash
   # Same request
   # Expected: 200 OK, creditsRemaining: -1 (unlimited)
   ```

### Integration Tests

```typescript
// tests/api/ai/polish.test.ts
describe('/api/ai/polish', () => {
  it('blocks FREE users', async () => {
    const res = await POST('/api/ai/polish', freeUserSession, payload)
    expect(res.status).toBe(403)
  })

  it('consumes ONE_TIME credits', async () => {
    const res = await POST('/api/ai/polish', oneTimeUserSession, payload)
    expect(res.status).toBe(200)
    expect(res.body.creditsRemaining).toBe(2)
  })

  it('allows unlimited for PRO', async () => {
    const res = await POST('/api/ai/polish', proUserSession, payload)
    expect(res.status).toBe(200)
    expect(res.body.creditsRemaining).toBe(-1)
  })
})
```

## Troubleshooting

### "AI service unavailable" (503)

- Check `OPENROUTER_KEY_ARBITRAGE` is set
- Verify AIservice `/api/adapt` endpoint is accessible
- Check `AISERVICE_BASE_URL` if running AIservice separately

### "No AI credits remaining" (403)

- User has ONE_TIME plan with 0 credits
- Direct them to `/pricing` to upgrade to BASIC or PRO

### TypeScript errors on `@/lib/auth`

- Ensure `lib/auth/index.ts` barrel export exists
- Restart TypeScript server in IDE

## Future Enhancements

Planned AI features (per pricing page):

- ✅ **AI Polish** (implemented)
- ✅ **AI Parse** (implemented)
- ⏳ **AI Cover Letter Generator** (BASIC, PRO)
- ⏳ **Real-time ATS Score** (BASIC, PRO)
- ⏳ **AI Job Matching** (PRO)
- ⏳ **LinkedIn Profile Optimization** (PRO)
- ⏳ **Interview Preparation AI** (PRO)

All follow the same pattern:
1. Add to feature matrix
2. Create `/api/ai/{feature}` route
3. Reuse `ai.service.ts` or `callWithFallbackChat`
4. Gate by subscription + credits
