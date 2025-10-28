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
} from "@/templates/react";

// Legacy type - kept for backward compatibility
export type ResumeData = {
  name: string;
  email: string;
  phone: string;
  links: { label: string; url: string }[];
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; period: string; details: string[] }[];
  projects: { title: string; description: string; link?: string }[];
  skills: string[];
};

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
 * NEW UNIVERSAL TEMPLATES (7 total):
 * - atlantic_blue, executive, mercury, classic
 * - harvard, evergreen, youngcurve
 */
export const REACT_TEMPLATES = {
  // New universal templates from @/templates/react
  atlantic_blue: AtlanticBlue as any,
  executive: Executive as any,
  mercury: Mercury as any,
  classic: ClassicTemplate as any,
  harvard: Harvard as any,
  evergreen: Evergreen as any,
  youngcurve: YoungCurve as any,
};

export type TemplateId = keyof typeof REACT_TEMPLATES;
