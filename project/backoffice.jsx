/* global React, Icon, Logo */
// Backoffice partenaire + admin

// Hook copy partagé avec vitrine — pour cabinet info
const useCabinet = () => {
  const [c, setC] = React.useState(window.__pas_copy || {});
  React.useEffect(() => {
    const h = () => setC({ ...window.__pas_copy });
    window.addEventListener('pas-copy-update', h);
    return () => window.removeEventListener('pas-copy-update', h);
  }, []);
  const name = c.cabinetName || 'ANB Corporate';
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'AB';
  return {
    name,
    city: c.cabinetCity || 'Cocody, Abidjan',
    email: c.cabinetEmail || 'contact@anbcorporate.com',
    phone: c.cabinetPhone || '+225 27 22 00 00 00',
    initials,
  };
};

const SideNav = ({ active = 'dossiers', items, role = 'Partenaire' }) => {
  const cab = useCabinet();
  const nav = useNav();
  const routeFor = (k) => {
    if (role === 'Admin') {
      return ({
        home: '/admin',
        dossiers: '/admin',
        clients: '/admin/clients',
        partners: '/admin/partenaires',
        pay: '/admin/paiements',
        commissions: '/admin/commissions',
        stats: '/admin/statistiques',
        set: '/admin/parametres',
      }[k]) || '/admin';
    }
    return ({
      home: '/partenaire/dashboard',
      dossiers: '/partenaire/dashboard',
      clients: '/partenaire/clients',
      docs: '/partenaire/documents',
      pay: '/partenaire/paiements',
      stats: '/partenaire/statistiques',
      set: '/partenaire/parametres',
    }[k]) || '/partenaire/dashboard';
  };
  return (
  <div data-sidenav style={{ width: 220, background: 'var(--ink-900)', color: 'white', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}>
    <div style={{ padding: '4px 8px 16px', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 12 }}>
      <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}><Logo light size={24} /></span>
      <div data-sidenav-label style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 12, fontFamily: 'var(--font-mono)' }}>{role}</div>
    </div>
    {items.map((it) => (
      <div key={it.k} onClick={() => nav(routeFor(it.k))} title={it.l} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', borderRadius: 8,
        background: it.k === active ? 'rgba(255,255,255,.08)' : 'transparent',
        color: it.k === active ? 'white' : 'rgba(255,255,255,.7)',
        fontSize: 13, fontWeight: it.k === active ? 500 : 400,
        cursor: 'pointer',
      }}>
        <Icon name={it.i} size={15} />
        <span data-sidenav-label style={{ flex: 1 }}>{it.l}</span>
        {it.b && <span data-sidenav-label style={{ background: 'var(--blue-600)', color: 'white', fontSize: 10, padding: '2px 6px', borderRadius: 8, fontWeight: 600 }}>{it.b}</span>}
      </div>
    ))}
    <div data-sidenav-cabinet style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div className="ava" style={{ background: 'var(--blue-600)', color: 'white' }}>{cab.initials}</div>
      <div style={{ fontSize: 12, minWidth: 0, flex: 1 }}>
        <div style={{ color: 'white', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cab.name}</div>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cab.city}</div>
      </div>
    </div>
  </div>
  );
};

// Shared nav item lists — referenced by every page so the active highlight matches
const PARTNER_NAV = [
  { k: 'dossiers', l: 'Dossiers', i: 'folder', b: '24' },
  { k: 'clients', l: 'Clients', i: 'users', b: '187' },
  { k: 'docs', l: 'Documents', i: 'doc' },
  { k: 'pay', l: 'Paiements', i: 'wallet' },
  { k: 'stats', l: 'Statistiques', i: 'chart' },
  { k: 'set', l: 'Paramètres', i: 'settings' },
];
const ADMIN_NAV = [
  { k: 'home', l: "Vue d'ensemble", i: 'home' },
  { k: 'dossiers', l: 'Dossiers', i: 'folder', b: '142' },
  { k: 'clients', l: 'Clients', i: 'users' },
  { k: 'partners', l: 'Partenaires', i: 'layers' },
  { k: 'pay', l: 'Paiements', i: 'wallet' },
  { k: 'commissions', l: 'Commissions', i: 'money' },
  { k: 'stats', l: 'Statistiques', i: 'chart' },
  { k: 'set', l: 'Configuration', i: 'settings' },
];

// Shared layout wrapper for every backoffice page
const BackofficeLayout = ({ active, role = 'Partenaire', title, sub, children, headerExtra }) => (
  <div className="pas" style={{ width: 1440, minHeight: 900, display: 'flex', background: 'var(--ink-50)' }}>
    <SideNav active={active} items={role === 'Admin' ? ADMIN_NAV : PARTNER_NAV} role={role} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title={title} sub={sub} />
      {headerExtra}
      <div style={{ flex: 1, padding: 32, overflow: 'auto' }}>{children}</div>
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
  const nav = useNav();
  const dossiers = [
    { ref: 'ANB-2026-04812', client: 'Mali Cosmétiques', t: 'SARL', m: 185000, s: 'cours', d: 'il y a 2j', a: 'AD' },
    { ref: 'ANB-2026-04809', client: 'Kojo Tech', t: 'SAS', m: 245000, s: 'greffe', d: 'il y a 3j', a: 'KM' },
    { ref: 'ANB-2026-04795', client: 'Sow Restaurant', t: 'EI', m: 95000, s: 'livre', d: 'il y a 5j', a: 'FS' },
    { ref: 'ANB-2026-04788', client: 'Bamba Logistique', t: 'SARL', m: 185000, s: 'nouveau', d: 'il y a 6j', a: 'BL' },
    { ref: 'ANB-2026-04781', client: 'Diop Conseil', t: 'SASU', m: 195000, s: 'bloque', d: 'il y a 8j', a: 'DC' },
    { ref: 'ANB-2026-04772', client: 'Touré BTP', t: 'SARL', m: 185000, s: 'livre', d: 'il y a 12j', a: 'TB' },
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
            <div data-bo-table>
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
                <div key={d.ref} onClick={() => nav('/partenaire/dossier')} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 1fr 1fr 0.8fr 30px', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
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
    </div>
  );
};

// ── Détail dossier ──
const PartnerDossier = () => {
  const nav = useNav();
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
            <span onClick={() => nav('/partenaire/dashboard')} style={{ cursor: 'pointer', color: 'var(--blue-600)' }}>Dossiers</span> <Icon name="chev" size={11} /> <span>ANB-2026-04812</span>
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
                { who: 'Aboubacar N\'Dri', what: 'Documents validés', when: 'il y a 1j', i: 'check' },
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
  const nav = useNav();
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
    { n: 'ANB Corporate', city: 'Abidjan', d: 84, ca: 12.4, sat: 4.9, status: 'actif' },
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
              <button onClick={() => nav('/partenaire')} className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Ajouter un partenaire</button>
            </div>
            <div data-bo-table>
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
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Clients
// ═════════════════════════════════════════════════════════════════
const PartnerClients = () => {
  const nav = useNav();
  const clients = [
    { a: 'AD', n: 'Aïssata Diallo',     e: 'aissata@malicosmo.ci',     dos: 2, ca: 370000,  last: 'il y a 2j',  tag: 'VIP' },
    { a: 'KM', n: 'Kojo Mensah',        e: 'kojo@kojotech.ci',          dos: 1, ca: 245000,  last: 'il y a 3j',  tag: '' },
    { a: 'FS', n: 'Fatou Sow',          e: 'fatou@sowrestaurant.com',   dos: 1, ca: 95000,   last: 'il y a 5j',  tag: '' },
    { a: 'BL', n: 'Bamba Logistique',   e: 'contact@bamba.ci',          dos: 3, ca: 555000,  last: 'il y a 6j',  tag: 'VIP' },
    { a: 'DC', n: 'Diop Conseil',       e: 'service@diopconseil.sn',    dos: 1, ca: 195000,  last: 'il y a 8j',  tag: '' },
    { a: 'TB', n: 'Touré BTP',          e: 'admin@tourebtp.ci',         dos: 2, ca: 370000,  last: 'il y a 12j', tag: '' },
    { a: 'EH', n: 'Eric Houphouët',     e: 'eric@ehm-group.ci',         dos: 4, ca: 920000,  last: 'il y a 14j', tag: 'VIP' },
    { a: 'BK', n: 'Dr. Bio Konaté',     e: 'biokonate@expertbio.ci',    dos: 2, ca: 430000,  last: 'il y a 18j', tag: 'VIP' },
  ];
  const total = clients.reduce((s, c) => s + c.ca, 0);
  return (
    <BackofficeLayout active="clients" title="Clients" sub="187 clients · 24 actifs ce mois">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total clients" value="187" delta="+12" deltaPositive />
        <StatCard label="Clients VIP" value="22" suffix={`/${187}`} delta="+3" deltaPositive />
        <StatCard label="CA cumulé" value={(total / 1e6).toFixed(1)} suffix="M FCFA" delta="+18%" deltaPositive />
        <StatCard label="Panier moyen" value={Math.round(total / clients.length / 1000)} suffix="K FCFA" delta="+8%" deltaPositive />
      </div>

      <div className="card" style={{ background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: '500 15px/1 var(--font-display)' }}>Tous les clients</div>
            <div style={{ position: 'relative', width: 280 }}>
              <input className="input" placeholder="Rechercher un client..." style={{ paddingLeft: 32, height: 32, fontSize: 13 }} />
              <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }}><Icon name="search" size={13} /></div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="filter" size={14} /> Filtrer</button>
            <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Nouveau client</button>
          </div>
        </div>
        <div data-bo-table>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 0.7fr 0.9fr 0.9fr 0.6fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
            <div>Client</div><div>Email</div><div>Dossiers</div><div>CA total</div><div>Dernière activité</div><div></div>
          </div>
          {clients.map((c) => (
            <div key={c.n} onClick={() => nav('/partenaire/dossier')} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 0.7fr 0.9fr 0.9fr 0.6fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="ava">{c.a}</div>
                <div>
                  <div style={{ fontWeight: 500 }}>{c.n}</div>
                  {c.tag && <span className="chip chip-amber" style={{ fontSize: 10, padding: '2px 8px', marginTop: 4 }}>{c.tag}</span>}
                </div>
              </div>
              <div style={{ color: 'var(--ink-600)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.e}</div>
              <div className="num" style={{ fontWeight: 500 }}>{c.dos}</div>
              <div className="num" style={{ fontWeight: 500 }}>{c.ca.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
              <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{c.last}</div>
              <div style={{ textAlign: 'right' }}><Icon name="chev" size={14} color="var(--ink-400)" /></div>
            </div>
          ))}
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Documents
// ═════════════════════════════════════════════════════════════════
const PartnerDocuments = () => {
  const cats = [
    { i: 'doc',    l: 'Statuts & RCCM',      n: 48, color: 'var(--blue-600)' },
    { i: 'user',   l: 'Identité clients',     n: 142, color: 'var(--accent-mint)' },
    { i: 'shield', l: 'Annonces légales',     n: 32, color: 'var(--accent-amber)' },
    { i: 'wallet', l: 'Justificatifs paiement', n: 96, color: 'var(--brand-red)' },
    { i: 'chart',  l: 'États financiers',     n: 24, color: '#8B5CF6' },
    { i: 'check',  l: 'Attestations diverses', n: 18, color: 'var(--ink-700)' },
  ];
  const recent = [
    { n: 'Statuts_MaliCosmetiques_v2.pdf',  c: 'Statuts & RCCM', who: 'Aïssata Diallo',  when: 'il y a 12 min', size: '2,4 Mo', tag: 'mint' },
    { n: 'CNI_Kojo_Mensah.jpg',              c: 'Identité',       who: 'Kojo Mensah',     when: 'il y a 1h',     size: '1,1 Mo', tag: 'mint' },
    { n: 'Annonce_legale_SowResto.pdf',      c: 'Annonces',       who: 'ANB Corporate',   when: 'il y a 3h',     size: '420 Ko', tag: 'amber' },
    { n: 'Recu_paiement_Wave_61666.pdf',     c: 'Paiements',      who: 'Système Wave',    when: 'il y a 5h',     size: '180 Ko', tag: 'mint' },
    { n: 'Bilan_2025_BambaLogistique.pdf',   c: 'États financiers', who: 'Touré BTP',     when: 'il y a 1j',     size: '3,8 Mo', tag: 'mint' },
    { n: 'Attestation_domiciliation.pdf',    c: 'Attestations',   who: 'ANB Corporate',   when: 'il y a 2j',     size: '540 Ko', tag: 'mint' },
  ];
  return (
    <BackofficeLayout active="docs" title="Documents" sub="360 documents · 28 ajoutés cette semaine">
      {/* Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
        {cats.map((c) => (
          <div key={c.l} className="card" style={{ padding: 18, background: 'white', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = '', e.currentTarget.style.boxShadow = '')}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}1A`, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <Icon name={c.i} size={16} />
            </div>
            <div className="display-num" style={{ fontSize: 24, color: 'var(--ink-900)' }}>{c.n}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4, lineHeight: 1.35 }}>{c.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: '500 15px/1 var(--font-display)' }}>Documents récents</div>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--ink-100)', borderRadius: 8 }}>
              {['Tous', 'PDF', 'Image', 'Excel'].map((t, i) => (
                <span key={t} style={{ padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 5, background: i === 0 ? 'white' : 'transparent', boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,.06)' : 'none', cursor: 'pointer' }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="filter" size={14} /> Filtrer</button>
            <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Téléverser</button>
          </div>
        </div>
        <div data-bo-table>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.4fr 0.8fr 0.7fr 30px', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
            <div>Fichier</div><div>Catégorie</div><div>Téléversé par</div><div>Taille</div><div>Date</div><div></div>
          </div>
          {recent.map((r) => (
            <div key={r.n} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.4fr 0.8fr 0.7fr 30px', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--blue-50)', color: 'var(--blue-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="doc" size={15} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.n}</div>
                </div>
              </div>
              <div><span className={`chip chip-${r.tag}`} style={{ fontSize: 11 }}>{r.c}</span></div>
              <div style={{ color: 'var(--ink-700)' }}>{r.who}</div>
              <div className="num" style={{ color: 'var(--ink-500)', fontSize: 12 }}>{r.size}</div>
              <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{r.when}</div>
              <Icon name="download" size={14} color="var(--ink-400)" />
            </div>
          ))}
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Paiements
// ═════════════════════════════════════════════════════════════════
const PartnerPaiements = () => {
  const txs = [
    { ref: 'PAY-20260415-04812', client: 'Mali Cosmétiques',   method: 'Wave',         m: 61666,  s: 'reussi',  d: '15 avril' },
    { ref: 'PAY-20260413-04809', client: 'Kojo Tech',          method: 'Orange Money', m: 245000, s: 'reussi',  d: '13 avril' },
    { ref: 'PAY-20260412-04795', client: 'Sow Restaurant',     method: 'MTN MoMo',     m: 95000,  s: 'reussi',  d: '12 avril' },
    { ref: 'PAY-20260411-04788', client: 'Bamba Logistique',   method: 'Wave',         m: 61666,  s: 'attente', d: '11 avril' },
    { ref: 'PAY-20260410-04781', client: 'Diop Conseil',       method: 'Carte Visa',   m: 195000, s: 'reussi',  d: '10 avril' },
    { ref: 'PAY-20260408-04772', client: 'Touré BTP',          method: 'Wave',         m: 61666,  s: 'echec',   d: '8 avril' },
    { ref: 'PAY-20260405-04763', client: 'Eric Houphouët',     method: 'Orange Money', m: 185000, s: 'reussi',  d: '5 avril' },
    { ref: 'PAY-20260402-04751', client: 'Dr. Bio Konaté',     method: 'Wave',         m: 95000,  s: 'reussi',  d: '2 avril' },
  ];
  const statusChip = (s) => ({
    reussi:  <span className="chip chip-mint"><span className="chip-dot"></span> Réussi</span>,
    attente: <span className="chip chip-amber"><span className="chip-dot"></span> En attente</span>,
    echec:   <span className="chip chip-rose"><span className="chip-dot"></span> Échec</span>,
  }[s]);
  const totalRecu = txs.filter(t => t.s === 'reussi').reduce((s,t) => s + t.m, 0);
  return (
    <BackofficeLayout active="pay" title="Paiements" sub="Encaissements Mobile Money + cartes · avril 2026">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Encaissé ce mois" value={(totalRecu / 1e6).toFixed(2)} suffix="M FCFA" delta="+22%" deltaPositive />
        <StatCard label="En attente" value="1" suffix=" tx" delta="-" />
        <StatCard label="Taux de réussite" value="94" suffix="%" delta="+2 pts" deltaPositive />
        <StatCard label="Délai moyen" value="3" suffix=" min" delta="-12s" deltaPositive />
      </div>

      {/* Methods breakdown */}
      <div className="card" style={{ padding: 24, background: 'white', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Répartition par moyen de paiement · avril 2026</div>
            <div className="display-num" style={{ fontSize: 28, marginTop: 6 }}>{txs.length} <span style={{ fontSize: 13, color: 'var(--ink-400)' }}>transactions</span></div>
          </div>
          <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Export CSV</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { l: 'Wave',         v: 48, c: '#11AAE0' },
            { l: 'Orange Money', v: 28, c: '#FF7900' },
            { l: 'MTN MoMo',     v: 16, c: '#FFCC00' },
            { l: 'Carte Visa',   v: 8,  c: 'var(--ink-900)' },
          ].map((m) => (
            <div key={m.l} className="card" style={{ padding: 16, background: 'var(--ink-50)', border: 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.c, marginBottom: 10 }} />
              <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{m.l}</div>
              <div className="display-num" style={{ fontSize: 24, marginTop: 4 }}>{m.v}<span style={{ fontSize: 12, color: 'var(--ink-400)' }}>%</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
          <div style={{ font: '500 15px/1 var(--font-display)' }}>Toutes les transactions</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="filter" size={14} /> Filtrer</button>
            <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Nouveau paiement</button>
          </div>
        </div>
        <div data-bo-table>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 0.9fr 0.7fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
            <div>Référence</div><div>Client</div><div>Moyen</div><div>Montant</div><div>Statut</div><div>Date</div>
          </div>
          {txs.map((t) => (
            <div key={t.ref} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 0.9fr 0.7fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
              <div className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>{t.ref}</div>
              <div style={{ fontWeight: 500 }}>{t.client}</div>
              <div style={{ color: 'var(--ink-700)' }}>{t.method}</div>
              <div className="num" style={{ fontWeight: 500 }}>{t.m.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
              <div>{statusChip(t.s)}</div>
              <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{t.d}</div>
            </div>
          ))}
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Statistiques
// ═════════════════════════════════════════════════════════════════
const PartnerStatistiques = () => {
  return (
    <BackofficeLayout active="stats" title="Statistiques" sub="Analyses détaillées · avril 2026">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Conversion quiz → dossier" value="68" suffix="%" delta="+4 pts" deltaPositive />
        <StatCard label="Délai dossier → livré" value="71" suffix="h" delta="-4h" deltaPositive />
        <StatCard label="NPS clients" value="62" delta="+8" deltaPositive />
        <StatCard label="Taux de réabonnement" value="84" suffix="%" delta="+6 pts" deltaPositive />
      </div>

      {/* Funnel + revenue chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24, background: 'white' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Évolution du chiffre d'affaires · 12 mois</div>
          <div className="display-num" style={{ fontSize: 32, marginTop: 6 }}>24,8 <span style={{ fontSize: 14, color: 'var(--ink-400)' }}>M FCFA</span></div>
          <div style={{ marginTop: 20 }}>
            <BarChart data={[1.2, 1.4, 1.8, 1.6, 2.1, 2.4, 2.8, 2.6, 3.2, 3.6, 3.4, 4.1]} height={160} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 10, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)' }}>
            {['Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr'].map(m => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="card" style={{ padding: 24, background: 'white' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 16 }}>Entonnoir de conversion · ce mois</div>
          {[
            { l: 'Visiteurs vitrine',    v: 4280, p: 100, c: 'var(--blue-100)' },
            { l: 'Quiz démarré',         v: 2148, p: 50,  c: 'var(--blue-300)' },
            { l: 'Quiz terminé',         v: 1572, p: 37,  c: 'var(--blue-500)' },
            { l: 'Paiement initié',      v:  892, p: 21,  c: 'var(--blue-600)' },
            { l: 'Dossier soumis',       v:  604, p: 14,  c: 'var(--blue-700)' },
            { l: 'Dossier livré',        v:  582, p: 13,  c: 'var(--ink-900)' },
          ].map((f) => (
            <div key={f.l} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <span style={{ fontWeight: 500 }}>{f.l}</span>
                <span className="num" style={{ color: 'var(--ink-500)' }}>{f.v.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)' }}>· {f.p}%</span></span>
              </div>
              <div style={{ height: 8, background: 'var(--ink-100)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${f.p}%`, height: '100%', background: f.c, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top clients */}
      <div className="card" style={{ background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
          <div style={{ font: '500 15px/1 var(--font-display)' }}>Top 5 clients · CA cumulé</div>
          <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Exporter</button>
        </div>
        <div style={{ padding: 20 }}>
          {[
            { n: 'Eric Houphouët · E.H.M Group',  ca: 920000, p: 100 },
            { n: 'Bamba Logistique',              ca: 555000, p: 60 },
            { n: 'Dr. Bio Konaté · Expert Bio',   ca: 430000, p: 47 },
            { n: 'Aïssata Diallo · Mali Cosmétiques', ca: 370000, p: 40 },
            { n: 'Touré BTP',                     ca: 370000, p: 40 },
          ].map((c, i) => (
            <div key={c.n} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none' }}>
              <div style={{ width: 24, fontSize: 12, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)' }}>0{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{c.n}</div>
                <div style={{ height: 6, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${c.p}%`, height: '100%', background: 'var(--blue-600)', borderRadius: 3 }} />
                </div>
              </div>
              <div className="num" style={{ fontWeight: 600, fontSize: 14 }}>{c.ca.toLocaleString('fr-FR')} <span style={{ fontSize: 11, color: 'var(--ink-400)' }}>FCFA</span></div>
            </div>
          ))}
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Paramètres
// ═════════════════════════════════════════════════════════════════
const PartnerParametres = () => {
  const cab = useCabinet();
  const [tab, setTab] = React.useState('profil');
  const tabs = [
    { k: 'profil',  l: 'Profil cabinet',  i: 'home' },
    { k: 'team',    l: 'Équipe',           i: 'users' },
    { k: 'pay',     l: 'Facturation',      i: 'wallet' },
    { k: 'notif',   l: 'Notifications',    i: 'bell' },
    { k: 'sec',     l: 'Sécurité',         i: 'shield' },
    { k: 'api',     l: 'API & intégrations', i: 'layers' },
  ];
  return (
    <BackofficeLayout active="set" title="Paramètres" sub="Gestion du compte cabinet">
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'flex-start' }}>
        {/* Tabs */}
        <div className="card" style={{ padding: 8, background: 'white', position: 'sticky', top: 0 }}>
          {tabs.map((t) => (
            <div key={t.k} onClick={() => setTab(t.k)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
              background: tab === t.k ? 'var(--blue-50)' : 'transparent',
              color: tab === t.k ? 'var(--blue-700)' : 'var(--ink-700)',
              fontWeight: tab === t.k ? 500 : 400, fontSize: 13,
            }}>
              <Icon name={t.i} size={14} />
              {t.l}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: 32, background: 'white' }}>
          {tab === 'profil' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Profil du cabinet</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px', lineHeight: 1.5 }}>
                Ces informations apparaissent sur les documents et factures émis depuis votre espace.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                <div><label className="label">Raison sociale</label><input className="input" defaultValue={cab.name} /></div>
                <div><label className="label">RCCM</label><input className="input" defaultValue="CI-ABJ-03-2025-B13-00359" /></div>
                <div><label className="label">N° NCC</label><input className="input" defaultValue="2500120 F" /></div>
                <div><label className="label">Régime fiscal</label><input className="input" defaultValue="TEE" /></div>
                <div style={{ gridColumn: '1 / -1' }}><label className="label">Adresse</label><input className="input" defaultValue="Abidjan, Cocody, Angré 8e tranche" /></div>
                <div><label className="label">Email contact</label><input className="input" type="email" defaultValue={cab.email} /></div>
                <div><label className="label">Téléphone WhatsApp</label><input className="input" defaultValue="+225 07 87 44 88 57" /></div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
                <button className="btn btn-primary">Enregistrer</button>
                <button className="btn btn-ghost">Annuler</button>
              </div>
            </div>
          )}
          {tab === 'team' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 4px' }}>Membres de l'équipe</h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: 0 }}>5 membres actifs</p>
                </div>
                <button className="btn btn-primary"><Icon name="plus" size={14} /> Inviter un membre</button>
              </div>
              {[
                { a: 'TA', n: 'Théophile Anebo',     r: 'Directeur Général',  e: 'theophile@anbcorporate.com', role: 'Admin' },
                { a: 'AN', n: 'Aboubacar N\'Dri',     r: 'Comptable senior',   e: 'aboubacar@anbcorporate.com', role: 'Manager' },
                { a: 'MB', n: 'Mariam Bamba',        r: 'Juriste',            e: 'mariam@anbcorporate.com',   role: 'Manager' },
                { a: 'KS', n: 'Konan Sylvestre',     r: 'Comptable junior',   e: 'konan@anbcorporate.com',    role: 'Membre' },
                { a: 'YT', n: 'Yao Tanoh',           r: 'Assistant juridique', e: 'yao@anbcorporate.com',     role: 'Membre' },
              ].map((m, i) => (
                <div key={m.n} style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.5fr 0.8fr 30px', padding: '14px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="ava">{m.a}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{m.n}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{m.r}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-600)' }}>{m.e}</div>
                  <div><span className={`chip ${m.role === 'Admin' ? 'chip-blue' : 'chip'}`} style={{ fontSize: 11 }}>{m.role}</span></div>
                  <Icon name="chev" size={14} color="var(--ink-400)" />
                </div>
              ))}
            </div>
          )}
          {tab === 'pay' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 20px' }}>Facturation & abonnement</h3>
              <div className="card" style={{ padding: 24, background: 'var(--blue-50)', border: '1px solid var(--blue-100)', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue-700)', marginBottom: 8 }}>Plan actuel</div>
                    <div style={{ font: '600 22px/1 var(--font-display)', color: 'var(--blue-900)', marginBottom: 4 }}>Partenaire Pro</div>
                    <div style={{ fontSize: 13, color: 'var(--blue-700)' }}>Commission 15% · Dossiers illimités · Support prioritaire</div>
                  </div>
                  <button className="btn btn-sm" style={{ background: 'var(--blue-700)', color: 'white' }}>Voir les plans</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                <div><label className="label">Numéro IBAN (versement commissions)</label><input className="input" defaultValue="CI93 CI13 0000 0000 0000 0000 12" /></div>
                <div><label className="label">Banque</label><input className="input" defaultValue="BICICI · Cocody" /></div>
                <div><label className="label">Wave (alternatif)</label><input className="input" defaultValue="+225 07 87 44 88 57" /></div>
                <div><label className="label">Fréquence des versements</label><select className="input"><option>Hebdomadaire</option><option>Bimensuelle</option><option>Mensuelle</option></select></div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
                <button className="btn btn-primary">Enregistrer</button>
                <button className="btn btn-ghost">Annuler</button>
              </div>
            </div>
          )}
          {tab === 'notif' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Préférences de notifications</h3>
              {[
                ['Nouveau dossier client',    true, true, true],
                ['Statut de dossier mis à jour', true, true, false],
                ['Paiement reçu',              true, false, true],
                ['Versement commission',       true, true, false],
                ['Document validé/rejeté',     true, false, false],
                ['Newsletter mensuelle',       false, false, false],
              ].map(([l, e, w, s], i) => (
                <div key={l} style={{ display: 'grid', gridTemplateColumns: '1.6fr 100px 100px 100px', padding: '14px 0', borderBottom: i < 5 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{l}</div>
                  {[e, w, s].map((v, j) => (
                    <label key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-700)' }}>
                      <input type="checkbox" defaultChecked={v} style={{ accentColor: 'var(--blue-600)' }} />
                      {['Email', 'WhatsApp', 'SMS'][j]}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
          {tab === 'sec' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 24px' }}>Sécurité du compte</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { l: 'Mot de passe',          v: 'Modifié il y a 32 jours', a: 'Modifier', ok: true },
                  { l: 'Authentification 2FA',  v: 'Activée · SMS WhatsApp',  a: 'Configurer', ok: true },
                  { l: 'Sessions actives',      v: '2 appareils · Chrome macOS, Safari iPhone', a: 'Voir', ok: true },
                  { l: 'Clés API',              v: '3 clés actives',          a: 'Gérer', ok: true },
                  { l: 'Journal de connexions', v: 'Dernière connexion : il y a 12 min', a: 'Consulter', ok: true },
                ].map((s) => (
                  <div key={s.l} className="card" style={{ padding: 18, background: 'var(--ink-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{s.l}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>{s.v}</div>
                    </div>
                    <button className="btn btn-sm btn-ghost">{s.a}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'api' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 24px' }}>API & intégrations</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { n: 'Wave',          desc: 'Encaissements Mobile Money', s: 'Connecté' },
                  { n: 'Orange Money',  desc: 'Encaissements Mobile Money', s: 'Connecté' },
                  { n: 'MTN MoMo',      desc: 'Encaissements Mobile Money', s: 'Connecté' },
                  { n: 'CEPICI',        desc: 'Dépôt RCCM automatisé',      s: 'Connecté' },
                  { n: 'CNPS',          desc: 'Déclarations sociales',      s: 'À configurer' },
                  { n: 'DGI',           desc: 'Déclarations fiscales',      s: 'À configurer' },
                  { n: 'WhatsApp Business', desc: 'Notifications clients',  s: 'Connecté' },
                  { n: 'Slack',         desc: 'Alertes équipe',             s: 'Non connecté' },
                ].map((x) => (
                  <div key={x.n} className="card" style={{ padding: 18, background: 'var(--ink-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none' }}>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{x.n}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>{x.desc}</div>
                    </div>
                    <span className={`chip ${x.s === 'Connecté' ? 'chip-mint' : x.s === 'À configurer' ? 'chip-amber' : 'chip'}`} style={{ fontSize: 11 }}>{x.s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// ADMIN — Partenaires, Clients, Paiements, Commissions, Stats, Config
// ═════════════════════════════════════════════════════════════════
const AdminPartenaires = () => {
  const partners = [
    { n: 'ANB Corporate',     city: 'Abidjan',  d: 84, ca: 12.4, sat: 4.9, status: 'actif',  since: '2025' },
    { n: 'Diop & Associés',   city: 'Dakar',    d: 67, ca: 9.8,  sat: 4.8, status: 'actif',  since: '2024' },
    { n: 'Touré Conseil',     city: 'Bamako',   d: 42, ca: 6.2,  sat: 4.7, status: 'actif',  since: '2024' },
    { n: 'Sankara Legal',     city: 'Ouaga',    d: 28, ca: 4.1,  sat: 4.6, status: 'actif',  since: '2025' },
    { n: 'Mensah Cabinet',    city: 'Lomé',     d: 19, ca: 2.8,  sat: 4.5, status: 'verif',  since: '2026' },
    { n: 'Coulibaly Audit',   city: 'Abidjan',  d: 24, ca: 3.6,  sat: 4.7, status: 'actif',  since: '2025' },
    { n: 'Adjéi Consulting',  city: 'Accra',    d: 12, ca: 1.8,  sat: 4.4, status: 'verif',  since: '2026' },
  ];
  return (
    <BackofficeLayout active="partners" role="Admin" title="Partenaires" sub="24 cabinets · 7 actifs cette semaine">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Cabinets actifs" value="20" suffix="/24" delta="+2" deltaPositive />
        <StatCard label="CA cumulé" value="68,4" suffix="M FCFA" delta="+24%" deltaPositive />
        <StatCard label="Note moyenne" value="4,7" suffix="/5" delta="+0,1" deltaPositive />
        <StatCard label="Demandes en cours" value="3" delta="-1" deltaPositive />
      </div>

      <div className="card" style={{ background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: '500 15px/1 var(--font-display)' }}>Tous les partenaires</div>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--ink-100)', borderRadius: 8 }}>
              {['Tous', 'Actifs', 'Vérification', 'Suspendus'].map((t, i) => (
                <span key={t} style={{ padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 5, background: i === 0 ? 'white' : 'transparent', boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,.06)' : 'none', cursor: 'pointer' }}>{t}</span>
              ))}
            </div>
          </div>
          <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Inviter un cabinet</button>
        </div>
        <div data-bo-table>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.7fr 1fr 0.7fr 0.8fr 0.9fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
            <div>Cabinet</div><div>Ville</div><div>Dossiers</div><div>CA (M FCFA)</div><div>Note</div><div>Depuis</div><div>Statut</div>
          </div>
          {partners.map((p) => (
            <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.7fr 1fr 0.7fr 0.8fr 0.9fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
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
              <div style={{ color: 'var(--ink-500)' }}>{p.since}</div>
              <div>{p.status === 'actif' ? <span className="chip chip-mint"><span className="chip-dot"></span> Actif</span> : <span className="chip chip-amber"><span className="chip-dot"></span> Vérification</span>}</div>
            </div>
          ))}
        </div>
      </div>
    </BackofficeLayout>
  );
};

const AdminClients = () => (
  <BackofficeLayout active="clients" role="Admin" title="Clients" sub="4 280 utilisateurs · 142 actifs ce mois">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatCard label="Total inscrits" value="4 280" delta="+312" deltaPositive />
      <StatCard label="Actifs ce mois" value="1 248" delta="+18%" deltaPositive />
      <StatCard label="NPS plateforme" value="62" delta="+8" deltaPositive />
      <StatCard label="Diaspora" value="12" suffix="%" delta="+2 pts" deltaPositive />
    </div>
    <div className="card" style={{ background: 'white' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ font: '500 15px/1 var(--font-display)' }}>Derniers inscrits</div>
        <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Export CSV</button>
      </div>
      <div data-bo-table>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 1fr 1fr 0.8fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
          <div>Client</div><div>Email</div><div>Cabinet</div><div>Pays</div><div>Inscrit</div>
        </div>
        {[
          { a: 'AD', n: 'Aïssata Diallo',    e: 'aissata@malicosmo.ci',     p: 'ANB Corporate',  c: 'Côte d\'Ivoire', d: 'il y a 2j' },
          { a: 'KM', n: 'Kojo Mensah',        e: 'kojo@kojotech.ci',         p: 'ANB Corporate',  c: 'Côte d\'Ivoire', d: 'il y a 3j' },
          { a: 'AB', n: 'Amadou Bâ',          e: 'amadou@gmail.com',         p: 'Diop & Associés', c: 'Sénégal',       d: 'il y a 3j' },
          { a: 'FS', n: 'Fatou Sow',          e: 'fatou@sowrestaurant.com',  p: 'ANB Corporate',  c: 'Côte d\'Ivoire', d: 'il y a 5j' },
          { a: 'BD', n: 'Bouba Diawara',      e: 'bouba@yahoo.fr',           p: 'Touré Conseil',  c: 'Mali',           d: 'il y a 6j' },
          { a: 'YT', n: 'Yara Traoré',        e: 'yara@gmail.com',           p: 'Sankara Legal',  c: 'Burkina Faso',   d: 'il y a 7j' },
          { a: 'EH', n: 'Eric Houphouët',     e: 'eric@ehm-group.ci',        p: 'ANB Corporate',  c: 'Côte d\'Ivoire', d: 'il y a 14j' },
        ].map((c) => (
          <div key={c.n} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 1fr 1fr 0.8fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="ava">{c.a}</div>
              <div style={{ fontWeight: 500 }}>{c.n}</div>
            </div>
            <div style={{ color: 'var(--ink-600)', fontSize: 12 }}>{c.e}</div>
            <div style={{ color: 'var(--ink-700)' }}>{c.p}</div>
            <div style={{ color: 'var(--ink-700)' }}>{c.c}</div>
            <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  </BackofficeLayout>
);

const AdminPaiements = () => (
  <BackofficeLayout active="pay" role="Admin" title="Paiements" sub="Encaissements plateforme · avril 2026">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatCard label="Encaissé ce mois" value="24,8" suffix="M FCFA" delta="+22%" deltaPositive />
      <StatCard label="Transactions" value="248" delta="+34" deltaPositive />
      <StatCard label="Taux de réussite" value="96" suffix="%" delta="+2 pts" deltaPositive />
      <StatCard label="Mobile Money" value="92" suffix="%" />
    </div>
    <div className="card" style={{ padding: 24, background: 'white', marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 6 }}>Volume encaissé · 12 derniers mois</div>
      <div className="display-num" style={{ fontSize: 32 }}>198,4 <span style={{ fontSize: 14, color: 'var(--ink-400)' }}>M FCFA</span></div>
      <div style={{ marginTop: 20 }}>
        <BarChart data={[8.2, 9.4, 11.1, 12.8, 14.2, 15.6, 17.4, 18.2, 20.1, 22.4, 23.8, 24.8]} height={160} />
      </div>
    </div>
    <div className="card" style={{ background: 'white' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', font: '500 15px/1 var(--font-display)' }}>Dernières transactions</div>
      <div data-bo-table>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 0.9fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
          <div>Référence</div><div>Cabinet</div><div>Moyen</div><div>Montant</div><div>Date</div>
        </div>
        {[
          { r: 'TX-20260415-09124', p: 'ANB Corporate',  m: 'Wave',         a: 1850000, d: '15 avril' },
          { r: 'TX-20260415-09122', p: 'Diop & Associés', m: 'Orange Money', a: 985000,  d: '15 avril' },
          { r: 'TX-20260414-09115', p: 'Touré Conseil',   m: 'MTN MoMo',     a: 620000,  d: '14 avril' },
          { r: 'TX-20260414-09110', p: 'ANB Corporate',  m: 'Carte Visa',   a: 410000,  d: '14 avril' },
          { r: 'TX-20260413-09102', p: 'Sankara Legal',   m: 'Wave',         a: 285000,  d: '13 avril' },
        ].map((t) => (
          <div key={t.r} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr 0.9fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
            <div className="num" style={{ fontSize: 12, color: 'var(--ink-700)', fontFamily: 'var(--font-mono)' }}>{t.r}</div>
            <div style={{ fontWeight: 500 }}>{t.p}</div>
            <div style={{ color: 'var(--ink-700)' }}>{t.m}</div>
            <div className="num" style={{ fontWeight: 500 }}>{t.a.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
            <div style={{ color: 'var(--ink-500)', fontSize: 12 }}>{t.d}</div>
          </div>
        ))}
      </div>
    </div>
  </BackofficeLayout>
);

const AdminCommissions = () => (
  <BackofficeLayout active="commissions" role="Admin" title="Commissions" sub="Versements aux cabinets partenaires">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatCard label="Versé ce mois" value="3,7" suffix="M FCFA" delta="+18%" deltaPositive />
      <StatCard label="En attente" value="892" suffix="K" />
      <StatCard label="Taux moyen" value="15" suffix="%" />
      <StatCard label="Prochain virement" value="22" suffix=" avril" />
    </div>
    <div className="card" style={{ background: 'white' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', font: '500 15px/1 var(--font-display)' }}>Commissions par cabinet · avril 2026</div>
      <div data-bo-table>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 0.9fr', padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
          <div>Cabinet</div><div>Taux</div><div>CA généré</div><div>Commission</div><div>Statut</div>
        </div>
        {[
          { n: 'ANB Corporate',     r: 15, ca: 12400000, c: 1860000, s: 'paye' },
          { n: 'Diop & Associés',   r: 15, ca: 9800000,  c: 1470000, s: 'paye' },
          { n: 'Touré Conseil',     r: 12, ca: 6200000,  c: 744000,  s: 'attente' },
          { n: 'Sankara Legal',     r: 12, ca: 4100000,  c: 492000,  s: 'paye' },
          { n: 'Coulibaly Audit',   r: 12, ca: 3600000,  c: 432000,  s: 'attente' },
          { n: 'Mensah Cabinet',    r: 10, ca: 2800000,  c: 280000,  s: 'attente' },
        ].map((c) => (
          <div key={c.n} style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 0.9fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="ava" style={{ background: 'var(--ink-900)', color: 'white' }}>{c.n.split(' ')[0][0]}{c.n.split(' ').slice(-1)[0][0]}</div>
              <div style={{ fontWeight: 500 }}>{c.n}</div>
            </div>
            <div className="num">{c.r}%</div>
            <div className="num" style={{ color: 'var(--ink-700)' }}>{(c.ca / 1e6).toFixed(1)} M</div>
            <div className="num" style={{ fontWeight: 600 }}>{c.c.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
            <div>{c.s === 'paye' ? <span className="chip chip-mint"><span className="chip-dot"></span> Payé</span> : <span className="chip chip-amber"><span className="chip-dot"></span> En attente</span>}</div>
          </div>
        ))}
      </div>
    </div>
  </BackofficeLayout>
);

const AdminStats = () => (
  <BackofficeLayout active="stats" role="Admin" title="Statistiques" sub="Performance plateforme · vue annuelle">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      <StatCard label="Sociétés créées" value="1 248" delta="+24%" deltaPositive />
      <StatCard label="Volume traité" value="198,4" suffix="M FCFA" delta="+32%" deltaPositive />
      <StatCard label="Cabinets actifs" value="20" delta="+4" deltaPositive />
      <StatCard label="Pays couverts" value="6" delta="+1" deltaPositive />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 24 }}>
      <div className="card" style={{ padding: 24, background: 'white' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Croissance dossiers · 12 mois</div>
        <div className="display-num" style={{ fontSize: 32, marginTop: 6 }}>1 248</div>
        <div style={{ marginTop: 20 }}><BarChart data={[42, 58, 51, 64, 72, 68, 81, 79, 92, 104, 98, 142]} height={160} /></div>
      </div>
      <div className="card" style={{ padding: 24, background: 'white' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginBottom: 16 }}>Pays · répartition CA</div>
        {[
          { l: "Côte d'Ivoire", v: 58, c: 'var(--blue-600)' },
          { l: 'Sénégal',       v: 18, c: 'var(--blue-400)' },
          { l: 'Mali',          v: 11, c: '#8B5CF6' },
          { l: 'Burkina Faso',  v: 7,  c: 'var(--accent-mint)' },
          { l: 'Togo',          v: 4,  c: 'var(--accent-amber)' },
          { l: 'Ghana',         v: 2,  c: 'var(--brand-red)' },
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

    <div className="card" style={{ background: 'white' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', font: '500 15px/1 var(--font-display)' }}>Top formes juridiques</div>
      <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[
          { f: 'SARL', n: 724, p: 58, c: 'var(--blue-600)' },
          { f: 'SAS',  n: 274, p: 22, c: 'var(--blue-500)' },
          { f: 'EI',   n: 150, p: 12, c: '#8B5CF6' },
          { f: 'SASU', n: 75,  p: 6,  c: 'var(--accent-mint)' },
          { f: 'EURL', n: 25,  p: 2,  c: 'var(--accent-amber)' },
        ].map(f => (
          <div key={f.f} className="card" style={{ padding: 16, background: 'var(--ink-50)', border: 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.c, marginBottom: 10 }} />
            <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{f.f}</div>
            <div className="display-num" style={{ fontSize: 24 }}>{f.n}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-400)', marginTop: 2 }}>{f.p}% du total</div>
          </div>
        ))}
      </div>
    </div>
  </BackofficeLayout>
);

const AdminConfig = () => (
  <BackofficeLayout active="set" role="Admin" title="Configuration" sub="Paramètres plateforme · feature flags · tarifs">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <div className="card" style={{ padding: 24, background: 'white' }}>
        <h3 style={{ font: '500 17px/1 var(--font-display)', margin: '0 0 16px' }}>Feature flags</h3>
        {[
          ['Paiement carte Visa',     true],
          ['Apple Pay',               false],
          ['Mode diaspora',           true],
          ['Anglais (EN)',            false],
          ['Quiz personnalité fiscale', true],
          ['API publique (v1)',       false],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--ink-100)' }}>
            <span style={{ fontSize: 13 }}>{l}</span>
            <span style={{ width: 36, height: 20, borderRadius: 10, background: v ? 'var(--blue-600)' : 'var(--ink-200)', position: 'relative', cursor: 'pointer' }}>
              <span style={{ position: 'absolute', top: 2, left: v ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left .15s' }} />
            </span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 24, background: 'white' }}>
        <h3 style={{ font: '500 17px/1 var(--font-display)', margin: '0 0 16px' }}>Tarification plateforme</h3>
        {[
          ['Commission par défaut',     '15%'],
          ['Commission cabinet premium', '12%'],
          ['Frais Wave',                '1,8%'],
          ['Frais Orange Money',        '2,2%'],
          ['Frais MTN MoMo',            '2,5%'],
          ['Frais carte Visa',          '3,5%'],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--ink-100)' }}>
            <span style={{ fontSize: 13, color: 'var(--ink-700)' }}>{l}</span>
            <span className="num" style={{ fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 24, background: 'white', gridColumn: '1 / -1' }}>
        <h3 style={{ font: '500 17px/1 var(--font-display)', margin: '0 0 16px' }}>Régions actives</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
          {[
            { n: "Côte d'Ivoire", f: '🇨🇮', a: true },
            { n: 'Sénégal',       f: '🇸🇳', a: true },
            { n: 'Mali',          f: '🇲🇱', a: true },
            { n: 'Burkina Faso',  f: '🇧🇫', a: true },
            { n: 'Togo',          f: '🇹🇬', a: true },
            { n: 'Ghana',         f: '🇬🇭', a: true },
            { n: 'Bénin',         f: '🇧🇯', a: false },
            { n: 'Niger',         f: '🇳🇪', a: false },
            { n: 'Guinée',        f: '🇬🇳', a: false },
            { n: 'Cameroun',      f: '🇨🇲', a: false },
            { n: 'Gabon',         f: '🇬🇦', a: false },
            { n: 'Tchad',         f: '🇹🇩', a: false },
          ].map((r) => (
            <div key={r.n} style={{ padding: 14, border: `1px solid var(--ink-200)`, borderRadius: 10, background: r.a ? 'var(--blue-50)' : 'var(--ink-50)', opacity: r.a ? 1 : 0.55 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{r.f}</div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>{r.n}</div>
              <div style={{ fontSize: 10, color: r.a ? 'var(--blue-700)' : 'var(--ink-400)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{r.a ? 'ACTIF' : 'INACTIF'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BackofficeLayout>
);

Object.assign(window, {
  PartnerDashboard, PartnerDossier, PartnerClients, PartnerDocuments,
  PartnerPaiements, PartnerStatistiques, PartnerParametres,
  AdminDashboard, AdminPartenaires, AdminClients, AdminPaiements,
  AdminCommissions, AdminStats, AdminConfig,
  BackofficeLayout, PARTNER_NAV, ADMIN_NAV,
});
