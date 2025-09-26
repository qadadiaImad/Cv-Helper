import { type NextRequest, NextResponse } from "next/server"
import { parseCV } from "@/lib/parse/parseCv"
import { parseJobDescription } from "@/lib/parse/parseJd"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string // "cv" or "jd"

    if (!file) {
      return NextResponse.json(
        {
          error: "No file provided",
        },
        { status: 400 },
      )
    }

    console.log("[v0] Parsing file:", file.name, file.type, file.size)

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "File too large (max 10MB)",
        },
        { status: 400 },
      )
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Unsupported file type",
          supportedTypes: ["PDF", "DOCX", "DOC", "TXT"],
        },
        { status: 400 },
      )
    }

    let result

    if (type === "jd") {
      // For job descriptions, we expect plain text
      const text = await file.text()
      result = parseJobDescription(text)
    } else {
      // Default to CV parsing
      result = await parseCV(file)
    }

    console.log("[v0] File parsed successfully, text length:", result.text.length)

    return NextResponse.json({
      success: true,
      text: result.text,
      metadata: result.metadata,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("[v0] Parse API error:", error)

    return NextResponse.json(
      {
        error: "Failed to parse file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "File Parsing API",
    description: "Parse CV and job description files to extract text content",
    endpoints: {
      POST: "Parse uploaded file",
    },
    supportedFormats: ["PDF", "DOCX", "DOC", "TXT"],
    maxFileSize: "10MB",
    parameters: {
      file: "File to parse (multipart/form-data)",
      type: "File type: 'cv' or 'jd' (optional, defaults to 'cv')",
    },
  })
}
