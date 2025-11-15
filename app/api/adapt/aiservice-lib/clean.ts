import { normalizeText } from './parse';

export type CleanLink = {
  linkedin?: string;
  github?: string;
  portfolio?: string;
};

export type CleanHeader = {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  links?: CleanLink;
};

export type CleanExperience = {
  company?: string;
  title?: string;
  location?: string;
  startDateRaw?: string;
  endDateRaw?: string;
  datesRaw?: string;
  bullets?: string[];
  raw?: string; // fallback full block
};

export type CleanEducation = {
  school?: string;
  degree?: string;
  location?: string;
  dates?: string;
  raw?: string;
};

export type CleanSkills = {
  languages?: string[];
  frameworks?: string[];
  tools?: string[];
  other?: string[];
};

export type CleanResume = {
  metadata: {
    language: string;
    sourceOrderPreserved: boolean;
    warnings?: string[];
  };
  header: CleanHeader;
  summary?: string;
  experience?: CleanExperience[];
  education?: CleanEducation[];
  projects?: { name?: string; bullets?: string[]; raw?: string }[];
  skills?: CleanSkills;
  languages?: string[];
  certifications?: string[];
};

const HEADINGS = {
  fr: [
    'profil', 'résumé', 'resume', 'summary', 'experience', 'expérience', 'expériences', 'expérience professionnelle', 'expériences professionnelles',
    'formation', 'formations', 'éducation', 'education', 'compétences', 'skills', 'langues', 'languages', 'certifications', 'projets', 'projects',
    "centres d'intérêt", 'interests'
  ],
};

// Multi-language detection (scripts + simple stopwords)
function detectLangFromText(text: string): string {
  const t = (text || '').toLowerCase();
  if (!t.trim()) return 'unknown';
  // Scripts
  if (/\p{Script=Arabic}/u.test(text)) return 'ar';
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
  if (/[\u3040-\u30FF]/.test(text)) return 'ja';
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
  // Latin-based stopwords
  const langs: Record<string, string[]> = {
    fr: [' le ', ' la ', ' les ', ' de ', ' des ', ' et ', ' à ', ' ou ', ' expérience ', 'compétence', 'profil'],
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

function extractEmail(text: string): string | undefined {
  const m = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return m ? m[0] : undefined;
}

function extractPhone(text: string): string | undefined {
  const m = text.match(/(\+\d{1,3}[\s.-]?)?(0|\+?\d{1,3})?[\s.-]?(\d[\s.-]?){8,12}/);
  return m ? m[0] : undefined;
}

function extractLinks(text: string): CleanLink {
  const links: CleanLink = {};
  const linkedin = text.match(/https?:\/\/([\w.-]*linkedin\.com\/[\w\-_/]+)/i);
  const github = text.match(/https?:\/\/([\w.-]*github\.com\/[\w\-_/]+)/i);
  const portfolio = text.match(/https?:\/\/[\w.-]+\.[a-z]{2,}(?:\/[\w\-_/]*)?/i);
  if (linkedin) links.linkedin = linkedin[0];
  if (github) links.github = github[0];
  // Avoid overwriting with LinkedIn/GitHub
  if (portfolio && !links.linkedin && !links.github) links.portfolio = portfolio[0];
  return links;
}

function probableFullName(firstLines: string[]): string | undefined {
  // Take first 1-3 lines, pick the longest line with 2-5 capitalized words
  const candidates = firstLines.slice(0, 3);
  for (const line of candidates) {
    const words = line.trim().split(/\s+/);
    const capWords = words.filter(w => /^[A-ZÀÂÄÇÉÈÊËÏÎÔÖÙÛÜŸ][\p{L}'-]+$/u.test(w));
    if (capWords.length >= 2 && capWords.length <= 5) {
      return capWords.join(' ');
    }
  }
  return undefined;
}

function splitSections(text: string): Record<string, string> {
  const lines = text.split('\n');
  const indices: { key: string; idx: number }[] = [];
  const allHeadings = Array.from(new Set(HEADINGS.fr));
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim().toLowerCase();
    if (!l) continue;
    for (const h of allHeadings) {
      if (l === h || l.startsWith(h + ' ')) {
        indices.push({ key: h, idx: i });
        break;
      }
    }
  }
  indices.sort((a, b) => a.idx - b.idx);
  const result: Record<string, string> = {};
  if (indices.length === 0) {
    result['__root__'] = text;
    return result;
  }
  // Header block
  const headerStart = 0;
  const headerEnd = indices[0].idx;
  result['__header__'] = lines.slice(headerStart, headerEnd).join('\n');
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].idx + 1;
    const end = i + 1 < indices.length ? indices[i + 1].idx : lines.length;
    result[indices[i].key] = lines.slice(start, end).join('\n').trim();
  }
  return result;
}

function extractBullets(block: string): string[] {
  const lines = block.split('\n');
  const bullets: string[] = [];
  for (const l of lines) {
    const s = l.trim().replace(/^[-•·‣⁃]\s*/, '');
    if (!s) continue;
    if (/^[-•·‣⁃]/.test(l.trim()) || s.length > 12) {
      bullets.push(s);
    }
  }
  // Deduplicate
  return Array.from(new Set(bullets));
}

function parseExperienceSection(block: string): CleanExperience[] {
  const items: CleanExperience[] = [];
  if (!block.trim()) return items;
  // Split by double newlines as rough blocks
  const parts = block.split(/\n\s*\n+/);
  for (const p of parts) {
    const lines = p.split('\n').map(s => s.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const head = lines[0];
    // dates
    const dateRegex = /(\d{2}\/\d{4}|\d{4}-\d{2}|\d{4})\s*(?:–|-|to|au|\/)\s*(Present|Présent|\d{2}\/\d{4}|\d{4}-\d{2}|\d{4})/i;
    const m = p.match(dateRegex);
    let startDateRaw: string | undefined;
    let endDateRaw: string | undefined;
    if (m) {
      startDateRaw = m[1];
      endDateRaw = m[2];
    }
    // company + title heuristics
    let company: string | undefined;
    let title: string | undefined;
    const pipeSplit = head.split('|').map(s => s.trim());
    if (pipeSplit.length >= 2) {
      title = pipeSplit[0];
      company = pipeSplit[1];
    } else {
      // Try uppercase token as company
      const up = head.match(/[A-ZÀÂÄÇÉÈÊËÏÎÔÖÙÛÜŸ][A-ZÀÂÄÇÉÈÊËÏÎÔÖÙÛÜŸ\- '&]+/g);
      if (up && up[0].length >= 3) company = up[0].trim();
      title = head;
    }
    // location
    let location: string | undefined;
    const locMatch = p.match(/\b(Paris|France|Maroc|Morocco|Rabat|Courbevoie|Bois\-Colombes|Strasbourg)\b/i);
    if (locMatch) location = locMatch[0];

    const bullets = extractBullets(p);
    if (bullets.length === 0) bullets.push(head);

    items.push({ company, title, location, startDateRaw, endDateRaw, datesRaw: m?.[0], bullets, raw: p });
  }
  return items;
}

function parseEducationSection(block: string): CleanEducation[] {
  const items: CleanEducation[] = [];
  if (!block.trim()) return items;
  const parts = block.split(/\n\s*\n+/);
  for (const p of parts) {
    const schoolMatch = p.match(/(Université|University|École|Ecole|Lycée|School)\s[^\n,|]*/i);
    const school = schoolMatch?.[0]?.trim();
    const degreeMatch = p.match(/(Actuaire|Master|Licence|Bachelor|DUAS|CPGE|MP|Engineer|Dipl[oô]me)\s[^\n,|]*/i);
    const degree = degreeMatch?.[0]?.trim();
    const dates = (p.match(/\b(\d{4})(?:\s*[–-]\s*(\d{4}))?\b/) || [])[0];
    const loc = (p.match(/\b(Paris|France|Maroc|Rabat|Courbevoie|Bois\-Colombes|Strasbourg)\b/i) || [])[0];
    items.push({ school, degree, dates, location: loc, raw: p });
  }
  return items;
}

function parseSkills(block: string): CleanSkills {
  const lines = block.split('\n').map(s => s.trim()).filter(Boolean);
  const res: CleanSkills = {};
  const pushAll = (arr?: string[]) => (arr && arr.length ? arr : undefined);
  const flat: string[] = [];
  for (const l of lines) {
    const parts = l.split(/[:|\-]/).map(s => s.trim());
    const items = parts[parts.length - 1].split(/[;,•]/).map(s => s.trim()).filter(Boolean);
    flat.push(...items);
  }
  // naive categorization
  const languages: string[] = [];
  const frameworks: string[] = [];
  const tools: string[] = [];
  for (const it of flat) {
    if (/^(python|r|sas|sql|excel|vba|typescript|javascript|java|c\+\+|c#)$/i.test(it)) languages.push(it);
    else if (/^(react|node\.js|pytorch|tensorflow|scikit\-learn|xgboost|lightgbm|prophet)$/i.test(it)) frameworks.push(it);
    else tools.push(it);
  }
  res.languages = pushAll(languages);
  res.frameworks = pushAll(frameworks);
  res.tools = pushAll(tools);
  if (!res.languages && !res.frameworks && !res.tools) res.other = pushAll(flat);
  return res;
}

function parseLanguages(block: string): string[] {
  const lines = block.split('\n').map(s => s.trim()).filter(Boolean);
  const out: string[] = [];
  for (const l of lines) {
    const parts = l.split(/[;•,]/).map(s => s.trim());
    out.push(...parts);
  }
  return Array.from(new Set(out)).filter(Boolean);
}

function parseCertifications(block: string): string[] {
  return extractBullets(block);
}

export function toCleanResume(rawText: string): CleanResume {
  const t0 = normalizeText(rawText);
  // Remove pagination like "1 / 2"
  const t = t0.replace(/\n\s*\d+\s*\/\s*\d+\s*\n/g, '\n');
  const language = detectLangFromText(t);
  const sections = splitSections(t);

  const headerBlock = sections['__header__'] || '';
  const firstLines = headerBlock.split('\n').map(s => s.trim()).filter(Boolean);
  const header: CleanHeader = {
    fullName: probableFullName(firstLines),
    email: extractEmail(t),
    phone: extractPhone(t),
    links: extractLinks(t),
    location: undefined,
  };

  // Summary candidates
  let summary: string | undefined;
  for (const k of Object.keys(sections)) {
    if (k.includes('profil') || k.includes('résumé') || k.includes('resume') || k.includes('summary')) {
      const s = sections[k];
      if (s && s.length > 20) { summary = s.trim(); break; }
    }
  }

  const expKey = Object.keys(sections).find(k => k.includes('exp'));
  const experience = expKey ? parseExperienceSection(sections[expKey]) : undefined;

  const eduKey = Object.keys(sections).find(k => k.includes('formation') || k.includes('éducation') || k.includes('education'));
  const education = eduKey ? parseEducationSection(sections[eduKey]) : undefined;

  const skillsKey = Object.keys(sections).find(k => k.includes('compétences') || k.includes('skills'));
  const skills = skillsKey ? parseSkills(sections[skillsKey]) : undefined;

  const languagesKey = Object.keys(sections).find(k => k.includes('langues') || k.includes('languages'));
  const languages = languagesKey ? parseLanguages(sections[languagesKey]) : undefined;

  const certKey = Object.keys(sections).find(k => k.includes('certifications'));
  const certifications = certKey ? parseCertifications(sections[certKey]) : undefined;

  const warnings: string[] = [];
  if (!header.fullName) warnings.push('Nom complet non détecté avec certitude.');
  if (!experience || experience.length === 0) warnings.push('Aucune expérience détectée.');

  return {
    metadata: { language, sourceOrderPreserved: true, warnings: warnings.length ? warnings : undefined },
    header,
    summary,
    experience,
    education,
    skills,
    languages,
    certifications,
  };
}
