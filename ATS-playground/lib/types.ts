/**
 * ATS Module Type Definitions
 * Complete type system for ATS analysis input and output
 */

// ============================================
// INPUT TYPES
// ============================================

export interface ATSInput {
  resume_text: string
  file_type: string
  file_size_kb: number
  candidate_name?: string | null
  job_title_target?: string | null
  job_description?: string | null
  parse_coverage_ratio?: number | null
  available_templates?: string[] | null
  extra_metadata?: ExtraMetadata
  parsed_cv?: any // Optional: The structured JSON from Parse CV module
}

export interface ExtraMetadata {
  sections?: {
    experience?: string | null
    education?: string | null
    skills?: string | null
    summary?: string | null
    projects?: string | null
    certifications?: string | null
    languages?: string | null
  }
  font_name?: string | null
  word_count?: number | null
  bullet_count?: number | null
  years_of_experience?: number | null
}

// ============================================
// OUTPUT TYPES
// ============================================

export type SectionStatus = "excellent" | "good" | "needs_improvement" | "poor"

export interface FAQ {
  question: string
  answer: string
}

export interface ATSReport {
  language_used: string
  global_score: number
  issues_count: number
  overall_comment: string
  // Global metadata for UI
  parse_coverage_ratio: number  // 0-100
  word_count: number
  bullet_count: number
  ui_texts: { [key: string]: string }  // Localized CTA labels and microcopy
  sections: {
    ats_parse_rate: ATSParseRateSection
    design_layout: DesignLayoutSection
    keywords_relevance: KeywordsRelevanceSection
    quantify_impact: QuantifyImpactSection
    repetition: RepetitionSection
    grammar_spelling: GrammarSpellingSection
    essential_sections: EssentialSectionsSection
    contact_info: ContactInfoSection
    file_format_size: FileFormatSizeSection
    length_and_bullets: LengthBulletsSection
    style_active_voice: StyleActiveVoiceSection
    template_suggestions: TemplateSuggestionsSection
  }
}

// ============================================
// SECTION TYPES
// ============================================

export interface ATSParseRateSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  suggestions: string[]
  parse_rate: number
  // Extended for UI
  original_preview: string  // Short excerpt of original resume
  parsed_preview: string    // Short excerpt of parsed resume
  can_build_ats_resume: boolean  // True if we have enough structured data
  faqs?: FAQ[]  // Optional FAQ items
}

export interface DesignLayoutSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  suggestions: string[]
  faqs?: FAQ[]  // Optional FAQ items
}

export interface KeywordsRelevanceSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  present_keywords: KeywordItem[]
  missing_keywords: KeywordItem[]
  suggestions: string[]
}

export interface KeywordItem {
  keyword: string
  present: boolean
}

export interface EducationalExample {
  weak_example: string
  strong_example: string
  comment: string
}

export interface QuantifyImpactSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  examples: BulletExample[]  // From user's resume
  general_tips: string[]
  educational_examples?: EducationalExample[]  // Generic teaching examples
}

export interface BulletExample {
  original_bullet: string
  analysis: string
  improved_bullet: string
}

export interface RepetitionSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  top_repeated_words: RepeatedWord[]
  buzzwords_to_avoid: string[]
  suggestions: string[]
  faqs?: FAQ[]  // Optional FAQ items
}

export interface RepeatedWord {
  word: string
  count: number
  is_problematic: boolean
}

export interface GrammarSpellingSection {
  score: number
  status: SectionStatus
  headline: string
  explanation: string
  issues: GrammarIssue[]
  general_tips: string[]
  faqs?: FAQ[]  // Optional FAQ items
}

export interface GrammarIssue {
  original_text: string
  corrected_text: string
  error_type: "spelling" | "grammar" | "punctuation" | "word_choice"
}

export interface EssentialSectionsSection {
  score: number
  status: SectionStatus
  has_experience: boolean
  has_education: boolean
  has_skills: boolean
  other_sections: string[]
  explanation: string
  suggestions: string[]
}

export interface ContactInfoSection {
  score: number
  status: SectionStatus
  has_email: boolean
  email_professional: boolean
  has_phone: boolean
  has_location: boolean
  has_linkedin_or_website: boolean
  explanation: string
  suggestions: string[]
  // Optional actual values for UI display (NEVER fabricate these!)
  email_value?: string
  phone_value?: string
  location_value?: string
  linkedin_or_website_value?: string
}

export interface FileFormatSizeSection {
  score: number
  status: SectionStatus
  file_type: string
  file_type_ok: boolean
  file_size_kb: number
  file_size_ok: boolean
  explanation: string
  suggestions: string[]
  faqs?: FAQ[]  // Optional FAQ items
}

export interface LengthBulletsSection {
  score: number
  status: SectionStatus
  estimated_pages: "1" | "2" | "3+"
  long_bullets_examples: LongBulletExample[]
  explanation: string
  suggestions: string[]
}

export interface LongBulletExample {
  original_bullet: string
  shorter_version: string
}

export interface StyleActiveVoiceSection {
  score: number
  status: SectionStatus
  examples: StyleExample[]
  explanation: string
  suggestions: string[]
}

export interface StyleExample {
  original_text: string
  improved_text: string
  comment: string
}

export interface TemplateSuggestionsSection {
  recommended_templates: TemplateRecommendation[]
  generic_call_to_action: string
}

export interface TemplateRecommendation {
  template_name: string
  reason: string
}

// ============================================
// INTERNAL ANALYSIS TYPES
// ============================================

export interface AnalysisContext {
  input: ATSInput
  language: string
  hasJobDescription: boolean
  hasJobTitle: boolean
}

export interface ScorePillars {
  technical_ats: number      // 25%
  content_quality: number    // 25%
  impact_specificity: number // 25%
  relevance_keywords: number // 25%
}
