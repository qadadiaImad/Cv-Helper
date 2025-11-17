"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  WandSparkles, 
  Check, 
  Minimize2, 
  Maximize2, 
  Type,
  Lightbulb
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme-context'
import { useSubscription } from '@/hooks/use-subscription'
import { useUpgradeModal } from '@/hooks/use-upgrade-modal'

interface ContextToolbarProps {
  isActive: boolean
  editingFieldType?: 'text' | 'richtext' | 'list' | 'skills' | null
  onAIAction?: (action: 'continue' | 'improve' | 'grammar' | 'shorter' | 'longer' | 'simplify') => void
  disabled?: boolean
}

export function ContextToolbar({ 
  isActive, 
  editingFieldType, 
  onAIAction,
  disabled = false 
}: ContextToolbarProps) {
  const { theme } = useTheme()
  const { canUseAI } = useSubscription()
  const { showUpgradeModal } = useUpgradeModal()

  const handleAIAction = (action: 'continue' | 'improve' | 'grammar' | 'shorter' | 'longer' | 'simplify') => {
    if (!canUseAI()) {
      showUpgradeModal('ai_polish')
      return
    }
    onAIAction?.(action)
  }

  // Show different tools based on field type
  const showRichTextTools = editingFieldType === 'richtext' || editingFieldType === 'text'
  const showListTools = editingFieldType === 'list'
  const showSkillTools = editingFieldType === 'skills'

  return (
    <div 
      className={cn(
        "sticky top-20 z-30 backdrop-blur-xl border-b-2 transition-all duration-300",
        isActive ? "shadow-lg" : "shadow-sm"
      )}
      style={{
        backgroundColor: isActive ? `${theme.bg}f5` : `${theme.bg}e0`,
        borderColor: isActive ? `${theme.accent}60` : `${theme.accent}20`
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - AI Tools */}
          <div className="flex items-center gap-2">
            {!isActive ? (
              // Hint when nothing is being edited
              <div 
                className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg"
                style={{ 
                  color: theme.textSecondary,
                  backgroundColor: `${theme.accent}10`
                }}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Click a text field to use AI tools</span>
              </div>
            ) : (
              // Active AI Tools
              <>
                <span 
                  className="text-xs font-semibold uppercase tracking-wide mr-2"
                  style={{ color: theme.accent }}
                >
                  AI Tools
                </span>

                {showRichTextTools && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAIAction('continue')}
                      disabled={disabled}
                      className="gap-2 border-2"
                      style={{
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Continue
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAIAction('improve')}
                      disabled={disabled}
                      className="gap-2 border-2"
                      style={{
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      <WandSparkles className="h-3.5 w-3.5" />
                      Improve
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAIAction('grammar')}
                      disabled={disabled}
                      className="gap-2 border-2"
                      style={{
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Fix Grammar
                    </Button>

                    <div className="h-6 w-px bg-slate-300 mx-1" />

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAIAction('shorter')}
                      disabled={disabled}
                      className="gap-2"
                    >
                      <Minimize2 className="h-3.5 w-3.5" />
                      Shorter
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAIAction('longer')}
                      disabled={disabled}
                      className="gap-2"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      Longer
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAIAction('simplify')}
                      disabled={disabled}
                      className="gap-2"
                    >
                      <Type className="h-3.5 w-3.5" />
                      Simplify
                    </Button>
                  </>
                )}

                {showListTools && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAIAction('improve')}
                      disabled={disabled}
                      className="gap-2 border-2"
                      style={{
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      <WandSparkles className="h-3.5 w-3.5" />
                      Improve Bullet
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAIAction('continue')}
                      disabled={disabled}
                      className="gap-2 border-2"
                      style={{
                        borderColor: `${theme.accent}40`,
                        color: theme.accent
                      }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Add More
                    </Button>
                  </>
                )}

                {showSkillTools && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAIAction('improve')}
                    disabled={disabled}
                    className="gap-2 border-2"
                    style={{
                      borderColor: `${theme.accent}40`,
                      color: theme.accent
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Suggest Related Skills
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Right Side - Status/Info */}
          {isActive && (
            <div 
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                backgroundColor: `${theme.accent}20`,
                color: theme.accent
              }}
            >
              Editing: {editingFieldType === 'richtext' ? 'Rich Text' : 
                       editingFieldType === 'list' ? 'List' : 
                       editingFieldType === 'skills' ? 'Skills' : 'Text'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
