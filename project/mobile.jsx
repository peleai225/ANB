/* global React, Icon, Logo, IOSDevice, StepDot */
// Mobile screens — parcours client en frames iOS

const MobileScreenBase = ({ children, title, back = true, dark = false }) => (
  <div style={{ width: '100%', height: '100%', background: dark ? 'var(--ink-900)' : 'var(--ink-50)', display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '8px 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: dark ? 'var(--ink-900)' : 'white', borderBottom: dark ? 'none' : '1px solid var(--ink-200)' }}>
      {back ? <Icon name="arrowL" size={20} color={dark ? 'white' : 'var(--ink-900)'} /> : <Logo size={22} light={dark} />}
      <div style={{ font: '600 15px/1 var(--font-display)', color: dark ? 'white' : 'var(--ink-900)' }}>{title}</div>
      <Icon name="close" size={20} color={dark ? 'rgba(255,255,255,.5)' : 'var(--ink-400)'} />
    </div>
    <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
  </div>
);

// Mobile — Hero / accueil
const MobileHero = () => (
  <div className="grain" style={{ width: '100%', height: '100%', background: 'var(--grad-hero)', color: 'white', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: '8px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
      <Logo size={24} light />
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="user" size={16} color="white" />
      </div>
    </div>
    <div style={{ flex: 1, padding: '32px 20px', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
      <div className="chip" style={{ background: 'rgba(255,255,255,.1)', color: 'white', alignSelf: 'flex-start', marginBottom: 24 }}>
        <span className="chip-dot" style={{ color: '#34D399' }}></span> Disponible · UEMOA
      </div>
      <h1 style={{ font: '500 48px/0.95 var(--font-display)', letterSpacing: '-0.045em', margin: 0 }}>
        Votre entreprise,<br />
        <span className="serif" style={{ color: '#93C5FD' }}>en 72h.</span>
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,.75)', marginTop: 20, marginBottom: 32 }}>
        SARL, SAS, EI — depuis votre téléphone. À partir de 95 000 FCFA.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[['4 280', 'créées'], ['72h', 'délai'], ['4,9/5', 'note']].map(([v, l], i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: 12, backdropFilter: 'blur(10px)' }}>
            <div className="display-num" style={{ fontSize: 20 }}>{v}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn btn-lg" style={{ width: '100%', background: 'white', color: 'var(--ink-900)' }}>
          Créer mon entreprise <Icon name="arrow" size={16} />
        </button>
        <button className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,.2)', color: 'white' }}>
          J'ai déjà un compte
        </button>
      </div>
    </div>
  </div>
);

// Mobile — Choix du type
const MobileChoix = () => {
  const types = [
    { code: 'SARL', desc: 'PME, commerce', price: '185 000', recommended: true },
    { code: 'SAS', desc: 'Levée de fonds', price: '245 000' },
    { code: 'SASU', desc: 'Solo, capital', price: '195 000' },
    { code: 'EI', desc: 'Activité simple', price: '95 000' },
    { code: 'EURL', desc: 'Solo, séparation', price: '175 000' },
  ];
  return (
    <MobileScreenBase title="Forme juridique" back>
      <div style={{ padding: '20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i === 0 ? 'var(--blue-600)' : 'var(--ink-200)' }} />
          ))}
        </div>
        <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Étape 1 sur 6</div>
        <h1 style={{ font: '500 28px/1.05 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 20px' }}>
          Quelle forme pour votre <span className="serif" style={{ color: 'var(--blue-600)' }}>entreprise</span> ?
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {types.map((t) => (
            <div key={t.code} className="card" style={{ padding: 16, background: 'white', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', border: t.recommended ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)' }}>
              {t.recommended && <div style={{ position: 'absolute', top: -8, left: 12, background: 'var(--blue-600)', color: 'white', fontSize: 9, padding: '2px 6px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Reco</div>}
              <div className="display-num" style={{ fontSize: 24, color: 'var(--ink-900)', minWidth: 56 }}>{t.code}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{t.desc}</div>
                <div className="num" style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{t.price} <span style={{ color: 'var(--ink-400)', fontWeight: 400, fontSize: 11 }}>FCFA</span></div>
              </div>
              <Icon name="chev" size={16} color="var(--ink-400)" />
            </div>
          ))}
        </div>
      </div>
    </MobileScreenBase>
  );
};

// Mobile — Paiement
const MobilePaiement = () => (
  <MobileScreenBase title="Paiement" back>
    <div style={{ padding: '20px 16px' }}>
      <div className="card-hero card" style={{ background: 'var(--grad-hero)', color: 'white', padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>À payer aujourd'hui</div>
        <div className="display-num" style={{ fontSize: 44, marginTop: 8 }}>61 666<span style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', marginLeft: 4 }}>FCFA</span></div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>1er sur 3 versements · 0 frais</div>
      </div>

      <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Méthode de paiement</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { id: 'wave', n: 'Wave', d: '+225 07 12 34 56 78', c: '#1DC3F0', sel: true },
          { id: 'om', n: 'Orange Money', d: 'Lié à votre numéro', c: '#FF6600' },
          { id: 'mtn', n: 'MTN MoMo', d: 'Lié à votre numéro', c: '#FFCC00' },
        ].map((m) => (
          <div key={m.id} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, background: 'white', border: m.sel ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: m.c, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 11px/1 var(--font-display)', color: 'white' }}>
              {m.n.split(' ').map((w) => w[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{m.n}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{m.d}</div>
            </div>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: m.sel ? '5px solid var(--blue-600)' : '2px solid var(--ink-300)' }} />
          </div>
        ))}
      </div>

      <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }}>
        Confirmer 61 666 FCFA <Icon name="arrow" size={16} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: 'var(--ink-500)', marginTop: 12 }}>
        <Icon name="lock" size={11} /> Vous recevrez une notif Wave
      </div>
    </div>
  </MobileScreenBase>
);

// Mobile — Suivi
const MobileSuivi = () => {
  const tl = [
    { d: '15 mars · 14:32', l: 'Dossier créé', s: 'done' },
    { d: '15 mars · 15:08', l: 'Paiement reçu', s: 'done' },
    { d: '16 mars · 09:14', l: 'Documents validés', s: 'done' },
    { d: '17 mars', l: 'Dépôt au greffe', s: 'active' },
    { d: '—', l: 'Immatriculation RCCM', s: 'pending' },
    { d: '—', l: 'Documents envoyés', s: 'pending' },
  ];
  return (
    <MobileScreenBase title="Mon dossier" back={false}>
      <div style={{ padding: '16px 16px 20px' }}>
        <div className="chip chip-mint" style={{ marginBottom: 12 }}><span className="chip-dot"></span> En cours</div>
        <h1 style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.03em', margin: 0 }}>
          Mali <span className="serif" style={{ color: 'var(--blue-600)' }}>Cosmétiques</span>
        </h1>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>SARL · PAS-2026-04812</div>

        <div className="card" style={{ padding: 16, marginTop: 16, background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Livraison estimée</div>
            <div className="display-num" style={{ fontSize: 22, marginTop: 4 }}>18 mars · 16h</div>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="clock" size={20} color="var(--blue-600)" />
          </div>
        </div>

        <div className="card" style={{ padding: 16, marginTop: 12, background: 'white' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Progression</div>
          {tl.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 0', position: 'relative', borderBottom: i < tl.length - 1 ? '1px solid var(--ink-100)' : 'none' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.s === 'done' ? 'var(--blue-600)' : 'white', border: t.s === 'active' ? '2.5px solid var(--blue-600)' : t.s === 'pending' ? '2px solid var(--ink-200)' : 'none', flexShrink: 0, boxShadow: t.s === 'active' ? '0 0 0 4px rgba(37,99,235,.15)' : 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: t.s === 'active' ? 600 : 500, color: t.s === 'pending' ? 'var(--ink-400)' : 'var(--ink-900)' }}>{t.l}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{t.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 12, padding: 16, background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="whatsapp" size={22} color="white" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Une question ?</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>Réponse en 5 min sur WhatsApp</div>
          </div>
          <Icon name="arrow" size={16} color="white" />
        </div>
      </div>
    </MobileScreenBase>
  );
};

const MobileWrap = ({ Screen }) => (
  <div className="pas" style={{ width: 402, height: 874 }}>
    <IOSDevice width={402} height={874}>
      <Screen />
    </IOSDevice>
  </div>
);

Object.assign(window, { MobileHero, MobileChoix, MobilePaiement, MobileSuivi, MobileWrap });
