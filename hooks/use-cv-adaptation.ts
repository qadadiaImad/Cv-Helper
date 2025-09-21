"use client"

import { useState, useCallback } from "react"
import { flowCVAPI } from "@/lib/api/client"
import type { AdaptRequest, AdaptResponse } from "@/lib/latex/schema"

interface UseCVAdaptationOptions {
  onSuccess?: (result: AdaptResponse) => void
  onError?: (error: string) => void
}

export function useCVAdaptation({ onSuccess, onError }: UseCVAdaptationOptions = {}) {
  const [isAdapting, setIsAdapting] = useState(false)
  const [result, setResult] = useState<AdaptResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const adaptCV = useCallback(
    async (request: AdaptRequest) => {
      setIsAdapting(true)
      setError(null)
      setResult(null)

      try {
        console.log("[v0] Starting CV adaptation")
        const adaptationResult = await flowCVAPI.adaptResume(request)

        setResult(adaptationResult)
        onSuccess?.(adaptationResult)
        console.log("[v0] CV adaptation completed successfully")
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to adapt CV"
        setError(errorMessage)
        onError?.(errorMessage)
        console.error("[v0] CV adaptation failed:", err)
      } finally {
        setIsAdapting(false)
      }
    },
    [onSuccess, onError],
  )

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    isAdapting,
    result,
    error,
    adaptCV,
    reset,
  }
}
