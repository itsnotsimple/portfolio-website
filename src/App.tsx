import { useState, useCallback } from 'react';
import Preloader from './components/ui/Preloader';
import MainApp   from './MainApp';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <MainApp isLoaded={loaded} />
      {!loaded && <Preloader onDone={handleDone} />}
    </>
  );
}
