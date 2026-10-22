'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

export interface DiscreteTabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const DiscreteTabs: React.FC<DiscreteTabsProps> = ({
  tabs,
  activeId,
  onChange,
  className = '',
  ariaLabel = 'Filter tabs',
}) => {
  const isReduced = prefersReducedMotion();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`oli-discrete-tabs ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        backgroundColor: 'transparent',
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onChange(tab.id)}
            className="focus-visible-ring"
            style={{
              position: 'relative',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--paper)' : 'var(--ink)',
              transition: 'color 0.15s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              outline: 'none',
              borderRadius: 0,
            }}
          >
            {isActive && (
              <motion.div
                layoutId={isReduced ? undefined : 'discrete-tab-active-indicator'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--ink)',
                  border: '1.5px solid var(--ink)',
                  borderRadius: 0,
                  zIndex: 0,
                }}
                transition={
                  isReduced
                    ? { duration: 0 }
                    : { type: 'spring', bounce: 0.15, duration: 0.35 }
                }
              />
            )}
            <span style={{ position: 'relative', zIndex: 1, fontWeight: isActive ? 600 : 400 }}>
              {tab.label}
            </span>
            {tab.badge !== undefined && (
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '9px',
                  opacity: isActive ? 0.9 : 0.6,
                  border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--grid)',
                  padding: '1px 4px',
                  borderRadius: 0,
                }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
