import { normalizeText } from '@/AIservice/lib/parse';

function detectLangFromText(text: string): string {
  const t = (text || '').toLowerCase();
  if (!t.trim()) return 'unknown';
  // Script-based quick checks
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';       // Arabic
  if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';       // CJK Unified Ideographs
  if (/[\u3040-\u30FF]/.test(text)) return 'ja';       // Hiragana/Katakana
  if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';       // Hangul
  // Latin-based heuristics via stopwords
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

function normalizeLang(val: any, text: string): string {
  const v = String(val || '').toLowerCase();
  // Preserve explicit labels/codes if present
  const directMap: Record<string, string> = {
    fr: 'fr', français: 'fr', french: 'fr',
    en: 'en', anglais: 'en', english: 'en',
    es: 'es', espagnol: 'es', spanish: 'es',
    it: 'it', italien: 'it', italian: 'it',
    de: 'de', allemand: 'de', german: 'de',
    pt: 'pt', portugais: 'pt', portuguese: 'pt', português: 'pt',
    nl: 'nl', néerlandais: 'nl', dutch: 'nl',
    tr: 'tr', turc: 'tr', turkish: 'tr',
    ar: 'ar', arabe: 'ar', arabic: 'ar',
    zh: 'zh', chinois: 'zh', chinese: 'zh',
    ja: 'ja', japonais: 'ja', japanese: 'ja',
    ko: 'ko', coréen: 'ko', korean: 'ko',
  };
  if (directMap[v]) return directMap[v];
  // Fallback: detect from provided text (use CV text)
  return detectLangFromText(text);
}

function pad2(n: number): string { return n < 10 ? `0${n}` : `${n}`; }

function normDate(input: any): string | undefined {
  if (!input) return undefined;
  const s = String(input).trim();
  if (!s) return undefined;
  const present = /^(present|présent|now)$/i;
  if (present.test(s)) return 'Present';
  // Try YYYY-MM
  let m = s.match(/^(\d{4})[-\/](\d{1,2})$/);
  if (m) {
    const y = Number(m[1]);
    const mm = pad2(Math.max(1, Math.min(12, Number(m[2]))));
    return `${y}-${mm}`;
  }
  // Try MM/YYYY or DD/MM/YYYY
  m = s.match(/^(\d{1,2})\/(\d{4})$/);
  if (m) {
    const y = Number(m[2]);
    const mm = pad2(Math.max(1, Math.min(12, Number(m[1]))));
    return `${y}-${mm}`;
  }
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const y = Number(m[3]);
    const mm = pad2(Math.max(1, Math.min(12, Number(m[2]))));
    return `${y}-${mm}`;
  }
  // Try YYYY only
  m = s.match(/^(\d{4})$/);
  if (m) {
    const y = Number(m[1]);
    return `${y}-01`;
  }
  return undefined;
}

function cleanUrl(u: any): string | undefined {
  if (!u) return undefined;
  let s = String(u).trim();
  if (!s) return undefined;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const url = new URL(s);
    return url.toString();
  } catch {
    return undefined;
  }
}

function guessFullName(cvText: string, email?: string): string | undefined {
  const t = normalizeText(cvText || '');
  const lines = t.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 6);
  // Look for a line with 2..5 capitalized words
  for (const ln of lines) {
    const words = ln.split(/\s+/);
    const caps = words.filter(w => /^(?:[A-ZÀÂÄÇÉÈÊËÏÎÔÖÙÛÜŸ][\p{L}'-]+)$/u.test(w));
    if (caps.length >= 2 && caps.length <= 5) return caps.join(' ');
  }
  // Try from email local-part (firstname.lastname)
  if (email && /@/.test(email)) {
    const local = email.split('@')[0];
    const parts = local.split(/[._-]+/).filter(Boolean).slice(0, 3);
    if (parts.length >= 1) {
      const name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      return name;
    }
  }
  return undefined;
}

export function sanitizeResumeForSchema(input: any, opts: { cvText: string; jdText: string }): any {
  const src = typeof input === 'object' && input ? JSON.parse(JSON.stringify(input)) : {};
  // metadata
  src.metadata = src.metadata || {};
  src.metadata.language = normalizeLang(src.metadata.language, opts.cvText);
  if (src.metadata.sourceOrderPreserved !== true) src.metadata.sourceOrderPreserved = true;
  if (typeof src.metadata.warnings !== 'undefined') {
    if (Array.isArray(src.metadata.warnings)) {
      src.metadata.warnings = src.metadata.warnings.map((w: any) => String(w || '').trim()).filter((w: string) => w);
      if (src.metadata.warnings.length === 0) delete src.metadata.warnings;
    } else {
      delete src.metadata.warnings;
    }
  }

  // header
  src.header = src.header || {};
  // email
  if (src.header.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(src.header.email)) delete src.header.email;
  // phone: trim
  if (src.header.phone) src.header.phone = String(src.header.phone).trim();
  // links
  if (src.header.links) {
    const l = src.header.links;
    if (l.linkedin) l.linkedin = cleanUrl(l.linkedin);
    if (l.github) l.github = cleanUrl(l.github);
    if (l.portfolio) l.portfolio = cleanUrl(l.portfolio);
    Object.keys(l).forEach(k => { if (!l[k]) delete l[k]; });
    if (Object.keys(l).length === 0) delete src.header.links;
  }
  // fullName best-effort
  if (!src.header.fullName || !String(src.header.fullName).trim()) {
    const best = guessFullName(opts.cvText, src.header.email);
    if (best) src.header.fullName = best;
  }
  if (!src.header.fullName || !String(src.header.fullName).trim()) {
    // Safe neutral fallback to satisfy schema without language bias
    src.header.fullName = '—';
  }

  // summary clamp
  if (typeof src.summary !== 'undefined') {
    const s = String(src.summary || '').trim();
    src.summary = s.length > 600 ? s.slice(0, 600) : s;
    if (!src.summary) delete src.summary; // remove empty summary
  }

  // experience clamp + normalize
  if (Array.isArray(src.experience)) {
    src.experience = src.experience.slice(0, 6).map((e: any) => {
      const out: any = { ...e };
      // synonym mapping
      const pick = (...cands: any[]) => cands.find((v) => typeof v === 'string' && String(v).trim()) || undefined;
      out.company = pick(out.company, out.company_name, out.employer, out.org, out.organization, out.organisation);
      out.title = pick(out.title, out.position, out.role);
      out.location = pick(out.location, out.city, out.place);
      out.startDate = pick(out.startDate, out.start, out.from, out.startDateRaw);
      out.endDate = pick(out.endDate, out.end, out.to, out.endDateRaw);
      if ((!out.startDate || !out.endDate) && (out.datesRaw || out.dates || out.period || out.years)) {
        const s = String(out.datesRaw || out.dates || out.period || out.years || '').trim();
        const m = s.match(/(present|présent|\d{1,2}\/\d{4}|\d{4}-\d{2}|\d{4})/gi);
        if (m && m.length) {
          const a = m[0];
          const b = m[1];
          if (!out.startDate && a) {
            const sd = /present|présent/i.test(a) ? undefined : normDate(a);
            if (sd) out.startDate = sd;
          }
          if (!out.endDate && b) {
            if (/present|présent/i.test(b)) out.endDate = 'Present';
            else {
              const ed = normDate(b);
              if (ed) out.endDate = ed;
            }
          }
        }
      }
      let bullets = out.bullets ?? out.achievements ?? out.responsibilities ?? out.tasks;
      if (!Array.isArray(bullets) && typeof bullets === 'string') bullets = [bullets];
      if (Array.isArray(bullets)) out.bullets = bullets;
      // dates
      if (out.startDate) {
        const sd = normDate(out.startDate);
        if (sd) out.startDate = sd; else delete out.startDate;
      }
      if (out.endDate) {
        const ed = normDate(out.endDate);
        if (ed) out.endDate = ed; else delete out.endDate;
      }
      // required strings with safe placeholders
      out.company = String(out.company || '').trim() || '—';
      out.title = String(out.title || '').trim() || '—';
      // bullets
      if (Array.isArray(out.bullets)) {
        out.bullets = out.bullets.map((b: any) => String(b || '').trim()).filter((b: string) => b).slice(0, 5);
      } else {
        out.bullets = [];
      }
      if (!Array.isArray(out.bullets) || out.bullets.length === 0) {
        out.bullets = ['—'];
      }
      return out;
    });
  }

  {
    const now = new Date();
    const todayYM = now.getFullYear() * 12 + (now.getMonth() + 1);
    let anyFuture = false;
    if (Array.isArray(src.experience)) {
      for (const e of src.experience) {
        const chk = (d: any) => {
          if (!d || d === 'Present') return false;
          const m = String(d).match(/^(\d{4})-(\d{2})$/);
          if (!m) return false;
          const ym = parseInt(m[1], 10) * 12 + parseInt(m[2], 10);
          return ym > todayYM;
        };
        if (chk(e.startDate) || chk(e.endDate)) { anyFuture = true; break; }
      }
    }
    if (src.metadata && Array.isArray(src.metadata.warnings)) {
      src.metadata.warnings = src.metadata.warnings.filter((w: any) => {
        const s = String(w || '').toLowerCase();
        const mentionsFuture = s.includes('future') || s.includes('futur') || s.includes('post E9rie') || s.includes('post E9rieures') || s.includes('post') && s.includes('date');
        if (!mentionsFuture) return true;
        return anyFuture;
      });
      if (src.metadata.warnings.length === 0) delete src.metadata.warnings;
    }
  }

  // education clamp
  if (!Array.isArray(src.education)) {
    src.education = [];
  } else {
    src.education = src.education
      .slice(0, 3)
      .map((e: any) => {
        const out: any = { ...e };
        // synonym mapping
        const pick = (...cands: any[]) => cands.find((v) => typeof v === 'string' && String(v).trim()) || undefined;
        out.school = pick(out.school, out.institution, out.university, out.college, out.school_name);
        out.degree = pick(out.degree, out.diploma);
        out.location = pick(out.location, out.city);
        out.dates = pick(out.dates, out.period, out.years);
        return out;
      })
      .filter((e: any) => String(e?.school || '').trim().length > 0);
  }

  // projects cleanup (optional): keep only valid, otherwise drop entirely
  if (Array.isArray(src.projects)) {
    const proj = src.projects
      .slice(0, 4)
      .map((p: any) => {
        const name = String(p?.name || '').trim();
        if (!name) return null;
        const out: any = { name };
        if (Array.isArray(p?.bullets)) {
          out.bullets = p.bullets.map((b: any) => String(b || '').trim()).filter((b: string) => b).slice(0, 4);
        } else {
          out.bullets = ['—'];
        }
        if (!out.bullets.length) out.bullets = ['—'];
        if (p?.dates) out.dates = String(p.dates);
        return out;
      })
      .filter(Boolean);
    if (proj.length) src.projects = proj; else delete src.projects;
  } else if (src.projects) {
    delete src.projects;
  }

  // skills cleanup & coercion
  if (Array.isArray(src.skills)) {
    // Coerce array of strings into tools
    const arr = src.skills.map((x: any) => String(x || '').trim()).filter((x: string) => x);
    src.skills = arr.length ? { tools: arr } : undefined;
  }
  if (typeof src.skills === 'string') {
    const v = String(src.skills).trim();
    src.skills = v ? { tools: [v] } : undefined;
  }
  if (src.skills && typeof src.skills === 'object') {
    const s = src.skills;
    ['languages', 'frameworks', 'tools', 'other'].forEach((k) => {
      if (Array.isArray(s[k])) {
        s[k] = s[k].map((x: any) => String(x || '').trim()).filter((x: string) => x);
      } else if (typeof s[k] === 'string') {
        const v = String(s[k]).trim();
        s[k] = v ? [v] : undefined;
      } else if (s[k] != null) {
        // drop non-array non-string values
        delete s[k];
      }
    });
    if (!Object.keys(s).some(k => Array.isArray(s[k]) && s[k].length)) delete src.skills;
  }

  // Ensure at least one experience item exists
  if (!Array.isArray(src.experience) || src.experience.length === 0) {
    src.experience = [{ company: '—', title: '—', bullets: ['—'] }];
  }

  // strip unknown root keys not present in ResumeJSON
  const allowedRoot = new Set(['metadata', 'header', 'summary', 'experience', 'projects', 'education', 'skills', 'languages', 'certifications', 'interests', 'otherSections']);
  Object.keys(src).forEach((k) => { if (!allowedRoot.has(k)) delete src[k]; });

  return src;
}
