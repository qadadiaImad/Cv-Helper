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
}

export function InlineEditableField({
  value,
  onChange,
  className,
  style,
  placeholder = 'Click to edit...',
  multiline = false,
  disabled = false
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true)
      setTempValue(value)
    }
  }

  const handleSave = () => {
    onChange(tempValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
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
    const InputComponent = multiline ? 'textarea' : 'input'
    
    return (
      <div className="relative inline-block w-full">
        <InputComponent
          ref={inputRef as any}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full px-2 py-1 border-2 border-blue-500 rounded bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300",
            multiline && "min-h-[60px] resize-y",
            className
          )}
          style={style}
          placeholder={placeholder}
          rows={multiline ? 3 : undefined}
        />
        <div className="absolute -bottom-8 left-0 flex gap-2 text-xs">
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
        </div>
      </div>
    )
  }

  return (
    <span
      onClick={handleClick}
      className={cn(
        "cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 rounded px-1 transition-all duration-200",
        !value && "text-gray-400 italic",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      style={style}
    >
      {value || placeholder}
    </span>
  )
}
