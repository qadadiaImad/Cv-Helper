// src/hr/actionVerbs.de.ts
// Aktionsverben für Lebenslauf auf Deutsch

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
    "Zusammengearbeitet",
    "Koordiniert",
    "Partnerschaft",
    "Beigetragen",
    "Unterstützt",
    "Erleichtert",
    "Gefördert",
    "Beigetreten",
    "Vereint",
    "Ermutigt",
  ] as const,

  leadership: [
    "Geleitet",
    "Vorsitz geführt",
    "Geführt",
    "Betreut",
    "Vorangetrieben",
    "Orchestriert",
    "Delegiert",
    "Überwacht",
    "Mobilisiert",
    "Inspiriert",
    "Pionierarbeit geleistet",
  ] as const,

  responsibility: [
    "Verantwortlich",
    "Verwaltet",
    "Ausgeführt",
    "Implementiert",
    "Überwacht",
    "Koordiniert",
    "Behandelt",
    "Geliefert",
    "Gewartet",
  ] as const,

  communication: [
    "Präsentiert",
    "Informiert",
    "Verhandelt",
    "Artikuliert",
    "Dokumentiert",
    "Moderiert",
    "Koordiniert",
    "Befürwortet",
    "Berichtet",
    "Beeinflusst",
  ] as const,

  achievement: [
    "Erreicht",
    "Übertroffen",
    "Geliefert",
    "Gesichert",
    "Abgeschlossen",
    "Realisiert",
    "Verwirklicht",
  ] as const,

  workedOn: [
    "Gebaut",
    "Erstellt",
    "Entwickelt",
    "Entworfen",
    "Produziert",
    "Implementiert",
    "Bereitgestellt",
    "Konfiguriert",
    "Getestet",
    "Gestartet",
  ] as const,

  improved: [
    "Verbessert",
    "Optimiert",
    "Verfeinert",
    "Optimiert",
    "Erhöht",
    "Gestärkt",
    "Erweitert",
    "Reduziert",
    "Beschleunigt",
    "Perfektioniert",
  ] as const,

  research: [
    "Recherchiert",
    "Untersucht",
    "Analysiert",
    "Bewertet",
    "Synthetisiert",
    "Verglichen",
    "Erforscht",
    "Validiert",
    "Geprüft",
  ] as const,

  creativity: [
    "Entworfen",
    "Verfasst",
    "Konzipiert",
    "Ideiert",
    "Prototyp erstellt",
    "Innoviert",
    "Komponiert",
    "Entwickelt",
    "Erstellt",
  ] as const,

  management: [
    "Geleitet",
    "Geführt",
    "Überwacht",
    "Verwaltet",
    "Koordiniert",
    "Regiert",
    "Organisiert",
    "Zugewiesen",
    "Strukturiert",
    "Geplant",
  ] as const,

  assist: [
    "Unterstützt",
    "Geholfen",
    "Erleichtert",
    "Geführt",
    "Gecoacht",
    "Ermutigt",
    "Beschleunigt",
    "Verstärkt",
    "Gedient",
    "Begleitet",
  ] as const,

  utilize: [
    "Angewendet",
    "Eingesetzt",
    "Implementiert",
    "Genutzt",
    "Bereitgestellt",
    "Betrieben",
    "Ausgeführt",
    "Mobilisiert",
    "Verwendet",
    "Optimiert",
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
    "Gearbeitet",
    "Geholfen",
    "Benutzt",
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
