/**
 * PDF Text Extraction Utility
 * Uses pdfjs-dist loaded from CDN to avoid webpack issues
 * Replicates the approach from AIservice-infcv
 * 
 * IMPORTANT: This is a client-only module. Do not import on server.
 */

'use client'

// Load pdfjs from CDN to avoid webpack issues
async function loadPdfJs() {
  // Check if already loaded
  if ((window as any).pdfjsLib) {
    return (window as any).pdfjsLib
  }

  // Load from CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib
      // Configure worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
      resolve(pdfjsLib)
    }
    script.onerror = () => reject(new Error('Failed to load PDF.js'))
    document.head.appendChild(script)
  })
}

/**
 * Extract text from a PDF file
 * @param file - The PDF file to extract text from
 * @returns Promise<string> - The extracted text content
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Load pdfjs from CDN
    const pdfjsLib = await loadPdfJs()
    
    const arrayBuffer = await file.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)

    // Load PDF
    const loadingTask = pdfjsLib.getDocument({
      data: uint8,
    })
    
    const pdf = await loadingTask.promise

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
    console.error('Client PDF extract failed:', e)
    throw new Error('Failed to extract text from PDF. Please try a different file or format.')
  }
}

/**
 * Check if a file is a PDF based on its type or extension
 * @param file - The file to check
 * @returns boolean - True if the file is a PDF
 */
export function isPDF(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}
