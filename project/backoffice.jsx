/* global React, Icon, Logo */
// Backoffice partenaire + admin

const SideNav = ({ active = 'dossiers', items, role = 'Partenaire' }) => (
  <div style={{ width: 220, background: 'var(--ink-900)', color: 'white', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
    <div style={{ padding: '4px 8px 16px', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 12 }}>
      <Logo light size={24} />
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 12, fontFamily: 'var(--font-mono)' }}>{role}</div>
    </div>
    {items.map((it) => (
      <div key={it.k} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', borderRadius: 8,
        background: it.k === active ? 'rgba(255,255,255,.08)' : 'transparent',
        color: it.k === active ? 'white' : 'rgba(255,255,255,.7)',
        fontSize: 13, fontWeight: it.k === active ? 500 : 400,
        cursor: 'pointer',
      }}>
        <Icon name={it.i} size={15} />
        <span style={{ flex: 1 }}>{it.l}</span>
        {it.b && <span style={{ background: 'var(--blue-600)', color: 'white', fontSize: 10, padding: '2px 6px', borderRadius: 8, fontWeight: 600 }}>{it.b}</span>}
      </div>
    ))}
    <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div className="ava" style={{ background: 'var(--blue-600)', color: 'white' }}>SK</div>
      <div style={{ fontSize: 12 }}>
        <div style={{ color: 'white', fontWeight: 500 }}>Cabinet Konaté</div>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11 }}>Abidjan</div>
      </div>
    </div>
  </div>
);

const TopBar = ({ title, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white' }}>
    <div>
      <h1 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: 0 }}>{title}</h1>
      {sub && <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4 }}>{sub}</div>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ position: 'relative', width: 280 }}>
        <input className="input" placeholder="Rechercher un dossier..." style={{ paddingLeft: 36, height: 36 }} />
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }}><Icon name="search" size={14} /></div>
      </div>
      <button className="btn btn-sm btn-ghost" style={{ width: 36, padding: 0 }}><Icon name="bell" size={16} /></button>
    </div>
  </div>
);

const StatCard = ({ label, value, suffix, delta, deltaPositive }) => (
  <div className="card" style={{ padding: 20, background: 'white' }}>
    <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
      <div className="display-num" style={{ fontSize: 36, color: 'var(--ink-900)' }}>
        {value}<span style={{ fontSize: 16, color: 'var(--ink-400)', marginLeft: 2 }}>{suffix}</span>
      </div>
      {delta && (
        <span style={{ fontSize: 12, fontWeight: 500, color: deltaPositive ? '#047857' : '#BE123C', display: 'flex', alignItems: 'center', gap: 2 }}>
          {deltaPositive ? '↑' : '↓'} {delta}
        </span>
      )}
    </div>
  </div>
);

// Simple sparkline / bar chart
const BarChart = ({ data = [12, 18, 14, 22, 28, 24, 32, 29, 38, 42, 36, 48], height = 120 }) => {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: i === data.length - 1 ? 'var(--blue-600)' : 'var(--blue-200, #BFDBFE)', borderRadius: '4px 4px 0 0', minHeight: 4 }} />
      ))}
    </div>
  );
};

const StatusBadge = ({ s }) => {
  const map = {
    nouveau: { c: 'chip-blue', l: 'Nouveau' },
    cours: { c: 'chip-amber', l: 'En cours' },
    greffe: { c: 'chip', l: 'Au greffe' },
    livre: { c: 'chip-mint', l: 'Livré' },
    bloque: { c: 'chip-rose', l: 'Bloqué' },
  };
  const m = map[s];
  return <span className={`chip ${m.c}`}><span className="chip-dot"></span> {m.l}</span>;
};

// ── Backoffice partenaire — Dashboard ──
const PartnerDashboard = () => {
  const dossiers = [
    { ref: 'PAS-2026-04812', client: 'Mali Cosmétiques', t: 'SARL', m: 185000, s: 'cours', d: 'il y a 2j', a: 'AD' },
    { ref: 'PAS-2026-04809', client: 'Kojo Tech', t: 'SAS', m: 245000, s: 'greffe', d: 'il y a 3j', a: 'KM' },
    { ref: 'PAS-2026-04795', client: 'Sow Restaurant', t: 'EI', m: 95000, s: 'livre', d: 'il y a 5j', a: 'FS' },
    { ref: 'PAS-2026-04788', client: 'Bamba Logistique', t: 'SARL', m: 185000, s: 'nouveau', d: 'il y a 6j', a: 'BL' },
    { ref: 'PAS-2026-04781', client: 'Diop Conseil', t: 'SASU', m: 195000, s: 'bloque', d: 'il y a 8j', a: 'DC' },
    { ref: 'PAS-2026-04772', client: 'Touré BTP', t: 'SARL', m: 185000, s: 'livre', d: 'il y a 12j', a: 'TB' },
  ];

  const navItems = [
    { k: 'home', l: 'Vue d\'ensemble', i: 'home' },
    { k: 'dossiers', l: 'Dossiers', i: 'folder', b: '24' },
    { k: 'clients', l: 'Clients', i: 'users' },
    { k: 'docs', l: 'Documents', i: 'doc' },
    { k: 'pay', l: 'Paiements', i: 'wallet' },
    { k: 'stats', l: 'Statistiques', i: 'chart' },
    { k: 'set', l: 'Paramètres', i: 'settings' },
  ];

  return (
    <div className="pas" style={{ width: 1440, height: 900, display: 'flex', background: 'var(--ink-50)' }}>
      <SideNav active="dossiers" items={navItems} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title="Dossiers" sub="24 dossiers actifs · 6 nouveaux cette semaine" />

        <div style={{ flex: 1, padding: 32, overflow: 'auto' }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            <StatCard label="Dossiers ce mois" value="24" delta="+18%" deltaPositive />
            <StatCard label="Revenu commission" value="2,4" suffix="M FCFA" delta="+12%" deltaPositive />
            <StatCard label="Délai moyen" value="71" suffix="h" delta="-4h" deltaPositive />
            <StatCard label="Satisfaction" value="4,9" suffix="/5" delta="+0,1" deltaPositive />
          </div>

          {/* Chart band */}
          <div className="card" style={{ padding: 24, background: 'white', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Activité — 12 dernières semaines</div>
                <div className="display-num" style={{ fontSize: 36, marginTop: 6 }}>248 <span style={{ fontSize: 14, color: 'var(--ink-400)' }}>dossiers traités</span></div>
              </div>
              <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--ink-100)', borderRadius: 8 }}>
                {['7j', '4s', '3m', '12m'].map((p, i) => (
                  <div key={p} style={{ padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 5, background: i === 1 ? 'white' : 'transparent', boxShadow: i === 1 ? '0 1px 2px rgba(0,0,0,.06)' : 'none', cursor: 'pointer' }}>{p}</div>
                ))}
              </div>
            </div>
            <BarChart />
          </div>

          {/* Table */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
              <div style={{ font: '500 15px/1 var(--font-display)', letterSpacing: '-0.02em' }}>Dossiers récents</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm btn-ghost"><Icon name="filter" size={14} /> Filtrer</button>
                <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Exporter</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1fr 1fr 0.8fr 30px', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
              <div>Client</div>
              <div>Référence</div>
              <div>Type</div>
              <div>Montant</div>
              <div>Statut</div>
              <div>Date</div>
              <div></div>
            </div>
            {dossiers.map((d) => (
              <div key={d.ref} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1fr 1fr 0.8fr 30px', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="ava">{d.a}</div>
                  <div style={{ fontWeight: 500 }}>{d.client}</div>
                </div>
                <div className="num" style={{ color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{d.ref}</div>
                <div style={{ color: 'var(--ink-700)' }}>{d.t}</div>
                <div className="num" style={{ fontWeight: 500 }}>{d.m.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
                <div><StatusBadge s={d.s} /></div>
                <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{d.d}</div>
                <Icon name="chev" size={14} color="var(--ink-400)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Détail dossier ──
const PartnerDossier = () => {
  const navItems = [
    { k: 'home', l: 'Vue d\'ensemble', i: 'home' },
    { k: 'dossiers', l: 'Dossiers', i: 'folder', b: '24' },
    { k: 'clients', l: 'Clients', i: 'users' },
    { k: 'docs', l: 'Documents', i: 'doc' },
    { k: 'pay', l: 'Paiements', i: 'wallet' },
    { k: 'stats', l: 'Statistiques', i: 'chart' },
    { k: 'set', l: 'Paramètres', i: 'settings' },
  ];
  return (
    <div className="pas" style={{ width: 1440, height: 900, display: 'flex', background: 'var(--ink-50)' }}>
      <SideNav active="dossiers" items={navItems} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-500)', marginBottom: 12 }}>
            <span>Dossiers</span> <Icon name="chev" size={11} /> <span>PAS-2026-04812</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h1 style={{ font: '500 28px/1 var(--font-display)', letterSpacing: '-0.025em', margin: 0 }}>Mali Cosmétiques</h1>
                <StatusBadge s="cours" />
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>SARL · Abidjan · Créé le 15 mars 2026 par Aïssata Diallo</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Télécharger tout</button>
              <button className="btn btn-sm btn-primary">Mettre à jour le statut <Icon name="chevd" size={14} /></button>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: 32, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Société */}
            <div className="card" style={{ padding: 24, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Société</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontSize: 13 }}>
                {[
                  ['Dénomination', 'Mali Cosmétiques'],
                  ['Forme', 'SARL'],
                  ['Capital', '500 000 FCFA'],
                  ['Activité', 'Cosmétiques naturels'],
                  ['Siège', 'Cocody, Abidjan'],
                  ['Durée', '99 ans'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="card" style={{ padding: 24, background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)' }}>Documents (8)</div>
                <span style={{ fontSize: 12, color: 'var(--accent-mint)', fontWeight: 500 }}>✓ Tous valides</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {[
                  'Statuts signés.pdf', 'CNI gérante.jpg', 'CNI associé.jpg', 'Justif. domicile.pdf',
                  'Attestation domiciliation.pdf', 'Déclaration sur l\'honneur.pdf', 'RIB capital.pdf', 'Annonce légale.pdf',
                ].map((n, i) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--ink-200)', borderRadius: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="doc" size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>Validé · {Math.floor(Math.random() * 500 + 100)} Ko</div>
                    </div>
                    <Icon name="download" size={14} color="var(--ink-400)" />
                  </div>
                ))}
              </div>
            </div>

            {/* Activité */}
            <div className="card" style={{ padding: 24, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Activité</div>
              {[
                { who: 'Système', what: 'Statut mis à jour : Au greffe', when: 'il y a 2h', i: 'refresh' },
                { who: 'Sékou Konaté', what: 'Documents validés', when: 'il y a 1j', i: 'check' },
                { who: 'Aïssata Diallo', what: 'Paiement Wave reçu — 61 666 FCFA', when: 'il y a 2j', i: 'wallet' },
                { who: 'Aïssata Diallo', what: 'Dossier soumis', when: 'il y a 2j', i: 'plus' },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--ink-100)' : 'none' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-600)' }}>
                    <Icon name={a.i} size={13} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}><strong style={{ fontWeight: 600 }}>{a.who}</strong> <span style={{ color: 'var(--ink-500)' }}>· {a.what}</span></div>
                    <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{a.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 20, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Cliente</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div className="ava" style={{ width: 44, height: 44, fontSize: 14 }}>AD</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Aïssata Diallo</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>aissata@malicosmo.ci</div>
                </div>
              </div>
              <button className="btn btn-sm btn-ghost" style={{ width: '100%', marginBottom: 6 }}><Icon name="whatsapp" size={14} /> Contacter sur WhatsApp</button>
              <button className="btn btn-sm btn-ghost" style={{ width: '100%' }}><Icon name="phone" size={14} /> Appeler</button>
            </div>

            <div className="card" style={{ padding: 20, background: 'white' }}>
              <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Paiement</div>
              <div className="display-num" style={{ fontSize: 28 }}>185 000<span style={{ fontSize: 13, color: 'var(--ink-400)', marginLeft: 4 }}>FCFA</span></div>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>3× sans frais — versement 1 sur 3</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--blue-600)' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--ink-200)' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--ink-200)' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 10 }}>Prochain prélèvement : 15 avril</div>
            </div>

            <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-200, #BFDBFE)' }}>
              <Icon name="bolt" size={18} color="var(--blue-700)" />
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: 'var(--blue-900)' }}>Commission estimée</div>
              <div className="display-num" style={{ fontSize: 24, color: 'var(--blue-700)', marginTop: 4 }}>32 200 <span style={{ fontSize: 12 }}>FCFA</span></div>
              <div style={{ fontSize: 11, color: 'var(--blue-700)', marginTop: 4, opacity: 0.8 }}>Versée à la livraison du dossier</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Admin ──
const AdminDashboard = () => {
  const navItems = [
    { k: 'home', l: 'Vue d\'ensemble', i: 'home' },
    { k: 'dossiers', l: 'Dossiers', i: 'folder', b: '142' },
    { k: 'clients', l: 'Clients', i: 'users' },
    { k: 'partners', l: 'Partenaires', i: 'layers' },
    { k: 'pay', l: 'Paiements', i: 'wallet' },
    { k: 'commissions', l: 'Commissions', i: 'money' },
    { k: 'stats', l: 'Statistiques', i: 'chart' },
    { k: 'set', l: 'Configuration', i: 'settings' },
  ];

  const partners = [
    { n: 'Cabinet Konaté', city: 'Abidjan', d: 84, ca: 12.4, sat: 4.9, status: 'actif' },
    { n: 'Diop & Associés', city: 'Dakar', d: 67, ca: 9.8, sat: 4.8, status: 'actif' },
    { n: 'Touré Conseil', city: 'Bamako', d: 42, ca: 6.2, sat: 4.7, status: 'actif' },
    { n: 'Sankara Legal', city: 'Ouaga', d: 28, ca: 4.1, sat: 4.6, status: 'actif' },
    { n: 'Mensah Cabinet', city: 'Lomé', d: 19, ca: 2.8, sat: 4.5, status: 'verif' },
  ];

  return (
    <div className="pas" style={{ width: 1440, height: 900, display: 'flex', background: 'var(--ink-50)' }}>
      <SideNav active="home" items={navItems} role="Admin" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar title="Vue d'ensemble" sub="Performance plateforme · Mars 2026" />

        <div style={{ flex: 1, padding: 32, overflow: 'auto' }}>
          {/* Hero stats — gros chiffres */}
          <div className="card" style={{ padding: 32, background: 'var(--grad-hero)', color: 'white', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-glow)' }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
              {[
                { v: '142', l: 'Dossiers ce mois', d: '+24%' },
                { v: '24,8', l: 'CA cumulé (M FCFA)', d: '+18%' },
                { v: '4 280', l: 'Inscrits totaux', d: '+312' },
                { v: '68', l: 'Taux conversion %', d: '+4 pts' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none', paddingLeft: i ? 32 : 0 }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{s.l}</div>
                  <div className="display-num" style={{ fontSize: 56 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#86EFAC', fontWeight: 500, marginTop: 8 }}>↑ {s.d} vs mois dernier</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
            <div className="card" style={{ padding: 24, background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Nouveaux dossiers — 12 dernières semaines</div>
                  <div className="display-num" style={{ fontSize: 32, marginTop: 6 }}>1 248</div>
                </div>
                <span className="chip chip-mint">↑ Tendance positive</span>
              </div>
              <BarChart data={[42, 58, 51, 64, 72, 68, 81, 79, 92, 104, 98, 142]} height={140} />
            </div>

            <div className="card" style={{ padding: 24, background: 'white' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 16 }}>Répartition par forme</div>
              {[
                { l: 'SARL', v: 58, c: 'var(--blue-600)' },
                { l: 'SAS', v: 22, c: 'var(--blue-400)' },
                { l: 'EI', v: 12, c: 'var(--accent-violet)' },
                { l: 'SASU', v: 6, c: 'var(--accent-mint)' },
                { l: 'EURL', v: 2, c: 'var(--accent-amber)' },
              ].map((r) => (
                <div key={r.l} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 500 }}>{r.l}</span>
                    <span className="num" style={{ color: 'var(--ink-500)' }}>{r.v}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${r.v}%`, height: '100%', background: r.c, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
              <div style={{ font: '500 15px/1 var(--font-display)' }}>Partenaires (24)</div>
              <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Ajouter un partenaire</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1fr 0.8fr 1fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
              <div>Cabinet</div>
              <div>Ville</div>
              <div>Dossiers</div>
              <div>CA (M FCFA)</div>
              <div>Note</div>
              <div>Statut</div>
            </div>
            {partners.map((p) => (
              <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1fr 0.8fr 1fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="ava" style={{ background: 'var(--ink-900)', color: 'white' }}>{p.n.split(' ')[0][0]}{p.n.split(' ').slice(-1)[0][0]}</div>
                  <div style={{ fontWeight: 500 }}>{p.n}</div>
                </div>
                <div style={{ color: 'var(--ink-700)' }}>{p.city}</div>
                <div className="num" style={{ fontWeight: 500 }}>{p.d}</div>
                <div className="num">{p.ca.toLocaleString('fr-FR')}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="star" size={12} color="#F59E0B" />
                  <span className="num">{p.sat.toLocaleString('fr-FR')}</span>
                </div>
                <div>{p.status === 'actif' ? <span className="chip chip-mint"><span className="chip-dot"></span> Actif</span> : <span className="chip chip-amber"><span className="chip-dot"></span> Vérification</span>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PartnerDashboard, PartnerDossier, AdminDashboard });
