export type BulletEdit = { sourceIndex: number | null; before: string; after: string };

function norm(s: any): string {
  return String(s || '')
    .replace(/[\s\u00A0]+/g, ' ')
    .trim()
    .toLowerCase();
}

function expSig(e: any): string {
  const c = norm(e?.company);
  const t = norm(e?.title);
  const sd = norm(e?.startDate || e?.startDateRaw);
  const ed = norm(e?.endDate || e?.endDateRaw);
  return [c, t, sd, ed].join('|');
}

function indexMapBySig(list: any[]): Map<string, number> {
  const m = new Map<string, number>();
  list.forEach((e, i) => m.set(expSig(e), i));
  return m;
}

function arrayDiff(before: string[] = [], after: string[] = []) {
  const bSet = new Set(before.map(norm));
  const aSet = new Set(after.map(norm));
  const added = after.filter(x => !bSet.has(norm(x)));
  const removed = before.filter(x => !aSet.has(norm(x)));
  return { added, removed };
}

export function computeResumeDiff(before: any, after: any) {
  const diff: any = { decisions: { keptExperiences: [] as number[], removedExperiences: [] as number[], addedExperiences: [] as number[], bulletEdits: [] as BulletEdit[] }, fieldsChanged: {} as any };
  const bexp = Array.isArray(before?.experience) ? before.experience : [];
  const aexp = Array.isArray(after?.experience) ? after.experience : [];

  const bMap = indexMapBySig(bexp);
  const aMap = indexMapBySig(aexp);

  // kept/removed/added
  bexp.forEach((e, bi) => {
    const sig = expSig(e);
    if (aMap.has(sig)) diff.decisions.keptExperiences.push(bi);
    else diff.decisions.removedExperiences.push(bi);
  });
  aexp.forEach((e, ai) => {
    const sig = expSig(e);
    if (!bMap.has(sig)) diff.decisions.addedExperiences.push(ai);
  });

  // bullet edits for kept items (compare by signature)
  bexp.forEach((e, bi) => {
    const sig = expSig(e);
    const ai = aMap.get(sig);
    if (ai == null) return;
    const beforeBullets: string[] = Array.isArray(e?.bullets) ? e.bullets : [];
    const afterBullets: string[] = Array.isArray(aexp[ai]?.bullets) ? aexp[ai].bullets : [];
    if (norm(beforeBullets.join('\n')) !== norm(afterBullets.join('\n'))) {
      diff.decisions.bulletEdits.push({ sourceIndex: bi, before: beforeBullets.join('\n'), after: afterBullets.join('\n') });
    }
  });

  // header changes
  const headerFields = ['fullName', 'email', 'phone', 'location'];
  diff.fieldsChanged.header = headerFields
    .map(k => ({ field: k, before: before?.header?.[k], after: after?.header?.[k] }))
    .filter(x => norm(x.before) !== norm(x.after));

  // summary change
  if (norm(before?.summary) !== norm(after?.summary)) {
    diff.fieldsChanged.summary = { before: before?.summary || '', after: after?.summary || '' };
  }

  // skills diffs
  const cats = ['languages', 'frameworks', 'tools', 'other'];
  diff.fieldsChanged.skills = cats.map(cat => ({
    cat,
    ...arrayDiff(before?.skills?.[cat] || [], after?.skills?.[cat] || [])
  })).filter(x => x.added.length || x.removed.length);

  // languages (human)
  const langDiff = arrayDiff(before?.languages || [], after?.languages || []);
  if (langDiff.added.length || langDiff.removed.length) diff.fieldsChanged.languages = langDiff;

  // education diff (names only to keep it simple)
  const bedu = (before?.education || []).map((e: any) => norm(e?.school));
  const aedu = (after?.education || []).map((e: any) => norm(e?.school));
  const eduDiff = arrayDiff(bedu, aedu);
  if (eduDiff.added.length || eduDiff.removed.length) diff.fieldsChanged.education = eduDiff;

  return diff;
}

export function buildNarrativeFromDiff(diff: any, languageDetectedInResume: string) {
  const kept = diff.decisions.keptExperiences.length;
  const removed = diff.decisions.removedExperiences.length;
  const added = diff.decisions.addedExperiences.length;
  const bullets = diff.decisions.bulletEdits.length;
  const headerCh = diff.fieldsChanged.header?.length || 0;
  const skillsCh = diff.fieldsChanged.skills?.length || 0;

  const lines: string[] = [];
  lines.push('Your resume was tailored to the job while keeping structure and reverse‑chronological order.');
  lines.push(`Experiences: ${kept} kept${removed ? `, ${removed} removed` : ''}${added ? `, ${added} added` : ''}.`);
  if (bullets) lines.push(`${bullets} role(s) had bullets rewritten for terminology alignment.`);
  if (headerCh) lines.push('Header: some fields were harmonized (e.g., location/contact).');
  if (skillsCh) lines.push('Skills: regrouped, deduplicated, and prioritized by job relevance.');

  return lines.join('\n');
}
