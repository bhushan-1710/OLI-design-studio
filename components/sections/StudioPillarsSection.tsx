'use client';

import React from 'react';
import Link from 'next/link';

interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export function StudioPillarsSection() {
  const pillars: Pillar[] = [
    {
      number: '01',
      title: 'Single-Point Responsibility',
      subtitle: 'One Studio · Zero Dilution',
      description:
        'Instead of juggling an architect, a separate interior decorator, a landscaper, and custom furniture makers, OLI holds unified accountability. From master massing to the smallest cabinet latch, every detail stems from a single cohesive thought.',
    },
    {
      number: '02',
      title: 'Site-First Climate Architecture',
      subtitle: 'Passive Cooling · Monsoon Resilient',
      description:
        'We design specifically for local sunlight paths, seasonal monsoon runoff, and prevailing breezes. Massive horizontal overhangs, cross-ventilated courtyards, and breathable lime plaster ensure comfort with minimal mechanical reliance.',
    },
    {
      number: '03',
      title: 'Material Honesty & Detailing',
      subtitle: 'Concrete · Lime · Teak · Basalt',
      description:
        'We reject synthetic veneers and faux finishes. Our work honors the raw tactile character of board-formed concrete, hand-troweled hydraulic lime, reclaimed teak, and local basalt stone that age gracefully with time.',
    },
    {
      number: '04',
      title: 'Rigorous On-Site Supervision',
      subtitle: 'Drawings to Built Keys',
      description:
        'A drawing is only as good as its physical execution. We conduct scheduled weekly site audits, review mock-up assemblies, evaluate vendor tenders, and resolve site conditions until handing over verified as-built documentation and keys.',
    },
  ];

  return (
    <section
      className="studio-pillars-section"
      style={{
        position: 'relative',
        padding: 'clamp(48px, 6vw, 84px) clamp(22px, 3vw, 38px)',
        backgroundColor: 'var(--paper)',
        borderTop: '1.5px solid var(--ink)',
      }}
      aria-label="The Integrated Studio Advantage"
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: 'clamp(32px, 4vw, 56px)',
            maxWidth: '720px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            03 // THE INTEGRATED STUDIO ADVANTAGE
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Why trust one studio from designing to handover.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 'clamp(13px, 1.1vw, 15px)',
              lineHeight: 1.6,
              opacity: 0.8,
              margin: '4px 0 0 0',
            }}
          >
            We bridge the gap between design aspiration and construction reality. Four integrated disciplines eliminate vendor friction, cost inflation, and design compromise.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 2.5vw, 32px)',
          }}
        >
          {pillars.map((pillar) => (
            <article
              key={pillar.number}
              style={{
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                padding: 'clamp(20px, 2.5vw, 28px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                position: 'relative',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '12px',
                    borderBottom: '1px solid var(--grid)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      letterSpacing: '0.14em',
                      color: 'var(--red)',
                      fontWeight: 600,
                    }}
                  >
                    PILLAR {pillar.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      opacity: 0.6,
                    }}
                  >
                    STANDARDS
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    margin: '0 0 6px 0',
                    color: 'var(--ink)',
                  }}
                >
                  {pillar.title}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    display: 'block',
                    marginBottom: '12px',
                    opacity: 0.9,
                  }}
                >
                  {pillar.subtitle}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    opacity: 0.85,
                    margin: 0,
                  }}
                >
                  {pillar.description}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--grid)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.65,
                  }}
                >
                  Quality Verified
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-hand, cursive)',
                    fontSize: '18px',
                    color: 'var(--red)',
                  }}
                >
                  oli standard
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Reassurance Footer inside the section */}
        <div
          style={{
            marginTop: 'clamp(32px, 4vw, 48px)',
            padding: '16px 20px',
            border: '1px dashed var(--ink)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: 'rgba(0,0,0,0.015)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--red)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
              }}
            >
              Seeking an integrated design commission? We evaluate briefs across Western India and pan-India locations.
            </span>
          </div>

          <Link
            href="/process/"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
            className="focus-visible-ring"
          >
            Explore our 4-stage process →
          </Link>
        </div>
      </div>
    </section>
  );
}
