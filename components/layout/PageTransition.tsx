'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

export function PageTransition() {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathRef.current = pathname;
      return;
    }

    // Pathname has not changed (e.g. query parameter change like /work?type=...), do not wipe
    if (prevPathRef.current === pathname) {
      return;
    }

    prevPathRef.current = pathname;

    // Reduced motion check: skip wipe entirely
    if (prefersReducedMotion()) {
      // Still refresh ScrollTrigger for pin calculations on the newly loaded page
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      return;
    }

    const overlay = overlayRef.current;
    const line = lineRef.current;
    if (!overlay || !line) return;

    // Architectural drafting ink line wipe: ≤ 400ms duration
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          // Ensure ScrollTrigger pins on the target page calculate exact geometry
          ScrollTrigger.refresh();
        },
      });

      tl.set(overlay, { display: 'block' })
        .fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center', opacity: 1 },
          { scaleX: 1, duration: 0.18, ease: 'power2.in' }
        )
        .to(line, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.18,
          ease: 'power2.out',
        })
        .to(line, { opacity: 0, duration: 0.04 });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'none',
      }}
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '3px',
          backgroundColor: 'var(--red)',
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
}
