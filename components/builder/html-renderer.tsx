/**
 * HTML Renderer Component
 * Renders HTML strings safely
 */

import React from 'react'

export interface HtmlRendererProps {
  html: string
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
}

export const HtmlRenderer: React.FC<HtmlRendererProps> = ({ 
  html, 
  className, 
  style,
  as: Component = 'div'
}) => {
  return (
    <Component
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
