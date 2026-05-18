/* global React, ReactDOM */
// live.jsx — site navigable (vs design canvas).
// Hash-based routing pour fonctionner depuis file:// comme depuis un serveur.

// ─────────────────────────────────────────────────────────────
// Hash router minimal
// ─────────────────────────────────────────────────────────────
const parseHash = () => {
  const raw = window.location.hash.slice(1) || '/';
  return raw.split('#')[0]; // strip nested anchors
};

const useRoute = () => {
  const [route, setRoute] = React.useState(parseHash());
  React.useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
};

const goTo = (path) => {
  window.location.hash = path;
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
};

// ─────────────────────────────────────────────────────────────
// Page viewport — full-bleed scroll container. The CSS responsive
// rules in styles.css collapse fixed widths on tablet/mobile.
// ─────────────────────────────────────────────────────────────
function PageViewport({ children, bg }) {
  return (
    <div className="live-scroll" style={{
      width: '100vw',
      minHeight: '100vh',
      background: bg || 'var(--canvas-color, #F0EEE9)',
      WebkitOverflowScrolling: 'touch',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile preview — show iOS screens in a row for mobile-flow demo
// ─────────────────────────────────────────────────────────────
function MobilePreview() {
  return (
    <div className="pas" style={{ width: 1800, padding: '40px 24px', background: 'var(--ink-50)' }}>
      <div style={{ textAlign: 'center', marginBottom: 32, maxWidth: 720, margin: '0 auto 32px' }}>
        <div className="chip chip-blue" style={{ marginBottom: 16 }}>Aperçu mobile</div>
        <h1 style={{ font: '500 36px/1 var(--font-display)', letterSpacing: '-0.03em', margin: 0 }}>
          Le parcours, <span className="serif" style={{ color: 'var(--blue-600)' }}>depuis le téléphone.</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-500)', marginTop: 12 }}>
          Le marché UEMOA est mobile-first. Voici les 4 écrans clés du parcours mobile.
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        {[
          { S: MobileHero, l: '1 · Accueil' },
          { S: MobileChoix, l: '2 · Choix forme' },
          { S: MobilePaiement, l: '3 · Paiement' },
          { S: MobileSuivi, l: '4 · Suivi' },
        ].map(({ S, l }) => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <IOSDevice width={402} height={874}>
              <S />
            </IOSDevice>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-700)' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Showcase pages — email & invoice (with browser/A4 chrome)
// ─────────────────────────────────────────────────────────────
function ShowcaseEmail() {
  return (
    <div className="pas" style={{ width: 980, padding: '40px 0 60px' }}>
      <EmailMockup />
    </div>
  );
}

function ShowcaseInvoice() {
  return (
    <div className="pas" style={{ width: 880, padding: '40px 0 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 12, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
        Facture imprimable · format A4 · prête pour PDF
      </div>
      <InvoicePDF />
      <button onClick={() => window.print()} className="btn btn-primary btn-lg">
        <Icon name="download" size={16} /> Imprimer / Télécharger en PDF
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 404
// ─────────────────────────────────────────────────────────────
function NotFound({ path }) {
  const nav = useNav();
  return (
    <div className="pas" style={{ width: 720, padding: '120px 40px', textAlign: 'center' }}>
      <div className="display-num" style={{ fontSize: 96, color: 'var(--ink-300)', marginBottom: 8 }}>404</div>
      <h1 style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.025em', margin: '0 0 12px' }}>
        Page introuvable
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-500)', margin: '0 0 24px' }}>
        L'adresse <code style={{ background: 'var(--ink-100)', padding: '2px 8px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 13 }}>{path}</code> n'existe pas sur ce site.
      </p>
      <button onClick={() => nav('/')} className="btn btn-primary"><Icon name="home" size={14} /> Retour à l'accueil</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile drawer — slides in from the right, holds primary nav
// (shown only on mobile via CSS media query)
// ─────────────────────────────────────────────────────────────
function MobileNav({ open, onClose, route, t, setTweak }) {
  const nav = useNav();
  const go = (p) => { nav(p); onClose(); };
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <>
      <div className={'live-mobile-nav-backdrop' + (open ? ' open' : '')} onClick={onClose} />
      <aside className={'live-mobile-nav-drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <header>
          <Logo size={26} />
          <button onClick={onClose} aria-label="Fermer le menu"><Icon name="close" size={18} /></button>
        </header>
        <nav>
          <button className={'live-mobile-nav-link primary'} onClick={() => go('/quiz')}>
            <span>Créer mon entreprise</span>
            <Icon name="arrow" size={14} />
          </button>

          <div className="live-mobile-nav-section">Navigation</div>
          {[
            ['Accueil', '/', 'home'],
            ['Tarifs', '/tarifs', 'money'],
            ['FAQ', '/faq', 'doc'],
            ['Contact', '/contact', 'mail'],
          ].map(([l, p, icon]) => (
            <button key={p} className={'live-mobile-nav-link' + (route === p ? ' active' : '')} onClick={() => go(p)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <Icon name={icon} size={16} />
                {l}
              </span>
              <Icon name="chev" size={14} />
            </button>
          ))}

          <div className="live-mobile-nav-section">Mon compte</div>
          {[
            ['Espace partenaire', '/partenaire/dashboard', 'user'],
            ['Suivi de mon dossier', '/creer/suivi', 'clock'],
            ['Devenir partenaire', '/partenaire', 'layers'],
          ].map(([l, p, icon]) => (
            <button key={p} className={'live-mobile-nav-link' + (route === p ? ' active' : '')} onClick={() => go(p)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <Icon name={icon} size={16} />
                {l}
              </span>
              <Icon name="chev" size={14} />
            </button>
          ))}

          <div className="live-mobile-nav-section">Démos design</div>
          {[
            ['Aperçu mobile', '/mobile', 'phone'],
            ['Email RCCM', '/showcase/email', 'mail'],
            ['Facture A4', '/showcase/facture', 'doc'],
            ['Admin plateforme', '/admin', 'settings'],
          ].map(([l, p, icon]) => (
            <button key={p} className={'live-mobile-nav-link' + (route === p ? ' active' : '')} onClick={() => go(p)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                <Icon name={icon} size={16} />
                {l}
              </span>
              <Icon name="chev" size={14} />
            </button>
          ))}
        </nav>
        <div className="live-mobile-nav-footer">
          <span>Thème</span>
          <button onClick={() => setTweak('darkMode', !t.darkMode)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: t.darkMode ? 'var(--ink-100)' : 'var(--ink-900)',
            color: t.darkMode ? 'var(--ink-900)' : 'white',
            border: 'none', cursor: 'pointer',
            fontSize: 13, fontFamily: 'inherit',
          }}>
            <Icon name="moon" size={13} /> {t.darkMode ? 'Mode clair' : 'Mode sombre'}
          </button>
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile header — sticky top bar (mobile only via CSS)
// ─────────────────────────────────────────────────────────────
function MobileHeader({ onOpenNav }) {
  const nav = useNav();
  return (
    <header className="live-mobile-header">
      <div onClick={() => nav('/')} style={{ cursor: 'pointer' }}>
        <Logo size={26} />
      </div>
      <button onClick={onOpenNav} aria-label="Ouvrir le menu">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 6h16M3 11h16M3 16h16" />
        </svg>
      </button>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// WhatsApp FAB — floating action button, always visible
// ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href="https://wa.me/2250700000000"
      target="_blank"
      rel="noopener noreferrer"
      className="live-whatsapp-fab"
      title="Discuter sur WhatsApp — réponse en 5 min"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <Icon name="whatsapp" size={26} color="white" />
      {hovered && (
        <span style={{
          position: 'absolute', right: 66, bottom: 10,
          whiteSpace: 'nowrap', pointerEvents: 'none',
          background: 'var(--ink-900, #0A0E1A)', color: 'white',
          padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
          boxShadow: '0 4px 16px rgba(0,0,0,.25)',
          fontFamily: 'var(--font-body)',
        }}>Réponse en moins de 5 min</span>
      )}
    </a>
  );
}

// ─────────────────────────────────────────────────────────────
// Sitemap overlay — accessible via Cmd+K / Ctrl+K (desktop)
// ─────────────────────────────────────────────────────────────
function Sitemap({ open, onClose }) {
  const nav = useNav();
  if (!open) return null;
  const go = (p) => { nav(p); onClose(); };
  const groups = [
    { t: 'Vitrine', items: [['Accueil', '/'], ['Tarifs', '/tarifs'], ['FAQ', '/faq'], ['Contact', '/contact']] },
    { t: 'Parcours client', items: [['Quiz 90s', '/quiz'], ['Choix forme', '/creer'], ['Simulation', '/creer/simulation'], ['Identité société', '/creer/identite'], ['Documents', '/creer/documents'], ['Paiement', '/creer/paiement'], ['Suivi dossier', '/creer/suivi']] },
    { t: 'Mobile', items: [['Aperçu 4 écrans', '/mobile']] },
    { t: 'Espace partenaire', items: [['Onboarding cabinet', '/partenaire'], ['Dashboard', '/partenaire/dashboard'], ['Détail dossier', '/partenaire/dossier']] },
    { t: 'Admin & docs', items: [['Vue admin', '/admin'], ['Email RCCM', '/showcase/email'], ['Facture A4', '/showcase/facture']] },
  ];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 2147483645, background: 'rgba(10,14,26,.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '8vh', fontFamily: 'var(--font-body)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 720, maxWidth: '90vw', maxHeight: '80vh', overflow: 'auto', background: 'var(--paper, #FFFFFF)', borderRadius: 16, padding: 32, boxShadow: '0 30px 80px rgba(0,0,0,.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--ink-200)' }}>
          <div>
            <div className="display-num" style={{ fontSize: 24, color: 'var(--ink-900)' }}>Plan du site</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>{groups.reduce((s, g) => s + g.items.length, 0)} pages · raccourci <kbd style={{ background: 'var(--ink-100)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 11 }}>⌘K</kbd></div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-500)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
          {groups.map((g) => (
            <div key={g.t}>
              <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>{g.t}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {g.items.map(([l, p]) => (
                  <div key={p} onClick={() => go(p)} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 6, cursor: 'pointer', alignItems: 'center', fontSize: 14, color: 'var(--ink-800)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ink-100)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <span>{l}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Live shell — top-right floating toolbar (sitemap + theme + canvas link)
// ─────────────────────────────────────────────────────────────
function LiveToolbar({ onOpenMap, t, setTweak }) {
  return (
    <div className="live-toolbar" style={{
      position: 'fixed', top: 12, right: 12, zIndex: 2147483640,
      display: 'flex', gap: 6, padding: 6,
      background: 'rgba(255,255,255,.78)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderRadius: 12, border: '0.5px solid rgba(255,255,255,.6)',
      boxShadow: '0 8px 30px rgba(0,0,0,.15)',
      fontFamily: 'var(--font-body)',
    }}>
      <button onClick={onOpenMap} title="Plan du site (⌘K)" style={btnStyle}>
        <Icon name="grid" size={14} /> <span style={{ fontSize: 12, marginLeft: 6 }}>Plan du site</span>
      </button>
      <button onClick={() => setTweak('darkMode', !t.darkMode)} title="Mode sombre" style={btnStyle}>
        <Icon name="moon" size={14} />
      </button>
    </div>
  );
}
const btnStyle = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 30, padding: '0 10px',
  background: 'rgba(255,255,255,.5)',
  border: '0.5px solid rgba(0,0,0,.08)', borderRadius: 8,
  color: 'var(--ink-900, #0A0E1A)', cursor: 'pointer',
  fontFamily: 'inherit',
};

// ─────────────────────────────────────────────────────────────
// Router — maps URL hash to component, all wrapped in PageViewport
// ─────────────────────────────────────────────────────────────
function Router({ route, heroVariant = 'B' }) {
  const HomeScreen = () => <Vitrine variant={heroVariant === 'A' ? 'A' : 'B'} />;

  switch (route) {
    case '/':              return <PageViewport bg="white"><HomeScreen /></PageViewport>;
    case '/tarifs':        return <PageViewport bg="white"><PageTarifs /></PageViewport>;
    case '/faq':           return <PageViewport bg="white"><PageFAQ /></PageViewport>;
    case '/contact':       return <PageViewport bg="white"><PageContact /></PageViewport>;
    case '/quiz':          return <PageViewport bg="var(--ink-50)"><Quiz /></PageViewport>;
    case '/creer':         return <PageViewport bg="var(--ink-50)"><Parcours step={0} /></PageViewport>;
    case '/creer/simulation': return <PageViewport bg="var(--ink-50)"><Parcours step={1} /></PageViewport>;
    case '/creer/identite':   return <PageViewport bg="var(--ink-50)"><Parcours step={2} /></PageViewport>;
    case '/creer/documents':  return <PageViewport bg="var(--ink-50)"><Upload /></PageViewport>;
    case '/creer/paiement':   return <PageViewport bg="var(--ink-50)"><Parcours step={4} /></PageViewport>;
    case '/creer/suivi':      return <PageViewport bg="var(--ink-50)"><Parcours step={5} /></PageViewport>;
    case '/mobile':           return <PageViewport bg="var(--ink-50)"><MobilePreview /></PageViewport>;
    case '/partenaire':       return <PageViewport bg="var(--ink-50)"><PartnerOnboarding /></PageViewport>;
    case '/partenaire/dashboard': return <PageViewport bg="var(--ink-50)"><PartnerDashboard /></PageViewport>;
    case '/partenaire/dossier':   return <PageViewport bg="var(--ink-50)"><PartnerDossier /></PageViewport>;
    case '/admin':            return <PageViewport bg="var(--ink-50)"><AdminDashboard /></PageViewport>;
    case '/showcase/email':   return <PageViewport bg="var(--ink-100)"><ShowcaseEmail /></PageViewport>;
    case '/showcase/facture': return <PageViewport bg="var(--ink-100)"><ShowcaseInvoice /></PageViewport>;
    default:                  return <PageViewport bg="white"><NotFound path={route} /></PageViewport>;
  }
}

// ─────────────────────────────────────────────────────────────
// LiveApp — public entry. Mounts router + tweak panel + toolbar.
// Reuses the same tweak system as the canvas (settings persist via
// the same EDITMODE block, so rebrand survives across both modes).
// ─────────────────────────────────────────────────────────────
const LIVE_TWEAK_DEFAULTS = {
  "fontDisplay": "Geist",
  "fontBody": "Geist",
  "fontSerif": "Instrument Serif",
  "heroVariant": "B",
  "primaryColor": "#2563EB",
  "primaryDark": "#1E3A8A",
  "primaryDeep": "#0B1E54",
  "inkColor": "#0A0E1A",
  "paperColor": "#FFFFFF",
  "canvasColor": "#F0EEE9",
  "accentMint": "#10B981",
  "accentAmber": "#F59E0B",
  "accentRose": "#F43F5E",
  "radiusScale": 1,
  "gradientIntensity": 1,
  "showGrain": true,
  "ctaLabel": "Créer mon entreprise",
  "ctaStyle": "primary",
  "buttonShape": "pill",
  "heroBadge": "Cabinet certifié · Cocody, Abidjan 🇨🇮",
  "brandName": "ANB Corporate",
  "headline": "Créez votre entreprise en",
  "cabinetName": "ANB Corporate",
  "cabinetCity": "Cocody, Abidjan",
  "cabinetEmail": "contact@anbcorporate.com",
  "cabinetPhone": "+225 27 22 00 00 00",
  "darkMode": false,
};

function _hexToRgb(hex) {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m) return '37,99,235';
  return m.map(h => parseInt(h, 16)).join(',');
}
function _lighten(hex, amt) {
  const [r, g, b] = _hexToRgb(hex).split(',').map(Number);
  const mix = (c) => Math.round(c + (255 - c) * amt);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

function LiveApp() {
  const [t, setTweak] = useTweaks(LIVE_TWEAK_DEFAULTS);
  const route = useRoute();
  const [mapOpen, setMapOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  // Mark body as live-mode → enables the responsive CSS overrides
  React.useEffect(() => {
    document.body.classList.add('live-mode');
    document.body.style.overflow = 'auto';
    // Update meta viewport for proper mobile rendering
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'viewport'; document.head.appendChild(meta); }
    meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    return () => document.body.classList.remove('live-mode');
  }, []);

  // Apply tweaks → CSS variables (same as canvas App)
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
    r.setProperty('--r-xs', `${6 * s}px`);
    r.setProperty('--r-sm', `${10 * s}px`);
    r.setProperty('--r-md', `${14 * s}px`);
    r.setProperty('--r-lg', `${20 * s}px`);
    r.setProperty('--r-xl', `${28 * s}px`);
    r.setProperty('--r-pill', t.buttonShape === 'square' ? `${8 * s}px` : '999px');
    const gi = t.gradientIntensity;
    const c1 = _lighten(t.primaryColor, Math.max(0, 0.05 - 0.05 * gi));
    r.setProperty('--grad-hero',
      `radial-gradient(125% 125% at 0% 0%, ${c1} 0%, ${t.primaryDark} ${45 * gi}%, ${t.primaryDeep} 100%)`);
    const rgb = _hexToRgb(t.primaryColor);
    r.setProperty('--shadow-blue', `0 12px 32px rgba(${rgb},.28), 0 4px 12px rgba(${rgb},.18)`);
    if (t.darkMode) {
      document.body.setAttribute('data-theme', 'dark');
      document.body.style.background = '#0A0E1A';
    } else {
      document.body.removeAttribute('data-theme');
      document.body.style.background = t.canvasColor;
    }
  }, [t]);

  React.useEffect(() => {
    window.__pas_copy = {
      ctaLabel: t.ctaLabel, heroBadge: t.heroBadge, brandName: t.brandName,
      headline: t.headline, buttonShape: t.buttonShape, ctaStyle: t.ctaStyle,
      cabinetName: t.cabinetName, cabinetCity: t.cabinetCity,
      cabinetEmail: t.cabinetEmail, cabinetPhone: t.cabinetPhone,
      heroVariant: t.heroVariant,
    };
    window.dispatchEvent(new CustomEvent('pas-copy-update'));
  }, [t.ctaLabel, t.heroBadge, t.brandName, t.headline, t.buttonShape, t.ctaStyle, t.cabinetName, t.cabinetCity, t.cabinetEmail, t.cabinetPhone, t.heroVariant]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMapOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setMapOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <NavCtx.Provider value={goTo}>
      <MobileHeader onOpenNav={() => setNavOpen(true)} />
      <Router route={route} heroVariant={t.heroVariant} />
      <LiveToolbar onOpenMap={() => setMapOpen(true)} t={t} setTweak={setTweak} />
      <Sitemap open={mapOpen} onClose={() => setMapOpen(false)} />
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} route={route} t={t} setTweak={setTweak} />
      <WhatsAppFAB />

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
        <TweakSelect label="Display" value={t.fontDisplay} options={['Geist', 'Inter', 'Poppins']} onChange={(v) => setTweak('fontDisplay', v)} />
        <TweakSelect label="Body" value={t.fontBody} options={['Geist', 'Inter', 'Poppins']} onChange={(v) => setTweak('fontBody', v)} />
        <TweakSelect label="Serif accent" value={t.fontSerif} options={['Instrument Serif', 'Geist', 'Inter']} onChange={(v) => setTweak('fontSerif', v)} />

        <TweakSection label="Couleurs" />
        <TweakColor label="Bleu principal" value={t.primaryColor} onChange={(v) => setTweak('primaryColor', v)} />
        <TweakColor label="Bleu foncé" value={t.primaryDark} onChange={(v) => setTweak('primaryDark', v)} />
        <TweakColor label="Bleu profond" value={t.primaryDeep} onChange={(v) => setTweak('primaryDeep', v)} />
        <TweakColor label="Encre" value={t.inkColor} onChange={(v) => setTweak('inkColor', v)} />
        <TweakColor label="Papier" value={t.paperColor} onChange={(v) => setTweak('paperColor', v)} />

        <TweakSection label="Forme & échelle" />
        <TweakSlider label="Rayon coins" min={0.5} max={2} step={0.1} value={t.radiusScale} onChange={(v) => setTweak('radiusScale', v)} />
        <TweakSlider label="Intensité gradient" min={0.4} max={1.4} step={0.05} value={t.gradientIntensity} onChange={(v) => setTweak('gradientIntensity', v)} />
        <TweakRadio label="Boutons" value={t.buttonShape} options={[{value: 'pill', label: 'Pilule'}, {value: 'square', label: 'Carrés'}]} onChange={(v) => setTweak('buttonShape', v)} />

        <TweakSection label="Hero" />
        <TweakRadio label="Variation" value={t.heroVariant} options={[{value: 'A', label: 'Bold'}, {value: 'B', label: 'Éditorial'}]} onChange={(v) => setTweak('heroVariant', v)} />

        <TweakSection label="Thème" />
        <TweakToggle label="Mode sombre intégral" value={t.darkMode} onChange={(v) => setTweak('darkMode', v)} />
      </TweaksPanel>
    </NavCtx.Provider>
  );
}

Object.assign(window, { LiveApp, useRoute, goTo, PageViewport, MobilePreview, Sitemap });
