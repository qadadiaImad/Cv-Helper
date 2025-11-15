// Central config for model selection and pricing
// Edit the FILE_* constants below to try different OpenRouter models and pricing.
// You can also override OPENROUTER_ENABLED via env OPENROUTER_ENABLED=true|false.

export type Price = { inPerMTok: number; outPerMTok: number };

// === USER-EDITABLE MODEL SELECTION ===
// Toggle to route calls to OpenRouter (true) or OpenAI (false) by default.
const FILE_OPENROUTER_ENABLED = true; // Openrouter = True/False

// Models used when OpenRouter is enabled
// You can change those 3 to test different providers/models easily.
// Vision models must support image inputs (multimodal). Examples that typically work via OpenRouter:
// - 'openai/gpt-4o-mini'
// - 'openai/gpt-4o'
// - certain Google Gemini 1.5 variants (if supported in your account)
const FILE_VISION_MODEL = 'x-ai/grok-code-fast-1';
const FILE_PDF_TO_JSON_MODEL = 'x-ai/grok-code-fast-1';
const FILE_ARBITRAGE_MODEL = 'openai/gpt-4o';
// Judge (arbitre) model, used to evaluate quality; controlled by FILE_JUDGE_ENABLED
export const FILE_JUDGE_MODEL = 'openai/gpt-4o';
export const FILE_JUDGE_ENABLED = false; // set to true to enable the judge

// === USER-EDITABLE PRICING ===
// Provide pricing per million tokens (USD per 1,000,000 tokens) for the models you test on OpenRouter.
// Example: if input costs $0.30/M tokens, set inPerMTok: 0.30.
// If you leave pricing at 0, totals will still show tokens but cost will appear as $0.
const FILE_DEFAULT_PRICING: Price = { inPerMTok: 0, outPerMTok: 0 };
const FILE_MODEL_PRICING: Record<string, Price> = {
  [FILE_VISION_MODEL]: { inPerMTok: 0, outPerMTok: 0 },
  [FILE_PDF_TO_JSON_MODEL]: { inPerMTok: 0.2, outPerMTok: 1.5 },
  [FILE_ARBITRAGE_MODEL]: { inPerMTok: 0.5, outPerMTok: 2.8 },
  // Default pricing for judge model (gpt-5) provided by user: $1.25/M input, $10/M output
  [FILE_JUDGE_MODEL]: { inPerMTok: 1.25, outPerMTok: 10 },
};

// === HELPERS ===
function truthyEnv(v: any): boolean | undefined {
  if (v === undefined || v === null) return undefined;
  const s = String(v).toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
}

export function isOpenRouterEnabled(): boolean {
  const envOverride = truthyEnv(process.env.OPENROUTER_ENABLED);
  if (envOverride !== undefined) return envOverride;
  return FILE_OPENROUTER_ENABLED;
}

export type AiKind = 'vision' | 'pdf' | 'arbitrage';

export function getConfiguredModel(kind: AiKind): string {
  switch (kind) {
    case 'vision':
      return FILE_VISION_MODEL;
    case 'pdf':
      return FILE_PDF_TO_JSON_MODEL;
    case 'arbitrage':
      return FILE_ARBITRAGE_MODEL;
    default:
      return FILE_ARBITRAGE_MODEL;
  }
}

function sanitizeModelToEnvKey(m: string): string {
  return m.replace(/[^a-z0-9]+/gi, '_').toUpperCase();
}

export function getPricingForModel(model: string): Price | undefined {
  if (!model) return undefined;
  // 1) File-defined per-model pricing
  if (FILE_MODEL_PRICING[model]) return FILE_MODEL_PRICING[model];
  // 2) Env overrides per model (PRICE_MODEL_<MODEL>_IN/OUT_PER_MTOK)
  const key = sanitizeModelToEnvKey(model);
  const inEnv = process.env[`PRICE_MODEL_${key}_IN_PER_MTOK`];
  const outEnv = process.env[`PRICE_MODEL_${key}_OUT_PER_MTOK`];
  const inVal = inEnv ? parseFloat(inEnv) : NaN;
  const outVal = outEnv ? parseFloat(outEnv) : NaN;
  if (Number.isFinite(inVal) || Number.isFinite(outVal)) {
    return {
      inPerMTok: Number.isFinite(inVal) ? inVal : FILE_DEFAULT_PRICING.inPerMTok,
      outPerMTok: Number.isFinite(outVal) ? outVal : FILE_DEFAULT_PRICING.outPerMTok,
    };
  }
  // 3) No specific pricing found → leave undefined and let callers fallback
  return undefined;
}

export function getDefaultPricing(): Price {
  const inEnv = process.env.PRICE_DEFAULT_IN_PER_MTOK;
  const outEnv = process.env.PRICE_DEFAULT_OUT_PER_MTOK;
  const inVal = inEnv ? parseFloat(inEnv) : NaN;
  const outVal = outEnv ? parseFloat(outEnv) : NaN;
  return {
    inPerMTok: Number.isFinite(inVal) ? inVal : FILE_DEFAULT_PRICING.inPerMTok,
    outPerMTok: Number.isFinite(outVal) ? outVal : FILE_DEFAULT_PRICING.outPerMTok,
  };
}

// === Judge helpers ===
function truthyEnvStrict(v: any): boolean | undefined {
  if (v === undefined || v === null) return undefined;
  const s = String(v).trim().toLowerCase();
  if (s === 'true' || s === '1' || s === 'yes' || s === 'on') return true;
  if (s === 'false' || s === '0' || s === 'no' || s === 'off') return false;
  return undefined;
}

export function isJudgeEnabled(): boolean {
  // Allow env override: OPENROUTER_JUDGE_ENABLED or JUDGE_ENABLED
  const envOverride = truthyEnvStrict(process.env.OPENROUTER_JUDGE_ENABLED);
  const envOverride2 = truthyEnvStrict(process.env.JUDGE_ENABLED);
  if (envOverride !== undefined) return envOverride;
  if (envOverride2 !== undefined) return envOverride2;
  return FILE_JUDGE_ENABLED;
}

export function getJudgeModel(): string {
  const m = process.env.JUDGE_MODEL?.trim();
  return m && m.length > 0 ? m : FILE_JUDGE_MODEL;
}
