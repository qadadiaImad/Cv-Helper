import { parseCV as aiParseCV, arbitrate as aiArbitrate, type BaseOpts as AiBaseOpts } from "../../AIservice-infcv/Integration/client"
import { callWithFallbackChat, ARB_MODELS, type ChatMessage } from "../../AIservice-infcv/Integration/orchestrator"

// Centralized adapter for AIservice-infcv so the main Cv-Helper app can
// reuse its capabilities without re-implementing any logic.
//
// The AI service expects a baseUrl pointing to its API prefix. By default we
// read it from an environment variable, but callers can override per-call.
//
// IMPORTANT: The /api/adapt endpoint is now part of the main app (copied from AIservice-infcv)
// When called from server-side (API routes), we need absolute URLs for fetch.
// When called from client-side, relative URLs work fine.
function getDefaultBaseUrl(): string {
  const envUrl = process.env.AISERVICE_BASE_URL
  if (envUrl) return envUrl
  
  // Server-side: need absolute URL for fetch
  if (typeof window === 'undefined') {
    return 'http://localhost:3000/api'
  }
  
  // Client-side: relative URL works
  return '/api'
}

const DEFAULT_AISERVICE_BASE_URL = getDefaultBaseUrl()

export type AiClientOptions = Omit<AiBaseOpts, "baseUrl"> & {
  /**
   * Optional override for the AI service base URL. If not provided, the
   * adapter will use AISERVICE_BASE_URL (env) or "/api" as a fallback.
   */
  baseUrl?: string
}

export type AiChatMessage = ChatMessage

/**
 * Parse a CV using the AIservice-infcv parse endpoint (PDF → JSON / clean CV).
 *
 * This is a thin wrapper around AIservice-infcv's `parseCV` that keeps
 * all parsing and guard logic in that service.
 */
export async function aiParseCvWithService(opts: AiClientOptions & {
  cv_text?: string
  images?: string[]
}) {
  const { baseUrl, timeoutMs, signal, cv_text, images } = opts
  const effectiveBaseUrl = (baseUrl ?? DEFAULT_AISERVICE_BASE_URL).replace(/\/$/, "")

  return aiParseCV({
    baseUrl: effectiveBaseUrl,
    timeoutMs,
    signal,
    cv_text,
    images,
  })
}

/**
 * Run arbitration between a structured CV JSON and a job description using
 * AIservice-infcv's arbitration endpoint.
 */
export async function aiArbitrateWithService(opts: AiClientOptions & {
  clean_cv: any
  jd_text: string
}) {
  const { baseUrl, timeoutMs, signal, clean_cv, jd_text } = opts
  const effectiveBaseUrl = (baseUrl ?? DEFAULT_AISERVICE_BASE_URL).replace(/\/$/, "")

  return aiArbitrate({
    baseUrl: effectiveBaseUrl,
    timeoutMs,
    signal,
    clean_cv,
    jd_text,
  })
}

/**
 * Re-export the fallback chat orchestrator so callers in the main project can
 * leverage the same 8-model chain without re-defining it.
 */
export { callWithFallbackChat, ARB_MODELS }
