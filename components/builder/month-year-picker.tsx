"use client"

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface MonthYearPickerProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
  className?: string
  style?: React.CSSProperties
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export function MonthYearPicker({
  value,
  onChange,
  onClose,
  className,
  style
}: MonthYearPickerProps) {
  const currentYear = new Date().getFullYear()
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<number>(currentYear)
  const [isPresent, setIsPresent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Parse initial value
  useEffect(() => {
    if (value) {
      const lowerValue = value.toLowerCase()
      if (lowerValue === 'present' || lowerValue === 'current') {
        setIsPresent(true)
      } else {
        // Try to parse "Jan 2020" or "January 2020" format
        const parts = value.split(' ')
        if (parts.length >= 2) {
          const monthPart = parts[0]
          const yearPart = parts[parts.length - 1]
          
          // Find month
          const monthIndex = MONTHS.findIndex(m => 
            monthPart.toLowerCase().startsWith(m.toLowerCase())
          )
          if (monthIndex !== -1) {
            setSelectedMonth(MONTHS[monthIndex])
          }
          
          // Parse year
          const year = parseInt(yearPart)
          if (!isNaN(year)) {
            setSelectedYear(year)
          }
        }
      }
    }
  }, [value])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        handleSave()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedMonth, selectedYear, isPresent])

  const handleSave = () => {
    if (isPresent) {
      onChange('Present')
    } else if (selectedMonth) {
      onChange(`${selectedMonth} ${selectedYear}`)
    }
    onClose()
  }

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month)
    setIsPresent(false)
  }

  const handleYearChange = (increment: number) => {
    setSelectedYear(prev => prev + increment)
  }

  const handlePresentClick = () => {
    setIsPresent(true)
    setSelectedMonth('')
  }

  // Don't render until mounted to avoid SSR issues
  if (!mounted) return null

  const calendarContent = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[9998]"
        onClick={onClose}
      />
      
      {/* Calendar Picker */}
      <div
        ref={pickerRef}
        className={cn("fixed z-[9999] bg-white rounded-lg shadow-2xl border-2 border-blue-500 p-3", className)}
        style={{
          ...style,
          width: '240px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
      {/* Year Selector */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b">
        <button
          onClick={() => handleYearChange(-1)}
          className="p-1 hover:bg-gray-100 rounded text-sm transition-colors"
        >
          ◀
        </button>
        <span className="text-base font-bold text-gray-800">{selectedYear}</span>
        <button
          onClick={() => handleYearChange(1)}
          className="p-1 hover:bg-gray-100 rounded text-sm transition-colors"
        >
          ▶
        </button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {MONTHS.map((month) => (
          <button
            key={month}
            onClick={() => handleMonthClick(month)}
            className={cn(
              "py-1.5 px-2 rounded text-xs font-medium transition-all duration-200",
              selectedMonth === month && !isPresent
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Present Button */}
      <button
        onClick={handlePresentClick}
        className={cn(
          "w-full py-1.5 px-3 rounded text-xs font-semibold transition-all duration-200 mb-2",
          isPresent
            ? "bg-green-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        )}
      >
        Present
      </button>

      {/* Action Buttons */}
      <div className="flex gap-1.5 pt-2 border-t">
        <button
          onClick={onClose}
          className="flex-1 py-1.5 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-1.5 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium transition-colors"
          disabled={!selectedMonth && !isPresent}
        >
          Apply
        </button>
      </div>
    </div>
    </>
  )

  // Render using portal to escape DOM hierarchy
  return createPortal(calendarContent, document.body)
}
