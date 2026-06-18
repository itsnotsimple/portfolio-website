import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import MainApp from './MainApp';
import Preloader from './components/ui/primitives/Preloader';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isLayoutFinished, setIsLayoutFinished] = useState(false);
  const [isPlasmaReady, setIsPlasmaReady] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);

  useEffect(() => {
    // 3s max — slow network shouldn't trap users behind the preloader forever
    const fallback = setTimeout(() => setIsFontsReady(true), 3000);
    document.fonts.ready.then(() => {
      clearTimeout(fallback);
      setIsFontsReady(true);
    });
    return () => clearTimeout(fallback);
  }, []);

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

  const isAppFullyCooked = isLayoutFinished && isPlasmaReady && isFontsReady;

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MainApp
          onLayoutFinished={() => setIsLayoutFinished(true)}
          onPlasmaReady={() => setIsPlasmaReady(true)}
          isReady={isAppFullyCooked}
        />
        <Preloader ready={isAppFullyCooked} />
      </LanguageProvider>
    </MotionConfig>
  );
}
