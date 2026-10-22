import React from 'react';
import type { Metadata } from 'next';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';
import { HandCircle } from '@/components/ui/HandCircle';

export const metadata: Metadata = {
  title: 'About — OLI Design Studio',
  description:
    'Architecture · Interior · Landscape · Product Design — one studio, start to finish.',
  alternates: {
    canonical: '/about',
  },
};

import { studioFacts } from '@/content/studio-facts';

interface DisciplineLeadRole {
  discipline: string;
  role: string;
  scope: string;
  status: string;
}

const ROLES: DisciplineLeadRole[] = [
  {
    discipline: 'Architecture',
    role: '[NEEDED: Architecture lead / architect details]',
    scope: 'Site Orientation · Massing · Envelope · Handover',
    status: '[NEEDED]',
  },
  {
    discipline: 'Interior',
    role: '[NEEDED: Interior design lead details]',
    scope: 'Spatial Planning · Joinery · Materials · Lighting',
    status: '[NEEDED]',
  },
  {
    discipline: 'Landscape',
    role: '[NEEDED: Landscape design lead details]',
    scope: 'Terrain · Plantings · Water Systems · Outdoor Pavilions',
    status: '[NEEDED]',
  },
  {
    discipline: 'Product Design',
    role: '[NEEDED: Product fabrication lead details]',
    scope: 'Bespoke Objects · Custom Hardware · Prototype Fabrication',
    status: '[NEEDED]',
  },
];

export default function AboutPage() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100svh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="oli-sheet-content"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'calc(var(--nav-height) + var(--space-8)) var(--space-6) var(--space-20)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-16)',
          boxSizing: 'border-box',
        }}
      >
        {/* Architectural Sheet Header */}
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            maxWidth: '820px',
            borderBottom: '1.5px solid var(--ink)',
            paddingBottom: 'var(--space-8)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            <span>SHEET A-04</span>
            <span>·</span>
            <span>ABOUT</span>
            <span>·</span>
            <span>STUDIO PRACTICE</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(40px, 6vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            About
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              lineHeight: 1.45,
              color: 'var(--ink)',
              opacity: 0.85,
              margin: 0,
            }}
          >
            Architecture · Interior · Landscape · Product Design — one studio, start to finish.
          </p>
        </header>

        {/* Section 01: Studio Philosophy */}
        <section
          aria-labelledby="philosophy-heading"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div
            id="philosophy-heading"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            01 // STUDIO PHILOSOPHY
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              padding: 'clamp(var(--space-6), 4vw, var(--space-12))',
              boxSizing: 'border-box',
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(24px, 3.2vw, 38px)',
                lineHeight: 1.35,
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              From sketch to{' '}
              <HandCircle>
                handover.
              </HandCircle>
            </blockquote>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
                gap: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  letterSpacing: '0.02em',
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                We believe a building, an interior, an outdoor garden, and a functional object belong to a single continuous thought. OLI operates across four integrated disciplines under one studio roof. We guide projects from the initial pencil sketch on trace paper through working drawings, structural coordination, material detailing, and site visits, until the physical handover of keys.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '13px',
                  lineHeight: 1.65,
                  letterSpacing: '0.02em',
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                By maintaining direct oversight over architecture, custom joinery, and landscape ecology, we eliminate the costly gaps and design dilution that occur when multiple disconnected consultants manage separate phases.
              </p>
            </div>

            {/* Materiality Study Image */}
            <div
              style={{
                width: '100%',
                maxHeight: '380px',
                border: '1px solid var(--ink)',
                overflow: 'hidden',
                backgroundColor: 'var(--paper)',
                position: 'relative',
                marginTop: '12px',
              }}
            >
              <img
                src="/images/projects/arch-outcome-2.jpg"
                alt="Architectural materiality study — fair-faced concrete canopy and hand-troweled lime plaster"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '380px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  border: '1px solid var(--ink)',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--paper)',
                  opacity: 0.95,
                }}
              >
                Materiality Study · Monolithic Concrete &amp; Lime Plaster
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Practice Structure & Discipline Leads */}
        <section
          aria-labelledby="practice-structure-heading"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div
            id="practice-structure-heading"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            02 // MULTIDISCIPLINARY PRACTICE STRUCTURE
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px',
            }}
          >
            {ROLES.map((role, idx) => (
              <article
                key={idx}
                style={{
                  border: '1.5px solid var(--ink)',
                  backgroundColor: 'var(--paper)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderBottom: '1px solid var(--grid)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      color: 'var(--red)',
                      fontWeight: 600,
                    }}
                  >
                    0{idx + 1} · {role.discipline.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      opacity: 0.6,
                    }}
                  >
                    LEAD
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    margin: 0,
                    color: 'var(--ink)',
                  }}
                >
                  {role.role}
                </h2>

                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    opacity: 0.9,
                  }}
                >
                  {role.scope}
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
                  {role.status}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 03: Studio Location & Geographic Coverage */}
        <section
          aria-labelledby="location-heading"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div
            id="location-heading"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            03 // STUDIO LOCATION &amp; COMMISSION COVERAGE
          </div>

          <div
            style={{
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              padding: 'clamp(20px, 3vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '24px',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  STUDIO LOCATION
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: '24px',
                    fontWeight: 400,
                    margin: '0 0 8px 0',
                  }}
                >
                  {studioFacts.location}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    opacity: 0.85,
                    margin: 0,
                  }}
                >
                  Address: {studioFacts.address} · Hours: {studioFacts.hours}
                </p>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  PRACTICE PROMISE
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: '24px',
                    fontWeight: 400,
                    margin: '0 0 8px 0',
                  }}
                >
                  {studioFacts.promise}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    opacity: 0.85,
                    margin: 0,
                  }}
                >
                  Four integrated disciplines: {studioFacts.disciplines.map((d) => d.name).join(' · ')}.
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--grid)',
                paddingTop: '16px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                opacity: 0.85,
              }}
            >
              <span>Email: {studioFacts.email}</span>
              <span>·</span>
              <span>Instagram: {studioFacts.instagram.handle}</span>
              <span>·</span>
              <span>Response: {studioFacts.responseTime}</span>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <footer
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-6)',
            paddingTop: 'var(--space-10)',
            borderTop: '1.5px solid var(--ink)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Start a project
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(24px, 3vw, 36px)',
              }}
            >
              Let&apos;s talk about your space.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20studio%20practice."
              target="_blank"
              rel="noopener noreferrer"
              className="oli-btn oli-btn-secondary"
            >
              WhatsApp Us ↗
            </a>
            <Button href="/contact/" variant="primary">
              Get in Touch →
            </Button>
          </div>
        </footer>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-04" sheetTitle="About" scale="Scale 1:100" />
    </div>
  );
}
