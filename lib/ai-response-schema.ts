// AI Response Schema - Structured output contract

export interface AITextOption {
  text: string
  label?: string  // e.g., "Focus on Leadership", "More Concise"
}

export interface AIGenerationResponse {
  options: AITextOption[]
  reasoning?: string  // Optional explanation of changes
}

// JSON Schema for OpenAI structured output
export const AI_RESPONSE_JSON_SCHEMA = {
  type: "object",
  properties: {
    options: {
      type: "array",
      description: "Array of text variations. Provide 1-3 options.",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "The improved/generated text"
          },
          label: {
            type: "string",
            description: "Brief label describing this option (e.g., 'More Concise', 'Focus on Leadership')"
          }
        },
        required: ["text"],
        additionalProperties: false
      },
      minItems: 1,
      maxItems: 3
    },
    reasoning: {
      type: "string",
      description: "Optional brief explanation of what was changed or improved"
    }
  },
  required: ["options"],
  additionalProperties: false
}

// Validation function
export function validateAIResponse(data: any): AIGenerationResponse {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid AI response: not an object')
  }

  if (!Array.isArray(data.options) || data.options.length === 0) {
    throw new Error('Invalid AI response: options array is required')
  }

  // Validate each option
  data.options.forEach((opt: any, index: number) => {
    if (!opt.text || typeof opt.text !== 'string') {
      throw new Error(`Invalid AI response: option ${index} missing text`)
    }
  })

  return data as AIGenerationResponse
}

// Helper to extract single text (for backward compatibility)
export function extractSingleText(response: AIGenerationResponse): string {
  return response.options[0]?.text || ''
}
