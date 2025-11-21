/**
 * ACTION VERBS TRANSLATIONS
 * Translations of action verbs from English to other languages
 * Used to maintain consistency across different language CVs
 */

export type SupportedLanguage = 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'nl' | 'ar'

/**
 * Translation map: English verb -> translations in other languages
 */
export const VERB_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, string>>> = {
  // Leadership
  'Led': { fr: 'Dirigé', es: 'Dirigido', de: 'Geleitet', it: 'Guidato', pt: 'Liderado', nl: 'Geleid', ar: 'قاد' },
  'Chaired': { fr: 'Présidé', es: 'Presidido', de: 'Vorsitz geführt', it: 'Presieduto', pt: 'Presidido', nl: 'Voorgezeten' },
  'Directed': { fr: 'Dirigé', es: 'Dirigido', de: 'Geleitet', it: 'Diretto', pt: 'Dirigido', nl: 'Geleid' },
  'Guided': { fr: 'Guidé', es: 'Guiado', de: 'Geführt', it: 'Guidato', pt: 'Guiado', nl: 'Geleid' },
  'Mentored': { fr: 'Mentoré', es: 'Mentorado', de: 'Betreut', it: 'Mentorato', pt: 'Mentorado', nl: 'Begeleid' },
  'Spearheaded': { fr: 'Piloté', es: 'Encabezado', de: 'Vorangetrieben', it: 'Guidato', pt: 'Liderado', nl: 'Aangevoerd' },
  'Orchestrated': { fr: 'Orchestré', es: 'Orquestado', de: 'Orchestriert', it: 'Orchestrato', pt: 'Orquestrado', nl: 'Georkestreerd' },
  'Delegated': { fr: 'Délégué', es: 'Delegado', de: 'Delegiert', it: 'Delegato', pt: 'Delegado', nl: 'Gedelegeerd' },
  'Supervised': { fr: 'Supervisé', es: 'Supervisado', de: 'Überwacht', it: 'Supervisionato', pt: 'Supervisionado', nl: 'Gesuperviseerd' },
  'Mobilized': { fr: 'Mobilisé', es: 'Movilizado', de: 'Mobilisiert', it: 'Mobilitato', pt: 'Mobilizado', nl: 'Gemobiliseerd' },
  'Inspired': { fr: 'Inspiré', es: 'Inspirado', de: 'Inspiriert', it: 'Ispirato', pt: 'Inspirado', nl: 'Geïnspireerd' },
  'Pioneered': { fr: 'Pionnier', es: 'Pionero', de: 'Pionierarbeit geleistet', it: 'Pioniere', pt: 'Pioneiro', nl: 'Pionierde' },

  // Responsibility
  'Owned': { fr: 'Pris en charge', es: 'Responsable', de: 'Verantwortlich', it: 'Responsabile', pt: 'Responsável', nl: 'Eigenaar' },
  'Administered': { fr: 'Administré', es: 'Administrado', de: 'Verwaltet', it: 'Amministrato', pt: 'Administrado', nl: 'Beheerd' },
  'Executed': { fr: 'Exécuté', es: 'Ejecutado', de: 'Ausgeführt', it: 'Eseguito', pt: 'Executado', nl: 'Uitgevoerd' },
  'Implemented': { fr: 'Implémenté', es: 'Implementado', de: 'Implementiert', it: 'Implementato', pt: 'Implementado', nl: 'Geïmplementeerd' },
  'Oversaw': { fr: 'Supervisé', es: 'Supervisado', de: 'Überwacht', it: 'Supervisionato', pt: 'Supervisionado', nl: 'Toezicht gehouden' },
  'Coordinated': { fr: 'Coordonné', es: 'Coordinado', de: 'Koordiniert', it: 'Coordinato', pt: 'Coordenado', nl: 'Gecoördineerd' },
  'Handled': { fr: 'Géré', es: 'Gestionado', de: 'Behandelt', it: 'Gestito', pt: 'Gerenciado', nl: 'Behandeld' },
  'Delivered': { fr: 'Livré', es: 'Entregado', de: 'Geliefert', it: 'Consegnato', pt: 'Entregue', nl: 'Geleverd' },
  'Maintained': { fr: 'Maintenu', es: 'Mantenido', de: 'Gewartet', it: 'Mantenuto', pt: 'Mantido', nl: 'Onderhouden' },

  // WorkedOn
  'Built': { fr: 'Construit', es: 'Construido', de: 'Gebaut', it: 'Costruito', pt: 'Construído', nl: 'Gebouwd' },
  'Created': { fr: 'Créé', es: 'Creado', de: 'Erstellt', it: 'Creato', pt: 'Criado', nl: 'Gecreëerd' },
  'Developed': { fr: 'Développé', es: 'Desarrollado', de: 'Entwickelt', it: 'Sviluppato', pt: 'Desenvolvido', nl: 'Ontwikkeld' },
  'Engineered': { fr: 'Conçu', es: 'Diseñado', de: 'Entwickelt', it: 'Progettato', pt: 'Projetado', nl: 'Ontworpen' },
  'Produced': { fr: 'Produit', es: 'Producido', de: 'Produziert', it: 'Prodotto', pt: 'Produzido', nl: 'Geproduceerd' },
  'Deployed': { fr: 'Déployé', es: 'Desplegado', de: 'Bereitgestellt', it: 'Distribuito', pt: 'Implantado', nl: 'Ingezet' },
  'Configured': { fr: 'Configuré', es: 'Configurado', de: 'Konfiguriert', it: 'Configurato', pt: 'Configurado', nl: 'Geconfigureerd' },
  'Tested': { fr: 'Testé', es: 'Probado', de: 'Getestet', it: 'Testato', pt: 'Testado', nl: 'Getest' },
  'Launched': { fr: 'Lancé', es: 'Lanzado', de: 'Gestartet', it: 'Lanciato', pt: 'Lançado', nl: 'Gelanceerd' },

  // Improved
  'Improved': { fr: 'Amélioré', es: 'Mejorado', de: 'Verbessert', it: 'Migliorato', pt: 'Melhorado', nl: 'Verbeterd' },
  'Enhanced': { fr: 'Amélioré', es: 'Mejorado', de: 'Verbessert', it: 'Migliorato', pt: 'Melhorado', nl: 'Verbeterd' },
  'Optimized': { fr: 'Optimisé', es: 'Optimizado', de: 'Optimiert', it: 'Ottimizzato', pt: 'Otimizado', nl: 'Geoptimaliseerd' },
  'Refined': { fr: 'Affiné', es: 'Refinado', de: 'Verfeinert', it: 'Raffinato', pt: 'Refinado', nl: 'Verfijnd' },
  'Streamlined': { fr: 'Rationalisé', es: 'Optimizado', de: 'Optimiert', it: 'Semplificato', pt: 'Simplificado', nl: 'Gestroomlijnd' },
  'Elevated': { fr: 'Élevé', es: 'Elevado', de: 'Erhöht', it: 'Elevato', pt: 'Elevado', nl: 'Verhoogd' },
  'Strengthened': { fr: 'Renforcé', es: 'Fortalecido', de: 'Gestärkt', it: 'Rafforzato', pt: 'Fortalecido', nl: 'Versterkt' },
  'Expanded': { fr: 'Étendu', es: 'Expandido', de: 'Erweitert', it: 'Espanso', pt: 'Expandido', nl: 'Uitgebreid' },
  'Reduced': { fr: 'Réduit', es: 'Reducido', de: 'Reduziert', it: 'Ridotto', pt: 'Reduzido', nl: 'Verminderd' },
  'Accelerated': { fr: 'Accéléré', es: 'Acelerado', de: 'Beschleunigt', it: 'Accelerato', pt: 'Acelerado', nl: 'Versneld' },

  // Creativity
  'Designed': { fr: 'Conçu', es: 'Diseñado', de: 'Entworfen', it: 'Progettato', pt: 'Projetado', nl: 'Ontworpen' },
  'Drafted': { fr: 'Rédigé', es: 'Redactado', de: 'Entworfen', it: 'Redatto', pt: 'Redigido', nl: 'Opgesteld' },
  'Conceptualized': { fr: 'Conceptualisé', es: 'Conceptualizado', de: 'Konzipiert', it: 'Concettualizzato', pt: 'Conceptualizado', nl: 'Geconceptualiseerd' },
  'Ideated': { fr: 'Imaginé', es: 'Ideado', de: 'Ideiert', it: 'Ideato', pt: 'Idealizado', nl: 'Bedacht' },
  'Prototyped': { fr: 'Prototypé', es: 'Prototipado', de: 'Prototyp erstellt', it: 'Prototipato', pt: 'Prototipado', nl: 'Geprototypeerd' },
  'Innovated': { fr: 'Innové', es: 'Innovado', de: 'Innoviert', it: 'Innovato', pt: 'Inovado', nl: 'Geïnnoveerd' },
  'Composed': { fr: 'Composé', es: 'Compuesto', de: 'Komponiert', it: 'Composto', pt: 'Composto', nl: 'Samengesteld' },
  'Authored': { fr: 'Rédigé', es: 'Redactado', de: 'Verfasst', it: 'Scritto', pt: 'Escrito', nl: 'Geschreven' },
  'Devised': { fr: 'Élaboré', es: 'Ideado', de: 'Entwickelt', it: 'Ideato', pt: 'Elaborado', nl: 'Bedacht' },

  // Research
  'Researched': { fr: 'Recherché', es: 'Investigado', de: 'Recherchiert', it: 'Ricercato', pt: 'Pesquisado', nl: 'Onderzocht' },
  'Investigated': { fr: 'Investigué', es: 'Investigado', de: 'Untersucht', it: 'Investigato', pt: 'Investigado', nl: 'Onderzocht' },
  'Analyzed': { fr: 'Analysé', es: 'Analizado', de: 'Analysiert', it: 'Analizzato', pt: 'Analisado', nl: 'Geanalyseerd' },
  'Assessed': { fr: 'Évalué', es: 'Evaluado', de: 'Bewertet', it: 'Valutato', pt: 'Avaliado', nl: 'Beoordeeld' },
  'Evaluated': { fr: 'Évalué', es: 'Evaluado', de: 'Bewertet', it: 'Valutato', pt: 'Avaliado', nl: 'Geëvalueerd' },
  'Synthesized': { fr: 'Synthétisé', es: 'Sintetizado', de: 'Synthetisiert', it: 'Sintetizzato', pt: 'Sintetizado', nl: 'Gesynthetiseerd' },
  'Benchmarked': { fr: 'Benchmarké', es: 'Comparado', de: 'Verglichen', it: 'Confrontato', pt: 'Comparado', nl: 'Vergeleken' },
  'Explored': { fr: 'Exploré', es: 'Explorado', de: 'Erforscht', it: 'Esplorato', pt: 'Explorado', nl: 'Verkend' },
  'Validated': { fr: 'Validé', es: 'Validado', de: 'Validiert', it: 'Validato', pt: 'Validado', nl: 'Gevalideerd' },

  // Communication
  'Presented': { fr: 'Présenté', es: 'Presentado', de: 'Präsentiert', it: 'Presentato', pt: 'Apresentado', nl: 'Gepresenteerd' },
  'Briefed': { fr: 'Briefé', es: 'Informado', de: 'Informiert', it: 'Informato', pt: 'Informado', nl: 'Geïnformeerd' },
  'Negotiated': { fr: 'Négocié', es: 'Negociado', de: 'Verhandelt', it: 'Negoziato', pt: 'Negociado', nl: 'Onderhandeld' },
  'Articulated': { fr: 'Articulé', es: 'Articulado', de: 'Artikuliert', it: 'Articolato', pt: 'Articulado', nl: 'Gearticuleerd' },
  'Documented': { fr: 'Documenté', es: 'Documentado', de: 'Dokumentiert', it: 'Documentato', pt: 'Documentado', nl: 'Gedocumenteerd' },
  'Moderated': { fr: 'Modéré', es: 'Moderado', de: 'Moderiert', it: 'Moderato', pt: 'Moderado', nl: 'Gemodereerd' },
  'Liaised': { fr: 'Assuré la liaison', es: 'Coordinado', de: 'Koordiniert', it: 'Coordinato', pt: 'Coordenado', nl: 'Gecoördineerd' },
  'Advocated': { fr: 'Plaidé', es: 'Abogado', de: 'Befürwortet', it: 'Sostenuto', pt: 'Defendido', nl: 'Bepleit' },
  'Reported': { fr: 'Rapporté', es: 'Reportado', de: 'Berichtet', it: 'Riportato', pt: 'Relatado', nl: 'Gerapporteerd' },
  'Influenced': { fr: 'Influencé', es: 'Influenciado', de: 'Beeinflusst', it: 'Influenzato', pt: 'Influenciado', nl: 'Beïnvloed' },

  // Achievement
  'Achieved': { fr: 'Atteint', es: 'Logrado', de: 'Erreicht', it: 'Raggiunto', pt: 'Alcançado', nl: 'Bereikt' },
  'Exceeded': { fr: 'Dépassé', es: 'Superado', de: 'Übertroffen', it: 'Superato', pt: 'Excedido', nl: 'Overtroffen' },
  'Surpassed': { fr: 'Surpassé', es: 'Superado', de: 'Übertroffen', it: 'Superato', pt: 'Superado', nl: 'Overtroffen' },
  'Secured': { fr: 'Sécurisé', es: 'Asegurado', de: 'Gesichert', it: 'Assicurato', pt: 'Garantido', nl: 'Beveiligd' },
  'Outperformed': { fr: 'Surperformé', es: 'Superado', de: 'Übertroffen', it: 'Superato', pt: 'Superado', nl: 'Overtroffen' },
  'Completed': { fr: 'Complété', es: 'Completado', de: 'Abgeschlossen', it: 'Completato', pt: 'Completado', nl: 'Voltooid' },
  'Attained': { fr: 'Atteint', es: 'Logrado', de: 'Erreicht', it: 'Raggiunto', pt: 'Atingido', nl: 'Bereikt' },
  'Realized': { fr: 'Réalisé', es: 'Realizado', de: 'Realisiert', it: 'Realizzato', pt: 'Realizado', nl: 'Gerealiseerd' },

  // Teamwork
  'Collaborated': { fr: 'Collaboré', es: 'Colaborado', de: 'Zusammengearbeitet', it: 'Collaborato', pt: 'Colaborado', nl: 'Samengewerkt' },
  'Partnered': { fr: 'Partenariat', es: 'Asociado', de: 'Partnerschaft', it: 'Collaborato', pt: 'Parceria', nl: 'Samengewerkt' },
  'Contributed': { fr: 'Contribué', es: 'Contribuido', de: 'Beigetragen', it: 'Contribuito', pt: 'Contribuído', nl: 'Bijgedragen' },
  'Supported': { fr: 'Soutenu', es: 'Apoyado', de: 'Unterstützt', it: 'Supportato', pt: 'Apoiado', nl: 'Ondersteund' },
  'Facilitated': { fr: 'Facilité', es: 'Facilitado', de: 'Erleichtert', it: 'Facilitato', pt: 'Facilitado', nl: 'Gefaciliteerd' },
  'Fostered': { fr: 'Favorisé', es: 'Fomentado', de: 'Gefördert', it: 'Favorito', pt: 'Fomentado', nl: 'Bevorderd' },
  'Joined': { fr: 'Rejoint', es: 'Unido', de: 'Beigetreten', it: 'Unito', pt: 'Juntado', nl: 'Aangesloten' },
  'United': { fr: 'Uni', es: 'Unido', de: 'Vereint', it: 'Unito', pt: 'Unido', nl: 'Verenigd' },
  'Encouraged': { fr: 'Encouragé', es: 'Alentado', de: 'Ermutigt', it: 'Incoraggiato', pt: 'Encorajado', nl: 'Aangemoedigd' },

  // Management
  'Organized': { fr: 'Organisé', es: 'Organizado', de: 'Organisiert', it: 'Organizzato', pt: 'Organizado', nl: 'Georganiseerd' },
  'Allocated': { fr: 'Alloué', es: 'Asignado', de: 'Zugewiesen', it: 'Allocato', pt: 'Alocado', nl: 'Toegewezen' },
  'Governed': { fr: 'Gouverné', es: 'Gobernado', de: 'Regiert', it: 'Governato', pt: 'Governado', nl: 'Bestuurd' },
  'Steered': { fr: 'Piloté', es: 'Dirigido', de: 'Gesteuert', it: 'Guidato', pt: 'Dirigido', nl: 'Gestuurd' },

  // Assist
  'Aided': { fr: 'Aidé', es: 'Ayudado', de: 'Geholfen', it: 'Aiutato', pt: 'Ajudado', nl: 'Geholpen' },
  'Coached': { fr: 'Coaché', es: 'Entrenado', de: 'Gecoacht', it: 'Allenato', pt: 'Treinado', nl: 'Gecoacht' },
  'Expedited': { fr: 'Accéléré', es: 'Acelerado', de: 'Beschleunigt', it: 'Accelerato', pt: 'Acelerado', nl: 'Versneld' },
  'Reinforced': { fr: 'Renforcé', es: 'Reforzado', de: 'Verstärkt', it: 'Rinforzato', pt: 'Reforçado', nl: 'Versterkt' },
  'Served': { fr: 'Servi', es: 'Servido', de: 'Gedient', it: 'Servito', pt: 'Servido', nl: 'Gediend' },
  'Sustained': { fr: 'Soutenu', es: 'Sostenido', de: 'Aufrechterhalten', it: 'Sostenuto', pt: 'Sustentado', nl: 'Volgehouden' },

  // Utilize
  'Applied': { fr: 'Appliqué', es: 'Aplicado', de: 'Angewendet', it: 'Applicato', pt: 'Aplicado', nl: 'Toegepast' },
  'Employed': { fr: 'Employé', es: 'Empleado', de: 'Eingesetzt', it: 'Impiegato', pt: 'Empregado', nl: 'Ingezet' },
  'Leveraged': { fr: 'Exploité', es: 'Aprovechado', de: 'Genutzt', it: 'Sfruttato', pt: 'Aproveitado', nl: 'Benut' },
  'Operated': { fr: 'Opéré', es: 'Operado', de: 'Betrieben', it: 'Operato', pt: 'Operado', nl: 'Bediend' },
}

/**
 * Translates an English action verb to the target language
 * @param verb - English verb (e.g., "Led", "Designed")
 * @param targetLang - Target language code
 * @returns Translated verb or original if translation not found
 */
export function translateVerb(verb: string, targetLang: SupportedLanguage): string {
  if (targetLang === 'en') return verb
  
  const translation = VERB_TRANSLATIONS[verb]?.[targetLang]
  return translation || verb
}

/**
 * Detects and translates action verbs in a text
 * Replaces English action verbs with their translations
 * @param text - Text containing action verbs
 * @param targetLang - Target language code
 * @returns Text with translated verbs
 */
export function translateActionVerbsInText(text: string, targetLang: SupportedLanguage): string {
  if (targetLang === 'en') return text
  
  let result = text
  
  // Sort verbs by length (longest first) to avoid partial matches
  const verbs = Object.keys(VERB_TRANSLATIONS).sort((a, b) => b.length - a.length)
  
  for (const verb of verbs) {
    const translation = VERB_TRANSLATIONS[verb]?.[targetLang]
    if (translation) {
      // Match verb at start of sentence or after punctuation
      const regex = new RegExp(`\\b${verb}\\b`, 'g')
      result = result.replace(regex, translation)
    }
  }
  
  return result
}

/**
 * Normalizes language code to supported format
 * @param lang - Language code (e.g., "fr", "FR", "fra", "french")
 * @returns Normalized language code or 'en' as default
 */
export function normalizeLanguageCode(lang: string | undefined): SupportedLanguage {
  if (!lang) return 'en'
  
  const normalized = lang.toLowerCase().substring(0, 2)
  const supported: SupportedLanguage[] = ['en', 'fr', 'es', 'de', 'it', 'pt', 'nl', 'ar']
  
  return supported.includes(normalized as SupportedLanguage) 
    ? (normalized as SupportedLanguage) 
    : 'en'
}
