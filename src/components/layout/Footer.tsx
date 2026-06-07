import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const NAV_LINKS_TEMPLATES = [
  { href: '#work',     key: 'work' },
  { href: '#about',    key: 'about' },
  { href: '#reviews',  key: 'reviews' },
  { href: '#faq',      key: 'faq' },
  { href: '#contact',  key: 'contact' },
] as const;


const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,12 2,6"/>
  </svg>
);

export default function Footer() {
  const { content } = useLanguage();
  const { SITE_CONFIG } = content;

  const navLinks = NAV_LINKS_TEMPLATES.map(l => ({
    ...l,
    label: content.NAV_LINKS[l.key],
  }));

  return (
    <footer
      role="contentinfo"
      style={{
        padding: '2.5rem 0 1.75rem',
        background: 'rgba(4,8,12,0.93)',
        backdropFilter: 'blur(14px)',
        textAlign: 'center',
        position: 'relative',
        overflowX: 'clip',
      }}
    >
      {/* Top gradient border — stronger */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(37,150,190,0.5) 30%, rgba(13,211,240,0.6) 55%, rgba(37,150,190,0.3) 80%, transparent 100%)',
        }}
      />

      {/* Depth grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(37,150,190,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,150,190,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 30%, transparent 80%)',
        }}
      />

      {/* Ambient glow behind brand */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '0%', left: '50%',
          transform: 'translate(-50%, -30%)',
          width: '400px', height: '200px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,150,190,0.07) 0%, transparent 70%)',
          filter: 'blur(30px)', pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Brand */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
          <motion.div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'var(--font-display)', fontSize: '1.15rem',
              fontWeight: 400, letterSpacing: '0.07em', position: 'relative', zIndex: 1,
            }}
          >
            {/* Hex icon */}
            <motion.span
              aria-hidden="true"
              style={{ color: 'var(--primary)', fontSize: '0.95rem', filter: 'drop-shadow(0 0 6px var(--primary-glow))' }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >⬡</motion.span>
            <span style={{
              background: 'linear-gradient(135deg, #f0f6fb 20%, #3ab8e2 60%, #0dd3f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ALEX
              <span style={{ WebkitTextFillColor: 'var(--primary)', color: 'var(--primary)', margin: '0 1px' }}>&</span>
              FLOW
            </span>
          </motion.div>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Footer navigation"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: 0, marginBottom: '1.1rem',
          }}
        >
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: 'var(--text-faint)', padding: '0.22rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--primary-light)';
                (e.currentTarget as HTMLElement).style.background = 'var(--primary-subtle)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-faint)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.1rem' }}>
          <motion.a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)',
            }}
            whileHover={{
              color: '#e1306c',
              borderColor: 'rgba(188,42,141,0.55)',
              background: 'rgba(188,42,141,0.10)',
              boxShadow: '0 0 16px rgba(188,42,141,0.25)',
              y: -2,
            }}
            transition={{ duration: 0.22 }}
          >
            <InstagramIcon />
          </motion.a>

          <motion.a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label="Email"
            style={{
              width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-muted)',
            }}
            whileHover={{
              color: 'var(--primary-light)',
              borderColor: 'rgba(37,150,190,0.55)',
              background: 'rgba(37,150,190,0.10)',
              boxShadow: '0 0 16px rgba(37,150,190,0.22)',
              y: -2,
            }}
            transition={{ duration: 0.22 }}
          >
            <EmailIcon />
          </motion.a>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            height: '1px', margin: '0 auto 1rem',
            maxWidth: '320px',
            background: 'linear-gradient(90deg, transparent, rgba(37,150,190,0.22), transparent)',
          }}
        />

        {/* Copyright */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-faint)', letterSpacing: '0.03em' }}>
          © {new Date().getFullYear()} Alex & Flow · {SITE_CONFIG.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
