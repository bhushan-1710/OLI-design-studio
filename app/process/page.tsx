import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Process · OLI Design Studio',
  description:
    'A project is a series of decisions. How OLI Design Studio moves from initial sketch to physical handover.',
};

const STAGES = [
  {
    num: '01',
    name: 'Sketch',
    description: 'We start on paper: your site, your brief, first ideas drawn by hand. [DRAFT]',
  },
  {
    num: '02',
    name: 'Develop',
    description: 'Ideas become plans, sections and materials you can review and change. [DRAFT]',
  },
  {
    num: '03',
    name: 'Build',
    description: 'We detail the drawings, coordinate vendors and visit site as it goes up. [DRAFT]',
  },
  {
    num: '04',
    name: 'Handover',
    description: 'You receive the finished space and the documents behind it. [DRAFT]',
  },
];

export default function ProcessPage() {
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
          gap: 'var(--space-12)',
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
            <span>SHEET A-03</span>
            <span>·</span>
            <span>PROCESS</span>
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
            Process
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
            A project is a series of decisions. Here is when each one gets made. [DRAFT]
          </p>
        </header>

        {/* 4 Sequential Stages Grid */}
        <section
          aria-label="Studio Project Stages"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-10)',
          }}
        >
          {STAGES.map((stage) => (
            <article
              key={stage.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                padding: 'var(--space-6) var(--space-8)',
                boxSizing: 'border-box',
              }}
            >
              {/* Stage Header */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 'var(--space-4)',
                  borderBottom: '1px solid var(--grid)',
                  paddingBottom: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '14px',
                      letterSpacing: '0.14em',
                      color: 'var(--red)',
                    }}
                  >
                    {stage.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: 'clamp(28px, 3.5vw, 40px)',
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {stage.name}
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    opacity: 0.75,
                    margin: 0,
                    maxWidth: '520px',
                  }}
                >
                  {stage.description}
                </p>
              </div>

              {/* 3-Column Structured Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'var(--space-6)',
                  paddingTop: 'var(--space-2)',
                }}
              >
                {/* Column 1: What we do */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      opacity: 0.6,
                    }}
                  >
                    WHAT WE DO
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      opacity: 0.85,
                      margin: 0,
                    }}
                  >
                    [NEEDED: Studio process details]
                  </p>
                </div>

                {/* Column 2: What you decide */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      opacity: 0.6,
                    }}
                  >
                    WHAT YOU DECIDE
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      opacity: 0.85,
                      margin: 0,
                    }}
                  >
                    [NEEDED: Client decisions]
                  </p>
                </div>

                {/* Column 3: What you receive */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      opacity: 0.6,
                    }}
                  >
                    WHAT YOU RECEIVE
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      opacity: 0.85,
                      margin: 0,
                    }}
                  >
                    [NEEDED: Deliverables & documentation]
                  </p>
                </div>
              </div>
            </article>
          ))}
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
              Ready to begin?
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(24px, 3vw, 36px)',
              }}
            >
              Start a project conversation.
            </span>
          </div>
          <Button href="/contact" variant="primary">
            Start a Conversation →
          </Button>
        </footer>
      </main>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-03" sheetTitle="Process" scale="Scale 1:100" />
    </div>
  );
}
