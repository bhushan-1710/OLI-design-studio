import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { WorkGallery } from '@/components/work/WorkGallery';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Projects — OLI Design Studio',
  description:
    'Selected architectural, interior, landscape, and product design projects by OLI Design Studio.',
  alternates: {
    canonical: '/work',
  },
};

export default function WorkPage() {
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
          gap: 'var(--space-8)',
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
            paddingBottom: 'var(--space-6)',
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
            <span>SHEET A-02</span>
            <span>·</span>
            <span>WORK ARCHIVE</span>
            <span>·</span>
            <span>04 DISCIPLINES</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Work
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '13px',
              lineHeight: 1.6,
              opacity: 0.85,
              margin: 0,
            }}
          >
            Representative projects demonstrating our integrated approach. From initial pencil linework on trace paper to on-site structural execution and final turnkey handover.
          </p>
        </header>

        {/* Gallery with filter chips wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div
              style={{
                padding: 'var(--space-12) 0',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Loading index...
            </div>
          }
        >
          <WorkGallery />
        </Suspense>

        {/* Architectural Scope & Commissioning Note */}
        <section
          style={{
            marginTop: 'clamp(32px, 5vw, 56px)',
            border: '1.5px solid var(--ink)',
            backgroundColor: 'var(--paper)',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          aria-label="Commissioning Studio Projects"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                fontWeight: 600,
              }}
            >
              PROJECT BRIEF INQUIRIES
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                opacity: 0.6,
              }}
            >
              ONE STUDIO · 4 DISCIPLINES
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Planning a residence, interior, or private landscape?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              lineHeight: 1.6,
              opacity: 0.85,
              maxWidth: '720px',
              margin: 0,
            }}
          >
            We take care of projects from early site feasibility and zoning drawings through full working packages, contractor coordination, and site supervision.
          </p>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', paddingTop: '8px' }}>
            <Button href="/contact/" variant="primary">
              Discuss Your Project Brief →
            </Button>
            <a
              href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20new%20project%20commission."
              target="_blank"
              rel="noopener noreferrer"
              className="oli-btn oli-btn-secondary"
            >
              WhatsApp Us ↗
            </a>
          </div>
        </section>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-02" sheetTitle="Work" scale="Scale 1:100" />
    </div>
  );
}
