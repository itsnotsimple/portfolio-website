import React, { useState, useRef } from 'react';
import './Folder.css';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
  open?: boolean;
  onToggle?: () => void;
  /** Called when a fanned-out paper is clicked (index 0-2). Only fires when open. */
  onItemClick?: (index: number) => void;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  open: openProp,
  onToggle,
  onItemClick,
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleFolderClick = (e: React.MouseEvent) => {
    // Stop propagation so the parent <button> onClick doesn't double-fire
    e.stopPropagation();
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalOpen(prev => !prev);
      if (open) setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperClick = (e: React.MouseEvent, index: number) => {
    if (!open) return;
    e.stopPropagation(); // don't toggle folder closed
    onItemClick?.(index);
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
    setPaperOffsets(prev => {
      const next = [...prev];
      next[index] = { x: offsetX, y: offsetY };
      return next;
    });
  };

  const handlePaperMouseLeave = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setPaperOffsets(prev => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  const folderRef = useRef<HTMLDivElement>(null);

  const handleFolderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = folderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    const centerX = percentX - 50;
    const centerY = percentY - 50;

    const rotateX = -(centerY / 50) * 12;
    const rotateY = (centerX / 50) * 12;

    el.style.setProperty('--folder-rotate-x', `${rotateX.toFixed(2)}deg`);
    el.style.setProperty('--folder-rotate-y', `${rotateY.toFixed(2)}deg`);
  };

  const handleFolderMouseLeave = () => {
    const el = folderRef.current;
    if (!el) return;
    el.style.setProperty('--folder-rotate-x', '0deg');
    el.style.setProperty('--folder-rotate-y', '0deg');
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  } as React.CSSProperties;

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <div
        ref={folderRef}
        className={`folder ${open ? 'open' : ''}`}
        style={folderStyle}
        onClick={handleFolderClick}
        onMouseMove={handleFolderMouseMove}
        onMouseLeave={handleFolderMouseLeave}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={e => handlePaperMouseMove(e, i)}
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              onClick={e => handlePaperClick(e, i)}
              style={
                open
                  ? ({
                      '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                      '--magnet-y': `${paperOffsets[i]?.y || 0}px`,
                      cursor: item ? 'pointer' : 'default',
                    } as React.CSSProperties)
                  : {}
              }
            >
              {item}
            </div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  );
};

export default Folder;
