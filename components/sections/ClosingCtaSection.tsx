'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { studioFacts } from '@/content/studio-facts';

export function ClosingCtaSection() {
  return (
    <section
      className="closing-cta-section"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 100px) clamp(20px, 4vw, 40px)',
        backgroundColor: 'var(--paper)',
        borderTop: '1.5px solid var(--ink)',
      }}
      aria-label="Start a Project Consultation"
    >
      {/* cta-3 Container: Architectural Grid Frame with SOLID 1.5px ink borders */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          border: '1.5px solid var(--ink)',
          backgroundColor: 'var(--paper)',
          padding: 'clamp(32px, 5vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          borderRadius: 0,
        }}
      >
        {/* Folio Header Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            marginBottom: '16px',
            border: '1px solid var(--red)',
            padding: '3px 10px',
            borderRadius: 0,
          }}
        >
          <span>SHEET CTA · 01</span>
          <span>·</span>
          <span>START A PROJECT</span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: 'var(--ink)',
            margin: '0 0 16px 0',
            maxWidth: '20ch',
          }}
        >
          Have a project in mind?
        </h2>

        {/* Subtitle from studio-facts.ts */}
        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            lineHeight: 1.6,
            color: 'var(--ink)',
            opacity: 0.85,
            maxWidth: '56ch',
            margin: '0 auto 32px auto',
          }}
        >
          {studioFacts.promise} Tell us the site, the scale, and when you’d like to start.
        </p>

        {/* Action Triggers */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          <Button variant="primary" href="/contact/">
            Send an enquiry →
          </Button>

          {studioFacts.whatsapp.isConfirmed ? (
            <a
              href={`https://wa.me/${studioFacts.whatsapp.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible-ring"
              style={{
                padding: '9px 20px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'transparent',
                borderRadius: 0,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              WhatsApp Us ↗
            </a>
          ) : (
            <Link
              href="/work/"
              className="focus-visible-ring"
              style={{
                padding: '9px 20px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'transparent',
                borderRadius: 0,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              Explore Selected Work →
            </Link>
          )}
        </div>

        {/* Meta Attribution Strip with SOLID 1.5px ink border (Zero dashed lines) */}
        <div
          style={{
            width: '100%',
            borderTop: '1.5px solid var(--ink)',
            paddingTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                marginBottom: '4px',
              }}
            >
              STUDIO LOCATION
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                color: 'var(--ink)',
                opacity: 0.85,
              }}
            >
              {studioFacts.location}
            </span>
          </div>

          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                marginBottom: '4px',
              }}
            >
              RESPONSE TIME
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                color: 'var(--ink)',
                opacity: 0.85,
              }}
            >
              {studioFacts.responseTime}
            </span>
          </div>

          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                marginBottom: '4px',
              }}
            >
              DIRECT CONTACT
            </span>
            <a
              href={`mailto:${studioFacts.email}`}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                color: 'var(--ink)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              {studioFacts.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
