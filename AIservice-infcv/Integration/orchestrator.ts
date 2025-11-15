// Integration/orchestrator.ts
// 8-model fallback orchestrator for arbitration chat calls (OpenRouter-compatible)

export const ARB_MODELS: readonly string[] = [
  'qwen/qwen3-coder-30b-a3b-instruct',
  'meta-llama/llama-3.3-70b-instruct',
  'qwen/qwen3-235b-a22b-thinking-2507',
  'qwen/qwen3-coder-flash',
  'x-ai/grok-code-fast-1',
  'qwen/qwen-plus-2025-07-28',
  'openai/gpt-4o-mini',
  'google/gemini-2.5-flash-lite-preview-09-2025',
] as const;

export type ChatMessage = { role: 'system' | 'user' | 'assistant' | string; content: string };

export async function callWithFallbackChat(opts: {
  client: any; // OpenAI-like client for OpenRouter
  messages: ChatMessage[];
  temperature?: number;
  response_format?: any;
  max_tokens?: number;
  validate?: (text: string) => boolean; // optional functional validator (e.g., JSON parse)
}): Promise<{ text: string; modelUsed: string; index: number; usage?: any }>
{
  const { client, messages, temperature = 0.0, response_format, max_tokens, validate } = opts;
  let lastErr: any = null;
  for (let i = 0; i < ARB_MODELS.length; i++) {
    const model = ARB_MODELS[i];
    try {
      const req: any = { model, messages, temperature };
      if (response_format) req.response_format = response_format;
      if (typeof max_tokens === 'number') req.max_tokens = max_tokens;
      const completion = await client.chat.completions.create(req);
      const text = (completion?.choices?.[0]?.message?.content || '').trim();
      if (!text) throw new Error('empty_content');
      if (typeof validate === 'function') {
        let ok = false;
        try { ok = !!validate(text); } catch {}
        if (!ok) throw new Error('validation_failed');
      }
      return { text, modelUsed: model, index: i, usage: (completion as any)?.usage };
    } catch (e) {
      lastErr = e;
      continue; // try next model in chain
    }
  }
  const msg = lastErr instanceof Error ? lastErr.message : String(lastErr);
  throw new Error(`All arbitration models failed. Last error: ${msg}`);
}
