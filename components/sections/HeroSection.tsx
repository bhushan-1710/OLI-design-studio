'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SheetFrame } from '@/components/layout/SheetFrame';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { HeroElevation } from '@/components/sections/HeroElevation';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';
import { initSmoothScroll, getLenisInstance } from '@/lib/motion/lenis';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    // Register ScrollTrigger plugin safely
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis smooth scroll runtime
    const cleanupLenis = initSmoothScroll();

    const container = containerRef.current;
    if (!container) return cleanupLenis;

    // Reduced motion handling: render completed final state immediately with no pin
    if (prefersReducedMotion()) {
      setActiveStage(3); // 04 Handover
      const riseRect = container.querySelector('#riseRect');
      if (riseRect) {
        riseRect.setAttribute('y', '100');
        riseRect.setAttribute('height', '440');
      }
      const stamp = container.querySelector('.stamp');
      if (stamp) {
        gsap.set(stamp, { opacity: 1, scale: 1, rotation: -5 });
      }
      const hlPath = container.querySelector('.hl-path');
      if (hlPath) {
        gsap.set(hlPath, { strokeDashoffset: 0 });
      }
      container.querySelectorAll('.d').forEach((el) => {
        el.setAttribute('pathLength', '1');
        gsap.set(el, { strokeDashoffset: 0 });
      });
      container.querySelectorAll('.note').forEach((el) => {
        gsap.set(el, { opacity: 1 });
      });
      const cl = container.querySelectorAll('.cl');
      if (cl.length) {
        gsap.set(cl, { opacity: 0 });
      }
      const cue = container.querySelector('#cue');
      if (cue) {
        gsap.set(cue, { display: 'none' });
      }
      return cleanupLenis;
    }

    // Ensure all drawn paths have pathLength="1"
    container.querySelectorAll('.d').forEach((el) => {
      el.setAttribute('pathLength', '1');
    });

    // Create strict-mode safe GSAP context
    const ctx = gsap.context((self) => {
      // Initial geometry & positioning
      gsap.set('#riseRect', { attr: { y: 540, height: 0 } });
      gsap.set('.stamp', { svgOrigin: '1015 72', rotation: -12, scale: 1.25 });

      // 1. Time-based Intro timeline (on mount)
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });
      intro
        .to('.cl', { strokeDashoffset: 0, duration: 1.2, stagger: 0.07 }, 0.2)
        .to('.s1', { strokeDashoffset: 0, duration: 1.1, stagger: 0.14 }, 0.7)
        .from('.hero-copy h1', { y: 30, opacity: 0, duration: 1 }, 0.3)
        .from(
          ['.hero-sub', '.stages', '.titleblock'],
          { opacity: 0, y: 14, duration: 0.9, stagger: 0.12 },
          0.8
        );

      // 2. Pinned Scroll Scrub timeline
      const scrub = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.7,
          onUpdate: (st) => {
            const p = st.progress;
            const stageIndex = p < 0.03 ? 0 : p < 0.45 ? 1 : p < 0.78 ? 2 : 3;
            setActiveStage(stageIndex);
          },
        },
      });

      scrub
        .to('#cue', { opacity: 0, duration: 0.4 }, 0)
        .to('.s2', { strokeDashoffset: 0, duration: 3, stagger: 0.25 }, 0)
        .to('.dim', { strokeDashoffset: 0, duration: 1.6, stagger: 0.3 }, 2.2)
        .to('.note', { opacity: 1, duration: 0.8, stagger: 0.3 }, 3)
        .to('#riseRect', { attr: { y: 100, height: 440 }, duration: 3.2, ease: 'power1.inOut' }, 4.6)
        .to('.cl', { opacity: 0, duration: 1.5 }, 6)
        .to('.stamp', { opacity: 1, scale: 1, rotation: -5, duration: 0.8, ease: 'back.out(2)' }, 8.2)
        .to('.stamp .d', { strokeDashoffset: 0, duration: 0.8 }, 8.2)
        .to('.hl-path', { strokeDashoffset: 0, duration: 1.2 }, 8.5)
        .to({}, { duration: 0.8 }, 9.7);
    }, container);

    // Refresh ScrollTrigger geometry once fonts load
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ctx.revert();
      cleanupLenis();
    };
  }, []);

  const handleCueClick = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(window.scrollY + 140, { duration: 0.6 });
    } else {
      window.scrollBy({ top: 140, behavior: 'smooth' });
    }
  };

  return (
    <header ref={containerRef} className="stage hero-stage">
      <SheetFrame />

      {/* Copy Container */}
      <div className="copy hero-copy">
        <h1>
          From <em>sketch</em> to{' '}
          <span className="hl">
            handover.
            <svg viewBox="0 0 220 64" preserveAspectRatio="none" aria-hidden="true">
              <path
                className="d hl-path"
                pathLength="1"
                d="M12 34C6 10 90 3 150 12C216 22 216 52 140 57C70 62 8 52 14 24"
              />
            </svg>
          </span>
        </h1>
        <div className="sub hero-sub">
          <p>We take care of your projects from designing to handover.</p>
          <ul>
            <li>Architecture</li>
            <li>Interior</li>
            <li>Landscape</li>
            <li>Product</li>
          </ul>
        </div>
      </div>

      {/* Architectural Elevation Drawing */}
      <HeroElevation />

      {/* Scroll Cue (nudge on click, fades on scroll) */}
      <div id="cue" className="cue" onClick={handleCueClick} role="button" tabIndex={0} aria-label="Scroll to draw">
        scroll ↓
      </div>

      {/* Stage Tracker */}
      <ol className="stages hero-stages" aria-label="Project stages">
        <li className={activeStage === 0 ? 'on' : ''}>01 Sketch</li>
        <li className={activeStage === 1 ? 'on' : ''}>02 Develop</li>
        <li className={activeStage === 2 ? 'on' : ''}>03 Build</li>
        <li className={activeStage === 3 ? 'on' : ''}>04 Handover</li>
      </ol>

      {/* TitleBlock (hidden on <=820px) */}
      <TitleBlock sheetNumber="A-01" sheetTitle="Home" />
    </header>
  );
}
