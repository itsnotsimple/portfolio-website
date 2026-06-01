import './styles/globals.css';
import './styles/animations.css';

// ── Defer React Bootstrapping ───────────────────────────────────────────
// In Safari on mobile, executing React + Framer Motion mounting on the very
// first frame causes rendering pipeline lockups. By delaying the dynamic
// import of the bootstrap code by 250ms, we let the browser completely
// finish parsing CSS, applying fonts, and painting the initial CSS preloader.
//
// In debug mode (?debug=1), we skip the timeout since Eruda's synchronous loading
// already introduces the natural network delay needed for a warm paint.
const delay = typeof window !== 'undefined' && window.location.search.includes('debug=1') ? 0 : 250;

setTimeout(() => {
  import('./bootstrap').catch((err) => {
    console.error('Failed to load application bootstrap:', err);
  });
}, delay);
