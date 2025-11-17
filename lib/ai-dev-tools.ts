// AI Development Tools - Types and Utilities

export interface AIOperation {
  id: string
  timestamp: string
  operation: string
  model: string
  promptTokens: number
  completionTokens: number
  totalTokens: number
  cost: number
  costBreakdown: {
    promptCost: number
    completionCost: number
  }
  systemPrompt?: string
  userPrompt?: string
  responseText?: string
}

export interface AIModel {
  id: string
  name: string
  pricing: {
    prompt: number  // $ per 1M tokens
    completion: number
  }
  context_length: number
  description?: string
}

export interface SessionStats {
  operations: number
  totalCost: number
  totalTokens: number
  models: Record<string, number> // model -> usage count
}

export function calculateCost(
  promptTokens: number,
  completionTokens: number,
  pricing: { prompt: number; completion: number }
): { total: number; promptCost: number; completionCost: number } {
  const promptCost = (promptTokens / 1_000_000) * pricing.prompt
  const completionCost = (completionTokens / 1_000_000) * pricing.completion
  return {
    total: promptCost + completionCost,
    promptCost,
    completionCost,
  }
}

export function estimateTokens(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4)
}

export function formatCost(cost: number): string {
  if (cost < 0.000001) return '$0.000000'
  if (cost < 0.01) return `$${cost.toFixed(6)}`
  return `$${cost.toFixed(4)}`
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`
  return tokens.toString()
}
