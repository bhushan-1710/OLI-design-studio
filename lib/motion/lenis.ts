'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './reduced-motion';

// Register ScrollTrigger once on module load in client context
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type LenisCleanup = () => void;

let activeLenis: Lenis | null = null;

export function getLenisInstance(): Lenis | null {
  return activeLenis;
}

/**
 * Initializes Lenis smooth scrolling synchronized with GSAP's central ticker.
 * If user prefers reduced motion, bypasses Lenis completely.
 * Returns a cleanup callback to destroy Lenis and remove ticker callbacks.
 */
export function initSmoothScroll(): LenisCleanup {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // Bypass smooth scroll completely under prefers-reduced-motion
  if (prefersReducedMotion()) {
    return () => {};
  }

  try {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false, // Driven strictly by GSAP ticker
    });

    activeLenis = lenis;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis RAF into GSAP's central ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      if (activeLenis === lenis) {
        activeLenis = null;
      }
    };
  } catch (err) {
    // Graceful fallback if smooth scroll initialization encounters an issue
    return () => {};
  }
}

