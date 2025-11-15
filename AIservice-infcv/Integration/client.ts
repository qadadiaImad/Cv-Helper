// Integration/client.ts
// Tiny client wrapper for QuickCV endpoints

export type BaseOpts = {
  baseUrl: string; // e.g. '/api' (same origin) or 'https://your-site.com/api'
  timeoutMs?: number;
  signal?: AbortSignal;
};

function withTimeout(signal: AbortSignal | undefined, ms = 30000) {
  if (signal) return signal;
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  // @ts-ignore retain handle to clear if needed by caller
  (ctrl as any).__timeoutId = id;
  return ctrl.signal;
}

export async function parseCV(opts: BaseOpts & {
  cv_text?: string;
  images?: string[]; // base64 data URLs
}) {
  const { baseUrl, cv_text, images, timeoutMs } = opts;
  const url = baseUrl.replace(/\/$/, '') + '/adapt';
  const fd = new FormData();
  if (cv_text) fd.append('cv_text', cv_text);
  if (Array.isArray(images)) images.forEach(img => fd.append('images[]', img));
  fd.append('only_clean', 'true');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), typeof timeoutMs === 'number' ? timeoutMs : 30000);
  try {
    const res = await fetch(url, { method: 'POST', body: fd, signal: controller.signal });
    if (!res.ok) throw new Error(`parseCV HTTP ${res.status}`);
    const json = await res.json();
    return json;
  } finally {
    clearTimeout(timer);
  }
}

export async function arbitrate(opts: BaseOpts & {
  clean_cv: any;
  jd_text: string;
}) {
  const { baseUrl, clean_cv, jd_text, timeoutMs } = opts;
  const url = baseUrl.replace(/\/$/, '') + '/adapt';
  const fd = new FormData();
  fd.append('jd_text', jd_text);
  fd.append('clean_cv_json', JSON.stringify(clean_cv));
  fd.append('arb_only', 'true');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), typeof timeoutMs === 'number' ? timeoutMs : 45000);
  try {
    const res = await fetch(url, { method: 'POST', body: fd, signal: controller.signal });
    if (!res.ok) throw new Error(`arbitrate HTTP ${res.status}`);
    const json = await res.json();
    return json as { result: any; report: any; judge?: any; cost?: any };
  } finally {
    clearTimeout(timer);
  }
}
