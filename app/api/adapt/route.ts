import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { adaptCVToJobDescription } from "@/lib/ai/adapt"

const adaptRequestSchema = z.object({
  cv_text: z.string().min(1, "CV text is required").max(50000, "CV text too large (max 50KB)"),
  jd_text: z.string().min(1, "Job description text is required").max(20000, "Job description too large (max 20KB)"),
  template_id: z.enum(["jake_gutierrez", "sb2nov"], {
    errorMap: () => ({ message: "Invalid template ID" }),
  }),
  language: z.enum(["fr", "en"]).optional().default("en"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const adaptRequest = adaptRequestSchema.parse(body)

    console.log("[v0] Processing CV adaptation request")
    console.log("[v0] Template:", adaptRequest.template_id)
    console.log("[v0] Language:", adaptRequest.language)
    console.log("[v0] CV text length:", adaptRequest.cv_text.length)
    console.log("[v0] JD text length:", adaptRequest.jd_text.length)

    // Check if we have the required environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI service not configured",
          details: "OpenAI API key is not configured",
        },
        { status: 503 },
      )
    }

    const result = await adaptCVToJobDescription(adaptRequest)

    console.log("[v0] CV adaptation completed successfully")
    console.log("[v0] Generated LaTeX length:", result.tex.length)
    console.log("[v0] Warnings:", result.warnings.length)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Adapt API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Adaptation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "CV Adaptation API",
    description: "Adapt existing CV content to match job descriptions using AI",
    endpoints: {
      POST: "Adapt CV to job description",
    },
    supportedTemplates: ["jake_gutierrez", "sb2nov"],
    supportedLanguages: ["en", "fr"],
    requirements: {
      cv_text: "Raw text from existing CV (max 50KB)",
      jd_text: "Raw text from job description (max 20KB)",
      template_id: "LaTeX template to use",
      language: "Target language (optional, defaults to 'en')",
    },
  })
}
