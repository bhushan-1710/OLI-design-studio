'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioFacts } from '@/content/studio-facts';
import { prefersReducedMotion } from '@/lib/motion/reduced-motion';

interface DisciplineData {
  num: string;
  id: string;
  name: string;
  scope: string;
  description: string;
  drawing: React.ReactNode;
}

export function DisciplinesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  const disciplines: DisciplineData[] = [
    {
      num: '01',
      id: 'architecture',
      name: studioFacts.disciplines[0].name,
      scope: studioFacts.disciplines[0].scope,
      description: studioFacts.disciplines[0].description,
      drawing: (
        <svg
          viewBox="0 0 320 180"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}
          aria-hidden="true"
        >
          {/* Ground contour line */}
          <line className="d-line" pathLength={1} x1="20" y1="145" x2="300" y2="145" strokeWidth="2" />
          {/* Main pavilion envelope */}
          <rect className="d-line" pathLength={1} x="50" y="70" width="140" height="75" strokeWidth="1.8" />
          {/* Shuttering bands */}
          <line className="d-line" pathLength={1} x1="50" y1="95" x2="190" y2="95" strokeWidth="0.8" opacity="0.4" />
          <line className="d-line" pathLength={1} x1="50" y1="120" x2="190" y2="120" strokeWidth="0.8" opacity="0.4" />
          {/* Cantilever roof volume */}
          <polygon className="d-line" pathLength={1} points="180,50 285,30 285,145 180,145" strokeWidth="1.8" />
          <line className="d-line" pathLength={1} x1="175" y1="45" x2="295" y2="25" strokeWidth="2.5" stroke="var(--red)" />
          {/* Glazing aperture */}
          <rect className="d-line" pathLength={1} x="195" y="70" width="75" height="75" strokeWidth="1.2" />
          <line className="d-line" pathLength={1} x1="232" y1="70" x2="232" y2="145" strokeWidth="1" strokeDasharray="4 3" />
          {/* Dimension string */}
          <line className="d-line" pathLength={1} x1="50" y1="162" x2="285" y2="162" stroke="var(--red)" strokeWidth="1" />
          <text x="167" y="174" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em' }}>
            SPAN 23.5 M · 01 ARCHITECTURE
          </text>
        </svg>
      ),
    },
    {
      num: '02',
      id: 'interior',
      name: studioFacts.disciplines[1].name,
      scope: studioFacts.disciplines[1].scope,
      description: studioFacts.disciplines[1].description,
      drawing: (
        <svg
          viewBox="0 0 320 180"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}
          aria-hidden="true"
        >
          {/* Interior Room Volume */}
          <rect className="d-line" pathLength={1} x="30" y="30" width="260" height="120" strokeWidth="1.8" />
          {/* Rafter Lines */}
          <line className="d-line" pathLength={1} x1="30" y1="30" x2="160" y2="15" stroke="var(--red)" strokeWidth="1.5" />
          <line className="d-line" pathLength={1} x1="290" y1="30" x2="160" y2="15" stroke="var(--red)" strokeWidth="1.5" />
          {/* Plaster column partition */}
          <path className="d-line" pathLength={1} d="M 60 30 L 60 150" strokeWidth="2" />
          <line className="d-line" pathLength={1} x1="75" y1="30" x2="75" y2="150" strokeWidth="1" opacity="0.4" />
          <line className="d-line" pathLength={1} x1="90" y1="30" x2="90" y2="150" strokeWidth="1" opacity="0.4" />
          {/* Joinery Table Profile */}
          <polygon className="d-line" pathLength={1} points="130,95 250,95 240,115 120,115" strokeWidth="1.6" />
          <line className="d-line" pathLength={1} x1="140" y1="115" x2="140" y2="150" strokeWidth="2" />
          <line className="d-line" pathLength={1} x1="230" y1="115" x2="230" y2="150" strokeWidth="2" />
          {/* Dimension string */}
          <line className="d-line" pathLength={1} x1="30" y1="165" x2="290" y2="165" stroke="var(--red)" strokeWidth="1" />
          <text x="160" y="175" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em' }}>
            CLEAR REVEAL 15 MM · 02 INTERIOR
          </text>
        </svg>
      ),
    },
    {
      num: '03',
      id: 'landscape',
      name: studioFacts.disciplines[2].name,
      scope: studioFacts.disciplines[2].scope,
      description: studioFacts.disciplines[2].description,
      drawing: (
        <svg
          viewBox="0 0 320 180"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}
          aria-hidden="true"
        >
          {/* Stepped Contours & Retention Basins */}
          <polygon className="d-line" pathLength={1} points="25,140 120,140 120,105 190,105 190,75 250,75 250,150 25,150" strokeWidth="1.8" />
          {/* Swale Water Ripple */}
          <ellipse className="d-line" pathLength={1} cx="95" cy="145" rx="45" ry="6" stroke="var(--red)" strokeWidth="1.2" />
          {/* Pergola Columns */}
          <line className="d-line" pathLength={1} x1="245" y1="45" x2="305" y2="35" strokeWidth="2.5" stroke="var(--red)" />
          <rect className="d-line" pathLength={1} x="255" y="45" width="16" height="105" strokeWidth="1.6" />
          <rect className="d-line" pathLength={1} x="285" y="45" width="16" height="105" strokeWidth="1.6" />
          {/* Native Flora Organic Curves */}
          <path className="d-line" pathLength={1} d="M 40 140 Q 50 100, 68 140" strokeWidth="1.4" />
          <path className="d-line" pathLength={1} d="M 135 105 Q 148 65, 165 105" strokeWidth="1.4" />
          {/* Datum Callout */}
          <text x="95" y="168" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em' }}>
            DATUM -0.45 M · 03 LANDSCAPE
          </text>
        </svg>
      ),
    },
    {
      num: '04',
      id: 'product',
      name: studioFacts.disciplines[3].name,
      scope: studioFacts.disciplines[3].scope,
      description: studioFacts.disciplines[3].description,
      drawing: (
        <svg
          viewBox="0 0 320 180"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}
          aria-hidden="true"
        >
          {/* Architectural Credenza Profile */}
          <rect className="d-line" pathLength={1} x="40" y="65" width="170" height="65" strokeWidth="1.8" />
          <line className="d-line" pathLength={1} x1="40" y1="95" x2="210" y2="95" strokeWidth="1" strokeDasharray="3 3" />
          <line className="d-line" pathLength={1} x1="125" y1="65" x2="125" y2="130" strokeWidth="1.4" />
          {/* 45 degree shadow gap base */}
          <polygon className="d-line" pathLength={1} points="55,130 195,130 185,145 65,145" stroke="var(--red)" strokeWidth="1.5" />
          {/* Custom Luminaire Stem & Arm */}
          <ellipse className="d-line" pathLength={1} cx="260" cy="150" rx="28" ry="8" strokeWidth="1.8" />
          <line className="d-line" pathLength={1} x1="260" y1="150" x2="260" y2="30" stroke="var(--red)" strokeWidth="2" />
          <line className="d-line" pathLength={1} x1="260" y1="30" x2="215" y2="30" stroke="var(--red)" strokeWidth="2" />
          <rect className="d-line" pathLength={1} x="208" y="24" width="14" height="28" stroke="var(--red)" strokeWidth="1.6" />
          {/* Dimension string */}
          <line className="d-line" pathLength={1} x1="40" y1="162" x2="210" y2="162" stroke="var(--red)" strokeWidth="1" />
          <text x="125" y="174" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em' }}>
            JOINERY 1:1 DETAIL · 04 PRODUCT
          </text>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      const allLines = section.querySelectorAll<SVGElement>('.d-line');
      allLines.forEach((el) => {
        gsap.set(el, { strokeDashoffset: 0 });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll<SVGElement>('.d-line');
            lines.forEach((l, i) => {
              gsap.to(l, {
                strokeDashoffset: 0,
                duration: 1.1,
                delay: i * 0.06,
                ease: 'power2.out',
              });
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rowsRef.current.forEach((row) => {
      if (row) {
        const lines = row.querySelectorAll<SVGElement>('.d-line');
        lines.forEach((l) => {
          gsap.set(l, { strokeDasharray: 1, strokeDashoffset: 1 });
        });
        observer.observe(row);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="disciplines"
      className="oli-disciplines-folio-section"
      style={{
        width: '100%',
        position: 'relative',
        backgroundColor: 'var(--paper)',
        borderTop: '1.5px solid var(--ink)',
        padding: 'clamp(56px, 8vw, 110px) 0',
        overflow: 'hidden',
      }}
      aria-label="Integrated Studio Disciplines"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(48px, 6vw, 84px)',
        }}
      >
        {/* Section Folio Header */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '780px',
            borderBottom: '1.5px solid var(--ink)',
            paddingBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            <span>FOLIO · 04</span>
            <span>·</span>
            <span>INTEGRATED DISCIPLINES</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(34px, 5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Four disciplines. One drawing sheet.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'var(--ink)',
              opacity: 0.85,
              margin: 0,
            }}
          >
            Architecture, Interior, Landscape, and Product Design conceived in concert so no line is compromised at the seams.
          </p>
        </header>

        {/* Asymmetric Interlocking Rows (feature-4 Base Layout) */}
        <div
          className="oli-disciplines-interlocking-grid"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 6vw, 72px)',
            width: '100%',
          }}
        >
          {disciplines.map((item, idx) => {
            const isEven = idx % 2 === 1; // 0 is odd row (Architecture), 1 is even row (Interior), etc.
            return (
              <div
                key={item.id}
                ref={(el) => {
                  rowsRef.current[idx] = el;
                }}
                className={`oli-discipline-row ${isEven ? 'oli-discipline-row-even' : 'oli-discipline-row-odd'}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                  gap: 'clamp(24px, 4vw, 56px)',
                  alignItems: 'center',
                  border: '1.5px solid var(--ink)',
                  backgroundColor: 'var(--paper)',
                  padding: 'clamp(24px, 4vw, 44px)',
                  position: 'relative',
                  marginTop: idx > 0 ? (isEven ? '12px' : '0px') : '0px',
                }}
              >
                {/* Text Content Column */}
                <div
                  className="oli-discipline-text-col"
                  style={{
                    order: isEven ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif, Georgia, serif)',
                        fontSize: 'clamp(44px, 6vw, 76px)',
                        lineHeight: 0.9,
                        color: 'var(--red)',
                        fontWeight: 400,
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        opacity: 0.6,
                      }}
                    >
                      DISCIPLINE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: 'clamp(26px, 3.2vw, 38px)',
                      fontWeight: 400,
                      lineHeight: 1.15,
                      color: 'var(--ink)',
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--red)',
                      fontWeight: 600,
                      borderLeft: '2px solid var(--red)',
                      paddingLeft: '10px',
                    }}
                  >
                    {item.scope}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      lineHeight: 1.65,
                      color: 'var(--ink)',
                      opacity: 0.85,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ paddingTop: '8px' }}>
                    <Link
                      href={`/work/?type=${item.id}`}
                      className="focus-visible-ring"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--ink)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      Explore {item.name} Work →
                    </Link>
                  </div>
                </div>

                {/* Technical Linework Visual Column */}
                <div
                  className="oli-discipline-visual-col"
                  style={{
                    order: isEven ? 1 : 2,
                    width: '100%',
                    aspectRatio: '16 / 9',
                    border: '1.5px solid var(--ink)',
                    backgroundColor: 'var(--paper)',
                    padding: '12px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Drawing Visual */}
                  <div style={{ width: '100%', height: '100%' }}>
                    {item.drawing}
                  </div>

                  {/* Corner Index Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      opacity: 0.6,
                      border: '1px solid var(--grid)',
                      padding: '2px 6px',
                      backgroundColor: 'var(--paper)',
                    }}
                  >
                    DWG · {item.num}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
