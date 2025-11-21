'use client'

import { useState } from 'react'
import { ATSReport } from '../lib/types'
import { ATSReportViewer } from '../components/ATSReportViewer'
import { FileUploader } from '../components/FileUploader'

export default function ATSPlaygroundPage() {
  const [report, setReport] = useState<ATSReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setError(null)
    
    try {
      // Step 1: Parse CV with Parse CV service
      const formData = new FormData()
      
      // Extract text from PDF
      const text = await extractTextFromPDF(file)
      formData.append('cv_text', text)
      formData.append('only_clean', 'true')
      
      const parseResponse = await fetch('/api/adapt', {
        method: 'POST',
        body: formData
      })
      
      if (!parseResponse.ok) {
        throw new Error('Failed to parse CV')
      }
      
      const parseResult = await parseResponse.json()
      
      // Step 2: Run ATS analysis
      const atsInput = {
        resume_text: text,
        file_type: file.name.split('.').pop() || 'pdf',
        file_size_kb: file.size / 1024,
        candidate_name: parseResult.clean?.header?.fullName || null,
        job_title_target: null,
        job_description: null,
        parse_coverage_ratio: 0.9,
        available_templates: [
          'Clean One-Column',
          'Modern Two-Tone',
          'Professional Classic',
          'Tech Minimal'
        ],
        parsed_cv: parseResult.clean,
        extra_metadata: {
          sections: {
            experience: parseResult.clean?.experience ? 'Present' : null,
            education: parseResult.clean?.education ? 'Present' : null,
            skills: parseResult.clean?.skills ? 'Present' : null,
            summary: parseResult.clean?.summary ? 'Present' : null
          },
          word_count: text.split(/\s+/).length,
          bullet_count: (text.match(/^[-•*]/gm) || []).length
        }
      }
      
      const atsResponse = await fetch('/api/ats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atsInput)
      })
      
      if (!atsResponse.ok) {
        throw new Error('ATS analysis failed')
      }
      
      const atsResult = await atsResponse.json()
      setReport(atsResult.report)
      
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <header style={{ background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            ATS Analysis Playground
          </h1>
          <p style={{ color: '#6b7280' }}>
            Upload your resume to get instant ATS feedback
          </p>
        </div>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {!report && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <FileUploader
              onFileUpload={handleFileUpload}
              loading={loading}
              error={error}
            />
          </div>
        )}
        
        {report && (
          <div style={{ padding: '2rem', background: '#fff', borderRadius: '8px' }}>
            <button 
              onClick={() => { setReport(null); setError(null); }}
              style={{ 
                padding: '0.5rem 1rem', 
                background: '#3b82f6', 
                color: '#fff', 
                borderRadius: '6px',
                marginBottom: '1rem'
              }}
            >
              ← Analyze Another Resume
            </button>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>ATS Report</h2>
            <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '6px', overflow: 'auto' }}>
              {JSON.stringify(report, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  )
}

// Helper function to extract text from PDF
async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const pdfjsLib = await import('pdfjs-dist')
  
  // Set worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
  
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items.map((item: any) => item.str).join(' ')
    text += pageText + '\n'
  }
  
  return text
}
