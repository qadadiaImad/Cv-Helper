---
trigger: manual
---

# Cv-Helper / QuickCV Windsurf Rules

## 1. General coding style

- **Always factorize code.**
  - Prefer small, composable functions over large monolithic ones.
  - Extract reusable logic into helpers instead of inlining it.
  - Avoid duplicating logic already present elsewhere in the project.

- **Respect existing abstractions.**
  - When integrating new features, first look for existing functions/modules that already encapsulate the behavior, and call them instead of re-implementing.

## 2. AIservice-infcv integration contract

When working on anything related to CV parsing, resume structuring, arbitration between CV and Job Description, or OpenRouter chat orchestration, **do not reimplement core logic**. Instead, **reuse the integration helpers from `AIservice-infcv` as-is**.

Specifically:

- **Use the client wrapper** in [AIservice-infcv/Integration/client.ts](cci:7://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/client.ts:0:0-0:0):
  - [parseCV(opts)](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/client.ts:18:0-38:1)  
    - Input:  
      - `baseUrl: string` (e.g. `'/api'` or `'https://my-site.com/api'`)  
      - Optional `cv_text?: string` and `images?: string[]` (base64 data URLs).
    - Behavior: calls `POST {baseUrl}/adapt` with `only_clean=true` and returns the JSON response.
    - Rule: When the main project needs **PDF → JSON / resume structuring**, call [parseCV](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/client.ts:18:0-38:1) instead of building new fetch/form-data logic.

  - [arbitrate(opts)](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/client.ts:40:0-60:1)  
    - Input:  
      - `baseUrl: string`  
      - `clean_cv: any` (structured CV JSON)  
      - `jd_text: string`.
    - Behavior: calls `POST {baseUrl}/adapt` with `arb_only=true` and returns `{ result, report, judge?, cost? }`.
    - Rule: When the main project needs **resume + JD arbitration / adaptation**, call [arbitrate](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/client.ts:40:0-60:1) instead of implementing new arbitration endpoints.

- **Use the orchestrator** in [AIservice-infcv/Integration/orchestrator.ts](cci:7://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/orchestrator.ts:0:0-0:0):
  - `ARB_MODELS: readonly string[]`
    - The ordered list of 8 arbitration models.  
    - Rule: Do not hard-code your own arbitration model list for this flow. Reuse `ARB_MODELS`.

  - [callWithFallbackChat({ client, messages, temperature?, response_format?, max_tokens?, validate? })](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/orchestrator.ts:16:0-49:1)
    - Behavior: Tries each model from `ARB_MODELS` in order, returning `{ text, modelUsed, index, usage? }`. Falls back on transport/timeout/5xx, empty content, invalid JSON, or validation failure.
    - Rule: When you need an **OpenRouter-style chat completion with fallback**, use [callWithFallbackChat](cci:1://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/orchestrator.ts:16:0-49:1) instead of manually implementing a model-fallback loop.

## 3. How to interface from the main project

- In the main Cv-Helper codebase, when adding integrations:
  - Import from `AIservice-infcv/Integration/client` and `AIservice-infcv/Integration/orchestrator` instead of duplicating logic.
  - Keep integration code thin: wiring, parameter passing, and response handling.
  - Leave all business logic about parsing, arbitration, guards, and fallbacks inside `AIservice-infcv`.

- If you need to extend behavior:
  - First, see if it can be done by **wrapping** existing `AIservice-infcv` functions with small, factorized helpers.
  - Only modify `AIservice-infcv` itself when absolutely necessary, and keep changes localized and reusable.

## 4. Safety and invariants

- Do not change the guarantees documented in [AIservice-infcv/Integration/README.md](cci:7://file:///c:/Users/ahmad/CascadeProjects/Cv-Helper/AIservice-infcv/Integration/README.md:0:0-0:0):
  - No translation: output language must match `clean_cv.metadata.language`.
  - No invented metrics: numeric patterns must originate from source bullets.
  - Education preservation and canonicalization must be kept.
  - Global deduplication across sections.
  - XYZ rewrite and action-verb harmonization behavior must be preserved.

- When in doubt between:
  - Reusing `AIservice-infcv` functions, or
  - Writing new code,
  - **Always prefer reusing `AIservice-infcv` and factorizing around it.**