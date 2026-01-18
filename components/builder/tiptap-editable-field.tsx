"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { cn } from '@/lib/utils'

interface TiptapEditableFieldProps {
  value: string
  onChange: (value: string) => void
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  disabled?: boolean
  fieldPath?: string
  fieldType?: 'text' | 'richtext' | 'list' | 'skills'
  onEditStart?: (path: string, type: 'text' | 'richtext' | 'list' | 'skills', position?: { top: number; left: number }) => void
  onEditEnd?: () => void
  autoFocus?: boolean
  onAIAction?: (action: 'continue' | 'improve' | 'grammar' | 'shorter' | 'longer', currentText: string) => Promise<string>
  canUseAI?: boolean
  onUpgradeRequired?: () => void
}

export function TiptapEditableField({
  value,
  onChange,
  className,
  style,
  placeholder = 'Click to edit...',
  disabled = false,
  fieldPath = '',
  fieldType = 'text',
  onEditStart,
  onEditEnd,
  autoFocus = false,
  onAIAction,
  canUseAI = false,
  onUpgradeRequired
}: TiptapEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isProcessingAI, setIsProcessingAI] = React.useState(false)
  const [aiToolsExpanded, setAiToolsExpanded] = React.useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const isEditingRef = useRef(false)

  // Debug logging
  useEffect(() => {
    console.log('[TipTap] isEditing state changed:', isEditing, 'fieldPath:', fieldPath)
  }, [isEditing, fieldPath])

  const handleClick = useCallback(() => {
    console.log('[TipTap] Click event detected:', editorRef.current)
  }, [])

  useEffect(() => {
    console.log('[TipTap] Focus changed:', editorRef.current)
  }, [editorRef.current])

  // Convert plain text with newlines to HTML format
  const convertTextToHtml = (text: string): string => {
    if (!text) return text
    
    // Check if already HTML (contains tags)
    if (/<[^>]+>/.test(text)) return text
    
    // Split by newlines and filter empty lines
    const lines = text.split('\n').filter(line => line.trim())
    if (lines.length === 0) return text
    
    // Detect bullet characters: •, ○, ◦, ▪, ▫, -, *, O, o followed by space
    const bulletRegex = /^[\s]*[•○◦▪▫\-*Oo]\s+/
    
    // Group consecutive bullet lines together
    const groups: { type: 'bullet' | 'paragraph', lines: string[] }[] = []
    let currentGroup: { type: 'bullet' | 'paragraph', lines: string[] } | null = null
    
    for (const line of lines) {
      const isBullet = bulletRegex.test(line)
      const cleanLine = isBullet ? line.replace(bulletRegex, '').trim() : line.trim()
      
      if (!cleanLine) continue
      
      if (isBullet) {
        if (currentGroup?.type !== 'bullet') {
          currentGroup = { type: 'bullet', lines: [] }
          groups.push(currentGroup)
        }
        currentGroup.lines.push(cleanLine)
      } else {
        if (currentGroup?.type !== 'paragraph') {
          currentGroup = { type: 'paragraph', lines: [] }
          groups.push(currentGroup)
        }
        currentGroup.lines.push(cleanLine)
      }
    }
    
    // Convert groups to HTML
    return groups.map(group => {
      if (group.type === 'bullet') {
        const items = group.lines.map(line => `<li>${line}</li>`).join('')
        return `<ul>${items}</ul>`
      } else {
        return group.lines.map(line => `<p>${line}</p>`).join('')
      }
    }).join('')
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Configure which features to enable based on fieldType
        heading: fieldType === 'richtext' ? { levels: [1, 2, 3] } : false,
        bulletList: (fieldType === 'richtext' || fieldType === 'list') ? {} : false,
        orderedList: (fieldType === 'richtext' || fieldType === 'list') ? {} : false,
        bold: false,
        italic: false,
        strike: false,
        link: false, // Disabled to avoid duplicate with Link extension
        underline: false, // Disabled to avoid duplicate with Underline extension
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: convertTextToHtml(value),
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    onFocus: () => {
      console.log('[TipTap] Editor focused for field:', fieldPath, 'isEditing:', isEditing, 'ref:', isEditingRef.current)
      if (!isEditing) {
        console.log('[TipTap] Setting isEditing to true for field:', fieldPath)
        isEditingRef.current = true
        setIsEditing(true)
        if (onEditStart && fieldPath) {
          onEditStart(fieldPath, fieldType)
        }
      }
    },
  })

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && !isEditing && value !== editor.getHTML()) {
      editor.commands.setContent(convertTextToHtml(value))
    }
  }, [value, editor, isEditing])

  // Sync ref with state - ONLY sync to true, never to false
  // The click-outside handler is solely responsible for setting ref to false
  useEffect(() => {
    if (isEditing) {
      console.log('[TipTap] Syncing ref to true for field:', fieldPath)
      isEditingRef.current = true
    }
    // Never automatically sync to false - that's handled by click-outside only
  }, [isEditing])

  // Click-outside detection to close toolbar
  // This effect runs ONCE on mount and cleans up on unmount
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Use ref to check current editing state (prevents race conditions)
      if (!isEditingRef.current) {
        return
      }

      const target = event.target as HTMLElement
      const editorElement = editorRef.current
      
      if (!editorElement) return
      
      console.log('[TipTap] Click detected:', {
        tagName: target.tagName,
        className: target.className,
        fieldPath,
        hasEditorRef: !!editorElement,
        isInEditor: editorElement?.contains(target),
        isInToolbar: !!target.closest('.tiptap-toolbar')
      })
      
      // Check if click is outside both editor and toolbar using contains
      if (!editorElement.contains(target) && !target.closest('.tiptap-toolbar')) {
        console.log('[TipTap] Click outside detected - closing toolbar for field:', fieldPath)
        isEditingRef.current = false
        setIsEditing(false)
        if (onEditEnd) {
          onEditEnd()
        }
      } else {
        console.log('[TipTap] Click inside editor/toolbar - keeping toolbar open for field:', fieldPath)
      }
    }

    console.log('[TipTap] Setting up click-outside detection for field:', fieldPath)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      console.log('[TipTap] Cleaning up click-outside listener for field:', fieldPath)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [fieldPath, onEditEnd])

  // Auto-focus if requested
  useEffect(() => {
    if (autoFocus && editor) {
      editor.commands.focus()
    }
  }, [autoFocus, editor])

  if (!editor) {
    return null
  }

  const handleAIAction = async (action: 'continue' | 'improve' | 'grammar' | 'shorter' | 'longer') => {
    if (!canUseAI && onUpgradeRequired) {
      onUpgradeRequired()
      return
    }

    if (!onAIAction || !editor) return

    setIsProcessingAI(true)
    try {
      const currentText = editor.getText()
      const improvedText = await onAIAction(action, currentText)
      editor.commands.setContent(improvedText)
      onChange(improvedText)
    } catch (error) {
      console.error('AI action failed:', error)
    } finally {
      setIsProcessingAI(false)
    }
  }

  // Show toolbar if EITHER state or ref says we're editing
  // This prevents toolbar from disappearing during React re-renders that reset state
  const showToolbar = (isEditing || isEditingRef.current) && fieldType === 'richtext'

  return (
    <div
      ref={editorRef}
      className={cn(
        'tiptap-editable-field',
        isEditing && 'tiptap-editing',
        className
      )}
      style={style}
    >
      {showToolbar && (
        <div 
          className="tiptap-toolbar"
          onMouseDown={(e) => {
            console.log('[TipTap] Toolbar mousedown:', {
              tagName: (e.target as HTMLElement).tagName,
              className: (e.target as HTMLElement).className,
              fieldPath
            })
            // Prevent toolbar interactions from blurring the editor
            const target = e.target as HTMLElement
            if (target.tagName !== 'SELECT' && target.tagName !== 'OPTION') {
              e.preventDefault()
              console.log('[TipTap] preventDefault called on toolbar mousedown')
            }
          }}
        >
          <div className="toolbar-group">
            <select
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              onChange={(e) => {
                const level = e.target.value
                if (level === 'p') {
                  editor.chain().focus().setParagraph().run()
                } else {
                  editor.chain().focus().toggleHeading({ level: parseInt(level) as 1 | 2 | 3 }).run()
                }
              }}
              className="toolbar-select"
              title="Text Size"
              value={
                editor.isActive('heading', { level: 1 }) ? '1' :
                editor.isActive('heading', { level: 2 }) ? '2' :
                editor.isActive('heading', { level: 3 }) ? '3' : 'p'
              }
            >
              <option value="p">Normal</option>
              <option value="1">Large</option>
              <option value="2">Medium</option>
              <option value="3">Small</option>
            </select>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group">
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBold().run()
              }}
              className={editor.isActive('bold') ? 'is-active' : ''}
              type="button"
              title="Bold (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleItalic().run()
              }}
              className={editor.isActive('italic') ? 'is-active' : ''}
              type="button"
              title="Italic (Ctrl+I)"
            >
              <em>I</em>
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleUnderline().run()
              }}
              className={editor.isActive('underline') ? 'is-active' : ''}
              type="button"
              title="Underline (Ctrl+U)"
            >
              <u>U</u>
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleStrike().run()
              }}
              className={editor.isActive('strike') ? 'is-active' : ''}
              type="button"
              title="Strikethrough"
            >
              <s>S</s>
            </button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group">
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('left').run()
              }}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
              type="button"
              title="Align Left"
            >
              ≡
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('center').run()
              }}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
              type="button"
              title="Align Center"
            >
              ≣
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().setTextAlign('right').run()
              }}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
              type="button"
              title="Align Right"
            >
              ≡
            </button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group">
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleBulletList().run()
              }}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
              type="button"
              title="Bullet List"
            >
              • List
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                editor.chain().focus().toggleOrderedList().run()
              }}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
              type="button"
              title="Numbered List"
            >
              1. List
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                const url = window.prompt('Enter URL:')
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run()
                }
              }}
              className={editor.isActive('link') ? 'is-active' : ''}
              type="button"
              title="Insert Link"
            >
              🔗
            </button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-group ai-group">
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                setAiToolsExpanded(!aiToolsExpanded)
              }}
              type="button"
              className="ai-toggle"
              title={aiToolsExpanded ? "Hide AI Tools" : "Show AI Tools"}
            >
              ✨ AI {aiToolsExpanded ? '▼' : '▶'}
            </button>
            {aiToolsExpanded && (
              <>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAIAction('continue')
                  }}
                  disabled={isProcessingAI}
                  type="button"
                  className="ai-button ai-button-small"
                  title="AI Continue Writing"
                >
                  Continue
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAIAction('improve')
                  }}
                  disabled={isProcessingAI}
                  type="button"
                  className="ai-button ai-button-small"
                  title="AI Improve"
                >
                  Improve
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAIAction('grammar')
                  }}
                  disabled={isProcessingAI}
                  type="button"
                  className="ai-button ai-button-small"
                  title="Fix Grammar"
                >
                  Grammar
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAIAction('shorter')
                  }}
                  disabled={isProcessingAI}
                  type="button"
                  className="ai-button ai-button-small"
                  title="Make Shorter"
                >
                  Shorter
                </button>
                <button
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleAIAction('longer')
                  }}
                  disabled={isProcessingAI}
                  type="button"
                  className="ai-button ai-button-small"
                  title="Make Longer"
                >
                  Longer
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <EditorContent 
        editor={editor}
        className={cn(
          'tiptap-content',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
      <style jsx global>{`
        .tiptap-editable-field {
          position: relative;
          cursor: text;
        }

        .tiptap-toolbar {
          display: flex;
          gap: 8px;
          padding: 8px 12px;
          margin-bottom: 12px;
          background: linear-gradient(to bottom, #ffffff, #f9fafb);
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          align-items: center;
          flex-wrap: wrap;
        }

        .tiptap-toolbar .toolbar-group {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .tiptap-toolbar button {
          padding: 8px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 36px;
          white-space: nowrap;
        }

        .tiptap-toolbar button:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tiptap-toolbar button:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }

        .tiptap-toolbar button.is-active {
          background: #3b82f6;
          color: white;
          border-color: #2563eb;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        .tiptap-toolbar .toolbar-divider {
          width: 1px;
          height: 28px;
          background: #d1d5db;
          margin: 0 4px;
          flex-shrink: 0;
        }

        .tiptap-toolbar button.ai-toggle {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border-color: #7c3aed;
          font-weight: 600;
          font-size: 12px;
          padding: 6px 10px;
          min-width: 70px;
        }

        .tiptap-toolbar button.ai-toggle:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          border-color: #6d28d9;
          box-shadow: 0 4px 6px rgba(139, 92, 246, 0.4);
        }

        .tiptap-toolbar button.ai-button {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border-color: #7c3aed;
          font-weight: 600;
        }

        .tiptap-toolbar button.ai-button-small {
          font-size: 11px;
          padding: 6px 10px;
          min-width: 60px;
          height: 28px;
        }

        .tiptap-toolbar button.ai-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          border-color: #6d28d9;
          box-shadow: 0 4px 6px rgba(139, 92, 246, 0.4);
        }

        .tiptap-toolbar button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none !important;
        }

        .tiptap-toolbar .ai-group {
          flex-wrap: wrap;
        }

        .tiptap-toolbar .toolbar-select {
          padding: 6px 8px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s ease;
          height: 36px;
          min-width: 80px;
        }

        .tiptap-toolbar .toolbar-select:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .tiptap-toolbar .toolbar-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .tiptap-content .ProseMirror {
          outline: none;
          min-height: 1em;
        }

        .tiptap-editing .ProseMirror {
          padding: 4px 8px;
          border: 2px solid #3b82f6;
          border-radius: 4px;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }

        /* Rich text formatting styles */
        .ProseMirror strong {
          font-weight: 700;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror s {
          text-decoration: line-through;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .ProseMirror ul {
          list-style-type: disc;
        }

        .ProseMirror ol {
          list-style-type: decimal;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }

        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3 {
          font-weight: 700;
          margin: 0.5rem 0;
        }

        .ProseMirror h1 {
          font-size: 1.5em;
        }

        .ProseMirror h2 {
          font-size: 1.25em;
        }

        .ProseMirror h3 {
          font-size: 1.1em;
        }

        /* Ensure inline styles are preserved */
        .tiptap-content .ProseMirror > * {
          margin: 0;
        }

        .tiptap-content .ProseMirror > p {
          margin: 0;
        }
      `}</style>
    </div>
  )
}
