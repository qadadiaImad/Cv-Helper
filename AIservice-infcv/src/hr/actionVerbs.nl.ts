// src/hr/actionVerbs.nl.ts
// Actiewerkwoorden voor CV in het Nederlands

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

export const VERB_BANK: VerbBank = {
  teamwork: [
    "Samengewerkt",
    "Gecoördineerd",
    "Samengewerkt",
    "Bijgedragen",
    "Ondersteund",
    "Gefaciliteerd",
    "Bevorderd",
    "Aangesloten",
    "Verenigd",
    "Aangemoedigd",
  ] as const,

  leadership: [
    "Geleid",
    "Voorgezeten",
    "Geleid",
    "Begeleid",
    "Aangevoerd",
    "Georkestreerd",
    "Gedelegeerd",
    "Gesuperviseerd",
    "Gemobiliseerd",
    "Geïnspireerd",
    "Pionierde",
  ] as const,

  responsibility: [
    "Eigenaar",
    "Beheerd",
    "Uitgevoerd",
    "Geïmplementeerd",
    "Toezicht gehouden",
    "Gecoördineerd",
    "Behandeld",
    "Geleverd",
    "Onderhouden",
  ] as const,

  communication: [
    "Gepresenteerd",
    "Geïnformeerd",
    "Onderhandeld",
    "Gearticuleerd",
    "Gedocumenteerd",
    "Gemodereerd",
    "Gecoördineerd",
    "Bepleit",
    "Gerapporteerd",
    "Beïnvloed",
  ] as const,

  achievement: [
    "Bereikt",
    "Overtroffen",
    "Geleverd",
    "Beveiligd",
    "Voltooid",
    "Gerealiseerd",
    "Verwezenlijkt",
  ] as const,

  workedOn: [
    "Gebouwd",
    "Gecreëerd",
    "Ontwikkeld",
    "Ontworpen",
    "Geproduceerd",
    "Geïmplementeerd",
    "Ingezet",
    "Geconfigureerd",
    "Getest",
    "Gelanceerd",
  ] as const,

  improved: [
    "Verbeterd",
    "Geoptimaliseerd",
    "Verfijnd",
    "Gestroomlijnd",
    "Verhoogd",
    "Versterkt",
    "Uitgebreid",
    "Verminderd",
    "Versneld",
    "Geperfectioneerd",
  ] as const,

  research: [
    "Onderzocht",
    "Onderzocht",
    "Geanalyseerd",
    "Beoordeeld",
    "Gesynthetiseerd",
    "Vergeleken",
    "Verkend",
    "Gevalideerd",
    "Onderzocht",
  ] as const,

  creativity: [
    "Ontworpen",
    "Opgesteld",
    "Geconceptualiseerd",
    "Bedacht",
    "Geprototypeerd",
    "Geïnnoveerd",
    "Samengesteld",
    "Ontwikkeld",
    "Gecreëerd",
  ] as const,

  management: [
    "Geleid",
    "Geleid",
    "Gesuperviseerd",
    "Beheerd",
    "Gecoördineerd",
    "Bestuurd",
    "Georganiseerd",
    "Toegewezen",
    "Gestructureerd",
    "Gepland",
  ] as const,

  assist: [
    "Ondersteund",
    "Geholpen",
    "Gefaciliteerd",
    "Geleid",
    "Gecoacht",
    "Aangemoedigd",
    "Versneld",
    "Versterkt",
    "Gediend",
    "Begeleid",
  ] as const,

  utilize: [
    "Toegepast",
    "Ingezet",
    "Geïmplementeerd",
    "Benut",
    "Ingezet",
    "Bediend",
    "Uitgevoerd",
    "Gemobiliseerd",
    "Gebruikt",
    "Geoptimaliseerd",
  ] as const,
};

export function getVerbs(categories: ActionVerbCategory[]): string[] {
  const bag = new Set<string>();
  for (const c of categories) {
    (VERB_BANK[c] ?? []).forEach(v => bag.add(v));
  }
  return Array.from(bag).sort((a, b) => a.localeCompare(b));
}

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

export function filterForATS(verbs: string[]): string[] {
  const blacklist = new Set([
    "Gewerkt",
    "Geholpen",
    "Gebruikt",
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
