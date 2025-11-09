/**
 * REACT TEMPLATES REGISTRY
 * 
 * This file exports all available React templates for CV-Helper.
 * The old 13 templates have been removed and replaced with 7 new universal templates.
 * 
 * New templates are imported from @/templates/react and use the UniversalResumeData schema.
 */

import {
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
} from "@/templates/react";

// Legacy ResumeData type removed - now using UniversalResumeData from @/lib/schemas

/**
 * REACT_TEMPLATES Registry
 * Maps template IDs to their React components
 * 
 * OLD TEMPLATES REMOVED (13 total):
 * - classic_minimal, modern_blue, creative_gradient, elegant_black
 * - compact_cards, timeline_modern, corporate_clean, lofi_minimal
 * - color_blocks, european_standard, responsive_professional
 * - simple_elegant, rwd_modern
 * 
 * NEW UNIVERSAL TEMPLATES (27 total):
 * - atlantic_blue, executive, mercury, classic, harvard, evergreen, youngcurve
 * - double-column, creative-orange, teal-modern, beige-sidebar
 * - dark-blue-orange, gray-minimal, dark-professional, orange-sidebar
 * - teal-rounded, navy-professional, blue-circular
 * - jack-sparrow, creative-cv, academic, modern-professional
 * - orange-accent, red-topbar, modern-resume-yellow, ivy-league, stockholm
 */
export const REACT_TEMPLATES = {
  // Original universal templates from @/templates/react
  atlantic_blue: AtlanticBlue as any,
  executive: Executive as any,
  mercury: Mercury as any,
  classic: ClassicTemplate as any,
  harvard: Harvard as any,
  evergreen: Evergreen as any,
  youngcurve: YoungCurve as any,
  // New templates from playground
  'double-column': DoubleColumnTemplate as any,
  'creative-orange': CreativeOrangeTemplate as any,
  'teal-modern': TealModernTemplate as any,
  'beige-sidebar': BeigeSidebarTemplate as any,
  'dark-blue-orange': DarkBlueOrangeTemplate as any,
  'gray-minimal': GrayMinimalTemplate as any,
  'dark-professional': DarkProfessionalTemplate as any,
  'orange-sidebar': OrangeSidebarTemplate as any,
  'teal-rounded': TealRoundedTemplate as any,
  'navy-professional': NavyProfessionalTemplate as any,
  'blue-circular': BlueCircularTemplate as any,
  'jack-sparrow': JackSparrowTemplate as any,
  'creative-cv': CreativeCVTemplate as any,
  'academic': AcademicCVTemplate as any,
  'modern-professional': ModernProfessionalTemplate as any,
  'orange-accent': OrangeAccentTemplate as any,
  'red-topbar': RedTopBarTemplate as any,
  'modern-resume-yellow': ModernResumeYellowTemplate as any,
  'ivy-league': IvyLeagueTemplate as any,
  'stockholm': StockholmTemplate as any,
};

export type TemplateId = keyof typeof REACT_TEMPLATES;
