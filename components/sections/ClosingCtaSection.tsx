'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function ClosingCtaSection() {
  return (
    <section
      className="closing-cta-section"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 110px) clamp(22px, 3vw, 38px)',
        borderTop: '1.5px solid var(--ink)',
        backgroundColor: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      aria-label="Enquiry and Consultation"
    >
      <div style={{ maxWidth: '840px', margin: '0 auto', width: '100%' }}>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          04 // START A CONVERSATION
        </span>

        <h2
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: '16px',
            color: 'var(--ink)',
          }}
        >
          Have a project in mind?
        </h2>

        <p
          style={{
            fontSize: 'clamp(14px, 1.25vw, 18px)',
            lineHeight: 1.6,
            opacity: 0.85,
            maxWidth: '56ch',
            margin: '0 auto 32px',
            color: 'var(--ink)',
          }}
        >
          Whether you are embarking on a residential pavilion, an interior transformation, or a private landscape, we welcome thoughtful projects at every scale.
        </p>

        {/* Client Onboarding Roadmap: What to Expect When You Contact Us */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            textAlign: 'left',
            margin: '32px 0 40px',
            padding: 'clamp(20px, 3vw, 28px)',
            border: '1.5px solid var(--ink)',
            backgroundColor: 'rgba(0, 0, 0, 0.015)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--red)',
                letterSpacing: '0.16em',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              STAGE 01 · CONSULTATION
            </span>
            <h3
              style={{
                fontSize: '16px',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                margin: '0 0 6px 0',
                color: 'var(--ink)',
              }}
            >
              Initial Brief &amp; Site Review
            </h3>
            <p
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono, monospace)',
                lineHeight: 1.55,
                opacity: 0.75,
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              We evaluate your site location, brief requirements, zoning contours, and intended timelines over a direct discussion.
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--red)',
                letterSpacing: '0.16em',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              STAGE 02 · FRAMEWORK
            </span>
            <h3
              style={{
                fontSize: '16px',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                margin: '0 0 6px 0',
                color: 'var(--ink)',
              }}
            >
              Concept &amp; Scope Proposal
            </h3>
            <p
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono, monospace)',
                lineHeight: 1.55,
                opacity: 0.75,
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              We define clear scope schedules across disciplines, establishing transparent deliverables, fees, and milestone dates.
            </p>
          </div>

          <div>
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--red)',
                letterSpacing: '0.16em',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              STAGE 03 · EXECUTION
            </span>
            <h3
              style={{
                fontSize: '16px',
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontWeight: 400,
                margin: '0 0 6px 0',
                color: 'var(--ink)',
              }}
            >
              Linework to Handover
            </h3>
            <p
              style={{
                fontSize: '12px',
                fontFamily: 'var(--font-mono, monospace)',
                lineHeight: 1.55,
                opacity: 0.75,
                margin: 0,
                color: 'var(--ink)',
              }}
            >
              From technical drawings and vendor coordination to continuous site supervision, one studio takes full accountability.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <Button variant="primary" href="/contact/">
            Send an enquiry →
          </Button>

          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '9px 18px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              border: '1.5px solid var(--ink)',
              borderRadius: 'var(--radius-wobbly)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
            }}
            className="focus-visible-ring"
          >
            WhatsApp us ↗
          </a>
        </div>

        {/* Reassurance & Direct Studio Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.04em',
              opacity: 0.8,
              margin: 0,
            }}
          >
            Response within 24–48 business hours · Initial site and brief reviews are non-binding.
          </p>

          <div
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.85,
            }}
          >
            Direct studio email:{' '}
            <a
              href="mailto:olidesignstudio06@gmail.com"
              style={{
                color: 'var(--red)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              olidesignstudio06@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
