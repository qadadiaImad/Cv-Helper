import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromImagesWithVision, normalizeText } from '@/AIservice/lib/parse';
import { toCleanResume } from '@/AIservice/lib/clean';
import { structureCvTextWithAI } from '@/AIservice/lib/structure_ai';
import { createHash } from 'crypto';
import { ResumeJSON } from '@/AIservice/lib/schema';
import { sanitizeResumeForSchema } from '@/AIservice/lib/sanitize';
import { SYSTEM_PROMPT } from '@/AIservice/lib/prompt';
import { computeResumeDiff, buildNarrativeFromDiff } from '@/AIservice/lib/diff';
import { isOpenRouterEnabled, getConfiguredModel, getPricingForModel, getDefaultPricing, isJudgeEnabled, getJudgeModel } from '@/AIservice/config/models';

// Configuration OpenAI sera créée dynamiquement
import { getVerbs, filterForATS, ACTION_VERB_CATEGORIES } from '@/AIservice/src/hr/actionVerbs';
import { callWithFallbackChat } from '@/AIservice/Integration/orchestrator';

// Taille maximale du fichier (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Cache mémoire simple pour la structuration clean_cv (clé: SHA-256 du cvText)
const cleanCache = new Map<string, any>();

// Heuristics to detect if an experience item is likely an education/training (top-level)
function isLikelyEducationEntry(e: any): boolean {
  const s = [e?.company, e?.title, e?.location, e?.description].filter(Boolean).join(' ').toLowerCase();
  const eduTerms = [
    'universit', 'university', 'école', 'ecole', 'school', 'college', 'institut', 'institute', 'iut', 'insa', 'polytech', 'ens', 'ensta', 'enac', 'mines', 'centrale', 'sorbonne', 'paris-saclay', 'hec', 'héc', 'em lyon', 'essec',
    'licence', 'license', 'bachelor', 'master', 'msc', 'm.sc', 'mba', 'phd', 'doctorat', 'bts', 'dut', 'cap', 'deug', 'dea', 'dipl', 'diplôme', 'diplome',
    'formation', 'certificat', 'certificate', 'certification', 'bootcamp', 'mooc', 'coursera', 'edx', 'udemy', 'openclassrooms'
  ];
  return eduTerms.some(k => s.includes(k));
}

// Revert translated fields back to original language when detected
function enforceOriginalLanguageCV(result: any, before: any, origLang: string) {
  try {
    const sameOrUnknown = (s: any) => {
      const dl = detectLangLoose(String(s || ''));
      return dl === 'unknown' || dl === String(origLang || '').toLowerCase();
    };
    // Experience fields
    const bexp = Array.isArray(before?.experience) ? before.experience : [];
    const aexp = Array.isArray(result?.experience) ? result.experience : [];
    const n = Math.min(bexp.length, aexp.length);
    for (let i = 0; i < n; i++) {
      const b = bexp[i] || {}; const a = aexp[i] || {};
      if (!sameOrUnknown(a.title) && b.title) a.title = b.title;
      if (!sameOrUnknown(a.company) && b.company) a.company = b.company;
      if (!sameOrUnknown(a.location) && b.location) a.location = b.location;
      const bBul = Array.isArray(b.bullets) ? b.bullets : [];
      const aBul = Array.isArray(a.bullets) ? a.bullets : [];
      const m = Math.min(bBul.length, aBul.length);
      for (let j = 0; j < m; j++) {
        if (!sameOrUnknown(aBul[j]) && bBul[j]) aBul[j] = bBul[j];
      }
      if (Array.isArray(a.bullets)) a.bullets = aBul;
    }
    // Projects
    const bproj = Array.isArray(before?.projects) ? before.projects : [];
    const aproj = Array.isArray(result?.projects) ? result.projects : [];
    const pn = Math.min(bproj.length, aproj.length);
    for (let i = 0; i < pn; i++) {
      const b = bproj[i] || {}; const a = aproj[i] || {};
      if (!sameOrUnknown(a.name) && b.name) a.name = b.name;
      const bBul = Array.isArray(b.bullets) ? b.bullets : [];
      const aBul = Array.isArray(a.bullets) ? a.bullets : [];
      const m = Math.min(bBul.length, aBul.length);
      for (let j = 0; j < m; j++) {
        if (!sameOrUnknown(aBul[j]) && bBul[j]) aBul[j] = bBul[j];
      }
      if (Array.isArray(a.bullets)) a.bullets = aBul;
    }
    // Education
    const bedu = Array.isArray(before?.education) ? before.education : [];
    const aedu = Array.isArray(result?.education) ? result.education : [];
    const en = Math.min(bedu.length, aedu.length);
    for (let i = 0; i < en; i++) {
      const b = bedu[i] || {}; const a = aedu[i] || {};
      if (!sameOrUnknown(a.school) && b.school) a.school = b.school;
      if (!sameOrUnknown(a.degree) && b.degree) a.degree = b.degree;
      if (!sameOrUnknown(a.location) && b.location) a.location = b.location;
    }
  } catch {}
}

// Loose language detector (scripts + simple stopwords)
function detectLangLoose(text: string): string {
  const t = String(text || '').toLowerCase();
  if (!t.trim()) return 'unknown';
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u3040-\u30FF]/.test(text)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
  const langs: Record<string, string[]> = {
    fr: [' le ', ' la ', ' les ', ' des ', ' et ', ' à ', ' ou ', ' expérience ', ' compétence ', ' profil '],
    en: [' the ', ' and ', ' to ', ' or ', ' experience ', ' skills ', ' profile ', ' developer ', ' engineer '],
    es: [' el ', ' la ', ' los ', ' las ', ' de ', ' y ', ' para ', ' experiencia ', ' perfil ', ' desarrollador '],
    it: [' il ', ' la ', ' lo ', ' le ', ' di ', ' e ', ' per ', ' esperienza ', ' profilo ', ' sviluppatore '],
    de: [' der ', ' die ', ' das ', ' und ', ' für ', ' erfahrung ', ' profil ', ' entwickler '],
    pt: [' o ', ' a ', ' os ', ' as ', ' de ', ' e ', ' para ', ' experiência ', ' perfil ', ' desenvolvedor '],
    nl: [' de ', ' het ', ' en ', ' voor ', ' ervaring ', ' profiel ', ' ontwikkelaar '],
    tr: [' ve ', ' için ', ' deneyim ', ' profil ', ' geliştirici ', ' mühendis '],
  };
  let best = 'unknown';
  let bestScore = 0;
  for (const [code, words] of Object.entries(langs)) {
    const score = words.reduce((acc, w) => acc + (t.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = code; }
  }
  return best;
}

// Map an experience-like object to an education record (remove bullets) (top-level)
function mapExperienceToEducation(e: any) {
  const pick = (x: any) => (typeof x === 'string' ? x.trim() : '');
  const hasEduWord = (str: string) => isLikelyEducationEntry({ company: '', title: str });
  const company = pick(e?.company);
  const title = pick(e?.title);
  let school = '';
  let degree: string | undefined = undefined;
  if (hasEduWord(company) || company.length >= title.length) school = company || title;
  else school = title || company;
  const degreeTerms = ['licence', 'license', 'bachelor', 'master', 'msc', 'mba', 'phd', 'doctorat', 'bts', 'dut', 'cap'];
  const tLow = title.toLowerCase();
  const found = degreeTerms.find(d => tLow.includes(d));
  if (found) degree = title;
  const startDate = pick(e?.startDate);
  const endDate = pick(e?.endDate);
  const rec: any = { school: school || company || title };
  if (degree) rec.degree = degree;
  if (startDate || endDate) {
    const sep = ' – ';
    rec.dates = [startDate || '', endDate || ''].filter((x, i) => i === 0 ? x !== '' : true).join(sep).trim();
    if (!rec.dates) delete rec.dates;
  }
  return rec;
}

// Construit le Clean CV et remonte l'usage (tokens) si structuration IA utilisée
async function buildCleanCv(cvText: string): Promise<{ clean: any; source: 'cache' | 'ai' | 'deterministic'; usage?: any; model?: string; }> {
  const key = createHash('sha256').update(cvText).digest('hex');
  if (cleanCache.has(key)) {
    return { clean: cleanCache.get(key), source: 'cache' };
  }
  let clean: any;
  let usage: any | undefined;
  let model: string | undefined;
  let source: 'ai' | 'deterministic' = 'deterministic';
  // Si clé IA de structuration OpenRouter présente, tenter l'IA d'abord
  if (process.env.OPENROUTER_KEY_PDF_TO_JSON) {
    try {
      const ai = await structureCvTextWithAI(cvText);
      clean = ai.structured;
      usage = (ai as any).usage;
      model = (ai as any).model;
      source = 'ai';
    } catch (e) {
      console.warn('AI structuring failed, falling back to deterministic:', e);
      clean = toCleanResume(cvText);
    }
  } else {
    clean = toCleanResume(cvText);
  }
  cleanCache.set(key, clean);
  return { clean, source, usage, model };
}

// Helper: sort experiences anti-chronologically (newest first) using endDate (YYYY-MM or "Present") then startDate
function ymToNum(ym?: string | null): number | null {
  if (!ym) return null;
  if (ym === 'Present') return 9999 * 12 + 12; // sentinel for current role
  const m = /^([0-9]{4})-([0-9]{2})$/.exec(String(ym));
  if (!m) return null;
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) return null;
  return year * 12 + month;
}

function sortExperienceAntiChrono(exps: any[]): any[] {
  if (!Array.isArray(exps)) return exps;
  const withIndex = exps.map((e, idx) => ({ e, idx }));
  withIndex.sort((a, b) => {
    const ae = a.e || {};
    const be = b.e || {};
    const aKey = ymToNum(ae.endDate) ?? ymToNum(ae.startDate);
    const bKey = ymToNum(be.endDate) ?? ymToNum(be.startDate);
    if (aKey != null && bKey != null) {
      if (bKey !== aKey) return bKey - aKey; // descending: newest first
    } else if (aKey != null) {
      return -1; // a has a date, b not → a first
    } else if (bKey != null) {
      return 1; // b has a date, a not → b first
    }
    // fallback to original order (stable)
    return a.idx - b.idx;
  });
  return withIndex.map(({ e }) => e);
}

// Try to salvage JSON from models that return extra text or trailing commas
function parseJsonStrictOrSalvage(text: string): any {
  // Pre-clean: remove markdown code fences
  let t = text.replace(/```json/gi, '```').replace(/```/g, '');
  // 1) Strict
  try { return JSON.parse(t); } catch {}
  // 2) Extract between first '{' and last '}'
  const first = t.indexOf('{');
  const last = t.lastIndexOf('}');
  if (first >= 0 && last > first) {
    let slice = t.slice(first, last + 1);
    // Remove C-style and line comments conservatively
    slice = slice.replace(/\/\*[\s\S]*?\*\//g, '');
    slice = slice.replace(/(^|[\r\n])\s*\/\/.*(?=\r?\n|$)/g, '$1');
    try { return JSON.parse(slice); } catch {}
    // 3) Minimal cleanup: smart quotes and trailing commas
    let cleaned = slice
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/,\s*([}\]])/g, '$1');
    // Again remove comments if any reappeared
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[\r\n])\s*\/\/.*(?=\r?\n|$)/g, '$1');
    try { return JSON.parse(cleaned); } catch {}
  }
  // 4) Remove trailing commas globally and retry
  const cleanedGlobal = t.replace(/,\s*([}\]])/g, '$1');
  try { return JSON.parse(cleanedGlobal); } catch {}
  throw new Error('Unable to parse JSON');
}

// Agrège les usages (tokens) par étape pour un total global
function computeCostTotals(cost: { steps: Array<{ usage?: any }>; totals?: { prompt_tokens: number; completion_tokens: number; total_tokens: number } }) {
  const totals = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
  for (const s of cost.steps) {
    const u = s?.usage as any;
    if (!u) continue;
    if (typeof u.prompt_tokens === 'number') totals.prompt_tokens += u.prompt_tokens;
    if (typeof u.completion_tokens === 'number') totals.completion_tokens += u.completion_tokens;
    if (typeof u.total_tokens === 'number') totals.total_tokens += u.total_tokens;
  }
  (cost as any).totals = totals;
}

// Calcule le coût USD par étape et total, à partir des tokens et du modèle
function computeCostUSD(cost: { steps: Array<{ name: string; model?: string; usage?: any; cost_usd?: number; price_override?: { inPerMTok: number; outPerMTok: number } }>; totals?: any; currency?: string; total_usd?: number }) {
  const envOr = (key: string, def: number) => {
    const v = process.env[key];
    const n = v ? parseFloat(v) : NaN;
    return Number.isFinite(n) ? n : def;
  };
  const pricing = (model?: string) => {
    const m = (model || '').toLowerCase();
    // 1) Configurable per-model pricing (OpenRouter or others)
    const cfg = getPricingForModel(model || '');
    if (cfg) return cfg;
    // 2) Known OpenAI defaults with env overrides
    if (m.includes('gpt-4o-mini')) {
      return { inPerMTok: envOr('PRICE_GPT4O_MINI_IN_PER_MTOK', 0.15), outPerMTok: envOr('PRICE_GPT4O_MINI_OUT_PER_MTOK', 0.60) };
    }
    if (m.includes('gpt-4o')) {
      return { inPerMTok: envOr('PRICE_GPT4O_IN_PER_MTOK', 5.0), outPerMTok: envOr('PRICE_GPT4O_OUT_PER_MTOK', 15.0) };
    }
    // 3) Fallback to default pricing
    return getDefaultPricing();
  };

  let totalUSD = 0;
  for (const step of cost.steps) {
    const u = step.usage || {};
    const override = (step as any).price_override;
    const hasOverride = override && typeof override.inPerMTok === 'number' && typeof override.outPerMTok === 'number';
    const rates = hasOverride ? override : pricing(step.model);
    const inUSD = (typeof u.prompt_tokens === 'number' ? u.prompt_tokens : 0) * (rates.inPerMTok / 1_000_000);
    const outUSD = (typeof u.completion_tokens === 'number' ? u.completion_tokens : 0) * (rates.outPerMTok / 1_000_000);
    step.cost_usd = +(inUSD + outUSD).toFixed(6);
    totalUSD += step.cost_usd;
  }
  (cost as any).currency = 'USD';
  (cost as any).total_usd = +totalUSD.toFixed(6);
}

// === Judge (arbiter) helpers ===
async function createJudgeClient() {
  if (!isJudgeEnabled()) throw new Error('Juge désactivé');
  const OpenAI = (await import('openai')).default;
  const model = getJudgeModel();
  const orKey = process.env.OPENROUTER_KEY_JUDGE || process.env.OPENROUTER_API_KEY_JUDGE;
  if (!orKey) throw new Error('Clé API OpenRouter du juge manquante (OPENROUTER_KEY_JUDGE ou OPENROUTER_API_KEY_JUDGE).');
  const client = new OpenAI({
    apiKey: orKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
      'X-Title': process.env.OPENROUTER_APP_TITLE || 'QuickCV',
    },
  });
  return { client, model };
}

async function judgePdfToJson(cvText: string, cleanCv: any) {
  if (!isJudgeEnabled()) return null;
  const { client, model } = await createJudgeClient();
  const system = [
    'You are an expert evaluator of PDF→JSON CV structuring.',
    'CRITICAL RULE: Never penalize the JSON for the absence of information that does not exist in the source (cv_text).',
    'Strictly compare clean_cv (JSON) vs cv_text (source).',
    '• If information is PRESENT in cv_text but MISSING from clean_cv → it is a model miss (classify under missingFromJsonButPresentInSource).',
    '• If information is ABSENT from cv_text (and therefore also from the JSON) → this is NOT an error. Classify it under notPresentInSource and DO NOT put it in missingFields.',
    'Provide concise EVIDENCE (≤200 characters) quoted from cv_text to support items identified as present.',
    'Explain WHY the model performed well/poorly and give a price-performance appraisal.',
    'Respond only with a JSON object conforming to the requested schema.',
  ].join(' ');
  const schema = [
    '{',
    '  "qualityScore": number (0-100),',
    '  "completenessScore": number (0-100),',
    '  "missingFields": string[],',
    '  "missingFromJsonButPresentInSource": string[],',
    '  "notPresentInSource": string[],',
    '  "structuralIssues": string[],',
    '  "strengths": string[],',
    '  "weaknesses": string[],',
    '  "recommendations": string[],',
    '  "analysis": string,',
    '  "evidence": Array<{ field: string; quote: string }>,',
    '  "sourceCoverageScore": number (0-100),',
    '  "pricePerformance": string,',
    '  "verdict": "excellent" | "good" | "fair" | "poor"',
    '}',
  ].join('\n');
  const user = JSON.stringify({
    instruction: 'Evaluate the PDF→JSON structuring without blaming missing information that is not present in the source. Classify absences correctly and provide evidence for what is present.',
    cv_text: cvText,
    clean_cv: cleanCv,
    expected_schema: schema,
  });
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
    max_tokens: 600,
  });
  const text = completion.choices[0]?.message?.content || '{}';
  let parsed: any = {};
  try { parsed = JSON.parse(text); } catch {}
  return { evaluation: parsed, usage: (completion as any)?.usage, model };
}

async function judgeArbitrage(cvText: string, cleanCv: any, jdText: string, resultJson: any, reportObj: any) {
  if (!isJudgeEnabled()) return null;
  const { client, model } = await createJudgeClient();
  const system = [
    'You are an expert evaluator of CV ↔ JD arbitration.',
    'CRITICAL RULE: Evaluate only on the basis of clean_cv (JSON) and jd_text. Do not blame missing information if it is not in clean_cv.',
    'Instead, penalize: hallucinations, misuse or non-use of information PRESENT in clean_cv, or poor coverage of JD requirements.',
    'Support EVERY important claim with concise quotations (≤200 characters) from clean_cv and/or jd_text. If no evidence is available, mark it as unsupportedCriticisms.',
    'You must evaluate: report quality, relevance of changes, keyword coverage, and overall adaptation quality.',
    'Also give a price-performance appraisal.',
    'Respond only with a JSON object conforming to the requested schema.',
  ].join(' ');
  const schema = [
    '{',
    '  "reportQualityScore": number (0-100),',
    '  "changesQualityScore": number (0-100),',
    '  "keywordCoverageScore": number (0-100),',
    '  "overallFitScore": number (0-100),',
    '  "strengths": string[],',
    '  "weaknesses": string[],',
    '  "recommendations": string[],',
    '  "cvLimitations": string[],',
    '  "modelIssues": string[],',
    '  "unsupportedCriticisms": string[],',
    '  "evidence": Array<{ source: "clean_cv" | "jd_text"; quote: string; rationale?: string }>,',
    '  "pricePerformance": string,',
    '  "analysis": string,',
    '  "verdict": "excellent" | "good" | "fair" | "poor"',
    '}',
  ].join('\n');
  const user = JSON.stringify({
    instruction: 'Evaluate the arbitration relying exclusively on clean_cv and jd_text. Do not use cv_text. Support critiques with evidence and distinguish JSON limitations vs model errors.',
    clean_cv: cleanCv,
    jd_text: jdText,
    result: resultJson,
    report: reportObj,
    expected_schema: schema,
  });
  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
    max_tokens: 700,
  });
  const text = completion.choices[0]?.message?.content || '{}';
  let parsed: any = {};
  try { parsed = JSON.parse(text); } catch {}
  return { evaluation: parsed, usage: (completion as any)?.usage, model };
}

// Route GET pour tester que l'API fonctionne
export async function GET() {
  console.log('GET /api/adapt appelée');
  return NextResponse.json({ 
    message: 'API /api/adapt fonctionne - cv_text ou images[] + Arbitrage',
    timestamp: new Date().toISOString(),
    openrouterVisionConfigured: !!process.env.OPENROUTER_KEY_VISION,
    openrouterArbitrageConfigured: !!process.env.OPENROUTER_KEY_ARBITRAGE,
    openrouterStructurerConfigured: !!process.env.OPENROUTER_KEY_PDF_TO_JSON,
    schemaLoaded: !!ResumeJSON,
    promptLoaded: !!SYSTEM_PROMPT && SYSTEM_PROMPT.length > 0,
    visionParserLoaded: true
  });
}

export async function POST(request: NextRequest) {
  console.log('POST /api/adapt appelée');
  
  try {
    // Flags évalués après parsing du FormData (plus bas) détermineront si Arbitrage est requis

    // Parser les données du formulaire
    const formData = await request.formData();
    const jdText = formData.get('jd_text') as string;
    const cvTextField = (formData.get('cv_text') as string) || '';
    const imageEntries = formData.getAll('images[]') as string[];
    const returnRaw = String(formData.get('return_raw') || '').toLowerCase() === '1'
      || String(formData.get('return_raw') || '').toLowerCase() === 'true';
    const onlyClean = String(formData.get('only_clean') || '').toLowerCase() === '1'
      || String(formData.get('only_clean') || '').toLowerCase() === 'true';
    const arbOnly = String(formData.get('arb_only') || '').toLowerCase() === '1'
      || String(formData.get('arb_only') || '').toLowerCase() === 'true';
    const onlyRaw = String(formData.get('only_raw') || '').toLowerCase() === '1'
      || String(formData.get('only_raw') || '').toLowerCase() === 'true';
    const cleanCvJson = formData.get('clean_cv_json') as string | null;
    // Overrides for ARBITRAGE only (UI-driven)
    const arbModelIdRaw = formData.get('arb_model_id') as string | null;
    const arbModelOverride = arbModelIdRaw && String(arbModelIdRaw).trim().length > 0 ? String(arbModelIdRaw).trim() : null;
    const arbInPriceRaw = formData.get('arb_in_price_per_Mtok') as string | null;
    const arbOutPriceRaw = formData.get('arb_out_price_per_Mtok') as string | null;
    const arbPriceOverride = (() => {
      const pIn = arbInPriceRaw !== null ? parseFloat(String(arbInPriceRaw)) : NaN;
      const pOut = arbOutPriceRaw !== null ? parseFloat(String(arbOutPriceRaw)) : NaN;
      if (Number.isFinite(pIn) || Number.isFinite(pOut)) {
        return { inPerMTok: Number.isFinite(pIn) ? pIn : 0, outPerMTok: Number.isFinite(pOut) ? pOut : 0 };
      }
      return undefined;
    })();
    // Compteur de coûts (tokens) par étape
    const cost: { steps: Array<{ name: string; model?: string; usage?: any; price_override?: { inPerMTok: number; outPerMTok: number } }>; totals?: { prompt_tokens: number; completion_tokens: number; total_tokens: number } } = {
      steps: [],
    };

    console.log('JD Text longueur:', jdText?.length);
    console.log('cv_text présent:', !!cvTextField, 'images[] count:', imageEntries?.length || 0);

    // Validation des entrées
    if (!jdText && !onlyRaw) {
      return NextResponse.json(
        { error: 'Description de poste (jd_text) requise' },
        { status: 400 }
      );
    }

    // Branches spéciales: Arbitrage direct sur clean_cv_json fourni
    if (arbOnly) {
      if (!cleanCvJson) {
        return NextResponse.json(
          { error: 'arb_only activé mais clean_cv_json manquant' },
          { status: 400 }
        );
      }
      // JSON-only arbitrage: do not include cv_text
      const userMessageArb = JSON.stringify({
        clean_cv: JSON.parse(cleanCvJson),
        jd_text: jdText.trim()
      });
      // Provider + modèle (OpenRouter uniquement)
      const OpenAI = (await import('openai')).default;
      const useOR = true;
      let openaiArbitrage: any;
      let arbModel = arbModelOverride || getConfiguredModel('arbitrage') || 'gpt-4o';
      {
        const key = process.env.OPENROUTER_KEY_ARBITRAGE;
        if (!key) return NextResponse.json({ error: 'OPENROUTER_KEY_ARBITRAGE manquante' }, { status: 500 });
        openaiArbitrage = new OpenAI({
          apiKey: key,
          baseURL: 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
            'X-Title': process.env.OPENROUTER_APP_TITLE || 'QuickCV',
          },
        });
      }

      try {
        const todayISO = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const reportSpec = `\n\nTEMPORAL CONTEXT:\nToday's date: ${todayISO}. Use this to compute experience durations and detect current roles (endDate: "Present").\n\nMANDATORY OUTPUT FORMAT (OVERRIDES PRIOR RULES):\nReturn a single JSON object with keys:\n- result: object STRICTLY conforming to ResumeJSON (see contract below)\n- report: an explanation object containing:\n   - narrative: string (6–10 sentences IN THE SAME LANGUAGE AS clean_cv.metadata.language — DO NOT translate; justify choices, cite 3–5 covered JD keywords and 2–3 missing, include 1–2 concrete bullet rewrites: before → after + reason)\n   - fitScore: number 0–100\n   - jdCoverage: { matchedKeywords[], missingKeywords[], partialMatches[] }\n   - decisions: {\n       keptExperiences[] (each item: at least sourceIndex and reason),\n       removedExperiences[] (at least sourceIndex and reason),\n       bulletEdits[] { sourceIndex, before, after, reason } (3–10 items max, representative sample)\n     }\n   - warnings[]?\n   - languageUsed: string  // copy clean_cv.metadata.language (do not translate)\n\nSTRICT ResumeJSON CONTRACT (minimal skeleton) — any non-listed keys are forbidden:\n{\n  metadata?: { name?: string; email?: string; phone?: string; location?: string },\n  experience: Array<{ company: string; title: string; location?: string; startDate: string; endDate?: string; bullets?: string[] }>,\n  skills?: { languages?: string[]; frameworks?: string[]; tools?: string[]; other?: string[] },\n  projects?: Array<{ name: string; description?: string; bullets?: string[] }>,\n  education?: Array<{ school: string; degree?: string; startDate?: string; endDate?: string }>,\n  certifications?: string[],\n  languages?: string[]\n}\n\nNORMALIZATION & MAPPING RULES (accept any JSON-like input):\n- If clean_cv suggests synonyms/variants, map conservatively; never invent facts.\n- Dates: format ISO short 'YYYY-MM'. If unknown, omit the field (do not set null).\n- Arrays: always arrays (even empty). Never null/undefined.\n- Strings: always strings (never objects/arrays).\n- Types: convert/coerce intelligently (e.g., number → string if necessary).\n- Optional fields: omit if not available; never invent.\n\nSTRICT JSON OUTPUT RULES:\n- Return NO text outside JSON. No Markdown, no backticks, no comments.\n- Output MUST start with '{' and end with '}'.\n- Keys and strings in double quotes \\"...\\". No single quotes for keys/values.\n- NO trailing commas.\n- All keys must be quoted (JSON standard).\n- Correctly escape internal quotes.\n\nMENTAL VALIDATION before returning:\n- All experiences have valid company, title, startDate; endDate optionally 'Present' or 'YYYY-MM'.\n- No unknown keys are added at the root level.\n- 'result' conforms to the skeleton above.\n\nREQUIREMENTS: Do not invent; prioritize clean_cv over cv_text; respect experience order.\nDo not return any text outside this JSON object.`;
        const systemPrompt = `${SYSTEM_PROMPT}\n\nNOTE IMPORTANTE: Utilise UNIQUEMENT clean_cv (CV structuré) et jd_text. Ignore toute autre source (ne PAS utiliser de cv_text). Si une information manque, laisse-la vide ou avec un placeholder approprié, n'invente rien.${reportSpec}`;
        const ARB_GUIDELINES = `\n\n=== ATS & Readability Norms (complement, do not change JSON format) ===\nGoal: normalize and optimize the CV for human readability + ATS compatibility, without inventing information. If a datum is missing, leave a clear placeholder (do not invent).\n\nUniversal rules (apply to JSON when relevant, otherwise as recommendations in report.narrative):\n- Experiences: strictly keep reverse chronological order (newest → oldest) in result.experience[].\n- Education: do NOT reorder education[] in JSON. If junior/student, you may recommend layout changes in report.narrative; do not change section order in JSON.\n- Bullets: "Result > Action > Context". Use present tense for current role, past tense otherwise. Avoid generic phrasing; highlight measurable impact only when metric already exists in CV (never invent).\n- Dates (JSON): strictly use startDate/endDate YYYY-MM and endDate:"Present" for current roles. Human formats allowed only in report.narrative if useful.\n- Titles: ADAPT the title to match JD (without unjustified upgrade). If internal title is obscure, you may add a market alias in parentheses without distorting role.\n- Skills: deduplicate and group into skills.languages/frameworks/tools. ORDER by relevance to the job; deprioritize obsolete tech (>5y) rather than delete unless clearly irrelevant; track any deletion. CRITICAL: skills.languages means programming languages, not human languages.\n\n=== Reclassification rule (Education) ===\n- If an experience is removed but actually corresponds to education/training, reclassify it and APPEND it to result.education.\n- Education entries must follow this structure only: { school, degree?, location?, dates? }. Do not include bullets.\n- NEVER modify or remove original education from clean_cv; only append reclassified items.\n- In report.decisions, include reclassifiedToEducation[] entries with: { sourceIndex, school, dates?, reason }.`;
        const NARRATIVE_CLIENT_TONE = `\n\n=== Client-facing narrative ===\n- Persona: HR professional in the candidate’s domain (infer from clean_cv and/or jd_text).\n- Open with a concise sentence; use the SAME LANGUAGE as the resume (clean_cv.metadata.language). DO NOT translate.\n- Be specific and fact-based: cite concrete CV elements (titles, companies, dates, 1–2 metrics already present, stack) and tie them to JD requirements (3–5 covered keywords and 2–3 missing). IMPORTANT: the company name in jd_text is NOT a technical keyword.\n- Structure in 3–5 short paragraphs (fit, strengths, gaps and targeted recommendations, edits proposed, synthesis).\n- Include 1–2 real bullet rewrites (before → after + reason), consistent with report.decisions.bulletEdits.\n- General advice only if grounded in CV/JD content; do not invent.\n- SPECIAL RULE INTERNSHIP: If the last experience before first job is an internship containing "thesis"/equivalent in the same domain, ALWAYS preserve it in result.experience[] and justify in decisions.keptExperiences.\n`;
        const systemPromptFull = `${systemPrompt}\n${ARB_GUIDELINES}\n${NARRATIVE_CLIENT_TONE}`;
        const supportsJsonResponseFormat = !useOR || String(arbModel).startsWith('openai/');
        const req1: any = {
          model: arbModel,
          messages: [
            { role: 'system', content: systemPromptFull },
            { role: 'user', content: userMessageArb },
          ],
          temperature: 0.0,
        };
        // Use fallback orchestrator across 8 models
        const arbCall = await callWithFallbackChat({
          client: openaiArbitrage,
          messages: req1.messages,
          temperature: 0.0,
          validate: (t: string) => {
            try { JSON.parse(t); return true; } catch {}
            try { parseJsonStrictOrSalvage(t); return true; } catch {}
            return false;
          },
        });
        const responseContent = arbCall.text;
        cost.steps.push({ name: 'arbitrage', model: arbCall.modelUsed, usage: arbCall.usage });
        if (!responseContent) {
          return NextResponse.json({ error: 'Réponse vide de l\'API OpenRouter' }, { status: 500 });
        }
        let parsedTop: any;
        try {
          parsedTop = JSON.parse(responseContent);
        } catch {
          try {
            parsedTop = parseJsonStrictOrSalvage(responseContent);
          } catch (e) {
            return NextResponse.json({ error: 'Réponse JSON invalide (arb_only)', details: (e as Error)?.message || String(e) }, { status: 500 });
          }
        }
        const aiResult = parsedTop?.result ?? parsedTop; // compat si ancien format
        const aiReport = parsedTop?.report ?? null;
        const sanitized = sanitizeResumeForSchema(aiResult, { cvText: '', jdText });
        if (sanitized && Array.isArray(sanitized.experience)) {
          sanitized.experience = sortExperienceAntiChrono(sanitized.experience);
        }
        const validationResult = ResumeJSON.safeParse(sanitized);
        if (!validationResult.success) {
          return NextResponse.json({ error: 'JSON généré non conforme au schéma', issues: validationResult.error.issues }, { status: 422 });
        }
        // Enforce summary rewrite in arb_only as well
        const beforeCvArbOnly = JSON.parse(cleanCvJson);
        let afterCvArbOnly: any = validationResult.data;
        const normSum = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
        const langLabel2 = String(beforeCvArbOnly?.metadata?.language || '').trim();
        const jac2 = (() => {
          const tok = (t: string) => new Set(String(t || '').toLowerCase().split(/[^a-z0-9]+/gi).filter(Boolean));
          const A = tok(afterCvArbOnly?.summary);
          const B = tok(beforeCvArbOnly?.summary);
          const sizeA = A.size;
          const sizeB = B.size;
          if (sizeA === 0 && sizeB === 0) return 1;
          let interCount = 0;
          A.forEach((x) => { if (B.has(x)) interCount++; });
          const unionCount = sizeA + sizeB - interCount;
          return interCount / Math.max(1, unionCount);
        })();
        const needsRewrite2 = !afterCvArbOnly.summary || jac2 >= 0.85;
        if (needsRewrite2) {
          try {
            const summarySys2 = `You rewrite a professional resume summary strictly from clean_cv facts to align with the given job description. Rules: 2–3 sentences, ≤ 400 characters. IMPORTANT: Output MUST be in "${langLabel2}" language (exactly the same as clean_cv.metadata.language). DO NOT translate. Impersonal professional tone (no first‑person), no bullet list, no new facts or metrics, no company names not in clean_cv.`;
            const summaryUser2 = JSON.stringify({ clean_cv: beforeCvArbOnly, jd_text: jdText });
            const sumReq2: any = {
              model: arbModel,
              messages: [
                { role: 'system', content: summarySys2 },
                { role: 'user', content: summaryUser2 },
              ],
              temperature: 0.0,
              max_tokens: 220,
            };
            const sumCall2 = await callWithFallbackChat({ client: openaiArbitrage, messages: sumReq2.messages, temperature: 0.0, max_tokens: 220 });
            const sumTxt2 = (sumCall2.text || '').trim();
            if (sumTxt2) afterCvArbOnly.summary = sumTxt2;
            // Strict guard: if language changed, revert to original summary
            try {
              const origLang2 = String(beforeCvArbOnly?.metadata?.language || '').toLowerCase();
              const detLang2 = detectLangLoose(afterCvArbOnly.summary || '');
              if (origLang2 && detLang2 !== 'unknown' && detLang2 !== origLang2) {
                afterCvArbOnly.summary = beforeCvArbOnly.summary || afterCvArbOnly.summary;
                cost.steps.push({ name: 'summary_language_guard_revert', model: 'server', usage: { note: 'reverted to original summary due to language mismatch' } });
              }
            } catch {}
            cost.steps.push({ name: 'summary_rewrite', model: sumCall2.modelUsed, usage: sumCall2.usage });
          } catch (e) {
            console.warn('Summary rewrite (arb_only) skipped due to error:', e);
          }
        }
        // Reclassify removed experiences as education when appropriate
        try {
          const normStr = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
          const sig = (e: any) => [normStr(e?.company), normStr(e?.startDate || e?.startDateRaw), normStr(e?.endDate || e?.endDateRaw)].join('|');
          const beforeList = Array.isArray(beforeCvArbOnly?.experience) ? beforeCvArbOnly.experience : [];
          const afterList = Array.isArray(afterCvArbOnly?.experience) ? afterCvArbOnly.experience : [];
          const afterSigs = new Set(afterList.map(sig));
          const ensureEdu = () => { if (!Array.isArray(afterCvArbOnly.education)) afterCvArbOnly.education = []; };
          const eduKey = (x: any) => [normStr(x?.school), normStr(x?.dates)].join('|');
          const hasEdu = (rec: any) => (afterCvArbOnly.education || []).some((x: any) => eduKey(x) === eduKey(rec));
          beforeList.forEach((e: any) => {
            if (!e) return;
            if (afterSigs.has(sig(e))) return; // not removed
            if (!isLikelyEducationEntry(e)) return;
            const rec = mapExperienceToEducation(e);
            if (!rec?.school) return;
            ensureEdu();
            if (!hasEdu(rec)) afterCvArbOnly.education.push(rec);
          });
        } catch {}
        // Preserve header exactly from clean CV (name, email, phone, links)
        try {
          if (beforeCvArbOnly?.header) {
            afterCvArbOnly.header = beforeCvArbOnly.header;
          }
        } catch {}
        // Enforce metadata.language to original CV language (arb_only)
        try {
          afterCvArbOnly.metadata = afterCvArbOnly.metadata || {};
          afterCvArbOnly.metadata.language = beforeCvArbOnly?.metadata?.language || 'unknown';
        } catch {}
        // Enforce original language on sections (guard against translation)
        try {
          const origLang2 = String(beforeCvArbOnly?.metadata?.language || '').toLowerCase();
          enforceOriginalLanguageCV(afterCvArbOnly, beforeCvArbOnly, origLang2);
        } catch {}
        // Drop AI narrative if wrong language
        if (aiReport && aiReport.narrative) {
          try {
            const origLang2 = String(beforeCvArbOnly?.metadata?.language || '').toLowerCase();
            const narrLang = detectLangLoose(String(aiReport.narrative || ''));
            if (narrLang !== 'unknown' && narrLang !== origLang2) {
              delete aiReport.narrative;
            }
          } catch {}
        }
        {
          const origLang2 = String(beforeCvArbOnly?.metadata?.language || '').toLowerCase();
          const detLang2 = detectLangLoose(afterCvArbOnly.summary || '');
          if (origLang2 && detLang2 !== 'unknown' && detLang2 !== origLang2) {
            afterCvArbOnly.summary = beforeCvArbOnly.summary || afterCvArbOnly.summary;
          }
        }
        // Merge original education with AI additions (append-only, dedup, max 8) — arb_only
        try {
          const base = Array.isArray(beforeCvArbOnly?.education) ? beforeCvArbOnly.education : [];
          const aiEdu = Array.isArray(afterCvArbOnly?.education) ? afterCvArbOnly.education : [];
          const normE = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
          const canonDate = (s: any) => normE(String(s || '')
            .replace(/[\u2012\u2013\u2014\u2015\u2212]/g, '-') // unicode dashes → hyphen
            .replace(/\s*-\s*/g, '-') // strip spaces around hyphen
            .replace(/-+/g, '-')        // collapse multiple hyphens
          );
          const keyE = (e: any) => [normE(e?.school), canonDate(e?.dates || ((e?.startDate || '') + '-' + (e?.endDate || '')))].join('|');
          const seen = new Set(base.map(keyE));
          const merged: any[] = base.slice();
          aiEdu.forEach((e: any) => {
            if (!e || !e.school) return;
            const obj: any = { school: e.school };
            if (e.degree) obj.degree = e.degree;
            if (e.location) obj.location = e.location;
            if (e.dates) {
              obj.dates = e.dates;
            } else {
              const sd = e.startDate;
              const ed = e.endDate && e.endDate !== 'Present' ? e.endDate : undefined;
              const d = [sd, ed].filter(Boolean).join('-');
              if (d) obj.dates = d;
            }
            const k = keyE(obj);
            if (!seen.has(k)) { seen.add(k); merged.push(obj); }
          });
          afterCvArbOnly.education = merged.slice(0, 8);
        } catch {}
        // Bullets XYZ rewrite per experience/projects (arb_only)
        try {
          const origLang2 = String(beforeCvArbOnly?.metadata?.language || '').trim();
          const getKeywords = (s: string) => {
            const toks = String(s || '').toLowerCase().split(/[^a-z0-9+.#]/gi).filter(w => w.length >= 3);
            const freq = new Map<string, number>();
            toks.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
            return Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]).map(([w])=>w).slice(0, 20);
          };
          const jdKw = getKeywords(jdText || '');
          const numsRegex = /\b\d[\d.,]*%?\b/g;
          const words22 = (s: string) => {
            const parts = String(s || '').trim().split(/\s+/);
            return parts.length > 22 ? parts.slice(0, 22).join(' ') : String(s || '').trim();
          };
          const verbsUnion2 = filterForATS(getVerbs(ACTION_VERB_CATEGORIES));
          const verbsSet2 = new Set(verbsUnion2.map(v => v.toLowerCase()));
          const SEED2 = `ACTION VERB STARTER SEED (English forms for guidance only; do NOT translate the rest): ${verbsUnion2.slice(0, 60).join(', ')}`;
          const defaultVerbByLang2: Record<string, string> = { en: 'Implemented', fr: 'Réalisé' };
          const ensureActionVerbStart2 = (text: string) => {
            const before = String(text || '').trim();
            if (!before) return { changed: false, value: before };
            const lang = (origLang2 || '').toLowerCase();
            const s = before.replace(/^[-•*—–]\s*/, '');
            const first = s.split(/\s+/)[0] || '';
            if (lang === 'en') {
              if (verbsSet2.has(first.toLowerCase())) return { changed: before !== s, value: s };
              return { changed: true, value: `${defaultVerbByLang2.en} ${s}`.replace(/\s{2,}/g, ' ').trim() };
            }
            if (lang === 'fr') {
              if (/^[A-ZÀ-ÖØ-Þ]/.test(first)) return { changed: before !== s, value: s };
              return { changed: true, value: `${defaultVerbByLang2.fr} ${s}`.replace(/\s{2,}/g, ' ').trim() };
            }
            // Other languages: do NOT prefix (avoid cross-language injection); only trim leading bullet symbol.
            return { changed: before !== s, value: s };
          };
          const LLM_SYSTEM = [
            'You rewrite resume bullets using the XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]."',
            '- Start with a strong ACTION VERB; include 1 clear METRIC if it already exists; then HOW it was done.',
            '- Keep each bullet concise (≤ 22 words), past tense unless current role.',
            '- No fluff, no buzzwords, no invented facts.',
            '',
            'IMPORTANT — METRICS & INTEGRITY',
            '- NEVER invent numbers. Use a metric ONLY if it already exists in the input bullet.',
            '- If no metric exists, keep the bullet QUALITATIVE (no numbers).',
            '- You may SUGGEST possible metrics, but ONLY inside REPORT.recommendations (not in the rewritten bullets).',
            '',
            'TASK',
            'For each input bullet, output one rewritten bullet that follows XYZ. If there’s no metric, keep impact qualitative and factual (no numbers). Optionally add metric SUGGESTIONS in REPORT.recommendations.',
            '',
            'RULES',
            '1) Structure = ACTION VERB → X (what) → Y (metric/impact/baseline, if present) → Z (how).',
            '2) Exactly ONE metric Y, and ONLY if present in the original bullet (%, $, time, volume).',
            '3) Domain wording consistent; optionally align to context.jd_keywords when semantically equivalent to the original bullet.',
            '4) Avoid vague openers (“Responsible for…”, “Worked on…”). Use specific verbs.',
            '5) Do NOT add new achievements, tools, companies, or numbers.',
            '6) Remove filler (“successfully”, “various”, “numerous”). No first-person.',
            '',
            'BULLET VOLUME CONTROL (PRUNE & SHORTEN)',
            '- If an experience has MANY bullets, you MAY remove low-signal bullets—especially when that experience is minor or not relevant to jd_keywords.',
            '- Target count (guideline, not strict): major experiences 3–5 bullets; minor/less relevant 1–3 bullets.',
            '- Prefer to KEEP bullets that show measurable outcomes, leadership/ownership, or JD-aligned skills. Remove repetitive, overlapping, or purely duty-based bullets.',
            '- If a bullet is long or verbose, you MAY shorten it while preserving meaning and facts (keep ≤ 22 words, keep original claims, no new metrics).',
            '- All removals/shortenings MUST be logged in REPORT (see OUTPUT FORMAT).',
            '',
            'ALGORITHM (follow exactly)',
            'A) Parse each bullet: verb, what/result, any EXISTING metric, the “how”.',
            'B) If no metric exists, keep qualitative impact; DO NOT fabricate numbers.',
            'C) Draft: VERB + X + (optional Y if present) + Z. Ensure ≤ 22 words.',
            'D) Prune pass (per experience): rank bullets by JD relevance + impact; mark low-signal items for removal.',
            'E) Shorten pass: compress verbose bullets (remove filler, merge duplicates, keep one metric).',
            'F) Validate: each kept bullet has verb, what, how; metric only if present.',
            '',
            `Output MUST be in the same language as clean_cv.metadata.language: "${origLang2}". DO NOT translate.`,
            SEED2,
          ].join('\n');
          const perExpLogs: any[] = [];
          (afterCvArbOnly?.experience || []).forEach((_: any, idx: number) => { perExpLogs[idx] = null; });
          for (let i = 0; i < (afterCvArbOnly?.experience || []).length; i++) {
            const exp = afterCvArbOnly.experience[i];
            const originalBullets: string[] = Array.isArray(exp?.bullets) ? exp.bullets : [];
            if (!originalBullets.length) continue;
            const userPayload = JSON.stringify({ bullets: originalBullets, context: { jd_keywords: jdKw } });
            const req: any = { model: arbModel, messages: [ { role: 'system', content: LLM_SYSTEM }, { role: 'user', content: userPayload } ], temperature: 0.0 };
            let out: any = null;
            try {
              const call = await callWithFallbackChat({ client: openaiArbitrage, messages: req.messages, temperature: 0.0 });
              cost.steps.push({ name: 'bullets_rewrite', model: call.modelUsed, usage: call.usage });
              const txt = (call.text || '').trim();
              try { out = JSON.parse(txt); } catch { try { out = parseJsonStrictOrSalvage(txt); } catch {} }
            } catch {}
            if (!out || !Array.isArray(out?.bullets_xyz)) continue;
            const allowNums = new Set((originalBullets.join(' ') .match(numsRegex) || []).map(s => s));
            const cleaned: string[] = [];
            for (const b of out.bullets_xyz) {
              if (!b) continue;
              let s = String(b).trim();
              const det = detectLangLoose(s);
              if (det !== 'unknown' && det !== origLang2.toLowerCase()) continue;
              const nums = s.match(numsRegex) || [];
              for (const n of nums) { if (!allowNums.has(n)) { s = s.replace(n, '').replace(/\s{2,}/g, ' ').trim(); } }
              s = words22(s);
              if (s) cleaned.push(s);
              if (cleaned.length >= 5) break;
            }
            if (!cleaned.length) cleaned.push(originalBullets[0]);
            const seenB = new Set<string>();
            let deduped = cleaned.filter(x => { const k = x.toLowerCase(); if (seenB.has(k)) return false; seenB.add(k); return true; });
            const harmonized: any[] = [];
            deduped = deduped.map((s, idxB) => {
              const r = ensureActionVerbStart2(s);
              if (r.changed && r.value !== s) harmonized.push({ index: idxB, before: s, after: r.value, reason: 'prefixed action verb for harmonization' });
              return r.value;
            });
            exp.bullets = deduped.length ? deduped : originalBullets;
            perExpLogs[i] = { experienceIndex: i, recommendations: out?.REPORT?.recommendations || [], pruned: out?.REPORT?.pruned || {}, shortened: out?.REPORT?.shortened || [], harmonized };
          }
          // Projects rewrite (arb_only)
          const perProjLogs: any[] = [];
          (afterCvArbOnly?.projects || []).forEach((_: any, idx: number) => { perProjLogs[idx] = null; });
          for (let i = 0; i < (afterCvArbOnly?.projects || []).length; i++) {
            const proj = afterCvArbOnly.projects[i];
            const originalBullets: string[] = Array.isArray(proj?.bullets) ? proj.bullets : [];
            if (!originalBullets.length) continue;
            const userPayload = JSON.stringify({ bullets: originalBullets, context: { jd_keywords: jdKw } });
            const req: any = { model: arbModel, messages: [ { role: 'system', content: LLM_SYSTEM }, { role: 'user', content: userPayload } ], temperature: 0.0 };
            let out: any = null;
            try {
              const call = await callWithFallbackChat({ client: openaiArbitrage, messages: req.messages, temperature: 0.0 });
              cost.steps.push({ name: 'bullets_rewrite_projects', model: call.modelUsed, usage: call.usage });
              const txt = (call.text || '').trim();
              try { out = JSON.parse(txt); } catch { try { out = parseJsonStrictOrSalvage(txt); } catch {} }
            } catch {}
            if (!out || !Array.isArray(out?.bullets_xyz)) continue;
            const allowNums = new Set((originalBullets.join(' ') .match(numsRegex) || []).map(s => s));
            const cleaned: string[] = [];
            for (const b of out.bullets_xyz) {
              if (!b) continue;
              let s = String(b).trim();
              const det = detectLangLoose(s);
              if (det !== 'unknown' && det !== origLang2.toLowerCase()) continue;
              const nums = s.match(numsRegex) || [];
              for (const n of nums) { if (!allowNums.has(n)) { s = s.replace(n, '').replace(/\s{2,}/g, ' ').trim(); } }
              s = words22(s);
              if (s) cleaned.push(s);
              if (cleaned.length >= 4) break;
            }
            if (!cleaned.length) cleaned.push(originalBullets[0]);
            const seenB = new Set<string>();
            let deduped = cleaned.filter(x => { const k = x.toLowerCase(); if (seenB.has(k)) return false; seenB.add(k); return true; });
            const harmonized: any[] = [];
            deduped = deduped.map((s, idxB) => {
              const r = ensureActionVerbStart2(s);
              if (r.changed && r.value !== s) harmonized.push({ index: idxB, before: s, after: r.value, reason: 'prefixed action verb for harmonization' });
              return r.value;
            });
            proj.bullets = deduped.length ? deduped : originalBullets;
            perProjLogs[i] = { projectIndex: i, recommendations: out?.REPORT?.recommendations || [], pruned: out?.REPORT?.pruned || {}, shortened: out?.REPORT?.shortened || [], harmonized };
          }
          const __br: any = { perExperience: perExpLogs.filter(Boolean) };
          const pj = perProjLogs.filter(Boolean);
          if (pj.length) __br.perProjects = pj;
          (afterCvArbOnly as any).__bulletRewrite = __br;
        } catch {}
        const payload: any = { result: afterCvArbOnly, report: { ...(aiReport || {}), languageUsed: (langLabel2 || 'same-as-clean_cv'), summaryEdit: { before: String(beforeCvArbOnly?.summary || ''), after: String(afterCvArbOnly?.summary || ''), changed: normSum(beforeCvArbOnly?.summary) !== normSum(afterCvArbOnly?.summary), keywordsUsed: [] as string[] } } };
        if ((afterCvArbOnly as any).__bulletRewrite) {
          (payload.report as any).bulletRewrite = (afterCvArbOnly as any).__bulletRewrite;
        }
        try {
          const j2 = await judgeArbitrage('', JSON.parse(cleanCvJson), jdText, afterCvArbOnly, { ...(aiReport || {}), summaryEdit: { before: String(beforeCvArbOnly?.summary || ''), after: String(afterCvArbOnly?.summary || ''), changed: normSum(beforeCvArbOnly?.summary) !== normSum(afterCvArbOnly?.summary), keywordsUsed: [] as string[] } });
          if (j2) {
            payload.judge = { arbitrage: j2.evaluation };
            cost.steps.push({ name: 'judge_arbitrage', model: j2.model, usage: j2.usage });
          }
        } catch (e) {
          (payload as any).judge_error = (e instanceof Error ? e.message : String(e));
        }
        computeCostTotals(cost);
        computeCostUSD(cost);
        payload.cost = cost;
        return NextResponse.json(payload, { status: 200 });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: `Erreur lors de l'arbitrage OpenRouter: ${errorMessage}` }, { status: 500 });
      }
    }

    // ÉTAPE 1 : Récupérer cv_text (client) ou OCR via images[] (Vision)
    let cvText: string = '';
    let methodUsed: 'client' | 'vision' = 'client';
    let imagesCount: number | undefined = undefined;
    if (cvTextField && cvTextField.trim().length > 20) {
      console.log('=== ÉTAPE 1: Texte CV fourni par le client ===');
      cvText = normalizeText(cvTextField);
      // Journaliser une étape gratuite: extraction locale côté client
      cost.steps.push({ name: 'client_extract', model: 'local', usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } });
    } else if (imageEntries && imageEntries.length > 0) {
      console.log('=== ÉTAPE 1: OCR Vision sur images[] ===');
      {
        if (!process.env.OPENROUTER_KEY_VISION) {
          return NextResponse.json(
            { error: 'Configuration OpenRouter Vision manquante (requise pour OCR images[])' },
            { status: 500 }
          );
        }
      }
      try {
        // Sécurité/coûts: limiter à 3 images max
        const limitedImages = imageEntries.slice(0, 3);
        imagesCount = limitedImages.length;
        methodUsed = 'vision';
        const ocr = await extractTextFromImagesWithVision(limitedImages);
        cvText = ocr.text;
        cost.steps.push({ name: 'vision_ocr', model: ocr.model, usage: (ocr as any).usage });
        console.log('Texte OCR Vision longueur:', cvText.length);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
          { error: `OCR Vision échouée: ${errorMessage}` },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Veuillez fournir soit cv_text (extrait côté client) soit images[] (data URLs) pour OCR.' },
        { status: 400 }
      );
    }

    // Vérifier que le texte n'est pas vide
    if (!cvText || cvText.trim().length < 20) {
      return NextResponse.json(
        { 
          error: 'Aucun texte détecté dans le PDF avec l\'IA Vision. Veuillez vérifier que le PDF contient du contenu lisible.' 
        },
        { status: 400 }
      );
    }

    // Mode ONLY RAW: retourner uniquement le texte extrait (et coûts)
    if (onlyRaw) {
      computeCostTotals(cost);
      computeCostUSD(cost);
      const payload: any = {
        raw_cv: { text: cvText, method: methodUsed, imagesCount },
        cost,
      };
      return NextResponse.json(payload, { status: 200 });
    }

    // ÉTAPE 2 : Clean CV structuring (AI-first with fallback, cached)
    const cleanRes = await buildCleanCv(cvText);
    const cleanCv = cleanRes.clean;
    if ((cleanRes as any).usage) {
      cost.steps.push({ name: 'structuring_ai', model: (cleanRes as any).model, usage: (cleanRes as any).usage });
    } else {
      // Journaliser une étape gratuite si structuration déterministe (fallback) ou cache sans usage
      cost.steps.push({ name: 'structuring_deterministic', model: 'local', usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } });
    }

    // Si only_clean demandé, retourner un clean_cv SANITIZED & trié (+raw si demandé)
    if (onlyClean) {
      let cleaned = sanitizeResumeForSchema(cleanCv, { cvText, jdText: jdText || '' });
      if (cleaned && Array.isArray(cleaned.experience)) {
        cleaned.experience = sortExperienceAntiChrono(cleaned.experience);
      }
      const validationResult = ResumeJSON.safeParse(cleaned);
      if (!validationResult.success) {
        return NextResponse.json({ error: 'JSON structuré non conforme au schéma', issues: validationResult.error.issues }, { status: 422 });
      }
      const payload: any = { clean_cv: validationResult.data };
      // Judge PDF→JSON (optional)
      try {
        const j = await judgePdfToJson(cvText, cleanCv);
        if (j) {
          payload.judge = { pdfToJson: j.evaluation };
          cost.steps.push({ name: 'judge_pdf', model: j.model, usage: j.usage });
        }
      } catch (e) {
        payload.judge_error = (e instanceof Error ? e.message : String(e));
      }
      computeCostTotals(cost);
      computeCostUSD(cost);
      payload.cost = cost;
      if (returnRaw) payload.raw_cv = { text: cvText, method: methodUsed, imagesCount };
      return NextResponse.json(payload, { status: 200 });
    }

    // ÉTAPE 3 : Préparer le payload pour l'arbitrage (JSON-only: pas de cv_text)
    const userMessage = JSON.stringify({
      clean_cv: cleanCv,
      jd_text: jdText.trim()
    });

    console.log('=== ÉTAPE 2: Arbitrage et adaptation ===');

    // Provider + modèle (arbitrage)
    const OpenAI = (await import('openai')).default;
    const useOR = true;
    let openaiArbitrage: any;
    let arbModel = arbModelOverride || getConfiguredModel('arbitrage') || 'gpt-4o';
    {
      const key = process.env.OPENROUTER_KEY_ARBITRAGE;
      if (!key) return NextResponse.json({ error: 'OPENROUTER_KEY_ARBITRAGE manquante' }, { status: 500 });
      openaiArbitrage = new OpenAI({
        apiKey: key,
        baseURL: 'https://openrouter.ai/api/v1',
        defaultHeaders: {
          'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
          'X-Title': process.env.OPENROUTER_APP_TITLE || 'QuickCV',
        },
      });
    }

    // Appel à l'API OpenRouter Arbitrage
    let completion;
    try {
      const todayISO = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const reportSpec = `\n\nCONTEXTE TEMPOREL:\nDate du jour: ${todayISO}. Utilise cette date pour calculer la durée des expériences et déterminer si un poste est actuel (endDate: "Present").\n\nFORMAT SORTIE OBLIGATOIRE (REMPLACE LA RÈGLE PRÉCÉDENTE):\nRetourne un unique objet JSON avec les clés:\n- result: l'objet STRICTEMENT conforme à ResumeJSON (voir contrat ci-dessous)\n- report: un objet d'explication contenant:\n   - narrative: string (6 à 10 phrases DANS LA MÊME LANGUE QUE clean_cv.metadata.language — NE PAS traduire; justifie les choix, cite 3–5 mots-clés JD couverts et 2–3 manquants, inclut 1–2 exemples concrets de réécriture de bullet: avant → après + raison)\n   - fitScore: nombre 0–100\n   - jdCoverage: { matchedKeywords: string[], missingKeywords: string[], partialMatches: string[] }\n   - decisions: {\n       keptExperiences: string[],\n       removedExperiences: string[],\n       bulletEdits: Array<{ sourceIndex: number; before: string; after: string; reason: string }>\n     }\n   - warnings?: string[]\n   - languageUsed: string\n   - summaryEdit: { before: string; after: string; changed: boolean; keywordsUsed: string[] }\n\nCONTRAT STRICT ResumeJSON (squelette minimal indicatif) — toutes les clés non listées sont interdites:\n{\n  metadata?: { name?: string; email?: string; phone?: string; location?: string },\n  experience: Array<{\n    company: string; title: string; location?: string; startDate: string; endDate?: string; bullets?: string[]\n  }>,\n  skills?: { languages?: string[]; frameworks?: string[]; tools?: string[]; other?: string[] },\n  projects?: Array<{ name: string; description?: string; bullets?: string[] }>,\n  education?: Array<{ school: string; degree?: string; startDate?: string; endDate?: string }>,\n  certifications?: string[],\n  languages?: string[]\n}\n\nRÈGLES DE NORMALISATION & MAPPING (accepte n'importe quel format JSON en entrée):\n- Si clean_cv ou cv_text suggèrent des synonymes de clés, mappe-les vers notre schéma:\n  • experiences/work/jobs/workExperience → experience\n  • company_name/employer/org → company\n  • position/role → title\n  • city → location\n  • start/from → startDate\n  • end/to → endDate (utiliser "Present" si en cours)\n  • bullets/achievements/responsibilities → bullets (array de strings)\n  • tech/technology/stack → skills.other ou répartir dans languages/frameworks/tools\n  • education/educations/academics → education\n- Dates: format ISO court 'YYYY-MM'. Si inconnue, omets le champ.\n- Tableaux: toujours des arrays (même vides). Jamais null/undefined.\n- Chaînes: toujours des strings (jamais objets/arrays).\n- Types: convertis/coerces intelligemment (ex.: nombre → string si nécessaire).\n- Champs optionnels: omets-les si non disponibles; ne JAMAIS inventer.\n\nVALIDATION MENTALE avant retour:\n- Toutes les expériences ont company, title, startDate valides; endDate éventuellement 'Present' ou 'YYYY-MM'.\n- Aucune clé inconnue n'est ajoutée au niveau racine.\n- 'result' respecte le squelette ci-dessus.\n\nEXIGENCES: Ne pas inventer; prioriser clean_cv sur cv_text; respecter l'ordre des expériences.\nNe renvoie absolument aucun texte en dehors de cet objet JSON.`;
      const systemPrompt = `${SYSTEM_PROMPT}\n\nNOTE IMPORTANTE: Utilise UNIQUEMENT clean_cv (CV structuré) et jd_text. Ignore toute autre source (ne PAS utiliser de cv_text). Si une information manque, laisse-la vide ou avec un placeholder approprié, n'invente rien.${reportSpec}`;
      const ARB_GUIDELINES = `\n\n=== Normes ATS & Lisibilité (complément, ne pas modifier le format JSON) ===\nObjectif: normaliser et optimiser le CV pour lisibilité humaine + compatibilité ATS, sans inventer d'informations. Si une donnée manque, laisser un espace réservé clair (sans inventer).\n\nRègles universelles (appliquer au JSON quand pertinent, sinon en recommandations dans report.narrative):\n- Expériences: respecter rigoureusement l'ordre anti-chronologique (plus récent → plus ancien) dans result.experience[].\n- Éducation: ne PAS réordonner le tableau education[] dans le JSON. Si junior/étudiant, tu peux le recommander dans report.narrative (mise en page), mais tu ne modifies pas l'ordre des sections dans le JSON.\n- Bullets: méthode "Résultat > Action > Contexte". Verbes d'action homogènes: présent pour rôle actuel, passé pour anciens. Éviter formulations génériques; valoriser l'impact mesurable dès que la métrique existe déjà dans le CV (ne jamais inventer).\n- Dates (JSON): utiliser strictement startDate/endDate au format YYYY-MM et endDate:"Present" pour un poste en cours. Les formats humains (ex. 03/2021–08/2024) sont autorisés uniquement dans report.narrative si utile.\n- Titres: ADAPTER le titre (result.header.title ou result.metadata.title si présent dans le schéma) pour qu'il corresponde au poste visé dans la JD. Si l'intitulé interne est obscur, ajouter un alias marché entre parenthèses dans title, sans déformer le rôle (ex: "Ingénieur Logiciel (Backend)").\n- Compétences: dédupliquer et regrouper selon notre schéma (skills.languages/frameworks/tools). ORDONNER les compétences par pertinence au poste: les plus pertinentes en premier dans chaque catégorie. Déprioriser les technos obsolètes (>5 ans) plutôt que supprimer, sauf si clairement non pertinentes; toute suppression doit être tracée. ATTENTION CRITIQUE: "skills.languages" désigne les LANGAGES DE PROGRAMMATION (Python, Java, C++, etc.), PAS les langues parlées (anglais, français, etc.). Les langues parlées vont dans le champ "languages" (racine du JSON). Ne JAMAIS confondre les deux.\n- Projets/Éducation/Certifs/Langues: ne renseigner que si l'information existe dans clean_cv; nemais inventer).\n- Dates (JSON): utiliser strictement startDate/endDate au format YYYY-MM et endDate:"Present" pour un poste en cours. Les formats humains (ex. 03/2021–08/2024) sont autorisés uniquement dans report.narrative si utile.\n- Titres: ADAPTER le titre (result.header.title ou result.metadata.title si présent dans le schéma) pour qu'il corresponde au poste visé dans la JD. Si l'intitulé interne est obscur, ajouter un alias marché entre parenthèses dans title, sans déformer le rôle (ex: "Ingénieur Logiciel (Backend)").\n- Compétences: dédupliquer et regrouper selon notre schéma (skills.languages/frameworks/tools). ORDONNER les compétences par pertinence au poste: les plus pertinentes en premier dans chaque catégorie. Déprioriser les technos obsolètes (>5 ans) plutôt que supprimer, sauf si clairement non pertinentes; toute suppression doit être tracée.\n- Projets/Éducation/Certifs/Langues: ne renseigner que si l'information existe dans clean_cv; ne rien inventer.\n- Mise en page (polices, marges, icônes, tableaux, PDF) et éléments purement visuels: ne modifient pas le JSON; formuler ces points en recommandations dans report.narrative si pertinent.\n\nCorrections/normalisations automatiques (et traçabilité):\n- Harmoniser temps verbaux et début de puces par verbe d'action.\n- Réécrire "responsable de" → formulation axée impact quand l'information existe.\n- Rapatrier les métriques existantes vers la puce correspondante sans en inventer.\n- Uniformiser les dates JSON (YYYY-MM / "Present").\n- Limiter 1–5 puces par expérience (conforme au schéma).\n- Si une expérience est supprimée/élaguée pour pertinence: l'inscrire dans report.decisions.removedExperiences avec { sourceIndex, reason } et ajouter un avertissement dans report.warnings si la perte d'information est significative.\n- Toute réécriture de puce doit être listée dans report.decisions.bulletEdits { sourceIndex, before, after, reason }.\n\nChecklist de validation (JSON + narrative):\n- Expériences anti-chronologiques respectées.\n- Verbes d'action et temps cohérents.\n- ≥1 impact/métrique par expérience si la donnée existe (sinon laisser la puce factuelle).\n- Dates JSON uniformes.\n- Compétences dédupliquées et regroupées (languages/frameworks/tools).\n- Aucune info sensible ajoutée; aucune invention.\n`;
      const NARRATIVE_CLIENT_TONE = `\n\n=== Rédaction du compte rendu (client-facing) ===\n- Persona: Tu es un RH spécialisé dans le recrutement du profil du candidat (inférer le profil à partir de clean_cv et/ou jd_text: ex. dernier titre + stack dominante).\n- Adresse-toi au candidat et commence le compte rendu par: "Votre CV ...".\n- Sois spécifique et ancré dans les faits: cite des éléments concrets du CV (titres, entreprises, dates, 1–2 métriques déjà présentes, outils/stack) et relie-les explicitement aux exigences de la JD (3–5 mots-clés couverts et 2–3 manquants). IMPORTANT: Le nom de l'entreprise à laquelle on postule (mentionné dans jd_text) n'est PAS un mot-clé technique; ne le compte pas dans matchedKeywords. Explique le "pourquoi", pas seulement le "quoi".\n- Structure en 3–5 paragraphes courts (ex.: Adéquation au poste, Forces alignées, Écarts et recommandations ciblées, Ajustements proposés sur les expériences/bullets, Synthèse).\n- Intègre 1–2 exemples réels de réécriture de bullet (avant → après + raison), cohérents avec report.decisions.bulletEdits.\n- Conseils généraux autorisés uniquement s'ils sont pertinents (ex.: retirer/fusionner une expérience trop courte ou hors-scope), et doivent être justifiés par le contenu du CV/JD; ne rien inventer.\n- RÈGLE SPÉCIALE STAGE/INTERNSHIP: Si un stage (internship) est la dernière expérience avant le premier emploi ET contient le mot "mémoire" (ou "thesis" en anglais) ET est dans le même domaine que la JD, TOUJOURS le préserver dans result.experience[] même s'il est ancien. Justifie cette décision dans report.decisions.keptExperiences.\n- Rédige DANS LA LANGUE D'ORIGINE DU CV (clean_cv.metadata.language). NE PAS traduire. Style professionnel, empathique, direct, sans phrases génériques ni remplissage, sans 1re personne du singulier.\n`;
      const systemPromptFull = `${systemPrompt}\n${ARB_GUIDELINES}\n${NARRATIVE_CLIENT_TONE}`;
      const supportsJsonResponseFormat = !useOR || String(arbModel).startsWith('openai/');
      const req2: any = {
        model: arbModel,
        messages: [
          {
            role: 'system',
            content: systemPromptFull
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.0,
      };
      if (supportsJsonResponseFormat) req2.response_format = { type: 'json_object' };
      completion = await openaiArbitrage.chat.completions.create(req2);
    } catch (error) {
      console.error('Erreur OpenRouter Arbitrage:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return NextResponse.json(
        { error: `Erreur lors de l'arbitrage OpenRouter: ${errorMessage}` },
        { status: 500 }
      );
    }

    // Extraire la réponse JSON
    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      return NextResponse.json(
        { error: 'Réponse vide de l\'API OpenRouter' },
        { status: 500 }
      );
    }

    console.log('=== ÉTAPE 3: Validation et parsing du JSON ===');

    // Parser le JSON
    let parsedTop: any;
    try {
      parsedTop = JSON.parse(responseContent);
      console.log('JSON parsé avec succès');
    } catch (error) {
      console.warn('JSON strict parse failed, trying salvage:', error);
      try {
        parsedTop = parseJsonStrictOrSalvage(responseContent);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        return NextResponse.json(
          { error: `Réponse JSON invalide: ${errorMessage}` },
          { status: 500 }
        );
      }
    }

    const aiResult = parsedTop?.result ?? parsedTop; // compat si ancien format
    const aiReport = parsedTop?.report ?? null;
    // Sanitize and validate with Zod (JSON-only: pas de cv_text)
    const sanitized = sanitizeResumeForSchema(aiResult, { cvText: '', jdText });
    if (sanitized && Array.isArray(sanitized.experience)) {
      sanitized.experience = sortExperienceAntiChrono(sanitized.experience);
    }
    const validationResult = ResumeJSON.safeParse(sanitized);
    if (!validationResult.success) {
      console.error('Erreur validation Zod:', validationResult.error);
      return NextResponse.json(
        { 
          error: 'JSON généré non conforme au schéma',
          issues: validationResult.error.issues
        },
        { status: 422 }
      );
    }

    console.log('=== SUCCÈS: JSON validé avec succès ===');
    console.log('Données finales:', {
      metadata: validationResult.data.metadata,
      experienceCount: validationResult.data.experience.length,
      hasSkills: !!validationResult.data.skills,
      hasProjects: !!validationResult.data.projects
    });

    // Coûts: arbitrage
    const arbUsage = (completion as any)?.usage;
    cost.steps.push({ name: 'arbitrage', model: arbModel, usage: arbUsage, price_override: arbPriceOverride });

    // Judge both phases if enabled
    // Enforce summary rewrite: if summary unchanged or empty, rewrite it aligned to JD using only facts from clean_cv
    const beforeCv = cleanCv;
    let afterCv: any = validationResult.data;
    const normText = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
    const jaccard = (a: string, b: string) => {
      const tok = (t: string) => new Set(t.split(/[^a-z0-9]+/gi).filter(Boolean));
      const A = tok(a);
      const B = tok(b);
      const sizeA = A.size;
      const sizeB = B.size;
      if (sizeA === 0 && sizeB === 0) return 1;
      let interCount = 0;
      A.forEach((x) => { if (B.has(x)) interCount++; });
      const unionCount = sizeA + sizeB - interCount;
      return interCount / Math.max(1, unionCount);
    };
    // (lang removed) no FR/EN targetLang forcing
    const needsRewrite = !afterCv.summary || jaccard(normText(afterCv.summary), normText(beforeCv?.summary)) >= 0.85;
    if (needsRewrite) {
      try {
        const origLabel = String(beforeCv?.metadata?.language || '').trim();
        const summarySys = `You rewrite a professional resume summary strictly from clean_cv facts to align with the given job description. Rules: 2–3 sentences, ≤ 400 characters. IMPORTANT: Output MUST be in "${origLabel}" language (exactly the same as clean_cv.metadata.language). DO NOT translate. Impersonal professional tone (no first‑person), no bullet list, no new facts or metrics, no company names not in clean_cv.`;
        const summaryUser = JSON.stringify({ clean_cv: beforeCv, jd_text: jdText });
        const makeReq = (sys: string) => ({
          model: arbModel,
          messages: [
            { role: 'system', content: sys },
            { role: 'user', content: summaryUser },
          ],
          temperature: 0.0,
          max_tokens: 220,
        });
        // Pass 1
        const comp1 = await openaiArbitrage.chat.completions.create(makeReq(summarySys));
        let candidate = (comp1.choices?.[0]?.message?.content || '').trim();
        cost.steps.push({ name: 'summary_rewrite', model: arbModel, usage: (comp1 as any)?.usage });
        // If still too similar, Pass 2 with stronger paraphrase instruction
        if (!candidate || jaccard(normText(candidate), normText(beforeCv?.summary)) >= 0.85) {
          const strongSys = summarySys + ' Paraphrase strongly. Do not reuse previous sentence structures. Integrate JD terminology only when an equivalent exists in clean_cv.';
          const comp2 = await openaiArbitrage.chat.completions.create(makeReq(strongSys));
          const cand2 = (comp2.choices?.[0]?.message?.content || '').trim();
          if (cand2) candidate = cand2;
          cost.steps.push({ name: 'summary_rewrite_retry', model: arbModel, usage: (comp2 as any)?.usage });
        }
        if (candidate) afterCv.summary = candidate;
        // Strict guard: if language changed, revert to original summary
        try {
          const origLang = String(beforeCv?.metadata?.language || '').toLowerCase();
          const detLang = detectLangLoose(afterCv.summary || '');
          if (origLang && detLang !== 'unknown' && detLang !== origLang) {
            afterCv.summary = beforeCv.summary || afterCv.summary;
            cost.steps.push({ name: 'summary_language_guard_revert', model: 'server', usage: { note: 'reverted to original summary due to language mismatch' } });
          }
        } catch {}
      } catch (e) {
        console.warn('Summary rewrite skipped due to error:', e);
      }
    }
    // Enforce original language on sections (guard against translation)
    try {
      const origLang = String(beforeCv?.metadata?.language || '').toLowerCase();
      enforceOriginalLanguageCV(afterCv, beforeCv, origLang);
    } catch {}
    {
      const origLang = String(beforeCv?.metadata?.language || '').toLowerCase();
      const detLang = detectLangLoose(afterCv.summary || '');
      if (origLang && detLang !== 'unknown' && detLang !== origLang) {
        afterCv.summary = beforeCv.summary || afterCv.summary;
      }
    }
    // Reclassify removed experiences as education when appropriate
    try {
      const normStr2 = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
      const sig2 = (e: any) => [normStr2(e?.company), normStr2(e?.startDate || e?.startDateRaw), normStr2(e?.endDate || e?.endDateRaw)].join('|');
      const beforeList2 = Array.isArray(beforeCv?.experience) ? beforeCv.experience : [];
      const afterList2 = Array.isArray(afterCv?.experience) ? afterCv.experience : [];
      const afterSigs2 = new Set(afterList2.map(sig2));
      const ensureEdu2 = () => { if (!Array.isArray(afterCv.education)) afterCv.education = []; };
      const eduKey2 = (x: any) => [normStr2(x?.school), normStr2(x?.dates)].join('|');
      const hasEdu2 = (rec: any) => (afterCv.education || []).some((x: any) => eduKey2(x) === eduKey2(rec));
      beforeList2.forEach((e: any) => {
        if (!e) return;
        if (afterSigs2.has(sig2(e))) return; // not removed
        if (!isLikelyEducationEntry(e)) return;
        const rec = mapExperienceToEducation(e);
        if (!rec?.school) return;
        ensureEdu2();
        if (!hasEdu2(rec)) afterCv.education.push(rec);
      });
    } catch {}
    // Preserve header exactly from clean CV (name, email, phone, links)
    try {
      if (beforeCv?.header) {
        afterCv.header = beforeCv.header;
      }
    } catch {}
    // Merge original education with AI additions (append-only, dedup, max 8) — full flow
    try {
      const base = Array.isArray(beforeCv?.education) ? beforeCv.education : [];
      const aiEdu = Array.isArray(afterCv?.education) ? afterCv.education : [];
      const normE = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
      const keyE = (e: any) => [normE(e?.school), normE(e?.dates || ((e?.startDate || '') + '–' + (e?.endDate || '')))].join('|');
      const seen = new Set(base.map(keyE));
      const merged: any[] = base.slice();
      aiEdu.forEach((e: any) => {
        if (!e || !e.school) return;
        const obj: any = { school: e.school };
        if (e.degree) obj.degree = e.degree;
        if (e.location) obj.location = e.location;
        if (e.dates) {
          obj.dates = e.dates;
        } else {
          const sd = e.startDate;
          const ed = e.endDate && e.endDate !== 'Present' ? e.endDate : undefined;
          const d = [sd, ed].filter(Boolean).join('–');
          if (d) obj.dates = d;
        }
        const k = keyE(obj);
        if (!seen.has(k)) { seen.add(k); merged.push(obj); }
      });
      afterCv.education = merged.slice(0, 8);
    } catch {}
    // Enforce metadata.language to original CV language
    try {
      afterCv.metadata = afterCv.metadata || {};
      afterCv.metadata.language = beforeCv?.metadata?.language || 'unknown';
    } catch {}
    try {
      const normA = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
      if (Array.isArray(afterCv?.education)) {
        const canonDateA = (s: any) => normA(String(s || '')
          .replace(/[\u2012\u2013\u2014\u2015\u2212]/g, '-')
          .replace(/\s*-\s*/g, '-')
          .replace(/-+/g, '-')
        );
        const keyE = (e: any) => [normA(e?.school), canonDateA(e?.dates || ((e?.startDate || '') + '-' + (e?.endDate || ''))) ].join('|');
        const map = new Map<string, any>();
        for (const e of afterCv.education) {
          if (!e || !e.school) continue;
          const obj: any = { school: e.school };
          if (e.degree) obj.degree = e.degree;
          if (e.location) obj.location = e.location;
          if (e.dates) obj.dates = e.dates; else {
            const sd = e.startDate; const ed = e.endDate && e.endDate !== 'Present' ? e.endDate : undefined;
            const d = [sd, ed].filter(Boolean).join('-'); if (d) obj.dates = d;
          }
          const k = keyE(obj);
          if (!map.has(k)) map.set(k, obj);
        }
        afterCv.education = Array.from(map.values()).slice(0, 8);
      }
      if (Array.isArray(afterCv?.experience)) {
        const keyX = (e: any) => [normA(e?.company), normA(e?.title), normA(e?.startDate || e?.startDateRaw), normA(e?.endDate || e?.endDateRaw)].join('|');
        const seen = new Set<string>();
        const list: any[] = [];
        for (const e of afterCv.experience) {
          if (!e || !e.company || !e.title) continue;
          const k = keyX(e);
          if (seen.has(k)) continue;
          seen.add(k);
          const origBul = Array.isArray(e?.bullets) ? e.bullets : [];
          const seenB = new Set<string>();
          const nb: string[] = [];
          for (const b of origBul) {
            const s = String(b || '').trim();
            if (!s) continue;
            const kb = normA(s);
            if (seenB.has(kb)) continue;
            seenB.add(kb);
            nb.push(s);
            if (nb.length >= 5) break;
          }
          list.push({ ...e, bullets: nb.length ? nb : undefined });
        }
        afterCv.experience = list.slice(0, 6);
      }
      if (Array.isArray(afterCv?.projects)) {
        const keyP = (p: any) => [normA(p?.name), normA(p?.dates)].join('|');
        const map = new Map<string, any>();
        for (const p of afterCv.projects) {
          if (!p || !p.name) continue;
          const k = keyP(p);
          if (map.has(k)) continue;
          const origBul = Array.isArray(p?.bullets) ? p.bullets : [];
          const seenB = new Set<string>();
          const nb: string[] = [];
          for (const b of origBul) {
            const s = String(b || '').trim();
            if (!s) continue;
            const kb = normA(s);
            if (seenB.has(kb)) continue;
            seenB.add(kb);
            nb.push(s);
            if (nb.length >= 4) break;
          }
          const obj: any = { name: p.name };
          if (p.dates) obj.dates = p.dates;
          if (nb.length) obj.bullets = nb;
          map.set(k, obj);
        }
        afterCv.projects = Array.from(map.values());
      }
      if (afterCv?.skills) {
        const dedupArr = (arr?: string[]) => Array.isArray(arr) ? Array.from(new Map(arr.map(s => [normA(s), s])).values()) : undefined;
        afterCv.skills.languages = dedupArr(afterCv.skills.languages);
        afterCv.skills.frameworks = dedupArr(afterCv.skills.frameworks);
        afterCv.skills.tools = dedupArr(afterCv.skills.tools);
        if ('other' in afterCv.skills) afterCv.skills.other = dedupArr((afterCv as any).skills.other);
      }
      if (Array.isArray(afterCv?.languages)) {
        afterCv.languages = Array.from(new Map(afterCv.languages.map((s: any) => [normA(s), s])).values());
      }
      if (Array.isArray(afterCv?.certifications)) {
        afterCv.certifications = Array.from(new Map(afterCv.certifications.map((s: any) => [normA(s), s])).values());
      }
      if (Array.isArray((afterCv as any)?.otherSections)) {
        const secArr: any[] = [];
        const seenT = new Set<string>();
        for (const sec of afterCv.otherSections) {
          if (!sec || !sec.title || !Array.isArray(sec.items)) continue;
          const tK = normA(sec.title);
          if (seenT.has(tK)) continue;
          seenT.add(tK);
          const items = Array.from(new Map(sec.items.map((s: any) => [normA(s), s])).values());
          secArr.push({ title: sec.title, items });
        }
        afterCv.otherSections = secArr;
      }
    } catch {}
    // Bullets XYZ rewrite per experience (full flow)
    try {
      const origLang = String(beforeCv?.metadata?.language || '').trim();
      const getKeywords = (s: string) => {
        const toks = String(s || '').toLowerCase().split(/[^a-z0-9+.#]/gi).filter(w => w.length >= 3);
        const freq = new Map<string, number>();
        toks.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));
        return Array.from(freq.entries()).sort((a,b)=>b[1]-a[1]).map(([w])=>w).slice(0, 20);
      };
      const jdKw = getKeywords(jdText || '');
      const numsRegex = /\b\d[\d.,]*%?\b/g;
      const words22 = (s: string) => {
        const parts = String(s || '').trim().split(/\s+/);
        return parts.length > 22 ? parts.slice(0, 22).join(' ') : String(s || '').trim();
      };
      const verbsUnion = filterForATS(getVerbs(ACTION_VERB_CATEGORIES));
      const verbsSet = new Set(verbsUnion.map(v => v.toLowerCase()));
      const SEED = `ACTION VERB STARTER SEED (English forms for guidance only; do NOT translate the rest): ${verbsUnion.slice(0, 60).join(', ')}`;
      const defaultVerbByLang: Record<string, string> = { en: 'Implemented', fr: 'Réalisé' };
      const ensureActionVerbStart = (text: string) => {
        const before = String(text || '').trim();
        if (!before) return { changed: false, value: before };
        const lang = (origLang || '').toLowerCase();
        const s = before.replace(/^[-•*—–]\s*/, '');
        const first = s.split(/\s+/)[0] || '';
        if (lang === 'en') {
          if (verbsSet.has(first.toLowerCase())) return { changed: before !== s, value: s };
          return { changed: true, value: `${defaultVerbByLang.en} ${s}`.replace(/\s{2,}/g, ' ').trim() };
        }
        if (lang === 'fr') {
          if (/^[A-ZÀ-ÖØ-Þ]/.test(first)) return { changed: before !== s, value: s };
          return { changed: true, value: `${defaultVerbByLang.fr} ${s}`.replace(/\s{2,}/g, ' ').trim() };
        }
        // Other languages: do NOT prefix (avoid cross-language injection); only trim leading bullet symbol.
        return { changed: before !== s, value: s };
      };
      const LLM_SYSTEM = [
        'You rewrite resume bullets using the XYZ formula: "Accomplished [X] as measured by [Y] by doing [Z]."',
        '- Start with a strong ACTION VERB; include 1 clear METRIC if it already exists; then HOW it was done.',
        '- Keep each bullet concise (≤ 22 words), past tense unless current role.',
        '- No fluff, no buzzwords, no invented facts.',
        '',
        'IMPORTANT — METRICS & INTEGRITY',
        '- NEVER invent numbers. Use a metric ONLY if it already exists in the input bullet.',
        '- If no metric exists, keep the bullet QUALITATIVE (no numbers).',
        '- You may SUGGEST possible metrics, but ONLY inside REPORT.recommendations (not in the rewritten bullets).',
        '',
        'TASK',
        'For each input bullet, output one rewritten bullet that follows XYZ. If there’s no metric, keep impact qualitative and factual (no numbers). Optionally add metric SUGGESTIONS in REPORT.recommendations.',
        '',
        'RULES',
        '1) Structure = ACTION VERB → X (what) → Y (metric/impact/baseline, if present) → Z (how).',
        '2) Exactly ONE metric Y, and ONLY if present in the original bullet (%, $, time, volume).',
        '3) Domain wording consistent; optionally align to context.jd_keywords when semantically equivalent to the original bullet.',
        '4) Avoid vague openers (“Responsible for…”, “Worked on…”). Use specific verbs.',
        '5) Do NOT add new achievements, tools, companies, or numbers.',
        '6) Remove filler (“successfully”, “various”, “numerous”). No first-person.',
        '',
        'BULLET VOLUME CONTROL (PRUNE & SHORTEN)',
        '- If an experience has MANY bullets, you MAY remove low-signal bullets—especially when that experience is minor or not relevant to jd_keywords.',
        '- Target count (guideline, not strict): major experiences 3–5 bullets; minor/less relevant 1–3 bullets.',
        '- Prefer to KEEP bullets that show measurable outcomes, leadership/ownership, or JD-aligned skills. Remove repetitive, overlapping, or purely duty-based bullets.',
        '- If a bullet is long or verbose, you MAY shorten it while preserving meaning and facts (keep ≤ 22 words, keep original claims, no new metrics).',
        '- All removals/shortenings MUST be logged in REPORT (see OUTPUT FORMAT).',
        '',
        'ALGORITHM (follow exactly)',
        'A) Parse each bullet: verb, what/result, any EXISTING metric, the “how”.',
        'B) If no metric exists, keep qualitative impact; DO NOT fabricate numbers.',
        'C) Draft: VERB + X + (optional Y if present) + Z. Ensure ≤ 22 words.',
        'D) Prune pass (per experience): rank bullets by JD relevance + impact; mark low-signal items for removal.',
        'E) Shorten pass: compress verbose bullets (remove filler, merge duplicates, keep one metric).',
        'F) Validate: each kept bullet has verb, what, how; metric only if present.',
        '',
        `Output MUST be in the same language as clean_cv.metadata.language: "${origLang}". DO NOT translate.`,
        SEED,
      ].join('\n');
      const perExpLogs: any[] = [];
      (afterCv?.experience || []).forEach((exp: any, idx: number) => { perExpLogs[idx] = null; });
      for (let i = 0; i < (afterCv?.experience || []).length; i++) {
        const exp = afterCv.experience[i];
        const originalBullets: string[] = Array.isArray(exp?.bullets) ? exp.bullets : [];
        if (!originalBullets.length) continue;
        const userPayload = JSON.stringify({ bullets: originalBullets, context: { jd_keywords: jdKw } });
        const req: any = {
          model: arbModel,
          messages: [ { role: 'system', content: LLM_SYSTEM }, { role: 'user', content: userPayload } ],
          temperature: 0.0,
        };
        let out: any = null;
        try {
          const resp = await openaiArbitrage.chat.completions.create(req);
          cost.steps.push({ name: 'bullets_rewrite', model: arbModel, usage: (resp as any)?.usage });
          const txt = (resp.choices?.[0]?.message?.content || '').trim();
          try { out = JSON.parse(txt); } catch { try { out = parseJsonStrictOrSalvage(txt); } catch {} }
        } catch {}
        if (!out || !Array.isArray(out?.bullets_xyz)) continue;
        const allowNums = new Set((originalBullets.join(' ') .match(numsRegex) || []).map(s => s));
        const cleaned: string[] = [];
        for (const b of out.bullets_xyz) {
          if (!b) continue;
          let s = String(b).trim();
          const det = detectLangLoose(s);
          if (det !== 'unknown' && det !== origLang.toLowerCase()) {
            continue;
          }
          const nums = s.match(numsRegex) || [];
          for (const n of nums) { if (!allowNums.has(n)) { s = s.replace(n, '').replace(/\s{2,}/g, ' ').trim(); } }
          s = words22(s);
          if (s) cleaned.push(s);
          if (cleaned.length >= 5) break;
        }
        if (!cleaned.length) cleaned.push(originalBullets[0]);
        const seenB = new Set<string>();
        let deduped = cleaned.filter(x => { const k = x.toLowerCase(); if (seenB.has(k)) return false; seenB.add(k); return true; });
        const harmonized: any[] = [];
        deduped = deduped.map((s, idxB) => {
          const r = ensureActionVerbStart(s);
          if (r.changed && r.value !== s) harmonized.push({ index: idxB, before: s, after: r.value, reason: 'prefixed action verb for harmonization' });
          return r.value;
        });
        exp.bullets = deduped.length ? deduped : originalBullets;
        perExpLogs[i] = { experienceIndex: i, recommendations: out?.REPORT?.recommendations || [], pruned: out?.REPORT?.pruned || {}, shortened: out?.REPORT?.shortened || [], harmonized };
      }
      // Projects rewrite (full flow)
      const perProjLogs: any[] = [];
      (afterCv?.projects || []).forEach((_: any, idx: number) => { perProjLogs[idx] = null; });
      for (let i = 0; i < (afterCv?.projects || []).length; i++) {
        const proj = afterCv.projects[i];
        const originalBullets: string[] = Array.isArray(proj?.bullets) ? proj.bullets : [];
        if (!originalBullets.length) continue;
        const userPayload = JSON.stringify({ bullets: originalBullets, context: { jd_keywords: jdKw } });
        const req: any = {
          model: arbModel,
          messages: [ { role: 'system', content: LLM_SYSTEM }, { role: 'user', content: userPayload } ],
          temperature: 0.0,
        };
        let out: any = null;
        try {
          const resp = await openaiArbitrage.chat.completions.create(req);
          cost.steps.push({ name: 'bullets_rewrite_projects', model: arbModel, usage: (resp as any)?.usage });
          const txt = (resp.choices?.[0]?.message?.content || '').trim();
          try { out = JSON.parse(txt); } catch { try { out = parseJsonStrictOrSalvage(txt); } catch {} }
        } catch {}
        if (!out || !Array.isArray(out?.bullets_xyz)) continue;
        const allowNums = new Set((originalBullets.join(' ') .match(numsRegex) || []).map(s => s));
        const cleaned: string[] = [];
        for (const b of out.bullets_xyz) {
          if (!b) continue;
          let s = String(b).trim();
          const det = detectLangLoose(s);
          if (det !== 'unknown' && det !== origLang.toLowerCase()) { continue; }
          const nums = s.match(numsRegex) || [];
          for (const n of nums) { if (!allowNums.has(n)) { s = s.replace(n, '').replace(/\s{2,}/g, ' ').trim(); } }
          s = words22(s);
          if (s) cleaned.push(s);
          if (cleaned.length >= 4) break;
        }
        if (!cleaned.length) cleaned.push(originalBullets[0]);
        const seenB = new Set<string>();
        let deduped = cleaned.filter(x => { const k = x.toLowerCase(); if (seenB.has(k)) return false; seenB.add(k); return true; });
        const harmonized: any[] = [];
        deduped = deduped.map((s, idxB) => {
          const r = ensureActionVerbStart(s);
          if (r.changed && r.value !== s) harmonized.push({ index: idxB, before: s, after: r.value, reason: 'prefixed action verb for harmonization' });
          return r.value;
        });
        proj.bullets = deduped.length ? deduped : originalBullets;
        perProjLogs[i] = { projectIndex: i, recommendations: out?.REPORT?.recommendations || [], pruned: out?.REPORT?.pruned || {}, shortened: out?.REPORT?.shortened || [], harmonized };
      }
      const __brFull: any = { perExperience: perExpLogs.filter(Boolean) };
      const pjFull = perProjLogs.filter(Boolean);
      if (pjFull.length) __brFull.perProjects = pjFull;
      (afterCv as any).__bulletRewrite = __brFull;
    } catch {}
    // Build a server-side diff to enforce consistency between result and report
    const diff = computeResumeDiff(beforeCv, afterCv);
    const label = (e: any) => {
      if (!e) return '—';
      const c = String(e?.company || '—').trim();
      const t = String(e?.title || '—').trim();
      return [c, t].filter(Boolean).join(' — ');
    };
    const keptLabels = (diff.decisions.keptExperiences || []).map((i: number) => label(beforeCv?.experience?.[i]));
    const removedLabels = (diff.decisions.removedExperiences || []).map((i: number) => label(beforeCv?.experience?.[i]));
    const origLangLabel = String(beforeCv?.metadata?.language || '').toLowerCase();
    const narrativeFromDiff = buildNarrativeFromDiff(diff as any, origLangLabel);
    const norm = (s: any) => String(s || '').replace(/[\s\u00A0]+/g, ' ').trim().toLowerCase();
    // Compute keywordsUsed: intersection JD ∩ summary (lowercased tokens)
    const tokenSet = (s: string) => new Set(String(s || '').toLowerCase().split(/[^a-z0-9+.#]/gi).filter(Boolean));
    const Ssum = tokenSet(String(afterCv?.summary || ''));
    const Sjd = tokenSet(String(jdText || ''));
    const keywordsUsedArr: string[] = [];
    Ssum.forEach((w) => { if (Sjd.has(w) && w.length >= 3) keywordsUsedArr.push(w); });
    const summaryEdit = {
      before: String(beforeCv?.summary || ''),
      after: String(afterCv?.summary || ''),
      changed: norm(beforeCv?.summary) !== norm(afterCv?.summary),
      keywordsUsed: keywordsUsedArr.slice(0, 12),
    };
    const finalReport = {
      ...(aiReport || {}),
      languageUsed: (beforeCv?.metadata?.language || 'same-as-clean_cv'),
      decisions: {
        keptExperiences: keptLabels,
        removedExperiences: removedLabels,
        bulletEdits: (diff.decisions.bulletEdits || []).map((b: any) => ({
          sourceIndex: b.sourceIndex,
          before: b.before,
          after: b.after,
        })),
      },
      narrative: [narrativeFromDiff, (aiReport as any)?.narrative].filter(Boolean).join('\n\n'),
      summaryEdit,
      ...( (afterCv as any).__bulletRewrite ? { bulletRewrite: (afterCv as any).__bulletRewrite } : {} ),
      diff,
    };
    const payload: any = { result: afterCv, clean_cv: beforeCv, report: finalReport };
    try {
      const [j1, j2] = await Promise.all([
        judgePdfToJson(cvText, cleanCv),
        judgeArbitrage('', cleanCv, jdText, validationResult.data, aiReport),
      ]);
      if (j1) {
        payload.judge = { ...(payload.judge || {}), pdfToJson: j1.evaluation };
        cost.steps.push({ name: 'judge_pdf', model: j1.model, usage: j1.usage });
      }
      if (j2) {
        payload.judge = { ...(payload.judge || {}), arbitrage: j2.evaluation };
        cost.steps.push({ name: 'judge_arbitrage', model: j2.model, usage: j2.usage });
      }
    } catch (e) {
      payload.judge_error = (e instanceof Error ? e.message : String(e));
    }

    computeCostTotals(cost);
    computeCostUSD(cost);
    payload.cost = cost;

    // Retourner le JSON; inclure cv brut/clean si demandé
    if (returnRaw) {
      payload.raw_cv = { text: cvText, method: methodUsed, imagesCount };
    }
    return NextResponse.json(payload, { status: 200 });

  } catch (error) {
    console.error('Erreur générale:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Erreur interne: ${errorMessage}` },
      { status: 500 }
    );
  }
}
