// AI Prompt Templates - Section-specific rules and guidelines

export interface SectionPromptConfig {
  sectionName: string
  systemPromptBase: string
  rules: string[]
  userPromptTemplate: (action: string, text: string) => string
}

export const AI_SECTION_CONFIGS: Record<string, SectionPromptConfig> = {
  summary: {
    sectionName: 'Professional Summary',
    systemPromptBase: 'You are a professional CV writer specializing in professional summaries.',
    rules: [
      'This is a PROFESSIONAL SUMMARY section',
      'DO NOT mention specific company names or institutions (they\'re in Experience/Education)',
      'Focus on skills, expertise, years of experience, and unique value proposition',
      'Avoid duplication - don\'t repeat what\'s in other sections',
      'Use the context to understand seniority level and field, but don\'t copy specific details',
    ],
    userPromptTemplate: (action, text) => `${action} this professional summary:\n\n${text}`,
  },

  experience: {
    sectionName: 'Work Experience',
    systemPromptBase: 'You are a professional CV writer specializing in work experience descriptions.',
    rules: [
      'This is a WORK EXPERIENCE section',
      'Use action verbs and quantify achievements where possible',
      'Focus on impact, results, and specific accomplishments',
      'Keep it concise and achievement-focused',
      'Use past tense for previous roles, present tense for current role',
    ],
    userPromptTemplate: (action, text) => `${action} this work experience description:\n\n${text}`,
  },

  skills: {
    sectionName: 'Skills',
    systemPromptBase: 'You are a professional CV writer specializing in skills sections.',
    rules: [
      'This is a SKILLS section',
      'Be specific and relevant to the candidate\'s field',
      'Group related skills logically',
      'Avoid generic terms - be precise',
      'Include both technical and soft skills when appropriate',
    ],
    userPromptTemplate: (action, text) => `${action} this skills list:\n\n${text}`,
  },

  education: {
    sectionName: 'Education',
    systemPromptBase: 'You are a professional CV writer specializing in education sections.',
    rules: [
      'This is an EDUCATION section',
      'Include relevant coursework, honors, or achievements if applicable',
      'Keep it factual and concise',
      'Highlight academic achievements and relevant projects',
    ],
    userPromptTemplate: (action, text) => `${action} this education description:\n\n${text}`,
  },

  projects: {
    sectionName: 'Projects',
    systemPromptBase: 'You are a professional CV writer specializing in project descriptions.',
    rules: [
      'This is a PROJECTS section',
      'Focus on technologies used, your role, and outcomes',
      'Quantify impact where possible',
      'Be specific about your contributions',
      'Highlight technical skills demonstrated',
    ],
    userPromptTemplate: (action, text) => `${action} this project description:\n\n${text}`,
  },

  achievements: {
    sectionName: 'Achievements',
    systemPromptBase: 'You are a professional CV writer specializing in achievements and awards.',
    rules: [
      'This is an ACHIEVEMENTS section',
      'Be specific about what was achieved and its significance',
      'Quantify impact when possible',
      'Keep it concise and impressive',
    ],
    userPromptTemplate: (action, text) => `${action} this achievement description:\n\n${text}`,
  },

  // Default fallback
  default: {
    sectionName: 'Resume Section',
    systemPromptBase: 'You are a professional CV writer.',
    rules: [
      'Keep the text professional and concise',
      'Focus on clarity and impact',
      'Avoid redundancy with other sections',
    ],
    userPromptTemplate: (action, text) => `${action} this text:\n\n${text}`,
  },
}

export const AI_ACTION_TEMPLATES: Record<string, { verb: string; guidance: string; multipleOptions?: boolean }> = {
  continue: {
    verb: 'Continue',
    guidance: 'Write 2-3 sentences maximum. Keep the same tone and style.',
    multipleOptions: false,
  },
  improve: {
    verb: 'Improve',
    guidance: 'Make it more professional, clear, and impactful. Maintain the original meaning. Provide 2-3 different variations with different focuses (e.g., leadership, technical skills, achievements).',
    multipleOptions: true,
  },
  fix: {
    verb: 'Fix grammar and spelling in',
    guidance: 'Keep the original meaning and style.',
    multipleOptions: false,
  },
  shorter: {
    verb: 'Make shorter and more concise',
    guidance: 'Keep the key information and impact. Provide 2 variations: one very concise, one moderately concise.',
    multipleOptions: true,
  },
  longer: {
    verb: 'Expand with more details',
    guidance: 'Add relevant details and examples while keeping it professional. Provide 2 variations with different levels of detail.',
    multipleOptions: true,
  },
  simplify: {
    verb: 'Simplify',
    guidance: 'Make it clearer and easier to understand while maintaining professionalism.',
    multipleOptions: false,
  },
}

export function buildSystemPrompt(
  section: string,
  action: string
): string {
  const config = AI_SECTION_CONFIGS[section] || AI_SECTION_CONFIGS.default
  const actionTemplate = AI_ACTION_TEMPLATES[action]

  const rules = config.rules.map(rule => `- ${rule}`).join('\n')
  
  const optionsInstruction = actionTemplate?.multipleOptions
    ? 'Provide 2-3 variations in the options array, each with a descriptive label.'
    : 'Provide a single option in the options array.'
  
  return `${config.systemPromptBase}

IMPORTANT RULES:
${rules}

TASK: ${actionTemplate?.guidance || 'Help improve the text.'}

OUTPUT FORMAT:
You must respond with valid JSON matching this structure:
{
  "options": [
    {
      "text": "The improved text here",
      "label": "Brief description (e.g., 'Focus on Leadership')"
    }
  ],
  "reasoning": "Optional: Brief explanation of changes"
}

${optionsInstruction}`
}

export function buildUserPrompt(
  section: string,
  action: string,
  text: string,
  context?: string
): string {
  const config = AI_SECTION_CONFIGS[section] || AI_SECTION_CONFIGS.default
  const actionTemplate = AI_ACTION_TEMPLATES[action]
  
  const contextPrefix = context ? `Resume Context:\n${context}\n\n` : ''
  const actionVerb = actionTemplate?.verb || 'Process'
  
  return `${contextPrefix}${config.userPromptTemplate(actionVerb, text)}`
}
