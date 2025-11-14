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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Briefcase, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface AdaptToJobDialogProps {
  cvId: string
  cvData: any
  onAdaptSuccess?: (cvData: any) => void
}

export function AdaptToJobDialog({ cvId, cvData, onAdaptSuccess }: AdaptToJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [createNew, setCreateNew] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleAdapt = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/ai/adapt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvId,
          cvData,
          jobDescription: jobDescription.trim(),
          createNew,
          cvName: createNew ? `CV - Adapted to Job` : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to adapt CV')
      }

      toast.success('CV adapted successfully!', {
        description: createNew 
          ? 'A new adapted CV has been created.' 
          : 'Your CV has been updated with job-specific improvements.',
      })

      if (onAdaptSuccess) {
        onAdaptSuccess(data.cv)
      }

      setOpen(false)
      setJobDescription('')
    } catch (error: any) {
      console.error('Adapt error:', error)
      toast.error('Failed to adapt CV', {
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
          <Briefcase className="h-4 w-4" />
          Adapt to Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Adapt CV to Job Description
          </DialogTitle>
          <DialogDescription>
            Paste the job description below and we'll tailor your CV to highlight relevant experience and skills.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Paste the full job description here...

Example:
We're looking for a Senior Software Engineer with 5+ years of experience in React, TypeScript, and Node.js. You'll lead a team of developers and work on our flagship product..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
              className="resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {jobDescription.length} characters
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="create-new"
              checked={createNew}
              onChange={(e) => setCreateNew(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
            />
            <label
              htmlFor="create-new"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Create a new adapted CV (recommended)
            </label>
          </div>

          <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
            <p className="font-medium">What we'll do:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Highlight relevant experience and skills</li>
              <li>Use keywords from the job description</li>
              <li>Reorder bullets to emphasize matching achievements</li>
              <li>Preserve all factual information (no invention)</li>
            </ul>
          </div>
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
            onClick={handleAdapt}
            disabled={!jobDescription.trim() || loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            <Sparkles className="h-4 w-4" />
            Adapt CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
