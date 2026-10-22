import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'How we work — OLI Design Studio',
  description:
    'A project is a series of decisions. How OLI Design Studio moves from initial sketch to physical handover.',
  alternates: {
    canonical: '/process',
  },
};

import { studioFacts } from '@/content/studio-facts';

interface ProcessStage {
  num: string;
  name: string;
  tagline: string;
  whatWeDo: string[];
  whatYouDecide: string[];
  whatYouReceive: string[];
}

const STAGES: ProcessStage[] = studioFacts.process.map((p) => ({
  num: p.stage,
  name: p.name,
  tagline: p.tagline,
  whatWeDo: p.whatWeDo,
  whatYouDecide: p.whatYouDecide,
  whatYouReceive: p.whatYouReceive,
}));

const FAQS = [
  {
    q: 'At what stage should we contact OLI Design Studio?',
    a: 'At early planning or site selection. Connecting before finalizing design decisions allows integration across architecture, interior, and landscape from the outset.',
  },
  {
    q: 'Where does OLI Design Studio accept commissions?',
    a: `Studio location: ${studioFacts.location}. Project commissions are evaluated by site scale and schedule.`,
  },
  {
    q: 'Can we commission OLI for individual disciplines?',
    a: 'Yes. We accept commissions for architecture, interior, landscape, or product design individually or as a unified start-to-handover commission.',
  },
  {
    q: 'How does OLI ensure the build matches the design?',
    a: `${studioFacts.promise} Drawing sets, vendor coordination, and structured site reviews ensure continuity from drawing to handover.`,
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
      <div
        className="oli-sheet-content"
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
            <span>SHEET A-03</span>
            <span>·</span>
            <span>PROCESS</span>
            <span>·</span>
            <span>4 STAGES TO HANDOVER</span>
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
            How a project moves.
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
            A project is a disciplined sequence of decisions. Here is what we do, what you decide, and what you receive at every step.
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
                padding: 'clamp(20px, 3vw, 36px)',
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
                      fontWeight: 600,
                    }}
                  >
                    STAGE {stage.num}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: 'clamp(28px, 3.5vw, 42px)',
                      fontWeight: 400,
                      margin: 0,
                      color: 'var(--ink)',
                    }}
                  >
                    {stage.name}
                  </h2>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    opacity: 0.85,
                    margin: 0,
                    maxWidth: '540px',
                    color: 'var(--ink)',
                  }}
                >
                  {stage.tagline}
                </p>
              </div>

              {/* 3-Column Structured Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: 'clamp(20px, 2.5vw, 32px)',
                  paddingTop: 'var(--space-2)',
                }}
              >
                {/* Column 1: What we do */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--red)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>01</span> WHAT WE DO
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {stage.whatWeDo.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '12px',
                          lineHeight: 1.55,
                          opacity: 0.85,
                          position: 'relative',
                          paddingLeft: '14px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            backgroundColor: 'var(--ink)',
                            borderRadius: '50%',
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: What you decide */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>02</span> WHAT YOU DECIDE
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {stage.whatYouDecide.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '12px',
                          lineHeight: 1.55,
                          opacity: 0.85,
                          position: 'relative',
                          paddingLeft: '14px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            backgroundColor: 'var(--red)',
                            borderRadius: '50%',
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: What you receive */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ink)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>03</span> WHAT YOU RECEIVE
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {stage.whatYouReceive.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '12px',
                          lineHeight: 1.55,
                          opacity: 0.85,
                          position: 'relative',
                          paddingLeft: '14px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '6px',
                            width: '4px',
                            height: '4px',
                            border: '1px solid var(--ink)',
                          }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Client Frequently Asked Questions */}
        <section
          aria-labelledby="faq-heading"
          style={{
            border: '1.5px solid var(--ink)',
            backgroundColor: 'var(--paper)',
            padding: 'clamp(24px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          <div
            id="faq-heading"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--red)',
            }}
          >
            05 // FREQUENTLY ASKED PROCESS QUESTIONS
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              margin: '0 0 8px 0',
              color: 'var(--ink)',
            }}
          >
            Clarity on engagement &amp; coordination.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '28px',
            }}
          >
            {FAQS.map((faq, fi) => (
              <div
                key={fi}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  borderTop: '1px solid var(--grid)',
                  paddingTop: '16px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: '18px',
                    fontWeight: 400,
                    margin: 0,
                    color: 'var(--ink)',
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
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
              Start Your Project
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontSize: 'clamp(24px, 3vw, 36px)',
              }}
            >
              Let&apos;s discuss your site and schedule.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20our%20project%20process."
              target="_blank"
              rel="noopener noreferrer"
              className="oli-btn oli-btn-secondary"
            >
              WhatsApp Us ↗
            </a>
            <Button href="/contact/" variant="primary">
              Book a Consultation →
            </Button>
          </div>
        </footer>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-03" sheetTitle="Process" scale="Scale 1:100" />
    </div>
  );
}
