import { getConfiguredModel } from '../aiservice-config/models';

/**
 * Structure raw CV text into a clean JSON using OpenRouter
 * Based on QuickCV processing.ts - No invention, preserve original order of experiences.
 */
export async function structureCvTextWithAI(cvText: string): Promise<{ structured: any; usage?: any; model: string }> {
  const OpenAI = (await import('openai')).default;
  const apiKey = process.env.OPENROUTER_KEY_PDF_TO_JSON;
  if (!apiKey) throw new Error('OPENROUTER_KEY_PDF_TO_JSON missing');
  
  const openai = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
      'X-Title': process.env.OPENROUTER_APP_TITLE || 'QuickCV',
    },
  });
  
  const model = getConfiguredModel('pdf') || 'x-ai/grok-code-fast-1';
  const cleaned = normalizeText(cvText);
  const todayISO = new Date().toISOString().split('T')[0];

  // System prompt - English version with emphasis on exhaustivity
  const system = [
    'You are a CV parser. Your output is a "clean structured CV" JSON with NO fabrication.',
    'Build it EXCLUSIVELY from the provided text. Preserve the original order of experiences.',
    'Do NOT add any information that is absent from the input. Use the input language.',
    'CRITICAL: Be EXHAUSTIVE - extract ALL information present in the CV, do NOT omit any section or detail.',
    `Temporal context: today's date is ${todayISO}. If the text indicates an ongoing position, use endDate:"Present" (do not invent dates).`,
    `Do NOT mark as "future" a date prior to ${todayISO}. Never invent dates or periods.`,
  ].join(' ');

  // Schema instruction - English with exhaustivity emphasis
  const schemaInstruction = [
    'Expected schema (keys are optional when not found):',
    '{',
    '  "metadata": { "language": string, "sourceOrderPreserved": true, "warnings": string[]? },',
    '  "header": { "fullName"?: string, "email"?: string, "phone"?: string, "location"?: string,',
    '              "links"?: { "linkedin"?: string, "github"?: string, "portfolio"?: string } },',
    '  "summary"?: string,',
    '  "experience"?: [ { "company"?: string, "title"?: string, "location"?: string,',
    '                    "startDateRaw"?: string, "endDateRaw"?: string, "datesRaw"?: string,',
    '                    "bullets"?: string[] } ],',
    '  "education"?: [ { "school"?: string, "degree"?: string, "location"?: string, "dates"?: string } ],',
    '  "projects"?: [ { "name"?: string, "bullets"?: string[] } ],',
    '  "skills"?: { "languages"?: string[], "frameworks"?: string[], "tools"?: string[], "other"?: string[] },',
    '  "languages"?: string[],  // human languages (French, English, etc.)',
    '  "certifications"?: string[]',
    '}',
    '',
    'CRITICAL RULES:',
    '- NEVER invent data. Leave missing fields absent.',
    '- EXHAUSTIVITY IS MANDATORY: Extract ALL information from the CV. Do NOT omit any section, experience, skill, or detail.',
    '- Strictly respect the order of experiences as they appear in the input.',
    '- Add uncertainties/ambiguous data to metadata.warnings.',
    '- Human languages go in "languages" (root level). Programming languages go in skills.languages.',
  ].join('\n');

  const user = [
    'Raw CV text to structure into clean JSON (return ONLY the JSON object):',
    '---',
    cleaned,
    '---',
    schemaInstruction,
  ].join('\n');

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.0,
  });

  const content = completion.choices[0]?.message?.content || '';
  const pre = content.replace(/```json/gi, '```').replace(/```/g, '');
  const parsed = tryParseJson(pre);
  
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid JSON from structuring AI');
  }
  
  return { structured: parsed, usage: (completion as any)?.usage, model };
}

// Helper functions from QuickCV processing.ts
function normalizeText(text: string): string {
  let t = text || '';
  t = t.replace(/[•·‣⁃]/g, '-');
  t = t.replace(/\r\n?/g, '\n');
  t = t.replace(/[ \t]{2,}/g, ' ');
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.trim();
}

function tryParseJson(text: string): any {
  try { 
    return JSON.parse(text); 
  } catch {}
  
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first >= 0 && last > first) {
    let slice = text.slice(first, last + 1)
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(^|[\r\n])\s*\/\/.*(?=\r?\n|$)/g, '$1')
      .replace(/,\s*([}\]])/g, '$1');
    try { 
      return JSON.parse(slice); 
    } catch {}
  }
  return undefined;
}
