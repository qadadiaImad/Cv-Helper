"use client"

import { useState, useCallback } from "react"
import { flowCVAPI } from "@/lib/api/client"
import type { CVData } from "@/lib/latex/schema"

interface UseResumeGeneratorOptions {
  templateId: string
  onSuccess?: (pdfUrl: string) => void
  onError?: (error: string) => void
}

export function useResumeGenerator({ templateId, onSuccess, onError }: UseResumeGeneratorOptions) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateResume = useCallback(
    async (data: CVData) => {
      setIsGenerating(true)
      setError(null)

      try {
        console.log("[v0] Starting resume generation")
        const pdfBlob = await flowCVAPI.generateResume(templateId, data, "pdf")

        if (pdfBlob instanceof Blob) {
          // Clean up previous URL
          if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl)
          }

          const newPdfUrl = flowCVAPI.createPDFUrl(pdfBlob)
          setPdfUrl(newPdfUrl)
          onSuccess?.(newPdfUrl)
          console.log("[v0] Resume generated successfully")
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to generate resume"
        setError(errorMessage)
        onError?.(errorMessage)
        console.error("[v0] Resume generation failed:", err)
      } finally {
        setIsGenerating(false)
      }
    },
    [templateId, pdfUrl, onSuccess, onError],
  )

  const downloadResume = useCallback(
    async (data: CVData, filename = "resume.pdf") => {
      try {
        const pdfBlob = await flowCVAPI.generateResume(templateId, data, "pdf", filename)
        if (pdfBlob instanceof Blob) {
          flowCVAPI.downloadFile(pdfBlob, filename)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to download resume"
        onError?.(errorMessage)
      }
    },
    [templateId, onError],
  )

  const exportLaTeX = useCallback(
    async (data: CVData, filename = "resume.tex") => {
      try {
        const texContent = await flowCVAPI.generateResume(templateId, data, "tex", filename)
        if (typeof texContent === "string") {
          const blob = new Blob([texContent], { type: "text/plain" })
          flowCVAPI.downloadFile(blob, filename)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to export LaTeX"
        onError?.(errorMessage)
      }
    },
    [templateId, onError],
  )

  const exportJSON = useCallback(
    async (data: CVData, filename = "resume.json") => {
      try {
        const jsonData = await flowCVAPI.generateResume(templateId, data, "json", filename)
        if (typeof jsonData === "object") {
          const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" })
          flowCVAPI.downloadFile(blob, filename)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to export JSON"
        onError?.(errorMessage)
      }
    },
    [templateId, onError],
  )

  // Cleanup function
  const cleanup = useCallback(() => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
      setPdfUrl(null)
    }
  }, [pdfUrl])

  return {
    isGenerating,
    pdfUrl,
    error,
    generateResume,
    downloadResume,
    exportLaTeX,
    exportJSON,
    cleanup,
  }
}
