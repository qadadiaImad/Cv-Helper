# RealCV Lite JSON

Un mini MVP Next.js qui permet d'adapter intelligemment un CV PDF à une offre d'emploi en utilisant l'IA OpenAI pour produire un JSON structuré.

## 🚀 Fonctionnalités

- **Upload de CV PDF** : Extraction automatique du texte (images non prises en compte)
- **Adaptation intelligente** : Utilise GPT-4o-mini pour adapter le CV à l'offre d'emploi
- **JSON structuré** : Sortie validée avec Zod selon un schéma strict
- **Préservation de l'ordre** : Maintient l'ordre original des expériences du CV
- **Optimisation ATS** : Intègre les mots-clés pertinents de l'offre d'emploi
- **Interface moderne** : UI responsive avec Tailwind CSS

## 🛠️ Stack Technique

- **Next.js 14** (App Router) + TypeScript
- **OpenAI API** (GPT-4o-mini)
- **pdf-parse** pour l'extraction de texte PDF
- **Zod** pour la validation du schéma JSON
- **Tailwind CSS** pour le styling
- **Vitest** pour les tests unitaires

## 📋 Prérequis

- Node.js 18+ 
- npm ou pnpm
- Clé API OpenAI

## 🚀 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd realcv-lite-json
```

2. **Installer les dépendances**
```bash
pnpm install
# ou
npm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env.local` à la racine :
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Lancer le serveur de développement**
```bash
pnpm dev
# ou
npm run dev
```

5. **Accéder à l'application**
Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🧪 Tests

Lancer les tests unitaires :
```bash
pnpm test
# ou
npm test
```

## 📁 Structure du Projet

```
realcv-lite-json/
├── app/
│   ├── api/adapt/route.ts     # API endpoint principal
│   ├── globals.css            # Styles globaux
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Interface utilisateur
├── lib/
│   ├── parse.ts               # Extraction PDF → texte
│   ├── prompt.ts              # System prompt OpenAI
│   └── schema.ts              # Schéma Zod ResumeJSON
├── tests/
│   ├── fixtures/sample.pdf    # PDF de test
│   └── parse.test.ts          # Tests unitaires
└── ...
```

## 🎯 Utilisation

1. **Uploader un CV PDF** : Sélectionner un fichier PDF contenant du texte (pas d'images scannées)
2. **Coller la description de poste** : Ajouter le texte de l'offre d'emploi dans la zone de texte
3. **Générer le JSON** : Cliquer sur "Générer JSON adapté"
4. **Récupérer le résultat** : Le JSON structuré s'affiche avec possibilité de copie

## 📊 Schéma JSON de Sortie

Le JSON généré respecte le schéma `ResumeJSON` avec :

- **metadata** : Langue, ordre préservé, avertissements
- **header** : Nom, email, téléphone, liens
- **summary** : Résumé professionnel (≤600 caractères)
- **experience** : Expériences professionnelles (1-6, ordre préservé)
- **projects** : Projets (optionnel)
- **education** : Formation (0-3)
- **skills** : Compétences techniques (optionnel)

## ⚠️ Limitations MVP

- **PDF texte uniquement** : Les images et PDF scannés ne sont pas pris en charge
- **Pas d'OCR** : Aucune reconnaissance optique de caractères
- **Pas de rendu** : Sortie JSON uniquement (pas de HTML/PDF)
- **Pas de stockage** : Aucune persistance des données
- **Taille limitée** : Fichiers PDF max 5MB

## 🔒 Sécurité et Confidentialité

- Les fichiers PDF ne sont pas stockés
- Logs minimaux (pas de contenu PII en clair)
- Clé API OpenAI sécurisée via variables d'environnement
- Validation stricte des entrées

## 🐛 Dépannage

### "Aucun texte détecté dans le PDF"
- Vérifier que le PDF contient du texte sélectionnable
- Les PDF scannés ou images ne sont pas supportés dans ce MVP

### "Configuration OpenAI manquante"
- Vérifier que `OPENAI_API_KEY` est définie dans `.env.local`
- Redémarrer le serveur après modification des variables d'environnement

### Erreurs de validation JSON
- Le modèle IA peut parfois générer un JSON non conforme
- Réessayer avec une description de poste plus claire

## 🚀 Déploiement

Le projet peut être déployé sur Vercel, Netlify, ou tout autre plateforme supportant Next.js.

```bash
pnpm build
pnpm start
```

## 📝 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

---

**Note** : Ce projet est un MVP (Minimum Viable Product) conçu pour démontrer l'adaptation intelligente de CV avec l'IA. Pour un usage en production, considérer l'ajout de fonctionnalités comme l'OCR, le stockage persistant, et l'authentification.
