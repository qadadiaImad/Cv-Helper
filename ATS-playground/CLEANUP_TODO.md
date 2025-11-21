# Nettoyage Final des Fichiers Checks

## Fichiers Restant à Nettoyer

Les fichiers suivants contiennent encore des références `language === 'fr'` qui causent des erreurs:

### ✅ Déjà nettoyés:
- parse-rate.ts
- design-layout.ts
- keywords.ts
- style.ts
- grammar.ts  (partiellement)
- impact.ts (partiellement)

### ⚠️ À nettoyer:
1. **repetition.ts** - lignes 46, 54, 70
2. **sections.ts** - ligne 71
3. **length.ts** - lignes 58, 64, 72, 92
4. **file-format.ts** - lignes 44, 50, 58, 66, 78
5. **contact.ts** 
6. **templates.ts**

## Comment Nettoyer

Pour chaque fichier, trouver les expressions:
```typescript
language === 'fr' ? "texte français" : "English text"
```

Et les remplacer par:
```typescript
"English text"
```

## Commande de Remplacement Manuelle

Dans chaque fichier `.ts`, remplacer:
- TOUTES les ternaires `language === 'fr' ? ... : ...`
- Garder uniquement la partie anglaise (après le `:`)

## Script PowerShell Simple

```powershell
# Pour un fichier spécifique
$file = "lib\checks\repetition.ts"
$content = Get-Content $file -Raw
$content = $content -replace 'language === [''"]fr[''"]', 'false /* en */'
Set-Content $file -Value $content -NoNewline
```

Cette approche remplace `language === 'fr'` par `false` ce qui fait que le ternaire retourne toujours la valeur anglaise.

## Test

Une fois tous les fichiers nettoyés:
```bash
npm test
```

Devrait montrer:
```
✅ Analysis complete in XX ms
Global Score: XX/100
```

Sans erreurs `language is not defined`.
