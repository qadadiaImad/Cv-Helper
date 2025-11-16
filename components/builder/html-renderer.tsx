/**
 * HTML Renderer Component
 * Safely renders HTML content in templates for rich text fields
 * Use this whenever displaying content from RichTextEditor
 */

import React from 'react'

interface HtmlRendererProps {
  html: string
  className?: string
  style?: React.CSSProperties
  as?: 'span' | 'div' | 'p'
}

/**
 * Renders HTML content safely
 * Use this component in templates to display rich text fields like:
 * - Professional summary
 * - Job descriptions
 * - Education descriptions
 * - Project descriptions
 * - Any field edited with RichTextEditor
 */
export const HtmlRenderer: React.FC<HtmlRendererProps> = ({ 
  html, 
  className, 
  style, 
  as: Component = 'div' 
}) => {
  // Don't render if no content
  if (!html) return null

  return (
    <Component
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/**
 * Strips HTML tags from a string
 * Useful for extracting plain text from rich text content
 */
export const stripHtml = (html: string): string => {
  if (!html) return ''
  
  if (typeof window === 'undefined') {
    // Server-side: simple regex strip
    return html.replace(/<[^>]*>/g, '').trim()
  }
  
  // Client-side: use DOM for accurate stripping
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return (tmp.textContent || tmp.innerText || '').trim()
}

/**
 * Checks if a string contains HTML tags
 */
export const isHtml = (str: string): boolean => {
  if (!str) return false
  return /<[^>]+>/.test(str)
}

/**
 * Ensures content has basic HTML wrapper if it's plain text
 */
export const ensureHtml = (content: string): string => {
  if (!content) return ''
  if (isHtml(content)) return content
  return `<p>${content}</p>`
}
