"use client"

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineSectionWrapperProps {
  sectionId: string
  title: string
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  children: React.ReactNode
  formContent?: React.ReactNode
  isEmpty?: boolean
}

export function InlineSectionWrapper({
  sectionId,
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  children,
  formContent,
  isEmpty = false
}: InlineSectionWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative group transition-all duration-300",
        isEditing && "ring-2 ring-blue-500 ring-offset-2 rounded-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit Overlay - Shows on hover when not editing */}
      {!isEditing && isHovered && (
        <div className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none z-10 transition-opacity duration-200" />
      )}

      {/* Edit Button - Shows on hover when not editing */}
      {!isEditing && isHovered && (
        <button
          onClick={onEdit}
          className="absolute top-2 right-2 z-20 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 flex items-center gap-2"
        >
          <Edit2 className="h-4 w-4" />
          <span className="text-sm font-medium">Edit {title}</span>
        </button>
      )}

      {/* Empty State Prompt */}
      {!isEditing && isEmpty && (
        <button
          onClick={onEdit}
          className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/80 backdrop-blur-sm rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/80 transition-all duration-200 group"
        >
          <div className="text-center p-8">
            <Edit2 className="h-8 w-8 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
            <p className="text-sm font-medium text-slate-600 group-hover:text-blue-700 transition-colors">
              Click to add {title}
            </p>
          </div>
        </button>
      )}

      {/* Content or Form */}
      {isEditing ? (
        <Card className="p-6 bg-white shadow-xl border-2 border-blue-500 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Edit {title}</h3>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto pr-2">
            {formContent}
          </div>
        </Card>
      ) : (
        <div className={cn(
          "transition-opacity duration-200",
          isEmpty && "opacity-30"
        )}>
          {children}
        </div>
      )}
    </div>
  )
}
