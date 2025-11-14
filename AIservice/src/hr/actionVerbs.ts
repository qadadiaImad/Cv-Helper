// src/hr/actionVerbs.ts
// Curated action verbs for resumes/CVs, grouped by recommended categories.
// Inspired by Zety's "350+ Action Words for Resume & Job Application" (2025-10-07).
// Keep this list concise and ATS-friendly; avoid rare/archaic forms.

export type ActionVerbCategory =
  | "teamwork"
  | "leadership"
  | "responsibility"
  | "communication"
  | "achievement"
  | "workedOn"
  | "improved"
  | "research"
  | "creativity"
  | "management"
  | "assist"
  | "utilize";

export const ACTION_VERB_CATEGORIES: ActionVerbCategory[] = [
  "teamwork",
  "leadership",
  "responsibility",
  "communication",
  "achievement",
  "workedOn",
  "improved",
  "research",
  "creativity",
  "management",
  "assist",
  "utilize",
];

type VerbBank = Record<ActionVerbCategory, readonly string[]>;

// NOTE: Curated subset (practical, non-redundant). Additions should be common,
 // unambiguous, and easy to translate/localize.
export const VERB_BANK: VerbBank = {
  teamwork: [
    "Collaborated",
    "Coordinated",
    "Partnered",
    "Contributed",
    "Supported",
    "Facilitated",
    "Fostered",
    "Joined",
    "United",
    "Encouraged",
  ] as const,

  leadership: [
    "Led",
    "Chaired",
    "Directed",
    "Guided",
    "Mentored",
    "Spearheaded",
    "Orchestrated",
    "Delegated",
    "Supervised",
    "Mobilized",
    "Inspired",
    "Pioneered",
  ] as const,

  responsibility: [
    // “Responsible for …” -> prefer specific actions:
    "Owned",
    "Administered",
    "Executed",
    "Implemented",
    "Oversaw",
    "Coordinated",
    "Handled",
    "Delivered",
    "Maintained",
  ] as const,

  communication: [
    "Presented",
    "Briefed",
    "Negotiated",
    "Articulated",
    "Documented",
    "Moderated",
    "Liaised",
    "Advocated",
    "Reported",
    "Influenced",
  ] as const,

  achievement: [
    "Achieved",
    "Exceeded",
    "Surpassed",
    "Delivered",
    "Secured",
    "Outperformed",
    "Completed",
    "Attained",
    "Realized",
  ] as const,

  workedOn: [
    "Built",
    "Created",
    "Developed",
    "Engineered",
    "Produced",
    "Implemented",
    "Deployed",
    "Configured",
    "Tested",
    "Launched",
  ] as const,

  improved: [
    "Improved",
    "Enhanced",
    "Optimized",
    "Refined",
    "Streamlined",
    "Elevated",
    "Strengthened",
    "Expanded",
    "Reduced",
    "Accelerated",
  ] as const,

  research: [
    "Researched",
    "Investigated",
    "Analyzed",
    "Assessed",
    "Evaluated",
    "Synthesized",
    "Benchmarked",
    "Explored",
    "Validated",
  ] as const,

  creativity: [
    "Designed",
    "Drafted",
    "Conceptualized",
    "Ideated",
    "Prototyped",
    "Innovated",
    "Composed",
    "Authored",
    "Devised",
  ] as const,

  management: [
    // Alternatives to repeating “Managed”
    "Directed",
    "Led",
    "Oversaw",
    "Administered",
    "Coordinated",
    "Supervised",
    "Governed",
    "Steered",
    "Organized",
    "Allocated",
  ] as const,

  assist: [
    // Alternatives to repeating “Assisted”
    "Supported",
    "Aided",
    "Facilitated",
    "Guided",
    "Coached",
    "Encouraged",
    "Expedited",
    "Reinforced",
    "Served",
    "Sustained",
  ] as const,

  utilize: [
    // Alternatives to “Utilized”
    "Applied",
    "Employed",
    "Implemented",
    "Leveraged",
    "Deployed",
    "Operated",
    "Executed",
    "Mobilized",
    "Put to use",
    "Optimized",
  ] as const,
};

// ---------- Helpers ----------

/**
 * Returns a de-duplicated, alphabetized list of verbs for the given categories.
 * @example getVerbs(["leadership","management"]) 
 */
export function getVerbs(categories: ActionVerbCategory[]): string[] {
  const bag = new Set<string>();
  for (const c of categories) {
    (VERB_BANK[c] ?? []).forEach(v => bag.add(v));
  }
  return Array.from(bag).sort((a, b) => a.localeCompare(b));
}

/**
 * Suggest a compact set of verbs for a common intent (bullet rewriting).
 * E.g., “lead a project” -> leadership+management; “improve process” -> improved.
 */
export function suggestVerbsForIntent(intent:
  | "lead"
  | "deliver"
  | "improve"
  | "collaborate"
  | "research"
  | "create"
  | "communicate"
): string[] {
  const map: Record<string, ActionVerbCategory[]> = {
    lead: ["leadership", "management"],
    deliver: ["achievement", "responsibility"],
    improve: ["improved", "management"],
    collaborate: ["teamwork", "communication"],
    research: ["research"],
    create: ["workedOn", "creativity"],
    communicate: ["communication", "leadership"],
  };
  return getVerbs(map[intent] ?? []);
}

/**
 * Filters out verbs that are too generic for ATS (optional guardrail).
 * Keep concise, high-signal verbs; drop vague/stretch words if provided.
 */
export function filterForATS(verbs: string[]): string[] {
  const blacklist = new Set([
    "Worked",
    "Helped",      // use “Supported/Assisted” variants with context
    "Used",        // prefer “Applied/Leveraged/Implemented”
    "Handled stuff"// example of vague phrasing to avoid
  ]);
  return verbs.filter(v => !blacklist.has(v));
}

export default {
  ACTION_VERB_CATEGORIES,
  VERB_BANK,
  getVerbs,
  suggestVerbsForIntent,
  filterForATS,
};
