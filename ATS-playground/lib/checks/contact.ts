/**
 * Contact Information Check
 * Verifies presence and quality of contact details
 */

import type { ATSInput, ContactInfoSection } from '../types'
import { detectContactInfo } from '../utils/text-analysis'
import { scoreToStatus } from '../ats-scorer'
import { getStrings } from '../utils/language'

export function checkContactInfo(input: ATSInput): ContactInfoSection {
  const strings = getStrings()
  
  const contact = detectContactInfo(input.resume_text)
  
  // Extract actual values (NEVER fabricate - only extract what truly exists)
  const contactValues = extractContactValues(input)
  
  // Override detection with parsed CV data (more reliable)
  const hasLinkedinFromParsed = !!(input.parsed_cv?.header?.links?.linkedin || input.parsed_cv?.header?.linkedin)
  const hasWebsiteFromParsed = !!(input.parsed_cv?.header?.links?.website || input.parsed_cv?.header?.website || input.parsed_cv?.header?.links?.github || input.parsed_cv?.header?.links?.portfolio)
  const hasEmailFromParsed = !!input.parsed_cv?.header?.email
  const hasPhoneFromParsed = !!input.parsed_cv?.header?.phone
  const hasLocationFromParsed = !!input.parsed_cv?.header?.location
  
  // Calculate score (use parsed CV data if available, otherwise use text detection)
  let score = 0
  if (contact.has_email || hasEmailFromParsed) score += 30
  if (contact.email_professional) score += 20
  if (contact.has_phone || hasPhoneFromParsed) score += 20
  if (contact.has_location || hasLocationFromParsed) score += 10
  if (contact.has_linkedin || contact.has_website || hasLinkedinFromParsed || hasWebsiteFromParsed) score += 20
  
  // Generate suggestions (use combined detection)
  const suggestions: string[] = []
  
  const finalHasEmail = contact.has_email || hasEmailFromParsed
  const finalHasPhone = contact.has_phone || hasPhoneFromParsed
  const finalHasLocation = contact.has_location || hasLocationFromParsed
  const finalHasLinkedinOrWebsite = contact.has_linkedin || contact.has_website || hasLinkedinFromParsed || hasWebsiteFromParsed
  
  if (!finalHasEmail) {
    suggestions.push(
      "⚠️ No email detected. Make sure your email is visible at the top of your resume."
    )
  } else if (!contact.email_professional) {
    suggestions.push(
      "Use a professional email (firstname.lastname@domain.com), avoid nicknames."
    )
  }
  
  if (!finalHasPhone) {
    suggestions.push(
      "Add a phone number to facilitate contact."
    )
  }
  
  if (!finalHasLocation) {
    suggestions.push(
      "Indicate your location (City, Country) for local recruiters."
    )
  }
  
  if (!finalHasLinkedinOrWebsite) {
    suggestions.push(
      "Add your LinkedIn profile or website/portfolio to strengthen your professional presence."
    )
  }
  
  if (score >= 90) {
    suggestions.push(
      "Complete and professional contact information!"
    )
  }
  
  const explanation = false
    ? `Les recruteurs doivent pouvoir vous contacter facilement. Votre CV contient : ${finalHasEmail ? '✓ Email' : '✗ Email'}, ${finalHasPhone ? '✓ Téléphone' : '✗ Téléphone'}, ${finalHasLinkedinOrWebsite ? '✓ LinkedIn/Site' : '✗ LinkedIn/Site'}. Assurez-vous que ces informations sont en haut et bien visibles.`
    : `Recruiters must be able to contact you easily. Your resume contains: ${finalHasEmail ? '✓ Email' : '✗ Email'}, ${finalHasPhone ? '✓ Phone' : '✗ Phone'}, ${finalHasLinkedinOrWebsite ? '✓ LinkedIn/Website' : '✗ LinkedIn/Website'}. Make sure this information is at the top and clearly visible.`
  
  return {
    score: Math.max(0, score),
    status: scoreToStatus(score),
    has_email: finalHasEmail,
    email_professional: contact.email_professional,
    has_phone: finalHasPhone,
    has_location: finalHasLocation,
    has_linkedin_or_website: finalHasLinkedinOrWebsite,
    explanation,
    suggestions,
    // Optional actual values for UI (NEVER fabricated!)
    email_value: contactValues.email,
    phone_value: contactValues.phone,
    location_value: contactValues.location,
    linkedin_or_website_value: contactValues.linkedin || contactValues.website
  }
}

/**
 * Extract actual contact values from parsed CV or raw text
 * IMPORTANT: Only return values that truly exist, NEVER fabricate!
 */
function extractContactValues(input: ATSInput): {
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  website?: string
} {
  const values: {
    email?: string
    phone?: string
    location?: string
    linkedin?: string
    website?: string
  } = {}
  
  // Try to get from parsed CV first (most reliable)
  if (input.parsed_cv?.header) {
    const header = input.parsed_cv.header
    if (header.email) values.email = header.email
    if (header.phone) values.phone = header.phone
    if (header.location) values.location = header.location
    
    // Check for links object (new structure)
    if (header.links?.linkedin) values.linkedin = header.links.linkedin
    if (header.links?.website) values.website = header.links.website
    if (header.links?.github) values.website = header.links.github
    if (header.links?.portfolio) values.website = header.links.portfolio
    
    // Fallback to old structure
    if (!values.linkedin && header.linkedin) values.linkedin = header.linkedin
    if (!values.website && header.website) values.website = header.website
  }
  
  // Fallback: try to extract from raw text (less reliable)
  if (!values.email) {
    const emailMatch = input.resume_text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
    if (emailMatch) values.email = emailMatch[0]
  }
  
  if (!values.phone) {
    const phoneMatch = input.resume_text.match(/\b(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/)
    if (phoneMatch) values.phone = phoneMatch[0]
  }
  
  if (!values.linkedin) {
    const linkedinMatch = input.resume_text.match(/linkedin\.com\/in\/[A-Za-z0-9-]+/i)
    if (linkedinMatch) values.linkedin = linkedinMatch[0]
  }
  
  // Only return defined values (no undefined keys)
  return Object.fromEntries(
    Object.entries(values).filter(([_, v]) => v !== undefined)
  ) as typeof values
}
