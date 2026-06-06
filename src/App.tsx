import { useState } from 'react';
import MainApp from './MainApp';
import Preloader from './components/ui/Preloader';
import { LanguageProvider } from './context/LanguageContext';

/**
 * Root shell with True Background Rendering Gating.
 * Both MainApp and Preloader render from frame 0.
 * Preloader sits on top and only fades out when MainApp triggers onLayoutFinished.
 */
export default function App() {
  const [isLayoutFinished, setIsLayoutFinished] = useState(false);
  const [isPlasmaReady, setIsPlasmaReady] = useState(false);

  const isAppFullyCooked = isLayoutFinished && isPlasmaReady;

  return (
    <LanguageProvider>
      <MainApp
        onLayoutFinished={() => setIsLayoutFinished(true)}
        onPlasmaReady={() => setIsPlasmaReady(true)}
      />
      <Preloader ready={isAppFullyCooked} />
    </LanguageProvider>
  );
}
