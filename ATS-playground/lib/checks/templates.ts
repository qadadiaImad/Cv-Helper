/**
 * Template Suggestions
 * Recommends appropriate resume templates based on profile
 */

import type { ATSInput, TemplateSuggestionsSection, TemplateRecommendation } from '../types'

export function suggestTemplates(input: ATSInput): TemplateSuggestionsSection {
  const availableTemplates = input.available_templates || []
  const recommendedTemplates: TemplateRecommendation[] = []
  
  // If no templates provided, give generic advice
  if (availableTemplates.length === 0) {
    return {
      recommended_templates: [],
      generic_call_to_action: "Choose a simple one-column template with clear sections and ATS-friendly layout to maximize your chances."
    }
  }
  
  // Determine profile characteristics
  const hasJobTitle = !!input.job_title_target
  const yearsExp = input.extra_metadata?.years_of_experience || 0
  const isCreative = /designer|creative|artist|architect|writer/i.test(input.job_title_target || '')
  const isTechnical = /engineer|developer|scientist|analyst|programmer/i.test(input.job_title_target || '')
  const isCorporate = /manager|director|executive|consultant|analyst/i.test(input.job_title_target || '')
  
  // Template selection logic
  for (const template of availableTemplates) {
    const templateLower = template.toLowerCase()
    
    // Clean, minimal templates - good for everyone, especially ATS
    if (/clean|minimal|simple|classic/i.test(template)) {
      recommendedTemplates.push({
        template_name: template,
        reason: "Simple and clean layout, excellent ATS compatibility. Ideal for all sectors."
      })
    }
    
    // Modern templates - good for tech/creative
    else if (/modern|contemporary/i.test(template) && (isCreative || isTechnical)) {
      recommendedTemplates.push({
        template_name: template,
        reason: "Modern design suitable for creative and tech profiles. Remains ATS-compatible."
      })
    }
    
    // Professional/Corporate templates - good for business roles
    else if (/professional|corporate|executive/i.test(template) && (isCorporate || yearsExp > 10)) {
      recommendedTemplates.push({
        template_name: template,
        reason: "Professional appearance for executive and senior profiles."
      })
    }
    
    // One-column templates - always recommend for ATS
    else if (/one.column|single.column/i.test(template)) {
      recommendedTemplates.push({
        template_name: template,
        reason: "Single column for optimal ATS reading."
      })
    }
  }
  
  // Fallback: if no matches, recommend first 2-3 templates
  if (recommendedTemplates.length === 0 && availableTemplates.length > 0) {
    for (let i = 0; i < Math.min(3, availableTemplates.length); i++) {
      recommendedTemplates.push({
        template_name: availableTemplates[i],
        reason: "Recommended template for your profile."
      })
    }
  }
  
  // Limit to top 3
  const topRecommendations = recommendedTemplates.slice(0, 3)
  
  const callToAction = "Choose one of these ATS-tested templates and start creating your optimized resume!"
  
  return {
    recommended_templates: topRecommendations,
    generic_call_to_action: callToAction
  }
}
