// src/hr/actionVerbs.fr.ts
// Verbes d'action pour CV en français
// Traduit et adapté depuis actionVerbs.ts

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
    "Collaboré",
    "Coordonné",
    "Coopéré",
    "Contribué",
    "Soutenu",
    "Facilité",
    "Favorisé",
    "Travaillé en équipe",
    "Appuyé",
    "Encouragé",
  ] as const,

  leadership: [
    "Dirigé",
    "Supervisé",
    "Piloté",
    "Guidé",
    "Mentoré",
    "Mené",
    "Orchestré",
    "Délégué",
    "Animé",
    "Mobilisé",
    "Inspiré",
    "Fédéré",
  ] as const,

  responsibility: [
    "Pris en charge",
    "Administré",
    "Exécuté",
    "Mis en œuvre",
    "Supervisé",
    "Coordonné",
    "Géré",
    "Livré",
    "Maintenu",
    "Assuré",
  ] as const,

  communication: [
    "Présenté",
    "Animé",
    "Négocié",
    "Expliqué",
    "Documenté",
    "Modéré",
    "Assuré la liaison",
    "Argumenté",
    "Rapporté",
    "Influencé",
  ] as const,

  achievement: [
    "Atteint",
    "Dépassé",
    "Surpassé",
    "Livré",
    "Obtenu",
    "Surperformé",
    "Complété",
    "Réalisé",
    "Accompli",
    "Concrétisé",
  ] as const,

  workedOn: [
    "Conçu",
    "Développé",
    "Construit",
    "Créé",
    "Produit",
    "Mis en œuvre",
    "Déployé",
    "Configuré",
    "Testé",
    "Lancé",
  ] as const,

  improved: [
    "Amélioré",
    "Optimisé",
    "Affiné",
    "Rationalisé",
    "Renforcé",
    "Étendu",
    "Réduit",
    "Accéléré",
    "Simplifié",
    "Perfectionné",
  ] as const,

  research: [
    "Recherché",
    "Investigé",
    "Analysé",
    "Évalué",
    "Synthétisé",
    "Benchmarké",
    "Exploré",
    "Validé",
    "Examiné",
    "Diagnostiqué",
  ] as const,

  creativity: [
    "Conçu",
    "Rédigé",
    "Conceptualisé",
    "Imaginé",
    "Prototypé",
    "Innové",
    "Composé",
    "Élaboré",
    "Créé",
    "Mis en forme",
  ] as const,

  management: [
    "Dirigé",
    "Piloté",
    "Supervisé",
    "Administré",
    "Coordonné",
    "Organisé",
    "Planifié",
    "Structuré",
    "Alloué",
    "Priorisé",
  ] as const,

  assist: [
    "Soutenu",
    "Aidé",
    "Accompagné",
    "Guidé",
    "Coaché",
    "Appuyé",
    "Facilité",
    "Assisté",
    "Renforcé",
    "Pris part",
  ] as const,

  utilize: [
    "Appliqué",
    "Employé",
    "Mis en œuvre",
    "Exploité",
    "Déployé",
    "Opéré",
    "Exécuté",
    "Mobilisé",
    "Utilisé",
    "Optimisé",
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
    "Travaillé",
    "Aidé",
    "Participé",
    "Responsable de",
    "En charge de",
    "Utilisé",
    "Géré des choses",
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
