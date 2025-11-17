'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Sparkles, Wand2, CheckCheck, Minimize2, Maximize2, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDevTools } from '@/lib/dev-context'
import { useTheme } from '@/lib/theme-context'
import type { AIOperation } from '@/lib/ai-dev-tools'
import type { UniversalResumeData } from '@/lib/schemas'
import type { AITextOption } from '@/lib/ai-response-schema'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
  enableAI?: boolean
  resumeContext?: UniversalResumeData
  section?: string  // e.g., 'summary', 'experience', 'skills'
}

const AI_COMMANDS = [
  { value: 'continue', label: 'Continue', icon: Sparkles },
  { value: 'improve', label: 'Improve', icon: Wand2 },
  { value: 'fix', label: 'Fix Grammar', icon: CheckCheck },
  { value: 'shorter', label: 'Shorter', icon: Minimize2 },
  { value: 'longer', label: 'Longer', icon: Maximize2 },
  { value: 'simplify', label: 'Simplify', icon: FileText },
]

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start typing...',
  className,
  minHeight = '200px',
  enableAI = false,
  resumeContext,
  section = 'summary'
}: RichTextEditorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiOptions, setAiOptions] = useState<AITextOption[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const devTools = useDevTools()
  const { theme } = useTheme()
  
  // Build context summary from resume data
  const buildContextSummary = (): string => {
    if (!resumeContext) return ''
    
    const parts: string[] = []
    
    // Personal info
    if (resumeContext.personal?.fullName) {
      parts.push(`Name: ${resumeContext.personal.fullName}`)
    }
    if (resumeContext.personal?.title) {
      parts.push(`Title: ${resumeContext.personal.title}`)
    }
    
    // Experience
    if (resumeContext.experience && resumeContext.experience.length > 0) {
      const exp = resumeContext.experience.slice(0, 2).map(e => 
        `${e.position} at ${e.company} (${e.startDate} - ${e.endDate || 'Present'})`
      ).join('; ')
      parts.push(`Experience: ${exp}`)
    }
    
    // Skills
    if (resumeContext.skills && resumeContext.skills.length > 0) {
      const skills = resumeContext.skills.slice(0, 10).join(', ')
      parts.push(`Skills: ${skills}`)
    }
    
    // Education
    if (resumeContext.education && resumeContext.education.length > 0) {
      const edu = resumeContext.education[0]
      parts.push(`Education: ${edu.degree} in ${edu.field} from ${edu.institution}`)
    }
    
    return parts.join('\n')
  }

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered'}, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean']
    ],
  }), [])

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'align',
    'link'
  ]

  const handleAICommand = async (command: string) => {
    if (isGenerating) return

    // Extract plain text from HTML
    const plainText = content.replace(/<[^>]*>/g, '').trim()
    
    if (!plainText) {
      alert('Please write some text first')
      return
    }

    setIsGenerating(true)
    try {
      const contextSummary = buildContextSummary()
      
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: plainText,
          option: command,
          model: devTools.isEnabled ? devTools.selectedModel : undefined,
          context: contextSummary,
          section: section,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'AI generation failed')
      }

      const { options, metadata, reasoning } = await response.json()
      
      // Track operation in dev tools
      if (devTools.isEnabled && metadata) {
        const operation: AIOperation = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          operation: command,
          model: metadata.model,
          promptTokens: metadata.promptTokens,
          completionTokens: metadata.completionTokens,
          totalTokens: metadata.totalTokens,
          cost: metadata.cost,
          costBreakdown: metadata.costBreakdown,
          systemPrompt: metadata.systemPrompt,
          userPrompt: metadata.userPrompt,
          responseText: JSON.stringify({ options, reasoning }, null, 2),
        }
        devTools.addOperation(operation)
      }
      
      // Handle response based on number of options
      if (options && options.length > 1) {
        // Show selection modal
        setAiOptions(options)
        setShowOptions(true)
      } else if (options && options.length === 1) {
        // Apply single option directly
        onChange(options[0].text)
      }
    } catch (error: any) {
      console.error('AI error:', error)
      alert(error.message || 'AI generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {enableAI && (
        <div 
          className="flex items-center gap-2 flex-wrap p-3 rounded-lg border"
          style={{
            backgroundColor: theme.bgSecondary,
            borderColor: theme.border
          }}
        >
          <span 
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: theme.textSecondary }}
          >
            ✨ AI Tools:
          </span>
          {AI_COMMANDS.map((cmd) => {
            const Icon = cmd.icon
            return (
              <Button
                key={cmd.value}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAICommand(cmd.value)}
                disabled={isGenerating}
                className="h-7 text-xs font-medium transition-all hover:scale-105"
                style={{
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.card
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent
                  e.currentTarget.style.color = theme.accent
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border
                  e.currentTarget.style.color = theme.text
                }}
              >
                <Icon className="h-3 w-3 mr-1" />
                {cmd.label}
              </Button>
            )
          })}
          {isGenerating && (
            <span 
              className="text-xs font-medium animate-pulse flex items-center gap-1"
              style={{ color: theme.accent }}
            >
              <Sparkles className="h-3 w-3" />
              Generating...
            </span>
          )}
        </div>
      )}

      {/* AI Options Selector - Theme-aware */}
      {showOptions && aiOptions.length > 0 && (
        <div 
          className="rounded-xl p-5 space-y-4 shadow-lg border-2 transition-all"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.accent,
            boxShadow: `0 4px 20px ${theme.accent}20`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" style={{ color: theme.accent }} />
              <h4 className="font-bold text-base" style={{ color: theme.text }}>
                Choose Your Preferred Version
              </h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOptions(false)}
              className="h-8 text-xs hover:bg-opacity-10"
              style={{ color: theme.textSecondary }}
            >
              Cancel
            </Button>
          </div>
          
          <div className="space-y-3">
            {aiOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option.text)
                  setShowOptions(false)
                  setAiOptions([])
                }}
                className="w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md group"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.border,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent
                  e.currentTarget.style.backgroundColor = theme.bgSecondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border
                  e.currentTarget.style.backgroundColor = theme.bg
                }}
              >
                {option.label && (
                  <div 
                    className="text-xs font-bold mb-2 uppercase tracking-wide flex items-center gap-1"
                    style={{ color: theme.accent }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                    {option.label}
                  </div>
                )}
                <div 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.text }}
                  dangerouslySetInnerHTML={{ __html: option.text }} 
                />
              </button>
            ))}
          </div>
          
          <div 
            className="text-xs text-center pt-2 border-t"
            style={{ 
              color: theme.textSecondary,
              borderColor: theme.border
            }}
          >
            Click any option to apply it to your resume
          </div>
        </div>
      )}
      
      <div className="border border-input rounded-md overflow-hidden bg-background">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{ minHeight }}
          className="quill-editor"
        />
      </div>
    </div>
  )
}
