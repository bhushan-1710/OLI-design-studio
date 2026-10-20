import React from 'react';

export interface SheetFrameProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable drafting sheet frame rendered inside section/stage containers (e.g. Hero, Sheet sections).
 * Follows oli-hero.html: position: absolute; inset: 12px; border: 1.5px solid var(--ink); pointer-events: none.
 * NOT a global fixed frame.
 */
export const SheetFrame: React.FC<SheetFrameProps> = ({ className = '', style }) => {
  return (
    <div
      className={`oli-sheet-frame ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
};
