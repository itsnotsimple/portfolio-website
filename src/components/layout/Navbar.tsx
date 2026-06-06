import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from '../ui/LanguageToggle';
import styles from './Navbar.module.css';

const NAV_LINKS_TEMPLATES = [
  {
    key: 'work',
    href: '#work',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
  },
  {
    key: 'about',
    href: '#about',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    key: 'reviews',
    href: '#reviews',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
      </svg>
    ),
  },
  {
    key: 'faq',
    href: '#faq',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/>
      </svg>
    ),
  },
] as const;


export default function Navbar() {
  const { content } = useLanguage();
  const { SITE_CONFIG } = content;

  const navLinks = NAV_LINKS_TEMPLATES.map(link => ({
    ...link,
    label: content.NAV_LINKS[link.key],
  }));

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) {
      const onScroll = () => setScrolled(window.scrollY > 60);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    const observer = new IntersectionObserver(
      ([entry]) => { setScrolled(!entry.isIntersecting); },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ['hero', 'work', 'about', 'reviews', 'faq', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero') {
            setActiveLink('');
          } else {
            setActiveLink(`#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      // Preserve scroll position before position:fixed scroll lock (iOS Safari)
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add('menu-open');
    }
    
    return () => {
      // If scroll-locked, unlock and restore the saved scroll position
      const hasMenuOpen = document.body.classList.contains('menu-open');
      if (hasMenuOpen) {
        const top = parseFloat(document.body.style.top || '0') * -1;
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        if (!isNaN(top)) {
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
    };
  }, [menuOpen]);



  const closeMenu = () => setMenuOpen(false);
  const handleNavClick = (e: any, href: string) => {
    if (e && e.preventDefault) e.preventDefault();
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    isClickScrolling.current = true;
    setActiveLink(href);
    closeMenu();

    setTimeout(() => {
      if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = href.replace('#', '');
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      window.history.pushState(null, '', href);
    }, 150);

    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <a href="#hero" className={styles.logo} id="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className={styles.logoHex} aria-hidden="true">⬡</span>
            <span className={styles.logoText}>
              ALEX<span className={styles.logoAmp}>&</span>FLOW
            </span>
          </a>

          {/* Desktop links */}
          <ul 
            className={styles.desktopLinks} 
            role="list"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              const isHovered = hoveredLink === link.href;
              return (
                <li 
                  key={link.href} 
                  className={styles.desktopLinkItem}
                  onMouseEnter={() => setHoveredLink(link.href)}
                >
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        className={styles.hoverPill}
                        layoutId="nav-hover-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>

                  {isActive && (
                    <motion.div
                      className={styles.activePill}
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <motion.a
                    href={link.href}
                    className={`${styles.desktopLink} ${isActive ? styles.active : ''}`}
                    id={`nav-${link.key}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Language Toggle switcher */}
          <div className={styles.langToggleWrapper}>
            <LanguageToggle />
          </div>

          {/* Desktop CTA */}
          <motion.a
            href="#contact"
            className={styles.desktopCta}
            id="nav-contact-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {content.NAV_LINKS.cta}
          </motion.a>


          {/* Hamburger — perfectly square 44×44 container */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            id="nav-burger"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>

      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.drawer}
            initial={{ rotateY: 55, transformPerspective: 1200, x: '40%', opacity: 0, originX: 1 }}
            animate={{ rotateY: 0, transformPerspective: 1200, x: 0, opacity: 1 }}
            exit={{ rotateY: 55, transformPerspective: 1200, x: '40%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 1 }}
            style={{ 
              transformStyle: 'preserve-3d',
              pointerEvents: isAnimating ? 'none' : 'auto'
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Drawer header */}
            <div className={styles.drawerHeader}>
              <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, '#hero')}>
                <span className={styles.logoHex} aria-hidden="true">⬡</span>
                <span className={styles.logoText}>
                  ALEX<span className={styles.logoAmp}>&</span>FLOW
                </span>
              </a>
              <button
                className={styles.closeBtn}
                onClick={closeMenu}
                aria-label="Close navigation menu"
                id="nav-close-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6"  y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation">
              <ul className={styles.drawerLinks} role="list">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 35, rotateY: 25, transformPerspective: 1000, originX: 1 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      type: 'spring',
                      stiffness: 160,
                      damping: 18
                    }}
                  >
                    <a
                      href={link.href}
                      className={`${styles.drawerLink} ${activeLink === link.href ? styles.drawerLinkActive : ''}`}
                      id={`nav-mobile-${link.key}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      <span className={styles.drawerIcon}>{link.icon}</span>
                      <span className={styles.drawerLinkLabel}>{link.label}</span>
                      <svg className={styles.drawerArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16" aria-hidden="true">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTA */}
            <motion.div
              className={styles.drawerCta}
              initial={{ opacity: 0, y: 20, rotateX: 15, transformPerspective: 1000 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.3,
                type: 'spring',
                stiffness: 160,
                damping: 18
              }}
            >
              <a
                href="#contact"
                className={styles.drawerCtaBtn}
                id="nav-mobile-cta"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,12 2,6"/>
                </svg>
                <span>{content.NAV_LINKS.cta}</span>
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.drawerInsta}
                id="nav-mobile-insta"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
