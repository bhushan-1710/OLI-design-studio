import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found — OLI Design Studio',
  description: 'This sheet does not exist.',
};

export default function NotFound() {
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
          justifyContent: 'center',
          flex: 1,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            border: '1.5px solid var(--ink)',
            backgroundColor: 'var(--paper)',
            padding: 'clamp(var(--space-6), 5vw, var(--space-12))',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            boxSizing: 'border-box',
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
            <span>SHEET 404</span>
            <span>·</span>
            <span>NOT FOUND</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            This sheet doesn&apos;t exist.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2vw, 20px)',
              lineHeight: 1.45,
              color: 'var(--ink)',
              opacity: 0.85,
              margin: 0,
            }}
          >
            The drawing or specification you requested could not be located on this drawing board. [DRAFT]
          </p>

          <div style={{ paddingTop: 'var(--space-4)' }}>
            <Button href="/" variant="primary">
              Back to Home →
            </Button>
          </div>
        </div>
      </div>

      <TitleBlock sheetNumber="404" sheetTitle="Not Found" scale="Scale N/A" />
    </div>
  );
}
