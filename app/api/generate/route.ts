import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { fillTemplate, validateRequiredFields } from "@/lib/latex/template-engine"
import { compileTex } from "@/lib/latex/compile"
import { getTemplate } from "@/lib/templates"
import type { CVData } from "@/lib/latex/schema"

const generateRequestSchema = z.object({
  templateId: z.string().min(1, "Template ID is required"),
  data: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().optional(),
    links: z
      .object({
        linkedin: z.string().url().optional().or(z.literal("")),
        github: z.string().url().optional().or(z.literal("")),
        portfolio: z.string().url().optional().or(z.literal("")),
      })
      .optional(),
    education: z
      .array(
        z.object({
          school: z.string().min(1),
          city: z.string().min(1),
          degree: z.string().min(1),
          dates: z.string().min(1),
        }),
      )
      .min(1, "At least one education entry is required"),
    experience: z
      .array(
        z.object({
          company: z.string().min(1),
          title: z.string().min(1),
          city: z.string().min(1),
          dates: z.string().min(1),
          bullets: z.array(z.string().min(1)).min(1),
        }),
      )
      .min(1, "At least one experience entry is required"),
    projects: z.array(
      z.object({
        name: z.string().min(1),
        stack: z.string().min(1),
        dates: z.string().min(1),
        bullets: z.array(z.string().min(1)).min(1),
      }),
    ),
    skills: z.object({
      languages: z.array(z.string().min(1)),
      frameworks: z.array(z.string().min(1)),
      tools: z.array(z.string().min(1)),
    }),
    photoPath: z.string().optional(),
  }),
  format: z.enum(["pdf", "tex", "json"]).default("pdf"),
  filename: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { templateId, data, format, filename } = generateRequestSchema.parse(body)

    console.log("[v0] Generating resume with template:", templateId)

    // Validate template exists
    const template = getTemplate(templateId)
    if (!template) {
      return NextResponse.json(
        {
          error: "Template not found",
          details: `Template '${templateId}' does not exist`,
        },
        { status: 404 },
      )
    }

    // Validate required fields for template
    const validationErrors = validateRequiredFields(templateId, data)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    // Fill template with data
    const tex = fillTemplate(templateId, data as CVData)

    console.log("[v0] Template filled, LaTeX code length:", tex.length)

    // Return based on requested format
    switch (format) {
      case "tex":
        const texFilename = filename?.replace(/\.[^.]*$/, ".tex") || "resume.tex"
        return new NextResponse(tex, {
          headers: {
            "Content-Type": "text/plain",
            "Content-Disposition": `attachment; filename="${texFilename}"`,
          },
        })

      case "json":
        return NextResponse.json({
          templateId,
          data,
          tex,
          generatedAt: new Date().toISOString(),
        })

      case "pdf":
      default:
        // Compile to PDF
        const result = await compileTex({ tex })

        if (!result.success) {
          console.log("[v0] PDF compilation failed:", result.error)
          return NextResponse.json(
            {
              error: "PDF compilation failed",
              details: result.error,
              logs: result.logs,
              tex, // Include LaTeX code for debugging
            },
            { status: 500 },
          )
        }

        if (!result.pdf) {
          return NextResponse.json(
            {
              error: "No PDF generated",
              logs: result.logs,
            },
            { status: 500 },
          )
        }

        console.log("[v0] PDF generated successfully, size:", result.pdf.length)

        const pdfFilename = filename?.replace(/\.[^.]*$/, ".pdf") || "resume.pdf"
        const safeFilename = pdfFilename.replace(/[^a-zA-Z0-9_.-]/g, "")

        return new NextResponse(result.pdf, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${safeFilename}"`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        })
    }
  } catch (error) {
    console.error("[v0] Generate API error:", error)

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
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Resume Generation API",
    endpoints: {
      POST: "Generate resume from template and data",
    },
    supportedFormats: ["pdf", "tex", "json"],
    availableTemplates: ["jake_gutierrez", "sb2nov"],
  })
}
