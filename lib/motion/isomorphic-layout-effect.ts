'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * SSR-safe isomorphic layout effect.
 * Uses useLayoutEffect on the client so that GSAP cleanup runs synchronously
 * BEFORE React initiates DOM removal during client-side route transitions,
 * preventing 'NotFoundError: Failed to execute removeChild on Node'.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
