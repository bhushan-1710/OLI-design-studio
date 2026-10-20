'use client';

import gsap from 'gsap';
import { prefersReducedMotion } from './reduced-motion';

export interface DrawOptions {
  duration?: number;
  stagger?: number;
  ease?: string | gsap.EaseFunction;
  delay?: number;
  onComplete?: () => void;
}

/**
 * Ensures SVG drawable path elements have pathLength="1" set.
 */
export function prepareDrawElements(targets: string | Element | Element[] | NodeListOf<Element>): Element[] {
  let elements: Element[] = [];
  if (typeof targets === 'string') {
    elements = Array.from(document.querySelectorAll(targets));
  } else if (targets instanceof Element) {
    elements = [targets];
  } else if (Array.isArray(targets)) {
    elements = targets;
  } else if (targets instanceof NodeList) {
    elements = Array.from(targets) as Element[];
  }

  elements.forEach((el) => {
    if (!el.getAttribute('pathLength')) {
      el.setAttribute('pathLength', '1');
    }
  });

  return elements;
}

/**
 * Reusable helper that animates strokeDashoffset from 1 to 0.
 * Honors prefers-reduced-motion by immediately jumping to final state.
 */
export function draw(
  targets: gsap.TweenTarget,
  options: DrawOptions = {}
): gsap.core.Tween | null {
  const {
    duration = 1.0,
    stagger = 0.1,
    ease = 'power2.out',
    delay = 0,
    onComplete,
  } = options;

  if (typeof window === 'undefined') return null;

  if (prefersReducedMotion()) {
    gsap.set(targets, { strokeDashoffset: 0 });
    if (onComplete) onComplete();
    return null;
  }

  return gsap.to(targets, {
    strokeDashoffset: 0,
    duration,
    stagger,
    ease,
    delay,
    onComplete,
  });
}
