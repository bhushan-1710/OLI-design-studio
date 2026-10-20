'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export interface HandCircleProps {
  children: React.ReactNode;
  animate?: boolean;
  className?: string;
}

/**
 * HandCircle component (design.md §4.6 & oli-hero.html)
 * Red SVG loop drawn around a key emphasized word or phrase.
 */
export const HandCircle: React.FC<HandCircleProps> = ({
  children,
  animate = true,
  className = '',
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate || !pathRef.current || !containerRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(pathRef.current, { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <span ref={containerRef} className={`oli-hl ${className}`.trim()}>
      {children}
      <svg
        viewBox="0 0 220 64"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="oli-hl-svg"
      >
        <path
          ref={pathRef}
          className="d oli-hl-path"
          pathLength={1}
          d="M12 34C6 10 90 3 150 12C216 22 216 52 140 57C70 62 8 52 14 24"
        />
      </svg>
    </span>
  );
};
