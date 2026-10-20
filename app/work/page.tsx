import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { WorkGallery } from '@/components/work/WorkGallery';

export const metadata: Metadata = {
  title: 'Work · OLI Design Studio',
  description:
    'Selected architectural, interior, landscape, and product design projects by OLI Design Studio.',
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
      <main
        id="main-content"
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
            maxWidth: '720px',
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
            <span>WORK</span>
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
      </main>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-02" sheetTitle="Work" scale="Scale 1:100" />
    </div>
  );
}
