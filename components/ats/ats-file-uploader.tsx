'use client'

import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'

interface ATSFileUploaderProps {
  onFileUpload: (file: File) => void
  loading: boolean
  error: string | null
}

export function ATSFileUploader({ onFileUpload, loading, error }: ATSFileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }
    
    onFileUpload(file)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className={`relative transition-all duration-200 rounded-xl border-2 border-dashed border-primary/40 p-16 ${
          dragActive ? 'bg-primary/5 border-primary/60' : ''
        } ${loading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragActive(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0])
          }
        }}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={loading}
        />

        <label
          htmlFor="file-upload"
          className="flex cursor-pointer flex-col items-center justify-center text-center"
        >
              {loading ? (
                <>
                  <div className="mb-4 size-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-lg font-semibold">Analyzing your resume...</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This may take a few seconds
                  </p>
                </>
              ) : (
                <>
                  <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-primary/10">
                    <Upload className="size-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Drop your resume here</h3>
                  <p className="mt-2 text-muted-foreground">or click to browse</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="size-4" />
                    <span>Supports PDF and DOCX files up to 10MB</span>
                  </div>
                </>
              )}
        </label>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border-2 border-destructive p-6">
          <h3 className="text-lg font-semibold text-destructive">Error</h3>
          <p className="mt-2 text-sm text-destructive/80">{error}</p>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-primary/20 p-6 text-center">
          <div className="text-3xl font-bold text-primary">✨</div>
          <p className="mt-2 text-sm font-medium">Instant Feedback</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Get ATS compatibility analysis in seconds
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 p-6 text-center">
          <div className="text-3xl font-bold text-primary">📊</div>
          <p className="mt-2 text-sm font-medium">12 Dimensions</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Comprehensive analysis across all key areas
          </p>
        </div>

        <div className="rounded-xl border border-primary/20 p-6 text-center">
          <div className="text-3xl font-bold text-primary">💡</div>
          <p className="mt-2 text-sm font-medium">Actionable Tips</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Concrete recommendations to improve your score
          </p>
        </div>
      </div>
    </div>
  )
}
