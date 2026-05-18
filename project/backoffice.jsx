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

// Grouped nav structure — each section has a label + items.
// Active item is derived from the current URL prefix so the highlight
// follows the user automatically across pages.
const PARTNER_GROUPS = [
  { l: 'Activité', items: [
    { k: 'home',     l: 'Tableau de bord', i: 'home',   route: '/partenaire/dashboard', match: ['/partenaire/dashboard'] },
    { k: 'dossiers', l: 'Dossiers',        i: 'folder', route: '/partenaire/dashboard', b: '24', match: ['/partenaire/dossier'] },
    { k: 'clients',  l: 'Clients',         i: 'users',  route: '/partenaire/clients',  b: '187', match: ['/partenaire/clients'] },
    { k: 'docs',     l: 'Documents',       i: 'doc',    route: '/partenaire/documents', match: ['/partenaire/documents'] },
  ]},
  { l: 'Services', items: [
    { k: 'compta',   l: 'Comptabilité',          i: 'chart',   route: '/partenaire/services/comptabilite', match: ['/partenaire/services/comptabilite'] },
    { k: 'jur',      l: 'Juridique',             i: 'shield',  route: '/partenaire/services/juridique',    b: '6', match: ['/partenaire/services/juridique'] },
    { k: 'fin',      l: 'Financement',           i: 'money',   route: '/partenaire/services/financement',  match: ['/partenaire/services/financement'] },
    { k: 'repres',   l: 'Représentation',        i: 'layers',  route: '/partenaire/services/representation', match: ['/partenaire/services/representation'] },
    { k: 'form',     l: 'Formation',             i: 'sparkle', route: '/partenaire/services/formation',    match: ['/partenaire/services/formation'] },
    { k: 'agr',      l: 'Agréments',             i: 'check',   route: '/partenaire/services/agrements',    match: ['/partenaire/services/agrements'] },
  ]},
  { l: 'Finance', items: [
    { k: 'pay',     l: 'Paiements',     i: 'wallet', route: '/partenaire/paiements',    match: ['/partenaire/paiements'] },
    { k: 'stats',   l: 'Statistiques',  i: 'chart',  route: '/partenaire/statistiques', match: ['/partenaire/statistiques'] },
  ]},
  { l: 'Compte', items: [
    { k: 'set',     l: 'Paramètres',    i: 'settings', route: '/partenaire/parametres', match: ['/partenaire/parametres'] },
    { k: 'help',    l: 'Aide & support', i: 'mail',    route: '/partenaire/aide',       match: ['/partenaire/aide'] },
  ]},
];
const ADMIN_GROUPS = [
  { l: 'Plateforme', items: [
    { k: 'home',     l: "Vue d'ensemble", i: 'home',   route: '/admin', match: ['/admin'] },
    { k: 'dossiers', l: 'Dossiers',       i: 'folder', route: '/admin', b: '142', match: ['/admin/dossiers'] },
    { k: 'clients',  l: 'Clients',        i: 'users',  route: '/admin/clients', match: ['/admin/clients'] },
    { k: 'partners', l: 'Partenaires',    i: 'layers', route: '/admin/partenaires', b: '24', match: ['/admin/partenaires'] },
  ]},
  { l: 'Services', items: [
    { k: 'compta',   l: 'Comptabilité',          i: 'chart',   route: '/admin/services/comptabilite', match: ['/admin/services/comptabilite'] },
    { k: 'jur',      l: 'Juridique',             i: 'shield',  route: '/admin/services/juridique',    match: ['/admin/services/juridique'] },
    { k: 'fin',      l: 'Financement',           i: 'money',   route: '/admin/services/financement',  match: ['/admin/services/financement'] },
    { k: 'form',     l: 'Formation',             i: 'sparkle', route: '/admin/services/formation',    match: ['/admin/services/formation'] },
  ]},
  { l: 'Finance', items: [
    { k: 'pay',         l: 'Paiements',    i: 'wallet', route: '/admin/paiements',    match: ['/admin/paiements'] },
    { k: 'commissions', l: 'Commissions',  i: 'money',  route: '/admin/commissions',  match: ['/admin/commissions'] },
    { k: 'stats',       l: 'Statistiques', i: 'chart',  route: '/admin/statistiques', match: ['/admin/statistiques'] },
  ]},
  { l: 'Système', items: [
    { k: 'set',     l: 'Configuration', i: 'settings', route: '/admin/parametres', match: ['/admin/parametres'] },
    { k: 'logs',    l: 'Journal d\'événements', i: 'doc', route: '/admin/logs', match: ['/admin/logs'] },
  ]},
];

const SideNav = ({ role = 'Partenaire', onClose }) => {
  const cab = useCabinet();
  const nav = useNav();
  const route = (typeof window !== 'undefined' && typeof useRoute === 'function') ? useRoute() : '/';
  const groups = role === 'Admin' ? ADMIN_GROUPS : PARTNER_GROUPS;
  // Item is active when current URL starts with one of its `match` prefixes
  const isActive = (it) => (it.match || []).some((m) => route === m || route.startsWith(m + '/'));
  const go = (it) => { nav(it.route); if (onClose) onClose(); };

  return (
  <div data-sidenav style={{ width: 240, background: 'var(--ink-900)', color: 'white', padding: '20px 14px 16px', display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
    <div style={{ padding: '4px 10px 16px', borderBottom: '1px solid rgba(255,255,255,.08)', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <span onClick={() => nav('/')} style={{ cursor: 'pointer' }}><Logo light size={24} /></span>
        <div data-sidenav-label style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12, fontFamily: 'var(--font-mono)' }}>{role}</div>
      </div>
      {onClose && (
        <button data-sidenav-close onClick={onClose} aria-label="Fermer" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.7)', cursor: 'pointer', padding: 4, display: 'none' }}>
          <Icon name="close" size={16} />
        </button>
      )}
    </div>

    {groups.map((g) => (
      <div key={g.l} style={{ marginBottom: 14 }}>
        <div data-sidenav-label style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6, padding: '0 10px', fontFamily: 'var(--font-mono)' }}>{g.l}</div>
        {g.items.map((it) => {
          const active = isActive(it);
          return (
            <div key={it.k} onClick={() => go(it)} title={it.l} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 8, marginBottom: 2,
              background: active ? 'rgba(55,82,141,.32)' : 'transparent',
              color: active ? 'white' : 'rgba(255,255,255,.7)',
              fontSize: 13, fontWeight: active ? 500 : 400,
              cursor: 'pointer',
              borderLeft: active ? '2px solid var(--brand-red)' : '2px solid transparent',
              paddingLeft: active ? 8 : 10,
            }}>
              <Icon name={it.i} size={15} />
              <span data-sidenav-label style={{ flex: 1 }}>{it.l}</span>
              {it.b && <span data-sidenav-label style={{ background: active ? 'var(--brand-red)' : 'rgba(255,255,255,.12)', color: 'white', fontSize: 10, padding: '2px 7px', borderRadius: 10, fontWeight: 600 }}>{it.b}</span>}
            </div>
          );
        })}
      </div>
    ))}

    {/* Cabinet card footer */}
    <div data-sidenav-cabinet style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div className="ava" style={{ background: 'var(--blue-600)', color: 'white' }}>{cab.initials}</div>
      <div style={{ fontSize: 12, minWidth: 0, flex: 1 }}>
        <div style={{ color: 'white', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cab.name}</div>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cab.city}</div>
      </div>
      <Icon name="chevd" size={12} color="rgba(255,255,255,.5)" />
    </div>
  </div>
  );
};

// Shared nav item lists — kept for backwards compat with existing pages
const PARTNER_NAV = PARTNER_GROUPS.flatMap((g) => g.items);
const ADMIN_NAV = ADMIN_GROUPS.flatMap((g) => g.items);

// Shared layout wrapper for every backoffice page.
// Handles the mobile drawer state and responsive shell.
const BackofficeLayout = ({ title, sub, children, headerExtra, role = 'Partenaire' }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);
  return (
    <div className="pas" data-bo-shell style={{ width: 1440, minHeight: 900, display: 'flex', background: 'var(--ink-50)' }}>
      {/* Sidebar — wrapped so we can toggle it on mobile */}
      <div data-bo-sidebar data-open={drawerOpen ? 'true' : 'false'} style={{ flexShrink: 0 }}>
        <SideNav role={role} onClose={() => setDrawerOpen(false)} />
      </div>
      {/* Backdrop for mobile drawer */}
      {drawerOpen && <div data-bo-backdrop onClick={() => setDrawerOpen(false)} />}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar title={title} sub={sub} onOpenDrawer={() => setDrawerOpen(true)} />
        {headerExtra}
        <div style={{ flex: 1, padding: 32, overflow: 'auto' }} data-bo-content>{children}</div>
      </div>
    </div>
  );
};

const TopBar = ({ title, sub, onOpenDrawer }) => {
  const [notifOpen, setNotifOpen] = React.useState(false);
  return (
    <div data-bo-topbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', position: 'relative', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
        {/* Mobile drawer trigger — shown only on mobile via CSS */}
        {onOpenDrawer && (
          <button data-bo-burger onClick={onOpenDrawer} aria-label="Ouvrir le menu" style={{ display: 'none', background: 'var(--ink-100)', border: 'none', borderRadius: 8, width: 36, height: 36, alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--ink-700)', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h16M3 11h16M3 16h16" /></svg>
          </button>
        )}
        <div style={{ minWidth: 0 }}>
          <h1 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
          {sub && <div data-bo-topbar-sub style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div data-bo-search style={{ position: 'relative', width: 280 }}>
          <input className="input" placeholder="Rechercher un dossier, un client…" style={{ paddingLeft: 36, height: 36 }} />
          <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }}><Icon name="search" size={14} /></div>
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', font: '500 10px/1 var(--font-mono)', color: 'var(--ink-400)', background: 'var(--ink-100)', padding: '3px 6px', borderRadius: 4 }}>⌘K</span>
        </div>
        <button onClick={() => setNotifOpen((o) => !o)} className="btn btn-sm btn-ghost" style={{ width: 36, padding: 0, position: 'relative' }} aria-label="Notifications">
          <Icon name="bell" size={16} />
          <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-red)', border: '2px solid white' }} />
        </button>
      </div>
      <NotificationDropdown open={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

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

  return (
    <BackofficeLayout title="Tableau de bord" sub="24 dossiers actifs · 6 nouveaux cette semaine">
      <div>
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
                <button onClick={() => nav('/partenaire/dossier/nouveau')} className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Nouveau dossier</button>
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
    </BackofficeLayout>
  );
};

// ── Détail dossier ──
const PartnerDossier = () => {
  const nav = useNav();
  return (
    <BackofficeLayout title="Mali Cosmétiques" sub="SARL · Abidjan · Créé le 15 mars 2026"
      headerExtra={
        <div style={{ padding: '14px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-500)' }}>
            <span onClick={() => nav('/partenaire/dashboard')} style={{ cursor: 'pointer', color: 'var(--blue-600)' }}>Dossiers</span>
            <Icon name="chev" size={11} />
            <span>ANB-2026-04812</span>
            <StatusBadge s="cours" />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Télécharger tout</button>
            <button className="btn btn-sm btn-primary">Mettre à jour le statut <Icon name="chevd" size={14} /></button>
          </div>
        </div>
      }
    >
      <div data-bo-detail-grid style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
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
    </BackofficeLayout>
  );
};

// ── Admin ──
const AdminDashboard = () => {
  const nav = useNav();
  const partners = [
    { n: 'ANB Corporate', city: 'Abidjan', d: 84, ca: 12.4, sat: 4.9, status: 'actif' },
    { n: 'Diop & Associés', city: 'Dakar', d: 67, ca: 9.8, sat: 4.8, status: 'actif' },
    { n: 'Touré Conseil', city: 'Bamako', d: 42, ca: 6.2, sat: 4.7, status: 'actif' },
    { n: 'Sankara Legal', city: 'Ouaga', d: 28, ca: 4.1, sat: 4.6, status: 'actif' },
    { n: 'Mensah Cabinet', city: 'Lomé', d: 19, ca: 2.8, sat: 4.5, status: 'verif' },
  ];

  return (
    <BackofficeLayout role="Admin" title="Vue d'ensemble" sub="Performance plateforme · Mars 2026">
      <div>
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
    </BackofficeLayout>
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
            <div key={c.n} onClick={() => nav('/partenaire/clients/detail')} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr 0.7fr 0.9fr 0.9fr 0.6fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
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
    { k: 'profil',  l: 'Profil cabinet',     i: 'home' },
    { k: 'brand',   l: 'Identité visuelle',  i: 'sparkle' },
    { k: 'team',    l: 'Équipe',             i: 'users' },
    { k: 'pay',     l: 'Facturation',        i: 'wallet' },
    { k: 'plans',   l: 'Forfaits & tarifs',  i: 'money' },
    { k: 'notif',   l: 'Notifications',      i: 'bell' },
    { k: 'sec',     l: 'Sécurité',           i: 'shield' },
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
          {tab === 'brand' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 8px' }}>Identité visuelle</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px', lineHeight: 1.5 }}>
                Personnalisez le logo, les couleurs et la signature de votre cabinet — appliqués sur les emails, factures, devis et l'espace client.
              </p>

              {/* Logo upload */}
              <div style={{ marginBottom: 28 }}>
                <label className="label">Logo du cabinet</label>
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 20, marginTop: 8 }}>
                  <div style={{ width: 160, height: 160, borderRadius: 12, background: 'var(--ink-50)', border: '1px solid var(--ink-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <Logo size={48} />
                  </div>
                  <div style={{ border: '2px dashed var(--ink-300)', borderRadius: 12, padding: 32, textAlign: 'center', background: 'var(--ink-50)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                      <Icon name="upload" size={18} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Glissez-déposez ou cliquez</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>SVG, PNG ou WebP · 4 Mo max · fond transparent recommandé</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                  <button className="btn btn-sm btn-ghost">Remplacer</button>
                  <button className="btn btn-sm btn-ghost" style={{ color: 'var(--brand-red)' }}>Supprimer</button>
                </div>
              </div>

              {/* Favicon */}
              <div style={{ marginBottom: 28 }}>
                <label className="label">Favicon (icône onglet navigateur)</label>
                <div style={{ display: 'flex', gap: 14, marginTop: 8, alignItems: 'center' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 8, background: 'var(--ink-50)', border: '1px solid var(--ink-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Logo size={24} />
                  </div>
                  <button className="btn btn-sm btn-ghost">Téléverser · 32x32 ou 64x64</button>
                </div>
              </div>

              {/* Couleurs */}
              <div style={{ marginBottom: 28 }}>
                <label className="label">Couleurs de marque</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 8 }}>
                  {[
                    { l: 'Bleu principal', v: '#37528D' },
                    { l: 'Rouge accent',   v: '#C61D2E' },
                    { l: 'Gris secondaire', v: '#646C70' },
                  ].map((c) => (
                    <div key={c.l} style={{ padding: 14, border: '1px solid var(--ink-200)', borderRadius: 10, background: 'white' }}>
                      <div style={{ width: '100%', height: 40, borderRadius: 6, background: c.v, marginBottom: 10 }} />
                      <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{c.l}</div>
                      <input className="input" defaultValue={c.v} style={{ marginTop: 6, fontSize: 12, fontFamily: 'var(--font-mono)' }} />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 8 }}>Ces couleurs sont appliquées sur les emails, factures et l'espace client.</div>
              </div>

              {/* Email signature */}
              <div style={{ marginBottom: 28 }}>
                <label className="label">Signature email automatique</label>
                <textarea className="input" style={{ minHeight: 120, fontFamily: 'var(--font-mono)', fontSize: 12 }} defaultValue={`Théophile Anebo
Directeur Général · ANB Corporate
Abidjan, Cocody, Angré 8e tranche
WhatsApp : +225 07 87 44 88 57
www.anbcorporate.com`} />
              </div>

              {/* Domain */}
              <div style={{ marginBottom: 28 }}>
                <label className="label">Domaine espace client (whitelabel)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <input className="input" defaultValue="client" style={{ width: 220 }} />
                  <span style={{ color: 'var(--ink-500)' }}>.anbcorporate.com</span>
                  <span className="chip chip-mint" style={{ marginLeft: 8 }}>SSL actif</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 6 }}>Domaine personnalisé disponible sur le plan Premium.</div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary">Enregistrer les modifications</button>
                <button className="btn btn-ghost">Aperçu</button>
              </div>
            </div>
          )}
          {tab === 'plans' && (
            <div>
              <h3 style={{ font: '500 22px/1 var(--font-display)', letterSpacing: '-0.02em', margin: '0 0 8px' }}>Forfaits & tarifs</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px', lineHeight: 1.5 }}>
                Les tarifs publics affichés sur le site vitrine. Modifications validées sous 24h par l'admin plateforme.
              </p>

              <div style={{ marginBottom: 24 }}>
                <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)', marginBottom: 14 }}>Création d'entreprise · paiement unique</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { n: 'Essentiel', p: '95 000', d: 'Entreprise individuelle' },
                    { n: 'Société',  p: '185 000', d: 'SARL · SASU · EURL', best: true },
                    { n: 'Croissance', p: '345 000', d: 'SAS · multi-associés' },
                  ].map((pl) => (
                    <div key={pl.n} className="card" style={{ padding: 18, background: pl.best ? 'var(--blue-50)' : 'white', border: pl.best ? '1px solid var(--blue-300)' : '1px solid var(--ink-200)', position: 'relative' }}>
                      {pl.best && <span className="chip chip-blue" style={{ position: 'absolute', top: -8, right: 12, fontSize: 10 }}>Le plus choisi</span>}
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{pl.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{pl.d}</div>
                      <div className="display-num" style={{ fontSize: 24, marginTop: 10 }}>{pl.p} <span style={{ fontSize: 11, color: 'var(--ink-400)' }}>FCFA</span></div>
                      <button className="btn btn-sm btn-ghost" style={{ marginTop: 10, width: '100%' }}><Icon name="settings" size={12} /> Modifier</button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-500)', marginBottom: 14 }}>Accompagnement mensuel</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                  {[
                    { n: 'Starter',  p: '40 000',  d: '1-3 employés' },
                    { n: 'Eco',      p: '70 000',  d: 'TPE' },
                    { n: 'Business', p: '100 000', d: 'PME · 3-10', best: true },
                    { n: 'Premium',  p: '185 000', d: 'Grand volume' },
                  ].map((pl) => (
                    <div key={pl.n} className="card" style={{ padding: 16, background: pl.best ? 'var(--blue-50)' : 'white', border: pl.best ? '1px solid var(--blue-300)' : '1px solid var(--ink-200)', position: 'relative' }}>
                      {pl.best && <span className="chip chip-blue" style={{ position: 'absolute', top: -8, right: 10, fontSize: 10 }}>Best</span>}
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{pl.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{pl.d}</div>
                      <div className="display-num" style={{ fontSize: 20, marginTop: 8 }}>{pl.p} <span style={{ fontSize: 10, color: 'var(--ink-400)' }}>/ mois</span></div>
                      <button className="btn btn-sm btn-ghost" style={{ marginTop: 10, width: '100%', fontSize: 11 }}>Modifier</button>
                    </div>
                  ))}
                </div>
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
  const nav = useNav();
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
            <div key={p.n} onClick={() => nav('/admin/partenaires/detail')} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.7fr 1fr 0.7fr 0.8fr 0.9fr', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
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

// ═════════════════════════════════════════════════════════════════
// PARTNER — Client detail (drill-down from Clients list)
// ═════════════════════════════════════════════════════════════════
const PartnerClientDetail = () => {
  const nav = useNav();
  return (
    <BackofficeLayout active="clients" title="Aïssata Diallo" sub="Cliente VIP · 2 dossiers · 370 000 FCFA CA cumulé"
      headerExtra={
        <div style={{ padding: '12px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-500)' }}>
            <span onClick={() => nav('/partenaire/clients')} style={{ cursor: 'pointer', color: 'var(--blue-600)' }}>Clients</span>
            <Icon name="chev" size={11} />
            <span>Aïssata Diallo</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="whatsapp" size={14} /> WhatsApp</button>
            <button className="btn btn-sm btn-ghost"><Icon name="mail" size={14} /> Email</button>
            <button className="btn btn-sm btn-primary"><Icon name="plus" size={14} /> Nouveau dossier</button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <StatCard label="Dossiers" value="2" />
            <StatCard label="CA cumulé" value="370" suffix="K FCFA" />
            <StatCard label="Panier moyen" value="185" suffix="K" />
            <StatCard label="Ancienneté" value="14" suffix=" mois" />
          </div>

          {/* Dossiers */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', font: '500 15px/1 var(--font-display)' }}>Dossiers</div>
            <div data-bo-table>
              {[
                { ref: 'ANB-2026-04812', t: 'SARL', m: 185000, s: 'cours',  d: '2 avr.' },
                { ref: 'ANB-2025-03991', t: 'EI',   m: 95000,  s: 'livre',  d: '14 oct.' },
                { ref: 'ANB-2025-03742', t: 'EI',   m: 95000,  s: 'livre',  d: '8 mars' },
              ].map((d) => (
                <div key={d.ref} onClick={() => nav('/partenaire/dossier')} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 1fr 1fr 0.7fr 30px', padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
                  <div className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)' }}>{d.ref}</div>
                  <div style={{ color: 'var(--ink-700)' }}>{d.t}</div>
                  <div className="num" style={{ fontWeight: 500 }}>{d.m.toLocaleString('fr-FR')} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
                  <div><StatusBadge s={d.s} /></div>
                  <div style={{ color: 'var(--ink-500)' }}>{d.d}</div>
                  <Icon name="chev" size={14} color="var(--ink-400)" />
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 16 }}>Activité récente</div>
            {[
              { i: 'wallet', what: 'Paiement Wave reçu — 61 666 FCFA', d: 'il y a 2j' },
              { i: 'doc',    what: 'Documents Mali Cosmétiques validés', d: 'il y a 4j' },
              { i: 'plus',   what: 'Nouveau dossier ANB-2026-04812 créé', d: 'il y a 6j' },
              { i: 'mail',   what: 'Email envoyé : confirmation', d: 'il y a 6j' },
              { i: 'user',   what: 'Compte créé', d: 'il y a 14 mois' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-600)' }}>
                  <Icon name={a.i} size={13} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{a.what}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-400)' }}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 12 }}>Notes internes</div>
            <textarea className="input" placeholder="Ajouter une note privée (non visible par le client)…" style={{ minHeight: 80, resize: 'vertical' }} defaultValue="Cliente recommande beaucoup d'autres entrepreneurs. Très active sur WhatsApp. Préfère Wave pour les paiements." />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button className="btn btn-sm btn-primary">Enregistrer la note</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20, background: 'white', textAlign: 'center' }}>
            <div className="ava" style={{ width: 80, height: 80, fontSize: 28, margin: '0 auto 14px' }}>AD</div>
            <div style={{ font: '500 17px/1.2 var(--font-display)', letterSpacing: '-0.01em' }}>Aïssata Diallo</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 4 }}>aissata@malicosmo.ci</div>
            <span className="chip chip-amber" style={{ marginTop: 12, fontSize: 11 }}>VIP</span>
          </div>

          <div className="card" style={{ padding: 20, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Coordonnées</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[
                ['Email', 'aissata@malicosmo.ci'],
                ['WhatsApp', '+225 07 11 22 33 44'],
                ['Adresse', 'Cocody, Abidjan'],
                ['Inscrite le', '14 février 2025'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                  <div style={{ marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
            <Icon name="bolt" size={18} color="var(--blue-700)" />
            <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: 'var(--blue-900)' }}>Recommander un service</div>
            <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4, opacity: .85 }}>
              Cliente sans abonnement comptable mensuel — opportunité business.
            </div>
            <button className="btn btn-sm" style={{ marginTop: 12, background: 'var(--blue-700)', color: 'white', width: '100%', justifyContent: 'center' }}>
              Envoyer une proposition <Icon name="arrow" size={12} />
            </button>
          </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// PARTNER — Nouveau dossier (form)
// ═════════════════════════════════════════════════════════════════
const PartnerNewDossier = () => {
  const nav = useNav();
  const [step, setStep] = React.useState(0);
  const steps = ['Client', 'Société', 'Documents', 'Confirmation'];
  return (
    <BackofficeLayout active="dossiers" title="Nouveau dossier" sub="Créer une société pour un client"
      headerExtra={
        <div style={{ padding: '12px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-500)' }}>
            <span onClick={() => nav('/partenaire/dashboard')} style={{ cursor: 'pointer', color: 'var(--blue-600)' }}>Dossiers</span>
            <Icon name="chev" size={11} />
            <span>Nouveau</span>
          </div>
        </div>
      }
    >
      {/* Stepper */}
      <div className="card" style={{ padding: 24, background: 'white', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map((l, i) => (
            <React.Fragment key={l}>
              <div onClick={() => setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= step ? 'var(--blue-600)' : 'var(--ink-200)', color: i <= step ? 'white' : 'var(--ink-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                  {i < step ? <Icon name="check" size={13} stroke={2.5} /> : (i + 1)}
                </div>
                <span style={{ fontSize: 13, fontWeight: i === step ? 600 : 400, color: i <= step ? 'var(--ink-900)' : 'var(--ink-500)' }}>{l}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--ink-200)', margin: '0 16px' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 32, background: 'white' }}>
        {step === 0 && (
          <div>
            <h3 style={{ font: '500 22px/1 var(--font-display)', margin: '0 0 8px' }}>Qui est le client ?</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px' }}>Sélectionnez un client existant ou créez-en un nouveau.</p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}><Icon name="search" size={14} /> Client existant</button>
              <button className="btn btn-ghost" style={{ flex: 1 }}><Icon name="plus" size={14} /> Nouveau client</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div><label className="label">Prénom</label><input className="input" placeholder="Aïssata" /></div>
              <div><label className="label">Nom</label><input className="input" placeholder="Diallo" /></div>
              <div><label className="label">Email</label><input className="input" type="email" placeholder="aissata@entreprise.ci" /></div>
              <div><label className="label">WhatsApp</label><input className="input" placeholder="+225 07 00 00 00 00" /></div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <h3 style={{ font: '500 22px/1 var(--font-display)', margin: '0 0 8px' }}>Informations société</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px' }}>Ces données seront utilisées pour générer les statuts.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div><label className="label">Dénomination sociale</label><input className="input" placeholder="Mali Cosmétiques" /></div>
              <div>
                <label className="label">Forme juridique</label>
                <select className="input"><option>SARL</option><option>SAS</option><option>SASU</option><option>EURL</option><option>EI</option></select>
              </div>
              <div><label className="label">Capital social (FCFA)</label><input className="input" type="number" placeholder="1 000 000" /></div>
              <div><label className="label">Durée (années)</label><input className="input" type="number" defaultValue="99" /></div>
              <div style={{ gridColumn: '1 / -1' }}><label className="label">Activité principale</label><textarea className="input" placeholder="Description précise de l'activité" style={{ minHeight: 80 }} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label className="label">Adresse du siège</label><input className="input" placeholder="Cocody, Abidjan" /></div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 style={{ font: '500 22px/1 var(--font-display)', margin: '0 0 8px' }}>Documents requis</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-500)', margin: '0 0 28px' }}>Téléversez les pièces justificatives. Les statuts seront générés automatiquement.</p>
            {[
              { l: 'CNI / Passeport du gérant',      req: true,  ok: true },
              { l: 'Justificatif de domicile',       req: true,  ok: true },
              { l: 'Extrait de naissance',           req: true,  ok: false },
              { l: 'Casier judiciaire',              req: true,  ok: false },
              { l: 'Contrat de bail du local',       req: false, ok: false },
              { l: 'Photo de profil (optionnelle)',  req: false, ok: false },
            ].map((d) => (
              <div key={d.l} className="card" style={{ padding: 14, background: 'var(--ink-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: d.ok ? 'var(--accent-mint)' : 'var(--ink-200)', color: d.ok ? 'white' : 'var(--ink-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {d.ok ? <Icon name="check" size={14} stroke={2.5} /> : <Icon name="upload" size={14} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{d.l}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{d.req ? 'Obligatoire' : 'Optionnel'} · PDF, JPG, PNG jusqu'à 5 Mo</div>
                  </div>
                </div>
                {d.ok ? <span className="chip chip-mint" style={{ fontSize: 11 }}>Téléversé</span> : <button className="btn btn-sm btn-ghost">Téléverser</button>}
              </div>
            ))}
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-mint)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Icon name="check" size={32} stroke={2.5} />
            </div>
            <h3 style={{ font: '500 28px/1 var(--font-display)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Dossier créé avec succès.</h3>
            <p style={{ fontSize: 15, color: 'var(--ink-500)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.5 }}>
              Référence <strong style={{ color: 'var(--ink-900)' }}>ANB-2026-04815</strong>. Le client recevra un email + WhatsApp avec ses identifiants de suivi.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => nav('/partenaire/dossier')} className="btn btn-primary">Voir le dossier <Icon name="arrow" size={14} /></button>
              <button onClick={() => { setStep(0); }} className="btn btn-ghost">Créer un autre dossier</button>
            </div>
          </div>
        )}

        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--ink-200)' }}>
            <button onClick={() => setStep(Math.max(0, step - 1))} className="btn btn-ghost" disabled={step === 0}><Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Précédent</button>
            <button onClick={() => setStep(Math.min(3, step + 1))} className="btn btn-primary">{step === 2 ? 'Créer le dossier' : 'Continuer'} <Icon name="arrow" size={14} /></button>
          </div>
        )}
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// ADMIN — Partner detail (drill-down from Partenaires list)
// ═════════════════════════════════════════════════════════════════
const AdminPartnerDetail = () => {
  const nav = useNav();
  return (
    <BackofficeLayout active="partners" role="Admin" title="ANB Corporate" sub="Cabinet actif · Abidjan · Théophile Anebo"
      headerExtra={
        <div style={{ padding: '12px 32px', borderBottom: '1px solid var(--ink-200)', background: 'white', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-500)' }}>
            <span onClick={() => nav('/admin/partenaires')} style={{ cursor: 'pointer', color: 'var(--blue-600)' }}>Partenaires</span>
            <Icon name="chev" size={11} />
            <span>ANB Corporate</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-sm btn-ghost"><Icon name="mail" size={14} /> Contacter</button>
            <button className="btn btn-sm btn-ghost" style={{ color: 'var(--brand-red)' }}><Icon name="pause" size={14} /> Suspendre</button>
            <button className="btn btn-sm btn-primary">Modifier le contrat</button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Hero stats */}
          <div className="card" style={{ padding: 28, background: 'var(--grad-hero)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-glow)' }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {[
                { v: '84',   l: 'Dossiers cumulés' },
                { v: '12,4', l: 'CA total (M FCFA)' },
                { v: '4,9',  l: 'Note clients' },
                { v: '15%',  l: 'Commission' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i ? '1px solid rgba(255,255,255,.12)' : 'none', paddingLeft: i ? 24 : 0 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{s.l}</div>
                  <div className="display-num" style={{ fontSize: 40 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity chart */}
          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>Activité — 12 dernières semaines</div>
                <div className="display-num" style={{ fontSize: 30, marginTop: 6 }}>248 <span style={{ fontSize: 13, color: 'var(--ink-400)' }}>dossiers</span></div>
              </div>
              <span className="chip chip-mint">↑ Tendance positive</span>
            </div>
            <BarChart data={[14, 18, 22, 18, 24, 28, 26, 32, 38, 36, 42, 48]} height={140} />
          </div>

          {/* Team */}
          <div className="card" style={{ background: 'white' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', font: '500 15px/1 var(--font-display)' }}>Équipe (5 membres)</div>
            <div style={{ padding: '8px 20px' }}>
              {[
                { a: 'TA', n: 'Théophile Anebo',  r: 'Directeur Général',  e: 'theophile@anbcorporate.com' },
                { a: 'AN', n: "Aboubacar N'Dri",  r: 'Comptable senior',   e: 'aboubacar@anbcorporate.com' },
                { a: 'MB', n: 'Mariam Bamba',     r: 'Juriste',            e: 'mariam@anbcorporate.com' },
                { a: 'KS', n: 'Konan Sylvestre',  r: 'Comptable junior',   e: 'konan@anbcorporate.com' },
                { a: 'YT', n: 'Yao Tanoh',        r: 'Assistant juridique', e: 'yao@anbcorporate.com' },
              ].map((m, i) => (
                <div key={m.n} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.6fr 1fr', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="ava">{m.a}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{m.n}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{m.r}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-600)' }}>{m.e}</div>
                  <div style={{ textAlign: 'right' }}><span className="chip" style={{ fontSize: 11 }}>{i === 0 ? 'Admin' : 'Membre'}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 24, background: 'white' }}>
            <div className="ava" style={{ width: 64, height: 64, fontSize: 22, background: 'var(--ink-900)', color: 'white', margin: '0 auto 14px' }}>AC</div>
            <div style={{ font: '500 17px/1.2 var(--font-display)', textAlign: 'center' }}>ANB Corporate</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', textAlign: 'center', marginTop: 4 }}>Membre depuis 2025</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
              <span className="chip chip-mint" style={{ fontSize: 11 }}><span className="chip-dot"></span> Actif · Premium</span>
            </div>
          </div>

          <div className="card" style={{ padding: 20, background: 'white' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Coordonnées</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              {[
                ['RCCM', 'CI-ABJ-03-2025-B13-00359'],
                ['NCC', '2500120 F'],
                ['Ville', 'Cocody, Angré 8e'],
                ['Email', 'info@anbcorporate.com'],
                ['Tél.', '+225 07 87 44 88 57'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 11, color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
                  <div style={{ marginTop: 2, fontFamily: k === 'RCCM' || k === 'NCC' ? 'var(--font-mono)' : 'inherit', fontSize: k === 'RCCM' ? 12 : 13 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
            <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue-700)', marginBottom: 10 }}>Prochain virement</div>
            <div className="display-num" style={{ fontSize: 26, color: 'var(--blue-900)' }}>1,86 <span style={{ fontSize: 13 }}>M FCFA</span></div>
            <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4 }}>Programmé pour le 22 avril 2026</div>
          </div>
        </div>
      </div>
    </BackofficeLayout>
  );
};

// ═════════════════════════════════════════════════════════════════
// Notifications panel + User menu — drop-downs from TopBar
// (Imported by TopBar via global window scope)
// ═════════════════════════════════════════════════════════════════
const NotificationDropdown = ({ open, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const items = [
    { i: 'wallet', t: 'Paiement reçu', sub: 'Mali Cosmétiques · 61 666 FCFA via Wave', when: 'il y a 12 min', unread: true },
    { i: 'doc',    t: 'Document validé', sub: 'CNI · Kojo Mensah', when: 'il y a 1h', unread: true },
    { i: 'plus',   t: 'Nouveau dossier', sub: 'Bamba Logistique vous a invité', when: 'il y a 3h', unread: true },
    { i: 'star',   t: 'Avis 5 étoiles', sub: 'Eric Houphouët vous a noté', when: 'hier', unread: false },
    { i: 'mail',   t: 'Email envoyé', sub: 'Devis SARL · Diop Conseil', when: 'hier', unread: false },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'transparent' }} />
      <div style={{ position: 'absolute', top: 56, right: 12, width: 380, background: 'white', borderRadius: 14, boxShadow: '0 24px 60px rgba(15,26,46,.18), 0 4px 12px rgba(15,26,46,.08)', border: '1px solid var(--ink-200)', zIndex: 101, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--ink-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ font: '500 15px/1 var(--font-display)' }}>Notifications</div>
          <span style={{ fontSize: 11, color: 'var(--blue-600)', cursor: 'pointer' }}>Tout marquer lu</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: 'auto' }}>
          {items.map((n, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 20px', borderBottom: i < items.length - 1 ? '1px solid var(--ink-100)' : 'none', cursor: 'pointer', position: 'relative', background: n.unread ? 'var(--blue-50)' : 'transparent' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--ink-100)', color: 'var(--ink-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={n.i} size={15} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{n.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', lineHeight: 1.4 }}>{n.sub}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-400)', marginTop: 4 }}>{n.when}</div>
              </div>
              {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-red)', marginTop: 6, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--ink-200)', textAlign: 'center', background: 'var(--ink-50)' }}>
          <span style={{ fontSize: 13, color: 'var(--blue-600)', cursor: 'pointer' }}>Voir tout l'historique</span>
        </div>
      </div>
    </>
  );
};

// ═════════════════════════════════════════════════════════════════
// SERVICE PAGES — one per cabinet expertise.
// Each renders the same shell (stats + table) populated with realistic
// activity data, then a side panel with the relevant tariffs / actions.
// ═════════════════════════════════════════════════════════════════
const ServiceShell = ({
  eyebrow, title, sub, stats, tableTitle, tableCols, tableRows,
  sidePanel, ctaLabel, ctaIcon = 'plus',
}) => (
  <BackofficeLayout title={title} sub={sub}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'flex-start' }} data-bo-detail-grid>
      {/* Left — main content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 28, height: 1.5, background: 'var(--brand-red)' }} />
          <span style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--brand-red)', textTransform: 'uppercase', letterSpacing: '0.16em' }}>{eyebrow}</span>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} data-bo-stats-grid>
          {stats.map((s, i) => (
            <StatCard key={i} {...s} />
          ))}
        </div>

        {/* Main table */}
        <div className="card" style={{ background: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--ink-200)' }}>
            <div style={{ font: '500 15px/1 var(--font-display)' }}>{tableTitle}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm btn-ghost"><Icon name="filter" size={14} /> Filtrer</button>
              <button className="btn btn-sm btn-ghost"><Icon name="download" size={14} /> Exporter</button>
              <button className="btn btn-sm btn-primary"><Icon name={ctaIcon} size={14} /> {ctaLabel}</button>
            </div>
          </div>
          <div data-bo-table>
            <div style={{ display: 'grid', gridTemplateColumns: tableCols.map(c => c.w).join(' '), padding: '12px 20px', fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--ink-200)', fontFamily: 'var(--font-mono)' }}>
              {tableCols.map((c) => <div key={c.l}>{c.l}</div>)}
            </div>
            {tableRows.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: tableCols.map(c => c.w).join(' '), padding: '14px 20px', borderBottom: '1px solid var(--ink-100)', alignItems: 'center', fontSize: 13, cursor: 'pointer' }}>
                {r.map((cell, j) => <div key={j}>{cell}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — side panel */}
      {sidePanel}
    </div>
  </BackofficeLayout>
);

// ── PartnerComptabilite ──
const PartnerComptabilite = () => (
  <ServiceShell
    eyebrow="Service · Comptabilité"
    title="Comptabilité & fiscalité"
    sub="Tenue des comptes, TVA, IS, états financiers OHADA"
    stats={[
      { label: 'Dossiers actifs',     value: '38' },
      { label: 'États en cours',      value: '12' },
      { label: 'Déclarations à faire', value: '6', delta: '5 jours', deltaPositive: false },
      { label: 'CA mensuel',          value: '1,2', suffix: 'M FCFA', delta: '+14%', deltaPositive: true },
    ]}
    tableTitle="Dossiers de comptabilité"
    tableCols={[
      { l: 'Client', w: '1.6fr' },
      { l: 'Forme', w: '0.7fr' },
      { l: 'Forfait', w: '0.9fr' },
      { l: 'Prochaine échéance', w: '1.1fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">EH</div><div style={{ fontWeight: 500 }}>E.H.M Group</div></div>,
        'SARL',
        <span className="num">Premium · 185 K</span>,
        <span style={{ color: 'var(--ink-700)' }}>TVA · 15 avril</span>,
        <span className="chip chip-mint"><span className="chip-dot"></span> À jour</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BK</div><div style={{ fontWeight: 500 }}>Expert Bio SARL</div></div>,
        'SARL',
        <span className="num">Business · 100 K</span>,
        <span style={{ color: 'var(--ink-700)' }}>États financiers · 30 avril</span>,
        <span className="chip chip-amber"><span className="chip-dot"></span> En cours</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BL</div><div style={{ fontWeight: 500 }}>Bamba Logistique</div></div>,
        'SARL',
        <span className="num">Business · 100 K</span>,
        <span style={{ color: 'var(--ink-700)' }}>Bulletins paie · 28 avril</span>,
        <span className="chip chip-mint"><span className="chip-dot"></span> À jour</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">AD</div><div style={{ fontWeight: 500 }}>Mali Cosmétiques</div></div>,
        'SARL',
        <span className="num">Starter · 40 K</span>,
        <span style={{ color: 'var(--brand-red)' }}>TVA en retard · 10 avril</span>,
        <span className="chip chip-rose"><span className="chip-dot"></span> Action requise</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">KM</div><div style={{ fontWeight: 500 }}>Kojo Tech</div></div>,
        'SAS',
        <span className="num">Eco · 70 K</span>,
        <span style={{ color: 'var(--ink-700)' }}>Déclaration CNPS · 20 avril</span>,
        <span className="chip chip-mint"><span className="chip-dot"></span> À jour</span>,
      ],
    ]}
    ctaLabel="Nouveau dossier"
    sidePanel={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20, background: 'white' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Forfaits mensuels</div>
          {[
            { n: 'Starter', p: '40 000', d: '1-3 employés' },
            { n: 'Eco',     p: '70 000', d: 'TPE' },
            { n: 'Business', p: '100 000', d: 'PME' },
            { n: 'Premium', p: '185 000', d: 'Grand volume' },
          ].map((p, i) => (
            <div key={p.n} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--ink-100)' : 'none' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.n}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{p.d}</div>
              </div>
              <div className="num" style={{ fontWeight: 600, fontSize: 13 }}>{p.p} <span style={{ color: 'var(--ink-400)', fontSize: 11 }}>FCFA</span></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
          <Icon name="bolt" size={18} color="var(--blue-700)" />
          <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: 'var(--blue-900)' }}>Échéances DGI à venir</div>
          <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4, opacity: .85, lineHeight: 1.5 }}>
            TVA mensuelle : 15 du mois · IS trimestriel : 20 du mois · CNPS : 25 du mois
          </div>
        </div>
      </div>
    }
  />
);

// ── PartnerJuridique ──
const PartnerJuridique = () => (
  <ServiceShell
    eyebrow="Service · Juridique"
    title="Assistance juridique"
    sub="Contrats, contentieux, conformité OHADA"
    stats={[
      { label: 'Affaires actives', value: '14' },
      { label: 'Contrats à rédiger', value: '6' },
      { label: 'Contentieux', value: '2' },
      { label: 'Délai moyen', value: '5,2', suffix: ' j' },
    ]}
    tableTitle="Affaires juridiques"
    tableCols={[
      { l: 'Réf.', w: '1fr' },
      { l: 'Client', w: '1.4fr' },
      { l: 'Type', w: '1fr' },
      { l: 'Urgence', w: '0.7fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      ['JUR-2026-0142', <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">EH</div><div style={{ fontWeight: 500 }}>E.H.M Group</div></div>, 'Contrat commercial', <span className="chip chip-rose">Haute</span>, <span className="chip chip-amber"><span className="chip-dot"></span> En cours</span>],
      ['JUR-2026-0138', <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BL</div><div style={{ fontWeight: 500 }}>Bamba Logistique</div></div>, 'Pacte associés',     <span className="chip chip-amber">Moyenne</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Validé</span>],
      ['JUR-2026-0132', <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">DC</div><div style={{ fontWeight: 500 }}>Diop Conseil</div></div>, 'Contentieux fiscal',  <span className="chip chip-rose">Haute</span>, <span className="chip chip-blue"><span className="chip-dot"></span> Audience prévue</span>],
      ['JUR-2026-0128', <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">TB</div><div style={{ fontWeight: 500 }}>Touré BTP</div></div>, 'Mise en conformité', <span className="chip">Basse</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Livré</span>],
      ['JUR-2026-0124', <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BK</div><div style={{ fontWeight: 500 }}>Expert Bio SARL</div></div>, 'Marque (OAPI)',      <span className="chip chip-amber">Moyenne</span>, <span className="chip chip-amber"><span className="chip-dot"></span> En cours</span>],
    ]}
    ctaLabel="Nouvelle affaire"
    sidePanel={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20, background: 'white' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Modèles de contrats</div>
          {['Pacte d\'associés', 'Bail commercial', 'CDD / CDI', 'Prestation de service', 'NDA bilingue', 'Cession de parts'].map((c) => (
            <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--ink-100)', fontSize: 13 }}>
              <span>{c}</span>
              <Icon name="download" size={13} color="var(--ink-400)" />
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
          <Icon name="shield" size={18} color="var(--blue-700)" />
          <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: 'var(--blue-900)' }}>Audience à venir</div>
          <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4, opacity: .85, lineHeight: 1.5 }}>
            Diop Conseil · Tribunal de commerce d'Abidjan · 28 avril 2026 à 9h30
          </div>
        </div>
      </div>
    }
  />
);

// ── PartnerFinancement ──
const PartnerFinancement = () => (
  <ServiceShell
    eyebrow="Service · Financement"
    title="Intermédiation financière"
    sub="Crédit bancaire, microfinance, garanties"
    stats={[
      { label: 'Dossiers actifs', value: '9' },
      { label: 'Volume en traitement', value: '128', suffix: ' M FCFA' },
      { label: 'Taux d\'acceptation', value: '74', suffix: '%' },
      { label: 'Délai moyen', value: '18', suffix: ' j' },
    ]}
    tableTitle="Dossiers de financement"
    tableCols={[
      { l: 'Client', w: '1.5fr' },
      { l: 'Type', w: '1fr' },
      { l: 'Montant (M FCFA)', w: '1.1fr' },
      { l: 'Banque', w: '1fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">EH</div><div style={{ fontWeight: 500 }}>E.H.M Group</div></div>,
        'Crédit d\'investissement',
        <span className="num">42</span>, 'BICICI',
        <span className="chip chip-amber"><span className="chip-dot"></span> En analyse</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BK</div><div style={{ fontWeight: 500 }}>Expert Bio SARL</div></div>,
        'Microfinance · équipement',
        <span className="num">8</span>, 'COFINA',
        <span className="chip chip-mint"><span className="chip-dot"></span> Accordé</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">TB</div><div style={{ fontWeight: 500 }}>Touré BTP</div></div>,
        'Caution bancaire',
        <span className="num">15</span>, 'SGBCI',
        <span className="chip chip-mint"><span className="chip-dot"></span> Accordé</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">AD</div><div style={{ fontWeight: 500 }}>Mali Cosmétiques</div></div>,
        'Crédit BFR',
        <span className="num">6</span>, 'NSIA Banque',
        <span className="chip chip-rose"><span className="chip-dot"></span> Refusé</span>,
      ],
      [
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">KM</div><div style={{ fontWeight: 500 }}>Kojo Tech</div></div>,
        'Levée de fonds',
        <span className="num">57</span>, 'Investisseurs',
        <span className="chip chip-blue"><span className="chip-dot"></span> En présentation</span>,
      ],
    ]}
    ctaLabel="Nouveau dossier"
    sidePanel={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20, background: 'white' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Partenaires financiers</div>
          {[
            { n: 'BICICI', t: 'Banque' },
            { n: 'SGBCI', t: 'Banque' },
            { n: 'NSIA Banque', t: 'Banque' },
            { n: 'COFINA', t: 'Microfinance' },
            { n: 'Advans CI', t: 'Microfinance' },
            { n: 'Comoé Capital', t: 'Fonds d\'investissement' },
          ].map((p, i) => (
            <div key={p.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 5 ? '1px solid var(--ink-100)' : 'none', fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{p.n}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>{p.t}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue-700)', marginBottom: 10 }}>Volume traité 2026</div>
          <div className="display-num" style={{ fontSize: 28, color: 'var(--blue-900)' }}>318 <span style={{ fontSize: 13 }}>M FCFA</span></div>
          <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4 }}>↑ +42% vs 2025</div>
        </div>
      </div>
    }
  />
);

// ── PartnerRepresentation ──
const PartnerRepresentation = () => (
  <ServiceShell
    eyebrow="Service · Représentation"
    title="Représentation commerciale"
    sub="Prospection, négociation, développement réseau"
    stats={[
      { label: 'Mandats actifs', value: '7' },
      { label: 'Leads qualifiés', value: '42' },
      { label: 'Taux de signature', value: '38', suffix: '%' },
      { label: 'CA généré', value: '186', suffix: ' M FCFA' },
    ]}
    tableTitle="Mandats de représentation"
    tableCols={[
      { l: 'Client donneur', w: '1.4fr' },
      { l: 'Cible', w: '1fr' },
      { l: 'Marché', w: '1fr' },
      { l: 'Leads', w: '0.6fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">EH</div><div style={{ fontWeight: 500 }}>E.H.M Group</div></div>, 'Importateurs', 'Côte d\'Ivoire', <span className="num">18</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Actif</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BK</div><div style={{ fontWeight: 500 }}>Expert Bio SARL</div></div>, 'Distributeurs', 'UEMOA', <span className="num">9</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Actif</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">AD</div><div style={{ fontWeight: 500 }}>Mali Cosmétiques</div></div>, 'Pharmacies', 'Sénégal', <span className="num">7</span>, <span className="chip chip-blue"><span className="chip-dot"></span> Démarrage</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">KM</div><div style={{ fontWeight: 500 }}>Kojo Tech</div></div>, 'Grands comptes', 'Ghana', <span className="num">5</span>, <span className="chip chip-amber"><span className="chip-dot"></span> Négociation</span>],
    ]}
    ctaLabel="Nouveau mandat"
    sidePanel={
      <div className="card" style={{ padding: 20, background: 'white' }}>
        <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Pipeline ce mois</div>
        {[
          { l: 'Premier contact', v: 42, p: 100 },
          { l: 'Démo / RDV', v: 24, p: 57 },
          { l: 'Proposition envoyée', v: 14, p: 33 },
          { l: 'Négociation', v: 8, p: 19 },
          { l: 'Signature', v: 3, p: 7 },
        ].map((f) => (
          <div key={f.l} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{f.l}</span>
              <span className="num" style={{ color: 'var(--ink-500)' }}>{f.v}</span>
            </div>
            <div style={{ height: 5, background: 'var(--ink-100)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${f.p}%`, height: '100%', background: 'var(--blue-600)' }} />
            </div>
          </div>
        ))}
      </div>
    }
  />
);

// ── PartnerFormation ──
const PartnerFormation = () => (
  <ServiceShell
    eyebrow="Service · Formation"
    title="Formation professionnelle"
    sub="Gestion, comptabilité, fiscalité, management"
    stats={[
      { label: 'Sessions ce mois', value: '8' },
      { label: 'Stagiaires', value: '124' },
      { label: 'Note moyenne', value: '4,8', suffix: '/5' },
      { label: 'CA formations', value: '4,2', suffix: ' M FCFA' },
    ]}
    tableTitle="Sessions à venir"
    tableCols={[
      { l: 'Thème', w: '1.8fr' },
      { l: 'Formateur', w: '1fr' },
      { l: 'Date', w: '0.9fr' },
      { l: 'Inscrits', w: '0.7fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      ['Comptabilité OHADA — fondamentaux', 'Aboubacar N\'Dri',  '22 avril · 9h-17h', <span className="num">12/15</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Confirmée</span>],
      ['TVA & déclarations fiscales',         'Théophile Anebo',     '25 avril · 9h-13h', <span className="num">18/20</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Confirmée</span>],
      ['Management & leadership',              'Consultant externe', '2-3 mai · 2 jours',   <span className="num">8/15</span>,  <span className="chip chip-amber"><span className="chip-dot"></span> Min. à atteindre</span>],
      ['Comptabilité informatisée Sage',       'Konan Sylvestre',    '7 mai · 9h-17h',     <span className="num">14/15</span>, <span className="chip chip-mint"><span className="chip-dot"></span> Confirmée</span>],
      ['Droit du travail ivoirien',            'Mariam Bamba',       '14 mai · 9h-17h',    <span className="num">6/12</span>,  <span className="chip"><span className="chip-dot"></span> Ouverte</span>],
    ]}
    ctaLabel="Nouvelle session"
    sidePanel={
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20, background: 'white' }}>
          <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Catalogue</div>
          {[
            { c: 'Comptabilité', n: 8 },
            { c: 'Fiscalité', n: 5 },
            { c: 'Juridique', n: 4 },
            { c: 'Management', n: 6 },
            { c: 'Outils numériques', n: 3 },
          ].map((c, i) => (
            <div key={c.c} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--ink-100)' : 'none', fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{c.c}</span>
              <span className="num" style={{ color: 'var(--ink-500)' }}>{c.n} formations</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 20, background: 'var(--blue-50)', border: '1px solid var(--blue-100)' }}>
          <Icon name="bolt" size={18} color="var(--blue-700)" />
          <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8, color: 'var(--blue-900)' }}>Certification FDFP</div>
          <div style={{ fontSize: 12, color: 'var(--blue-700)', marginTop: 4, opacity: .85, lineHeight: 1.5 }}>
            Cabinet agréé pour le remboursement de la taxe d'apprentissage.
          </div>
        </div>
      </div>
    }
  />
);

// ── PartnerAgrements ──
const PartnerAgrements = () => (
  <ServiceShell
    eyebrow="Service · Agréments"
    title="Assistance à l'agrément"
    sub="Préparation des dossiers techniques et suivi administratif"
    stats={[
      { label: 'Dossiers en cours', value: '11' },
      { label: 'Obtenus 2026', value: '7' },
      { label: 'Taux de succès', value: '92', suffix: '%' },
      { label: 'Délai moyen', value: '62', suffix: ' j' },
    ]}
    tableTitle="Demandes d'agrément"
    tableCols={[
      { l: 'Client', w: '1.5fr' },
      { l: 'Type d\'agrément', w: '1.6fr' },
      { l: 'Autorité', w: '1fr' },
      { l: 'Dépôt', w: '0.8fr' },
      { l: 'Statut', w: '0.9fr' },
    ]}
    tableRows={[
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">BK</div><div style={{ fontWeight: 500 }}>Expert Bio SARL</div></div>, 'Producteur bio (label CI)',     'Min. Agriculture', '12 fév.', <span className="chip chip-mint"><span className="chip-dot"></span> Obtenu</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">EH</div><div style={{ fontWeight: 500 }}>E.H.M Group</div></div>, 'Transitaire agréé',              'Douanes CI',        '24 fév.', <span className="chip chip-amber"><span className="chip-dot"></span> Instruction</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">AD</div><div style={{ fontWeight: 500 }}>Mali Cosmétiques</div></div>, 'AMM cosmétique',                 'ANRMP',             '3 mars',  <span className="chip chip-amber"><span className="chip-dot"></span> Instruction</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">TB</div><div style={{ fontWeight: 500 }}>Touré BTP</div></div>, 'BTP catégorie B',               'Min. Construction', '18 mars', <span className="chip chip-blue"><span className="chip-dot"></span> Pré-dépôt</span>],
      [<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><div className="ava">KM</div><div style={{ fontWeight: 500 }}>Kojo Tech</div></div>, 'Opérateur télécom (ARTCI)',     'ARTCI',             '2 avril', <span className="chip"><span className="chip-dot"></span> Préparation</span>],
    ]}
    ctaLabel="Nouvelle demande"
    sidePanel={
      <div className="card" style={{ padding: 20, background: 'white' }}>
        <div style={{ font: '500 11px/1 var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-400)', marginBottom: 14 }}>Autorités traitées</div>
        {[
          'Min. de l\'Agriculture',
          'Min. de la Construction',
          'Min. de la Santé',
          'Douanes de Côte d\'Ivoire',
          'ARTCI · Télécoms',
          'ANRMP · Pharmacie',
          'BCEAO · Microfinance',
          'CEPICI · Investissement',
        ].map((a) => (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13 }}>
            <Icon name="check" size={12} color="var(--accent-mint)" stroke={2.5} />
            <span>{a}</span>
          </div>
        ))}
      </div>
    }
  />
);

Object.assign(window, {
  PartnerDashboard, PartnerDossier, PartnerClients, PartnerClientDetail,
  PartnerDocuments, PartnerPaiements, PartnerStatistiques, PartnerParametres,
  PartnerNewDossier,
  PartnerComptabilite, PartnerJuridique, PartnerFinancement,
  PartnerRepresentation, PartnerFormation, PartnerAgrements,
  AdminDashboard, AdminPartenaires, AdminPartnerDetail, AdminClients,
  AdminPaiements, AdminCommissions, AdminStats, AdminConfig,
  NotificationDropdown, ServiceShell,
  BackofficeLayout, PARTNER_NAV, ADMIN_NAV, PARTNER_GROUPS, ADMIN_GROUPS,
});
