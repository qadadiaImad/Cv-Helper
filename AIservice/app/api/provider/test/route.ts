import { NextResponse } from 'next/server';
import { getConfiguredModel } from '@/AIservice/config/models';

// 1x1 transparent PNG
const TINY_PNG_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4z8DwHwAFgwJ/c8k1ZQAAAABJRU5ErkJggg==';

export async function GET() {
  const provider = 'openrouter';

  type TestResult = { ok: boolean; message?: string; model?: string; usage?: any };
  const results: Record<'vision' | 'pdf' | 'arbitrage', TestResult> = {
    vision: { ok: false },
    pdf: { ok: false },
    arbitrage: { ok: false },
  };

  const OpenAI = (await import('openai')).default;

  // Vision (OpenRouter only)
  try {
    let model = getConfiguredModel('vision') || 'gpt-4o-mini';
    const key = process.env.OPENROUTER_KEY_VISION;
    if (!key) throw new Error('OPENROUTER_KEY_VISION manquante');
    const client: any = new OpenAI({ apiKey: key, baseURL: 'https://openrouter.ai/api/v1' });
    const resp = await client.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Test vision: répondez simplement par ok après analyse de cette image.' },
            { type: 'image_url', image_url: { url: TINY_PNG_DATA_URL, detail: 'low' } },
          ],
        },
      ],
      max_tokens: 8,
      temperature: 0,
    });
    results.vision = { ok: true, model, usage: (resp as any)?.usage };
  } catch (e) {
    results.vision = { ok: false, message: e instanceof Error ? e.message : String(e) };
  }

  // PDF to JSON (structuring) (OpenRouter only)
  try {
    let model = getConfiguredModel('pdf') || 'gpt-4o-mini';
    const key = process.env.OPENROUTER_KEY_PDF_TO_JSON;
    if (!key) throw new Error('OPENROUTER_KEY_PDF_TO_JSON manquante');
    const client: any = new OpenAI({ apiKey: key, baseURL: 'https://openrouter.ai/api/v1' });
    const resp = await client.chat.completions.create({
      model,
      messages: [
        { role: 'user', content: 'Réponds par: ok' },
      ],
      max_tokens: 4,
      temperature: 0,
    });
    results.pdf = { ok: true, model, usage: (resp as any)?.usage };
  } catch (e) {
    results.pdf = { ok: false, message: e instanceof Error ? e.message : String(e) };
  }

  // Arbitrage (OpenRouter only)
  try {
    let model = getConfiguredModel('arbitrage') || 'gpt-4o';
    const key = process.env.OPENROUTER_KEY_ARBITRAGE;
    if (!key) throw new Error('OPENROUTER_KEY_ARBITRAGE manquante');
    const client: any = new OpenAI({ apiKey: key, baseURL: 'https://openrouter.ai/api/v1' });
    const resp = await client.chat.completions.create({
      model,
      messages: [
        { role: 'user', content: 'Réponds par: ok' },
      ],
      max_tokens: 4,
      temperature: 0,
    });
    results.arbitrage = { ok: true, model, usage: (resp as any)?.usage };
  } catch (e) {
    results.arbitrage = { ok: false, message: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json({ provider, results }, { status: 200 });
}
