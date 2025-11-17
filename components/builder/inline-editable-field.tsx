"use client"

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface InlineEditableFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  multiline?: boolean
  disabled?: boolean
  isDate?: boolean
  fieldPath?: string // Path to the field (e.g., 'personal.fullName')
  fieldType?: 'text' | 'richtext' | 'list' | 'skills' // Type of field for toolbar context
  onEditStart?: (path: string, type: 'text' | 'richtext' | 'list' | 'skills', position?: { top: number; left: number }) => void
  onEditEnd?: () => void
}

export function InlineEditableField({
  value,
  onChange,
  className,
  style,
  placeholder = 'Click to edit...',
  multiline = false,
  disabled = false,
  isDate = false,
  fieldPath = '',
  fieldType = 'text',
  onEditStart,
  onEditEnd
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const inputRef = useRef<HTMLDivElement>(null)

  // Update tempValue only when value changes AND we're not editing
  useEffect(() => {
    if (!isEditing) {
      setTempValue(value)
    }
  }, [value, isEditing])

  // Debug: Track isEditing changes
  useEffect(() => {
    console.log('[InlineEditableField] isEditing changed to:', isEditing, 'for field:', fieldPath)
  }, [isEditing, fieldPath])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      console.log('[InlineEditableField] Focusing and selecting content')
      // Set initial HTML content
      inputRef.current.innerHTML = tempValue
      inputRef.current.focus()
      // Select all content in contentEditable
      const range = document.createRange()
      range.selectNodeContents(inputRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [isEditing, tempValue])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    if (!disabled && !isEditing) { // Only trigger if not already editing
      console.log('[InlineEditableField] Clicked, setting isEditing to true, current value:', value)
      
      // Notify toolbar BEFORE setting isEditing to avoid re-render issues
      if (onEditStart && fieldPath) {
        const rect = e.currentTarget.getBoundingClientRect()
        const position = {
          top: rect.top + window.scrollY,
          left: rect.left + rect.width / 2
        }
        console.log('[InlineEditableField] Calling onEditStart with:', fieldPath, fieldType, position)
        onEditStart(fieldPath, fieldType, position)
      }
      
      // Set editing state after notifying parent
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    // Get the HTML content directly from the contentEditable div
    const content = inputRef.current?.innerHTML || value
    console.log('[InlineEditableField] Saving content:', content)
    onChange(content)
    setIsEditing(false)
    // Notify toolbar that editing ended
    if (onEditEnd) {
      onEditEnd()
    }
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
    // Notify toolbar that editing ended
    if (onEditEnd) {
      onEditEnd()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    console.log('[InlineEditableField] Rendering edit mode, tempValue:', tempValue)
    
    // Use a key to force re-render when entering edit mode
    return (
      <span className="relative inline-block w-full">
        <div
          key="editing"
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            // Just track the value, don't update state on every keystroke
            // This prevents React from re-rendering and moving the cursor
            const newValue = e.currentTarget.innerHTML
            console.log('[InlineEditableField] onInput, new value:', newValue)
            // Store in ref instead of state to avoid re-renders
            if (inputRef.current) {
              inputRef.current.dataset.currentValue = newValue
            }
          }}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            // Don't save on blur if clicking save/cancel buttons
            const relatedTarget = e.relatedTarget as HTMLElement
            if (!relatedTarget || (!relatedTarget.closest('.edit-controls'))) {
              // Auto-save after a delay
              setTimeout(() => {
                if (isEditing) handleSave()
              }, 100)
            }
          }}
          className={cn(
            "w-full px-2 py-1 border-2 border-blue-500 rounded bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300",
            multiline && "min-h-[60px]",
            className
          )}
          style={{
            whiteSpace: multiline ? 'pre-wrap' : 'nowrap',
            overflowWrap: 'break-word',
            direction: 'ltr',
            textAlign: 'left',
            unicodeBidi: 'bidi-override',
            ...style
          }}
          dir="ltr"
        />
        <span className="absolute -bottom-8 left-0 flex gap-2 text-xs whitespace-nowrap edit-controls">
          <button
            onClick={handleSave}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ✓ Save
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            ✕ Cancel
          </button>
        </span>
      </span>
    )
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        "cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded transition-all duration-200",
        !value && "text-gray-400 italic",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      style={style}
      dangerouslySetInnerHTML={{ __html: value || placeholder }}
    />
  )
}
