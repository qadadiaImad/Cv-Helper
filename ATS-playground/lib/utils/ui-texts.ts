/**
 * Localized UI texts for CTAs, buttons, and microcopy
 */

export interface UITexts {
  [key: string]: string
}

export function getUITexts(language: string): UITexts {
  const texts: { [lang: string]: UITexts } = {
    en: {
      // CTAs
      cta_build_ats_resume: "Build ATS-friendly resume",
      cta_keep_original_resume: "Keep original resume",
      cta_rewrite_bullets: "Rewrite bullet points",
      cta_choose_template: "Choose a template",
      cta_improve_section: "Improve this section",
      cta_fix_issues: "Fix these issues",
      cta_view_examples: "View examples",
      
      // Section titles
      section_title_parse_rate: "ATS Parse Rate",
      section_title_design: "Design & Layout",
      section_title_keywords: "Keywords & Relevance",
      section_title_impact: "Quantify Impact",
      section_title_repetition: "Repetition & Buzzwords",
      section_title_grammar: "Grammar & Spelling",
      section_title_sections: "Essential Sections",
      section_title_contact: "Contact Information",
      section_title_format: "File Format & Size",
      section_title_length: "Length & Bullets",
      section_title_style: "Style & Active Voice",
      section_title_templates: "Template Suggestions",
      
      // Labels
      label_score: "Score",
      label_status: "Status",
      label_issues: "issues found",
      label_suggestions: "Suggestions",
      label_examples: "Examples",
      label_before: "Before",
      label_after: "After",
      
      // Status
      status_excellent: "Excellent",
      status_good: "Good",
      status_needs_improvement: "Needs Improvement",
      status_poor: "Poor",
      
      // General
      overall_title: "Overall ATS Score",
      overall_subtitle: "How well your resume performs with ATS systems",
      parse_coverage: "Parse Coverage",
      word_count: "Word Count",
      bullet_count: "Bullet Points",
    },
    
    fr: {
      // CTAs
      cta_build_ats_resume: "Créer un CV compatible ATS",
      cta_keep_original_resume: "Garder le CV original",
      cta_rewrite_bullets: "Réécrire les points",
      cta_choose_template: "Choisir un modèle",
      cta_improve_section: "Améliorer cette section",
      cta_fix_issues: "Corriger ces problèmes",
      cta_view_examples: "Voir les exemples",
      
      // Section titles
      section_title_parse_rate: "Taux d'analyse ATS",
      section_title_design: "Design et mise en page",
      section_title_keywords: "Mots-clés et pertinence",
      section_title_impact: "Quantifier l'impact",
      section_title_repetition: "Répétition et clichés",
      section_title_grammar: "Grammaire et orthographe",
      section_title_sections: "Sections essentielles",
      section_title_contact: "Informations de contact",
      section_title_format: "Format et taille du fichier",
      section_title_length: "Longueur et points",
      section_title_style: "Style et voix active",
      section_title_templates: "Suggestions de modèles",
      
      // Labels
      label_score: "Score",
      label_status: "Statut",
      label_issues: "problèmes trouvés",
      label_suggestions: "Suggestions",
      label_examples: "Exemples",
      label_before: "Avant",
      label_after: "Après",
      
      // Status
      status_excellent: "Excellent",
      status_good: "Bon",
      status_needs_improvement: "À améliorer",
      status_poor: "Faible",
      
      // General
      overall_title: "Score ATS global",
      overall_subtitle: "Performance de votre CV avec les systèmes ATS",
      parse_coverage: "Couverture d'analyse",
      word_count: "Nombre de mots",
      bullet_count: "Points de liste",
    }
  }
  
  return texts[language] || texts['en']
}

/**
 * Generate FAQ items for different sections
 */
export function getFAQs(section: string, language: string): Array<{ question: string; answer: string }> {
  const faqs: { [lang: string]: { [section: string]: Array<{ question: string; answer: string }> } } = {
    en: {
      ats_parse_rate: [
        {
          question: "What is ATS parse rate?",
          answer: "ATS parse rate measures how much of your resume content can be correctly read and extracted by Applicant Tracking Systems. A high rate (90%+) means your formatting is ATS-friendly."
        },
        {
          question: "Why does parse rate matter?",
          answer: "If an ATS can't parse your resume, recruiters may never see your information. A low parse rate means important details could be lost or misplaced."
        },
        {
          question: "How can I improve my parse rate?",
          answer: "Use simple formatting, avoid tables and text boxes, stick to standard section headings, and use a clean, single-column layout."
        }
      ],
      design_layout: [
        {
          question: "What makes a resume ATS-friendly?",
          answer: "Simple, clean formatting with standard fonts, clear section headings, no graphics or images, and consistent spacing. Avoid fancy designs that confuse parsing software."
        },
        {
          question: "Can I use colors in my resume?",
          answer: "Yes, but use them sparingly. Stick to simple accent colors for headings. Avoid colored backgrounds or text that could affect readability when printed or scanned."
        }
      ],
      repetition: [
        {
          question: "Why should I avoid buzzwords?",
          answer: "Generic buzzwords like 'team player' or 'hard worker' don't differentiate you from other candidates. Use specific examples and achievements instead."
        },
        {
          question: "How many times can I repeat a word?",
          answer: "It's natural to repeat key skills (like 'Python' or 'project management'), but avoid overusing generic verbs. Vary your language to keep the resume engaging."
        }
      ],
      grammar_spelling: [
        {
          question: "Will one typo disqualify my resume?",
          answer: "One small typo probably won't, but multiple errors signal lack of attention to detail. Always proofread carefully and have someone else review your resume."
        },
        {
          question: "Should I use American or British English?",
          answer: "Match the language style of the country where you're applying. Use American English for US jobs, British English for UK jobs."
        }
      ],
      file_format_size: [
        {
          question: "What's the best file format for resumes?",
          answer: "PDF is generally best as it preserves formatting across devices. However, some ATS systems prefer Word (.docx). When in doubt, check the job posting."
        },
        {
          question: "How large should my resume file be?",
          answer: "Keep it under 2MB. Most systems accept files up to 5-10MB, but smaller files upload faster and are less likely to cause issues."
        }
      ]
    },
    fr: {
      ats_parse_rate: [
        {
          question: "Qu'est-ce que le taux d'analyse ATS ?",
          answer: "Le taux d'analyse ATS mesure la quantité de contenu de votre CV qui peut être correctement lu et extrait par les systèmes de suivi des candidatures. Un taux élevé (90%+) signifie que votre formatage est compatible ATS."
        },
        {
          question: "Pourquoi le taux d'analyse est-il important ?",
          answer: "Si un ATS ne peut pas analyser votre CV, les recruteurs pourraient ne jamais voir vos informations. Un faible taux signifie que des détails importants pourraient être perdus."
        }
      ],
      design_layout: [
        {
          question: "Qu'est-ce qui rend un CV compatible ATS ?",
          answer: "Un formatage simple et propre avec des polices standard, des titres de section clairs, pas de graphiques ni d'images, et un espacement cohérent."
        }
      ],
      repetition: [
        {
          question: "Pourquoi éviter les mots à la mode ?",
          answer: "Les mots génériques comme 'esprit d'équipe' ne vous différencient pas. Utilisez plutôt des exemples spécifiques et des réalisations concrètes."
        }
      ],
      grammar_spelling: [
        {
          question: "Une faute de frappe éliminera-t-elle mon CV ?",
          answer: "Une petite faute ne devrait pas, mais plusieurs erreurs signalent un manque d'attention aux détails. Relisez toujours attentivement."
        }
      ],
      file_format_size: [
        {
          question: "Quel est le meilleur format pour un CV ?",
          answer: "Le PDF est généralement le meilleur car il préserve le formatage. Cependant, certains ATS préfèrent Word (.docx). En cas de doute, vérifiez l'annonce."
        }
      ]
    }
  }
  
  const langFAQs = faqs[language] || faqs['en']
  return langFAQs[section] || []
}

/**
 * Generate educational examples for quantify impact section
 */
export function getEducationalExamples(language: string) {
  const examples: { [lang: string]: Array<{ weak_example: string; strong_example: string; comment: string }> } = {
    en: [
      {
        weak_example: "Managed a team",
        strong_example: "Led a team of 8 engineers to deliver 3 major features, increasing user engagement by 25%",
        comment: "Use the XYZ method: Accomplished [X] as measured by [Y] by doing [Z]"
      },
      {
        weak_example: "Improved sales performance",
        strong_example: "Increased quarterly sales by 35% ($200K) through targeted email campaigns and client outreach",
        comment: "Always include specific numbers and percentages when possible"
      },
      {
        weak_example: "Responsible for customer support",
        strong_example: "Resolved 50+ customer tickets daily with 98% satisfaction rate, reducing response time by 40%",
        comment: "Show both volume and quality metrics"
      },
      {
        weak_example: "Worked on product development",
        strong_example: "Designed and launched 2 product features used by 10K+ users, generating $50K in new revenue",
        comment: "Connect your work to business outcomes"
      }
    ],
    fr: [
      {
        weak_example: "Géré une équipe",
        strong_example: "Dirigé une équipe de 8 ingénieurs pour livrer 3 fonctionnalités majeures, augmentant l'engagement des utilisateurs de 25%",
        comment: "Utilisez la méthode XYZ : Accompli [X] mesuré par [Y] en faisant [Z]"
      },
      {
        weak_example: "Amélioré les performances des ventes",
        strong_example: "Augmenté les ventes trimestrielles de 35% (200K€) grâce à des campagnes email ciblées",
        comment: "Incluez toujours des chiffres et pourcentages spécifiques"
      },
      {
        weak_example: "Responsable du support client",
        strong_example: "Résolu 50+ tickets clients par jour avec un taux de satisfaction de 98%, réduisant le temps de réponse de 40%",
        comment: "Montrez à la fois les métriques de volume et de qualité"
      }
    ]
  }
  
  return examples[language] || examples['en']
}
