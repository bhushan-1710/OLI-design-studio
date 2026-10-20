'use client';

import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Filter chip component (design.md §4.11)
 * Mono caps, 1.5px ink border, active chip gets 2px red underline with full opacity,
 * inactive state is 38% opacity.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ active = false, children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`oli-chip ${active ? 'oli-chip-active' : ''} ${className}`.trim()}
        aria-pressed={active}
        {...props}
      >
        <span className="oli-chip-label">{children}</span>
      </button>
    );
  }
);

Chip.displayName = 'Chip';
