import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import MainApp from './MainApp';
import { LanguageProvider } from './context/LanguageContext';
import { isMobileDevice } from './lib/device';

export default function App() {
  const [isLayoutFinished, setIsLayoutFinished] = useState(false);
  const [isPlasmaReady, setIsPlasmaReady] = useState(false);

  // On mobile, bypass WebGL ready check to exit the preloader instantly once layout mounts
  const isMobile = isMobileDevice(768);
  const isAppFullyCooked = isLayoutFinished && (isPlasmaReady || isMobile);

  // Manage static preloader exit directly in App.tsx to avoid component mount overhead
  useEffect(() => {
    if (isAppFullyCooked) {
      const staticOverlay = document.getElementById('preloader-static');
      if (staticOverlay) {
        staticOverlay.classList.add('exit');
        const timer = setTimeout(() => {
          staticOverlay.remove();
        }, 200); // matches the 0.2s fade-out transition
        return () => clearTimeout(timer);
      }
    }
  }, [isAppFullyCooked]);

  // Global anti-download and inspect blockers
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Cmd+S or Ctrl+S (Save Page)
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
      }
      // Prevent Inspector shortcuts: F12, Cmd+Opt+I (Mac), Ctrl+Shift+I (Windows), Cmd+Shift+C
      if (
        e.key === 'F12' ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
        ((e.metaKey || e.ctrlKey) && e.altKey && (e.key === 'i' || e.key === 'I')) ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'j' || e.key === 'J')) ||
        ((e.metaKey || e.ctrlKey) && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, { capture: true });
    window.addEventListener('dragstart', handleDragStart, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      window.removeEventListener('dragstart', handleDragStart, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MainApp
          onLayoutFinished={() => setIsLayoutFinished(true)}
          onPlasmaReady={() => setIsPlasmaReady(true)}
          isReady={isAppFullyCooked}
        />
      </LanguageProvider>
    </MotionConfig>
  );
}
