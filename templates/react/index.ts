/**
 * REACT TEMPLATES - MAIN EXPORT FILE
 * Central export point for all React templates and utilities
 */

// Export all template components
export {
  AtlanticBlue,
  AtlanticBlueRefactored,
  Executive,
  ExecutiveRefactored,
  Mercury,
  MercuryRefactored,
  ClassicTemplate,
  ClassicRefactored,
  Harvard,
  HarvardRefactored,
  Evergreen,
  EvergreenRefactored,
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
  AtlanticBlueFieldEditable as AtlanticBlueEditable,
  DoubleColumnFieldEditable as DoubleColumnEditable,
  JackSparrowFieldEditable as JackSparrowEditable,
  CreativeCVFieldEditable as CreativeCVEditable,
  AcademicCVFieldEditable as AcademicCVEditable,
  ModernProfessionalFieldEditable as ModernProfessionalEditable,
  OrangeAccentFieldEditable as OrangeAccentEditable,
  RedTopBarFieldEditable as RedTopBarEditable,
  ModernResumeYellowFieldEditable as ModernResumeYellowEditable,
  IvyLeagueFieldEditable as IvyLeagueEditable,
  StockholmFieldEditable as StockholmEditable,
  CreativeOrangeFieldEditable as CreativeOrangeEditable,
  TealModernFieldEditable as TealModernEditable,
  BeigeSidebarFieldEditable as BeigeSidebarEditable,
  DarkBlueOrangeFieldEditable as DarkBlueOrangeEditable,
  GrayMinimalFieldEditable as GrayMinimalEditable,
  DarkProfessionalFieldEditable as DarkProfessionalEditable,
  OrangeSidebarFieldEditable as OrangeSidebarEditable,
  TealRoundedFieldEditable as TealRoundedEditable,
  NavyProfessionalFieldEditable as NavyProfessionalEditable,
  BlueCircularFieldEditable as BlueCircularEditable,
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
