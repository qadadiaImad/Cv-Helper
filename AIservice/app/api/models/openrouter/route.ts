import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'List of models', 'openrouter_models_filtered.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    const want = [
      'qwen/qwen-2.5-7b-instruct',
      'meta-llama/llama-3.3-70b-instruct',
      'openai/gpt-4o-mini',
      'x-ai/grok-code-fast-1',
      'deepseek/deepseek-chat-v3.1:free',
      'nousresearch/hermes-4-405b',
      'deepcogito/cogito-v2-preview-deepseek-671b',
      'nousresearch/hermes-4-70b',
      'qwen/qwen-plus-2025-07-28',
      'qwen/qwen3-coder-flash',
      'qwen/qwen3-235b-a22b-thinking-2507',
      'google/gemini-2.5-flash-lite-preview-09-2025',
      'z-ai/glm-4-32b',
      'alibaba/tongyi-deepresearch-30b-a3b',
      'qwen/qwen3-235b-a22b-2507',
      'baidu/ernie-4.5-21b-a3b',
      'qwen/qwen3-coder-30b-a3b-instruct',
      'thudm/glm-4.1v-9b-thinking',
      'z-ai/glm-4.5-air:free',
    ];
    const set = new Set(want);
    const existing: any[] = Array.isArray(json?.models) ? json.models : [];
    const filtered = existing.filter((m: any) => set.has(m?.model_id));
    const presentIds = new Set(filtered.map((m: any) => m?.model_id));
    const missing = want.filter((id) => !presentIds.has(id));
    const makeName = (id: string) => {
      // Basic readable name from id
      const parts = id.split('/');
      if (parts.length === 2) {
        const provider = parts[0];
        const model = parts[1].replace(/[-_]/g, ' ');
        return `${provider}: ${model}`;
      }
      return id;
    };
    const stubs = missing.map((id) => ({
      model_name: makeName(id),
      model_id: id,
      input_usd_per_1M: 0,
      output_usd_per_1M: 0,
      context_tokens: 0,
      input_modalities: ['text'],
      output_modalities: ['text'],
    }));
    const out = { ...json, models: [...filtered, ...stubs] };
    return NextResponse.json(out, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Models file not found or invalid', details: e?.message || String(e) }, { status: 500 });
  }
}
