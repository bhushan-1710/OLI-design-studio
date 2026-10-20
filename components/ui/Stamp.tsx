'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export interface StampProps {
  text: string;
  animate?: boolean;
  className?: string;
  rotation?: number; // default -5
}

/**
 * Stamp component (design.md §4.7 & motion-spec.md §4)
 * Red border rectangle + hand-lettered caps, rotated about -5°, lands with back.out(2) ease.
 * Uses gsap.context() and reverts on unmount.
 */
export const Stamp: React.FC<StampProps> = ({
  text,
  animate = false,
  className = '',
  rotation = -5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(containerRef.current, { opacity: 1, scale: 1, rotation });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 1.35,
          rotation: rotation - 8,
        },
        {
          opacity: 1,
          scale: 1,
          rotation,
          duration: 0.8,
          ease: 'back.out(2)',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animate, rotation]);

  return (
    <div
      ref={containerRef}
      className={`oli-stamp ${className}`.trim()}
      style={{ transform: `rotate(${rotation}deg)` }}
      role="status"
      aria-label={`Status: ${text}`}
    >
      <span className="oli-stamp-border" aria-hidden="true" />
      <span className="oli-stamp-text">{text}</span>
    </div>
  );
};
