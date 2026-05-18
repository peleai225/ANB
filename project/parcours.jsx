/* global React, Icon, Logo, StepDot */
// Parcours client desktop — choix entreprise → simulation → formulaire → paiement → suivi

const ParcoursStepBar = ({ active = 0 }) => {
  const steps = ['Type', 'Simulation', 'Formulaire', 'Documents', 'Paiement', 'Suivi'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white' }}>
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StepDot n={i + 1} active={i === active} done={i < active} />
            <span style={{ fontSize: 13, fontWeight: i === active ? 600 : 400, color: i <= active ? 'var(--ink-900)' : 'var(--ink-400)' }}>{s}</span>
          </div>
          {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: i < active ? 'var(--blue-600)' : 'var(--ink-200)', maxWidth: 40 }} />}
        </React.Fragment>
      ))}
    </div>
  );
};

const AppHeader = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white' }}>
    <Logo size={26} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button className="btn btn-sm btn-ghost"><Icon name="whatsapp" size={14} /> Aide</button>
      <div className="ava">AD</div>
    </div>
  </div>
);

// 1 — Choix du type d'entreprise
const ScreenChoix = () => {
  const types = [
    { code: 'SARL', name: 'SARL', desc: 'Société à responsabilité limitée', cap: 'Min. 100 000 FCFA', best: 'PME, commerce', recommended: true, price: '185 000' },
    { code: 'SAS', name: 'SAS', desc: 'Société par actions simplifiée', cap: 'Min. 1 000 000 FCFA', best: 'Levée de fonds', price: '245 000' },
    { code: 'SASU', name: 'SASU', desc: 'SAS unipersonnelle', cap: 'Min. 100 000 FCFA', best: 'Solo entrepreneur', price: '195 000' },
    { code: 'EI', name: 'Entreprise individuelle', desc: 'Patrimoine personnel engagé', cap: 'Aucun capital', best: 'Activité simple', price: '95 000' },
    { code: 'EURL', name: 'EURL', desc: 'SARL unipersonnelle', cap: 'Min. 100 000 FCFA', best: 'Solo, séparation patrimoine', price: '175 000' },
  ];
  return (
    <div style={{ padding: '48px 64px', background: 'var(--ink-50)', minHeight: 600 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 1 sur 6</div>
        <h1 style={{ font: '500 44px/1 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
          Quelle forme pour votre <span className="serif" style={{ color: 'var(--blue-600)' }}>entreprise</span> ?
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-500)', margin: '0 0 36px' }}>Pas sûr ? Notre quiz de 90 secondes vous oriente. <span style={{ color: 'var(--blue-600)', fontWeight: 500, cursor: 'pointer' }}>Lancer le quiz →</span></p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {types.map((t) => (
            <div key={t.code} className="card" style={{ padding: 24, position: 'relative', background: t.recommended ? 'white' : 'white', border: t.recommended ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)', cursor: 'pointer' }}>
              {t.recommended && (
                <div style={{ position: 'absolute', top: -10, left: 16, background: 'var(--blue-600)', color: 'white', font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 4 }}>
                  Recommandé
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div className="display-num" style={{ fontSize: 36, color: 'var(--ink-900)' }}>{t.code}</div>
                <Icon name="arrow" size={18} color="var(--ink-400)" />
              </div>
              <div style={{ font: '600 15px/1.3 var(--font-display)', marginBottom: 6 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)', marginBottom: 16 }}>{t.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--ink-600)', paddingTop: 16, borderTop: '1px solid var(--ink-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--ink-400)' }}>Capital</span><span>{t.cap}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--ink-400)' }}>Idéal pour</span><span>{t.best}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ color: 'var(--ink-400)' }}>À partir de</span>
                  <span style={{ color: 'var(--ink-900)', fontWeight: 600 }} className="num">{t.price} FCFA</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2 — Simulation de prix
const ScreenSimulation = () => {
  return (
    <div style={{ padding: '48px 64px', background: 'var(--ink-50)', minHeight: 600 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
        <div>
          <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 2 sur 6</div>
          <h1 style={{ font: '500 40px/1 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Simulation pour votre <span style={{ color: 'var(--blue-600)' }}>SARL</span>
          </h1>

          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Paramètres</div>
            {[
              { l: 'Pays d\'immatriculation', v: 'Côte d\'Ivoire' },
              { l: 'Capital social', v: '500 000 FCFA' },
              { l: 'Nombre d\'associés', v: '2' },
              { l: 'Domiciliation', v: 'Adresse ANB · Cocody' },
            ].map((f) => (
              <div key={f.l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--ink-200)' }}>
                <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{f.l}</span>
                <span style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>{f.v} <Icon name="chevd" size={12} color="var(--ink-400)" /></span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>Options supplémentaires</span>
              <span style={{ fontSize: 13, color: 'var(--blue-600)', fontWeight: 500 }}>+ Comptabilité, marque, etc.</span>
            </div>
          </div>
        </div>

        {/* Prix sticky */}
        <div className="card-hero card" style={{ padding: 28, background: 'var(--grad-hero)', color: 'white', position: 'sticky', top: 24, alignSelf: 'flex-start' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.5)', marginBottom: 16 }}>Total tout compris</div>
          <div className="display-num" style={{ fontSize: 72 }}>185 000<span style={{ fontSize: 22, color: 'rgba(255,255,255,.55)', marginLeft: 6 }}>FCFA</span></div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 6, marginBottom: 24 }}>Ou 3× 61 666 FCFA — 0 frais</div>

          <div className="hr" style={{ background: 'rgba(255,255,255,.1)', margin: '20px 0' }} />

          {[
            ['Honoraires PeleAI', '85 000'],
            ['Frais de greffe', '45 000'],
            ['Annonce légale', '32 000'],
            ['Capital libéré', '23 000'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13, color: 'rgba(255,255,255,.85)' }}>
              <span style={{ color: 'rgba(255,255,255,.7)' }}>{l}</span>
              <span className="num">{v}</span>
            </div>
          ))}

          <button className="btn btn-lg" style={{ width: '100%', background: 'white', color: 'var(--ink-900)', marginTop: 24 }}>
            Continuer <Icon name="arrow" size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 12 }}>
            <Icon name="shield" size={12} /> Paiement 100% sécurisé
          </div>
        </div>
      </div>
    </div>
  );
};

// 3 — Formulaire
const ScreenForm = () => (
  <div style={{ padding: '48px 64px', background: 'var(--ink-50)', minHeight: 600 }}>
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 3 sur 6</div>
      <h1 style={{ font: '500 36px/1 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 8px' }}>
        Identité de votre société
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-500)', margin: '0 0 32px' }}>Ces informations apparaîtront sur vos statuts et au registre du commerce.</p>

      <div className="card" style={{ padding: 32, background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label className="label">Dénomination sociale</label>
            <input className="input" defaultValue="Mali Cosmétiques" />
            <div style={{ fontSize: 11, color: 'var(--accent-mint)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="check" size={12} stroke={2.5} /> Disponible au RCCM</div>
          </div>
          <div>
            <label className="label">Sigle (optionnel)</label>
            <input className="input" placeholder="ex. MC" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label">Activité principale</label>
            <input className="input" defaultValue="Fabrication et vente de produits cosmétiques naturels" />
          </div>
          <div>
            <label className="label">Capital social</label>
            <div style={{ position: 'relative' }}>
              <input className="input num" defaultValue="500 000" style={{ paddingRight: 60 }} />
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--ink-400)' }}>FCFA</span>
            </div>
          </div>
          <div>
            <label className="label">Durée de la société</label>
            <input className="input" defaultValue="99 ans" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="label">Siège social</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8 }}>
              <button className="btn btn-sm btn-primary" style={{ height: 44, borderRadius: 10 }}>📍 Domiciliation ANB</button>
              <input className="input" defaultValue="Rue des Jardins, Cocody, Abidjan" />
            </div>
          </div>
        </div>

        <div className="hr" style={{ margin: '32px 0' }} />

        <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Associés (2)</div>
        {[
          { n: 'Aïssata Diallo', r: 'Gérante · 60%', a: 'AD' },
          { n: 'Mamadou Touré', r: 'Associé · 40%', a: 'MT' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: '1px solid var(--ink-200)', borderRadius: 10, marginBottom: 8 }}>
            <div className="ava" style={{ width: 40, height: 40 }}>{p.a}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{p.n}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.r}</div>
            </div>
            <Icon name="chev" size={14} color="var(--ink-400)" />
          </div>
        ))}
        <button className="btn btn-sm btn-ghost" style={{ marginTop: 8 }}><Icon name="plus" size={14} /> Ajouter un associé</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button className="btn btn-ghost"><Icon name="arrowL" size={14} /> Retour</button>
        <button className="btn btn-primary btn-lg">Continuer <Icon name="arrow" size={16} /></button>
      </div>
    </div>
  </div>
);

// 4 — Paiement Mobile Money
const ScreenPaiement = () => {
  const methods = [
    { id: 'wave', name: 'Wave', desc: 'Sénégal, Côte d\'Ivoire', color: '#1DC3F0', selected: true },
    { id: 'om', name: 'Orange Money', desc: 'Tous pays UEMOA', color: '#FF6600' },
    { id: 'mtn', name: 'MTN MoMo', desc: 'Côte d\'Ivoire, Bénin', color: '#FFCC00' },
  ];
  return (
    <div style={{ padding: '48px 64px', background: 'var(--ink-50)', minHeight: 600 }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }}>
        <div>
          <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 5 sur 6</div>
          <h1 style={{ font: '500 36px/1 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Paiement Mobile Money
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map((m) => (
              <div key={m.id} className="card" style={{ padding: 20, background: 'white', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', border: m.selected ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 13px/1 var(--font-display)', color: 'white' }}>
                  {m.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{m.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: m.selected ? '6px solid var(--blue-600)' : '2px solid var(--ink-300)' }} />
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 20, marginTop: 24, background: 'white' }}>
            <label className="label">Numéro Wave</label>
            <input className="input num" defaultValue="+225 07 12 34 56 78" />
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="shield" size={14} color="var(--accent-mint)" />
              Vous recevrez une notification Wave pour confirmer
            </div>
          </div>
        </div>

        <div style={{ alignSelf: 'flex-start' }}>
          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Récapitulatif</div>
            <div style={{ fontSize: 14, color: 'var(--ink-700)', marginBottom: 4 }}>SARL · Mali Cosmétiques</div>
            <div className="display-num" style={{ fontSize: 48, color: 'var(--ink-900)', margin: '12px 0' }}>185 000<span style={{ fontSize: 18, color: 'var(--ink-400)', marginLeft: 4 }}>FCFA</span></div>

            <div className="card-soft card" style={{ padding: 12, marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="bolt" size={16} color="var(--blue-600)" />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Payer en 3× sans frais</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>3 × 61 666 FCFA · activé</div>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 20 }}>
              Payer 61 666 FCFA <Icon name="arrow" size={16} />
            </button>
            <div style={{ fontSize: 11, color: 'var(--ink-400)', textAlign: 'center', marginTop: 10 }}>Premier versement aujourd'hui</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6 — Suivi du dossier
const ScreenSuivi = () => {
  const timeline = [
    { d: '15 mars', t: '14:32', l: 'Dossier créé', s: 'done' },
    { d: '15 mars', t: '15:08', l: 'Paiement reçu (Wave)', s: 'done' },
    { d: '16 mars', t: '09:14', l: 'Vérification documents', s: 'done' },
    { d: '17 mars', t: '—', l: 'Dépôt au greffe', s: 'active' },
    { d: '—', t: '—', l: 'Immatriculation RCCM', s: 'pending' },
    { d: '—', t: '—', l: 'Documents envoyés', s: 'pending' },
  ];
  return (
    <div style={{ padding: '48px 64px', background: 'var(--ink-50)', minHeight: 600 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 }}>
          <div>
            <div className="chip chip-mint" style={{ marginBottom: 16 }}><span className="chip-dot"></span> Dossier en cours</div>
            <h1 style={{ font: '500 40px/1 var(--font-display)', letterSpacing: '-0.03em', margin: 0 }}>
              Mali <span className="serif" style={{ color: 'var(--blue-600)' }}>Cosmétiques</span>
            </h1>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8 }}>SARL · Réf. ANB-2026-04812 · Créé il y a 2 jours</div>
          </div>
          <div className="card" style={{ padding: '14px 20px', background: 'white' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Livraison estimée</div>
            <div className="display-num" style={{ fontSize: 24, marginTop: 4 }}>18 mars · 16h</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
          <div className="card" style={{ padding: 28, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 24 }}>Timeline</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 28px 1fr', gap: 14, alignItems: 'center', padding: '12px 0', position: 'relative' }}>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>
                    <div className="num" style={{ color: 'var(--ink-700)', fontWeight: 500 }}>{t.d}</div>
                    <div style={{ color: 'var(--ink-400)', fontSize: 11 }}>{t.t}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    {i < timeline.length - 1 && (
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', width: 1, height: 'calc(100% + 24px)', background: 'var(--ink-200)' }} />
                    )}
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: t.s === 'done' ? 'var(--blue-600)' : t.s === 'active' ? 'white' : 'white', border: t.s === 'active' ? '2.5px solid var(--blue-600)' : t.s === 'pending' ? '2px solid var(--ink-200)' : 'none', position: 'relative', zIndex: 1, boxShadow: t.s === 'active' ? '0 0 0 4px rgba(37,99,235,.15)' : 'none' }} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: t.s === 'active' ? 600 : 500, color: t.s === 'pending' ? 'var(--ink-400)' : 'var(--ink-900)' }}>{t.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 20, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Documents</div>
              {[
                { n: 'Statuts signés.pdf', s: '142 Ko', icon: 'doc' },
                { n: 'CNI gérant.jpg', s: '2.1 Mo', icon: 'doc' },
                { n: 'Justif. domicile.pdf', s: '320 Ko', icon: 'doc' },
              ].map((d) => (
                <div key={d.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13 }}>
                  <Icon name={d.icon} size={16} color="var(--blue-600)" />
                  <div style={{ flex: 1 }}>
                    <div>{d.n}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{d.s}</div>
                  </div>
                  <Icon name="download" size={14} color="var(--ink-400)" />
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20, background: '#25D366', color: 'white' }}>
              <Icon name="whatsapp" size={20} color="white" />
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>Une question ?</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Notre équipe répond sur WhatsApp en moins de 5 min.</div>
              <button className="btn btn-sm" style={{ background: 'white', color: '#25D366', marginTop: 12 }}>Ouvrir WhatsApp <Icon name="arrow" size={12} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Parcours = ({ step = 0 }) => {
  const screens = [ScreenChoix, ScreenSimulation, ScreenForm, ScreenForm, ScreenPaiement, ScreenSuivi];
  const Cur = screens[step];
  return (
    <div className="pas" style={{ width: 1280, background: 'var(--ink-50)', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <ParcoursStepBar active={step} />
      <Cur />
    </div>
  );
};

Object.assign(window, { Parcours, ScreenChoix, ScreenSimulation, ScreenForm, ScreenPaiement, ScreenSuivi });
