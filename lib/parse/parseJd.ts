export interface ParsedJobDescription {
  text: string
  metadata?: {
    title?: string
    company?: string
    location?: string
    wordCount?: number
  }
}

export function parseJobDescription(text: string): ParsedJobDescription {
  const cleanText = cleanJobDescriptionText(text)

  // Try to extract basic metadata
  const lines = cleanText.split("\n").filter((line) => line.trim())
  const metadata: ParsedJobDescription["metadata"] = {
    wordCount: cleanText.split(/\s+/).length,
  }

  // Simple heuristics to extract job title and company
  if (lines.length > 0) {
    // First non-empty line is often the job title
    const firstLine = lines[0].trim()
    if (firstLine.length < 100) {
      metadata.title = firstLine
    }
  }

  // Look for company patterns
  const companyPatterns = [/^(.+?)\s+is\s+looking/i, /^(.+?)\s+seeks/i, /^Join\s+(.+?)[\s,]/i, /^(.+?)\s+hiring/i]

  for (const pattern of companyPatterns) {
    const match = cleanText.match(pattern)
    if (match && match[1]) {
      metadata.company = match[1].trim()
      break
    }
  }

  // Look for location patterns
  const locationPatterns = [
    /Location:\s*([^.\n]+)/i,
    /Based in\s+([^.\n]+)/i,
    /([A-Za-z\s]+,\s*[A-Z]{2})/,
    /(Remote|Hybrid|On-site)/i,
  ]

  for (const pattern of locationPatterns) {
    const match = cleanText.match(pattern)
    if (match && match[1]) {
      metadata.location = match[1].trim()
      break
    }
  }

  return {
    text: cleanText,
    metadata,
  }
}

export function cleanJobDescriptionText(text: string): string {
  return (
    text
      // Remove HTML tags if present
      .replace(/<[^>]*>/g, "")
      // Remove URLs
      .replace(/https?:\/\/[^\s]+/g, "")
      // Remove email addresses
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "")
      // Remove excessive whitespace
      .replace(/\s+/g, " ")
      // Clean up line breaks
      .replace(/\n\s*\n/g, "\n\n")
      // Remove form feeds and carriage returns
      .replace(/[\f\r]/g, "")
      // Trim
      .trim()
  )
}

export function extractRequirements(text: string): string[] {
  const requirements: string[] = []

  // Look for requirement sections
  const requirementSections = [
    /requirements?:?\s*\n(.*?)(?=\n\s*[A-Z][^:]*:|$)/gis,
    /qualifications?:?\s*\n(.*?)(?=\n\s*[A-Z][^:]*:|$)/gis,
    /skills?:?\s*\n(.*?)(?=\n\s*[A-Z][^:]*:|$)/gis,
    /experience:?\s*\n(.*?)(?=\n\s*[A-Z][^:]*:|$)/gis,
  ]

  for (const pattern of requirementSections) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      if (match[1]) {
        // Extract bullet points or lines
        const lines = match[1]
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0)

        requirements.push(...lines)
      }
    }
  }

  return requirements.filter((req, index, arr) => arr.indexOf(req) === index) // Remove duplicates
}

export function extractSkills(text: string): string[] {
  const skills: string[] = []

  // Common technical skills patterns
  const skillPatterns = [
    // Programming languages
    /\b(JavaScript|TypeScript|Python|Java|C\+\+|C#|PHP|Ruby|Go|Rust|Swift|Kotlin)\b/gi,
    // Frameworks and libraries
    /\b(React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|Laravel|Rails)\b/gi,
    // Databases
    /\b(MySQL|PostgreSQL|MongoDB|Redis|SQLite|Oracle|SQL Server)\b/gi,
    // Cloud and DevOps
    /\b(AWS|Azure|GCP|Docker|Kubernetes|Jenkins|Git|CI\/CD)\b/gi,
    // Tools
    /\b(Figma|Sketch|Photoshop|Jira|Slack|Trello|Notion)\b/gi,
  ]

  for (const pattern of skillPatterns) {
    const matches = text.matchAll(pattern)
    for (const match of matches) {
      if (match[0]) {
        skills.push(match[0])
      }
    }
  }

  return skills.filter((skill, index, arr) => arr.indexOf(skill) === index) // Remove duplicates
}
