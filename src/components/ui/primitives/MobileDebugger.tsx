import { useState, useEffect, useRef, useCallback } from 'react';

const LABELS = ['Badge', 'Heading', 'Subtitle', 'CTA', 'Stats', 'Scroll↓'];

interface ItemState {
  opacity: string;
  animPlayState: string;
  animDelay: string;
  animStartFired: boolean;
  animEndFired: boolean;
  inDom: boolean;
  hasSize: boolean;
  clipper: string; // first ancestor with overflow:hidden/clip
}

const empty = (): ItemState => ({
  opacity: '?', animPlayState: '?', animDelay: '?',
  animStartFired: false, animEndFired: false,
  inDom: false, hasSize: false, clipper: '?',
});

/** Walk up the DOM and return first ancestor with overflow hidden/clip/scroll */
function findClipper(el: Element): string {
  let cur = el.parentElement;
  while (cur && cur !== document.body.parentElement) {
    const cs = window.getComputedStyle(cur);
    const ov = cs.overflow + '|' + cs.overflowX + '|' + cs.overflowY;
    if (/hidden|clip|scroll|auto/.test(ov)) {
      const tag = cur.tagName.toLowerCase();
      const cls = Array.from(cur.classList).join('.');
      const id = cur.id ? `#${cur.id}` : '';
      return `${tag}${id}${cls ? '.' + cls.slice(0, 30) : ''} [${ov}]`;
    }
    cur = cur.parentElement;
  }
  return 'none';
}

export default function MobileDebugger() {
  const [visible, setVisible] = useState(true);
  const [items, setItems] = useState<ItemState[]>(LABELS.map(empty));
  const [logs, setLogs] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  // eslint-disable-next-line react-hooks/purity
  const startRef = useRef(performance.now());
  const cleanupRef = useRef<(() => void)[]>([]);
  const animStartedRef = useRef<boolean[]>(new Array(6).fill(false));
  const animEndedRef = useRef<boolean[]>(new Array(6).fill(false));

  const log = useCallback((msg: string) => {
    const t = ((performance.now() - startRef.current) / 1000).toFixed(2);
    setLogs(p => [...p.slice(-25), `[${t}s] ${msg}`]);
  }, []);

  // Elapsed clock
  useEffect(() => {
    const id = setInterval(() => setElapsed(performance.now() - startRef.current), 100);
    return () => clearInterval(id);
  }, []);

  // Attach animationstart/end listeners
  const attachOnce = useRef(false);
  useEffect(() => {
    const tryAttach = () => {
      if (attachOnce.current) return;
      const els = document.querySelectorAll('[data-hero-item]');
      if (els.length < 6) return;
      attachOnce.current = true;
      log(`Found ${els.length} items — attaching listeners`);

      els.forEach((el, i) => {
        const onStart = (e: Event) => {
          animStartedRef.current[i] = true;
          log(`Item ${i} (${LABELS[i]}) animStart: "${(e as AnimationEvent).animationName}"`);
          setItems(prev => {
            const next = [...prev];
            next[i] = { ...next[i], animStartFired: true };
            return next;
          });
        };
        const onEnd = (e: Event) => {
          animEndedRef.current[i] = true;
          log(`Item ${i} (${LABELS[i]}) animEnd: "${(e as AnimationEvent).animationName}"`);
          setItems(prev => {
            const next = [...prev];
            next[i] = { ...next[i], animEndFired: true };
            return next;
          });
        };
        el.addEventListener('animationstart', onStart);
        el.addEventListener('animationend', onEnd);
        cleanupRef.current.push(() => {
          el.removeEventListener('animationstart', onStart);
          el.removeEventListener('animationend', onEnd);
        });
      });
    };
    const id = setInterval(tryAttach, 200);
    return () => clearInterval(id);
  }, [log]);

  // Poll computed styles + parent overflow chain
  useEffect(() => {
    const id = setInterval(() => {
      const els = document.querySelectorAll('[data-hero-item]');
      setItems(prev => {
        const next = [...prev];
        for (let i = 0; i < LABELS.length; i++) {
          const el = els[i] as HTMLElement | undefined;
          if (!el) { next[i] = { ...next[i], inDom: false }; continue; }
          const cs = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          next[i] = {
            ...next[i],
            opacity: parseFloat(cs.opacity).toFixed(3),
            animPlayState: cs.animationPlayState,
            animDelay: cs.animationDelay,
            inDom: true,
            hasSize: rect.width > 0 && rect.height > 0,
            animStartFired: animStartedRef.current[i],
            animEndFired: animEndedRef.current[i],
            clipper: findClipper(el),
          };
        }
        return next;
      });
    }, 200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => { cleanupRef.current.forEach(fn => fn()); }, []);

  const forceReveal = () => {
    const els = document.querySelectorAll('[data-hero-item]');
    els.forEach(el => {
      const h = el as HTMLElement;
      h.style.setProperty('opacity', '1', 'important');
      h.style.setProperty('transform', 'none', 'important');
      h.style.setProperty('animation', 'none', 'important');
    });
    log(`Force-revealed ${els.length} items`);
  };

  const logClippers = () => {
    const els = document.querySelectorAll('[data-hero-item]');
    els.forEach((el, i) => {
      log(`Item ${i} clipper: ${findClipper(el)}`);
    });
  };

  if (!visible) return (
    <button onClick={() => setVisible(true)} style={{
      position: 'fixed', bottom: 10, right: 10, zIndex: 9999999,
      background: '#ff3366', color: '#fff', border: 'none',
      padding: '6px 12px', borderRadius: 4, fontFamily: 'monospace', fontSize: 12,
    }}>DBG</button>
  );

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      maxHeight: '60vh', overflowY: 'auto',
      background: 'rgba(4,6,10,0.97)', borderTop: '2px solid #ff3366',
      color: '#e0e0e0', fontFamily: 'monospace', fontSize: 10,
      zIndex: 9999999, padding: '8px 10px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ color: '#ff3366', fontWeight: 'bold', fontSize: 11 }}>
          ⚡ {(elapsed / 1000).toFixed(1)}s
        </span>
        <button onClick={() => setVisible(false)}
          style={{ background: '#333', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: 3, cursor: 'pointer' }}>
          ×
        </button>
      </div>

      {/* Table */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '52px 38px 24px 24px 44px 24px', gap: 3, color: '#555', marginBottom: 3, fontSize: 9 }}>
          <span>item</span><span>opacity</span><span>▶</span><span>✓</span><span>play</span><span>sz</span>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '52px 38px 24px 24px 44px 24px',
            gap: 3, alignItems: 'center', marginBottom: 2,
            background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
            padding: '1px 2px',
          }}>
            <span style={{ color: '#aaa' }}>{LABELS[i]}</span>
            <span style={{ color: opColor(item.opacity), fontWeight: 'bold', fontSize: 10 }}>
              {item.inDom ? item.opacity : 'N/A'}
            </span>
            <span style={{ color: item.animStartFired ? '#0f0' : '#f00', textAlign: 'center' }}>
              {item.animStartFired ? '▶' : '○'}
            </span>
            <span style={{ color: item.animEndFired ? '#0f0' : '#555', textAlign: 'center' }}>
              {item.animEndFired ? '✓' : '…'}
            </span>
            <span style={{ color: item.animPlayState === 'running' ? '#0ff' : '#f80', fontSize: 8 }}>
              {item.animPlayState?.slice(0, 7) ?? '?'}
            </span>
            <span style={{ color: item.hasSize ? '#0ff' : '#f60', textAlign: 'center' }}>
              {item.hasSize ? '■' : '□'}
            </span>
          </div>
        ))}
      </div>

      {/* Clipper info for problem items */}
      {items.slice(2, 5).map((item, i) => item.inDom && (
        <div key={i} style={{ fontSize: 8, color: '#ff9800', marginBottom: 1, wordBreak: 'break-all' }}>
          Item {i+2} clip: {item.clipper}
        </div>
      ))}

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 6, marginTop: 6, marginBottom: 8, flexWrap: 'wrap' }}>
        <button onClick={forceReveal} style={btn('#1a7a3a')}>Force Reveal</button>
        <button onClick={logClippers} style={btn('#1a4a7a')}>Log Clippers</button>
        <button onClick={() => {
          items.forEach((item, i) => {
            log(`Item ${i}: op=${item.opacity} play=${item.animPlayState} delay=${item.animDelay} clipper=${item.clipper}`);
          });
        }} style={btn('#5a1a7a')}>Dump State</button>
      </div>

      {/* Logs */}
      <div style={{ borderTop: '1px solid #222', paddingTop: 4 }}>
        <div style={{ maxHeight: 110, overflowY: 'auto' }}>
          {logs.length === 0 && <div style={{ color: '#444', fontSize: 9 }}>Waiting…</div>}
          {logs.map((l, i) => (
            <div key={i} style={{ color: '#9ec5d8', borderBottom: '1px solid #111', padding: '1px 0', fontSize: 9 }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function opColor(op: string) {
  const n = parseFloat(op);
  if (isNaN(n)) return '#888';
  if (n >= 0.9) return '#00e676';
  if (n >= 0.01) return '#ffeb3b';
  return '#ff1744';
}

function btn(bg: string): React.CSSProperties {
  return { background: bg, color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', fontFamily: 'monospace', fontSize: 10 };
}
