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

  const isAppFullyCooked = isLayoutFinished && isPlasmaReady && isFontsReady;

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <MainApp
          onLayoutFinished={() => setIsLayoutFinished(true)}
          onPlasmaReady={() => setIsPlasmaReady(true)}
        />
        <Preloader ready={isAppFullyCooked} />
      </LanguageProvider>
    </MotionConfig>
  );
}
