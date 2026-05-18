/* global React, Icon, Logo */
// Pages vitrine additionnelles + écrans manquants

// Page Tarifs — 2 sections : création one-shot + accompagnement mensuel
const PageTarifs = () => {
  const nav = useNav();
  const creation = [
    { n: 'Essentiel', p: '95 000', d: 'Entreprise individuelle (EI)', best: false, f: ['Immatriculation RCCM', 'Statuts générés automatiquement', 'Dépôt au greffe inclus', 'Rattachement Impôts & CNPS', 'Support email'] },
    { n: 'Société', p: '185 000', d: 'SARL · SASU · EURL', best: true, f: ['Tout Essentiel +', 'Rédaction des statuts', 'Annonce légale incluse', 'Support WhatsApp prioritaire', 'Domiciliation 3 mois Cocody', '1 mois comptable offert'] },
    { n: 'Croissance', p: '345 000', d: 'SAS · multi-associés', best: false, f: ['Tout Société +', 'Pacte d\'associés', 'Conseil juridique 1h', 'Domiciliation 12 mois', '3 mois comptable offerts', 'Représentation commerciale'] },
  ];
  const mensuel = [
    { n: 'Starter', p: '40 000', d: 'Très faible volume · 1-3 employés', best: false, f: ['Tenue comptable simplifiée', 'Déclarations TVA & TEE', 'Bulletins de paie (jusqu\'à 3)', 'Support email'] },
    { n: 'Eco', p: '70 000', d: 'Faible volume · 1-3 employés', best: false, f: ['Tout Starter +', 'États financiers annuels', 'Déclarations CNPS', 'Conseil fiscal mensuel'] },
    { n: 'Business', p: '100 000', d: 'Grand volume · 3-10 employés', best: true, f: ['Tout Eco +', 'Tableaux de bord mensuels', 'Suivi trésorerie', 'Bulletins de paie (jusqu\'à 10)', 'Support WhatsApp prioritaire'] },
    { n: 'Premium', p: '185 000', d: 'Grand volume · 3-20 employés', best: false, f: ['Tout Business +', 'Contentieux & juridique inclus', 'Assistance à l\'agrément', 'Représentation commerciale', 'Comptable dédié'] },
  ];

  const PlanCard = ({ pl, perMois }) => (
    <div className="card" style={{ padding: 28, position: 'relative', background: pl.best ? 'var(--ink-900)' : 'white', color: pl.best ? 'white' : 'var(--ink-900)', border: pl.best ? 'none' : '1px solid var(--ink-200)', borderRadius: 20 }}>
      {pl.best && (
        <div style={{ position: 'absolute', top: -10, left: 20, background: 'var(--blue-600)', color: 'white', font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '5px 10px', borderRadius: 6 }}>
          Le plus choisi
        </div>
      )}
      <div style={{ font: '600 17px/1 var(--font-display)', marginBottom: 4 }}>{pl.n}</div>
      <div style={{ fontSize: 12, color: pl.best ? 'rgba(255,255,255,.6)' : 'var(--ink-500)', marginBottom: 20 }}>{pl.d}</div>
      <div className="display-num" style={{ fontSize: 46 }}>
        {pl.p}<span style={{ fontSize: 16, color: pl.best ? 'rgba(255,255,255,.5)' : 'var(--ink-400)', marginLeft: 4 }}>FCFA{perMois && '/mois'}</span>
      </div>
      <div style={{ fontSize: 12, color: pl.best ? 'rgba(255,255,255,.5)' : 'var(--ink-500)', marginTop: 4 }}>
        {perMois ? 'Sans engagement · résiliable à tout moment' : 'Ou 3× sans frais Mobile Money'}
      </div>

      <button onClick={() => nav(perMois ? '/contact' : '/quiz')} className="btn" style={{ width: '100%', marginTop: 20, background: pl.best ? 'white' : 'var(--ink-900)', color: pl.best ? 'var(--ink-900)' : 'white' }}>
        {perMois ? 'Souscrire' : 'Commencer'} <Icon name="arrow" size={14} />
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 22, paddingTop: 20, borderTop: pl.best ? '1px solid rgba(255,255,255,.12)' : '1px solid var(--ink-200)' }}>
        {pl.f.map((x, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12.5, lineHeight: 1.4 }}>
            <Icon name="check" size={13} stroke={2.5} color={pl.best ? '#86EFAC' : 'var(--blue-600)'} />
            <span style={{ color: pl.best ? 'rgba(255,255,255,.85)' : 'var(--ink-700)' }}>{x}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pas" style={{ width: 1440, background: 'var(--paper)' }}>
      <div style={{ padding: '60px 56px 80px' }}>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <div className="chip chip-blue" style={{ marginBottom: 20 }}>Tarifs · Mars 2026</div>
          <h1 style={{ font: '500 64px/1 var(--font-display)', letterSpacing: '-0.045em', margin: 0 }}>
            Un prix. <span className="serif" style={{ color: 'var(--blue-600)' }}>Tout inclus.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--ink-500)', marginTop: 16 }}>
            Pas de frais cachés. Paiement en 3× sans frais via Wave, Orange Money, MTN MoMo.
          </p>
        </div>

        {/* Section 1 : Création one-shot */}
        <div style={{ maxWidth: 1180, margin: '0 auto 56px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--ink-200)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--blue-600)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>01</div>
            <h2 style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.025em', margin: 0 }}>Création de votre entreprise <span style={{ color: 'var(--ink-400)', fontSize: 16, fontWeight: 400 }}>· paiement unique</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {creation.map((pl) => <PlanCard key={pl.n} pl={pl} perMois={false} />)}
          </div>
        </div>

        {/* Section 2 : Accompagnement mensuel */}
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--ink-200)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--blue-600)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>02</div>
            <h2 style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.025em', margin: 0 }}>Accompagnement comptable <span style={{ color: 'var(--ink-400)', fontSize: 16, fontWeight: 400 }}>· mensuel</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {mensuel.map((pl) => <PlanCard key={pl.n} pl={pl} perMois />)}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, fontSize: 13, color: 'var(--ink-500)', maxWidth: 700, margin: '48px auto 0' }}>
          Tous les prix incluent les frais de greffe, l'annonce légale, la TVA et l'accompagnement humain. Cabinet enregistré CI-ABJ-03-2025-B13-00359.
        </div>
      </div>
    </div>
  );
};

// Page FAQ
const PageFAQ = () => {
  const faqs = [
    { q: 'Combien de temps pour créer mon entreprise ?', a: '72 heures en moyenne après réception du paiement et des documents complets. Certains dossiers (EI) peuvent être traités en 24h.' },
    { q: 'Quels documents dois-je fournir ?', a: 'Une pièce d\'identité, un justificatif de domicile, et selon la forme : RIB pour le capital, statuts signés (générés par nous), CNI des associés.' },
    { q: 'Est-ce que je peux payer en plusieurs fois ?', a: 'Oui. Tous nos plans sont payables en 3 fois sans frais via Wave, Orange Money ou MTN MoMo. Le premier versement déclenche le traitement.' },
    { q: 'Que se passe-t-il si mon dossier est refusé ?', a: 'Nous vous remboursons intégralement les honoraires PeleAI. Les frais de greffe et d\'annonce légale ne sont pas remboursables (réglementation).' },
    { q: 'Puis-je créer une entreprise depuis l\'étranger ?', a: 'Oui pour les ressortissants UEMOA résidant à l\'étranger. Le siège social doit être en zone UEMOA — nous proposons une domiciliation à Abidjan, Dakar ou Bamako.' },
    { q: 'Mes données sont-elles sécurisées ?', a: 'Tout passe en HTTPS. Les documents sont stockés chiffrés. Nous sommes conformes RGPD et à la loi ivoirienne 2013-450 sur la protection des données.' },
  ];
  return (
    <div className="pas" style={{ width: 1440, background: 'var(--paper)' }}>
      <div style={{ padding: '60px 56px 100px', maxWidth: 1000, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 20 }}>FAQ</div>
        <h1 style={{ font: '500 64px/1 var(--font-display)', letterSpacing: '-0.04em', margin: '0 0 56px', maxWidth: 700 }}>
          Vos questions, <span className="serif" style={{ color: 'var(--blue-600)' }}>nos réponses.</span>
        </h1>

        <div className="card" style={{ background: 'white' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--ink-200)' : 'none' }}>
              <div style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ font: '600 17px/1.4 var(--font-display)', letterSpacing: '-0.015em', marginBottom: i === 0 || i === 2 ? 12 : 0 }}>{f.q}</div>
                  {(i === 0 || i === 2) && <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-600)' }}>{f.a}</div>}
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 0 || i === 2 ? 'var(--blue-600)' : 'var(--ink-100)', color: i === 0 || i === 2 ? 'white' : 'var(--ink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={i === 0 || i === 2 ? 'close' : 'plus'} size={14} stroke={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-soft card" style={{ padding: 32, marginTop: 40, display: 'flex', alignItems: 'center', gap: 24 }}>
          <Icon name="whatsapp" size={32} color="#25D366" />
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 18px/1 var(--font-display)' }}>Une autre question ?</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4 }}>Notre équipe répond sur WhatsApp en moins de 5 min.</div>
          </div>
          <button className="btn btn-primary">Écrire sur WhatsApp <Icon name="arrow" size={14} /></button>
        </div>
      </div>
    </div>
  );
};

// Quiz de 90s
const Quiz = () => {
  const nav = useNav();
  return (
  <div className="pas" style={{ width: 1280, background: 'var(--ink-50)', minHeight: 800 }}>
    <div data-parcours-header style={{ padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}><Logo size={26} /></span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>Question 3 sur 5</span>
        <div style={{ width: 200, height: 4, borderRadius: 2, background: 'var(--ink-200)', overflow: 'hidden' }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--blue-600)' }} />
        </div>
        <span className="num" style={{ fontSize: 12, color: 'var(--ink-700)', fontWeight: 500 }}>0:48</span>
      </div>
    </div>

    <div style={{ padding: '60px 64px', maxWidth: 920, margin: '0 auto' }}>
      <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--blue-600)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Quiz · 90 secondes</div>
      <h1 style={{ font: '500 56px/1.05 var(--font-display)', letterSpacing: '-0.04em', margin: '0 0 16px' }}>
        Combien serez-vous <span className="serif" style={{ color: 'var(--blue-600)' }}>associés</span> dans votre projet ?
      </h1>
      <p style={{ fontSize: 17, color: 'var(--ink-500)', margin: '0 0 48px' }}>
        Cela détermine la forme juridique adaptée. Pas de souci, vous pourrez ajouter des associés plus tard.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { v: '1', l: 'Seul·e', sub: 'EI, SASU, EURL', sel: false },
          { v: '2', l: 'À deux', sub: 'SARL, SAS', sel: true },
          { v: '3-5', l: 'Petite équipe', sub: 'SARL, SAS', sel: false },
          { v: '6+', l: 'Grande équipe', sub: 'SAS', sel: false },
        ].map((o) => (
          <div key={o.v} className="card" style={{ padding: 28, background: 'white', cursor: 'pointer', border: o.sel ? '2px solid var(--blue-600)' : '1px solid var(--ink-200)', position: 'relative', minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {o.sel && <div style={{ position: 'absolute', top: 14, right: 14, width: 22, height: 22, borderRadius: '50%', background: 'var(--blue-600)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={12} stroke={3} /></div>}
            <div className="display-num" style={{ fontSize: 56, color: o.sel ? 'var(--blue-600)' : 'var(--ink-900)' }}>{o.v}</div>
            <div>
              <div style={{ font: '600 16px/1.2 var(--font-display)', marginBottom: 4 }}>{o.l}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{o.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
        <button onClick={() => nav('/')} className="btn btn-ghost"><Icon name="arrowL" size={14} /> Précédent</button>
        <button onClick={() => nav('/creer')} className="btn btn-primary btn-lg">Question suivante <Icon name="arrow" size={16} /></button>
      </div>
    </div>
  </div>
  );
};

// Upload documents
const Upload = () => {
  const nav = useNav();
  const docs = [
    { n: 'CNI gérant.jpg', size: '2.1 Mo', s: 'done' },
    { n: 'Justif. domicile.pdf', size: '320 Ko', s: 'done' },
    { n: 'CNI associé Mamadou.jpg', size: '1.8 Mo', s: 'progress', p: 64 },
    { n: 'RIB capital social', size: '—', s: 'pending' },
  ];
  return (
    <div className="pas" style={{ width: 1280, background: 'var(--ink-50)', minHeight: 800 }}>
      <div data-parcours-header style={{ padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}><Logo size={26} /></span>
        <div className="ava">AD</div>
      </div>

      <div style={{ padding: '48px 64px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 16 }}>Étape 4 sur 6</div>
        <h1 style={{ font: '500 40px/1 var(--font-display)', letterSpacing: '-0.03em', margin: '0 0 8px' }}>
          Vos <span className="serif" style={{ color: 'var(--blue-600)' }}>documents</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-500)', margin: '0 0 32px' }}>4 fichiers requis · vous pouvez les ajouter plus tard depuis votre espace.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div>
            {/* Dropzone */}
            <div className="card" style={{ padding: 48, background: 'white', border: '2px dashed var(--blue-300)', textAlign: 'center', borderRadius: 16, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--blue-50)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon name="upload" size={24} color="var(--blue-600)" />
              </div>
              <div style={{ font: '600 17px/1.3 var(--font-display)', marginBottom: 6 }}>Glissez vos fichiers ici</div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)', marginBottom: 20 }}>JPG, PNG, PDF · 10 Mo max par fichier</div>
              <button className="btn btn-primary">Parcourir les fichiers</button>
              <div style={{ fontSize: 11, color: 'var(--ink-400)', marginTop: 14 }}>Ou prenez une photo avec votre téléphone</div>
            </div>

            <div className="card" style={{ background: 'white' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ font: '500 14px/1 var(--font-display)' }}>Documents requis</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}><span className="num" style={{ color: 'var(--ink-900)', fontWeight: 600 }}>2</span> sur 4 validés</div>
              </div>
              {docs.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderBottom: i < docs.length - 1 ? '1px solid var(--ink-100)' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: d.s === 'done' ? 'rgba(16,185,129,.12)' : d.s === 'progress' ? 'var(--blue-50)' : 'var(--ink-100)', color: d.s === 'done' ? '#047857' : d.s === 'progress' ? 'var(--blue-700)' : 'var(--ink-400)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={d.s === 'done' ? 'check' : 'doc'} size={16} stroke={d.s === 'done' ? 2.5 : 1.6} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{d.n}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>
                      {d.s === 'done' && '✓ Validé · ' + d.size}
                      {d.s === 'progress' && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <span>Téléversement · {d.p}%</span>
                          <span style={{ display: 'inline-block', width: 80, height: 3, borderRadius: 2, background: 'var(--ink-200)' }}>
                            <span style={{ display: 'block', width: `${d.p}%`, height: '100%', borderRadius: 2, background: 'var(--blue-600)' }} />
                          </span>
                        </span>
                      )}
                      {d.s === 'pending' && 'En attente'}
                    </div>
                  </div>
                  {d.s === 'done' && <Icon name="eye" size={16} color="var(--ink-400)" />}
                  {d.s === 'pending' && <button className="btn btn-sm btn-ghost"><Icon name="upload" size={12} /> Ajouter</button>}
                </div>
              ))}
            </div>
          </div>

          <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid #BFDBFE' }}>
              <Icon name="bolt" size={18} color="var(--blue-700)" />
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8, color: 'var(--blue-900)' }}>Astuce</div>
              <div style={{ fontSize: 13, color: 'var(--blue-900)', opacity: 0.8, marginTop: 4, lineHeight: 1.45 }}>
                Photographiez vos documents en plein soleil, à plat. Notre OCR détectera automatiquement les informations.
              </div>
            </div>
            <div className="card" style={{ padding: 20, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Aide</div>
              {[['CNI', 'Recto + verso, lisible'], ['Justif. domicile', 'Moins de 3 mois'], ['RIB capital', 'Compte bloqué BICICI/SGBCI']].map(([l, d]) => (
                <div key={l} style={{ padding: '8px 0', borderBottom: '1px solid var(--ink-100)' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button onClick={() => nav('/creer/identite')} className="btn btn-ghost"><Icon name="arrowL" size={14} /> Retour</button>
          <button onClick={() => nav('/creer/paiement')} className="btn btn-primary btn-lg">Continuer vers le paiement <Icon name="arrow" size={16} /></button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PageTarifs, PageFAQ, Quiz, Upload });
