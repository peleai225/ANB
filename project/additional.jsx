/* global React, Icon, Logo */
// Écrans additionnels : Contact, Onboarding partenaire, Email transactionnel, Facture PDF

const useAdCopy = () => {
  const [c, setC] = React.useState(window.__pas_copy || {});
  React.useEffect(() => {
    const h = () => setC({ ...window.__pas_copy });
    window.addEventListener('pas-copy-update', h);
    return () => window.removeEventListener('pas-copy-update', h);
  }, []);
  return {
    brandName: c.brandName || 'ANB Corporate',
    cabinetName: c.cabinetName || 'ANB Corporate',
    cabinetCity: c.cabinetCity || 'Cocody, Abidjan',
    cabinetEmail: c.cabinetEmail || 'info@anbcorporate.com',
    cabinetPhone: c.cabinetPhone || '+225 07 87 44 88 57',
  };
};

// ─────────────────────────────────────────────────────────────
// PAGE CONTACT — formulaire + carte stylisée de Cocody
// ─────────────────────────────────────────────────────────────

// Stylized map of Cocody, Abidjan. Pas une vraie carte — un mockup
// avec routes/blocs/pin pour donner l'idée sans dépendance externe.
const AbidjanMap = ({ pinLabel = "ANB Corporate · Angré 7e" }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--ink-100)', borderRadius: 16, overflow: 'hidden' }}>
    <svg viewBox="0 0 600 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="lagune" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(37,99,235,0.18)" />
          <stop offset="1" stopColor="rgba(37,99,235,0.05)" />
        </linearGradient>
        <pattern id="parc" patternUnits="userSpaceOnUse" width="14" height="14">
          <rect width="14" height="14" fill="rgba(16,185,129,0.07)" />
          <circle cx="7" cy="7" r="1" fill="rgba(16,185,129,0.22)" />
        </pattern>
      </defs>
      {/* Background — base claire */}
      <rect width="600" height="500" fill="var(--ink-50)" />
      {/* Lagune Ébrié au sud */}
      <path d="M0 420 Q 120 380, 260 410 T 600 400 L 600 500 L 0 500 Z" fill="url(#lagune)" />
      <text x="40" y="475" fontSize="11" fill="var(--ink-400)" fontFamily="var(--font-mono)" letterSpacing="0.08em">LAGUNE ÉBRIÉ</text>
      {/* Parc Banco / espaces verts */}
      <rect x="20" y="60" width="120" height="80" rx="8" fill="url(#parc)" />
      <text x="35" y="105" fontSize="10" fill="rgba(16,185,129,0.6)" fontFamily="var(--font-mono)">PARC</text>
      {/* Blocs urbains */}
      {[
        [160, 50, 80, 60], [260, 60, 70, 45], [350, 45, 90, 70], [460, 55, 80, 50],
        [170, 130, 70, 55], [260, 125, 85, 60], [365, 130, 70, 50], [460, 130, 75, 60],
        [170, 210, 75, 50], [270, 210, 80, 65], [370, 220, 65, 55], [460, 210, 80, 60],
        [50, 220, 95, 50], [50, 290, 95, 60], [170, 290, 80, 50], [280, 295, 70, 55],
        [380, 295, 70, 50], [470, 290, 75, 60],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="var(--ink-100)" stroke="var(--ink-200)" strokeWidth="0.5" />
      ))}
      {/* Boulevards principaux */}
      <path d="M0 100 L 600 100" stroke="var(--paper)" strokeWidth="6" opacity="0.9" />
      <path d="M0 180 L 600 180" stroke="var(--paper)" strokeWidth="5" opacity="0.7" />
      <path d="M0 270 L 600 270" stroke="var(--paper)" strokeWidth="5" opacity="0.7" />
      <path d="M0 360 L 600 360" stroke="var(--paper)" strokeWidth="6" opacity="0.85" />
      <path d="M150 0 L 150 400" stroke="var(--paper)" strokeWidth="5" opacity="0.7" />
      <path d="M255 0 L 255 400" stroke="var(--paper)" strokeWidth="5" opacity="0.7" />
      <path d="M350 0 L 350 400" stroke="var(--paper)" strokeWidth="5" opacity="0.7" />
      <path d="M450 0 L 450 400" stroke="var(--paper)" strokeWidth="6" opacity="0.85" />
      {/* Labels quartiers */}
      <text x="280" y="42" fontSize="11" fill="var(--ink-500)" fontFamily="var(--font-mono)" letterSpacing="0.08em">ANGRÉ 7e</text>
      <text x="280" y="200" fontSize="10" fill="var(--ink-400)" fontFamily="var(--font-mono)" letterSpacing="0.08em">2 PLATEAUX</text>
      <text x="60" y="200" fontSize="10" fill="var(--ink-400)" fontFamily="var(--font-mono)" letterSpacing="0.08em">RIVIERA</text>
      <text x="430" y="350" fontSize="10" fill="var(--ink-400)" fontFamily="var(--font-mono)" letterSpacing="0.08em">COCODY</text>
    </svg>

    {/* Pin position cabinet */}
    <div style={{ position: 'absolute', top: '20%', left: '52%', transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ background: 'var(--ink-900)', color: 'var(--paper)', padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', marginBottom: 4 }}>
        {pinLabel}
      </div>
      <div style={{ width: 28, height: 28, borderRadius: '50% 50% 50% 0', background: 'var(--blue-600)', transform: 'rotate(-45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(37,99,235,0.45)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--paper)', transform: 'rotate(45deg)' }} />
      </div>
    </div>

    {/* Échelle / contrôles map */}
    <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--paper)', borderRadius: 8, padding: 2, boxShadow: 'var(--shadow-sm)' }}>
      <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', color: 'var(--ink-700)', fontSize: 18, cursor: 'pointer' }}>+</button>
      <div style={{ height: 1, background: 'var(--ink-200)', margin: '0 6px' }} />
      <button style={{ width: 32, height: 32, border: 'none', background: 'transparent', color: 'var(--ink-700)', fontSize: 18, cursor: 'pointer' }}>−</button>
    </div>
    <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: 10, color: 'var(--ink-500)', background: 'rgba(255,255,255,0.65)', padding: '4px 8px', borderRadius: 4, backdropFilter: 'blur(8px)', fontFamily: 'var(--font-mono)' }}>
      © OpenStreetMap · 500m
    </div>
  </div>
);

const PageContact = () => {
  const c = useAdCopy();
  const nav = useNav();
  const [sent, setSent] = React.useState(false);
  return (
    <div className="pas" style={{ width: 1440, background: 'var(--paper)' }}>
      <VitrineNav />
      <div style={{ padding: '60px 56px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span className="brand-rule" />
          <div className="brand-eyebrow" style={{ marginBottom: 24 }}>Contact</div>
          <h1 style={{ font: '500 72px/1 var(--font-display)', letterSpacing: '-0.045em', margin: 0, maxWidth: 800 }}>
            Parlons de votre <span className="serif" style={{ color: 'var(--blue-600)', fontStyle: 'italic' }}>projet.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--ink-600)', marginTop: 20, maxWidth: 660, lineHeight: 1.55 }}>
            Réponse sous 2 heures en jour ouvré. Pour les questions urgentes, WhatsApp est le canal le plus rapide — moins de 5 minutes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 32, alignItems: 'flex-start' }}>
          {/* Form */}
          <div className="card" style={{ padding: 36, background: 'var(--paper)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 24 }}>Demande d'information</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label className="label">Prénom</label>
                <input className="input" placeholder="Aïssata" />
              </div>
              <div>
                <label className="label">Nom</label>
                <input className="input" placeholder="Diallo" />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" placeholder="vous@email.com" />
              </div>
              <div>
                <label className="label">Téléphone (Mobile Money)</label>
                <input className="input num" placeholder="+225 07 12 34 56 78" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Quel est votre projet ?</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {[
                    { i: 'pkg', l: 'Créer mon entreprise', sel: true },
                    { i: 'chart', l: 'Accompagnement comptable' },
                    { i: 'shield', l: 'Conseil juridique' },
                    { i: 'sparkle', l: 'Autre demande' },
                  ].map((o) => (
                    <div key={o.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: o.sel ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)', borderRadius: 10, cursor: 'pointer', background: o.sel ? 'var(--blue-50)' : 'var(--paper)' }}>
                      <Icon name={o.i} size={16} color={o.sel ? 'var(--blue-700)' : 'var(--ink-500)'} />
                      <div style={{ fontSize: 13, fontWeight: o.sel ? 600 : 500, color: o.sel ? 'var(--blue-900)' : 'var(--ink-700)' }}>{o.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Message (optionnel)</label>
                <textarea className="input" placeholder="Précisez votre situation, votre activité, vos questions…" style={{ height: 110, padding: 14, resize: 'none', fontFamily: 'var(--font-body)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, padding: '14px 16px', background: 'var(--ink-50)', borderRadius: 10 }}>
              <Icon name="shield" size={16} color="var(--accent-mint)" />
              <div style={{ fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.4 }}>
                Vos données sont chiffrées et ne sont utilisées que pour vous recontacter. Conforme loi CI 2013-450.
              </div>
            </div>

            {sent ? (
              <div style={{ marginTop: 20, padding: 20, borderRadius: 12, background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.3)', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-mint)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="check" size={18} stroke={2.5} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>Demande envoyée</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-600)', marginTop: 2 }}>Nous vous recontactons sous 2h. Retour à l'accueil <span onClick={() => nav('/')} style={{ color: 'var(--blue-600)', cursor: 'pointer', fontWeight: 500 }}>→</span></div>
                </div>
              </div>
            ) : (
              <button onClick={() => setSent(true)} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }}>
                Envoyer ma demande <Icon name="arrow" size={16} />
              </button>
            )}
          </div>

          {/* Map + contact card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ height: 420, position: 'relative' }}>
              <AbidjanMap pinLabel={`${c.cabinetName} · Angré 7e`} />
            </div>

            <div className="card" style={{ padding: 24, background: 'var(--paper)' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Joindre le cabinet</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { i: 'pin', l: 'Adresse', v: `${c.cabinetCity} · Angré 7e/8e tranche` },
                  { i: 'mail', l: 'Email', v: c.cabinetEmail },
                  { i: 'phone', l: 'Téléphone', v: c.cabinetPhone },
                  { i: 'clock', l: 'Horaires', v: 'Lun-Ven · 8h-18h' },
                ].map((it) => (
                  <div key={it.l} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={it.i} size={15} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{it.l}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-900)', fontWeight: 500, marginTop: 2 }}>{it.v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hr" style={{ margin: '20px 0' }} />

              <button className="btn" style={{ width: '100%', background: '#25D366', color: 'white' }}>
                <Icon name="whatsapp" size={14} /> Discuter sur WhatsApp · réponse en 5 min
              </button>
            </div>
          </div>
        </div>
      </div>
      <VitrineFooter />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// PARTNER ONBOARDING — flow pour un cabinet qui rejoint la plateforme
// ─────────────────────────────────────────────────────────────

const PartnerOnboarding = () => {
  const c = useAdCopy();
  const nav = useNav();
  const [active, setActive] = React.useState(1);
  const steps = ['Cabinet', 'Équipe', 'Documents', 'Validation'];
  return (
    <div className="pas" style={{ width: 1280, background: 'var(--ink-50)', minHeight: 800, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div data-parcours-header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'var(--paper)' }}>
        <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}><Logo size={26} /></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>Onboarding partenaire · Étape {active + 1}/4</span>
          <button onClick={() => nav('/')} className="btn btn-sm btn-ghost">Reprendre plus tard</button>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'var(--paper)', justifyContent: 'center' }}>
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <StepDot n={i + 1} active={i === active} done={i < active} />
              <span style={{ fontSize: 13, fontWeight: i === active ? 600 : 400, color: i <= active ? 'var(--ink-900)' : 'var(--ink-400)' }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ width: 60, height: 1, background: i < active ? 'var(--blue-600)' : 'var(--ink-200)' }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ flex: 1, padding: '48px 64px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, maxWidth: 1180, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Form */}
        <div>
          <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 2 sur 4</div>
          <h1 style={{ font: '500 40px/1.05 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 8px' }}>
            Présentez votre <span className="serif" style={{ color: 'var(--blue-600)' }}>équipe</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-500)', margin: '0 0 32px' }}>
            Au moins un expert-comptable diplômé ou un juriste agréé. Ces informations apparaîtront aux clients.
          </p>

          <div className="card" style={{ padding: 28, background: 'var(--paper)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Membres ajoutés (2)</div>

            {[
              { n: 'Aboubacar N\'Dri', r: 'Expert-comptable · Diplômé ONECCA-CI', a: 'AN', tag: 'Référent' },
              { n: 'Mariam Bamba', r: 'Juriste d\'affaires · Master DJCE Abidjan', a: 'MB' },
            ].map((p) => (
              <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: '1px solid var(--ink-200)', borderRadius: 12, marginBottom: 10, background: 'var(--paper)' }}>
                <div className="ava" style={{ width: 44, height: 44, fontSize: 14 }}>{p.a}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{p.n}</div>
                    {p.tag && <span className="chip chip-blue" style={{ fontSize: 10, padding: '2px 8px' }}>{p.tag}</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{p.r}</div>
                </div>
                <Icon name="settings" size={14} color="var(--ink-400)" />
              </div>
            ))}

            <button className="btn btn-sm btn-ghost" style={{ marginTop: 8 }}><Icon name="plus" size={14} /> Ajouter un membre</button>

            <div className="hr" style={{ margin: '28px 0 20px' }} />

            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Capacité du cabinet</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="label">Dossiers/mois capable</label>
                <select className="input">
                  <option>5-15 dossiers</option>
                  <option>15-40 dossiers</option>
                  <option>40-100 dossiers</option>
                  <option>100+ dossiers</option>
                </select>
              </div>
              <div>
                <label className="label">Pays couverts</label>
                <input className="input" defaultValue="Côte d'Ivoire, Burkina Faso" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Spécialisations (multi-sélection)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Création SARL/SAS', 'Comptabilité', 'Fiscalité', 'Juridique', 'Agréments', 'Formation', 'Représentation commerciale'].map((sp, i) => (
                    <div key={sp} className="chip" style={{ background: i < 4 ? 'var(--blue-100)' : 'var(--ink-100)', color: i < 4 ? 'var(--blue-800)' : 'var(--ink-600)', padding: '6px 12px', fontSize: 12, cursor: 'pointer' }}>
                      {i < 4 && <Icon name="check" size={11} stroke={2.5} />} {sp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button onClick={() => active > 0 ? setActive(active - 1) : nav('/')} className="btn btn-ghost"><Icon name="arrowL" size={14} /> Retour</button>
            <button onClick={() => active < 3 ? setActive(active + 1) : nav('/partenaire/dashboard')} className="btn btn-primary btn-lg">
              {active < 3 ? `Étape suivante · ${steps[active + 1]}` : 'Activer mon cabinet'} <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>

        {/* Right info column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card-hero card" style={{ padding: 28, background: 'var(--grad-hero)', color: 'white' }}>
            <Icon name="bolt" size={20} color="white" />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 12 }}>Commission moyenne</div>
            <div className="display-num" style={{ fontSize: 48, marginTop: 8 }}>32 200<span style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', marginLeft: 4 }}>FCFA / dossier</span></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginTop: 10, lineHeight: 1.5 }}>
              Reversée automatiquement à la livraison du dossier client, par virement ou Mobile Money.
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: 'var(--paper)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Ce que vous obtenez</div>
            {[
              { i: 'layers', t: 'Backoffice complet', d: 'Dashboard, suivi dossiers, paiements, commissions' },
              { i: 'users', t: 'Flux de clients qualifiés', d: 'Routage automatique selon votre zone et spécialité' },
              { i: 'doc', t: 'Templates juridiques', d: 'Statuts, contrats, PV — générés à la volée' },
              { i: 'whatsapp', t: 'Support dédié 24/7', d: 'WhatsApp prioritaire pour vos urgences' },
            ].map((b) => (
              <div key={b.t} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--ink-100)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={b.i} size={15} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{b.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2, lineHeight: 1.4 }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20, background: 'var(--ink-50)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Icon name="shield" size={14} color="var(--accent-mint)" />
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-700)' }}>Validation sous 48h</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.5 }}>
              Notre équipe vérifie vos pièces (RCCM, ONECCA, références) avant activation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// EMAIL TRANSACTIONNEL — KBis / RCCM prêt
// ─────────────────────────────────────────────────────────────

// Wrapper mockup de client mail (objet, expéditeur, contenu HTML)
const EmailMockup = () => {
  const c = useAdCopy();
  return (
    <div className="pas" style={{ width: 900, background: 'var(--ink-100)', minHeight: 1100, padding: 40, boxSizing: 'border-box' }}>
      {/* Mail client chrome */}
      <div style={{ background: 'var(--paper)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.08)', overflow: 'hidden', border: '1px solid var(--ink-200)' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--ink-200)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="arrowL" size={18} color="var(--ink-500)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>Boîte de réception</div>
            <div style={{ font: '600 19px/1.2 var(--font-display)', letterSpacing: '-0.015em', marginTop: 4 }}>
              ✅ Votre RCCM est prêt — Mali Cosmétiques
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>17 mars · 14:08</div>
        </div>
        <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--ink-200)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="ava" style={{ background: 'var(--blue-600)', color: 'white' }}>{c.cabinetName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14 }}>
              <strong>{c.cabinetName}</strong> <span style={{ color: 'var(--ink-500)', fontWeight: 400 }}>&lt;{c.cabinetEmail}&gt;</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>à aissata@malicosmo.ci</div>
          </div>
          <button className="btn btn-sm btn-ghost"><Icon name="download" size={13} /> Tout télécharger</button>
        </div>

        {/* Email body — design newsletter style */}
        <div style={{ padding: '40px 56px 48px', background: 'var(--paper)' }}>
          {/* Brand header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Logo size={32} />
          </div>

          {/* Hero band */}
          <div style={{ background: 'var(--grad-hero)', borderRadius: 16, padding: '40px 32px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: 28 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,.14)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', marginBottom: 18 }}>
              <Icon name="check" size={32} color="white" stroke={2.5} />
            </div>
            <div style={{ font: '500 11px/1 var(--font-mono)', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>Bonne nouvelle</div>
            <h1 style={{ font: '500 36px/1.1 var(--font-display)', letterSpacing: '-0.03em', margin: 0 }}>
              Votre entreprise est <span className="serif" style={{ color: '#93C5FD' }}>officielle</span>.
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.8)', marginTop: 14, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
              Le RCCM de Mali Cosmétiques vient d'être délivré par le greffe du Tribunal de Commerce d'Abidjan.
            </p>
          </div>

          {/* Salutation */}
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-800)', margin: '0 0 16px' }}>Bonjour Aïssata,</p>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-700)', margin: '0 0 24px' }}>
            Excellente nouvelle : votre société <strong style={{ color: 'var(--ink-900)' }}>Mali Cosmétiques SARL</strong> est désormais immatriculée. Voici votre numéro RCCM et vos documents officiels.
          </p>

          {/* RCCM number box */}
          <div style={{ border: '2px solid var(--blue-600)', borderRadius: 12, padding: '20px 24px', background: 'var(--blue-50)', marginBottom: 24 }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--blue-700)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Numéro RCCM</div>
            <div className="display-num num" style={{ fontSize: 32, color: 'var(--blue-900)', letterSpacing: '-0.01em' }}>CI-ABJ-03-2026-B12-04812</div>
            <div style={{ fontSize: 12, color: 'var(--ink-600)', marginTop: 6 }}>Tribunal de Commerce d'Abidjan · 17 mars 2026</div>
          </div>

          {/* Documents */}
          <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>3 documents joints</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
            {[
              { n: 'RCCM_MaliCosmetiques.pdf', s: '142 Ko' },
              { n: 'Statuts_signes.pdf', s: '286 Ko' },
              { n: 'Attestation_immatriculation.pdf', s: '94 Ko' },
            ].map((d) => (
              <div key={d.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, border: '1px solid var(--ink-200)', borderRadius: 10, background: 'var(--paper)' }}>
                <div style={{ width: 36, height: 44, borderRadius: 4, background: 'var(--blue-100)', color: 'var(--blue-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 9, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>PDF</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.n}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{d.s}</div>
                </div>
                <Icon name="download" size={16} color="var(--ink-500)" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <a className="btn btn-primary btn-lg" style={{ width: '100%', boxSizing: 'border-box', display: 'flex', textDecoration: 'none' }}>
            Accéder à mon espace <Icon name="arrow" size={16} />
          </a>

          {/* Next steps */}
          <div style={{ marginTop: 36, padding: '20px 0', borderTop: '1px solid var(--ink-200)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Prochaines étapes recommandées</div>
            {[
              { i: 'wallet', t: 'Ouvrir votre compte bancaire professionnel', d: 'Avec votre RCCM, présentez-vous à BICICI, SGBCI ou Ecobank' },
              { i: 'chart', t: 'Souscrire à un accompagnement comptable', d: '1 mois offert sur le plan Business — actif jusqu\'au 17 avril' },
              { i: 'shield', t: 'Déclaration CNPS', d: 'Obligatoire dans les 30 jours suivant l\'immatriculation' },
            ].map((s) => (
              <div key={s.t} style={{ display: 'flex', gap: 14, padding: '12px 0' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--ink-100)', color: 'var(--ink-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={s.i} size={14} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2, lineHeight: 1.4 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sign off */}
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)', margin: '24px 0 6px' }}>Félicitations pour ce nouveau chapitre !</p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-700)', margin: 0 }}>L'équipe {c.cabinetName}</p>

          {/* Footer */}
          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--ink-200)', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.6 }}>
              {c.cabinetName} · {c.cabinetCity} · Angré 7e/8e tranche<br />
              RCCM CI-ABJ-03-2025-B13-00359 · NCC 2500120 F<br />
              <span style={{ color: 'var(--ink-400)' }}>{c.cabinetEmail} · {c.cabinetPhone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 18 }}>
              {['WhatsApp', 'LinkedIn', 'Instagram'].map((s) => <span key={s} style={{ fontSize: 11, color: 'var(--ink-400)' }}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// FACTURE PDF — template imprimable A4
// ─────────────────────────────────────────────────────────────

const InvoicePDF = () => {
  const c = useAdCopy();
  const items = [
    { d: 'Création SARL — Pack Société', q: 1, p: 100000 },
    { d: 'Frais de greffe (Tribunal de Commerce d\'Abidjan)', q: 1, p: 45000 },
    { d: 'Annonce légale (FratMat 14 mars)', q: 1, p: 32000 },
    { d: 'Capital social libéré (frais bancaires)', q: 1, p: 8000 },
  ];
  const subtotal = items.reduce((s, i) => s + i.p * i.q, 0);
  const tva = 0;
  const total = subtotal + tva;
  return (
    <div className="pas" style={{ width: 794, height: 1123, background: 'white', padding: '56px 56px 48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', color: 'var(--ink-900)', boxShadow: '0 20px 60px rgba(0,0,0,.12)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div>
          <Logo size={32} />
          <div style={{ fontSize: 11, color: 'var(--ink-500)', lineHeight: 1.55, marginTop: 14 }}>
            {c.cabinetName}<br />
            {c.cabinetCity} · Angré 7e/8e tranche<br />
            RCCM CI-ABJ-03-2025-B13-00359<br />
            NCC 2500120 F · Régime TEE<br />
            {c.cabinetEmail} · {c.cabinetPhone}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue-600)', marginBottom: 6 }}>Facture</div>
          <div className="display-num" style={{ fontSize: 28, letterSpacing: '-0.01em' }}>F-2026-04812</div>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 10, lineHeight: 1.6 }}>
            <div><span style={{ color: 'var(--ink-400)' }}>Date d'émission</span> &nbsp; 17 mars 2026</div>
            <div><span style={{ color: 'var(--ink-400)' }}>Échéance</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 17 mars 2026 (payée)</div>
            <div><span style={{ color: 'var(--ink-400)' }}>Référence dossier</span> &nbsp; ANB-2026-04812</div>
          </div>
        </div>
      </div>

      {/* Billed to */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 0 24px', borderTop: '1.5px solid var(--ink-900)', borderBottom: '1px solid var(--ink-200)', marginBottom: 24 }}>
        <div>
          <div style={{ font: '500 10px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-500)', marginBottom: 8 }}>Facturé à</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Mali Cosmétiques SARL</div>
          <div style={{ fontSize: 12, color: 'var(--ink-600)', lineHeight: 1.55, marginTop: 4 }}>
            Aïssata Diallo · Gérante<br />
            Rue des Jardins, Cocody, Abidjan<br />
            aissata@malicosmo.ci · +225 07 12 34 56 78
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ font: '500 10px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-500)', marginBottom: 8 }}>Mode de règlement</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Wave Mobile Money</div>
          <div style={{ fontSize: 12, color: 'var(--ink-600)', marginTop: 4 }}>3× sans frais · 61 666 FCFA × 3</div>
          <span className="chip chip-mint" style={{ marginTop: 8 }}><span className="chip-dot"></span> Payée</span>
        </div>
      </div>

      {/* Items table */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 110px 110px', padding: '10px 0', fontSize: 10, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--ink-300)' }}>
          <div>Description</div>
          <div style={{ textAlign: 'center' }}>Qté</div>
          <div style={{ textAlign: 'right' }}>P.U. (FCFA)</div>
          <div style={{ textAlign: 'right' }}>Total (FCFA)</div>
        </div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 110px 110px', padding: '14px 0', fontSize: 13, borderBottom: '1px solid var(--ink-100)' }}>
            <div>{it.d}</div>
            <div style={{ textAlign: 'center', color: 'var(--ink-700)' }} className="num">{it.q}</div>
            <div style={{ textAlign: 'right', color: 'var(--ink-700)' }} className="num">{it.p.toLocaleString('fr-FR')}</div>
            <div style={{ textAlign: 'right', fontWeight: 500 }} className="num">{(it.p * it.q).toLocaleString('fr-FR')}</div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: 340 }}>
          {[
            ['Sous-total HT', subtotal],
            ['TVA (0% — régime TEE)', tva],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: 'var(--ink-600)' }}>
              <span>{l}</span>
              <span className="num">{Number(v).toLocaleString('fr-FR')}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '14px 0 6px', marginTop: 8, borderTop: '1.5px solid var(--ink-900)' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total TTC</span>
            <span className="display-num" style={{ fontSize: 28 }}>
              {total.toLocaleString('fr-FR')}<span style={{ fontSize: 14, color: 'var(--ink-400)', marginLeft: 4 }}>FCFA</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 32, padding: '20px 0 0', borderTop: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: 10, color: 'var(--ink-500)', lineHeight: 1.55, maxWidth: 400 }}>
          Cette facture est conforme à la réglementation OHADA et à l'arrêté ivoirien sur la facturation électronique 2018-379. <br />
          Conservation légale : 10 ans. En cas de retard de paiement, taux d'intérêt légal applicable.
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ width: 110, height: 110, border: '1px solid var(--ink-200)', borderRadius: 4, padding: 8, background: 'white', position: 'relative' }}>
            {/* Mock QR code */}
            <svg viewBox="0 0 21 21" style={{ width: '100%', height: '100%' }}>
              {[
                '11111110010101111111','10000010011001000001','10111010000101011101','10111010110001011101','10111010100101011101','10000010010001000001','11111110101011111111','00000000010100000000','11010110111111001110','10001111000110110011','01110001001101111100','11000110110011010010','10001110101001000111','00000000100110100011','11111110110100100110','10000010100100100011','10111010101111101111','10111010100011001011','10111010111101100110','10000010111000111101','11111110001000000111',
              ].map((row, y) => row.split('').map((b, x) => b === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--ink-900)" /> : null))}
            </svg>
          </div>
          <div style={{ fontSize: 9, color: 'var(--ink-500)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>Vérifier en ligne</div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PageContact, PartnerOnboarding, EmailMockup, InvoicePDF });
