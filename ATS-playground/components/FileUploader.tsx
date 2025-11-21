'use client'

import { useState } from 'react'

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  loading: boolean
  error: string | null
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  dropZone: {
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '3rem',
    textAlign: 'center' as const,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dropZoneActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  icon: {
    width: '64px',
    height: '64px',
    margin: '0 auto 1rem',
    color: '#9ca3af',
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '1rem',
  },
  info: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  error: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#991b1b',
    fontSize: '0.875rem',
  },
  features: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center' as const,
  },
}

export function FileUploader({ onFileUpload, loading, error }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  
  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
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
    <div style={styles.container}>
      <div
        style={{
          ...styles.dropZone,
          ...(dragActive ? styles.dropZoneActive : {}),
          opacity: loading ? 0.5 : 1,
          pointerEvents: loading ? 'none' : 'auto',
        }}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={loading}
        />
        
        <svg
          style={styles.icon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <div style={styles.title}>
          {loading ? 'Analyzing your resume...' : 'Drop your resume here'}
        </div>
        <div style={styles.subtitle}>
          or click to browse
        </div>
        <div style={styles.info}>
          Supports PDF and DOCX files up to 10MB
        </div>
      </div>
      
      {error && (
        <div style={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div style={styles.features}>
        <p>✨ Get instant feedback on your resume's ATS compatibility</p>
        <p>📊 See detailed scores across 12 dimensions</p>
        <p>💡 Receive actionable recommendations to improve</p>
      </div>
    </div>
  )
}
