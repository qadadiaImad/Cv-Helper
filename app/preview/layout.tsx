/**
 * Isolated layout for preview pages
 * Prevents inheriting main app layout (header, navigation, etc.)
 * Must include html/body to completely override parent layout
 */

import type { ReactNode } from 'react'

export default function PreviewLayout({
  children,
}: {
  children: ReactNode
}) {
  // Return complete HTML structure to bypass parent layout
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
