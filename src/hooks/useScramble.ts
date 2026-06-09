import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!';

export function useScramble(text: string) {
  const [displayed, setDisplayed] = useState(text);
  const prevLenRef = useRef(text.length);

  useEffect(() => {
    const prev = prevLenRef.current;
    prevLenRef.current = text.length;

    if (text.length <= prev) {
      setDisplayed(text);
      return;
    }

    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame >= 5) {
        setDisplayed(text);
        clearInterval(id);
        return;
      }
      const settled = text.slice(0, prev);
      const scrambling = text.slice(prev).replace(/[^ ]/g, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      );
      setDisplayed(settled + scrambling);
    }, 16);

    return () => clearInterval(id);
  }, [text]);

  return displayed;
}
