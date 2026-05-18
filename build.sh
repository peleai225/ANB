#!/bin/bash
set -euo pipefail
cd /home/claude/repo/project

HEAD='<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>__TITLE__</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>'

MID='</style>
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
</head>
<body style="margin:0; __BODY_OVERFLOW__; background:#f0eee9;">
<div id="root"></div>

<script type="text/babel" data-presets="react">'

# Components shared by both builds
COMPONENTS="design-canvas.jsx tweaks-panel.jsx ios-frame.jsx primitives.jsx vitrine.jsx parcours.jsx backoffice.jsx mobile.jsx extras.jsx additional.jsx"

# ─── Canvas tail (the original App) ───
read -r -d '' CANVAS_TAIL <<'CT' || true

// ═════════════════════════════════════════════════════════════
// Canvas App
// ═════════════════════════════════════════════════════════════
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontDisplay": "Geist", "fontBody": "Geist", "fontSerif": "Instrument Serif",
  "heroVariant": "B",
  "primaryColor": "#2563EB", "primaryDark": "#1E3A8A", "primaryDeep": "#0B1E54",
  "inkColor": "#0A0E1A", "paperColor": "#FFFFFF", "canvasColor": "#F0EEE9",
  "accentMint": "#10B981", "accentAmber": "#F59E0B", "accentRose": "#F43F5E",
  "radiusScale": 1, "gradientIntensity": 1, "showGrain": true,
  "ctaLabel": "Créer mon entreprise", "ctaStyle": "primary", "buttonShape": "pill",
  "heroBadge": "Cabinet certifié · Cocody, Abidjan 🇨🇮",
  "brandName": "ANB Corporate", "headline": "Créez votre entreprise en",
  "cabinetName": "ANB Corporate", "cabinetCity": "Cocody, Abidjan",
  "cabinetEmail": "contact@anbcorporate.com", "cabinetPhone": "+225 27 22 00 00 00",
  "darkMode": false
}/*EDITMODE-END*/;

function _hexToRgb(hex){const m=hex.replace('#','').match(/.{2}/g);if(!m)return '37,99,235';return m.map(h=>parseInt(h,16)).join(',');}
function _lighten(hex,amt){const[r,g,b]=_hexToRgb(hex).split(',').map(Number);const mix=(c)=>Math.round(c+(255-c)*amt);return `rgb(${mix(r)},${mix(g)},${mix(b)})`;}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--font-display', `"${t.fontDisplay}", system-ui, sans-serif`);
    r.setProperty('--font-body', `"${t.fontBody}", system-ui, sans-serif`);
    r.setProperty('--font-serif', `"${t.fontSerif}", "Times New Roman", serif`);
    r.setProperty('--blue-600', t.primaryColor);
    r.setProperty('--blue-700', t.primaryDark);
    r.setProperty('--blue-800', t.primaryDark);
    r.setProperty('--blue-900', t.primaryDeep);
    r.setProperty('--blue-500', _lighten(t.primaryColor, 0.15));
    r.setProperty('--blue-400', _lighten(t.primaryColor, 0.3));
    r.setProperty('--blue-300', _lighten(t.primaryColor, 0.5));
    r.setProperty('--blue-100', _lighten(t.primaryColor, 0.85));
    r.setProperty('--blue-50', _lighten(t.primaryColor, 0.93));
    r.setProperty('--ink-900', t.inkColor);
    r.setProperty('--paper', t.paperColor);
    r.setProperty('--accent-mint', t.accentMint);
    r.setProperty('--accent-amber', t.accentAmber);
    r.setProperty('--accent-rose', t.accentRose);
    const s = t.radiusScale;
    r.setProperty('--r-xs', `${6*s}px`);
    r.setProperty('--r-sm', `${10*s}px`);
    r.setProperty('--r-md', `${14*s}px`);
    r.setProperty('--r-lg', `${20*s}px`);
    r.setProperty('--r-xl', `${28*s}px`);
    r.setProperty('--r-pill', t.buttonShape === 'square' ? `${8*s}px` : '999px');
    const gi = t.gradientIntensity;
    const c1 = _lighten(t.primaryColor, Math.max(0, 0.05 - 0.05*gi));
    r.setProperty('--grad-hero', `radial-gradient(125% 125% at 0% 0%, ${c1} 0%, ${t.primaryDark} ${45*gi}%, ${t.primaryDeep} 100%)`);
    const rgb = _hexToRgb(t.primaryColor);
    r.setProperty('--shadow-blue', `0 12px 32px rgba(${rgb},.28), 0 4px 12px rgba(${rgb},.18)`);
    if (t.darkMode) { document.body.setAttribute('data-theme', 'dark'); document.body.style.background = '#0A0E1A'; }
    else { document.body.removeAttribute('data-theme'); document.body.style.background = t.canvasColor; }
  }, [t]);

  React.useEffect(() => {
    window.__pas_copy = {
      ctaLabel: t.ctaLabel, heroBadge: t.heroBadge, brandName: t.brandName,
      headline: t.headline, buttonShape: t.buttonShape, ctaStyle: t.ctaStyle,
      cabinetName: t.cabinetName, cabinetCity: t.cabinetCity,
      cabinetEmail: t.cabinetEmail, cabinetPhone: t.cabinetPhone,
    };
    window.dispatchEvent(new CustomEvent('pas-copy-update'));
  }, [t.ctaLabel, t.heroBadge, t.brandName, t.headline, t.buttonShape, t.ctaStyle, t.cabinetName, t.cabinetCity, t.cabinetEmail, t.cabinetPhone]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="vitrine" title="01 · Site vitrine" subtitle="Page d'accueil — 2 directions hero">
          <DCArtboard id="hero-a" label="A · Bold gradient + simulateur" width={1440} height={2950}>
            <Vitrine variant={t.heroVariant === 'B' ? 'B' : 'A'} />
          </DCArtboard>
          <DCArtboard id="hero-b" label="B · Éditorial minimal serif" width={1440} height={2950}>
            <Vitrine variant={t.heroVariant === 'A' ? 'B' : 'A'} />
          </DCArtboard>
        </DCSection>
        <DCSection id="vitrine-pages" title="01b · Pages vitrine" subtitle="Tarifs · FAQ · Contact">
          <DCArtboard id="tarifs" label="Tarifs (création + mensuel)" width={1440} height={1500}><PageTarifs /></DCArtboard>
          <DCArtboard id="faq" label="FAQ" width={1440} height={1100}><PageFAQ /></DCArtboard>
          <DCArtboard id="contact" label="Contact + carte Abidjan" width={1440} height={1000}><PageContact /></DCArtboard>
        </DCSection>
        <DCSection id="parcours-desktop" title="02 · Parcours client — Desktop" subtitle="Du quiz au suivi de dossier">
          <DCArtboard id="quiz" label="Quiz 90s" width={1280} height={800}><Quiz /></DCArtboard>
          <DCArtboard id="p1" label="Choix de la forme" width={1280} height={900}><Parcours step={0} /></DCArtboard>
          <DCArtboard id="p2" label="Simulation prix" width={1280} height={900}><Parcours step={1} /></DCArtboard>
          <DCArtboard id="p3" label="Formulaire identité" width={1280} height={1100}><Parcours step={2} /></DCArtboard>
          <DCArtboard id="upload" label="Upload documents" width={1280} height={900}><Upload /></DCArtboard>
          <DCArtboard id="p5" label="Paiement Mobile Money" width={1280} height={900}><Parcours step={4} /></DCArtboard>
          <DCArtboard id="p6" label="Suivi du dossier" width={1280} height={900}><Parcours step={5} /></DCArtboard>
        </DCSection>
        <DCSection id="parcours-mobile" title="03 · Parcours client — Mobile" subtitle="Le marché UEMOA est mobile-first">
          <DCArtboard id="m1" label="Accueil" width={402} height={874}><MobileWrap Screen={MobileHero} /></DCArtboard>
          <DCArtboard id="m2" label="Choix de la forme" width={402} height={874}><MobileWrap Screen={MobileChoix} /></DCArtboard>
          <DCArtboard id="m3" label="Paiement" width={402} height={874}><MobileWrap Screen={MobilePaiement} /></DCArtboard>
          <DCArtboard id="m4" label="Suivi" width={402} height={874}><MobileWrap Screen={MobileSuivi} /></DCArtboard>
        </DCSection>
        <DCSection id="partner" title="04 · Backoffice partenaire" subtitle="Cabinets / consultants">
          <DCArtboard id="bp1" label="Dashboard — dossiers" width={1440} height={900}><PartnerDashboard /></DCArtboard>
          <DCArtboard id="bp2" label="Détail dossier client" width={1440} height={900}><PartnerDossier /></DCArtboard>
        </DCSection>
        <DCSection id="admin" title="05 · Administration" subtitle="Vue plateforme — KPI globaux">
          <DCArtboard id="ad1" label="Vue d'ensemble" width={1440} height={900}><AdminDashboard /></DCArtboard>
        </DCSection>
        <DCSection id="onboarding" title="06 · Onboarding partenaire" subtitle="Pour les cabinets qui rejoignent la plateforme">
          <DCArtboard id="ob1" label="Étape 2 · Équipe & capacité" width={1280} height={1000}><PartnerOnboarding /></DCArtboard>
        </DCSection>
        <DCSection id="comms" title="07 · Communications & documents" subtitle="Email transactionnel · Facture imprimable">
          <DCArtboard id="email" label="Email — RCCM prêt" width={900} height={1280}><EmailMockup /></DCArtboard>
          <DCArtboard id="invoice" label="Facture A4 (imprimable)" width={794} height={1123}><InvoicePDF /></DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks · Rebrand">
        <TweakSection label="Marque & copy" />
        <TweakText label="Nom de marque" value={t.brandName} onChange={(v) => setTweak('brandName', v)} />
        <TweakText label="Titre hero" value={t.headline} onChange={(v) => setTweak('headline', v)} />
        <TweakText label="Badge hero" value={t.heroBadge} onChange={(v) => setTweak('heroBadge', v)} />
        <TweakText label="Texte CTA" value={t.ctaLabel} onChange={(v) => setTweak('ctaLabel', v)} />
        <TweakSection label="Cabinet" />
        <TweakText label="Nom cabinet" value={t.cabinetName} onChange={(v) => setTweak('cabinetName', v)} />
        <TweakText label="Ville" value={t.cabinetCity} onChange={(v) => setTweak('cabinetCity', v)} />
        <TweakText label="Email" value={t.cabinetEmail} onChange={(v) => setTweak('cabinetEmail', v)} />
        <TweakText label="Téléphone" value={t.cabinetPhone} onChange={(v) => setTweak('cabinetPhone', v)} />
        <TweakSection label="Typographie" />
        <TweakSelect label="Display" value={t.fontDisplay} options={['Geist','Inter','Poppins']} onChange={(v) => setTweak('fontDisplay', v)} />
        <TweakSelect label="Body" value={t.fontBody} options={['Geist','Inter','Poppins']} onChange={(v) => setTweak('fontBody', v)} />
        <TweakSelect label="Serif accent" value={t.fontSerif} options={['Instrument Serif','Geist','Inter']} onChange={(v) => setTweak('fontSerif', v)} />
        <TweakSection label="Couleurs primaires" />
        <TweakColor label="Bleu principal" value={t.primaryColor} onChange={(v) => setTweak('primaryColor', v)} />
        <TweakColor label="Bleu foncé" value={t.primaryDark} onChange={(v) => setTweak('primaryDark', v)} />
        <TweakColor label="Bleu profond" value={t.primaryDeep} onChange={(v) => setTweak('primaryDeep', v)} />
        <TweakColor label="Encre" value={t.inkColor} onChange={(v) => setTweak('inkColor', v)} />
        <TweakColor label="Papier" value={t.paperColor} onChange={(v) => setTweak('paperColor', v)} />
        <TweakColor label="Canvas" value={t.canvasColor} onChange={(v) => setTweak('canvasColor', v)} />
        <TweakSection label="Accents data viz" />
        <TweakColor label="Vert (succès)" value={t.accentMint} onChange={(v) => setTweak('accentMint', v)} />
        <TweakColor label="Ambre (alerte)" value={t.accentAmber} onChange={(v) => setTweak('accentAmber', v)} />
        <TweakColor label="Rose (erreur)" value={t.accentRose} onChange={(v) => setTweak('accentRose', v)} />
        <TweakSection label="Forme & échelle" />
        <TweakSlider label="Rayon coins" min={0.5} max={2} step={0.1} value={t.radiusScale} onChange={(v) => setTweak('radiusScale', v)} />
        <TweakSlider label="Intensité gradient" min={0.4} max={1.4} step={0.05} value={t.gradientIntensity} onChange={(v) => setTweak('gradientIntensity', v)} />
        <TweakRadio label="Boutons" value={t.buttonShape} options={[{value: 'pill', label: 'Pilule'}, {value: 'square', label: 'Carrés'}]} onChange={(v) => setTweak('buttonShape', v)} />
        <TweakSection label="Hero vitrine" />
        <TweakRadio label="Variation" value={t.heroVariant} options={[{value: 'A', label: 'Bold'}, {value: 'B', label: 'Éditorial'}]} onChange={(v) => setTweak('heroVariant', v)} />
        <TweakToggle label="Texture grain" value={t.showGrain} onChange={(v) => setTweak('showGrain', v)} />
        <TweakSection label="Thème" />
        <TweakToggle label="Mode sombre intégral" value={t.darkMode} onChange={(v) => setTweak('darkMode', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
</script>
</body>
</html>
CT

LIVE_TAIL='

ReactDOM.createRoot(document.getElementById("root")).render(<LiveApp />);
</script>
</body>
</html>'

# ─── Build canvas.html ───
{
  echo "$HEAD" | sed 's/__TITLE__/ANB Corporate · Canvas de design/'
  cat styles.css
  echo "$MID" | sed 's/__BODY_OVERFLOW__/overflow:hidden/'
  for f in $COMPONENTS; do
    echo "// === $f ==="
    cat "$f"
  done
  echo "$CANVAS_TAIL"
} > /home/claude/repo/canvas.html

# ─── Build index.html (Live site) ───
{
  echo "$HEAD" | sed 's/__TITLE__/ANB Corporate — Création d'\''entreprise en Côte d'\''Ivoire/'
  cat styles.css
  echo "$MID" | sed 's/__BODY_OVERFLOW__/overflow:hidden/'
  for f in $COMPONENTS; do
    echo "// === $f ==="
    cat "$f"
  done
  echo "// === live.jsx ==="
  cat live.jsx
  echo "$LIVE_TAIL"
} > /home/claude/repo/index.html

echo "Built:"
echo "  $(wc -c < /home/claude/repo/index.html) bytes — index.html (LIVE)"
echo "  $(wc -c < /home/claude/repo/canvas.html) bytes — canvas.html (DESIGN CANVAS)"
