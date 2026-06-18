import './styles/globals.css';
import './styles/animations.css';
import { bootstrap } from './bootstrap';

// ── Defer React Bootstrapping ───────────────────────────────────────────
// In Safari on mobile, executing React + Framer Motion mounting on the very
// first frame causes rendering pipeline lockups. By delaying the execution
// of the bootstrap code by 250ms, we let the browser completely
// finish parsing CSS, applying fonts, and painting the initial CSS preloader.
//
// In debug mode (?debug=1), we skip the timeout since Eruda's synchronous loading
// already introduces the natural network delay needed for a warm paint.
try {
  bootstrap();
} catch (err) {
  console.error('Failed to run application bootstrap:', err);
}
