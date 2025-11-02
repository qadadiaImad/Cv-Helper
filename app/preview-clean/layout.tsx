/**
 * Clean Preview Layout - No headers, no navigation
 * This layout completely bypasses the root layout
 */

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Template Preview",
}

export default function CleanPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
