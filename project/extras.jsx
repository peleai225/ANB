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
      <VitrineNav />
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
      <CtaClosure />
      <VitrineFooter />
    </div>
  );
};

// Page FAQ — interactive accordion
const PageFAQ = () => {
  const nav = useNav();
  const [openSet, setOpenSet] = React.useState(new Set([0]));
  const toggle = (i) => setOpenSet((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  const faqs = [
    { q: 'Combien de temps pour créer mon entreprise ?', a: '72 heures en moyenne après réception du paiement et des documents complets. Certains dossiers (Entreprise individuelle) sont traités en 24h. Nous vous tenons informé à chaque étape par SMS et WhatsApp.' },
    { q: 'Quels documents dois-je fournir ?', a: 'Pour une SARL ou SAS : CNI ou passeport de chaque associé, justificatif de domicile de moins de 3 mois, et un virement de capital sur compte bloqué (BICICI, SGBCI). Les statuts sont générés automatiquement — vous n\'avez qu\'à les signer.' },
    { q: 'Est-ce que je peux payer en plusieurs fois ?', a: 'Oui. Tous nos forfaits sont payables en 3× sans frais via Wave, Orange Money ou MTN MoMo. Le premier versement déclenche immédiatement le traitement de votre dossier.' },
    { q: 'Puis-je créer une entreprise depuis l\'étranger (diaspora) ?', a: 'Oui, nous accompagnons les ressortissants UEMOA installés en France, Belgique, Canada ou aux États-Unis. Le siège social doit être en zone UEMOA — nous proposons notre adresse de domiciliation à Cocody, Abidjan.' },
    { q: 'Que se passe-t-il si mon dossier est rejeté par le greffe ?', a: 'Nous traitons le problème en totalité et sans frais supplémentaires. Dans le rare cas d\'un refus définitif, les honoraires ANB sont remboursés intégralement. Les frais de greffe et d\'annonce légale sont régis par l\'administration et non remboursables.' },
    { q: 'Quelle est la différence entre SARL, SAS, SASU et EI ?', a: 'L\'EI est la structure la plus simple (seul, sans capital minimum, mais patrimoine engagé). La SARL est idéale pour 2-5 associés avec capital minimum de 100 000 FCFA et responsabilité limitée. La SAS offre plus de flexibilité pour les investisseurs. La SASU est une SAS à associé unique. Notre quiz de 90 secondes vous oriente.' },
    { q: 'Puis-je changer de forme juridique plus tard ?', a: 'Oui. La transformation d\'une EI en SARL ou d\'une SARL en SAS est possible. Elle implique des formalités (PV, publication, modification RCCM). Contactez-nous pour un devis — c\'est souvent moins coûteux que de créer une nouvelle société.' },
    { q: 'Mes données personnelles sont-elles sécurisées ?', a: 'Toutes les communications sont chiffrées (TLS 1.3). Les documents sont stockés sur des serveurs hébergés en Europe avec chiffrement AES-256. Nous respectons le RGPD et la loi ivoirienne 2013-450 sur la protection des données personnelles.' },
  ];

  return (
    <div className="pas" style={{ width: 1440, background: 'var(--paper)' }}>
      <VitrineNav />
      <div style={{ padding: '60px 56px 100px', maxWidth: 1000, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 20 }}>FAQ · 8 questions</div>
        <h1 style={{ font: '500 64px/1 var(--font-display)', letterSpacing: '-0.04em', margin: '0 0 56px', maxWidth: 700 }}>
          Vos questions, <span className="serif" style={{ color: 'var(--blue-600)' }}>nos réponses.</span>
        </h1>

        <div className="card" style={{ background: 'white' }}>
          {faqs.map((f, i) => {
            const isOpen = openSet.has(i);
            return (
              <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--ink-200)' : 'none' }}>
                <div
                  onClick={() => toggle(i)}
                  style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, cursor: 'pointer' }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ font: `${isOpen ? 600 : 500} 16px/1.4 var(--font-display)`, letterSpacing: '-0.015em', color: isOpen ? 'var(--blue-700)' : 'var(--ink-900)', marginBottom: isOpen ? 14 : 0 }}>
                      {f.q}
                    </div>
                    {isOpen && (
                      <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-600)', paddingRight: 16 }}>{f.a}</div>
                    )}
                  </div>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: isOpen ? 'var(--blue-600)' : 'var(--ink-100)', color: isOpen ? 'white' : 'var(--ink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'background .15s' }}>
                    <Icon name={isOpen ? 'close' : 'plus'} size={14} stroke={2.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card-soft card" style={{ padding: 28, marginTop: 40, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Icon name="whatsapp" size={32} color="#25D366" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ font: '600 17px/1 var(--font-display)', marginBottom: 6 }}>Vous n'avez pas trouvé votre réponse ?</div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Notre équipe répond sur WhatsApp en moins de 5 min, 7j/7.</div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ background: '#25D366' }}>
              <Icon name="whatsapp" size={14} /> WhatsApp maintenant
            </button>
            <button onClick={() => nav('/contact')} className="btn btn-ghost">Formulaire <Icon name="arrow" size={14} /></button>
          </div>
        </div>
      </div>
      <CtaClosure />
      <VitrineFooter />
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


// Page À propos — cabinet ANB Corporate complet
const PageAPropos = () => {
  const nav = useNav();
  const valeurs = [
    { v: 'Intégrité', d: 'Nous agissons avec honnêteté et transparence dans toutes nos relations avec nos clients et partenaires.', i: 'shield' },
    { v: 'Innovation', d: 'Nous adoptons les meilleures technologies pour simplifier et accélérer vos démarches administratives.', i: 'bolt' },
    { v: 'Rigueur', d: 'Chaque dossier est traité avec la plus grande précision — zéro erreur, zéro délai non justifié.', i: 'check' },
    { v: 'Confidentialité', d: 'Vos données et informations d'affaires sont protégées conformément à la loi ivoirienne 2013-450.', i: 'lock' },
  ];
  const legal = [
    { l: 'Raison sociale', v: 'ANB CORPORATE (SARL)' },
    { l: 'Capital social', v: '1 000 000 FCFA' },
    { l: 'RCCM', v: 'CI-ABJ-03-2025-B13-00359' },
    { l: 'N° NCC', v: '2500120 F' },
    { l: 'Régime fiscal', v: 'TEE (Taxe d'État de l'entreprenant)' },
    { l: 'Adresse', v: 'Abidjan, Cocody, Angré 7e/8e tranche' },
  ];
  return (
    <div className="pas" style={{ width: 1440, background: 'var(--paper)' }}>
      <VitrineNav />

      {/* Hero À propos */}
      <div style={{ padding: '80px 56px 0', maxWidth: 1280, margin: '0 auto' }}>
        <div className="chip chip-blue" style={{ marginBottom: 20 }}>Qui sommes-nous</div>
        <h1 style={{ font: '500 72px/0.95 var(--font-display)', letterSpacing: '-0.045em', margin: '0 0 20px', maxWidth: 900 }}>
          Votre cabinet d'affaires{' '}
          <span className="serif" style={{ color: 'var(--blue-600)' }}>à Abidjan.</span>
        </h1>
        <p style={{ fontSize: 18, color: 'var(--ink-500)', maxWidth: 720, margin: '0 0 56px', lineHeight: 1.6 }}>
          Fondé en 2025, ANB Corporate accompagne les entrepreneurs et TPE/PME dans toutes leurs démarches de création, de conformité et de développement d'entreprise en Côte d'Ivoire et dans l'espace OHADA.
        </p>
      </div>

      {/* Director + Description */}
      <div style={{ padding: '0 56px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 64, alignItems: 'flex-start' }}>
          {/* Photo & card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '100%', maxWidth: 380, borderRadius: 24, overflow: 'hidden', background: 'var(--blue-50)', boxShadow: '0 24px 60px rgba(37,99,235,.15)', aspectRatio: '4/5' }}>
                <img src={DIRECTOR_PHOTO} alt="Directeur ANB Corporate" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
              <div className="card" style={{ position: 'absolute', bottom: -20, right: -8, padding: '12px 18px', background: 'var(--ink-900)', color: 'white', borderRadius: 14, border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,.28)' }}>
                <div style={{ font: '500 10px/1 var(--font-mono)', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Expert agréé</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>ONECCA-CI · OHADA</div>
              </div>
            </div>
            <div>
              <div style={{ font: '600 18px/1.2 var(--font-display)', color: 'var(--ink-900)' }}>Abdou N'Diaye Bamba</div>
              <div style={{ fontSize: 14, color: 'var(--ink-500)', marginTop: 4 }}>Fondateur & Directeur Général</div>
              <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                <a href="https://wa.me/2250787448857" target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: '#25D366', color: 'white', textDecoration: 'none' }}>
                  <Icon name="whatsapp" size={14} /> WhatsApp
                </a>
                <a href="mailto:info@anbcorporate.com" className="btn btn-sm btn-ghost" style={{ textDecoration: 'none' }}>
                  <Icon name="mail" size={14} /> Email
                </a>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)', marginBottom: 16 }}>Notre cabinet</div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-700)', margin: '0 0 20px' }}>
              ANB CORPORATE est un cabinet basé à Abidjan (Cocody, Angré 7e/8e tranche) spécialisé dans l'accompagnement à la création d'entreprise, l'assistance comptable, fiscale et juridique, ainsi que le pilotage de la performance.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-700)', margin: '0 0 32px' }}>
              Nous conseillons les porteurs de projets, TPE/PME et organisations à chaque étape : choix de la forme juridique, constitution et enregistrement, rattachements (Impôts, CNPS, Inspection du travail), obligations fiscales & sociales, tableaux de bord et conformité continue.
            </p>

            {/* Mission */}
            <div className="card" style={{ padding: '20px 24px', background: 'var(--blue-50)', border: '1.5px solid var(--blue-100)', marginBottom: 28 }}>
              <div style={{ font: '600 12px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue-700)', marginBottom: 10 }}>Notre mission</div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--blue-900)', margin: 0, fontStyle: 'italic' }}>
                « Délivrer une information fiable, optimiser la trésorerie et sécuriser la conformité, pour vous permettre de vous concentrer sur votre cœur de métier. »
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { v: '1 200', l: 'Entreprises créées' },
                { v: '5+', l: 'Années d'expertise' },
                { v: '4,9', l: 'Satisfaction client' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: '16px 20px', textAlign: 'center', background: 'white' }}>
                  <div className="display-num" style={{ fontSize: 32, color: 'var(--blue-600)' }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <button onClick={() => nav('/quiz')} className="btn btn-primary btn-lg">
              Créer mon entreprise <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div style={{ padding: '80px 56px', background: 'var(--ink-50)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="chip chip-blue" style={{ marginBottom: 16 }}>Nos valeurs</div>
            <h2 style={{ font: '500 48px/1 var(--font-display)', letterSpacing: '-0.04em', margin: 0 }}>
              Ce qui guide <span className="serif" style={{ color: 'var(--blue-600)' }}>chaque dossier.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {valeurs.map((v, i) => (
              <div key={i} className="card" style={{ padding: 24, background: 'white', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon name={v.i} size={22} />
                </div>
                <div style={{ font: '700 18px/1.2 var(--font-display)', letterSpacing: '-0.02em', marginBottom: 12, color: 'var(--ink-900)' }}>{v.v}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-600)', lineHeight: 1.55 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Informations légales */}
      <div style={{ padding: '80px 56px', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 40 }}>
            <div className="chip chip-blue" style={{ marginBottom: 16 }}>Transparence</div>
            <h2 style={{ font: '500 48px/1 var(--font-display)', letterSpacing: '-0.04em', margin: 0 }}>
              Informations <span className="serif" style={{ color: 'var(--blue-600)' }}>légales.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {legal.map((it, i) => (
              <div key={i} className="card" style={{ padding: '20px 24px', background: i < 3 ? 'var(--ink-50)' : 'white' }}>
                <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 8 }}>{it.l}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{it.v}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: 24, padding: '24px 28px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <Icon name="phone" size={24} color="var(--blue-700)" />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 16px/1 var(--font-display)' }}>+225 07 87 44 88 57</div>
              <div style={{ fontSize: 13, color: 'var(--ink-600)', marginTop: 4 }}>Lundi–Vendredi · 8h–18h · Réponse WhatsApp 7j/7</div>
            </div>
            <a href="mailto:info@anbcorporate.com" style={{ fontSize: 15, color: 'var(--blue-700)', fontWeight: 500, textDecoration: 'none' }}>info@anbcorporate.com</a>
          </div>
        </div>
      </div>

      <CtaClosure />
      <VitrineFooter />
    </div>
  );
};

Object.assign(window, { PageTarifs, PageFAQ, Quiz, Upload, PageAPropos });
