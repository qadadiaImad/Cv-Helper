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
  DoubleColumnTemplate,
  CreativeOrangeTemplate,
  TealModernTemplate,
  BeigeSidebarTemplate,
  DarkBlueOrangeTemplate,
  GrayMinimalTemplate,
  DarkProfessionalTemplate,
  OrangeSidebarTemplate,
  TealRoundedTemplate,
  NavyProfessionalTemplate,
  BlueCircularTemplate,
  JackSparrowTemplate,
  CreativeCVTemplate,
  AcademicCVTemplate,
  ModernProfessionalTemplate,
  OrangeAccentTemplate,
  RedTopBarTemplate,
  ModernResumeYellowTemplate,
  IvyLeagueTemplate,
  StockholmTemplate,
  GeometricCoralTemplate,
  ModernBlueBlackTemplate,
  AcademicBurgundyTemplate,
  AtlanticBlueEditable,
  DoubleColumnEditable,
  JackSparrowEditable,
  CreativeCVEditable,
  AcademicCVEditable,
  ModernProfessionalEditable,
  OrangeAccentEditable,
  RedTopBarEditable,
  ModernResumeYellowEditable,
  IvyLeagueEditable,
  StockholmEditable,
  CreativeOrangeEditable,
  TealModernEditable,
  BeigeSidebarEditable,
  DarkBlueOrangeEditable,
  GrayMinimalEditable,
  DarkProfessionalEditable,
  OrangeSidebarEditable,
  TealRoundedEditable,
  NavyProfessionalEditable,
  BlueCircularEditable,
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
