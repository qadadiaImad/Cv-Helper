// src/hr/actionVerbs.es.ts
// Verbos de acción para CV en español

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
    "Colaborado",
    "Coordinado",
    "Asociado",
    "Contribuido",
    "Apoyado",
    "Facilitado",
    "Fomentado",
    "Unido",
    "Alentado",
    "Participado",
  ] as const,

  leadership: [
    "Dirigido",
    "Presidido",
    "Liderado",
    "Guiado",
    "Mentorado",
    "Encabezado",
    "Orquestado",
    "Delegado",
    "Supervisado",
    "Movilizado",
    "Inspirado",
    "Pionero",
  ] as const,

  responsibility: [
    "Responsable",
    "Administrado",
    "Ejecutado",
    "Implementado",
    "Supervisado",
    "Coordinado",
    "Gestionado",
    "Entregado",
    "Mantenido",
  ] as const,

  communication: [
    "Presentado",
    "Informado",
    "Negociado",
    "Articulado",
    "Documentado",
    "Moderado",
    "Coordinado",
    "Abogado",
    "Reportado",
    "Influenciado",
  ] as const,

  achievement: [
    "Logrado",
    "Superado",
    "Entregado",
    "Asegurado",
    "Completado",
    "Alcanzado",
    "Realizado",
    "Conseguido",
  ] as const,

  workedOn: [
    "Construido",
    "Creado",
    "Desarrollado",
    "Diseñado",
    "Producido",
    "Implementado",
    "Desplegado",
    "Configurado",
    "Probado",
    "Lanzado",
  ] as const,

  improved: [
    "Mejorado",
    "Optimizado",
    "Refinado",
    "Racionalizado",
    "Elevado",
    "Fortalecido",
    "Expandido",
    "Reducido",
    "Acelerado",
    "Perfeccionado",
  ] as const,

  research: [
    "Investigado",
    "Analizado",
    "Evaluado",
    "Sintetizado",
    "Comparado",
    "Explorado",
    "Validado",
    "Examinado",
    "Estudiado",
  ] as const,

  creativity: [
    "Diseñado",
    "Redactado",
    "Conceptualizado",
    "Ideado",
    "Prototipado",
    "Innovado",
    "Compuesto",
    "Elaborado",
    "Creado",
  ] as const,

  management: [
    "Dirigido",
    "Liderado",
    "Supervisado",
    "Administrado",
    "Coordinado",
    "Gobernado",
    "Organizado",
    "Asignado",
    "Estructurado",
    "Planificado",
  ] as const,

  assist: [
    "Apoyado",
    "Ayudado",
    "Facilitado",
    "Guiado",
    "Entrenado",
    "Alentado",
    "Acelerado",
    "Reforzado",
    "Servido",
    "Acompañado",
  ] as const,

  utilize: [
    "Aplicado",
    "Empleado",
    "Implementado",
    "Aprovechado",
    "Desplegado",
    "Operado",
    "Ejecutado",
    "Movilizado",
    "Utilizado",
    "Optimizado",
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
    "Trabajado",
    "Ayudado",
    "Usado",
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
