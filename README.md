# Site de l'association Cross Borders

Site bilingue (français / anglais) de l'association Cross Borders, Rezé (Nantes).
Site statique : aucune base de données, aucun cookie, aucune dépendance à installer.

## Modifier le site

| Quoi | Où |
| --- | --- |
| Adresse du site, e-mail, adresse postale, numéros RNA / SIREN | `src/site.mjs` |
| Textes de toutes les pages (FR et EN côte à côte) | `src/pages.mjs` |
| Couleurs, typographie, mise en page | `src/assets/style.css` |
| Quiz, filtres, liste de préparation | `src/assets/app.js` |
| Fichiers du logo (SVG et PNG) | `src/assets/brand/` |

Après chaque modification, régénérer le site :

```bash
node build.mjs
```

Le site généré se trouve dans `docs/`. Ne modifiez pas `docs/` à la main : il est réécrit à chaque génération.

## Mettre en ligne (GitHub Pages)

1. Sur GitHub : **Settings → Pages**.
2. Source : **Deploy from a branch**, branche `main`, dossier `/docs`.
3. Pour un nom de domaine personnalisé : le saisir dans **Custom domain**, puis mettre la même adresse dans `src/site.mjs` (`url`) et relancer `node build.mjs`.

## Ajouter un projet

Dans `src/pages.mjs`, dupliquer le bloc `p2026`, lui donner un nouvel identifiant et de nouvelles adresses (`slug`), puis ajouter sa carte dans la fonction `projectCards`.

## Redessiner le logo

Le logo est dessiné par `tools/make-logo.mjs` (globe, personnages, étoiles, textes convertis en tracés).
Ce n'est nécessaire que pour modifier le logo lui-même :

```bash
cd tools && npm install && node make-logo.mjs
```

Les fichiers SVG sont réécrits dans `src/assets/brand/`. Relancer ensuite `node build.mjs` à la racine.
