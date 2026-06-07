import { useState, useEffect } from 'react';

/**
 * Classic typewriter: types letter-by-letter, pauses, deletes, types next word.
 * Returns the current display text + whether cursor should be in "waiting" blink state.
 */
export function useTypewriter(
  words: readonly string[],
  active = true,
  typingSpeed = 82,
  deletingSpeed = 38,
  pauseMs = 2200,
) {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [phase, setPhase]       = useState<'typing' | 'waiting' | 'deleting'>('typing');

  useEffect(() => {
    if (!active) return;
    const word = words[wordIdx];

    if (phase === 'typing') {
      if (display.length < word.length) {
        const t = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          typingSpeed,
        );
        return () => clearTimeout(t);
      }
      // Finished typing → pause
      const t = setTimeout(() => setPhase('waiting'), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === 'waiting') {
      const t = setTimeout(() => setPhase('deleting'), 80);
      return () => clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (display.length > 0) {
        const t = setTimeout(
          () => setDisplay(d => d.slice(0, -1)),
          deletingSpeed,
        );
        return () => clearTimeout(t);
      }
      // Finished deleting → next word
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWordIdx(i => (i + 1) % words.length);
      setPhase('typing');
    }
  }, [display, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs, active]);

  return { text: display, isWaiting: phase === 'waiting' };
}
