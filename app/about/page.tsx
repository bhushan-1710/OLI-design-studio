import React from 'react';
import type { Metadata } from 'next';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';
import { HandCircle } from '@/components/ui/HandCircle';

export const metadata: Metadata = {
  title: 'About — OLI Design Studio',
  description:
    'About OLI Design Studio — Architecture, Interior, Landscape, Product Design.',
};

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
            maxWidth: '780px',
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
            Architecture · Interior · Landscape · Product Design — one studio, start to finish. [DRAFT]
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

          {/* Philosophy Statement & HandCircle Demonstration */}
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
                fontSize: 'clamp(24px, 3.2vw, 36px)',
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

            <p
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '13px',
                lineHeight: 1.6,
                letterSpacing: '0.04em',
                opacity: 0.75,
                margin: 0,
                maxWidth: '640px',
              }}
            >
              [NEEDED: Studio&apos;s own words]
            </p>
          </div>
        </section>

        {/* Section 02: Team & Discipline Leads */}
        <section
          aria-labelledby="team-heading"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-base)',
          }}
        >
          <div
            id="team-heading"
            style={{
              fontFamily: 'var(--font-mono, var(--font-mono-fallback))',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            02 // TEAM &amp; DISCIPLINE LEADS
          </div>

          <div
            style={{
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              padding: 'var(--sheet-padding)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-base)',
              boxSizing: 'border-box',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, var(--font-mono-fallback))',
                fontSize: '13px',
                letterSpacing: '0.04em',
                color: 'var(--ink)',
              }}
            >
              [NEEDED: team members]
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono, var(--font-mono-fallback))',
                fontSize: '13px',
                letterSpacing: '0.04em',
                opacity: 0.75,
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Studio to supply names, roles and portraits.
            </p>
          </div>
        </section>

        {/* Section 03: Studio Location */}
        <section
          aria-labelledby="location-heading"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
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
            03 // STUDIO LOCATION
          </div>

          <div
            style={{
              border: '1.5px solid var(--ink)',
              backgroundColor: 'var(--paper)',
              padding: 'var(--space-6) var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              PRIMARY OFFICE
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '13px',
                letterSpacing: '0.04em',
                margin: 0,
                opacity: 0.85,
              }}
            >
              [NEEDED: Studio location / address]
            </p>
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
          <Button href="/contact" variant="primary">
            Get in touch →
          </Button>
        </footer>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-04" sheetTitle="About" scale="Scale 1:100" />
    </div>
  );
}
