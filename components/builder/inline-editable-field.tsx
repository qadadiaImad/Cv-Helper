"use client"

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { MonthYearPicker } from './month-year-picker'

interface InlineEditableFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  multiline?: boolean
  disabled?: boolean
  isDate?: boolean // New prop to indicate this is a date field
}

export function InlineEditableField({
  value,
  onChange,
  className,
  style,
  placeholder = 'Click to edit...',
  multiline = false,
  disabled = false,
  isDate = false
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync tempValue when value prop changes (important for external updates)
  useEffect(() => {
    if (!isEditing) {
      setTempValue(value)
    }
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
      
      // Calculate button position
      const rect = inputRef.current.getBoundingClientRect()
      setButtonPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX
      })
    }
  }, [isEditing])

  const handleClick = () => {
    if (!disabled) {
      if (isDate) {
        setShowDatePicker(true)
      } else {
        setIsEditing(true)
        setTempValue(value)
      }
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

  const handleBlur = (e: React.FocusEvent) => {
    // Don't auto-save if clicking on buttons
    // Check if the related target is one of our buttons
    const relatedTarget = e.relatedTarget as HTMLElement
    if (relatedTarget && relatedTarget.closest('.inline-edit-buttons')) {
      return
    }
    
    // Auto-save after a delay
    setTimeout(() => {
      if (isEditing) {
        handleSave()
      }
    }, 200)
  }

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input'
    
    const buttons = mounted ? createPortal(
      <div 
        className="inline-edit-buttons fixed z-[9999] flex gap-2 text-xs"
        style={{
          top: `${buttonPosition.top}px`,
          left: `${buttonPosition.left}px`
        }}
      >
        <button
          onMouseDown={(e) => e.preventDefault()} // Prevent blur
          onClick={handleSave}
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-lg"
        >
          ✓ Save
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()} // Prevent blur
          onClick={handleCancel}
          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 shadow-lg"
        >
          ✕ Cancel
        </button>
      </div>,
      document.body
    ) : null
    
    return (
      <>
        <InputComponent
          ref={inputRef as any}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={cn(
            "w-full px-2 py-1 border-2 border-blue-500 rounded bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300",
            multiline && "min-h-[60px] resize-y",
            className
          )}
          style={style}
          placeholder={placeholder}
          rows={multiline ? 3 : undefined}
        />
        {buttons}
      </>
    )
  }

  // Render date picker
  if (showDatePicker) {
    return (
      <>
        <span
          className={cn(
            "cursor-pointer bg-blue-50 outline outline-2 outline-blue-500 rounded px-1",
            className
          )}
          style={style}
        >
          {value || placeholder}
        </span>
        <MonthYearPicker
          value={value}
          onChange={(newValue) => {
            onChange(newValue)
            setShowDatePicker(false)
          }}
          onClose={() => setShowDatePicker(false)}
        />
      </>
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
