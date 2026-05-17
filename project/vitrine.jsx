/* global React, Icon, Logo, Stat, StepDot */
// Vitrine — homepage avec 2 variations de hero (A: gradient bold, B: minimal serif)

// Hook pour lire les copies tweakables
const useCopy = () => {
  const [c, setC] = React.useState(window.__pas_copy || {});
  React.useEffect(() => {
    const h = () => setC({ ...window.__pas_copy });
    window.addEventListener('pas-copy-update', h);
    return () => window.removeEventListener('pas-copy-update', h);
  }, []);
  return {
    ctaLabel: c.ctaLabel || 'Créer mon entreprise',
    heroBadge: c.heroBadge || "Disponible dans 8 pays UEMOA",
    brandName: c.brandName || 'PeleAI Speed',
    headline: c.headline || 'Votre entreprise,',
  };
};

const VitrineNav = ({ light = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 56px',
    color: light ? 'white' : 'var(--ink-900)',
  }}>
    <Logo light={light} />
    <div style={{ display: 'flex', gap: 28, font: '500 14px/1 var(--font-body)' }}>
      {['Services', 'Comment ça marche', 'Tarifs', 'Partenaires', 'FAQ'].map((s) => (
        <span key={s} style={{ opacity: light ? 0.85 : 0.75, cursor: 'pointer' }}>{s}</span>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      <button className="btn btn-sm" style={{ background: 'transparent', color: light ? 'white' : 'var(--ink-900)', border: `1px solid ${light ? 'rgba(255,255,255,.25)' : 'var(--ink-200)'}` }}>Connexion</button>
      <button className="btn btn-sm" style={{ background: light ? 'white' : 'var(--ink-900)', color: light ? 'var(--ink-900)' : 'white' }}>
        Créer mon entreprise <Icon name="arrow" size={14} />
      </button>
    </div>
  </div>
);

// HERO A — Gradient bold, gros chiffres, claim massif
const HeroA = () => {
  const copy = useCopy();
  return (
  <div className="grain" style={{ position: 'relative', background: 'var(--grad-hero)', color: 'white', overflow: 'hidden' }}>
    <VitrineNav light />
    <div style={{ position: 'relative', padding: '40px 56px 80px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <div className="chip" style={{ background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.9)', backdropFilter: 'blur(10px)', marginBottom: 24 }}>
          <span className="chip-dot" style={{ color: '#34D399' }}></span> {copy.heroBadge}
        </div>
        <h1 style={{ font: '500 88px/0.95 var(--font-display)', letterSpacing: '-0.045em', margin: 0 }}>
          {copy.headline}<br />
          <span className="serif" style={{ fontWeight: 400, fontStyle: 'italic', color: '#93C5FD' }}>créée en 72h.</span>
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: 'rgba(255,255,255,.75)', maxWidth: 520, margin: '24px 0 36px' }}>
          De la SARL à la SAS, immatriculez votre société depuis votre téléphone. Paiement Mobile Money, suivi en temps réel, accompagnement humain.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn btn-lg" style={{ background: 'white', color: 'var(--ink-900)' }}>
            {copy.ctaLabel} <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,.25)' }}>
            <Icon name="play" size={14} /> Voir la démo (2 min)
          </button>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.12)' }}>
          {[
            { v: '4 280', l: 'entreprises créées' },
            { v: '72h', l: 'délai moyen' },
            { v: '4,9', l: 'note clients', suf: '/5' },
          ].map((s, i) => (
            <div key={i}>
              <div className="display-num" style={{ fontSize: 36, color: 'white' }}>
                {s.v}<span style={{ fontSize: 18, color: 'rgba(255,255,255,.5)' }}>{s.suf || ''}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Carte produit floating */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -60, background: 'var(--grad-glow)', filter: 'blur(40px)' }} />
        <div className="card" style={{ position: 'relative', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.16)', backdropFilter: 'blur(20px)', padding: 24, color: 'white', borderRadius: 20 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Simulation — SARL</div>
          <div className="display-num" style={{ fontSize: 64, color: 'white' }}>185 000<span style={{ fontSize: 22, color: 'rgba(255,255,255,.55)', marginLeft: 6 }}>FCFA</span></div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginTop: 6, marginBottom: 24 }}>Tout inclus · paiement en 3x sans frais</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
            {[
              ['Rédaction des statuts', '✓ inclus'],
              ['Frais de greffe', '45 000'],
              ['Annonce légale', '32 000'],
              ['Capital social (1)', '108 000'],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px dashed rgba(255,255,255,.1)' }}>
                <span style={{ color: 'rgba(255,255,255,.7)' }}>{l}</span>
                <span className="num" style={{ color: 'white' }}>{v}</span>
              </div>
            ))}
          </div>

          <button className="btn" style={{ marginTop: 20, width: '100%', background: 'var(--blue-500)', color: 'white' }}>
            Continuer <Icon name="arrow" size={14} />
          </button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 12, textAlign: 'center' }}>
            Wave · Orange Money · MTN MoMo
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// HERO B — Minimal éditorial, fond clair, serif italic
const HeroB = () => {
  const copy = useCopy();
  return (
  <div style={{ background: 'var(--paper)', color: 'var(--ink-900)' }}>
    <VitrineNav />
    <div style={{ padding: '60px 56px 80px', display: 'grid', gridTemplateColumns: '1fr', gap: 60, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', maxWidth: 920, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 28 }}>
          <Icon name="sparkle" size={12} /> {copy.heroBadge}
        </div>
        <h1 style={{ font: '500 104px/0.95 var(--font-display)', letterSpacing: '-0.05em', margin: 0 }}>
          Lancez votre <span className="serif" style={{ color: 'var(--blue-600)' }}>idée</span>.<br />
          Pas la paperasse.
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink-500)', maxWidth: 620, margin: '32px auto 36px' }}>
          La plateforme de création d'entreprise pensée pour l'Afrique de l'Ouest. SARL, SAS, EI — à partir de 95 000 FCFA, en 72h.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-lg btn-primary">{copy.ctaLabel} <Icon name="arrow" size={16} /></button>
          <button className="btn btn-lg btn-ghost">Voir les tarifs</button>
        </div>
      </div>

      {/* Big number band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--ink-200)', borderBottom: '1px solid var(--ink-200)', padding: '40px 0' }}>
        {[
          { v: '4 280', l: 'entreprises créées depuis 2024' },
          { v: '72h', l: 'délai moyen de traitement' },
          { v: '8', l: 'pays UEMOA couverts', suf: '' },
          { v: '4,9', l: 'satisfaction client', suf: '/5' },
        ].map((s, i) => (
          <div key={i} style={{ borderLeft: i ? '1px solid var(--ink-200)' : 'none', padding: '0 28px' }}>
            <div className="display-num" style={{ fontSize: 56, color: 'var(--ink-900)' }}>
              {s.v}<span style={{ fontSize: 22, color: 'var(--ink-400)' }}>{s.suf || ''}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

// Section comment ça marche — partagée entre les variations
const HowItWorks = () => {
  const steps = [
    { n: '01', t: 'Choisissez votre forme', d: 'SARL, SAS, SASU, EI, EURL — quiz guidé en 90 sec.', icon: 'target' },
    { n: '02', t: 'Simulez le coût', d: 'Prix tout inclus, transparent, sans surprise.', icon: 'money' },
    { n: '03', t: 'Remplissez le formulaire', d: 'Nous générons les statuts automatiquement.', icon: 'doc' },
    { n: '04', t: 'Payez en Mobile Money', d: 'Wave, Orange Money, MTN — 3x sans frais.', icon: 'wallet' },
    { n: '05', t: 'Recevez vos documents', d: 'Kbis, statuts, attestation — sous 72h.', icon: 'shield' },
  ];
  return (
    <div style={{ padding: '100px 56px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="chip chip-blue" style={{ marginBottom: 16 }}>Comment ça marche</div>
            <h2 style={{ font: '500 56px/1 var(--font-display)', letterSpacing: '-0.04em', margin: 0, maxWidth: 720 }}>
              Cinq étapes. <span className="serif" style={{ color: 'var(--ink-500)' }}>Zéro déplacement.</span>
            </h2>
          </div>
          <button className="btn btn-ghost">Voir le détail <Icon name="arrow" size={14} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 220, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="num" style={{ font: '500 13px/1 var(--font-mono)', color: 'var(--blue-600)' }}>{s.n}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={s.icon} size={16} />
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ font: '600 17px/1.25 var(--font-display)', letterSpacing: '-0.02em' }}>{s.t}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8, lineHeight: 1.45 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const t = [
    { n: 'Aïssata Diallo', r: 'Fondatrice, Mali Cosmétiques', q: 'J\'ai créé ma SARL pendant ma pause déjeuner. 3 jours plus tard, j\'avais mon Kbis.', a: 'AD' },
    { n: 'Kwame Mensah', r: 'CEO, Kojo Tech', q: 'Le simulateur m\'a évité 200 000 FCFA de frais cachés que j\'avais ailleurs.', a: 'KM' },
    { n: 'Fatou Sow', r: 'Restauratrice, Dakar', q: 'Aucune connaissance juridique. Tout a été expliqué, en français simple.', a: 'FS' },
  ];
  return (
    <div style={{ padding: '100px 56px', background: 'var(--ink-50)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div className="chip" style={{ marginBottom: 16 }}>Témoignages</div>
          <h2 style={{ font: '500 56px/1 var(--font-display)', letterSpacing: '-0.04em', margin: 0 }}>
            4 280 entrepreneurs <span className="serif" style={{ color: 'var(--blue-600)' }}>nous ont fait confiance.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {t.map((x, i) => (
            <div key={i} className="card" style={{ padding: 28, background: 'white' }}>
              <div style={{ display: 'flex', gap: 2, color: 'var(--accent-amber)', marginBottom: 16 }}>
                {[...Array(5)].map((_, k) => <Icon key={k} name="star" size={14} color="#F59E0B" />)}
              </div>
              <p style={{ font: '500 19px/1.45 var(--font-display)', letterSpacing: '-0.015em', margin: 0, color: 'var(--ink-900)' }}>
                « {x.q} »
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--ink-200)' }}>
                <div className="ava">{x.a}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{x.n}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{x.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VitrineFooter = () => (
  <div style={{ background: 'var(--ink-900)', color: 'white', padding: '60px 56px 32px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <Logo light />
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 16, lineHeight: 1.5, maxWidth: 280 }}>
          La plateforme la plus simple pour créer son entreprise en Afrique de l'Ouest.
        </p>
      </div>
      {[
        { t: 'Produit', l: ['Services', 'Tarifs', 'Comment ça marche', 'Partenaires'] },
        { t: 'Pays', l: ["Côte d'Ivoire", 'Sénégal', 'Mali', 'Burkina Faso'] },
        { t: 'Société', l: ['À propos', 'Blog', 'Contact', 'WhatsApp'] },
      ].map((c, i) => (
        <div key={i}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>{c.t}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {c.l.map((x) => <span key={x} style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>{x}</span>)}
          </div>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
      <span>© 2026 PeleAI Speed. Tous droits réservés.</span>
      <span>CGU · Confidentialité · Mentions légales</span>
    </div>
  </div>
);

const Vitrine = ({ variant = 'A' }) => (
  <div className="pas" style={{ width: 1440, background: 'white' }}>
    {variant === 'A' ? <HeroA /> : <HeroB />}
    <HowItWorks />
    <Testimonials />
    <VitrineFooter />
  </div>
);

Object.assign(window, { Vitrine });
