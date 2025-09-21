import pdfParse from "pdf-parse"
import mammoth from "mammoth"

export interface ParsedCV {
  text: string
  metadata?: {
    title?: string
    author?: string
    pages?: number
    wordCount?: number
  }
}

export async function parsePDF(buffer: Buffer): Promise<ParsedCV> {
  try {
    console.log("[v0] Parsing PDF, size:", buffer.length)
    const data = await pdfParse(buffer)

    return {
      text: data.text,
      metadata: {
        title: data.info?.Title,
        author: data.info?.Author,
        pages: data.numpages,
        wordCount: data.text.split(/\s+/).length,
      },
    }
  } catch (error) {
    console.error("[v0] PDF parsing failed:", error)
    throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function parseDOCX(buffer: Buffer): Promise<ParsedCV> {
  try {
    console.log("[v0] Parsing DOCX, size:", buffer.length)
    const result = await mammoth.extractRawText({ buffer })

    if (result.messages.length > 0) {
      console.log("[v0] DOCX parsing warnings:", result.messages)
    }

    return {
      text: result.value,
      metadata: {
        wordCount: result.value.split(/\s+/).length,
      },
    }
  } catch (error) {
    console.error("[v0] DOCX parsing failed:", error)
    throw new Error(`Failed to parse DOCX: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function parseCV(file: File): Promise<ParsedCV> {
  const buffer = Buffer.from(await file.arrayBuffer())

  switch (file.type) {
    case "application/pdf":
      return parsePDF(buffer)

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return parseDOCX(buffer)

    case "text/plain":
      return {
        text: new TextDecoder().decode(buffer),
        metadata: {
          wordCount: new TextDecoder().decode(buffer).split(/\s+/).length,
        },
      }

    default:
      throw new Error(`Unsupported file type: ${file.type}`)
  }
}

export function cleanCVText(text: string): string {
  return (
    text
      // Remove excessive whitespace
      .replace(/\s+/g, " ")
      // Remove page breaks and form feeds
      .replace(/[\f\r]/g, "")
      // Clean up line breaks
      .replace(/\n\s*\n/g, "\n\n")
      // Trim
      .trim()
  )
}
