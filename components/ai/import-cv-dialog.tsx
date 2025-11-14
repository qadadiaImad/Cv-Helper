'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImportCVDialogProps {
  onImportSuccess?: (cvData: any) => void
}

export function ImportCVDialog({ onImportSuccess }: ImportCVDialogProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('templateId', 'classic')
      formData.append('cvName', file.name.replace(/\.[^/.]+$/, ''))

      const response = await fetch('/api/ai/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to import CV')
      }

      toast.success('CV imported successfully!', {
        description: data.metadata?.warnings?.length 
          ? `Note: ${data.metadata.warnings[0]}` 
          : 'Your CV has been structured and is ready to edit.',
      })

      if (onImportSuccess) {
        onImportSuccess(data.cv)
      }

      setOpen(false)
      setFile(null)
    } catch (error: any) {
      console.error('Import error:', error)
      toast.error('Failed to import CV', {
        description: error.message || 'Please try again or contact support.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import CV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import CV with AI</DialogTitle>
          <DialogDescription>
            Upload your existing CV (PDF or DOCX) and we'll structure it automatically using AI.
          </DialogDescription>
        </DialogHeader>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="cv-file-input"
            className="hidden"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileChange}
          />

          {file ? (
            <div className="space-y-4">
              <FileText className="h-12 w-12 mx-auto text-primary" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Drag and drop your CV here, or
                </p>
                <label htmlFor="cv-file-input">
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('cv-file-input')?.click()
                    }}
                  >
                    browse files
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, DOC, TXT (max 5MB)
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Import with AI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
