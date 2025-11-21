import { NextRequest, NextResponse } from 'next/server'
import { OPENROUTER_KEYS, OPENROUTER_API_URL } from '../../../lib/config'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const cvText = formData.get('cv_text') as string
    
    if (!cvText) {
      return NextResponse.json(
        { error: 'cv_text is required' },
        { status: 400 }
      )
    }
    
    // Call OpenRouter to parse the CV
    const prompt = `You are a CV parser. Extract structured information from the following CV text and return it in JSON format.

Required JSON structure:
{
  "header": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string (optional)",
    "github": "string (optional)",
    "website": "string (optional)"
  },
  "summary": "string (professional summary)",
  "experience": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "bullets": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "details": ["string"]
    }
  ],
  "skills": {
    "technical": ["string"],
    "languages": ["string"],
    "tools": ["string"]
  },
  "projects": [
    {
      "title": "string",
      "description": "string",
      "technologies": ["string"],
      "bullets": ["string"]
    }
  ]
}

CV Text:
${cvText}

Return ONLY the JSON object, no additional text.`

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEYS.parsing}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3002',
        'X-Title': 'ATS Playground'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 4000
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', errorText)
      throw new Error(`OpenRouter API failed: ${response.status}`)
    }
    
    const result = await response.json()
    const content = result.choices?.[0]?.message?.content
    
    if (!content) {
      throw new Error('No content in OpenRouter response')
    }
    
    // Parse the JSON from the response
    let parsedCV
    try {
      // Remove markdown code blocks if present
      const jsonText = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsedCV = JSON.parse(jsonText)
    } catch (e) {
      console.error('Failed to parse OpenRouter response:', content)
      throw new Error('Failed to parse CV structure from AI response')
    }
    
    // Return in the format expected by the ATS module
    return NextResponse.json({
      success: true,
      clean: parsedCV
    })
    
  } catch (error) {
    console.error('CV parsing error:', error)
    return NextResponse.json(
      { 
        error: 'CV parsing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'CV Parse API (using OpenRouter)',
    version: '1.0.0',
    endpoints: {
      POST: 'Parse a CV and return structured JSON'
    }
  })
}
