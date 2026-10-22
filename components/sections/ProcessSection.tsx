'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';
import { useIsomorphicLayoutEffect } from '@/lib/motion/isomorphic-layout-effect';

interface ProcessStage {
  number: string;
  name: string;
  desc: string;
}

const stages: ProcessStage[] = [
  {
    number: '01',
    name: 'Discover',
    desc: 'We start on site: topography, solar orientation, your brief, first ideas drawn by hand.',
  },
  {
    number: '02',
    name: 'Develop',
    desc: 'Ideas become measured plans, structural grids and dimensional drawings you can review.',
  },
  {
    number: '03',
    name: 'Refine',
    desc: 'We detail 1:5 connections, coordinate vendors and supervise site execution as it rises.',
  },
  {
    number: '04',
    name: 'Deliver',
    desc: 'You receive the finished space, verified on site with complete as-built documentation.',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (prefersReducedMotion()) {
      container.querySelectorAll('.d').forEach((el) => {
        el.setAttribute('pathLength', '1');
        gsap.set(el, { strokeDashoffset: 0 });
      });
      return;
    }

    // Set pathLength="1" on all SVG paths
    container.querySelectorAll('.d').forEach((el) => {
      el.setAttribute('pathLength', '1');
    });

    let mmInstance: gsap.MatchMedia | null = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mmInstance = mm;

      // Desktop: Pinned horizontal scrub across 4 panels
      mm.add('(min-width: 821px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.process-panel');

        const horizontalTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(Math.floor(p * panels.length), panels.length - 1);
              setActiveStage(idx);
            },
          },
        });

        horizontalTl.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
        });

        // Animate drawings per panel across scroll scrub
        panels.forEach((panel, i) => {
          const paths = panel.querySelectorAll('.d');
          if (paths.length) {
            // Window of animation for this panel
            const panelStart = i / panels.length;
            const panelDuration = 1 / panels.length;
            horizontalTl.fromTo(
              paths,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, stagger: 0.08, ease: 'power1.out' },
              panelStart + panelDuration * 0.2
            );
          }
        });
      });

      // Mobile: Unpinned vertical stack with scroll-triggered drawing on enter
      mm.add('(max-width: 820px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.process-panel');
        panels.forEach((panel) => {
          const paths = panel.querySelectorAll('.d');
          if (paths.length) {
            gsap.fromTo(
              Array.from(paths),
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 75%',
                  end: 'bottom 20%',
                  once: true,
                },
              }
            );
          }
        });
      });
    }, container);

    return () => {
      mmInstance?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div className="process-section-wrapper" style={{ width: '100%', position: 'relative' }}>
      <section
        ref={containerRef}
        className="process-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--paper)',
        overflow: 'hidden',
        borderTop: '1px solid var(--ink)',
      }}
    >
      {/* Top Section Header */}
      <div
        style={{
          padding: 'clamp(28px, 4vw, 48px) clamp(22px, 3vw, 38px) 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid var(--grid)',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Process & Methodology
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontWeight: 400,
              lineHeight: 1.05,
            }}
          >
            How a project moves.
          </h2>
        </div>

        {/* Desktop Stage Indicators */}
        <div
          className="desktop-process-indicators"
          style={{
            display: 'flex',
            gap: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {stages.map((stg, i) => (
            <span
              key={stg.number}
              style={{
                opacity: activeStage === i ? 1 : 0.38,
                borderBottom: activeStage === i ? '2px solid var(--red)' : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'opacity 0.3s, border-color 0.3s',
              }}
            >
              {stg.number} {stg.name}
            </span>
          ))}
        </div>
      </div>

      {/* Panels Track */}
      <div
        ref={trackRef}
        className="process-panels-track"
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        {/* Panel 1: 01 Discover / Sketch */}
        <div
          className="process-panel"
          style={{
            flex: '0 0 100%',
            minWidth: '100%',
            height: '75svh',
            minHeight: '480px',
            padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.18em',
                color: 'var(--red)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              STAGE 01 · DISCOVER
            </span>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              Site Observations & Concept on Paper
            </h3>
            <p
              style={{
                fontSize: 'clamp(14px, 1.25vw, 17px)',
                lineHeight: 1.65,
                maxWidth: '46ch',
                opacity: 0.85,
                marginBottom: '16px',
              }}
            >
              We begin on site. Topographical contours, sun angles, wind paths, and your brief are gathered into hand-drawn sketches, testing massing before touching CAD.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Site Analysis</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Solar Azimuth</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Conceptual Massing</span>
            </div>
          </div>

          {/* Bespoke Visual 01: Topography, Solar Path & Bubble Concept */}
          <div
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--grid)',
              backgroundColor: 'rgba(0, 0, 0, 0.015)',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <svg
              viewBox="0 0 500 360"
              style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
              aria-label="Architectural site topography and conceptual massing sketch"
            >
              {/* Drafting Grid Datum */}
              <g opacity="0.25" strokeDasharray="4 4">
                <line x1="40" y1="60" x2="460" y2="60" />
                <line x1="40" y1="180" x2="460" y2="180" />
                <line x1="40" y1="300" x2="460" y2="300" />
                <line x1="120" y1="30" x2="120" y2="330" />
                <line x1="250" y1="30" x2="250" y2="330" />
                <line x1="380" y1="30" x2="380" y2="330" />
              </g>

              {/* Site Contours */}
              <path className="d" d="M 40 280 Q 140 240, 240 270 T 460 250" strokeWidth="1.2" opacity="0.6" />
              <path className="d" d="M 40 240 Q 160 200, 270 230 T 460 200" strokeWidth="1.2" opacity="0.6" />
              <path className="d" d="M 40 190 Q 180 150, 300 180 T 460 150" strokeWidth="1.2" opacity="0.6" />
              <text x="50" y="274" fill="var(--ink)" opacity="0.6" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>+102.00 M</text>
              <text x="50" y="234" fill="var(--ink)" opacity="0.6" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>+104.00 M</text>
              <text x="50" y="184" fill="var(--ink)" opacity="0.6" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>+106.00 M</text>

              {/* Solar Path Arc (Red) */}
              <path className="d" d="M 90 220 A 180 140 0 0 1 410 220" stroke="var(--red)" strokeWidth="1.6" strokeDasharray="5 3" />
              <circle cx="140" cy="120" r="7" fill="var(--red)" opacity="0.8" />
              <line x1="140" y1="108" x2="140" y2="98" stroke="var(--red)" strokeWidth="1.5" />
              <line x1="140" y1="132" x2="140" y2="142" stroke="var(--red)" strokeWidth="1.5" />
              <line x1="128" y1="120" x2="118" y2="120" stroke="var(--red)" strokeWidth="1.5" />
              <line x1="152" y1="120" x2="162" y2="120" stroke="var(--red)" strokeWidth="1.5" />
              <text x="140" y="90" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>SOLAR AZIMUTH</text>

              {/* Prevailing Breeze Vector */}
              <path className="d" d="M 70 320 C 120 300, 150 250, 200 230" stroke="var(--red)" strokeWidth="1.4" markerEnd="url(#arrow)" />
              <text x="95" y="334" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px' }}>PREVAILING SW BREEZE</text>

              {/* North Arrow */}
              <g transform="translate(430, 70)">
                <circle cx="0" cy="0" r="16" stroke="var(--ink)" strokeWidth="1" />
                <path d="M 0 -12 L 5 8 L 0 4 L -5 8 Z" fill="var(--red)" stroke="var(--red)" />
                <text x="0" y="28" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 600 }}>N</text>
              </g>

              {/* Conceptual Building Massing (Rough gestural lines) */}
              <rect className="d" x="180" y="170" width="160" height="90" strokeWidth="2.2" stroke="var(--ink)" />
              <rect className="d" x="220" y="140" width="80" height="40" strokeWidth="1.6" strokeDasharray="3 3" />
              <line className="d" x1="180" y1="215" x2="340" y2="215" strokeWidth="1.4" />
              <text x="260" y="200" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '20px' }}>central courtyard</text>
              <text x="260" y="245" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-hand)', fontSize: '18px' }}>living pavilion</text>
            </svg>
          </div>
        </div>

        {/* Panel 2: 02 Develop */}
        <div
          className="process-panel"
          style={{
            flex: '0 0 100%',
            minWidth: '100%',
            height: '75svh',
            minHeight: '480px',
            padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.18em',
                color: 'var(--red)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              STAGE 02 · DEVELOP
            </span>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              Measured Architectural Plans
            </h3>
            <p
              style={{
                fontSize: 'clamp(14px, 1.25vw, 17px)',
                lineHeight: 1.65,
                maxWidth: '46ch',
                opacity: 0.85,
                marginBottom: '16px',
              }}
            >
              Rough sketches evolve into rigorous architectural drawings. Structural grids, wall thicknesses, door swings, and dimension strings are drafted for client review and refinement.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>1:50 Scale</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Structural Grid</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Spatial Plan</span>
            </div>
          </div>

          {/* Bespoke Visual 02: Dimensioned Floor Plan with Structural Poché */}
          <div
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--grid)',
              backgroundColor: 'rgba(0, 0, 0, 0.015)',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <svg
              viewBox="0 0 500 360"
              style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
              aria-label="Measured architectural floor plan with structural grid and dimensions"
            >
              {/* Structural Column Grid Bubbles */}
              <g opacity="0.7">
                <circle cx="80" cy="40" r="11" stroke="var(--ink)" strokeWidth="1" />
                <text x="80" y="44" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>A</text>
                <circle cx="250" cy="40" r="11" stroke="var(--ink)" strokeWidth="1" />
                <text x="250" y="44" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>B</text>
                <circle cx="420" cy="40" r="11" stroke="var(--ink)" strokeWidth="1" />
                <text x="420" y="44" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>C</text>

                <circle cx="40" cy="80" r="11" stroke="var(--ink)" strokeWidth="1" />
                <text x="40" y="84" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>1</text>
                <circle cx="40" cy="260" r="11" stroke="var(--ink)" strokeWidth="1" />
                <text x="40" y="264" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>2</text>
              </g>

              {/* Grid Lines */}
              <line className="d" x1="80" y1="52" x2="80" y2="300" strokeDasharray="6 4" opacity="0.35" />
              <line className="d" x1="250" y1="52" x2="250" y2="300" strokeDasharray="6 4" opacity="0.35" />
              <line className="d" x1="420" y1="52" x2="420" y2="300" strokeDasharray="6 4" opacity="0.35" />
              <line className="d" x1="52" y1="80" x2="450" y2="80" strokeDasharray="6 4" opacity="0.35" />
              <line className="d" x1="52" y1="260" x2="450" y2="260" strokeDasharray="6 4" opacity="0.35" />

              {/* Exterior Heavy Poché Walls */}
              <rect className="d" x="80" y="80" width="340" height="180" strokeWidth="3" />
              <line className="d" x1="230" y1="80" x2="230" y2="260" strokeWidth="2.2" />
              <line className="d" x1="80" y1="170" x2="230" y2="170" strokeWidth="2.2" />

              {/* Glass Sliders Opening */}
              <line x1="270" y1="80" x2="380" y2="80" stroke="var(--paper)" strokeWidth="6" />
              <line className="d" x1="270" y1="78" x2="380" y2="78" stroke="var(--red)" strokeWidth="1.6" />
              <line className="d" x1="270" y1="82" x2="380" y2="82" stroke="var(--red)" strokeWidth="1.6" />

              {/* Door Swings */}
              <path className="d" d="M 230 200 A 35 35 0 0 1 195 235" stroke="var(--red)" strokeDasharray="3 3" />
              <line className="d" x1="230" y1="200" x2="230" y2="235" stroke="var(--red)" strokeWidth="1.6" />

              {/* Room Labels */}
              <text x="155" y="130" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em' }}>GALLERY</text>
              <text x="155" y="220" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em' }}>ENTRY</text>
              <text x="325" y="170" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em', fontWeight: 500 }}>LIVING HALL</text>

              {/* Dimension Strings (Red) */}
              <line className="d" x1="80" y1="295" x2="420" y2="295" stroke="var(--red)" strokeWidth="1.4" />
              <line x1="80" y1="287" x2="80" y2="303" stroke="var(--red)" strokeWidth="1.4" />
              <line x1="230" y1="287" x2="230" y2="303" stroke="var(--red)" strokeWidth="1.4" />
              <line x1="420" y1="287" x2="420" y2="303" stroke="var(--red)" strokeWidth="1.4" />
              {/* Slash Ticks */}
              <line x1="77" y1="298" x2="83" y2="292" stroke="var(--red)" strokeWidth="1.8" />
              <line x1="227" y1="298" x2="233" y2="292" stroke="var(--red)" strokeWidth="1.8" />
              <line x1="417" y1="298" x2="423" y2="292" stroke="var(--red)" strokeWidth="1.8" />
              <text x="155" y="318" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '20px' }}>6.40 M</text>
              <text x="325" y="318" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '20px' }}>7.80 M</text>
            </svg>
          </div>
        </div>

        {/* Panel 3: 03 Build / Refine */}
        <div
          className="process-panel"
          style={{
            flex: '0 0 100%',
            minWidth: '100%',
            height: '75svh',
            minHeight: '480px',
            padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.18em',
                color: 'var(--red)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              STAGE 03 · REFINE & BUILD
            </span>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              Technical Detailing & Materials
            </h3>
            <p
              style={{
                fontSize: 'clamp(14px, 1.25vw, 17px)',
                lineHeight: 1.65,
                maxWidth: '46ch',
                opacity: 0.85,
                marginBottom: '16px',
              }}
            >
              We draft 1:5 scale joinery connections, specify material assemblies, coordinate engineering vendors, and make regular site visits to ensure execution matches the drawings.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>1:5 Detail</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Material Palette</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Site Supervision</span>
            </div>
          </div>

          {/* Bespoke Visual 03: Axonometric Junction & Material Specifications */}
          <div
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--grid)',
              backgroundColor: 'rgba(0, 0, 0, 0.015)',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <svg
              viewBox="0 0 500 360"
              style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
              aria-label="Axonometric architectural detail with material specifications"
            >
              {/* Concrete Wall Cross-Section with Hatching */}
              <rect className="d" x="60" y="80" width="110" height="220" strokeWidth="2.2" />
              {/* Concrete Hatching */}
              <g opacity="0.35">
                <line x1="60" y1="110" x2="90" y2="80" />
                <line x1="60" y1="150" x2="130" y2="80" />
                <line x1="60" y1="190" x2="170" y2="80" />
                <line x1="60" y1="230" x2="170" y2="120" />
                <line x1="60" y1="270" x2="170" y2="160" />
                <line x1="80" y1="300" x2="170" y2="210" />
                <line x1="120" y1="300" x2="170" y2="250" />
              </g>

              {/* Recessed Shadow Reveal (15mm) */}
              <rect className="d" x="170" y="110" width="16" height="190" stroke="var(--red)" strokeWidth="1.5" />
              <text x="178" y="100" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>15 MM REVEAL</text>

              {/* Structural Timber Rafter Beam */}
              <polygon className="d" points="186,120 380,60 440,80 246,140" strokeWidth="2" fill="var(--wash-sand)" fillOpacity="0.25" />
              <polygon className="d" points="186,120 246,140 246,200 186,180" strokeWidth="2" fill="var(--wash-timber)" fillOpacity="0.25" />
              <polygon className="d" points="246,140 440,80 440,140 246,200" strokeWidth="2" />

              {/* Unlacquered Brass Hardware Bolt Pin */}
              <circle cx="216" cy="155" r="5" stroke="var(--red)" strokeWidth="2" fill="var(--paper)" />
              <line x1="216" y1="147" x2="216" y2="163" stroke="var(--red)" strokeWidth="1.5" />

              {/* Leader Callout Lines */}
              <path className="d" d="M 115 140 L 115 50 L 50 50" stroke="var(--red)" strokeWidth="1.2" />
              <text x="50" y="44" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em' }}>300 MM FAIR-FACED CONCRETE</text>

              <path className="d" d="M 330 100 L 330 40 L 440 40" stroke="var(--red)" strokeWidth="1.2" />
              <text x="440" y="34" textAnchor="end" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em' }}>STRUCTURAL TIMBER RAFTER (120×60)</text>

              <path className="d" d="M 216 165 L 216 270 L 290 270" stroke="var(--red)" strokeWidth="1.2" />
              <text x="296" y="274" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.08em' }}>SOLID BRASS CONNECTION PIN</text>

              {/* Hand-lettered Quality Note */}
              <text x="350" y="325" textAnchor="middle" fill="var(--ink)" style={{ fontFamily: 'var(--font-hand)', fontSize: '19px' }}>
                coordinated on site
              </text>
            </svg>
          </div>
        </div>

        {/* Panel 4: 04 Deliver / Handover */}
        <div
          className="process-panel"
          style={{
            flex: '0 0 100%',
            minWidth: '100%',
            height: '75svh',
            minHeight: '480px',
            padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.18em',
                color: 'var(--red)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              STAGE 04 · DELIVER & HANDOVER
            </span>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              Completed Built Outcome
            </h3>
            <p
              style={{
                fontSize: 'clamp(14px, 1.25vw, 17px)',
                lineHeight: 1.65,
                maxWidth: '46ch',
                opacity: 0.85,
                marginBottom: '16px',
              }}
            >
              The journey completes at handover. You receive the ready-to-inhabit architecture, accompanied by complete as-built sets, vendor contacts, and maintenance schedules.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.75,
              }}
            >
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>As-Built Drawings</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Defect Liability</span>
              <span style={{ border: '1px solid var(--grid)', padding: '2px 8px' }}>Final Handover</span>
            </div>
          </div>

          {/* Bespoke Visual 04: Finished Architecture Elevation with Washes & Handover Stamp */}
          <div
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--grid)',
              backgroundColor: 'rgba(0, 0, 0, 0.015)',
              padding: '16px',
              boxSizing: 'border-box',
            }}
          >
            <svg
              viewBox="0 0 500 360"
              style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
              aria-label="Completed architectural residence elevation with watercolor washes and official handover stamp"
            >
              {/* Ground & Pool Horizon Line */}
              <line className="d" x1="40" y1="270" x2="460" y2="270" strokeWidth="2" />

              {/* Reflection Pool (Wash Glass) */}
              <rect x="70" y="270" width="360" height="45" fill="var(--wash-glass)" fillOpacity="0.45" stroke="none" />
              <line className="d" x1="90" y1="285" x2="190" y2="285" stroke="var(--ink)" opacity="0.3" strokeDasharray="6 4" />
              <line className="d" x1="240" y1="295" x2="380" y2="295" stroke="var(--ink)" opacity="0.3" strokeDasharray="6 4" />
              <text x="250" y="305" textAnchor="middle" fill="var(--ink)" opacity="0.6" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.1em' }}>
                WATER LEVEL -0.30 M
              </text>

              {/* Left Board-Formed Concrete Mass */}
              <rect className="d" x="70" y="140" width="170" height="130" fill="var(--wash-concrete)" fillOpacity="0.5" strokeWidth="2.2" />
              {/* Shuttering lines */}
              <line x1="70" y1="172" x2="240" y2="172" stroke="var(--ink)" strokeWidth="0.8" opacity="0.4" />
              <line x1="70" y1="205" x2="240" y2="205" stroke="var(--ink)" strokeWidth="0.8" opacity="0.4" />
              <line x1="70" y1="237" x2="240" y2="237" stroke="var(--ink)" strokeWidth="0.8" opacity="0.4" />

              {/* Right Cantilevered Volume (Higher Roof with Glazing) */}
              <polygon className="d" points="230,110 430,85 430,270 230,270" fill="var(--wash-sand)" fillOpacity="0.35" strokeWidth="2.2" />
              {/* Overhanging Parapet Soffit */}
              <line className="d" x1="220" y1="105" x2="445" y2="78" strokeWidth="3" stroke="var(--ink)" />

              {/* Glazed Sliding Walls with Interior Warmth */}
              <rect className="d" x="250" y="130" width="165" height="140" fill="var(--wash-glass)" fillOpacity="0.7" strokeWidth="1.8" />
              <line className="d" x1="305" y1="130" x2="305" y2="270" strokeWidth="1.2" />
              <line className="d" x1="360" y1="130" x2="360" y2="270" strokeWidth="1.2" />

              {/* Landscaping Flora Accents */}
              <path className="d" d="M 55 270 Q 60 220, 75 270" stroke="var(--wash-shrub)" strokeWidth="2" />
              <path className="d" d="M 65 270 Q 72 205, 82 270" stroke="var(--wash-sage)" strokeWidth="2" />
              <path className="d" d="M 425 270 Q 435 210, 445 270" stroke="var(--wash-sage)" strokeWidth="2" />

              {/* Official OLI Handover Stamp (Angled, Red) */}
              <g transform="translate(140, 160) rotate(-7)">
                <rect
                  className="d"
                  x="0"
                  y="0"
                  width="210"
                  height="64"
                  stroke="var(--red)"
                  strokeWidth="2.6"
                  fill="var(--paper)"
                />
                <line x1="6" y1="6" x2="204" y2="6" stroke="var(--red)" strokeWidth="0.8" opacity="0.5" />
                <line x1="6" y1="58" x2="204" y2="58" stroke="var(--red)" strokeWidth="0.8" opacity="0.5" />
                <text
                  x="105"
                  y="34"
                  textAnchor="middle"
                  fill="var(--red)"
                  style={{ fontFamily: 'var(--font-hand)', fontSize: '28px', letterSpacing: '0.04em' }}
                >
                  HANDED OVER
                </text>
                <text
                  x="105"
                  y="50"
                  textAnchor="middle"
                  fill="var(--red)"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em', fontWeight: 600 }}
                >
                  OLI STUDIO · VERIFIED
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
