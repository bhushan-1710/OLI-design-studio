import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TitleBlock } from '@/components/layout/TitleBlock';
import { EnquiryForm } from '@/components/contact/EnquiryForm';
import { studioFacts } from '@/content/studio-facts';

export const metadata: Metadata = {
  title: 'Contact — OLI Design Studio',
  description:
    'Let’s talk about your project. Tell us the site, the scale and when you’d like to start.',
  alternates: {
    canonical: '/contact',
  },
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
            <span>SHEET A-05</span>
            <span>·</span>
            <span>CONTACT</span>
            <span>·</span>
            <span>CLIENT ENQUIRY</span>
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
            Start a project.
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
            Tell us about your site, your scale, and when you would like to begin.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(var(--space-8), 5vw, var(--space-16))',
            alignItems: 'start',
          }}
        >
          {/* Left Column: What to Expect & Direct Studio Information */}
          <section
            aria-labelledby="contact-info-heading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-8)',
            }}
          >
            <div
              id="contact-info-heading"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--red)',
              }}
            >
              01 // WHAT HAPPENS AFTER YOU ENQUIRE
            </div>

            {/* What to Expect Roadmap Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                padding: 'clamp(20px, 3vw, 28px)',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    fontWeight: 600,
                    border: '1px solid var(--red)',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  1
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: '18px',
                      fontWeight: 400,
                      margin: '0 0 4px 0',
                    }}
                  >
                    Brief Evaluation (24–48 Hours)
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      lineHeight: 1.55,
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    Our principal design team reviews your preliminary site location, intended scope, and timeline parameters.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    fontWeight: 600,
                    border: '1px solid var(--red)',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  2
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: '18px',
                      fontWeight: 400,
                      margin: '0 0 4px 0',
                    }}
                  >
                    30-Minute Discovery Session
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      lineHeight: 1.55,
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    An introductory consultation via call or video to understand your aspirations and project requirements.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '11px',
                    color: 'var(--red)',
                    fontWeight: 600,
                    border: '1px solid var(--red)',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  3
                </span>
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontSize: '18px',
                      fontWeight: 400,
                      margin: '0 0 4px 0',
                    }}
                  >
                    Scope &amp; Milestones Framework
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '12px',
                      lineHeight: 1.55,
                      opacity: 0.8,
                      margin: 0,
                    }}
                  >
                    We present a clear deliverable matrix across our 4 stages (Sketch, Develop, Build, Handover) with structured fee schedules.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Studio Channels */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1.5px solid var(--ink)',
                backgroundColor: 'var(--paper)',
                padding: 'clamp(20px, 3vw, 28px)',
              }}
            >
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
                DIRECT STUDIO CONTACT
              </span>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  STUDIO EMAIL
                </span>
                <a
                  href="mailto:olidesignstudio06@gmail.com"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  olidesignstudio06@gmail.com
                </a>
              </div>

              {/* WhatsApp Direct Chat */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  WHATSAPP CHAT
                </span>
                <a
                  href="https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20new%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '13px',
                    color: 'var(--red)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Message us on WhatsApp ↗
                </a>
              </div>

              {/* Studio Base */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  STUDIO BASE &amp; COMMISSIONS
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    opacity: 0.85,
                    margin: 0,
                  }}
                >
                  {studioFacts.location} · {studioFacts.address}
                </p>
              </div>

              {/* Instagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                  }}
                >
                  INSTAGRAM ARCHIVE
                </span>
                <a
                  href="https://instagram.com/olidesignstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '12px',
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  @olidesignstudio ↗
                </a>
              </div>
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
              02 // PROJECT BRIEF &amp; ENQUIRY FORM
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
                  Loading enquiry sheet...
                </div>
              }
            >
              <EnquiryForm />
            </Suspense>
          </section>
        </div>
      </div>

      {/* Sheet Title Block */}
      <TitleBlock sheetNumber="A-05" sheetTitle="Contact" scale="Scale 1:100" />
    </div>
  );
}
