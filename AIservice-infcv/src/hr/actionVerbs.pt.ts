// src/hr/actionVerbs.pt.ts
// Verbos de ação para CV em português

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
    "Coordenado",
    "Parceria",
    "Contribuído",
    "Apoiado",
    "Facilitado",
    "Fomentado",
    "Juntado",
    "Unido",
    "Encorajado",
  ] as const,

  leadership: [
    "Liderado",
    "Presidido",
    "Dirigido",
    "Guiado",
    "Mentorado",
    "Liderado",
    "Orquestrado",
    "Delegado",
    "Supervisionado",
    "Mobilizado",
    "Inspirado",
    "Pioneiro",
  ] as const,

  responsibility: [
    "Responsável",
    "Administrado",
    "Executado",
    "Implementado",
    "Supervisionado",
    "Coordenado",
    "Gerenciado",
    "Entregue",
    "Mantido",
  ] as const,

  communication: [
    "Apresentado",
    "Informado",
    "Negociado",
    "Articulado",
    "Documentado",
    "Moderado",
    "Coordenado",
    "Defendido",
    "Relatado",
    "Influenciado",
  ] as const,

  achievement: [
    "Alcançado",
    "Excedido",
    "Entregue",
    "Garantido",
    "Completado",
    "Atingido",
    "Realizado",
  ] as const,

  workedOn: [
    "Construído",
    "Criado",
    "Desenvolvido",
    "Projetado",
    "Produzido",
    "Implementado",
    "Implantado",
    "Configurado",
    "Testado",
    "Lançado",
  ] as const,

  improved: [
    "Melhorado",
    "Otimizado",
    "Refinado",
    "Simplificado",
    "Elevado",
    "Fortalecido",
    "Expandido",
    "Reduzido",
    "Acelerado",
    "Aperfeiçoado",
  ] as const,

  research: [
    "Pesquisado",
    "Investigado",
    "Analisado",
    "Avaliado",
    "Sintetizado",
    "Comparado",
    "Explorado",
    "Validado",
    "Examinado",
  ] as const,

  creativity: [
    "Projetado",
    "Redigido",
    "Conceptualizado",
    "Idealizado",
    "Prototipado",
    "Inovado",
    "Composto",
    "Elaborado",
    "Criado",
  ] as const,

  management: [
    "Dirigido",
    "Liderado",
    "Supervisionado",
    "Administrado",
    "Coordenado",
    "Governado",
    "Organizado",
    "Alocado",
    "Estruturado",
    "Planejado",
  ] as const,

  assist: [
    "Apoiado",
    "Ajudado",
    "Facilitado",
    "Guiado",
    "Treinado",
    "Encorajado",
    "Acelerado",
    "Reforçado",
    "Servido",
    "Acompanhado",
  ] as const,

  utilize: [
    "Aplicado",
    "Empregado",
    "Implementado",
    "Aproveitado",
    "Implantado",
    "Operado",
    "Executado",
    "Mobilizado",
    "Utilizado",
    "Otimizado",
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
    "Trabalhado",
    "Ajudado",
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
