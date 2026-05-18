# ANB Corporate — Plateforme création d'entreprise

Plateforme web pour la création d'entreprise en Côte d'Ivoire et zone OHADA.
Vitrine + parcours client (création SARL/SAS/EI…) + backoffice cabinet + admin
plateforme. Conçu pour ANB Corporate, **rebrandable** pour d'autres cabinets
via panneau Tweaks intégré.

## 🚀 Deux fichiers, deux usages

| Fichier | Usage | À ouvrir quand… |
|---------|-------|-----------------|
| **`index.html`** | 🌐 Site navigable | Pour démos client, tests utilisateurs, déploiement |
| **`canvas.html`** | 🎨 Canvas de design | Pour revoir tous les écrans côte à côte, présentation interne |

Les deux fichiers sont **self-contained** — aucun serveur requis, ouvrir
directement dans Chrome / Safari / Firefox.

```bash
# macOS
open index.html        # site navigable
open canvas.html       # canvas de design

# Linux
xdg-open index.html

# Windows
start index.html
```

## 🌐 Le site navigable (`index.html`)

Site complet avec **routing hash** (`/#/tarifs`, `/#/quiz`, …) qui fonctionne
sans backend ni serveur. Les visiteurs traversent le vrai parcours :

```
Accueil → Quiz 90s → Choix forme → Simulation → Identité → Documents → Paiement → Suivi
```

### Routes disponibles

| URL | Page |
|-----|------|
| `/` | Accueil (Hero + Services + Témoignages) |
| `/tarifs` | Tarifs création + accompagnement mensuel |
| `/faq` | FAQ |
| `/contact` | Formulaire + carte Cocody |
| `/quiz` | Quiz 90s pour orienter |
| `/creer` | Choix forme juridique |
| `/creer/simulation` | Simulation prix |
| `/creer/identite` | Formulaire identité société |
| `/creer/documents` | Upload documents |
| `/creer/paiement` | Paiement Mobile Money |
| `/creer/suivi` | Suivi temps réel du dossier |
| `/mobile` | Aperçu des 4 écrans mobiles iOS |
| `/partenaire` | Onboarding cabinet (4 étapes) |
| `/partenaire/dashboard` | Backoffice — liste dossiers |
| `/partenaire/dossier` | Détail dossier client |
| `/admin` | Vue admin plateforme |
| `/showcase/email` | Email RCCM délivré |
| `/showcase/facture` | Facture A4 imprimable |

### Raccourcis clavier

- **⌘K / Ctrl+K** → plan du site (overlay avec toutes les pages)
- **Esc** → fermer un overlay

### Limites actuelles

⚠️ C'est encore un site sans backend :
- ✅ Tous les écrans fonctionnent, on traverse le parcours en cliquant
- ✅ Le formulaire de contact simule l'envoi (état de succès)
- ✅ Le parcours mémorise visuellement l'étape mais ne persiste pas les données
- ❌ Rien ne s'enregistre vraiment (pas de DB)
- ❌ Wave / OM / MTN ne sont pas branchés en vrai
- ❌ Pas d'auth utilisateur ni de session

Pour passer en site production, voir la roadmap en bas.

## 🎨 Le canvas (`canvas.html`)

Vue type Figma avec **les 19 artboards visibles côte à côte**. Sert à :
- Présenter le produit en interne à l'équipe ANB
- Faire des démos rapides ("voilà tous les écrans")
- Revoir le design avant un nouveau sprint

**Navigation** :
- Trackpad : 2 doigts pour pan, pinch pour zoom
- Souris : molette pour zoom, drag du fond pour pan
- Clic sur un artboard → mode focus plein écran (↑ ↓ ← → pour naviguer)

## 🎨 Panneau Tweaks (rebrand pour d'autres cabinets)

Disponible dans **les deux fichiers**, cliquer le bouton ✏️ en bas à droite.
Tout est éditable en **temps réel** :

- **Marque** : nom, titre hero, badge, CTA
- **Cabinet** : nom, ville, email, téléphone (propagés au backoffice et email)
- **Typographie** : Geist · Inter · Poppins · Instrument Serif
- **Couleurs** : primaire, foncé, profond, encre, accents data viz
- **Forme** : rayon des coins, intensité gradient, boutons pilule/carré
- **Hero variation** : A (bold gradient) ↔ B (éditorial minimal)
- **Mode sombre intégral** : bascule tout le canvas

Pour rebrander pour un autre cabinet : ouvrir tweaks, taper le nouveau nom,
c'est instantané sur les 19 artboards.

## 🗂️ Structure des fichiers

```
/
├── index.html              # 🌐 Site navigable (consolidé)
├── canvas.html             # 🎨 Canvas de design (consolidé)
├── build.sh                # Script de rebuild des deux fichiers
├── project/                # Sources modulaires
│   ├── PeleAI Speed.html   # Entry point modulaire du canvas
│   ├── styles.css          # Design tokens + dark mode
│   ├── primitives.jsx      # Icon, Logo, Stat, StepDot, useNav
│   ├── design-canvas.jsx   # Canvas Figma-like (pan/zoom/focus)
│   ├── tweaks-panel.jsx    # Panneau de rebrand
│   ├── ios-frame.jsx       # Frame iOS 26 pour mobile
│   ├── vitrine.jsx         # Hero, services, témoignages, footer
│   ├── parcours.jsx        # 6 écrans du parcours client desktop
│   ├── mobile.jsx          # 4 écrans mobiles
│   ├── backoffice.jsx      # Partner dashboard + admin
│   ├── extras.jsx          # Tarifs, FAQ, Quiz, Upload
│   ├── additional.jsx      # Contact, Onboarding, Email, Facture
│   └── live.jsx            # Router + LiveApp (site navigable)
└── README.md
```

### Rebuild après modification

Éditer les fichiers `project/*.jsx`, puis :

```bash
bash build.sh
```

Régénère `index.html` et `canvas.html` à la racine.

## 📋 Specs ANB Corporate

| Élément | Valeur |
|---------|--------|
| Cabinet | ANB Corporate SARL · Cocody, Angré 7e/8e tranche |
| RCCM | CI-ABJ-03-2025-B13-00359 |
| NCC | 2500120 F · Régime TEE |
| Capital | 1 000 000 FCFA |
| Couverture | Côte d'Ivoire (focus), espace OHADA / UEMOA |
| Paiements | Wave · Orange Money · MTN MoMo (3× sans frais) |

## 🗺️ Roadmap

Pour transformer ce prototype navigable en **site production avec vrais
utilisateurs** :

| Étape | Effort | Pourquoi |
|-------|--------|----------|
| 1. State management du parcours | 1 jour | Persister les inputs du formulaire entre les étapes |
| 2. Backend minimal (Node + DB) | 3-5 jours | Stocker dossiers, documents, utilisateurs |
| 3. Auth (clients + cabinet) | 2 jours | Connexion par téléphone + OTP, sessions, rôles |
| 4. Intégration Mobile Money | 3-5 jours | API Wave (officielle), OM / MTN via agrégateur |
| 5. Upload documents + stockage | 2 jours | S3 / Cloudflare R2, OCR sur les CNI |
| 6. Backoffice fonctionnel | 3-5 jours | Connecter les listes au backend, notifs WhatsApp |
| 7. Déploiement production | 1 jour | Vercel/Netlify pour le front, VPS Abidjan ou Railway pour l'API |

**Total : ~3 semaines de dev** pour un MVP fonctionnel.

## 📜 Licence

Propriétaire — ANB Corporate. Conçu comme template revendable à d'autres
cabinets d'expertise comptable et juridique en zone OHADA.
