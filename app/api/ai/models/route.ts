import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_KEY_PDF_TO_JSON}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch models')
    }

    const { data } = await response.json()
    
    // Transform ALL models (no filtering)
    const models = data
      .map((m: any) => ({
        id: m.id,
        name: m.name || m.id,
        pricing: m.pricing ? {
          prompt: parseFloat(m.pricing.prompt) * 1_000_000, // Convert to $ per 1M tokens
          completion: parseFloat(m.pricing.completion) * 1_000_000,
        } : {
          prompt: 0,
          completion: 0,
        },
        context_length: m.context_length || 4096,
        description: m.description || '',
        architecture: m.architecture,
        top_provider: m.top_provider,
      }))
      .sort((a: any, b: any) => {
        // Sort by total cost (free models first, then by cost)
        const costA = a.pricing.prompt + a.pricing.completion
        const costB = b.pricing.prompt + b.pricing.completion
        if (costA === 0 && costB !== 0) return -1
        if (costB === 0 && costA !== 0) return 1
        return costA - costB
      })

    return NextResponse.json(models)
  } catch (error: any) {
    console.error('Models fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
