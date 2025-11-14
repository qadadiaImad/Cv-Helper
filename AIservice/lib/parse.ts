/**
 * Extraction helpers for CV text
 * - extractTextFromImagesWithVision: uses OpenAI Vision on image data URLs
 * - normalizeText: minimal normalization for consistent downstream processing
 */

import { getConfiguredModel } from '@/AIservice/config/models';

/**
 * Uses Vision model to extract text from an array of image data URLs (png/jpeg/webp/gif)
 * Provider is OpenRouter if enabled, else OpenAI.
 * @param imagesDataUrls Array of data URLs like `data:image/png;base64,...`
 */
export async function extractTextFromImagesWithVision(imagesDataUrls: string[]): Promise<{ text: string; usage?: any; model: string }> {
  if (!imagesDataUrls || imagesDataUrls.length === 0) {
    throw new Error('Aucune image fournie pour l\'extraction');
  }

  try {
    const OpenAI = (await import('openai')).default;
    const apiKey = process.env.OPENROUTER_KEY_VISION;
    if (!apiKey) throw new Error('OPENROUTER_KEY_VISION missing');
    const model = getConfiguredModel('vision') || 'gpt-4o-mini';
    const openaiVision = new OpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.OPENROUTER_HTTP_REFERER || 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_APP_TITLE || 'QuickCV',
      },
    });

    // Prompt spécialisé pour l'extraction de CV
    const visionPrompt = `Tu es un expert en extraction de données de CV.\n\nAnalyse ces images de CV et extrait TOUT le texte qu'elles contiennent de manière structurée et lisible.\n\nINSTRUCTIONS :\n1. Extrait TOUT le texte visible de toutes les pages\n2. Préserve la structure logique (sections, listes, etc.)\n3. Organise le contenu de manière cohérente\n4. Corrige les erreurs OCR évidentes\n5. Sépare clairement les différentes sections\n6. Combine le contenu de toutes les pages en un seul texte cohérent\n\nSTRUCTURE ATTENDUE :\n- Informations personnelles (nom, contact, liens)\n- Résumé/Objectif professionnel (si présent)\n- Expériences professionnelles (chronologique)\n- Formation/Éducation\n- Compétences techniques\n- Projets (si présents)\n- Autres sections pertinentes\n\nRetourne UNIQUEMENT le texte extrait, bien structuré et lisible.`;

    // Préparer le contenu pour Vision
    const imageContents = imagesDataUrls.map((dataUrl) => ({
      type: 'image_url' as const,
      image_url: { url: dataUrl, detail: 'high' as const },
    }));

    const response = await openaiVision.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: visionPrompt },
            ...imageContents,
          ],
        },
      ],
      max_tokens: 4000,
      temperature: 0.1,
    });

    const extractedText = response.choices[0]?.message?.content ?? '';
    if (!extractedText.trim()) {
      throw new Error('VISION_NO_TEXT');
    }
    return { text: normalizeText(extractedText), usage: (response as any)?.usage, model };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg === 'VISION_NO_TEXT') {
      throw new Error('Impossible d\'extraire du texte avec Vision (aucun contenu détecté).');
    }
    if (msg?.includes('OPENROUTER_KEY_VISION missing')) {
      throw new Error('Clé API OpenRouter Vision manquante.');
    }
    if (msg?.toLowerCase().includes('image') && msg.toLowerCase().includes('not')) {
      // Typical error when model isn't multimodal on OpenRouter
      throw new Error('Le modèle Vision sélectionné ne supporte pas les images (multimodal). Choisissez un modèle multimodal ou désactivez OpenRouter pour Vision.');
    }
    if (msg?.includes('unsupported image')) {
      throw new Error('Format d\'image non supporté par Vision. Utilisez PNG/JPEG/WebP/GIF.');
    }
    throw new Error(`Erreur Vision: ${msg}`);
  }
}

/**
 * Normalise un texte brut : puces, espaces, sauts de ligne
 */
export function normalizeText(text: string): string {
  let t = text || '';
  // Puces → tirets
  t = t.replace(/[•·‣⁃]/g, '-');
  // Retours à la ligne Windows → \n
  t = t.replace(/\r\n?/g, '\n');
  // Espaces multiples → un espace
  t = t.replace(/[ \t]{2,}/g, ' ');
  // Sauts de ligne > 2 → 2
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.trim();
}
