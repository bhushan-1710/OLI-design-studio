'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export interface DimensionRuleProps {
  value?: string; // e.g. "4.20 M", "12.40 M"
  className?: string;
  animate?: boolean;
}

/**
 * DimensionRule component (design.md §4.8 & motion-spec.md §5.7)
 * Horizontal red line with end ticks and a hand-lettered dimension value, replacing <hr>.
 * Draws left to right when scrolled into view.
 */
export const DimensionRule: React.FC<DimensionRuleProps> = ({
  value = '12.40 M',
  className = '',
  animate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current || !lineRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(lineRef.current, { strokeDashoffset: 0 });
      if (textRef.current) gsap.set(textRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      if (textRef.current) {
        tl.to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`oli-dimension-rule ${className}`.trim()}
      role="separator"
      aria-label={`Dimension: ${value}`}
    >
      <div className="oli-dimension-rule-svg-wrap">
        <svg
          viewBox="0 0 1000 24"
          preserveAspectRatio="none"
          className="oli-dimension-svg"
          aria-hidden="true"
        >
          {/* Main line + vertical end ticks: tick left (x=0 to y=0..24), tick right (x=1000 to y=0..24), line (y=12) */}
          <path
            ref={lineRef}
            className="d oli-dimension-path"
            pathLength={1}
            d="M 2 2 V 22 M 2 12 H 998 M 998 2 V 22"
          />
        </svg>
      </div>

      {value && (
        <span ref={textRef} className="oli-dimension-value">
          {value}
        </span>
      )}
    </div>
  );
};
