'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme-context'

interface RichTextEditorMinimalProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
  onFocus?: () => void
  onBlur?: () => void
}

/**
 * Clean, minimal rich text editor without AI toolbars
 * Works with global floating toolbar for better UX
 */
export function RichTextEditorMinimal({ 
  content, 
  onChange, 
  placeholder = 'Start typing...',
  className,
  minHeight = '100px',
  onFocus,
  onBlur
}: RichTextEditorMinimalProps) {
  const [isFocused, setIsFocused] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content])
  
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }
  
  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }
  
  return (
    <div 
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'prose prose-sm max-w-none',
        className
      )}
      style={{
        minHeight,
        borderColor: isFocused ? theme.accent : theme.border,
        backgroundColor: isFocused ? `${theme.card}` : theme.bgSecondary,
        color: theme.text,
        ...(isFocused && { boxShadow: `0 0 0 2px ${theme.accent}40` })
      }}
      data-placeholder={placeholder}
    />
  )
}
