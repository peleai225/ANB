/* global React */
// Primitives — icônes minimales, badges, micro-composants

// Navigation context — used by Live site (real navigation), falls back to
// a console log in canvas mode (no provider).
const NavCtx = React.createContext((path) => { console.log('[canvas mode] nav:', path); });
const useNav = () => React.useContext(NavCtx);

const Icon = ({ name, size = 16, stroke = 1.6, color = "currentColor" }) => {
  const p = (d) => <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />;
  const c = (cx, cy, r) => <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={stroke} />;
  const paths = {
    arrow: p("M5 12h14M13 6l6 6-6 6"),
    arrowL: p("M19 12H5M11 6l-6 6 6 6"),
    check: p("M5 12l4 4 10-10"),
    plus: p("M12 5v14M5 12h14"),
    close: p("M6 6l12 12M18 6L6 18"),
    chev: p("M9 6l6 6-6 6"),
    chevd: p("M6 9l6 6 6-6"),
    search: <>{c(11, 11, 7)}{p("M20 20l-4-4")}</>,
    bell: p("M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 004 0"),
    user: <>{c(12, 8, 4)}{p("M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8")}</>,
    home: p("M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2v-9z"),
    doc: p("M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zM14 3v5h5"),
    upload: p("M12 16V4M7 9l5-5 5 5M4 20h16"),
    download: p("M12 4v12M7 11l5 5 5-5M4 20h16"),
    shield: p("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"),
    bolt: p("M13 3L4 14h7l-1 7 9-11h-7l1-7z"),
    chart: p("M4 20V10M10 20V4M16 20v-7M22 20H2"),
    layers: p("M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5"),
    settings: <>{c(12, 12, 3)}{p("M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1")}</>,
    users: <>{c(9, 8, 4)}{p("M1 21c0-4.4 3.6-8 8-8s8 3.6 8 8")}{c(17, 6, 3)}{p("M23 18c0-2.5-1.7-4.5-4-5")}</>,
    wallet: p("M3 7h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7zM3 7V5a2 2 0 012-2h11l3 4M16 14h2"),
    zap: p("M13 2L3 14h7l-1 8 11-13h-7l0-7z"),
    sparkle: p("M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7L19 16z"),
    clock: <>{c(12, 12, 9)}{p("M12 7v5l3 2")}</>,
    flag: p("M5 21V4M5 4h12l-2 4 2 4H5"),
    star: p("M12 3l2.7 6 6.3.5-4.8 4.2 1.5 6.3L12 16.7l-5.7 3.3 1.5-6.3L3 9.5 9.3 9 12 3z"),
    folder: p("M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"),
    pin: <>{p("M12 21v-7")}{c(12, 9, 5)}</>,
    phone: p("M22 16.9V20a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3.1a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"),
    mail: <>{p("M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2")}</>,
    whatsapp: p("M3 21l1.6-5A8 8 0 1112 20a8 8 0 01-4.2-1.2L3 21zM8 9.5c0 4 3.5 7.5 7.5 7.5l1.5-2-2-1-1 1c-1.5 0-3.5-2-3.5-3.5l1-1-1-2-2 1z"),
    eye: <>{p("M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z")}{c(12, 12, 3)}</>,
    filter: p("M3 5h18l-7 9v6l-4-2v-4L3 5z"),
    grid: p("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
    pkg: p("M21 8L12 3 3 8v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8"),
    refresh: p("M3 12a9 9 0 0115-6.7L21 8M21 3v5h-5M21 12a9 9 0 01-15 6.7L3 16M3 21v-5h5"),
    money: <>{c(12, 12, 9)}{p("M9 9c0-1 1-2 3-2s3 1 3 2-1 1.5-3 2-3 1-3 2 1 2 3 2 3-1 3-2M12 5v2M12 17v2")}</>,
    lock: <>{p("M5 11h14v10H5zM8 11V8a4 4 0 018 0v3")}</>,
    moon: p("M21 13A9 9 0 1111 3a7 7 0 0010 10z"),
    play: p("M6 4l14 8-14 8V4z"),
    target: <>{c(12, 12, 9)}{c(12, 12, 5)}{c(12, 12, 1.5)}</>,
    sliders: p("M4 6h12M20 6h0M4 12h4M12 12h8M4 18h12M20 18h0"),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0, display: 'block' }}>
      {paths[name] || paths.arrow}
    </svg>
  );
};

// Logo
const Logo = ({ size = 28, color = "var(--blue-600)", text = true, light = false }) => {
  const [brand, setBrand] = React.useState((window.__pas_copy && window.__pas_copy.brandName) || 'PeleAI Speed');
  React.useEffect(() => {
    const h = () => setBrand((window.__pas_copy && window.__pas_copy.brandName) || 'PeleAI Speed');
    window.addEventListener('pas-copy-update', h);
    return () => window.removeEventListener('pas-copy-update', h);
  }, []);
  const parts = brand.split(' ');
  const head = parts[0];
  const tail = parts.slice(1).join(' ');
  return (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id={`lg-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8" fill={`url(#lg-${size})`} />
      <path d="M10 22V10h6a4 4 0 010 8h-3M16 18l5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
    {text && (
      <span style={{ font: '600 16px/1 var(--font-display)', letterSpacing: '-0.02em', color: light ? 'white' : 'var(--ink-900)' }}>
        {head}{tail && <span style={{ color: light ? 'rgba(255,255,255,.6)' : 'var(--ink-500)', fontWeight: 400 }}> {tail}</span>}
      </span>
    )}
  </div>
  );
};

// Stat pill — gros chiffres
const Stat = ({ value, label, suffix, accent = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div className="display-num" style={{ fontSize: 56, color: accent ? 'var(--blue-600)' : 'var(--ink-900)' }}>
      {value}<span style={{ fontSize: 28, color: 'var(--ink-400)', marginLeft: 2 }}>{suffix}</span>
    </div>
    <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{label}</div>
  </div>
);

// Step dot
const StepDot = ({ n, active, done }) => (
  <div style={{
    width: 28, height: 28, borderRadius: '50%',
    background: done ? 'var(--blue-600)' : active ? 'var(--blue-100)' : 'white',
    border: done ? 'none' : `1.5px solid ${active ? 'var(--blue-600)' : 'var(--ink-200)'}`,
    color: done ? 'white' : active ? 'var(--blue-700)' : 'var(--ink-400)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    font: '600 12px/1 var(--font-body)',
    flexShrink: 0,
  }}>
    {done ? <Icon name="check" size={14} stroke={2.5} /> : n}
  </div>
);

// Browser chrome (lite)
const BrowserChrome = ({ url, children, height }) => (
  <div style={{ height, background: 'var(--ink-100)', display: 'flex', flexDirection: 'column' }}>
    <div style={{ height: 36, background: 'white', borderBottom: '1px solid var(--ink-200)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, flexShrink: 0 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
      </div>
      <div style={{ flex: 1, height: 22, background: 'var(--ink-100)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '11px var(--font-mono)', color: 'var(--ink-500)', maxWidth: 420, margin: '0 auto' }}>
        <Icon name="lock" size={10} /> <span style={{ marginLeft: 6 }}>{url}</span>
      </div>
      <div style={{ width: 60 }} />
    </div>
    <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
  </div>
);

Object.assign(window, { Icon, Logo, Stat, StepDot, BrowserChrome, NavCtx, useNav });
