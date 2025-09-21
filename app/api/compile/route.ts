import { type NextRequest, NextResponse } from "next/server"
import { compileTex } from "@/lib/latex/compile"
import { z } from "zod"

const compileRequestSchema = z.object({
  tex: z.string().min(1, "LaTeX code is required").max(204800, "LaTeX code too large (max 200KB)"),
  filename: z.string().optional().default("resume.pdf"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tex, filename } = compileRequestSchema.parse(body)

    console.log("[v0] Starting LaTeX compilation")

    // Compile the LaTeX code
    const result = await compileTex({ tex })

    if (!result.success) {
      console.log("[v0] Compilation failed:", result.error)
      return NextResponse.json(
        {
          error: "Compilation failed",
          details: result.error,
          logs: result.logs,
        },
        { status: 400 },
      )
    }

    if (!result.pdf) {
      console.log("[v0] No PDF generated")
      return NextResponse.json(
        {
          error: "No PDF generated",
          logs: result.logs,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Compilation successful, PDF size:", result.pdf.length)

    // Sanitize filename
    const safeFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, "")

    // Return the PDF
    return new NextResponse(result.pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${safeFilename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("[v0] API error:", error)

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

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const test = searchParams.get("test")

  if (test === "simple") {
    // Simple test document
    const testTex = `\\documentclass{article}
\\begin{document}
\\title{Test Document}
\\author{FlowCV}
\\date{\\today}
\\maketitle

\\section{Introduction}
This is a test document to verify LaTeX compilation is working correctly.

\\section{Features}
\\begin{itemize}
\\item LaTeX compilation
\\item PDF generation
\\item Security measures
\\end{itemize}

\\end{document}`

    const result = await compileTex({ tex: testTex })

    if (result.success && result.pdf) {
      return new NextResponse(result.pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=test.pdf",
        },
      })
    } else {
      return NextResponse.json(
        {
          error: "Test compilation failed",
          details: result.error,
          logs: result.logs,
        },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({
    message: "LaTeX Compilation API",
    endpoints: {
      POST: "Compile LaTeX code to PDF",
      "GET?test=simple": "Test compilation with simple document",
    },
  })
}
