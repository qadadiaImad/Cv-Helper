// src/hr/actionVerbs.it.ts
// Verbi d'azione per CV in italiano

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
    "Collaborato",
    "Coordinato",
    "Collaborato",
    "Contribuito",
    "Supportato",
    "Facilitato",
    "Favorito",
    "Unito",
    "Incoraggiato",
    "Partecipato",
  ] as const,

  leadership: [
    "Guidato",
    "Presieduto",
    "Diretto",
    "Mentorato",
    "Guidato",
    "Orchestrato",
    "Delegato",
    "Supervisionato",
    "Mobilitato",
    "Ispirato",
    "Pioniere",
  ] as const,

  responsibility: [
    "Responsabile",
    "Amministrato",
    "Eseguito",
    "Implementato",
    "Supervisionato",
    "Coordinato",
    "Gestito",
    "Consegnato",
    "Mantenuto",
  ] as const,

  communication: [
    "Presentato",
    "Informato",
    "Negoziato",
    "Articolato",
    "Documentato",
    "Moderato",
    "Coordinato",
    "Sostenuto",
    "Riportato",
    "Influenzato",
  ] as const,

  achievement: [
    "Raggiunto",
    "Superato",
    "Consegnato",
    "Assicurato",
    "Completato",
    "Realizzato",
    "Ottenuto",
  ] as const,

  workedOn: [
    "Costruito",
    "Creato",
    "Sviluppato",
    "Progettato",
    "Prodotto",
    "Implementato",
    "Distribuito",
    "Configurato",
    "Testato",
    "Lanciato",
  ] as const,

  improved: [
    "Migliorato",
    "Ottimizzato",
    "Raffinato",
    "Semplificato",
    "Elevato",
    "Rafforzato",
    "Espanso",
    "Ridotto",
    "Accelerato",
    "Perfezionato",
  ] as const,

  research: [
    "Ricercato",
    "Investigato",
    "Analizzato",
    "Valutato",
    "Sintetizzato",
    "Confrontato",
    "Esplorato",
    "Validato",
    "Esaminato",
  ] as const,

  creativity: [
    "Progettato",
    "Redatto",
    "Concettualizzato",
    "Ideato",
    "Prototipato",
    "Innovato",
    "Composto",
    "Elaborato",
    "Creato",
  ] as const,

  management: [
    "Diretto",
    "Guidato",
    "Supervisionato",
    "Amministrato",
    "Coordinato",
    "Governato",
    "Organizzato",
    "Allocato",
    "Strutturato",
    "Pianificato",
  ] as const,

  assist: [
    "Supportato",
    "Aiutato",
    "Facilitato",
    "Guidato",
    "Allenato",
    "Incoraggiato",
    "Accelerato",
    "Rinforzato",
    "Servito",
    "Accompagnato",
  ] as const,

  utilize: [
    "Applicato",
    "Impiegato",
    "Implementato",
    "Sfruttato",
    "Distribuito",
    "Operato",
    "Eseguito",
    "Mobilizzato",
    "Utilizzato",
    "Ottimizzato",
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
    "Lavorato",
    "Aiutato",
    "Usato",
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
