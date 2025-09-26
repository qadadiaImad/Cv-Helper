"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, FileText } from "lucide-react"

interface PDFPreviewProps {
  pdfUrl?: string
  isLoading?: boolean
  onRefresh?: () => void
  onDownload?: () => void
  className?: string
}

export function PDFPreview({ pdfUrl, isLoading, onRefresh, onDownload, className }: PDFPreviewProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [pdfUrl])

  const handleIframeError = () => {
    setError("Failed to load PDF preview")
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            PDF Preview
          </CardTitle>
          <div className="flex gap-2">
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            )}
            {onDownload && pdfUrl && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-[8.5/11] bg-muted rounded-b-lg overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Compiling LaTeX...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-destructive">{error}</p>
                {onRefresh && (
                  <Button variant="outline" size="sm" onClick={onRefresh}>
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="Resume Preview"
              onError={handleIframeError}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Fill out the form to see your resume preview</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
