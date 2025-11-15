import { z } from 'zod';

// Regex pour les dates au format YYYY-MM
const dateRegex = /^\d{4}-\d{2}$/;

// Schéma pour les métadonnées
const MetadataSchema = z.object({
  // Accept any language code or label to support multi-language CVs (e.g., 'fr','en','es','it','de','pt','nl','tr','ar','zh','ja','ko', etc.)
  language: z.string().min(2).max(32),
  sourceOrderPreserved: z.boolean(),
  warnings: z.array(z.string()).optional(),
});

// Schéma pour les liens
const LinksSchema = z.object({
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  portfolio: z.string().url().optional(),
});

// Schéma pour l'en-tête
const HeaderSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  links: LinksSchema.optional(),
});

// Schéma pour une expérience professionnelle
const ExperienceSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().regex(dateRegex).optional(),
  endDate: z.union([
    z.string().regex(dateRegex),
    z.literal('Present')
  ]).optional(),
  bullets: z.array(z.string().min(1)).min(1).max(5),
});

// Schéma pour un projet
const ProjectSchema = z.object({
  name: z.string().min(1),
  dates: z.string().optional(),
  bullets: z.array(z.string().min(1)).min(1).max(4),
});

// Schéma pour l'éducation
const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().optional(),
  location: z.string().optional(),
  dates: z.string().optional(),
});

// Schéma pour les compétences
const SkillsSchema = z.object({
  languages: z.array(z.string()).optional(),
  frameworks: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
  other: z.array(z.string()).optional(),
});

// Schéma principal ResumeJSON
export const ResumeJSON = z.object({
  metadata: MetadataSchema,
  header: HeaderSchema,
  summary: z.string().max(600).optional(),
  experience: z.array(ExperienceSchema).min(1).max(6),
  projects: z.array(ProjectSchema).optional(),
  education: z.array(EducationSchema).max(8),
  skills: SkillsSchema.optional(),
  languages: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  otherSections: z
    .array(
      z.object({
        title: z.string().min(1),
        items: z.array(z.string().min(1)).min(1),
      })
    )
    .optional(),
});

// Type TypeScript inféré
export type TResumeJSON = z.infer<typeof ResumeJSON>;
