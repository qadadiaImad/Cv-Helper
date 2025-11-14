/**
 * AIservice - Unified AI functionality export
 * All AI-powered features for CV processing should be imported from here
 */

// ============================================================================
// PDF/Document Parsing & Extraction
// ============================================================================
export { 
  extractTextFromImagesWithVision, 
  normalizeText 
} from './lib/parse'

/**
 * Server-side document parsing (PDF/DOCX/TXT)
 * Uses pdf-parse and mammoth for text extraction
 */
export async function parseDocument(file: File): Promise<{ text: string; metadata?: any }> {
  const buffer = Buffer.from(await file.arrayBuffer())
  
  switch (file.type) {
    case 'application/pdf': {
      // Use pdf-parse for PDFs - dynamic import with proper handling
      const pdfParseModule: any = await import('pdf-parse')
      // Handle both default and named exports
      const pdfParse = pdfParseModule.default || pdfParseModule
      
      // If it's still not a function, try accessing it as a property
      const parseFn = typeof pdfParse === 'function' ? pdfParse : (pdfParse as any).default
      
      if (typeof parseFn !== 'function') {
        throw new Error('pdf-parse module did not export a function')
      }
      
      const data = await parseFn(buffer)
      return {
        text: data.text,
        metadata: {
          title: data.info?.Title,
          author: data.info?.Author,
          pages: data.numpages,
          wordCount: data.text.split(/\s+/).length
        }
      }
    }
    
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword': {
      // Use mammoth for DOCX
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      return {
        text: result.value,
        metadata: {
          wordCount: result.value.split(/\s+/).length
        }
      }
    }
    
    case 'text/plain': {
      const text = new TextDecoder().decode(buffer)
      return {
        text,
        metadata: {
          wordCount: text.split(/\s+/).length
        }
      }
    }
    
    default:
      throw new Error(`Unsupported file type: ${file.type}`)
  }
}

// ============================================================================
// CV Structuring & Cleaning
// ============================================================================
export { 
  toCleanResume
} from './lib/clean'

export type { 
  CleanResume,
  CleanHeader,
  CleanLink,
  CleanExperience,
  CleanEducation,
  CleanSkills
} from './lib/clean'

export { 
  structureCvTextWithAI 
} from './lib/structure_ai'

// ============================================================================
// Schema & Validation
// ============================================================================
export { 
  sanitizeResumeForSchema 
} from './lib/sanitize'

export { 
  ResumeJSON
} from './lib/schema'

export type { 
  TResumeJSON,
  TResumeJSON as ResumeJSONType 
} from './lib/schema'

// ============================================================================
// CV Adaptation & Optimization
// ============================================================================
export { 
  computeResumeDiff, 
  buildNarrativeFromDiff 
} from './lib/diff'

export { 
  SYSTEM_PROMPT 
} from './lib/prompt'

// ============================================================================
// Model Configuration
// ============================================================================
export { 
  isOpenRouterEnabled, 
  getConfiguredModel, 
  getPricingForModel, 
  getDefaultPricing, 
  isJudgeEnabled, 
  getJudgeModel 
} from './config/models'

// ============================================================================
// HR & ATS Optimization
// ============================================================================
export { 
  getVerbs, 
  filterForATS, 
  ACTION_VERB_CATEGORIES 
} from './src/hr/actionVerbs'

// ============================================================================
// Orchestration & Fallback
// ============================================================================
export { 
  callWithFallbackChat,
  ARB_MODELS 
} from './Integration/orchestrator'

// ============================================================================
// Client-side Utilities (for frontend use)
// ============================================================================

/**
 * Extract text from PDF file using pdfjs-dist (client-side)
 * @param file - PDF File object
 * @returns Extracted text or empty string if failed
 */
export async function extractTextFromPdfClient(file: File): Promise<string> {
  try {
    const pdfjsLib: any = await import('pdfjs-dist')
    
    // Configure worker
    try {
      const ver = (pdfjsLib as any).version || '4.10.38'
      ;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = 
        `https://unpkg.com/pdfjs-dist@${ver}/build/pdf.worker.min.mjs`
    } catch {}

    const arrayBuffer = await file.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)
    
    let pdf: any
    try {
      pdf = await pdfjsLib.getDocument({ data: uint8 }).promise
    } catch (err) {
      console.warn('pdf.js worker failed, falling back to disableWorker.', err)
      pdf = await pdfjsLib.getDocument({ data: uint8, disableWorker: true }).promise
    }

    const maxPages = Math.min(pdf.numPages, 6)
    let fullText = ''
    
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = (textContent.items || [])
        .map((it: any) => (it && it.str ? String(it.str) : ''))
        .join(' ')
      
      if (pageText.trim()) {
        fullText += (fullText ? '\n\n' : '') + pageText.trim()
      }
    }
    
    return fullText.trim()
  } catch (e) {
    console.warn('Client PDF extract failed:', e)
    return ''
  }
}

/**
 * Convert PDF pages to images (client-side)
 * @param file - PDF File object
 * @param maxPages - Maximum number of pages to convert (default: 3)
 * @returns Array of image data URLs
 */
export async function convertPdfToImages(file: File, maxPages: number = 3): Promise<string[]> {
  try {
    const pdfjsLib: any = await import('pdfjs-dist')
    
    // Configure worker
    try {
      const ver = (pdfjsLib as any).version || '4.10.38'
      ;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = 
        `https://unpkg.com/pdfjs-dist@${ver}/build/pdf.worker.min.mjs`
    } catch {}

    const arrayBuffer = await file.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)
    
    let pdf: any
    try {
      pdf = await pdfjsLib.getDocument({ data: uint8 }).promise
    } catch (err) {
      pdf = await pdfjsLib.getDocument({ data: uint8, disableWorker: true }).promise
    }

    const images: string[] = []
    const pages = Math.min(pdf.numPages, maxPages)
    
    for (let i = 1; i <= pages; i++) {
      try {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) continue
        
        canvas.width = Math.max(1, Math.floor(viewport.width))
        canvas.height = Math.max(1, Math.floor(viewport.height))
        
        const renderTask = page.render({ canvasContext: ctx, viewport })
        await renderTask.promise
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        if (dataUrl && dataUrl.startsWith('data:image/')) {
          images.push(dataUrl)
        }
      } catch (perPageErr) {
        console.warn('Error rendering PDF page to image, page', i, perPageErr)
        continue
      }
    }
    
    return images
  } catch (e) {
    console.warn('PDF to images conversion failed:', e)
    return []
  }
}

/**
 * Complete PDF import pipeline (client-side)
 * Attempts text extraction first, falls back to Vision OCR if text is insufficient
 * 
 * @param file - PDF File object
 * @param minTextLength - Minimum text length to consider extraction successful (default: 100)
 * @returns Object with extracted text and metadata
 */
export async function importPdfComplete(
  file: File, 
  minTextLength: number = 100
): Promise<{
  text: string
  source: 'text-extraction' | 'vision-ocr'
  usage?: any
  model?: string
}> {
  // Step 1: Try text extraction
  const extractedText = await extractTextFromPdfClient(file)
  
  if (extractedText && extractedText.length >= minTextLength) {
    return {
      text: extractedText,
      source: 'text-extraction'
    }
  }
  
  // Step 2: Fallback to Vision OCR
  console.log('[AIservice] Text extraction insufficient, using Vision OCR')
  const images = await convertPdfToImages(file, 3)
  
  if (images.length === 0) {
    throw new Error('Failed to extract text or convert PDF to images')
  }
  
  const { extractTextFromImagesWithVision } = await import('./lib/parse')
  const visionResult = await extractTextFromImagesWithVision(images)
  
  return {
    text: visionResult.text,
    source: 'vision-ocr',
    usage: visionResult.usage,
    model: visionResult.model
  }
}
