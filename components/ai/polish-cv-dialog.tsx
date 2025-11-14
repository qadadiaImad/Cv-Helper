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
import { Label } from '@/components/ui/label'
import { Wand2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface PolishCVDialogProps {
  cvId: string
  cvData: any
  onPolishSuccess?: (cvData: any) => void
}

export function PolishCVDialog({ cvId, cvData, onPolishSuccess }: PolishCVDialogProps) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'professional' | 'concise' | 'impactful'>('professional')
  const [loading, setLoading] = useState(false)

  const handlePolish = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/ai/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvId,
          cvData,
          mode,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to polish CV')
      }

      toast.success('CV polished successfully!', {
        description: `Your CV has been improved with ${mode} mode.`,
      })

      if (onPolishSuccess) {
        onPolishSuccess(data.cv)
      }

      setOpen(false)
    } catch (error: any) {
      console.error('Polish error:', error)
      toast.error('Failed to polish CV', {
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
          <Wand2 className="h-4 w-4" />
          AI Polish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Polish Your CV with AI
          </DialogTitle>
          <DialogDescription>
            Improve your CV's language, clarity, and impact without changing facts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Polish Mode</Label>
            <div className="space-y-2">
              <label className="flex items-start space-x-3 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="polish-mode"
                  value="professional"
                  checked={mode === 'professional'}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
                />
                <div className="space-y-1 leading-none flex-1">
                  <div className="font-medium">Professional</div>
                  <p className="text-sm text-muted-foreground">
                    Improve grammar, clarity, and professional tone. Best for general improvement.
                  </p>
                </div>
              </label>

              <label className="flex items-start space-x-3 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="polish-mode"
                  value="concise"
                  checked={mode === 'concise'}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
                />
                <div className="space-y-1 leading-none flex-1">
                  <div className="font-medium">Concise</div>
                  <p className="text-sm text-muted-foreground">
                    Make it shorter and more focused. Remove redundancy, combine similar points.
                  </p>
                </div>
              </label>

              <label className="flex items-start space-x-3 rounded-md border p-4 cursor-pointer hover:bg-slate-50">
                <input
                  type="radio"
                  name="polish-mode"
                  value="impactful"
                  checked={mode === 'impactful'}
                  onChange={(e) => setMode(e.target.value as any)}
                  className="mt-1 h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
                />
                <div className="space-y-1 leading-none flex-1">
                  <div className="font-medium">Impactful</div>
                  <p className="text-sm text-muted-foreground">
                    Maximize impact with strong action verbs and achievement-focused language.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
            <p className="font-medium">What we'll preserve:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>All factual information (dates, companies, achievements)</li>
              <li>Original language (won't translate)</li>
              <li>Your unique experience and accomplishments</li>
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
            onClick={handlePolish}
            disabled={loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            <Wand2 className="h-4 w-4" />
            Polish CV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
