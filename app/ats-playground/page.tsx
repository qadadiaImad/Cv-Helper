'use client'

import { useState } from 'react'
import { ATSScorePanel } from '../../components/ats/ats-score-panel-new'
import { ATSReportSections } from '../../components/ats/ats-report-sections'
import { ATSFileUploader } from '../../components/ats/ats-file-uploader'
import type { ATSReport } from '../../lib/ats-types'

export default function ATSPlaygroundPage() {
  const [report, setReport] = useState<ATSReport | null>(null)
  const [parsedCV, setParsedCV] = useState<any>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showJson, setShowJson] = useState(false)

  async function handleFileUpload(file: File) {
    setLoading(true)
    setError(null)
    setPdfFile(file) // Store the PDF file
    
    try {
      console.log('[ATS Playground] Starting upload:', file.name, file.type, file.size)
      
      // Step 1: Extract text from PDF using CDN-based extractor (same as dashboard)
      console.log('[ATS Playground] Extracting text from PDF...')
      const { extractTextFromPDF } = await import('@/lib/utils/pdf-extractor')
      const text = await extractTextFromPDF(file)
      console.log('[ATS Playground] Text extracted:', text.length, 'characters')
      
      if (!text || text.length < 50) {
        throw new Error('Could not extract enough text from PDF')
      }
      
      // Step 2: Parse CV with AI (using aiParseCvWithService)
      console.log('[ATS Playground] Parsing CV with AI...')
      const { aiParseCvWithService } = await import('@/lib/services/ai.service')
      
      const parseResult = await aiParseCvWithService({
        cv_text: text,
        timeoutMs: 60000
      })
      
      console.log('[ATS Playground] CV parsed successfully!')
      
      // Store parsed CV for debug
      setParsedCV(parseResult.clean)
      
      // Step 3: Send parsed CV for ATS analysis
      console.log('[ATS Playground] Running ATS analysis...')
      const response = await fetch('/api/ats-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parsedCV: parseResult.clean,
          fileName: file.name,
          fileSize: file.size
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('[ATS Playground] ATS analysis error:', errorData)
        throw new Error(errorData.message || errorData.error || 'ATS analysis failed')
      }
      
      const result = await response.json()
      console.log('[ATS Playground] ✅ Analysis complete!')
      setReport(result.report)
      
    } catch (err) {
      console.error('[ATS Playground] ❌ Error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setReport(null)
    setParsedCV(null)
    setPdfFile(null)
    setError(null)
    setShowJson(false)
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            ATS Analysis Playground
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Upload your resume to get instant ATS compatibility feedback
          </p>
        </div>

        {/* Debug JSON Viewer - Parsed CV */}
        {parsedCV && (
          <div className="mb-6">
            <button
              onClick={() => setShowJson(!showJson)}
              className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
            >
              {showJson ? '🔽 Hide' : '▶️ Show'} CV JSON (Parsed by AI)
            </button>
            {showJson && (
              <div className="mt-3 rounded-lg border-2 border-border bg-secondary/30 p-4 max-h-96 overflow-auto">
                <pre className="text-xs text-foreground whitespace-pre-wrap">
                  {JSON.stringify(parsedCV, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {!report ? (
          <ATSFileUploader 
            onFileUpload={handleFileUpload} 
            loading={loading} 
            error={error} 
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Left Panel - Fixed on desktop */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <ATSScorePanel report={report} onReset={handleReset} />
            </div>

            {/* Central Content - Scrollable */}
            <div>
              <ATSReportSections 
                report={report} 
                pdfFile={pdfFile || undefined}
                parsedData={parsedCV}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

