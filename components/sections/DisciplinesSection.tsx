'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DisciplineItem {
  id: string;
  number: string;
  name: string;
  scope: string;
  desc: string;
  drawing: React.ReactNode;
}

export function DisciplinesSection() {
  const [hoveredDiscipline, setHoveredDiscipline] = useState<string | null>(null);

  const disciplines: DisciplineItem[] = [
    {
      id: 'architecture',
      number: '01',
      name: 'Architecture',
      scope: 'Site Contours · Massing · Passive Ventilation · Structural Detailing',
      desc: 'Form, light and material engineered from site contours to structural completion. We sculpt monolithic fair-faced concrete, hydraulic lime, and expansive glazing designed for seasonal monsoons and natural illumination.',
      drawing: (
        <svg
          viewBox="0 0 240 140"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
          aria-hidden="true"
        >
          {/* Ground line */}
          <line x1="20" y1="115" x2="220" y2="115" strokeWidth="1.8" />
          {/* Main pavilion mass */}
          <rect x="35" y="55" width="105" height="60" strokeWidth="2" />
          {/* Shuttering grooves */}
          <line x1="35" y1="75" x2="140" y2="75" strokeWidth="0.8" opacity="0.4" />
          <line x1="35" y1="95" x2="140" y2="95" strokeWidth="0.8" opacity="0.4" />
          {/* Cantilevered higher roof volume */}
          <polygon points="135,40 215,25 215,115 135,115" strokeWidth="2" />
          <line x1="130" y1="36" x2="220" y2="20" strokeWidth="2.6" stroke="var(--red)" />
          {/* Glazing aperture */}
          <rect x="145" y="55" width="60" height="60" stroke="var(--ink)" strokeWidth="1.2" />
          <line x1="175" y1="55" x2="175" y2="115" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      ),
    },
    {
      id: 'interior',
      number: '02',
      name: 'Interior Architecture',
      scope: 'Fluted Plaster · Custom Millwork · Recessed Reveals · Lighting Schematics',
      desc: 'Spatial plans crafted with bespoke teak joinery, curved lime plaster screens, and honed Kota stone. We detail custom architectural hardware and integrated shadow gaps so no extraneous trims are required.',
      drawing: (
        <svg
          viewBox="0 0 240 140"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
          aria-hidden="true"
        >
          {/* Room Volume Outline */}
          <rect x="25" y="25" width="190" height="95" strokeWidth="2" />
          {/* Pitched ceiling truss lines */}
          <line x1="25" y1="25" x2="120" y2="10" stroke="var(--red)" strokeWidth="1.6" />
          <line x1="215" y1="25" x2="120" y2="10" stroke="var(--red)" strokeWidth="1.6" />
          {/* Fluted column left */}
          <path d="M 40 25 L 40 120" strokeWidth="2" />
          <line x1="50" y1="25" x2="50" y2="120" strokeWidth="1" opacity="0.5" />
          <line x1="60" y1="25" x2="60" y2="120" strokeWidth="1" opacity="0.5" />
          {/* Solid teak dining table profile */}
          <polygon points="90,75 185,75 175,90 80,90" strokeWidth="1.6" />
          <line x1="95" y1="90" x2="95" y2="120" strokeWidth="2.2" />
          <line x1="170" y1="90" x2="170" y2="120" strokeWidth="2.2" />
          {/* Dimension string */}
          <line x1="40" y1="130" x2="215" y2="130" stroke="var(--red)" strokeWidth="1" />
          <text x="127" y="138" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>CLEAR SPAN</text>
        </svg>
      ),
    },
    {
      id: 'landscape',
      number: '03',
      name: 'Landscape Architecture',
      scope: 'Monsoon Bio-Swales · Basalt Terraces · Native Flora · Shaded Verandas',
      desc: 'Topographical grading and water retention design. We engineer stepped basalt retention basins, outdoor living verandas, and native Deccan flora that transition unbroken from the architectural envelope into the earth.',
      drawing: (
        <svg
          viewBox="0 0 240 140"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
          aria-hidden="true"
        >
          {/* Stepped Basalt Terraces */}
          <polygon points="20,110 90,110 90,85 140,85 140,60 180,60 180,120 20,120" strokeWidth="1.8" />
          {/* Swale Water Level Ripple */}
          <ellipse cx="75" cy="115" rx="35" ry="5" stroke="var(--red)" strokeWidth="1.2" />
          <text x="75" y="130" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>SWALE -0.30M</text>
          {/* Stone column pergola */}
          <line x1="180" y1="40" x2="225" y2="30" strokeWidth="2.4" stroke="var(--red)" />
          <rect x="190" y="40" width="14" height="80" strokeWidth="1.6" />
          <rect x="215" y="40" width="14" height="80" strokeWidth="1.6" />
          {/* Foliage lines */}
          <path d="M 30 110 Q 38 80, 50 110" stroke="var(--ink)" strokeWidth="1.4" />
          <path d="M 100 85 Q 108 55, 120 85" stroke="var(--ink)" strokeWidth="1.4" />
        </svg>
      ),
    },
    {
      id: 'product',
      number: '04',
      name: 'Product & Furniture Design',
      scope: 'Solid Teak Joinery · Cold-Cast Brass · Shadow Reveals · Custom Luminaires',
      desc: 'Bespoke furniture and architectural lighting born from project requirements. We detail visible mortise-and-tenon joints, cold-pressed natural oil treatments, and hand-turned solid brass hardware crafted in limited studio editions.',
      drawing: (
        <svg
          viewBox="0 0 240 140"
          style={{ width: '100%', height: '100%', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.4 }}
          aria-hidden="true"
        >
          {/* Floor lamp stem & arm */}
          <ellipse cx="60" cy="120" rx="22" ry="6" strokeWidth="1.8" />
          <line x1="60" y1="120" x2="60" y2="25" strokeWidth="2" stroke="var(--red)" />
          <line x1="60" y1="25" x2="105" y2="25" strokeWidth="2" stroke="var(--red)" />
          <rect x="100" y="20" width="10" height="22" stroke="var(--red)" strokeWidth="1.6" fill="var(--paper)" />
          {/* Armchair Profile */}
          <path d="M 115 75 Q 110 100, 125 110 L 195 110 Q 210 100, 205 75 Z" strokeWidth="1.8" />
          <line x1="125" y1="110" x2="118" y2="125" strokeWidth="2.2" />
          <line x1="195" y1="110" x2="202" y2="125" strokeWidth="2.2" />
          <rect x="120" y="95" width="80" height="15" rx="3" strokeWidth="1.4" />
          {/* Joinery annotation */}
          <circle cx="160" cy="102" r="3" fill="var(--red)" />
          <text x="160" y="135" textAnchor="middle" fill="var(--red)" style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' }}>MORTISE & TENON</text>
        </svg>
      ),
    },
  ];

  return (
    <section
      className="disciplines-section"
      style={{
        position: 'relative',
        padding: 'clamp(56px, 7vw, 100px) clamp(22px, 3vw, 38px)',
        borderTop: '1.5px solid var(--ink)',
        backgroundColor: 'var(--paper)',
      }}
      aria-label="Studio disciplines and integrated practice"
    >
      {/* Asymmetrical 2-Column Grid */}
      <div
        className="disciplines-layout-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(36px, 5vw, 72px)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Architectural Manifesto & Proportional Divider Symbol */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Bespoke Architectural Proportional Divider Graphic Detail */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <svg
              viewBox="0 0 64 64"
              style={{ width: '42px', height: '42px', stroke: 'var(--ink)', fill: 'none', strokeWidth: 1.5 }}
              aria-hidden="true"
            >
              {/* Drafting Compass / Divider Legs */}
              <circle cx="32" cy="14" r="5" stroke="var(--red)" strokeWidth="1.8" />
              <line x1="32" y1="19" x2="14" y2="58" strokeWidth="1.8" />
              <line x1="32" y1="19" x2="50" y2="58" strokeWidth="1.8" />
              {/* Circular Proportional Arc with measurement ticks */}
              <path d="M 19 46 A 22 22 0 0 1 45 46" stroke="var(--ink)" strokeDasharray="3 2" />
              <circle cx="32" cy="40" r="2" fill="var(--red)" />
              <line x1="32" y1="36" x2="32" y2="44" stroke="var(--red)" strokeWidth="1.2" />
            </svg>

            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                fontWeight: 500,
              }}
            >
              FOLIO · 04 INTEGRATED DISCIPLINES
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontWeight: 400,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Four disciplines. One drawing sheet. Zero gaps.
          </h2>

          <div
            style={{
              width: '48px',
              height: '1.5px',
              backgroundColor: 'var(--red)',
              margin: '4px 0',
            }}
          />

          <p
            style={{
              fontSize: 'clamp(14px, 1.25vw, 17px)',
              lineHeight: 1.7,
              opacity: 0.88,
              maxWidth: '48ch',
              margin: 0,
            }}
          >
            Most building projects fracture between separate architects, interior decorators, landscape contractors, and furniture suppliers. Crucial design details disappear in the handoffs between teams.
          </p>

          <p
            style={{
              fontSize: 'clamp(13px, 1.15vw, 16px)',
              lineHeight: 1.65,
              opacity: 0.75,
              maxWidth: '48ch',
              margin: 0,
            }}
          >
            OLI operates as a unified architectural practice. We resolve the building envelope, shape the interior spaces, grade the living gardens, and build the custom furniture under a coordinated set of drawings. One team remains accountable from the first pencil trace to the day keys are handed over.
          </p>

          {/* Notebook Datum Marker */}
          <div
            style={{
              marginTop: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--grid)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              opacity: 0.6,
              display: 'flex',
              gap: '16px',
            }}
          >
            <span>SHEET SPECIFICATION: ARCH-INT-LAND-PROD</span>
            <span>·</span>
            <span>TOLERANCE: ±0 MM</span>
          </div>
        </div>

        {/* Right Column: Asymmetrical Editorial Discipline Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3.5vw, 40px)',
          }}
        >
          {disciplines.map((d, index) => {
            const isHovered = hoveredDiscipline === d.id;

            return (
              <div
                key={d.id}
                className="discipline-card focus-visible-ring"
                onMouseEnter={() => setHoveredDiscipline(d.id)}
                onMouseLeave={() => setHoveredDiscipline(null)}
                style={{
                  position: 'relative',
                  border: '1.5px solid var(--ink)',
                  backgroundColor: 'var(--paper)',
                  padding: 'clamp(20px, 3vw, 32px)',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  marginLeft: index % 2 === 1 ? 'clamp(0px, 3vw, 24px)' : '0px',
                  boxShadow: isHovered ? '0 6px 24px rgba(0, 0, 0, 0.04)' : 'none',
                }}
              >
                {/* Header with Number, Title, and Direct Link Arrow */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '12px',
                    borderBottom: '1px solid var(--grid)',
                    paddingBottom: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '12px',
                        letterSpacing: '0.18em',
                        color: 'var(--red)',
                        fontWeight: 600,
                      }}
                    >
                      {d.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif, Georgia, serif)',
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 400,
                        margin: 0,
                        color: isHovered ? 'var(--red)' : 'var(--ink)',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {d.name}
                    </h3>
                  </div>

                  <Link
                    href={`/work/?type=${d.id}`}
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--red)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'none',
                    }}
                    aria-label={`Explore ${d.name} projects in our portfolio`}
                  >
                    <span>EXPLORE</span>
                    <span style={{ transform: isHovered ? 'translate(2px, -2px)' : 'none', transition: 'transform 0.2s' }}>↗</span>
                  </Link>
                </div>

                {/* Scope Metadata Tags */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--red)',
                    opacity: 0.9,
                    marginBottom: '12px',
                  }}
                >
                  {d.scope}
                </div>

                {/* Description & Bespoke Drawing in Split Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'clamp(13px, 1.15vw, 15px)',
                      lineHeight: 1.6,
                      opacity: 0.82,
                      margin: 0,
                    }}
                  >
                    {d.desc}
                  </p>

                  <div
                    style={{
                      width: '100%',
                      height: '110px',
                      border: '1px solid var(--grid)',
                      backgroundColor: 'rgba(0, 0, 0, 0.015)',
                      padding: '8px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {d.drawing}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

