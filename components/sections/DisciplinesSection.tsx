'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DisciplineItem {
  id: string;
  name: string;
  desc: string;
  drawing: React.ReactNode;
}

export function DisciplinesSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);

  const toggleMobile = (id: string) => {
    setActiveDiscipline((prev) => (prev === id ? null : id));
  };

  const disciplines: DisciplineItem[] = [
    {
      id: 'architecture',
      name: 'Architecture',
      desc: 'Form, light and material engineered from site contours to structural completion.',
      drawing: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.5 }}>
          <rect x="20" y="40" width="160" height="70" />
          <line x1="20" y1="40" x2="100" y2="15" />
          <line x1="100" y1="15" x2="180" y2="40" />
          <line x1="60" y1="55" x2="90" y2="55" />
          <line x1="60" y1="75" x2="90" y2="75" />
          <line x1="120" y1="60" x2="160" y2="60" />
          <line x1="120" y1="85" x2="160" y2="85" />
        </svg>
      ),
    },
    {
      id: 'interior',
      name: 'Interior',
      desc: 'Bespoke joinery, tailored lighting and tactile finishes designed for daily living.',
      drawing: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.5 }}>
          <rect x="20" y="20" width="160" height="90" />
          <line x1="80" y1="20" x2="80" y2="110" />
          <line x1="140" y1="20" x2="140" y2="110" />
          <line x1="20" y1="65" x2="80" y2="65" />
          <circle cx="50" cy="85" r="3" fill="var(--red)" />
          <circle cx="110" cy="65" r="3" fill="var(--red)" />
        </svg>
      ),
    },
    {
      id: 'landscape',
      name: 'Landscape',
      desc: 'Native plantings, outdoor rooms and stone grading that integrate with the built envelope.',
      drawing: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.5 }}>
          <path d="M 10 90 Q 60 40, 110 80 T 190 70" />
          <path d="M 10 105 Q 70 70, 130 95 T 190 85" strokeDasharray="3 3" />
          <circle cx="70" cy="45" r="15" />
          <line x1="70" y1="60" x2="70" y2="80" />
          <circle cx="150" cy="55" r="10" />
          <line x1="150" y1="65" x2="150" y2="80" />
        </svg>
      ),
    },
    {
      id: 'product',
      name: 'Product Design',
      desc: 'Custom furniture, luminaires and architectural hardware crafted in natural brass and timber.',
      drawing: (
        <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', stroke: 'var(--red)', fill: 'none', strokeWidth: 1.5 }}>
          <ellipse cx="100" cy="35" rx="50" ry="15" />
          <path d="M 50 35 L 70 90 M 150 35 L 130 90" />
          <line x1="65" y1="75" x2="135" y2="75" strokeWidth={1} />
          <line x1="100" y1="35" x2="100" y2="10" strokeWidth={2} />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="disciplines-section"
      style={{
        position: 'relative',
        padding: 'clamp(44px, 6vw, 90px) clamp(22px, 3vw, 38px)',
        borderTop: '1px solid var(--ink)',
        backgroundColor: 'var(--paper)',
      }}
    >
      <div style={{ marginBottom: 'clamp(28px, 4vw, 48px)' }}>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono, monospace)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          Studio Disciplines
        </span>
        <h2
          style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontWeight: 400,
            lineHeight: 1.05,
          }}
        >
          One studio, start to finish.
        </h2>
      </div>

      {/* Disciplines List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {disciplines.map((d) => {
          const isOpen = activeDiscipline === d.id;

          return (
            <div
              key={d.id}
              className="discipline-row"
              onClick={() => toggleMobile(d.id)}
              style={{
                borderBottom: '1px solid var(--grid)',
                padding: 'clamp(18px, 2.5vw, 30px) 0',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <h3
                    className="discipline-title"
                    style={{
                      fontSize: 'clamp(30px, 4.2vw, 58px)',
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                      fontWeight: 400,
                      lineHeight: 1.1,
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {d.name}
                  </h3>
                  <span
                    className="discipline-arrow"
                    style={{
                      color: 'var(--red)',
                      fontSize: 'clamp(20px, 2.5vw, 36px)',
                      transition: 'transform 0.3s ease',
                      display: 'inline-block',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    ↗
                  </span>
                </div>

                {/* Desktop Hover Drawing Container */}
                <div
                  className="discipline-drawing-desktop"
                  style={{
                    width: '160px',
                    height: '90px',
                    opacity: 0,
                    transform: 'translateX(-10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {d.drawing}
                </div>
              </div>

              {/* Sub description */}
              <p
                style={{
                  fontSize: 'clamp(13px, 1.15vw, 16px)',
                  opacity: 0.75,
                  maxWidth: '54ch',
                  marginTop: '8px',
                  lineHeight: 1.55,
                }}
              >
                {d.desc}
              </p>

              {/* Mobile Inline Drawing Container (Accordion) */}
              <div
                className="discipline-drawing-mobile"
                style={{
                  maxHeight: isOpen ? '160px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  marginTop: isOpen ? '14px' : '0px',
                }}
              >
                <div style={{ width: '180px', height: '100px', margin: '0 auto' }}>
                  {d.drawing}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
