# ANB Corporate — Plateforme création d'entreprise

Plateforme web pour la création d'entreprise en Côte d'Ivoire et zone OHADA.
Vitrine + parcours client (création SARL/SAS/EI…) + backoffice cabinet + admin
plateforme. Conçu pour ANB Corporate, **rebrandable** pour d'autres cabinets
via panneau Tweaks intégré.

## 🚀 Lancer

Ouvrir directement `index.html` dans Chrome / Safari / Firefox — **aucun
serveur requis**, tout est self-contained (React + Babel inlinés via CDN).

```bash
# macOS / Linux
open index.html

# Windows
start index.html
```

## 📐 Ce qui est livré (7 sections, 19 artboards)

| Section | Artboards |
|---------|-----------|
| **01 · Site vitrine** | Hero A (Bold gradient) · Hero B (Éditorial serif) |
| **01b · Pages vitrine** | Tarifs (création one-shot + accompagnement mensuel) · FAQ · Contact + carte Abidjan |
| **02 · Parcours client desktop** | Quiz 90s · Choix forme · Simulation prix · Formulaire identité · Upload documents · Paiement Mobile Money · Suivi dossier |
| **03 · Parcours client mobile** | Accueil · Choix forme · Paiement · Suivi (iOS frames) |
| **04 · Backoffice partenaire** | Dashboard dossiers · Détail dossier client |
| **05 · Administration** | Vue d'ensemble plateforme · KPI globaux |
| **06 · Onboarding partenaire** | Flow d'inscription cabinet (4 étapes) |
| **07 · Communications & documents** | Email transactionnel (RCCM prêt) · Facture A4 imprimable |

## 🎨 Panneau Tweaks (rebrand pour d'autres cabinets)

Cliquer le bouton ✏️ en bas à droite pour ouvrir le panneau. Tout est éditable
en **temps réel** :

- **Marque** : nom, titre hero, badge, CTA
- **Cabinet** : nom, ville, email, téléphone (propagés au backoffice et email)
- **Typographie** : Geist · Inter · Poppins · Instrument Serif
- **Couleurs** : primaire, foncé, profond, encre, accents data viz
- **Forme** : rayon des coins, intensité gradient, boutons pilule/carré
- **Hero variation** : A (bold gradient) ↔ B (éditorial minimal)
- **Mode sombre intégral** : bascule tout le canvas

Pour rebrander pour un autre cabinet : ouvrir tweaks, taper le nouveau nom,
c'est instantané sur les 19 artboards.

## 🧭 Naviguer dans le canvas

- **Trackpad** : 2 doigts pour pan, pinch pour zoom
- **Souris** : molette pour zoom, drag du fond pour pan
- **Clic sur un artboard** → mode focus plein écran
- **Flèches ← → ↑ ↓** : naviguer entre artboards (focus mode)
- **Esc** : sortir du focus

## 🗂️ Structure des fichiers

```
/
├── index.html              # ⭐ Fichier consolidé self-contained (à ouvrir)
├── project/                # Sources modulaires (pour maintenance)
│   ├── PeleAI Speed.html   # Point d'entrée modulaire (besoin serveur HTTP)
│   ├── styles.css          # Design tokens + dark mode
│   ├── primitives.jsx      # Icon, Logo, Stat, StepDot
│   ├── design-canvas.jsx   # Canvas Figma-like (pan/zoom/focus)
│   ├── tweaks-panel.jsx    # Panneau de rebrand
│   ├── ios-frame.jsx       # Frame iOS 26 pour mobile
│   ├── vitrine.jsx         # Hero, services, témoignages, footer
│   ├── parcours.jsx        # 6 écrans du parcours client desktop
│   ├── mobile.jsx          # 4 écrans mobiles
│   ├── backoffice.jsx      # Partner dashboard + admin
│   ├── extras.jsx          # Tarifs, FAQ, Quiz, Upload
│   └── additional.jsx      # Contact, Onboarding, Email, Facture
└── README.md
```

Le `index.html` à la racine est généré en inlinant tout le contenu de
`project/`. Pour modifier le design, éditer les fichiers source, puis
régénérer `index.html` (voir script d'assemblage dans l'historique git).

## ⚠️ État actuel : prototype de design haute fidélité

C'est aujourd'hui un **canvas de design navigable** (à la Figma) — pas
encore un site web "live" où l'utilisateur cliquerait sur "Créer mon
entreprise" pour aller à l'étape suivante.

Concrètement :
- ✅ Tous les écrans existent en HTML/CSS/React, pixel-perfect
- ✅ Le canvas est interactif (pan, zoom, focus, rebrand live)
- ✅ Le rendu est fidèle au produit final
- ❌ Les boutons dans les artboards ne routent pas encore vers les autres écrans
- ❌ Les formulaires ne soumettent rien (pas de backend)
- ❌ Pas encore d'auth, de paiement réel, ni d'API RCCM

### Pour passer en site web fonctionnel

Étapes à venir :
1. **Routing** (React Router) — wirer les boutons aux étapes du parcours
2. **State management** — persister les données du parcours (Zustand / Context)
3. **Backend** — API pour soumettre les dossiers, stocker les documents
4. **Auth** — espace client + espace partenaire
5. **Paiement** — intégration Wave / Orange Money / MTN MoMo API
6. **Production** — déploiement (Vercel / Netlify / VPS Abidjan)

## 📋 Specs ANB Corporate

| Élément | Valeur |
|---------|--------|
| Cabinet | ANB Corporate SARL · Cocody, Angré 7e/8e tranche |
| RCCM | CI-ABJ-03-2025-B13-00359 |
| NCC | 2500120 F · Régime TEE |
| Capital | 1 000 000 FCFA |
| Couverture | Côte d'Ivoire (focus), espace OHADA / UEMOA |
| Paiements | Wave · Orange Money · MTN MoMo (3× sans frais) |

## 📜 Licence

Propriétaire — ANB Corporate. Conçu comme template revendable à d'autres
cabinets d'expertise comptable et juridique en zone OHADA.
