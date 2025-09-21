import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { promises as fs } from "fs"
import { join } from "path"
import type { AdaptRequest, AdaptResponse } from "@/lib/latex/schema"
import { getTemplateBase } from "@/lib/templates"

export async function adaptCVToJobDescription(request: AdaptRequest): Promise<AdaptResponse> {
  const { cv_text, jd_text, template_id, language = "en" } = request

  console.log("[v0] Starting CV adaptation for template:", template_id)

  // Validate template exists
  const templateBase = getTemplateBase(template_id)
  if (!templateBase) {
    throw new Error(`Template '${template_id}' not found`)
  }

  // Load the prompt template
  const promptPath = join(process.cwd(), "lib/ai/prompts/jd_to_latex.txt")
  let promptTemplate: string

  try {
    promptTemplate = await fs.readFile(promptPath, "utf8")
  } catch (error) {
    console.error("[v0] Failed to load prompt template:", error)
    throw new Error("Failed to load AI prompt template")
  }

  // Prepare the full prompt
  const fullPrompt = `${promptTemplate}

## CURRENT TASK
Template: ${template_id}
Language: ${language}

## CV CONTENT
${cv_text}

## JOB DESCRIPTION
${jd_text}

## TEMPLATE BASE (for reference)
${templateBase}

Generate the complete LaTeX resume now:`

  try {
    console.log("[v0] Calling AI model for CV adaptation")

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: fullPrompt,
      maxTokens: 4000,
      temperature: 0.3, // Lower temperature for more consistent output
    })

    console.log("[v0] AI adaptation completed, response length:", text.length)

    // Basic validation of the response
    const warnings: string[] = []

    if (!text.includes("\\documentclass")) {
      warnings.push("Generated content may not be a complete LaTeX document")
    }

    if (!text.includes("\\begin{document}")) {
      warnings.push("Missing document begin tag")
    }

    if (!text.includes("\\end{document}")) {
      warnings.push("Missing document end tag")
    }

    // Check for potential issues
    if (text.length < 500) {
      warnings.push("Generated content seems unusually short")
    }

    if (text.length > 10000) {
      warnings.push("Generated content seems unusually long")
    }

    // Check for dangerous commands (same as compilation security)
    const dangerousPatterns = [/\\write18/, /\\immediate\\write18/, /\\input\{[^}]*\|/, /\\openin/, /\\openout/]

    for (const pattern of dangerousPatterns) {
      if (pattern.test(text)) {
        warnings.push("Generated content contains potentially dangerous LaTeX commands")
        break
      }
    }

    return {
      tex: text,
      warnings,
    }
  } catch (error) {
    console.error("[v0] AI adaptation failed:", error)
    throw new Error(`AI adaptation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function extractKeywords(text: string, maxKeywords = 20): Promise<string[]> {
  try {
    const { text: response } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Extract the most important technical skills, tools, and requirements from this job description. Return only a comma-separated list of keywords, maximum ${maxKeywords} items.

Job Description:
${text}

Keywords:`,
      maxTokens: 200,
      temperature: 0.1,
    })

    return response
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0)
      .slice(0, maxKeywords)
  } catch (error) {
    console.error("[v0] Keyword extraction failed:", error)
    return []
  }
}

export async function scoreContent(content: string, keywords: string[]): Promise<number> {
  if (keywords.length === 0) return 0

  const contentLower = content.toLowerCase()
  let score = 0

  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase()
    if (contentLower.includes(keywordLower)) {
      score += 1
    }
  }

  return score / keywords.length // Normalize to 0-1 range
}
