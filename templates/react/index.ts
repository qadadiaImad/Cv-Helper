/**
 * REACT TEMPLATES - MAIN EXPORT FILE
 * Central export point for all React templates and utilities
 */

// Export all template components
export {
  AtlanticBlue,
  Executive,
  Mercury,
  ClassicTemplate,
  Harvard,
  Evergreen,
  YoungCurve,
} from './universal-templates'

// Export types and schemas
export type {
  UniversalTemplateProps,
  UniversalResumeData,
  PersonalInfo,
  SocialLink,
  Summary,
  Experience,
  Education,
  Project,
  Skill,
  SkillCategory,
  Certification,
  Language,
  Publication,
  Award,
  Volunteer,
  Interest,
  Reference,
} from './universal-schema'

// Export registry and utilities
// Universal registry functions removed - use lib/template-registry.ts instead

// Export sample data for testing
export { COMPLETE_SAMPLE_DATA } from './sample-data-universal'
