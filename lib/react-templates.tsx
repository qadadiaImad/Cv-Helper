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
  Harvard,
  Evergreen,
  YoungCurve,
  TealModernTemplate,
  OrangeSidebarTemplate,
  TealRoundedTemplate,
  NavyProfessionalTemplate,
  BlueCircularTemplate,
  CreativeCVTemplate,
  AcademicCVTemplate,
  ModernProfessionalTemplate,
  OrangeAccentTemplate,
  RedTopBarTemplate,
  ModernResumeYellowTemplate,
  GeometricCoralTemplate,
  AcademicBurgundyTemplate,
  Template31,
  Template32,
  Template33,
  Template34,
  Template35,
  Template37,
  Template38,
  Template39,
  Template40,
  Template41,
  Template42,
  Template43,
  Template44,
  ProductManagerTemplate,
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
 * NEW UNIVERSAL TEMPLATES (29 total):
 * - atlantic_blue, executive, mercury, classic, harvard, evergreen, youngcurve
 * - double-column, creative-orange, teal-modern, beige-sidebar
 * - dark-blue-orange, gray-minimal, dark-professional, orange-sidebar
 * - teal-rounded, navy-professional, blue-circular
 * - jack-sparrow, creative-cv, academic, modern-professional
 * - orange-accent, red-topbar, modern-resume-yellow, ivy-league, stockholm
 * - geometric-coral, modern-blue-black, academic-burgundy
 */
export const REACT_TEMPLATES = {
  // Original universal templates from @/templates/react
  atlantic_blue: AtlanticBlue as any,
  executive: Executive as any,
  harvard: Harvard as any,
  evergreen: Evergreen as any,
  youngcurve: YoungCurve as any,
  // New templates from playground
  'teal-modern': TealModernTemplate as any,
  'orange-sidebar': OrangeSidebarTemplate as any,
  'teal-rounded': TealRoundedTemplate as any,
  'navy-professional': NavyProfessionalTemplate as any,
  'blue-circular': BlueCircularTemplate as any,
  'creative-cv': CreativeCVTemplate as any,
  'academic': AcademicCVTemplate as any,
  'modern-professional': ModernProfessionalTemplate as any,
  'orange-accent': OrangeAccentTemplate as any,
  'red-topbar': RedTopBarTemplate as any,
  'modern-resume-yellow': ModernResumeYellowTemplate as any,
  'geometric-coral': GeometricCoralTemplate as any,
  'academic-burgundy': AcademicBurgundyTemplate as any,
  'lauren-chen': Template31 as any,
  'orange-sidebar-left': Template32 as any,
  'slate-yellow': Template33 as any,
  'bold-yellow': Template34 as any,
  'two-column-yellow': Template35 as any,
  'premium-green': Template37 as any,
  'pastel-orange': Template38 as any,
  'hybrid-green': Template39 as any,
  'professional-purple': Template40 as any,
  'unique-orange': Template41 as any,
  'aesthetic-green': Template42 as any,
  'modern-blue-hub': Template43 as any,
  'dark-yellow-split': Template44 as any,
  'product-manager': ProductManagerTemplate as any,
};

export type TemplateId = keyof typeof REACT_TEMPLATES;
