'use client';

import { useEffect, useMemo, useState } from 'react';
import { TResumeJSON } from '@/lib/schema';

export default function Home() {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TResumeJSON | null>(null);
  const [userResult, setUserResult] = useState<TResumeJSON | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState<boolean>(false);
  const [rawCv, setRawCv] = useState<null | { text: string; method: 'client' | 'vision'; imagesCount?: number }>(null);
  const [previewClean, setPreviewClean] = useState<boolean>(true);
  const [cleanCv, setCleanCv] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [judge, setJudge] = useState<any | null>(null);
  const [showJudge, setShowJudge] = useState<boolean>(false);
  const [cost, setCost] = useState<any | null>(null);
  const [costSession, setCostSession] = useState<any>({ steps: [], totals: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }, total_usd: 0, currency: 'USD' });
  // Arbitrage dynamic model selection (from OpenRouter models JSON)
  const [modelsList, setModelsList] = useState<any[]>([]);
  const [arbModelId, setArbModelId] = useState<string>('');
  

  // Helper: describe an experience from cleanCv by sourceIndex for clear display
  const describeSourceExperience = (idx: number): string => {
    if (!cleanCv || !Array.isArray(cleanCv.experience)) return `Expérience ${idx}`;
    const e = cleanCv.experience[idx];
    if (!e || typeof e !== 'object') return `Expérience ${idx}`;
    const company = e.company || '';
    const title = e.title || '';
    const dates = e.datesRaw || ([e.startDateRaw, e.endDateRaw].filter(Boolean).join(' – ')) || '';
    const parts = [company, title].filter(Boolean).join(' — ');
    return [parts || `Expérience ${idx}`, dates].filter(Boolean).join(' • ');
  };

  // Clear current arbitrage and re-run with the same cleanCv + JD
  const refreshArbitrage = () => {
    if (!cleanCv) return;
    setError(null);
    setInfo('Arbitrage réinitialisé. Cliquez sur « Lancer arbitrage » pour recommencer.');
    // Clear arbitrage artifacts only
    setUserResult(null);
    setReport(null);
    setJudge(null);
    setShowJudge(false);
    setEditChoices([]);
    setExpChoices({});
  };

  // Load OpenRouter models (filtered) for arbitrage dropdown
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/models/openrouter');
        const data = await resp.json();
        const items = Array.isArray(data?.models) ? data.models : [];
        setModelsList(items);
        const preferred = items.find((m: any) => m?.model_id === 'openai/gpt-4o') || items[0];
        if (preferred) setArbModelId(String(preferred.model_id));
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  // Cost aggregation helpers (session-wide)
  const mergeCostSession = (newCost: any) => {
    try {
      if (!newCost || !Array.isArray(newCost.steps)) return;
      setCostSession((prev: any) => {
        const steps = [...(prev?.steps || []), ...newCost.steps];
        const totals = steps.reduce((acc: any, s: any) => {
          const u = s?.usage || {};
          if (typeof u.prompt_tokens === 'number') acc.prompt_tokens += u.prompt_tokens;
          if (typeof u.completion_tokens === 'number') acc.completion_tokens += u.completion_tokens;
          if (typeof u.total_tokens === 'number') acc.total_tokens += u.total_tokens;
          else acc.total_tokens += ((u.prompt_tokens || 0) + (u.completion_tokens || 0));
          return acc;
        }, { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 });
        const total_usd = steps.reduce((acc: number, s: any) => acc + (typeof s?.cost_usd === 'number' ? s.cost_usd : 0), 0);
        const currency = newCost.currency || prev?.currency || 'USD';
        return { steps, totals, total_usd, currency };
      });
    } catch {}
  };

  // Normalize decisions from report (accepts variant keys and coerces indices)
  const normalizeDecisions = (rep: any) => {
    const safeArr = (x: any): any[] => Array.isArray(x) ? x : (x && typeof x === 'object' ? Object.values(x) : []);
    const decisions = rep?.decisions || {};
    const keptRaw = decisions.keptExperiences ?? decisions.kept_experiences ?? decisions.kept ?? [];
    const removedRaw = decisions.removedExperiences ?? decisions.removed_experiences ?? decisions.removed ?? [];
    const editsRaw = decisions.bulletEdits ?? decisions.bullet_edits ?? decisions.edits ?? [];
    const toIndex = (v: any) => {
      const n = typeof v === 'string' ? parseInt(v, 10) : (typeof v === 'number' ? v : NaN);
      return Number.isFinite(n) ? n : undefined;
    };
    const kept = safeArr(keptRaw).map((k: any) => ({
      sourceIndex: toIndex(k?.sourceIndex ?? k?.index ?? k?.src) as number | undefined,
      reason: k?.reason ?? k?.why ?? k?.rationale ?? '',
    })).filter((k: any) => k && (k.sourceIndex !== undefined || k.reason));
    const removed = safeArr(removedRaw).map((k: any) => ({
      sourceIndex: toIndex(k?.sourceIndex ?? k?.index ?? k?.src) as number | undefined,
      reason: k?.reason ?? k?.why ?? k?.rationale ?? '',
    })).filter((k: any) => k && (k.sourceIndex !== undefined || k.reason));
    const edits = safeArr(editsRaw).map((b: any) => ({
      sourceIndex: toIndex(b?.sourceIndex ?? b?.index ?? b?.src) as number | undefined,
      before: b?.before ?? b?.from ?? '',
      after: b?.after ?? b?.to ?? '',
      reason: b?.reason ?? b?.why ?? b?.rationale ?? '',
    })).filter((b: any) => b && (b.before || b.after));
    return { kept, removed, edits };
  };

  const normalized = useMemo(() => normalizeDecisions(report), [report]);

  // Map clean experience index -> userResult experience index (heuristic if no explicit mapping)
  const mapCleanToResultIndex = (cleanIdx: number | undefined): number | undefined => {
    if (cleanIdx === undefined || !userResult) return undefined;
    try {
      const src = cleanCv?.experience?.[cleanIdx] || {};
      const candidates = userResult.experience || [];
      const norm = (s: any) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      let best = { j: undefined as number | undefined, score: -1 };
      for (let j = 0; j < candidates.length; j++) {
        const c = candidates[j] as any;
        let score = 0;
        if (norm(c.company) && norm(c.company) === norm(src.company)) score += 2;
        if (norm(c.title) && norm(c.title) === norm(src.title)) score += 2;
        if (norm(c.location) && norm(c.location) === norm(src.location)) score += 1;
        if (score > best.score) best = { j, score };
      }
      return best.score >= 1 ? best.j : Math.min(cleanIdx, (candidates.length || 1) - 1);
    } catch {
      return undefined;
    }
  };

  // Accept/reject a single bullet edit into userResult
  const applyBulletEdit = (edit: any, accept: boolean) => {
    if (!userResult) return;
    const ri = mapCleanToResultIndex(edit?.sourceIndex);
    if (ri === undefined || ri < 0) return;
    const clone: any = JSON.parse(JSON.stringify(userResult));
    const exp = clone.experience?.[ri];
    if (!exp) return;
    exp.bullets = Array.isArray(exp.bullets) ? exp.bullets.slice() : [];
    const eq = (a: any, b: any) => String(a || '').trim() === String(b || '').trim();
    const idxAfter = exp.bullets.findIndex((x: any) => eq(x, edit.after));
    const idxBefore = exp.bullets.findIndex((x: any) => eq(x, edit.before));
    if (accept) {
      if (idxBefore >= 0) exp.bullets[idxBefore] = edit.after;
      else if (idxAfter >= 0) {/* already applied */}
      // else: cannot locate bullet reliably → no-op
    } else {
      if (idxAfter >= 0) exp.bullets[idxAfter] = edit.before;
      // else if before exists we leave as-is
    }
    setUserResult(clone);
  };

  // Track acceptance for each edit
  const [editChoices, setEditChoices] = useState<boolean[]>([]);
  useEffect(() => {
    const n = normalized.edits.length;
    setEditChoices(Array(n).fill(true));
  }, [normalized.edits.length]);

  // Experience-level toggles (accept adapted vs revert to clean)
  const [expChoices, setExpChoices] = useState<Record<number, boolean>>({});
  const sanitizeBullets = (arr: any): string[] => {
    const out = Array.isArray(arr) ? arr.map((x) => String(x || '').trim()).filter((s) => s.length > 0) : [];
    return out.slice(0, 5);
  };
  const applyExperienceToggle = (cleanIdx: number | undefined, accept: boolean) => {
    if (!userResult || cleanIdx === undefined) return;
    const ri = mapCleanToResultIndex(cleanIdx);
    if (ri === undefined || ri < 0) return;
    const clone: any = JSON.parse(JSON.stringify(userResult));
    const baseline: any = result;
    if (!baseline) return;
    const baseExp = baseline.experience?.[ri];
    const resExp = clone.experience?.[ri];
    const cleanExp = cleanCv?.experience?.[cleanIdx] || {};
    if (!resExp || !baseExp) return;
    if (accept) {
      // Restore adapted (baseline) version
      clone.experience[ri] = JSON.parse(JSON.stringify(baseExp));
    } else {
      // Revert main fields to clean when available; keep dates from baseline
      const next = { ...resExp };
      if (cleanExp.company) next.company = String(cleanExp.company);
      if (cleanExp.title) next.title = String(cleanExp.title);
      if (cleanExp.location) next.location = String(cleanExp.location);
      const cleanBullets = sanitizeBullets((cleanExp as any).bullets);
      if (cleanBullets.length > 0) next.bullets = cleanBullets;
      // Keep schema-validated dates from baseline result
      next.startDate = baseExp.startDate;
      next.endDate = baseExp.endDate;
      clone.experience[ri] = next;
    }
    setUserResult(clone);
    setExpChoices((prev) => ({ ...prev, [ri!]: accept }));
  };
  // Initialize expChoices when userResult or kept list changes
  useEffect(() => {
    const next: Record<number, boolean> = {};
    if (userResult) {
      normalized.kept.forEach((k: any) => {
        const ri = mapCleanToResultIndex(k?.sourceIndex);
        if (ri !== undefined && ri >= 0) next[ri] = true;
      });
    }
    setExpChoices(next);
  }, [userResult, normalized.kept.length]);

  // When result changes, initialize userResult
  useEffect(() => {
    if (result) setUserResult(result);
  }, [result]);


  // Helper: build a readable narrative text to copy/share
  const buildNarrativeText = (rep: any): string => {
    if (!rep) return '';
    const direct = rep.narrative || rep.summary;
    if (direct && typeof direct === 'string') return direct;
    const cov = rep.jdCoverage || rep.jd_coverage || {};
    const toArr = (x: any) => (Array.isArray(x) ? x : []);
    const matched = toArr(cov.matchedKeywords);
    const missing = toArr(cov.missingKeywords);
    const partial = toArr(cov.partialMatches);
    const labelOf = (item: any) => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      return item.term || item.keyword || String(item);
    };
    const kept = toArr(rep?.decisions?.keptExperiences);
    const removed = toArr(rep?.decisions?.removedExperiences);
    const edits = toArr(rep?.decisions?.bulletEdits);
    const lines: string[] = [];
    if (typeof rep.fitScore === 'number') lines.push(`Score d'adéquation: ${Math.round(rep.fitScore)}/100.`);
    if (matched.length) lines.push(`Mots-clés couverts: ${matched.map(labelOf).join(', ')}.`);
    if (missing.length) lines.push(`Mots-clés manquants: ${missing.map(labelOf).join(', ')}.`);
    if (partial.length) lines.push(`Correspondances partielles: ${partial.map(labelOf).join(', ')}.`);
    if (kept.length || removed.length)
      lines.push(`Décisions: ${kept.length} expérience(s) conservée(s), ${removed.length} retirée(s).`);
    if (edits.length) lines.push(`Réécritures illustratives: ${edits.length}.`);
    if (Array.isArray(rep.warnings) && rep.warnings.length)
      lines.push(`Avertissements: ${rep.warnings.join('; ')}.`);
    return lines.join('\n');
  };

  // Extract text client-side using pdfjs-dist (no OCR)
  const extractTextClient = async (file: File): Promise<string> => {
    try {
      // Dynamic import of pdf.js library
      const pdfjsLib: any = await import('pdfjs-dist');
      // Configure worker to a versioned .mjs from unpkg (prevents fake worker errors)
      try {
        const ver = (pdfjsLib as any).version || '4.10.38';
        (pdfjsLib as any).GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${ver}/build/pdf.worker.min.mjs`;
      } catch {}

      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      let pdf: any;
      try {
        pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
      } catch (err) {
        console.warn('pdf.js worker failed, falling back to disableWorker.', err);
        pdf = await pdfjsLib.getDocument({ data: uint8, disableWorker: true }).promise;
      }

      const maxPages = Math.min(pdf.numPages, 6);
      let fullText = '';
      for (let i = 1; i <= maxPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = (textContent.items || [])
          .map((it: any) => (it && it.str ? String(it.str) : ''))
          .join(' ');
        if (pageText.trim()) {
          fullText += (fullText ? '\n\n' : '') + pageText.trim();
        }
      }
      return fullText.trim();
    } catch (e) {
      console.warn('Client PDF extract failed:', e);
      return '';
    }
  };

  const runArbitrage = async () => {
    try {
      if (!cleanCv) return;
      setIsLoading(true);
      setError(null);
      setInfo('Arbitrage en cours...');

      const formData = new FormData();
      formData.append('jd_text', jdText.trim());
      formData.append('arb_only', '1');
      formData.append('clean_cv_json', JSON.stringify(cleanCv));
      if (arbModelId) formData.append('arb_model_id', arbModelId);
      // Use pricing from selected model (no manual inputs)
      const selected = modelsList.find((m: any) => m?.model_id === arbModelId);
      if (selected && typeof selected.input_usd_per_1M === 'number') {
        formData.append('arb_in_price_per_Mtok', String(selected.input_usd_per_1M));
      }
      if (selected && typeof selected.output_usd_per_1M === 'number') {
        formData.append('arb_out_price_per_Mtok', String(selected.output_usd_per_1M));
      }

      const response = await fetch('/api/adapt', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur arbitrage');

      // arb_only returns the final JSON directly
      if (data && data.result) {
        setResult(data.result as TResumeJSON);
        if (data.report) setReport(data.report);
        setJudge(data.judge || null);
        setShowJudge(false);
        if (data.cost) { setCost(data.cost); mergeCostSession(data.cost); }
      } else {
        setResult(data as TResumeJSON);
      }
      setInfo('Arbitrage terminé.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur arbitrage');
    } finally {
      setIsLoading(false);
    }
  };

  // Render up to N pages to images for Vision OCR
  const renderPdfToImages = async (file: File, maxPages = 3): Promise<string[]> => {
    try {
      const pdfjsLib: any = await import('pdfjs-dist');

      const arrayBuffer = await file.arrayBuffer();
      const uint8 = new Uint8Array(arrayBuffer);
      const loadingTask = pdfjsLib.getDocument({ data: uint8, disableWorker: true });
      const pdf = await loadingTask.promise;

      const pages = Math.min(pdf.numPages, maxPages);
      const images: string[] = [];
      for (let i = 1; i <= pages; i++) {
        try {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));
          const renderTask = page.render({ canvasContext: ctx, viewport });
          await renderTask.promise;
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          if (dataUrl && dataUrl.startsWith('data:image/')) {
            images.push(dataUrl);
          }
        } catch (perPageErr) {
          console.warn('Erreur rendu page PDF → image, page', i, perPageErr);
          continue;
        }
      }
      if (images.length === 0) {
        throw new Error("Impossible de convertir le PDF en images pour l'OCR (rendu canvas)." );
      }
      return images;
    } catch (e) {
      console.warn('Render PDF to images failed:', e);
      throw e instanceof Error ? e : new Error(String(e));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const wantRawOnly = showRaw && !previewClean; // Raw-only mode
    const wantOnlyClean = previewClean && !wantRawOnly; // Only structured preview

    if (!cvFile) {
      setError('Veuillez sélectionner un fichier PDF');
      return;
    }
    if (!jdText.trim() && !wantRawOnly) {
      setError('Veuillez saisir une description de poste');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setInfo(null);
    setRawCv(null);
    setCleanCv(null);
    setCost(null);

    try {
      // Step A: try client-side extraction (free)
      const clientText = await extractTextClient(cvFile);
      const MIN_LEN = 150;

      let response: Response;
      if (clientText && clientText.length >= MIN_LEN) {
        // Build request for desired mode
        if (wantRawOnly) {
          setInfo('Extraction du texte brut en cours...');
          const formData = new FormData();
          formData.append('only_raw', '1');
          formData.append('cv_text', clientText);
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        } else if (wantOnlyClean) {
          setInfo('Génération du CV structuré (propre)...');
          const formData = new FormData();
          formData.append('only_clean', '1');
          formData.append('jd_text', jdText.trim());
          formData.append('cv_text', clientText);
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        } else {
          setInfo('Génération en cours...');
          const formData = new FormData();
          formData.append('jd_text', jdText.trim());
          formData.append('cv_text', clientText);
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        }
      } else {
        // Step C: fallback to OCR Vision from images
        setInfo('Texte insuffisant. Passage en OCR (Vision) sur les 2–3 premières pages...');
        const images = await renderPdfToImages(cvFile, 3);
        if (wantRawOnly) {
          const formData = new FormData();
          formData.append('only_raw', '1');
          images.forEach((img) => formData.append('images[]', img));
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        } else if (wantOnlyClean) {
          const formData = new FormData();
          formData.append('only_clean', '1');
          formData.append('jd_text', jdText.trim());
          images.forEach((img) => formData.append('images[]', img));
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        } else {
          const formData = new FormData();
          formData.append('jd_text', jdText.trim());
          images.forEach((img) => formData.append('images[]', img));
          response = await fetch('/api/adapt', { method: 'POST', body: formData });
        }
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur lors du traitement');

      // Raw-only path: server returns { raw_cv, cost }
      if (wantRawOnly && data && data.raw_cv) {
        setRawCv(data.raw_cv);
        setJudge(null);
        setShowJudge(false);
        if (data.cost) { setCost(data.cost); mergeCostSession(data.cost); }
        setInfo('Texte brut extrait avec succès.');
        return;
      }

      // Preview path: only_clean returns { clean_cv, raw_cv? }
      if (previewClean && data && data.clean_cv && !data.result) {
        setCleanCv(data.clean_cv);
        setJudge(data.judge || null);
        setShowJudge(false);
        if (data.cost) { setCost(data.cost); mergeCostSession(data.cost); }
        setInfo('CV structuré (propre) prêt. Vérifiez puis cliquez sur "Lancer arbitrage".');
        return; // stop here, wait for user to trigger arbitrage
      }

      // Full pipeline path: server may return { result, clean_cv, raw_cv? } or just result
      if (data && data.result) {
        if (data.clean_cv) setCleanCv(data.clean_cv);
        if (data.report) setReport(data.report);
        if (data.raw_cv) setRawCv(data.raw_cv);
        setJudge(data.judge || null);
        setShowJudge(false);
        if (data.cost) { setCost(data.cost); mergeCostSession(data.cost); }
        setResult(data.result as TResumeJSON);
      } else {
        // Backward compat if server returned result directly
        setResult(data as TResumeJSON);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCvFile(null);
    setJdText('');
    setResult(null);
    setError(null);
    // Reset file input
    const fileInput = document.getElementById('cv-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            RealCV Lite JSON
          </h1>
          <p className="text-gray-600 mb-8">
            Adaptez votre CV à une offre d'emploi avec l'IA et obtenez un JSON structuré
          </p>

          {/* Evaluation du modèle (top of page) */}
          {judge && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Evaluation du modèle</h2>
                <button type="button" onClick={() => setShowJudge((v) => !v)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  {showJudge ? 'Masquer l’évaluation du modèle' : 'Afficher l’évaluation du modèle'}
                </button>
              </div>
              {showJudge && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {judge.pdfToJson && (
                    <div className="p-3 border border-gray-200 rounded">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Évaluation PDF → JSON</h4>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div>Qualité: {Math.round(judge.pdfToJson.qualityScore ?? 0)} / 100</div>
                        <div>Exhaustivité: {Math.round(judge.pdfToJson.completenessScore ?? 0)} / 100</div>
                        {typeof judge.pdfToJson.verdict === 'string' && (
                          <div>Verdict: {judge.pdfToJson.verdict}</div>
                        )}
                        {Array.isArray(judge.pdfToJson.strengths) && judge.pdfToJson.strengths.length > 0 && (
                          <div>
                            <div className="font-medium">Forces</div>
                            <ul className="list-disc list-inside">
                              {judge.pdfToJson.strengths.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {Array.isArray(judge.pdfToJson.weaknesses) && judge.pdfToJson.weaknesses.length > 0 && (
                          <div>
                            <div className="font-medium">Faiblesses</div>
                            <ul className="list-disc list-inside">
                              {judge.pdfToJson.weaknesses.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {Array.isArray(judge.pdfToJson.missingFields) && judge.pdfToJson.missingFields.length > 0 && (
                          <div>
                            <div className="font-medium">Champs manquants</div>
                            <ul className="list-disc list-inside">
                              {judge.pdfToJson.missingFields.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {Array.isArray(judge.pdfToJson.structuralIssues) && judge.pdfToJson.structuralIssues.length > 0 && (
                          <div>
                            <div className="font-medium">Problèmes structurels</div>
                            <ul className="list-disc list-inside">
                              {judge.pdfToJson.structuralIssues.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {typeof judge.pdfToJson.pricePerformance === 'string' && (
                          <div>Rapport qualité/prix: {judge.pdfToJson.pricePerformance}</div>
                        )}
                        {typeof judge.pdfToJson.analysis === 'string' && (
                          <div className="mt-1 text-gray-800 whitespace-pre-wrap">{judge.pdfToJson.analysis}</div>
                        )}
                        <div className="mt-2">
                          <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200" onClick={() => navigator.clipboard.writeText(JSON.stringify(judge.pdfToJson, null, 2))}>Copier JSON juge</button>
                        </div>
                      </div>
                    </div>
                  )}
                  {judge.arbitrage && (
                    <div className="p-3 border border-gray-200 rounded">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Évaluation Arbitrage</h4>
                      <div className="text-xs text-gray-700 space-y-1">
                        <div>Qualité du rapport: {Math.round(judge.arbitrage.reportQualityScore ?? 0)} / 100</div>
                        <div>Qualité des changements: {Math.round(judge.arbitrage.changesQualityScore ?? 0)} / 100</div>
                        <div>Couverture mots-clés: {Math.round(judge.arbitrage.keywordCoverageScore ?? 0)} / 100</div>
                        <div>Score global d'adéquation: {Math.round(judge.arbitrage.overallFitScore ?? 0)} / 100</div>
                        {typeof judge.arbitrage.verdict === 'string' && (
                          <div>Verdict: {judge.arbitrage.verdict}</div>
                        )}
                        {Array.isArray(judge.arbitrage.strengths) && judge.arbitrage.strengths.length > 0 && (
                          <div>
                            <div className="font-medium">Forces</div>
                            <ul className="list-disc list-inside">
                              {judge.arbitrage.strengths.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {Array.isArray(judge.arbitrage.weaknesses) && judge.arbitrage.weaknesses.length > 0 && (
                          <div>
                            <div className="font-medium">Faiblesses</div>
                            <ul className="list-disc list-inside">
                              {judge.arbitrage.weaknesses.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {Array.isArray(judge.arbitrage.recommendations) && judge.arbitrage.recommendations.length > 0 && (
                          <div>
                            <div className="font-medium">Recommandations</div>
                            <ul className="list-disc list-inside">
                              {judge.arbitrage.recommendations.map((s: any, i: number) => <li key={i}>{String(s)}</li>)}
                            </ul>
                          </div>
                        )}
                        {typeof judge.arbitrage.pricePerformance === 'string' && (
                          <div>Rapport qualité/prix: {judge.arbitrage.pricePerformance}</div>
                        )}
                        {typeof judge.arbitrage.analysis === 'string' && (
                          <div className="mt-1 text-gray-800 whitespace-pre-wrap">{judge.arbitrage.analysis}</div>
                        )}
                        <div className="mt-2">
                          <button type="button" className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200" onClick={() => navigator.clipboard.writeText(JSON.stringify(judge.arbitrage, null, 2))}>Copier JSON juge</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Session cost (sticky at top) */}
          {costSession && (
            <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 py-3 -mx-8 px-8 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Coût de la session</h2>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">Total: <span className="font-semibold">{typeof costSession.total_usd === 'number' ? `$${costSession.total_usd.toFixed(6)}` : '—'}</span> {costSession.currency ? `(${costSession.currency})` : ''}</div>
                  <button type="button" onClick={() => setCostSession({ steps: [], totals: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }, total_usd: 0, currency: 'USD' })} className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Réinitialiser coûts</button>
                </div>
              </div>
              <div className="overflow-auto border border-gray-200 rounded">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Étape</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Modèle</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Prompt tokens</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Completion tokens</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Total tokens</th>
                      <th className="px-2 py-1 text-left font-medium text-gray-700">Coût</th>
                    </tr>
                  </thead>
                  <tbody>
                    {((Array.isArray(costSession.steps) ? costSession.steps : []).length > 0
                      ? (costSession.steps as any[])
                      : [{ name: '—', model: '—', usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }, cost_usd: 0 }]
                    ).map((s: any, i: number) => {
                      const nameMap: Record<string, string> = {
                        client_extract: 'Extraction locale (gratuite)',
                        vision_ocr: 'Vision OCR',
                        structuring_ai: 'Structuration IA',
                        structuring_deterministic: 'Structuration déterministe (gratuite)',
                        arbitrage: 'Arbitrage',
                        judge_pdf: 'Juge PDF→JSON',
                        judge_arbitrage: 'Juge arbitrage',
                      };
                      const u = s?.usage || {};
                      const totalTokens = typeof u.total_tokens === 'number' ? u.total_tokens : ((u.prompt_tokens || 0) + (u.completion_tokens || 0));
                      const costCell = typeof s?.cost_usd === 'number'
                        ? (s.cost_usd === 0 ? 'Gratuit' : `$${s.cost_usd.toFixed(6)}`)
                        : '—';
                      return (
                        <tr key={i} className="border-t">
                          <td className="px-2 py-1 text-gray-800">{nameMap[s?.name] || s?.name || '—'}</td>
                          <td className="px-2 py-1 text-gray-600">{s?.model || '—'}</td>
                          <td className="px-2 py-1 text-gray-600">{u?.prompt_tokens ?? 0}</td>
                          <td className="px-2 py-1 text-gray-600">{u?.completion_tokens ?? 0}</td>
                          <td className="px-2 py-1 text-gray-600">{totalTokens}</td>
                          <td className="px-2 py-1 text-gray-900">{costCell}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {costSession?.totals && (
                <div className="mt-2 text-xs text-gray-600">
                  Tokens totaux: prompt {costSession.totals.prompt_tokens ?? 0} • completion {costSession.totals.completion_tokens ?? 0} • total {costSession.totals.total_tokens ?? 0}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload CV */}
            <div>
              <label htmlFor="cv-file" className="block text-sm font-medium text-gray-700 mb-2">
                Fichier CV (PDF uniquement)
              </label>
              <input
                id="cv-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md"
                disabled={isLoading}
              />
              {cvFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                </p>
              )}

          {/* Comparaison: Clean (pré-arbitrage) vs Résultat (post-arbitrage) */}
          {(cleanCv || result) && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Comparaison avant / après arbitrage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Colonne gauche: Clean CV */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Avant arbitrage (CV structuré)</h3>
                    {cleanCv && (
                      <button type="button"
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(cleanCv, null, 2))}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        Copier
                      </button>
                    )}
                  </div>
                  <div className="bg-gray-900 rounded-md p-4 overflow-auto min-h-[300px]">
                    <pre className="text-green-400 text-sm whitespace-pre-wrap">{cleanCv ? JSON.stringify(cleanCv, null, 2) : 'Prévisualisez le CV structuré pour l\'afficher ici.'}</pre>
                  </div>
                </div>

                {/* Colonne droite: Résultat */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Après arbitrage (JSON adapté)</h3>
                    <div className="flex flex-wrap items-end gap-3">
                      {/* Arbitrage model dropdown */}
                      {cleanCv && (
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-600 mb-1">Modèle d'arbitrage</label>
                          <select
                            className="border border-gray-300 rounded px-2 py-1 text-sm text-black"
                            value={arbModelId}
                            onChange={(e) => {
                              const id = e.target.value;
                              setArbModelId(id);
                            }}
                            disabled={isLoading || modelsList.length === 0}
                          >
                            {modelsList.map((m: any) => (
                              <option key={m.model_id} value={m.model_id} className="text-black">
                                {m.model_name} ({m.model_id})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {cleanCv && (
                        <button
                          type="button"
                          onClick={runArbitrage}
                          disabled={isLoading}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          {userResult ? 'Relancer arbitrage' : 'Lancer arbitrage'}
                        </button>
                      )}
                      {cleanCv && userResult && (
                        <button
                          type="button"
                          onClick={refreshArbitrage}
                          disabled={isLoading}
                          className="px-3 py-1 text-sm bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
                        >
                          Actualiser arbitrage
                        </button>
                      )}
                      {userResult && (
                        <button type="button"
                          onClick={() => navigator.clipboard.writeText(JSON.stringify(userResult, null, 2))}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Copier
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-md p-4 overflow-auto min-h-[300px]">
                    <pre className="text-green-400 text-sm whitespace-pre-wrap">{userResult ? JSON.stringify(userResult, null, 2) : 'Cliquez sur \"Lancer arbitrage\" pour produire le JSON adapté.'}</pre>
                  </div>
                </div>
              </div>
              {/* Compte rendu d'arbitrage (rendu riche) */}
              {report && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900">Compte rendu d'arbitrage</h3>
                    <div className="flex gap-2">
                      {typeof report.fitScore === 'number' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          Score d'adéquation: {Math.round(report.fitScore)} / 100
                        </span>
                      )}
                      <button type="button"
                        onClick={() => navigator.clipboard.writeText(buildNarrativeText(report))}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        Copier le compte rendu
                      </button>
                    </div>
                  </div>

                  {/* JD Coverage */}
                  {(report.jdCoverage || report.jd_coverage) && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Couverture JD</h4>
                      {(() => {
                        const cov = report.jdCoverage || report.jd_coverage || {};
                        const matched = Array.isArray(cov.matchedKeywords) ? cov.matchedKeywords : [];
                        const missing = Array.isArray(cov.missingKeywords) ? cov.missingKeywords : [];
                        const partial = Array.isArray(cov.partialMatches) ? cov.partialMatches : [];
                        const labelOf = (item: any) => {
                          if (!item) return '';
                          if (typeof item === 'string') return item;
                          return item.term || item.keyword || JSON.stringify(item);
                        };
                        return (
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Mots-clés couverts</p>
                              <div className="flex flex-wrap gap-2">
                                {matched.length ? matched.map((it: any, i: number) => (
                                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs">
                                    {labelOf(it)}
                                  </span>
                                )) : <span className="text-xs text-gray-500">Aucun</span>}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Mots-clés manquants</p>
                              <div className="flex flex-wrap gap-2">
                                {missing.length ? missing.map((it: any, i: number) => (
                                  <span key={i} className="inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs">
                                    {labelOf(it)}
                                  </span>
                                )) : <span className="text-xs text-gray-500">Aucun</span>}
                              </div>
                            </div>
                            {!!partial.length && (
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Correspondances partielles</p>
                                <ul className="list-disc list-inside text-xs text-gray-700">
                                  {partial.map((p: any, i: number) => (
                                    <li key={i}>{p.term || p.keyword} ≈ {p.near || p.match} {p.source ? <span className="text-gray-500">({p.source})</span> : null}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Decisions */}
                  {(normalized.kept.length > 0 || normalized.removed.length > 0 || normalized.edits.length > 0) && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Décisions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Expériences conservées</p>
                          <ul className="space-y-1">
                            {normalized.kept.map((k: any, i: number) => {
                              const label = Number.isInteger(k?.sourceIndex) ? describeSourceExperience(k.sourceIndex) : 'Expérience';
                              const ri = Number.isInteger(k?.sourceIndex) ? mapCleanToResultIndex(k.sourceIndex) : undefined;
                              const checked = ri !== undefined ? (expChoices[ri] ?? true) : true;
                              return (
                                <li key={i} className="text-xs text-gray-800 bg-gray-50 rounded p-2 border border-gray-200">
                                  <div className="font-medium">{label}</div>
                                  <div className="text-gray-600">{k?.reason || '—'}</div>
                                  {ri !== undefined && (
                                    <div className="mt-1">
                                      <label className="inline-flex items-center gap-2">
                                        <input
                                          type="checkbox"
                                          checked={checked}
                                          onChange={(e) => applyExperienceToggle(k.sourceIndex, e.target.checked)}
                                        />
                                        <span>Conserver adaptation (décocher pour version clean)</span>
                                      </label>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Expériences retirées</p>
                          <ul className="space-y-1">
                            {normalized.removed.map((k: any, i: number) => {
                              const label = Number.isInteger(k?.sourceIndex) ? describeSourceExperience(k.sourceIndex) : 'Expérience';
                              return (
                                <li key={i} className="text-xs text-gray-800 bg-gray-50 rounded p-2 border border-gray-200">
                                  <div className="font-medium">{label}</div>
                                  <div className="text-gray-600">{k?.reason || '—'}</div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                      {normalized.edits.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-600 mb-1">Réécritures de bullets (échantillon)</p>
                          <div className="overflow-auto border border-gray-200 rounded">
                            <table className="min-w-full text-xs">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-2 py-1 text-left font-medium text-gray-700">Exp.</th>
                                  <th className="px-2 py-1 text-left font-medium text-gray-700">Avant</th>
                                  <th className="px-2 py-1 text-left font-medium text-gray-700">Après</th>
                                  <th className="px-2 py-1 text-left font-medium text-gray-700">Raison</th>
                                  <th className="px-2 py-1 text-left font-medium text-gray-700">Choix</th>
                                </tr>
                              </thead>
                              <tbody>
                                {normalized.edits.slice(0, 50).map((b: any, i: number) => {
                                  const label = Number.isInteger(b?.sourceIndex) ? describeSourceExperience(b.sourceIndex) : (b?.sourceIndex ?? '—');
                                  const accepted = editChoices[i] ?? true;
                                  return (
                                    <tr key={i} className="border-t align-top">
                                      <td className="px-2 py-1 text-gray-700 min-w-[160px]">{label}</td>
                                      <td className="px-2 py-1 text-gray-600 whitespace-pre-wrap">{b.before}</td>
                                      <td className="px-2 py-1 text-gray-900 whitespace-pre-wrap">{b.after}</td>
                                      <td className="px-2 py-1 text-gray-600">{b.reason || '—'}</td>
                                      <td className="px-2 py-1">
                                        <label className="inline-flex items-center gap-2 text-xs">
                                          <input
                                            type="checkbox"
                                            checked={accepted}
                                            onChange={(e) => {
                                              const next = [...editChoices];
                                              next[i] = e.target.checked;
                                              setEditChoices(next);
                                              applyBulletEdit(b, e.target.checked);
                                            }}
                                          />
                                          <span>{accepted ? 'Accepter' : 'Rejeter'}</span>
                                        </label>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <button type="button" onClick={() => userResult && navigator.clipboard.writeText(JSON.stringify(userResult, null, 2))} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Copier le JSON final</button>
                            <button type="button" onClick={() => { if (result) { setUserResult(result); setEditChoices(Array(normalized.edits.length).fill(true)); } }} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Réinitialiser les choix</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Warnings */}
                  {Array.isArray(report.warnings) && report.warnings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Avertissements</h4>
                      <ul className="list-disc list-inside text-xs text-gray-800 space-y-1">
                        {report.warnings.map((w: any, i: number) => <li key={i}>{String(w)}</li>)}
                      </ul>
                    </div>
                  )}


                  {/* Narrative at the end */}
                  {(report.narrative || report.summary) && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">Compte rendu</h4>
                      <p className="text-sm text-blue-900 whitespace-pre-wrap">{report.narrative || report.summary}</p>
                      {report.languageUsed && (
                        <div className="mt-2 text-xs text-blue-800">Langue utilisée: {report.languageUsed}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
            </div>

            {/* Description de poste */}
            <div>
              <label htmlFor="jd-text" className="block text-sm font-medium text-gray-700 mb-2">
                Description de poste (Job Description)
              </label>
              <textarea
                id="jd-text"
                rows={8}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Collez ici la description du poste auquel vous souhaitez adapter votre CV..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading || !cvFile || !jdText.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {previewClean ? (isLoading ? 'Préparation du CV structuré...' : 'Prévisualiser CV structuré') : (isLoading ? 'Génération en cours...' : 'Générer JSON adapté')}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Réinitialiser
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="show-raw"
                type="checkbox"
                checked={showRaw}
                onChange={(e) => setShowRaw(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="show-raw" className="text-sm text-gray-700">Afficher le CV brut (retourner le JSON brut avec le résultat)</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="preview-clean"
                type="checkbox"
                checked={previewClean}
                onChange={(e) => setPreviewClean(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="preview-clean" className="text-sm text-gray-700">Prévisualiser le CV structuré (propre) avant arbitrage</label>
            </div>
          </form>

          {/* Affichage des infos */}
          {info && !error && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
              {info}
            </div>
          )}


          {/* Affichage des erreurs */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}


          {/* Affichage du JSON brut (si demandé) */}
          {rawCv && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">CV brut (extraction)</h2>
                <button type="button"
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(rawCv, null, 2))}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Copier JSON brut
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-2">Méthode: {rawCv.method}{typeof rawCv.imagesCount === 'number' ? ` • pages OCR: ${rawCv.imagesCount}` : ''}</p>
              <div className="bg-gray-900 rounded-md p-4 overflow-auto">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{JSON.stringify(rawCv, null, 2)}</pre>
              </div>
            </div>
          )}

          {/* Le bloc résultat dédié a été remplacé par la comparaison côte à côte ci-dessus */}
        </div>
      </div>
    </div>
  );
}
