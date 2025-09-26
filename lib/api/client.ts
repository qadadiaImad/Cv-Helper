import type { CVData, CompileRequest, AdaptRequest, AdaptResponse } from "@/lib/latex/schema"

export class FlowCVAPI {
  private baseUrl: string

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl
  }

  async compileLaTeX(request: CompileRequest): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || error.error || "Compilation failed")
    }

    return response.blob()
  }

  async generateResume(
    templateId: string,
    data: CVData,
    format: "pdf" | "tex" | "json" = "pdf",
    filename?: string,
  ): Promise<Blob | string | object> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId,
        data,
        format,
        filename,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || error.error || "Generation failed")
    }

    switch (format) {
      case "pdf":
        return response.blob()
      case "tex":
        return response.text()
      case "json":
        return response.json()
      default:
        return response.blob()
    }
  }

  async adaptResume(request: AdaptRequest): Promise<AdaptResponse> {
    const response = await fetch(`${this.baseUrl}/api/adapt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || error.error || "Adaptation failed")
    }

    return response.json()
  }

  async testCompilation(): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/compile?test=simple`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.details || error.error || "Test compilation failed")
    }

    return response.blob()
  }

  // Utility methods
  createPDFUrl(blob: Blob): string {
    return URL.createObjectURL(blob)
  }

  downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

// Default instance
export const flowCVAPI = new FlowCVAPI()
