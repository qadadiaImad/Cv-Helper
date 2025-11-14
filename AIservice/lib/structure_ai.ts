import { normalizeText } from '@/AIservice/lib/parse';
import { getConfiguredModel } from '@/AIservice/config/models';

/**
 * Structure raw CV text into a clean JSON using OpenAI (third key: OPENAI_API_KEY_PDF_TO_JSON)
 * No invention, preserve original order of experiences.
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
  const model = getConfiguredModel('pdf') || 'gpt-4o-mini';
  const cleaned = normalizeText(cvText);
  const todayISO = new Date().toISOString().split('T')[0];

  const system = [
    'Tu es un parseur de CV. Ta sortie est un JSON "CV structuré (propre)" sans invention,',
    'construit EXCLUSIVEMENT à partir du texte fourni. Préserve l\'ordre des expériences.',
    'N\'ajoute aucune information absente. Utilise la langue d\'entrée.',
    `Contexte temporel: la date d'aujourd'hui est ${todayISO}. Si le texte indique un poste en cours, utilise endDate:"Present".`,
    `Ne marque PAS comme "futur" une date antérieure à ${todayISO}. N'invente pas de dates ou de périodes.`,
  ].join(' ');

  const schemaInstruction = [
    'Schéma attendu (clés facultatives quand non trouvées). EXHAUSTIVITÉ OBLIGATOIRE: ne rien omettre; si une section ne correspond pas au schéma, la placer dans otherSections.',
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
    '  "languages"?: string[],  // langues parlées (humaines) ex: Français, Anglais, Arabe',
    '  "interests"?: string[],  // ex: Musique, Football, Théâtre',
    '  "certifications"?: string[],',
    '  "otherSections"?: Array<{ title: string; items: string[] }>',
    '}',
    '',
    '- Ne JAMAIS inventer de données. Laisse les champs manquants absents.',
    '- Respecte scrupuleusement l\'ordre des expériences tel qu\'il apparaît.',
    '- Ajoute dans metadata.warnings les incertitudes/données ambiguës.',
    '- N\'OMETS AUCUNE SECTION DU CV: si une rubrique ne correspond pas exactement (ex: Centres d\'intérêt, Bénévolat, Publications, Références), utilise "interests" (pour centres d\'intérêt) ou "otherSections" avec {title, items}.',
    '- Les langues parlées (humaines) doivent aller dans "languages" (racine). Les langages de programmation vont dans skills.languages.',
  ].join('\n');

  const user = [
    'Texte brut du CV à structurer en JSON propre (ne renvoie que l\'objet JSON) :',
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
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error('Empty AI response for structuring');
  // Robust JSON salvage
  const preClean = (t: string) => t
    .replace(/\uFEFF/g, '')
    .replace(/\u200B/g, '')
    .replace(/```json/gi, '```')
    .replace(/```/g, '')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[\r\n])\s*\/\/.*(?=\r?\n|$)/g, '$1')
    .replace(/,\s*([}\]])/g, '$1');

  const extractBalanced = (t: string): string | null => {
    const txt = preClean(t);
    const firstObj = txt.indexOf('{');
    const firstArr = txt.indexOf('[');
    let start = -1; let open = ''; let close = '';
    if (firstObj >= 0 && (firstArr < 0 || firstObj < firstArr)) { start = firstObj; open = '{'; close = '}'; }
    else if (firstArr >= 0) { start = firstArr; open = '['; close = ']'; }
    else return null;
    let depth = 0; let inStr = false; let esc = false;
    for (let i = start; i < txt.length; i++) {
      const ch = txt[i];
      if (inStr) {
        if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') { inStr = true; continue; }
      if (ch === open) depth++;
      else if (ch === close) {
        depth--;
        if (depth === 0) return txt.slice(start, i + 1);
      }
    }
    return null;
  };

  const tryParse = (t: string): any => {
    const a = preClean(t);
    try { return JSON.parse(a); } catch {}
    const b = extractBalanced(a);
    if (b) {
      const bb = preClean(b);
      try { return JSON.parse(bb); } catch {}
    }
    const first = Math.min(...[a.indexOf('{'), a.indexOf('[')].filter(n => n >= 0));
    const last = Math.max(a.lastIndexOf('}'), a.lastIndexOf(']'));
    if (first >= 0 && last > first) {
      const slice = preClean(a.slice(first, last + 1));
      try { return JSON.parse(slice); } catch {}
    }
    throw new Error('Invalid JSON from structuring AI');
  };

  let parsed: any = tryParse(content);
  // minimal sanity
  if (!parsed || typeof parsed !== 'object' || !parsed.metadata) {
    throw new Error('Structuring output incomplete');
  }
  return { structured: parsed, usage: (completion as any)?.usage, model };
}
