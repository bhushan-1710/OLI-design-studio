import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { EnquiryForm } from '@/components/contact/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact — OLI Design Studio',
  description:
    'Let’s talk about your project. Architecture, Interior, Landscape, Product Design.',
};

export default function ContactPage() {
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
            <span>SHEET A-05</span>
            <span>·</span>
            <span>CONTACT</span>
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
            Contact
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
            Let&apos;s talk about your project. [DRAFT]
          </p>
        </header>

        {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Channels & Studio Information */}
          <section
            aria-labelledby="direct-channels-heading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-8)',
            }}
          >
            <div
              id="direct-channels-heading"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              01 // DIRECT CHANNELS
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-6)',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                padding: 'clamp(var(--space-6), 4vw, var(--space-8))',
                boxSizing: 'border-box',
              }}
            >
              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  EMAIL (PRIMARY)
                </span>
                <a
                  href="mailto:olidesignstudio06@gmail.com"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    transition: 'color 0.2s ease',
                  }}
                  className="oli-link"
                >
                  olidesignstudio06@gmail.com
                </a>
              </div>

              {/* WhatsApp (plain non-link text until real number confirmed) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  WHATSAPP
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    opacity: 0.85,
                  }}
                >
                  [NEEDED: WhatsApp number]
                </span>
              </div>

              {/* Phone (plain non-link text until real number confirmed) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  PHONE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    opacity: 0.85,
                  }}
                >
                  [NEEDED: Phone number]
                </span>
              </div>

              {/* Studio Location */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  STUDIO
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    opacity: 0.85,
                  }}
                >
                  [NEEDED: Studio location / address]
                </span>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                lineHeight: 1.6,
                letterSpacing: '0.04em',
                opacity: 0.7,
              }}
            >
              Tell us the site, the scale and when you&apos;d like to start. [DRAFT]
            </div>
          </section>

          {/* Right Column: 4-Field Enquiry Form */}
          <section
            aria-labelledby="form-section-heading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-8)',
            }}
          >
            <div
              id="form-section-heading"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              02 // PROJECT ENQUIRY
            </div>

            <Suspense
              fallback={
                <div
                  style={{
                    padding: 'var(--space-8)',
                    border: '1.5px solid var(--ink)',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                  }}
                >
                  Loading form...
                </div>
              }
            >
              <EnquiryForm />
            </Suspense>
          </section>
        </div>
      </main>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-05" sheetTitle="Contact" scale="Scale 1:100" />
    </div>
  );
}
