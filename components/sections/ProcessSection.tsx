'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

interface ProcessStage {
  number: string;
  name: string;
  desc: string;
}

const stages: ProcessStage[] = [
  {
    number: '01',
    name: 'Sketch',
    desc: 'We start on paper: your site, your brief, first ideas drawn by hand.',
  },
  {
    number: '02',
    name: 'Develop',
    desc: 'Ideas become plans, sections and materials you can review and change.',
  },
  {
    number: '03',
    name: 'Build',
    desc: 'We detail the drawings, coordinate vendors and visit site as it goes up.',
  },
  {
    number: '04',
    name: 'Handover',
    desc: 'You receive the finished space and the documents behind it.',
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

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
              paths,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 75%',
                  once: true,
                },
              }
            );
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
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
        {/* Panel 1: Sketch */}
        <div className="process-panel" style={{ flex: '0 0 100%', minWidth: '100%', height: '75svh', minHeight: '480px', padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.18em', color: 'var(--red)', display: 'block', marginBottom: '8px' }}>
              STAGE 01 · SKETCH
            </span>
            <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-serif, Georgia, serif)', fontWeight: 400, marginBottom: '16px' }}>
              Concept on Paper
            </h3>
            <p style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', lineHeight: 1.65, maxWidth: '44ch', opacity: 0.85 }}>
              {stages[0].desc}
            </p>
          </div>
          <div style={{ width: '100%', height: '100%', maxHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}>
              {/* North Arrow & Site Boundary */}
              <path className="d" d="M 60 70 L 60 30 M 60 30 L 52 44 M 60 30 L 68 44" stroke="var(--red)" />
              <text x="60" y="85" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>N</text>
              <polygon className="d" points="90,40 340,40 320,240 110,240" strokeDasharray="4 4" opacity={0.6} />
              {/* Organic Gestural Concept Lines */}
              <path className="d" d="M 120 180 C 140 120, 200 100, 260 110 C 300 120, 310 160, 280 190 C 240 220, 160 210, 140 180" />
              <path className="d" d="M 170 140 L 250 140 L 250 190 L 170 190 Z" strokeWidth={2} />
              <text x="210" y="170" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '18px' }}>first thought</text>
            </svg>
          </div>
        </div>

        {/* Panel 2: Develop */}
        <div className="process-panel" style={{ flex: '0 0 100%', minWidth: '100%', height: '75svh', minHeight: '480px', padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.18em', color: 'var(--red)', display: 'block', marginBottom: '8px' }}>
              STAGE 02 · DEVELOP
            </span>
            <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-serif, Georgia, serif)', fontWeight: 400, marginBottom: '16px' }}>
              Measured Architecture
            </h3>
            <p style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', lineHeight: 1.65, maxWidth: '44ch', opacity: 0.85 }}>
              {stages[1].desc}
            </p>
          </div>
          <div style={{ width: '100%', height: '100%', maxHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}>
              {/* Dimensioned Floor Plan */}
              <rect className="d" x="80" y="50" width="240" height="180" strokeWidth={2.4} />
              <line className="d" x1="180" y1="50" x2="180" y2="230" strokeWidth={1.8} />
              <line className="d" x1="80" y1="140" x2="180" y2="140" strokeWidth={1.8} />
              {/* Door Swings */}
              <path className="d" d="M 180 180 A 30 30 0 0 1 150 210" stroke="var(--red)" strokeDasharray="2 2" />
              <line className="d" x1="180" y1="180" x2="180" y2="210" stroke="var(--red)" />
              {/* Dimension Line */}
              <line className="d" x1="80" y1="260" x2="320" y2="260" stroke="var(--red)" />
              <line className="d" x1="80" y1="252" x2="80" y2="268" stroke="var(--red)" />
              <line className="d" x1="320" y1="252" x2="320" y2="268" stroke="var(--red)" />
              <text x="200" y="278" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '18px' }}>6.40 M</text>
            </svg>
          </div>
        </div>

        {/* Panel 3: Build */}
        <div className="process-panel" style={{ flex: '0 0 100%', minWidth: '100%', height: '75svh', minHeight: '480px', padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.18em', color: 'var(--red)', display: 'block', marginBottom: '8px' }}>
              STAGE 03 · BUILD
            </span>
            <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-serif, Georgia, serif)', fontWeight: 400, marginBottom: '16px' }}>
              Structure & Execution
            </h3>
            <p style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', lineHeight: 1.65, maxWidth: '44ch', opacity: 0.85 }}>
              {stages[2].desc}
            </p>
          </div>
          <div style={{ width: '100%', height: '100%', maxHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}>
              {/* Structural Axonometric Grid & Beams */}
              <line className="d" x1="80" y1="220" x2="200" y2="270" strokeWidth={2} />
              <line className="d" x1="200" y1="270" x2="330" y2="200" strokeWidth={2} />
              <line className="d" x1="200" y1="270" x2="200" y2="100" strokeWidth={2.4} />
              <line className="d" x1="80" y1="220" x2="80" y2="60" strokeWidth={2} />
              <line className="d" x1="330" y1="200" x2="330" y2="50" strokeWidth={2} />
              <line className="d" x1="80" y1="60" x2="200" y2="100" strokeWidth={2} />
              <line className="d" x1="200" y1="100" x2="330" y2="50" strokeWidth={2} />
              {/* Cross Bracing / Construction lines */}
              <line className="d" x1="80" y1="60" x2="200" y2="270" stroke="var(--red)" strokeDasharray="3 3" />
              <line className="d" x1="200" y1="100" x2="330" y2="200" stroke="var(--red)" strokeDasharray="3 3" />
              <text x="260" y="250" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '18px' }}>structural grid</text>
            </svg>
          </div>
        </div>

        {/* Panel 4: Handover */}
        <div className="process-panel" style={{ flex: '0 0 100%', minWidth: '100%', height: '75svh', minHeight: '480px', padding: 'clamp(24px, 4vw, 52px) clamp(22px, 3vw, 38px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center', boxSizing: 'border-box' }}>
          <div>
            <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.18em', color: 'var(--red)', display: 'block', marginBottom: '8px' }}>
              STAGE 04 · HANDOVER
            </span>
            <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontFamily: 'var(--font-serif, Georgia, serif)', fontWeight: 400, marginBottom: '16px' }}>
              Complete Reality
            </h3>
            <p style={{ fontSize: 'clamp(14px, 1.25vw, 18px)', lineHeight: 1.65, maxWidth: '44ch', opacity: 0.85 }}>
              {stages[3].desc}
            </p>
          </div>
          <div style={{ width: '100%', height: '100%', maxHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}>
              {/* Finished Residence Elevation Outline */}
              <line className="d" x1="60" y1="240" x2="340" y2="240" strokeWidth={2} />
              <rect className="d" x="100" y="150" width="180" height="90" fill="var(--wash-sand)" fillOpacity={0.4} strokeWidth={2} />
              <rect className="d" x="140" y="90" width="160" height="60" fill="var(--wash-concrete)" fillOpacity={0.4} strokeWidth={2} />
              {/* Windows */}
              <rect className="d" x="160" y="105" width="60" height="30" stroke="var(--ink)" fill="var(--wash-glass)" fillOpacity={0.6} />
              {/* Stamp */}
              <g transform="translate(190, 160) rotate(-6)">
                <rect className="d" x="0" y="0" width="140" height="42" stroke="var(--red)" strokeWidth={2} />
                <text x="70" y="28" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-hand)', fontSize: '20px' }}>
                  HANDED OVER
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
