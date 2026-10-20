'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export function ClosingCtaSection() {
  return (
    <section
      className="closing-cta-section"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 8vw, 110px) clamp(22px, 3vw, 38px)',
        borderTop: '1px solid var(--ink)',
        backgroundColor: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
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
          Start a Conversation
        </span>

        <h2
          style={{
            fontSize: 'clamp(36px, 5.5vw, 68px)',
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: '20px',
          }}
        >
          Have a project in mind?
        </h2>

        <p
          style={{
            fontSize: 'clamp(14px, 1.25vw, 18px)',
            lineHeight: 1.6,
            opacity: 0.85,
            marginBottom: '36px',
          }}
        >
          Tell us the site, the scale and when you&apos;d like to start.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <Button variant="primary" href="/contact/">
            Send an enquiry
          </Button>

          {/* WhatsApp placeholder link */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            title="[NEEDED: Studio WhatsApp number]"
            style={{
              padding: '9px 18px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              border: '1.5px solid var(--ink)',
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            WhatsApp us ↗
          </a>
        </div>

        {/* Direct Email */}
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          Direct inquiry:{' '}
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
    </section>
  );
}
