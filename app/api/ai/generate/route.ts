import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { calculateCost, estimateTokens } from '@/lib/ai-dev-tools'
import { buildSystemPrompt, buildUserPrompt } from '@/lib/ai-prompts'
import { validateAIResponse, type AIGenerationResponse } from '@/lib/ai-response-schema'

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY_PDF_TO_JSON,
  baseURL: 'https://openrouter.ai/api/v1',
})

// Model pricing ($ per 1M tokens)
const MODEL_PRICING: Record<string, { prompt: number; completion: number }> = {
  'openai/gpt-3.5-turbo': { prompt: 0.5, completion: 1.5 },
  'openai/gpt-4': { prompt: 30, completion: 60 },
  'anthropic/claude-3-haiku': { prompt: 0.25, completion: 1.25 },
  'anthropic/claude-3-sonnet': { prompt: 3, completion: 15 },
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, option, model: requestedModel, context, section = 'summary' } = await req.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }
    
    const model = requestedModel || 'openai/gpt-3.5-turbo'

    // Build section-aware prompts using generic system
    const systemPrompt = buildSystemPrompt(section, option)
    const userPrompt = buildUserPrompt(section, option, prompt, context)

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },  // Enable JSON mode
    })

    let generatedText = completion.choices[0]?.message?.content || '{}'
    
    // Clean up response: remove markdown code blocks and extra brackets
    generatedText = generatedText
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim()
    
    // Remove extra outer brackets if present (e.g., [[ ... ]])
    if (generatedText.startsWith('[[') && generatedText.endsWith(']]')) {
      generatedText = generatedText.slice(1, -1).trim()
    }
    if (generatedText.startsWith('[') && generatedText.endsWith(']')) {
      // If it's an array, take the first element
      try {
        const arr = JSON.parse(generatedText)
        if (Array.isArray(arr) && arr.length > 0) {
          generatedText = JSON.stringify(arr[0])
        }
      } catch {
        // Keep as is if parsing fails
      }
    }
    
    // Parse and validate JSON response
    let aiResponse: AIGenerationResponse
    try {
      const parsed = JSON.parse(generatedText)
      aiResponse = validateAIResponse(parsed)
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      console.error('Raw response:', generatedText)
      // Fallback: treat as plain text
      aiResponse = {
        options: [{ text: generatedText }]
      }
    }
    
    // Calculate costs
    const promptTokens = completion.usage?.prompt_tokens || estimateTokens(systemPrompt + userPrompt)
    const completionTokens = completion.usage?.completion_tokens || estimateTokens(generatedText)
    const totalTokens = promptTokens + completionTokens
    
    const pricing = MODEL_PRICING[model] || MODEL_PRICING['openai/gpt-3.5-turbo']
    const costData = calculateCost(promptTokens, completionTokens, pricing)

    return NextResponse.json({ 
      ...aiResponse,  // options, reasoning
      metadata: {
        model,
        promptTokens,
        completionTokens,
        totalTokens,
        cost: costData.total,
        costBreakdown: {
          promptCost: costData.promptCost,
          completionCost: costData.completionCost,
        },
        systemPrompt,
        userPrompt,
      },
    })
  } catch (error: any) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate text' },
      { status: 500 }
    )
  }
}
